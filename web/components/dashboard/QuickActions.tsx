import React from 'react';
import Link from 'next/link';
import { PlusCircle, Map, MessageSquare, Settings } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    {
      name: 'Report Issue',
      href: '/issues/new',
      icon: PlusCircle,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      name: 'Explore Map',
      href: '/map',
      icon: Map,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      name: 'Community Feed',
      href: '/feed',
      icon: MessageSquare,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      name: 'My Profile',
      href: '/profile',
      icon: Settings,
      color: 'text-gray-600 dark:text-gray-400',
      bg: 'bg-gray-200 dark:bg-gray-700/50'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link 
            key={action.name} 
            href={action.href}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${action.bg}`}>
              <action.icon className={`w-6 h-6 ${action.color}`} />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
              {action.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
