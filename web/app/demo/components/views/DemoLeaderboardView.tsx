import React, { useState } from 'react';
import { useDemo } from '../../context/DemoProvider';
import LeaderboardTable, { LeaderboardUser } from '../../../../components/leaderboard/LeaderboardTable';
import TopThreePodium from '../../../../components/leaderboard/TopThreePodium';
import { Card } from '@/design-system/components/Card';

interface DemoLeaderboardViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function DemoLeaderboardView({ onNavigate }: DemoLeaderboardViewProps) {
  const { users, currentUser, issues, comments } = useDemo();
  
  // Create leaderboard users list
  const rankedUsers = users
    .filter(u => u.role === 'citizen')
    .sort((a, b) => b.reputation_score - a.reputation_score)
    .map((user, index) => {
      const userIssues = issues.filter(i => i.user_id === user.id);
      const userComments = comments.filter(c => c.user_id === user.id);
      const supports = userIssues.reduce((acc, curr) => acc + (curr.upvotes_count || 0), 0);

      return {
        id: user.id,
        rank: index + 1,
        name: user.full_name,
        avatarUrl: user.avatar_url,
        role: user.role,
        reputation: user.reputation_score,
        badges: (user.badges || []).length,
        reports: userIssues.length,
        supports: supports,
        comments: userComments.length,
        status: 'active' as const
      };
    });

  const topThree = rankedUsers.slice(0, 3);
  const remainingUsers = rankedUsers.slice(3);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Community Leaderboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Recognizing the most active and helpful citizens making our city a better place to live.
        </p>
      </div>

      <div className="flex justify-center w-full">
        <TopThreePodium users={topThree} currentUserId={currentUser.id} />
      </div>

      <Card className="p-0 overflow-hidden">
        <LeaderboardTable users={remainingUsers} currentUserId={currentUser.id} />
      </Card>
    </div>
  );
}
