import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, Clock, Play, CheckCircle2, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/clinic/queue")({
  head: () => ({ meta: [{ title: "Patient Queue — Dentallogue" }] }),
  component: QueuePage,
});

type Q = { id: string; name: string; initials: string; treatment: string; dentist: string; chair?: string; arrived: string; wait: number; status: "Waiting" | "In Chair" | "Ready" };

const init: Q[] = [
  { id: "1", name: "Lisa Anderson", initials: "LA", treatment: "Cleaning", dentist: "Dr. John Doe", arrived: "08:50", wait: 25, status: "Waiting" },
  { id: "2", name: "Robert Miller", initials: "RM", treatment: "Filling", dentist: "Dr. John Doe", arrived: "09:05", wait: 10, status: "Waiting" },
  { id: "3", name: "Jennifer Davis", initials: "JD", treatment: "Root Canal", dentist: "Dr. Smith", chair: "2", arrived: "09:15", wait: 0, status: "In Chair" },
  { id: "4", name: "William Martinez", initials: "WM", treatment: "Crown", dentist: "Dr. Smith", chair: "1", arrived: "09:20", wait: 0, status: "In Chair" },
  { id: "5", name: "Amanda Garcia", initials: "AG", treatment: "Check-up", dentist: "Dr. Patel", arrived: "09:30", wait: 5, status: "Ready" },
];

function QueuePage() {
  const [items, setItems] = useState<Q[]>(init);

  const move = (id: string, to: Q["status"]) => setItems(prev => prev.map(i => i.id === id ? { ...i, status: to, wait: to === "In Chair" ? 0 : i.wait } : i));
  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const cols: { key: Q["status"]; title: string; tone: string }[] = [
    { key: "Waiting", title: "Waiting Room", tone: "bg-warning/10 text-warning-foreground" },
    { key: "Ready", title: "Ready", tone: "bg-info/10 text-info" },
    { key: "In Chair", title: "In Chair", tone: "bg-success/15 text-success" },
  ];

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Patient Queue</h1><p className="mt-1 text-sm text-muted-foreground">Live view of the waiting room and chair status.</p></div>
        <Button className="gap-2"><UserPlus className="h-4 w-4" />Walk-in check-in</Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="surface-card p-4"><div className="text-xs text-muted-foreground">In waiting room</div><div className="mt-1 text-2xl font-semibold">{items.filter(i => i.status === "Waiting").length}</div></div>
        <div className="surface-card p-4"><div className="text-xs text-muted-foreground">Ready</div><div className="mt-1 text-2xl font-semibold">{items.filter(i => i.status === "Ready").length}</div></div>
        <div className="surface-card p-4"><div className="text-xs text-muted-foreground">In chair</div><div className="mt-1 text-2xl font-semibold">{items.filter(i => i.status === "In Chair").length}</div></div>
        <div className="surface-card p-4"><div className="text-xs text-muted-foreground">Avg wait</div><div className="mt-1 text-2xl font-semibold">14m</div></div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {cols.map(col => (
          <div key={col.key} className="surface-card flex flex-col">
            <div className={`flex items-center justify-between border-b border-border p-3 ${col.tone} rounded-t-2xl`}>
              <div className="flex items-center gap-2 font-semibold"><ListChecks className="h-4 w-4" />{col.title}</div>
              <Badge variant="outline">{items.filter(i => i.status === col.key).length}</Badge>
            </div>
            <div className="space-y-2 p-3">
              {items.filter(i => i.status === col.key).map(i => (
                <div key={i.id} className="rounded-xl border border-border bg-card p-3">
                  <div className="flex items-center gap-3"><Avatar className="h-9 w-9"><AvatarFallback>{i.initials}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{i.name}</div><div className="truncate text-xs text-muted-foreground">{i.treatment} · {i.dentist}</div></div></div>
                  <div className="mt-2 flex items-center justify-between text-xs"><span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" />Arrived {i.arrived}{i.wait > 0 && ` · ${i.wait}m wait`}</span>{i.chair && <Badge variant="outline">Chair {i.chair}</Badge>}</div>
                  <div className="mt-2 flex gap-1.5">
                    {col.key === "Waiting" && <Button size="sm" variant="outline" className="flex-1 gap-1" onClick={() => move(i.id, "Ready")}>Ready <ArrowRight className="h-3 w-3" /></Button>}
                    {col.key === "Ready" && <Button size="sm" className="flex-1 gap-1" onClick={() => move(i.id, "In Chair")}><Play className="h-3 w-3" />Start</Button>}
                    {col.key === "In Chair" && <Button size="sm" variant="outline" className="flex-1 gap-1" onClick={() => remove(i.id)}><CheckCircle2 className="h-3 w-3" />Complete</Button>}
                  </div>
                </div>
              ))}
              {items.filter(i => i.status === col.key).length === 0 && <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">No patients</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
