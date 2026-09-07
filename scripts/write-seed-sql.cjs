const fs = require("fs");
const path = require("path");
const catalog = require("../src/data/catalog.json");

function esc(value) {
  return String(value ?? "").replace(/'/g, "''");
}

function num(value) {
  return value === null || value === undefined ? "NULL" : Number(value);
}

const rows = catalog.items.map((item) => {
  const published = item.isPublished === false ? "false" : "true";
  return `(${[
    `'${esc(item.id)}'`,
    `'${esc(item.sku)}'`,
    `'${esc(item.name)}'`,
    `'${esc(item.size)}'`,
    `'${esc(item.construction)}'`,
    `'${esc(item.category)}'`,
    `'${esc(item.fitment)}'`,
    num(item.priceMayorBs),
    num(item.priceGranMayorUsd),
    published,
  ].join(", ")})`;
});

const sql = `insert into public.products (
  id, sku, name, size, construction, category, fitment,
  price_mayor_bs, price_gran_mayor_usd, is_published
) values
${rows.join(",\n")}
on conflict (id) do update set
  sku = excluded.sku,
  name = excluded.name,
  size = excluded.size,
  construction = excluded.construction,
  category = excluded.category,
  fitment = excluded.fitment,
  price_mayor_bs = excluded.price_mayor_bs,
  price_gran_mayor_usd = excluded.price_gran_mayor_usd,
  is_published = excluded.is_published;
`;

fs.writeFileSync(path.join(__dirname, "..", "supabase", "seed.sql"), sql);
console.log(`Wrote ${rows.length} rows`);
