import { LandingBento } from "@/components/landing/LandingBento";
import { LandingClosingCta } from "@/components/landing/LandingClosingCta";
import { LandingGuarantees } from "@/components/landing/LandingGuarantees";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingPlatformBand } from "@/components/landing/LandingPlatformBand";
import { LandingProductPreview } from "@/components/landing/LandingProductPreview";
import { LandingQuickstart } from "@/components/landing/LandingQuickstart";
import { LandingStackStrip } from "@/components/landing/LandingStackStrip";
import { LandingStatsBar } from "@/components/landing/LandingStatsBar";
import { LandingStories } from "@/components/landing/LandingStories";
import { LandingTrustedSection } from "@/components/landing/LandingTrustedSection";

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <LandingStackStrip />
      <LandingBento />
      <LandingPlatformBand />
      <LandingStatsBar />
      <LandingTrustedSection />
      <LandingStories />
      <LandingQuickstart />
      <LandingProductPreview />
      <LandingGuarantees />
      <LandingClosingCta />
    </>
  );
}
