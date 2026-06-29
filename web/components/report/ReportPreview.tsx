import React from 'react';
import { MapPin, Tag, AlertTriangle, FileText } from 'lucide-react';

interface ReportPreviewProps {
  title: string;
  category: string;
  severity: string;
  description: string;
  latitude: string;
  longitude: string;
  imagePreviewUrl: string | null;
}

export default function ReportPreview({
  title,
  category,
  severity,
  description,
  latitude,
  longitude,
  imagePreviewUrl
}: ReportPreviewProps) {
  
  const getSeverityColor = (sev: string) => {
    switch (sev.toLowerCase()) {
      case 'critical':
      case 'high': return 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.2)]';
      case 'medium': return 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'low': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
      default: return 'bg-white/5 text-gray-300 border-white/10';
    }
  };

  return (
    <div className="w-full bg-[#050505]/50 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row h-full max-h-[500px] ring-1 ring-white/5">
      {/* Left side: Image */}
      <div className="w-full md:w-1/2 h-64 md:h-auto bg-[#0a0f1c] relative border-r border-white/5">
        {imagePreviewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imagePreviewUrl} alt="Issue evidence" className="w-full h-full object-cover opacity-90 mix-blend-lighten" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-500 font-medium text-sm tracking-wide">No image provided</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
      </div>

      {/* Right side: Details */}
      <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
            <Tag className="w-3.5 h-3.5" />
            {category || 'Uncategorized'}
          </span>
          <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 border ${getSeverityColor(severity)}`}>
            <AlertTriangle className="w-3.5 h-3.5" />
            {severity || 'Severity Unset'}
          </span>
        </div>

        <h3 className="text-2xl font-extrabold text-white mb-3 leading-tight tracking-tight">
          {title || 'Untitled Issue'}
        </h3>
        
        <p className="text-gray-400 text-sm mb-6 flex-1 whitespace-pre-wrap leading-relaxed font-medium">
          {description || 'No description provided.'}
        </p>

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
              <MapPin className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Location Coordinates</p>
              <p className="text-sm font-bold text-white truncate bg-white/5 px-2 py-1 rounded-md inline-block border border-white/5">
                {latitude && longitude ? `${parseFloat(latitude).toFixed(4)}, ${parseFloat(longitude).toFixed(4)}` : 'Not provided'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
