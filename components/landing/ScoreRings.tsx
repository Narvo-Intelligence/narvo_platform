"use client";

import { useEffect, useRef } from "react";

const SIZE = 160;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const SCORES = [
  {
    key: "uptime",
    value: 99.87,
    suffix: "%",
    fill: 99.87,
    label: "Global uptime (30d)",
    detail: "rolling window · all regions",
    tone: "ok",
  },
  {
    key: "latency",
    value: 2.71,
    suffix: "s",
    fill: Math.max(0, (1 - 2.71 / 3.0) * 100 + 90),
    label: "P95 synthesis",
    detail: "target < 3.0s · under budget",
    tone: "ok",
  },
  {
    key: "errors",
    value: 0.08,
    suffix: "%",
    fill: 100 - 0.08 * 100,
    label: "5xx error rate",
    detail: "target < 0.1% · under budget",
    tone: "ok",
  },
];

export function ScoreRings() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rings = root.querySelectorAll<HTMLElement>(".score-ring");
    const counters = root.querySelectorAll<HTMLElement>(".stat-num[data-count-to]");

    const ringObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const bar = el.querySelector<SVGCircleElement>(".score-ring__bar");
          const fill = parseFloat(el.dataset.fill ?? "0");
          const offset = CIRCUMFERENCE - (fill / 100) * CIRCUMFERENCE;
          if (reduceMotion && bar) {
            bar.style.strokeDashoffset = String(offset);
          } else if (bar) {
            bar.style.transition = "stroke-dashoffset 1400ms cubic-bezier(0.4, 0, 0.2, 1)";
            requestAnimationFrame(() => {
              bar.style.strokeDashoffset = String(offset);
            });
          }
          ringObs.unobserve(el);
        });
      },
      { threshold: 0.35 },
    );
    rings.forEach((r) => ringObs.observe(r));

    const numObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const to = parseFloat(el.dataset.countTo ?? "0");
          const suffix = el.dataset.suffix || "";
          const isFloat = to % 1 !== 0;

          if (reduceMotion) {
            el.textContent = (isFloat ? to.toFixed(2) : String(Math.round(to))) + suffix;
            numObs.unobserve(el);
            return;
          }

          const duration = 1400;
          const start = performance.now();
          function step(now: number) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - (1 - t) ** 3;
            const v = to * eased;
            el.textContent = (isFloat ? v.toFixed(2) : String(Math.round(v))) + suffix;
            if (t < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          numObs.unobserve(el);
        });
      },
      { threshold: 0.35 },
    );
    counters.forEach((c) => numObs.observe(c));

    return () => {
      ringObs.disconnect();
      numObs.disconnect();
    };
  }, []);

  return (
    <section ref={rootRef} className="score-rings" aria-label="Platform scores">
      <div className="score-rings__inner">
        <header className="score-rings__head">
          <div className="score-rings__eyebrow">Production health</div>
          <h2 className="score-rings__title">Three numbers every newsroom asks about.</h2>
          <p className="score-rings__lede">
            Live figures from the shared Narvo pipeline. Paid tiers get the same numbers per-tenant, with SLA credits when
            they slip.
          </p>
        </header>

        <div className="score-rings__grid">
          {SCORES.map((s) => (
            <figure key={s.key} className="score-ring" data-fill={s.fill.toFixed(2)}>
              <svg className="score-ring__svg" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
                <circle
                  className="score-ring__track"
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  strokeWidth={STROKE}
                  fill="none"
                />
                <circle
                  className="score-ring__bar"
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  strokeWidth={STROKE}
                  fill="none"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE}
                  transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                  strokeLinecap="round"
                />
              </svg>
              <figcaption className="score-ring__cap">
                <div className="score-ring__value">
                  <span className="stat-num" data-count-to={s.value} data-suffix={s.suffix}>
                    0{s.suffix}
                  </span>
                </div>
                <div className="score-ring__label">{s.label}</div>
                <div className="score-ring__detail">
                  <span className="dot dot--ok" />
                  {s.detail}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
