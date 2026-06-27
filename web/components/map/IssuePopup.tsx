'use client';

import React, { useState } from 'react';
import { Popup } from 'react-leaflet';
import Link from 'next/link';
import { MapIssue } from '@/types/map';
import { Calendar, ExternalLink, Sparkles, Loader2, Lightbulb } from 'lucide-react';
import { MapLocationInsights } from '@/services/gemini';

interface IssuePopupProps {
  /** The civic issue data to display inside the popup */
  issue: MapIssue;
  allIssues: MapIssue[];
}

/**
 * Renders an interactive Leaflet Popup containing key issue details.
 * Optimized for rapid data presentation without heavy network calls.
 * Includes a direct link to the full issue details page.
 */
export default function IssuePopup({ issue, allIssues }: IssuePopupProps) {
  const [insights, setInsights] = useState<MapLocationInsights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format the creation date to be compact yet highly readable
  const formattedDate = new Date(issue.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Calculate simplistic nearby issues based on lat/lng distance approximation
      // In production, PostGIS or similar is ideal. Here we just sort by rough euclidian distance.
      const target = { lat: issue.latitude, lng: issue.longitude };
      
      const nearby = [...allIssues]
        .filter(i => i.id !== issue.id)
        .map(i => {
          const dLat = i.latitude - target.lat;
          const dLng = i.longitude - target.lng;
          const distance = Math.sqrt(dLat * dLat + dLng * dLng);
          return { ...i, distance };
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5) // Top 5 closest
        .map(i => ({ title: i.title, category: i.category, severity: i.severity }));

      const res = await fetch('/api/map/insights/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetIssue: { title: issue.title, category: issue.category, severity: issue.severity },
          nearbyIssues: nearby
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to fetch insights');
      
      setInsights(data.insights);
    } catch (err) {
      console.error(err);
      setError('AI Insights unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup 
      className="custom-leaflet-popup" 
      closeButton={true}
      minWidth={280}
      maxWidth={320}
    >
      <div className="flex flex-col font-sans p-1 text-gray-900 dark:text-gray-100">
        
        {/* Header Tags: Category & Severity */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm">
            {issue.category}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${
            issue.severity === 'CRITICAL' ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800/50' :
            issue.severity === 'HIGH' ? 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800/50' :
            issue.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-800/50' :
            'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800/50'
          }`}>
            {issue.severity}
          </span>
        </div>

        {/* Issue Title */}
        <h3 className="font-extrabold text-base leading-snug mb-2 line-clamp-2 text-gray-900">
          {issue.title}
        </h3>

        {/* Meta Info */}
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
          <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
          <span>Reported {formattedDate}</span>
        </div>

        {/* AI Location Insights Toggle */}
        {!insights && !loading && !error && (
          <button 
            onClick={fetchInsights}
            className="flex items-center justify-center gap-1.5 w-full mb-3 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors border border-indigo-200 dark:border-indigo-800/50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Location Insights
          </button>
        )}

        {loading && (
          <div className="flex items-center justify-center gap-2 mb-3 py-1.5 text-indigo-500 text-xs font-medium">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Analyzing nearby area...
          </div>
        )}

        {error && (
          <div className="mb-3 text-red-500 text-[10px] text-center font-medium">
            {error}
          </div>
        )}

        {insights && (
          <div className="mb-3 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-xl p-2.5">
            <h4 className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-indigo-900 dark:text-indigo-300 mb-1.5">
              <Sparkles className="w-3 h-3 text-indigo-500" /> AI Insights
            </h4>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-tight mb-2">
              <span className="font-semibold block mb-0.5">Context:</span> {insights.context}
            </p>
            <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-tight mb-2">
              <span className="font-semibold block mb-0.5">Nearby:</span> {insights.common_nearby}
            </p>
            {insights.recommendations.length > 0 && (
              <div className="mt-2 bg-white/60 dark:bg-gray-800/60 p-1.5 rounded-lg">
                <h5 className="text-[10px] font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 mb-1">
                  <Lightbulb className="w-3 h-3" /> Tips
                </h5>
                <ul className="space-y-1">
                  {insights.recommendations.map((r, i) => (
                    <li key={i} className="text-[10px] text-gray-700 dark:text-gray-300 leading-tight flex items-start gap-1">
                      <span className="w-1 h-1 rounded-full bg-amber-500 mt-1 shrink-0"></span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <Link 
          href={`/issues/${issue.id}`}
          className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 shadow-sm"
          aria-label={`View detailed report for ${issue.title}`}
        >
          <span>View Details</span>
          <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
        </Link>
      </div>
    </Popup>
  );
}
