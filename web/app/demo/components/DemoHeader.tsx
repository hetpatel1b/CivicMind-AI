'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, User, Shield, LogOut, RotateCcw, Bell } from 'lucide-react';
import { useDemo } from '../context/DemoProvider';
import { useRouter } from 'next/navigation';

export default function DemoHeader({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const { role, switchRole, resetDemo, currentUser, notifications } = useDemo();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleExit = () => {
    router.push('/');
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <button onClick={() => onNavigate && onNavigate('dashboard')} className="flex items-center gap-2">
              <ShieldAlert className="h-8 w-8 text-blue-600 dark:text-blue-500" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                CivicMind AI <span className="ml-2 text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">DEMO MODE</span>
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4 relative">
            {role === 'citizen' && onNavigate && (
              <button 
                onClick={() => onNavigate('notifications')}
                className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                )}
              </button>
            )}

            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {currentUser?.full_name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {role === 'admin' ? 'Demo Admin' : 'Demo Citizen'}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 z-50">
                <button 
                  onClick={() => { switchRole(role === 'admin' ? 'citizen' : 'admin'); setDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                >
                  {role === 'admin' ? <User size={16} /> : <Shield size={16} />}
                  Switch to {role === 'admin' ? 'Citizen' : 'Admin'}
                </button>
                <button 
                  onClick={() => { resetDemo(); setDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  Reset Demo Data
                </button>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
                <button 
                  onClick={handleExit}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Exit Demo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
