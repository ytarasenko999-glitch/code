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

-- 2. Дата реєстрації в user_data + доступ адміна до даних користувачів
alter table public.user_data add column if not exists created_at timestamptz default now();
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
  note text,
  updated_at timestamptz not null default now()
);
alter table public.subscriptions enable row level security;
drop policy if exists "sub own read" on public.subscriptions;
drop policy if exists "sub admin all" on public.subscriptions;
drop policy if exists "sub own autorenew" on public.subscriptions;
create policy "sub own read" on public.subscriptions for select using (auth.uid() = user_id or public.is_admin());
create policy "sub admin all" on public.subscriptions for all using (public.is_admin()) with check (public.is_admin());

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
