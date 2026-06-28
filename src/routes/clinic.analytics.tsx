import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/clinic/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Dentallogue" }] }),
  component: AnalyticsPage,
});

const rev = Array.from({length: 12}).map((_, i) => ({ m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i], rev: 30000 + i * 2400 + Math.sin(i) * 5000 }));
const patientGrowth = Array.from({length: 12}).map((_, i) => ({ m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i], new: 28 + Math.round(Math.random() * 30), churn: 4 + Math.round(Math.random() * 8) }));
const procedures = [{ name: "Cleaning", v: 35 }, { name: "Filling", v: 22 }, { name: "Crown", v: 14 }, { name: "Root canal", v: 12 }, { name: "Extraction", v: 9 }, { name: "Other", v: 8 }];
const COLORS = ["var(--color-chart-1)","var(--color-chart-2)","var(--color-chart-3)","var(--color-chart-4)","var(--color-chart-5)","var(--color-chart-1)"];

function AnalyticsPage() {
  const kpis = [
    { label: "Revenue YTD", value: "₦486k", delta: "+22%", up: true, icon: DollarSign },
    { label: "Active patients", value: "1,248", delta: "+8%", up: true, icon: Users },
    { label: "Procedures / day", value: "18.4", delta: "+3%", up: true, icon: Activity },
    { label: "No-show rate", value: "4.2%", delta: "-1.1%", up: false, icon: TrendingDown },
  ];
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Analytics</h1><p className="mt-1 text-sm text-muted-foreground">Performance trends across the entire practice.</p></div>
        <Select defaultValue="year"><SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="month">Last 30d</SelectItem><SelectItem value="quarter">Last quarter</SelectItem><SelectItem value="year">Last year</SelectItem></SelectContent></Select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(k => (<div key={k.label} className="surface-card p-4"><div className="flex items-center justify-between"><k.icon className="h-5 w-5 text-muted-foreground" />{k.up ? <TrendingUp className="h-4 w-4 text-success" /> : <TrendingDown className="h-4 w-4 text-destructive" />}</div><div className="mt-2 text-xs text-muted-foreground">{k.label}</div><div className="text-2xl font-semibold">{k.value}</div><div className={`text-xs ${k.up ? "text-success" : "text-destructive"}`}>{k.delta} vs prev</div></div>))}
      </div>

      <Tabs defaultValue="revenue"><TabsList><TabsTrigger value="revenue">Revenue</TabsTrigger><TabsTrigger value="patients">Patients</TabsTrigger><TabsTrigger value="clinical">Clinical mix</TabsTrigger></TabsList></Tabs>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="surface-card p-5"><div className="mb-3 text-sm font-medium">Revenue trend (12 months)</div><div className="h-[280px]"><ResponsiveContainer><AreaChart data={rev}><defs><linearGradient id="g1" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" className="stroke-border" /><XAxis dataKey="m" className="text-xs" /><YAxis className="text-xs" /><Tooltip /><Area type="monotone" dataKey="rev" stroke="var(--color-primary)" fill="url(#g1)" strokeWidth={2} /></AreaChart></ResponsiveContainer></div></div>
        <div className="surface-card p-5"><div className="mb-3 text-sm font-medium">Patient acquisition vs churn</div><div className="h-[280px]"><ResponsiveContainer><BarChart data={patientGrowth}><CartesianGrid strokeDasharray="3 3" className="stroke-border" /><XAxis dataKey="m" className="text-xs" /><YAxis className="text-xs" /><Tooltip /><Bar dataKey="new" stackId="a" fill="var(--color-chart-1)" /><Bar dataKey="churn" stackId="a" fill="var(--color-destructive)" /></BarChart></ResponsiveContainer></div></div>
        <div className="surface-card p-5"><div className="mb-3 text-sm font-medium">Procedure mix</div><div className="h-[280px]"><ResponsiveContainer><PieChart><Pie data={procedures} dataKey="v" nameKey="name" innerRadius={60} outerRadius={100}>{procedures.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div></div>
        <div className="surface-card p-5"><div className="mb-3 text-sm font-medium">Avg revenue per visit</div><div className="h-[280px]"><ResponsiveContainer><LineChart data={rev.map(r => ({...r, avg: Math.round(r.rev / 180)}))}><CartesianGrid strokeDasharray="3 3" className="stroke-border" /><XAxis dataKey="m" className="text-xs" /><YAxis className="text-xs" /><Tooltip /><Line type="monotone" dataKey="avg" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div></div>
      </div>
    </div>
  );
}
