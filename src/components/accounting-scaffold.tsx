import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Kpi = { label: string; value: string; tone?: "default" | "success" | "warning" | "destructive" | "info" };
export type Column = { key: string; header: string; align?: "left" | "right" | "center"; className?: string };
export type Row = Record<string, ReactNode>;
export type LinkedModule = { label: string; to: string; description?: string };

const toneCls: Record<NonNullable<Kpi["tone"]>, string> = {
  default: "text-foreground",
  success: "text-success",
  warning: "text-warning-foreground",
  destructive: "text-destructive",
  info: "text-info",
};

export function AccountingScaffold({
  title,
  description,
  actions,
  kpis,
  columns,
  rows,
  linked,
  footer,
  children,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
  kpis?: Kpi[];
  columns?: Column[];
  rows?: Row[];
  linked?: LinkedModule[];
  footer?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>

      {kpis && kpis.length > 0 && (
        <div className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-${Math.min(kpis.length, 4)}`}>
          {kpis.map((k) => (
            <div key={k.label} className="surface-card p-4">
              <div className="text-xs text-muted-foreground">{k.label}</div>
              <div className={`mt-1 text-2xl font-semibold ${toneCls[k.tone ?? "default"]}`}>{k.value}</div>
            </div>
          ))}
        </div>
      )}

      {columns && rows && (
        <div className="surface-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  {columns.map((c) => (
                    <th key={c.key} className={`px-4 py-2 ${c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : ""} ${c.className ?? ""}`}>
                      {c.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-border/60 hover:bg-muted/30">
                    {columns.map((c) => (
                      <td key={c.key} className={`px-4 py-3 ${c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : ""} ${c.className ?? ""}`}>
                        {r[c.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {footer}
        </div>
      )}

      {children}

      {linked && linked.length > 0 && (
        <div className="surface-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-semibold">Connected modules</h2>
            <Badge variant="outline" className="text-[10px]">Interlinked</Badge>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {linked.map((l) => (
              <Button key={l.to} asChild variant="outline" className="h-auto justify-between gap-2 px-3 py-2 text-left">
                <Link to={l.to}>
                  <div className="min-w-0">
                    <div className="text-sm font-medium">{l.label}</div>
                    {l.description && <div className="text-[11px] text-muted-foreground">{l.description}</div>}
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const cls = s.includes("paid") || s.includes("posted") || s.includes("active") || s.includes("reconciled") || s.includes("approved")
    ? "bg-success/15 text-success border-success/20"
    : s.includes("overdue") || s.includes("rejected") || s.includes("unreconciled")
    ? "bg-destructive/10 text-destructive border-destructive/20"
    : s.includes("partial") || s.includes("pending") || s.includes("draft")
    ? "bg-warning/15 text-warning-foreground border-warning/20"
    : "bg-info/15 text-info border-info/20";
  return <Badge variant="outline" className={cls}>{status}</Badge>;
}
