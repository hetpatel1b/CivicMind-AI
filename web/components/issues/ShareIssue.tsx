'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface ShareIssueProps {
  title: string;
}

export default function ShareIssue({ title }: ShareIssueProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: `CivicMind AI: ${title}`,
      text: 'Check out this civic issue report.',
      url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Share this Issue</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
        Spread the word to gather more community support.
      </p>
      
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-xl transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-500" />
            Copied!
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            Share Link
          </>
        )}
      </button>
    </div>
  );
}
