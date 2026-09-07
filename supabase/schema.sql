-- Run this in the Supabase SQL editor (Dashboard → SQL).

create table if not exists public.products (
  id text primary key,
  sku text not null,
  name text not null,
  size text not null default '',
  construction text not null default '',
  category text not null check (category in ('tire', 'tube', 'accessory')),
  fitment text not null default '',
  price_mayor_bs numeric,
  price_gran_mayor_usd numeric,
  is_published boolean not null default true,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_products_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
before update on public.products
for each row
execute procedure public.set_products_updated_at();

alter table public.products enable row level security;

drop policy if exists "Public can read published products" on public.products;
create policy "Public can read published products"
  on public.products
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Authenticated can read all products" on public.products;
create policy "Authenticated can read all products"
  on public.products
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can insert products" on public.products;
create policy "Authenticated can insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update products" on public.products;
create policy "Authenticated can update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);
