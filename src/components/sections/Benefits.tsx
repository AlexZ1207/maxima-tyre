import { Droplets, Gauge, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { BenefitIconName } from "@/types/content";
import { site } from "@/data/site";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const icons: Record<BenefitIconName, LucideIcon> = {
  droplets: Droplets,
  gauge: Gauge,
  shield: Shield,
};

export function Benefits() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <FadeIn>
          <p className="text-sm font-medium uppercase tracking-widest text-brand">
            Why riders switch
          </p>
          <h2 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
            Grip, rain, and miles
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {site.benefits.map((benefit, index) => {
            const Icon = icons[benefit.icon];
            return (
              <FadeIn key={benefit.title} delay={index * 0.08}>
                <Card className="h-full bg-card/80">
                  <CardHeader>
                    <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/50 text-brand">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {benefit.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
