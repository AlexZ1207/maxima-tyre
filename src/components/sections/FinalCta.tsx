"use client";

import { FormEvent, useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { site } from "@/data/site";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function FinalCta() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="border-b border-border/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
        <FadeIn>
          <p className="text-sm font-medium uppercase tracking-widest text-brand">
            Talk to a specialist
          </p>
          <h2 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
            Ready when you have a size
          </h2>
          <p className="mt-4 text-muted-foreground">
            This form does not send anywhere. It is here so you can see the
            closing conversion block.
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
              {site.contact.address}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 text-brand" />
              {site.contact.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-4 text-brand" />
              {site.contact.email}
            </p>
            <p className="text-muted-foreground">{site.contact.hours}</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          {sent ? (
            <p className="rounded-xl border border-border bg-card p-8 text-sm">
              Thanks — this is a prototype confirmation. No email was sent.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-border bg-card/80 p-6">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm">
                  Name
                </label>
                <Input id="name" name="name" required className="h-11" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="h-11"
                />
              </div>
              <div>
                <label htmlFor="size" className="mb-1.5 block text-sm">
                  Tire size
                </label>
                <Input
                  id="size"
                  name="size"
                  placeholder="120/70 ZR17"
                  className="h-11"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm">
                  Message
                </label>
                <Textarea id="message" name="message" rows={4} />
              </div>
              <Button type="submit" size="lg" className="h-11 w-full font-semibold">
                Send
              </Button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
