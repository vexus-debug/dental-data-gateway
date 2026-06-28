import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Building2, Search, Filter, Plus, MoreHorizontal, MapPin, Users, CreditCard,
  CheckCircle2, Clock, Ban, AlertTriangle, X, Mail, Phone, Calendar, ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/admin/clients")({
  head: () => ({ meta: [{ title: "Clients — Super Admin" }, { name: "description", content: "Manage clinic accounts, plans and status." }] }),
  component: ClientsPage,
});

type Client = {
  id: string; name: string; initials: string; city: string; country: string;
  plan: "Starter" | "Professional" | "Enterprise" | "Custom";
  status: "Active" | "Trial" | "Suspended" | "Overdue";
  users: number; mrr: number; owner: string; email: string; phone: string;
  created: string; renews: string;
};

const clients: Client[] = [
  { id: "C-0142", name: "Smile Dental Co.", initials: "SD", city: "Chicago", country: "USA", plan: "Professional", status: "Active", users: 12, mrr: 249, owner: "Jane Cooper", email: "ops@smile.co", phone: "+1 555-0101", created: "2025-04-12", renews: "2026-07-12" },
  { id: "C-0143", name: "Bright Smiles", initials: "BS", city: "New York", country: "USA", plan: "Enterprise", status: "Active", users: 38, mrr: 899, owner: "Marcus Lee", email: "admin@bright.co", phone: "+1 555-0145", created: "2024-11-03", renews: "2026-08-03" },
  { id: "C-0144", name: "Northgate Dental", initials: "ND", city: "Toronto", country: "CAN", plan: "Professional", status: "Active", users: 9, mrr: 249, owner: "Aisha Khan", email: "team@northgate.ca", phone: "+1 416-0188", created: "2025-09-20", renews: "2026-09-20" },
  { id: "C-0145", name: "Lakeside Family", initials: "LF", city: "Austin", country: "USA", plan: "Starter", status: "Trial", users: 3, mrr: 0, owner: "Diego Ruiz", email: "diego@lakeside.com", phone: "+1 512-0211", created: "2026-06-18", renews: "2026-07-02" },
  { id: "C-0146", name: "Coastal Dental", initials: "CD", city: "Miami", country: "USA", plan: "Professional", status: "Overdue", users: 14, mrr: 249, owner: "Sophia Patel", email: "billing@coastal.com", phone: "+1 305-0234", created: "2024-07-09", renews: "2026-06-09" },
  { id: "C-0147", name: "Alpine Orthodontics", initials: "AO", city: "Denver", country: "USA", plan: "Enterprise", status: "Active", users: 22, mrr: 899, owner: "Henry Park", email: "hello@alpine.co", phone: "+1 720-0256", created: "2024-02-15", renews: "2026-07-15" },
  { id: "C-0148", name: "Riverside Dental", initials: "RD", city: "Portland", country: "USA", plan: "Starter", status: "Suspended", users: 4, mrr: 99, owner: "Mei Tanaka", email: "ops@riverside.co", phone: "+1 503-0278", created: "2025-01-04", renews: "2026-05-04" },
  { id: "C-0149", name: "Sunset Family Dental", initials: "SF", city: "Los Angeles", country: "USA", plan: "Custom", status: "Active", users: 56, mrr: 1499, owner: "Liam O'Brien", email: "ops@sunset.dental", phone: "+1 213-0290", created: "2023-11-22", renews: "2026-11-22" },
];

function statusTone(s: Client["status"]) {
  return s === "Active" ? "bg-success/15 text-success border-success/20"
    : s === "Trial" ? "bg-info/15 text-info border-info/20"
    : s === "Overdue" ? "bg-warning/15 text-warning-foreground border-warning/20"
    : "bg-destructive/10 text-destructive border-destructive/20";
}

function planTone(p: Client["plan"]) {
  return p === "Enterprise" ? "bg-primary-soft text-accent-foreground"
    : p === "Custom" ? "bg-chart-4/15 text-foreground"
    : p === "Professional" ? "bg-chart-2/15 text-foreground"
    : "bg-muted text-muted-foreground";
}

function ClientsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [plan, setPlan] = useState("all");
  const [sel, setSel] = useState<Client | null>(null);
  const [openNew, setOpenNew] = useState(false);

  const filtered = clients.filter(c =>
    (status === "all" || c.status.toLowerCase() === status) &&
    (plan === "all" || c.plan.toLowerCase() === plan) &&
    (c.name.toLowerCase().includes(q.toLowerCase()) || c.id.includes(q) || c.city.toLowerCase().includes(q.toLowerCase()))
  );

  const stats = [
    { label: "Total Clinics", value: "248", icon: Building2, tone: "bg-primary-soft text-accent-foreground" },
    { label: "Active", value: "211", icon: CheckCircle2, tone: "bg-success/15 text-success" },
    { label: "On Trial", value: "23", icon: Clock, tone: "bg-info/10 text-info" },
    { label: "At Risk", value: "14", icon: AlertTriangle, tone: "bg-warning/15 text-warning-foreground" },
  ];

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
          <p className="mt-1 text-sm text-muted-foreground">Every clinic on the platform, their plan, health and revenue.</p>
        </div>
        <Dialog open={openNew} onOpenChange={setOpenNew}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" />New Clinic</Button></DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Onboard new clinic</DialogTitle></DialogHeader>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>Clinic name</Label><Input placeholder="Smile Dental Co." /></div>
              <div><Label>Owner full name</Label><Input /></div>
              <div><Label>Owner email</Label><Input type="email" /></div>
              <div><Label>Phone</Label><Input /></div>
              <div><Label>City</Label><Input /></div>
              <div><Label>Country</Label><Input /></div>
              <div>
                <Label>Plan</Label>
                <Select defaultValue="professional">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select defaultValue="trial">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpenNew(false)}>Cancel</Button>
              <Button onClick={() => setOpenNew(false)}>Create clinic</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="surface-card flex items-center gap-3 p-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tone}`}><s.icon className="h-5 w-5" /></div>
            <div><div className="text-xs text-muted-foreground">{s.label}</div><div className="text-lg font-semibold">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className={`grid gap-4 ${sel ? "lg:grid-cols-[1fr_380px]" : ""}`}>
        <div className="surface-card overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
            <div className="relative min-w-[220px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search clinics, IDs, cities" className="pl-9" />
            </div>
            <Select value={plan} onValueChange={setPlan}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Plan" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All plans</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5">Clinic</th>
                  <th className="px-4 py-2.5">Location</th>
                  <th className="px-4 py-2.5">Plan</th>
                  <th className="px-4 py-2.5">Users</th>
                  <th className="px-4 py-2.5">MRR</th>
                  <th className="px-4 py-2.5">Renews</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} onClick={() => setSel(c)} className={`cursor-pointer border-t border-border/60 hover:bg-muted/30 ${sel?.id === c.id ? "bg-primary-soft/40" : ""}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9"><AvatarFallback>{c.initials}</AvatarFallback></Avatar>
                        <div><div className="font-medium">{c.name}</div><div className="text-xs text-muted-foreground">{c.id} · {c.owner}</div></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs"><div className="flex items-center gap-1"><MapPin className="h-3 w-3 text-muted-foreground" />{c.city}, {c.country}</div></td>
                    <td className="px-4 py-3"><Badge variant="outline" className={planTone(c.plan)}>{c.plan}</Badge></td>
                    <td className="px-4 py-3 text-xs">{c.users}</td>
                    <td className="px-4 py-3 text-xs font-medium">${c.mrr}</td>
                    <td className="px-4 py-3 text-xs">{c.renews}</td>
                    <td className="px-4 py-3"><Badge variant="outline" className={statusTone(c.status)}>{c.status}</Badge></td>
                    <td className="px-4 py-3"><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
            <span>Showing {filtered.length} of {clients.length}</span>
            <div className="flex gap-1"><Button variant="ghost" size="sm">Previous</Button><Button variant="ghost" size="sm">Next</Button></div>
          </div>
        </div>

        {sel && (
          <aside className="surface-card flex flex-col">
            <div className="flex items-start justify-between border-b border-border p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12"><AvatarFallback>{sel.initials}</AvatarFallback></Avatar>
                <div><div className="font-semibold">{sel.name}</div><div className="text-xs text-muted-foreground">{sel.id} · since {sel.created}</div></div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSel(null)}><X className="h-4 w-4" /></Button>
            </div>
            <Tabs defaultValue="overview" className="flex-1">
              <TabsList className="m-3 grid grid-cols-3"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="billing">Billing</TabsTrigger><TabsTrigger value="users">Users</TabsTrigger></TabsList>
              <TabsContent value="overview" className="space-y-3 px-4 pb-4 text-sm">
                <div className="flex items-center gap-2 text-xs"><Mail className="h-3.5 w-3.5 text-muted-foreground" />{sel.email}</div>
                <div className="flex items-center gap-2 text-xs"><Phone className="h-3.5 w-3.5 text-muted-foreground" />{sel.phone}</div>
                <div className="flex items-center gap-2 text-xs"><MapPin className="h-3.5 w-3.5 text-muted-foreground" />{sel.city}, {sel.country}</div>
                <div className="flex items-center gap-2 text-xs"><Calendar className="h-3.5 w-3.5 text-muted-foreground" />Renews {sel.renews}</div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 gap-1"><ExternalLink className="h-3.5 w-3.5" />Impersonate</Button>
                  <Button size="sm" variant="outline" className="flex-1">Suspend</Button>
                </div>
              </TabsContent>
              <TabsContent value="billing" className="space-y-2 px-4 pb-4 text-sm">
                <div className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">Current plan</span><CreditCard className="h-4 w-4 text-muted-foreground" /></div>
                  <div className="mt-1 font-semibold">{sel.plan} — ${sel.mrr}/mo</div>
                </div>
                <Button size="sm" variant="outline" className="w-full">Change plan</Button>
                <Button size="sm" variant="outline" className="w-full">View invoices</Button>
              </TabsContent>
              <TabsContent value="users" className="space-y-2 px-4 pb-4 text-sm">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><span>Active seats</span></div>
                  <span className="font-semibold">{sel.users}</span>
                </div>
                <Button size="sm" className="w-full">Invite admin</Button>
              </TabsContent>
            </Tabs>
          </aside>
        )}
      </div>
    </div>
  );
}
