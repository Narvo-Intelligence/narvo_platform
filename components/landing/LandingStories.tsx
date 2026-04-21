"use client";

import { useEffect, useRef } from "react";
import { observeRevealAll } from "@/lib/observers/reveal";

const STORIES = [
  {
    org: "Global publisher",
    quote:
      "Cut audio packaging time from days to hours: one contract, one meter, and request_id on every response for downstream QA.",
    stat: "4×",
    statLabel: "faster to air",
  },
  {
    org: "Broadcast SaaS",
    quote:
      "We white-label synthesis + provenance for partner stations. Tenant-scoped keys and usage exports made finance reviews painless.",
    stat: "99.6%",
    statLabel: "uptime (90d)",
  },
  {
    org: "Telco media unit",
    quote:
      "Cached briefings for IVR and USSD menus; P95 synthesis stayed inside our SLA window under peak traffic.",
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
    <section ref={ref} className="land-stories land-stories--motion" aria-labelledby="land-stories-title">
      <div className="land-stories__head">
        <h2 className="land-stories__title" id="land-stories-title">
          Built for production
        </h2>
        <p className="land-stories__lede">What operators ship first when they wire Narvo in.</p>
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
