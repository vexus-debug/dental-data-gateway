import { createFileRoute } from "@tanstack/react-router";
import { Building2, ShieldCheck, Users, Webhook, Key, Globe, CreditCard, Plus, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Platform Settings — Super Admin" }, { name: "description", content: "Configure platform, security and integrations." }] }),
  component: SettingsPage,
});

const admins = [
  { name: "Avery Khan", email: "avery@dentallogue.com", role: "Owner", initials: "AK", lastActive: "2 min ago" },
  { name: "Jordan Mills", email: "jordan@dentallogue.com", role: "Admin", initials: "JM", lastActive: "12 min ago" },
  { name: "Sam Park", email: "sam@dentallogue.com", role: "Support", initials: "SP", lastActive: "1 hr ago" },
  { name: "Riley Chen", email: "riley@dentallogue.com", role: "Billing", initials: "RC", lastActive: "Yesterday" },
];

const apiKeys = [
  { name: "Production API", key: "dl_live_pk_••••3f29", created: "2025-12-01", lastUsed: "2 min ago" },
  { name: "Webhook signing secret", key: "whsec_••••a821", created: "2025-12-01", lastUsed: "—" },
  { name: "Staging API", key: "dl_test_pk_••••e442", created: "2026-04-12", lastUsed: "1 hr ago" },
];

const webhooks = [
  { url: "https://hooks.dentallogue.com/billing", events: "invoice.paid, invoice.failed", status: "Healthy" },
  { url: "https://hooks.dentallogue.com/clinic", events: "clinic.created, clinic.suspended", status: "Healthy" },
  { url: "https://internal.crm/incoming", events: "support.ticket.*", status: "Failing" },
];

const integrations = [
  { name: "Stripe", desc: "Payments and subscriptions.", connected: true },
  { name: "SendGrid", desc: "Transactional email.", connected: true },
  { name: "Twilio", desc: "SMS notifications.", connected: true },
  { name: "Slack", desc: "Internal alerts.", connected: false },
  { name: "Datadog", desc: "Monitoring and logs.", connected: true },
  { name: "HubSpot", desc: "CRM sync.", connected: false },
];

