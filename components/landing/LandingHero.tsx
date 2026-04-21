import Link from "next/link";
import { getDocsHomeUrl } from "@/lib/docs";
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

export function LandingHero() {
  return (
    <section className="lh" aria-labelledby="lh-title">
      <div className="lh__inner">
        <ol className="stepper" aria-label="Developer journey">
          <li className="stepper__item is-done">
            <span className="stepper__num">01</span>
            <span className="stepper__label">Signup</span>
          </li>
          <li className="stepper__link is-done" aria-hidden="true" />
          <li className="stepper__item is-active">
            <span className="stepper__num">02</span>
            <span className="stepper__label">Call</span>
          </li>
          <li className="stepper__link" aria-hidden="true" />
          <li className="stepper__item">
            <span className="stepper__num">03</span>
            <span className="stepper__label">Broadcast</span>
          </li>
        </ol>

        <h1 className="lh__title" id="lh-title">
          Build broadcast experiences
          <br />
          with <span className="lh__accent">the APIs</span> you love
        </h1>

        <p className="lh__lede">
          Narrative synthesis, five-language TTS, translation, and source provenance — the Narvo News pipeline,
          packaged as versioned REST. Plug it into your newsroom in one HTTP request.
        </p>

        <div className="lh__ctas">
          <Link className="btn btn--primary btn--lg" href="/signup/">
            Get API key <span aria-hidden="true">→</span>
          </Link>
          <a className="btn btn--ghost btn--lg" href={getDocsHomeUrl()}>
            Read the docs
          </a>
          <span className="lh__meta">free 1,000 calls/month · no card</span>
        </div>
      </div>

      <div className="lh__split">
        <div className="code-split">
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
