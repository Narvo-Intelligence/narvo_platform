import Link from "next/link";
import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";

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
            <button className="btn btn--ghost" type="button" disabled aria-disabled="true" title="Coming in a later sprint">
              Continue with GitHub
            </button>
          </div>

          <div className="auth__sep">or</div>

          <SignupForm />

          <div className="auth__foot">
            Already registered? <Link href="/login/">Sign in</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
