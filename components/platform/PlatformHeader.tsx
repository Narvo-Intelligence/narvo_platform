"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { getDocsFragmentUrl } from "@/lib/docs";

function NavItem({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className="platform-header__link" data-active={active}>
      {children}
    </Link>
  );
}

export function PlatformHeader() {
  const pathname = usePathname() || "/";
  const cur = pathname.replace(/\/+$/, "") || "/";

  const is = (prefix: string) => {
    const p = prefix.replace(/\/+$/, "") || "/";
    if (p === "/") return cur === "/";
    return cur === p || cur.startsWith(`${p}/`);
  };

  return (
    <header className="platform-header">
      <div className="platform-header__inner">
        <Link href="/" className="platform-header__brand" aria-label="Narvo Platform home">
          <span className="platform-header__mark" aria-hidden />
          <span className="platform-header__logo">
            <svg viewBox="85 80 250 260" aria-hidden="true">
              <path d="M300.12,190.30 L328.29,190.30 L302.02,282.32 L118.18,282.32 L91.91,190.30 L120.06,190.30 L105.05,137.88 L152.87,137.88 L137.88,85.35 L282.32,85.35 L267.31,137.88 L315.15,137.88 L300.12,190.30 Z" />
              <path d="M144.44,295.56 L275.76,295.56 L262.63,334.96 L157.57,334.96 L144.44,295.56 Z" />
            </svg>
          </span>
          <span className="platform-header__name">Narvo</span>
        </Link>

        <nav className="platform-header__nav" aria-label="Primary">
          <NavItem href="/" active={cur === "/"}>
            Overview
          </NavItem>
          <NavItem href="/docs/" active={is("/docs")}>
            Docs
          </NavItem>

          <details className="platform-header__details">
            <summary className="platform-header__summary">
              API
              <ChevronDown className="platform-header__chev" aria-hidden size={14} strokeWidth={2} />
            </summary>
            <div className="platform-header__dropdown">
              <a href={getDocsFragmentUrl("synthesis")}>Synthesis</a>
              <a href={getDocsFragmentUrl("translate")}>Translation</a>
              <a href={getDocsFragmentUrl("tts")}>Broadcast TTS</a>
              <a href={getDocsFragmentUrl("provenance")}>Provenance Tag</a>
              <a href={getDocsFragmentUrl("briefing")}>Morning Briefing</a>
            </div>
          </details>

          <NavItem href="/playground/" active={is("/playground")}>
            Playground
          </NavItem>
          <NavItem href="/pricing/" active={is("/pricing")}>
            Pricing
          </NavItem>
          <NavItem href="/dashboard/" active={is("/dashboard")}>
            Dashboard
          </NavItem>
          <NavItem href="/status/" active={is("/status")}>
            Status
          </NavItem>
        </nav>

        <div className="platform-header__actions">
          <Link href="/login/" className="platform-header__ghost">
            Sign in
          </Link>
          <Link href="/signup/" className="platform-header__cta">
            Get API key
          </Link>
        </div>
      </div>
    </header>
  );
}
