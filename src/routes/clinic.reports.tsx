import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Download, Calendar, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";

export const Route = createFileRoute("/clinic/reports")({
  head: () => ({ meta: [{ title: "Reports — Dentallogue" }] }),
  component: ReportsPage,
});

const reports = [
  { cat: "Financial", items: ["Revenue summary", "Outstanding AR aging", "Payment collection", "Insurance claims summary", "Tax report"] },
  { cat: "Clinical", items: ["Treatment summary", "Procedures performed", "Diagnoses report", "Lab cases status", "Prescriptions log"] },
  { cat: "Operational", items: ["Appointment statistics", "No-show / cancellation", "Patient acquisition", "Staff productivity", "Chair utilization"] },
  { cat: "Compliance", items: ["HIPAA access log", "Audit trail", "Consent compliance", "Sterilization log"] },
];

const sample = [
  { m: "Jan", rev: 38000 }, { m: "Feb", rev: 42000 }, { m: "Mar", rev: 45000 },
  { m: "Apr", rev: 48000 }, { m: "May", rev: 52000 }, { m: "Jun", rev: 58000 },
];

function ReportsPage() {
  const [active, setActive] = useState("Revenue summary");
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Reports</h1><p className="mt-1 text-sm text-muted-foreground">Pre-built and custom reports for every aspect of the clinic.</p></div>
        <div className="flex gap-2"><Select defaultValue="month"><SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="week">This week</SelectItem><SelectItem value="month">This month</SelectItem><SelectItem value="quarter">This quarter</SelectItem><SelectItem value="year">YTD</SelectItem></SelectContent></Select><Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button></div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <div className="surface-card p-3 space-y-3">
          {reports.map(g => (<div key={g.cat}><div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{g.cat}</div>
            {g.items.map(i => (<button key={i} onClick={() => setActive(i)} className={`flex w-full items-center gap-2 rounded-lg p-2 text-sm transition ${active === i ? "bg-primary-soft font-medium" : "hover:bg-muted/40"}`}><FileText className="h-3.5 w-3.5" />{i}</button>))}
          </div>))}
        </div>

        <div className="space-y-4">
          <div className="surface-card p-5">
            <div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold">{active}</h2><div className="text-xs text-muted-foreground">June 1 - June 30, 2026</div></div><Button size="sm" variant="outline" className="gap-2"><Download className="h-4 w-4" />PDF</Button></div>
            <div className="mt-4 grid gap-3 sm:grid-cols-4"><div><div className="text-xs text-muted-foreground">Total revenue</div><div className="text-xl font-semibold">₦58,420</div></div><div><div className="text-xs text-muted-foreground">vs last mo</div><div className="text-xl font-semibold text-success">+12%</div></div><div><div className="text-xs text-muted-foreground">Avg / patient</div><div className="text-xl font-semibold">₦324</div></div><div><div className="text-xs text-muted-foreground">Procedures</div><div className="text-xl font-semibold">412</div></div></div>
            <div className="mt-4 h-[280px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={sample}><CartesianGrid strokeDasharray="3 3" className="stroke-border" /><XAxis dataKey="m" className="text-xs" /><YAxis className="text-xs" /><Tooltip /><Bar dataKey="rev" fill="var(--color-primary)" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></div>
          </div>

          <div className="surface-card p-5"><div className="font-medium">Scheduled reports</div><div className="mt-3 space-y-2 text-sm">
            {["Weekly revenue → owner@clinic.com (Mon 8 AM)", "Monthly AR aging → accounting@clinic.com (1st of month)", "Daily appointments → reception (7 AM)"].map(s => (<div key={s} className="flex items-center justify-between rounded-lg border border-border p-3"><span>{s}</span><Button size="sm" variant="ghost">Edit</Button></div>))}
          </div></div>
        </div>
      </div>
    </div>
  );
}