function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Platform Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Company, team, security and integrations.</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="flex-wrap">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api">API & Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="surface-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground"><Building2 className="h-4 w-4" /></div>
              <h2 className="text-sm font-semibold">Company</h2>
            </div>
            <div className="grid gap-3">
              <div><Label>Company name</Label><Input defaultValue="Dentallogue Inc." /></div>
              <div><Label>Support email</Label><Input defaultValue="support@dentallogue.com" /></div>
              <div><Label>Website</Label><Input defaultValue="https://dentallogue.com" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Default currency</Label>
                  <Select defaultValue="ngn"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ngn">NGN</SelectItem><SelectItem value="eur">EUR</SelectItem><SelectItem value="gbp">GBP</SelectItem></SelectContent></Select>
                </div>
                <div><Label>Timezone</Label>
                  <Select defaultValue="utc"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="utc">UTC</SelectItem><SelectItem value="et">America/New_York</SelectItem><SelectItem value="pt">America/Los_Angeles</SelectItem></SelectContent></Select>
                </div>
              </div>
            </div>
          </div>

          <div className="surface-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground"><Globe className="h-4 w-4" /></div>
              <h2 className="text-sm font-semibold">Branding</h2>
            </div>
            <div className="grid gap-3">
              <div><Label>Public app name</Label><Input defaultValue="Dentallogue" /></div>
              <div><Label>Tagline</Label><Input defaultValue="The all-in-one platform for modern dental practices." /></div>
              <div><Label>Footer text</Label><Textarea rows={3} defaultValue="© 2026 Dentallogue Inc. All rights reserved." /></div>
            </div>
            <Button className="mt-4">Save changes</Button>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <div className="surface-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border p-3">
              <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><h3 className="text-sm font-semibold">Internal admins</h3></div>
              <Button size="sm" className="gap-1"><Plus className="h-3.5 w-3.5" />Invite admin</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <tr><th className="px-4 py-2.5">Member</th><th className="px-4 py-2.5">Role</th><th className="px-4 py-2.5">Last active</th><th></th></tr>
                </thead>
                <tbody>
                  {admins.map(a => (
                    <tr key={a.email} className="border-t border-border/60 hover:bg-muted/30">
                      <td className="px-4 py-3"><div className="flex items-center gap-3"><Avatar className="h-9 w-9"><AvatarFallback>{a.initials}</AvatarFallback></Avatar><div><div className="font-medium">{a.name}</div><div className="text-xs text-muted-foreground">{a.email}</div></div></div></td>
                      <td className="px-4 py-3"><Badge variant="outline" className="bg-primary-soft text-accent-foreground">{a.role}</Badge></td>
                      <td className="px-4 py-3 text-xs">{a.lastActive}</td>
                      <td className="px-4 py-3 text-right"><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="surface-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground"><ShieldCheck className="h-4 w-4" /></div>
              <h2 className="text-sm font-semibold">Authentication</h2>
            </div>
            <div className="space-y-3">
              {[
                { l: "Enforce 2FA for admins", on: true },
                { l: "Allow Google SSO", on: true },
                { l: "Allow Microsoft SSO", on: false },
                { l: "Session timeout (30 minutes)", on: true },
              ].map(r => (
                <div key={r.l} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-sm">{r.l}</span><Switch defaultChecked={r.on} />
                </div>
              ))}
            </div>
          </div>
          <div className="surface-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground"><ShieldCheck className="h-4 w-4" /></div>
              <h2 className="text-sm font-semibold">Compliance</h2>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />HIPAA — Configured</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />SOC 2 Type II — Active</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />GDPR — Configured</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />Encrypted at rest (AES-256)</li>
            </ul>
            <Button variant="outline" className="mt-4 w-full">Download compliance package</Button>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="surface-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground"><CreditCard className="h-4 w-4" /></div>
              <h2 className="text-sm font-semibold">Billing details</h2>
            </div>
            <div className="grid gap-3">
              <div><Label>Legal entity</Label><Input defaultValue="Dentallogue Inc." /></div>
              <div><Label>Tax ID / VAT</Label><Input defaultValue="US 88-1234567" /></div>
              <div><Label>Billing address</Label><Textarea rows={3} defaultValue="500 Market St, Suite 400&#10;San Francisco, CA 94105" /></div>
            </div>
            <Button className="mt-4">Save</Button>
          </div>
          <div className="surface-card p-5">
            <h2 className="text-sm font-semibold">Tax & pricing</h2>
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border p-3"><span className="text-sm">Auto-apply regional tax</span><Switch defaultChecked /></div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3"><span className="text-sm">Send invoice PDFs by email</span><Switch defaultChecked /></div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3"><span className="text-sm">Allow self-serve plan changes</span><Switch /></div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {integrations.map(i => (
            <div key={i.name} className="surface-card flex items-start justify-between gap-3 p-4">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{i.name}</h3>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{i.desc}</p>
                <Badge variant="outline" className={i.connected ? "mt-2 bg-success/15 text-success border-success/20" : "mt-2 bg-muted text-muted-foreground border-border"}>
                  {i.connected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              <Button variant="outline" size="sm">{i.connected ? "Manage" : "Connect"}</Button>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="api" className="mt-4 space-y-4">
          <div className="surface-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border p-3">
              <div className="flex items-center gap-2"><Key className="h-4 w-4 text-muted-foreground" /><h3 className="text-sm font-semibold">API keys</h3></div>
              <Button size="sm" className="gap-1"><Plus className="h-3.5 w-3.5" />New key</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <tr><th className="px-4 py-2.5">Name</th><th className="px-4 py-2.5">Key</th><th className="px-4 py-2.5">Created</th><th className="px-4 py-2.5">Last used</th><th></th></tr>
                </thead>
                <tbody>
                  {apiKeys.map(k => (
                    <tr key={k.name} className="border-t border-border/60 hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{k.name}</td>
                      <td className="px-4 py-3 font-mono text-xs">{k.key}</td>
                      <td className="px-4 py-3 text-xs">{k.created}</td>
                      <td className="px-4 py-3 text-xs">{k.lastUsed}</td>
                      <td className="px-4 py-3 text-right"><Button variant="ghost" size="sm" className="h-7">Revoke</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="surface-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border p-3">
              <div className="flex items-center gap-2"><Webhook className="h-4 w-4 text-muted-foreground" /><h3 className="text-sm font-semibold">Webhooks</h3></div>
              <Button size="sm" className="gap-1"><Plus className="h-3.5 w-3.5" />Add endpoint</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <tr><th className="px-4 py-2.5">Endpoint</th><th className="px-4 py-2.5">Events</th><th className="px-4 py-2.5">Status</th><th></th></tr>
                </thead>
                <tbody>
                  {webhooks.map(w => (
                    <tr key={w.url} className="border-t border-border/60 hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs">{w.url}</td>
                      <td className="px-4 py-3 text-xs">{w.events}</td>
                      <td className="px-4 py-3"><Badge variant="outline" className={w.status === "Healthy" ? "bg-success/15 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"}>{w.status}</Badge></td>
                      <td className="px-4 py-3 text-right"><Button variant="ghost" size="sm" className="h-7">Edit</Button></td>
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
