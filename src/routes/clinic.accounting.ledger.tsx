import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountingScaffold } from "@/components/accounting-scaffold";

export const Route = createFileRoute("/clinic/accounting/ledger")({
  head: () => ({ meta: [{ title: "General Ledger — Dentallogue" }] }),
  component: LedgerPage,
});

const lines = [
  { date: "2026-06-01", ref: "OB", desc: "Opening balance", debit: 5800000, credit: 0, balance: 5800000 },
  { date: "2026-06-05", ref: "JE-1021", desc: "Patient receipts batch", debit: 980000, credit: 0, balance: 6780000 },
  { date: "2026-06-12", ref: "JE-1029", desc: "Supplier payment — Henry Schein", debit: 0, credit: 320000, balance: 6460000 },
  { date: "2026-06-18", ref: "JE-1033", desc: "Card settlement batch", debit: 1240000, credit: 0, balance: 7700000 },
  { date: "2026-06-25", ref: "JE-1039", desc: "Payroll — June", debit: 0, credit: 2400000, balance: 5300000 },
  { date: "2026-06-27", ref: "JE-1041", desc: "Card payment — Sarah W.", debit: 380000, credit: 0, balance: 5680000 },
  { date: "2026-06-28", ref: "JE-1043", desc: "Insurance settlement — AXA", debit: 740000, credit: 0, balance: 6420000 },
];

function LedgerPage() {
  return (
    <AccountingScaffold
      title="General Ledger"
      description="Account-level movement and running balance. Pick an account to drill down."
      actions={<Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button>}
      kpis={[
        { label: "Account", value: "1010 · Bank Wema" },
        { label: "Opening", value: "₦5,800,000" },
        { label: "Movement", value: "+₦620,000", tone: "success" },
        { label: "Closing", value: "₦6,420,000", tone: "info" },
      ]}
      columns={[
        { key: "date", header: "Date" },
        { key: "ref", header: "Ref" },
        { key: "desc", header: "Description" },
        { key: "debit", header: "Debit", align: "right" },
        { key: "credit", header: "Credit", align: "right" },
        { key: "balance", header: "Balance", align: "right" },
      ]}
      rows={lines.map((l) => ({
        date: <span className="text-xs">{l.date}</span>,
        ref: <span className="font-mono text-xs">{l.ref}</span>,
        desc: l.desc,
        debit: l.debit ? `₦${l.debit.toLocaleString()}` : "—",
        credit: l.credit ? `₦${l.credit.toLocaleString()}` : "—",
        balance: <span className="font-medium">₦{l.balance.toLocaleString()}</span>,
      }))}
      linked={[
        { label: "Chart of accounts", to: "/clinic/accounting/chart-of-accounts" },
        { label: "Journal entries", to: "/clinic/accounting/journal" },
        { label: "Bank reconciliation", to: "/clinic/accounting/bank" },
      ]}
    />
  );
}
