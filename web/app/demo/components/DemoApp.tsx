'use client';

import React, { useState } from 'react';
import { useDemo } from '../context/DemoProvider';
import DemoHeader from './DemoHeader';
import { Home, Map, Activity, User, Settings, AlertTriangle, ShieldCheck, Users, Trophy, Award } from 'lucide-react';
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

export default function DemoApp() {
  const { role } = useDemo();
  const [activeView, setActiveView] = useState('dashboard');
  const [activeIssueId, setActiveIssueId] = useState<string | null>(null);

  const navigate = (view: string, issueId: string | null = null) => {
    setActiveView(view);
    setActiveIssueId(issueId);
  };

  const citizenLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'feed', label: 'Community Feed', icon: Activity },
    { id: 'map', label: 'Live Map', icon: Map },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'reputation', label: 'Reputation', icon: Award },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  const adminLinks = [
    { id: 'dashboard', label: 'Admin Overview', icon: Home },
    { id: 'issues', label: 'Manage Issues', icon: AlertTriangle },
    { id: 'verification', label: 'Verification', icon: ShieldCheck },
    { id: 'users', label: 'Citizens', icon: Users },
  ];

  const links = role === 'admin' ? adminLinks : citizenLinks;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <DemoHeader onNavigate={(v: string) => navigate(v)} />
      <div className="flex flex-1 overflow-hidden max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:block overflow-y-auto">
          <div className="p-4 space-y-2">
            {links.map(link => {
              const Icon = link.icon;
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  {link.label}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeView === 'dashboard' && role === 'citizen' && <DemoDashboardView onNavigate={navigate} />}
          {activeView === 'dashboard' && role === 'admin' && <AdminDemoDashboardView onNavigate={navigate} />}
          {activeView === 'feed' && <DemoFeedView onNavigate={navigate} />}
          {activeView === 'map' && <DemoMapView onNavigate={navigate} />}
          {activeView === 'profile' && <DemoProfileView onNavigate={navigate} />}
          {activeView === 'leaderboard' && <DemoLeaderboardView onNavigate={navigate} />}
          {activeView === 'reputation' && <DemoReputationView onNavigate={navigate} />}
          {activeView === 'issue_details' && activeIssueId && <DemoIssueDetailsView issueId={activeIssueId} onNavigate={navigate} />}
          {activeView === 'notifications' && <DemoNotificationsView onNavigate={navigate} />}
          {activeView === 'report' && <DemoReportView onNavigate={navigate} />}
          
          {/* Admin specific */}
          {activeView === 'issues' && role === 'admin' && <AdminDemoIssuesView onNavigate={navigate} />}
          {activeView === 'verification' && role === 'admin' && <AdminDemoVerificationView onNavigate={navigate} />}
          {activeView === 'users' && role === 'admin' && <AdminDemoUsersView onNavigate={navigate} />}

          {/* Fallback for unbuilt views */}
          {!['dashboard', 'feed', 'map', 'profile', 'leaderboard', 'reputation', 'issue_details', 'issues'].includes(activeView) && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Activity size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">View Coming Soon</h2>
              <p className="text-gray-500 mt-2">The {activeView} view is being connected to Demo Mode.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
