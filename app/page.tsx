import { redirect } from "next/navigation";
import { Activity, CircleDollarSign, ShieldCheck, Users, WalletCards } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./sign-out-button";

export const dynamic = "force-dynamic";

const metrics = [
  { label: "Registered users", value: "—", note: "Awaiting authenticated user data", icon: Users },
  { label: "Active sessions", value: "—", note: "Live connection not configured", icon: Activity },
  { label: "Trading volume", value: "—", note: "No verified trading feed connected", icon: WalletCards },
  { label: "Partner commission", value: "—", note: "Requires verified Deriv partner data", icon: CircleDollarSign },
];

export default async function Home() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      !process.env.CODE_PULSE_ADMIN_EMAIL) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const configuredAdmin = process.env.CODE_PULSE_ADMIN_EMAIL.trim().toLowerCase();
  const authenticatedEmail = (user.email ?? "").trim().toLowerCase();
  if (!user.email_confirmed_at || authenticatedEmail !== configuredAdmin) {
    redirect("/unauthorized");
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">CP</span><span>CODE PULSE<small>ADMIN CONSOLE</small></span></div>
        <div className="nav-label">WORKSPACE</div>
        <a className="nav active" href="#"><Activity size={17}/> Overview</a>
        <a className="nav" href="#users"><Users size={17}/> Users</a>
        <a className="nav" href="#activity"><Activity size={17}/> Live activity</a>
        <a className="nav" href="#revenue"><CircleDollarSign size={17}/> Revenue</a>
        <div className="sidebar-bottom"><ShieldCheck size={16}/><span>Admin environment<br/><small>Authenticated session</small></span></div>
      </aside>
      <section className="main">
        <header className="topbar"><div><div className="eyebrow">CONTROL CENTER / OVERVIEW</div><h1>Good day, Admin</h1><p>Signed in as {user.email}. Monitor your Code Pulse platform from one workspace.</p></div><div className="topbar-actions"><div className="admin-pill"><span className="online-dot"/> Verified administrator</div><SignOutButton /></div></header>
        <div className="notice"><ShieldCheck size={18}/><div><strong>Secure administrator session active.</strong><p>This console is a separate project. It does not read or modify your existing Code Pulse app. Metrics remain blank until approved data sources are configured.</p></div></div>
        <div className="section-head"><div><h2>Platform overview</h2><p>Verified metrics will appear here after integration.</p></div><span className="period">ALL TIME <span>⌄</span></span></div>
        <div className="metrics">{metrics.map(({label,value,note,icon:Icon})=><article className="metric" key={label}><div className="metric-top"><span>{label}</span><Icon size={18}/></div><div className="metric-value">{value}</div><div className="metric-note">{note}</div></article>)}</div>
        <div className="grid-two">
          <article className="panel" id="activity"><div className="panel-head"><div><h3>Live platform activity</h3><p>Recent user and trading events</p></div><span className="tag">NOT CONNECTED</span></div><div className="empty"><span className="empty-icon"><Activity size={20}/></span><strong>Waiting for a verified event source</strong><p>Activity will appear after the existing app has an approved way to send events.</p></div></article>
          <article className="panel" id="revenue"><div className="panel-head"><div><h3>Commission overview</h3><p>Partner earnings, not estimated trading profit</p></div><span className="tag">NOT CONNECTED</span></div><div className="empty"><span className="empty-icon"><CircleDollarSign size={20}/></span><strong>Partner reporting not configured</strong><p>Only confirmed Deriv partner commission records will be reported here.</p></div></article>
        </div>
        <article className="panel users-panel" id="users"><div className="panel-head"><div><h3>User management</h3><p>Accounts, access status and registration details</p></div><span className="tag">DATA SOURCE PENDING</span></div><div className="empty compact"><span className="empty-icon"><Users size={20}/></span><strong>User records will appear after a secure, approved integration</strong><p>No user records are fabricated or loaded from sample data.</p></div></article>
        <footer>CODE PULSE ADMIN <span>Independent administration project · Secure integrations pending</span></footer>
      </section>
    </main>
  );
}
