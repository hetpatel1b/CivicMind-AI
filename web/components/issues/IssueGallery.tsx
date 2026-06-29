import React from 'react';
import { Image as ImageIcon, Sparkles, ZoomIn, Download } from 'lucide-react';
import { IssueImageInfo } from '@/services/issue-details';
import Image from 'next/image';

interface IssueGalleryProps {
  images: IssueImageInfo[];
}

export default function IssueGallery({ images }: IssueGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#0a0f1c]/50 backdrop-blur-3xl rounded-[2rem] border border-white/10 flex flex-col items-center justify-center text-gray-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-8">
        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
        <span className="font-bold text-gray-400">No evidence images attached to this record</span>
      </div>
    );
  }

  const primaryImage = images[0];

  return (
    <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden bg-[#050505] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] mb-8 relative group">
      
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={primaryImage.image_url}
        alt="Issue Evidence"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Top Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none flex justify-between items-start">
        {primaryImage.is_ai_analyzed && (
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 backdrop-blur-md text-indigo-300 text-xs font-black uppercase tracking-widest rounded-xl border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <Sparkles className="w-4 h-4" />
            AI Verified Evidence
          </div>
        )}
      </div>

      {/* Hover Controls */}
      <div className="absolute bottom-6 right-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-3 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white rounded-xl border border-white/20 transition-colors shadow-lg">
          <ZoomIn className="w-5 h-5" />
        </button>
        <button className="p-3 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white rounded-xl border border-white/20 transition-colors shadow-lg">
          <Download className="w-5 h-5" />
        </button>
      </div>

      {/* Image Metadata */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
        <div className="flex items-center gap-4 text-xs font-bold text-gray-300 uppercase tracking-widest">
          <span>Captured: 14:02 EST</span>
          <span className="w-1 h-1 rounded-full bg-gray-500" />
          <span>IMG-84920</span>
        </div>
      </div>
    </div>
  );
}
