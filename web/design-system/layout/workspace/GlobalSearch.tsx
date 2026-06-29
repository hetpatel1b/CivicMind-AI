"use client"

import React from "react"
import { Search, Command } from "lucide-react"
import { CommandPalette } from "./CommandPalette"

export interface GlobalSearchProps {
  isOpen?: boolean
  onToggle?: () => void
  onClose?: () => void
}

export const GlobalSearch = ({ isOpen, onToggle, onClose }: GlobalSearchProps) => {
  return (
    <>
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 w-full sm:w-64 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <Search className="w-4 h-4 shrink-0" />
        <span className="flex-1 text-left truncate">Search workspace...</span>
        <kbd className="hidden sm:inline-flex items-center h-5 px-1.5 text-[10px] font-medium text-gray-400 bg-white dark:bg-gray-950 rounded border border-gray-200 dark:border-gray-800">
          <Command className="w-3 h-3 mr-0.5" /> K
        </kbd>
      </button>

      <CommandPalette isOpen={!!isOpen} onClose={() => onClose?.()} />
    </>
  )
}
