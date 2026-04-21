"use client";

import { useEffect, useRef } from "react";
import { getDocsFragmentUrl } from "@/lib/docs";
import { observeRevealAll } from "@/lib/observers/reveal";
import { APIS } from "@/lib/fixtures";

export function LandingBento() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) observeRevealAll(".bento-card", ref.current);
  }, []);

  const [synthesis, tts, provenance, translate, briefing, realtime] = APIS;

  return (
    <section ref={ref} id="engines" className="bento" aria-labelledby="bento-title">
      <div className="bento__inner">
        <header className="bento__head">
          <h2 className="bento__title" id="bento-title">
            Six engines, one <strong>versioned REST</strong> contract
          </h2>
          <p className="bento__lede">
            Bearer keys, <code className="bento__code">request_id</code> on responses, optional{" "}
            <code className="bento__code">provenance</code> — built for broadcast-scale workloads.
          </p>
        </header>

        <div className="bento__grid">
          <article className="bento-card bento-card--synthesis">
            <span className="bento-card__eyebrow">
              <span className="verb verb--post">{synthesis.verb}</span>
              <code>{synthesis.endpoint}</code>
            </span>
            <h3 className="bento-card__title">{synthesis.title}</h3>
            <p className="bento-card__body">{synthesis.desc}</p>
            <div className="bento-card__viz" aria-hidden="true">
              <div className="bento-viz bento-viz--doc" />
            </div>
            <a className="bento-card__link" href={getDocsFragmentUrl(synthesis.key)}>
              API reference <span aria-hidden="true">→</span>
            </a>
          </article>

          <article className="bento-card bento-card--tts">
            <span className="bento-card__eyebrow">
              <span className="verb verb--post">{tts.verb}</span>
              <code>{tts.endpoint}</code>
            </span>
            <h3 className="bento-card__title">{tts.title}</h3>
            <p className="bento-card__body">{tts.desc}</p>
            <div className="bento-card__tags">
              {tts.tags.slice(0, 5).map((t) => (
                <span key={typeof t === "string" ? t : t.label} className="bento-tag">
                  {typeof t === "string" ? t : t.label}
                </span>
              ))}
            </div>
            <a className="bento-card__link" href={getDocsFragmentUrl(tts.key)}>
              Voices / formats <span aria-hidden="true">→</span>
            </a>
          </article>

          <article className="bento-card bento-card--provenance">
            <span className="bento-card__eyebrow">
              <span className="verb verb--post">{provenance.verb}</span>
              <code>{provenance.endpoint}</code>
            </span>
            <h3 className="bento-card__title">{provenance.title}</h3>
            <p className="bento-card__body">{provenance.desc}</p>
            <ul className="bento-mini-list">
              <li>Africa Check, Dubawa, PolitiFact</li>
              <li>Tier-1 NG outlets</li>
              <li>Consensus inline</li>
            </ul>
            <a className="bento-card__link" href={getDocsFragmentUrl(provenance.key)}>
              How scoring works <span aria-hidden="true">→</span>
            </a>
          </article>

          <article className="bento-card bento-card--translate">
            <span className="bento-card__eyebrow">
              <span className="verb verb--post">{translate.verb}</span>
              <code>{translate.endpoint}</code>
            </span>
            <h3 className="bento-card__title">{translate.title}</h3>
            <p className="bento-card__body">{translate.desc}</p>
            <a className="bento-card__link" href={getDocsFragmentUrl(translate.key)}>
              Supported pairs <span aria-hidden="true">→</span>
            </a>
          </article>

          <article className="bento-card bento-card--briefing">
            <span className="bento-card__eyebrow">
              <span className="verb verb--get">{briefing.verb}</span>
              <code>{briefing.endpoint}</code>
            </span>
            <h3 className="bento-card__title">{briefing.title}</h3>
            <p className="bento-card__body">{briefing.desc}</p>
            <a className="bento-card__link" href={getDocsFragmentUrl(briefing.key)}>
              Briefing payload <span aria-hidden="true">→</span>
            </a>
          </article>

          <article className={`bento-card bento-card--realtime${realtime.future ? " bento-card--dim" : ""}`}>
            <span className="bento-card__eyebrow">
              <span className="verb verb--ws">{realtime.verb}</span>
              <code>{realtime.endpoint}</code>
            </span>
            <h3 className="bento-card__title">{realtime.title}</h3>
            <p className="bento-card__body">{realtime.desc}</p>
            <span className="bento-card__badge">Roadmap</span>
          </article>
        </div>
      </div>
    </section>
  );
}
