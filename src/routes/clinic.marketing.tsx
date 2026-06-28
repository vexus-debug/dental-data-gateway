import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Plus, Send, Users, TrendingUp, Star, Mail, MessageSquare, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/clinic/marketing")({
  head: () => ({ meta: [{ title: "Marketing — Dentallogue" }] }),
  component: MarketingPage,
});

const campaigns = [
  { id: "M1", name: "Summer cleaning promo", channel: "SMS + Email", audience: 412, sent: 412, opened: 248, booked: 38, status: "Active" },
  { id: "M2", name: "Win-back: inactive 6mo", channel: "Email", audience: 187, sent: 187, opened: 89, booked: 12, status: "Active" },
  { id: "M3", name: "Birthday whitening offer", channel: "SMS", audience: 32, sent: 32, opened: 28, booked: 7, status: "Active" },
  { id: "M4", name: "New patient welcome", channel: "Email", audience: 42, sent: 42, opened: 38, booked: 22, status: "Paused" },
];

const reviews = [
  { name: "Michael J.", rating: 5, source: "Google", text: "Best dental experience I've had!", date: "2 days ago" },
  { name: "Sarah W.", rating: 5, source: "Yelp", text: "Dr. Doe is amazing. Very gentle.", date: "1 week ago" },
  { name: "David B.", rating: 4, source: "Google", text: "Great service, slightly long wait.", date: "2 weeks ago" },
];

function MarketingPage() {
  const [tab, setTab] = useState("campaigns");
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Marketing</h1><p className="mt-1 text-sm text-muted-foreground">Run campaigns, recall patients, and grow reviews.</p></div>
        <Button className="gap-2"><Plus className="h-4 w-4" />New campaign</Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="surface-card flex items-center gap-3 p-4"><Users className="h-8 w-8 text-info" /><div><div className="text-xs text-muted-foreground">Reach (30d)</div><div className="text-xl font-semibold">3,240</div></div></div>
        <div className="surface-card flex items-center gap-3 p-4"><TrendingUp className="h-8 w-8 text-success" /><div><div className="text-xs text-muted-foreground">Bookings driven</div><div className="text-xl font-semibold">79</div></div></div>
        <div className="surface-card flex items-center gap-3 p-4"><Star className="h-8 w-8 text-warning" /><div><div className="text-xs text-muted-foreground">Avg rating</div><div className="text-xl font-semibold">4.8</div></div></div>
        <div className="surface-card flex items-center gap-3 p-4"><Megaphone className="h-8 w-8 text-primary" /><div><div className="text-xs text-muted-foreground">Active campaigns</div><div className="text-xl font-semibold">{campaigns.filter(c => c.status === "Active").length}</div></div></div>
      </div>

      <Tabs value={tab} onValueChange={setTab}><TabsList><TabsTrigger value="campaigns">Campaigns</TabsTrigger><TabsTrigger value="recall">Recall</TabsTrigger><TabsTrigger value="reviews">Reviews</TabsTrigger><TabsTrigger value="templates">Templates</TabsTrigger></TabsList></Tabs>

      {tab === "campaigns" && (
        <div className="space-y-3">{campaigns.map(c => {
          const openRate = Math.round((c.opened / c.sent) * 100);
          const convRate = Math.round((c.booked / c.sent) * 100);
          return (
            <div key={c.id} className="surface-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div><div className="flex items-center gap-2"><span className="font-semibold">{c.name}</span><Badge variant="outline" className={c.status === "Active" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}>{c.status}</Badge></div><div className="text-xs text-muted-foreground">{c.channel}</div></div>
                <div className="flex gap-1"><Button size="sm" variant="ghost">{c.status === "Active" ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}</Button><Button size="sm" variant="outline">Edit</Button></div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div><div className="text-xs text-muted-foreground">Audience</div><div className="font-semibold">{c.audience}</div></div>
                <div><div className="text-xs text-muted-foreground">Sent</div><div className="font-semibold">{c.sent}</div></div>
                <div><div className="text-xs text-muted-foreground">Open rate</div><div className="font-semibold">{openRate}%</div><Progress value={openRate} className="mt-1 h-1" /></div>
                <div><div className="text-xs text-muted-foreground">Bookings</div><div className="font-semibold text-success">{c.booked} ({convRate}%)</div></div>
              </div>
            </div>
          );
        })}</div>
      )}

      {tab === "recall" && (
        <div className="grid gap-3 sm:grid-cols-3">
          {[{label: "Due for cleaning", count: 87, action: "Send recall SMS"}, {label: "Pending treatment", count: 42, action: "Send reminder"}, {label: "Birthdays this month", count: 31, action: "Send offer"}].map(r => (
            <div key={r.label} className="surface-card p-4"><div className="text-xs text-muted-foreground">{r.label}</div><div className="mt-1 text-2xl font-semibold">{r.count}</div><Button size="sm" className="mt-3 w-full gap-1"><Send className="h-3 w-3" />{r.action}</Button></div>
          ))}
        </div>
      )}

      {tab === "reviews" && (
        <div className="space-y-3">{reviews.map((r, i) => (<div key={i} className="surface-card p-4"><div className="flex items-center justify-between"><div><div className="font-medium">{r.name}</div><div className="flex items-center gap-1">{Array.from({length: r.rating}).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-warning text-warning" />)}<span className="ml-1 text-xs text-muted-foreground">on {r.source}</span></div></div><Badge variant="outline">{r.date}</Badge></div><div className="mt-2 text-sm">{r.text}</div><Button size="sm" variant="outline" className="mt-2">Reply</Button></div>))}</div>
      )}

      {tab === "templates" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[{icon: MessageSquare, name: "Appointment reminder"}, {icon: Mail, name: "Recall — overdue cleaning"}, {icon: MessageSquare, name: "Birthday offer"}, {icon: Mail, name: "New patient welcome"}, {icon: Mail, name: "Treatment follow-up"}, {icon: MessageSquare, name: "Review request"}].map(t => (
            <div key={t.name} className="surface-card p-4"><t.icon className="h-6 w-6 text-primary" /><div className="mt-2 font-medium">{t.name}</div><Button size="sm" variant="outline" className="mt-3 w-full">Use template</Button></div>
          ))}
        </div>
      )}
    </div>
  );
}
