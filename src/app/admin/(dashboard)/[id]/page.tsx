import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(decodeURIComponent(id));
  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="font-heading text-3xl tracking-tight">Edit product</h1>
      <p className="mt-2 mb-8 font-mono text-sm text-muted-foreground">
        {product.sku}
      </p>
      <ProductForm product={product} />
    </main>
  );
}
