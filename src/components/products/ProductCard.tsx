import Link from "next/link";
import type { CatalogItem } from "@/types/catalog";
import { FadeIn, HoverLift } from "@/components/motion/FadeIn";
import { TireSilhouette } from "@/components/visuals/TireSilhouette";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mediaUrl } from "@/lib/asset";
import { cn } from "@/lib/utils";

const categoryLabel: Record<CatalogItem["category"], string> = {
  tire: "Caucho",
  tube: "Tripa",
  accessory: "Repuesto",
};

const accentClass: Record<CatalogItem["category"], string> = {
  tire: "text-brand",
  tube: "text-tread",
  accessory: "text-primary",
};

function formatPrice(value: number | null, prefix: string): string {
  if (value === null) {
    return "Consultar";
  }
  return `${prefix}${value.toFixed(2)}`;
}

interface ProductCardProps {
  product: CatalogItem;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <FadeIn delay={Math.min(index, 8) * 0.04}>
      <HoverLift className="h-full">
        <Card className="h-full overflow-hidden bg-card/80">
          <div className="relative flex h-52 items-center justify-center border-b border-border/60 bg-black/40">
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mediaUrl(product.imageUrl)}
                alt={product.name}
                className="h-full w-full object-contain p-3"
              />
            ) : (
              <TireSilhouette
                className={accentClass[product.category]}
                variant="card"
              />
            )}
          </div>
          <CardHeader>
            <Badge variant="secondary">{categoryLabel[product.category]}</Badge>
            <CardTitle className="mt-3 text-lg leading-snug">
              {product.name}
            </CardTitle>
            <CardDescription className="mt-2 font-mono text-xs">
              {product.sku}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {product.size ? (
                <span className="rounded-md border border-border/70 px-2 py-1 text-xs">
                  {product.size}
                </span>
              ) : null}
              {product.construction ? (
                <span className="rounded-md border border-border/70 px-2 py-1 text-xs">
                  {product.construction}
                </span>
              ) : null}
            </div>
            {product.fitment ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.fitment}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
              <p>
                <span className="text-muted-foreground">Mayor </span>
                <span className="font-heading text-lg">
                  {formatPrice(product.priceMayorBs, "Bs ")}
                </span>
              </p>
              <p>
                <span className="text-muted-foreground">Gran mayor </span>
                <span className="font-heading text-lg">
                  {formatPrice(product.priceGranMayorUsd, "$")}
                </span>
              </p>
            </div>
          </CardContent>
          <CardFooter className="border-t-0 bg-transparent">
            <Link
              href="/#contact"
              className={cn(buttonVariants({ size: "lg" }), "h-11 w-full")}
            >
              Consultar
            </Link>
          </CardFooter>
        </Card>
      </HoverLift>
    </FadeIn>
  );
}
