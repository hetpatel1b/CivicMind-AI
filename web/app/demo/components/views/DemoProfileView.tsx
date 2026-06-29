import React from 'react';
import { useDemo } from '../../context/DemoProvider';
import ProfileHeader from '../../../../components/profile/ProfileHeader';
import ProfileStatistics from '../../../../components/profile/ProfileStatistics';
import ProfileReputation from '../../../../components/profile/ProfileReputation';
import ProfileBadges from '../../../../components/profile/ProfileBadges';
import { Card } from '@/design-system/components/Card';

interface DemoProfileViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function DemoProfileView({ onNavigate }: DemoProfileViewProps) {
  const { currentUser, issues, comments, stats } = useDemo();

  const userIssues = issues.filter(i => i.user_id === currentUser.id);
  const userComments = comments.filter(c => c.user_id === currentUser.id);

  const reputationSummary = {
    totalReports: userIssues.length,
    totalSupports: userIssues.reduce((acc, curr) => acc + curr.upvotes_count, 0),
    totalComments: userComments.length,
    reputationScore: currentUser.reputation_score,
    nextMilestone: Math.ceil((currentUser.reputation_score + 1) / 500) * 500,
    currentRank: 'Active Citizen',
    rankProgress: (currentUser.reputation_score % 500) / 500
  };

  const badgeSummary = {
    badges: currentUser.badges || [],
    recentBadges: (currentUser.badges || []).slice(0, 3)
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Profile</h1>
      
      <ProfileHeader 
        fullName={currentUser.full_name}
        email={currentUser.email}
        avatarUrl={currentUser.avatar_url}
        createdAt={currentUser.created_at}
      />

      <ProfileStatistics 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        summary={reputationSummary as any}
        totalBadges={badgeSummary.badges.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ProfileReputation profile={reputationSummary as any} />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ProfileBadges badgeSummary={badgeSummary as any} />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Bio</h3>
        <p className="text-gray-600 dark:text-gray-400">{currentUser.bio || "No bio provided."}</p>
      </Card>
    </div>
  );
}
