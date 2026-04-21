"use client";

/**
 * Interactive API demo terminal — ported from narvo-plat/resources/js/Components/HeroTerminal.js
 */

import { PLAYGROUND_FIXTURES, type PlaygroundEndpointKey } from "@/lib/playground-fixtures";
import { rand, sleep, streamResponse, typeRequest } from "@/lib/terminal-playground";
import { useEffect, useRef } from "react";

function isEndpointKey(k: string): k is PlaygroundEndpointKey {
  return k === "synthesis" || k === "tts" || k === "provenance" || k === "translate";
}

type Props = {
  variant?: "inline" | "standalone";
};

export function HeroTerminal({ variant = "inline" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const $ = <T extends HTMLElement>(sel: string) => root.querySelector(sel) as T | null;

    const termReq = $("[data-request] > code");
    const termRes = $("[data-response] > code");
    const termLat = $("[data-latency]");
    const statusLine = $("[data-status]");
    const runBtn = $("[data-run]");
    const audioCard = $("[data-audio]");
    const audioVoice = $("[data-audio-voice]");
    const audioDur = $("[data-audio-dur]");
    const audioPlay = $("[data-audio-play]");
    const wave = $("[data-waveform]");
    const provTag = $("[data-provenance]");
    const provScore = $("[data-prov-score]");
    const reqIdEl = $("[data-req-id]");
    const regionEl = $("[data-region]");
    const copyBtn = $("[data-copy-req]");
    const tabs = root.querySelectorAll<HTMLButtonElement>(".terminal__tabs .tab");

    if (
      !termReq ||
      !termRes ||
      !termLat ||
      !statusLine ||
      !runBtn ||
      !audioCard ||
      !audioVoice ||
      !audioDur ||
      !audioPlay ||
      !wave ||
      !provTag ||
      !provScore ||
      !reqIdEl ||
      !copyBtn ||
      tabs.length === 0
    ) {
      return;
    }

    const codeReq = termReq;
    const codeRes = termRes;
    const latencyEl = termLat;
    const statusEl = statusLine;
    const runButton = runBtn;
    const audioPanel = audioCard;
    const voiceEl = audioVoice;
    const durEl = audioDur;
    const playBtn = audioPlay;
    const waveEl = wave;
    const provPanel = provTag;
    const scoreEl = provScore;
    const requestIdEl = reqIdEl;
    const copyButton = copyBtn;

    const runLabel = runButton.querySelector(".runbtn__label");

    waveEl.innerHTML = Array.from({ length: 24 })
      .map(() => "<span></span>")
      .join("");
    waveEl.querySelectorAll("span").forEach((s) => {
      (s as HTMLElement).style.height = `${rand(20, 95)}%`;
    });

    let currentEndpoint: PlaygroundEndpointKey = "synthesis";
    let isRunning = false;
    let runId = 0;
    const getRunId = () => runId;

    function setStatus(state: "idle" | "ok" | "err", label: string) {
      const cls =
        state === "ok" ? "dot--ok" : state === "err" ? "dot--err" : "dot--idle";
      statusEl.innerHTML = `<span class="dot ${cls}"></span><span>${label}</span>`;
    }

    async function runCurrent() {
      if (isRunning) return;
      isRunning = true;
      const myRun = ++runId;
      runButton.classList.add("is-running");
      if (runLabel) runLabel.textContent = "Running";

      const fx = PLAYGROUND_FIXTURES[currentEndpoint];
      latencyEl.textContent = "↻ running";
      latencyEl.style.color = "var(--signal)";
      setStatus("idle", "running");
      codeRes.innerHTML = '<span class="c">// streaming response…</span>';
      audioPanel.hidden = true;
      provPanel.hidden = true;

      const simLatency = Math.round(rand(fx.latency[0], fx.latency[1]));
      const start = performance.now();
      let stopTick = false;
      (function tick() {
        if (stopTick) return;
        const elapsed = Math.min(simLatency, Math.round(performance.now() - start));
        latencyEl.textContent = `${elapsed}ms`;
        if (elapsed < simLatency) requestAnimationFrame(tick);
      })();

      await typeRequest(codeReq, fx.request, { getRunId, myRun });
      if (myRun !== runId) {
        stopTick = true;
        return;
      }
      await sleep(Math.max(0, simLatency - (performance.now() - start)));
      if (myRun !== runId) {
        stopTick = true;
        return;
      }
      stopTick = true;
      latencyEl.textContent = `${simLatency}ms`;
      latencyEl.style.color = "var(--emerald)";

      const body = { ...fx.response } as Record<string, unknown>;
      body.latency_ms = simLatency;
      requestIdEl.textContent = String(body.request_id ?? "—");

      await streamResponse(codeRes, body as object, { getRunId, myRun });
      if (myRun !== runId) return;
      setStatus("ok", "200 ok");

      if (fx.audio) {
        voiceEl.textContent = fx.audio.voice;
        durEl.textContent = fx.audio.dur;
        audioPanel.hidden = false;
        waveEl.classList.remove("is-playing");
      }
      if (fx.provenance) {
        const provBlock = body.provenance as { consensus_score?: number } | undefined;
        const score = (provBlock?.consensus_score ?? body.consensus_score ?? 0.9) as number;
        scoreEl.textContent = score.toFixed(2);
        provPanel.hidden = false;
      }

      runButton.classList.remove("is-running");
      if (runLabel) runLabel.textContent = "Run";
      isRunning = false;
    }

    function selectEndpoint(name: string) {
      if (!isEndpointKey(name)) return;
      currentEndpoint = name;
      runId++;
      isRunning = false;
      runButton.classList.remove("is-running");
      if (runLabel) runLabel.textContent = "Run";

      tabs.forEach((t) => {
        const active = t.dataset.endpoint === name;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      });
      codeRes.innerHTML = '<span class="dim">// press Run or hit `/` to execute</span>';
      latencyEl.textContent = "—";
      latencyEl.style.color = "var(--ash)";
      setStatus("idle", "idle");
      audioPanel.hidden = true;
      provPanel.hidden = true;

      void typeRequest(codeReq, PLAYGROUND_FIXTURES[name].request, { getRunId, myRun: runId });
    }

    const tabListeners: Array<{ el: HTMLButtonElement; fn: () => void }> = [];
    tabs.forEach((tab) => {
      const fn = () => {
        const ep = tab.dataset.endpoint;
        if (ep) selectEndpoint(ep);
      };
      tab.addEventListener("click", fn);
      tabListeners.push({ el: tab, fn });
    });

    const onRun = () => void runCurrent();
    runButton.addEventListener("click", onRun);

    const onAudioToggle = () => waveEl.classList.toggle("is-playing");
    playBtn.addEventListener("click", onAudioToggle);

    const onCopy = async () => {
      const text = codeReq.textContent?.replace(/^\$\s*/, "") ?? "";
      try {
        await navigator.clipboard.writeText(text);
        copyButton.textContent = "✓";
        setTimeout(() => {
          copyButton.textContent = "⎘";
        }, 1200);
      } catch {
        /* ignore */
      }
    };
    copyButton.addEventListener("click", onCopy);

    const keyHandler = (e: KeyboardEvent) => {
      const typing = /input|textarea/i.test(document.activeElement?.tagName ?? "");
      if (typing) return;
      if (e.key === "/" || (e.key === "Enter" && e.target === document.body)) {
        e.preventDefault();
        void runCurrent();
      }
      if (e.key >= "1" && e.key <= "4") {
        const map: PlaygroundEndpointKey[] = ["synthesis", "tts", "provenance", "translate"];
        selectEndpoint(map[parseInt(e.key, 10) - 1]);
      }
    };
    document.addEventListener("keydown", keyHandler);

    let regionInterval: ReturnType<typeof setInterval> | undefined;
    const reduceMotion =
      typeof window.matchMedia !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (regionEl && !reduceMotion) {
      const regions = [
        "eu-west-1 · edge-LOS",
        "eu-west-1 · edge-ABV",
        "eu-west-1 · edge-FRA",
        "eu-west-1 · edge-LHR",
      ];
      let i = 0;
      regionInterval = setInterval(() => {
        i = (i + 1) % regions.length;
        regionEl.textContent = regions[i];
      }, 5200);
    }

    selectEndpoint("synthesis");

    return () => {
      tabListeners.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      runButton.removeEventListener("click", onRun);
      playBtn.removeEventListener("click", onAudioToggle);
      copyButton.removeEventListener("click", onCopy);
      document.removeEventListener("keydown", keyHandler);
      if (regionInterval) clearInterval(regionInterval);
    };
  }, []);

  const cls =
    variant === "standalone" ? "terminal terminal--standalone" : "terminal";

  return (
    <div ref={rootRef} className={cls} role="region" aria-label="Live API demo">
      <div className="terminal__chrome">
        <div className="terminal__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="terminal__tabs" role="tablist">
          <button
            type="button"
            className="tab is-active"
            role="tab"
            data-endpoint="synthesis"
            aria-selected
          >
            POST /v1/synthesis
          </button>
          <button type="button" className="tab" role="tab" data-endpoint="tts" aria-selected={false}>
            POST /v1/tts
          </button>
          <button
            type="button"
            className="tab"
            role="tab"
            data-endpoint="provenance"
            aria-selected={false}
          >
            POST /v1/provenance
          </button>
          <button
            type="button"
            className="tab"
            role="tab"
            data-endpoint="translate"
            aria-selected={false}
          >
            POST /v1/translate
          </button>
        </div>
        <div className="terminal__meta">
          <span className="terminal__latency" data-latency>
            —
          </span>
          <button type="button" className="iconbtn" data-copy-req aria-label="Copy request" title="Copy cURL">
            ⎘
          </button>
        </div>
      </div>

      <div className="terminal__body">
        <div className="terminal__col terminal__col--req">
          <div className="col__head">
            REQUEST <span className="col__tag">cURL</span>
          </div>
          <pre className="code" data-request>
            <code />
          </pre>
          <button className="runbtn" data-run type="button">
            <span className="runbtn__icon" aria-hidden="true">
              ▶
            </span>
            <span className="runbtn__label">Run</span>
            <span className="runbtn__kbd">↵</span>
          </button>
        </div>

        <div className="terminal__col terminal__col--res">
          <div className="col__head">
            <span>RESPONSE</span>
            <span className="status-line" data-status>
              <span className="dot dot--idle" />
              <span>idle</span>
            </span>
          </div>
          <pre className="code code--res" data-response>
            <code className="dim">{"// response will stream here"}</code>
          </pre>

          <div className="audio-card" data-audio hidden>
            <button type="button" className="audio-card__play" data-audio-play aria-label="Play generated audio">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <div className="audio-card__meta">
              <div className="audio-card__voice" data-audio-voice>
                YarnGPT · emma · en
              </div>
              <div className="waveform" data-waveform aria-hidden="true" />
            </div>
            <div className="audio-card__dur" data-audio-dur>
              0:28
            </div>
          </div>

          <div className="provenance" data-provenance hidden>
            <span className="provenance__badge">
              <span className="provenance__dot" />
              strong_consensus
            </span>
            <span className="provenance__score" data-prov-score>
              0.00
            </span>
            <span className="provenance__sources">
              <span className="src-chip">Punch</span>
              <span className="src-chip">Vanguard</span>
              <span className="src-chip">Channels</span>
              <span className="src-chip">BusinessDay</span>
            </span>
          </div>
        </div>
      </div>

      <div className="terminal__foot">
        <span className="foot__item">
          <span className="dot dot--ok" /> 200 OK
        </span>
        <span className="foot__item" data-region>
          eu-west-1 · edge-LOS
        </span>
        <span className="foot__item foot__item--right">
          request_id: <span className="mono" data-req-id>
            —
          </span>
        </span>
      </div>
    </div>
  );
}
