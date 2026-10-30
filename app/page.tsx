import { Activity, ArrowDownRight, ArrowUpRight, CircleDollarSign, ShieldCheck, Users, WalletCards } from "lucide-react";

const metrics = [
  { label: "Registered users", value: "—", note: "Awaiting authenticated user data", icon: Users },
  { label: "Active sessions", value: "—", note: "Live connection not configured", icon: Activity },
  { label: "Trading volume", value: "—", note: "No verified trading feed connected", icon: WalletCards },
  { label: "Partner commission", value: "—", note: "Requires verified Deriv partner data", icon: CircleDollarSign },
];

export default function Home() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">CP</span><span>CODE PULSE<small>ADMIN CONSOLE</small></span></div>
        <div className="nav-label">WORKSPACE</div>
        <a className="nav active" href="#"><Activity size={17}/> Overview</a>
        <a className="nav" href="#users"><Users size={17}/> Users</a>
        <a className="nav" href="#activity"><Activity size={17}/> Live activity</a>
        <a className="nav" href="#revenue"><CircleDollarSign size={17}/> Revenue</a>
        <div className="sidebar-bottom"><ShieldCheck size={16}/><span>Admin environment<br/><small>Backend connection pending</small></span></div>
      </aside>
      <section className="main">
        <header className="topbar"><div><div className="eyebrow">CONTROL CENTER / OVERVIEW</div><h1>Good day, Admin</h1><p>Monitor your Code Pulse platform from one workspace.</p></div><div className="admin-pill"><span className="online-dot"/> Admin workspace</div></header>
        <div className="notice"><ShieldCheck size={18}/><div><strong>Foundation created — live data is not connected yet.</strong><p>This console is a new, separate project. It does not read or modify your existing Code Pulse app. Metrics remain blank until secure authentication and approved data sources are configured.</p></div></div>
        <div className="section-head"><div><h2>Platform overview</h2><p>Verified metrics will appear here after integration.</p></div><span className="period">ALL TIME <span>⌄</span></span></div>
        <div className="metrics">{metrics.map(({label,value,note,icon:Icon})=><article className="metric" key={label}><div className="metric-top"><span>{label}</span><Icon size={18}/></div><div className="metric-value">{value}</div><div className="metric-note">{note}</div></article>)}</div>
        <div className="grid-two">
          <article className="panel" id="activity"><div className="panel-head"><div><h3>Live platform activity</h3><p>Recent user and trading events</p></div><span className="tag">NOT CONNECTED</span></div><div className="empty"><span className="empty-icon"><Activity size={20}/></span><strong>Waiting for a verified event source</strong><p>Activity will appear after the existing app has an approved way to send events.</p></div></article>
          <article className="panel" id="revenue"><div className="panel-head"><div><h3>Commission overview</h3><p>Partner earnings, not estimated trading profit</p></div><span className="tag">NOT CONNECTED</span></div><div className="empty"><span className="empty-icon"><CircleDollarSign size={20}/></span><strong>Partner reporting not configured</strong><p>Only confirmed Deriv partner commission records will be reported here.</p></div></article>
        </div>
        <article className="panel users-panel" id="users"><div className="panel-head"><div><h3>User management</h3><p>Accounts, access status and registration details</p></div><span className="tag">AUTH SETUP PENDING</span></div><div className="empty compact"><span className="empty-icon"><Users size={20}/></span><strong>User records will appear after Google sign-in and database setup</strong><p>No user records are fabricated or loaded from sample data.</p></div></article>
        <footer>CODE PULSE ADMIN <span>Independent administration project · Secure integrations pending</span></footer>
      </section>
    </main>
  );
}
