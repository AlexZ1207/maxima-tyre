import { catalog } from "@/data/catalog";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CatalogCategory, CatalogItem } from "@/types/catalog";

export { tireSizesFrom } from "@/lib/tire-size";

const productColumns =
  "id, sku, name, size, construction, category, fitment, price_mayor_bs, price_gran_mayor_usd, is_published, image_url";

const productColumnsWithoutImage =
  "id, sku, name, size, construction, category, fitment, price_mayor_bs, price_gran_mayor_usd, is_published";

function missingImageColumn(message: string | undefined) {
  return Boolean(message?.includes("image_url") && message.includes("does not exist"));
}

export interface ProductRow {
  id: string;
  sku: string;
  name: string;
  size: string | null;
  construction: string | null;
  category: CatalogCategory;
  fitment: string | null;
  price_mayor_bs: number | string | null;
  price_gran_mayor_usd: number | string | null;
  is_published: boolean;
  image_url?: string | null;
}

function localPhoto(id: string): string | null {
  return catalog.items.find((item) => item.id === id)?.imageUrl ?? null;
}

function toNumber(value: number | string | null): number | null {
  if (value === null || value === "") {
    return null;
  }
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

export function mapProduct(row: ProductRow): CatalogItem {
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    size: row.size ?? "",
    construction: row.construction ?? "",
    category: row.category,
    fitment: row.fitment ?? "",
    priceMayorBs: toNumber(row.price_mayor_bs),
    priceGranMayorUsd: toNumber(row.price_gran_mayor_usd),
    isPublished: row.is_published,
    imageUrl: row.image_url || localPhoto(row.id),
  };
}

function isTire(item: CatalogItem) {
  return item.category === "tire";
}

function fallbackItems(publishedOnly: boolean): CatalogItem[] {
  return catalog.items
    .map((item) => ({
      ...item,
      isPublished: item.isPublished ?? true,
      imageUrl: item.imageUrl ?? null,
    }))
    .filter((item) => (publishedOnly ? item.isPublished : true));
}

export async function getPublishedProducts(): Promise<CatalogItem[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return fallbackItems(true).filter(isTire);
  }

  const withImage = await supabase
    .from("products")
    .select(productColumns)
    .eq("is_published", true)
    .eq("category", "tire")
    .order("name");

  const result = missingImageColumn(withImage.error?.message)
    ? await supabase
        .from("products")
        .select(productColumnsWithoutImage)
        .eq("is_published", true)
        .eq("category", "tire")
        .order("name")
    : withImage;

  if (result.error || !result.data) {
    console.error("Failed to load published products", result.error?.message);
    return fallbackItems(true).filter(isTire);
  }

  return result.data.map((row) => mapProduct(row as ProductRow)).filter(isTire);
}

export async function getAllProducts(): Promise<CatalogItem[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return fallbackItems(false);
  }

  const withImage = await supabase
    .from("products")
    .select(productColumns)
    .order("name");

  const result = missingImageColumn(withImage.error?.message)
    ? await supabase
        .from("products")
        .select(productColumnsWithoutImage)
        .order("name")
    : withImage;

  if (result.error || !result.data) {
    throw new Error(result.error?.message ?? "Could not load products");
  }

  return result.data.map((row) => mapProduct(row as ProductRow));
}

export async function getProductById(id: string): Promise<CatalogItem | null> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return fallbackItems(false).find((item) => item.id === id) ?? null;
  }

  const withImage = await supabase
    .from("products")
    .select(productColumns)
    .eq("id", id)
    .maybeSingle();

  const result = missingImageColumn(withImage.error?.message)
    ? await supabase
        .from("products")
        .select(productColumnsWithoutImage)
        .eq("id", id)
        .maybeSingle()
    : withImage;

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data ? mapProduct(result.data as ProductRow) : null;
}
