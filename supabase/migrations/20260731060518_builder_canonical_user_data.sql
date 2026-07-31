-- Canonical per-user Builder data. Local persistence remains a resilient cache;
-- authenticated writes use these tables and are protected by owner-only RLS.
create extension if not exists "pgcrypto";

create table if not exists public.fitness_routines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'Untitled routine',
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.fitness_calendar_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  unique (user_id, date)
);

create table if not exists public.fitness_calendar_actions (
  id uuid primary key default gen_random_uuid(),
  client_id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  action_date date not null,
  title text not null,
  action_type text not null check (action_type in ('workout', 'meal', 'reminder')),
  completed boolean not null default false,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (user_id, client_id)
);

create table if not exists public.fitness_sessions (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  session_date date not null,
  exercise_count integer not null default 0 check (exercise_count >= 0),
  total_sets integer not null default 0 check (total_sets >= 0),
  total_reps integer not null default 0 check (total_reps >= 0),
  food_items integer not null default 0 check (food_items >= 0),
  total_calories integer not null default 0 check (total_calories >= 0),
  duration integer,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.fitness_bioledger (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stats jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists fitness_routines_user_updated_idx on public.fitness_routines(user_id, updated_at desc);
create index if not exists fitness_calendar_entries_user_date_idx on public.fitness_calendar_entries(user_id, date desc);
create index if not exists fitness_calendar_actions_user_date_idx on public.fitness_calendar_actions(user_id, action_date desc);
create index if not exists fitness_sessions_user_date_idx on public.fitness_sessions(user_id, session_date desc);

grant select, insert, update, delete on public.fitness_routines to authenticated;
grant select, insert, update, delete on public.fitness_calendar_entries to authenticated;
grant select, insert, update, delete on public.fitness_calendar_actions to authenticated;
grant select, insert, update, delete on public.fitness_sessions to authenticated;
grant select, insert, update, delete on public.fitness_bioledger to authenticated;

alter table public.fitness_routines enable row level security;
alter table public.fitness_calendar_entries enable row level security;
alter table public.fitness_calendar_actions enable row level security;
alter table public.fitness_sessions enable row level security;
alter table public.fitness_bioledger enable row level security;

create policy "Users own fitness routines" on public.fitness_routines for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users own calendar entries" on public.fitness_calendar_entries for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users own calendar actions" on public.fitness_calendar_actions for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users own fitness sessions" on public.fitness_sessions for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users own bioledger" on public.fitness_bioledger for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
