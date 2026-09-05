import Image from "next/image";
import { asset } from "@/lib/asset";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size: number;
  className?: string;
  decorative?: boolean;
}

export function BrandLogo({ size, className, decorative = false }: BrandLogoProps) {
  return (
    <Image
      src={asset(site.logoSrc)}
      alt={decorative ? "" : site.brand}
      width={size}
      height={size}
      className={cn("rounded-full", className)}
      priority={size >= 120}
    />
  );
}
