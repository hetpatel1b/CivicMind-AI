'use client';

import React, { useState } from 'react';
import { useDemo } from '../context/DemoProvider';
import { 
  LayoutDashboard, MapPin, Map, Users, Trophy, Star, User, 
  Bell, Settings, Sparkles, HelpCircle, Mail, Info, ShieldCheck,
  CheckSquare, ClipboardList, MessageSquare, BarChart3, AlertTriangle, Activity
} from 'lucide-react';

// Production layout components
import { WorkspaceShell, NavGroup } from '@/design-system/layout/workspace';
import DemoBanner from './DemoBanner';

// Mock views
import DemoDashboardView from './views/DemoDashboardView';
import AdminDemoDashboardView from './views/AdminDemoDashboardView';
import DemoFeedView from './views/DemoFeedView';
import DemoMapView from './views/DemoMapView';
import DemoProfileView from './views/DemoProfileView';
import DemoLeaderboardView from './views/DemoLeaderboardView';
import DemoReputationView from './views/DemoReputationView';
import DemoIssueDetailsView from './views/DemoIssueDetailsView';
import DemoReportView from './views/DemoReportView';
import AdminDemoIssuesView from './views/AdminDemoIssuesView';
import AdminDemoVerificationView from './views/AdminDemoVerificationView';
import AdminDemoUsersView from './views/AdminDemoUsersView';
import DemoNotificationsView from './views/DemoNotificationsView';
import AdminDemoAssignmentsView from './views/AdminDemoAssignmentsView';
import AdminDemoCommunityView from './views/AdminDemoCommunityView';
import AdminDemoAIView from './views/AdminDemoAIView';
import AdminDemoAnalyticsView from './views/AdminDemoAnalyticsView';
import AdminDemoSettingsView from './views/AdminDemoSettingsView';
import AdminDemoProfileView from './views/AdminDemoProfileView';
import { DEMO_DATABASE } from '../data/mockDatabase';

