/**
 * Narrative fixtures for HeroTerminal — from narvo-plat/lib/fixtures.js (FIXTURES).
 */

import type { CurlToken } from "@/lib/terminal-playground";

export type PlaygroundFixture = {
  latency: [number, number];
  request: CurlToken[];
  response: Record<string, unknown>;
  audio: { voice: string; dur: string } | null;
  provenance: boolean;
  /** Live `fetch` when bearer + `NEXT_PUBLIC_API_BASE_URL` are set. */
  api: { method: "POST"; path: string; body: Record<string, unknown> };
};

export type PlaygroundEndpointKey = "synthesis" | "tts" | "provenance" | "translate";

export const PLAYGROUND_FIXTURES: Record<PlaygroundEndpointKey, PlaygroundFixture> = {
  synthesis: {
    api: {
      method: "POST",
      path: "/v1/synthesis",
      body: {
        url: "https://punchng.com/fg-fuel-subsidy",
        language: "pcm",
        include_audio: true,
      },
    },
    latency: [1800, 2900],
    request: [
      { c: "$ ", d: 40 },
      { t: "curl", cls: "k", d: 60 },
      { t: " -X POST https://api.narvo.news", cls: "s", d: 20 },
      { t: "/v1/synthesis", cls: "acc", d: 20 },
      { t: " \\\n  -H ", cls: "", d: 20 },
      { t: '"Authorization: Bearer ', cls: "s", d: 20 },
      { t: "nrv_sk_live_a3f8c2...", cls: "acc", d: 20 },
      { t: '"', cls: "s", d: 10 },
      { t: " \\\n  -H ", cls: "", d: 20 },
      { t: '"Content-Type: application/json"', cls: "s", d: 20 },
      { t: " \\\n  -d ", cls: "", d: 20 },
      {
        t: "'{\n    \"url\": \"https://punchng.com/fg-fuel-subsidy\",\n    \"language\": \"pcm\",\n    \"include_audio\": true\n  }'",
        cls: "s",
        d: 8,
      },
    ],
    response: {
      story_id: "a3f8c2e1-7b9d-4e2a-8f1c-6d5a2b1e9c8f",
      narrative:
        "The Federal Government don announce say fuel subsidy go return next month — Finance Minister tell news people for Abuja say di decision na to help low-income families...",
      key_takeaways: [
        "Fuel subsidy return scheduled for next month",
        "Target: low-income households across 36 states",
        "Subsidy cap: ₦200/litre for PMS",
      ],
      source_attribution: ["Punch NG", "Vanguard", "Channels TV"],
      language: "pcm",
      audio_url: "https://cdn.narvo.news/audio/a3f8c2/pcm/wura.mp3",
      provenance: {
        source_count: 4,
        corroboration_level: "strong_consensus",
        consensus_score: 0.91,
      },
      latency_ms: 2412,
      request_id: "req_01HN8VXQ4K2B7M9P3R5T6W8Y0Z",
    },
    audio: { voice: "YarnGPT · wura · pcm", dur: "0:38" },
    provenance: true,
  },

  tts: {
    api: {
      method: "POST",
      path: "/v1/tts/generate",
      body: {
        text: "Good morning. Here are the headlines for Lagos today.",
        language: "en",
        voice: "emma",
        format: "mp3",
      },
    },
    latency: [600, 1200],
    request: [
      { c: "$ ", d: 40 },
      { t: "curl", cls: "k", d: 60 },
      { t: " -X POST https://api.narvo.news", cls: "s", d: 20 },
      { t: "/v1/tts/generate", cls: "acc", d: 20 },
      { t: " \\\n  -H ", cls: "", d: 20 },
      { t: '"Authorization: Bearer ', cls: "s", d: 20 },
      { t: "nrv_sk_live_a3f8c2...", cls: "acc", d: 20 },
      { t: '"', cls: "s", d: 10 },
      { t: " \\\n  -d ", cls: "", d: 20 },
      {
        t: "'{\n    \"text\": \"Good morning. Here are the headlines for Lagos today.\",\n    \"language\": \"en\",\n    \"voice\": \"emma\",\n    \"format\": \"mp3\"\n  }'",
        cls: "s",
        d: 8,
      },
    ],
    response: {
      audio_url: "https://cdn.narvo.news/audio/9f2e/en/emma_a91c.mp3",
      duration_seconds: 4.8,
      file_size_bytes: 61824,
      voice_used: "yarngpt-emma-v1",
      language: "en",
      format: "mp3",
      latency_ms: 892,
      request_id: "req_01HN8W2XQ4K7M3R9P5T6W8Y0Z2",
    },
    audio: { voice: "YarnGPT · emma · en", dur: "0:05" },
    provenance: false,
  },

  provenance: {
    api: {
      method: "POST",
      path: "/v1/provenance/analyze",
      body: {
        text: "CBN raises benchmark interest rate to 27.5%",
      },
    },
    latency: [400, 800],
    request: [
      { c: "$ ", d: 40 },
      { t: "curl", cls: "k", d: 60 },
      { t: " -X POST https://api.narvo.news", cls: "s", d: 20 },
      { t: "/v1/provenance/analyze", cls: "acc", d: 20 },
      { t: " \\\n  -H ", cls: "", d: 20 },
      { t: '"Authorization: Bearer ', cls: "s", d: 20 },
      { t: "nrv_sk_live_a3f8c2...", cls: "acc", d: 20 },
      { t: '"', cls: "s", d: 10 },
      { t: " \\\n  -d ", cls: "", d: 20 },
      {
        t: "'{\n    \"text\": \"CBN raises benchmark interest rate to 27.5%\"\n  }'",
        cls: "s",
        d: 8,
      },
    ],
    response: {
      source_count: 5,
      trusted_source_count: 4,
      source_diversity_score: 0.87,
      corroboration_level: "strong_consensus",
      consensus_score: 0.93,
      explanation:
        "Confirmed by Vanguard (Tier 1), The Punch (Tier 1), Channels TV (Tier 1), BusinessDay (Tier 1), and one secondary source. No contradicting reports.",
      evidence_links: ["https://vanguardngr.com/...", "https://punchng.com/...", "https://channelstv.com/..."],
      latency_ms: 612,
      request_id: "req_01HN8WQ4K7M3R9P5T6W8Y0Z2A1",
    },
    audio: null,
    provenance: true,
  },

  translate: {
    api: {
      method: "POST",
      path: "/v1/translate/narrate",
      body: {
        text: "The new policy takes effect on Friday.",
        target_language: "yo",
        include_audio: true,
      },
    },
    latency: [800, 1400],
    request: [
      { c: "$ ", d: 40 },
      { t: "curl", cls: "k", d: 60 },
      { t: " -X POST https://api.narvo.news", cls: "s", d: 20 },
      { t: "/v1/translate/narrate", cls: "acc", d: 20 },
      { t: " \\\n  -H ", cls: "", d: 20 },
      { t: '"Authorization: Bearer ', cls: "s", d: 20 },
      { t: "nrv_sk_live_a3f8c2...", cls: "acc", d: 20 },
      { t: '"', cls: "s", d: 10 },
      { t: " \\\n  -d ", cls: "", d: 20 },
      {
        t: "'{\n    \"text\": \"The new policy takes effect on Friday.\",\n    \"target_language\": \"yo\",\n    \"include_audio\": true\n  }'",
        cls: "s",
        d: 8,
      },
    ],
    response: {
      translated_text: "Ìlànà tuntun náà yóò bẹ̀rẹ̀ ní ọjọ́ Ẹtì tó ń bọ̀.",
      source_language: "en",
      target_language: "yo",
      audio_url: "https://cdn.narvo.news/audio/tr/yo/idera_7c2a.mp3",
      duration_seconds: 2.4,
      voice_used: "yarngpt-idera-v1",
      latency_ms: 1124,
      request_id: "req_01HN8WR7M3K4N9P5T6W8Y0Z2B3",
    },
    audio: { voice: "YarnGPT · idera · yo", dur: "0:02" },
    provenance: false,
  },
};
