import React from 'react';
import { X, Calendar, MapPin, Building, AlertCircle } from 'lucide-react';
import { MapIssue } from '@/types/map';
import Link from 'next/link';

interface IssueSidePanelProps {
  issue: MapIssue;
  onClose: () => void;
}

export default function IssueSidePanel({ issue, onClose }: IssueSidePanelProps) {
  const formattedDate = new Date(issue.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Convert map severity to a Tailwind color class
  const getSeverityStyles = (severity: string) => {
    switch ((severity || 'LOW').toUpperCase()) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800/50';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800/50';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-800/50';
      default: return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800/50';
    }
  };

  return (
    <div className="absolute top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-[#0a0a0a] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-[2000] flex flex-col transition-transform duration-300 transform translate-x-0 border-l border-gray-200 dark:border-gray-800 overflow-hidden pointer-events-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 shrink-0 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-sm z-10">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate pr-4">Issue Details</h3>
        <button 
          onClick={onClose}
          className="p-2 -mr-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close panel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Image (Fallback if none) */}
        <div className="w-full aspect-video bg-gray-100 dark:bg-gray-900 flex items-center justify-center shrink-0">
          <span className="text-gray-400 dark:text-gray-600 text-sm font-medium">Issue Image Preview</span>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Tags */}
          <div className="flex flex-wrap items-start gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
              {issue.category}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getSeverityStyles(issue.severity)}`}>
              {issue.severity}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
              {issue.status}
            </span>
          </div>

          {/* Title & Desc */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
              {issue.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {issue.description || 'No detailed description provided for this issue.'}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-500">
                <Calendar className="w-3.5 h-3.5" /> Date Reported
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{formattedDate}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-500">
                <Building className="w-3.5 h-3.5" /> Department
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">Public Works</span>
            </div>
            <div className="col-span-2 flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-500">
                <MapPin className="w-3.5 h-3.5" /> Coordinates
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                {issue.latitude.toFixed(5)}, {issue.longitude.toFixed(5)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 shrink-0 flex gap-3">
        <button className="flex-1 py-2.5 rounded-xl font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a]">
          Support Issue
        </button>
        <Link 
          href={`/issues/${issue.id}`}
          className="flex-1 flex items-center justify-center py-2.5 rounded-xl font-semibold text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
