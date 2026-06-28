import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountingScaffold } from "@/components/accounting-scaffold";

export const Route = createFileRoute("/clinic/accounting/budgets")({
  head: () => ({ meta: [{ title: "Budgets — Dentallogue" }] }),
  component: BudgetsPage,
});

const budgets = [
  { cat: "Salaries", budget: 2500000, actual: 2400000 },
  { cat: "Dental supplies", budget: 500000, actual: 420000 },
  { cat: "Rent", budget: 350000, actual: 350000 },
  { cat: "Utilities", budget: 150000, actual: 142000 },
  { cat: "Marketing", budget: 120000, actual: 95000 },
  { cat: "Lab outsourcing", budget: 250000, actual: 320000 },
  { cat: "Software & SaaS", budget: 90000, actual: 80000 },
];

function Bar({ pct, over }: { pct: number; over: boolean }) {
  return (
    <div className="h-2 w-40 overflow-hidden rounded-full bg-muted">
      <div className={`h-full ${over ? "bg-destructive" : pct > 85 ? "bg-warning" : "bg-success"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
    </div>
  );
}

function BudgetsPage() {
  return (
    <AccountingScaffold
      title="Budgets"
      description="Plan vs actual spend by category. Catch overspend before month-end."
      actions={<Button className="gap-2"><Plus className="h-4 w-4" />New budget line</Button>}
      kpis={[
        { label: "Total budget", value: "₦3,960,000" },
        { label: "Actual MTD", value: "₦3,807,000" },
        { label: "Utilization", value: "96%", tone: "warning" },
        { label: "Over budget", value: "1 line", tone: "destructive" },
      ]}
      columns={[
        { key: "cat", header: "Category" },
        { key: "budget", header: "Budget", align: "right" },
        { key: "actual", header: "Actual", align: "right" },
        { key: "variance", header: "Variance", align: "right" },
        { key: "bar", header: "Utilization" },
      ]}
      rows={budgets.map((b) => {
        const variance = b.budget - b.actual;
        const pct = (b.actual / b.budget) * 100;
        return {
          cat: <span className="font-medium">{b.cat}</span>,
          budget: `₦${b.budget.toLocaleString()}`,
          actual: `₦${b.actual.toLocaleString()}`,
          variance: <span className={variance < 0 ? "text-destructive font-medium" : "text-success"}>{variance < 0 ? "-" : "+"}₦{Math.abs(variance).toLocaleString()}</span>,
          bar: <Bar pct={pct} over={variance < 0} />,
        };
      })}
      linked={[
        { label: "Expenses", to: "/clinic/accounting/expenses" },
        { label: "P&L report", to: "/clinic/accounting/reports" },
      ]}
    />
  );
}
