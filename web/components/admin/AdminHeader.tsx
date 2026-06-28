'use client';

import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();

  // Basic title logic based on pathname
  let pageTitle = 'Dashboard';
  if (pathname.includes('/admin/verification')) pageTitle = 'Issue Verification';
  else if (pathname.includes('/admin/assignments')) pageTitle = 'Assignments';
  else if (pathname.includes('/admin/users')) pageTitle = 'User Management';
  else if (pathname.includes('/admin/community')) pageTitle = 'Community Moderation';
  else if (pathname.includes('/admin/ai')) pageTitle = 'AI Center';
  else if (pathname.includes('/admin/analytics')) pageTitle = 'Analytics';
  else if (pathname.includes('/admin/settings')) pageTitle = 'Settings';
  else if (pathname.includes('/admin/profile')) pageTitle = 'Profile';

  return (
    <header className="h-16 bg-white dark:bg-[#020817] border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 z-30 shrink-0 shadow-sm relative">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight hidden sm:block">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500" />
          </div>
          <input
            type="text"
            className="block w-64 pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
            placeholder="Search tickets, users..."
          />
        </div>

        {/* Notifications */}
        <Link 
          href="/admin/notifications" 
          className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#020817]"></span>
        </Link>
      </div>
    </header>
  );
}
