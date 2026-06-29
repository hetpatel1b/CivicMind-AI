import React from 'react';
import { User, Award, Activity, Shield, TrendingUp, Sparkles, Crown } from 'lucide-react';
import Image from 'next/image';
import { LeaderboardUser } from './LeaderboardTable';
import { motion, Variants } from 'framer-motion';

interface PodiumCardProps {
  user?: LeaderboardUser;
  position: 1 | 2 | 3;
  currentUserId?: string | null;
}

const PodiumCard = ({ user, position, currentUserId }: PodiumCardProps) => {
  if (!user) return <div className="flex-1 opacity-50 bg-white/5 rounded-3xl min-h-[300px] animate-pulse border border-white/10"></div>;

  const isFirst = position === 1;
  const isSecond = position === 2;
  const isCurrentUser = currentUserId === user.id;

  let highlight = "Active Contributor";
  if (user.reports > user.supports) highlight = "Top Reporter";
  else if (user.supports > 20) highlight = "Top Supporter";
  else if (user.comments > 15) highlight = "Discussion Leader";

  const getStyle = () => {
    if (isFirst) return {
      container: 'bg-gradient-to-b from-amber-500/20 to-[#0a0f1c]/90 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.2)] md:-mt-16 z-20 ring-1 ring-amber-400/20',
      badge: 'bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 shadow-[0_0_20px_rgba(251,191,36,0.6)] text-black',
      avatarRing: 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.3)]',
      glow: 'bg-amber-500/20',
      text: 'text-amber-400',
    };
    if (isSecond) return {
      container: 'bg-gradient-to-b from-slate-400/20 to-[#0a0f1c]/90 border-slate-400/50 shadow-[0_0_40px_rgba(148,163,184,0.1)] md:-mt-4 z-10',
      badge: 'bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 shadow-[0_0_15px_rgba(148,163,184,0.4)] text-black',
      avatarRing: 'border-slate-400 shadow-[0_0_20px_rgba(148,163,184,0.2)]',
      glow: 'bg-slate-400/10',
      text: 'text-slate-300',
    };
    return {
      container: 'bg-gradient-to-b from-orange-500/20 to-[#0a0f1c]/90 border-orange-500/50 shadow-[0_0_40px_rgba(249,115,22,0.1)] mt-4 md:mt-8 z-0',
      badge: 'bg-gradient-to-br from-orange-300 via-orange-500 to-orange-700 shadow-[0_0_15px_rgba(249,115,22,0.4)] text-white',
      avatarRing: 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]',
      glow: 'bg-orange-500/10',
      text: 'text-orange-400',
    };
  };

  const style = getStyle();

  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      className={`relative flex flex-col items-center p-6 sm:p-8 rounded-[2rem] border backdrop-blur-2xl transition-all duration-300 ${style.container} ${isCurrentUser ? 'ring-2 ring-indigo-500 ring-offset-4 ring-offset-[#050505]' : ''}`}
    >
      {/* Ambient background glow inside the card */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[2rem] pointer-events-none">
        <div className={`absolute -top-20 1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[60px] ${style.glow}`}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Rank Badge */}
        <div className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2">
          <div className="relative">
            <span className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl rotate-3 border border-white/20 font-black text-2xl sm:text-3xl ${style.badge}`}>
              {position}
            </span>
            {isFirst && (
              <motion.div 
                animate={{ rotate: [0, -10, 10, -10, 10, 0], y: [0, -5, 0] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-5 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"
              >
                <Crown className="w-10 h-10 text-amber-300 fill-amber-400" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Avatar */}
        <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-[2rem] rotate-3 flex items-center justify-center overflow-hidden mb-6 mt-6 sm:mt-8 border-4 bg-[#0a0f1c] ${style.avatarRing}`}>
          <div className="-rotate-3 w-full h-full flex items-center justify-center">
            {user.avatarUrl ? (
              <Image src={user.avatarUrl} alt={user.name} width={128} height={128} className="w-full h-full object-cover" />
            ) : (
              <User className="w-14 h-14 text-gray-500" />
            )}
          </div>
        </div>

        {/* Name and Role */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl sm:text-2xl font-black text-white text-center truncate max-w-[160px] sm:max-w-[200px] tracking-tight">{user.name}</h3>
          {user.role === 'official' && (
            <Shield className="w-5 h-5 text-indigo-400 shrink-0 drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]" aria-label="Verified Official" />
          )}
        </div>
        
        {isCurrentUser ? (
          <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-500 text-white px-3 py-1 rounded-full mb-6 shadow-[0_0_10px_rgba(99,102,241,0.5)] border border-indigo-400">You</span>
        ) : (
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-6 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">{user.role}</span>
        )}

        {/* Stats */}
        <div className="w-full bg-[#050505]/50 rounded-2xl p-4 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
            <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" /> Total XP
            </span>
            <span className={`text-xl font-black ${style.text} drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]`}>
              {user.reputation.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Streak</span>
             <span className="text-sm font-bold text-white flex items-center gap-1">
               <Sparkles className={`w-3.5 h-3.5 ${style.text}`} /> 12 Days
             </span>
          </div>
          <div className="flex items-center justify-between mt-2">
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Focus</span>
             <span className={`text-[11px] font-bold ${style.text}`}>{highlight}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface TopThreePodiumProps {
  users: LeaderboardUser[];
  currentUserId?: string | null;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

export default function TopThreePodium({ users, currentUserId }: TopThreePodiumProps) {
  const sorted = [...users].sort((a, b) => a.rank - b.rank);
  const first = sorted.find(u => u.rank === 1);
  const second = sorted.find(u => u.rank === 2);
  const third = sorted.find(u => u.rank === 3);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 pt-20 pb-12 max-w-5xl mx-auto items-end px-4"
    >
      <motion.div variants={itemVariants} className="order-2 md:order-1">
        <PodiumCard user={second} position={2} currentUserId={currentUserId} />
      </motion.div>
      <motion.div variants={itemVariants} className="order-1 md:order-2 md:-mt-12 relative z-10">
        <PodiumCard user={first} position={1} currentUserId={currentUserId} />
      </motion.div>
      <motion.div variants={itemVariants} className="order-3">
        <PodiumCard user={third} position={3} currentUserId={currentUserId} />
      </motion.div>
    </motion.div>
  );
}
