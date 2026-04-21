import { HeroTerminal } from "@/components/playground/HeroTerminal";
import { PlaygroundReveal } from "@/components/playground/PlaygroundReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Live API request builder. Test synthesis, TTS, provenance, and translation against real fixtures before you write a line of SDK code.",
};

export default function PlaygroundPage() {
  return (
    <section className="playground">
      <header className="playground__head">
        <div>
          <div className="page-eyebrow">Playground · v1 beta</div>
          <h1 className="playground__title">Fire real endpoints.</h1>
          <p className="playground__lede">
            Without an API key, responses are simulated. Paste an{" "}
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--emerald)" }}>nrv_sk_</code> key and set{" "}
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--emerald)" }}>NEXT_PUBLIC_API_BASE_URL</code> to
            call the real POST endpoints from the browser
            (requires CORS on the API).
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

      <HeroTerminal variant="standalone" />

      <PlaygroundReveal>
        <div className="playground__step">
          <div className="playground__step-num">STEP 01</div>
          <h3 className="playground__step-title">Authenticate</h3>
          <p className="playground__step-desc">
            Every request carries{" "}
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--emerald)" }}>
              Authorization: Bearer nrv_sk_…
            </code>
            . Sandbox keys are free and unlimited for evaluation.
          </p>
        </div>
        <div className="playground__step">
          <div className="playground__step-num">STEP 02</div>
          <h3 className="playground__step-title">Send</h3>
          <p className="playground__step-desc">
            Hit <kbd>/</kbd> to fire the current request. The latency ticker reports real edge-region response times once
            you&apos;re on a production key.
          </p>
        </div>
        <div className="playground__step">
          <div className="playground__step-num">STEP 03</div>
          <h3 className="playground__step-title">Inspect</h3>
          <p className="playground__step-desc">
            Response includes{" "}
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--emerald)" }}>request_id</code> for support, and a{" "}
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--emerald)" }}>provenance</code> block wherever it
            applies.
          </p>
        </div>
      </PlaygroundReveal>
    </section>
  );
}
