import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
import {
  CalendarClock,
  Users,
  DollarSign,
  AlertCircle,
  Stethoscope,
  Hourglass,
  ShieldCheck,
  PackageMinus,
  Plus,
  ArrowUpRight,
  ArrowRight,
  CalendarPlus,
  FileText,
  Receipt,
  UserPlus,
  ScanLine,
  FileSignature,
  Package,
  BarChart3,
  CalendarDays,
  Bell,
  Cake,
  FlaskConical,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DrillDownPanel } from "@/components/drill-down-panel";
import type { DrillFilter } from "@/lib/dashboard-drilldown";

export const Route = createFileRoute("/clinic/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Dentallogue" },
      {
        name: "description",
        content:
          "Today's schedule, waiting room, revenue, and operational stats for your dental clinic.",
      },
    ],
  }),
  component: Dashboard,
});


// ──────────────────────────────────────────────────────────────
// Mock data
// ──────────────────────────────────────────────────────────────

const stats = [
  {
    key: "today-appointments",
    label: "Today's Appointments",
    value: "12",
    delta: "+2 vs yesterday",
    icon: CalendarClock,
    tone: "info" as const,
  },
  {
    key: "checked-in",
    label: "Patients Checked In",
    value: "5",
    delta: "3 in chair",
    icon: Users,
    tone: "success" as const,
  },
  {
    key: "revenue",
    label: "Today's Revenue",
    value: "₦3,450",
    delta: "+18% vs avg",
    icon: DollarSign,
    tone: "primary" as const,
  },
  {
    key: "outstanding",
    label: "Outstanding Payments",
    value: "₦8,920",
    delta: "12 invoices",
    icon: AlertCircle,
    tone: "warning" as const,
  },
  {
    key: "pending-treatments",
    label: "Pending Treatments",
    value: "18",
    delta: "4 approvals due",
    icon: Stethoscope,
    tone: "info" as const,
  },
  {
    key: "low-stock",
    label: "Low Stock Items",
    value: "7",
    delta: "2 critical",
    icon: PackageMinus,
    tone: "destructive" as const,
  },
  {
    key: "claims",
    label: "Insurance Claims",
    value: "4",
    delta: "2 awaiting",
    icon: ShieldCheck,
    tone: "primary" as const,
  },
];


const appointments = [
  {
    time: "09:00",
    patient: "Michael Johnson",
    treatment: "Dental Cleaning",
    dentist: "Dr. John Doe",
    status: "Checked In",
    action: "Start",
  },
  {
    time: "09:45",
    patient: "Sarah Williams",
    treatment: "Tooth Filling",
    dentist: "Dr. John Doe",
    status: "Scheduled",
    action: "Check In",
  },
  {
    time: "10:30",
    patient: "David Brown",
    treatment: "Root Canal",
    dentist: "Dr. Smith",
    status: "Scheduled",
    action: "Check In",
  },
  {
    time: "11:15",
    patient: "Emma Wilson",
    treatment: "Crown Placement",
    dentist: "Dr. John Doe",
    status: "In Treatment",
    action: "Complete",
  },
  {
    time: "13:00",
    patient: "James Taylor",
    treatment: "Dental Cleaning",
    dentist: "Dr. Smith",
    status: "Scheduled",
    action: "Check In",
  },
];

const waiting = [
  { name: "Lisa Anderson", initials: "LA", arrived: "08:50", wait: "25 min", dentist: "Dr. John Doe", status: "Waiting" },
  { name: "Robert Miller", initials: "RM", arrived: "09:05", wait: "10 min", dentist: "Dr. John Doe", status: "Waiting" },
  { name: "Jennifer Davis", initials: "JD", arrived: "09:15", wait: "—", dentist: "Dr. Smith", status: "In Chair" },
  { name: "William Martinez", initials: "WM", arrived: "09:20", wait: "—", dentist: "Dr. Smith", status: "In Chair" },
  { name: "Amanda Garcia", initials: "AG", arrived: "09:30", wait: "—", dentist: "Dr. John Doe", status: "Not Arrived" },
];

