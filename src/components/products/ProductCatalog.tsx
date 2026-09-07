"use client";

import { useMemo, useState } from "react";
import { Phone } from "lucide-react";
import type { CatalogItem } from "@/types/catalog";
import { ProductCard } from "@/components/products/ProductCard";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { matchesQuery, phoneLinks, sizesMatch, tireSizesFrom } from "@/lib/tire-size";
import { cn } from "@/lib/utils";

interface ProductCatalogProps {
  products: CatalogItem[];
  phone: string;
}

export function ProductCatalog({ products, phone }: ProductCatalogProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [construction, setConstruction] = useState("");
  const [query, setQuery] = useState("");
  const [browseAll, setBrowseAll] = useState(false);

  const sizes = useMemo(() => tireSizesFrom(products), [products]);
  const constructions = useMemo(() => {
    const values = new Set(
      products
        .map((item) => item.construction.trim().toUpperCase())
        .filter((value) => value === "TT" || value === "TL")
    );
    return [...values].sort();
  }, [products]);

  const hasCriteria = Boolean(
    selectedSize || construction || query.trim() || browseAll
  );

  const visible = useMemo(() => {
    if (!hasCriteria) {
      return [];
    }
    return products.filter((product) => {
      if (selectedSize && !sizesMatch(product.size, selectedSize)) {
        return false;
      }
      if (
        construction &&
        product.construction.trim().toUpperCase() !== construction
      ) {
        return false;
      }
      if (
        query.trim() &&
        !matchesQuery(
          `${product.name} ${product.sku} ${product.size} ${product.fitment}`,
          query
        )
      ) {
        return false;
      }
      return true;
    });
  }, [construction, hasCriteria, products, query, selectedSize]);

  const links = phoneLinks(phone);

  function pickSize(size: string) {
    setSelectedSize(size);
    setBrowseAll(false);
  }

  function showAll() {
    setSelectedSize("");
    setConstruction("");
    setQuery("");
    setBrowseAll(true);
  }

  function reset() {
    setSelectedSize("");
    setConstruction("");
    setQuery("");
    setBrowseAll(false);
  }

  return (
    <section id="shop" className="border-b border-border/60">
      <div id="sizes" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <p className="text-sm font-medium uppercase tracking-widest text-brand">
          Catalogo
        </p>
        <h1 className="mt-2 font-heading text-4xl tracking-tight sm:text-5xl">
          Encuentra tu caucho
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Elige la medida del costado del caucho. Si no la tenemos en sistema,
          llama y confirmamos disponibilidad.
        </p>

        <div className="mt-8 grid gap-4 rounded-2xl border border-border/70 bg-card/40 p-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="space-y-1.5 text-sm font-medium">
            Medida
            <select
              value={selectedSize}
              onChange={(event) => pickSize(event.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-card px-2.5 text-sm font-normal text-foreground"
            >
              <option value="">Selecciona una medida</option>
              {sizes.map((item) => (
                <option key={item.size} value={item.size}>
                  {item.size} ({item.count})
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1.5 text-sm font-medium">
            TT / TL
            <select
              value={construction}
              onChange={(event) => {
                setConstruction(event.target.value);
                if (event.target.value) {
                  setBrowseAll(false);
                }
              }}
              className="h-11 w-full rounded-lg border border-input bg-card px-2.5 text-sm font-normal text-foreground"
            >
              <option value="">Cualquiera</option>
              {constructions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1.5 text-sm font-medium sm:col-span-2 lg:col-span-1">
            Moto o codigo
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                if (event.target.value.trim()) {
                  setBrowseAll(false);
                }
              }}
              placeholder="YBR, GN125, PG60…"
              className="h-11 bg-card text-foreground"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={showAll}
            className={cn(
              buttonVariants({
                variant: browseAll && !selectedSize ? "default" : "outline",
                size: "lg",
              }),
              "h-10"
            )}
          >
            Ver todos
          </button>
          {hasCriteria ? (
            <button
              type="button"
              onClick={reset}
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-10")}
            >
              Limpiar
            </button>
          ) : null}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {sizes.map((item) => (
            <button
              key={item.size}
              type="button"
              onClick={() => pickSize(item.size)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left transition-colors",
                selectedSize === item.size
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/70 bg-background/60 hover:border-primary/60"
              )}
            >
              <p className="font-heading text-lg tracking-wide">{item.size}</p>
              <p
                className={cn(
                  "mt-1 text-xs",
                  selectedSize === item.size
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                )}
              >
                {item.count} referencia{item.count === 1 ? "" : "s"}
              </p>
            </button>
          ))}
        </div>

        {!hasCriteria ? (
          <p className="mt-8 rounded-xl border border-dashed border-border/70 bg-card/30 px-4 py-6 text-sm text-muted-foreground">
            Lee la medida en el costado del caucho y seleccionala arriba.
          </p>
        ) : visible.length > 0 ? (
          <>
            <p className="mt-8 text-sm text-muted-foreground">
              {visible.length} caucho{visible.length === 1 ? "" : "s"}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {visible.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-border/70 bg-card/50 p-6 sm:p-8">
            <h2 className="font-heading text-2xl tracking-tight">
              No tenemos esa medida en sistema
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Puede que igual la consigamos. Llama o escribe por WhatsApp y
              confirmamos.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={links.tel}
                className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
              >
                <Phone className="size-4" />
                Llamar {phone}
              </a>
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 px-5"
                )}
              >
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
