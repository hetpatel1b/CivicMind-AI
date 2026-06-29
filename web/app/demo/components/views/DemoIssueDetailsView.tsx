import React from 'react';
import { useDemo } from '../../context/DemoProvider';
import IssueHeader from '../../../../components/issues/IssueHeader';
import IssueInformation from '../../../../components/issues/IssueInformation';
import IssueStatusCard from '../../../../components/issues/IssueStatusCard';
import IssueLocationCard from '../../../../components/issues/IssueLocationCard';
import IssueTimeline from '../../../../components/issues/IssueTimeline';
import SupportSection from '../../../../components/issues/SupportSection';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/design-system/components/Card';
import { Button } from '@/design-system/components/Button';

interface DemoIssueDetailsViewProps {
  issueId: string;
  onNavigate: (view: string, id?: string | null) => void;
}

export default function DemoIssueDetailsView({ issueId, onNavigate }: DemoIssueDetailsViewProps) {
  const { issues, currentUser, users } = useDemo();
  const issue = issues.find(i => i.id === issueId);
  
  if (!issue) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-bold">Issue Not Found</h2>
        <Button onClick={() => onNavigate('feed')} variant="ghost" className="mt-4 text-blue-600">Back to Feed</Button>
      </div>
    );
  }

  const reporter = users.find(u => u.id === issue.user_id) || {
    full_name: issue.user_name,
    avatar_url: null,
    reputation_score: 500
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 overflow-x-hidden w-full px-4 sm:px-6">
      <Button 
        onClick={() => onNavigate('feed')}
        variant="ghost"
        className="flex items-center gap-2 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Feed
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <IssueHeader 
            title={issue.title}
            category={issue.category}
            severity={issue.urgency}
          />

          {issue.images && issue.images.length > 0 && (
            <Card className="p-2">
              <img 
                src={issue.images[0]} 
                alt="Issue" 
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </Card>
          )}

          <IssueInformation 
            description={issue.description}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reporter={reporter as any}
            createdAt={issue.created_at}
          />

          <SupportSection 
            issueId={issue.id}
            initialSupports={issue.upvotes_count || 0}
            initialHasSupported={false}
            userId={currentUser.id}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <IssueStatusCard status={issue.status} />
          
          <IssueLocationCard 
            locationName={issue.address || 'Unknown Location'}
            latitude={issue.latitude}
            longitude={issue.longitude}
          />

          <IssueTimeline status={(issue.status || 'OPEN').toUpperCase()} createdAt={issue.created_at} updatedAt={issue.updated_at} />
        </div>
      </div>
    </div>
  );
}
