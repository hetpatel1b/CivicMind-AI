"use client"

import React, { useState, useEffect } from "react"
import { WorkspaceSidebar } from "./WorkspaceSidebar"
import { WorkspaceHeader } from "./WorkspaceHeader"
import { NavGroup } from "./types"
import { BreadcrumbItem } from "./Breadcrumbs"
import { UserMenuProps } from "./UserMenu"

export interface WorkspaceShellProps {
  children: React.ReactNode
  navGroups: NavGroup[]
  breadcrumbs: BreadcrumbItem[]
  user: UserMenuProps["user"]
  activeHref?: string
}

export const WorkspaceShell = ({ children, navGroups, breadcrumbs, user, activeHref }: WorkspaceShellProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && !isSidebarCollapsed) {
        setIsSidebarCollapsed(true)
      } else if (window.innerWidth >= 1024 && isSidebarCollapsed) {
        setIsSidebarCollapsed(false)
      }
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [isSidebarCollapsed])

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden relative">
      {/* Absolute Ultimate Ambient OS Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0a0a]">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0a0f1c] to-transparent opacity-80" />
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-purple-500/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <WorkspaceSidebar
        groups={navGroups}
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
        activeHref={activeHref}
      />

      <div
        className="flex-1 flex flex-col min-w-0 transition-[margin-left] duration-300 ease-in-out md:!ml-[var(--sidebar-width)] overflow-hidden relative z-10"
        style={{"--sidebar-width": isSidebarCollapsed ? "80px" : "260px"} as React.CSSProperties}
      >
        <WorkspaceHeader
          breadcrumbs={breadcrumbs}
          user={user}
          onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto relative z-content scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  )
}
