'use client';

import React, { useState } from 'react';
import { MapPin, CheckCircle, XCircle, HelpCircle, Map, AlertTriangle, ShieldAlert } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils/date';

export default function VerificationList({ 
  initialIssues, 
  totalCount,
  currentPage,
  adminId 
}: { 
  initialIssues: any[], 
  totalCount: number,
  currentPage: number,
  adminId: string
}) {
  const [issues, setIssues] = useState(initialIssues);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleAction = async (issueId: string, action: 'VERIFY' | 'REJECT' | 'NEED_INFO') => {
    if (!window.confirm(`Are you sure you want to ${action.toLowerCase()} this issue?`)) return;
    
    setProcessingId(issueId);
    try {
      const res = await fetch('/api/moderation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issueId, adminId, action, notes: '' })
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Moderation action failed:', errorData);
        throw new Error(errorData.message || 'Action failed');
      }
      
      // Remove from list
      setIssues(issues.filter(i => i.id !== issueId));
      
    } catch (err: any) {
      console.error(err);
      alert('Failed to process moderation action: ' + err.message);
    } finally {
      setProcessingId(null);
    }
  };

  if (issues.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">All Caught Up!</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
          There are no pending issues requiring verification at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {issues.map((issue) => (
        <div key={issue.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-1/3 relative h-64 lg:h-auto bg-slate-100 dark:bg-slate-800">
              {issue.images?.[0] ? (
                <img 
                  src={issue.images[0].image_url} 
                  alt="Issue" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  No Image Provided
                </div>
              )}
              {/* Overlay Severity */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {issue.severity.toUpperCase()}
              </div>
            </div>

            {/* Details Section */}
            <div className="lg:w-2/3 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-semibold mb-3">
                      {issue.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{issue.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm">
                      {issue.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Reported By</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{issue.users?.full_name || 'Anonymous'}</p>
                    <p className="text-xs text-slate-500 mt-1">{formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{issue.location_name || 'Coordinates provided'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <span>AI Confidence: High</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
                <button 
                  onClick={() => handleAction(issue.id, 'VERIFY')}
                  disabled={processingId === issue.id}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  Verify Issue
                </button>
                <button 
                  onClick={() => handleAction(issue.id, 'REJECT')}
                  disabled={processingId === issue.id}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 rounded-xl font-semibold transition-colors disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
                <button 
                  disabled={processingId === issue.id}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-xl font-semibold transition-colors disabled:opacity-50"
                >
                  <HelpCircle className="w-4 h-4" />
                  Need Info
                </button>
                
                <div className="flex-1 hidden sm:block"></div>

                <a 
                  href={`/map?issueId=${issue.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Map className="w-4 h-4" />
                  Map View
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
