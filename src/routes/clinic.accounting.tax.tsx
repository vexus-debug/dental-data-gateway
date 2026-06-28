import { createFileRoute } from "@tanstack/react-router";
import { FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountingScaffold, StatusBadge } from "@/components/accounting-scaffold";

export const Route = createFileRoute("/clinic/accounting/tax")({
  head: () => ({ meta: [{ title: "Tax — Dentallogue" }] }),
  component: TaxPage,
});

const obligations = [
  { tax: "VAT — May 2026", base: 2300000, rate: "7.5%", amount: 172500, due: "2026-06-21", status: "Pending" },
  { tax: "VAT — June 2026", base: 2450000, rate: "7.5%", amount: 183750, due: "2026-07-21", status: "Draft" },
  { tax: "PAYE — June 2026", base: 2290000, rate: "Banded", amount: 254000, due: "2026-07-10", status: "Pending" },
  { tax: "WHT — Vendors June", base: 540000, rate: "5%", amount: 27000, due: "2026-07-21", status: "Draft" },
  { tax: "CIT — Q2 estimate", base: 0, rate: "20%", amount: 640000, due: "2026-08-15", status: "Draft" },
];

function TaxPage() {
  return (
    <AccountingScaffold
      title="Tax & Compliance"
      description="VAT, PAYE, WHT and CIT obligations with filing reminders."
      actions={
        <>
          <Button variant="outline" className="gap-2"><FileText className="h-4 w-4" />Generate return</Button>
          <Button className="gap-2"><Send className="h-4 w-4" />File & remit</Button>
        </>
      }
      kpis={[
        { label: "Due this month", value: "₦426,500", tone: "destructive" },
        { label: "VAT collected (MTD)", value: "₦183,750", tone: "info" },
        { label: "PAYE accrued", value: "₦254,000", tone: "warning" },
        { label: "Filings on time", value: "100%", tone: "success" },
      ]}
      columns={[
        { key: "tax", header: "Obligation" },
        { key: "base", header: "Base", align: "right" },
        { key: "rate", header: "Rate" },
        { key: "amount", header: "Payable", align: "right" },
        { key: "due", header: "Due date" },
        { key: "status", header: "Status" },
      ]}
      rows={obligations.map((o) => ({
        tax: <span className="font-medium">{o.tax}</span>,
        base: o.base ? `₦${o.base.toLocaleString()}` : "—",
        rate: o.rate,
        amount: <span className="font-semibold">₦{o.amount.toLocaleString()}</span>,
        due: <span className="text-xs">{o.due}</span>,
        status: <StatusBadge status={o.status} />,
      }))}
      linked={[
        { label: "Payroll", to: "/clinic/accounting/payroll" },
        { label: "Billing (VAT source)", to: "/clinic/billing" },
        { label: "Payables (WHT source)", to: "/clinic/accounting/payables" },
      ]}
    />
  );
}
