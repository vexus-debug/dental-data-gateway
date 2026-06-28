import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Send, Phone, Mail, Smartphone, Search, Paperclip, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/clinic/communication")({
  head: () => ({ meta: [{ title: "Communication — Dentallogue" }] }),
  component: CommPage,
});

type Conv = { id: string; name: string; initials: string; channel: "SMS" | "Email" | "Portal"; preview: string; time: string; unread: boolean; messages: { from: "patient" | "clinic"; text: string; time: string }[] };

const convos: Conv[] = [
  { id: "1", name: "Michael Johnson", initials: "MJ", channel: "SMS", preview: "Thanks! See you tomorrow.", time: "10m", unread: true, messages: [
    { from: "clinic", text: "Hi Michael, just confirming your appt tomorrow at 9 AM.", time: "10:30" },
    { from: "patient", text: "Yes, I'll be there!", time: "10:32" },
    { from: "clinic", text: "Great — please arrive 10 min early.", time: "10:33" },
    { from: "patient", text: "Thanks! See you tomorrow.", time: "10:40" },
  ] },
  { id: "2", name: "Sarah Williams", initials: "SW", channel: "Email", preview: "Re: Treatment plan estimate", time: "1h", unread: false, messages: [{ from: "patient", text: "Could you send the estimate?", time: "09:10" }, { from: "clinic", text: "Sent — see attached.", time: "09:25" }] },
  { id: "3", name: "David Brown", initials: "DB", channel: "Portal", preview: "Can I reschedule to Thursday?", time: "3h", unread: true, messages: [{ from: "patient", text: "Can I reschedule to Thursday?", time: "07:00" }] },
  { id: "4", name: "Emma Wilson", initials: "EW", channel: "SMS", preview: "Reminder: Crown follow-up", time: "Yesterday", unread: false, messages: [{ from: "clinic", text: "Reminder: Crown follow-up at 11 AM tomorrow.", time: "Yesterday" }] },
];

function CommPage() {
  const [active, setActive] = useState(convos[0]);
  const [tab, setTab] = useState("all");
  const filtered = tab === "all" ? convos : convos.filter(c => c.channel.toLowerCase() === tab);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Communication</h1><p className="mt-1 text-sm text-muted-foreground">Unified inbox for SMS, email, and patient portal messages.</p></div>
        <Button className="gap-2"><Plus className="h-4 w-4" />New message</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[340px_1fr]" style={{ height: "calc(100vh - 220px)", minHeight: 500 }}>
        <div className="surface-card flex flex-col overflow-hidden">
          <div className="border-b border-border p-3 space-y-2">
            <div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search messages..." className="pl-9" /></div>
            <Tabs value={tab} onValueChange={setTab}><TabsList className="grid grid-cols-4"><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="sms">SMS</TabsTrigger><TabsTrigger value="email">Email</TabsTrigger><TabsTrigger value="portal">Portal</TabsTrigger></TabsList></Tabs>
          </div>
          <div className="flex-1 overflow-y-auto">{filtered.map(c => (<button key={c.id} onClick={() => setActive(c)} className={`flex w-full items-start gap-3 border-b border-border/60 p-3 text-left transition ${active.id === c.id ? "bg-primary-soft/40" : "hover:bg-muted/30"}`}>
            <Avatar className="h-10 w-10"><AvatarFallback>{c.initials}</AvatarFallback></Avatar>
            <div className="min-w-0 flex-1"><div className="flex items-center justify-between"><span className={`truncate text-sm ${c.unread ? "font-semibold" : "font-medium"}`}>{c.name}</span><span className="text-[10px] text-muted-foreground">{c.time}</span></div>
              <div className="truncate text-xs text-muted-foreground">{c.preview}</div>
              <Badge variant="outline" className="mt-1 text-[10px]">{c.channel === "SMS" ? <Smartphone className="mr-1 h-2.5 w-2.5" /> : c.channel === "Email" ? <Mail className="mr-1 h-2.5 w-2.5" /> : <MessageSquare className="mr-1 h-2.5 w-2.5" />}{c.channel}</Badge>
            </div>
            {c.unread && <span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />}
          </button>))}</div>
        </div>

        <div className="surface-card flex flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-border p-3"><div className="flex items-center gap-3"><Avatar className="h-10 w-10"><AvatarFallback>{active.initials}</AvatarFallback></Avatar><div><div className="font-semibold">{active.name}</div><div className="text-xs text-muted-foreground">{active.channel}</div></div></div><div className="flex gap-1"><Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button><Button variant="ghost" size="icon"><Mail className="h-4 w-4" /></Button></div></div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">{active.messages.map((m, i) => (<div key={i} className={`flex ${m.from === "clinic" ? "justify-end" : "justify-start"}`}><div className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${m.from === "clinic" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{m.text}<div className="mt-0.5 text-[10px] opacity-70">{m.time}</div></div></div>))}</div>
          <div className="flex items-center gap-2 border-t border-border p-3"><Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button><Input placeholder="Type a message..." className="flex-1" /><Button className="gap-1"><Send className="h-4 w-4" />Send</Button></div>
        </div>
      </div>
    </div>
  );
}
