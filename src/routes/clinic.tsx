import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/clinic")({
  component: ClinicLayout,
});

function ClinicLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}