"use client";

import { useEffect, useRef } from "react";
import { observeRevealAll } from "@/lib/observers/reveal";

const STORIES = [
  {
    org: "Publisher network",
    quote: "Narvo cut our audio production cost by about 80%. Pidgin subscribers finally hear headlines in their own voice — without hiring a TTS team.",
    stat: "312k",
    statLabel: "weekly listens",
  },
  {
    org: "Newsroom SaaS",
    quote: "We white-label synthesis + provenance for twelve stations. Metering and request_id tracing made finance audits trivial.",
    stat: "99.6%",
    statLabel: "uptime (90d)",
  },
  {
    org: "Telco partner",
    quote: "Briefing payloads land cached under 120ms. Edge-LOS routing keeps peak-hour latency predictable for USSD + IVR.",
    stat: "P95",
    statLabel: "< 3s synthesis",
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
          Customer stories
        </h2>
        <p className="land-stories__lede">How teams use Narvo Platform in production.</p>
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
