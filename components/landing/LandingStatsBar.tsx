"use client";

import { useEffect, useRef } from "react";
import { observeCounters } from "@/lib/observers/counter";

const STATS = [
  { value: "40", suffix: "+", label: "Feeds" },
  { value: "5", suffix: "", label: "NG languages" },
  { value: "2.9", suffix: "s", label: "P95 synthesis" },
];

export function LandingStatsBar() {
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (rootRef.current) observeCounters(rootRef.current);
  }, []);

  return (
    <section ref={rootRef} className="land-stats" aria-label="Pipeline scale">
      <div className="land-stats__inner">
        <p className="land-stats__kicker">Live pipeline</p>
        <dl className="land-stats__grid">
          {STATS.map((s) => (
            <div key={s.label} className="land-stats__cell">
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
    </section>
  );
}
