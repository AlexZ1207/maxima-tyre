export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  trustLine: string;
  /** Local path (`/hero.mp4`) or a direct MP4 URL. Swap when you have brand footage. */
  backgroundVideo: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Partner {
  name: string;
}

export type BenefitIconName = "droplets" | "gauge" | "shield";

export interface Benefit {
  icon: BenefitIconName;
  title: string;
  description: string;
}

export interface ProductLine {
  id: string;
  name: string;
  badge: string;
  description: string;
  accent: "street" | "sport" | "adventure" | "touring";
}

export interface TireSize {
  size: string;
  fit: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  hours: string;
}

export interface SiteContent {
  brand: string;
  tagline: string;
  logoSrc: string;
  hero: HeroContent;
  stats: Stat[];
  partners: Partner[];
  benefits: Benefit[];
  productLines: ProductLine[];
  sizes: TireSize[];
  plans: PricingPlan[];
  faqs: FaqItem[];
  contact: ContactInfo;
}
