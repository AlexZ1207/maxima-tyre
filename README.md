# MAXIMA TYRE

Marketing site for Maxima Tyre (motorcycle tires). Next.js, Tailwind, Framer Motion, and a Supabase-backed catalog.

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Supabase keys, the public catalog falls back to `src/data/catalog.json`. Admin sign-in needs the keys below.

## Hosting (Vercel Hobby)

1. Import this GitHub repo into [Vercel](https://vercel.com) (Hobby is free for this size of site).
2. Add environment variables (same values as `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy. The live URL will look like `https://maxima-tyre.vercel.app`.

Do not set `NEXT_PUBLIC_BASE_PATH`. GitHub Pages is no longer the host.

## Catalog admin (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run [`supabase/schema.sql`](supabase/schema.sql).
3. In **Project Settings → API**, copy the project URL and `anon` `public` key into `.env.local` and Vercel.
4. In **Authentication → Users**, add an admin user (email + password). That is who signs in at `/admin/login`.
5. Seed the 36 Excel SKUs once:

   ```bash
   # Service role key stays in .env.local only — never put it in Vercel.
   npm run seed-catalog
   ```

After the seed, change prices and SKUs at `/admin`. Excel is optional (`npm run import-catalog` still writes JSON if you need to re-seed).

`SUPABASE_SERVICE_ROLE_KEY` is only for local scripts. Do not add it to Vercel.

## Product photos

Photos live in a public Supabase Storage bucket named `product-photos`. From `/admin`, open a product and upload a JPG/PNG/WebP (or paste an image URL).

One-time setup:

1. Run [`supabase/add-image-url.sql`](supabase/add-image-url.sql) in the SQL editor.
2. `npm run setup-photos` (creates the storage bucket).

## Excel (optional seed)

The original list lives in `data/catalogo-maxima-tyre.xlsx`.

```bash
npm run import-catalog
npm run extract-photos
npm run seed-catalog
```

`extract-photos` pulls the embedded cell images from the WeChat Excel (or the copy in `data/`) into `public/catalog/` and sets `imageUrl` on each SKU. The Owen 12V 7A battery has no photo in that file.
