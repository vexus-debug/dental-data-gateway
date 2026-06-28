import { createFileRoute } from "@tanstack/react-router";
import { Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountingScaffold, StatusBadge } from "@/components/accounting-scaffold";

export const Route = createFileRoute("/clinic/accounting/payroll")({
  head: () => ({ meta: [{ title: "Payroll — Dentallogue" }] }),
  component: PayrollPage,
});

const staff = [
  { name: "Dr. Tunde Bello", role: "Lead dentist", gross: 850000, paye: 102000, pension: 68000, net: 680000, status: "Pending" },
  { name: "Dr. Amaka Eze", role: "Dentist", gross: 620000, paye: 74400, pension: 49600, net: 496000, status: "Pending" },
  { name: "Nurse Joy", role: "Dental nurse", gross: 280000, paye: 28000, pension: 22400, net: 229600, status: "Pending" },
  { name: "Ada (Reception)", role: "Receptionist", gross: 220000, paye: 17600, pension: 17600, net: 184800, status: "Pending" },
  { name: "Mark (Lab tech)", role: "Lab technician", gross: 320000, paye: 32000, pension: 25600, net: 262400, status: "Pending" },
];

function PayrollPage() {
  return (
    <AccountingScaffold
      title="Payroll"
      description="Salaries, PAYE, pension and net pay. Linked to staff records and bank payouts."
      actions={
        <>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Payslips</Button>
          <Button className="gap-2"><Play className="h-4 w-4" />Run payroll</Button>
        </>
      }
      kpis={[
        { label: "Period", value: "July 2026" },
        { label: "Gross payroll", value: "₦2,290,000" },
        { label: "Statutory (PAYE+Pension)", value: "₦437,200", tone: "warning" },
        { label: "Net to pay", value: "₦1,852,800", tone: "success" },
      ]}
      columns={[
        { key: "name", header: "Employee" },
        { key: "role", header: "Role" },
        { key: "gross", header: "Gross", align: "right" },
        { key: "paye", header: "PAYE", align: "right" },
        { key: "pension", header: "Pension", align: "right" },
        { key: "net", header: "Net pay", align: "right" },
        { key: "status", header: "Status" },
      ]}
      rows={staff.map((s) => ({
        name: <span className="font-medium">{s.name}</span>,
        role: <span className="text-xs text-muted-foreground">{s.role}</span>,
        gross: `₦${s.gross.toLocaleString()}`,
        paye: `₦${s.paye.toLocaleString()}`,
        pension: `₦${s.pension.toLocaleString()}`,
        net: <span className="font-semibold">₦{s.net.toLocaleString()}</span>,
        status: <StatusBadge status={s.status} />,
      }))}
      linked={[
        { label: "Staff records", to: "/clinic/staff" },
        { label: "Tax obligations", to: "/clinic/accounting/tax" },
        { label: "Bank payouts", to: "/clinic/accounting/bank" },
      ]}
    />
  );
}
