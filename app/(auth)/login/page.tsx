import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <main>
      <section className="auth">
        <div className="auth__card">
          <div className="auth__eyebrow">Developer access</div>
          <h1 className="auth__title">Welcome back.</h1>
          <p className="auth__lede">Sign in to manage your API keys, usage quota, and billing.</p>

          <div className="auth__oauth">
            <button className="btn btn--ghost" type="button">
              Continue with GitHub
            </button>
          </div>

          <div className="auth__sep">or</div>

          <form className="auth__form" action="#" method="post">
            <div className="auth__field">
              <label className="auth__label" htmlFor="email">
                Email
              </label>
              <input
                className="auth__input"
                id="email"
                type="email"
                autoComplete="email"
                placeholder="dev@punchng.com"
                required
              />
            </div>
            <div className="auth__field">
              <label className="auth__label" htmlFor="password">
                Password
              </label>
              <input
                className="auth__input"
                id="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
            <button className="btn btn--primary btn--block" type="submit" style={{ marginTop: 6 }}>
              <span>Sign in</span>
            </button>
          </form>

          <div className="auth__foot">
            No account yet? <Link href="/signup/">Create one</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
