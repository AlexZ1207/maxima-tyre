import { Benefits } from "@/components/sections/Benefits";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { ProductLines } from "@/components/sections/ProductLines";
import { SizeFinder } from "@/components/sections/SizeFinder";
import { TrustBar } from "@/components/sections/TrustBar";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10 bg-background">
        <TrustBar />
        <Benefits />
        <ProductLines />
        <SizeFinder />
        <PricingPlans />
        <FaqSection />
        <FinalCta />
      </div>
    </>
  );
}
