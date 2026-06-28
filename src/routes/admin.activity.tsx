import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ScrollText, Search, Filter, Download, User, Building2, ShieldCheck, CreditCard, Settings, LogIn, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/admin/activity")({
  head: () => ({ meta: [{ title: "Activity Logs — Super Admin" }, { name: "description", content: "Audit log of every admin and system action." }] }),
  component: ActivityPage,
});

type Log = { id: string; time: string; actor: string; role: string; action: string; target: string; category: "Auth" | "Clinic" | "Billing" | "Security" | "Settings" | "System"; ip: string; severity: "info" | "warn" | "error" };

const logs: Log[] = [
  { id: "L-9921", time: "2026-06-27 10:42", actor: "Avery K.", role: "Admin", action: "Logged in", target: "Super Admin Console", category: "Auth", ip: "73.21.4.10", severity: "info" },
  { id: "L-9920", time: "2026-06-27 10:38", actor: "Jordan M.", role: "Support", action: "Refunded payment", target: "TX-9815 — Riverside Dental", category: "Billing", ip: "73.21.5.21", severity: "warn" },
  { id: "L-9919", time: "2026-06-27 10:11", actor: "System", role: "System", action: "Failed payment retry", target: "Coastal Dental", category: "Billing", ip: "—", severity: "error" },
  { id: "L-9918", time: "2026-06-27 09:54", actor: "Avery K.", role: "Admin", action: "Suspended clinic", target: "Riverside Dental", category: "Clinic", ip: "73.21.4.10", severity: "warn" },
  { id: "L-9917", time: "2026-06-27 09:30", actor: "Sam P.", role: "Support", action: "Updated module flags", target: "ai_intake_summary", category: "Settings", ip: "73.21.6.12", severity: "info" },
  { id: "L-9916", time: "2026-06-27 09:21", actor: "Avery K.", role: "Admin", action: "Created coupon", target: "WINBACK", category: "Billing", ip: "73.21.4.10", severity: "info" },
  { id: "L-9915", time: "2026-06-27 09:02", actor: "System", role: "System", action: "Daily backup completed", target: "All databases", category: "System", ip: "—", severity: "info" },
  { id: "L-9914", time: "2026-06-27 08:48", actor: "Unknown", role: "—", action: "Failed login attempt (5x)", target: "admin@dentallogue.com", category: "Security", ip: "203.0.113.99", severity: "error" },
  { id: "L-9913", time: "2026-06-27 08:30", actor: "Jordan M.", role: "Support", action: "Replied to ticket", target: "T-3120", category: "System", ip: "73.21.5.21", severity: "info" },
  { id: "L-9912", time: "2026-06-27 08:14", actor: "Avery K.", role: "Admin", action: "Changed plan price", target: "Professional — ₦249/mo", category: "Settings", ip: "73.21.4.10", severity: "warn" },
];

const catIcon = { Auth: LogIn, Clinic: Building2, Billing: CreditCard, Security: ShieldCheck, Settings, System: ScrollText };

function sevTone(s: Log["severity"]) {
  return s === "info" ? "bg-info/10 text-info border-info/20"
    : s === "warn" ? "bg-warning/15 text-warning-foreground border-warning/20"
    : "bg-destructive/10 text-destructive border-destructive/20";
}

function ActivityPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [sev, setSev] = useState("all");
  const filtered = logs.filter(l =>
    (cat === "all" || l.category.toLowerCase() === cat) &&
    (sev === "all" || l.severity === sev) &&
    (l.actor.toLowerCase().includes(q.toLowerCase()) || l.action.toLowerCase().includes(q.toLowerCase()) || l.target.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Activity Logs</h1>
          <p className="mt-1 text-sm text-muted-foreground">Every action by admins, support and system — immutable audit trail.</p>
        </div>
        <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Events today", v: "428", i: ScrollText, t: "bg-primary-soft text-accent-foreground" },
          { l: "Admins active", v: "6", i: User, t: "bg-info/10 text-info" },
          { l: "Warnings (24h)", v: "11", i: AlertTriangle, t: "bg-warning/15 text-warning-foreground" },
          { l: "Failed logins", v: "5", i: ShieldCheck, t: "bg-destructive/10 text-destructive" },
        ].map(s => (
          <div key={s.l} className="surface-card flex items-center gap-3 p-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.t}`}><s.i className="h-5 w-5" /></div>
            <div><div className="text-xs text-muted-foreground">{s.l}</div><div className="text-lg font-semibold">{s.v}</div></div>
          </div>
        ))}
      </div>

      <div className="surface-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search actor, action or target" className="pl-9" />
          </div>
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              <SelectItem value="auth">Auth</SelectItem>
              <SelectItem value="clinic">Clinic</SelectItem>
              <SelectItem value="billing">Billing</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="settings">Settings</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sev} onValueChange={setSev}>
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All severity</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warn">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5">Time</th>
                <th className="px-4 py-2.5">Actor</th>
                <th className="px-4 py-2.5">Action</th>
                <th className="px-4 py-2.5">Target</th>
                <th className="px-4 py-2.5">Category</th>
                <th className="px-4 py-2.5">IP</th>
                <th className="px-4 py-2.5">Severity</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => {
                const Icon = catIcon[l.category];
                return (
                  <tr key={l.id} className="border-t border-border/60 hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{l.time}</td>
                    <td className="px-4 py-3 text-xs"><div className="font-medium text-foreground">{l.actor}</div><div className="text-muted-foreground">{l.role}</div></td>
                    <td className="px-4 py-3 text-sm">{l.action}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{l.target}</td>
                    <td className="px-4 py-3"><Badge variant="outline" className="bg-muted text-foreground gap-1"><Icon className="h-3 w-3" />{l.category}</Badge></td>
                    <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{l.ip}</td>
                    <td className="px-4 py-3"><Badge variant="outline" className={sevTone(l.severity)}>{l.severity}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
          <span>Showing {filtered.length} of {logs.length}</span>
          <div className="flex gap-1"><Button variant="ghost" size="sm">Previous</Button><Button variant="ghost" size="sm">Next</Button></div>
        </div>
      </div>
    </div>
  );
}
