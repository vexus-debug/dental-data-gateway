import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Plus, Megaphone, Bell } from "lucide-react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AdminSidebar />
        <SidebarInset className="flex min-w-0 flex-1 flex-col bg-background">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b border-border bg-background/80 px-3 backdrop-blur sm:px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="relative ml-1 hidden max-w-md flex-1 sm:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search clinics..."
                className="h-9 rounded-full bg-muted/50 pl-8 text-sm"
              />
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <Button size="sm" className="h-9 gap-1.5 rounded-full">
                <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Create Clinic</span>
              </Button>
              <Button size="sm" variant="outline" className="h-9 gap-1.5 rounded-full">
                <Megaphone className="h-4 w-4" /> <span className="hidden md:inline">Broadcast</span>
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                <Bell className="h-4 w-4" />
              </Button>
              <Link to="/" className="ml-1">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-foreground text-[11px] font-semibold text-background">
                    SA
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </header>
          <main className="min-w-0 flex-1 overflow-x-hidden px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}