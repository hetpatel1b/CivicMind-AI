'use client';

import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
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
      <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10 backdrop-blur-md">
        <p className="text-gray-400 font-bold text-sm tracking-wide">
          Authentication required to participate in discussions.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your insights..."
          rows={3}
          className="w-full px-5 py-4 pb-14 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none transition-all shadow-inner backdrop-blur-md font-medium"
          required
        />
        
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 mr-2 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
            Markdown Supported
          </span>
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:scale-105 active:scale-95"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
