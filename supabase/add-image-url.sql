-- Product photos: column + public storage bucket.

alter table public.products
  add column if not exists image_url text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-photos',
  'product-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view product photos" on storage.objects;
create policy "Public can view product photos"
  on storage.objects
  for select
  using (bucket_id = 'product-photos');

drop policy if exists "Authenticated can upload product photos" on storage.objects;
create policy "Authenticated can upload product photos"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'product-photos');

drop policy if exists "Authenticated can update product photos" on storage.objects;
create policy "Authenticated can update product photos"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'product-photos')
  with check (bucket_id = 'product-photos');
