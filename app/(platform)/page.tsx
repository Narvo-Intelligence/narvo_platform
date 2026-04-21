import { LandingBandStats } from "@/components/landing/LandingBandStats";
import { LandingBento } from "@/components/landing/LandingBento";
import { LandingClosingCta } from "@/components/landing/LandingClosingCta";
import { LandingGuarantees } from "@/components/landing/LandingGuarantees";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingQuickstart } from "@/components/landing/LandingQuickstart";
import { LandingStories } from "@/components/landing/LandingStories";
import { LandingTrustedSplit } from "@/components/landing/LandingTrustedSplit";

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <LandingBento />
      <LandingBandStats />
      <LandingTrustedSplit />
      <LandingStories />
      <LandingQuickstart />
      <LandingGuarantees />
      <LandingClosingCta />
    </>
  );
}
