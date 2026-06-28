import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Users, UserPlus, Search, Filter, Phone, Mail, CalendarDays, FileText,
  Receipt, AlertCircle, Cake, MapPin, ShieldCheck, ClipboardList, X, MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/clinic/patients")({
  head: () => ({ meta: [{ title: "Patients — Dentallogue" }] }),
  component: PatientsPage,
});

type Patient = {
  id: string; name: string; initials: string; age: number; gender: "M" | "F";
  phone: string; email: string; lastVisit: string; nextVisit: string | null;
  balance: number; status: "Active" | "Inactive" | "New"; insurance: string;
  allergies: string[]; address: string; tags: string[];
};

const patients: Patient[] = [
  { id: "P-1042", name: "Michael Johnson", initials: "MJ", age: 34, gender: "M", phone: "+1 555-0142", email: "mjohnson@mail.com", lastVisit: "2026-06-10", nextVisit: "2026-07-02", balance: 240, status: "Active", insurance: "Delta Dental", allergies: ["Penicillin"], address: "12 Oak Ave, Chicago", tags: ["VIP"] },
  { id: "P-1043", name: "Sarah Williams", initials: "SW", age: 28, gender: "F", phone: "+1 555-0188", email: "sarah.w@mail.com", lastVisit: "2026-06-22", nextVisit: "2026-06-29", balance: 0, status: "Active", insurance: "Aetna", allergies: [], address: "88 Pine St, Chicago", tags: [] },
  { id: "P-1044", name: "David Brown", initials: "DB", age: 45, gender: "M", phone: "+1 555-0199", email: "dbrown@mail.com", lastVisit: "2026-05-30", nextVisit: null, balance: 1200, status: "Active", insurance: "Cigna", allergies: ["Latex"], address: "5 Maple Rd, Evanston", tags: ["Overdue"] },
  { id: "P-1045", name: "Emma Wilson", initials: "EW", age: 31, gender: "F", phone: "+1 555-0211", email: "emma.w@mail.com", lastVisit: "2026-06-25", nextVisit: "2026-07-05", balance: 0, status: "Active", insurance: "BlueCross", allergies: [], address: "203 Lake Dr, Chicago", tags: ["Birthday"] },
  { id: "P-1046", name: "James Taylor", initials: "JT", age: 52, gender: "M", phone: "+1 555-0234", email: "jtaylor@mail.com", lastVisit: "2026-04-18", nextVisit: null, balance: 580, status: "Inactive", insurance: "Self-Pay", allergies: ["Sulfa"], address: "44 Elm St, Skokie", tags: [] },
  { id: "P-1047", name: "Olivia Martin", initials: "OM", age: 22, gender: "F", phone: "+1 555-0256", email: "olivia.m@mail.com", lastVisit: "2026-06-26", nextVisit: "2026-07-10", balance: 0, status: "New", insurance: "Aetna", allergies: [], address: "9 Birch Ln, Chicago", tags: ["New"] },
];

function statusColor(s: Patient["status"]) {
  return s === "Active" ? "bg-success/15 text-success border-success/20"
    : s === "New" ? "bg-info/15 text-info border-info/20"
    : "bg-muted text-muted-foreground border-border";
}

function PatientsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [selected, setSelected] = useState<Patient | null>(null);
  const [openNew, setOpenNew] = useState(false);

  const filtered = patients.filter(p =>
    (status === "all" || p.status.toLowerCase() === status) &&
    (p.name.toLowerCase().includes(query.toLowerCase()) || p.id.includes(query) || p.phone.includes(query))
  );

  const stats = [
    { label: "Total Patients", value: "1,248", icon: Users, tone: "bg-primary-soft text-accent-foreground" },
    { label: "New This Month", value: "42", icon: UserPlus, tone: "bg-info/10 text-info" },
    { label: "With Outstanding", value: "78", icon: AlertCircle, tone: "bg-warning/15 text-warning-foreground" },
    { label: "Birthdays This Week", value: "9", icon: Cake, tone: "bg-success/15 text-success" },
  ];

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Patients</h1>
          <p className="mt-1 text-sm text-muted-foreground">Search, view, and manage every patient in one workspace.</p>
        </div>
        <Dialog open={openNew} onOpenChange={setOpenNew}>
          <DialogTrigger asChild>
            <Button className="gap-2"><UserPlus className="h-4 w-4" />New Patient</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Register new patient</DialogTitle></DialogHeader>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>Full name</Label><Input placeholder="Jane Doe" /></div>
              <div><Label>Date of birth</Label><Input type="date" /></div>
              <div><Label>Phone</Label><Input placeholder="+1 ..." /></div>
              <div><Label>Email</Label><Input type="email" placeholder="email@..." /></div>
              <div className="sm:col-span-2"><Label>Address</Label><Input /></div>
              <div><Label>Insurance</Label><Input placeholder="Provider" /></div>
              <div><Label>Allergies</Label><Input placeholder="Comma separated" /></div>
              <div className="sm:col-span-2"><Label>Notes</Label><Textarea rows={3} /></div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpenNew(false)}>Cancel</Button>
              <Button onClick={() => setOpenNew(false)}>Create patient</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="surface-card flex items-center gap-3 p-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tone}`}><s.icon className="h-5 w-5" /></div>
            <div><div className="text-xs text-muted-foreground">{s.label}</div><div className="text-lg font-semibold">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className={`grid gap-4 ${selected ? "lg:grid-cols-[1fr_380px]" : ""}`}>
        <div className="surface-card overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, ID, or phone" className="pl-9" />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                <tr><th className="px-4 py-2.5">Patient</th><th className="px-4 py-2.5">Contact</th><th className="px-4 py-2.5">Last Visit</th><th className="px-4 py-2.5">Next</th><th className="px-4 py-2.5">Balance</th><th className="px-4 py-2.5">Status</th><th className="px-4 py-2.5"></th></tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} onClick={() => setSelected(p)} className={`cursor-pointer border-t border-border/60 hover:bg-muted/30 ${selected?.id === p.id ? "bg-primary-soft/40" : ""}`}>
                    <td className="px-4 py-3"><div className="flex items-center gap-3"><Avatar className="h-9 w-9"><AvatarFallback>{p.initials}</AvatarFallback></Avatar><div><div className="font-medium">{p.name}</div><div className="text-xs text-muted-foreground">{p.id} · {p.age}{p.gender}</div></div></div></td>
                    <td className="px-4 py-3 text-xs"><div>{p.phone}</div><div className="text-muted-foreground">{p.email}</div></td>
                    <td className="px-4 py-3 text-xs">{p.lastVisit}</td>
                    <td className="px-4 py-3 text-xs">{p.nextVisit ?? "—"}</td>
                    <td className="px-4 py-3"><span className={p.balance > 0 ? "font-medium text-warning-foreground" : "text-muted-foreground"}>₦{p.balance}</span></td>
                    <td className="px-4 py-3"><Badge variant="outline" className={statusColor(p.status)}>{p.status}</Badge></td>
                    <td className="px-4 py-3"><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
            <span>Showing {filtered.length} of {patients.length}</span>
            <div className="flex gap-1"><Button variant="ghost" size="sm">Previous</Button><Button variant="ghost" size="sm">Next</Button></div>
          </div>
        </div>

        {selected && (
          <aside className="surface-card flex flex-col">
            <div className="flex items-start justify-between border-b border-border p-4">
              <div className="flex items-center gap-3"><Avatar className="h-12 w-12"><AvatarFallback>{selected.initials}</AvatarFallback></Avatar><div><div className="font-semibold">{selected.name}</div><div className="text-xs text-muted-foreground">{selected.id} · {selected.age}{selected.gender}</div></div></div>
              <Button variant="ghost" size="icon" onClick={() => setSelected(null)}><X className="h-4 w-4" /></Button>
            </div>
            <Tabs defaultValue="overview" className="flex-1">
              <TabsList className="m-3 grid grid-cols-4"><TabsTrigger value="overview">Info</TabsTrigger><TabsTrigger value="visits">Visits</TabsTrigger><TabsTrigger value="treatments">Plans</TabsTrigger><TabsTrigger value="finance">Finance</TabsTrigger></TabsList>
              <TabsContent value="overview" className="space-y-3 px-4 pb-4 text-sm">
                <div className="flex items-center gap-2 text-xs"><Phone className="h-3.5 w-3.5 text-muted-foreground" />{selected.phone}</div>
                <div className="flex items-center gap-2 text-xs"><Mail className="h-3.5 w-3.5 text-muted-foreground" />{selected.email}</div>
                <div className="flex items-center gap-2 text-xs"><MapPin className="h-3.5 w-3.5 text-muted-foreground" />{selected.address}</div>
                <div className="flex items-center gap-2 text-xs"><ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />{selected.insurance}</div>
                <div><div className="mb-1 text-xs text-muted-foreground">Allergies</div>{selected.allergies.length ? selected.allergies.map(a => <Badge key={a} variant="outline" className="mr-1 bg-destructive/10 text-destructive">{a}</Badge>) : <span className="text-xs">None</span>}</div>
                <div className="flex gap-2 pt-2"><Button size="sm" className="flex-1 gap-1"><CalendarDays className="h-3.5 w-3.5" />Book</Button><Button size="sm" variant="outline" className="flex-1 gap-1"><FileText className="h-3.5 w-3.5" />Chart</Button></div>
              </TabsContent>
              <TabsContent value="visits" className="space-y-2 px-4 pb-4 text-sm">
                <div className="rounded-lg border border-border p-3"><div className="text-xs text-muted-foreground">2026-06-22</div><div className="font-medium">Dental Cleaning</div><div className="text-xs">Dr. John Doe · Completed</div></div>
                <div className="rounded-lg border border-border p-3"><div className="text-xs text-muted-foreground">2026-05-04</div><div className="font-medium">Check-up</div><div className="text-xs">Dr. Smith · Completed</div></div>
              </TabsContent>
              <TabsContent value="treatments" className="space-y-2 px-4 pb-4 text-sm">
                <div className="rounded-lg border border-border p-3"><div className="flex items-center gap-2"><ClipboardList className="h-4 w-4 text-info" /><span className="font-medium">Full restoration plan</span></div><div className="mt-1 text-xs text-muted-foreground">3 of 7 steps · ₦2,400 of ₦5,800</div></div>
              </TabsContent>
              <TabsContent value="finance" className="space-y-2 px-4 pb-4 text-sm">
                <div className="rounded-lg border border-border p-3"><div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">Outstanding</span><Receipt className="h-4 w-4 text-muted-foreground" /></div><div className="mt-1 text-lg font-semibold">₦{selected.balance}</div></div>
                <Button size="sm" className="w-full">Send invoice</Button>
              </TabsContent>
            </Tabs>
          </aside>
        )}
      </div>
    </div>
  );
}
