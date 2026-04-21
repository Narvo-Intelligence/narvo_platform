"use client";

import { useEffect, useRef } from "react";
import { getDocsFragmentUrl } from "@/lib/docs";
import { observeRevealAll } from "@/lib/observers/reveal";

function svgSynthesis() {
  return `
    <svg viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <rect x="12" y="18" width="58" height="84" rx="4" stroke="currentColor" stroke-width="1.2" />
      <rect x="22" y="28" width="38" height="2" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="22" y="34" width="32" height="2" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="22" y="40" width="38" height="2" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="22" y="46" width="24" height="2" rx="1" fill="currentColor" opacity="0.4" />

      <rect x="50" y="36" width="58" height="84" rx="4" stroke="currentColor" stroke-width="1.2" fill="#0A0A0A" />
      <rect x="60" y="46" width="38" height="2" rx="1" fill="currentColor" opacity="0.55" />
      <rect x="60" y="52" width="32" height="2" rx="1" fill="currentColor" opacity="0.55" />
      <rect x="60" y="58" width="38" height="2" rx="1" fill="currentColor" opacity="0.55" />

      <rect x="88" y="0" width="60" height="86" rx="4" stroke="var(--signal)" stroke-width="1.5" fill="#0A0A0A" transform="translate(0 12)" />
      <rect x="98" y="26" width="42" height="2" rx="1" fill="var(--signal)" />
      <rect x="98" y="34" width="36" height="2" rx="1" fill="var(--signal)" opacity="0.7" />
      <rect x="98" y="42" width="42" height="2" rx="1" fill="var(--signal)" opacity="0.7" />
      <rect x="98" y="50" width="28" height="2" rx="1" fill="var(--signal)" opacity="0.7" />
      <rect x="98" y="66" width="42" height="8" rx="2" fill="var(--signal)" opacity="0.15" />
      <path d="M104 70 L108 66 L112 70" stroke="var(--signal)" stroke-width="1.2" fill="none" />
    </svg>`;
}

function svgProvenance() {
  return `
    <svg viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <path d="M80 14 L118 28 V60 C118 80 102 96 80 104 C58 96 42 80 42 60 V28 Z"
            stroke="currentColor" stroke-width="1.4" fill="#0A0A0A" />
      <path d="M80 14 L118 28 V60 C118 80 102 96 80 104 C58 96 42 80 42 60 V28 Z"
            fill="var(--signal)" opacity="0.04" />
      <path d="M64 58 L76 70 L98 48" stroke="var(--emerald)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />

      <rect x="10" y="34" width="30" height="14" rx="3" fill="currentColor" opacity="0.08" stroke="currentColor" stroke-width="0.8" />
      <rect x="14" y="40" width="16" height="2" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="10" y="52" width="30" height="14" rx="3" fill="currentColor" opacity="0.08" stroke="currentColor" stroke-width="0.8" />
      <rect x="14" y="58" width="14" height="2" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="10" y="70" width="30" height="14" rx="3" fill="currentColor" opacity="0.08" stroke="currentColor" stroke-width="0.8" />
      <rect x="14" y="76" width="20" height="2" rx="1" fill="currentColor" opacity="0.6" />

      <path d="M40 42 L42 42 M40 60 L42 60 M40 78 L42 78"
            stroke="var(--emerald)" stroke-width="1.2" />
    </svg>`;
}

function svgVoices() {
  return `
    <svg viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <circle cx="80" cy="60" r="40" stroke="currentColor" stroke-width="1" opacity="0.4" />
      <circle cx="80" cy="60" r="28" stroke="currentColor" stroke-width="1" opacity="0.6" />
      <circle cx="80" cy="60" r="16" stroke="var(--signal)" stroke-width="1.4" />
      <circle cx="80" cy="60" r="5" fill="var(--signal)" />

      <g stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
        <line x1="18" y1="60" x2="26" y2="60" opacity="0.4" />
        <line x1="14" y1="52" x2="22" y2="52" opacity="0.4" />
        <line x1="14" y1="68" x2="22" y2="68" opacity="0.4" />
        <line x1="30" y1="44" x2="38" y2="44" opacity="0.5" />
        <line x1="30" y1="76" x2="38" y2="76" opacity="0.5" />

        <line x1="134" y1="60" x2="142" y2="60" opacity="0.4" />
        <line x1="138" y1="52" x2="146" y2="52" opacity="0.4" />
        <line x1="138" y1="68" x2="146" y2="68" opacity="0.4" />
        <line x1="122" y1="44" x2="130" y2="44" opacity="0.5" />
        <line x1="122" y1="76" x2="130" y2="76" opacity="0.5" />
      </g>

      <g font-family="var(--font-mono, JetBrains Mono)" font-size="7" fill="currentColor" opacity="0.8">
        <text x="4" y="18">en</text>
        <text x="148" y="18">yo</text>
        <text x="4" y="110">ha</text>
        <text x="148" y="110">ig</text>
        <text x="78" y="116" text-anchor="middle" fill="var(--signal)">pcm</text>
      </g>
    </svg>`;
}

const FEATURES = [
  {
    illo: svgSynthesis,
    eyebrow: "Synthesis",
    title: "One URL in, broadcast narrative out.",
    body:
      "Send any African news URL. Get back a cleaned, objectively-worded broadcast script with key takeaways and source attribution — in under three seconds.",
    docFragment: "synthesis",
    linkLabel: "POST /v1/synthesis",
  },
  {
    illo: svgProvenance,
    eyebrow: "Provenance Tag",
    title: "Verifiable consensus, not vibes.",
    body:
      "Every claim is scored against Africa Check, Dubawa, PolitiFact, and Tier-1 Nigerian outlets via RAG. Four corroboration levels. Zero hallucinations.",
    docFragment: "provenance",
    linkLabel: "POST /v1/provenance",
  },
  {
    illo: svgVoices,
    eyebrow: "Cultural TTS",
    title: "Five voices that sound like home.",
    body:
      "YarnGPT-native Nigerian English, Yorùbá, Hausa, Igbo, and Pidgin — not flat Western voices pretending to speak African. P95 under 1.2 seconds.",
    docFragment: "tts",
    linkLabel: "POST /v1/tts/generate",
  },
];

export function FeatureTriplet() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) observeRevealAll(".feature-card", ref.current);
  }, []);

  return (
    <section ref={ref} className="features-triplet" aria-label="Core features">
      <div className="features-triplet__inner">
        {FEATURES.map((f) => (
          <article key={f.title} className="feature-card">
            <div className="feature-card__illo" aria-hidden="true" dangerouslySetInnerHTML={{ __html: f.illo() }} />
            <div className="feature-card__eyebrow">{f.eyebrow}</div>
            <h3 className="feature-card__title">{f.title}</h3>
            <p className="feature-card__body">{f.body}</p>
            <a className="feature-card__link" href={getDocsFragmentUrl(f.docFragment)}>
              <span className="mono">{f.linkLabel}</span>
              <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
