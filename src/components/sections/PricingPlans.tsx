import Link from "next/link";
import { Check } from "lucide-react";
import { site } from "@/data/site";
import { FadeIn, HoverLift } from "@/components/motion/FadeIn";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PricingPlans() {
  return (
    <section id="plans" className="border-b border-border/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <FadeIn>
          <p className="text-sm font-medium uppercase tracking-widest text-brand">
            Pricing
          </p>
          <h2 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
            Placeholder plans
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {site.plans.map((plan, index) => (
            <FadeIn key={plan.id} delay={index * 0.08}>
              <HoverLift className="h-full">
                <Card
                  className={cn(
                    "h-full bg-card/80",
                    plan.highlighted && "ring-2 ring-primary"
                  )}
                >
                  <CardHeader>
                    {plan.highlighted ? (
                      <Badge className="w-fit">Most popular</Badge>
                    ) : null}
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <p className="font-heading text-4xl tracking-tight">
                      {plan.price}
                      <span className="ml-2 text-sm font-sans font-normal text-muted-foreground">
                        {plan.period}
                      </span>
                    </p>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="border-t-0 bg-transparent">
                    <Link
                      href={plan.id === "fleet" ? "#contact" : "#shop"}
                      className={cn(
                        buttonVariants({
                          variant: plan.highlighted ? "default" : "outline",
                          size: "lg",
                        }),
                        "h-11 w-full"
                      )}
                    >
                      {plan.cta}
                    </Link>
                  </CardFooter>
                </Card>
              </HoverLift>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
