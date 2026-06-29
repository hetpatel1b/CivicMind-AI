import React from 'react';
import Link from 'next/link';
import { Edit3, LayoutDashboard, PlusCircle, Globe2, Bell, Settings, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfileActions() {
  const actions = [
    { name: 'Report New Issue', href: '/report', icon: PlusCircle, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { name: 'Interactive Map', href: '/map', icon: Globe2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { name: 'Notifications', href: '/notifications', icon: Bell, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-sm border border-gray-200/80 dark:border-gray-800/80">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">Navigate your workspace</p>
        </div>
        <Link 
          href="/profile/settings"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action, idx) => (
          <Link 
            key={idx}
            href={action.href}
            className="group flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 border border-gray-100 dark:border-gray-800 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${action.bg}`}>
                <action.icon className={`w-4 h-4 ${action.color}`} />
              </div>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {action.name}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Link>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <Link 
          href="/profile/settings"
          className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
