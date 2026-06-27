import React from 'react';
import { User, Award, Shield, MessageSquare, ThumbsUp, Activity, ExternalLink, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatarUrl?: string;
  role: string;
  reputation: number;
  badges: number;
  reports: number;
  supports: number;
  comments: number;
  status: 'active' | 'inactive';
}

interface LeaderboardTableProps {
  users: LeaderboardUser[];
  currentUserId?: string | null;
}

export default function LeaderboardTable({ users, currentUserId }: LeaderboardTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse" aria-label="Leaderboard rankings">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/30">
            <th scope="col" className="p-4 font-semibold w-16 text-center" aria-sort="ascending">Rank</th>
            <th scope="col" className="p-4 font-semibold">User</th>
            <th scope="col" className="p-4 font-semibold text-right" aria-sort="descending">Reputation</th>
            <th scope="col" className="p-4 font-semibold text-right hidden sm:table-cell">Badges</th>
            <th scope="col" className="p-4 font-semibold text-right hidden md:table-cell">Reports</th>
            <th scope="col" className="p-4 font-semibold text-right hidden lg:table-cell">Supports</th>
            <th scope="col" className="p-4 font-semibold text-right hidden lg:table-cell">Comments</th>
            <th scope="col" className="p-4 font-semibold text-center hidden xl:table-cell">Status</th>
            <th scope="col" className="p-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
          {users.map((user) => {
            const isCurrentUser = currentUserId === user.id;
            return (
              <tr 
                key={user.id} 
                className={`group transition-colors ${
                  isCurrentUser 
                    ? 'bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/30'
                }`}
              >
                <td className="p-4 text-center">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                    user.rank === 1 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500' :
                    user.rank === 2 ? 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300' :
                    user.rank === 3 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-500' :
                    'text-gray-500 dark:text-gray-400'
                  }`}>
                    {user.rank}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0 ${isCurrentUser ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' : ''}`}>
                      {user.avatarUrl ? (
                        <Image src={user.avatarUrl} alt={user.name} width={40} height={40} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        {user.name}
                        {isCurrentUser && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-1.5 py-0.5 rounded">You</span>
                        )}
                        {user.role === 'official' && (
                          <Shield className="w-3.5 h-3.5 text-blue-500" aria-label="Verified Official" />
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {user.role}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-bold text-blue-600 dark:text-blue-400 flex items-center justify-end gap-1.5">
                    <Activity className="w-4 h-4" aria-hidden="true" />
                    {user.reputation.toLocaleString()}
                  </div>
                </td>
                <td className="p-4 text-right hidden sm:table-cell">
                  <div className="flex items-center justify-end gap-1.5 text-gray-700 dark:text-gray-300 font-medium">
                    <Award className="w-4 h-4 text-yellow-500" aria-hidden="true" />
                    {user.badges}
                  </div>
                </td>
                <td className="p-4 text-right hidden md:table-cell">
                  <div className="flex items-center justify-end gap-1.5 text-gray-700 dark:text-gray-300 font-medium">
                    <Shield className="w-4 h-4 text-green-500" aria-hidden="true" />
                    {user.reports}
                  </div>
                </td>
                <td className="p-4 text-right hidden lg:table-cell">
                  <div className="flex items-center justify-end gap-1.5 text-gray-700 dark:text-gray-300 font-medium">
                    <ThumbsUp className="w-4 h-4 text-orange-500" aria-hidden="true" />
                    {user.supports}
                  </div>
                </td>
                <td className="p-4 text-right hidden lg:table-cell">
                  <div className="flex items-center justify-end gap-1.5 text-gray-700 dark:text-gray-300 font-medium">
                    <MessageSquare className="w-4 h-4 text-purple-500" aria-hidden="true" />
                    {user.comments}
                  </div>
                </td>
                <td className="p-4 text-center hidden xl:table-cell">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      aria-label={`Message ${user.name}`}
                      title="Message (Coming soon)"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <Link
                      href={`/profile?id=${user.id}&public=true`}
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      aria-label={`View ${user.name}'s profile`}
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
