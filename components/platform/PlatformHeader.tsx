"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { getDocsFragmentUrl } from "@/lib/docs";

const API_LINKS = [
  { label: "Synthesis", href: getDocsFragmentUrl("synthesis") },
  { label: "Translation", href: getDocsFragmentUrl("translate") },
  { label: "Broadcast TTS", href: getDocsFragmentUrl("tts") },
  { label: "Provenance Tag", href: getDocsFragmentUrl("provenance") },
  { label: "Morning Briefing", href: getDocsFragmentUrl("briefing") },
] as const;

const MAIN_LINKS = [
  { href: "/docs/", label: "Docs", match: "/docs" },
  { href: "/playground/", label: "Playground", match: "/playground" },
  { href: "/pricing/", label: "Pricing", match: "/pricing" },
  { href: "/status/", label: "Status", match: "/status" },
] as const;

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [apiOpen, setApiOpen] = useState(false);
  const apiRef = useRef<HTMLDivElement>(null);

  const is = (prefix: string) => {
    const p = prefix.replace(/\/+$/, "") || "/";
    return cur === p || cur.startsWith(`${p}/`);
  };

  useEffect(() => {
    if (!apiOpen) return;
    const close = (e: MouseEvent) => {
      if (apiRef.current && !apiRef.current.contains(e.target as Node)) setApiOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [apiOpen]);

  const closeDrawer = () => setDrawerOpen(false);

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

        <nav className="platform-header__nav platform-header__nav--desktop" aria-label="Primary">
          {MAIN_LINKS.map((l) => (
            <NavItem key={l.href} href={l.href} active={is(l.match)}>
              {l.label}
            </NavItem>
          ))}

          <div className="platform-header__api-wrap" ref={apiRef}>
            <button
              type="button"
              className="platform-header__summary"
              aria-expanded={apiOpen}
              aria-haspopup="true"
              onClick={() => setApiOpen((o) => !o)}
            >
              API
              <ChevronDown
                className={`platform-header__chev${apiOpen ? " platform-header__chev--open" : ""}`}
                aria-hidden
                size={14}
                strokeWidth={2}
              />
            </button>
            {apiOpen ? (
              <div className="platform-header__dropdown" role="menu">
                {API_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="platform-header__dropdown-link"
                    role="menuitem"
                    onClick={() => setApiOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="platform-header__actions">
          <Link href="/login/" className="platform-header__ghost">
            Sign in
          </Link>
          <Link href="/signup/" className="platform-header__cta">
            Get API key
          </Link>
        </div>

        <button
          type="button"
          className="platform-header__menu-btn"
          aria-expanded={drawerOpen}
          aria-controls="platform-nav-drawer"
          onClick={() => setDrawerOpen((o) => !o)}
        >
          {drawerOpen ? <X size={22} strokeWidth={2} aria-hidden /> : <Menu size={22} strokeWidth={2} aria-hidden />}
          <span className="sr-only">{drawerOpen ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {drawerOpen ? (
        <>
          <button type="button" className="platform-header__backdrop" aria-label="Close menu" onClick={closeDrawer} />
          <div id="platform-nav-drawer" className="platform-header__drawer" role="dialog" aria-modal="true">
            <div className="platform-header__drawer-inner">
              <p className="platform-header__drawer-label">Navigate</p>
              {MAIN_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="platform-header__drawer-link" onClick={closeDrawer}>
                  {l.label}
                </Link>
              ))}
              <p className="platform-header__drawer-label">API</p>
              {API_LINKS.map((item) => (
                <a key={item.href} href={item.href} className="platform-header__drawer-link" onClick={closeDrawer}>
                  {item.label}
                </a>
              ))}
              <div className="platform-header__drawer-actions">
                <Link href="/login/" className="platform-header__drawer-ghost" onClick={closeDrawer}>
                  Sign in
                </Link>
                <Link href="/signup/" className="platform-header__drawer-cta" onClick={closeDrawer}>
                  Get API key
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
