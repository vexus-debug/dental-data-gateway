import { createFileRoute } from "@tanstack/react-router";
import { Send, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountingScaffold, StatusBadge } from "@/components/accounting-scaffold";

export const Route = createFileRoute("/clinic/accounting/receivables")({
  head: () => ({ meta: [{ title: "Accounts Receivable — Dentallogue" }] }),
  component: ARPage,
});

const ar = [
  { inv: "INV-2034", patient: "Michael Johnson", issued: "2026-06-22", due: "2026-07-22", balance: 240000, age: "0-30", status: "Sent" },
  { inv: "INV-2032", patient: "David Brown", issued: "2026-05-15", due: "2026-06-15", balance: 800000, age: "0-30", status: "Partial" },
  { inv: "INV-2031", patient: "James Taylor", issued: "2026-05-10", due: "2026-06-10", balance: 580000, age: "30-60", status: "Overdue" },
  { inv: "INS-118", patient: "AXA Mansard (claim #4421)", issued: "2026-05-02", due: "2026-06-02", balance: 440000, age: "30-60", status: "Pending" },
  { inv: "INV-2018", patient: "Grace Adekunle", issued: "2026-04-18", due: "2026-05-18", balance: 160000, age: "60-90", status: "Overdue" },
];

function ARPage() {
  return (
    <AccountingScaffold
      title="Accounts Receivable"
      description="What patients and insurers owe the clinic. Synced from billing and insurance modules."
      actions={
        <>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Aging report</Button>
          <Button className="gap-2"><Send className="h-4 w-4" />Send reminders</Button>
        </>
      }
      kpis={[
        { label: "Total outstanding", value: "₦2,220,000", tone: "warning" },
        { label: "Current (0-30)", value: "₦1,040,000", tone: "success" },
        { label: "30-60 days", value: "₦1,020,000", tone: "warning" },
        { label: "60+ days", value: "₦160,000", tone: "destructive" },
      ]}
      columns={[
        { key: "inv", header: "Invoice" },
        { key: "patient", header: "Customer" },
        { key: "issued", header: "Issued" },
        { key: "due", header: "Due" },
        { key: "age", header: "Aging" },
        { key: "balance", header: "Balance", align: "right" },
        { key: "status", header: "Status" },
      ]}
      rows={ar.map((r) => ({
        inv: <span className="font-mono text-xs">{r.inv}</span>,
        patient: <span className="font-medium">{r.patient}</span>,
        issued: <span className="text-xs">{r.issued}</span>,
        due: <span className="text-xs">{r.due}</span>,
        age: r.age,
        balance: <span className="font-medium">₦{r.balance.toLocaleString()}</span>,
        status: <StatusBadge status={r.status} />,
      }))}
      linked={[
        { label: "Billing", to: "/clinic/billing", description: "Source invoices" },
        { label: "Insurance claims", to: "/clinic/insurance" },
        { label: "Patients", to: "/clinic/patients" },
      ]}
    />
  );
}
