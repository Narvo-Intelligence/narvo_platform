import Link from "next/link";
import type { Metadata } from "next";
import { DEFAULT_DOCS_URL, getDocsHomeUrl, getDocsUrl } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation",
  description: "API reference and guides for Narvo Platform.",
};

export default function DocsPage() {
  const docsOrigin = getDocsUrl();
  const docsHome = getDocsHomeUrl();

  return (
    <section className="docs-page">
      <header className="docs-page__head">
        <div className="page-eyebrow">Docs</div>
        <h1 className="docs-page__title">API reference</h1>
        <p className="docs-page__lede">
          Production documentation lives on Mintlify at <strong className="mono text-[var(--syntax-cyan)]">{docsOrigin}</strong>{" "}
          (Phase A: subdomain). Set <code className="mono">NEXT_PUBLIC_DOCS_URL</code> per environment if the hostname differs.
          On Cloudflare Pages, <code className="mono">/docs/</code> redirects there via{" "}
          <code className="mono">public/_redirects</code>.
        </p>
      </header>
      <div className="flex flex-col gap-4">
        <a className="btn btn--primary btn--lg w-fit" href={docsHome}>
          Open docs site →
        </a>
        <ul className="space-y-3 text-[var(--chalk)]">
          <li>
            <Link className="text-[var(--signal)] underline-offset-4 hover:underline" href="/playground/">
              Open playground
            </Link>
          </li>
          <li>
            <a
              className="text-[var(--signal)] underline-offset-4 hover:underline"
              href="https://github.com/Narvo-Intelligence"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub org
            </a>
          </li>
        </ul>
        <p className="text-sm text-[var(--ash)]">
          Default Mintlify URL: <span className="mono">{DEFAULT_DOCS_URL}</span>
        </p>
      </div>
    </section>
  );
}
