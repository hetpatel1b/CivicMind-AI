import React from 'react';
import { User, Award, Activity, Shield } from 'lucide-react';
import Image from 'next/image';
import { LeaderboardUser } from './LeaderboardTable';

interface PodiumCardProps {
  user?: LeaderboardUser;
  position: 1 | 2 | 3;
  currentUserId?: string | null;
}

const PodiumCard = ({ user, position, currentUserId }: PodiumCardProps) => {
  if (!user) return <div className="flex-1 opacity-50 bg-gray-100 dark:bg-gray-800 rounded-2xl min-h-[200px] animate-pulse"></div>;

  const isFirst = position === 1;
  const isSecond = position === 2;
  const isCurrentUser = currentUserId === user.id;

  return (
    <div 
      className={`flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-3xl border shadow-sm relative transition-transform hover:-translate-y-1 ${
        isFirst ? 'border-yellow-200 dark:border-yellow-900/50 shadow-yellow-100 dark:shadow-none md:-mt-8 z-10' :
        isSecond ? 'border-gray-200 dark:border-gray-700 mt-0' :
        'border-orange-200 dark:border-orange-900/30 mt-0 md:mt-4'
      } ${isCurrentUser ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' : ''}`}
    >
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <span className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 font-bold text-lg ${
          isFirst ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-500' :
          isSecond ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' :
          'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-500'
        }`}>
          {position}
        </span>
      </div>

      <div className={`w-24 h-24 rounded-full flex items-center justify-center overflow-hidden mb-4 mt-2 border-4 ${
        isFirst ? 'border-yellow-100 dark:border-yellow-900/30' :
        isSecond ? 'border-gray-100 dark:border-gray-700' :
        'border-orange-100 dark:border-orange-900/20'
      } bg-gray-50 dark:bg-gray-900`}>
        {user.avatarUrl ? (
          <Image src={user.avatarUrl} alt={user.name} width={96} height={96} className="w-full h-full object-cover" />
        ) : (
          <User className="w-10 h-10 text-gray-400" />
        )}
      </div>

      <div className="flex items-center gap-1.5 mb-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center truncate px-2">{user.name}</h3>
        {user.role === 'official' && (
          <Shield className="w-4 h-4 text-blue-500 shrink-0" aria-label="Verified Official" />
        )}
      </div>
      
      {isCurrentUser ? (
        <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full mb-3">You</span>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 capitalize">{user.role}</p>
      )}

      <div className="flex flex-col items-center w-full gap-2">
        <div className="flex items-center justify-between w-full px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Reputation</span>
          <div className="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" aria-hidden="true" />
            {user.reputation.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center justify-between w-full px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Badges</span>
          <div className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-yellow-500" aria-hidden="true" />
            {user.badges}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TopThreePodiumProps {
  users: LeaderboardUser[];
  currentUserId?: string | null;
}

export default function TopThreePodium({ users, currentUserId }: TopThreePodiumProps) {
  // Sort users by rank to ensure correct podium positions
  const sorted = [...users].sort((a, b) => a.rank - b.rank);
  const first = sorted.find(u => u.rank === 1);
  const second = sorted.find(u => u.rank === 2);
  const third = sorted.find(u => u.rank === 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 pb-6 md:pt-16 max-w-4xl mx-auto items-start">
      <div className="order-2 md:order-1">
        <PodiumCard user={second} position={2} currentUserId={currentUserId} />
      </div>
      <div className="order-1 md:order-2">
        <PodiumCard user={first} position={1} currentUserId={currentUserId} />
      </div>
      <div className="order-3">
        <PodiumCard user={third} position={3} currentUserId={currentUserId} />
      </div>
    </div>
  );
}
