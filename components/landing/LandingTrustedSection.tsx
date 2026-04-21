import { TrustedBar } from "@/components/landing/TrustedBar";

export function LandingTrustedSection() {
  return (
    <section className="land-trusted" aria-labelledby="land-trusted-title">
      <div className="land-trusted__inner">
        <h2 className="land-trusted__title" id="land-trusted-title">
          Teams shipping audio news
        </h2>
        <p className="land-trusted__lede">Publishers to telcos — same metered, versioned pipeline.</p>
      </div>
      <TrustedBar />
    </section>
  );
}
