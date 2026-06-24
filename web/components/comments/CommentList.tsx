import React from 'react';
import { IssueComment } from '@/types/comment';
import CommentItem from './CommentItem';
import { Loader2, MessageSquare } from 'lucide-react';

interface CommentListProps {
  /** The array of hydrated comments to render */
  comments: IssueComment[];
  /** Optional flag to show a loading skeleton or spinner */
  isLoading?: boolean;
}

/**
 * Renders a vertical list of comments for an issue.
 * Handles empty states and loading states cleanly.
 */
export default function CommentList({ comments, isLoading = false }: CommentListProps) {
  // 1. Handle loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
        <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
          Loading comments...
        </p>
      </div>
    );
  }

  // 2. Handle empty state
  if (!comments || comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-900/30">
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-3">
          <MessageSquare className="w-6 h-6 text-gray-400 dark:text-gray-500" />
        </div>
        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">
          No comments yet
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-xs">
          Be the first to share your thoughts, context, or updates on this civic issue.
        </p>
      </div>
    );
  }

  // 3. Render the list of populated comments
  return (
    <div className="space-y-4" aria-live="polite">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
