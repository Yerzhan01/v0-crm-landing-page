"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, LogOut, User, Menu, Languages } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useDashboardTranslation } from "@/hooks/use-dashboard-translation"

interface AppHeaderProps {
  user: any
  profile: any
  onMenuClick?: () => void
}

export function AppHeader({ user, profile, onMenuClick }: AppHeaderProps) {
  const router = useRouter()
  const supabase = createClient()
  const { lang, changeLang, t } = useDashboardTranslation()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  const initials =
    profile?.full_name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || "U"

  return (
    <header className="h-14 md:h-16 border-b bg-card flex items-center justify-between px-4 md:px-6 flex-shrink-0">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden h-9 w-9" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>

        <h2 className="text-base md:text-lg font-semibold">ArzanCRM</h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10">
              <Languages className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeLang("ru")} className={lang === "ru" ? "bg-accent" : ""}>
              Русский
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLang("kk")} className={lang === "kk" ? "bg-accent" : ""}>
              Қазақша
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10">
          <Bell className="h-4 w-4 md:h-5 md:w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 md:h-10 md:w-10 rounded-full">
              <Avatar className="h-9 w-9 md:h-10 md:w-10">
                <AvatarFallback className="text-xs md:text-sm">{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium truncate">{profile?.full_name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              {t.profile || "Профиль"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              {t.logout || "Выйти"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
