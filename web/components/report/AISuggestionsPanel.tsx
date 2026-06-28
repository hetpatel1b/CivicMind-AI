'use client';

import React from 'react';
import { AIAnalysisResult } from '@/types/ai';
import { Sparkles, Loader2, AlertCircle, Check, Info } from 'lucide-react';
import AILoadingIndicator from '@/components/ui/AILoadingIndicator';

interface AISuggestionsPanelProps {
  hasImage: boolean;
  loading: boolean;
  error: string | null;
  suggestions: AIAnalysisResult | null;
  onAnalyze: () => void;
  onApply: (suggestions: AIAnalysisResult) => void;
  onDismissError: () => void;
}

export default function AISuggestionsPanel({
  hasImage,
  loading,
  error,
  suggestions,
  onAnalyze,
  onApply,
  onDismissError
}: AISuggestionsPanelProps) {
  if (!loading && !error && !suggestions && !hasImage) {
    return null;
  }

  return (
    <div className="mb-8 p-6 rounded-2xl border bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-900/20 border-indigo-100 dark:border-indigo-800/50 shadow-sm transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0">
          {loading ? (
            <Loader2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          )}
        </div>
        
        <div className="flex-1 min-w-0" aria-live="polite">
          {loading && (
            <div className="pt-2">
              <AILoadingIndicator size="sm" inline={true} message="AI is analyzing your image..." />
            </div>
          )}

          {error && (
            <div className="pt-1">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium">
                <AlertCircle className="w-4 h-4" />
                <h3 className="text-sm">AI Analysis Unavailable</h3>
              </div>
              <p className="text-sm text-amber-600 dark:text-amber-500 mt-1">{error}</p>
              <button 
                type="button" 
                onClick={onDismissError}
                className="mt-3 text-sm font-medium text-amber-700 dark:text-amber-400 hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {!loading && !error && !suggestions && hasImage && (
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Image Uploaded</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">You can manually enter details, or let AI analyze the image to auto-fill the form.</p>
              <button
                type="button"
                onClick={onAnalyze}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Analyze Image & Auto-fill
              </button>
            </div>
          )}

          {suggestions && !loading && !error && (
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  AI Suggestions Ready
                </h3>
                {suggestions.confidence > 0 && (
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                    {Math.round(suggestions.confidence * 100)}% Confidence
                  </span>
                )}
              </div>
              
              {suggestions.category === 'Other' && suggestions.confidence < 0.6 && (
                <div className="mb-4 flex gap-2 items-start p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    The AI could not clearly identify the civic issue in this image. Please consider uploading a clearer photo or provide a detailed description manually.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Suggested Title</span>
                  <p className="text-sm text-gray-900 dark:text-gray-200 font-medium line-clamp-1">{suggestions.title}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category & Severity</span>
                  <p className="text-sm text-gray-900 dark:text-gray-200 font-medium">
                    {suggestions.category} • {suggestions.severity}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onApply(suggestions)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Apply Suggestions
                </button>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  You can edit these values before submitting.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
