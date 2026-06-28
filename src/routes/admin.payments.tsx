import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Wallet, Search, Download, RefreshCcw, CheckCircle2, XCircle, Clock,
  DollarSign, ArrowUpRight, ArrowDownRight, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/payments")({
  head: () => ({ meta: [{ title: "Payments — Super Admin" }, { name: "description", content: "Invoices, transactions and refunds." }] }),
  component: PaymentsPage,
});

type Tx = { id: string; date: string; client: string; amount: number; method: string; status: "Paid" | "Pending" | "Failed" | "Refunded"; invoice: string };
const txs: Tx[] = [
  { id: "TX-9821", date: "2026-06-27", client: "Northgate Dental", amount: 249, method: "Visa ••9088", status: "Paid", invoice: "INV-2106" },
  { id: "TX-9820", date: "2026-06-27", client: "Bright Smiles", amount: 899, method: "ACH ••1199", status: "Paid", invoice: "INV-2105" },
  { id: "TX-9819", date: "2026-06-26", client: "Coastal Dental", amount: 249, method: "Visa ••0211", status: "Failed", invoice: "INV-2104" },
  { id: "TX-9818", date: "2026-06-26", client: "Smile Dental Co.", amount: 249, method: "Visa ••4242", status: "Paid", invoice: "INV-2103" },
  { id: "TX-9817", date: "2026-06-25", client: "Sunset Family Dental", amount: 1499, method: "ACH ••3392", status: "Paid", invoice: "INV-2102" },
  { id: "TX-9816", date: "2026-06-25", client: "Alpine Orthodontics", amount: 899, method: "Mastercard ••2014", status: "Pending", invoice: "INV-2101" },
  { id: "TX-9815", date: "2026-06-24", client: "Riverside Dental", amount: 99, method: "Visa ••3120", status: "Refunded", invoice: "INV-2100" },
];

const invoices = [
  { id: "INV-2106", client: "Northgate Dental", issued: "2026-06-27", due: "2026-07-12", amount: 249, status: "Paid" },
  { id: "INV-2107", client: "Smile Dental Co.", issued: "2026-06-27", due: "2026-07-12", amount: 249, status: "Sent" },
  { id: "INV-2108", client: "Coastal Dental", issued: "2026-06-26", due: "2026-07-11", amount: 249, status: "Overdue" },
  { id: "INV-2109", client: "Alpine Orthodontics", issued: "2026-06-25", due: "2026-07-10", amount: 899, status: "Draft" },
];

const refunds = [
  { id: "RF-411", date: "2026-06-24", client: "Riverside Dental", amount: 99, reason: "Customer cancellation", by: "Avery K." },
  { id: "RF-410", date: "2026-06-18", client: "Lakeside Family", amount: 49, reason: "Duplicate charge", by: "Jordan M." },
];

const trend = [
  { d: "Mon", v: 1800 }, { d: "Tue", v: 2240 }, { d: "Wed", v: 1980 },
  { d: "Thu", v: 2820 }, { d: "Fri", v: 3120 }, { d: "Sat", v: 1620 }, { d: "Sun", v: 2140 },
];

function txTone(s: Tx["status"]) {
  return s === "Paid" ? "bg-success/15 text-success border-success/20"
    : s === "Pending" ? "bg-info/15 text-info border-info/20"
    : s === "Failed" ? "bg-destructive/10 text-destructive border-destructive/20"
    : "bg-muted text-muted-foreground border-border";
}
function invTone(s: string) {
  return s === "Paid" ? "bg-success/15 text-success border-success/20"
    : s === "Sent" ? "bg-info/15 text-info border-info/20"
    : s === "Overdue" ? "bg-warning/15 text-warning-foreground border-warning/20"
    : "bg-muted text-muted-foreground border-border";
}

function PaymentsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const filtered = txs.filter(t =>
    (status === "all" || t.status.toLowerCase() === status) &&
    (t.client.toLowerCase().includes(q.toLowerCase()) || t.id.includes(q) || t.invoice.includes(q))
  );

  const stats = [
    { label: "Today's revenue", value: "₦2,140", icon: DollarSign, tone: "bg-success/15 text-success", delta: "+12%", up: true },
    { label: "MTD revenue", value: "₦48,920", icon: ArrowUpRight, tone: "bg-primary-soft text-accent-foreground", delta: "+8.4%", up: true },
    { label: "Pending invoices", value: "9", icon: Clock, tone: "bg-info/10 text-info", delta: "₦2,140", up: false },
    { label: "Failed (7d)", value: "4", icon: XCircle, tone: "bg-destructive/10 text-destructive", delta: "-2", up: false },
  ];

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Payments</h1>
          <p className="mt-1 text-sm text-muted-foreground">Transactions, invoices and refunds across every clinic.</p>
        </div>
        <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export CSV</Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="surface-card flex items-center gap-3 p-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tone}`}><s.icon className="h-5 w-5" /></div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="flex items-baseline gap-2"><div className="text-lg font-semibold">{s.value}</div><span className={`text-[11px] ${s.up ? "text-success" : "text-muted-foreground"}`}>{s.delta}</span></div>
            </div>
          </div>
        ))}
      </div>

      <div className="surface-card">
        <div className="border-b border-border px-5 py-4"><h2 className="text-base font-semibold">Revenue — Last 7 days</h2></div>
        <div className="h-56 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend}>
              <defs><linearGradient id="rev2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
              <Tooltip />
              <Area type="monotone" dataKey="v" stroke="var(--color-chart-1)" fill="url(#rev2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="mt-4">
          <div className="surface-card overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
              <div className="relative min-w-[220px] flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search transactions, clients, invoices" className="pl-9" />
              </div>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5">Transaction</th>
                    <th className="px-4 py-2.5">Client</th>
                    <th className="px-4 py-2.5">Invoice</th>
                    <th className="px-4 py-2.5">Method</th>
                    <th className="px-4 py-2.5">Amount</th>
                    <th className="px-4 py-2.5">Date</th>
                    <th className="px-4 py-2.5">Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(t => (
                    <tr key={t.id} className="border-t border-border/60 hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs">{t.id}</td>
                      <td className="px-4 py-3 font-medium">{t.client}</td>
                      <td className="px-4 py-3 text-xs">{t.invoice}</td>
                      <td className="px-4 py-3 text-xs">{t.method}</td>
                      <td className="px-4 py-3 font-medium">₦{t.amount}</td>
                      <td className="px-4 py-3 text-xs">{t.date}</td>
                      <td className="px-4 py-3"><Badge variant="outline" className={txTone(t.status)}>{t.status}</Badge></td>
                      <td className="px-4 py-3 text-right">
                        {t.status === "Failed" && <Button variant="ghost" size="sm" className="h-7 gap-1"><RefreshCcw className="h-3.5 w-3.5" />Retry</Button>}
                        {t.status === "Paid" && <Button variant="ghost" size="sm" className="h-7 gap-1"><ArrowDownRight className="h-3.5 w-3.5" />Refund</Button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="mt-4">
          <div className="surface-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5">Invoice</th>
                    <th className="px-4 py-2.5">Client</th>
                    <th className="px-4 py-2.5">Issued</th>
                    <th className="px-4 py-2.5">Due</th>
                    <th className="px-4 py-2.5">Amount</th>
                    <th className="px-4 py-2.5">Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(i => (
                    <tr key={i.id} className="border-t border-border/60 hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs">{i.id}</td>
                      <td className="px-4 py-3 font-medium">{i.client}</td>
                      <td className="px-4 py-3 text-xs">{i.issued}</td>
                      <td className="px-4 py-3 text-xs">{i.due}</td>
                      <td className="px-4 py-3 font-medium">₦{i.amount}</td>
                      <td className="px-4 py-3"><Badge variant="outline" className={invTone(i.status)}>{i.status}</Badge></td>
                      <td className="px-4 py-3 text-right"><Button variant="ghost" size="sm" className="h-7">View</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="refunds" className="mt-4">
          <div className="surface-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5">Refund ID</th>
                    <th className="px-4 py-2.5">Date</th>
                    <th className="px-4 py-2.5">Client</th>
                    <th className="px-4 py-2.5">Amount</th>
                    <th className="px-4 py-2.5">Reason</th>
                    <th className="px-4 py-2.5">Issued by</th>
                  </tr>
                </thead>
                <tbody>
                  {refunds.map(r => (
                    <tr key={r.id} className="border-t border-border/60 hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                      <td className="px-4 py-3 text-xs">{r.date}</td>
                      <td className="px-4 py-3 font-medium">{r.client}</td>
                      <td className="px-4 py-3 font-medium">₦{r.amount}</td>
                      <td className="px-4 py-3 text-xs">{r.reason}</td>
                      <td className="px-4 py-3 text-xs">{r.by}</td>
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
