import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, Plus, CheckCircle2, Clock, Send, Printer, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/clinic/treatment-plans")({
  head: () => ({ meta: [{ title: "Treatment Plans — Dentallogue" }] }),
  component: TreatmentPlansPage,
});

type Step = { id: string; tooth: string; procedure: string; cost: number; status: "Planned" | "In Progress" | "Done"; date?: string };
type Plan = { id: string; patient: string; title: string; created: string; status: "Draft" | "Approved" | "Active" | "Completed"; steps: Step[] };

const initial: Plan[] = [
  { id: "TP-201", patient: "Michael Johnson", title: "Full restoration", created: "2026-05-12", status: "Active",
    steps: [
      { id: "s1", tooth: "16", procedure: "Composite filling", cost: 220, status: "Done", date: "2026-06-01" },
      { id: "s2", tooth: "26", procedure: "Crown placement", cost: 980, status: "Done", date: "2026-06-15" },
      { id: "s3", tooth: "36", procedure: "Root canal", cost: 1200, status: "In Progress" },
      { id: "s4", tooth: "46", procedure: "Implant", cost: 2400, status: "Planned" },
      { id: "s5", tooth: "all", procedure: "Whitening", cost: 380, status: "Planned" },
    ] },
  { id: "TP-202", patient: "Sarah Williams", title: "Orthodontic alignment", created: "2026-06-18", status: "Draft", steps: [{ id: "x", tooth: "—", procedure: "Clear aligner consultation", cost: 0, status: "Planned" }] },
];

function statusColor(s: string) {
  return s === "Done" || s === "Completed" ? "bg-success/15 text-success border-success/20"
    : s === "In Progress" || s === "Active" ? "bg-info/15 text-info border-info/20"
    : s === "Approved" ? "bg-primary-soft text-accent-foreground border-primary/20"
    : "bg-muted text-muted-foreground border-border";
}

function TreatmentPlansPage() {
  const [plans, setPlans] = useState<Plan[]>(initial);
  const [active, setActive] = useState<Plan>(initial[0]);

  const total = active.steps.reduce((s, x) => s + x.cost, 0);
  const done = active.steps.filter(s => s.status === "Done").reduce((s, x) => s + x.cost, 0);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const updateStep = (id: string, status: Step["status"]) => {
    const next = { ...active, steps: active.steps.map(s => s.id === id ? { ...s, status, date: status === "Done" ? new Date().toISOString().slice(0,10) : s.date } : s) };
    setActive(next); setPlans(plans.map(p => p.id === next.id ? next : p));
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Treatment Plans</h1><p className="mt-1 text-sm text-muted-foreground">Build, approve, and track multi-step treatment journeys.</p></div>
        <Button className="gap-2"><Plus className="h-4 w-4" />New plan</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <div className="surface-card space-y-2 p-3">
          {plans.map(p => (
            <button key={p.id} onClick={() => setActive(p)} className={`w-full rounded-xl border p-3 text-left text-sm transition ${active.id === p.id ? "border-primary bg-primary-soft/40" : "border-border hover:bg-muted/30"}`}>
              <div className="flex items-center justify-between"><span className="font-medium">{p.title}</span><Badge variant="outline" className={statusColor(p.status)}>{p.status}</Badge></div>
              <div className="mt-1 text-xs text-muted-foreground">{p.patient} · {p.id}</div>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="surface-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><div className="text-xs text-muted-foreground">{active.id} · created {active.created}</div><h2 className="mt-0.5 text-xl font-semibold">{active.title}</h2><div className="text-sm text-muted-foreground">{active.patient}</div></div>
              <div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" className="gap-1.5"><Printer className="h-3.5 w-3.5" />Print</Button><Button size="sm" variant="outline" className="gap-1.5"><Send className="h-3.5 w-3.5" />Send for approval</Button><Button size="sm" className="gap-1.5"><DollarSign className="h-3.5 w-3.5" />Generate invoice</Button></div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div><div className="text-xs text-muted-foreground">Total</div><div className="text-xl font-semibold">${total.toLocaleString()}</div></div>
              <div><div className="text-xs text-muted-foreground">Completed</div><div className="text-xl font-semibold text-success">${done.toLocaleString()}</div></div>
              <div><div className="text-xs text-muted-foreground">Remaining</div><div className="text-xl font-semibold text-warning-foreground">${(total - done).toLocaleString()}</div></div>
            </div>
            <Progress value={pct} className="mt-3 h-2" /><div className="mt-1 text-xs text-muted-foreground">{pct}% complete</div>
          </div>

          <div className="surface-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border p-3"><div className="flex items-center gap-2 font-medium"><ClipboardList className="h-4 w-4" />Steps</div><Button size="sm" variant="ghost" className="gap-1"><Plus className="h-3.5 w-3.5" />Add step</Button></div>
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-2">#</th><th className="px-4 py-2">Tooth</th><th className="px-4 py-2">Procedure</th><th className="px-4 py-2">Cost</th><th className="px-4 py-2">Status</th><th className="px-4 py-2"></th></tr></thead>
              <tbody>
                {active.steps.map((s, i) => (
                  <tr key={s.id} className="border-t border-border/60">
                    <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3 font-medium">{s.tooth}</td>
                    <td className="px-4 py-3">{s.procedure}{s.date && <div className="text-xs text-muted-foreground">{s.date}</div>}</td>
                    <td className="px-4 py-3">${s.cost}</td>
                    <td className="px-4 py-3"><Badge variant="outline" className={statusColor(s.status)}>{s.status}</Badge></td>
                    <td className="px-4 py-3">
                      <Select value={s.status} onValueChange={(v) => updateStep(s.id, v as Step["status"])}>
                        <SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="Planned">Planned</SelectItem><SelectItem value="In Progress">In Progress</SelectItem><SelectItem value="Done">Done</SelectItem></SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
