'use client';

import React, { useEffect, useState, useMemo } from 'react';
import CivicMap from '@/components/map/CivicMap';
import IssueMarker from '@/components/map/IssueMarker';
import AIRegionalInsights from '@/components/map/AIRegionalInsights';
import IssueSidePanel from '@/components/map/IssueSidePanel';
import { getMapIssues } from '@/services/map';
import { MapIssue } from '@/types/map';
import { Loader2, AlertCircle, Map as MapIcon, Filter, Clock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MapView Component
 * 
 * Central orchestration component for the Interactive Civic Map.
 * Manages the geospatial data fetching lifecycle, rendering states, filters,
 * and maps the resulting data into interactive marker/side panel components.
 */
export default function MapView() {
  const [allIssues, setAllIssues] = useState<MapIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // UI State
  const [selectedIssue, setSelectedIssue] = useState<MapIssue | null>(null);
  
  // Filter State
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSeverity, setActiveSeverity] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchIssues() {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await getMapIssues();
        
        if (isMounted) {
          setAllIssues(data);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An unexpected error occurred while loading the map.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchIssues();

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute filtered issues
  const filteredIssues = useMemo(() => {
    return allIssues.filter(issue => {
      if (activeCategory && issue.category !== activeCategory) return false;
      if (activeSeverity && issue.severity !== activeSeverity) return false;
      return true;
    });
  }, [allIssues, activeCategory, activeSeverity]);

  // Derive categories for filter chips dynamically
  const categories = useMemo(() => {
    const cats = new Set(allIssues.map(i => i.category));
    return Array.from(cats).filter(Boolean).slice(0, 5); // Take top 5 for UI
  }, [allIssues]);

  // Derived Nearby Activity (just top recent issues globally for demo)
  const recentIssues = useMemo(() => {
    return [...allIssues]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 3);
  }, [allIssues]);

  const containerClasses = "relative w-full h-full min-h-[65vh] xl:min-h-[75vh] rounded-[2rem] bg-[#0a0f1c]/40 backdrop-blur-3xl border border-white/10 ring-1 ring-white/5 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)]";

  if (isLoading) {
    return (
      <div className={`${containerClasses} flex flex-col items-center justify-center`}>
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 bg-indigo-500/20 blur-[40px] rounded-full"></div>
          <Loader2 className="w-12 h-12 text-indigo-400 animate-spin relative z-10" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Connecting to Grid</h3>
        <p className="text-gray-400 font-medium animate-pulse">Loading geospatial civic data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${containerClasses} flex flex-col items-center justify-center`}>
        <div className="bg-rose-500/10 p-5 rounded-3xl mb-5 shadow-[0_0_20px_rgba(244,63,94,0.1)] border border-rose-500/20">
          <AlertCircle className="w-10 h-10 text-rose-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Connection Lost</h3>
        <p className="text-gray-400 max-w-md text-center font-medium leading-relaxed mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-white text-[#050505] rounded-xl font-bold hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // Premium UI Overlays
  const filterOverlay = (
    <div className="absolute top-6 left-6 right-16 z-[1000] pointer-events-none flex items-start gap-4 flex-wrap">
      {/* Smart Filters */}
      <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl p-2 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5 pointer-events-auto flex items-center gap-2 overflow-x-auto max-w-full hide-scrollbar">
        <div className="px-3 border-r border-white/10 flex items-center gap-2 text-indigo-400 shrink-0">
          <Filter className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Filters</span>
        </div>
        
        {/* Category Chips */}
        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border ${
              activeCategory === null 
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]' 
                : 'bg-transparent text-gray-400 hover:bg-white/5 hover:text-white border-transparent'
            }`}
          >
            All Areas
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border ${
                activeCategory === cat 
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]' 
                  : 'bg-transparent text-gray-400 hover:bg-white/5 hover:text-white border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Severity Dropdown Alternative (Chips for space) */}
        <div className="px-2 border-l border-white/10 flex gap-1.5 shrink-0 ml-1">
          {['CRITICAL', 'HIGH'].map(sev => (
            <button
              key={sev}
              onClick={() => setActiveSeverity(activeSeverity === sev ? null : sev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border ${
                activeSeverity === sev 
                  ? sev === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]' : 'bg-amber-500/20 text-amber-300 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  : 'bg-transparent text-gray-400 hover:bg-white/5 hover:text-white border-transparent'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const nearbyActivityOverlay = (
    <div className="hidden lg:block absolute top-24 left-6 z-[1000] w-72 pointer-events-none">
      <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl p-5 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5 pointer-events-auto">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
          <Clock className="w-4 h-4 text-indigo-400" />
          <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">Nearby Activity</h3>
        </div>
        
        <div className="space-y-4">
          {recentIssues.map(issue => (
            <button 
              key={issue.id}
              onClick={() => setSelectedIssue(issue)}
              className="w-full text-left group flex items-start gap-3 p-2 -ml-2 rounded-xl hover:bg-white/5 transition-all"
            >
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_currentColor] ${
                issue.severity === 'CRITICAL' ? 'text-rose-500 bg-rose-500' :
                issue.severity === 'HIGH' ? 'text-amber-500 bg-amber-500' :
                issue.severity === 'MEDIUM' ? 'text-emerald-500 bg-emerald-500' : 'text-indigo-500 bg-indigo-500'
              }`} />
              <div>
                <h4 className="text-xs font-bold text-gray-300 line-clamp-1 group-hover:text-white transition-colors leading-relaxed">
                  {issue.title}
                </h4>
                <p className="text-[10px] text-gray-500 font-medium mt-1 flex items-center gap-1 uppercase tracking-widest">
                  {issue.status === 'resolved' ? (
                    <><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Resolved</>
                  ) : (
                    <>Reported recently</>
                  )}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const mapOverlays = (
    <>
      {filterOverlay}
      {nearbyActivityOverlay}
      
      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedIssue && (
          <IssueSidePanel 
            issue={selectedIssue} 
            onClose={() => setSelectedIssue(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );

  return (
    <div className={containerClasses}>
      {filteredIssues.length === 0 && !selectedIssue ? (
        <div className="absolute inset-0 z-[500] flex flex-col items-center justify-center bg-[#050505]/60 backdrop-blur-md">
          <div className="bg-white/5 p-6 rounded-[2rem] mb-5 border border-white/10 ring-1 ring-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <MapIcon className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">No Issues Found</h3>
          <p className="text-gray-400 max-w-md text-center font-medium leading-relaxed mb-6">
            No issues match the current filter criteria in this area.
          </p>
          {(activeCategory || activeSeverity) && (
            <button 
              onClick={() => { setActiveCategory(null); setActiveSeverity(null); }}
              className="px-6 py-2.5 bg-white text-[#050505] rounded-xl font-bold hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : null}

      <CivicMap overlays={mapOverlays}>
        <AIRegionalInsights issues={filteredIssues} />
        {filteredIssues.map((issue) => (
          <IssueMarker 
            key={issue.id} 
            issue={issue} 
            onClick={() => setSelectedIssue(issue)}
          />
        ))}
      </CivicMap>
    </div>
  );
}
