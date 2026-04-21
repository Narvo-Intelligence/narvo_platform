import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account",
};

export default function SignupPage() {
  return (
    <main>
      <section className="auth">
        <div className="auth__card">
          <div className="auth__eyebrow">Developer sandbox</div>
          <h1 className="auth__title">Create your tenant.</h1>
          <p className="auth__lede">Issue sandbox keys instantly. Upgrade when you ship to production.</p>

          <div className="auth__oauth">
            <button className="btn btn--ghost" type="button">
              Continue with GitHub
            </button>
          </div>

          <div className="auth__sep">or</div>

          <form className="auth__form" action="#" method="post">
            <div className="auth__field">
              <label className="auth__label" htmlFor="su-email">
                Email
              </label>
              <input
                className="auth__input"
                id="su-email"
                type="email"
                autoComplete="email"
                placeholder="newsroom@example.com"
                required
              />
            </div>
            <div className="auth__field">
              <label className="auth__label" htmlFor="su-password">
                Password
              </label>
              <input
                className="auth__input"
                id="su-password"
                type="password"
                autoComplete="new-password"
                required
              />
            </div>
            <button className="btn btn--primary btn--block" type="submit" style={{ marginTop: 6 }}>
              <span>Create account</span>
            </button>
          </form>

          <div className="auth__foot">
            Already registered? <Link href="/login/">Sign in</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
