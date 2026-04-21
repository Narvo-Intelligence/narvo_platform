import { Fragment } from "react";

const SEGMENTS = [
  "Publishers",
  "Newsrooms / radio",
  "Telcos",
  "PR / Gov",
  "NGOs / research",
  "Podcasts",
];

export function TrustedBar() {
  return (
    <section className="trusted-bar" aria-label="Built for">
      <div className="trusted-bar__inner">
        <span className="trusted-bar__label">Built for</span>
        <ul className="trusted-bar__list">
          {SEGMENTS.map((s, i) => (
            <Fragment key={s}>
              <li className="trusted-bar__item">{s}</li>
              {i < SEGMENTS.length - 1 ? (
                <li className="trusted-bar__dot" aria-hidden="true">
                  ·
                </li>
              ) : null}
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
}
