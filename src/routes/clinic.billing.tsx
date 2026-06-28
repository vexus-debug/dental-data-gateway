import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Receipt, Plus, Download, Send, DollarSign, AlertCircle, CheckCircle2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/clinic/billing")({
  head: () => ({ meta: [{ title: "Billing — Dentallogue" }] }),
  component: BillingPage,
});

type Inv = { id: string; patient: string; date: string; due: string; total: number; paid: number; status: "Paid" | "Partial" | "Overdue" | "Sent" };

const invoices: Inv[] = [
  { id: "INV-2034", patient: "Michael Johnson", date: "2026-06-22", due: "2026-07-22", total: 240, paid: 0, status: "Sent" },
  { id: "INV-2033", patient: "Sarah Williams", date: "2026-06-20", due: "2026-07-20", total: 380, paid: 380, status: "Paid" },
  { id: "INV-2032", patient: "David Brown", date: "2026-05-15", due: "2026-06-15", total: 1200, paid: 400, status: "Partial" },
  { id: "INV-2031", patient: "James Taylor", date: "2026-05-10", due: "2026-06-10", total: 580, paid: 0, status: "Overdue" },
  { id: "INV-2030", patient: "Emma Wilson", date: "2026-06-25", due: "2026-07-25", total: 980, paid: 980, status: "Paid" },
];

const payments = [
  { id: "PMT-501", patient: "Sarah Williams", method: "Card", amount: 380, date: "2026-06-21" },
  { id: "PMT-502", patient: "Emma Wilson", method: "Cash", amount: 980, date: "2026-06-25" },
  { id: "PMT-503", patient: "David Brown", method: "Card", amount: 400, date: "2026-06-01" },
];

function color(s: Inv["status"]) {
  return s === "Paid" ? "bg-success/15 text-success border-success/20"
    : s === "Overdue" ? "bg-destructive/10 text-destructive border-destructive/20"
    : s === "Partial" ? "bg-warning/15 text-warning-foreground border-warning/20"
    : "bg-info/15 text-info border-info/20";
}

function BillingPage() {
  const [tab, setTab] = useState("invoices");
  const [open, setOpen] = useState(false);

  const totalOut = invoices.reduce((s, i) => s + (i.total - i.paid), 0);
  const totalPaid = invoices.reduce((s, i) => s + i.paid, 0);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Billing</h1><p className="mt-1 text-sm text-muted-foreground">Invoices, payments and statements in a single workspace.</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" />New invoice</Button></DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader><DialogTitle>Create invoice</DialogTitle></DialogHeader>
            <div className="grid gap-3 sm:grid-cols-2"><div className="sm:col-span-2"><Label>Patient</Label><Input /></div><div><Label>Issue date</Label><Input type="date" /></div><div><Label>Due date</Label><Input type="date" /></div></div>
            <div className="rounded-lg border border-border p-3"><div className="mb-2 text-xs font-medium uppercase text-muted-foreground">Line items</div><div className="grid grid-cols-[1fr_80px_80px_80px] gap-2 text-xs font-medium"><div>Description</div><div>Qty</div><div>Price</div><div>Total</div></div><div className="mt-1.5 grid grid-cols-[1fr_80px_80px_80px] items-center gap-2"><Input placeholder="Cleaning" /><Input type="number" defaultValue={1} /><Input type="number" defaultValue={120} /><div className="text-sm">₦120</div></div><Button size="sm" variant="ghost" className="mt-2 gap-1"><Plus className="h-3 w-3" />Add line</Button></div>
            <DialogFooter><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Create</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="surface-card p-4"><div className="flex items-center gap-2 text-xs text-muted-foreground"><DollarSign className="h-3.5 w-3.5" />Outstanding</div><div className="mt-1 text-2xl font-semibold text-warning-foreground">₦{totalOut.toLocaleString()}</div></div>
        <div className="surface-card p-4"><div className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5" />Collected MTD</div><div className="mt-1 text-2xl font-semibold text-success">₦{totalPaid.toLocaleString()}</div></div>
        <div className="surface-card p-4"><div className="flex items-center gap-2 text-xs text-muted-foreground"><AlertCircle className="h-3.5 w-3.5" />Overdue</div><div className="mt-1 text-2xl font-semibold text-destructive">₦{invoices.filter(i => i.status === "Overdue").reduce((s, i) => s + (i.total - i.paid), 0)}</div></div>
        <div className="surface-card p-4"><div className="flex items-center gap-2 text-xs text-muted-foreground"><Receipt className="h-3.5 w-3.5" />Invoices issued</div><div className="mt-1 text-2xl font-semibold">{invoices.length}</div></div>
      </div>

      <div className="surface-card overflow-hidden">
        <Tabs value={tab} onValueChange={setTab}><div className="border-b border-border p-3"><TabsList><TabsTrigger value="invoices">Invoices</TabsTrigger><TabsTrigger value="payments">Payments</TabsTrigger><TabsTrigger value="estimates">Estimates</TabsTrigger></TabsList></div></Tabs>
        {tab === "invoices" && (
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-2">Invoice</th><th className="px-4 py-2">Patient</th><th className="px-4 py-2">Issued</th><th className="px-4 py-2">Due</th><th className="px-4 py-2">Total</th><th className="px-4 py-2">Balance</th><th className="px-4 py-2">Status</th><th className="px-4 py-2"></th></tr></thead>
            <tbody>{invoices.map(i => (
              <tr key={i.id} className="border-t border-border/60 hover:bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs">{i.id}</td><td className="px-4 py-3 font-medium">{i.patient}</td><td className="px-4 py-3 text-xs">{i.date}</td><td className="px-4 py-3 text-xs">{i.due}</td><td className="px-4 py-3">₦{i.total}</td><td className="px-4 py-3 font-medium">₦{i.total - i.paid}</td><td className="px-4 py-3"><Badge variant="outline" className={color(i.status)}>{i.status}</Badge></td>
                <td className="px-4 py-3"><div className="flex gap-1"><Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Send className="h-3.5 w-3.5" /></Button><Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Download className="h-3.5 w-3.5" /></Button><Button size="sm" className="h-7 gap-1 px-2"><CreditCard className="h-3 w-3" />Pay</Button></div></td>
              </tr>
            ))}</tbody>
          </table>
        )}
        {tab === "payments" && (
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-2">Payment</th><th className="px-4 py-2">Patient</th><th className="px-4 py-2">Method</th><th className="px-4 py-2">Date</th><th className="px-4 py-2">Amount</th></tr></thead>
            <tbody>{payments.map(p => (<tr key={p.id} className="border-t border-border/60"><td className="px-4 py-3 font-mono text-xs">{p.id}</td><td className="px-4 py-3 font-medium">{p.patient}</td><td className="px-4 py-3"><Badge variant="outline">{p.method}</Badge></td><td className="px-4 py-3 text-xs">{p.date}</td><td className="px-4 py-3 font-semibold text-success">₦{p.amount}</td></tr>))}</tbody>
          </table>
        )}
        {tab === "estimates" && <div className="p-8 text-center text-sm text-muted-foreground">No estimates. Click "New invoice" → save as estimate.</div>}
      </div>
    </div>
  );
}
