"use client";

/**
 * Quota gauge animation — ported from narvo-plat/resources/js/Pages/Dashboard.js
 * Observes the gauge bar container; animates `[data-value]` span width when in view.
 */

import { useEffect, useRef } from "react";

export type DashboardGaugeProps = {
  percent?: number;
  label?: string;
  detail?: string;
};

export function DashboardGauge({
  percent = 82,
  label = "Monthly quota",
  detail = "41,000 / 50,000 calls · 82% used",
}: DashboardGaugeProps) {
  const barRef = useRef<HTMLSpanElement>(null);
  const pct = Math.min(100, Math.max(0, Number.isFinite(percent) ? percent : 82));

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    bar.style.width = "0%";
    const reduceMotion =
      typeof window.matchMedia !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      bar.style.width = `${pct}%`;
      return;
    }

    const parent = bar.parentElement;
    if (!parent) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            bar.style.transition = "width 1600ms cubic-bezier(0.4, 0, 0.2, 1)";
            bar.style.width = `${pct}%`;
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(parent);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div className="dashboard__gauge" data-gauge-bar>
      <div className="dashboard__gauge-head">
        <strong>{label}</strong>
        <span>{detail}</span>
      </div>
      <div className="dashboard__gauge-bar">
        <span ref={barRef} data-value={String(pct)} style={{ width: "0%" }} />
      </div>
    </div>
  );
}
