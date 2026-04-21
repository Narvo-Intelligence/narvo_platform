import Link from "next/link";
import { getDocsHomeUrl } from "@/lib/docs";

export function LandingClosingCta() {
  return (
    <section className="land-close" aria-labelledby="land-close-title">
      <div className="land-close__inner">
        <h2 className="land-close__title" id="land-close-title">
          Ship audio news
          <br />
          <span className="land-close__muted">at platform scale</span>
        </h2>
        <p className="land-close__lede">
          1k free calls/mo · sandbox &amp; live keys · no card. Developer tier stays free while you ship.
        </p>
        <div className="land-close__ctas">
          <Link className="btn btn--primary btn--lg" href="/signup/">
            Start your project <span aria-hidden="true">→</span>
          </Link>
          <a className="btn btn--ghost btn--lg" href={getDocsHomeUrl()}>
            Documentation
          </a>
        </div>
        <p className="land-close__foot mono">
          Narvo Intelligence ·{" "}
          <a className="land-close__foot-link" href="https://narvo.news">
            narvo.news
          </a>
        </p>
      </div>
    </section>
  );
}
