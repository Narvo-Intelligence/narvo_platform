/**
 * Canonical Mintlify URL hash fragments (heading anchor IDs on `NEXT_PUBLIC_DOCS_URL`).
 * Header API menu, footer, docs hub, and landing cards must stay aligned with published Mintlify headings.
 */

export const MINTLIFY_FRAGMENTS = {
  synthesis: "synthesis",
  translate: "translate",
  tts: "tts",
  provenance: "provenance",
  briefing: "briefing",
  quickstart: "quickstart",
  sdks: "sdks",
} as const;

export type MintlifyFragmentKey = keyof typeof MINTLIFY_FRAGMENTS;

/** Desktop header → API dropdown (order preserved). */
export const DOCS_HEADER_API_MENU = [
  { label: "Synthesis", fragment: MINTLIFY_FRAGMENTS.synthesis },
  { label: "Translation", fragment: MINTLIFY_FRAGMENTS.translate },
  { label: "Broadcast TTS", fragment: MINTLIFY_FRAGMENTS.tts },
  { label: "Provenance Tag", fragment: MINTLIFY_FRAGMENTS.provenance },
  { label: "Morning Briefing", fragment: MINTLIFY_FRAGMENTS.briefing },
] as const;

/** Footer secondary + docs hub “Guides”. */
export const DOCS_GUIDE_LINKS = [
  { label: "Quick start", fragment: MINTLIFY_FRAGMENTS.quickstart },
  { label: "SDKs", fragment: MINTLIFY_FRAGMENTS.sdks },
] as const;
