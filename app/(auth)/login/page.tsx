import Link from "next/link";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { ROUTE_REGISTRY, createRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createRouteMetadata(ROUTE_REGISTRY.login);

export default function LoginPage() {
  return (
    <main>
      <section className="auth">
        <div className="auth__card">
          <div className="auth__eyebrow">Developer access</div>
          <h1 className="auth__title">Welcome back.</h1>
          <p className="auth__lede">Sign in to manage your API keys, usage quota, and billing.</p>

          <div className="auth__oauth">
            <button className="btn btn--ghost" type="button" disabled aria-disabled="true" title="Coming in a later sprint">
              Continue with GitHub
            </button>
          </div>

          <div className="auth__sep">or</div>

          <LoginForm />

          <div className="auth__foot">
            No account yet? <Link href="/signup/">Create one</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
