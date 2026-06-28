'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { MessageSquare, User, Sparkles, ShieldAlert, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import AILoadingIndicator from '@/components/ui/AILoadingIndicator';
import { getIssueComments } from '@/services/comments';
import { IssueComment } from '@/types/comment';
import CommentForm from './CommentForm';
import { CommentModerationResult } from '@/services/gemini';

interface CommentSectionProps {
  issueId: string;
  userId: string | null;
}

export default function CommentSection({ issueId, userId }: CommentSectionProps) {
  const [comments, setComments] = useState<IssueComment[]>([]);
  const [loading, setLoading] = useState(true);

  // AI Summary State
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  // AI Moderation State
  const [moderationResults, setModerationResults] = useState<Record<string, CommentModerationResult>>({});
  const [isModerating, setIsModerating] = useState<Record<string, boolean>>({});

  const handleSummarizeThread = async () => {
    try {
      setIsSummarizing(true);
      setSummaryError(null);
      const res = await fetch('/api/community/insights/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments: comments.map(c => c.content) })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to summarize');
      setSummary(data.summary);
    } catch (err: unknown) {
      console.error(err);
      setSummaryError('Failed to generate summary.');
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleModerateComment = async (commentId: string, content: string) => {
    try {
      setIsModerating(prev => ({ ...prev, [commentId]: true }));
      const res = await fetch('/api/community/insights/moderation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: content })
      });
      const data = await res.json();
      if (res.status === 403) {
        alert('Administrator access required to use AI Moderation tools.');
        return;
      }
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to analyze');
      setModerationResults(prev => ({ ...prev, [commentId]: data.insights }));
    } catch (err: unknown) {
      console.error(err);
      alert('Failed to analyze comment.');
    } finally {
      setIsModerating(prev => ({ ...prev, [commentId]: false }));
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      const data = await getIssueComments(issueId);
      setComments(data);
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setLoading(false);
    }
  }, [issueId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-5 h-5 text-gray-400" />
        <h3 className="font-bold text-gray-900 dark:text-white">
          Comments ({comments.length})
        </h3>
      </div>

      <CommentForm issueId={issueId} userId={userId} onCommentAdded={fetchComments} />

      {/* AI Summary Section */}
      {!loading && comments.length > 3 && !summary && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSummarizeThread}
            disabled={isSummarizing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/40 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 border border-teal-200 dark:border-teal-800/50"
          >
            {isSummarizing ? (
              <AILoadingIndicator size="sm" inline={true} message="Analyzing thread..." />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Summarize Thread with AI
              </>
            )}
          </button>
        </div>
      )}

      {summaryError && (
        <p className="text-red-500 text-sm mt-4 text-right">{summaryError}</p>
      )}

      {summary && (
        <div className="mt-6 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-5 rounded-2xl border border-teal-100 dark:border-teal-800/50 relative animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h4 className="font-bold text-gray-900 dark:text-white">AI Thread Summary</h4>
          </div>
          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{summary}</p>
        </div>
      )}

      <div className="mt-8 space-y-6">
        {loading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10 shrink-0"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex shrink-0 items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                {comment.author.avatarUrl ? (
                  <img src={comment.author.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl rounded-tl-none border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                      {comment.author.fullName || 'Anonymous'}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleModerateComment(comment.id, comment.content)}
                        disabled={isModerating[comment.id]}
                        className="text-[10px] uppercase tracking-wider font-bold text-gray-400 hover:text-indigo-500 transition-colors flex items-center gap-1 disabled:opacity-50"
                        title="Analyze comment for toxicity/spam (Admins only)"
                      >
                        {isModerating[comment.id] ? <Loader2 className="w-3 h-3 animate-spin" /> : <ShieldAlert className="w-3 h-3" />}
                        AI Check
                      </button>
                      <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                    {comment.content}
                  </p>
                  
                  {/* AI Moderation Result */}
                  {moderationResults[comment.id] && (
                    <div className={`mt-3 p-3 rounded-xl border flex items-start gap-2 ${
                      moderationResults[comment.id].is_flagged
                        ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/50'
                        : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/50'
                    }`}>
                      {moderationResults[comment.id].is_flagged ? (
                        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className={`text-xs font-bold ${moderationResults[comment.id].is_flagged ? 'text-red-900 dark:text-red-300' : 'text-green-900 dark:text-green-300'}`}>
                          {moderationResults[comment.id].is_flagged ? 'Flagged by AI' : 'Looks Good'}
                        </span>
                        {moderationResults[comment.id].reason && (
                          <p className={`text-xs mt-0.5 ${moderationResults[comment.id].is_flagged ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
                            {moderationResults[comment.id].reason}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
