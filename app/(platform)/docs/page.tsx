import Link from "next/link";
import type { Metadata } from "next";
import { DOCS_GUIDE_LINKS, DOCS_HEADER_API_MENU } from "@/lib/docs-anchors";
import { DEFAULT_DOCS_URL, getDocsFragmentUrl, getDocsHomeUrl, getDocsUrl } from "@/lib/docs";
import { ROUTE_REGISTRY, createRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createRouteMetadata(ROUTE_REGISTRY.docs);

export default function DocsPage() {
  const docsOrigin = getDocsUrl();
  const docsHome = getDocsHomeUrl();

  const endpointLinks = DOCS_HEADER_API_MENU.map(({ label, fragment }) => ({
    label,
    href: getDocsFragmentUrl(fragment),
  }));

  const guideLinks = DOCS_GUIDE_LINKS.map(({ label, fragment }) => ({
    label,
    href: getDocsFragmentUrl(fragment),
  }));

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

      <div className="flex flex-col gap-10">
        <div>
          <a className="btn btn--primary btn--lg w-fit" href={docsHome}>
            Open docs site →
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-[var(--r-lg)] border border-[var(--slate)] bg-[var(--graphite)] p-6">
            <h2 className="mb-4 text-[15px] font-semibold tracking-tight text-[var(--chalk)]">Endpoints</h2>
            <ul className="space-y-2 text-[var(--chalk)]">
              {endpointLinks.map(({ label, href }) => (
                <li key={href}>
                  <a className="text-[var(--signal)] underline-offset-4 hover:underline" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--r-lg)] border border-[var(--slate)] bg-[var(--graphite)] p-6">
            <h2 className="mb-4 text-[15px] font-semibold tracking-tight text-[var(--chalk)]">Guides</h2>
            <ul className="space-y-2 text-[var(--chalk)]">
              {guideLinks.map(({ label, href }) => (
                <li key={href}>
                  <a className="text-[var(--signal)] underline-offset-4 hover:underline" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[var(--chalk)]">
          <li>
            <Link className="text-[var(--signal)] underline-offset-4 hover:underline" href="/playground/">
              Playground
            </Link>
          </li>
          <li>
            <Link className="text-[var(--signal)] underline-offset-4 hover:underline" href="/dashboard/">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="text-[var(--signal)] underline-offset-4 hover:underline" href="/status/">
              Status
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
          Default Mintlify URL: <span className="mono">{DEFAULT_DOCS_URL}</span>. Anchor IDs are listed in{" "}
          <code className="mono text-[var(--syntax-cyan)]">lib/docs-anchors.ts</code> — update Mintlify headings or this file together.
        </p>
      </div>
    </section>
  );
}
