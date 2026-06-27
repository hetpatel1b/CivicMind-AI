import React from 'react';

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  const tabs = [
    'Account',
    'Appearance',
    'Notifications',
    'Privacy',
    'Security',
    'Data & Export',
    'About'
  ];

  return (
    <nav aria-label="Settings Navigation" className="flex flex-col space-y-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          aria-current={activeTab === tab ? 'page' : undefined}
          className={`px-4 py-2.5 text-left rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            activeTab === tab
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
