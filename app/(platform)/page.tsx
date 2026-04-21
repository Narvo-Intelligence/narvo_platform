import { BrandReveal } from "@/components/landing/BrandReveal";
import { ElevateSection } from "@/components/landing/ElevateSection";
import { EnginesCatalog } from "@/components/landing/EnginesCatalog";
import { FeatureMatrix } from "@/components/landing/FeatureMatrix";
import { FeatureTriplet } from "@/components/landing/FeatureTriplet";
import { LandingHero } from "@/components/landing/LandingHero";
import { ScoreRings } from "@/components/landing/ScoreRings";
import { StartBanner } from "@/components/landing/StartBanner";
import { Testimonial } from "@/components/landing/Testimonial";
import { TrustedBar } from "@/components/landing/TrustedBar";
import { UseCaseSplit } from "@/components/landing/UseCaseSplit";

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <TrustedBar />
      <FeatureTriplet />
      <ElevateSection />
      <EnginesCatalog />
      <UseCaseSplit />
      <ScoreRings />
      <FeatureMatrix />
      <Testimonial />
      <StartBanner />
      <BrandReveal />
    </>
  );
}
