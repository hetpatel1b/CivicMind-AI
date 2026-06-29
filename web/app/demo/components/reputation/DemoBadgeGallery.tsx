'use client';

import React, { useState } from 'react';
import { Award, Lock, ChevronRight, CheckCircle2, Shield, Flame, Star, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBadgeDefinitions, checkEligibleBadges } from '@/services/badges';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DemoBadgeGallery({ profile }: { profile: any }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const definitions = getBadgeDefinitions();
  const eligibleTypes = checkEligibleBadges(profile.totalPoints || 0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rarityConfig: Record<string, { color: string, label: string, icon: any }> = {
    'FIRST_REPORTER': { color: 'text-gray-400 border-gray-400 bg-gray-500/10 ring-gray-400/20', label: 'Common', icon: Shield },
    'ACTIVE_CITIZEN': { color: 'text-emerald-400 border-emerald-400 bg-emerald-500/10 ring-emerald-400/20', label: 'Rare', icon: Star },
    'COMMUNITY_LEADER': { color: 'text-purple-400 border-purple-400 bg-purple-500/10 ring-purple-400/20', label: 'Epic', icon: Flame },
    'CIVIC_CHAMPION': { color: 'text-amber-400 border-amber-400 bg-amber-500/10 ring-amber-400/20', label: 'Legendary', icon: Zap },
  };

  const getRequirements = (type: string) => {
    switch(type) {
      case 'FIRST_REPORTER': return { xp: 10, task: 'Verify or report your first civic issue on the platform.' };
      case 'ACTIVE_CITIZEN': return { xp: 50, task: 'Maintain a 7-day streak of community engagement.' };
      case 'COMMUNITY_LEADER': return { xp: 150, task: 'Receive 50+ upvotes on a single community report.' };
      case 'CIVIC_CHAMPION': return { xp: 300, task: 'Rank in the top 1% of citizens in your city district.' };
      default: return { xp: 0, task: 'Complete community tasks.' };
    }
  };

  return (
    <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 p-8 relative overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">Achievement Gallery</h3>
            <p className="text-[10px] font-black text-amber-300/70 uppercase tracking-widest mt-1">
              {eligibleTypes.length} / {definitions.length} Unlocked
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {definitions.map((def, idx) => {
          const isUnlocked = eligibleTypes.includes(def.type);
          const rarity = rarityConfig[def.type] || rarityConfig['FIRST_REPORTER'];
          const RarityIcon = rarity.icon;
          const req = getRequirements(def.type);
          
          let progress = 0;
          if (isUnlocked) progress = 100;
          else {
            progress = Math.min(99, Math.max(0, ((profile.totalPoints || 0) / req.xp) * 100));
          }

          return (
            <motion.div 
              key={def.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedBadge({ ...def, isUnlocked, rarity, req, progress })}
              className={`relative group cursor-pointer rounded-2xl border p-4 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isUnlocked ? `bg-[#050505] border-white/10 ${rarity.color.split(' ')[3]}` : 'bg-[#050505]/50 border-white/5 opacity-60 hover:opacity-100 grayscale hover:grayscale-0'}`}
            >
              <div className="absolute top-2 right-2">
                {isUnlocked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-600" />
                )}
              </div>
              
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 border shadow-inner ${isUnlocked ? rarity.color : 'bg-gray-900 border-gray-700 text-gray-600'}`}>
                <Award className={`w-7 h-7 ${isUnlocked ? 'drop-shadow-lg' : ''}`} />
              </div>
              
              <h4 className="text-sm font-bold text-white mb-1 leading-tight">{def.name}</h4>
              <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${isUnlocked ? rarity.color : 'text-gray-500 border-gray-700'}`}>
                {rarity.label}
              </div>

              {!isUnlocked && (
                <div className="w-full mt-4">
                  <div className="flex justify-between text-[9px] font-black text-gray-500 mb-1">
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-500 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Badge Detail Drawer Overlay */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#050505]/80 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-6"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
              className="w-full sm:max-w-md bg-[#0a0f1c] border border-white/10 rounded-t-[2rem] sm:rounded-[2rem] p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] sm:shadow-2xl flex flex-col"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6 sm:hidden" />
              
              <div className="flex items-start gap-5 mb-6">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 shrink-0 ${selectedBadge.isUnlocked ? selectedBadge.rarity.color : 'bg-gray-900 border-gray-700 text-gray-600'}`}>
                  <Award className="w-10 h-10 drop-shadow-xl" />
                </div>
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border mb-2 ${selectedBadge.isUnlocked ? selectedBadge.rarity.color : 'text-gray-500 border-gray-700'}`}>
                    <selectedBadge.rarity.icon className="w-3 h-3" />
                    {selectedBadge.rarity.label} Rarity
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight leading-none mb-2">{selectedBadge.name}</h3>
                  <p className="text-sm font-medium text-gray-400 leading-relaxed">{selectedBadge.description}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Unlock Requirement</h4>
                <div className="text-sm font-bold text-white mb-4">{selectedBadge.req.task}</div>
                
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-gray-400">Progress</span>
                  <span className={selectedBadge.isUnlocked ? 'text-emerald-400' : 'text-indigo-400'}>{selectedBadge.progress.toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedBadge.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full rounded-full ${selectedBadge.isUnlocked ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
                  />
                </div>
              </div>

              <button 
                onClick={() => setSelectedBadge(null)}
                className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
              >
                Close Details
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
