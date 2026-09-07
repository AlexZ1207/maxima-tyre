export type CatalogCategory = "tire" | "tube" | "accessory";

export interface CatalogItem {
  id: string;
  sku: string;
  name: string;
  size: string;
  construction: string;
  category: CatalogCategory;
  fitment: string;
  priceMayorBs: number | null;
  priceGranMayorUsd: number | null;
  isPublished: boolean;
  imageUrl: string | null;
}

export interface CatalogFile {
  source: string;
  importedAt: string;
  address: string;
  phone: string;
  items: CatalogItem[];
}
