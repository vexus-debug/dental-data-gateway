import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CreditCard, Search, Plus, MoreHorizontal, TrendingUp, RefreshCcw,
  XCircle, Pause, CheckCircle2, DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/subscriptions")({
  head: () => ({ meta: [{ title: "Subscriptions — Super Admin" }, { name: "description", content: "Plans, subscriptions and coupons." }] }),
  component: SubsPage,
});

type Sub = { id: string; client: string; plan: string; cycle: "Monthly" | "Yearly"; status: "Active" | "Trial" | "Past Due" | "Cancelled"; amount: number; next: string; method: string };
const subs: Sub[] = [
  { id: "S-2010", client: "Smile Dental Co.", plan: "Professional", cycle: "Monthly", status: "Active", amount: 249, next: "2026-07-12", method: "Visa ••4242" },
  { id: "S-2011", client: "Bright Smiles", plan: "Enterprise", cycle: "Yearly", status: "Active", amount: 8990, next: "2026-08-03", method: "ACH ••1199" },
  { id: "S-2012", client: "Northgate Dental", plan: "Professional", cycle: "Monthly", status: "Active", amount: 249, next: "2026-09-20", method: "Mastercard ••9088" },
  { id: "S-2013", client: "Lakeside Family", plan: "Starter", cycle: "Monthly", status: "Trial", amount: 0, next: "2026-07-02", method: "—" },
  { id: "S-2014", client: "Coastal Dental", plan: "Professional", cycle: "Monthly", status: "Past Due", amount: 249, next: "2026-06-09", method: "Visa ••0211" },
  { id: "S-2015", client: "Riverside Dental", plan: "Starter", cycle: "Monthly", status: "Cancelled", amount: 99, next: "—", method: "Visa ••3120" },
];

const plans = [
  { name: "Starter", price: 99, cycle: "mo", features: ["1 clinic", "Up to 5 users", "Basic reports", "Email support"], subs: 92, color: "bg-muted text-foreground" },
  { name: "Professional", price: 249, cycle: "mo", features: ["3 clinics", "Up to 20 users", "Advanced reports", "Priority support", "Patient portal"], subs: 108, color: "bg-primary-soft text-accent-foreground", featured: true },
  { name: "Enterprise", price: 899, cycle: "mo", features: ["Unlimited clinics", "Unlimited users", "Dedicated CSM", "SLA + API access", "Custom integrations"], subs: 34, color: "bg-chart-2/15 text-foreground" },
  { name: "Custom", price: 1499, cycle: "mo", features: ["Bespoke contract", "Onboarding team", "White-label", "Custom modules"], subs: 14, color: "bg-chart-4/15 text-foreground" },
];

const coupons = [
  { code: "LAUNCH25", type: "Percent", value: "25%", uses: "48 / 200", expires: "2026-09-30", status: "Active" },
  { code: "FIRST3MO", type: "Period", value: "3 months free", uses: "112 / ∞", expires: "—", status: "Active" },
  { code: "BLACKFRI", type: "Amount", value: "₦100", uses: "0 / 500", expires: "2026-11-30", status: "Scheduled" },
  { code: "WINBACK", type: "Percent", value: "40%", uses: "12 / 100", expires: "2026-07-15", status: "Active" },
];

function subTone(s: Sub["status"]) {
  return s === "Active" ? "bg-success/15 text-success border-success/20"
    : s === "Trial" ? "bg-info/15 text-info border-info/20"
    : s === "Past Due" ? "bg-warning/15 text-warning-foreground border-warning/20"
    : "bg-muted text-muted-foreground border-border";
}

