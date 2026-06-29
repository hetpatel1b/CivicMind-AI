import React from 'react';
import { Star, Trophy, Award, ShieldAlert, CalendarHeart } from 'lucide-react';
import { Badge } from '@/types/badge';
import ReputationEmptyState from './ReputationEmptyState';
import { motion } from 'framer-motion';

interface AchievementTimelineProps {
  events: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */; // reputation events
  userBadges: { badgeType: string; awardedAt: string }[];
  badgeDefinitions: Badge[];
}

export default function AchievementTimeline({ events, userBadges, badgeDefinitions }: AchievementTimelineProps) {
  
  // Find the earliest event to mark "Joined CivicMind"
  let joinedEvent = null;
  if (events.length > 0) {
    const earliestEvent = events.reduce((earliest, current) => 
      new Date(current.created_at) < new Date(earliest.created_at) ? current : earliest
    , events[0]);
    
    joinedEvent = {
      id: 'joined',
      type: 'JOINED',
      date: new Date(earliestEvent.created_at),
      name: 'Joined CivicMind',
      icon: CalendarHeart,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/20 border-indigo-500/30',
      glow: 'drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]'
    };
  }

  // Create a unified list of major events
  const majorEvents = events
    .filter(e => e.type === 'ISSUE_RESOLVED' || e.type === 'ISSUE_VERIFIED')
    .map(e => ({
      id: e.id,
      type: e.type,
      date: new Date(e.created_at),
      name: e.type === 'ISSUE_RESOLVED' ? 'Issue Resolved' : 'Issue Verified',
      icon: e.type === 'ISSUE_RESOLVED' ? Trophy : ShieldAlert,
      color: e.type === 'ISSUE_RESOLVED' ? 'text-emerald-400' : 'text-blue-400',
      bg: e.type === 'ISSUE_RESOLVED' ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-blue-500/20 border-blue-500/30',
      glow: e.type === 'ISSUE_RESOLVED' ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]'
    }));

  const badgeEvents = userBadges.map(ub => {
    const def = badgeDefinitions.find(d => d.type === ub.badgeType);
    return {
      id: `badge-${ub.badgeType}`,
      type: 'BADGE_EARNED',
      date: new Date(ub.awardedAt),
      name: `Badge Unlocked: ${def?.name || ub.badgeType}`,
      icon: Award,
      color: 'text-amber-400',
      bg: 'bg-amber-500/20 border-amber-500/30',
      glow: 'drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]'
    };
  });

  let timeline = [...majorEvents, ...badgeEvents];
  if (joinedEvent) {
    timeline.push(joinedEvent);
  }
  
  timeline = timeline.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 h-full ring-1 ring-white/10 relative overflow-hidden group">
      <div className="absolute top-0 left-0 -ml-20 -mt-20 w-[30rem] h-[30rem] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />

      <div className="flex items-center gap-5 mb-10 relative z-10">
        <div className="p-4 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <Star className="w-8 h-8 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">Civic Journey</h3>
          <p className="text-sm font-medium text-gray-400 mt-1">Your major milestones over time</p>
        </div>
      </div>
      
      {timeline.length === 0 ? (
        <ReputationEmptyState 
          icon={<Star className="w-8 h-8" />}
          title="No Major Achievements"
          description="Keep participating in the community to unlock major milestones."
        />
      ) : (
        <div className="relative z-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="relative border-l-2 border-white/10 ml-6 space-y-8 pt-4 pb-4">
          {timeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-10 group/item"
              >
                <span className={`absolute -left-[23px] top-0 rounded-[1rem] p-2.5 border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover/item:scale-110 group-hover/item:rotate-12 ${item.bg} backdrop-blur-md`}>
                  <Icon className={`w-5 h-5 ${item.color} ${item.glow}`} />
                </span>
                <div className="flex flex-col gap-1.5 bg-[#0a0f1c]/80 backdrop-blur-md p-5 rounded-2xl border border-white/5 shadow-inner group-hover/item:border-white/20 transition-colors">
                  <h4 className="text-base font-black text-white tracking-tight">
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    {item.date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>
      )}
    </div>
  );
}
