import { DashboardGauge } from "@/components/dashboard/DashboardGauge";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Quota gauge, latency P95, error rate, API key management. Preview the paying-tenant experience.",
};

export default function DashboardPage() {
  return (
    <section className="dashboard">
      <header className="dashboard__head">
        <div>
          <div className="page-eyebrow">Dashboard · preview</div>
          <h1>Overview</h1>
          <p className="dashboard__sub">
            <code>
              tenant_id: <span className="mono--accent">tnt_a3f8c2e1_publisher</span>
            </code>{" "}
            · Publisher tier
          </p>
        </div>
        <span className="dashboard__gate">
          <span className="dot dot--ok" />
          Preview mode —{" "}
          <Link href="/login/" className="dashboard__gate-link">
            sign in
          </Link>{" "}
          for live metrics
        </span>
      </header>

      <div className="dashboard__overview">
        <div className="dashboard__tile">
          <div className="dashboard__tile-label">Calls today</div>
          <div className="dashboard__tile-value">1,842</div>
          <div className="dashboard__tile-sub">+12% vs. yesterday</div>
        </div>
        <div className="dashboard__tile">
          <div className="dashboard__tile-label">P95 latency (7d)</div>
          <div className="dashboard__tile-value">2.71s</div>
          <div className="dashboard__tile-sub">
            synthesis · target &lt; 3.0s
          </div>
        </div>
        <div className="dashboard__tile">
          <div className="dashboard__tile-label">Error rate (7d)</div>
          <div className="dashboard__tile-value" style={{ color: "var(--emerald)" }}>
            0.08%
          </div>
          <div className="dashboard__tile-sub">5xx / total</div>
        </div>
        <div className="dashboard__tile">
          <div className="dashboard__tile-label">Renewal</div>
          <div className="dashboard__tile-value">May 14</div>
          <div className="dashboard__tile-sub">Publisher · $49/mo</div>
        </div>
      </div>

      <DashboardGauge />

      <div className="dashboard__keys">
        <h2>API keys</h2>
        <div className="dashboard__key-row">
          <span className="dashboard__key-name">Production</span>
          <span className="dashboard__key-val">nrv_sk_live_a3f8c2e1••••••••••••</span>
          <a className="btn btn--ghost" href="#rotate">
            Rotate
          </a>
        </div>
        <div className="dashboard__key-row">
          <span className="dashboard__key-name">Staging</span>
          <span className="dashboard__key-val">nrv_sk_live_9f2e7b3d••••••••••••</span>
          <a className="btn btn--ghost" href="#rotate">
            Rotate
          </a>
        </div>
        <div className="dashboard__key-row">
          <span className="dashboard__key-name">Sandbox</span>
          <span className="dashboard__key-val">nrv_sk_test_612ac5d8••••••••••••</span>
          <a className="btn btn--ghost" href="#rotate">
            Rotate
          </a>
        </div>
      </div>
    </section>
  );
}
