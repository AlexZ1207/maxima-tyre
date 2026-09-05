"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled
          ? "border-border/80 bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background/50"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="#top" className="flex flex-col justify-center">
          <span className="font-heading text-lg font-semibold tracking-[0.14em] leading-none sm:text-xl">
            {site.brand}
          </span>
          <span className="mt-1 text-[11px] font-medium uppercase italic tracking-widest text-primary">
            {site.tagline}
          </span>
        </Link>
        <Link
          href={site.hero.primaryCta.href}
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-10 px-5 text-sm font-semibold"
          )}
        >
          {site.hero.primaryCta.label}
        </Link>
      </div>
    </header>
  );
}
