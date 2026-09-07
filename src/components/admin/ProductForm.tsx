import type { ReactNode } from "react";
import type { CatalogItem } from "@/types/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updateProduct } from "@/app/admin/actions";
import { mediaUrl } from "@/lib/asset";

interface ProductFormProps {
  product?: CatalogItem;
}

export function ProductForm({ product }: ProductFormProps) {
  const action = product
    ? updateProduct.bind(null, product.id)
    : createProduct;

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <Input
            id="name"
            name="name"
            required
            className="h-10"
            defaultValue={product?.name}
          />
        </Field>
        <Field label="SKU" htmlFor="sku">
          <Input
            id="sku"
            name="sku"
            required
            className="h-10"
            defaultValue={product?.sku}
          />
        </Field>
        <Field label="Size" htmlFor="size">
          <Input
            id="size"
            name="size"
            className="h-10"
            defaultValue={product?.size}
          />
        </Field>
        <Field label="Construction (TT / TL)" htmlFor="construction">
          <Input
            id="construction"
            name="construction"
            className="h-10"
            defaultValue={product?.construction}
          />
        </Field>
        <Field label="Category" htmlFor="category">
          <select
            id="category"
            name="category"
            defaultValue={product?.category ?? "tire"}
            className="h-10 w-full rounded-lg border border-input bg-card px-2.5 text-sm text-foreground"
          >
            <option value="tire">Caucho</option>
            <option value="tube">Tripa</option>
            <option value="accessory">Repuesto</option>
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Mayor (Bs)" htmlFor="priceMayorBs">
            <Input
              id="priceMayorBs"
              name="priceMayorBs"
              type="number"
              step="0.01"
              className="h-10"
              defaultValue={product?.priceMayorBs ?? ""}
            />
          </Field>
          <Field label="Gran mayor ($)" htmlFor="priceGranMayorUsd">
            <Input
              id="priceGranMayorUsd"
              name="priceGranMayorUsd"
              type="number"
              step="0.01"
              className="h-10"
              defaultValue={product?.priceGranMayorUsd ?? ""}
            />
          </Field>
        </div>
      </div>
      <Field label="Fitment / aplica a moto" htmlFor="fitment">
        <Textarea
          id="fitment"
          name="fitment"
          rows={4}
          defaultValue={product?.fitment}
        />
      </Field>
      <div className="space-y-3 rounded-xl border border-border/70 p-4">
        <p className="text-sm font-medium">Photo</p>
        {product?.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mediaUrl(product.imageUrl)}
            alt=""
            className="h-40 w-full rounded-lg object-contain bg-black/40"
          />
        ) : (
          <p className="text-sm text-muted-foreground">No photo yet.</p>
        )}
        <Field label="Upload a photo" htmlFor="photo">
          <Input
            id="photo"
            name="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="h-10"
          />
        </Field>
        <Field label="Or paste an image URL" htmlFor="imageUrl">
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            className="h-10"
            defaultValue={product?.imageUrl ?? ""}
            placeholder="https://"
          />
        </Field>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={product?.isPublished ?? true}
          className="size-4 accent-primary"
        />
        Published on the public catalog
      </label>
      <Button type="submit" size="lg" className="h-11 px-6">
        {product ? "Save changes" : "Add product"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
