'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import { Bell, User, LayoutDashboard, LogOut, Menu, Settings } from 'lucide-react';

interface GlobalHeaderProps {
  onMenuClick: () => void;
}

export default function GlobalHeader({ onMenuClick }: GlobalHeaderProps) {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [unreadCount] = useState(3); // Mocked for UI purposes

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email ?? null);
    }
    getUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="flex-shrink-0 bg-white/80 dark:bg-[#020817]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-30 sticky top-0">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        
        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
          <span className="ml-2 font-bold text-lg text-gray-900 dark:text-white sm:hidden">
            CivicMind AI
          </span>
        </div>

        {/* Desktop Spacer (to push items right) */}
        <div className="hidden lg:flex flex-1" />

        {/* Right side navigation */}
        <div className="flex items-center gap-4">
          
          {/* Dashboard Shortcut (Desktop) */}
          <Link
            href="/dashboard"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          <div className="hidden md:block w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

          {/* Notifications */}
          <Link href="/notifications" className="relative p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
            <span className="sr-only">View notifications</span>
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 focus:outline-none"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-white dark:ring-[#020817]">
                {userEmail ? userEmail.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 py-2 z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Account</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                      {userEmail || 'Loading...'}
                    </p>
                  </div>
                  
                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <User className="w-4 h-4" />
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                  </div>
                  
                  <div className="py-1 border-t border-gray-100 dark:border-gray-800">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleLogout();
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
