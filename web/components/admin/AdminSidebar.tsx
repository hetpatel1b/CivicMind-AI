'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CheckSquare, 
  ClipboardList, 
  Users, 
  MessageSquare, 
  Sparkles, 
  BarChart3, 
  Bell, 
  Settings, 
  User,
  LogOut,
  ShieldAlert
} from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';

export interface AdminNavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

export interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  customNavGroups?: AdminNavGroup[];
  activeHref?: string;
}

export default function AdminSidebar({ isOpen, setIsOpen, customNavGroups, activeHref }: AdminSidebarProps) {
  const pathname = usePathname();

  const navGroups: AdminNavGroup[] = [
    {
      title: 'Operations',
      items: [
        { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: 'Issue Verification', href: '/admin/verification', icon: <CheckSquare className="w-5 h-5" /> },
        { name: 'Assignments', href: '/admin/assignments', icon: <ClipboardList className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Management',
      items: [
        { name: 'Users', href: '/admin/users', icon: <Users className="w-5 h-5" /> },
        { name: 'Community', href: '/admin/community', icon: <MessageSquare className="w-5 h-5" /> },
        { name: 'AI Center', href: '/admin/ai', icon: <Sparkles className="w-5 h-5" /> },
        { name: 'Analytics', href: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
      ]
    },
    {
      title: 'System',
      items: [
        { name: 'Notifications', href: '/admin/notifications', icon: <Bell className="w-5 h-5" /> },
        { name: 'Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
        { name: 'Profile', href: '/admin/profile', icon: <User className="w-5 h-5" /> },
      ]
    }
  ];

  const effectiveNavGroups = customNavGroups || navGroups;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <>
      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        border-r border-slate-800 flex flex-col h-full overflow-hidden
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
          <Link href="/admin" className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">
              Admin Portal
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
          {effectiveNavGroups.map((group) => (
            <div key={group.title}>
              <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = activeHref ? (activeHref === item.href) : (pathname === item.href);
                  return (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        onClick={(e) => {
                          if (item.onClick) {
                            e.preventDefault();
                            item.onClick();
                          }
                          setIsOpen(false);
                        }}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                          ${isActive 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          }
                        `}
                      >
                        <div className={`
                          ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}
                          transition-colors
                        `}>
                          {item.icon}
                        </div>
                        <span className="font-medium text-sm">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
