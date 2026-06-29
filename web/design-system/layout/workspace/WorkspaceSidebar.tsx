"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { PanelLeftClose, PanelLeftOpen, Shield } from "lucide-react"
import { NavGroup } from "./types"
import { cn } from "../../utilities/cn"

export interface WorkspaceSidebarProps {
  groups: NavGroup[]
  isCollapsed: boolean
  onToggle: () => void
  isMobileOpen: boolean
  onMobileClose: () => void
  activeHref?: string
}

export const WorkspaceSidebar = ({
  groups,
  isCollapsed,
  onToggle,
  isMobileOpen,
  onMobileClose,
  activeHref,
}: WorkspaceSidebarProps) => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0a0f1c]/60 backdrop-blur-3xl border-r border-white/5 shadow-[20px_0_40px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/5">
        <Link href="/" className={cn("flex items-center space-x-3 overflow-hidden", isCollapsed ? "justify-center" : "")}>
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.2)] group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all duration-300">
            <Shield className="w-4 h-4 text-indigo-400" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-extrabold text-white tracking-tight whitespace-nowrap overflow-hidden"
              >
                CivicMind AI
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 scrollbar-hide">
        {groups.map((group) => (
          <div key={group.label} className="mb-8 px-3">
            <AnimatePresence>
              {!isCollapsed && (
                <motion.h4 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] whitespace-nowrap overflow-hidden"
                >
                  {group.label}
                </motion.h4>
              )}
            </AnimatePresence>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = activeHref 
                  ? (activeHref === item.href || activeHref.startsWith(`${item.href}/`))
                  : (pathname === item.href || pathname?.startsWith(`${item.href}/`))
                const Icon = item.icon
                return (
                  <li key={item.name}>
                    <Link
                      href={item.disabled ? "#" : item.href}
                      className={cn(
                        "group relative flex items-center h-10 px-4 rounded-xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 overflow-hidden",
                        isCollapsed ? "justify-center" : "space-x-3",
                        item.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                        isActive
                          ? "text-white font-bold bg-white/10 border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                          : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                      )}
                      title={isCollapsed ? item.name : undefined}
                      onClick={(e) => {
                        if (item.onClick && !item.disabled) {
                          e.preventDefault()
                          item.onClick()
                        }
                        if (isMobileOpen && !item.disabled) onMobileClose()
                      }}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-indigo-500/10 rounded-xl mix-blend-screen" />
                      )}
                      
                      <div className="relative flex items-center justify-center shrink-0 z-10">
                        <Icon className={cn("w-4 h-4 transition-colors duration-300", isActive ? "text-indigo-400" : "group-hover:text-gray-300")} />
                        {isActive && (
                          <div className="absolute -left-1 w-1 h-1 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,1)]" />
                        )}
                      </div>

                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.span 
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="truncate z-10 text-sm tracking-wide whitespace-nowrap font-semibold"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      
                      <AnimatePresence>
                        {!isCollapsed && item.badge && (
                          <motion.span 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="ml-auto bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 py-0.5 px-2 rounded font-bold z-10 text-[9px] uppercase tracking-wider whitespace-nowrap"
                          >
                            {item.badge}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-white/5">
        <button
          onClick={onToggle}
          className="hidden md:flex w-full items-center justify-center h-10 text-gray-500 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050505]/80 backdrop-blur-md z-[100] md:hidden"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* 
        Sidebar Container
        - Pure CSS for layout translation (no Framer Motion `x` conflicts)
        - Translates -100% on mobile when closed, 0 when open
        - Always 0 on md+ breakpoints
      */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 260 }}
        className={cn(
          "fixed top-0 left-0 bottom-0 z-[101] md:z-40 h-full transition-transform duration-300 ease-in-out md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full" 
        )}
      >
        {sidebarContent}
      </motion.aside>
    </>
  )
}
