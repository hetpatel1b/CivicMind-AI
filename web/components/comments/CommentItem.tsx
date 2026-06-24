import React from 'react';
import { IssueComment } from '@/types/comment';
import { User, Clock } from 'lucide-react';

interface CommentItemProps {
  /** The fully hydrated comment object to render */
  comment: IssueComment;
}

/**
 * Renders a single comment block within the issue details view.
 * Displays author information, formatted timestamp, and the comment content.
 * Built with responsive design and dark mode support in mind.
 */
export default function CommentItem({ comment }: CommentItemProps) {
  // Format the creation date to be human-readable and localized
  const formattedDate = new Date(comment.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  // Gracefully fallback for users who haven't set a name
  const authorName = comment.author.fullName || 'Anonymous Citizen';

  return (
    <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      
      {/* Author Avatar Column */}
      <div className="shrink-0">
        {comment.author.avatarUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img 
            src={comment.author.avatarUrl} 
            alt={`Avatar for ${authorName}`} 
            className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200 dark:border-gray-700" 
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <User className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Content Column */}
      <div className="flex-1 min-w-0">
        
        {/* Meta Header */}
        <div className="flex items-center justify-between mb-1.5 gap-2 flex-wrap">
          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
            {authorName}
          </h4>
          <span className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 shrink-0">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <time dateTime={comment.createdAt}>{formattedDate}</time>
          </span>
        </div>
        
        {/* Text Body */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words leading-relaxed m-0">
            {comment.content}
          </p>
        </div>
        
      </div>
    </div>
  );
}
