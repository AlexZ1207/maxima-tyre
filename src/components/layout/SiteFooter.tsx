import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border/80 bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <Image
            src={asset(site.logoSrc)}
            alt=""
            width={80}
            height={80}
            className="size-16 rounded-full sm:size-20"
          />
          <div>
            <p className="font-heading text-lg tracking-[0.12em]">{site.brand}</p>
            <p className="mt-0.5 text-xs font-medium uppercase italic tracking-widest text-primary">
              {site.tagline}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="#shop" className="hover:text-foreground">
            Shop
          </Link>
          <Link href="#sizes" className="hover:text-foreground">
            Sizes
          </Link>
          <Link href="#faq" className="hover:text-foreground">
            FAQ
          </Link>
          <Link href="#contact" className="hover:text-foreground">
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
