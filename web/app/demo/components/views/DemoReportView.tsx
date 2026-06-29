import React from 'react';
import { useDemo } from '../../context/DemoProvider';
import ReportForm from '../../../../components/report/ReportForm';

interface DemoReportViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function DemoReportView({ onNavigate }: DemoReportViewProps) {
  const { addIssue, currentUser } = useDemo();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDemoSubmit = (payload: any) => {
    const newIssue = {
      id: `issue-demo-${Date.now()}`,
      title: payload.title,
      description: payload.description,
      category: payload.category,
      sub_category: 'Demo Category',
      latitude: payload.latitude,
      longitude: payload.longitude,
      address: 'Demo Location, City',
      status: 'pending',
      urgency: payload.severity,
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      ai_confidence_score: 0.95,
      upvotes_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      images: [payload.imageUrl]
    };
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addIssue(newIssue as any);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
          Report a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Civic Issue</span>
        </h1>
        <p className="text-base text-gray-400 font-medium max-w-xl mx-auto mb-6 leading-relaxed">
          Collaborate with CivicMind AI to categorize, describe, and route your community report in under 60 seconds.
        </p>
      </div>

      <ReportForm isDemo={true} onDemoSubmit={handleDemoSubmit} />
    </div>
  );
}
