-- CODE · адмінпанель і підписки
-- Запустити один раз у Supabase → SQL Editor → Run. Безпечно запускати повторно.

-- 1. Хто є адміністратором (вхід в адмінку лише з цих email)
create table if not exists public.admins (email text primary key);
insert into public.admins(email) values ('ytarasenko999@gmail.com') on conflict do nothing;
alter table public.admins enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  -- адмін = підтверджений email зі списку admins (непідтверджена реєстрація з чужим email прав не дає)
  select exists(
    select 1 from public.admins a join auth.users u on lower(u.email) = lower(a.email)
    where u.id = auth.uid() and u.email_confirmed_at is not null
  );
$$;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "admins read" on public.admins;
create policy "admins read" on public.admins for select using (public.is_admin());
-- адміни можуть додавати інших адмінів і прибирати їх (себе — ні, щоб адмінка не лишилася без власника)
drop policy if exists "admins add" on public.admins;
drop policy if exists "admins remove" on public.admins;
create policy "admins add" on public.admins for insert with check (public.is_admin());
create policy "admins remove" on public.admins for delete using (public.is_admin() and lower(email) <> lower(coalesce(auth.jwt()->>'email','')));

-- 2. Дата реєстрації в user_data + доступ адміна до даних користувачів
alter table public.user_data add column if not exists created_at timestamptz default now();
alter table public.user_data add column if not exists reports jsonb default '{}'::jsonb;
drop policy if exists "admin read users" on public.user_data;
drop policy if exists "admin delete users" on public.user_data;
create policy "admin read users" on public.user_data for select using (public.is_admin());
create policy "admin delete users" on public.user_data for delete using (public.is_admin());

-- 3. Підписки: одна на користувача. Користувач бачить лише свою, змінює тільки адмін (і згодом сервер оплат)
create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users on delete cascade,
  email text,
  plan text not null default 'free' check (plan in ('free','plus','pro')),
  period text not null default 'm' check (period in ('m','y')),
  started_at timestamptz,
  paid_until timestamptz,
  auto_renew boolean not null default false,
  packs integer not null default 0,
  pack_reports integer not null default 0,
  note text,
  updated_at timestamptz not null default now()
);
alter table public.subscriptions add column if not exists pack_reports integer not null default 0;
alter table public.subscriptions enable row level security;
drop policy if exists "sub own read" on public.subscriptions;
drop policy if exists "sub admin all" on public.subscriptions;
drop policy if exists "sub own autorenew" on public.subscriptions;
create policy "sub own read" on public.subscriptions for select using (auth.uid() = user_id or public.is_admin());
create policy "sub admin all" on public.subscriptions for all using (public.is_admin()) with check (public.is_admin());
-- користувач сам вмикає/вимикає автопродовження своєї активної підписки (інші поля змінює лише адмін)
create or replace function public.set_auto_renew(turn_on boolean) returns boolean
language plpgsql security definer set search_path = public as $$
begin
  update public.subscriptions set auto_renew = turn_on, updated_at = now()
   where user_id = auth.uid() and plan in ('plus','pro') and paid_until > now();
  if not found then raise exception 'no_active_plan'; end if;
  return turn_on;
end $$;
revoke all on function public.set_auto_renew(boolean) from public, anon;
grant execute on function public.set_auto_renew(boolean) to authenticated;

-- 4. Оплати (і ручні записи адміна, повернення)
create table if not exists public.payments (
  id bigserial primary key,
  user_id uuid references auth.users on delete set null,
  email text,
  amount integer not null,
  plan text,
  period text,
  kind text not null default 'payment' check (kind in ('payment','manual','refund','pack')),
  provider text,
  provider_ref text,
  note text,
  created_at timestamptz not null default now()
);
alter table public.payments enable row level security;
drop policy if exists "pay own read" on public.payments;
drop policy if exists "pay admin all" on public.payments;
create policy "pay own read" on public.payments for select using (auth.uid() = user_id or public.is_admin());
create policy "pay admin all" on public.payments for all using (public.is_admin()) with check (public.is_admin());

-- 5. Облік ШІ-запитів (якщо ще не створено) + доступ адміна
create table if not exists public.ai_usage (
  id bigserial primary key,
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  kind text,
  created_at timestamptz not null default now()
);
alter table public.ai_usage add column if not exists source text;
create index if not exists ai_usage_user_day on public.ai_usage (user_id, created_at);
alter table public.ai_usage enable row level security;
drop policy if exists "own usage read" on public.ai_usage;
drop policy if exists "own usage insert" on public.ai_usage;
create policy "own usage read" on public.ai_usage for select using (auth.uid() = user_id or public.is_admin());
create policy "own usage insert" on public.ai_usage for insert with check (auth.uid() = user_id);

-- 6. Журнал дій адміна
create table if not exists public.admin_log (
  id bigserial primary key,
  admin_email text default (auth.jwt()->>'email'),
  action text not null,
  target_user uuid,
  target_email text,
  details jsonb,
  created_at timestamptz not null default now()
);
alter table public.admin_log enable row level security;
drop policy if exists "log admin" on public.admin_log;
create policy "log admin" on public.admin_log for all using (public.is_admin()) with check (public.is_admin());

-- 7. Витрати на ШІ: токени й вартість кожного запиту + налаштування адмінки (поповнення балансу Anthropic)
alter table public.ai_usage add column if not exists tokens_in integer;
alter table public.ai_usage add column if not exists tokens_out integer;
alter table public.ai_usage add column if not exists cost numeric(12,6);
create table if not exists public.admin_settings (
  key text primary key,
  value jsonb,
  updated_at timestamptz not null default now()
);
alter table public.admin_settings enable row level security;
drop policy if exists "settings admin" on public.admin_settings;
create policy "settings admin" on public.admin_settings for all using (public.is_admin()) with check (public.is_admin());

-- 8. Журнал відправлених листів (щоб кожен лист ішов один раз)
create table if not exists public.email_log (
  id bigserial primary key,
  user_id uuid references auth.users on delete cascade,
  email text,
  kind text not null,
  ref text not null default '',
  created_at timestamptz not null default now(),
  unique (user_id, kind, ref)
);
alter table public.email_log enable row level security;
drop policy if exists "email log admin" on public.email_log;
create policy "email log admin" on public.email_log for select using (public.is_admin());

-- ===== analytics: anonymous visits (written by /api/track with the service key, readable by admins) =====
create table if not exists public.visits(
  id bigserial primary key, created_at timestamptz not null default now(),
  sid text, first boolean default false, path text, ref text, src text, medium text, campaign text,
  device text, country text, lang text);
create index if not exists visits_created_idx on public.visits(created_at);
alter table public.visits enable row level security;
drop policy if exists visits_admin_read on public.visits;
create policy visits_admin_read on public.visits for select using (public.is_admin());

-- ===== partners & promo codes =====
create table if not exists public.partners(
  id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(),
  name text not null, email text, code text not null unique, note text);
alter table public.partners enable row level security;
drop policy if exists partners_admin on public.partners;
create policy partners_admin on public.partners for all using (public.is_admin()) with check (public.is_admin());
alter table public.user_data add column if not exists promo text;
create or replace function public.promo_ok(c text) returns boolean language sql security definer set search_path=public as $$
  select exists(select 1 from public.partners where upper(code)=upper(trim(c)));
$$;
grant execute on function public.promo_ok(text) to anon, authenticated;
