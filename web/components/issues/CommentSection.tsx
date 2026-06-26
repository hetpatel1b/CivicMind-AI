'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { MessageSquare, User } from 'lucide-react';
import { getIssueComments } from '@/services/comments';
import { IssueComment } from '@/types/comment';
import CommentForm from './CommentForm';

interface CommentSectionProps {
  issueId: string;
  userId: string | null;
}

export default function CommentSection({ issueId, userId }: CommentSectionProps) {
  const [comments, setComments] = useState<IssueComment[]>([]);
  const [loading, setLoading] = useState(true);

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
                    <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
