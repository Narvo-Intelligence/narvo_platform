import type { CurlToken } from "@/lib/terminal-playground";

/** Normalised API origin (no trailing slash), or null if unset. */
export function getPlaygroundApiOrigin(): string | null {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!raw) return null;
  try {
    const u = new URL(raw.includes("://") ? raw : `https://${raw}`);
    return u.origin;
  } catch {
    return null;
  }
}

export function maskBearer(bearer: string): string {
  const t = bearer.trim();
  if (!t) return "…";
  if (t.length <= 16) return `${t.slice(0, 6)}…`;
  return `${t.slice(0, 12)}…`;
}

/** Tokens for the animated cURL display (masked bearer). */
export function buildLiveCurlTokens(
  origin: string,
  path: string,
  bearerMasked: string,
  body: Record<string, unknown>,
): CurlToken[] {
  const url = `${origin.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
  const bodyStr = JSON.stringify(body, null, 2);
  const dash = `'${bodyStr.replace(/'/g, `'\\''`)}'`;
  return [
    { c: "$ ", d: 40 },
    { t: "curl", cls: "k", d: 50 },
    { t: " -X POST ", cls: "", d: 20 },
    { t: url, cls: "acc", d: 12 },
    { t: " \\\n  -H ", cls: "", d: 16 },
    { t: '"Authorization: Bearer ', cls: "s", d: 12 },
    { t: bearerMasked, cls: "acc", d: 12 },
    { t: '"', cls: "s", d: 8 },
    { t: " \\\n  -H ", cls: "", d: 16 },
    { t: '"Content-Type: application/json"', cls: "s", d: 12 },
    { t: " \\\n  -d ", cls: "", d: 16 },
    { t: dash, cls: "s", d: 6 },
  ];
}

/** Copy/paste-safe one-line cURL with real bearer (user clipboard). */
export function buildCurlForClipboard(
  origin: string,
  path: string,
  bearer: string,
  body: Record<string, unknown>,
): string {
  const url = `${origin.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
  return `curl -X POST ${JSON.stringify(url)} -H ${JSON.stringify(`Authorization: Bearer ${bearer}`)} -H ${JSON.stringify("Content-Type: application/json")} -d ${JSON.stringify(JSON.stringify(body))}`;
}

export type PlaygroundFetchResult = {
  ok: boolean;
  status: number;
  latencyMs: number;
  json: unknown;
};

export async function executePlaygroundRequest(
  origin: string,
  path: string,
  bearer: string,
  body: Record<string, unknown>,
): Promise<PlaygroundFetchResult> {
  const url = `${origin.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
  const started = performance.now();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearer}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const latencyMs = Math.round(performance.now() - started);
  const text = await res.text();
  let json: unknown;
  try {
    json = text ? (JSON.parse(text) as unknown) : {};
  } catch {
    json = { _parse_error: true, body: text.slice(0, 4000) };
  }
  return { ok: res.ok, status: res.status, latencyMs, json };
}
