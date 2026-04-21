"use client";

import { useEffect, useRef, useState } from "react";
import { observeRevealAll } from "@/lib/observers/reveal";

const TABS = [
  { id: "play", label: "Playground" },
  { id: "keys", label: "API keys" },
  { id: "usage", label: "Usage" },
] as const;

export function LandingProductPreview() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("play");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) observeRevealAll(".land-preview__pane", ref.current);
  }, []);

  return (
    <section ref={ref} className="land-preview" aria-labelledby="land-preview-title">
      <div className="land-preview__head">
        <h2 className="land-preview__title" id="land-preview-title">
          Portal: playground, keys, usage
        </h2>
        <p className="land-preview__lede">One shell — same chrome you ship with.</p>
      </div>

      <div className="land-preview__browser">
        <div className="land-preview__bar">
          <span className="land-preview__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="land-preview__url mono">platform.narvo.news</span>
        </div>

        <div className="land-preview__tabs" role="tablist" aria-label="Product areas">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={`land-preview__tab${tab === t.id ? " is-active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="land-preview__body">
          {tab === "play" ? (
            <div className="land-preview__pane">
              <div className="land-preview__mock land-preview__mock--split">
                <div>
                  <span className="land-preview__tag">REQUEST</span>
                  <div className="land-preview__lines" />
                </div>
                <div>
                  <span className="land-preview__tag">RESPONSE</span>
                  <div className="land-preview__lines land-preview__lines--short" />
                </div>
              </div>
            </div>
          ) : null}
          {tab === "keys" ? (
            <div className="land-preview__pane">
              <div className="land-preview__mock">
                <span className="land-preview__tag">Production</span>
                <div className="land-preview__keyrow mono">nrv_sk_live_a3f8c2••••••••</div>
                <span className="land-preview__tag">Sandbox</span>
                <div className="land-preview__keyrow mono">nrv_sk_test_612ac5••••••••</div>
              </div>
            </div>
          ) : null}
          {tab === "usage" ? (
            <div className="land-preview__pane">
              <div className="land-preview__mock land-preview__mock--chart">
                <span className="land-preview__tag">Calls (7d)</span>
                <div className="land-preview__bars" aria-hidden="true">
                  <span style={{ height: "40%" }} />
                  <span style={{ height: "72%" }} />
                  <span style={{ height: "55%" }} />
                  <span style={{ height: "88%" }} />
                  <span style={{ height: "64%" }} />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
