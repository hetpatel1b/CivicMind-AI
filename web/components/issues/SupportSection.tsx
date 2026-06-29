'use client';

import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
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
    <div className="flex items-center gap-4">
      <button
        onClick={handleSupport}
        disabled={loading}
        className={`group flex items-center gap-3 px-5 py-2.5 rounded-xl font-bold transition-all backdrop-blur-md shadow-sm ring-1 ring-white/10 ${
          hasSupported 
            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30' 
            : 'bg-white/5 hover:bg-white/10 text-white border border-white/5'
        }`}
      >
        <ChevronUp className={`w-5 h-5 transition-transform ${hasSupported ? '' : 'group-hover:-translate-y-0.5'}`} strokeWidth={3} />
        <span className="text-lg tracking-tight">{supports}</span>
        <span className="hidden sm:inline opacity-80 text-sm ml-1 font-semibold uppercase tracking-widest">{hasSupported ? 'Supported' : 'Support'}</span>
      </button>

      <div className="hidden md:flex flex-col">
        <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Community Priority</div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${Math.min(100, supports * 2)}%` }} />
          </div>
          <span className="text-xs font-bold text-gray-400">{Math.min(100, supports * 2)}%</span>
        </div>
      </div>
    </div>
  );
}
