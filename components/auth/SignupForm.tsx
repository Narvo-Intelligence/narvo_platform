"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/browser";

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isSupabaseConfigured()) {
    return (
      <p className="auth__banner" role="status">
        Supabase is not configured. Set <code className="mono">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
        <code className="mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code className="mono">.env.local</code> to
        enable sign-up.
      </p>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setInfo(null);
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
    const { data, error: signErr } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (signErr) {
      setError(signErr.message);
      return;
    }
    if (data.session) {
      router.push("/dashboard/");
      router.refresh();
      return;
    }
    setInfo("Check your email to confirm your account, then sign in.");
  }

  return (
    <>
      {error ? (
        <p className="auth__error" role="alert">
          {error}
        </p>
      ) : null}
      {info ? (
        <p className="auth__info" role="status">
          {info}
        </p>
      ) : null}
      <form className="auth__form" onSubmit={onSubmit}>
        <div className="auth__field">
          <label className="auth__label" htmlFor="su-email">
            Email
          </label>
          <input
            className="auth__input"
            id="su-email"
            name="email"
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
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
        <button className="btn btn--primary btn--block" type="submit" disabled={loading} style={{ marginTop: 6 }}>
          <span>{loading ? "Creating…" : "Create account"}</span>
        </button>
      </form>
    </>
  );
}
