"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Code2,
  Gauge,
  KeyRound,
  LayoutDashboard,
  Layers,
  Radio,
  Rocket,
  ScrollText,
  Zap,
} from "lucide-react";
import { getDocsFragmentUrl, getDocsHomeUrl } from "@/lib/docs";

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="platform-sidebar__link" data-active={active}>
      {children}
    </Link>
  );
}

export function PlatformSidebar() {
  const pathname = usePathname() || "/";
  const cur = pathname.replace(/\/+$/, "") || "/";

  const is = (prefix: string) => {
    const p = prefix.replace(/\/+$/, "") || "/";
    if (p === "/") return cur === "/";
    return cur === p || cur.startsWith(`${p}/`);
  };

  const docsHome = getDocsHomeUrl();

  return (
    <aside className="platform-sidebar">
      <div className="platform-sidebar__brand">
        <span className="platform-sidebar__dot" aria-hidden />
        <span className="platform-sidebar__logo">
          <svg viewBox="85 80 250 260" aria-hidden="true">
            <path d="M300.12,190.30 L328.29,190.30 L302.02,282.32 L118.18,282.32 L91.91,190.30 L120.06,190.30 L105.05,137.88 L152.87,137.88 L137.88,85.35 L282.32,85.35 L267.31,137.88 L315.15,137.88 L300.12,190.30 Z" />
            <path d="M144.44,295.56 L275.76,295.56 L262.63,334.96 L157.57,334.96 L144.44,295.56 Z" />
          </svg>
        </span>
        <div className="platform-sidebar__titles">
          <span className="platform-sidebar__title">Narvo Platform</span>
          <span className="platform-sidebar__title-sub">platform.narvo.news</span>
        </div>
      </div>

      <nav className="platform-sidebar__nav" aria-label="Primary">
        <div>
          <div className="platform-sidebar__group-label">Overview</div>
          <div className="platform-sidebar__links">
            <NavLink href="/" active={cur === "/"}>
              <Rocket aria-hidden />
              Overview
            </NavLink>
            <a className="platform-sidebar__link" data-active={is("/docs")} href={docsHome}>
              <BookOpen aria-hidden />
              Quick start
            </a>
          </div>
        </div>

        <div>
          <div className="platform-sidebar__group-label">API reference</div>
          <div className="platform-sidebar__links">
            <a className="platform-sidebar__link" href={getDocsFragmentUrl("synthesis")}>
              <Layers aria-hidden />
              Synthesis
            </a>
            <a className="platform-sidebar__link" href={getDocsFragmentUrl("translate")}>
              <ScrollText aria-hidden />
              Translation
            </a>
            <a className="platform-sidebar__link" href={getDocsFragmentUrl("tts")}>
              <Radio aria-hidden />
              Broadcast TTS
            </a>
            <a className="platform-sidebar__link" href={getDocsFragmentUrl("provenance")}>
              <Gauge aria-hidden />
              Provenance Tag
            </a>
            <a className="platform-sidebar__link" href={getDocsFragmentUrl("briefing")}>
              <Zap aria-hidden />
              Morning Briefing
            </a>
          </div>
        </div>

        <div>
          <div className="platform-sidebar__group-label">Tools</div>
          <div className="platform-sidebar__links">
            <NavLink href="/playground/" active={is("/playground")}>
              <Code2 aria-hidden />
              Playground
            </NavLink>
            <NavLink href="/pricing/" active={is("/pricing")}>
              <Layers aria-hidden />
              Pricing
            </NavLink>
          </div>
        </div>

        <div>
          <div className="platform-sidebar__group-label">Dashboard</div>
          <div className="platform-sidebar__links">
            <NavLink href="/dashboard/" active={is("/dashboard")}>
              <LayoutDashboard aria-hidden />
              Usage &amp; quota
            </NavLink>
            <NavLink href="/dashboard/#keys" active={false}>
              <KeyRound aria-hidden />
              API keys
            </NavLink>
          </div>
        </div>

        <div className="platform-sidebar__links">
          <Link href="/signup/" className="platform-sidebar__link platform-sidebar__link--cta">
            Get API key →
          </Link>
        </div>

        <div className="platform-sidebar__status">
          <span className="dot dot--ok" aria-hidden />
          <Link href="/status/">All systems OK</Link>
        </div>
      </nav>
    </aside>
  );
}
