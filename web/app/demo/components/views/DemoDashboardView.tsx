import React from 'react';
import { useDemo } from '../../context/DemoProvider';
import { DEMO_DATABASE } from '../../data/mockDatabase';
import DashboardHero from '@/components/dashboard/DashboardHero';
import QuickStats from '@/components/dashboard/QuickStats';
import ReputationSnapshot from '@/components/dashboard/ReputationSnapshot';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import AIDigestWidget from '@/components/dashboard/AIDigestWidget';
import InteractiveMapPreview from '@/components/dashboard/InteractiveMapPreview';
import CommunityPulse from '@/components/dashboard/CommunityPulse';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/design-system/motion/variants';

interface DemoDashboardViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function DemoDashboardView({ onNavigate }: DemoDashboardViewProps) {
  const { currentUser, issues, comments } = useDemo();
  
  const userIssues = issues.filter(i => i.user_id === currentUser?.id);
  const userComments = comments.filter(c => c.user_id === currentUser?.id);

  const summary = {
    totalPoints: 1250,
    totalReports: userIssues.length,
    totalSupports: userIssues.reduce((acc, curr) => acc + curr.upvotes_count, 0),
    totalComments: userComments.length,
  };

  const profile = {
    userId: currentUser?.id || 'citizen-1',
    totalPoints: 1250,
    level: 'Advanced',
    tier: 'Gold',
    nextLevelPoints: 2000,
    joinDate: '2024-01-15T00:00:00.000Z',
  };

  const badgeSummary = {
    totalBadges: 4,
    badges: [
      { id: '1', name: 'First Reporter', description: 'Reported first issue', icon: 'medal', earnedAt: '2024-02-01T00:00:00.000Z' },
      { id: '2', name: 'Community Helper', description: 'Supported 10 issues', icon: 'heart', earnedAt: '2024-03-15T00:00:00.000Z' },
      { id: '3', name: 'Active Citizen', description: 'Logged in for 30 days', icon: 'star', earnedAt: '2024-05-10T00:00:00.000Z' },
      { id: '4', name: 'Eco Warrior', description: 'Reported 5 environmental issues', icon: 'leaf', earnedAt: '2024-06-20T00:00:00.000Z' },
    ]
  };

  const recentReports = userIssues.slice(0, 5).map(issue => ({
    id: issue.id,
    title: issue.title,
    status: issue.status,
    created_at: issue.created_at
  }));

  const [recentEvents] = React.useState(() => [
    { id: 'ev1', type: 'report_resolved', points: 100, created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 'ev2', type: 'upvote_received', points: 5, created_at: new Date(Date.now() - 172800000).toISOString() },
    { id: 'ev3', type: 'issue_reported', points: 50, created_at: new Date(Date.now() - 345600000).toISOString() },
    { id: 'ev4', type: 'comment_added', points: 10, created_at: new Date(Date.now() - 432000000).toISOString() },
    { id: 'ev5', type: 'daily_login', points: 5, created_at: new Date(Date.now() - 518400000).toISOString() },
  ]);

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-indigo-500/30 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Top Section: Hero & Quick Actions */}
          <motion.div variants={fadeUp}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <DashboardHero userName={currentUser?.full_name || 'Citizen'} profile={profile as any} />
          </motion.div>
          
          <QuickActions />

          {/* AI Intelligence Section */}
          <AIDigestWidget 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            summary={summary as any}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            badgeSummary={badgeSummary as any}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            recentReports={recentReports as any}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            recentEvents={recentEvents as any}
          />

          {/* KPI Statistics */}
          <QuickStats 
            totalReports={summary.totalReports}
            totalSupports={summary.totalSupports}
            totalComments={summary.totalComments}
          />

          {/* Map & Community */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            <InteractiveMapPreview />
            <CommunityPulse />
          </div>

          {/* Activity & Reputation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <RecentActivity events={recentEvents as any} />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <ReputationSnapshot profile={profile as any} badgeSummary={badgeSummary as any} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
