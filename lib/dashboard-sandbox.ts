/**
 * Dashboard sandbox JSON — optional `NEXT_PUBLIC_DASHBOARD_SANDBOX_URL`, else `/sandbox/dashboard.json`.
 * Merges with built-in defaults so partial payloads still render.
 */

export type DashboardTile = { label: string; value: string; sub: string; valueTone?: "ok" | "default" | "err" };

export type DashboardSandboxKey = { name: string; masked: string };

export type DashboardSandboxPayload = {
  sandbox?: boolean;
  tenantId?: string;
  tenantTier?: string;
  tiles?: DashboardTile[];
  gauge?: {
    percent: number;
    label?: string;
    detail?: string;
  };
  apiKeys?: DashboardSandboxKey[];
};

export const DEFAULT_DASHBOARD_SANDBOX_PATH = "/sandbox/dashboard.json";

export function getDashboardSandboxUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_DASHBOARD_SANDBOX_URL?.trim();
  if (fromEnv) return fromEnv;
  return DEFAULT_DASHBOARD_SANDBOX_PATH;
}

const FALLBACK_TILES: DashboardTile[] = [
  { label: "Calls today", value: "1,842", sub: "+12% vs. yesterday" },
  { label: "P95 latency (7d)", value: "2.71s", sub: "synthesis · target < 3.0s" },
  { label: "Error rate (7d)", value: "0.08%", sub: "5xx / total", valueTone: "ok" },
  { label: "Renewal", value: "May 14", sub: "Publisher · $49/mo" },
];

const FALLBACK_KEYS: DashboardSandboxKey[] = [
  { name: "Production", masked: "nrv_sk_live_a3f8c2e1••••••••••••" },
  { name: "Staging", masked: "nrv_sk_live_9f2e7b3d••••••••••••" },
  { name: "Sandbox", masked: "nrv_sk_test_612ac5d8••••••••••••" },
];

export const DEFAULT_DASHBOARD_VIEW = {
  tenantId: "tnt_a3f8c2e1_publisher",
  tenantTier: "Publisher tier",
  tiles: FALLBACK_TILES,
  gauge: {
    percent: 82,
    label: "Monthly quota",
    detail: "41,000 / 50,000 calls · 82% used",
  },
  apiKeys: FALLBACK_KEYS,
  sandbox: true,
} as const;

export type DashboardResolvedView = {
  tenantId: string;
  tenantTier: string;
  tiles: DashboardTile[];
  gauge: { percent: number; label: string; detail: string };
  apiKeys: DashboardSandboxKey[];
  sandbox: boolean;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function parseTiles(raw: unknown): DashboardTile[] | null {
  if (!Array.isArray(raw)) return null;
  const out: DashboardTile[] = [];
  for (const t of raw) {
    if (!isRecord(t)) continue;
    const label = typeof t.label === "string" ? t.label : "";
    const value = typeof t.value === "string" ? t.value : "";
    const sub = typeof t.sub === "string" ? t.sub : "";
    const valueTone =
      t.valueTone === "ok" || t.valueTone === "err" || t.valueTone === "default"
        ? t.valueTone
        : undefined;
    if (!label || !value) continue;
    out.push({ label, value, sub, valueTone });
  }
  return out.length ? out : null;
}

function parseKeys(raw: unknown): DashboardSandboxKey[] | null {
  if (!Array.isArray(raw)) return null;
  const out: DashboardSandboxKey[] = [];
  for (const k of raw) {
    if (!isRecord(k)) continue;
    const name = typeof k.name === "string" ? k.name : "";
    const masked = typeof k.masked === "string" ? k.masked : "";
    if (!name || !masked) continue;
    out.push({ name, masked });
  }
  return out.length ? out : null;
}

export function parseDashboardSandboxJson(json: unknown): DashboardSandboxPayload {
  if (!isRecord(json)) return {};
  const tenantId = typeof json.tenantId === "string" ? json.tenantId : undefined;
  const tenantTier = typeof json.tenantTier === "string" ? json.tenantTier : undefined;
  const sandbox = typeof json.sandbox === "boolean" ? json.sandbox : undefined;
  const tiles = parseTiles(json.tiles) ?? undefined;
  const apiKeys = parseKeys(json.apiKeys) ?? undefined;
  let gauge: DashboardSandboxPayload["gauge"];
  if (isRecord(json.gauge)) {
    const percent = Number(json.gauge.percent);
    if (!Number.isFinite(percent)) gauge = undefined;
    else {
      const label = typeof json.gauge.label === "string" ? json.gauge.label : undefined;
      const detail = typeof json.gauge.detail === "string" ? json.gauge.detail : undefined;
      gauge = { percent: Math.min(100, Math.max(0, percent)), label, detail };
    }
  }
  return { tenantId, tenantTier, tiles, gauge, apiKeys, sandbox };
}

export function mergeDashboardView(payload: DashboardSandboxPayload): DashboardResolvedView {
  const d = DEFAULT_DASHBOARD_VIEW;
  const gaugePercent = payload.gauge?.percent ?? d.gauge.percent;
  return {
    tenantId: payload.tenantId?.trim() || d.tenantId,
    tenantTier: payload.tenantTier?.trim() || d.tenantTier,
    tiles: payload.tiles?.length ? payload.tiles : [...d.tiles],
    gauge: {
      percent: Math.min(100, Math.max(0, gaugePercent)),
      label: payload.gauge?.label?.trim() || d.gauge.label,
      detail: payload.gauge?.detail?.trim() || d.gauge.detail,
    },
    apiKeys: payload.apiKeys?.length ? payload.apiKeys : [...d.apiKeys],
    sandbox: payload.sandbox ?? d.sandbox,
  };
}

export type DashboardSandboxResult =
  | { ok: true; view: DashboardResolvedView; httpStatus: number }
  | { ok: false; error: string; httpStatus: number | null; view: DashboardResolvedView };

export async function fetchDashboardSandbox(signal?: AbortSignal): Promise<DashboardSandboxResult> {
  const url = getDashboardSandboxUrl();
  const fallback = mergeDashboardView({});
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
        error: `Dashboard sandbox HTTP ${res.status} (${url})`,
        view: fallback,
      };
    }
    let body: unknown;
    try {
      body = (await res.json()) as unknown;
    } catch {
      return {
        ok: false,
        httpStatus,
        error: "Dashboard sandbox response is not valid JSON.",
        view: fallback,
      };
    }
    const view = mergeDashboardView(parseDashboardSandboxJson(body));
    return { ok: true, httpStatus, view };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    const isAbort = e instanceof DOMException && e.name === "AbortError";
    if (isAbort) {
      return { ok: false, httpStatus: null, error: "Request aborted.", view: fallback };
    }
    if (msg === "Failed to fetch" || msg.includes("NetworkError")) {
      return {
        ok: false,
        httpStatus: null,
        error: "Network error — check CORS if the sandbox URL is on another origin.",
        view: fallback,
      };
    }
    return { ok: false, httpStatus: null, error: msg, view: fallback };
  }
}
