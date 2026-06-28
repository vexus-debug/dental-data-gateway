import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { UserCog, Plus, Clock, CalendarDays, Award, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/clinic/staff")({
  head: () => ({ meta: [{ title: "Staff — Dentallogue" }] }),
  component: StaffPage,
});

type Member = { id: string; name: string; initials: string; role: string; email: string; phone: string; status: "Active" | "On Leave"; specialty?: string; today?: string };

const staff: Member[] = [
  { id: "S1", name: "Dr. John Doe", initials: "JD", role: "Dentist", email: "john@clinic.com", phone: "+1 555-0100", status: "Active", specialty: "General", today: "08:00 - 17:00" },
  { id: "S2", name: "Dr. Anna Smith", initials: "AS", role: "Dentist", email: "anna@clinic.com", phone: "+1 555-0101", status: "Active", specialty: "Orthodontist", today: "09:00 - 18:00" },
  { id: "S3", name: "Dr. Raj Patel", initials: "RP", role: "Dentist", email: "raj@clinic.com", phone: "+1 555-0102", status: "Active", specialty: "Endodontist", today: "10:00 - 19:00" },
  { id: "S4", name: "Maria Garcia", initials: "MG", role: "Hygienist", email: "maria@clinic.com", phone: "+1 555-0110", status: "Active", today: "08:00 - 16:00" },
  { id: "S5", name: "Tom Becker", initials: "TB", role: "Assistant", email: "tom@clinic.com", phone: "+1 555-0111", status: "Active", today: "08:00 - 17:00" },
  { id: "S6", name: "Lisa Chen", initials: "LC", role: "Receptionist", email: "lisa@clinic.com", phone: "+1 555-0112", status: "On Leave" },
];

function StaffPage() {
  const [tab, setTab] = useState("directory");
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-semibold tracking-tight">Staff</h1><p className="mt-1 text-sm text-muted-foreground">Team directory, schedules, and performance.</p></div>
        <Button className="gap-2"><Plus className="h-4 w-4" />Add member</Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}><TabsList><TabsTrigger value="directory">Directory</TabsTrigger><TabsTrigger value="schedule">Schedule</TabsTrigger><TabsTrigger value="performance">Performance</TabsTrigger></TabsList></Tabs>

      {tab === "directory" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map(m => (
            <div key={m.id} className="surface-card p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12"><AvatarFallback>{m.initials}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1"><div className="flex items-center justify-between"><div className="truncate font-semibold">{m.name}</div><Badge variant="outline" className={m.status === "Active" ? "bg-success/15 text-success" : "bg-warning/15 text-warning-foreground"}>{m.status}</Badge></div>
                  <div className="text-xs text-muted-foreground">{m.role}{m.specialty && ` · ${m.specialty}`}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1.5 text-xs"><div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-3 w-3" />{m.email}</div><div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-3 w-3" />{m.phone}</div>{m.today && <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-3 w-3" />Today: {m.today}</div>}</div>
              <div className="mt-3 flex gap-2"><Button size="sm" variant="outline" className="flex-1">Profile</Button><Button size="sm" variant="outline" className="flex-1 gap-1"><CalendarDays className="h-3 w-3" />Schedule</Button></div>
            </div>
          ))}
        </div>
      )}

      {tab === "schedule" && (
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-2">Staff</th>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => <th key={d} className="px-3 py-2">{d}</th>)}</tr></thead>
            <tbody>{staff.filter(m => m.today).map(m => (<tr key={m.id} className="border-t border-border/60"><td className="px-4 py-3 font-medium">{m.name}</td>{Array.from({length: 7}).map((_, i) => <td key={i} className="px-3 py-3 text-xs">{i < 5 ? <Badge variant="outline" className="bg-primary-soft text-accent-foreground">{m.today}</Badge> : <span className="text-muted-foreground">Off</span>}</td>)}</tr>))}</tbody>
          </table>
        </div>
      )}

      {tab === "performance" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {staff.filter(m => m.role === "Dentist").map(m => (
            <div key={m.id} className="surface-card p-4"><div className="flex items-center gap-3"><Avatar className="h-10 w-10"><AvatarFallback>{m.initials}</AvatarFallback></Avatar><div><div className="font-semibold">{m.name}</div><div className="text-xs text-muted-foreground">{m.specialty}</div></div></div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center"><div className="rounded-lg bg-muted/40 p-2"><div className="text-xs text-muted-foreground">Patients</div><div className="font-semibold">142</div></div><div className="rounded-lg bg-muted/40 p-2"><div className="text-xs text-muted-foreground">Revenue</div><div className="font-semibold">₦28k</div></div><div className="rounded-lg bg-muted/40 p-2"><div className="text-xs text-muted-foreground">Rating</div><div className="font-semibold">4.9</div></div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
