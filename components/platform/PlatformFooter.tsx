"use client";

import Link from "next/link";
import { DOCS_GUIDE_LINKS } from "@/lib/docs-anchors";
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
  return (
    <footer className="footer">
      <div className="footer__inner footer__inner--compact">
        <div className="footer__top">
          <Link href="/" className="footer__brand-mark" aria-label="Narvo Platform home">
            <span className="nav__logo footer__logo">
              <LogoSvg />
            </span>
            <span className="footer__wordmark">Narvo</span>
          </Link>
          <p className="footer__tag">Audio intelligence APIs — synthesis, voice, provenance, briefings.</p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <Link href="/#engines">Engines</Link>
          <Link href="/playground/">Playground</Link>
          <Link href="/pricing/">Pricing</Link>
          <Link href="/status/">Status</Link>
          <span className="footer__sep" aria-hidden="true">
            ·
          </span>
          <a href={getDocsHomeUrl()}>Docs</a>
          {DOCS_GUIDE_LINKS.map(({ label, fragment }) => (
            <a key={fragment} href={getDocsFragmentUrl(fragment)}>
              {label}
            </a>
          ))}
          <span className="footer__sep" aria-hidden="true">
            ·
          </span>
          <a href="https://narvo.news">narvo.news</a>
          <a href="#contact">Contact</a>
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
        </nav>

        <div className="footer__bottom footer__bottom--compact">
          <Link href="/status/" className="footer__status-mini">
            <span className="dot dot--ok" aria-hidden="true" /> Operational
          </Link>
          <span>© 2026 Narvo Intelligence Ltd.</span>
        </div>
      </div>
    </footer>
  );
}
