'use client';

import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import type { MapOptions } from 'leaflet';
import { Maximize, Minimize, Navigation } from 'lucide-react';

// Required for Next.js Leaflet integration to prevent icon rendering issues
// This must be handled by the consumer or globally, but we keep the map component clean.

interface CivicMapProps {
  /**
   * Optional child components (e.g., Markers, Popups, GeoJSON layers) 
   * to render dynamically inside the MapContainer.
   */
  children?: React.ReactNode;
  /**
   * Optional overlay components (e.g., Legends, Floating Action Buttons)
   * to render outside the Leaflet container but inside the map wrapper.
   */
  overlays?: React.ReactNode;
}

// Map Configuration Defaults
const DEFAULT_CENTER: [number, number] = [20.5937, 78.9629]; // Geographic center of India
const DEFAULT_ZOOM = 5;

// Component to handle Locate Me and Fullscreen controls using Leaflet map context
function MapCustomControls({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const map = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleLocate = () => {
    setIsLocating(true);
    map.locate().on('locationfound', function (e) {
      setIsLocating(false);
      map.flyTo(e.latlng, 14, { duration: 1.5 });
    }).on('locationerror', function () {
      setIsLocating(false);
      alert('Could not access your location. Please check browser permissions.');
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="leaflet-top leaflet-right mt-4 mr-4 flex flex-col gap-2 pointer-events-auto z-[1000] relative">
      <button 
        onClick={handleLocate} 
        disabled={isLocating}
        className="w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-black transition-all text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" 
        title="Locate Me"
        aria-label="Locate Me"
      >
        <Navigation className={`w-5 h-5 ${isLocating ? 'animate-pulse text-blue-500' : ''}`} />
      </button>
      <button 
        onClick={toggleFullscreen} 
        className="w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-black transition-all text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        title="Toggle Fullscreen"
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
      </button>
    </div>
  );
}

/**
 * CivicMap Base Component
 * 
 * Provides the interactive Leaflet map canvas for plotting civic issues.
 * Uses a responsive, dark-mode compatible container.
 * 
 * IMPORTANT: Because 'leaflet' accesses the `window` object, this component
 * MUST be dynamically imported with `{ ssr: false }` by any Next.js page that uses it.
 */
export default function CivicMap({ children, overlays }: CivicMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Map configuration options decoupled from JSX for cleaner readability
  const mapOptions: MapOptions = {
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    scrollWheelZoom: true,
    zoomControl: false, // Disable default zoom to use our custom positioned one
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-0 bg-gray-100 dark:bg-gray-900 transition-all duration-300"
    >
      <MapContainer 
        {...mapOptions} 
        className="w-full h-full z-0"
      >
        {/* OpenStreetMap Base Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <ZoomControl position="bottomright" />
        <MapCustomControls containerRef={containerRef} />
        
        {/* Render dynamic markers and interactive GIS layers here */}
        {children}
      </MapContainer>
      
      {overlays}
    </div>
  );
}
