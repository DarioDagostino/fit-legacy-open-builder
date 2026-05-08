-- Migration: Create shared_content table for public shareable landing pages
-- This table stores snapshots of workout routines and nutrition plans
-- that users choose to share via a public URL.

create table if not exists public.shared_content (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('routine', 'plan')),
  title       text not null,
  description text,
  content     jsonb not null default '{}',
  trainer_note text,
  user_id     uuid references public.profiles(id) on delete set null,
  shared_by   text,
  created_at  timestamptz not null default now()
);

-- Index for fast lookups by id (already covered by PK, but explicit for clarity)
create index if not exists shared_content_created_at_idx on public.shared_content (created_at desc);

-- Row Level Security: anyone can read a shared link, only authenticated users can insert
alter table public.shared_content enable row level security;

create policy "Anyone can view shared content"
  on public.shared_content for select
  using (true);

create policy "Authenticated users can share content"
  on public.shared_content for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Owners can delete their shared content"
  on public.shared_content for delete
  to authenticated
  using (auth.uid() = user_id);
