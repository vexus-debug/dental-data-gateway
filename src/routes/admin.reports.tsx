import { createFileRoute } from "@tanstack/react-router";
import { Download, BarChart3, TrendingUp, Users, Building2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "Reports — Super Admin" }, { name: "description", content: "Financial, growth and engagement reports." }] }),
  component: ReportsPage,
});

const monthlyRevenue = [
  { m: "Jan", mrr: 32000, expansion: 2100 }, { m: "Feb", mrr: 35400, expansion: 2800 },
  { m: "Mar", mrr: 38200, expansion: 3100 }, { m: "Apr", mrr: 40100, expansion: 2400 },
  { m: "May", mrr: 43800, expansion: 3600 }, { m: "Jun", mrr: 48920, expansion: 4200 },
];
const cohorts = [
  { c: "Jan", retained: 92 }, { c: "Feb", retained: 89 }, { c: "Mar", retained: 91 },
  { c: "Apr", retained: 88 }, { c: "May", retained: 94 }, { c: "Jun", retained: 96 },
];
const planSplit = [
  { name: "Starter", v: 92 }, { name: "Professional", v: 108 },
  { name: "Enterprise", v: 34 }, { name: "Custom", v: 14 },
];
const PIE = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)"];

const savedReports = [
  { name: "MRR Waterfall — Q2", type: "Financial", owner: "Avery K.", updated: "Today" },
  { name: "Clinic activation funnel", type: "Growth", owner: "Sam P.", updated: "Yesterday" },
  { name: "Module adoption", type: "Engagement", owner: "Jordan M.", updated: "3 days ago" },
  { name: "Churn cohort 2026", type: "Retention", owner: "Avery K.", updated: "1 week ago" },
];

function ReportsPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">Cross-cutting insights into the business.</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="6m">
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "MRR", v: "₦48,920", d: "+8.4%", i: DollarSign, t: "bg-primary-soft text-accent-foreground" },
          { l: "Net new clinics", v: "+17", d: "vs +12 last mo", i: Building2, t: "bg-info/10 text-info" },
          { l: "Active users", v: "3,182", d: "+6.1%", i: Users, t: "bg-success/15 text-success" },
          { l: "Growth rate", v: "11.2%", d: "MoM", i: TrendingUp, t: "bg-chart-4/15 text-foreground" },
        ].map(s => (
          <div key={s.l} className="surface-card flex items-center gap-3 p-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.t}`}><s.i className="h-5 w-5" /></div>
            <div><div className="text-xs text-muted-foreground">{s.l}</div><div className="text-lg font-semibold">{s.v}</div><div className="text-[11px] text-muted-foreground">{s.d}</div></div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="financial">
        <TabsList>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
          <TabsTrigger value="saved">Saved reports</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="surface-card lg:col-span-2">
            <div className="border-b border-border px-5 py-4"><h2 className="text-base font-semibold">MRR composition</h2></div>
            <div className="h-72 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="mrr" stackId="a" fill="var(--color-chart-1)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="expansion" stackId="a" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="surface-card">
            <div className="border-b border-border px-5 py-4"><h2 className="text-base font-semibold">Plan distribution</h2></div>
            <div className="h-72 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={planSplit} dataKey="v" nameKey="name" outerRadius={90} innerRadius={50} paddingAngle={2}>
                    {planSplit.map((_, i) => <Cell key={i} fill={PIE[i % PIE.length]} />)}
                  </Pie>
                  <Tooltip /><Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="growth" className="mt-4">
          <div className="surface-card">
            <div className="border-b border-border px-5 py-4"><h2 className="text-base font-semibold">Revenue trend</h2></div>
            <div className="h-80 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue}>
                  <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                  <Tooltip />
                  <Area type="monotone" dataKey="mrr" stroke="var(--color-chart-1)" fill="url(#rg)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="retention" className="mt-4">
          <div className="surface-card">
            <div className="border-b border-border px-5 py-4"><h2 className="text-base font-semibold">Cohort retention (%)</h2></div>
            <div className="h-80 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cohorts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="c" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" domain={[80, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="retained" stroke="var(--color-chart-2)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-4">
          <div className="surface-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <tr><th className="px-4 py-2.5">Report</th><th className="px-4 py-2.5">Type</th><th className="px-4 py-2.5">Owner</th><th className="px-4 py-2.5">Updated</th><th></th></tr>
                </thead>
                <tbody>
                  {savedReports.map(r => (
                    <tr key={r.name} className="border-t border-border/60 hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium flex items-center gap-2"><BarChart3 className="h-4 w-4 text-muted-foreground" />{r.name}</td>
                      <td className="px-4 py-3 text-xs">{r.type}</td>
                      <td className="px-4 py-3 text-xs">{r.owner}</td>
                      <td className="px-4 py-3 text-xs">{r.updated}</td>
                      <td className="px-4 py-3 text-right"><Button variant="ghost" size="sm" className="h-7">Open</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
