"use client";

import { useEffect, useRef } from "react";
import { observeRevealAll } from "@/lib/observers/reveal";

const STORIES = [
  {
    org: "Publisher network",
    quote:
      "~80% lower audio production cost; Pidgin listeners get native-voice headlines without an in-house TTS team.",
    stat: "312k",
    statLabel: "weekly listens",
  },
  {
    org: "Newsroom SaaS",
    quote: "White-label synthesis + provenance for 12 stations. Metering and request_id made audits straightforward.",
    stat: "99.6%",
    statLabel: "uptime (90d)",
  },
  {
    org: "Telco partner",
    quote: "Briefings cache <120ms; edge-LOS keeps USSD/IVR latency steady at peak.",
    stat: "P95",
    statLabel: "<3s synthesis",
  },
];

export function LandingStories() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) observeRevealAll(".land-story", ref.current);
  }, []);

  return (
    <section ref={ref} className="land-stories" aria-labelledby="land-stories-title">
      <div className="land-stories__head">
        <h2 className="land-stories__title" id="land-stories-title">
          In production
        </h2>
        <p className="land-stories__lede">What teams optimize for in pilots.</p>
      </div>
      <div className="land-stories__grid">
        {STORIES.map((s) => (
          <article key={s.org} className="land-story">
            <p className="land-story__org">{s.org}</p>
            <blockquote className="land-story__quote">{s.quote}</blockquote>
            <div className="land-story__stat">
              <span className="land-story__stat-num">{s.stat}</span>
              <span className="land-story__stat-label">{s.statLabel}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
