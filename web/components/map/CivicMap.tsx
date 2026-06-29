'use client';

import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import type { MapOptions } from 'leaflet';
import { Maximize, Minimize, Navigation } from 'lucide-react';

interface CivicMapProps {
  children?: React.ReactNode;
  overlays?: React.ReactNode;
}

const DEFAULT_CENTER: [number, number] = [20.5937, 78.9629];
const DEFAULT_ZOOM = 5;

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

  const resetView = () => {
    map.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, { duration: 1.5 });
  };

  const buttonClasses = "w-12 h-12 flex items-center justify-center bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5 hover:bg-white/10 hover:scale-105 transition-all text-gray-400 disabled:opacity-50 group";

  return (
    <div className="leaflet-top leaflet-right mt-6 mr-6 flex flex-col gap-3 pointer-events-auto z-[1000] relative">
      <button 
        onClick={resetView}
        className={buttonClasses}
        title="Reset Map View"
        aria-label="Reset Map View"
      >
        <MapIcon className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
      </button>

      <button 
        onClick={handleLocate} 
        disabled={isLocating}
        className={buttonClasses}
        title="Locate Me"
        aria-label="Locate Me"
      >
        <Navigation className={`w-5 h-5 group-hover:text-indigo-400 transition-colors ${isLocating ? 'animate-pulse text-indigo-400' : ''}`} />
      </button>

      <button 
        onClick={toggleFullscreen} 
        className={buttonClasses}
        title="Toggle Fullscreen"
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? (
          <Minimize className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
        ) : (
          <Maximize className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
        )}
      </button>
    </div>
  );
}

// Temporary internal import to avoid dependency cycle just for icon
import { Map as MapIcon } from 'lucide-react';

export default function CivicMap({ children, overlays }: CivicMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mapOptions: MapOptions = {
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    scrollWheelZoom: true,
    zoomControl: false,
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 transition-all duration-300 rounded-[2rem] overflow-hidden"
    >
      <MapContainer 
        {...mapOptions} 
        className="w-full h-full z-0 outline-none"
      >
        {/* Modern Map Tile Layer (Light) */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* Custom Zoom Control positioned properly */}
        <ZoomControl position="bottomright" />
        <MapCustomControls containerRef={containerRef} />
        
        {children}
      </MapContainer>
      
      {overlays}
    </div>
  );
}
