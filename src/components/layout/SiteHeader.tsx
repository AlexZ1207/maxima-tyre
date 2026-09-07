"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Tires" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isAdmin) {
    return null;
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled || !isHome
          ? "border-border/80 bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background/50"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex flex-col justify-center">
          <span className="font-heading text-lg font-semibold tracking-[0.14em] leading-none sm:text-xl">
            {site.brand}
          </span>
          <span className="mt-1 text-[11px] font-medium uppercase italic tracking-widest text-primary">
            {site.tagline}
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith("/products");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-2 py-1 text-sm sm:px-3",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/products"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-10 px-4 text-sm font-semibold sm:px-5"
            )}
          >
            Shop tires
          </Link>
        </nav>
      </div>
    </header>
  );
}
