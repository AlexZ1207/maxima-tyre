import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="font-heading text-3xl tracking-tight">Add product</h1>
      <p className="mt-2 mb-8 text-sm text-muted-foreground">
        New items are published by default. Uncheck that box to keep them off
        the public catalog.
      </p>
      <ProductForm />
    </main>
  );
}