function SubsPage() {
  const [q, setQ] = useState("");
  const [openCoupon, setOpenCoupon] = useState(false);
  const filtered = subs.filter(s => s.client.toLowerCase().includes(q.toLowerCase()) || s.id.includes(q));

  const stats = [
    { label: "Active Subs", value: "234", icon: CheckCircle2, tone: "bg-success/15 text-success" },
    { label: "MRR", value: "₦48,920", icon: DollarSign, tone: "bg-primary-soft text-accent-foreground" },
    { label: "Net new (mo)", value: "+18", icon: TrendingUp, tone: "bg-info/10 text-info" },
    { label: "Churn rate", value: "1.8%", icon: XCircle, tone: "bg-warning/15 text-warning-foreground" },
  ];

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Subscriptions</h1>
          <p className="mt-1 text-sm text-muted-foreground">Plans, customer subscriptions and promo codes.</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="surface-card flex items-center gap-3 p-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tone}`}><s.icon className="h-5 w-5" /></div>
            <div><div className="text-xs text-muted-foreground">{s.label}</div><div className="text-lg font-semibold">{s.value}</div></div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="subscriptions">
        <TabsList>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="coupons">Coupons</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="mt-4">
          <div className="surface-card overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
              <div className="relative min-w-[220px] flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by client or ID" className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="pastdue">Past due</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5">ID</th>
                    <th className="px-4 py-2.5">Client</th>
                    <th className="px-4 py-2.5">Plan</th>
                    <th className="px-4 py-2.5">Cycle</th>
                    <th className="px-4 py-2.5">Amount</th>
                    <th className="px-4 py-2.5">Next billing</th>
                    <th className="px-4 py-2.5">Payment</th>
                    <th className="px-4 py-2.5">Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(s => (
                    <tr key={s.id} className="border-t border-border/60 hover:bg-muted/30">
                      <td className="px-4 py-3 text-xs text-muted-foreground">{s.id}</td>
                      <td className="px-4 py-3 font-medium">{s.client}</td>
                      <td className="px-4 py-3">{s.plan}</td>
                      <td className="px-4 py-3 text-xs">{s.cycle}</td>
                      <td className="px-4 py-3 font-medium">₦{s.amount}</td>
                      <td className="px-4 py-3 text-xs">{s.next}</td>
                      <td className="px-4 py-3 text-xs">{s.method}</td>
                      <td className="px-4 py-3"><Badge variant="outline" className={subTone(s.status)}>{s.status}</Badge></td>
                      <td className="px-4 py-3"><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="plans" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {plans.map(p => (
              <div key={p.name} className={`surface-card flex flex-col p-5 ${p.featured ? "ring-2 ring-primary" : ""}`}>
                <div className="flex items-center justify-between">
                  <div className={`rounded-lg px-2.5 py-1 text-xs font-medium ${p.color}`}>{p.name}</div>
                  {p.featured && <Badge variant="outline" className="bg-primary text-primary-foreground border-transparent">Most popular</Badge>}
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-tight">₦{p.price}</span>
                  <span className="text-sm text-muted-foreground">/{p.cycle}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{p.subs} active subscriptions</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /><span>{f}</span></li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-2 border-t border-border pt-4">
                  <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                  <Button variant="outline" size="sm" className="flex-1">Archive</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="coupons" className="mt-4 space-y-3">
          <div className="flex justify-end">
            <Dialog open={openCoupon} onOpenChange={setOpenCoupon}>
              <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" />New Coupon</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create coupon</DialogTitle></DialogHeader>
                <div className="grid gap-4">
                  <div><Label>Code</Label><Input placeholder="LAUNCH25" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Type</Label>
                      <Select defaultValue="percent">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percent">Percent</SelectItem>
                          <SelectItem value="amount">Amount</SelectItem>
                          <SelectItem value="period">Free period</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div><Label>Value</Label><Input placeholder="25" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label>Max uses</Label><Input type="number" placeholder="200" /></div>
                    <div><Label>Expires</Label><Input type="date" /></div>
                  </div>
                  <div><Label>Description</Label><Textarea rows={2} placeholder="Internal note" /></div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-3"><span className="text-sm">Activate immediately</span><Switch defaultChecked /></div>
                </div>
                <DialogFooter><Button variant="ghost" onClick={() => setOpenCoupon(false)}>Cancel</Button><Button onClick={() => setOpenCoupon(false)}>Create</Button></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="surface-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5">Code</th>
                    <th className="px-4 py-2.5">Type</th>
                    <th className="px-4 py-2.5">Value</th>
                    <th className="px-4 py-2.5">Uses</th>
                    <th className="px-4 py-2.5">Expires</th>
                    <th className="px-4 py-2.5">Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map(c => (
                    <tr key={c.code} className="border-t border-border/60 hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs">{c.code}</td>
                      <td className="px-4 py-3 text-xs">{c.type}</td>
                      <td className="px-4 py-3 font-medium">{c.value}</td>
                      <td className="px-4 py-3 text-xs">{c.uses}</td>
                      <td className="px-4 py-3 text-xs">{c.expires}</td>
                      <td className="px-4 py-3"><Badge variant="outline" className={c.status === "Active" ? "bg-success/15 text-success border-success/20" : "bg-info/15 text-info border-info/20"}>{c.status}</Badge></td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-7 gap-1"><Pause className="h-3.5 w-3.5" />Pause</Button>
                        <Button variant="ghost" size="sm" className="h-7 gap-1"><RefreshCcw className="h-3.5 w-3.5" />Reissue</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
