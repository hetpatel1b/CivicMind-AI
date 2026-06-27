'use client';

import React, { useEffect, useState } from 'react';
import CivicMap from '@/components/map/CivicMap';
import IssueMarker from '@/components/map/IssueMarker';
import IssuePopup from '@/components/map/IssuePopup';
import AIRegionalInsights from '@/components/map/AIRegionalInsights';
import { getMapIssues } from '@/services/map';
import { MapIssue } from '@/types/map';
import { Loader2, AlertCircle, Map as MapIcon } from 'lucide-react';

/**
 * MapView Component
 * 
 * Central orchestration component for the Interactive Civic Map.
 * Manages the geospatial data fetching lifecycle, rendering states (loading/error/empty),
 * and maps the resulting data into interactive marker/popup components.
 */
export default function MapView() {
  const [issues, setIssues] = useState<MapIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchIssues() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch optimized, map-specific payload from our dedicated map service
        const data = await getMapIssues();
        
        if (isMounted) {
          setIssues(data);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred while loading the map.';
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchIssues();

    return () => {
      // Prevent state updates if component unmounts before fetch completes
      isMounted = false;
    };
  }, []);

  // Ensure loading skeletons strictly match the premium dimensions of the final CivicMap component
  const containerClasses = "relative w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-3xl flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/40 border border-gray-200/50 dark:border-gray-800/50 transition-all shadow-sm";

  if (isLoading) {
    return (
      <div className={containerClasses}>
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
          <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-500 animate-spin relative z-10" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 font-medium animate-pulse text-lg tracking-wide">Initializing Civic Map Environment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={containerClasses}>
        <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-full mb-5 shadow-sm border border-red-100 dark:border-red-800/30">
          <AlertCircle className="w-10 h-10 text-red-500 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Map Initialization Failed</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md text-center leading-relaxed">{error}</p>
      </div>
    );
  }

  // Handle successful data fetch but empty result set gracefully
  if (issues.length === 0) {
    return (
      <div className={containerClasses}>
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-full mb-5 shadow-sm border border-gray-200 dark:border-gray-700/50">
          <MapIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No Issues Detected</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md text-center leading-relaxed">The civic map is currently clear. Any new issues reported by the community will appear here in real-time.</p>
      </div>
    );
  }

  // Define the premium severity legend
  const legendOverlay = (
    <div className="absolute bottom-6 left-6 z-[1000] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 pointer-events-auto">
      <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 ml-1">Severity Index</h4>
      <ul className="space-y-2.5">
        {[
          { label: 'Critical', color: 'bg-red-500' },
          { label: 'High', color: 'bg-orange-500' },
          { label: 'Medium', color: 'bg-yellow-500' },
          { label: 'Low', color: 'bg-green-500' },
        ].map((item) => (
          <li key={item.label} className="flex items-center">
            <div className={`w-3.5 h-3.5 rounded-full border border-white/50 dark:border-gray-800 shadow-sm mr-3 ${item.color}`}></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  // Render the fully loaded, data-rich GIS map
  return (
    <CivicMap overlays={legendOverlay}>
      {/* AI Regional Insights Overlay */}
      <AIRegionalInsights issues={issues} />
      
      {/* Interactive Markers */}
      {issues.map((issue) => (
        <IssueMarker key={issue.id} issue={issue}>
          <IssuePopup issue={issue} allIssues={issues} />
        </IssueMarker>
      ))}
    </CivicMap>
  );
}
