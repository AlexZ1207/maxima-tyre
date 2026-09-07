import Link from "next/link";
import { Star } from "lucide-react";
import { asset } from "@/lib/asset";
import { site } from "@/data/site";
import { FadeIn } from "@/components/motion/FadeIn";
import { HeroBackgroundVideo } from "@/components/sections/HeroBackgroundVideo";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Hero() {
  const { hero } = site;

  return (
    <section id="top" className="relative min-h-[92vh] border-b border-border/60">
      <HeroBackgroundVideo src={asset(hero.backgroundVideo)} />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center px-4 py-16 sm:px-6 lg:py-24">
        <FadeIn className="max-w-2xl">
          <Badge variant="secondary" className="mb-4 font-normal">
            {hero.eyebrow}
          </Badge>
          <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.subheadline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={hero.primaryCta.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 w-full px-6 text-base font-semibold sm:w-auto"
              )}
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 w-full bg-background/40 px-6 text-base sm:w-auto"
              )}
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="size-4 fill-primary text-primary" />
            {hero.trustLine}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
