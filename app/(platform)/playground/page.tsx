import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description: "Live API request builder — synthesis, TTS, provenance, translation.",
};

export default function PlaygroundPage() {
  return (
    <section className="playground">
      <header className="playground__head">
        <div>
          <div className="page-eyebrow">Playground · v1 beta</div>
          <h1 className="playground__title">Fire real endpoints.</h1>
          <p className="playground__lede">
            Pre-loaded with your sandbox key. Pick an endpoint, tweak the payload, watch the response stream back in real
            edge-region latency.
          </p>
        </div>
        <div className="playground__hints" aria-label="Keyboard shortcuts">
          <span>
            <kbd>/</kbd> run
          </span>
          <span>
            <kbd>1</kbd>–<kbd>4</kbd> switch endpoint
          </span>
          <span>
            <kbd>⎘</kbd> copy cURL
          </span>
        </div>
      </header>

      <div className="rounded-lg border border-[var(--slate)] bg-[var(--graphite)] p-8 text-[var(--ash)]">
        <p className="mono text-sm text-[var(--chalk)] mb-2">Interactive HeroTerminal migration</p>
        <p className="text-sm leading-relaxed">
          The fully interactive endpoint runner from <code className="mono text-[var(--syntax-cyan)]">narvo-plat</code>{" "}
          (<span className="mono">HeroTerminal.js</span>) is queued for the next execution slice: tabbed fixtures, typed
          cURL stream, and JSON response panel will be ported as a client component wired to sandbox API routes.
        </p>
      </div>

      <div className="playground__guide">
        <div className="playground__step">
          <div className="playground__step-num">STEP 01</div>
          <div className="playground__step-title">Authenticate</div>
          <p className="playground__step-body">Bearer key in the Authorization header — same as production.</p>
        </div>
        <div className="playground__step">
          <div className="playground__step-num">STEP 02</div>
          <div className="playground__step-title">Pick payload</div>
          <p className="playground__step-body">Switch synthesis · TTS · provenance · translate from the tab strip.</p>
        </div>
        <div className="playground__step">
          <div className="playground__step-num">STEP 03</div>
          <div className="playground__step-title">Inspect response</div>
          <p className="playground__step-body">Latency, request_id, and provenance block surface inline.</p>
        </div>
      </div>
    </section>
  );
}
