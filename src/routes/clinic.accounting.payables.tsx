import { createFileRoute } from "@tanstack/react-router";
import { Plus, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountingScaffold, StatusBadge } from "@/components/accounting-scaffold";

export const Route = createFileRoute("/clinic/accounting/payables")({
  head: () => ({ meta: [{ title: "Accounts Payable — Dentallogue" }] }),
  component: APPage,
});

const ap = [
  { bill: "BIL-204", vendor: "Henry Schein", due: "2026-07-10", balance: 320000, category: "Supplies", status: "Approved" },
  { bill: "BIL-203", vendor: "Lagos Power Co.", due: "2026-07-05", balance: 86000, category: "Utilities", status: "Pending" },
  { bill: "BIL-202", vendor: "Acme Property Ltd.", due: "2026-07-01", balance: 350000, category: "Rent", status: "Approved" },
  { bill: "BIL-201", vendor: "DentalLab Co.", due: "2026-06-30", balance: 120000, category: "Lab", status: "Overdue" },
  { bill: "BIL-200", vendor: "Meta Ads", due: "2026-07-15", balance: 45000, category: "Marketing", status: "Approved" },
];

function APPage() {
  return (
    <AccountingScaffold
      title="Accounts Payable"
      description="Vendor bills and what the clinic owes. Approve, schedule, and pay."
      actions={
        <>
          <Button variant="outline" className="gap-2"><Plus className="h-4 w-4" />New bill</Button>
          <Button className="gap-2"><CreditCard className="h-4 w-4" />Pay selected</Button>
        </>
      }
      kpis={[
        { label: "Total payable", value: "₦921,000", tone: "warning" },
        { label: "Due this week", value: "₦556,000", tone: "destructive" },
        { label: "Bills pending approval", value: "1" },
        { label: "Active vendors", value: "14", tone: "info" },
      ]}
      columns={[
        { key: "bill", header: "Bill" },
        { key: "vendor", header: "Vendor" },
        { key: "category", header: "Category" },
        { key: "due", header: "Due" },
        { key: "balance", header: "Balance", align: "right" },
        { key: "status", header: "Status" },
      ]}
      rows={ap.map((r) => ({
        bill: <span className="font-mono text-xs">{r.bill}</span>,
        vendor: <span className="font-medium">{r.vendor}</span>,
        category: r.category,
        due: <span className="text-xs">{r.due}</span>,
        balance: <span className="font-medium">₦{r.balance.toLocaleString()}</span>,
        status: <StatusBadge status={r.status} />,
      }))}
      linked={[
        { label: "Expenses", to: "/clinic/accounting/expenses" },
        { label: "Inventory", to: "/clinic/inventory" },
        { label: "Bank & cash", to: "/clinic/accounting/bank" },
      ]}
    />
  );
}