export default function DemoApp() {
  const { role } = useDemo();
  const [activeView, setActiveView] = useState('dashboard');
  const [activeIssueId, setActiveIssueId] = useState<string | null>(null);

  const navigate = (view: string, issueId: string | null = null) => {
    setActiveView(view);
    setActiveIssueId(issueId);
  };

  const citizenNavGroups: NavGroup[] = [
    {
      label: 'Dashboard',
      items: [
        { name: 'Dashboard', href: '/demo/citizen/dashboard', icon: LayoutDashboard, onClick: () => navigate('dashboard') },
      ]
    },
    {
      label: 'Citizen',
      items: [
        { name: 'Report Issue', href: '/demo/citizen/report', icon: MapPin, onClick: () => navigate('report') },
        { name: 'Interactive Map', href: '/demo/citizen/map', icon: Map, onClick: () => navigate('map') },
        { name: 'Community Feed', href: '/demo/citizen/feed', icon: Users, onClick: () => navigate('feed') },
        { name: 'Leaderboard', href: '/demo/citizen/leaderboard', icon: Trophy, onClick: () => navigate('leaderboard') },
        { name: 'Reputation', href: '/demo/citizen/reputation', icon: Star, onClick: () => navigate('reputation') },
      ]
    },
    {
      label: 'Personal',
      items: [
        { name: 'Profile', href: '/demo/citizen/profile', icon: User, onClick: () => navigate('profile') },
        { name: 'Notifications', href: '/demo/citizen/notifications', icon: Bell, onClick: () => navigate('notifications') },
        { name: 'Settings', href: '/demo/citizen/settings', icon: Settings, onClick: () => navigate('settings') },
      ]
    },
    {
      label: 'Support',
      items: [
        { name: 'AI Assistant', href: '/demo/citizen/assistant', icon: Sparkles, onClick: () => navigate('assistant') },
        { name: 'Help Center', href: '/demo/citizen/help', icon: HelpCircle, onClick: () => navigate('help') },
        { name: 'Contact', href: '/demo/citizen/contact', icon: Mail, onClick: () => navigate('contact') },
        { name: 'About', href: '/demo/citizen/about', icon: Info, onClick: () => navigate('about') },
      ]
    }
  ];

  const adminNavGroups: NavGroup[] = [
    {
      label: 'Operations',
      items: [
        { name: 'Dashboard', href: '/demo/admin/dashboard', icon: LayoutDashboard, onClick: () => navigate('dashboard') },
        { name: 'Issue Verification', href: '/demo/admin/verification', icon: CheckSquare, onClick: () => navigate('verification') },
        { name: 'Manage Issues', href: '/demo/admin/issues', icon: AlertTriangle, onClick: () => navigate('issues') },
        { name: 'Assignments', href: '/demo/admin/assignments', icon: ClipboardList, onClick: () => navigate('assignments') },
      ]
    },
    {
      label: 'Management',
      items: [
        { name: 'Users', href: '/demo/admin/users', icon: Users, onClick: () => navigate('users') },
        { name: 'Community', href: '/demo/admin/community', icon: MessageSquare, onClick: () => navigate('community') },
        { name: 'AI Center', href: '/demo/admin/ai', icon: Sparkles, onClick: () => navigate('ai') },
        { name: 'Analytics', href: '/demo/admin/analytics', icon: BarChart3, onClick: () => navigate('analytics') },
      ]
    },
    {
      label: 'System',
      items: [
        { name: 'Notifications', href: '/demo/admin/notifications', icon: Bell, onClick: () => navigate('notifications') },
        { name: 'Settings', href: '/demo/admin/settings', icon: Settings, onClick: () => navigate('settings') },
        { name: 'Profile', href: '/demo/admin/profile', icon: User, onClick: () => navigate('profile') },
      ]
    }
  ];

  const navGroups = role === 'admin' ? adminNavGroups : citizenNavGroups;
  const mockUser = role === 'citizen' ? DEMO_DATABASE.users[0] : DEMO_DATABASE.users.find(u => u.role === 'admin') || DEMO_DATABASE.users[0];

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return role === 'citizen' ? <DemoDashboardView onNavigate={navigate} /> : <AdminDemoDashboardView onNavigate={navigate} />;
      case 'feed': return <DemoFeedView onNavigate={navigate} />;
      case 'map': return <DemoMapView onNavigate={navigate} />;
      case 'profile': return role === 'citizen' ? <DemoProfileView onNavigate={navigate} /> : <AdminDemoProfileView />;
      case 'leaderboard': return <DemoLeaderboardView onNavigate={navigate} />;
      case 'reputation': return <DemoReputationView onNavigate={navigate} />;
      case 'issue_details': return activeIssueId ? <DemoIssueDetailsView issueId={activeIssueId} onNavigate={navigate} /> : null;
      case 'notifications': return <DemoNotificationsView onNavigate={navigate} />;
      case 'report': return <DemoReportView onNavigate={navigate} />;
      case 'settings': return role === 'citizen' ? null : <AdminDemoSettingsView />;
      case 'issues': return role === 'admin' ? <AdminDemoIssuesView onNavigate={navigate} /> : null;
      case 'verification': return role === 'admin' ? <AdminDemoVerificationView onNavigate={navigate} /> : null;
      case 'users': return role === 'admin' ? <AdminDemoUsersView onNavigate={navigate} /> : null;
      case 'assignments': return role === 'admin' ? <AdminDemoAssignmentsView /> : null;
      case 'community': return role === 'admin' ? <AdminDemoCommunityView /> : null;
      case 'ai': return role === 'admin' ? <AdminDemoAIView /> : null;
      case 'analytics': return role === 'admin' ? <AdminDemoAnalyticsView /> : null;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Activity size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">View Coming Soon</h2>
            <p className="text-gray-500 mt-2">The {activeView} view is being connected to Demo Mode.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <DemoBanner />
      <div className="flex-1">
        <WorkspaceShell
          navGroups={navGroups}
          breadcrumbs={[{ label: activeView.charAt(0).toUpperCase() + activeView.slice(1) }]}
          activeHref={`/demo/${role}/${activeView}`}
          user={{
            name: mockUser.full_name,
            email: mockUser.email,
            role: role as 'citizen' | 'admin',
            avatarUrl: mockUser.avatar_url || undefined
          }}
        >
          {renderContent()}
        </WorkspaceShell>
      </div>
    </div>
  );
}
