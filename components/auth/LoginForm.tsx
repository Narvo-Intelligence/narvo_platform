"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/browser";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isSupabaseConfigured()) {
    return (
      <p className="auth__banner" role="status">
        Supabase is not configured. Set <code className="mono">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
        <code className="mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code className="mono">.env.local</code> to
        enable sign-in.
      </p>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Client unavailable.");
      return;
    }
    setLoading(true);
    const { error: signErr } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signErr) {
      setError(signErr.message);
      return;
    }
    router.push("/dashboard/");
    router.refresh();
  }

  return (
    <>
      {error ? (
        <p className="auth__error" role="alert">
          {error}
        </p>
      ) : null}
      <form className="auth__form" onSubmit={onSubmit}>
        <div className="auth__field">
          <label className="auth__label" htmlFor="email">
            Email
          </label>
          <input
            className="auth__input"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
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
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <button className="btn btn--primary btn--block" type="submit" disabled={loading} style={{ marginTop: 6 }}>
          <span>{loading ? "Signing in…" : "Sign in"}</span>
        </button>
      </form>
    </>
  );
}
