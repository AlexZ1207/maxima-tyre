import { site } from "@/data/site";
import { FadeIn } from "@/components/motion/FadeIn";
import { Badge } from "@/components/ui/badge";

export function SizeFinder() {
  return (
    <section id="sizes" className="border-b border-border/60 bg-card/20">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <FadeIn>
          <p className="text-sm font-medium uppercase tracking-widest text-brand">
            Fitment
          </p>
          <h2 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
            Find your size
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Common motorcycle sizes as visual placeholders — not a live catalog
            API.
          </p>
        </FadeIn>
        <div className="mt-8 flex flex-wrap gap-3">
          {site.sizes.map((item) => (
            <FadeIn key={item.size}>
              <div className="rounded-xl border border-border/70 bg-background/60 px-4 py-3">
                <p className="font-heading text-lg tracking-wide">{item.size}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.fit}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="mt-6">
          <Badge variant="outline">Read the size on your current sidewall</Badge>
        </p>
      </div>
    </section>
  );
}
