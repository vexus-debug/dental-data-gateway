import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileSignature, Plus, Send, CheckCircle2, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/clinic/consent-forms")({
  head: () => ({ meta: [{ title: "Consent Forms — Dentallogue" }] }),
  component: ConsentPage,
});

const templates = [
  { id: "T1", name: "General Treatment Consent", lang: "EN", uses: 412 },
  { id: "T2", name: "Anesthesia Consent", lang: "EN/ES", uses: 188 },
  { id: "T3", name: "Root Canal Consent", lang: "EN", uses: 56 },
  { id: "T4", name: "Extraction Consent", lang: "EN/ES", uses: 92 },
  { id: "T5", name: "Orthodontic Consent", lang: "EN", uses: 34 },
  { id: "T6", name: "HIPAA Privacy Notice", lang: "EN/ES", uses: 1248 },
];

const sent = [
  { id: "C1", patient: "Michael Johnson", form: "General Treatment Consent", sent: "2026-06-22", status: "Signed", signedAt: "2026-06-22 09:15" },
  { id: "C2", patient: "Sarah Williams", form: "Anesthesia Consent", sent: "2026-06-20", status: "Sent", signedAt: null },
  { id: "C3", patient: "David Brown", form: "Root Canal Consent", sent: "2026-06-18", status: "Signed", signedAt: "2026-06-18 14:30" },
  { id: "C4", patient: "Emma Wilson", form: "Orthodontic Consent", sent: "2026-06-25", status: "Pending", signedAt: null },
];

function ConsentPage() {
  const [tab, setTab] = useState("sent");
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Consent Forms</h1><p className="mt-1 text-sm text-muted-foreground">Send, track, and store electronic consent.</p></div>
        <div className="flex gap-2"><Button variant="outline" className="gap-2"><FileText className="h-4 w-4" />Templates</Button><Button className="gap-2"><Send className="h-4 w-4" />Send form</Button></div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="surface-card flex items-center gap-3 p-4"><CheckCircle2 className="h-8 w-8 text-success" /><div><div className="text-xs text-muted-foreground">Signed this week</div><div className="text-xl font-semibold">28</div></div></div>
        <div className="surface-card flex items-center gap-3 p-4"><Clock className="h-8 w-8 text-warning-foreground" /><div><div className="text-xs text-muted-foreground">Awaiting signature</div><div className="text-xl font-semibold">{sent.filter(s => s.status !== "Signed").length}</div></div></div>
        <div className="surface-card flex items-center gap-3 p-4"><FileSignature className="h-8 w-8 text-info" /><div><div className="text-xs text-muted-foreground">Templates</div><div className="text-xl font-semibold">{templates.length}</div></div></div>
        <div className="surface-card flex items-center gap-3 p-4"><FileText className="h-8 w-8 text-primary" /><div><div className="text-xs text-muted-foreground">Stored</div><div className="text-xl font-semibold">2,184</div></div></div>
      </div>

      <Tabs value={tab} onValueChange={setTab}><TabsList><TabsTrigger value="sent">Sent forms</TabsTrigger><TabsTrigger value="templates">Templates</TabsTrigger></TabsList></Tabs>

      {tab === "sent" && (
        <div className="surface-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-2">Patient</th><th className="px-4 py-2">Form</th><th className="px-4 py-2">Sent</th><th className="px-4 py-2">Status</th><th className="px-4 py-2"></th></tr></thead>
            <tbody>{sent.map(s => (<tr key={s.id} className="border-t border-border/60 hover:bg-muted/30"><td className="px-4 py-3 font-medium">{s.patient}</td><td className="px-4 py-3">{s.form}</td><td className="px-4 py-3 text-xs">{s.sent}</td><td className="px-4 py-3"><Badge variant="outline" className={s.status === "Signed" ? "bg-success/15 text-success" : s.status === "Sent" ? "bg-info/15 text-info" : "bg-warning/15 text-warning-foreground"}>{s.status}{s.signedAt && ` · ${s.signedAt}`}</Badge></td><td className="px-4 py-3"><Button size="sm" variant="ghost">View</Button></td></tr>))}</tbody>
          </table>
        </div>
      )}

      {tab === "templates" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map(t => (<div key={t.id} className="surface-card p-4"><div className="flex items-center justify-between"><FileSignature className="h-6 w-6 text-primary" /><Badge variant="outline">{t.lang}</Badge></div><div className="mt-2 font-semibold">{t.name}</div><div className="text-xs text-muted-foreground">{t.uses} times sent</div><div className="mt-3 flex gap-2"><Button size="sm" className="flex-1 gap-1"><Send className="h-3 w-3" />Send</Button><Button size="sm" variant="outline">Edit</Button></div></div>))}
        </div>
      )}
    </div>
  );
}
