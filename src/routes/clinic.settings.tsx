import { createFileRoute } from "@tanstack/react-router";
import { Settings, Building2, Clock, Bell, CreditCard, Globe, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/clinic/settings")({
  head: () => ({ meta: [{ title: "Settings — Dentallogue" }] }),
  component: SettingsPage,
});

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-5">
      <div><h1 className="text-2xl font-semibold tracking-tight">Clinic Settings</h1><p className="mt-1 text-sm text-muted-foreground">Configure your practice — profile, hours, billing, and integrations.</p></div>

      <Tabs defaultValue="clinic">
        <TabsList className="flex-wrap"><TabsTrigger value="clinic"><Building2 className="mr-1.5 h-3.5 w-3.5" />Clinic</TabsTrigger><TabsTrigger value="hours"><Clock className="mr-1.5 h-3.5 w-3.5" />Hours</TabsTrigger><TabsTrigger value="notif"><Bell className="mr-1.5 h-3.5 w-3.5" />Notifications</TabsTrigger><TabsTrigger value="billing"><CreditCard className="mr-1.5 h-3.5 w-3.5" />Billing</TabsTrigger><TabsTrigger value="integrations"><Globe className="mr-1.5 h-3.5 w-3.5" />Integrations</TabsTrigger></TabsList>

        <TabsContent value="clinic" className="space-y-4 pt-4">
          <div className="surface-card p-5 grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><Label>Clinic name</Label><Input defaultValue="Dentallogue Family Dentistry" /></div><div><Label>Phone</Label><Input defaultValue="+1 (555) 010-2030" /></div><div><Label>Email</Label><Input defaultValue="hello@dentallogue.com" /></div><div className="sm:col-span-2"><Label>Address</Label><Input defaultValue="1024 Lake Shore Dr, Chicago, IL 60611" /></div><div><Label>Tax ID</Label><Input defaultValue="XX-XXXXXXX" /></div><div><Label>License #</Label><Input defaultValue="IL-DDS-29481" /></div><div className="sm:col-span-2"><Label>About</Label><Textarea rows={3} defaultValue="Family and cosmetic dentistry serving Chicago since 2008." /></div></div>
          <Button>Save changes</Button>
        </TabsContent>

        <TabsContent value="hours" className="space-y-4 pt-4">
          <div className="surface-card p-5 space-y-2">{days.map((d, i) => (<div key={d} className="grid grid-cols-[120px_1fr_auto_1fr] items-center gap-3"><div className="text-sm font-medium">{d}</div><Input type="time" defaultValue={i < 5 ? "08:00" : i === 5 ? "09:00" : ""} disabled={i === 6} /><span className="text-xs text-muted-foreground">to</span><Input type="time" defaultValue={i < 5 ? "17:00" : i === 5 ? "14:00" : ""} disabled={i === 6} /></div>))}</div>
          <Button>Save hours</Button>
        </TabsContent>

        <TabsContent value="notif" className="space-y-4 pt-4">
          <div className="surface-card p-5 space-y-3">
            {[
              { label: "Appointment confirmations (SMS)", on: true },
              { label: "Appointment reminders 24h before", on: true },
              { label: "Reminders 1h before", on: true },
              { label: "Recall reminders (6 months)", on: true },
              { label: "Birthday greetings", on: true },
              { label: "Invoice notifications", on: true },
              { label: "Review request after visit", on: false },
            ].map(n => (<div key={n.label} className="flex items-center justify-between rounded-lg border border-border p-3"><span className="text-sm">{n.label}</span><Switch defaultChecked={n.on} /></div>))}
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4 pt-4">
          <div className="surface-card p-5 grid gap-4 sm:grid-cols-2"><div><Label>Currency</Label><Select defaultValue="ngn"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ngn">NGN</SelectItem><SelectItem value="eur">EUR</SelectItem><SelectItem value="gbp">GBP</SelectItem></SelectContent></Select></div><div><Label>Tax rate (%)</Label><Input type="number" defaultValue={0} /></div><div><Label>Invoice prefix</Label><Input defaultValue="INV-" /></div><div><Label>Default payment terms</Label><Select defaultValue="30"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="0">Due on receipt</SelectItem><SelectItem value="15">Net 15</SelectItem><SelectItem value="30">Net 30</SelectItem></SelectContent></Select></div><div className="sm:col-span-2"><Label>Invoice footer</Label><Textarea rows={2} defaultValue="Thank you for choosing Dentallogue!" /></div></div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-3 pt-4">
          {[{ name: "Stripe", desc: "Process card payments", on: true }, { name: "Google Business", desc: "Sync hours & reviews", on: true }, { name: "Mailchimp", desc: "Email campaigns", on: false }, { name: "Twilio", desc: "SMS messaging", on: true }, { name: "QuickBooks", desc: "Accounting sync", on: false }].map(i => (<div key={i.name} className="surface-card flex items-center justify-between p-4"><div><div className="font-medium">{i.name}</div><div className="text-xs text-muted-foreground">{i.desc}</div></div><div className="flex items-center gap-2"><Switch defaultChecked={i.on} /><Button size="sm" variant="outline">Configure</Button></div></div>))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
