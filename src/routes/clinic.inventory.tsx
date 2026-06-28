import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Package, Plus, AlertTriangle, ShoppingCart, TrendingDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/clinic/inventory")({
  head: () => ({ meta: [{ title: "Inventory — Dentallogue" }] }),
  component: InventoryPage,
});

type Item = { id: string; name: string; category: string; sku: string; stock: number; min: number; unit: string; cost: number; supplier: string; expires?: string };

const items: Item[] = [
  { id: "1", name: "Composite Resin A2", category: "Restorative", sku: "CR-A2-4G", stock: 3, min: 10, unit: "syringe", cost: 18, supplier: "DentSupply", expires: "2027-03" },
  { id: "2", name: "Dental Anesthetic 2%", category: "Anesthesia", sku: "LIDO-2-1.7", stock: 24, min: 20, unit: "cartridge", cost: 1.2, supplier: "MediDent" },
  { id: "3", name: "Latex Gloves M", category: "PPE", sku: "GLV-M-100", stock: 8, min: 15, unit: "box", cost: 12, supplier: "DentSupply" },
  { id: "4", name: "Suction Tips", category: "Disposable", sku: "STIP-100", stock: 45, min: 20, unit: "pack", cost: 9, supplier: "MediDent" },
  { id: "5", name: "Bonding Agent", category: "Restorative", sku: "BOND-5ML", stock: 2, min: 5, unit: "bottle", cost: 42, supplier: "BrightDent", expires: "2026-12" },
  { id: "6", name: "Sterile Gauze", category: "Disposable", sku: "GZE-100", stock: 32, min: 30, unit: "pack", cost: 4, supplier: "DentSupply" },
];

function InventoryPage() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const filtered = items.filter(i => (cat === "all" || i.category === cat) && i.name.toLowerCase().includes(q.toLowerCase()));
  const lowStock = items.filter(i => i.stock < i.min);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Inventory</h1><p className="mt-1 text-sm text-muted-foreground">Track supplies, reorder low stock, and manage suppliers.</p></div>
        <div className="flex gap-2"><Button variant="outline" className="gap-2"><ShoppingCart className="h-4 w-4" />Order ({lowStock.length})</Button><Button className="gap-2"><Plus className="h-4 w-4" />New item</Button></div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="surface-card p-4"><div className="text-xs text-muted-foreground">Items tracked</div><div className="mt-1 text-2xl font-semibold">{items.length}</div></div>
        <div className="surface-card p-4"><div className="flex items-center gap-2 text-xs text-muted-foreground"><AlertTriangle className="h-3.5 w-3.5 text-warning-foreground" />Low stock</div><div className="mt-1 text-2xl font-semibold text-warning-foreground">{lowStock.length}</div></div>
        <div className="surface-card p-4"><div className="text-xs text-muted-foreground">Inventory value</div><div className="mt-1 text-2xl font-semibold">${items.reduce((s, i) => s + i.stock * i.cost, 0).toLocaleString()}</div></div>
        <div className="surface-card p-4"><div className="text-xs text-muted-foreground">Suppliers</div><div className="mt-1 text-2xl font-semibold">3</div></div>
      </div>

      {lowStock.length > 0 && (
        <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4">
          <div className="flex items-center gap-2 font-medium text-warning-foreground"><AlertTriangle className="h-4 w-4" />Low stock alerts</div>
          <div className="mt-2 flex flex-wrap gap-2">{lowStock.map(i => <Badge key={i.id} variant="outline" className="bg-card">{i.name} ({i.stock} left)</Badge>)}</div>
        </div>
      )}

      <div className="surface-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
          <div className="relative flex-1 min-w-[200px]"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search items..." className="pl-9" /></div>
          <Select value={cat} onValueChange={setCat}><SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All categories</SelectItem><SelectItem value="Restorative">Restorative</SelectItem><SelectItem value="Anesthesia">Anesthesia</SelectItem><SelectItem value="PPE">PPE</SelectItem><SelectItem value="Disposable">Disposable</SelectItem></SelectContent></Select>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-2">Item</th><th className="px-4 py-2">SKU</th><th className="px-4 py-2">Stock level</th><th className="px-4 py-2">Cost</th><th className="px-4 py-2">Supplier</th><th className="px-4 py-2">Expires</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>{filtered.map(i => {
            const pct = Math.min(100, Math.round((i.stock / (i.min * 2)) * 100));
            const low = i.stock < i.min;
            return (
              <tr key={i.id} className="border-t border-border/60 hover:bg-muted/30">
                <td className="px-4 py-3"><div className="font-medium">{i.name}</div><div className="text-xs text-muted-foreground">{i.category}</div></td>
                <td className="px-4 py-3 font-mono text-xs">{i.sku}</td>
                <td className="px-4 py-3 w-48"><div className="flex items-center justify-between text-xs"><span className={low ? "font-semibold text-destructive" : "font-medium"}>{i.stock} {i.unit}</span><span className="text-muted-foreground">min {i.min}</span></div><Progress value={pct} className={`mt-1 h-1.5 ${low ? "[&>div]:bg-destructive" : ""}`} /></td>
                <td className="px-4 py-3">${i.cost}</td>
                <td className="px-4 py-3 text-xs">{i.supplier}</td>
                <td className="px-4 py-3 text-xs">{i.expires ?? "—"}</td>
                <td className="px-4 py-3"><Button size="sm" variant={low ? "default" : "outline"} className="gap-1"><ShoppingCart className="h-3 w-3" />{low ? "Reorder" : "Order"}</Button></td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>
    </div>
  );
}
