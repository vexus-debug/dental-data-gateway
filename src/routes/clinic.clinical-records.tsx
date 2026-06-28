import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Plus, Search, Paperclip, Activity, Pill, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/clinic/clinical-records")({
  head: () => ({ meta: [{ title: "Clinical Records — Dentallogue" }] }),
  component: RecordsPage,
});

const notes = [
  { id: 1, date: "2026-06-22", dentist: "Dr. John Doe", type: "SOAP Note", patient: "Michael Johnson", summary: "Routine cleaning. Mild gingivitis noted on lower anteriors.", attachments: 2 },
  { id: 2, date: "2026-06-20", dentist: "Dr. Smith", type: "Procedure", patient: "Sarah Williams", summary: "Composite filling on #14. Local anesthesia, no complications.", attachments: 1 },
  { id: 3, date: "2026-06-18", dentist: "Dr. Patel", type: "Consult", patient: "David Brown", summary: "Patient consulted for orthodontic options. Recommended clear aligners.", attachments: 0 },
];

function RecordsPage() {
  const [active, setActive] = useState(notes[0]);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Clinical Records</h1><p className="mt-1 text-sm text-muted-foreground">SOAP notes, medical history, prescriptions and attachments — all on one page.</p></div>
        <Button className="gap-2"><Plus className="h-4 w-4" />New note</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <div className="surface-card flex flex-col">
          <div className="border-b border-border p-3"><div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search records..." className="pl-9" /></div></div>
          <div className="space-y-1 p-2">
            {notes.map(n => (
              <button key={n.id} onClick={() => setActive(n)} className={`w-full rounded-xl border p-3 text-left transition ${active.id === n.id ? "border-primary bg-primary-soft/40" : "border-transparent hover:bg-muted/40"}`}>
                <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">{n.date}</span><Badge variant="outline" className="text-[10px]">{n.type}</Badge></div>
                <div className="mt-1 text-sm font-medium">{n.patient}</div>
                <div className="line-clamp-2 text-xs text-muted-foreground">{n.summary}</div>
                <div className="mt-1 text-xs text-muted-foreground">{n.dentist}{n.attachments > 0 && ` · ${n.attachments} attachments`}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="surface-card">
          <div className="flex items-center justify-between border-b border-border p-4"><div className="flex items-center gap-3"><Avatar className="h-10 w-10"><AvatarFallback>{active.patient.split(" ").map(s=>s[0]).join("")}</AvatarFallback></Avatar><div><div className="font-semibold">{active.patient}</div><div className="text-xs text-muted-foreground">{active.date} · {active.dentist}</div></div></div><Badge variant="outline">{active.type}</Badge></div>
          <Tabs defaultValue="note" className="p-4">
            <TabsList><TabsTrigger value="note">Note</TabsTrigger><TabsTrigger value="history">Medical history</TabsTrigger><TabsTrigger value="rx">Prescriptions</TabsTrigger><TabsTrigger value="files">Attachments</TabsTrigger></TabsList>
            <TabsContent value="note" className="space-y-3 pt-4">
              <div><label className="text-xs font-medium uppercase text-muted-foreground">Subjective</label><Textarea defaultValue="Patient reports mild sensitivity on lower right molars when consuming cold drinks." rows={2} /></div>
              <div><label className="text-xs font-medium uppercase text-muted-foreground">Objective</label><Textarea defaultValue="Visual exam shows mild gingival inflammation. No visible caries. Probing depths 2-3mm." rows={2} /></div>
              <div><label className="text-xs font-medium uppercase text-muted-foreground">Assessment</label><Textarea defaultValue="Localized gingivitis. Sensitivity likely due to mild enamel wear." rows={2} /></div>
              <div><label className="text-xs font-medium uppercase text-muted-foreground">Plan</label><Textarea defaultValue="Prophylactic cleaning performed. Recommended fluoride toothpaste. Follow-up in 6 months." rows={2} /></div>
              <div className="flex gap-2"><Button>Save</Button><Button variant="outline" className="gap-1.5"><Paperclip className="h-4 w-4" />Attach</Button></div>
            </TabsContent>
            <TabsContent value="history" className="space-y-2 pt-4 text-sm">
              <div className="surface-card p-3"><div className="flex items-center gap-2 font-medium"><AlertTriangle className="h-4 w-4 text-destructive" />Allergies</div><div className="mt-1">Penicillin (severe)</div></div>
              <div className="surface-card p-3"><div className="flex items-center gap-2 font-medium"><Activity className="h-4 w-4 text-info" />Conditions</div><div className="mt-1">Hypertension (controlled)</div></div>
              <div className="surface-card p-3"><div className="flex items-center gap-2 font-medium"><Pill className="h-4 w-4 text-primary" />Current medications</div><div className="mt-1">Lisinopril 10mg daily</div></div>
            </TabsContent>
            <TabsContent value="rx" className="space-y-2 pt-4">
              <div className="surface-card p-3"><div className="flex items-center justify-between"><div><div className="font-medium">Amoxicillin 500mg</div><div className="text-xs text-muted-foreground">3 times daily for 7 days</div></div><Button size="sm" variant="outline">Print</Button></div></div>
              <Button className="gap-2"><Plus className="h-4 w-4" />New prescription</Button>
            </TabsContent>
            <TabsContent value="files" className="pt-4"><div className="grid grid-cols-3 gap-3">{Array.from({length: active.attachments}).map((_, i) => <div key={i} className="surface-card flex aspect-square items-center justify-center"><FileText className="h-8 w-8 text-muted-foreground" /></div>)}<Button variant="outline" className="aspect-square h-full">+ Add file</Button></div></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
