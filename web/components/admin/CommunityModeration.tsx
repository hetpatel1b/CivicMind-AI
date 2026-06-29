'use client';

import React, { useState } from 'react';
import { Trash2, AlertTriangle, UserX, ShieldAlert, CheckCircle, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils/date';
import { Card } from '@/design-system/components/Card';

 
export default function CommunityModeration({ initialComments }: { initialComments: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */ }) {
  const [comments, setComments] = useState(initialComments);

  // Simulated AI spam score generator (in a real app, this would be computed by backend)
  const getSpamScore = (content: string) => {
    const badWords = ['spam', 'fake', 'scam', 'click', 'buy', 'idiot', 'stupid', 'hate'];
    const lower = content.toLowerCase();
    const count = badWords.filter(w => lower.includes(w)).length;
    if (count >= 2) return { score: 95, label: 'High Risk', color: 'text-red-600 bg-red-100 dark:bg-red-900/30' };
    if (count === 1) return { score: 45, label: 'Moderate Risk', color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' };
    return { score: 5, label: 'Safe', color: 'text-green-600 bg-green-100 dark:bg-green-900/30' };
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this comment permanently?')) {
      // API call would go here
      setComments(comments.filter(c => c.id !== id));
    }
  };

  const handleWarnUser = (userId: string) => {
    window.confirm(`Issue a formal warning to this user? This will notify them.`);
  };

  const handleSuspendUser = (userId: string) => {
    window.confirm(`Suspend this user? They will not be able to comment or report issues.`);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {comments.length === 0 ? (
        <Card className="p-12 text-center text-slate-500">
          No comments to review.
        </Card>
      ) : (
        comments.map(comment => {
          const ai = getSpamScore(comment.content);
          return (
            <Card key={comment.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                      {comment.users?.full_name ? comment.users.full_name[0].toUpperCase() : '?'}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        {comment.users?.full_name || 'Anonymous User'}
                      </div>
                      <div className="text-xs text-slate-500">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                        {' • '}
                        On issue: <a href={`/issues/${comment.issue_id}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{comment.issues?.title || 'Unknown Issue'}</a>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    {comment.content}
                  </p>
                </div>

                {/* Meta & Actions */}
                <div className="lg:w-64 shrink-0 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-6">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">AI Analysis</div>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${ai.color}`}>
                      <ShieldAlert className="w-3.5 h-3.5" />
                      {ai.label} ({ai.score}%)
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col gap-2">
                    <button 
                      onClick={() => handleDelete(comment.id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors text-left"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Comment
                    </button>
                    <button 
                      onClick={() => handleWarnUser(comment.user_id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/20 rounded-lg transition-colors text-left"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Warn User
                    </button>
                    <button 
                      onClick={() => handleSuspendUser(comment.user_id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
                    >
                      <UserX className="w-4 h-4" />
                      Suspend User
                    </button>
                  </div>
                </div>

              </div>
            </Card>
          );
        })
      )}
    </div>
  );
}
