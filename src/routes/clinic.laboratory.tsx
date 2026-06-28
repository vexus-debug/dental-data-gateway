import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical, Plus, Truck, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/clinic/laboratory")({
  head: () => ({ meta: [{ title: "Laboratory — Dentallogue" }] }),
  component: LaboratoryPage,
});

type Case = { id: string; patient: string; work: string; lab: string; sent: string; due: string; status: "Sent" | "In Progress" | "Ready" | "Delivered" | "Overdue" };

const cases: Case[] = [
  { id: "LC-301", patient: "Michael Johnson", work: "Porcelain crown #26", lab: "BrightSmile Lab", sent: "2026-06-15", due: "2026-07-01", status: "In Progress" },
  { id: "LC-302", patient: "Emma Wilson", work: "Full denture upper", lab: "DentalArts Lab", sent: "2026-06-10", due: "2026-06-28", status: "Ready" },
  { id: "LC-303", patient: "David Brown", work: "Zirconia bridge", lab: "BrightSmile Lab", sent: "2026-06-05", due: "2026-06-22", status: "Overdue" },
  { id: "LC-304", patient: "Sarah Williams", work: "Night guard", lab: "ProDental Lab", sent: "2026-06-20", due: "2026-07-04", status: "Sent" },
];

function color(s: Case["status"]) {
  return s === "Ready" ? "bg-success/15 text-success border-success/20"
    : s === "Overdue" ? "bg-destructive/10 text-destructive border-destructive/20"
    : s === "In Progress" ? "bg-info/15 text-info border-info/20"
    : s === "Delivered" ? "bg-muted text-muted-foreground border-border"
    : "bg-warning/15 text-warning-foreground border-warning/20";
}

function LaboratoryPage() {
  const [tab, setTab] = useState("all");
  const [openNew, setOpenNew] = useState(false);
  const filtered = tab === "all" ? cases : cases.filter(c => c.status.toLowerCase().replace(" ", "") === tab);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Laboratory</h1><p className="mt-1 text-sm text-muted-foreground">Track every lab case from impression to delivery.</p></div>
        <Dialog open={openNew} onOpenChange={setOpenNew}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" />Send to lab</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New lab case</DialogTitle></DialogHeader>
            <div className="grid gap-3"><div><Label>Patient</Label><Input /></div><div><Label>Work description</Label><Input /></div><div><Label>Lab</Label><Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="bright">BrightSmile Lab</SelectItem><SelectItem value="arts">DentalArts Lab</SelectItem><SelectItem value="pro">ProDental Lab</SelectItem></SelectContent></Select></div><div><Label>Due date</Label><Input type="date" /></div><div><Label>Notes</Label><Textarea rows={3} /></div></div>
            <DialogFooter><Button variant="ghost" onClick={() => setOpenNew(false)}>Cancel</Button><Button onClick={() => setOpenNew(false)}>Send</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="surface-card flex items-center gap-3 p-4"><Clock className="h-8 w-8 text-info" /><div><div className="text-xs text-muted-foreground">In Progress</div><div className="text-xl font-semibold">{cases.filter(c => c.status === "In Progress" || c.status === "Sent").length}</div></div></div>
        <div className="surface-card flex items-center gap-3 p-4"><CheckCircle2 className="h-8 w-8 text-success" /><div><div className="text-xs text-muted-foreground">Ready for pickup</div><div className="text-xl font-semibold">{cases.filter(c => c.status === "Ready").length}</div></div></div>
        <div className="surface-card flex items-center gap-3 p-4"><AlertCircle className="h-8 w-8 text-destructive" /><div><div className="text-xs text-muted-foreground">Overdue</div><div className="text-xl font-semibold">{cases.filter(c => c.status === "Overdue").length}</div></div></div>
        <div className="surface-card flex items-center gap-3 p-4"><FlaskConical className="h-8 w-8 text-primary" /><div><div className="text-xs text-muted-foreground">Active labs</div><div className="text-xl font-semibold">3</div></div></div>
      </div>

      <div className="surface-card overflow-hidden">
        <Tabs value={tab} onValueChange={setTab}><div className="border-b border-border p-3"><TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="sent">Sent</TabsTrigger><TabsTrigger value="inprogress">In Progress</TabsTrigger><TabsTrigger value="ready">Ready</TabsTrigger><TabsTrigger value="overdue">Overdue</TabsTrigger></TabsList></div>
          <TabsContent value={tab} className="m-0">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-2">Case</th><th className="px-4 py-2">Patient</th><th className="px-4 py-2">Work</th><th className="px-4 py-2">Lab</th><th className="px-4 py-2">Sent</th><th className="px-4 py-2">Due</th><th className="px-4 py-2">Status</th><th className="px-4 py-2"></th></tr></thead>
              <tbody>{filtered.map(c => (
                <tr key={c.id} className="border-t border-border/60 hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs">{c.id}</td><td className="px-4 py-3 font-medium">{c.patient}</td><td className="px-4 py-3">{c.work}</td><td className="px-4 py-3 text-xs">{c.lab}</td><td className="px-4 py-3 text-xs">{c.sent}</td><td className="px-4 py-3 text-xs">{c.due}</td><td className="px-4 py-3"><Badge variant="outline" className={color(c.status)}>{c.status}</Badge></td><td className="px-4 py-3"><Button size="sm" variant="outline" className="gap-1"><Truck className="h-3 w-3" />Update</Button></td>
                </tr>
              ))}</tbody>
            </table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
