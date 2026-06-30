'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import { WorkspaceShell, NavGroup } from '@/design-system/layout/workspace';
import { 
  LayoutDashboard, MapPin, Map, Users, Trophy, Star, User, 
  Bell, Settings, Sparkles, HelpCircle, Mail, Info, ShieldCheck 
} from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userProfile, setUserProfile] = useState<{name: string, email: string, role: "citizen" | "admin", avatarUrl?: string}>({
    name: 'Loading...',
    email: '',
    role: 'citizen'
  });
  const pathname = usePathname();

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        const role = (data.role === 'admin' || data.role === 'super_admin' || data.role === 'moderator' || data.role === 'city_official') ? 'admin' : 'citizen';
        if (role === 'admin') setIsAdmin(true);
        setUserProfile({
          name: data.full_name || 'Citizen',
          email: user.email || '',
          role: role,
          avatarUrl: data.avatar_url
        });
      } else {
        setUserProfile({
          name: user.user_metadata?.full_name || 'Citizen',
          email: user.email || '',
          role: 'citizen'
        });
      }
    }
    fetchUser();
  }, []);

  const navGroups: NavGroup[] = [
    {
      label: 'Dashboard',
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      ]
    },
    {
      label: 'Citizen',
      items: [
        { name: 'Report Issue', href: '/report', icon: MapPin },
        { name: 'Interactive Map', href: '/map', icon: Map },
        { name: 'Community Feed', href: '/feed', icon: Users },
        { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
        { name: 'Reputation', href: '/reputation', icon: Star },
      ]
    },
    {
      label: 'Personal',
      items: [
        { name: 'Profile', href: '/profile', icon: User },
        { name: 'Notifications', href: '/notifications', icon: Bell },
        { name: 'Settings', href: '/settings', icon: Settings },
      ]
    },
    {
      label: 'Support',
      items: [
        { name: 'AI Assistant', href: '/assistant', icon: Sparkles },
        { name: 'Help Center', href: '/help', icon: HelpCircle },
        { name: 'Contact', href: '/contact', icon: Mail },
        { name: 'About', href: '/about', icon: Info },
      ]
    }
  ];

  if (isAdmin) {
    navGroups.push({
      label: 'Admin',
      items: [
        { name: 'Admin Dashboard', href: '/admin', icon: ShieldCheck },
      ]
    });
  }

  // Generate breadcrumbs from pathname
  const pathParts = pathname?.split('/').filter(Boolean) || [];
  const breadcrumbs = pathParts.map((part, index) => {
    const href = '/' + pathParts.slice(0, index + 1).join('/');
    return {
      label: part.charAt(0).toUpperCase() + part.slice(1),
      href: index === pathParts.length - 1 ? undefined : href
    };
  });

  return (
    <WorkspaceShell
      navGroups={navGroups}
      breadcrumbs={breadcrumbs.length > 0 ? breadcrumbs : [{ label: 'Dashboard' }]}
      user={userProfile}
    >
      {children}
    </WorkspaceShell>
  );
}
