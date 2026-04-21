import Link from "next/link";
import { getDocsHomeUrl } from "@/lib/docs";
import { APIS } from "@/lib/fixtures";
import { highlightCurl, syntaxHighlight } from "@/lib/syntax";

const REQUEST = `curl -X POST https://api.narvo.news/v1/synthesis \\
  -H "Authorization: Bearer nrv_sk_live_a3f8c2..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://punchng.com/fg-fuel-subsidy",
    "language": "pcm",
    "include_audio": true
  }'`;

const RESPONSE = {
  story_id: "a3f8c2e1-7b9d-4e2a-8f1c-6d5a2b1e9c8f",
  narrative:
    "The Federal Government don announce say fuel subsidy go return next month...",
  key_takeaways: ["Fuel subsidy return scheduled for next month", "Target: low-income households across 36 states"],
  source_attribution: ["Punch NG", "Vanguard", "Channels TV"],
  language: "pcm",
  audio_url: "https://cdn.narvo.news/audio/a3f8c2/pcm/wura.mp3",
  provenance: {
    source_count: 4,
    corroboration_level: "strong_consensus",
    consensus_score: 0.91,
  },
  latency_ms: 2412,
  request_id: "req_01HN8VXQ4K2B7M9P3R5T6W8Y0Z",
};

function ApiChip({ title, verb, verbClass }: { title: string; verb: string; verbClass: string }) {
  return (
    <li className="lh-api-chip">
      <span className={`lh-api-chip__dot verb verb--${verbClass}`}>{verb}</span>
      <span className="lh-api-chip__label">{title}</span>
    </li>
  );
}

export function LandingHero() {
  const heroApis = APIS.slice(0, 6);

  return (
    <section className="lh lh--supa" aria-labelledby="lh-title">
      <div className="lh__stack">
        <p className="lh__announcer">
          <Link className="lh__announcer-link" href="/playground/">
            Playground v1 beta
          </Link>
          <span className="lh__announcer-sep" aria-hidden="true">
            ·
          </span>
          <span>Try synthesis + TTS with a sandbox key</span>
        </p>

        <h1 className="lh__title" id="lh-title">
          <span className="lh__title-line">Ship audio news</span>
          <span className="lh__title-line lh__title-line--grad">at platform scale</span>
        </h1>

        <p className="lh__lede">
          Narvo Platform is the broadcast intelligence API — narrative synthesis, culturally authentic TTS, provenance
          scoring, translation, and briefings. Versioned under <code className="lh__code">/v1/</code>, bearer-auth&apos;d,
          metered per tenant, with edge latency tuned for West Africa.
        </p>

        <div className="lh__ctas">
          <Link className="btn btn--primary btn--lg" href="/signup/">
            Start your project <span aria-hidden="true">→</span>
          </Link>
          <a className="btn btn--ghost btn--lg" href={getDocsHomeUrl()}>
            Documentation
          </a>
        </div>

        <p className="lh__fineprint">1,000 free calls/month · sandbox + live keys · no card</p>

        <ul className="lh__apis" aria-label="API products">
          {heroApis.map((a) => (
            <ApiChip key={a.key} title={a.title} verb={a.verb} verbClass={a.verbClass} />
          ))}
        </ul>
      </div>

      <div className="lh__demo">
        <div className="code-split code-split--hero">
          <article className="code-panel code-panel--req">
            <header className="code-panel__head">
              <span className="verb verb--post">POST</span>
              <code className="code-panel__path">/v1/synthesis</code>
              <span className="code-panel__tag">cURL</span>
            </header>
            <pre className="code-panel__body">
              <code dangerouslySetInnerHTML={{ __html: highlightCurl(REQUEST) }} />
            </pre>
          </article>

          <div className="code-split__bridge" aria-hidden="true">
            <svg viewBox="0 0 48 24" fill="none">
              <path
                d="M1 12 H42 M36 5 L42 12 L36 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <article className="code-panel code-panel--res">
            <header className="code-panel__head">
              <span className="pill pill--ok">
                <span className="dot dot--ok" />
                200 OK
              </span>
              <span className="code-panel__latency">2.41s · edge-LOS</span>
              <span className="code-panel__tag">JSON</span>
            </header>
            <pre className="code-panel__body">
              <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(RESPONSE) }} />
            </pre>
          </article>
        </div>
      </div>
    </section>
  );
}
