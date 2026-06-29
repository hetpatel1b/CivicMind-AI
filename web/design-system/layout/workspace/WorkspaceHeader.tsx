"use client"

import React from "react"
import { Menu } from "lucide-react"
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs"
import { GlobalSearch } from "./GlobalSearch"
import { NotificationDropdown } from "./NotificationDropdown"
import { UserMenu, UserMenuProps } from "./UserMenu"

export interface WorkspaceHeaderProps {
  breadcrumbs: BreadcrumbItem[]
  user: UserMenuProps["user"]
  onMobileMenuToggle: () => void
}

export const WorkspaceHeader = ({ breadcrumbs, user, onMobileMenuToggle }: WorkspaceHeaderProps) => {
  const [activeOverlay, setActiveOverlay] = React.useState<'search' | 'notifications' | 'profile' | null>(null)

  // Listen for global Cmd+K to close other overlays if search opens via keyboard
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        setActiveOverlay(prev => prev === 'search' ? null : 'search')
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0a0f1c]/70 backdrop-blur-3xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none active:scale-95"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="hidden md:block">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* AI Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black uppercase tracking-widest text-indigo-400">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            AI Active
          </div>

          <GlobalSearch 
            isOpen={activeOverlay === 'search'} 
            onToggle={() => setActiveOverlay(activeOverlay === 'search' ? null : 'search')}
            onClose={() => setActiveOverlay(null)}
          />
          
          <div className="flex items-center pl-3 sm:pl-5 space-x-3 border-l border-white/10 relative">
            <NotificationDropdown 
              isOpen={activeOverlay === 'notifications'} 
              onToggle={() => setActiveOverlay(activeOverlay === 'notifications' ? null : 'notifications')}
              onClose={() => setActiveOverlay(null)}
            />
            <UserMenu 
              user={user} 
              isOpen={activeOverlay === 'profile'} 
              onToggle={() => setActiveOverlay(activeOverlay === 'profile' ? null : 'profile')}
              onClose={() => setActiveOverlay(null)}
            />
          </div>
        </div>
      </div>
      
      {/* Animated bottom border glow */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
    </header>
  )
}
