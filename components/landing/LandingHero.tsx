"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getDocsHomeUrl } from "@/lib/docs";
import { APIS } from "@/lib/fixtures";
import { buildHeroDemos } from "@/lib/hero-demos";

const ROTATE_MS = 4800;

export function LandingHero() {
  const demos = useMemo(() => buildHeroDemos(APIS), []);
  const [active, setActive] = useState(0);
  const resumeRef = useRef(0);

  const schedule = useCallback(() => {
    window.clearTimeout(resumeRef.current);
    resumeRef.current = window.setTimeout(() => {
      setActive((i) => (i + 1) % demos.length);
    }, ROTATE_MS);
  }, [demos.length]);

  useEffect(() => {
    schedule();
    return () => window.clearTimeout(resumeRef.current);
  }, [active, schedule]);

  const select = (i: number) => {
    setActive(i);
    window.clearTimeout(resumeRef.current);
    schedule();
  };

  const d = demos[active];

  return (
    <section className="lh lh--supa" aria-labelledby="lh-title">
      <div className="lh__shell">
        <div className="lh__stack">
          <p className="lh__announcer">
            <span>Sandbox key · synthesis + TTS</span>
          </p>

          <h1 className="lh__title" id="lh-title">
            <span className="lh__title-line">Broadcast-grade audio APIs</span>
            <span className="lh__title-line lh__title-line--muted">Ship in days, not quarters</span>
          </h1>

          <p className="lh__lede">
            Synthesis, TTS, provenance, translate, and briefings on a single{" "}
            <code className="lh__code">/v1/</code> surface — bearer keys, per-tenant metering, and predictable
            latency targets.
          </p>

          <div className="lh__ctas">
            <Link className="btn btn--primary btn--lg" href="/signup/">
              Start your project <span aria-hidden="true">→</span>
            </Link>
            <a className="btn btn--ghost btn--lg" href={getDocsHomeUrl()}>
              Documentation
            </a>
          </div>

          <p className="lh__fineprint">1k free calls/mo · sandbox &amp; live keys · no card</p>
        </div>

        <div className="lh__demo-row">
          <ul className="lh__apis lh__apis--rail" aria-label="API products">
            {demos.map((demo, i) => (
              <li key={demo.key}>
                <button
                  type="button"
                  className={`lh-api-chip lh-api-chip--btn${i === active ? " is-active" : ""}`}
                  aria-pressed={i === active}
                  onClick={() => select(i)}
                >
                  <span className={`lh-api-chip__dot verb verb--${demo.verbClass}`}>{demo.verb}</span>
                  <span className="lh-api-chip__label">{demo.title}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="lh__demo">
            <div className="code-split code-split--hero">
              <article className="code-panel code-panel--req">
                <header className="code-panel__head">
                  <span className={`verb verb--${d.verbClass}`}>{d.verb}</span>
                  <code className="code-panel__path">{d.path}</code>
                  <span className="code-panel__tag">cURL</span>
                </header>
                <pre className="code-panel__body">
                  <code dangerouslySetInnerHTML={{ __html: d.requestHtml }} />
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
                  {d.key === "realtime" ? (
                    <span className="pill">
                      <span className="dot dot--idle" />
                      Roadmap
                    </span>
                  ) : (
                    <span className="pill pill--ok">
                      <span className="dot dot--ok" />
                      200 OK
                    </span>
                  )}
                  <span className="code-panel__latency">{d.latency}</span>
                  <span className="code-panel__tag">{d.resTag}</span>
                </header>
                <pre className="code-panel__body">
                  <code dangerouslySetInnerHTML={{ __html: d.responseHtml }} />
                </pre>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
