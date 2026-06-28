import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Plus, TrendingUp, TrendingDown, Wallet, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountingScaffold, StatusBadge } from "@/components/accounting-scaffold";

export const Route = createFileRoute("/clinic/accounting")({
  head: () => ({ meta: [{ title: "Accounting — Dentallogue" }] }),
  component: AccountingOverview,
});

function AccountingOverview() {
  return (
    <AccountingScaffold
      title="Accounting"
      description="Single source of truth for clinic finances — ledgers, receivables, payables, payroll, tax and reports."
      actions={
        <>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button>
          <Button className="gap-2"><Plus className="h-4 w-4" />New entry</Button>
        </>
      }
      kpis={[
        { label: "Revenue MTD", value: "₦4,820,000", tone: "success" },
        { label: "Expenses MTD", value: "₦1,640,500", tone: "warning" },
        { label: "Net profit", value: "₦3,179,500", tone: "success" },
        { label: "Cash balance", value: "₦8,205,000", tone: "info" },
      ]}
      columns={[
        { key: "date", header: "Date" },
        { key: "ref", header: "Ref" },
        { key: "desc", header: "Description" },
        { key: "account", header: "Account" },
        { key: "amount", header: "Amount", align: "right" },
        { key: "status", header: "Status" },
      ]}
      rows={[
        { date: "2026-06-28", ref: "JE-1042", desc: "Patient invoice INV-2034", account: "AR · Patients", amount: "₦240,000", status: <StatusBadge status="Posted" /> },
        { date: "2026-06-27", ref: "PMT-503", desc: "Card payment — Sarah W.", account: "Bank · Wema", amount: "₦380,000", status: <StatusBadge status="Reconciled" /> },
        { date: "2026-06-26", ref: "EXP-218", desc: "Dental supplies — Henry Schein", account: "Supplies", amount: "-₦120,500", status: <StatusBadge status="Approved" /> },
        { date: "2026-06-25", ref: "PAY-06", desc: "Payroll run — June", account: "Salaries", amount: "-₦2,400,000", status: <StatusBadge status="Posted" /> },
        { date: "2026-06-24", ref: "TAX-VAT", desc: "VAT remittance — May", account: "VAT Payable", amount: "-₦184,000", status: <StatusBadge status="Pending" /> },
      ]}
      linked={[
        { label: "Billing & Invoices", to: "/clinic/billing", description: "Source of receivables" },
        { label: "Insurance Claims", to: "/clinic/insurance", description: "Third-party AR" },
        { label: "Inventory", to: "/clinic/inventory", description: "COGS & supplies" },
        { label: "Staff & Payroll", to: "/clinic/staff", description: "Salary expense" },
        { label: "Reports", to: "/clinic/reports", description: "Clinical KPIs" },
        { label: "Subscription", to: "/clinic/subscription", description: "SaaS expense" },
      ]}
    >
      <div className="grid gap-3 lg:grid-cols-3">
        <QuickCard to="/clinic/accounting/receivables" icon={<TrendingUp className="h-4 w-4 text-success" />} title="Accounts Receivable" value="₦1,420,000" hint="12 open invoices" />
        <QuickCard to="/clinic/accounting/payables" icon={<TrendingDown className="h-4 w-4 text-warning-foreground" />} title="Accounts Payable" value="₦680,000" hint="6 vendor bills" />
        <QuickCard to="/clinic/accounting/bank" icon={<Wallet className="h-4 w-4 text-info" />} title="Bank & Cash" value="₦8,205,000" hint="3 accounts" />
        <QuickCard to="/clinic/accounting/tax" icon={<FileText className="h-4 w-4" />} title="Tax obligations" value="₦184,000" hint="Due July 21" />
        <QuickCard to="/clinic/accounting/payroll" icon={<FileText className="h-4 w-4" />} title="Next payroll" value="₦2,400,000" hint="July 25" />
        <QuickCard to="/clinic/accounting/reports" icon={<FileText className="h-4 w-4" />} title="Reports" value="P&L · BS · CF" hint="Trial balance ready" />
      </div>
    </AccountingScaffold>
  );
}

function QuickCard({ to, icon, title, value, hint }: { to: string; icon: React.ReactNode; title: string; value: string; hint: string }) {
  return (
    <Link to={to} className="surface-card p-4 transition hover:border-primary/40 hover:shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">{icon}{title}</div>
      </div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{hint}</div>
    </Link>
  );
}
