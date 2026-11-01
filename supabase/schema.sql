-- Banco do portfólio. Rode uma vez no SQL Editor do Supabase.
-- Com o cadastro público desligado, `authenticated` é só o dono do site.

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  message text not null check (char_length(message) between 20 and 4000),
  answered boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.featured_projects (
  repo_name text primary key,
  position int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;
alter table public.featured_projects enable row level security;

create policy "visitante envia" on public.messages for insert to anon, authenticated with check (answered = false);
create policy "dono le" on public.messages for select to authenticated using (true);
create policy "dono atualiza" on public.messages for update to authenticated using (true) with check (true);
create policy "todos leem destaques" on public.featured_projects for select to anon, authenticated using (true);
create policy "dono grava destaques" on public.featured_projects for all to authenticated using (true) with check (true);

grant insert on public.messages to anon, authenticated;
grant select, update on public.messages to authenticated;
grant select on public.featured_projects to anon, authenticated;
grant insert, update, delete on public.featured_projects to authenticated;

-- Contagens de lojas editadas no painel: uma linha só, lida no build (ADR 0015)
create table public.site_stats (
  id int primary key default 1 check (id = 1),
  faststore int not null check (faststore between 0 and 999),
  store_framework int not null check (store_framework between 0 and 999),
  wake int not null check (wake between 0 and 999),
  wordpress int not null check (wordpress between 0 and 999),
  updated_at timestamptz not null default now()
);

alter table public.site_stats enable row level security;

create policy "todos leem contagens" on public.site_stats for select to anon, authenticated using (true);
create policy "dono grava contagens" on public.site_stats for all to authenticated using (true) with check (true);

grant select on public.site_stats to anon, authenticated;
grant insert, update on public.site_stats to authenticated;
