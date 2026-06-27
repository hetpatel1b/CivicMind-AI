'use client';

import React, { useState } from 'react';
import { useMap } from 'react-leaflet';
import { Sparkles, Loader2, Map as MapIcon, X, TrendingUp, AlertTriangle } from 'lucide-react';
import { MapRegionalInsights } from '@/services/gemini';
import { MapIssue } from '@/types/map';

interface AIRegionalInsightsProps {
  issues: MapIssue[];
}

export default function AIRegionalInsights({ issues }: AIRegionalInsightsProps) {
  const map = useMap();
  const [insights, setInsights] = useState<MapRegionalInsights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const analyzeRegion = async () => {
    try {
      setIsPanelOpen(true);
      setLoading(true);
      setError(null);
      
      // Calculate visible issues based on current map bounds
      const bounds = map.getBounds();
      const visibleIssues = issues.filter(issue => {
        return bounds.contains([issue.latitude, issue.longitude]);
      });

      if (visibleIssues.length === 0) {
        throw new Error('No issues visible in the current region to analyze.');
      }

      // Limit to 30 visible issues to prevent token bloat
      const sample = visibleIssues.slice(0, 30).map(i => ({
        title: i.title,
        category: i.category,
        severity: i.severity,
        lat: i.latitude,
        lng: i.longitude
      }));

      const res = await fetch('/api/map/insights/regional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sample)
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to generate regional insights');
      }
      
      setInsights(data.insights);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="leaflet-bottom leaflet-left mb-6 ml-6 pointer-events-auto relative z-[1000]">
        <button
          onClick={analyzeRegion}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800/50 shadow-xl rounded-2xl font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          Analyze Visible Region
        </button>
      </div>

      {/* Floating Panel Overlay */}
      {isPanelOpen && (
        <div className="absolute top-4 left-4 z-[2000] w-[calc(100%-2rem)] md:w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 flex flex-col pointer-events-auto max-h-[calc(100%-2rem)] overflow-hidden animate-in fade-in slide-in-from-left-4">
          
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400">
                <MapIcon className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                Regional Intelligence
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">AI Beta</span>
              </h3>
            </div>
            <button 
              onClick={() => setIsPanelOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Scanning map area...</p>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-800/30 text-center font-medium">
                {error}
              </div>
            ) : insights ? (
              <div className="space-y-5">
                
                {/* Summary */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Summary</h4>
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                    {insights.regional_summary}
                  </p>
                </div>

                {/* Hotspots */}
                {insights.hotspots.length > 0 && (
                  <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-xl p-3 border border-amber-100 dark:border-amber-900/30">
                    <h4 className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-900 dark:text-amber-300 mb-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Hotspots
                    </h4>
                    <ul className="space-y-2">
                      {insights.hotspots.map((h, i) => (
                        <li key={i} className="text-xs text-amber-800 dark:text-amber-400 flex items-start gap-2 leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Trends */}
                {insights.trends.length > 0 && (
                  <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-3 border border-blue-100 dark:border-blue-900/30">
                    <h4 className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-900 dark:text-blue-300 mb-2">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-500" /> Trend Analysis
                    </h4>
                    <ul className="space-y-2">
                      {insights.trends.map((t, i) => (
                        <li key={i} className="text-xs text-blue-800 dark:text-blue-400 flex items-start gap-2 leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
