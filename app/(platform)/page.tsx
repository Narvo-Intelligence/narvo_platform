import type { Metadata } from "next";

import { LandingBandStats } from "@/components/landing/LandingBandStats";
import { LandingBento } from "@/components/landing/LandingBento";
import { LandingClosingCta } from "@/components/landing/LandingClosingCta";
import { LandingGuarantees } from "@/components/landing/LandingGuarantees";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingQuickstart } from "@/components/landing/LandingQuickstart";
import { LandingStories } from "@/components/landing/LandingStories";
import { LandingTrustedSplit } from "@/components/landing/LandingTrustedSplit";
import { ROUTE_REGISTRY, createRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createRouteMetadata(ROUTE_REGISTRY.home);

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
