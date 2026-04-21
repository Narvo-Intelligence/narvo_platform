import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description: "API reference and guides for Narvo Platform.",
};

export default function DocsPage() {
  return (
    <section className="docs-page">
      <header className="docs-page__head">
        <div className="page-eyebrow">Docs</div>
        <h1 className="docs-page__title">API reference</h1>
        <p className="docs-page__lede">
          Mintlify-powered documentation (<code>/docs</code> on production) will replace this stub. For now, use the
          execution doc routing decision and link out when the docs site is live.
        </p>
      </header>
      <ul className="space-y-3 text-[var(--chalk)]">
        <li>
          <Link className="text-[var(--signal)] underline-offset-4 hover:underline" href="/playground/">
            Open playground
          </Link>
        </li>
        <li>
          <a className="text-[var(--signal)] underline-offset-4 hover:underline" href="https://github.com/Narvo-Intelligence">
            GitHub org
          </a>
        </li>
      </ul>
    </section>
  );
}
