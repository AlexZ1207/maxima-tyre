import { site } from "@/data/site";
import { FadeIn, HoverLift } from "@/components/motion/FadeIn";
import { TireSilhouette } from "@/components/visuals/TireSilhouette";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const accentClass: Record<(typeof site.productLines)[number]["accent"], string> =
  {
    street: "text-brand",
    sport: "text-primary",
    adventure: "text-tread",
    touring: "text-sky-300",
  };

export function ProductLines() {
  return (
    <section id="shop" className="border-b border-border/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <FadeIn>
          <p className="text-sm font-medium uppercase tracking-widest text-brand">
            Catalog
          </p>
          <h2 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
            Four lines. One Maxima family.
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {site.productLines.map((line, index) => (
            <FadeIn key={line.id} delay={index * 0.06}>
              <HoverLift>
                <Card className="h-full cursor-default bg-card/80">
                  <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div>
                      <Badge variant="secondary">{line.badge}</Badge>
                      <CardTitle className="mt-3 text-xl">{line.name}</CardTitle>
                      <CardDescription className="mt-2 max-w-sm">
                        {line.description}
                      </CardDescription>
                    </div>
                    <TireSilhouette
                      className={accentClass[line.accent]}
                      variant="card"
                    />
                  </CardHeader>
                  <CardContent className="text-xs uppercase tracking-widest text-muted-foreground">
                    Placeholder product
                  </CardContent>
                </Card>
              </HoverLift>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
