import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Folder, FileText, Upload, Search, Download, MoreHorizontal, Image as ImageIcon, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/clinic/documents")({
  head: () => ({ meta: [{ title: "Documents — Dentallogue" }] }),
  component: DocumentsPage,
});

const folders = [
  { name: "Patient Records", count: 412 },
  { name: "Insurance Forms", count: 87 },
  { name: "Lab Reports", count: 56 },
  { name: "Compliance", count: 23 },
  { name: "Marketing", count: 18 },
];

const files = [
  { name: "Johnson_Consent_2026.pdf", type: "pdf", patient: "Michael Johnson", size: "240 KB", date: "2026-06-22", folder: "Patient Records" },
  { name: "Williams_XRay_Panoramic.jpg", type: "image", patient: "Sarah Williams", size: "1.8 MB", date: "2026-06-20", folder: "Patient Records" },
  { name: "Delta_Dental_Q2_Statement.pdf", type: "pdf", patient: "—", size: "112 KB", date: "2026-06-15", folder: "Insurance Forms" },
  { name: "Brown_Treatment_Plan.pdf", type: "pdf", patient: "David Brown", size: "320 KB", date: "2026-06-18", folder: "Patient Records" },
  { name: "Lab_Report_LC301.pdf", type: "pdf", patient: "Michael Johnson", size: "98 KB", date: "2026-06-15", folder: "Lab Reports" },
  { name: "OSHA_Compliance_2026.pdf", type: "pdf", patient: "—", size: "880 KB", date: "2026-01-05", folder: "Compliance" },
];

function DocumentsPage() {
  const [folder, setFolder] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const filtered = files.filter(f => (!folder || f.folder === folder) && f.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Documents</h1><p className="mt-1 text-sm text-muted-foreground">Central library for patient files, forms and compliance.</p></div>
        <Button className="gap-2"><Upload className="h-4 w-4" />Upload</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <div className="surface-card p-3 space-y-1">
          <button onClick={() => setFolder(null)} className={`flex w-full items-center justify-between rounded-lg p-2 text-sm transition ${!folder ? "bg-primary-soft font-medium" : "hover:bg-muted/40"}`}><span className="flex items-center gap-2"><Folder className="h-4 w-4" />All files</span><Badge variant="outline">{files.length}</Badge></button>
          {folders.map(f => (<button key={f.name} onClick={() => setFolder(f.name)} className={`flex w-full items-center justify-between rounded-lg p-2 text-sm transition ${folder === f.name ? "bg-primary-soft font-medium" : "hover:bg-muted/40"}`}><span className="flex items-center gap-2"><Folder className="h-4 w-4" />{f.name}</span><Badge variant="outline">{f.count}</Badge></button>))}
        </div>

        <div className="surface-card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border p-3"><div className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search documents..." className="pl-9" /></div></div>
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-2">Name</th><th className="px-4 py-2">Patient</th><th className="px-4 py-2">Folder</th><th className="px-4 py-2">Size</th><th className="px-4 py-2">Modified</th><th className="px-4 py-2"></th></tr></thead>
            <tbody>{filtered.map(f => (<tr key={f.name} className="border-t border-border/60 hover:bg-muted/30"><td className="px-4 py-3"><div className="flex items-center gap-2">{f.type === "image" ? <ImageIcon className="h-4 w-4 text-info" /> : f.type === "pdf" ? <FileText className="h-4 w-4 text-destructive" /> : <File className="h-4 w-4 text-muted-foreground" />}<span className="font-medium">{f.name}</span></div></td><td className="px-4 py-3 text-xs">{f.patient}</td><td className="px-4 py-3 text-xs">{f.folder}</td><td className="px-4 py-3 text-xs">{f.size}</td><td className="px-4 py-3 text-xs">{f.date}</td><td className="px-4 py-3"><div className="flex gap-1"><Button size="icon" variant="ghost" className="h-7 w-7"><Download className="h-3.5 w-3.5" /></Button><Button size="icon" variant="ghost" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button></div></td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
