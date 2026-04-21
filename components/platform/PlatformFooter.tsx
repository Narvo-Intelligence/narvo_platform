"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { getDocsFragmentUrl, getDocsHomeUrl } from "@/lib/docs";

function LogoSvg() {
  return (
    <svg viewBox="85 80 250 260" aria-hidden="true">
      <path d="M300.12,190.30 L328.29,190.30 L302.02,282.32 L118.18,282.32 L91.91,190.30 L120.06,190.30 L105.05,137.88 L152.87,137.88 L137.88,85.35 L282.32,85.35 L267.31,137.88 L315.15,137.88 L300.12,190.30 Z" />
      <path d="M144.44,295.56 L275.76,295.56 L262.63,334.96 L157.57,334.96 L144.44,295.56 Z" />
    </svg>
  );
}

export function PlatformFooter() {
  const regionRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduceMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const el = regionRef.current;
    if (!el) return;
    const regions = [
      "eu-west-1 · edge-LOS",
      "eu-west-1 · edge-ABV",
      "eu-west-1 · edge-FRA",
      "eu-west-1 · edge-LHR",
    ];
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % regions.length;
      el.textContent = regions[i];
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="nav__logo">
            <LogoSvg />
          </span>
          <div>
            <div className="footer__wordmark">Narvo / platform</div>
            <div className="footer__line">The intelligence layer for African media.</div>
          </div>
        </div>

        <div className="footer__cols">
          <div>
            <div className="footer__head">Product</div>
            <Link href="/#engines">Engines</Link>
            <Link href="/playground/">Playground</Link>
            <Link href="/pricing/">Pricing</Link>
            <Link href="/status/">Status</Link>
          </div>
          <div>
            <div className="footer__head">Developers</div>
            <a href={getDocsHomeUrl()}>Docs</a>
            <a href={getDocsFragmentUrl("quickstart")}>Quick start</a>
            <a href={getDocsFragmentUrl("sdks")}>SDKs</a>
            <a href={getDocsFragmentUrl("changelog")}>Changelog</a>
          </div>
          <div>
            <div className="footer__head">Company</div>
            <a href="#about">About Narvo</a>
            <a href="https://narvo.news">Consumer app</a>
            <a href="#press">Press</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <div className="footer__head">Legal</div>
            <a href="#terms">API terms</a>
            <a href="#privacy">Privacy (NDPA)</a>
            <a href="#security">Security</a>
            <a href="#sla">SLA</a>
          </div>
        </div>

        <div className="footer__status">
          <span className="dot dot--ok" />
          <span>All systems operational · uptime 99.87% (30d)</span>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Narvo Intelligence Ltd. Lagos · Abuja · remote.</span>
          <span className="mono footer__req">
            region=<span ref={regionRef}>eu-west-1 · edge-LOS</span> · build=platform.narvo.news@v1.0.0
          </span>
        </div>
      </div>
    </div>
  );
}
