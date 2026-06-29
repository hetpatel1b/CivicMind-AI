import React from 'react';
import { User, Calendar, ShieldCheck, MapPin, Quote } from 'lucide-react';
import { ReputationProfile } from '@/types/reputation';
import { motion } from 'framer-motion';

interface ProfileHeaderProps {
  fullName: string | null;
  email: string | null;
  avatarUrl: string | null;
  createdAt: string;
  reputationProfile?: ReputationProfile;
}

export default function ProfileHeader({ fullName, email, avatarUrl, createdAt, reputationProfile }: ProfileHeaderProps) {
  const memberSince = new Date(createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
  });

  const isVerified = (reputationProfile?.totalPoints || 0) >= 100;
  const level = reputationProfile?.level || 'Active Citizen';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[2.5rem] bg-[#050505]/60 backdrop-blur-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10 group"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[40rem] h-[40rem] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[35rem] h-[35rem] bg-purple-500/10 blur-[80px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <motion.div 
           animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }} 
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[20%] left-[20%] w-2 h-2 bg-indigo-400 rounded-full blur-[1px]" 
         />
         <motion.div 
           animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }} 
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="absolute top-[60%] right-[30%] w-3 h-3 bg-purple-400 rounded-full blur-[2px]" 
         />
         <motion.div 
           animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }} 
           transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute bottom-[20%] left-[40%] w-1.5 h-1.5 bg-blue-400 rounded-full blur-[1px]" 
         />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
        
        {/* Avatar with Animated Ring */}
        <div className="relative shrink-0 group/avatar">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#0a0f1c] flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover/avatar:scale-105 z-10 border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-16 h-16 text-indigo-300/50" />
            )}
          </div>
          
          {/* Animated SVG Ring */}
          <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] rotate-90 z-0 pointer-events-none drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">
            <circle cx="50%" cy="50%" r="47%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
            <motion.circle 
              cx="50%" 
              cy="50%" 
              r="47%" 
              fill="none" 
              stroke="url(#gradientRing)" 
              strokeWidth="4"
              strokeDasharray="100 100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: Math.max(0, 100 - Math.min((reputationProfile?.totalPoints || 0) / 10, 100)) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradientRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>

          {isVerified && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="absolute -bottom-2 -right-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full p-2.5 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-20 border border-emerald-300/30"
              title="Verified Citizen"
            >
              <ShieldCheck className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </div>
        
        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start w-full">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
            <span className="px-4 py-1.5 bg-indigo-500/20 backdrop-blur-md rounded-xl text-xs font-black uppercase tracking-widest text-indigo-300 border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
              {level}
            </span>
            {isVerified && (
              <span className="px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md rounded-xl text-xs font-black uppercase tracking-widest text-emerald-300 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                Verified Profile
              </span>
            )}
            <span className="px-4 py-1.5 bg-purple-500/20 backdrop-blur-md rounded-xl text-xs font-black uppercase tracking-widest text-purple-300 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              {reputationProfile?.totalPoints || 0} XP
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] tracking-tight">
            {fullName || 'Civic Member'}
          </h1>
          
          {email && (
            <p className="text-indigo-200/60 font-semibold text-lg mb-6 flex items-center gap-2 justify-center md:justify-start">
              {email}
            </p>
          )}
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 w-full">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-300 bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 transition-colors backdrop-blur-md shadow-inner">
              <Calendar className="w-4 h-4 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              Member since {memberSince}
            </div>
            
            <div className="flex items-center gap-2 text-sm font-bold text-gray-300 bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 transition-colors backdrop-blur-md shadow-inner">
              <MapPin className="w-4 h-4 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              Global Citizen
            </div>
          </div>
        </div>
        
        {/* Quick Actions (Edit / Share) */}
        <div className="hidden lg:flex w-64 shrink-0 flex-col gap-4 relative">
          <div className="bg-[#0a0f1c]/80 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
             <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 text-center">Trust Score</div>
             <div className="text-3xl font-black text-white text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
               98<span className="text-sm text-indigo-400 ml-1">/100</span>
             </div>
             <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
               <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-[98%] h-full rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
             </div>
          </div>
          
          <div className="flex gap-3">
             <a href="/settings" className="flex-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl py-3 text-center text-sm font-bold transition-colors shadow-[0_0_15px_rgba(99,102,241,0.2)]">
               Edit Profile
             </a>
             <button className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-xl py-3 text-center text-sm font-bold transition-colors shadow-inner">
               Share
             </button>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
}
