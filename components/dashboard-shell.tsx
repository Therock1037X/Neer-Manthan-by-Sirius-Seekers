"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Droplets,
  LayoutDashboard,
  CloudRain,
  Truck,
  BarChart3,
  AlertTriangle,
  MapPin,
  LogOut,
  Menu,
  Settings,
  Bell,
  ChevronDown,
  Activity,
  Users,
  Package,
  Route,
  ShieldCheck,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  badge?: string
}

const navItems: Record<UserRole, NavItem[]> = {
  public: [
    { title: "Dashboard", href: "/dashboard/public", icon: LayoutDashboard },
    { title: "Water Levels", href: "/dashboard/water-levels", icon: Droplets },
    { title: "Drought Alerts", href: "/dashboard/drought-prediction", icon: CloudRain },
    { title: "Order Tanker", href: "/dashboard/tanker-order", icon: Truck },
  ],
  government: [
    { title: "Overview", href: "/dashboard/government", icon: LayoutDashboard },
    { title: "Water Monitoring", href: "/dashboard/water-levels", icon: Droplets, badge: "Live" },
    { title: "Drought Prediction", href: "/dashboard/drought-prediction", icon: CloudRain },
    { title: "Tanker Management", href: "/dashboard/tanker-order", icon: Truck, badge: "8" },
    { title: "Analytics", href: "/dashboard/government#analytics", icon: BarChart3 },
    { title: "Alerts", href: "/dashboard/government#alerts", icon: AlertTriangle, badge: "3" },
  ],
  dealer: [
    { title: "Dashboard", href: "/dashboard/dealer", icon: LayoutDashboard },
    { title: "Incoming Orders", href: "/dashboard/dealer#orders", icon: Package, badge: "5" },
    { title: "Route Planning", href: "/dashboard/dealer#routes", icon: Route },
    { title: "Dispatch Status", href: "/dashboard/dealer#dispatch", icon: Truck },
  ],
}

const roleLabels: Record<UserRole, string> = {
  public: "Public User",
  government: "Government Authority",
  dealer: "Tanker Dealer",
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { role, userName, logout } = useAuth()

  if (!role) return null

  const items = navItems[role]

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <Droplets className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight">Neer Manthan</span>
          <span className="text-[11px] text-sidebar-foreground/60">AI Water Management</span>
        </div>
      </div>

      {/* Role badge */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 rounded-md bg-sidebar-accent px-3 py-2">
          <ShieldCheck className="h-3.5 w-3.5 text-sidebar-primary" />
          <span className="text-xs font-medium">{roleLabels[role]}</span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          <p className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
            Navigation
          </p>
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href.split("#")[0] + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <Badge
                    variant={isActive ? "secondary" : "outline"}
                    className={cn(
                      "h-5 min-w-5 justify-center px-1.5 text-[10px]",
                      isActive
                        ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground border-0"
                        : "border-sidebar-border text-sidebar-foreground/60"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </div>
      </ScrollArea>

      {/* Bottom user section */}
      <div className="border-t border-sidebar-border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-sidebar-accent transition-colors">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-1 flex-col items-start">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-[11px] text-sidebar-foreground/60">{roleLabels[role]}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-sidebar-foreground/40" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { role, userName } = useAuth()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border lg:block">
        <SidebarContent />
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent onNavigate={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>
            <div className="hidden items-center gap-2 lg:flex">
              <Activity className="h-4 w-4 text-success" />
              <span className="text-xs font-medium text-muted-foreground">System Online</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>
            <div className="hidden items-center gap-2 rounded-md bg-secondary px-3 py-1.5 md:flex">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-secondary-foreground">India</span>
            </div>
            <div className="hidden items-center gap-2 md:flex lg:hidden">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
