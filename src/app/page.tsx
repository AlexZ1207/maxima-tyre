import { Benefits } from "@/components/sections/Benefits";
import { CatalogTeaser } from "@/components/sections/CatalogTeaser";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10 bg-background">
        <TrustBar />
        <Benefits />
        <CatalogTeaser />
        <FaqSection />
        <FinalCta />
      </div>
    </>
  );
}
