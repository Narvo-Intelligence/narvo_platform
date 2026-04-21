import Link from "next/link";
import { getDocsHomeUrl } from "@/lib/docs";

export function LandingClosingCta() {
  return (
    <section className="land-close" aria-labelledby="land-close-title">
      <div className="land-close__bg" aria-hidden="true">
        <div className="land-close__glow" />
      </div>
      <div className="land-close__inner">
        <h2 className="land-close__title" id="land-close-title">
          Ship audio news
          <br />
          <span className="land-close__grad">at platform scale</span>
        </h2>
        <p className="land-close__lede">
          1,000 free calls / month · sandbox + live keys · no card. The Developer tier stays free while you integrate.
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
          Powered by the Narvo Intelligence pipeline ·{" "}
          <a className="land-close__foot-link" href="https://narvo.news">
            narvo.news
          </a>
        </p>
      </div>
    </section>
  );
}
