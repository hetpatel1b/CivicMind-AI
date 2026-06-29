import React from 'react';
import { Sparkles, TrendingUp, MessageSquare, ShieldCheck, Award } from 'lucide-react';
import { NotificationRecord } from '@/types/notification';
import AIActionCard from '@/components/shared/AIActionCard';
import { motion } from 'framer-motion';

interface AICivicDigestProps {
  notifications: NotificationRecord[];
}

export default function AICivicDigest({ notifications }: AICivicDigestProps) {
  if (notifications.length === 0) {
    return null;
  }

  const generateDigest = async (signal?: AbortSignal) => {
    // Simulate a brief AI "thinking" time for local data
    await new Promise(resolve => setTimeout(resolve, 800));

    // Compute basic stats for the digest from current notifications
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysNotifications = notifications.filter(
      n => new Date(n.createdAt) >= today
    );

    const unreadCount = todaysNotifications.filter(n => !n.isRead).length;
    
    const issueUpdates = todaysNotifications.filter(
      n => n.type === 'ISSUE_VERIFIED' || n.type === 'ISSUE_RESOLVED' || n.type === 'ISSUE_SUPPORTED'
    ).length;

    const reputationUpdates = todaysNotifications.filter(
      n => n.type === 'BADGE_EARNED'
    ).length;

    const communityUpdates = todaysNotifications.filter(
      n => n.type === 'COMMENT_RECEIVED'
    ).length;

    return {
      unreadCount,
      issueUpdates,
      reputationUpdates,
      communityUpdates
    };
  };

  return (
    <div className="mb-8 relative z-10">
      <AIActionCard<{unreadCount: number, issueUpdates: number, reputationUpdates: number, communityUpdates: number}>
        title="AI Activity Assistant"
        description="Generate an intelligent summary of today's civic updates and recommended actions."
        buttonLabel="Analyze Activity"
        storageKey="ai_civic_digest_notifications"
        onGenerate={generateDigest}
        icon={Sparkles}
        renderResult={(stats) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-[1px] rounded-[2rem] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
          >
            <div className="bg-[#050505]/80 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 relative overflow-hidden h-full">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white tracking-tight">Activity Analysis Complete</h4>
                    <p className="text-sm text-indigo-200">Based on your recent timeline</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-8">
                  <div className="flex-1">
                    <p className="text-gray-300 leading-relaxed text-base font-medium">
                      You&apos;ve had an active day in your civic network. 
                      {stats.unreadCount > 0 
                        ? ` There ${stats.unreadCount === 1 ? 'is' : 'are'} ${stats.unreadCount} unread update${stats.unreadCount === 1 ? '' : 's'} that require${stats.unreadCount === 1 ? 's' : ''} your attention.`
                        : ' Your inbox is completely up to date!'}
                      {stats.issueUpdates > 0 && " Some of your reported or supported issues have made progress."}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.issueUpdates > 0 && (
                    <div className="bg-emerald-500/10 rounded-2xl p-5 border border-emerald-500/20 flex flex-col items-start gap-4 shadow-inner">
                      <div className="bg-emerald-500/20 p-2.5 rounded-xl text-emerald-400 border border-emerald-500/30">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-3xl font-black text-white leading-none tracking-tight">{stats.issueUpdates}</div>
                        <div className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold mt-2">Issue Progress</div>
                      </div>
                    </div>
                  )}

                  {stats.reputationUpdates > 0 && (
                    <div className="bg-amber-500/10 rounded-2xl p-5 border border-amber-500/20 flex flex-col items-start gap-4 shadow-inner">
                      <div className="bg-amber-500/20 p-2.5 rounded-xl text-amber-400 border border-amber-500/30">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-3xl font-black text-white leading-none tracking-tight">{stats.reputationUpdates}</div>
                        <div className="text-xs uppercase tracking-widest text-amber-400/80 font-bold mt-2">Reputation</div>
                      </div>
                    </div>
                  )}

                  {stats.communityUpdates > 0 && (
                    <div className="bg-blue-500/10 rounded-2xl p-5 border border-blue-500/20 flex flex-col items-start gap-4 shadow-inner">
                      <div className="bg-blue-500/20 p-2.5 rounded-xl text-blue-400 border border-blue-500/30">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-3xl font-black text-white leading-none tracking-tight">{stats.communityUpdates}</div>
                        <div className="text-xs uppercase tracking-widest text-blue-400/80 font-bold mt-2">Discussions</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Always show at least one static insight if empty */}
                  {stats.issueUpdates === 0 && stats.reputationUpdates === 0 && stats.communityUpdates === 0 && (
                    <div className="col-span-2 md:col-span-4 bg-indigo-500/10 rounded-2xl p-5 border border-indigo-500/20 flex items-center gap-4 shadow-inner">
                      <div className="bg-indigo-500/20 p-3 rounded-xl text-indigo-400 border border-indigo-500/30">
                        <TrendingUp className="w-6 h-6 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-white tracking-tight">Community is active!</div>
                        <div className="text-sm font-medium text-indigo-200 mt-0.5">Explore the interactive map to see what&apos;s happening nearby.</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      />
    </div>
  );
}
