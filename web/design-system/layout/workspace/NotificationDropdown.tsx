import React, { useState, useRef, useEffect } from "react"
import { Bell, CheckCircle2, Sparkles, TrendingUp, AlertCircle, X, ExternalLink } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { spring } from "../../motion/tokens"
import Link from "next/link"

export interface NotificationDropdownProps {
  isOpen?: boolean
  onToggle?: () => void
  onClose?: () => void
}

type TabType = 'all' | 'unread' | 'system' | 'ai'

export const NotificationDropdown = ({ isOpen, onToggle, onClose }: NotificationDropdownProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Issue Resolved",
      description: "Pothole on Main St has been fixed.",
      category: "system",
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "bg-green-500/10",
      time: "2 hours ago",
      unread: true,
      group: "Today"
    },
    {
      id: 2,
      title: "AI Weekly Digest Ready",
      description: "Your civic impact summary for this week is ready to view.",
      category: "ai",
      icon: Sparkles,
      color: "text-ai-400",
      bg: "bg-ai-500/10",
      time: "5 hours ago",
      unread: true,
      group: "Today"
    },
    {
      id: 3,
      title: "Community Upvote",
      description: "Your report 'Broken Streetlight' received 50 upvotes.",
      category: "system",
      icon: TrendingUp,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      time: "1 day ago",
      unread: false,
      group: "Yesterday"
    },
    {
      id: 4,
      title: "Account Security",
      description: "New login detected from Chrome on Windows.",
      category: "system",
      icon: AlertCircle,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      time: "2 days ago",
      unread: false,
      group: "Earlier"
    }
  ])

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

  const unreadCount = notifications.filter(n => n.unread).length

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return n.unread
    if (activeTab === 'system') return n.category === 'system'
    if (activeTab === 'ai') return n.category === 'ai'
    return true
  })

  // Group notifications
  const grouped = filteredNotifications.reduce((acc, curr) => {
    if (!acc[curr.group]) acc[curr.group] = []
    acc[curr.group].push(curr)
    return acc
  }, {} as Record<string, typeof notifications>)

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={onToggle}
        className={`relative p-2 rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95 ${isOpen ? 'ring-2 ring-indigo-500/50 bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'}`}
        aria-label={`Notifications (${unreadCount} unread)`}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0f1c]" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={spring.gentle}
            className="fixed inset-0 sm:inset-auto sm:absolute sm:right-0 sm:mt-3 w-full sm:w-[440px] h-[100dvh] sm:h-auto sm:max-h-[85vh] rounded-none sm:rounded-[22px] border-0 sm:border border-gray-800/60 bg-[#0c1222]/95 backdrop-blur-3xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] z-[100] flex flex-col"
          >
            {/* Soft top glow for desktop */}
            <div className="hidden sm:block absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

            {/* Header */}
            <div className="pt-5 sm:pt-4 px-4 border-b border-gray-800/50 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-base font-bold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {unreadCount > 0 && (
                    <button 
                      onClick={handleMarkAllRead}
                      className="text-xs font-medium text-gray-400 hover:text-white transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button onClick={() => onClose?.()} className="sm:hidden p-1.5 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 overflow-x-auto no-scrollbar pb-3">
                {(['all', 'unread', 'system', 'ai'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Notification List */}
            <div className="flex-1 overflow-y-auto p-2">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-center px-4">
                  <div className="w-12 h-12 mb-3 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-500">
                    <Bell className="w-6 h-6 opacity-50" />
                  </div>
                  <p className="text-sm font-medium text-gray-300">All caught up!</p>
                  <p className="text-xs text-gray-500 mt-1">No new notifications to show.</p>
                </div>
              ) : (
                Object.entries(grouped).map(([group, items]) => (
                  <div key={group} className="mb-4 last:mb-0">
                    <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-0 bg-[#0c1222]/95 backdrop-blur z-10">
                      {group}
                    </div>
                    <div className="space-y-1">
                      {items.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer relative group border ${
                            notification.unread ? 'border-indigo-500/10 bg-indigo-500/[0.02]' : 'border-transparent'
                          }`}
                        >
                          {notification.unread && (
                            <div className="absolute top-1/2 -left-0.5 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full" />
                          )}
                          <div className="flex items-start gap-3 pl-1">
                            <div className={`mt-0.5 p-2 rounded-lg shrink-0 border border-white/5 shadow-inner ${notification.bg} ${notification.color}`}>
                              <notification.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0 pr-2">
                              <div className="flex items-center justify-between gap-2 mb-0.5">
                                <h4 className={`text-sm font-bold truncate ${notification.unread ? 'text-white' : 'text-gray-200'}`}>
                                  {notification.title}
                                </h4>
                                <span className="shrink-0 text-[10px] font-medium text-gray-500">{notification.time}</span>
                              </div>
                              <p className={`text-xs line-clamp-2 ${notification.unread ? 'text-gray-300' : 'text-gray-400'}`}>
                                {notification.description}
                              </p>
                              
                              {/* Hover Action */}
                              <div className="mt-2 flex items-center opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all overflow-hidden">
                                <span className="inline-flex items-center text-xs font-bold text-indigo-400 hover:text-indigo-300">
                                  View details <ExternalLink className="w-3 h-3 ml-1" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Footer */}
            <div className="p-3 sm:border-t border-gray-800/50 bg-gray-900/30 pb-safe sm:pb-3">
              <Link 
                href="/notifications" 
                className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-300 rounded-xl hover:bg-white/5 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                onClick={() => onClose?.()}
              >
                View all notifications
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
