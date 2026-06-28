import { Bell, Plus, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 min-w-0 items-center gap-2 border-b border-border bg-background/85 px-3 backdrop-blur-md sm:gap-3 sm:px-4 md:px-6">
      <SidebarTrigger className="-ml-1 shrink-0" />

      <div className="relative hidden min-w-0 flex-1 max-w-xl md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search patients, appointments, invoices..."
          className="h-10 w-full rounded-full border-border bg-muted/60 pl-9 text-sm shadow-none focus-visible:bg-card"
        />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="ml-auto h-10 w-10 shrink-0 rounded-full md:hidden"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-1.5 sm:gap-2 md:ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-10 shrink-0 gap-2 rounded-full px-3 shadow-sm sm:px-4">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Quick Add</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Create new</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New Patient</DropdownMenuItem>
            <DropdownMenuItem>New Appointment</DropdownMenuItem>
            <DropdownMenuItem>New Invoice</DropdownMenuItem>
            <DropdownMenuItem>Treatment Plan</DropdownMenuItem>
            <DropdownMenuItem>Upload X-ray</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 shrink-0 rounded-full"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
            6
          </span>
        </Button>

        <div className="ml-0.5 flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-card py-1 pl-1 sm:ml-1 sm:pr-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-left leading-tight sm:block">
            <p className="text-xs font-semibold text-foreground">Dr. John Doe</p>
            <p className="text-[10px] text-muted-foreground">Main Clinic</p>
          </div>
        </div>
      </div>
    </header>
  );
}
