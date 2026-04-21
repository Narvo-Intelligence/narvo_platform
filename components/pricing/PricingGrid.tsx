"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { observeRevealAll } from "@/lib/observers/reveal";
import { OVERAGES, TIERS } from "@/lib/fixtures";

function btnClass(style: "primary" | "ghost") {
  return style === "primary" ? "btn btn--primary btn--block" : "btn btn--ghost btn--block";
}

export function PricingGrid() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) observeRevealAll(".price", ref.current);
  }, []);

  return (
    <div ref={ref}>
      <div className="price-grid">
        {TIERS.map((t) => (
          <article key={t.tier} className={`price${t.featured ? " price--featured" : ""}`}>
            <div className="price__tier">
              {t.tier}
              {t.badge ? <span className="price__badge">{t.badge}</span> : null}
            </div>
            <div className="price__amount">
              <span className="price__currency">{t.currency}</span>
              {t.price}
              <span className="price__per">{t.period}</span>
            </div>
            <ul className="price__list">
              {t.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <Link className={btnClass(t.cta.style)} href={t.cta.href}>
              {t.cta.label}
            </Link>
          </article>
        ))}
      </div>

      <div className="price-overage">
        <div className="price-overage__title">Overages — Publisher &amp; Newsroom</div>
        <ul>
          {OVERAGES.map((o) => (
            <li key={o.label}>
              <strong>{o.price}</strong> / {o.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
