import { ClosingCta } from "@/components/pricing/ClosingCta";
import { PricingGrid } from "@/components/pricing/PricingGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Four tiers — Developer free, Publisher $49/mo, Newsroom $199/mo, Enterprise from $499/mo. Transparent per-call overages.",
};

export default function PricingPage() {
  return (
    <>
      <section className="pricing-header">
        <div className="pricing-header__eyebrow">Pricing</div>
        <h1 className="pricing-header__title">Pay for what you ship.</h1>
        <p className="pricing-header__lede">
          Micro-billing built for African newsrooms. Start on the sandbox — no card. Upgrade when the calls start paying
          for themselves. No per-seat pricing, ever.
        </p>
      </section>

      <section className="section">
        <PricingGrid />
      </section>

      <section className="pricing-faq">
        <div>
          <h3>What&apos;s a &quot;call&quot;?</h3>
          <p>
            One API request to any endpoint. Synthesis-with-audio is billed as a single call; TTS is one call per
            language per story.
          </p>
        </div>
        <div>
          <h3>Do you meter sandbox keys?</h3>
          <p>
            Yes — sandbox keys are capped at 1,000 calls/month even on a paid plan, so test traffic can never surprise your
            invoice.
          </p>
        </div>
        <div>
          <h3>What payment methods are supported?</h3>
          <p>
            Stripe (international USD) for Publisher &amp; Newsroom. Paystack and Flutterwave for African media partners.
            NET-30 manual invoicing on Enterprise.
          </p>
        </div>
        <div>
          <h3>How does the SLA credit work?</h3>
          <p>
            For every hour of downtime beyond the tier SLA in a month, clients receive 1/720th of the monthly fee as credit
            against the next invoice.
          </p>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
