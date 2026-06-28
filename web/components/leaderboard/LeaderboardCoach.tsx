import React from 'react';
import { Sparkles, TrendingUp, Target, Award } from 'lucide-react';
import { LeaderboardUser } from './LeaderboardTable';

interface LeaderboardCoachProps {
  users: LeaderboardUser[];
  currentUserId: string | null;
}

export default function LeaderboardCoach({ users, currentUserId }: LeaderboardCoachProps) {
  if (!currentUserId || users.length === 0) return null;

  const currentUser = users.find(u => u.id === currentUserId);
  
  if (!currentUser) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl p-5 mb-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-2.5 rounded-xl shadow-sm shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              Civic AI Coach
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">Beta</span>
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 font-medium">
              Start reporting issues or verifying reports to get on the leaderboard!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate insights based on existing data (no fabrication)
  const rank = currentUser.rank;
  const rep = currentUser.reputation;
  
  // Find the person immediately above them
  const targetUser = users.find(u => u.rank === rank - 1);
  const repToNextRank = targetUser ? targetUser.reputation - rep + 1 : 0;
  
  let aiMessage = "";
  let Icon = TrendingUp;
  let iconColor = "text-green-500";
  
  if (rank === 1) {
    aiMessage = "You're the top civic hero! Keep verifying issues to maintain your lead.";
    Icon = Award;
    iconColor = "text-yellow-500";
  } else if (rank <= 3) {
    aiMessage = `You're in the Top 3! Only ${repToNextRank} reputation points needed to reach Rank #${rank - 1}.`;
    Icon = TrendingUp;
    iconColor = "text-blue-500";
  } else if (targetUser) {
    if (repToNextRank <= 50) {
      aiMessage = `You're incredibly close! Earn ${repToNextRank} more reputation to overtake Rank #${rank - 1}. Try supporting a recent community report.`;
      Icon = Target;
      iconColor = "text-orange-500";
    } else {
      aiMessage = `You are Rank #${rank}. Reporting a verified issue or adding helpful comments will help you climb the ranks faster.`;
      Icon = TrendingUp;
      iconColor = "text-teal-500";
    }
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl p-5 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-2.5 rounded-xl shadow-sm shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Civic AI Coach
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">Beta</span>
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 font-medium">
            {aiMessage}
          </p>
        </div>
      </div>
      
      {rank > 1 && targetUser && (
        <div className="flex items-center gap-3 bg-white/60 dark:bg-gray-800/60 px-4 py-2.5 rounded-xl border border-blue-100/50 dark:border-blue-800/30 shrink-0">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Next Milestone</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">Rank #{rank - 1} ({repToNextRank} pts away)</span>
          </div>
        </div>
      )}
    </div>
  );
}
