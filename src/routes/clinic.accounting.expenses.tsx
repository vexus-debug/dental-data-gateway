import { createFileRoute } from "@tanstack/react-router";
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountingScaffold, StatusBadge } from "@/components/accounting-scaffold";

export const Route = createFileRoute("/clinic/accounting/expenses")({
  head: () => ({ meta: [{ title: "Expenses — Dentallogue" }] }),
  component: ExpensesPage,
});

const exp = [
  { id: "EXP-218", date: "2026-06-26", vendor: "Henry Schein", category: "Dental supplies", amount: 120500, payer: "Card · GTBank", status: "Approved" },
  { id: "EXP-217", date: "2026-06-24", vendor: "Uber Health", category: "Transport", amount: 14500, payer: "Petty cash", status: "Approved" },
  { id: "EXP-216", date: "2026-06-22", vendor: "Spotify Ads", category: "Marketing", amount: 30000, payer: "Card · GTBank", status: "Pending" },
  { id: "EXP-215", date: "2026-06-20", vendor: "Coffee Hub", category: "Office", amount: 8500, payer: "Petty cash", status: "Approved" },
  { id: "EXP-214", date: "2026-06-18", vendor: "DentalLab Co.", category: "Lab outsourcing", amount: 220000, payer: "Transfer · Wema", status: "Approved" },
];

function ExpensesPage() {
  return (
    <AccountingScaffold
      title="Expenses"
      description="Track every outflow with category, payer and receipt. Roll-up into the P&L automatically."
      actions={
        <>
          <Button variant="outline" className="gap-2"><Upload className="h-4 w-4" />Import receipts</Button>
          <Button className="gap-2"><Plus className="h-4 w-4" />Add expense</Button>
        </>
      }
      kpis={[
        { label: "Expenses MTD", value: "₦1,640,500", tone: "warning" },
        { label: "Top category", value: "Salaries" },
        { label: "Pending approval", value: "1" },
        { label: "Receipts attached", value: "94%", tone: "success" },
      ]}
      columns={[
        { key: "id", header: "Ref" },
        { key: "date", header: "Date" },
        { key: "vendor", header: "Vendor" },
        { key: "category", header: "Category" },
        { key: "payer", header: "Paid via" },
        { key: "amount", header: "Amount", align: "right" },
        { key: "status", header: "Status" },
      ]}
      rows={exp.map((e) => ({
        id: <span className="font-mono text-xs">{e.id}</span>,
        date: <span className="text-xs">{e.date}</span>,
        vendor: <span className="font-medium">{e.vendor}</span>,
        category: e.category,
        payer: <span className="text-xs">{e.payer}</span>,
        amount: <span className="font-medium">₦{e.amount.toLocaleString()}</span>,
        status: <StatusBadge status={e.status} />,
      }))}
      linked={[
        { label: "Accounts payable", to: "/clinic/accounting/payables" },
        { label: "Budgets", to: "/clinic/accounting/budgets" },
        { label: "Bank & cash", to: "/clinic/accounting/bank" },
      ]}
    />
  );
}
