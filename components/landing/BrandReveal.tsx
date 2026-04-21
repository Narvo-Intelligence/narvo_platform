import Link from "next/link";

export function BrandReveal() {
  return (
    <section className="brand-reveal" aria-label="Powered by Narvo Intelligence">
      <div className="brand-reveal__inner">
        <div className="brand-reveal__eyebrow">
          <span className="dot dot--ok" aria-hidden="true" />
          Powered by the Narvo Intelligence pipeline
        </div>
        <p className="brand-reveal__tag">
          The same engine that ships audio news to Lagos every morning, monetised at scale. Narvo News proves the model.
          Narvo Platform exposes it as infrastructure.
        </p>
        <Link className="brand-reveal__wordmark" href="https://narvo.news" aria-label="Visit Narvo News">
          <span className="brand-reveal__word" aria-hidden="true">
            NARVO
          </span>
          <span className="brand-reveal__word brand-reveal__word--sub" aria-hidden="true">
            intelligence
          </span>
        </Link>
      </div>
    </section>
  );
}
