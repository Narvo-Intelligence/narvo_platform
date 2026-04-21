import type { Metadata } from "next";

export const PLATFORM_TITLE = "Narvo Platform";

/** Canonical portal origin — override with NEXT_PUBLIC_SITE_URL at build time. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://platform.narvo.news";

/** Matches root layout default `<title>` when no segment title is set. */
export const HOME_BROWSER_TITLE = `${PLATFORM_TITLE} — African narrative APIs`;

/** Shared root layout description — reused for home route OG/twitter. */
export const HOME_DESCRIPTION =
  "Narrative synthesis, five-language TTS, translation and source provenance — the Narvo News pipeline as versioned REST.";

export type RouteDefinition = {
  pathname: string;
  description: string;
  /** Omitted on home — keeps root layout default title (`HOME_BROWSER_TITLE`). */
  title?: string;
};

function normalizePathname(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function absoluteUrl(pathname: string): string {
  const base = SITE_URL.replace(/\/+$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

/**
 * Consistent SEO/OG/twitter + canonical per route (static export–safe).
 * Inner pages: set `title` so the layout template becomes `"{title} · {PLATFORM_TITLE}"`.
 */
export function createRouteMetadata(input: RouteDefinition): Metadata {
  const pathname = normalizePathname(input.pathname);
  const url = absoluteUrl(pathname);

  const pageTitle =
    input.title !== undefined ? `${input.title} · ${PLATFORM_TITLE}` : HOME_BROWSER_TITLE;

  const base: Metadata = {
    description: input.description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: pageTitle,
      description: input.description,
      url,
      siteName: PLATFORM_TITLE,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: pageTitle,
      description: input.description,
    },
  };

  if (input.title !== undefined) {
    base.title = input.title;
  }

  return base;
}

/** 404 — no canonical URL; do not index standalone error pages in search. */
export function createNotFoundMetadata(): Metadata {
  const title = "Page not found";
  const description =
    "This URL is not part of Narvo Platform. Use the navigation below to return home, sign in, or read the docs.";
  const pageTitle = `${title} · ${PLATFORM_TITLE}`;
  return {
    title,
    description,
    robots: { index: false, follow: true },
    openGraph: {
      title: pageTitle,
      description,
      siteName: PLATFORM_TITLE,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: pageTitle,
      description,
    },
  };
}

/**
 * Single source for route titles, descriptions, and canonical paths.
 * Update here when adding a page or changing slugs (trailingSlash: true).
 */
export const ROUTE_REGISTRY = {
  home: {
    pathname: "/",
    description: HOME_DESCRIPTION,
  },
  docs: {
    pathname: "/docs/",
    title: "Documentation",
    description: "API reference and guides for Narvo Platform.",
  },
  playground: {
    pathname: "/playground/",
    title: "Playground",
    description:
      "Live API request builder. Test synthesis, TTS, provenance, and translation against real fixtures before you write a line of SDK code.",
  },
  dashboard: {
    pathname: "/dashboard/",
    title: "Dashboard",
    description:
      "Quota gauge, latency P95, error rate, API key management. Preview the paying-tenant experience.",
  },
  pricing: {
    pathname: "/pricing/",
    title: "Pricing",
    description:
      "Four tiers — Developer free, Publisher $49/mo, Newsroom $199/mo, Enterprise from $499/mo. Transparent per-call overages.",
  },
  status: {
    pathname: "/status/",
    title: "Status",
    description:
      "Live health of every Narvo Platform service — synthesis, TTS, provenance, translation, audio delivery.",
  },
  login: {
    pathname: "/login/",
    title: "Sign in",
    description: "Sign in to Narvo Platform to manage API keys, usage, and billing.",
  },
  signup: {
    pathname: "/signup/",
    title: "Sign up",
    description:
      "Create your Narvo Platform account — sandbox keys, quotas, billing, and the tenant dashboard.",
  },
} as const satisfies Record<string, RouteDefinition>;

export type RouteRegistryKey = keyof typeof ROUTE_REGISTRY;
