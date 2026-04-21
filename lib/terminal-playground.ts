/**
 * Terminal simulation — ported from narvo-plat/resources/js/lib/terminal.js
 */

import { syntaxHighlight } from "@/lib/syntax";

export type CurlToken = { c?: string; t?: string; cls?: string; d?: number };

export function getReduceMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export async function typeRequest(
  target: HTMLElement,
  tokens: CurlToken[],
  { getRunId, myRun }: { getRunId?: () => number; myRun?: number } = {},
): Promise<void> {
  const reduceMotion = getReduceMotion();
  target.innerHTML = "";
  for (const tok of tokens) {
    if (getRunId && getRunId() !== myRun) return;
    const span = document.createElement("span");
    if (tok.cls) span.className = tok.cls;
    else if (tok.c) span.className = "c";
    target.appendChild(span);

    const text = tok.c ?? tok.t ?? "";
    if (reduceMotion) {
      span.textContent = text;
    } else {
      for (const ch of text) {
        if (getRunId && getRunId() !== myRun) return;
        span.textContent += ch;
        const pre = target.parentElement;
        if (pre) pre.scrollTop = pre.scrollHeight;
        await sleep(Math.max(4, (tok.d || 20) / 3));
      }
    }
  }
}

export async function streamResponse(
  target: HTMLElement,
  obj: object,
  { getRunId, myRun }: { getRunId?: () => number; myRun?: number } = {},
): Promise<void> {
  const full = syntaxHighlight(obj);
  const reduceMotion = getReduceMotion();
  if (reduceMotion) {
    if (getRunId && getRunId() !== myRun) return;
    target.innerHTML = full;
    return;
  }
  target.innerHTML = "";
  const chunk = 4;
  let end = 0;
  while (end < full.length) {
    if (getRunId && getRunId() !== myRun) return;
    end = Math.min(end + chunk, full.length);
    const slice = full.slice(0, end);
    const lastOpen = slice.lastIndexOf("<");
    const lastClose = slice.lastIndexOf(">");
    if (lastOpen > lastClose) {
      const nextClose = full.indexOf(">", end);
      if (nextClose !== -1) end = nextClose + 1;
      else end = full.length;
    }
    target.innerHTML = full.slice(0, end) + '<span class="caret"></span>';
    const pre = target.parentElement;
    if (pre) pre.scrollTop = pre.scrollHeight;
    await sleep(8);
  }
  target.innerHTML = full;
}
