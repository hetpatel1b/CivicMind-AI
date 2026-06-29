'use client';

import React, { useState } from 'react';
import { IssueComment, CreateCommentResponse } from '@/types/comment';
import { Send, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/design-system/components/Button';
import { Alert } from '@/design-system/components/Alert';

interface CommentFormProps {
  /** The unique identifier of the civic issue */
  issueId: string;
  /** The unique identifier of the authenticated user submitting the comment */
  userId: string;
  /** Optional callback fired when a comment is successfully created */
  onCommentAdded?: (comment: IssueComment) => void;
}

const MAX_CHARS = 5000;

/**
 * Interactive form component for submitting new comments on a civic issue.
 * Manages its own internal loading and error states, with defensive validation.
 */
export default function CommentForm({ issueId, userId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Compute validation states natively to power the UI
  const charCount = content.length;
  const isOverLimit = charCount > MAX_CHARS;
  const isDisabled = isSubmitting || charCount === 0 || isOverLimit || content.trim().length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Double check disabled state to prevent programmatic submission bypassing UI
    if (isDisabled) return;

    try {
      setIsSubmitting(true);
      setError(null);

      // Defensively route the mutation through our Next.js API
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ issueId, userId, content: content.trim() }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to post comment. Please try again.');
      }

      // Assert expected API response shape
      const typedData = data as CreateCommentResponse;
      
      // Notify parent component of the new state if requested
      if (typedData.comment && onCommentAdded) {
        onCommentAdded(typedData.comment);
      }
      
      // Reset the form gracefully upon success
      setContent('');
      
    } catch (err: unknown) {
      console.error('[CommentForm] Submit error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-shadow"
    >
      <div className="mb-3 relative">
        <label htmlFor="comment-content" className="sr-only">Add a comment</label>
        <textarea
          id="comment-content"
          name="content"
          rows={3}
          disabled={isSubmitting}
          placeholder="Share your thoughts, updates, or additional context about this issue..."
          className="w-full resize-y min-h-[80px] bg-transparent border-0 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-0 p-0 sm:text-sm leading-relaxed"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          aria-invalid={isOverLimit ? 'true' : 'false'}
        />
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
          {error}
        </Alert>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700/50">
        
        {/* Character Counter */}
        <div 
          className={`text-xs font-medium transition-colors ${
            isOverLimit ? 'text-red-500 dark:text-red-400' : 'text-gray-400 dark:text-gray-500'
          }`}
          aria-live="polite"
        >
          {charCount} / {MAX_CHARS}
        </div>
        
        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isDisabled}
          variant="primary"
          className="shadow-sm hover:shadow-md active:translate-y-px"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
          ) : (
            <Send className="w-4 h-4 mr-1.5" />
          )}
          Post Comment
        </Button>
        
      </div>
    </form>
  );
}
