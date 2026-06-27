import React from 'react';

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
      className="flex space-x-1 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-xl w-full max-w-md border border-gray-200 dark:border-gray-700"
    >
      {TABS.map(tab => (
        <button
          key={tab}
          role="tab"
          aria-selected={activeTab === tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            activeTab === tab
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
