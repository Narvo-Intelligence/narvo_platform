import { highlightCurl, syntaxHighlight } from "@/lib/syntax";
import type { ApiProduct } from "@/lib/fixtures";

export type HeroDemo = {
  key: string;
  title: string;
  verb: string;
  verbClass: string;
  path: string;
  requestHtml: string;
  responseHtml: string;
  latency: string;
  resTag: string;
};

const CURL_SYNTHESIS = `curl -X POST https://api.narvo.news/v1/synthesis \\
  -H "Authorization: Bearer nrv_sk_live_a3f8c2..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com/story",
    "language": "en",
    "include_audio": true
  }'`;

const RES_SYNTHESIS = {
  story_id: "a3f8c2e1-7b9d-4e2a-8f1c-6d5a2b1e9c8f",
  narrative: "Markets opened higher after guidance beat consensus...",
  key_takeaways: ["Guidance raised for Q3", "Margins stable YoY"],
  source_attribution: ["Reuters", "Bloomberg"],
  language: "en",
  audio_url: "https://cdn.narvo.news/audio/a3f8c2/en/emma.mp3",
  provenance: { source_count: 3, corroboration_level: "strong_consensus", consensus_score: 0.89 },
  latency_ms: 2280,
  request_id: "req_01HN8VXQ4K2B7M9P3R5T6W8Y0Z",
};

const CURL_TTS = `curl -X POST https://api.narvo.news/v1/tts/generate \\
  -H "Authorization: Bearer nrv_sk_live_a3f8c2..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Top story: rates hold steady.",
    "voice": "emma",
    "format": "mp3"
  }'`;

const RES_TTS = {
  audio_url: "https://cdn.narvo.news/tts/req_9k2m.mp3",
  duration_ms: 4200,
  format: "mp3",
  voice: "emma",
  request_id: "req_9K2MPL4Q1R8S3T6U0V2W5X",
};

const CURL_PROVENANCE = `curl -X POST https://api.narvo.news/v1/provenance/analyze \\
  -H "Authorization: Bearer nrv_sk_live_a3f8c2..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "headline": "Agency reports record Q2 revenue",
    "sources": ["https://wire.example/a", "https://wire.example/b"]
  }'`;

const RES_PROVENANCE = {
  consensus_score: 0.91,
  corroboration_level: "strong_consensus",
  fact_checks: [{ outlet: "PolitiFact", verdict: "mostly_true" }],
  request_id: "req_7H3JNQ2P5R8S1T4U6V9W0X",
};

const CURL_TRANSLATE = `curl -X POST https://api.narvo.news/v1/translate/narrate \\
  -H "Authorization: Bearer nrv_sk_live_a3f8c2..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Breaking: summit concludes with joint statement.",
    "target_language": "fr",
    "include_audio": true
  }'`;

const RES_TRANSLATE = {
  translated_text: "Dernière minute : le sommet se conclut par une déclaration conjointe.",
  audio_url: "https://cdn.narvo.news/tr/req_m4n.mp3",
  request_id: "req_M4N5O6P7Q8R9S0T1U2V3W4X",
};

const CURL_BRIEFING = `curl -sS https://api.narvo.news/v1/briefing/latest \\
  -H "Authorization: Bearer nrv_sk_live_a3f8c2..."`;

const RES_BRIEFING = {
  briefing_id: "brf_2026-04-22",
  segments: [{ title: "Markets", audio_url: "https://cdn.narvo.news/b/seg1.mp3" }],
  generated_at: "2026-04-22T06:00:00Z",
  cache: "HIT",
  request_id: "req_BRF1C2D3E4F5G6H7I8J9K",
};

const WS_NOTE = `# WebSocket (example)
# wscat -c "wss://ws.narvo.news/v1/stream" \\
#   -H "Authorization: Bearer nrv_sk_live_..."`;

const RES_REALTIME = {
  status: "roadmap",
  events: ["breaking:new", "story:published", "briefing:ready"],
  note: "Subscribe after GA; bearer auth on connect.",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildHeroDemos(apis: ApiProduct[]): HeroDemo[] {
  const pick = apis.slice(0, 6);
  const payloads: Omit<HeroDemo, "key" | "title" | "verb" | "verbClass" | "path">[] = [
    {
      requestHtml: highlightCurl(CURL_SYNTHESIS),
      responseHtml: syntaxHighlight(RES_SYNTHESIS),
      latency: "2.28s · typical",
      resTag: "JSON",
    },
    {
      requestHtml: highlightCurl(CURL_TTS),
      responseHtml: syntaxHighlight(RES_TTS),
      latency: "0.94s · typical",
      resTag: "JSON",
    },
    {
      requestHtml: highlightCurl(CURL_PROVENANCE),
      responseHtml: syntaxHighlight(RES_PROVENANCE),
      latency: "0.62s · typical",
      resTag: "JSON",
    },
    {
      requestHtml: highlightCurl(CURL_TRANSLATE),
      responseHtml: syntaxHighlight(RES_TRANSLATE),
      latency: "1.31s · typical",
      resTag: "JSON",
    },
    {
      requestHtml: highlightCurl(CURL_BRIEFING),
      responseHtml: syntaxHighlight(RES_BRIEFING),
      latency: "cached · <120ms",
      resTag: "JSON",
    },
    {
      requestHtml: `<span class="c">${escapeHtml(WS_NOTE)}</span>`,
      responseHtml: syntaxHighlight(RES_REALTIME),
      latency: "roadmap",
      resTag: "Spec",
    },
  ];

  return pick.map((api, i) => {
    const p = payloads[i];
    return {
      key: api.key,
      title: api.title,
      verb: api.verb,
      verbClass: api.verbClass,
      path: api.endpoint,
      ...p,
    };
  });
}
