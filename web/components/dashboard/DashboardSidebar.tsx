'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import { 
  LayoutDashboard, 
  MapPin, 
  Map, 
  Users, 
  Trophy, 
  Star, 
  User, 
  Bell, 
  Settings, 
  Sparkles, 
  HelpCircle, 
  Mail, 
  Info,
  ShieldCheck
} from 'lucide-react';

export default function DashboardSidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdminStatus() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (data && (data.role === 'admin' || data.role === 'super_admin' || data.role === 'moderator' || data.role === 'city_official')) {
        setIsAdmin(true);
      }
    }
    checkAdminStatus();
  }, []);

  const navGroups = [
    {
      title: 'Dashboard',
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Citizen',
      items: [
        { name: 'Report Issue', href: '/report', icon: <MapPin className="w-5 h-5" /> },
        { name: 'Interactive Map', href: '/map', icon: <Map className="w-5 h-5" /> },
        { name: 'Community Feed', href: '/feed', icon: <Users className="w-5 h-5" /> },
        { name: 'Leaderboard', href: '/leaderboard', icon: <Trophy className="w-5 h-5" /> },
        { name: 'Reputation', href: '/reputation', icon: <Star className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Personal',
      items: [
        { name: 'Profile', href: '/profile', icon: <User className="w-5 h-5" /> },
        { name: 'Notifications', href: '/notifications', icon: <Bell className="w-5 h-5" /> },
        { name: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Support',
      items: [
        { name: 'AI Assistant', href: '/help', icon: <Sparkles className="w-5 h-5" /> },
        { name: 'Help Center', href: '/help', icon: <HelpCircle className="w-5 h-5" /> },
        { name: 'Contact', href: '/contact', icon: <Mail className="w-5 h-5" /> },
        { name: 'About', href: '/about', icon: <Info className="w-5 h-5" /> },
      ]
    }
  ];

  if (isAdmin) {
    navGroups.push({
      title: 'Admin',
      items: [
        { name: 'Admin Dashboard', href: '/admin', icon: <ShieldCheck className="w-5 h-5" /> },
      ]
    });
  }

  return (
    <>

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#020817] border-r border-gray-200 dark:border-gray-800 
        transform transition-transform duration-200 ease-in-out lg:transform-none h-full overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 space-y-8">
          {navGroups.map((group, index) => (
            <div key={index}>
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item, itemIndex) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={itemIndex}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive 
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' 
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                        }`}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
