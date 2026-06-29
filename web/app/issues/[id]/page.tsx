'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import { getIssueDetails, IssueDetail } from '@/services/issue-details';
import { getSupportStatus } from '@/services/support';

import IssueHeader from '@/components/issues/IssueHeader';
import IssueGallery from '@/components/issues/IssueGallery';
import IssueInformation from '@/components/issues/IssueInformation';
import IssueStatusCard from '@/components/issues/IssueStatusCard';
import IssueLocationCard from '@/components/issues/IssueLocationCard';
import IssueTimeline from '@/components/issues/IssueTimeline';
import AIDuplicateAwareness from '@/components/issues/AIDuplicateAwareness';
import AIIssueSummaryWidget from '@/components/issues/AIIssueSummaryWidget';
import SupportSection from '@/components/issues/SupportSection';
import CommentSection from '@/components/issues/CommentSection';
import RelatedIssues from '@/components/issues/RelatedIssues';
import ShareIssue from '@/components/issues/ShareIssue';
import IssueSkeleton from '@/components/issues/IssueSkeleton';
import IssueNotFound from '@/components/issues/IssueNotFound';

export default function IssueDetailsPage() {
  const params = useParams();
  const rawId = params?.id;
  const issueId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [issue, setIssue] = useState<IssueDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  
  const [initialSupports, setInitialSupports] = useState(0);
  const [initialHasSupported, setInitialHasSupported] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!issueId) return;
      
      try {
        const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(issueId);
        if (!isValidUUID) {
          setLoading(false);
          return;
        }

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        const currentUserId = user?.id || null;
        setUserId(currentUserId);

        const [issueData, supportData] = await Promise.all([
          getIssueDetails(issueId),
          currentUserId 
            ? getSupportStatus(issueId, currentUserId).catch(() => ({ totalSupports: 0, userHasSupported: false }))
            : supabase.from('supports').select('id', { count: 'exact', head: true }).eq('issue_id', issueId).then(res => ({ totalSupports: res.count || 0, userHasSupported: false }))
        ]);

        if (issueData) {
          setIssue(issueData);
        }
        
        if (supportData) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setInitialSupports((supportData as any).totalSupports || 0);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setInitialHasSupported((supportData as any).userHasSupported || false);
        }

      } catch (error) {
        console.error('Error loading issue details:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [issueId]);

  if (loading) {
    return <IssueSkeleton />;
  }

  if (!issue) {
    return <IssueNotFound />;
  }

  return (
    <main className="min-h-screen bg-[#050505] relative overflow-hidden pb-24 selection:bg-indigo-500/30 text-white">
      
      {/* Background ambient noise and glows */}
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Investigation Hero Header - Full Width */}
      <div className="relative z-10 pt-24 pb-8 border-b border-white/10 bg-[#0a0f1c]/30 backdrop-blur-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <IssueHeader 
            title={issue.title}
            category={issue.category}
            severity={issue.severity}
            status={issue.status}
            createdAt={issue.created_at}
          />
        </div>
      </div>

      {/* Top Action Bar Wrapper - Moved ShareIssue here temporarily */}
      <div className="sticky top-[73px] z-20 bg-[#0a0f1c]/80 backdrop-blur-3xl border-b border-white/10 shadow-sm py-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
             {/* Action bar will replace standard components later */}
             <SupportSection 
              issueId={issue.id}
              initialSupports={initialSupports}
              initialHasSupported={initialHasSupported}
              userId={userId}
            />
          </div>
          <div className="flex items-center gap-4">
            <ShareIssue title={issue.title} />
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* Main Investigation Column */}
          <div className="flex-1 w-full min-w-0 space-y-8">
            <AIIssueSummaryWidget issue={issue} comments={[]} />

            <IssueGallery images={issue.images} />
            
            <IssueInformation 
              description={issue.description}
              reporter={issue.reporter}
              createdAt={issue.created_at}
            />

            <AIDuplicateAwareness 
              currentIssueId={issue.id}
              category={issue.category}
              title={issue.title}
              description={issue.description}
            />

            <CommentSection 
              issueId={issue.id}
              userId={userId}
            />
          </div>

          {/* Right Sidebar Column */}
          <div className="w-full xl:w-[400px] shrink-0 flex flex-col gap-6 sticky top-[180px]">
            <IssueStatusCard status={issue.status} />
            
            <IssueLocationCard 
              latitude={issue.latitude}
              longitude={issue.longitude}
              locationName={issue.location_name}
            />

            <IssueTimeline 
              status={issue.status}
              createdAt={issue.created_at}
              updatedAt={issue.updated_at}
            />

            <RelatedIssues 
              currentIssueId={issue.id}
              category={issue.category}
            />
          </div>
          
        </div>
      </div>
    </main>
  );
}
