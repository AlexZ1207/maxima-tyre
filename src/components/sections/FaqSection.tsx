"use client";

import { site } from "@/data/site";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section id="faq" className="border-b border-border/60">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <FadeIn>
          <p className="text-sm font-medium uppercase tracking-widest text-brand">
            FAQ
          </p>
          <h2 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
            Common questions
          </h2>
        </FadeIn>
        <FadeIn delay={0.08} className="mt-8">
          <Accordion>
            {site.faqs.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="py-4 text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
