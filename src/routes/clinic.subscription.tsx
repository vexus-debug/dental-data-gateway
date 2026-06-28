import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, CheckCircle2, Download, Users, Database, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/clinic/subscription")({
  head: () => ({ meta: [{ title: "Subscription — Dentallogue" }] }),
  component: SubscriptionPage,
});

const plans = [
  { name: "Starter", price: 99, features: ["Up to 2 chairs", "500 patients", "Basic reports", "Email support"], current: false },
  { name: "Professional", price: 249, features: ["Up to 5 chairs", "5,000 patients", "All reports", "Online booking", "SMS reminders", "Priority support"], current: true },
  { name: "Enterprise", price: 499, features: ["Unlimited chairs", "Unlimited patients", "Multi-location", "API access", "Custom integrations", "Dedicated CSM"], current: false },
];

const invoices = [
  { id: "BIL-2026-06", date: "2026-06-01", amount: 249, status: "Paid" },
  { id: "BIL-2026-05", date: "2026-05-01", amount: 249, status: "Paid" },
  { id: "BIL-2026-04", date: "2026-04-01", amount: 249, status: "Paid" },
  { id: "BIL-2026-03", date: "2026-03-01", amount: 249, status: "Paid" },
];

function SubscriptionPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-5">
      <div><h1 className="text-2xl font-semibold tracking-tight">Subscription</h1><p className="mt-1 text-sm text-muted-foreground">Manage your plan, payment, and usage.</p></div>

      <div className="surface-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><Badge variant="outline" className="bg-primary-soft text-accent-foreground">Current plan</Badge><h2 className="mt-2 text-2xl font-semibold">Professional</h2><div className="text-sm text-muted-foreground">₦249 / month · renews Aug 1, 2026</div></div><div className="flex gap-2"><Button variant="outline">Manage payment</Button><Button>Upgrade plan</Button></div></div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div><div className="flex items-center gap-2 text-xs text-muted-foreground"><Users className="h-3.5 w-3.5" />Patients</div><div className="mt-1 text-lg font-semibold">1,248 / 5,000</div><Progress value={25} className="mt-1 h-1.5" /></div>
          <div><div className="flex items-center gap-2 text-xs text-muted-foreground"><Database className="h-3.5 w-3.5" />Storage</div><div className="mt-1 text-lg font-semibold">18 / 100 GB</div><Progress value={18} className="mt-1 h-1.5" /></div>
          <div><div className="flex items-center gap-2 text-xs text-muted-foreground"><Sparkles className="h-3.5 w-3.5" />SMS this month</div><div className="mt-1 text-lg font-semibold">412 / 2,000</div><Progress value={20.6} className="mt-1 h-1.5" /></div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {plans.map(p => (<div key={p.name} className={`surface-card p-5 ${p.current ? "border-primary ring-2 ring-primary/30" : ""}`}>
          <div className="flex items-center justify-between"><div className="font-semibold">{p.name}</div>{p.current && <Badge>Current</Badge>}</div>
          <div className="mt-2"><span className="text-3xl font-bold">₦{p.price}</span><span className="text-sm text-muted-foreground">/mo</span></div>
          <ul className="mt-4 space-y-2 text-sm">{p.features.map(f => (<li key={f} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />{f}</li>))}</ul>
          <Button className="mt-4 w-full" variant={p.current ? "outline" : "default"} disabled={p.current}>{p.current ? "Current plan" : `Switch to ${p.name}`}</Button>
        </div>))}
      </div>

      <div className="surface-card overflow-hidden"><div className="border-b border-border p-4 font-medium">Billing history</div><table className="w-full text-sm">
        <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-2">Invoice</th><th className="px-4 py-2">Date</th><th className="px-4 py-2">Amount</th><th className="px-4 py-2">Status</th><th className="px-4 py-2"></th></tr></thead>
        <tbody>{invoices.map(i => (<tr key={i.id} className="border-t border-border/60"><td className="px-4 py-3 font-mono text-xs">{i.id}</td><td className="px-4 py-3 text-xs">{i.date}</td><td className="px-4 py-3">₦{i.amount}</td><td className="px-4 py-3"><Badge variant="outline" className="bg-success/15 text-success">{i.status}</Badge></td><td className="px-4 py-3"><Button size="sm" variant="ghost" className="gap-1"><Download className="h-3 w-3" />PDF</Button></td></tr>))}</tbody>
      </table></div>
    </div>
  );
}
