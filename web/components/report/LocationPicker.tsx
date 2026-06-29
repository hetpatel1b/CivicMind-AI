'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/design-system/motion/variants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DraggableMarker = ({ mapModule, latitude, longitude, onChange, reverseGeocode }: any) => {
  const { Marker, useMapEvents } = mapModule;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);

  const map = useMapEvents({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    click(e: any) {
      onChange(e.latlng.lat.toString(), e.latlng.lng.toString());
      reverseGeocode(e.latlng.lat, e.latlng.lng);
    },
  });

  const defaultLat = latitude ? parseFloat(latitude) : 40.7128;
  const defaultLng = longitude ? parseFloat(longitude) : -74.006;

  useEffect(() => {
    if (latitude && longitude) {
      map.setView([parseFloat(latitude), parseFloat(longitude)], map.getZoom());
    }
  }, [latitude, longitude, map]);

  return (
    <Marker
      draggable={true}
      eventHandlers={{
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            const position = marker.getLatLng();
            onChange(position.lat.toString(), position.lng.toString());
            reverseGeocode(position.lat, position.lng);
          }
        },
      }}
      position={[defaultLat, defaultLng]}
      ref={markerRef}
    />
  );
};

interface LocationPickerProps {
  latitude: string;
  longitude: string;
  onChange: (lat: string, lng: string) => void;
}

export default function LocationPicker({ latitude, longitude, onChange }: LocationPickerProps) {
  const [address, setAddress] = useState<string>('Finding location...');
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mapModule, setMapModule] = useState<any>(null);

  // Dynamic import for react-leaflet since it requires window
  useEffect(() => {
    let mounted = true;
    import('react-leaflet').then((module) => {
      if (mounted) {
        setMapModule(module);
      }
    });
    
    // Also need to import leaflet css
    import('leaflet/dist/leaflet.css');
    
    // Fix leaflet marker icon issue in Next.js
    import('leaflet').then((L) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    });

    return () => { mounted = false; };
  }, []);

  const defaultLat = latitude ? parseFloat(latitude) : 40.7128;
  const defaultLng = longitude ? parseFloat(longitude) : -74.006;

  // Fake reverse geocoding for demo
  const reverseGeocode = async (lat: number, lng: number) => {
    setAddress('Locating...');
    setTimeout(() => {
      setAddress(`${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? 'E' : 'W'}`);
    }, 600);
  };

  useEffect(() => {
    if (!latitude && !longitude) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude: lat, longitude: lng } = position.coords;
            onChange(lat.toString(), lng.toString());
            reverseGeocode(lat, lng);
          },
          () => {
             
            setError("Could not get your exact location. Please drag the pin.");
            setAddress('Drag pin to set location');
          }
        );
      }
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      reverseGeocode(defaultLat, defaultLng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          onChange(lat.toString(), lng.toString());
          reverseGeocode(lat, lng);
          setError(null);
        },
        () => {
          setError("Location access denied or unavailable.");
        }
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {error && (
        <motion.div variants={fadeUp} className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 backdrop-blur-md">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <p className="text-sm text-rose-300 font-medium">{error}</p>
        </motion.div>
      )}

      {/* Premium Map Container */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-[1.5rem] overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#050505] ring-1 ring-white/5">
        
        {mapModule ? (
          <mapModule.MapContainer
            center={[defaultLat, defaultLng]}
            zoom={14}
            scrollWheelZoom={true}
            className="w-full h-full z-0 filter brightness-[0.8] contrast-[1.2]"
          >
            <mapModule.TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <DraggableMarker mapModule={mapModule} latitude={latitude} longitude={longitude} onChange={onChange} reverseGeocode={reverseGeocode} />
          </mapModule.MapContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#050505]">
            <span className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
          </div>
        )}
        
        {/* Glass Overlay Top */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-[400]">
          <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 pointer-events-auto max-w-[70%] ring-1 ring-white/5">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Detected Location</span>
            </div>
            <p className="text-sm text-white font-medium truncate" title={address}>
              {address}
            </p>
          </div>

          <button
            type="button"
            onClick={handleGetCurrentLocation}
            className="p-3 bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 hover:bg-white/10 hover:scale-105 transition-all pointer-events-auto group outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ring-1 ring-white/5"
            title="Use Current Location"
          >
            <Navigation className="w-5 h-5 text-indigo-400 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative group">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Latitude</label>
          <div className="px-4 py-3 bg-[#050505]/50 border border-white/10 rounded-xl text-sm font-medium text-white backdrop-blur-md shadow-inner">
            {latitude ? parseFloat(latitude).toFixed(6) : '—'}
          </div>
        </div>
        <div className="relative group">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Longitude</label>
          <div className="px-4 py-3 bg-[#050505]/50 border border-white/10 rounded-xl text-sm font-medium text-white backdrop-blur-md shadow-inner">
            {longitude ? parseFloat(longitude).toFixed(6) : '—'}
          </div>
        </div>
      </div>
    </div>
  );
}
