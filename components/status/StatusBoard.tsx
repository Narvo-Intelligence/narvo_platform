"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchStatusFeed,
  resolveStatusView,
  type StatusFeedPayload,
  type StatusServiceRow,
} from "@/lib/status-feed";

const POLL_MS = 60_000;

function serviceStateClass(status: string): "ok" | "warn" | "err" {
  const s = status.toLowerCase();
  if (s === "operational" || s === "ok" || s === "healthy") return "ok";
  if (s === "degraded" || s === "maintenance" || s === "partial") return "warn";
  return "err";
}

export function StatusBoard() {
  const [payload, setPayload] = useState<StatusFeedPayload | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [feedReady, setFeedReady] = useState(false);
  const [tick, setTick] = useState(0);

  const load = useCallback(async (signal: AbortSignal) => {
    const result = await fetchStatusFeed(signal);
    if (signal.aborted) return;
    if (result.ok) {
      setPayload(result.data);
      setFetchError(null);
    } else {
      setPayload(null);
      setFetchError(result.error);
    }
    setFeedReady(true);
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    const id = window.setTimeout(() => {
      void load(ac.signal);
    }, 0);
    return () => {
      window.clearTimeout(id);
      ac.abort();
    };
  }, [load, tick]);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), POLL_MS);
    return () => window.clearInterval(id);
  }, []);

  const view = useMemo(
    () => resolveStatusView(payload, fetchError),
    [payload, fetchError],
  );

  const feedLine = !feedReady ? "Fetching status feed…" : view.sourceNote;

  const bannerModifier = view.bannerHealthy ? "" : " status__banner--degraded";

  return (
    <section className="status">
      <header className="status__head">
        <div>
          <div className="page-eyebrow">System status · v1 beta</div>
          <h1>{view.headline}</h1>
          <p className="status__lede">{view.lede}</p>
        </div>
        <span className={`status__banner${bannerModifier}`}>
          <span className={`dot dot--${view.bannerHealthy ? "ok" : "idle"}`} /> {view.bannerLabel}
        </span>
      </header>

      <p className="status__feed-meta" role={fetchError ? "alert" : "status"}>
        {feedLine}
      </p>

      <div className="status__list" data-status-list>
        {view.services.map((s: StatusServiceRow) => {
          const st = serviceStateClass(s.status);
          return (
            <div key={s.name} className="status__row">
              <span className="status__service">{s.name}</span>
              <span className={`status__state status__state--${st}`}>
                <span className={`dot dot--${st === "ok" ? "ok" : st === "warn" ? "idle" : "err"}`} />{" "}
                {s.status}
              </span>
              <span className="status__uptime">{s.uptime} / 30d</span>
            </div>
          );
        })}
      </div>

      <section className="status__incidents">
        <h2>Recent incidents</h2>
        {view.incidents.length === 0 ? (
          <p>
            No incidents in the last 30 days. Historic incident reports and RCAs are published here within 24 hours of
            resolution.
          </p>
        ) : (
          <ul className="status__incident-list">
            {view.incidents.map((inc, i) => (
              <li key={`${inc.title}-${i}`} className="status__incident-item">
                <strong>{inc.title}</strong>
                {inc.resolvedAt ? (
                  <span className="status__incident-meta">{inc.resolvedAt}</span>
                ) : null}
                {inc.body ? <p>{inc.body}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
