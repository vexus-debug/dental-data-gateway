import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Wallet,
  LifeBuoy,
  Boxes,
  LayoutTemplate,
  Bell,
  BarChart3,
  ScrollText,
  Settings,
  ShieldCheck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import dentallogueLogo from "@/assets/dentallogue-logo.png.asset.json";


type NavItem = { title: string; url: string; icon: React.ComponentType<{ className?: string }> };

const items: NavItem[] = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Clients", url: "/admin/clients", icon: Building2 },
  { title: "Subscriptions", url: "/admin/subscriptions", icon: CreditCard },
  { title: "Payments", url: "/admin/payments", icon: Wallet },
  { title: "Support", url: "/admin/support", icon: LifeBuoy },
  { title: "Products", url: "/admin/products", icon: Boxes },
  { title: "Website Templates", url: "/admin/templates", icon: LayoutTemplate },
  { title: "Notifications", url: "/admin/notifications", icon: Bell },
  { title: "Reports", url: "/admin/reports", icon: BarChart3 },
  { title: "Activity Logs", url: "/admin/activity", icon: ScrollText },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link
          to="/admin"
          className="flex items-center gap-2.5 px-2 py-2 group-data-[collapsible=icon]:justify-center"
        >
          <img
            src={dentallogueLogo.url}
            alt="Dentallogue"
            className="h-8 w-auto group-data-[collapsible=icon]:hidden"
          />
          <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-foreground text-background shadow-sm group-data-[collapsible=icon]:flex">
            <ShieldCheck className="h-5 w-5" />
          </div>

        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active =
                  item.url === "/admin"
                    ? pathname === "/admin" || pathname === "/admin/"
                    : pathname === item.url || pathname.startsWith(item.url + "/");
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      onClick={handleNavClick}
                      className="data-[active=true]:bg-primary-soft data-[active=true]:text-accent-foreground data-[active=true]:font-medium"
                    >
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3 group-data-[collapsible=icon]:hidden">
        <div className="rounded-xl bg-muted/60 p-3">
          <p className="text-xs font-semibold text-foreground">Platform status</p>
          <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
            All systems operational.
          </p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}