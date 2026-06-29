'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { MessageSquare, User, Sparkles, ShieldAlert, Loader2, AlertTriangle, CheckCircle, MessageCircle } from 'lucide-react';
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
    <div className="bg-[#0a0f1c]/50 backdrop-blur-3xl rounded-[2rem] p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
          <MessageCircle className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h3 className="font-black text-2xl text-white tracking-tight">
            Community Discussion
          </h3>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
            {comments.length} {comments.length === 1 ? 'Response' : 'Responses'}
          </p>
        </div>
      </div>

      <CommentForm issueId={issueId} userId={userId} onCommentAdded={fetchComments} />

      {/* AI Summary Section */}
      {!loading && comments.length > 3 && !summary && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSummarizeThread}
            disabled={isSummarizing}
            className="group flex items-center gap-3 px-5 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 font-bold tracking-wide rounded-xl transition-all disabled:opacity-50 border border-indigo-500/30 hover:border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
          >
            {isSummarizing ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing thread...</span>
              </div>
            ) : (
              <>
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Summarize Thread with AI</span>
              </>
            )}
          </button>
        </div>
      )}

      {summaryError && (
        <p className="text-rose-400 font-bold text-sm mt-4 text-right">{summaryError}</p>
      )}

      {summary && (
        <div className="mt-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6 rounded-2xl border border-indigo-500/30 relative animate-in fade-in zoom-in-95 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1.5 bg-indigo-500/20 rounded-lg">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <h4 className="font-black text-white">AI Thread Summary</h4>
          </div>
          <p className="text-base text-gray-300 leading-relaxed font-medium">{summary}</p>
        </div>
      )}

      <div className="mt-10 space-y-8">
        {loading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-white/10 h-12 w-12 shrink-0 border border-white/20"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-white/10 rounded w-1/4"></div>
              <div className="h-4 bg-white/5 rounded w-5/6"></div>
            </div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 border-dashed">
            <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
            <p className="text-base font-bold text-gray-400">No comments yet.</p>
            <p className="text-sm text-gray-500 mt-1">Be the first to share your perspective on this issue.</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-5 group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex shrink-0 items-center justify-center overflow-hidden border border-white/10 shadow-inner group-hover:border-indigo-500/30 transition-colors">
                {comment.author.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={comment.author.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-gray-500" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="bg-white/5 p-5 rounded-2xl rounded-tl-sm border border-white/10 shadow-sm transition-colors group-hover:bg-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="font-bold text-base text-white truncate flex items-center gap-2">
                      {comment.author.fullName || 'Anonymous'}
                      {/* Placeholder for badges if needed */}
                    </span>
                    
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleModerateComment(comment.id, comment.content)}
                        disabled={isModerating[comment.id]}
                        className="text-[10px] uppercase tracking-widest font-black text-gray-500 hover:text-indigo-400 transition-colors flex items-center gap-1.5 disabled:opacity-50 px-2 py-1 rounded-md hover:bg-white/5"
                        title="Analyze comment for toxicity/spam (Admins only)"
                      >
                        {isModerating[comment.id] ? <Loader2 className="w-3 h-3 animate-spin" /> : <ShieldAlert className="w-3 h-3" />}
                        AI Check
                      </button>
                      <span className="text-xs font-bold text-gray-500 shrink-0">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-base text-gray-300 whitespace-pre-wrap break-words leading-relaxed font-medium">
                    {comment.content}
                  </p>
                  
                  {/* AI Moderation Result */}
                  {moderationResults[comment.id] && (
                    <div className={`mt-4 p-4 rounded-xl border flex items-start gap-3 backdrop-blur-md ${
                      moderationResults[comment.id].is_flagged
                        ? 'bg-rose-500/10 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                        : 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                    }`}>
                      {moderationResults[comment.id].is_flagged ? (
                        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className={`text-sm font-black uppercase tracking-widest ${moderationResults[comment.id].is_flagged ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {moderationResults[comment.id].is_flagged ? 'Flagged by AI' : 'Verified Safe'}
                        </span>
                        {moderationResults[comment.id].reason && (
                          <p className={`text-sm font-medium mt-1 leading-snug ${moderationResults[comment.id].is_flagged ? 'text-rose-300/80' : 'text-emerald-300/80'}`}>
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
