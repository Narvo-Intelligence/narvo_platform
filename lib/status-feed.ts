/**
 * Status page feed — optional `NEXT_PUBLIC_STATUS_FEED_URL`, else same-origin `/status-feed.json`.
 */

import { SERVICES } from "@/lib/fixtures";

export type StatusServiceRow = {
  name: string;
  status: string;
  uptime: string;
};

export type StatusIncidentItem = {
  title: string;
  body?: string;
  resolvedAt?: string;
};

export type StatusFeedPayload = {
  updatedAt?: string;
  headline?: string;
  lede?: string;
  banner?: { label?: string; healthy?: boolean };
  services?: StatusServiceRow[];
  incidents?: StatusIncidentItem[];
};

export const DEFAULT_STATUS_FEED_PATH = "/status-feed.json";

export function getStatusFeedUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_STATUS_FEED_URL?.trim();
  if (fromEnv) return fromEnv;
  return DEFAULT_STATUS_FEED_PATH;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function parseServices(raw: unknown): StatusServiceRow[] | null {
  if (!Array.isArray(raw)) return null;
  const out: StatusServiceRow[] = [];
  for (const row of raw) {
    if (!isRecord(row)) continue;
    const name = typeof row.name === "string" ? row.name : "";
    const status = typeof row.status === "string" ? row.status : "";
    const uptime = typeof row.uptime === "string" ? row.uptime : "";
    if (!name || !status) continue;
    out.push({ name, status, uptime: uptime || "—" });
  }
  return out.length ? out : null;
}

function parseIncidents(raw: unknown): StatusIncidentItem[] {
  if (!Array.isArray(raw)) return [];
  const out: StatusIncidentItem[] = [];
  for (const item of raw) {
    if (!isRecord(item)) continue;
    const title = typeof item.title === "string" ? item.title : "";
    if (!title) continue;
    const body = typeof item.body === "string" ? item.body : undefined;
    const resolvedAt = typeof item.resolvedAt === "string" ? item.resolvedAt : undefined;
    out.push({ title, body, resolvedAt });
  }
  return out;
}

export function parseStatusFeedJson(json: unknown): StatusFeedPayload {
  if (!isRecord(json)) return {};
  const headline = typeof json.headline === "string" ? json.headline : undefined;
  const lede = typeof json.lede === "string" ? json.lede : undefined;
  const updatedAt = typeof json.updatedAt === "string" ? json.updatedAt : undefined;
  let banner: StatusFeedPayload["banner"];
  if (isRecord(json.banner)) {
    const label = typeof json.banner.label === "string" ? json.banner.label : undefined;
    const healthy = typeof json.banner.healthy === "boolean" ? json.banner.healthy : undefined;
    if (label !== undefined || healthy !== undefined) banner = { label, healthy };
  }
  const services = parseServices(json.services) ?? undefined;
  const incidents = parseIncidents(json.incidents);
  return { updatedAt, headline, lede, banner, services, incidents };
}

export type StatusFeedResult =
  | { ok: true; data: StatusFeedPayload; httpStatus: number }
  | { ok: false; error: string; httpStatus: number | null };

export async function fetchStatusFeed(signal?: AbortSignal): Promise<StatusFeedResult> {
  const url = getStatusFeedUrl();
  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal,
      headers: { Accept: "application/json" },
    });
    const httpStatus = res.status;
    if (!res.ok) {
      return {
        ok: false,
        httpStatus,
        error: `Status feed HTTP ${res.status} (${url})`,
      };
    }
    let body: unknown;
    try {
      body = (await res.json()) as unknown;
    } catch {
      return { ok: false, httpStatus, error: "Status feed response is not valid JSON." };
    }
    return { ok: true, httpStatus, data: parseStatusFeedJson(body) };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    const isAbort = e instanceof DOMException && e.name === "AbortError";
    if (isAbort) {
      return { ok: false, httpStatus: null, error: "Request aborted." };
    }
    if (msg === "Failed to fetch" || msg.includes("NetworkError")) {
      return {
        ok: false,
        httpStatus: null,
        error: "Network error — check CORS if the feed URL is on another origin.",
      };
    }
    return { ok: false, httpStatus: null, error: msg };
  }
}

export function resolveStatusView(
  payload: StatusFeedPayload | null,
  fallbackError: string | null,
): {
  services: StatusServiceRow[];
  headline: string;
  lede: string;
  bannerLabel: string;
  bannerHealthy: boolean;
  incidents: StatusIncidentItem[];
  updatedAt: string | null;
  sourceNote: string;
} {
  const services = payload?.services?.length ? payload.services : SERVICES;
  const allOperational = services.every(
    (s) => s.status.toLowerCase() === "operational",
  );
  const bannerHealthy = payload?.banner?.healthy ?? allOperational;
  const headline =
    payload?.headline ??
    (bannerHealthy ? "All systems operational." : "Some systems degraded.");
  const lede =
    payload?.lede ??
    "Live health of every Narvo Platform service. Historic uptime window: 30 days. Incident timeline below.";
  const bannerLabel = payload?.banner?.label ?? (bannerHealthy ? "All systems operational" : "Service disruption");
  const incidents = payload?.incidents ?? [];
  const updatedAt = payload?.updatedAt ?? null;
  const feedUrl = getStatusFeedUrl();
  const sourceNote = fallbackError
    ? `Could not load ${feedUrl} — ${fallbackError}`
    : `Source: ${feedUrl}${updatedAt ? ` · ${updatedAt}` : ""}`;
  return {
    services,
    headline,
    lede,
    bannerLabel,
    bannerHealthy,
    incidents,
    updatedAt,
    sourceNote,
  };
}
