import type { Metadata } from "next";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { FinalCta } from "@/components/sections/FinalCta";
import { site } from "@/data/site";
import { getPublishedProducts } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tires — MAXIMA TYRE",
  description:
    "Busca cauchos Maxima Tyre por medida. Si no esta en sistema, llama y confirmamos.",
};

export default async function ProductsPage() {
  const products = await getPublishedProducts();

  return (
    <div className="relative z-10 bg-background">
      <ProductCatalog products={products} phone={site.contact.phone} />
      <FinalCta />
    </div>
  );
}
