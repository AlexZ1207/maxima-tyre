import Link from "next/link";
import { HideProductButton } from "@/components/admin/HideProductButton";
import { getAllProducts } from "@/lib/catalog";
import { mediaUrl } from "@/lib/asset";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="font-heading text-3xl tracking-tight">Products</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {products.length} items. Hidden products stay in this list but not on
        the public catalog.
      </p>
      <div className="mt-8 overflow-x-auto rounded-xl border border-border/70">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="border-b border-border/70 bg-card/50 text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Photo</th>
              <th className="px-3 py-2 font-medium">Product</th>
              <th className="px-3 py-2 font-medium">Mayor Bs</th>
              <th className="px-3 py-2 font-medium">Gran mayor $</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border/50">
                <td className="px-3 py-3">
                  {product.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={mediaUrl(product.imageUrl)}
                      alt=""
                      className="size-14 rounded-md object-cover bg-black/40"
                    />
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-3 py-3">
                  <p className="font-medium">{product.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {product.sku}
                  </p>
                </td>
                <td className="px-3 py-3">
                  {product.priceMayorBs === null
                    ? "—"
                    : product.priceMayorBs.toFixed(2)}
                </td>
                <td className="px-3 py-3">
                  {product.priceGranMayorUsd === null
                    ? "—"
                    : product.priceGranMayorUsd.toFixed(2)}
                </td>
                <td className="px-3 py-3">
                  {product.isPublished ? "Published" : "Hidden"}
                </td>
                <td className="px-3 py-3">
                  <div className="flex justify-end gap-2">
                    <HideProductButton
                      id={product.id}
                      isPublished={product.isPublished}
                    />
                    <Link
                      href={`/admin/${encodeURIComponent(product.id)}`}
                      className="rounded-md px-2 py-1 text-sm text-brand hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
