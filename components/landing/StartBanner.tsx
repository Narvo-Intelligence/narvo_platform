import Link from "next/link";

export function StartBanner() {
  return (
    <section className="start-banner" aria-labelledby="start-title">
      <div className="start-banner__bg" aria-hidden="true">
        <div className="start-banner__grid" />
        <div className="start-banner__glow" />
      </div>
      <div className="start-banner__inner">
        <h2 className="start-banner__title" id="start-title">
          Start broadcasting
          <br />
          with Narvo today.
        </h2>
        <p className="start-banner__lede">
          1,000 free calls / month · sandbox + live keys issued instantly · no card, no sales gate. The Developer tier is
          free forever.
        </p>
        <div className="start-banner__ctas">
          <Link className="btn btn--primary btn--lg" href="/signup/">
            Get API key <span aria-hidden="true">→</span>
          </Link>
          <Link className="btn btn--ghost btn--lg" href="/playground/">
            Try the playground
          </Link>
        </div>
        <div className="start-banner__tail mono">
          <span>
            $ curl -H &quot;Authorization: Bearer <span className="acc">nrv_sk_test_...</span>&quot; https://api.narvo.news/v1/synthesis
          </span>
        </div>
      </div>
    </section>
  );
}
