import React from 'react';
import { motion } from 'framer-motion';
import { User, Palette, Bell, Shield, Lock, Download, Info, Sparkles } from 'lucide-react';

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { name: 'Account', icon: User },
  { name: 'Appearance', icon: Palette },
  { name: 'Notifications', icon: Bell },
  { name: 'AI Preferences', icon: Sparkles },
  { name: 'Privacy', icon: Shield },
  { name: 'Security', icon: Lock },
  { name: 'Data & Export', icon: Download },
  { name: 'About', icon: Info }
];

export default function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  return (
    <nav aria-label="Settings Navigation" className="flex flex-col space-y-1 relative">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.name;
        
        return (
          <button
            key={tab.name}
            onClick={() => onTabChange(tab.name)}
            aria-current={isActive ? 'page' : undefined}
            className={`relative w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 z-10 border ${
              isActive
                ? 'text-white border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5 hover:border-white/10'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-settings-tab"
                className="absolute inset-0 bg-indigo-500/20 mix-blend-screen rounded-xl z-0 shadow-inner"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'text-gray-500'}`} />
            <span className="relative z-10">{tab.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
