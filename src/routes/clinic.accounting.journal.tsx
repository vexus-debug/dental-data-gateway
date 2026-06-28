import { createFileRoute } from "@tanstack/react-router";
import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountingScaffold, StatusBadge } from "@/components/accounting-scaffold";

export const Route = createFileRoute("/clinic/accounting/journal")({
  head: () => ({ meta: [{ title: "Journal Entries — Dentallogue" }] }),
  component: JournalPage,
});

const entries = [
  { id: "JE-1042", date: "2026-06-28", desc: "Invoice INV-2034 — Michael Johnson", debit: "AR · Patients", credit: "Service Revenue", amount: 240000, status: "Posted", source: "Billing" },
  { id: "JE-1041", date: "2026-06-27", desc: "Payment PMT-503 — Sarah Williams", debit: "Bank · Wema", credit: "AR · Patients", amount: 380000, status: "Posted", source: "Billing" },
  { id: "JE-1040", date: "2026-06-26", desc: "Henry Schein supplies bill", debit: "Supplies Expense", credit: "AP · Vendors", amount: 120500, status: "Posted", source: "Payables" },
  { id: "JE-1039", date: "2026-06-25", desc: "Payroll — June", debit: "Salaries Expense", credit: "Bank · Wema", amount: 2400000, status: "Posted", source: "Payroll" },
  { id: "JE-1038", date: "2026-06-24", desc: "VAT remittance — May", debit: "VAT Payable", credit: "Bank · Wema", amount: 184000, status: "Pending", source: "Tax" },
  { id: "JE-1037", date: "2026-06-22", desc: "Depreciation — Q2", debit: "Depreciation Expense", credit: "Accum. Depreciation", amount: 800000, status: "Posted", source: "Fixed Assets" },
];

function JournalPage() {
  return (
    <AccountingScaffold
      title="Journal Entries"
      description="Every debit and credit posted to the ledger — automatic from connected modules and manual."
      actions={
        <>
          <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Filter</Button>
          <Button className="gap-2"><Plus className="h-4 w-4" />New entry</Button>
        </>
      }
      kpis={[
        { label: "Entries this month", value: "182" },
        { label: "Auto-posted", value: "164", tone: "success" },
        { label: "Pending review", value: "6", tone: "warning" },
        { label: "Reversed", value: "2", tone: "destructive" },
      ]}
      columns={[
        { key: "id", header: "Entry" },
        { key: "date", header: "Date" },
        { key: "desc", header: "Description" },
        { key: "debit", header: "Debit" },
        { key: "credit", header: "Credit" },
        { key: "amount", header: "Amount", align: "right" },
        { key: "source", header: "Source" },
        { key: "status", header: "Status" },
      ]}
      rows={entries.map((e) => ({
        id: <span className="font-mono text-xs">{e.id}</span>,
        date: <span className="text-xs">{e.date}</span>,
        desc: <span className="font-medium">{e.desc}</span>,
        debit: <span className="text-xs">{e.debit}</span>,
        credit: <span className="text-xs">{e.credit}</span>,
        amount: <span className="font-medium">₦{e.amount.toLocaleString()}</span>,
        source: <span className="text-xs text-muted-foreground">{e.source}</span>,
        status: <StatusBadge status={e.status} />,
      }))}
      linked={[
        { label: "Chart of accounts", to: "/clinic/accounting/chart-of-accounts" },
        { label: "General ledger", to: "/clinic/accounting/ledger" },
        { label: "Billing source docs", to: "/clinic/billing" },
      ]}
    />
  );
}
