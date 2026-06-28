import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, Megaphone, Send, Mail, MessageSquare, Smartphone, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Super Admin" }, { name: "description", content: "Broadcast announcements and manage templates." }] }),
  component: NotifPage,
});

const broadcasts = [
  { id: "B-211", title: "Scheduled maintenance on Sunday", channel: "Email + In-app", audience: "All clinics", sent: "2026-06-25", reach: 248, status: "Sent" },
  { id: "B-210", title: "New AI Treatment Assistant beta", channel: "Email", audience: "Enterprise", sent: "2026-06-20", reach: 34, status: "Sent" },
  { id: "B-209", title: "Q3 release highlights", channel: "In-app", audience: "All clinics", sent: "2026-06-15", reach: 248, status: "Sent" },
  { id: "B-208", title: "Holiday support hours", channel: "Email + SMS", audience: "All clinics", sent: "—", reach: 0, status: "Scheduled" },
];

const templates = [
  { name: "Welcome onboarding", channel: "Email", lastEdited: "2 days ago", uses: "All trials" },
  { name: "Trial ending in 3 days", channel: "Email", lastEdited: "1 week ago", uses: "Trial day 11" },
  { name: "Payment failed", channel: "Email + SMS", lastEdited: "5 hours ago", uses: "Billing failure" },
  { name: "New feature available", channel: "In-app", lastEdited: "Yesterday", uses: "Manual" },
];

const channels = [
  { name: "Email", desc: "Transactional and broadcast email via SendGrid.", enabled: true, icon: Mail },
  { name: "SMS", desc: "Twilio SMS for critical alerts.", enabled: true, icon: MessageSquare },
  { name: "Push", desc: "Mobile push notifications.", enabled: false, icon: Smartphone },
  { name: "In-app", desc: "Banners and notification center.", enabled: true, icon: Bell },
];

function NotifPage() {
  const [q, setQ] = useState("");
  const filtered = broadcasts.filter(b => b.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">Broadcasts, templates and delivery channels.</p>
        </div>
      </div>

      <Tabs defaultValue="compose">
        <TabsList>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="broadcasts">Broadcasts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
            <div className="surface-card p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground"><Megaphone className="h-5 w-5" /></div>
                <div><h2 className="font-semibold">New broadcast</h2><p className="text-xs text-muted-foreground">Send a message to clinics, owners or staff.</p></div>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label>Audience</Label>
                    <Select defaultValue="all">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All clinics</SelectItem>
                        <SelectItem value="trial">Trial clinics</SelectItem>
                        <SelectItem value="enterprise">Enterprise tier</SelectItem>
                        <SelectItem value="overdue">Overdue accounts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Channel</Label>
                    <Select defaultValue="email-inapp">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email only</SelectItem>
                        <SelectItem value="sms">SMS only</SelectItem>
                        <SelectItem value="inapp">In-app only</SelectItem>
                        <SelectItem value="email-inapp">Email + In-app</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label>Subject</Label><Input placeholder="Scheduled maintenance on Sunday" /></div>
                <div><Label>Message</Label><Textarea rows={6} placeholder="Hi team, we'll be performing maintenance on…" /></div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3"><span className="text-sm">Send immediately</span><Switch defaultChecked /></div>
                <div className="flex gap-2"><Button className="gap-2"><Send className="h-4 w-4" />Send broadcast</Button><Button variant="outline">Save draft</Button></div>
              </div>
            </div>

            <div className="surface-card flex flex-col p-5">
              <h3 className="text-sm font-semibold">Preview</h3>
              <div className="mt-3 flex-1 rounded-xl border border-dashed border-border bg-muted/30 p-4">
                <div className="rounded-lg bg-background p-4 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-border pb-2 text-xs">
                    <div className="h-6 w-6 rounded-full bg-foreground text-background flex items-center justify-center"><Bell className="h-3 w-3" /></div>
                    <span className="font-medium">Dentallogue</span>
                    <span className="ml-auto text-muted-foreground">now</span>
                  </div>
                  <div className="pt-3 text-sm font-medium">Scheduled maintenance on Sunday</div>
                  <p className="mt-1 text-xs text-muted-foreground">Hi team, we'll be performing maintenance on…</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="broadcasts" className="mt-4">
          <div className="surface-card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border p-3">
              <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search broadcasts" />
              <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5">ID</th>
                    <th className="px-4 py-2.5">Title</th>
                    <th className="px-4 py-2.5">Channel</th>
                    <th className="px-4 py-2.5">Audience</th>
                    <th className="px-4 py-2.5">Sent</th>
                    <th className="px-4 py-2.5">Reach</th>
                    <th className="px-4 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(b => (
                    <tr key={b.id} className="border-t border-border/60 hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs">{b.id}</td>
                      <td className="px-4 py-3 font-medium">{b.title}</td>
                      <td className="px-4 py-3 text-xs">{b.channel}</td>
                      <td className="px-4 py-3 text-xs">{b.audience}</td>
                      <td className="px-4 py-3 text-xs">{b.sent}</td>
                      <td className="px-4 py-3 text-xs">{b.reach}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={b.status === "Sent" ? "bg-success/15 text-success border-success/20" : "bg-info/15 text-info border-info/20"}>{b.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-4 space-y-3">
          <div className="flex justify-end"><Button className="gap-2"><Plus className="h-4 w-4" />New template</Button></div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {templates.map(t => (
              <div key={t.name} className="surface-card p-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground"><Mail className="h-4 w-4" /></div>
                  <Badge variant="outline" className="bg-muted text-foreground text-[10px]">{t.channel}</Badge>
                </div>
                <h3 className="mt-3 text-sm font-semibold">{t.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.uses}</p>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                  <span>{t.lastEdited}</span><Button variant="ghost" size="sm" className="h-7">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="channels" className="mt-4 grid gap-3 md:grid-cols-2">
          {channels.map(c => (
            <div key={c.name} className="surface-card flex items-start justify-between gap-3 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground"><c.icon className="h-5 w-5" /></div>
                <div><h3 className="text-sm font-semibold">{c.name}</h3><p className="text-xs text-muted-foreground">{c.desc}</p></div>
              </div>
              <Switch defaultChecked={c.enabled} />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