const revenueSeries = [
  { d: "Jun 1", v: 1800 },
  { d: "Jun 4", v: 2400 },
  { d: "Jun 7", v: 2100 },
  { d: "Jun 10", v: 2900 },
  { d: "Jun 13", v: 2600 },
  { d: "Jun 16", v: 3200 },
  { d: "Jun 19", v: 3000 },
  { d: "Jun 22", v: 3600 },
  { d: "Jun 25", v: 3400 },
  { d: "Jun 28", v: 3850 },
];

const appointmentsBreakdown = [
  { label: "Mon", completed: 14, cancelled: 2, noshow: 1, resched: 1 },
  { label: "Tue", completed: 16, cancelled: 1, noshow: 2, resched: 0 },
  { label: "Wed", completed: 12, cancelled: 3, noshow: 1, resched: 2 },
  { label: "Thu", completed: 18, cancelled: 1, noshow: 0, resched: 1 },
  { label: "Fri", completed: 20, cancelled: 2, noshow: 1, resched: 1 },
  { label: "Sat", completed: 9, cancelled: 0, noshow: 0, resched: 0 },
];

const topTreatments = [
  { name: "Dental Cleaning", value: 35 },
  { name: "Tooth Filling", value: 25 },
  { name: "Root Canal", value: 15 },
  { name: "Crown Placement", value: 10 },
  { name: "Others", value: 15 },
];

const PIE_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

const notifications = [
  { icon: FlaskConical, text: "Lab case for Michael Johnson is ready for pickup.", time: "10 min ago", tone: "info" },
  { icon: ShieldCheck, text: "Insurance claim for Sarah Williams is pending.", time: "30 min ago", tone: "warning" },
  { icon: PackageMinus, text: "Low stock: Composite Resin (3 remaining).", time: "1 hr ago", tone: "destructive" },
  { icon: Cake, text: "Patient birthday today: Emma Wilson.", time: "2 hrs ago", tone: "primary" },
  { icon: CheckCircle2, text: "Consent form signed by David Brown.", time: "3 hrs ago", tone: "success" },
];

const quickActions = [
  { label: "New Patient", icon: UserPlus },
  { label: "Book Appointment", icon: CalendarPlus },
  { label: "Create Invoice", icon: Receipt },
  { label: "New Treatment Plan", icon: FileText },
  { label: "Upload X-ray", icon: ScanLine },
  { label: "Consent Form", icon: FileSignature },
  { label: "Order Inventory", icon: Package },
  { label: "Generate Report", icon: BarChart3 },
];

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────

function statusBadge(status: string) {
  const map: Record<string, string> = {
    "Checked In": "bg-success/15 text-success border-success/20",
    Scheduled: "bg-info/15 text-info border-info/20",
    "In Treatment": "bg-primary-soft text-accent-foreground border-primary/20",
    "In Chair": "bg-primary-soft text-accent-foreground border-primary/20",
    Waiting: "bg-warning/15 text-warning-foreground border-warning/30",
    "Not Arrived": "bg-muted text-muted-foreground border-border",
    Completed: "bg-success/15 text-success border-success/20",
    Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  };
  return map[status] ?? "bg-muted text-muted-foreground border-border";
}

function toneClasses(tone: "info" | "success" | "warning" | "primary" | "destructive") {
  switch (tone) {
    case "info":
      return "bg-info/10 text-info";
    case "success":
      return "bg-success/15 text-success";
    case "warning":
      return "bg-warning/15 text-warning-foreground";
    case "destructive":
      return "bg-destructive/10 text-destructive";
    case "primary":
    default:
      return "bg-primary-soft text-accent-foreground";
  }
}

// ──────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────

