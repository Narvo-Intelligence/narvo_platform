"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { observeRevealAll } from "@/lib/observers/reveal";
import type { ApiProduct } from "@/lib/fixtures";
import { APIS } from "@/lib/fixtures";

const SAMPLES: Record<string, string> = {
  synthesis: `{ "url": "punchng.com/story", "language": "pcm" }`,
  tts: `{ "text": "Ẹ káàárọ̀", "voice": "idera" }`,
  provenance: `{ "text": "CBN raises rate to 27.5%" }`,
  translate: `{ "text": "Policy takes effect Friday", "target": "yo" }`,
  briefing: `{ "date": "2026-04-20", "language": "en" }`,
  realtime: `events: breaking-news, story:published`,
};

function EngineCard({ api, i }: { api: ApiProduct; i: number }) {
  const future = !!api.future;
  const statusLabel = future ? "Ships post-funding" : "Live";
  const statusClass = future ? "engine__status engine__status--future" : "engine__status engine__status--live";
  const sample = SAMPLES[api.key] ?? "";

  return (
    <article className={`engine${future ? " engine--future" : ""}`} data-engine={api.key}>
      <div className="engine__top">
        <span className="engine__num">{String(i + 1).padStart(2, "0")}</span>
        <span className={statusClass}>
          <span className={`dot ${future ? "dot--idle" : "dot--ok"}`} aria-hidden="true" />
          {statusLabel}
        </span>
      </div>

      <h3 className="engine__title">{api.title}</h3>
      <p className="engine__desc">{api.desc}</p>

      <div className="engine__endpoint">
        <span className={`verb verb--${api.verbClass}`}>{api.verb}</span>
        <code>{api.endpoint}</code>
      </div>

      {sample ? (
        <pre className="engine__sample">
          <code>{sample}</code>
        </pre>
      ) : null}

      <dl className="engine__meta">
        <div>
          <dt>Tier</dt>
          <dd>{api.tier}</dd>
        </div>
        <div>
          <dt>{future ? "Ship" : "SLA"}</dt>
          <dd>{api.latency}</dd>
        </div>
      </dl>

      <Link className="engine__cta" href={`/docs/#${api.key}`}>
        <span>View reference</span>
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export function EnginesCatalog() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) observeRevealAll(".engine", ref.current);
  }, []);

  return (
    <section ref={ref} className="engines" id="engines" aria-labelledby="engines-title">
      <div className="engines__inner">
        <header className="engines__head">
          <div className="engines__eyebrow">Product engines · v1</div>
          <h2 className="engines__title" id="engines-title">
            Six engines. One pipeline. <span className="engines__title-dim">Shipped or shipping.</span>
          </h2>
          <p className="engines__lede">
            Every engine is versioned under <code>/v1/</code>, auth&apos;d via bearer key, metered per tenant, and returns{" "}
            <code>request_id</code> &amp; <code>latency_ms</code> on every response. Where relevant, a{" "}
            <code>provenance</code> block comes standard.
          </p>
        </header>

        <div className="engines__grid">{APIS.map((api, i) => (
          <EngineCard key={api.key} api={api} i={i} />
        ))}</div>

        <footer className="engines__foot">
          <div className="engines__foot-note">
            <span className="dot dot--ok" aria-hidden="true" />
            <span>
              More engines on the roadmap —
              <span className="engines__foot-link"> Webhook delivery</span>,<span className="engines__foot-link"> Pocket TTS (Kyutai)</span>,
              <span className="engines__foot-link"> Provenance Analytics licensing</span>. See the{" "}
              <Link href="/docs/" className="engines__foot-link">
                full reference
              </Link>
              .
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
