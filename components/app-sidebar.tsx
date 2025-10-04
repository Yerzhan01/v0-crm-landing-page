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

interface AppSidebarProps {
  profile: any
}

export function AppSidebar({ profile }: AppSidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: "Главная", href: "/dashboard", icon: LayoutDashboard },
    { name: "Клиенты", href: "/dashboard/clients", icon: Users },
    { name: "Воронки", href: "/dashboard/funnels", icon: FolderKanban },
    { name: "Календарь", href: "/dashboard/calendar", icon: Calendar },
    { name: "Сообщения", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Каналы", href: "/dashboard/channels", icon: Send },
    { name: "Автоматизация", href: "/dashboard/automation", icon: Zap },
    { name: "Аналитика", href: "/dashboard/analytics", icon: TrendingUp },
    { name: "Настройки", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-card border-r flex flex-col">
      <div className="p-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          <span className="font-bold text-lg">ArzanCRM</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground">
          <div className="font-medium text-foreground mb-1">{profile?.tenants?.name}</div>
          <div>
            План:{" "}
            {profile?.tenants?.plan === "starter"
              ? "Стартовый"
              : profile?.tenants?.plan === "professional"
                ? "Профессиональный"
                : "Корпоративный"}
          </div>
          <div>Статус: {profile?.tenants?.status === "trial" ? "Пробный период" : "Активен"}</div>
        </div>
      </div>
    </aside>
  )
}
