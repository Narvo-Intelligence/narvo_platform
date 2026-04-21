"use client";

import { useEffect, useRef } from "react";

/** Phrase pool — ported from narvo-plat BgLayer.js */
const POOL = [
  { text: "BREAKING · CBN rate hike", tone: "ash" },
  { text: "FG · fuel subsidy return", tone: "ash" },
  { text: "Lagos · Abuja · Kano", tone: "ash" },
  { text: "NGX · +2.4%", tone: "ash" },
  { text: '"consensus_score": 0.91', tone: "cyan" },
  { text: "POST /v1/synthesis", tone: "cyan" },
  { text: "YarnGPT · emma", tone: "purple" },
  { text: "en · yo · ha · ig · pcm", tone: "signal" },
  { text: "Groq LPU · Gemini", tone: "emerald" },
  { text: "Backblaze B2 · Cloudflare", tone: "emerald" },
  { text: "Supabase · Upstash", tone: "emerald" },
  { text: "nrv_sk_live_•••", tone: "signal" },
] as const;

export function BgLayer() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stream = root.querySelector(".bg-stream");
    if (!stream) return;

    const reduceMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const w = window.innerWidth || 1200;
    let count = 44;
    if (w < 1100) count = 30;
    if (w < 780) count = 18;
    if (reduceMotion) count = Math.floor(count * 0.6);

    const frag = document.createDocumentFragment();
    const shuffled = [...POOL].sort(() => Math.random() - 0.5);

    for (let i = 0; i < count; i++) {
      const p = shuffled[i % shuffled.length];
      const span = document.createElement("span");
      span.className = "bg-stream__item";
      span.dataset.tone = p.tone;
      span.textContent = p.text;
      span.style.left = `${2 + Math.random() * 93}%`;
      span.style.top = `${Math.random() * 100}%`;
      span.style.fontSize = `${10 + Math.floor(Math.random() * 4)}px`;
      if (!reduceMotion) {
        span.style.setProperty("--d", `${Math.random() * 10}s`);
        span.style.setProperty("--dur", `${12 + Math.random() * 10}s`);
        const drift = (Math.random() > 0.5 ? 1 : -1) * (4 + Math.random() * 10);
        span.style.setProperty("--dy", `${drift}px`);
      }
      frag.appendChild(span);
    }
    stream.appendChild(frag);
  }, []);

  return (
    <div ref={rootRef} className="bg-layer" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-stream" />
      <div className="bg-glow" />
      <div className="bg-noise" />
    </div>
  );
}
