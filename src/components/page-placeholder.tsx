import type { ReactNode } from "react";
import { Construction } from "lucide-react";

export function PagePlaceholder({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>

      <div className="surface-card flex min-h-[300px] flex-col items-center justify-center gap-3 p-6 text-center sm:min-h-[360px] sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-accent-foreground">
          <Construction className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-foreground">Module preview</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          This section is part of the Dentallogue architecture. Content for {title} lives here —
          tables, forms, and detail views will plug into the same sleek layout.
        </p>
        {children}
      </div>
    </div>
  );
}
