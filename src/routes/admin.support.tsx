import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  LifeBuoy, Search, Filter, Plus, MessageSquare, Clock, CheckCircle2,
  AlertCircle, X, Send, Paperclip, User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/admin/support")({
  head: () => ({ meta: [{ title: "Support — Super Admin" }, { name: "description", content: "Tickets and customer support." }] }),
  component: SupportPage,
});

type Ticket = {
  id: string; subject: string; client: string; initials: string; assignee: string;
  priority: "Low" | "Normal" | "High" | "Urgent";
  status: "Open" | "In Progress" | "Waiting" | "Resolved";
  category: string; updated: string; messages: number;
};

const tickets: Ticket[] = [
  { id: "T-3120", subject: "Cannot login after password reset", client: "Smile Dental Co.", initials: "SD", assignee: "Avery K.", priority: "Urgent", status: "Open", category: "Auth", updated: "2 min ago", messages: 3 },
  { id: "T-3119", subject: "Invoice email not delivered", client: "Northgate Dental", initials: "ND", assignee: "Jordan M.", priority: "High", status: "In Progress", category: "Billing", updated: "18 min ago", messages: 7 },
  { id: "T-3118", subject: "Custom branding on patient portal", client: "Bright Smiles", initials: "BS", assignee: "Avery K.", priority: "Normal", status: "Waiting", category: "Feature", updated: "1 hr ago", messages: 12 },
  { id: "T-3117", subject: "How do I export patient data?", client: "Lakeside Family", initials: "LF", assignee: "Sam P.", priority: "Low", status: "Open", category: "Question", updated: "2 hrs ago", messages: 1 },
  { id: "T-3116", subject: "Calendar sync with Google failing", client: "Alpine Orthodontics", initials: "AO", assignee: "Jordan M.", priority: "High", status: "In Progress", category: "Integration", updated: "3 hrs ago", messages: 5 },
  { id: "T-3115", subject: "Need bulk patient import", client: "Sunset Family Dental", initials: "SF", assignee: "Sam P.", priority: "Normal", status: "Resolved", category: "Question", updated: "Yesterday", messages: 9 },
];

const conversation = [
  { from: "client", author: "Smile Dental Co.", initials: "SD", time: "10:42", body: "Hi team, after resetting our admin password none of our staff can log in. Getting 'invalid credentials' even with the new one." },
  { from: "agent", author: "Avery K.", initials: "AK", time: "10:51", body: "Thanks for reaching out — I can see the reset went through on our side. Can you confirm if you're using the link from the latest email (sent 10:30am)?" },
  { from: "client", author: "Smile Dental Co.", initials: "SD", time: "10:55", body: "Yes, that's the one we used. We also tried clearing browser cache." },
];

function prioTone(p: Ticket["priority"]) {
  return p === "Urgent" ? "bg-destructive/10 text-destructive border-destructive/20"
    : p === "High" ? "bg-warning/15 text-warning-foreground border-warning/20"
    : p === "Normal" ? "bg-info/15 text-info border-info/20"
    : "bg-muted text-muted-foreground border-border";
}
function statusTone(s: Ticket["status"]) {
  return s === "Open" ? "bg-info/15 text-info border-info/20"
    : s === "In Progress" ? "bg-primary-soft text-accent-foreground border-transparent"
    : s === "Waiting" ? "bg-warning/15 text-warning-foreground border-warning/20"
    : "bg-success/15 text-success border-success/20";
}

function SupportPage() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Ticket | null>(tickets[0]);
  const filtered = tickets.filter(t =>
    t.subject.toLowerCase().includes(q.toLowerCase()) || t.client.toLowerCase().includes(q.toLowerCase()) || t.id.includes(q)
  );

  const stats = [
    { label: "Open", value: "9", icon: AlertCircle, tone: "bg-info/10 text-info" },
    { label: "Urgent", value: "2", icon: AlertCircle, tone: "bg-destructive/10 text-destructive" },
    { label: "Avg first response", value: "12 min", icon: Clock, tone: "bg-primary-soft text-accent-foreground" },
    { label: "Resolved (7d)", value: "47", icon: CheckCircle2, tone: "bg-success/15 text-success" },
  ];

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Support</h1>
          <p className="mt-1 text-sm text-muted-foreground">Tickets from every clinic, all in one queue.</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" />New Ticket</Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="surface-card flex items-center gap-3 p-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tone}`}><s.icon className="h-5 w-5" /></div>
            <div><div className="text-xs text-muted-foreground">{s.label}</div><div className="text-lg font-semibold">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
        <div className="surface-card overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
            <div className="relative min-w-[220px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search tickets" className="pl-9" />
            </div>
            <Select defaultValue="all"><SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="all">All status</SelectItem><SelectItem value="open">Open</SelectItem><SelectItem value="inprogress">In progress</SelectItem><SelectItem value="resolved">Resolved</SelectItem></SelectContent>
            </Select>
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>
          <ul className="divide-y divide-border">
            {filtered.map(t => (
              <li key={t.id} onClick={() => setSel(t)} className={`flex cursor-pointer items-start gap-3 p-4 hover:bg-muted/30 ${sel?.id === t.id ? "bg-primary-soft/40" : ""}`}>
                <Avatar className="h-9 w-9"><AvatarFallback>{t.initials}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">{t.id}</span>
                    <Badge variant="outline" className={prioTone(t.priority)}>{t.priority}</Badge>
                    <Badge variant="outline" className={statusTone(t.status)}>{t.status}</Badge>
                  </div>
                  <div className="mt-1 truncate text-sm font-medium">{t.subject}</div>
                  <div className="mt-0.5 truncate text-xs text-muted-foreground">{t.client} · {t.category} · {t.assignee}</div>
                </div>
                <div className="shrink-0 text-right text-[11px] text-muted-foreground">
                  <div>{t.updated}</div>
                  <div className="mt-1 flex items-center justify-end gap-1"><MessageSquare className="h-3 w-3" />{t.messages}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {sel && (
          <aside className="surface-card flex flex-col">
            <div className="flex items-start justify-between border-b border-border p-4">
              <div>
                <div className="flex items-center gap-2"><span className="font-mono text-[11px] text-muted-foreground">{sel.id}</span><Badge variant="outline" className={prioTone(sel.priority)}>{sel.priority}</Badge></div>
                <div className="mt-1 font-semibold">{sel.subject}</div>
                <div className="text-xs text-muted-foreground">{sel.client} · assigned to {sel.assignee}</div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSel(null)}><X className="h-4 w-4" /></Button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {conversation.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.from === "agent" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8"><AvatarFallback>{m.initials}</AvatarFallback></Avatar>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.from === "agent" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <div className={`text-[10px] ${m.from === "agent" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{m.author} · {m.time}</div>
                    <div className="mt-0.5">{m.body}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-3">
              <Textarea rows={2} placeholder="Type your reply…" />
              <div className="mt-2 flex items-center justify-between">
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Paperclip className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><User className="h-4 w-4" /></Button>
                </div>
                <Button size="sm" className="gap-1"><Send className="h-3.5 w-3.5" />Send</Button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
