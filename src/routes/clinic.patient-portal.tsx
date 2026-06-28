import { createFileRoute } from "@tanstack/react-router";
import { Smartphone, QrCode, Send, Download, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/clinic/patient-portal")({
  head: () => ({ meta: [{ title: "Patient Portal — Dentallogue" }] }),
  component: PortalPage,
});

const recent = [
  { name: "Michael Johnson", initials: "MJ", action: "Booked appointment", time: "10 min ago" },
  { name: "Sarah Williams", initials: "SW", action: "Paid invoice INV-2033", time: "1 hr ago" },
  { name: "David Brown", initials: "DB", action: "Signed consent form", time: "2 hr ago" },
  { name: "Emma Wilson", initials: "EW", action: "Updated medical history", time: "5 hr ago" },
  { name: "James Taylor", initials: "JT", action: "Left 5-star review", time: "1 day ago" },
];

const features = [
  { name: "Book/reschedule appointments", on: true },
  { name: "View treatment plans", on: true },
  { name: "Pay invoices online", on: true },
  { name: "Sign forms remotely", on: true },
  { name: "Message clinic", on: true },
  { name: "Access X-rays", on: false },
  { name: "Family member accounts", on: true },
];

function PortalPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Patient Portal</h1><p className="mt-1 text-sm text-muted-foreground">Self-service hub patients see on web and mobile.</p></div>
        <div className="flex gap-2"><Button variant="outline" className="gap-2"><QrCode className="h-4 w-4" />App QR</Button><Button className="gap-2"><Send className="h-4 w-4" />Invite patients</Button></div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="surface-card p-4"><div className="text-xs text-muted-foreground">Active users</div><div className="mt-1 text-2xl font-semibold">847</div><div className="text-xs text-success">68% of patients</div></div>
        <div className="surface-card p-4"><div className="text-xs text-muted-foreground">Logins (7d)</div><div className="mt-1 text-2xl font-semibold">1,284</div></div>
        <div className="surface-card p-4"><div className="text-xs text-muted-foreground">Online bookings</div><div className="mt-1 text-2xl font-semibold">62%</div></div>
        <div className="surface-card p-4"><div className="text-xs text-muted-foreground">App rating</div><div className="mt-1 flex items-center gap-1.5 text-2xl font-semibold">4.8 <Star className="h-4 w-4 fill-warning text-warning" /></div></div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="surface-card p-5">
          <div className="font-medium">Portal features</div>
          <div className="mt-3 space-y-2">{features.map(f => (<div key={f.name} className="flex items-center justify-between rounded-lg border border-border p-3"><div className="flex items-center gap-2 text-sm">{f.on && <CheckCircle2 className="h-4 w-4 text-success" />}<span>{f.name}</span></div><Switch defaultChecked={f.on} /></div>))}</div>
        </div>

        <div className="surface-card p-5">
          <div className="font-medium">Recent activity</div>
          <div className="mt-3 space-y-2">{recent.map((r, i) => (<div key={i} className="flex items-center gap-3 rounded-lg border border-border p-2.5"><Avatar className="h-9 w-9"><AvatarFallback>{r.initials}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{r.name}</div><div className="truncate text-xs text-muted-foreground">{r.action}</div></div><span className="text-[10px] text-muted-foreground">{r.time}</span></div>))}</div>
        </div>
      </div>

      <div className="surface-card p-5">
        <div className="font-medium">Invite & branding</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2"><div><Label>Portal URL</Label><Input defaultValue="https://portal.dentallogue.com/yourclinic" /></div><div><Label>Welcome message</Label><Input defaultValue="Welcome to Dentallogue! Manage your smile journey here." /></div></div>
        <Button className="mt-4 gap-2"><Download className="h-4 w-4" />Download app store badges</Button>
      </div>
    </div>
  );
}
