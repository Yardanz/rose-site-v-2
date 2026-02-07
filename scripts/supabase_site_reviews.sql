-- Create table for site reviews (Supabase SQL editor)
create table if not exists public.site_reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nickname text not null,
  body text not null,
  status text not null default 'pending',
  ip_hash text null,
  constraint site_reviews_nickname_len check (char_length(nickname) between 2 and 32),
  constraint site_reviews_body_len check (char_length(body) between 10 and 500),
  constraint site_reviews_status check (status in ('pending', 'approved', 'rejected'))
);

alter table public.site_reviews enable row level security;

drop policy if exists "read approved site reviews" on public.site_reviews;
create policy "read approved site reviews"
on public.site_reviews
for select
using (status = 'approved');

drop policy if exists "insert pending site reviews" on public.site_reviews;
create policy "insert pending site reviews"
on public.site_reviews
for insert
with check (status = 'pending');
