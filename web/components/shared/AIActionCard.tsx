'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface AIActionCardProps<T> {
  title: string;
  description?: React.ReactNode;
  buttonLabel?: string;
  storageKey?: string;
  onGenerate: (signal: AbortSignal) => Promise<T>;
  renderResult: (data: T) => React.ReactNode;
  icon?: React.ElementType;
  className?: string;
  variant?: 'card' | 'inline' | 'compact';
  defaultData?: T | null;
  autoFocus?: boolean;
  refreshable?: boolean;
}

export default function AIActionCard<T>({
  title,
  description,
  buttonLabel = 'Generate AI Insights',
  storageKey,
  onGenerate,
  renderResult,
  icon: Icon = Sparkles,
  className = '',
  variant = 'card',
  defaultData = null,
  refreshable = true,
}: AIActionCardProps<T>) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(defaultData ? 'success' : 'idle');
  const [data, setData] = useState<T | null>(defaultData);
  const [error, setError] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (storageKey && status === 'idle' && !defaultData) {
      try {
        const cached = sessionStorage.getItem(storageKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          // eslint-disable-next-line
          setData(parsed.data);
          // eslint-disable-next-line
          setTimestamp(parsed.timestamp);
          // eslint-disable-next-line
          setStatus('success');
        }
      } catch {
        // Ignore cache errors
      }
    }
  }, [storageKey, status, defaultData]);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleGenerate = async () => {
    if (status === 'loading') return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      setStatus('loading');
      setError(null);
      
      const result = await onGenerate(abortController.signal);
      
      setData(result);
      setStatus('success');
      const now = Date.now();
      setTimestamp(now);
      
      if (storageKey) {
        sessionStorage.setItem(storageKey, JSON.stringify({ data: result, timestamp: now }));
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setStatus('error');
        setError(err.message || 'Failed to generate AI insights.');
      } else if (typeof err === 'object' && err !== null && 'name' in err && (err as Error).name !== 'AbortError') {
        setStatus('error');
        setError('Failed to generate AI insights.');
      }
    } finally {
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null;
      }
    }
  };

  const [now, setNow] = useState<number | null>(null);
  
  useEffect(() => {
    // Initial async setup to avoid synchronous state update in effect
    const timeout = setTimeout(() => setNow(Date.now()), 0);
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const timeAgo = (ts: number) => {
    if (!now) return '';
    const seconds = Math.floor((now - ts) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  if (variant === 'inline') {
    return (
      <div className={`relative ${className}`}>
        {status === 'idle' && (
          <button
            onClick={handleGenerate}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            <Icon className="w-3.5 h-3.5" />
            {buttonLabel}
          </button>
        )}
        
        {status === 'loading' && (
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-600 dark:text-purple-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Analyzing...
          </div>
        )}

        {status === 'error' && (
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400">
            <AlertCircle className="w-3.5 h-3.5" />
            Error. <button onClick={handleGenerate} className="underline">Retry</button>
          </div>
        )}

        {status === 'success' && data && (
          <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-300">
            {renderResult(data)}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-[#020817] rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-sm border border-purple-100 dark:border-purple-900/30 relative overflow-hidden transition-all duration-300 ${status === 'error' ? 'border-red-200 dark:border-red-900/50' : ''} ${className}`}>
      {/* Background glow */}
      {status !== 'error' && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      )}

      <div className="relative z-10">
        {(status === 'idle' || status === 'error') && (
          <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 border ${status === 'error' ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800' : 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800'}`}>
              {status === 'error' ? (
                <AlertCircle className="w-7 h-7 text-red-600 dark:text-red-400" />
              ) : (
                <Icon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              )}
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {status === 'error' ? 'AI Analysis Failed' : title}
            </h3>
            
            {status === 'error' ? (
              <p className="text-red-600 dark:text-red-400 text-sm mb-6 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                {error}
              </p>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                {description}
              </div>
            )}
            
            <button
              onClick={handleGenerate}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold shadow-sm transition-all active:scale-[0.98] w-full sm:w-auto justify-center text-sm ${status === 'error' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
            >
              {status === 'error' ? <RefreshCw className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              {status === 'error' ? 'Retry Generation' : buttonLabel}
            </button>
            
            {status !== 'error' && (
              <p className="text-[10px] text-gray-400 mt-4 flex items-center gap-1 opacity-70">
                <Sparkles className="w-3 h-3" /> Powered by CivicMind AI. This action consumes AI processing.
              </p>
            )}
          </div>
        )}

        {status === 'loading' && (
          <div className="py-8 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center relative z-10">
                <Icon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              {/* Spinner Ring */}
              <div className="absolute inset-[-4px] rounded-[1.15rem] border-2 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-500 animate-spin" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
              Analyzing with AI
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Gathering insights and generating summary...
            </p>
          </div>
        )}

        {status === 'success' && data && (
          <div className="animate-in fade-in duration-500 relative">
            <div className="flex items-center justify-between mb-5 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">{title}</h3>
                  <div className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1 mt-0.5">
                    CivicMind AI v2
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {timestamp && (
                  <span className="hidden sm:inline-block text-[10px] text-gray-400 mr-2 italic">
                    Generated {timeAgo(timestamp)}
                  </span>
                )}
                {refreshable && (
                  <button
                    onClick={handleGenerate}
                    className="p-1.5 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors border border-transparent"
                    title="Refresh Analysis"
                    aria-label="Refresh Analysis"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="relative">
              {renderResult(data)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
