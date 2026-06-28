import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, ChevronLeft, ChevronRight, Plus, Filter, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/clinic/appointments")({
  head: () => ({ meta: [{ title: "Appointments — Dentallogue" }] }),
  component: AppointmentsPage,
});

type Appt = { id: string; time: string; dur: number; patient: string; treatment: string; dentist: string; chair: string; status: "Scheduled" | "Checked In" | "In Treatment" | "Completed" | "Cancelled" };

const hours = Array.from({ length: 10 }, (_, i) => 8 + i); // 8 → 17
const dentists = ["Dr. John Doe", "Dr. Smith", "Dr. Patel"];

const appts: Appt[] = [
  { id: "A1", time: "09:00", dur: 45, patient: "Michael Johnson", treatment: "Cleaning", dentist: "Dr. John Doe", chair: "1", status: "Checked In" },
  { id: "A2", time: "09:45", dur: 60, patient: "Sarah Williams", treatment: "Filling", dentist: "Dr. John Doe", chair: "1", status: "Scheduled" },
  { id: "A3", time: "10:30", dur: 90, patient: "David Brown", treatment: "Root Canal", dentist: "Dr. Smith", chair: "2", status: "Scheduled" },
  { id: "A4", time: "11:15", dur: 60, patient: "Emma Wilson", treatment: "Crown", dentist: "Dr. John Doe", chair: "1", status: "In Treatment" },
  { id: "A5", time: "13:00", dur: 30, patient: "James Taylor", treatment: "Check-up", dentist: "Dr. Patel", chair: "3", status: "Scheduled" },
  { id: "A6", time: "14:00", dur: 45, patient: "Olivia Martin", treatment: "Whitening", dentist: "Dr. Smith", chair: "2", status: "Scheduled" },
  { id: "A7", time: "15:30", dur: 60, patient: "Daniel Lee", treatment: "Extraction", dentist: "Dr. Patel", chair: "3", status: "Scheduled" },
];

function statusColor(s: Appt["status"]) {
  const map = { "Checked In": "bg-success/15 text-success border-success/20", Scheduled: "bg-info/15 text-info border-info/20", "In Treatment": "bg-primary-soft text-accent-foreground border-primary/20", Completed: "bg-muted text-muted-foreground border-border", Cancelled: "bg-destructive/10 text-destructive border-destructive/20" };
  return map[s];
}

