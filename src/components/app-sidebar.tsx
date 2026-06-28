import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  ListChecks,
  Stethoscope,
  ClipboardList,
  FileText,
  ScanLine,
  FlaskConical,
  Receipt,
  ShieldCheck,
  Package,
  UserCog,
  Folder,
  FileSignature,
  Globe,
  Smartphone,
  MessageSquare,
  Megaphone,
  BarChart3,
  TrendingUp,
  Settings,
  KeyRound,
  CreditCard,
  Activity,
  Calculator,
  ChevronRight,
  BookOpen,
  NotebookPen,
  ScrollText,
  ArrowDownToLine,
  ArrowUpFromLine,
  Wallet,
  Landmark,
  HandCoins,
  PiggyBank,
  Building2,
  FileBarChart,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import dentallogueLogo from "@/assets/dentallogue-logo.png.asset.json";


type NavItem = { title: string; url: string; icon: React.ComponentType<{ className?: string }> };
type NavGroup = { label: string; items: NavItem[] };

const accountingItems: NavItem[] = [
  { title: "Overview", url: "/clinic/accounting", icon: LayoutDashboard },
  { title: "Chart of Accounts", url: "/clinic/accounting/chart-of-accounts", icon: BookOpen },
  { title: "Journal Entries", url: "/clinic/accounting/journal", icon: NotebookPen },
  { title: "General Ledger", url: "/clinic/accounting/ledger", icon: ScrollText },
  { title: "Receivables", url: "/clinic/accounting/receivables", icon: ArrowDownToLine },
  { title: "Payables", url: "/clinic/accounting/payables", icon: ArrowUpFromLine },
  { title: "Expenses", url: "/clinic/accounting/expenses", icon: Wallet },
  { title: "Bank & Cash", url: "/clinic/accounting/bank", icon: Landmark },
  { title: "Payroll", url: "/clinic/accounting/payroll", icon: HandCoins },
  { title: "Tax & Compliance", url: "/clinic/accounting/tax", icon: ShieldCheck },
  { title: "Budgets", url: "/clinic/accounting/budgets", icon: PiggyBank },
  { title: "Fixed Assets", url: "/clinic/accounting/fixed-assets", icon: Building2 },
  { title: "Reports", url: "/clinic/accounting/reports", icon: FileBarChart },
];

const groups: NavGroup[] = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", url: "/clinic", icon: LayoutDashboard }],
  },
  {
    label: "Patients",
    items: [
      { title: "Patients", url: "/clinic/patients", icon: Users },
      { title: "Appointments", url: "/clinic/appointments", icon: CalendarDays },
      { title: "Queue", url: "/clinic/queue", icon: ListChecks },
    ],
  },
  {
    label: "Clinical",
    items: [
      { title: "Dental Chart", url: "/clinic/dental-chart", icon: Stethoscope },
      { title: "Treatment Plans", url: "/clinic/treatment-plans", icon: ClipboardList },
      { title: "Clinical Records", url: "/clinic/clinical-records", icon: FileText },
      { title: "Imaging", url: "/clinic/imaging", icon: ScanLine },
      { title: "Laboratory", url: "/clinic/laboratory", icon: FlaskConical },
    ],
  },
  {
    label: "Finance",
    items: [
      { title: "Billing", url: "/clinic/billing", icon: Receipt },
      { title: "Insurance", url: "/clinic/insurance", icon: ShieldCheck },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Inventory", url: "/clinic/inventory", icon: Package },
      { title: "Staff", url: "/clinic/staff", icon: UserCog },
      { title: "Documents", url: "/clinic/documents", icon: Folder },
      { title: "Consent Forms", url: "/clinic/consent-forms", icon: FileSignature },
    ],
  },
  {
    label: "Growth",
    items: [
      { title: "Website", url: "/clinic/website", icon: Globe },
      { title: "Patient Portal", url: "/clinic/patient-portal", icon: Smartphone },
      { title: "Communication", url: "/clinic/communication", icon: MessageSquare },
      { title: "Marketing", url: "/clinic/marketing", icon: Megaphone },
    ],
  },
  {
    label: "Insights",
    items: [
      { title: "Reports", url: "/clinic/reports", icon: BarChart3 },
      { title: "Analytics", url: "/clinic/analytics", icon: TrendingUp },
    ],
  },
  {
    label: "Settings",
    items: [
      { title: "Clinic Settings", url: "/clinic/settings", icon: Settings },
      { title: "Users & Roles", url: "/clinic/users", icon: KeyRound },
      { title: "Subscription", url: "/clinic/subscription", icon: CreditCard },
    ],
  },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link
          to="/clinic"
          className="flex items-center gap-2.5 px-2 py-2 group-data-[collapsible=icon]:justify-center"
        >
          <img
            src={dentallogueLogo.url}
            alt="Dentallogue"
            className="h-8 w-auto group-data-[collapsible=icon]:hidden"
          />
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm group-data-[collapsible=icon]:flex hidden">
            <Activity className="h-5 w-5" />
          </div>
        </Link>
      </SidebarHeader>


      <SidebarContent className="gap-0">
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/80">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active =
                    item.url === "/clinic"
                      ? pathname === "/clinic" || pathname === "/clinic/"
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
                {group.label === "Finance" && (
                  <Collapsible defaultOpen={pathname.startsWith("/clinic/accounting")} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip="Accounting"
                          isActive={pathname.startsWith("/clinic/accounting")}
                          className="data-[active=true]:bg-primary-soft data-[active=true]:text-accent-foreground data-[active=true]:font-medium"
                        >
                          <Calculator className="h-4 w-4" />
                          <span>Accounting</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {accountingItems.map((sub) => {
                            const subActive =
                              sub.url === "/clinic/accounting"
                                ? pathname === "/clinic/accounting" || pathname === "/clinic/accounting/"
                                : pathname === sub.url || pathname.startsWith(sub.url + "/");
                            return (
                              <SidebarMenuSubItem key={sub.url}>
                                <SidebarMenuSubButton asChild isActive={subActive} onClick={handleNavClick}>
                                  <Link to={sub.url}>
                                    <sub.icon className="h-4 w-4" />
                                    <span>{sub.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>


      <SidebarFooter className="border-t border-sidebar-border p-3 group-data-[collapsible=icon]:hidden">
        <div className="rounded-xl bg-primary-soft/60 p-3">
          <p className="text-xs font-semibold text-accent-foreground">Need help?</p>
          <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
            Chat with support or browse docs.
          </p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
