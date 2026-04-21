"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { DashboardGauge } from "@/components/dashboard/DashboardGauge";
import {
  fetchDashboardSandbox,
  getDashboardSandboxUrl,
  mergeDashboardView,
  type DashboardResolvedView,
} from "@/lib/dashboard-sandbox";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/browser";

function tileValueStyle(tone: "ok" | "default" | "err" | undefined): CSSProperties | undefined {
  if (tone === "ok") return { color: "var(--emerald)" };
  if (tone === "err") return { color: "var(--fault)" };
  return undefined;
}

export function DashboardClient() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [view, setView] = useState<DashboardResolvedView>(() => mergeDashboardView({}));
  const [dataNote, setDataNote] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const supabase = getSupabaseBrowserClient();

    void (async () => {
      await Promise.resolve();
      if (!supabase) {
        if (!cancelled) setSession(null);
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (!cancelled) setSession(data.session ?? null);
    })();

    if (!supabase) {
      return undefined;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    const url = getDashboardSandboxUrl();
    void fetchDashboardSandbox(ac.signal).then((result) => {
      if (ac.signal.aborted) return;
      setView(result.view);
      setDataNote(
        result.ok
          ? `Sandbox JSON: ${url}${result.view.sandbox ? " · sandbox" : ""}`
          : `Sandbox JSON: ${url} — ${result.error}`,
      );
    });
    return () => ac.abort();
  }, []);

  async function signOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase?.auth.signOut();
    setSession(null);
  }

  const authed = Boolean(session?.user);
  const email = session?.user?.email;

  return (
    <section className="dashboard">
      <header className="dashboard__head">
        <div>
          <div className="page-eyebrow">Dashboard · preview</div>
          <h1>Overview</h1>
          <p className="dashboard__sub">
            <code>
              tenant_id: <span className="mono--accent">{view.tenantId}</span>
            </code>{" "}
            · {view.tenantTier}
          </p>
        </div>
        <span className="dashboard__gate">
          {session === undefined ? (
            <>
              <span className="dot dot--idle" />
              Checking session…
            </>
          ) : authed ? (
            <>
              <span className="dot dot--ok" />
              Signed in{email ? ` · ${email}` : ""} ·{" "}
              <button type="button" className="dashboard__gate-link" onClick={() => void signOut()}>
                Sign out
              </button>
            </>
          ) : isSupabaseConfigured() ? (
            <>
              <span className="dot dot--idle" />
              Preview mode —{" "}
              <Link href="/login/" className="dashboard__gate-link">
                sign in
              </Link>{" "}
              for live metrics
            </>
          ) : (
            <>
              <span className="dot dot--idle" />
              Preview mode — configure Supabase in <code className="mono">.env.local</code> to enable auth
            </>
          )}
        </span>
      </header>

      {dataNote ? <p className="dashboard__data-meta">{dataNote}</p> : null}

      <div className="dashboard__overview">
        {view.tiles.map((tile) => (
          <div key={tile.label} className="dashboard__tile">
            <div className="dashboard__tile-label">{tile.label}</div>
            <div className="dashboard__tile-value" style={tileValueStyle(tile.valueTone)}>
              {tile.value}
            </div>
            <div className="dashboard__tile-sub">{tile.sub}</div>
          </div>
        ))}
      </div>

      <DashboardGauge percent={view.gauge.percent} label={view.gauge.label} detail={view.gauge.detail} />

      <div className="dashboard__keys">
        <h2>API keys</h2>
        {view.apiKeys.map((k) => (
          <div key={k.name} className="dashboard__key-row">
            <span className="dashboard__key-name">{k.name}</span>
            <span className="dashboard__key-val">{k.masked}</span>
            <a className="btn btn--ghost" href="#rotate">
              Rotate
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
