"use client";

import { useEffect, useRef } from "react";
import { observeCounters } from "@/lib/observers/counter";

const STATS = [
  { value: "40", suffix: "+", label: "Feeds ingested" },
  { value: "5", suffix: "", label: "Nigerian languages" },
  { value: "2.9", suffix: "s", label: "P95 synthesis" },
];

export function ElevateSection() {
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (rootRef.current) observeCounters(rootRef.current);
  }, []);

  return (
    <section ref={rootRef} className="elevate" aria-labelledby="elevate-title">
      <div className="elevate__inner">
        <span className="elevate__badge">
          <span className="elevate__badge-dot" />
          The Narvo stack
        </span>
        <h2 className="elevate__title" id="elevate-title">
          Elevate your newsroom
          <br />
          with the modern intelligence API
        </h2>
        <p className="elevate__lede">
          The same pipeline that ships audio news to Lagos, Abuja, and Kano every morning — multi-tenant, metered,
          versioned under <code>/v1/</code>, and dark-mode native.
        </p>

        <dl className="elevate__stats">
          {STATS.map((s) => (
            <div key={s.label} className="elevate__stat">
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
