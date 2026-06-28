import { createFileRoute } from "@tanstack/react-router";
import { Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountingScaffold, StatusBadge } from "@/components/accounting-scaffold";

export const Route = createFileRoute("/clinic/accounting/bank")({
  head: () => ({ meta: [{ title: "Bank & Cash — Dentallogue" }] }),
  component: BankPage,
});

const txns = [
  { date: "2026-06-28", desc: "Card settlement — Paystack", account: "Wema Main", amount: 740000, status: "Reconciled" },
  { date: "2026-06-27", desc: "Patient transfer — Sarah W.", account: "Wema Main", amount: 380000, status: "Reconciled" },
  { date: "2026-06-26", desc: "Henry Schein — supplier", account: "GTBank Ops", amount: -120500, status: "Unreconciled" },
  { date: "2026-06-25", desc: "Payroll batch June", account: "Wema Main", amount: -2400000, status: "Reconciled" },
  { date: "2026-06-24", desc: "ATM withdrawal — petty", account: "GTBank Ops", amount: -50000, status: "Unreconciled" },
];

function BankPage() {
  return (
    <AccountingScaffold
      title="Bank & Cash"
      description="Live feed across bank accounts and petty cash with reconciliation status."
      actions={
        <>
          <Button variant="outline" className="gap-2"><RefreshCw className="h-4 w-4" />Sync feeds</Button>
          <Button className="gap-2"><Plus className="h-4 w-4" />Add account</Button>
        </>
      }
      kpis={[
        { label: "Wema Main", value: "₦6,420,000", tone: "success" },
        { label: "GTBank Ops", value: "₦1,465,000", tone: "info" },
        { label: "Petty cash", value: "₦320,000" },
        { label: "Unreconciled", value: "2 items", tone: "warning" },
      ]}
      columns={[
        { key: "date", header: "Date" },
        { key: "desc", header: "Description" },
        { key: "account", header: "Account" },
        { key: "amount", header: "Amount", align: "right" },
        { key: "status", header: "Status" },
      ]}
      rows={txns.map((t) => ({
        date: <span className="text-xs">{t.date}</span>,
        desc: <span className="font-medium">{t.desc}</span>,
        account: <span className="text-xs">{t.account}</span>,
        amount: <span className={`font-medium ${t.amount < 0 ? "text-destructive" : "text-success"}`}>{t.amount < 0 ? "-" : "+"}₦{Math.abs(t.amount).toLocaleString()}</span>,
        status: <StatusBadge status={t.status} />,
      }))}
      linked={[
        { label: "General ledger", to: "/clinic/accounting/ledger" },
        { label: "Receivables", to: "/clinic/accounting/receivables" },
        { label: "Payables", to: "/clinic/accounting/payables" },
      ]}
    />
  );
}
