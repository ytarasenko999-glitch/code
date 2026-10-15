-- CODE: таблиця для даних користувачів (профіль, збережені, історія, розклади)
create table if not exists public.user_data (
  id uuid primary key references auth.users on delete cascade,
  email text,
  profile jsonb default '{}'::jsonb,
  favs jsonb default '[]'::jsonb,
  hist jsonb default '[]'::jsonb,
  tarot jsonb default '[]'::jsonb,
  people jsonb default '[]'::jsonb,
  updated_at timestamptz default now()
);
alter table public.user_data enable row level security;
drop policy if exists "own row read" on public.user_data;
drop policy if exists "own row insert" on public.user_data;
drop policy if exists "own row update" on public.user_data;
drop policy if exists "own row delete" on public.user_data;
create policy "own row read"   on public.user_data for select using (auth.uid() = id);
create policy "own row insert" on public.user_data for insert with check (auth.uid() = id);
create policy "own row update" on public.user_data for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "own row delete" on public.user_data for delete using (auth.uid() = id);
