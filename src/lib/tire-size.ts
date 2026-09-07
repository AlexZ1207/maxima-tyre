import type { CatalogItem } from "@/types/catalog";

export function normalizeSize(value: string): string {
  return value
    .toUpperCase()
    .replace(/,/g, ".")
    .replace(/(\d)H(\d)/g, "$1-$2")
    .replace(/\s+/g, "");
}

export function tireSizesFrom(products: CatalogItem[]) {
  const counts = new Map<string, number>();
  for (const item of products) {
    if (item.category !== "tire" || !item.size) {
      continue;
    }
    counts.set(item.size, (counts.get(item.size) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([size, count]) => ({ size, count }))
    .sort((a, b) => a.size.localeCompare(b.size, undefined, { numeric: true }));
}

export function sizesMatch(productSize: string, selectedSize: string): boolean {
  const product = normalizeSize(productSize);
  const selected = normalizeSize(selectedSize);
  return Boolean(product && selected && product === selected);
}

export function matchesQuery(haystack: string, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return true;
  }
  return haystack.toLowerCase().includes(needle);
}

export function phoneLinks(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const intl = digits.startsWith("0") ? `58${digits.slice(1)}` : digits;
  return {
    tel: `tel:+${intl}`,
    whatsapp: `https://wa.me/${intl}`,
  };
}
