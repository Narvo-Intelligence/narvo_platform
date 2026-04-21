/**
 * API / pricing / status fixtures — from narvo-plat/lib/fixtures.js
 * Source of truth: New_Narvo_B2B.md §8–9, §15
 */

export type ApiTag = string | { label: string; ok?: boolean };

export type ApiProduct = {
  key: string;
  num: string;
  tier: string;
  title: string;
  desc: string;
  verb: string;
  verbClass: string;
  endpoint: string;
  tags: ApiTag[];
  latency: string;
  future?: boolean;
  tierFuture?: boolean;
};

export const APIS: ApiProduct[] = [
  {
    key: "synthesis",
    num: "01",
    tier: "Developer · Publisher+",
    title: "Synthesis",
    desc: "URL or text → narrative, takeaways, sources, optional audio.",
    verb: "POST",
    verbClass: "post",
    endpoint: "/v1/synthesis",
    tags: ["en", "yo", "ha", "ig", "pcm"],
    latency: "P95 < 3.0s",
  },
  {
    key: "tts",
    num: "02",
    tier: "All tiers",
    title: "Broadcast TTS",
    desc: "African voices (YarnGPT + fallback). MP3 or streaming Opus.",
    verb: "POST",
    verbClass: "post",
    endpoint: "/v1/tts/generate",
    tags: ["emma", "idera", "zainab", "osagie", "wura"],
    latency: "P95 < 1.2s",
  },
  {
    key: "provenance",
    num: "03",
    tier: "Publisher+",
    title: "Provenance Tag",
    desc: "Consensus scores from fact-checkers and Tier-1 Nigerian sources (RAG).",
    verb: "POST",
    verbClass: "post",
    endpoint: "/v1/provenance/analyze",
    tags: [
      { label: "single" },
      { label: "developing" },
      { label: "widely_reported", ok: true },
      { label: "strong_consensus", ok: true },
    ],
    latency: "P95 < 800ms",
  },
  {
    key: "translate",
    num: "04",
    tier: "All tiers",
    title: "Translate & Narrate",
    desc: "Journalistic register for African languages. Text or text + audio.",
    verb: "POST",
    verbClass: "post",
    endpoint: "/v1/translate/narrate",
    tags: ["en→yo", "en→ha", "en→ig", "en→pcm"],
    latency: "P95 < 1.4s",
  },
  {
    key: "briefing",
    num: "05",
    tier: "Newsroom+",
    title: "Morning Briefing",
    desc: "Daily bundle: audio, segments, provenance — ready to embed.",
    verb: "GET",
    verbClass: "get",
    endpoint: "/v1/briefing/latest",
    tags: ["daily", "segments[]", "audio_url"],
    latency: "cached · < 120ms",
  },
  {
    key: "realtime",
    num: "06",
    tier: "[FUTURE]",
    tierFuture: true,
    future: true,
    title: "Realtime / WebSocket",
    desc: "Breaking fan-out for widgets, dashboards, telco alerts (roadmap).",
    verb: "WS",
    verbClass: "ws",
    endpoint: "wss://ws.narvo.news/v1/stream",
    tags: ["breaking:new", "story:published", "briefing:ready"],
    latency: "ships post-funding",
  },
];

export const LANGUAGES = [
  { code: "en", name: "English", voice: "YarnGPT · emma" },
  { code: "yo", name: "Yorùbá", voice: "YarnGPT · idera" },
  { code: "ha", name: "Hausa", voice: "YarnGPT · zainab" },
  { code: "ig", name: "Igbo", voice: "YarnGPT · osagie" },
  { code: "pcm", name: "Nigerian Pidgin", voice: "YarnGPT · wura" },
] as const;

export const TIERS = [
  {
    tier: "Developer",
    price: "0",
    currency: "$",
    period: "/forever",
    bullets: ["1,000 calls / month", "English only", "Sandbox keys", "Community Discord"],
    cta: { label: "Start free", href: "/signup/", style: "ghost" as const },
  },
  {
    tier: "Publisher",
    price: "49",
    currency: "$",
    period: "/month",
    featured: true,
    badge: "Most picked",
    bullets: ["50,000 calls / month", "All 5 Nigerian languages", "Provenance Tag API", "99.5% uptime SLA"],
    cta: { label: "Get API key", href: "/signup/", style: "primary" as const },
  },
  {
    tier: "Newsroom",
    price: "199",
    currency: "$",
    period: "/month",
    bullets: ["300,000 calls / month", "Custom voice model", "Priority synthesis queue", "99.7% uptime SLA"],
    cta: { label: "Contact sales", href: "#contact", style: "ghost" as const },
  },
  {
    tier: "Enterprise",
    price: "499",
    currency: "from $",
    period: "/month",
    bullets: ["Unlimited calls", "White-label SDK", "Dedicated infra + 99.9%", "QBR + named Slack"],
    cta: { label: "Talk to us", href: "#contact", style: "ghost" as const },
  },
];

export const OVERAGES = [
  { label: "synthesis call", price: "$0.05" },
  { label: "TTS audio minute", price: "$0.10" },
  { label: "translation call", price: "$0.03" },
  { label: "provenance call", price: "$0.02" },
];

export const SERVICES = [
  { name: "Synthesis API", status: "operational", uptime: "99.8%" },
  { name: "Broadcast TTS", status: "operational", uptime: "99.7%" },
  { name: "Provenance Tag", status: "operational", uptime: "99.6%" },
  { name: "Translation API", status: "operational", uptime: "99.8%" },
  { name: "Audio Delivery (CDN)", status: "operational", uptime: "99.9%" },
];
