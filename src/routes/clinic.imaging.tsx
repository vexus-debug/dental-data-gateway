import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ScanLine, Upload, Image as ImageIcon, ZoomIn, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/clinic/imaging")({
  head: () => ({ meta: [{ title: "Imaging — Dentallogue" }] }),
  component: ImagingPage,
});

type Img = { id: string; patient: string; type: string; date: string; tooth?: string };

const imgs: Img[] = [
  { id: "1", patient: "Michael Johnson", type: "Panoramic", date: "2026-06-22" },
  { id: "2", patient: "Michael Johnson", type: "Bitewing", date: "2026-06-22", tooth: "16-17" },
  { id: "3", patient: "Sarah Williams", type: "Periapical", date: "2026-06-20", tooth: "14" },
  { id: "4", patient: "David Brown", type: "Cephalometric", date: "2026-06-18" },
  { id: "5", patient: "Emma Wilson", type: "CBCT", date: "2026-06-25" },
  { id: "6", patient: "James Taylor", type: "Intraoral", date: "2026-06-15" },
];

function ImagingPage() {
  const [active, setActive] = useState(imgs[0]);
  const [type, setType] = useState("all");
  const filtered = type === "all" ? imgs : imgs.filter(i => i.type === type);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Imaging</h1><p className="mt-1 text-sm text-muted-foreground">Capture, view and annotate X-rays and scans.</p></div>
        <Button className="gap-2"><Upload className="h-4 w-4" />Upload image</Button>
      </div>

      <div className="surface-card flex flex-wrap items-center gap-3 p-3">
        <Input placeholder="Search patient..." className="flex-1 min-w-[200px]" />
        <Select value={type} onValueChange={setType}><SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All types</SelectItem><SelectItem value="Panoramic">Panoramic</SelectItem><SelectItem value="Bitewing">Bitewing</SelectItem><SelectItem value="Periapical">Periapical</SelectItem><SelectItem value="CBCT">CBCT</SelectItem></SelectContent></Select>
        <Input type="date" className="w-[160px]" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="surface-card flex flex-col">
          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-muted to-card">
            <div className="text-center"><ScanLine className="mx-auto h-16 w-16 text-muted-foreground" /><div className="mt-2 text-sm font-medium">{active.type} — {active.patient}</div><div className="text-xs text-muted-foreground">{active.date}{active.tooth && ` · Tooth ${active.tooth}`}</div></div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border p-3">
            <div className="flex gap-1"><Button size="sm" variant="outline" className="gap-1.5"><ZoomIn className="h-3.5 w-3.5" />Zoom</Button><Button size="sm" variant="outline">Annotate</Button><Button size="sm" variant="outline">Measure</Button></div>
            <Button size="sm" variant="ghost" className="gap-1.5"><Download className="h-3.5 w-3.5" />Download</Button>
          </div>
        </div>

        <div className="surface-card p-3">
          <div className="mb-2 text-xs font-medium uppercase text-muted-foreground">Gallery</div>
          <div className="grid grid-cols-3 gap-2">
            {filtered.map(i => (
              <button key={i.id} onClick={() => setActive(i)} className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition ${active.id === i.id ? "border-primary" : "border-transparent hover:border-border"}`}>
                <div className="flex h-full w-full items-center justify-center bg-muted"><ImageIcon className="h-6 w-6 text-muted-foreground" /></div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1.5"><div className="text-[10px] font-medium text-white">{i.type}</div></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
