import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountingScaffold } from "@/components/accounting-scaffold";

export const Route = createFileRoute("/clinic/accounting/fixed-assets")({
  head: () => ({ meta: [{ title: "Fixed Assets — Dentallogue" }] }),
  component: AssetsPage,
});

const assets = [
  { id: "FA-001", name: "Sirona Orthophos XG3 X-ray", category: "Imaging", cost: 6800000, acc: 1400000, nbv: 5400000, acquired: "2024-02-12", life: "8y SL" },
  { id: "FA-002", name: "A-dec 500 Dental Chair (x2)", category: "Equipment", cost: 4200000, acc: 1050000, nbv: 3150000, acquired: "2024-05-04", life: "10y SL" },
  { id: "FA-003", name: "EMS AirFlow Prophylaxis", category: "Equipment", cost: 1500000, acc: 450000, nbv: 1050000, acquired: "2024-09-20", life: "5y SL" },
  { id: "FA-004", name: "Autoclave Statim 5000", category: "Sterilization", cost: 1200000, acc: 300000, nbv: 900000, acquired: "2025-01-10", life: "6y SL" },
  { id: "FA-005", name: "Reception furniture", category: "Furniture", cost: 500000, acc: 0, nbv: 500000, acquired: "2025-11-02", life: "5y SL" },
];

function AssetsPage() {
  return (
    <AccountingScaffold
      title="Fixed Assets"
      description="Equipment register with depreciation schedule. Posts to GL automatically."
      actions={<Button className="gap-2"><Plus className="h-4 w-4" />Register asset</Button>}
      kpis={[
        { label: "Asset cost", value: "₦14,200,000" },
        { label: "Accum. depreciation", value: "-₦3,200,000", tone: "warning" },
        { label: "Net book value", value: "₦11,000,000", tone: "success" },
        { label: "Monthly depreciation", value: "₦240,000", tone: "info" },
      ]}
      columns={[
        { key: "id", header: "Tag" },
        { key: "name", header: "Asset" },
        { key: "category", header: "Category" },
        { key: "cost", header: "Cost", align: "right" },
        { key: "acc", header: "Acc. Dep.", align: "right" },
        { key: "nbv", header: "NBV", align: "right" },
        { key: "acquired", header: "Acquired" },
        { key: "life", header: "Life" },
      ]}
      rows={assets.map((a) => ({
        id: <span className="font-mono text-xs">{a.id}</span>,
        name: <span className="font-medium">{a.name}</span>,
        category: a.category,
        cost: `₦${a.cost.toLocaleString()}`,
        acc: <span className="text-warning-foreground">₦{a.acc.toLocaleString()}</span>,
        nbv: <span className="font-semibold">₦{a.nbv.toLocaleString()}</span>,
        acquired: <span className="text-xs">{a.acquired}</span>,
        life: <span className="text-xs">{a.life}</span>,
      }))}
      linked={[
        { label: "Journal (depreciation)", to: "/clinic/accounting/journal" },
        { label: "Inventory", to: "/clinic/inventory" },
      ]}
    />
  );
}
