"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );

  async function signIn() {
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: { prompt: "select_account" },
        },
      });
      if (authError) throw authError;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in could not start.");
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="brand"><span className="brand-mark">CP</span><span>CODE PULSE<small>ADMIN CONSOLE</small></span></div>
      <div className="auth-eyebrow">RESTRICTED WORKSPACE</div>
      <h1>Administrator sign in</h1>
      <p>Continue with the authorized Google account to access Code Pulse Admin.</p>
      {!configured && <div className="auth-warning">Authentication setup is incomplete. Supabase environment variables must be added to this Vercel project before sign-in can work.</div>}
      <button className="google-button" onClick={signIn} disabled={!configured || loading}>
        {loading ? "Connecting…" : "Continue with Google"}
      </button>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <div className="auth-foot">Access is limited to the administrator allowlist.</div>
    </div>
  );
}
