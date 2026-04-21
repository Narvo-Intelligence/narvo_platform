import Link from "next/link";
import { createNotFoundMetadata } from "@/lib/metadata";
import { getDocsHomeUrl } from "@/lib/docs";

export const metadata = createNotFoundMetadata();

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found__inner">
        <p className="page-eyebrow">404</p>
        <h1 className="not-found__title">Page not found</h1>
        <p className="not-found__lede">
          The path you requested does not exist on this site. Try the home page, dashboard, or documentation.
        </p>
        <div className="not-found__actions">
          <Link className="btn btn--primary btn--lg" href="/">
            Home <span aria-hidden="true">→</span>
          </Link>
          <Link className="btn btn--ghost btn--lg" href="/dashboard/">
            Dashboard
          </Link>
          <a className="btn btn--ghost btn--lg" href={getDocsHomeUrl()}>
            Documentation
          </a>
        </div>
        <p className="not-found__fineprint mono">
          Narvo Platform ·{" "}
          <Link className="not-found__inline" href="/login/">
            Sign in
          </Link>
          {" · "}
          <Link className="not-found__inline" href="/signup/">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
