"use client";

import { useEffect, useRef } from "react";
import { observeCounters } from "@/lib/observers/counter";

const STATS = [
  { value: "40", suffix: "+", label: "Curated feeds" },
  { value: "5", suffix: "", label: "Languages (core tier)" },
  { value: "2.9", suffix: "s", label: "P95 synthesis" },
];

export function LandingBandStats() {
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (rootRef.current) observeCounters(rootRef.current);
  }, []);

  return (
    <section ref={rootRef} className="land-band-stats" aria-labelledby="land-band-stats-title">
      <div className="land-band-stats__grid">
        <div className="land-band-stats__copy">
          <h2 className="land-band-stats__title" id="land-band-stats-title">
            One engine or all six.
          </h2>
          <p className="land-band-stats__sub">Broadcast APIs, one metered platform.</p>
        </div>
        <div className="land-band-stats__metrics">
          <p className="land-band-stats__kicker">Live pipeline</p>
          <dl className="land-band-stats__dl">
            {STATS.map((s) => (
              <div key={s.label} className="land-band-stats__cell">
                <dt>
                  <span className="stat-num" data-count-to={s.value} data-suffix={s.suffix}>
                    0{s.suffix}
                  </span>
                </dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
