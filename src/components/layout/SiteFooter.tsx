"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative z-10 border-t border-border/80 bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-heading text-lg tracking-[0.12em]">{site.brand}</p>
          <p className="mt-0.5 text-xs font-medium uppercase italic tracking-widest text-primary">
            {site.tagline}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <Link href="/products" className="hover:text-foreground">
            Tires
          </Link>
          <Link href="/#contact" className="hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {site.brand}. Not a real storefront.
      </div>
    </footer>
  );
}
