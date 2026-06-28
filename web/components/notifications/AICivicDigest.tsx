import React from 'react';
import { Sparkles, TrendingUp, MessageSquare, ShieldCheck, Award } from 'lucide-react';
import { NotificationRecord } from '@/types/notification';
import AIActionCard from '@/components/shared/AIActionCard';

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
    <div className="mb-8">
      <AIActionCard<{unreadCount: number, issueUpdates: number, reputationUpdates: number, communityUpdates: number}>
        title="AI Civic Digest"
        description="Get a quick summary of your civic impact and community updates from today."
        buttonLabel="Generate Smart Summary"
        storageKey="ai_civic_digest_notifications"
        onGenerate={generateDigest}
        icon={Sparkles}
        renderResult={(stats) => (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-md relative overflow-hidden mt-4">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex-1">
                <p className="text-blue-100 text-sm md:text-base max-w-xl leading-relaxed">
                  Here&apos;s a quick summary of your civic impact and community updates from today. 
                  {stats.unreadCount > 0 
                    ? ` You have ${stats.unreadCount} unread update${stats.unreadCount === 1 ? '' : 's'} requiring your attention.`
                    : ' You are all caught up!'}
                </p>
              </div>

              <div className="grid grid-cols-2 md:flex gap-3 md:gap-4 w-full md:w-auto">
                {stats.issueUpdates > 0 && (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center gap-3 flex-1 md:flex-initial">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">{stats.issueUpdates}</div>
                      <div className="text-[10px] uppercase tracking-wider text-blue-200 font-medium">Issue Updates</div>
                    </div>
                  </div>
                )}

                {stats.reputationUpdates > 0 && (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center gap-3 flex-1 md:flex-initial">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">{stats.reputationUpdates}</div>
                      <div className="text-[10px] uppercase tracking-wider text-blue-200 font-medium">Reputation</div>
                    </div>
                  </div>
                )}

                {stats.communityUpdates > 0 && (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center gap-3 flex-1 md:flex-initial">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">{stats.communityUpdates}</div>
                      <div className="text-[10px] uppercase tracking-wider text-blue-200 font-medium">Community</div>
                    </div>
                  </div>
                )}
                
                {/* Always show at least one static insight if empty */}
                {stats.issueUpdates === 0 && stats.reputationUpdates === 0 && stats.communityUpdates === 0 && (
                  <div className="col-span-2 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Community is active!</div>
                      <div className="text-[10px] text-blue-200 font-medium">Explore the map to see what&apos;s happening nearby.</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
