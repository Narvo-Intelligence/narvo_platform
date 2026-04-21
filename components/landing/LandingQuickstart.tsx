"use client";

import Link from "next/link";
import { getDocsHomeUrl } from "@/lib/docs";
import { highlightCurl } from "@/lib/syntax";

const SNIPPET = `curl -sS -X POST https://api.narvo.news/v1/synthesis \\
  -H "Authorization: Bearer $NARVO_SK" \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://example.com/story","language":"en"}'`;

export function LandingQuickstart() {
  return (
    <section className="land-qs land-qs--motion" aria-labelledby="land-qs-title">
      <div className="land-qs__inner">
        <div className="land-qs__copy">
          <h2 className="land-qs__title" id="land-qs-title">
            First call in minutes
          </h2>
          <p className="land-qs__lede">
            Create a sandbox key in the dashboard, send a bearer header, then call <code>/v1/synthesis</code>. The
            playground mirrors production fixtures.
          </p>
          <div className="land-qs__links">
            <Link className="land-qs__link" href="/playground/">
              Playground <span aria-hidden="true">→</span>
            </Link>
            <Link className="land-qs__link" href="/dashboard/">
              Dashboard <span aria-hidden="true">→</span>
            </Link>
            <a className="land-qs__link land-qs__link--ghost" href={getDocsHomeUrl()}>
              More examples
            </a>
          </div>
        </div>
        <div className="land-qs__terminal">
          <div className="land-qs__chrome">
            <span className="land-qs__dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="land-qs__tab">terminal</span>
          </div>
          <pre className="land-qs__code">
            <code dangerouslySetInnerHTML={{ __html: highlightCurl(SNIPPET) }} />
          </pre>
        </div>
      </div>
    </section>
  );
}
