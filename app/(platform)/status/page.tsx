import { SERVICES } from "@/lib/fixtures";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status",
  description:
    "Live health of every Narvo Platform service — synthesis, TTS, provenance, translation, audio delivery.",
};

export default function StatusPage() {
  return (
    <section className="status">
      <header className="status__head">
        <div>
          <div className="page-eyebrow">System status · v1 beta</div>
          <h1>All systems operational.</h1>
          <p className="status__lede">
            Live health of every Narvo Platform service. Historic uptime window: 30 days. Incident timeline below.
          </p>
        </div>
        <span className="status__banner">
          <span className="dot dot--ok" /> All systems operational
        </span>
      </header>

      <div className="status__list" data-status-list>
        {SERVICES.map((s) => (
          <div key={s.name} className="status__row">
            <span className="status__service">{s.name}</span>
            <span className="status__state">
              <span className="dot dot--ok" /> {s.status}
            </span>
            <span className="status__uptime">
              {s.uptime} / 30d
            </span>
          </div>
        ))}
      </div>

      <section className="status__incidents">
        <h2>Recent incidents</h2>
        <p>
          No incidents in the last 30 days. Historic incident reports and RCAs are published here within 24 hours of
          resolution.
        </p>
      </section>
    </section>
  );
}
