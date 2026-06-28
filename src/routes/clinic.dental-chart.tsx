import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Stethoscope, Save, History, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/clinic/dental-chart")({
  head: () => ({ meta: [{ title: "Dental Chart — Dentallogue" }] }),
  component: DentalChartPage,
});

const upper = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const lower = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];

type ToothState = { num: number; condition: "healthy" | "decay" | "filled" | "crown" | "missing" | "implant"; note?: string };

const conditions = {
  healthy: { fill: "fill-card", stroke: "stroke-border", label: "Healthy" },
  decay: { fill: "fill-destructive/40", stroke: "stroke-destructive", label: "Decay" },
  filled: { fill: "fill-info/40", stroke: "stroke-info", label: "Filled" },
  crown: { fill: "fill-warning/50", stroke: "stroke-warning", label: "Crown" },
  missing: { fill: "fill-muted", stroke: "stroke-muted-foreground", label: "Missing" },
  implant: { fill: "fill-success/40", stroke: "stroke-success", label: "Implant" },
};

function DentalChartPage() {
  const [teeth, setTeeth] = useState<Record<number, ToothState>>(() => {
    const o: Record<number, ToothState> = {};
    [...upper, ...lower].forEach(n => o[n] = { num: n, condition: "healthy" });
    o[16] = { num: 16, condition: "filled" }; o[26] = { num: 26, condition: "crown" }; o[36] = { num: 36, condition: "decay" }; o[46] = { num: 46, condition: "missing" };
    return o;
  });
  const [active, setActive] = useState<number | null>(16);

  const setCondition = (num: number, c: ToothState["condition"]) => setTeeth(prev => ({ ...prev, [num]: { ...prev[num], condition: c } }));

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Dental Chart</h1><p className="mt-1 text-sm text-muted-foreground">Interactive odontogram with notes, history, and treatment linking.</p></div>
        <div className="flex gap-2"><Button variant="outline" className="gap-2"><History className="h-4 w-4" />History</Button><Button className="gap-2"><Save className="h-4 w-4" />Save chart</Button></div>
      </div>

      <div className="surface-card flex flex-wrap items-center gap-3 p-3">
        <div className="relative flex-1 min-w-[200px]"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search patient..." className="pl-9" defaultValue="Michael Johnson (P-1042)" /></div>
        <div className="flex flex-wrap items-center gap-2">{Object.entries(conditions).map(([k, v]) => <Badge key={k} variant="outline" className="gap-1.5"><span className={`inline-block h-2.5 w-2.5 rounded-sm ${v.fill.replace("fill-", "bg-")}`} />{v.label}</Badge>)}</div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="surface-card p-4 sm:p-6">
          <div className="space-y-6">
            {[upper, lower].map((row, ri) => (
              <div key={ri}>
                <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">{ri === 0 ? "Upper" : "Lower"}</div>
                <div className="grid grid-cols-16 gap-1.5" style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}>
                  {row.map(n => {
                    const t = teeth[n]; const c = conditions[t.condition];
                    return (
                      <button key={n} onClick={() => setActive(n)} className={`group relative aspect-[3/4] rounded-md border-2 transition ${active === n ? "border-primary ring-2 ring-primary/30" : "border-transparent"}`}>
                        <svg viewBox="0 0 30 40" className="h-full w-full">
                          <path d="M15 2 C 6 2 3 12 5 22 L 7 36 C 8 38 10 38 12 36 L 14 28 L 16 28 L 18 36 C 20 38 22 38 23 36 L 25 22 C 27 12 24 2 15 2 Z" className={`${c.fill} ${c.stroke}`} strokeWidth={1.5} />
                        </svg>
                        <span className="absolute inset-x-0 bottom-0 text-center text-[9px] font-medium">{n}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="surface-card p-4">
          {active ? (
            <>
              <div className="mb-3 flex items-center justify-between"><div className="text-sm text-muted-foreground">Tooth</div><div className="text-2xl font-semibold">#{active}</div></div>
              <Tabs defaultValue="cond">
                <TabsList className="grid grid-cols-3"><TabsTrigger value="cond">Condition</TabsTrigger><TabsTrigger value="notes">Notes</TabsTrigger><TabsTrigger value="hist">History</TabsTrigger></TabsList>
                <TabsContent value="cond" className="space-y-2 pt-3">
                  {Object.entries(conditions).map(([k, v]) => (
                    <button key={k} onClick={() => setCondition(active, k as ToothState["condition"])} className={`flex w-full items-center gap-2 rounded-lg border p-2 text-sm transition ${teeth[active].condition === k ? "border-primary bg-primary-soft" : "border-border hover:bg-muted/40"}`}>
                      <span className={`h-3 w-3 rounded-sm ${v.fill.replace("fill-", "bg-")}`} />{v.label}
                    </button>
                  ))}
                  <Select><SelectTrigger className="mt-3"><SelectValue placeholder="Add procedure" /></SelectTrigger><SelectContent><SelectItem value="comp">Composite filling</SelectItem><SelectItem value="rc">Root canal</SelectItem><SelectItem value="ext">Extraction</SelectItem><SelectItem value="crown">Crown</SelectItem></SelectContent></Select>
                  <Button size="sm" className="mt-2 w-full gap-1"><FileText className="h-3.5 w-3.5" />Add to treatment plan</Button>
                </TabsContent>
                <TabsContent value="notes" className="space-y-2 pt-3"><Textarea rows={6} placeholder="Clinical notes for this tooth..." /><Button size="sm" className="w-full">Save note</Button></TabsContent>
                <TabsContent value="hist" className="space-y-2 pt-3 text-sm">
                  <div className="rounded-lg border border-border p-2.5"><div className="text-xs text-muted-foreground">2026-03-12</div><div>Composite filling — Dr. John Doe</div></div>
                  <div className="rounded-lg border border-border p-2.5"><div className="text-xs text-muted-foreground">2025-08-04</div><div>Diagnosed decay — Dr. Smith</div></div>
                </TabsContent>
              </Tabs>
            </>
          ) : <div className="py-8 text-center text-sm text-muted-foreground">Select a tooth</div>}
        </aside>
      </div>
    </div>
  );
}
