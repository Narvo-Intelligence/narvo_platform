const STACKS = ["Next.js", "REST", "cURL", "Webhooks", "Edge CDN", "OpenAPI"];

export function LandingStackStrip() {
  return (
    <section className="land-strip" aria-label="Works with your stack">
      <div className="land-strip__inner">
        <p className="land-strip__label">Ship with</p>
        <ul className="land-strip__list">
          {STACKS.map((s) => (
            <li key={s} className="land-strip__item">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
