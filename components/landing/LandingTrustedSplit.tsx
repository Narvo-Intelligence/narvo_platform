import { TrustedBar } from "@/components/landing/TrustedBar";

export function LandingTrustedSplit() {
  return (
    <section className="land-trusted-split" aria-labelledby="land-trusted-split-title">
      <div className="land-trusted-split__grid">
        <div className="land-trusted-split__copy">
          <h2 className="land-trusted-split__title" id="land-trusted-split-title">
            Teams shipping audio news
          </h2>
          <p className="land-trusted-split__lede">
            From publishers to telcos — same versioned contract, metering, and audit trail.
          </p>
        </div>
        <TrustedBar embedded />
      </div>
    </section>
  );
}
