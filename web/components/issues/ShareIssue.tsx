'use client';

import React, { useState } from 'react';
import { Share2, Check, Bookmark, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShareIssueProps {
  title: string;
}

export default function ShareIssue({ title }: ShareIssueProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

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
    <div className="flex items-center gap-3">
      <button
        onClick={() => setBookmarked(!bookmarked)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all backdrop-blur-md shadow-sm ring-1 ring-white/10 ${
          bookmarked 
            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
            : 'bg-white/5 hover:bg-white/10 text-white'
        }`}
      >
        <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-400' : ''}`} />
        <span className="hidden sm:inline">{bookmarked ? 'Saved' : 'Save'}</span>
      </button>

      <button
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all backdrop-blur-md shadow-sm ring-1 ring-white/10"
      >
        <MapPin className="w-4 h-4" />
        <span className="hidden sm:inline">Map</span>
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 font-bold rounded-xl transition-all backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] ring-1 ring-indigo-500/50"
      >
        {copied ? (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <Check className="w-4 h-4 text-emerald-400" />
            </motion.div>
            <span className="hidden sm:inline text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </>
        )}
      </button>
    </div>
  );
}
