"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Calendar,
  TrendingUp,
  MessageSquare,
  Settings,
  Building2,
  FolderKanban,
  Zap,
  Send,
} from "lucide-react"
import { useDashboardTranslation } from "@/hooks/use-dashboard-translation"

interface AppSidebarProps {
  profile: any
  onNavigate?: () => void
}

export function AppSidebar({ profile, onNavigate }: AppSidebarProps) {
  const pathname = usePathname()
  const { t } = useDashboardTranslation()

  const navigation = [
    { name: t.sidebar.dashboard, href: "/dashboard", icon: LayoutDashboard },
    { name: t.sidebar.clients, href: "/dashboard/clients", icon: Users },
    { name: t.sidebar.funnels, href: "/dashboard/funnels", icon: FolderKanban },
    { name: t.sidebar.calendar, href: "/dashboard/calendar", icon: Calendar },
    { name: t.sidebar.messages, href: "/dashboard/messages", icon: MessageSquare },
    { name: t.sidebar.channels, href: "/dashboard/channels", icon: Send },
    { name: t.sidebar.automation, href: "/dashboard/automation", icon: Zap },
    { name: t.sidebar.analytics, href: "/dashboard/analytics", icon: TrendingUp },
    { name: t.sidebar.settings, href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-card border-r flex flex-col h-full">
      <div className="p-4 md:p-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={onNavigate}>
          <Building2 className="h-6 w-6" />
          <span className="font-bold text-lg">{t.crmSystem}</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 md:p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-3 md:py-2 rounded-lg text-sm font-medium transition-colors touch-manipulation",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted",
              )}
            >
              <Icon className="h-5 w-5 md:h-4 md:w-4 flex-shrink-0" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 md:p-4 border-t">
        <div className="text-xs text-muted-foreground">
          <div className="font-medium text-foreground mb-1 truncate">{profile?.tenants?.name}</div>
          <div className="truncate">
            {t.plan}:{" "}
            {profile?.tenants?.plan === "starter"
              ? t.starterPlan
              : profile?.tenants?.plan === "professional"
                ? t.professionalPlan
                : t.enterprisePlan}
          </div>
          <div>
            {t.status}: {profile?.tenants?.status === "trial" ? t.trialStatus : t.activeStatus}
          </div>
        </div>
      </div>
    </aside>
  )
}
