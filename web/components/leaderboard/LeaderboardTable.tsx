import React from 'react';
import { User, Award, Shield, MessageSquare, ThumbsUp, Activity, ExternalLink, Mail, ArrowUpRight, ArrowRight, ArrowDownRight, Sparkles } from 'lucide-react';
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
  // Deterministic mock trend generator based on user ID
  const getTrend = (userId: string) => {
    const seed = userId.charCodeAt(0) + userId.charCodeAt(userId.length - 1);
    if (seed % 3 === 0) return { type: 'up', icon: ArrowUpRight, color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
    if (seed % 3 === 1) return { type: 'down', icon: ArrowDownRight, color: 'text-rose-400', bg: 'bg-rose-500/10' };
    return { type: 'flat', icon: ArrowRight, color: 'text-gray-400', bg: 'bg-white/5' };
  };

  return (
    <div className="overflow-x-auto w-full pb-4">
      <table className="w-full text-left border-collapse min-w-[800px]" aria-label="Leaderboard rankings">
        <thead>
          <tr className="border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-300/80 bg-white/5 backdrop-blur-md">
            <th scope="col" className="p-5 font-black w-24 text-center" aria-sort="ascending">Rank</th>
            <th scope="col" className="p-5 font-black">Citizen Profile</th>
            <th scope="col" className="p-5 font-black text-right" aria-sort="descending">Total XP</th>
            <th scope="col" className="p-5 font-black text-right">Achievements</th>
            <th scope="col" className="p-5 font-black text-right">Activity Breakdown</th>
            <th scope="col" className="p-5 font-black text-center w-28">Status</th>
            <th scope="col" className="p-5 font-black text-right w-24">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {users.map((user) => {
            const isCurrentUser = currentUserId === user.id;
            const trend = getTrend(user.id);
            const TrendIcon = trend.icon;

            return (
              <tr 
                key={user.id} 
                className={`group transition-all duration-300 hover:bg-white/5 relative ${
                  isCurrentUser 
                    ? 'bg-indigo-500/10 hover:bg-indigo-500/20 z-10' 
                    : 'bg-transparent z-0'
                }`}
              >
                <td className="p-5 relative">
                  {/* Highlight bar for current user */}
                  {isCurrentUser && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />}
                  <div className="flex items-center justify-center gap-3">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-black text-sm border ${
                      user.rank === 1 ? 'bg-gradient-to-br from-yellow-300 to-amber-600 text-black border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]' :
                      user.rank === 2 ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-black border-slate-400 shadow-[0_0_15px_rgba(148,163,184,0.2)]' :
                      user.rank === 3 ? 'bg-gradient-to-br from-orange-300 to-orange-600 text-white border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]' :
                      'bg-white/5 text-gray-400 border-white/10 font-bold'
                    }`}>
                      {user.rank}
                    </span>
                    <div className={`p-1.5 rounded-lg ${trend.bg}`}>
                      <TrendIcon className={`w-3.5 h-3.5 ${trend.color}`} aria-label={`Trend: ${trend.type}`} />
                    </div>
                  </div>
                </td>
                
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-[1rem] bg-[#050505] flex items-center justify-center overflow-hidden shrink-0 border border-white/10 ${isCurrentUser ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0a0f1c]' : ''}`}>
                      {user.avatarUrl ? (
                        <Image src={user.avatarUrl} alt={user.name} width={48} height={48} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-white flex items-center gap-2 text-base tracking-tight group-hover:text-indigo-300 transition-colors">
                        {user.name}
                        {isCurrentUser && (
                          <span className="text-[9px] font-black uppercase tracking-widest bg-indigo-500 text-white px-2 py-0.5 rounded-md shadow-[0_0_10px_rgba(99,102,241,0.5)]">You</span>
                        )}
                        {user.role === 'official' && (
                          <Shield className="w-4 h-4 text-indigo-400 drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]" aria-label="Verified Official" />
                        )}
                      </div>
                      <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        {user.role}
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="p-5 text-right">
                  <div className="font-black text-lg text-indigo-300 flex items-center justify-end gap-2 bg-indigo-500/10 border border-indigo-500/20 py-1.5 px-4 rounded-xl inline-flex drop-shadow-[0_0_5px_rgba(99,102,241,0.2)]">
                    <Activity className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                    {user.reputation.toLocaleString()}
                  </div>
                </td>
                
                <td className="p-5 text-right">
                  <div className="flex items-center justify-end gap-2 text-amber-300 font-black bg-amber-500/10 border border-amber-500/20 py-1.5 px-4 rounded-xl inline-flex drop-shadow-[0_0_5px_rgba(245,158,11,0.2)]">
                    <Award className="w-4 h-4 text-amber-400" aria-hidden="true" />
                    {user.badges}
                  </div>
                </td>
                
                <td className="p-5">
                  <div className="flex items-center justify-end gap-4 text-sm font-bold text-gray-400">
                    <div className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors" title="Reports">
                      <Shield className="w-4 h-4 text-gray-500 group-hover:text-emerald-500 transition-colors" /> {user.reports}
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-amber-400 transition-colors" title="Supports">
                      <ThumbsUp className="w-4 h-4 text-gray-500 group-hover:text-amber-500 transition-colors" /> {user.supports}
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-purple-400 transition-colors" title="Comments">
                      <MessageSquare className="w-4 h-4 text-gray-500 group-hover:text-purple-500 transition-colors" /> {user.comments}
                    </div>
                  </div>
                </td>
                
                <td className="p-5 text-center">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border ${
                    user.status === 'active' 
                      ? 'bg-emerald-500/10 border-emerald-500/30' 
                      : 'bg-white/5 border-white/10'
                  }`} title={user.status === 'active' ? 'Online' : 'Offline'}>
                    <span className={`w-2.5 h-2.5 rounded-full ${user.status === 'active' ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]' : 'bg-gray-600'}`}></span>
                  </span>
                </td>
                
                <td className="p-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="p-2 text-gray-400 hover:text-indigo-300 hover:bg-indigo-500/20 rounded-xl transition-all border border-transparent hover:border-indigo-500/30"
                      aria-label={`Message ${user.name}`}
                      title="Message (Coming soon)"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <Link
                      href={`/profile?id=${user.id}&public=true`}
                      className="p-2 text-gray-400 hover:text-indigo-300 hover:bg-indigo-500/20 rounded-xl transition-all border border-transparent hover:border-indigo-500/30"
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
