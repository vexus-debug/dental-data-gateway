import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LayoutTemplate, Plus, Search, Eye, Pencil, Copy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/admin/templates")({
  head: () => ({ meta: [{ title: "Website Templates — Super Admin" }, { name: "description", content: "Manage the catalog of clinic website templates." }] }),
  component: TemplatesPage,
});

type Tpl = { id: string; name: string; category: string; used: number; rating: number; status: "Published" | "Draft" | "Archived"; gradient: string; updated: string };
const templates: Tpl[] = [
  { id: "T-001", name: "Modern Care", category: "General Dentistry", used: 64, rating: 4.8, status: "Published", gradient: "from-chart-1/30 to-chart-2/20", updated: "2026-06-18" },
  { id: "T-002", name: "Bright Smile", category: "Cosmetic", used: 41, rating: 4.6, status: "Published", gradient: "from-chart-3/30 to-chart-1/20", updated: "2026-06-12" },
  { id: "T-003", name: "Family First", category: "Family", used: 88, rating: 4.9, status: "Published", gradient: "from-chart-2/30 to-chart-4/20", updated: "2026-06-22" },
  { id: "T-004", name: "Ortho Pro", category: "Orthodontics", used: 22, rating: 4.4, status: "Published", gradient: "from-chart-4/30 to-chart-3/20", updated: "2026-05-30" },
  { id: "T-005", name: "Pediatric Joy", category: "Pediatric", used: 18, rating: 4.7, status: "Draft", gradient: "from-chart-5/30 to-chart-2/20", updated: "2026-06-25" },
  { id: "T-006", name: "Implant Studio", category: "Implants", used: 12, rating: 4.2, status: "Published", gradient: "from-chart-1/30 to-chart-4/20", updated: "2026-06-08" },
  { id: "T-007", name: "Classic Practice", category: "General Dentistry", used: 6, rating: 3.9, status: "Archived", gradient: "from-muted to-muted/40", updated: "2025-12-02" },
  { id: "T-008", name: "Premium Clinic", category: "Cosmetic", used: 31, rating: 4.7, status: "Published", gradient: "from-chart-2/30 to-chart-5/20", updated: "2026-06-19" },
];

function statusTone(s: Tpl["status"]) {
  return s === "Published" ? "bg-success/15 text-success border-success/20"
    : s === "Draft" ? "bg-info/15 text-info border-info/20"
    : "bg-muted text-muted-foreground border-border";
}

function TemplatesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const filtered = templates.filter(t =>
    (cat === "all" || t.category === cat) &&
    (t.name.toLowerCase().includes(q.toLowerCase()) || t.category.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Website Templates</h1>
          <p className="mt-1 text-sm text-muted-foreground">Catalog of templates clinics can choose for their website.</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" />New Template</Button>
      </div>

      <div className="surface-card flex flex-wrap items-center gap-2 p-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search templates" className="pl-9" />
        </div>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="w-[200px]"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            <SelectItem value="General Dentistry">General Dentistry</SelectItem>
            <SelectItem value="Cosmetic">Cosmetic</SelectItem>
            <SelectItem value="Family">Family</SelectItem>
            <SelectItem value="Orthodontics">Orthodontics</SelectItem>
            <SelectItem value="Pediatric">Pediatric</SelectItem>
            <SelectItem value="Implants">Implants</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map(t => (
          <div key={t.id} className="surface-card overflow-hidden">
            <div className={`relative aspect-[4/3] bg-gradient-to-br ${t.gradient}`}>
              <div className="absolute inset-0 flex flex-col">
                <div className="flex items-center gap-1 border-b border-foreground/5 bg-background/60 px-3 py-2 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-destructive/60" />
                  <span className="h-2 w-2 rounded-full bg-warning/60" />
                  <span className="h-2 w-2 rounded-full bg-success/60" />
                  <span className="ml-2 truncate text-[10px] text-muted-foreground">preview.{t.name.toLowerCase().replace(/ /g, "")}.dental</span>
                </div>
                <div className="flex flex-1 flex-col justify-end p-3">
                  <div className="rounded-md bg-background/70 p-2 backdrop-blur">
                    <div className="h-2 w-3/4 rounded-full bg-foreground/30" />
                    <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-foreground/15" />
                    <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-foreground/15" />
                  </div>
                </div>
              </div>
              <Badge variant="outline" className={`absolute right-2 top-2 ${statusTone(t.status)}`}>{t.status}</Badge>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">{t.name}</h3>
                  <p className="truncate text-xs text-muted-foreground">{t.category}</p>
                </div>
                <div className="flex items-center gap-1 text-xs"><Star className="h-3 w-3 fill-chart-4 text-chart-4" />{t.rating}</div>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{t.used} clinics</span><span>Updated {t.updated}</span>
              </div>
              <div className="mt-3 flex gap-1">
                <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs"><Eye className="h-3.5 w-3.5" />Preview</Button>
                <Button variant="outline" size="icon" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button>
                <Button variant="outline" size="icon" className="h-8 w-8"><Copy className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
