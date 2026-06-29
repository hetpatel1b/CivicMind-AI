import React from 'react';
import { IssueComment } from '@/types/comment';
import { User, Clock } from 'lucide-react';
import { Card } from '@/design-system/components/Card';
import { Avatar } from '@/design-system/components/Avatar';

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
    <Card className="flex gap-4 p-5 hover:shadow-md transition-shadow">
      
      {/* Author Avatar Column */}
      <div className="shrink-0">
        <Avatar 
          src={comment.author.avatarUrl || undefined} 
          alt={`Avatar for ${authorName}`} 
          fallback={<User className="w-5 h-5" />}
        />
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
    </Card>
  );
}
