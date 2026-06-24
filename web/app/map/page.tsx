'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Map as MapIcon, Loader2 } from 'lucide-react';

/**
 * Dynamically import MapView with SSR disabled.
 * CRITICAL: React Leaflet strictly requires the `window` object to function.
 * By making this a Client Component and using ssr: false, we prevent SSR crashes.
 */
const MapView = dynamic(() => import('@/components/map/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] rounded-2xl flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
      <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading interactive map...</p>
    </div>
  )
});

/**
 * MapPage - The dedicated route for the Interactive Civic Map.
 * Provides the overarching UI structure, headers, and embeds the client-side MapView.
 */
export default function MapPage() {
  return (
    <main className="flex-1 bg-white dark:bg-[#0a0a0a] pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 rounded-xl shadow-sm border border-blue-200 dark:border-blue-800/50">
              <MapIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Interactive Civic Map
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl ml-1 leading-relaxed">
            Explore civic issues reported by the community. Click on any marker to view the issue details and contribute to the resolution process.
          </p>
        </div>

        {/* Dynamic Map Container */}
        <div className="w-full relative z-0">
          <MapView />
        </div>

      </div>
    </main>
  );
}
