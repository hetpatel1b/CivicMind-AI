'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { createComment } from '@/services/comments';

interface CommentFormProps {
  issueId: string;
  userId: string | null;
  onCommentAdded: () => void;
}

export default function CommentForm({ issueId, userId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !content.trim()) return;

    setLoading(true);
    try {
      const response = await createComment({ issueId, userId, content });
      if (response.success) {
        setContent('');
        onCommentAdded();
      } else {
        alert(response.error || 'Failed to submit comment.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
          Please log in to participate in the discussion.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add your comment..."
        rows={3}
        className="w-full px-4 py-3 pb-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        required
      />
      <div className="absolute bottom-2 right-2">
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
