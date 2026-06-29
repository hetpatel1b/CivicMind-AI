'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import { WorkspaceShell, NavGroup } from '@/design-system/layout/workspace';
import { 
  LayoutDashboard, CheckSquare, ClipboardList, Users, 
  MessageSquare, Sparkles, BarChart3, Bell, Settings, User 
} from 'lucide-react';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<{name: string, email: string, role: "citizen" | "admin", avatarUrl?: string}>({
    name: 'Admin User',
    email: '',
    role: 'admin'
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
        setUserProfile({
          name: data.full_name || 'Admin User',
          email: user.email || '',
          role: 'admin',
          avatarUrl: data.avatar_url
        });
      }
    }
    fetchUser();
  }, []);

  const navGroups: NavGroup[] = [
    {
      label: 'Operations',
      items: [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Issue Verification', href: '/admin/verification', icon: CheckSquare },
        { name: 'Assignments', href: '/admin/assignments', icon: ClipboardList },
      ]
    },
    {
      label: 'Management',
      items: [
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Community', href: '/admin/community', icon: MessageSquare },
        { name: 'AI Center', href: '/admin/ai', icon: Sparkles },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      ]
    },
    {
      label: 'System',
      items: [
        { name: 'Notifications', href: '/admin/notifications', icon: Bell },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
        { name: 'Profile', href: '/admin/profile', icon: User },
      ]
    }
  ];

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
      breadcrumbs={breadcrumbs.length > 0 ? breadcrumbs : [{ label: 'Admin Dashboard' }]}
      user={userProfile}
    >
      {children}
    </WorkspaceShell>
  );
}
