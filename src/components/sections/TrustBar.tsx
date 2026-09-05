import { site } from "@/data/site";
import { FadeIn } from "@/components/motion/FadeIn";

export function TrustBar() {
  return (
    <section className="border-b border-border/60 bg-card/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {site.stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.08}>
              <p className="font-heading text-3xl tracking-tight sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {site.partners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex h-12 min-w-[120px] items-center justify-center rounded-lg border border-border/70 bg-muted/40 px-4 text-xs uppercase tracking-widest text-muted-foreground"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
