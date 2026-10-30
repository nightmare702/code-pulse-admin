import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="brand"><span className="brand-mark">CP</span><span>CODE PULSE<small>ADMIN CONSOLE</small></span></div>
        <div className="auth-eyebrow">ACCESS RESTRICTED</div>
        <h1>Not authorized</h1>
        <p>This Google account is not on the Code Pulse Admin administrator allowlist.</p>
        <Link className="google-button link-button" href="/login">Return to sign in</Link>
      </section>
    </main>
  );
}
