import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { buttonVariants } from "@/components/ui/button";
import { getPublishedProducts } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export async function CatalogTeaser() {
  const products = await getPublishedProducts();
  const tireCount = products.filter((item) => item.category === "tire").length;

  return (
    <section className="border-b border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center">
        <FadeIn>
          <p className="text-sm font-medium uppercase tracking-widest text-brand">
            Catalogo
          </p>
          <h2 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
            {tireCount} cauchos Maxima
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Elige tu medida y mira lo que hay en sistema. Si no aparece, llama
            y confirmamos.
          </p>
        </FadeIn>
        <Link
          href="/products"
          className={cn(buttonVariants({ size: "lg" }), "h-12 px-6 font-semibold")}
        >
          Ver cauchos
        </Link>
      </div>
    </section>
  );
}
