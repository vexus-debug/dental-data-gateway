import { createFileRoute } from "@tanstack/react-router";
import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AccountingScaffold } from "@/components/accounting-scaffold";

export const Route = createFileRoute("/clinic/accounting/chart-of-accounts")({
  head: () => ({ meta: [{ title: "Chart of Accounts — Dentallogue" }] }),
  component: CoaPage,
});

const accounts = [
  { code: "1000", name: "Cash on Hand", type: "Asset", balance: 320000 },
  { code: "1010", name: "Bank — Wema Main", type: "Asset", balance: 6420000 },
  { code: "1020", name: "Bank — GTBank Ops", type: "Asset", balance: 1465000 },
  { code: "1200", name: "Accounts Receivable — Patients", type: "Asset", balance: 980000 },
  { code: "1210", name: "Accounts Receivable — Insurers", type: "Asset", balance: 440000 },
  { code: "1400", name: "Inventory — Consumables", type: "Asset", balance: 620000 },
  { code: "1500", name: "Dental Equipment", type: "Fixed Asset", balance: 14200000 },
  { code: "1510", name: "Accumulated Depreciation", type: "Contra Asset", balance: -3200000 },
  { code: "2000", name: "Accounts Payable", type: "Liability", balance: 680000 },
  { code: "2200", name: "VAT Payable", type: "Liability", balance: 184000 },
  { code: "2210", name: "PAYE Payable", type: "Liability", balance: 312000 },
  { code: "3000", name: "Owner's Equity", type: "Equity", balance: 12500000 },
  { code: "3100", name: "Retained Earnings", type: "Equity", balance: 4200000 },
  { code: "4000", name: "Service Revenue — Treatments", type: "Revenue", balance: 4320000 },
  { code: "4100", name: "Service Revenue — Imaging", type: "Revenue", balance: 380000 },
  { code: "4200", name: "Service Revenue — Lab", type: "Revenue", balance: 120000 },
  { code: "5000", name: "Salaries & Wages", type: "Expense", balance: 2400000 },
  { code: "5100", name: "Dental Supplies", type: "Expense", balance: 420000 },
  { code: "5200", name: "Rent", type: "Expense", balance: 350000 },
  { code: "5300", name: "Utilities", type: "Expense", balance: 142000 },
  { code: "5400", name: "Marketing", type: "Expense", balance: 95000 },
  { code: "5500", name: "Software & SaaS", type: "Expense", balance: 80000 },
];

function CoaPage() {
  return (
    <AccountingScaffold
      title="Chart of Accounts"
      description="Master list of ledger accounts. Drives every journal entry, report and balance."
      actions={
        <>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export CSV</Button>
          <Button className="gap-2"><Plus className="h-4 w-4" />New account</Button>
        </>
      }
      kpis={[
        { label: "Total accounts", value: String(accounts.length) },
        { label: "Assets", value: "₦20,245,000", tone: "success" },
        { label: "Liabilities", value: "₦1,176,000", tone: "warning" },
        { label: "Equity", value: "₦16,700,000", tone: "info" },
      ]}
      columns={[
        { key: "code", header: "Code" },
        { key: "name", header: "Account" },
        { key: "type", header: "Type" },
        { key: "balance", header: "Balance", align: "right" },
      ]}
      rows={accounts.map((a) => ({
        code: <span className="font-mono text-xs">{a.code}</span>,
        name: <span className="font-medium">{a.name}</span>,
        type: <Badge variant="outline">{a.type}</Badge>,
        balance: <span className={a.balance < 0 ? "text-destructive" : ""}>₦{a.balance.toLocaleString()}</span>,
      }))}
      linked={[
        { label: "Journal entries", to: "/clinic/accounting/journal" },
        { label: "General ledger", to: "/clinic/accounting/ledger" },
        { label: "Trial balance & reports", to: "/clinic/accounting/reports" },
      ]}
    />
  );
}
