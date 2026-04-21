"use client";

import { useEffect, useRef } from "react";
import { observeRevealAll } from "@/lib/observers/reveal";

const PUBLISHER_CODE = `<span class="k">POST</span> <span class="acc">/v1/synthesis</span>
{
  <span class="k">"url"</span>: <span class="s">"https://punchng.com/story-42"</span>,
  <span class="k">"language"</span>: <span class="s">"pcm"</span>,
  <span class="k">"include_audio"</span>: <span class="n">true</span>
}
<span class="c">// → narrative + audio + provenance</span>
<span class="c">// → one call per story, metered, cached</span>`;

const ENTERPRISE_CODE = `<span class="k">WS</span> <span class="acc">wss://ws.narvo.news/v1/stream</span>
?api_key=nrv_sk_live_...

<span class="c">// Events your widget receives:</span>
&gt; <span class="k">"breaking-news:new"</span>
&gt; <span class="k">"story:published"</span>   <span class="acc">latency: 340ms</span>
&gt; <span class="k">"briefing:ready"</span>    <span class="ok">✓ 200</span>`;

export function UseCaseSplit() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) observeRevealAll(".usecase__col", ref.current);
  }, []);

  return (
    <section ref={ref} className="usecase" aria-label="Use cases">
      <div className="usecase__inner">
        <article className="usecase__col">
          <div className="usecase__eyebrow">For publishers</div>
          <h3 className="usecase__title">
            <span>Ship audio over your existing text</span>
            <br />
            <span className="usecase__title-accent">without building TTS.</span>
          </h3>
          <ul className="usecase__wins">
            <li>
              <strong>News-in-a-Box PWA</strong> — branded to your domain, powered by our pipeline
            </li>
            <li>
              <strong>RSS-in</strong> — we scrape, synthesise, and store audio in 5 languages
            </li>
            <li>
              <strong>Bandwidth Alliance</strong> — zero-egress delivery via Cloudflare + Backblaze
            </li>
          </ul>
          <pre className="usecase__code">
            <code dangerouslySetInnerHTML={{ __html: PUBLISHER_CODE }} />
          </pre>
        </article>

        <article className="usecase__col usecase__col--enterprise">
          <div className="usecase__eyebrow usecase__eyebrow--em">For enterprise</div>
          <h3 className="usecase__title">
            <span>White-label the entire pipeline</span>
            <br />
            <span className="usecase__title-accent">with custom voice + SLA.</span>
          </h3>
          <ul className="usecase__wins">
            <li>
              <strong>Dedicated infra</strong> — isolated Rust gateway + Groq inference quota
            </li>
            <li>
              <strong>Custom voice training</strong> — your brand voice, fine-tuned on YarnGPT
            </li>
            <li>
              <strong>99.9% uptime SLA</strong> — named Slack channel, 2-hour response
            </li>
          </ul>
          <pre className="usecase__code">
            <code dangerouslySetInnerHTML={{ __html: ENTERPRISE_CODE }} />
          </pre>
        </article>
      </div>
    </section>
  );
}
