export const PLATFORM_TITLE = "Narvo Platform";

/** Canonical portal origin — override with NEXT_PUBLIC_SITE_URL at build time. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://platform.narvo.news";
