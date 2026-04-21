import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <section className="dash">
      <header className="dash__head">
        <div className="page-eyebrow">Tenant overview</div>
        <h1 className="dash__title">Usage &amp; quota</h1>
        <p className="dash__lede">
          Authenticated dashboard wiring (Supabase session, usage events, API keys) ships in the next wave per the B2B
          execution doc.
        </p>
      </header>
      <div className="rounded-lg border border-[var(--slate)] bg-[var(--graphite)] p-8 text-[var(--ash)]">
        Placeholder — charts, quota gauge, and key management will connect to tenant-scoped APIs.
      </div>
    </section>
  );
}
