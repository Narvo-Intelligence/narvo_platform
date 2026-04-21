import { Fragment } from "react";

const SEGMENTS = [
  "Publishers",
  "Newsrooms / radio",
  "Telcos",
  "PR / Gov",
  "NGOs / research",
  "Podcasts",
];

type TrustedBarProps = {
  /** When true, render as a div (nested in a parent section) and use compact chrome. */
  embedded?: boolean;
};

export function TrustedBar({ embedded }: TrustedBarProps) {
  const Tag = embedded ? "div" : "section";

  return (
    <Tag
      className={`trusted-bar${embedded ? " trusted-bar--embedded" : ""}`}
      aria-label="Built for"
      role={embedded ? "group" : undefined}
    >
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
    </Tag>
  );
}
