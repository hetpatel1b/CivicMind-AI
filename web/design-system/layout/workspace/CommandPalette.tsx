"use client"

import React, { useEffect, useRef, useState } from "react"
import { Search, MapPin, AlertCircle, Sparkles, User, Settings, X, Command, CornerDownLeft, ArrowUp, ArrowDown, LogOut, LayoutDashboard, Compass, Activity, FileText } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { spring } from "../../motion/tokens"
import Link from "next/link"

export interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Use a rotating placeholder
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const placeholders = [
    "Ask Civic AI to analyze trends...",
    "Search community reports...",
    "Navigate to Leaderboard...",
    "Find users..."
  ]

  useEffect(() => {
    if (!isOpen) return
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % placeholders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isOpen, placeholders.length])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
        setSearchQuery("")
        setSelectedIndex(0)
      }, 100)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  const commands: {
    group: string
    items: {
      icon: React.ElementType
      label: string
      desc: string
      color: string
      bg: string
      action: () => void
      href?: string
    }[]
  }[] = [
    {
      group: "AI Commands",
      items: [
        { icon: Sparkles, label: "Analyze neighborhood safety", desc: "AI Insights", color: "text-ai-400", bg: "bg-ai-500/10", action: () => onClose() },
        { icon: Sparkles, label: "Summarize latest reports", desc: "AI Digest", color: "text-ai-400", bg: "bg-ai-500/10", action: () => onClose() },
        { icon: FileText, label: "Draft a proposal", desc: "AI Assistant", color: "text-ai-400", bg: "bg-ai-500/10", action: () => onClose() },
      ]
    },
    {
      group: "Quick Navigation",
      items: [
        { icon: LayoutDashboard, label: "Dashboard", desc: "Overview", color: "text-gray-400", bg: "bg-gray-800/50", action: () => onClose(), href: "/dashboard" },
        { icon: AlertCircle, label: "Report Issue", desc: "New Report", color: "text-indigo-400", bg: "bg-indigo-500/10", action: () => onClose(), href: "/report" },
        { icon: MapPin, label: "Interactive Map", desc: "Explore", color: "text-gray-400", bg: "bg-gray-800/50", action: () => onClose(), href: "/map" },
        { icon: Activity, label: "Community Feed", desc: "Updates", color: "text-gray-400", bg: "bg-gray-800/50", action: () => onClose(), href: "/feed" },
        { icon: User, label: "Profile", desc: "Account", color: "text-gray-400", bg: "bg-gray-800/50", action: () => onClose(), href: "/profile" },
      ]
    }
  ]

  // Flatten for keyboard navigation
  const flatItems = commands.flatMap(group => group.items)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev < flatItems.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : flatItems.length - 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const selected = flatItems[selectedIndex]
        if (selected) {
          if (selected.href) {
            // Need to handle routing, but for now just call action
            selected.action()
            window.location.href = selected.href // Basic fallback
          } else {
            selected.action()
          }
        }
      }
    }
    
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedIndex, flatItems])

  let itemIndex = 0

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a0f1c]/60 backdrop-blur-md z-[100]"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-20 sm:pt-[15vh] px-4 sm:px-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={spring.gentle}
              className="w-full max-w-2xl bg-[#0c1222]/95 backdrop-blur-3xl border border-gray-800/80 rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden pointer-events-auto flex flex-col max-h-[85vh] sm:max-h-[70vh]"
            >
              {/* Search Header */}
              <div className="flex items-center px-4 py-4 border-b border-gray-800/80 relative">
                <Search className="w-6 h-6 text-indigo-400 mr-4 shrink-0" />
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-xl text-white placeholder-transparent"
                    placeholder=" "
                  />
                  {!searchQuery && (
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-xl text-gray-500">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={placeholderIndex}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {placeholders[placeholderIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-white bg-gray-900/50 hover:bg-gray-800 transition-colors ml-3 shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results */}
              <div className="flex-1 overflow-y-auto p-2 scroll-smooth">
                {commands.map((group, groupIdx) => (
                  <div key={groupIdx} className="mb-2">
                    <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-0 bg-[#0c1222]/95 backdrop-blur z-10">
                      {group.group}
                    </div>
                    <div className="space-y-0.5 mt-1">
                      {group.items.map((item) => {
                        const currentIndex = itemIndex++
                        const isSelected = selectedIndex === currentIndex
                        
                        return (
                          <Link
                            key={currentIndex}
                            href={item.href || '#'}
                            onClick={(e) => {
                              if (!item.href) {
                                e.preventDefault()
                                item.action()
                              } else {
                                onClose()
                              }
                            }}
                            className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
                              isSelected 
                                ? 'bg-indigo-500/10 shadow-[inset_0_0_10px_rgba(99,102,241,0.05)]' 
                                : 'hover:bg-white/5'
                            }`}
                            onMouseEnter={() => setSelectedIndex(currentIndex)}
                          >
                            <div className={`p-2 rounded-lg mr-3 shrink-0 ${isSelected ? 'bg-indigo-500/20 text-indigo-400' : `${item.bg} ${item.color}`}`}>
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                              <span className={`text-sm font-medium truncate ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                                {item.label}
                              </span>
                              <span className={`text-xs ${isSelected ? 'text-indigo-400' : 'text-gray-500'} shrink-0 hidden sm:block`}>
                                {item.desc}
                              </span>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Legend */}
              <div className="px-4 py-3 border-t border-gray-800/80 bg-[#0a0f1c] flex flex-wrap items-center justify-between sm:justify-start sm:gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <kbd className="flex items-center justify-center h-5 min-w-[20px] px-1 bg-gray-800 border border-gray-700 rounded text-gray-300 font-sans shadow-sm">
                    <CornerDownLeft className="w-3 h-3" />
                  </kbd>
                  <span>to select</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="flex items-center justify-center h-5 min-w-[20px] px-1 bg-gray-800 border border-gray-700 rounded text-gray-300 font-sans shadow-sm">
                    <ArrowDown className="w-3 h-3" />
                  </kbd>
                  <kbd className="flex items-center justify-center h-5 min-w-[20px] px-1 bg-gray-800 border border-gray-700 rounded text-gray-300 font-sans shadow-sm">
                    <ArrowUp className="w-3 h-3" />
                  </kbd>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="flex items-center justify-center h-5 px-1.5 bg-gray-800 border border-gray-700 rounded text-gray-300 font-sans shadow-sm tracking-wider">
                    ESC
                  </kbd>
                  <span>to close</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
