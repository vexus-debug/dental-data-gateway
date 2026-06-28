import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { KeyRound, Plus, Shield, MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/clinic/users")({
  head: () => ({ meta: [{ title: "Users & Roles — Dentallogue" }] }),
  component: UsersPage,
});

const users = [
  { id: "U1", name: "Dr. John Doe", email: "john@clinic.com", role: "Owner", status: "Active", lastLogin: "10 min ago", initials: "JD" },
  { id: "U2", name: "Dr. Anna Smith", email: "anna@clinic.com", role: "Dentist", status: "Active", lastLogin: "1 hr ago", initials: "AS" },
  { id: "U3", name: "Maria Garcia", email: "maria@clinic.com", role: "Hygienist", status: "Active", lastLogin: "2 hr ago", initials: "MG" },
  { id: "U4", name: "Tom Becker", email: "tom@clinic.com", role: "Assistant", status: "Active", lastLogin: "5 hr ago", initials: "TB" },
  { id: "U5", name: "Lisa Chen", email: "lisa@clinic.com", role: "Reception", status: "Suspended", lastLogin: "3 days ago", initials: "LC" },
];

const roles = [
  { name: "Owner", count: 1, perms: ["Full access", "Billing", "Settings", "Users"] },
  { name: "Dentist", count: 3, perms: ["Patients", "Clinical", "Treatment plans", "Imaging"] },
  { name: "Hygienist", count: 2, perms: ["Patients", "Appointments", "Clinical notes"] },
  { name: "Assistant", count: 4, perms: ["Appointments", "Queue", "Documents"] },
  { name: "Reception", count: 2, perms: ["Appointments", "Patients", "Billing"] },
];

function UsersPage() {
  const [tab, setTab] = useState("users");
  const [q, setQ] = useState("");
  const filtered = users.filter(u => u.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Users & Roles</h1><p className="mt-1 text-sm text-muted-foreground">Manage access, permissions, and audit activity.</p></div>
        <Button className="gap-2"><Plus className="h-4 w-4" />Invite user</Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}><TabsList><TabsTrigger value="users">Users</TabsTrigger><TabsTrigger value="roles">Roles</TabsTrigger><TabsTrigger value="audit">Audit log</TabsTrigger></TabsList></Tabs>

      {tab === "users" && (
        <div className="surface-card overflow-hidden">
          <div className="border-b border-border p-3"><div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search users..." className="pl-9" /></div></div>
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-2">User</th><th className="px-4 py-2">Role</th><th className="px-4 py-2">Status</th><th className="px-4 py-2">Last login</th><th className="px-4 py-2">2FA</th><th className="px-4 py-2"></th></tr></thead>
            <tbody>{filtered.map(u => (<tr key={u.id} className="border-t border-border/60 hover:bg-muted/30"><td className="px-4 py-3"><div className="flex items-center gap-3"><Avatar className="h-9 w-9"><AvatarFallback>{u.initials}</AvatarFallback></Avatar><div><div className="font-medium">{u.name}</div><div className="text-xs text-muted-foreground">{u.email}</div></div></div></td><td className="px-4 py-3"><Badge variant="outline">{u.role}</Badge></td><td className="px-4 py-3"><Badge variant="outline" className={u.status === "Active" ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive"}>{u.status}</Badge></td><td className="px-4 py-3 text-xs">{u.lastLogin}</td><td className="px-4 py-3"><Switch defaultChecked /></td><td className="px-4 py-3"><Button size="icon" variant="ghost" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></td></tr>))}</tbody>
          </table>
        </div>
      )}

      {tab === "roles" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map(r => (<div key={r.name} className="surface-card p-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /><span className="font-semibold">{r.name}</span></div><Badge variant="outline">{r.count}</Badge></div><div className="mt-3 flex flex-wrap gap-1">{r.perms.map(p => <Badge key={p} variant="outline" className="text-[10px]">{p}</Badge>)}</div><Button size="sm" variant="outline" className="mt-3 w-full">Edit permissions</Button></div>))}
        </div>
      )}

      {tab === "audit" && (
        <div className="surface-card overflow-hidden"><table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-2">Time</th><th className="px-4 py-2">User</th><th className="px-4 py-2">Action</th><th className="px-4 py-2">Target</th></tr></thead>
          <tbody>{[
            ["10:42", "Dr. John Doe", "Updated patient", "Michael Johnson"],
            ["10:15", "Maria Garcia", "Created appointment", "Sarah Williams"],
            ["09:50", "Lisa Chen", "Sent invoice INV-2034", "Michael Johnson"],
            ["09:30", "Dr. Anna Smith", "Signed treatment plan", "TP-201"],
          ].map((row, i) => (<tr key={i} className="border-t border-border/60"><td className="px-4 py-3 text-xs">{row[0]}</td><td className="px-4 py-3 font-medium">{row[1]}</td><td className="px-4 py-3">{row[2]}</td><td className="px-4 py-3 text-xs">{row[3]}</td></tr>))}</tbody>
        </table></div>
      )}
    </div>
  );
}
