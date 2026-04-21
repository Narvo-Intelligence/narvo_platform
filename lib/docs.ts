/**
 * Mintlify docs — Phase A decision: hosted on a subdomain (default `docs.platform.narvo.news`).
 * Set NEXT_PUBLIC_DOCS_URL to override (staging URL, preview deployment, etc.).
 */

export const DEFAULT_DOCS_URL = "https://docs.platform.narvo.news";

export function getDocsUrl(): string {
  return process.env.NEXT_PUBLIC_DOCS_URL?.trim() || DEFAULT_DOCS_URL;
}

/** Root URL with trailing slash for consistency. */
export function getDocsHomeUrl(): string {
  const base = getDocsUrl().replace(/\/+$/, "");
  return `${base}/`;
}

/** Hash fragment on the docs origin (align anchor IDs with Mintlify navigation). */
export function getDocsFragmentUrl(fragment: string): string {
  const base = getDocsUrl().replace(/\/+$/, "");
  const id = fragment.replace(/^#/, "");
  return `${base}/#${id}`;
}