function AppointmentsPage() {
  const [view, setView] = useState("day");
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState<Appt | null>(null);
  const [openNew, setOpenNew] = useState(false);
  const [dentistFilter, setDentistFilter] = useState("all");

  const dateStr = date.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const filtered = useMemo(() => dentistFilter === "all" ? appts : appts.filter(a => a.dentist === dentistFilter), [dentistFilter]);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Appointments</h1>
          <p className="mt-1 text-sm text-muted-foreground">Schedule, check-in, and manage chair time in one view.</p>
        </div>
        <Dialog open={openNew} onOpenChange={setOpenNew}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" />Book appointment</Button></DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader><DialogTitle>New appointment</DialogTitle></DialogHeader>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2"><Label>Patient</Label><Input placeholder="Search patient..." /></div>
              <div><Label>Date</Label><Input type="date" /></div>
              <div><Label>Time</Label><Input type="time" /></div>
              <div><Label>Duration (min)</Label><Input type="number" defaultValue={45} /></div>
              <div><Label>Dentist</Label><Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{dentists.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select></div>
              <div className="sm:col-span-2"><Label>Treatment</Label><Input placeholder="e.g. Cleaning" /></div>
              <div className="sm:col-span-2"><Label>Notes</Label><Textarea rows={3} /></div>
            </div>
            <DialogFooter><Button variant="ghost" onClick={() => setOpenNew(false)}>Cancel</Button><Button onClick={() => setOpenNew(false)}>Book</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="surface-card flex flex-wrap items-center gap-3 p-3">
        <Button variant="outline" size="icon" onClick={() => setDate(new Date(date.getTime() - 86400000))}><ChevronLeft className="h-4 w-4" /></Button>
        <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">{dateStr}</span></div>
        <Button variant="outline" size="icon" onClick={() => setDate(new Date(date.getTime() + 86400000))}><ChevronRight className="h-4 w-4" /></Button>
        <Button variant="ghost" size="sm" onClick={() => setDate(new Date())}>Today</Button>
        <div className="ml-auto flex items-center gap-2">
          <Select value={dentistFilter} onValueChange={setDentistFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="all">All dentists</SelectItem>{dentists.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
          </Select>
          <Tabs value={view} onValueChange={setView}><TabsList><TabsTrigger value="day">Day</TabsTrigger><TabsTrigger value="week">Week</TabsTrigger><TabsTrigger value="list">List</TabsTrigger></TabsList></Tabs>
        </div>
      </div>

      <div className={`grid gap-4 ${selected ? "lg:grid-cols-[1fr_360px]" : ""}`}>
        <div className="surface-card overflow-hidden">
          {view !== "list" ? (
            <div className="overflow-x-auto">
              <div className="grid min-w-[700px] grid-cols-[60px_repeat(3,1fr)] border-b border-border bg-muted/40 text-xs font-medium">
                <div className="p-2.5 text-muted-foreground">Time</div>
                {dentists.map(d => <div key={d} className="border-l border-border p-2.5">{d}</div>)}
              </div>
              <div className="grid min-w-[700px] grid-cols-[60px_repeat(3,1fr)]">
                {hours.map(h => (
                  <div key={h} className="contents">
                    <div className="border-b border-border p-2 text-xs text-muted-foreground">{String(h).padStart(2, "0")}:00</div>
                    {dentists.map(d => {
                      const cell = filtered.find(a => a.dentist === d && parseInt(a.time) === h);
                      return (
                        <div key={d + h} className="min-h-[64px] border-b border-l border-border p-1.5">
                          {cell && (
                            <button onClick={() => setSelected(cell)} className={`w-full rounded-lg border p-2 text-left text-xs transition hover:shadow-sm ${statusColor(cell.status)}`}>
                              <div className="font-semibold">{cell.patient}</div>
                              <div>{cell.treatment} · {cell.dur}m</div>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-2.5">Time</th><th className="px-4 py-2.5">Patient</th><th className="px-4 py-2.5">Treatment</th><th className="px-4 py-2.5">Dentist</th><th className="px-4 py-2.5">Status</th></tr></thead>
              <tbody>{filtered.map(a => (
                <tr key={a.id} onClick={() => setSelected(a)} className="cursor-pointer border-t border-border/60 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{a.time}</td><td className="px-4 py-3">{a.patient}</td><td className="px-4 py-3">{a.treatment}</td><td className="px-4 py-3 text-xs text-muted-foreground">{a.dentist}</td><td className="px-4 py-3"><Badge variant="outline" className={statusColor(a.status)}>{a.status}</Badge></td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </div>

        {selected && (
          <aside className="surface-card space-y-3 p-4">
            <div className="flex items-start justify-between"><div><div className="text-xs text-muted-foreground">{selected.time} · {selected.dur} min</div><div className="font-semibold">{selected.patient}</div></div><Badge variant="outline" className={statusColor(selected.status)}>{selected.status}</Badge></div>
            <div className="space-y-1.5 text-sm"><div><span className="text-muted-foreground">Treatment: </span>{selected.treatment}</div><div><span className="text-muted-foreground">Dentist: </span>{selected.dentist}</div><div><span className="text-muted-foreground">Chair: </span>{selected.chair}</div></div>
            <Textarea placeholder="Add notes..." rows={3} />
            <div className="grid grid-cols-2 gap-2"><Button size="sm">Check in</Button><Button size="sm" variant="outline">Start treatment</Button><Button size="sm" variant="outline">Reschedule</Button><Button size="sm" variant="ghost" className="text-destructive">Cancel</Button></div>
          </aside>
        )}
      </div>
    </div>
  );
}
