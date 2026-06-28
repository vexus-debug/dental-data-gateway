import { X, Filter, CalendarClock, Stethoscope, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { applyDrill, type DrillFilter } from "@/lib/dashboard-drilldown";

function statusClass(status: string) {
  const map: Record<string, string> = {
    Paid: "bg-success/15 text-success border-success/20",
    Outstanding: "bg-warning/15 text-warning-foreground border-warning/30",
    Overdue: "bg-destructive/10 text-destructive border-destructive/20",
    "Pending Insurance": "bg-info/10 text-info border-info/20",
    Completed: "bg-success/15 text-success border-success/20",
    "In Progress": "bg-primary-soft text-accent-foreground border-primary/20",
    "In Treatment": "bg-primary-soft text-accent-foreground border-primary/20",
    Planned: "bg-info/10 text-info border-info/20",
    "Pending Approval": "bg-warning/15 text-warning-foreground border-warning/30",
    Scheduled: "bg-info/10 text-info border-info/20",
    "Checked In": "bg-success/15 text-success border-success/20",
    Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
    "No-show": "bg-destructive/10 text-destructive border-destructive/20",
  };
  return map[status] ?? "bg-muted text-muted-foreground border-border";
}

export function DrillDownPanel({
  filter,
  onClear,
}: {
  filter: DrillFilter;
  onClear: () => void;
}) {
  const { appointments, treatments, invoices } = applyDrill(filter);
  const totalDue = invoices
    .filter((i) => i.status !== "Paid")
    .reduce((s, i) => s + i.amount, 0);

  return (
    <section className="surface-card overflow-hidden border-primary/30 ring-1 ring-primary/15">
      <div className="flex flex-col gap-3 border-b border-border bg-primary-soft/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <Filter className="h-4 w-4 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Filtered by
            </p>
            <p className="truncate text-sm font-semibold text-foreground">
              {filter.label}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="rounded-full bg-card text-[11px]">
            {appointments.length} appointments
          </Badge>
          <Badge variant="outline" className="rounded-full bg-card text-[11px]">
            {treatments.length} treatments
          </Badge>
          <Badge variant="outline" className="rounded-full bg-card text-[11px]">
            {invoices.length} invoices · ${totalDue.toLocaleString()} due
          </Badge>
          <Button
            onClick={onClear}
            size="sm"
            variant="ghost"
            className="h-8 gap-1 rounded-full px-3 text-xs"
          >
            <X className="h-3.5 w-3.5" /> Clear
          </Button>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-3">
        <DrillList
          icon={CalendarClock}
          title="Appointments"
          empty="No matching appointments"
          items={appointments.map((a) => ({
            id: a.id,
            primary: `${a.time} · ${a.patient}`,
            secondary: `${a.treatment} · ${a.dentist}`,
            status: a.status,
          }))}
        />
        <DrillList
          icon={Stethoscope}
          title="Treatments"
          empty="No matching treatments"
          items={treatments.map((t) => ({
            id: t.id,
            primary: `${t.name}`,
            secondary: `${t.patient} · $${t.amount.toLocaleString()}`,
            status: t.status,
          }))}
        />
        <DrillList
          icon={Receipt}
          title="Invoices"
          empty="No matching invoices"
          items={invoices.map((i) => ({
            id: i.id,
            primary: `${i.id} · $${i.amount.toLocaleString()}`,
            secondary: `${i.patient} · ${i.date}`,
            status: i.status,
          }))}
        />
      </div>
    </section>
  );
}

function DrillList({
  icon: Icon,
  title,
  items,
  empty,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: { id: string; primary: string; secondary: string; status: string }[];
  empty: string;
}) {
  return (
    <div className="min-w-0 border-b border-border last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
      <div className="flex items-center gap-2 px-4 py-3 sm:px-5">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <span className="ml-auto text-[11px] text-muted-foreground">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <p className="px-4 pb-4 text-xs text-muted-foreground sm:px-5">{empty}</p>
      ) : (
        <ul className="max-h-[260px] divide-y divide-border overflow-y-auto">
          {items.map((it) => (
            <li key={it.id} className="flex items-start gap-3 px-4 py-2.5 hover:bg-muted/30 sm:px-5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">{it.primary}</p>
                <p className="truncate text-[11px] text-muted-foreground">{it.secondary}</p>
              </div>
              <Badge
                variant="outline"
                className={`shrink-0 rounded-full text-[10px] ${statusClass(it.status)}`}
              >
                {it.status}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
