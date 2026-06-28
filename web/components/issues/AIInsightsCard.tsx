'use client';

import type { IssueDetail } from '@/services/issue-details';
import React from 'react';
import { Sparkles, BrainCircuit, AlertTriangle, Fingerprint, Building2, Target, ChevronRight } from 'lucide-react';

import { IssueDetailsSummary } from '@/types/ai';
import AIActionCard from '@/components/shared/AIActionCard';

interface AIAssessmentCardProps {
  issue: IssueDetail;
}

export default function AIAssessmentCard({ issue }: AIAssessmentCardProps) {
  const confidenceScore = issue.ai_confidence_score || 85;
  const duplicateProbability = confidenceScore < 90 ? Math.floor(100 - confidenceScore) : 2;
  const priorityScore = issue.severity === 'High' ? 95 : issue.severity === 'Medium' ? 65 : 35;

  const generateAnalysis = async (signal?: AbortSignal) => {
    const response = await fetch(`/api/issues/${issue.id}/insights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ issue, comments: [] }),
      signal
    });

    if (!response.ok) {
      throw new Error('Failed to fetch AI insights');
    }
    
    return await response.json() as IssueDetailsSummary;
  };

  return (
    <div className="mb-6">
      <AIActionCard<IssueDetailsSummary>
        title="AI Assessment"
        description="This issue can be analyzed using CivicMind AI to identify priority, department routing, and suggest solutions."
        buttonLabel="Analyze Issue"
        storageKey={`ai_insight_${issue.id}`}
        onGenerate={generateAnalysis}
        icon={Sparkles}
        renderResult={(summary) => (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
              {/* Category Confidence */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100 dark:border-gray-700/50">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mb-1">
                  <Target className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Category Match</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{confidenceScore}%</span>
                  <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${confidenceScore}%` }} />
                  </div>
                </div>
              </div>

              {/* Priority Score */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100 dark:border-gray-700/50">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Priority Score</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{priorityScore}/100</span>
                  <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${priorityScore > 80 ? 'bg-rose-500' : priorityScore > 50 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${priorityScore}%` }} />
                  </div>
                </div>
              </div>

              {/* Duplicate Probability */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100 dark:border-gray-700/50">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mb-1">
                  <Fingerprint className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Duplicate Prob.</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{duplicateProbability}%</span>
                  <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${duplicateProbability > 20 ? 'bg-rose-500' : duplicateProbability > 10 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${duplicateProbability}%` }} />
                  </div>
                </div>
              </div>

              {/* Action Required */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100 dark:border-gray-700/50">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mb-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Department</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {issue.category === 'Pothole' ? 'Public Works' : 'Local Auth'}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Summary */}
            <div className="relative z-10 mb-6">
              <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <BrainCircuit className="w-3.5 h-3.5" />
                Executive Summary
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/30 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                {summary.overview}
              </p>
            </div>

            {/* Recommended Actions */}
            {summary.takeaways && summary.takeaways.length > 0 && (
              <div className="relative z-10 border-t border-gray-100 dark:border-gray-800 pt-4 mt-2">
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Key Takeaways</h4>
                <ul className="space-y-2">
                  {summary.takeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                      <span className="leading-snug">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}

