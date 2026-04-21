import Link from "next/link";
import { getDocsHomeUrl } from "@/lib/docs";

export function ClosingCta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__inner">
        <h2 className="cta__title" id="cta-title">
          Five minutes from signup
          <span className="cta__title-dim">
            {" "}
            to first <span className="cta__accent">200 OK</span>.
          </span>
        </h2>
        <p className="cta__lede">
          Signup → email verify → key issued → first call in the playground. No sales gate. No manual approval for the
          Developer tier. No per-seat pricing, ever.
        </p>
        <div className="cta__actions">
          <Link className="btn btn--primary btn--lg" href="/signup/">
            Get API key <span aria-hidden="true">→</span>
          </Link>
          <Link className="btn btn--ghost btn--lg" href="/dashboard/">
            Dashboard
          </Link>
          <a className="btn btn--ghost btn--lg" href={getDocsHomeUrl()}>
            Read the docs
          </a>
        </div>
        <pre className="cta__snippet">
          <code>
            $ curl -H &quot;Authorization: Bearer <span className="mono--accent">nrv_sk_test_...</span>&quot; \\
            {"\n"}
            {"  "}https://api.narvo.news/v1/synthesis \\
            {"\n"}
            {"  "}-d &apos;&#123;&quot;url&quot;:&quot;https://punchng.com/example&quot;,&quot;language&quot;:&quot;pcm&quot;&#125;&apos;
          </code>
        </pre>
      </div>
    </section>
  );
}
