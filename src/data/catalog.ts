import type { CatalogCategory, CatalogFile, CatalogItem } from "@/types/catalog";
import catalogJson from "./catalog.json";

function isCategory(value: string): value is CatalogCategory {
  return value === "tire" || value === "tube" || value === "accessory";
}

export const catalog: CatalogFile = {
  ...catalogJson,
  items: catalogJson.items.map((item): CatalogItem => ({
    ...item,
    category: isCategory(item.category) ? item.category : "accessory",
    isPublished: "isPublished" in item ? Boolean(item.isPublished) : true,
    imageUrl:
      "imageUrl" in item && typeof item.imageUrl === "string"
        ? item.imageUrl
        : null,
  })),
};
