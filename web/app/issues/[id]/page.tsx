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
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <IssueHeader 
          title={issue.title}
          category={issue.category}
          severity={issue.severity}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
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

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-6">
            <IssueStatusCard status={issue.status} />
            
            <SupportSection 
              issueId={issue.id}
              initialSupports={initialSupports}
              initialHasSupported={initialHasSupported}
              userId={userId}
            />

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

            <ShareIssue title={issue.title} />

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
