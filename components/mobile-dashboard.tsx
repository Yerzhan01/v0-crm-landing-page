"use client"

import type React from "react"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { LanguageProvider } from "@/hooks/use-dashboard-translation"

interface MobileDashboardProps {
  user: any
  profile: any
  children: React.ReactNode
}

export function MobileDashboard({ user, profile, children }: MobileDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <LanguageProvider>
      <div className="flex h-screen flex-col md:flex-row">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <AppSidebar profile={profile} />
        </div>

        {/* Mobile Sidebar - Sheet/Drawer */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64 md:hidden">
            <AppSidebar profile={profile} onNavigate={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header with mobile menu button */}
          <AppHeader user={user} profile={profile} onMenuClick={() => setSidebarOpen(true)} />

          {/* Main content with proper mobile padding */}
          <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">{children}</main>
        </div>
      </div>
    </LanguageProvider>
  )
}
