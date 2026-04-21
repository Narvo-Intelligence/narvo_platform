import { SERVICES } from "@/lib/fixtures";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status",
};

export default function StatusPage() {
  return (
    <section className="status-page">
      <header className="status-page__head">
        <div className="page-eyebrow">Systems</div>
        <h1 className="status-page__title">API status</h1>
        <p className="status-page__lede">Operational snapshot — replace with live status JSON when observability is wired.</p>
      </header>

      <div className="overflow-hidden rounded-lg border border-[var(--slate)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--obsidian-lift)] text-[var(--ash)]">
            <tr>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Uptime (30d)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--slate)] bg-[var(--graphite)]">
            {SERVICES.map((s) => (
              <tr key={s.name}>
                <td className="px-4 py-3 text-[var(--chalk)]">{s.name}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="dot dot--ok" /> Operational
                  </span>
                </td>
                <td className="mono px-4 py-3 text-[var(--syntax-cyan)]">{s.uptime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
