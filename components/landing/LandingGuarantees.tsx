"use client";

import { useEffect, useRef } from "react";
import { observeRevealAll } from "@/lib/observers/reveal";

function IconShield() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2 L17 5 V10 C17 13.5 14 16.5 10 18 C6 16.5 3 13.5 3 10 V5 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
      <path d="M7 10 L9 12 L13 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function IconGauge() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 14 A7 7 0 0 1 17 14" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M10 14 L13 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M11 2 L4 11 H9 L8 18 L16 8 H11 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M7 9 V6 A3 3 0 0 1 13 6 V9" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="10" cy="13" r="1.2" fill="currentColor" />
    </svg>
  );
}

const CELLS = [
  {
    Icon: IconShield,
    title: "Multi-tenancy",
    body: "Tenant scope comes from the API key — not client-supplied IDs alone.",
    bullets: ["Per-tenant keys", "Quota isolation", "Audit logs"],
  },
  {
    Icon: IconGauge,
    title: "Usage metering",
    body: "Each 200 OK logs tenant, endpoint, and tokens atomically.",
    bullets: ["Atomic writes", "Per-language splits", "Exports"],
  },
  {
    Icon: IconBolt,
    title: "Rate limits",
    body: "Sliding windows per tier; 429s include retry guidance.",
    bullets: ["Synth 10/min", "TTS 20/min", "Provenance 60/min"],
  },
  {
    Icon: IconLock,
    title: "SLA enforcement",
    body: "Tier uptime targets; credits if a window misses.",
    bullets: ["Publisher 99.5%", "Newsroom 99.7%", "Enterprise 99.9%"],
  },
];

export function LandingGuarantees() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) observeRevealAll(".matrix__cell", ref.current);
  }, []);

  return (
    <section ref={ref} className="matrix" aria-label="Platform guarantees">
      <div className="matrix__inner">
        <header className="matrix__head">
          <div className="matrix__eyebrow">Guarantees</div>
          <h2 className="matrix__title">What paid newsrooms expect on day one.</h2>
        </header>

        <div className="matrix__grid matrix__grid--masonry">
          {CELLS.map((c) => {
            const Icon = c.Icon;
            return (
              <article key={c.title} className="matrix__cell">
                <div className="matrix__icon" aria-hidden="true">
                  <Icon />
                </div>
                <h3 className="matrix__cell-title">{c.title}</h3>
                <p className="matrix__cell-body">{c.body}</p>
                <ul className="matrix__bullets">
                  {c.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
