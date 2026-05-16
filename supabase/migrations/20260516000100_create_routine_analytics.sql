-- Routine share analytics for builder-created WIR links.

create extension if not exists "pgcrypto";

create table if not exists public.routine_analytics (
  id uuid primary key default gen_random_uuid(),
  shared_content_id uuid references public.shared_content(id) on delete cascade,
  slug text not null,
  wir_hash text,
  creator_id uuid references auth.users(id) on delete set null,
  routine_name text,
  routine_type text not null default 'mixed',
  exercises_count integer not null default 0,
  foods_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint routine_analytics_slug_uidx unique (slug),
  constraint routine_analytics_wir_hash_uidx unique (wir_hash),
  constraint routine_analytics_type_check check (routine_type in ('workout', 'nutrition', 'mixed'))
);

create table if not exists public.routine_views (
  id uuid primary key default gen_random_uuid(),
  routine_analytics_id uuid not null references public.routine_analytics(id) on delete cascade,
  slug text not null,
  view_session_id text not null,
  viewed_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  ip_hash text,
  user_agent text,
  referrer text,
  time_spent_seconds integer not null default 0,
  completed boolean not null default false,
  items_checked integer not null default 0,
  total_items integer not null default 0,
  reshared_at timestamptz,
  reshare_count integer not null default 0,
  constraint routine_views_session_uidx unique (routine_analytics_id, view_session_id)
);

create index if not exists routine_analytics_creator_id_idx
  on public.routine_analytics (creator_id);

create index if not exists routine_views_slug_viewed_at_idx
  on public.routine_views (slug, viewed_at desc);

create index if not exists routine_views_routine_analytics_id_idx
  on public.routine_views (routine_analytics_id);

alter table public.routine_analytics enable row level security;
alter table public.routine_views enable row level security;

drop policy if exists "Creators can read own routine analytics" on public.routine_analytics;
create policy "Creators can read own routine analytics"
  on public.routine_analytics
  for select
  using (creator_id = auth.uid());

drop policy if exists "Creators can read own routine views" on public.routine_views;
create policy "Creators can read own routine views"
  on public.routine_views
  for select
  using (
    exists (
      select 1
      from public.routine_analytics ra
      where ra.id = routine_views.routine_analytics_id
        and ra.creator_id = auth.uid()
    )
  );