function Dashboard() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [drill, setDrill] = useState<DrillFilter | null>(null);

  return (
    <div className="mx-auto w-full min-w-0 max-w-[1400px] space-y-4 sm:space-y-5">
      {/* Greeting */}
      <section className="surface-card flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-[26px]">
            Good morning, Dr. John
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{today}</p>
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
          <Button variant="outline" className="h-10 shrink-0 gap-2 rounded-full border-border">
            <Plus className="h-4 w-4" /> New Patient
          </Button>
          <Button variant="outline" className="h-10 shrink-0 gap-2 rounded-full border-border">
            <CalendarPlus className="h-4 w-4" /> Appointment
          </Button>
          <Button variant="outline" className="h-10 shrink-0 gap-2 rounded-full border-border">
            <Receipt className="h-4 w-4" /> Invoice
          </Button>
          <Button className="h-10 shrink-0 gap-2 rounded-full shadow-sm">
            <FileText className="h-4 w-4" /> Treatment Plan
          </Button>
        </div>
      </section>

      {/* Drill-down panel */}
      {drill && <DrillDownPanel filter={drill} onClear={() => setDrill(null)} />}

      {/* Quick Stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {stats.map((s, i) => {
          const active = drill?.kind === "stat" && drill.key === s.key;
          return (
            <motion.button
              type="button"
              key={s.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                setDrill(
                  active ? null : { kind: "stat", key: s.key, label: s.label },
                )
              }
              className={`surface-card group flex flex-col gap-3 p-4 text-left transition hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                active ? "border-primary/50 ring-2 ring-primary/20" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClasses(s.tone)}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
                <p className="mt-1 truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {s.value}
                </p>
                <p className="mt-1 truncate text-[11px] text-muted-foreground">{s.delta}</p>
              </div>
            </motion.button>
          );
        })}
      </section>



      {/* Schedule + Waiting Room */}
      <section className="grid gap-4 xl:grid-cols-3">
        <div className="surface-card xl:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">Today's Schedule</h2>
              <p className="text-xs text-muted-foreground">5 appointments · 3 dentists</p>
            </div>
            <Button variant="outline" size="sm" className="h-8 rounded-full">
              <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
              View Calendar
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-2.5">Time</th>
                  <th className="px-3 py-2.5">Patient</th>
                  <th className="px-3 py-2.5">Treatment</th>
                  <th className="px-3 py-2.5">Dentist</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-5 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {appointments.map((a) => (
                  <tr
                    key={a.time + a.patient}
                    onClick={() =>
                      setDrill({
                        kind: "appointment",
                        label: `${a.patient} · ${a.treatment}`,
                        patient: a.patient,
                      })
                    }
                    className="cursor-pointer hover:bg-muted/30"
                  >
                    <td className="whitespace-nowrap px-5 py-3 font-medium text-foreground">
                      {a.time}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-foreground">{a.patient}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-muted-foreground">
                      {a.treatment}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-muted-foreground">
                      {a.dentist}
                    </td>
                    <td className="px-3 py-3">
                      <Badge
                        variant="outline"
                        className={`rounded-full font-medium ${statusBadge(a.status)}`}
                      >
                        {a.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 rounded-full px-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {a.action}
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-border px-5 py-3">
            <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary">
              View all appointments
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Waiting Room */}
        <div className="surface-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">Waiting Room</h2>
              <p className="text-xs text-muted-foreground">5 patients on premises</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary">
              View All
            </Button>
          </div>
          <ul className="divide-y divide-border">
            {waiting.map((w) => (
              <li key={w.name} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary-soft text-[11px] font-semibold text-accent-foreground">
                    {w.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{w.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {w.dentist} · arrived {w.arrived}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge
                    variant="outline"
                    className={`rounded-full text-[10px] ${statusBadge(w.status)}`}
                  >
                    {w.status}
                  </Badge>
                  {w.wait !== "—" && (
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Hourglass className="h-3 w-3" />
                      {w.wait}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Charts */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="surface-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">Revenue Overview</h2>
              <p className="text-xs text-muted-foreground">
                Total this month <span className="font-medium text-foreground">₦38,650</span>{" "}
                <span className="ml-1 text-success">+12%</span>
              </p>
            </div>
            <Select defaultValue="month">
              <SelectTrigger className="h-8 w-32 rounded-full text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[260px] p-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="d"
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="var(--color-primary)"
                  strokeWidth={2.25}
                  fill="url(#revFill)"
                  style={{ cursor: "pointer" }}
                  activeDot={{
                    r: 5,
                    onClick: (_, payload: any) =>
                      setDrill({
                        kind: "revenue",
                        label: `Revenue · ${payload?.payload?.d ?? "selected day"}`,
                      }),
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Treatments */}
        <div className="surface-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-base font-semibold text-foreground">Top Treatments</h2>
            <Select defaultValue="month">
              <SelectTrigger className="h-8 w-28 rounded-full text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-center gap-4 p-4 sm:flex-row sm:gap-3">
            <div className="h-[180px] w-[180px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topTreatments}
                    dataKey="value"
                    innerRadius={48}
                    outerRadius={80}
                    paddingAngle={2}
                    stroke="var(--color-card)"
                    strokeWidth={2}
                    onClick={(data: any) =>
                      setDrill({ kind: "treatment", label: data?.name ?? "Treatment" })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {topTreatments.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    formatter={(v: number, _n, p: any) => [`${v}%`, p?.payload?.name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="w-full flex-1 space-y-1">
              {topTreatments.map((t, i) => {
                const active = drill?.kind === "treatment" && drill.label === t.name;
                return (
                  <li key={t.name}>
                    <button
                      type="button"
                      onClick={() =>
                        setDrill(active ? null : { kind: "treatment", label: t.name })
                      }
                      className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs transition hover:bg-muted/50 ${
                        active ? "bg-primary-soft/60" : ""
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2 text-foreground">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                        />
                        <span className="truncate">{t.name}</span>
                      </span>
                      <span className="shrink-0 font-medium text-muted-foreground">
                        {t.value}%
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Appointments breakdown + Notifications */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="surface-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">Appointments</h2>
              <p className="text-xs text-muted-foreground">
                Completed · Cancelled · No-show · Rescheduled
              </p>
            </div>
            <Select defaultValue="week">
              <SelectTrigger className="h-8 w-28 rounded-full text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[260px] p-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={appointmentsBreakdown}
                margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
                onClick={(s: any) => {
                  const label = s?.activeLabel;
                  if (label)
                    setDrill({ kind: "weekday", label: `Appointments · ${label}` });
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="label" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)", opacity: 0.4 }}
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="completed" stackId="a" fill="var(--color-chart-1)" radius={[0, 0, 0, 0]} style={{ cursor: "pointer" }} />
                <Bar dataKey="cancelled" stackId="a" fill="var(--color-chart-5)" style={{ cursor: "pointer" }} />
                <Bar dataKey="noshow" stackId="a" fill="var(--color-chart-4)" style={{ cursor: "pointer" }} />
                <Bar dataKey="resched" stackId="a" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} style={{ cursor: "pointer" }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Notifications</h2>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary">
              View all
            </Button>
          </div>
          <ul className="divide-y divide-border">
            {notifications.map((n, i) => (
              <li key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-muted/30">
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${toneClasses(n.tone as any)}`}>
                  <n.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground leading-snug">{n.text}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="surface-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-foreground">Quick Actions</h2>
          <p className="text-xs text-muted-foreground">One click to start a workflow</p>
        </div>
        <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4 lg:grid-cols-8">
          {quickActions.map((q) => (
            <button
              key={q.label}
              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-transparent p-4 text-center transition hover:border-border hover:bg-muted/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                <q.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-foreground">{q.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
