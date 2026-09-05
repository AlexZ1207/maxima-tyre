import type { SiteContent } from "@/types/content";

export const site: SiteContent = {
  brand: "MAXIMA TYRE",
  tagline: "Uniendo caminos",
  logoSrc: "/maxima-tyre-logo.png",
  hero: {
    eyebrow: "Maxima Tyre · motorcycle tires",
    headline: "Grip you can feel at every lean",
    subheadline:
      "Street, sport, adventure, and touring compounds engineered for wet roads, long miles, and confident corners. Swap this copy when the real product is ready.",
    primaryCta: { label: "Shop tires", href: "#shop" },
    secondaryCta: { label: "Find your size", href: "#sizes" },
    trustLine: "4.8★ from 12,400 placeholder rider reviews",
    backgroundVideo: "/hero.mp4",
  },
  stats: [
    { value: "180k+", label: "Riders fitted" },
    { value: "42", label: "Countries shipped" },
    { value: "5 yr", label: "Tread warranty" },
    { value: "24h", label: "Fitment replies" },
  ],
  partners: [
    { name: "Partner logo" },
    { name: "Partner logo" },
    { name: "Partner logo" },
    { name: "Partner logo" },
    { name: "Partner logo" },
  ],
  benefits: [
    {
      icon: "droplets",
      title: "Wet-weather bite",
      description:
        "Siped tread channels water so you keep a planted contact patch when the road films over.",
    },
    {
      icon: "gauge",
      title: "Stability at speed",
      description:
        "A stiff carcass and balanced profile keep the bike calm in sweepers and on the highway.",
    },
    {
      icon: "shield",
      title: "Miles that last",
      description:
        "Dual-compound shoulders wear slower on commute days without giving up weekend grip.",
    },
  ],
  productLines: [
    {
      id: "street",
      name: "Maxima Street",
      badge: "Daily",
      description:
        "All-rounder for city and weekend roads. Predictable lean, quiet ride, easy warm-up.",
      accent: "street",
    },
    {
      id: "sport",
      name: "Maxima Sport",
      badge: "Track days",
      description:
        "Sticky shoulders for canyon and circuit. Quick turn-in with a race-inspired profile.",
      accent: "sport",
    },
    {
      id: "adventure",
      name: "Maxima Adventure",
      badge: "50/50",
      description:
        "Cut blocks for dirt and tarmac. Built for loaded bikes and mixed surfaces.",
      accent: "adventure",
    },
    {
      id: "touring",
      name: "Maxima Touring",
      badge: "Distance",
      description:
        "High-mileage touring carcass for two-up trips. Stable, even wear, rain-ready.",
      accent: "touring",
    },
  ],
  sizes: [
    { size: "120/70 ZR17", fit: "Front · sport / street" },
    { size: "180/55 ZR17", fit: "Rear · sport / street" },
    { size: "110/80 R19", fit: "Front · adventure" },
    { size: "150/70 R17", fit: "Rear · adventure" },
    { size: "120/70 ZR18", fit: "Front · touring" },
    { size: "190/55 ZR17", fit: "Rear · sport plus" },
  ],
  plans: [
    {
      id: "pair",
      name: "Single pair",
      price: "$289",
      period: "front + rear",
      description: "One matched set. Placeholder street pricing.",
      features: [
        "Free size check",
        "Standard shipping",
        "5-year tread warranty",
      ],
      cta: "Shop tires",
      highlighted: false,
    },
    {
      id: "track",
      name: "Track pack",
      price: "$419",
      period: "sport compound",
      description: "Stickier set plus a spare rear. Placeholder.",
      features: [
        "Sport compound pair",
        "Spare rear included",
        "Priority shipping",
        "Fitment specialist call",
      ],
      cta: "Shop tires",
      highlighted: true,
    },
    {
      id: "fleet",
      name: "Fleet",
      price: "Custom",
      period: "shops & clubs",
      description: "Volume pricing for dealers and riding clubs.",
      features: [
        "Net-30 invoicing",
        "Mixed size pallets",
        "Dedicated account lead",
      ],
      cta: "Talk to a specialist",
      highlighted: false,
    },
  ],
  faqs: [
    {
      id: "fitment",
      question: "How do I know these tires fit my bike?",
      answer:
        "Match the size on your sidewall (for example 120/70 ZR17). This prototype does not look up a live catalog—use Find your size as a visual stand-in.",
    },
    {
      id: "wear",
      question: "How long does a set typically last?",
      answer:
        "Placeholder: street compounds often run 6,000–10,000 miles depending on load, pressure, and riding style. Sport compounds wear faster.",
    },
    {
      id: "wet",
      question: "Are they safe in the rain?",
      answer:
        "All Maxima lines are drawn as rain-capable street tires. Give them a few miles to warm, and replace if you see a wear bar.",
    },
    {
      id: "shipping",
      question: "Where do you ship?",
      answer:
        "Placeholder copy: continental US in 2–4 days, select countries in 7–12. Real rates come later.",
    },
    {
      id: "returns",
      question: "What if I order the wrong size?",
      answer:
        "Unmounted tires can be returned within 30 days. Mounted or ridden tires are excluded. This is prototype policy text.",
    },
  ],
  contact: {
    phone: "+1 (555) 010-4488",
    email: "hello@example.com",
    hours: "Mon–Sat, 9am–6pm",
  },
};
