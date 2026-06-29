"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { createClient } from '@/lib/supabase-browser'
import { LogOut, Settings, User, Monitor, Bell, Trophy, AlertCircle, ChevronRight } from "lucide-react"
import { Avatar } from "../../components/Avatar"
import { AnimatePresence, motion } from "framer-motion"
import { spring } from "../../motion/tokens"

export interface UserMenuProps {
  user: {
    name: string
    email: string
    role: "citizen" | "admin"
    isDemo?: boolean
    avatarUrl?: string
  }
  isOpen?: boolean
  onToggle?: () => void
  onClose?: () => void
}

export const UserMenu = ({ user, isOpen, onToggle, onClose }: UserMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose?.()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  // Removed problematic useEffect

  // Mock stats for UI overhaul
  const stats = [
    { label: "Reports", value: "12" },
    { label: "Resolved", value: "8" },
    { label: "Rank", value: "#42" },
  ]

  const quickActions = [
    { icon: User, label: "My Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
    { icon: AlertCircle, label: "Report Issue", href: "/report", highlight: true },
  ]

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={onToggle}
        className={`relative flex items-center p-1 rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95 ${isOpen ? 'ring-2 ring-indigo-500/50 bg-gray-800' : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar src={user.avatarUrl} fallback={user.name.charAt(0)} className="w-9 h-9 border border-gray-700/50" />
        <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-[#0a0f1c] rounded-full" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={spring.gentle}
            className="absolute right-0 mt-3 w-[360px] rounded-[22px] border border-gray-800/60 bg-[#0c1222]/90 backdrop-blur-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] z-[100] overflow-hidden flex flex-col"
          >
            {/* Soft top glow */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

            {/* Header section */}
            <div className="p-5 pb-4 border-b border-gray-800/50">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar src={user.avatarUrl} fallback={user.name.charAt(0)} className="w-14 h-14 border border-gray-700 shadow-xl" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0c1222] rounded-full shadow-sm" title="Online" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base font-bold text-white truncate">{user.name}</h2>
                    {user.isDemo && (
                      <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
                        Demo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 truncate mb-1.5">{user.email}</p>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-[inset_0_0_10px_rgba(99,102,241,0.1)]">
                      Level 7 Citizen
                    </span>
                    <span className="text-xs font-medium text-gray-500">1,280 XP</span>
                  </div>
                </div>
              </div>
              
              {/* XP Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-[10px] font-medium text-gray-500 mb-1.5 px-0.5">
                  <span>Level 7</span>
                  <span className="text-indigo-400">92% to Level 8</span>
                </div>
                <div className="h-1.5 w-full bg-gray-800/50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 divide-x divide-gray-800/50 border-b border-gray-800/50 bg-gray-900/20">
              {stats.map((stat) => (
                <div key={stat.label} className="p-3 text-center">
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Quick Actions */}
            <div className="p-2 space-y-1">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-xl group transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    action.highlight 
                      ? 'text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => onClose?.()}
                >
                  <div className={`p-1.5 rounded-lg mr-3 transition-colors ${
                    action.highlight ? 'bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30 group-hover:text-indigo-300' : 'bg-gray-800/50 text-gray-400 group-hover:bg-gray-700 group-hover:text-white'
                  }`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  {action.label}
                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gray-500" />
                </Link>
              ))}
            </div>
            
            {/* Footer / Logout */}
            <div className="p-3 border-t border-gray-800/50 bg-gray-900/30">
              <button
                className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-bold text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                onClick={async (e) => {
                  e.stopPropagation()
                  onClose?.()
                  const supabase = createClient()
                  await supabase.auth.signOut()
                  window.location.href = '/'
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
