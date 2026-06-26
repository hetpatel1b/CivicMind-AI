'use client';

import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { toggleSupport } from '@/services/support';

interface SupportSectionProps {
  issueId: string;
  initialSupports: number;
  initialHasSupported: boolean;
  userId: string | null;
}

export default function SupportSection({ issueId, initialSupports, initialHasSupported, userId }: SupportSectionProps) {
  const [supports, setSupports] = useState(initialSupports);
  const [hasSupported, setHasSupported] = useState(initialHasSupported);
  const [loading, setLoading] = useState(false);

  const handleSupport = async () => {
    if (!userId) {
      alert('You must be logged in to support an issue.');
      return;
    }
    
    setHasSupported(!hasSupported);
    setSupports((prev) => hasSupported ? prev - 1 : prev + 1);
    
    setLoading(true);
    try {
      const result = await toggleSupport(issueId, userId);
      setSupports(result.totalSupports);
      setHasSupported(result.userHasSupported);
    } catch (error) {
      setHasSupported(hasSupported);
      setSupports(initialSupports);
      console.error(error);
      alert('Failed to update support status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Support this Issue</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
        Upvote to increase visibility and prioritize resolution.
      </p>
      
      <button
        onClick={handleSupport}
        disabled={loading}
        className={`flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 transition-all ${
          hasSupported 
            ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-400' 
            : 'border-gray-100 bg-white text-gray-500 hover:border-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
        }`}
      >
        <ThumbsUp className={`w-8 h-8 mb-1 ${hasSupported ? 'fill-current' : ''}`} />
        <span className="font-bold text-lg">{supports}</span>
      </button>
    </div>
  );
}
