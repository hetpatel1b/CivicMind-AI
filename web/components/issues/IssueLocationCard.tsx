import React from 'react';
import { MapPin, Navigation, Maximize2 } from 'lucide-react';
import Link from 'next/link';

interface IssueLocationCardProps {
  latitude: number;
  longitude: number;
  locationName: string | null;
}

export default function IssueLocationCard({ latitude, longitude, locationName }: IssueLocationCardProps) {
  return (
    <div className="bg-[#0a0f1c]/50 backdrop-blur-3xl rounded-[2rem] p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-black text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-400" />
          Location Intelligence
        </h3>
        <Link href={`/map?lat=${latitude}&lng=${longitude}`} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10">
          <Maximize2 className="w-4 h-4 text-gray-400" />
        </Link>
      </div>
      
      {/* Mini Map Placeholder Area */}
      <div className="w-full h-32 rounded-xl mb-4 relative overflow-hidden bg-[#050505] border border-white/10 group-hover:border-indigo-500/30 transition-colors">
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
        
        {/* Hotspot indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 bg-indigo-500/20 rounded-full animate-ping" />
            <div className="absolute w-8 h-8 bg-indigo-500/40 rounded-full animate-pulse" />
            <div className="w-4 h-4 bg-indigo-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(99,102,241,1)]" />
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 rounded-xl p-4 border border-white/10 relative overflow-hidden">
        <p className="text-sm font-bold text-white mb-2 leading-snug">
          {locationName || 'Precise location details masked by privacy filter'}
        </p>
        <div className="flex flex-col gap-1.5 text-xs text-indigo-300 font-mono">
          <div className="flex items-center justify-between">
            <span className="opacity-70">LATITUDE</span>
            <span>{latitude.toFixed(6)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="opacity-70">LONGITUDE</span>
            <span>{longitude.toFixed(6)}</span>
          </div>
        </div>
        
        <div className="absolute -bottom-4 -right-4 opacity-5">
          <Navigation className="w-24 h-24" />
        </div>
      </div>
    </div>
  );
}
