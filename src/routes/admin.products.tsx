import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Boxes, Plus, Search, ToggleRight, ToggleLeft, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/admin/products")({
  head: () => ({ meta: [{ title: "Products & Modules — Super Admin" }, { name: "description", content: "Toggle modules, addons and feature flags." }] }),
  component: ProductsPage,
});

type Mod = { key: string; name: string; group: string; description: string; enabled: boolean; clinics: number; tier: string };
const initial: Mod[] = [
  { key: "patients", name: "Patient Management", group: "Core", description: "Full patient registry, charts and history.", enabled: true, clinics: 248, tier: "All plans" },
  { key: "appointments", name: "Appointments", group: "Core", description: "Calendar, scheduling and reminders.", enabled: true, clinics: 248, tier: "All plans" },
  { key: "billing", name: "Billing & Invoicing", group: "Core", description: "Invoices, payments and receivables.", enabled: true, clinics: 241, tier: "All plans" },
  { key: "imaging", name: "Imaging & X-Rays", group: "Clinical", description: "DICOM viewer and image library.", enabled: true, clinics: 188, tier: "Pro+" },
  { key: "lab", name: "Laboratory", group: "Clinical", description: "Lab order tracking and results.", enabled: true, clinics: 142, tier: "Pro+" },
  { key: "portal", name: "Patient Portal", group: "Engagement", description: "Self-service patient portal with login.", enabled: true, clinics: 156, tier: "Pro+" },
  { key: "marketing", name: "Marketing Suite", group: "Engagement", description: "Email and SMS campaigns.", enabled: false, clinics: 88, tier: "Enterprise" },
  { key: "website", name: "Website Builder", group: "Engagement", description: "Hosted clinic websites with templates.", enabled: true, clinics: 112, tier: "Pro+" },
  { key: "analytics", name: "Advanced Analytics", group: "Insights", description: "Custom dashboards and cohort reports.", enabled: true, clinics: 64, tier: "Enterprise" },
  { key: "api", name: "Public API", group: "Platform", description: "REST + webhook access for integrators.", enabled: false, clinics: 22, tier: "Enterprise" },
];

const addons = [
  { name: "AI Treatment Assistant", desc: "Suggest treatment plans from notes.", price: 49, badge: "Beta", icon: Sparkles },
  { name: "Whitelabel Branding", desc: "Custom domain and brand colors.", price: 99, badge: "Popular", icon: Star },
  { name: "Extra Storage 100GB", desc: "Image and document storage pack.", price: 25, badge: null, icon: Boxes },
  { name: "SMS Reminders 1k", desc: "1,000 SMS per month.", price: 19, badge: null, icon: Boxes },
];

const flags = [
  { name: "new_dental_chart", env: "Production", enabled: true, rollout: "100%" },
  { name: "ai_intake_summary", env: "Production", enabled: false, rollout: "25%" },
  { name: "stripe_billing_v2", env: "Staging", enabled: true, rollout: "100%" },
  { name: "patient_messaging_v2", env: "Production", enabled: false, rollout: "0%" },
];

function ProductsPage() {
  const [mods, setMods] = useState(initial);
  const [q, setQ] = useState("");
  const [openNew, setOpenNew] = useState(false);
  const filtered = mods.filter(m => m.name.toLowerCase().includes(q.toLowerCase()) || m.group.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products & Modules</h1>
          <p className="mt-1 text-sm text-muted-foreground">Control which features are available, by plan and per clinic.</p>
        </div>
        <Dialog open={openNew} onOpenChange={setOpenNew}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" />New Module</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create module</DialogTitle></DialogHeader>
            <div className="grid gap-4">
              <div><Label>Module name</Label><Input placeholder="Treatment Planner" /></div>
              <div><Label>Description</Label><Textarea rows={3} /></div>
              <div><Label>Tier</Label><Input placeholder="Pro+" /></div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3"><span className="text-sm">Enabled by default</span><Switch defaultChecked /></div>
            </div>
            <DialogFooter><Button variant="ghost" onClick={() => setOpenNew(false)}>Cancel</Button><Button onClick={() => setOpenNew(false)}>Create</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="modules">
        <TabsList>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="addons">Add-ons</TabsTrigger>
          <TabsTrigger value="flags">Feature flags</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="mt-4 space-y-3">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search modules" className="pl-9" />
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map(m => (
              <div key={m.key} className="surface-card flex flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-muted text-foreground text-[10px]">{m.group}</Badge>
                      <Badge variant="outline" className="bg-primary-soft text-accent-foreground text-[10px]">{m.tier}</Badge>
                    </div>
                    <h3 className="mt-2 truncate text-sm font-semibold">{m.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{m.description}</p>
                  </div>
                  <Switch checked={m.enabled} onCheckedChange={(v) => setMods(prev => prev.map(p => p.key === m.key ? { ...p, enabled: v } : p))} />
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                  <span>{m.clinics} clinics using</span>
                  <Button variant="ghost" size="sm" className="h-7">Configure</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="addons" className="mt-4">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {addons.map(a => (
              <div key={a.name} className="surface-card flex flex-col p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground"><a.icon className="h-5 w-5" /></div>
                  {a.badge && <Badge variant="outline" className="bg-info/15 text-info border-info/20 text-[10px]">{a.badge}</Badge>}
                </div>
                <h3 className="mt-3 text-sm font-semibold">{a.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{a.desc}</p>
                <div className="mt-3 flex items-baseline gap-1"><span className="text-2xl font-semibold">${a.price}</span><span className="text-xs text-muted-foreground">/mo</span></div>
                <Button variant="outline" size="sm" className="mt-4">Edit add-on</Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="flags" className="mt-4">
          <div className="surface-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <tr><th className="px-4 py-2.5">Flag</th><th className="px-4 py-2.5">Environment</th><th className="px-4 py-2.5">Rollout</th><th className="px-4 py-2.5">Status</th><th></th></tr>
                </thead>
                <tbody>
                  {flags.map(f => (
                    <tr key={f.name} className="border-t border-border/60 hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs">{f.name}</td>
                      <td className="px-4 py-3 text-xs">{f.env}</td>
                      <td className="px-4 py-3 text-xs">{f.rollout}</td>
                      <td className="px-4 py-3">
                        {f.enabled ? <Badge variant="outline" className="bg-success/15 text-success border-success/20 gap-1"><ToggleRight className="h-3 w-3" />On</Badge>
                          : <Badge variant="outline" className="bg-muted text-muted-foreground border-border gap-1"><ToggleLeft className="h-3 w-3" />Off</Badge>}
                      </td>
                      <td className="px-4 py-3 text-right"><Button variant="ghost" size="sm" className="h-7">Manage</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
