import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Clock,
  Ban,
  DollarSign,
  TrendingUp,
  CalendarDays,
  LifeBuoy,
  Activity,
  HardDrive,
  Plus,
  Ticket,
  Wallet,
  Megaphone,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Super Admin Dashboard — Dentallogue" },
      { name: "description", content: "Platform KPIs, revenue, growth, and operations overview." },
    ],
  }),
  component: AdminDashboard,
});

const kpis = [
  { key: "total", label: "Total Clinics", value: "248", delta: "+12 this month", icon: Building2, tone: "primary" as const },
  { key: "active", label: "Active Clinics", value: "211", delta: "85% active", icon: CheckCircle2, tone: "success" as const },
  { key: "trial", label: "Trial Clinics", value: "23", delta: "+5 this week", icon: Clock, tone: "info" as const },
  { key: "suspended", label: "Suspended", value: "14", delta: "2 overdue", icon: Ban, tone: "destructive" as const },
  { key: "mrr", label: "MRR", value: "₦48,920", delta: "+8.4% MoM", icon: DollarSign, tone: "primary" as const },
  { key: "arr", label: "ARR", value: "₦587,040", delta: "Projected", icon: TrendingUp, tone: "success" as const },
  { key: "today", label: "Today's Revenue", value: "₦2,140", delta: "12 invoices", icon: CalendarDays, tone: "info" as const },
  { key: "tickets", label: "Pending Tickets", value: "9", delta: "2 urgent", icon: LifeBuoy, tone: "warning" as const },
  { key: "health", label: "System Health", value: "99.98%", delta: "All green", icon: Activity, tone: "success" as const },
  { key: "storage", label: "Storage Used", value: "1.8 TB", delta: "of 5 TB", icon: HardDrive, tone: "primary" as const },
];

const revenue = [
  { m: "Jan", v: 32000 }, { m: "Feb", v: 35400 }, { m: "Mar", v: 38200 },
  { m: "Apr", v: 40100 }, { m: "May", v: 43800 }, { m: "Jun", v: 48920 },
];
const newClinics = [
  { m: "Jan", v: 8 }, { m: "Feb", v: 11 }, { m: "Mar", v: 9 },
  { m: "Apr", v: 14 }, { m: "May", v: 12 }, { m: "Jun", v: 17 },
];
const planDistribution = [
  { name: "Starter", value: 92 },
  { name: "Professional", value: 108 },
  { name: "Enterprise", value: 34 },
  { name: "Custom", value: 14 },
];
const PIE = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)"];

const activity = [
  { text: "New clinic registered — Smile Dental Co.", time: "2 min ago", tone: "primary" as const },
  { text: "Subscription upgraded — Bright Smiles to Enterprise", time: "18 min ago", tone: "success" as const },
  { text: "Payment received — ₦249 from Northgate Dental", time: "42 min ago", tone: "success" as const },
  { text: "Support ticket created — Login issue (urgent)", time: "1 hr ago", tone: "warning" as const },
  { text: "New trial started — Lakeside Family Dental", time: "2 hrs ago", tone: "info" as const },
  { text: "Clinic suspended — Overdue payment (3 cycles)", time: "4 hrs ago", tone: "destructive" as const },
];

const quickActions = [
  { label: "Create Clinic", icon: Plus },
  { label: "Create Coupon", icon: Ticket },
  { label: "Broadcast", icon: Megaphone },
  { label: "View Tickets", icon: LifeBuoy },
  { label: "View Payments", icon: Wallet },
];

function toneClass(tone: "info" | "success" | "warning" | "primary" | "destructive") {
  switch (tone) {
    case "info": return "bg-info/10 text-info";
    case "success": return "bg-success/15 text-success";
    case "warning": return "bg-warning/15 text-warning-foreground";
    case "destructive": return "bg-destructive/10 text-destructive";
    case "primary":
    default: return "bg-primary-soft text-accent-foreground";
  }
}

function AdminDashboard() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-[1400px] space-y-5">
      <section className="surface-card flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Platform Overview
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Run the business — clinics, revenue, growth, support.
          </p>
        </div>
        <Badge variant="outline" className="w-fit rounded-full border-success/30 bg-success/10 text-success">
          All systems operational
        </Badge>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {kpis.map((k, i) => (
          <motion.div
            key={k.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="surface-card flex flex-col gap-3 p-4"
          >
            <div className="flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClass(k.tone)}`}>
                <k.icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{k.label}</p>
              <p className="mt-1 truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{k.value}</p>
              <p className="mt-1 truncate text-[11px] text-muted-foreground">{k.delta}</p>
            </div>
          </motion.div>
        ))}
      </section>


      <section className="grid gap-4 lg:grid-cols-3">
        <div className="surface-card lg:col-span-2">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-base font-semibold text-foreground">Monthly Revenue</h2>
            <p className="text-xs text-muted-foreground">Last 6 months</p>
          </div>
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Area type="monotone" dataKey="v" stroke="var(--color-chart-1)" fill="url(#rev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-base font-semibold text-foreground">Plan Distribution</h2>
            <p className="text-xs text-muted-foreground">Active subscriptions</p>
          </div>
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={planDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {planDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE[i % PIE.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="surface-card lg:col-span-2">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-base font-semibold text-foreground">New Clinics</h2>
            <p className="text-xs text-muted-foreground">Signups per month</p>
          </div>
          <div className="h-56 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newClinics}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Bar dataKey="v" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-base font-semibold text-foreground">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-2 p-4">
            {quickActions.map((a) => (
              <Button key={a.label} variant="outline" className="h-auto justify-start gap-2 rounded-xl py-3 text-left">
                <a.icon className="h-4 w-4" />
                <span className="truncate text-xs">{a.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-foreground">Recent Activity</h2>
          <Button size="sm" variant="ghost" className="h-8 text-primary hover:text-primary">View all</Button>
        </div>
        <ul className="divide-y divide-border">
          {activity.map((a, i) => (
            <li key={i} className="flex items-center gap-3 px-5 py-3">
              <span className={`h-2 w-2 shrink-0 rounded-full ${toneClass(a.tone)}`} />
              <p className="min-w-0 flex-1 truncate text-sm text-foreground">{a.text}</p>
              <span className="shrink-0 text-[11px] text-muted-foreground">{a.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}