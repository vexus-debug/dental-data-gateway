import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { AccountingScaffold } from "@/components/accounting-scaffold";

export const Route = createFileRoute("/clinic/accounting/reports")({
  head: () => ({ meta: [{ title: "Financial Reports — Dentallogue" }] }),
  component: ReportsPage,
});

const pl = [
  { k: "Service revenue — Treatments", v: 4320000 },
  { k: "Service revenue — Imaging", v: 380000 },
  { k: "Service revenue — Lab", v: 120000 },
  { k: "Total revenue", v: 4820000, bold: true },
  { k: "Cost of supplies", v: -420000 },
  { k: "Lab outsourcing", v: -320000 },
  { k: "Gross profit", v: 4080000, bold: true },
  { k: "Salaries & wages", v: -2400000 },
  { k: "Rent", v: -350000 },
  { k: "Utilities", v: -142000 },
  { k: "Marketing", v: -95000 },
  { k: "Software & SaaS", v: -80000 },
  { k: "Depreciation", v: -240000 },
  { k: "Operating expenses", v: -3307000, bold: true },
  { k: "Net profit", v: 773000, bold: true },
];

const bs = {
  assets: [
    { k: "Cash & bank", v: 8205000 },
    { k: "Accounts receivable", v: 1420000 },
    { k: "Inventory", v: 620000 },
    { k: "Fixed assets (NBV)", v: 11000000 },
  ],
  liab: [
    { k: "Accounts payable", v: 680000 },
    { k: "VAT payable", v: 184000 },
    { k: "PAYE payable", v: 312000 },
  ],
  eq: [
    { k: "Owner's equity", v: 12500000 },
    { k: "Retained earnings", v: 7569000 },
  ],
};

const cf = [
  { k: "Cash from operations", v: 1820000 },
  { k: "Cash from investing", v: -500000 },
  { k: "Cash from financing", v: 0 },
  { k: "Net change in cash", v: 1320000, bold: true },
];

const tb = [
  { code: "1010", name: "Bank — Wema", debit: 6420000, credit: 0 },
  { code: "1200", name: "AR — Patients", debit: 980000, credit: 0 },
  { code: "2000", name: "AP — Vendors", debit: 0, credit: 680000 },
  { code: "3000", name: "Equity", debit: 0, credit: 12500000 },
  { code: "4000", name: "Revenue — Treatments", debit: 0, credit: 4320000 },
  { code: "5000", name: "Salaries", debit: 2400000, credit: 0 },
];

function Money({ v, bold }: { v: number; bold?: boolean }) {
  const sign = v < 0;
  return <span className={`${bold ? "font-semibold" : ""} ${sign ? "text-destructive" : ""}`}>{sign ? "-" : ""}₦{Math.abs(v).toLocaleString()}</span>;
}

function ReportsPage() {
  const [tab, setTab] = useState("pl");

  const content =
    tab === "pl" ? (
      <table className="w-full text-sm">
        <tbody>
          {pl.map((r) => (
            <tr key={r.k} className={`border-t border-border/60 ${r.bold ? "bg-muted/40" : ""}`}>
              <td className={`px-4 py-2 ${r.bold ? "font-semibold" : ""}`}>{r.k}</td>
              <td className="px-4 py-2 text-right"><Money v={r.v} bold={r.bold} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : tab === "bs" ? (
      <div className="grid gap-0 lg:grid-cols-2">
        <Section title="Assets" rows={bs.assets} />
        <div>
          <Section title="Liabilities" rows={bs.liab} />
          <Section title="Equity" rows={bs.eq} />
        </div>
      </div>
    ) : tab === "cf" ? (
      <table className="w-full text-sm">
        <tbody>
          {cf.map((r) => (
            <tr key={r.k} className={`border-t border-border/60 ${r.bold ? "bg-muted/40" : ""}`}>
              <td className={`px-4 py-2 ${r.bold ? "font-semibold" : ""}`}>{r.k}</td>
              <td className="px-4 py-2 text-right"><Money v={r.v} bold={r.bold} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
          <tr><th className="px-4 py-2">Code</th><th className="px-4 py-2">Account</th><th className="px-4 py-2 text-right">Debit</th><th className="px-4 py-2 text-right">Credit</th></tr>
        </thead>
        <tbody>
          {tb.map((r) => (
            <tr key={r.code} className="border-t border-border/60">
              <td className="px-4 py-2 font-mono text-xs">{r.code}</td>
              <td className="px-4 py-2">{r.name}</td>
              <td className="px-4 py-2 text-right">{r.debit ? `₦${r.debit.toLocaleString()}` : "—"}</td>
              <td className="px-4 py-2 text-right">{r.credit ? `₦${r.credit.toLocaleString()}` : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <AccountingScaffold
      title="Financial Reports"
      description="P&L, Balance Sheet, Cash Flow and Trial Balance — generated from the live ledger."
      actions={<Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export PDF</Button>}
      kpis={[
        { label: "Revenue MTD", value: "₦4,820,000", tone: "success" },
        { label: "Net profit", value: "₦773,000", tone: "success" },
        { label: "Total assets", value: "₦21,245,000", tone: "info" },
        { label: "Equity", value: "₦20,069,000" },
      ]}
      linked={[
        { label: "Chart of accounts", to: "/clinic/accounting/chart-of-accounts" },
        { label: "General ledger", to: "/clinic/accounting/ledger" },
        { label: "Clinical reports", to: "/clinic/reports" },
      ]}
    >
      <div className="surface-card overflow-hidden">
        <div className="border-b border-border p-3">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="pl">Profit &amp; Loss</TabsTrigger>
              <TabsTrigger value="bs">Balance Sheet</TabsTrigger>
              <TabsTrigger value="cf">Cash Flow</TabsTrigger>
              <TabsTrigger value="tb">Trial Balance</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {content}
      </div>
    </AccountingScaffold>
  );
}

function Section({ title, rows }: { title: string; rows: { k: string; v: number }[] }) {
  const total = rows.reduce((s, r) => s + r.v, 0);
  return (
    <div className="border-t border-border/60">
      <div className="bg-muted/40 px-4 py-2 text-xs font-semibold uppercase text-muted-foreground">{title}</div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.k} className="border-t border-border/60">
              <td className="px-4 py-2">{r.k}</td>
              <td className="px-4 py-2 text-right"><Money v={r.v} /></td>
            </tr>
          ))}
          <tr className="border-t border-border/60 bg-muted/30">
            <td className="px-4 py-2 font-semibold">Total {title}</td>
            <td className="px-4 py-2 text-right font-semibold">₦{total.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
