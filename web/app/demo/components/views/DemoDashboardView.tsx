import React, { useState, useEffect } from 'react';
import { useDemo } from '../../context/DemoProvider';
import WelcomeCard from '../../../../components/dashboard/WelcomeCard';
import QuickStats from '../../../../components/dashboard/QuickStats';
import RecentReports from '../../../../components/dashboard/RecentReports';
import { DemoDashboardService, MockAIService } from '../../services/DemoServices';
import { Sparkles, Loader2 } from 'lucide-react';

interface DemoDashboardViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function DemoDashboardView({ onNavigate }: DemoDashboardViewProps) {
  const { currentUser, issues, stats, comments } = useDemo();
  const [digest, setDigest] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const userIssues = issues.filter(i => i.user_id === currentUser?.id);
  const userComments = comments.filter(c => c.user_id === currentUser?.id);

  const generateDigest = async () => {
    setLoading(true);
    // Simulate network for realism, but keep it very short (under 300ms)
    await new Promise(r => setTimeout(r, 200));
    setDigest(DemoDashboardService.getDigest(stats));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <WelcomeCard userName={currentUser?.full_name || 'Citizen'} />
      
      <QuickStats 
        totalReports={userIssues.length} 
        totalSupports={userIssues.reduce((acc, curr) => acc + curr.upvotes_count, 0)} 
        totalComments={userComments.length} 
      />

      {/* AI Digest Section Mock */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Neighborhood Digest</h3>
          </div>
          {!digest && (
            <button 
              onClick={generateDigest}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate Digest
            </button>
          )}
        </div>
        
        {digest && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">{digest.title}</h4>
            <p className="text-blue-800 dark:text-blue-200 mb-4 text-sm">{digest.summary}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {digest.metrics.map((m: any, i: number) => (
                <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-blue-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500">{m.label}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-between">
                    {m.value} <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">{m.trend}</span>
                  </p>
                </div>
              ))}
            </div>
            <div>
              <h5 className="font-semibold text-sm mb-2">Recommendations:</h5>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {digest.recommendations.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <RecentReports reports={userIssues.slice(0, 5) as any} />
    </div>
  );
}
