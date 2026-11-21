create extension if not exists pgcrypto;

create table if not exists public.tool_notifications (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  tool_slug text not null,
  created_at timestamptz not null default now(),
  constraint tool_notifications_email_tool_unique unique (email, tool_slug)
);

alter table public.tool_notifications enable row level security;

-- Do not add anon/authenticated policies. The server route writes with the
-- service role key, which must remain private and server-side.
