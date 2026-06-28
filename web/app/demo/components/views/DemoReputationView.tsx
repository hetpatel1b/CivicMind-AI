import React from 'react';
import { useDemo } from '../../context/DemoProvider';
import LevelProgress from '../../../../components/reputation/LevelProgress';
import BadgeGallery from '../../../../components/reputation/BadgeGallery';
import ReputationStats from '../../../../components/reputation/ReputationStats';

interface DemoReputationViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function DemoReputationView({ onNavigate }: DemoReputationViewProps) {
  const { currentUser, issues, comments } = useDemo();

  const userIssues = issues.filter(i => i.user_id === currentUser.id);
  const userComments = comments.filter(c => c.user_id === currentUser.id);
  
  const reputation = {
    userId: currentUser.id,
    currentScore: currentUser.reputation_score,
    currentRank: 'Active Citizen',
    nextRank: 'Community Hero',
    nextRankThreshold: Math.ceil((currentUser.reputation_score + 1) / 500) * 500,
    badges: currentUser.badges || [],
    recentHistory: [
      { id: '1', amount: 10, reason: 'Reported Issue', timestamp: new Date().toISOString() },
      { id: '2', amount: 5, reason: 'Received Support', timestamp: new Date().toISOString() }
    ],
    summary: {
      totalReports: userIssues.length,
      totalSupports: userIssues.reduce((acc, curr) => acc + (curr.upvotes_count || 0), 0),
      totalComments: userComments.length,
      helpfulVotes: 12
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Reputation & Rewards</h1>
      
      <LevelProgress profile={reputation as any} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <BadgeGallery badgeSummary={{ badges: reputation.badges } as any} />
        </div>
        <div className="space-y-6">
          <ReputationStats reputationSummary={reputation.summary as any} badgeSummary={{ totalBadges: reputation.badges.length } as any} />
        </div>
      </div>
    </div>
  );
}
