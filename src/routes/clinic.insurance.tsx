import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Plus, FileText, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/clinic/insurance")({
  head: () => ({ meta: [{ title: "Insurance — Dentallogue" }] }),
  component: InsurancePage,
});

type Claim = { id: string; patient: string; provider: string; amount: number; submitted: string; status: "Submitted" | "Approved" | "Denied" | "Pending" };
const claims: Claim[] = [
  { id: "CL-9012", patient: "Michael Johnson", provider: "Delta Dental", amount: 240, submitted: "2026-06-22", status: "Pending" },
  { id: "CL-9011", patient: "Sarah Williams", provider: "Aetna", amount: 380, submitted: "2026-06-20", status: "Approved" },
  { id: "CL-9010", patient: "David Brown", provider: "Cigna", amount: 1200, submitted: "2026-05-15", status: "Denied" },
  { id: "CL-9009", patient: "Emma Wilson", provider: "BlueCross", amount: 980, submitted: "2026-06-25", status: "Submitted" },
];

const providers = [
  { name: "Delta Dental", patients: 312, claims: 48, paidRate: 92 },
  { name: "Aetna", patients: 187, claims: 32, paidRate: 88 },
  { name: "Cigna", patients: 154, claims: 27, paidRate: 79 },
  { name: "BlueCross", patients: 201, claims: 35, paidRate: 90 },
];

function color(s: Claim["status"]) {
  return s === "Approved" ? "bg-success/15 text-success border-success/20"
    : s === "Denied" ? "bg-destructive/10 text-destructive border-destructive/20"
    : s === "Pending" ? "bg-warning/15 text-warning-foreground border-warning/20"
    : "bg-info/15 text-info border-info/20";
}

function InsurancePage() {
  const [tab, setTab] = useState("claims");
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Insurance</h1><p className="mt-1 text-sm text-muted-foreground">Submit claims, verify eligibility and track reimbursements.</p></div>
        <Button className="gap-2"><Plus className="h-4 w-4" />New claim</Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="surface-card flex items-center gap-3 p-4"><CheckCircle2 className="h-8 w-8 text-success" /><div><div className="text-xs text-muted-foreground">Approved MTD</div><div className="text-xl font-semibold">₦12,840</div></div></div>
        <div className="surface-card flex items-center gap-3 p-4"><Clock className="h-8 w-8 text-warning-foreground" /><div><div className="text-xs text-muted-foreground">Pending</div><div className="text-xl font-semibold">{claims.filter(c => c.status === "Pending" || c.status === "Submitted").length}</div></div></div>
        <div className="surface-card flex items-center gap-3 p-4"><XCircle className="h-8 w-8 text-destructive" /><div><div className="text-xs text-muted-foreground">Denied</div><div className="text-xl font-semibold">{claims.filter(c => c.status === "Denied").length}</div></div></div>
        <div className="surface-card flex items-center gap-3 p-4"><ShieldCheck className="h-8 w-8 text-primary" /><div><div className="text-xs text-muted-foreground">Avg payout</div><div className="text-xl font-semibold">87%</div></div></div>
      </div>

      <div className="surface-card overflow-hidden">
        <Tabs value={tab} onValueChange={setTab}><div className="border-b border-border p-3"><TabsList><TabsTrigger value="claims">Claims</TabsTrigger><TabsTrigger value="providers">Providers</TabsTrigger><TabsTrigger value="verify">Eligibility check</TabsTrigger></TabsList></div></Tabs>
        {tab === "claims" && (
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-2">Claim</th><th className="px-4 py-2">Patient</th><th className="px-4 py-2">Provider</th><th className="px-4 py-2">Amount</th><th className="px-4 py-2">Submitted</th><th className="px-4 py-2">Status</th><th className="px-4 py-2"></th></tr></thead>
            <tbody>{claims.map(c => (<tr key={c.id} className="border-t border-border/60 hover:bg-muted/30"><td className="px-4 py-3 font-mono text-xs">{c.id}</td><td className="px-4 py-3 font-medium">{c.patient}</td><td className="px-4 py-3">{c.provider}</td><td className="px-4 py-3">₦{c.amount}</td><td className="px-4 py-3 text-xs">{c.submitted}</td><td className="px-4 py-3"><Badge variant="outline" className={color(c.status)}>{c.status}</Badge></td><td className="px-4 py-3"><Button size="sm" variant="ghost" className="gap-1"><FileText className="h-3 w-3" />Open</Button></td></tr>))}</tbody>
          </table>
        )}
        {tab === "providers" && (
          <div className="grid gap-3 p-4 sm:grid-cols-2">
            {providers.map(p => (<div key={p.name} className="surface-card p-4"><div className="flex items-center justify-between"><div className="font-semibold">{p.name}</div><Badge variant="outline">{p.paidRate}% paid</Badge></div><div className="mt-2 grid grid-cols-2 gap-2 text-sm"><div><div className="text-xs text-muted-foreground">Patients</div><div className="font-medium">{p.patients}</div></div><div><div className="text-xs text-muted-foreground">Claims</div><div className="font-medium">{p.claims}</div></div></div></div>))}
          </div>
        )}
        {tab === "verify" && (
          <div className="grid gap-4 p-6 lg:grid-cols-2">
            <div className="space-y-3"><div><label className="text-xs font-medium uppercase text-muted-foreground">Patient</label><Input placeholder="Search patient..." /></div><div><label className="text-xs font-medium uppercase text-muted-foreground">Provider</label><Input placeholder="Insurance provider" /></div><div><label className="text-xs font-medium uppercase text-muted-foreground">Member ID</label><Input /></div><Button>Verify eligibility</Button></div>
            <div className="surface-card p-4"><div className="text-sm font-medium">Eligibility result</div><div className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge variant="outline" className="bg-success/15 text-success">Active</Badge></div><div className="flex justify-between"><span className="text-muted-foreground">Plan</span>PPO 1500</div><div className="flex justify-between"><span className="text-muted-foreground">Annual max</span>₦1,500</div><div className="flex justify-between"><span className="text-muted-foreground">Used</span>₦320</div><div className="flex justify-between"><span className="text-muted-foreground">Deductible</span>₦50 / ₦50</div></div></div>
          </div>
        )}
      </div>
    </div>
  );
}
