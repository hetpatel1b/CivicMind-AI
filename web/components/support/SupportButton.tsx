'use client';

import React, { useState, useEffect } from 'react';
import { ThumbsUp, Loader2, AlertCircle } from 'lucide-react';
import { getSupportStatus } from '@/services/support';
import { ToggleSupportResponse } from '@/types/support';

interface SupportButtonProps {
  /** The unique identifier of the civic issue being supported */
  issueId: string;
  /** The unique identifier of the currently authenticated user */
  userId: string;
}

/**
 * Interactive button component allowing users to support (upvote) civic issues.
 * Manages its own loading, error, and interaction states.
 * 
 * Note: Initial state is loaded directly via the Supabase client service,
 * but mutations are securely routed through the Next.js API endpoint.
 */
export default function SupportButton({ issueId, userId }: SupportButtonProps) {
  const [hasSupported, setHasSupported] = useState(false);
  const [totalSupports, setTotalSupports] = useState(0);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialStatus() {
      if (!issueId || !userId) return;
      
      try {
        setIsInitializing(true);
        setError(null);
        
        // Directly query the Supabase database via the browser client to quickly hydrate state
        const status = await getSupportStatus(issueId, userId);
        
        if (isMounted) {
          setHasSupported(status.userHasSupported);
          setTotalSupports(status.totalSupports);
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.error('[SupportButton] Failed to initialize support status:', err);
          setError('Unable to load support status.');
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    }

    loadInitialStatus();

    return () => {
      isMounted = false; // Cleanup to prevent state updates on unmounted components
    };
  }, [issueId, userId]);

  const handleToggleSupport = async () => {
    if (isMutating || isInitializing || !userId) return;

    try {
      setIsMutating(true);
      setError(null);

      // Route the mutation through our secure API layer
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ issueId, userId }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to update support status.');
      }

      // Assert the response aligns with our expected type contract
      const typedData = data as ToggleSupportResponse;
      
      // Update UI immediately based on the secure server response
      setHasSupported(typedData.userHasSupported);
      setTotalSupports(typedData.totalSupports);
      
    } catch (err: unknown) {
      console.error('[SupportButton] Mutation error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsMutating(false);
    }
  };

  // Defensive fallback rendering for unrecoverable errors
  if (error) {
    return (
      <div className="inline-flex items-center text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-2.5 rounded-xl border border-red-100 dark:border-red-800/30">
        <AlertCircle className="w-4 h-4 mr-2" />
        {error}
      </div>
    );
  }

  const isLoading = isInitializing || isMutating;

  return (
    <button
      onClick={handleToggleSupport}
      disabled={isLoading}
      aria-pressed={hasSupported}
      aria-label={hasSupported ? `Remove support. Currently ${totalSupports} supports.` : `Support this issue. Currently ${totalSupports} supports.`}
      className={`
        relative overflow-hidden group flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900
        ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-md active:translate-y-0'}
        ${hasSupported 
          ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 focus:ring-blue-500 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50 dark:hover:bg-blue-900/50' 
          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700'
        }
      `}
    >
      <span className="flex items-center relative z-10">
        {isLoading ? (
          <Loader2 className={`w-4 h-4 mr-2 animate-spin ${hasSupported ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
        ) : (
          <ThumbsUp 
            className={`w-4 h-4 mr-2 transition-transform duration-200 ${hasSupported ? 'scale-110' : 'scale-100 group-hover:scale-110'}`} 
            fill={hasSupported ? 'currentColor' : 'none'}
          />
        )}
        {hasSupported ? 'Supported' : 'Support'} 
        <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs font-bold ${
          hasSupported 
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-300' 
            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {totalSupports}
        </span>
      </span>
    </button>
  );
}
