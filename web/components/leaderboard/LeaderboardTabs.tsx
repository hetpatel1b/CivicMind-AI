import React from 'react';
import { motion } from 'framer-motion';

export type TimeframeTab = 'Overall' | 'Monthly' | 'Weekly';

interface LeaderboardTabsProps {
  activeTab: TimeframeTab;
  onTabChange: (tab: TimeframeTab) => void;
}

const TABS: TimeframeTab[] = ['Overall', 'Monthly', 'Weekly'];

export default function LeaderboardTabs({ activeTab, onTabChange }: LeaderboardTabsProps) {
  return (
    <div 
      role="tablist"
      aria-label="Leaderboard timeframes" 
      className="relative flex space-x-2 bg-white/5 p-1.5 rounded-[1.25rem] w-full max-w-md border border-white/10 shadow-inner overflow-hidden"
    >
      {TABS.map(tab => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab)}
            className={`relative flex-1 py-2.5 text-sm font-black rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 z-10 ${
              isActive
                ? 'text-white'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {isActive && (
              <motion.div 
                layoutId="activeTabGlow"
                className="absolute inset-0 bg-indigo-500/20 border border-indigo-500/30 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.3)] z-[-1]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {tab}
          </button>
        );
      })}
    </div>
  );
}
