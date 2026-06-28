import React from 'react';
import Link from 'next/link';
import { IssueFeedItem } from '@/services/feed';
import { Calendar, MapPin, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

interface IssueCardProps {
  issue: IssueFeedItem;
}

export default function IssueCard({ issue }: IssueCardProps) {
  // Format the creation date to be human readable
  const formattedDate = new Date(issue.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Determine dynamic severity styling based on CivicMind AI standards
  const getSeverityStyles = (severity: string) => {
    switch ((severity || 'LOW').toUpperCase()) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/50';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800/50';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50';
      case 'LOW':
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/50';
    }
  };

  // Determine dynamic status configuration
  const getStatusConfig = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'resolved' || s === 'closed') {
      return { 
        icon: CheckCircle2, 
        text: 'Resolved', 
        styles: 'text-green-700 dark:text-green-400 bg-green-50/90 dark:bg-green-900/40 border-green-200 dark:border-green-800' 
      };
    }
    if (s === 'in progress') {
      return { 
        icon: Clock, 
        text: 'In Progress', 
        styles: 'text-blue-700 dark:text-blue-400 bg-blue-50/90 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800' 
      };
    }
    return { 
      icon: ShieldAlert, 
      text: 'Open', 
      styles: 'text-gray-700 dark:text-gray-300 bg-gray-50/90 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700' 
    };
  };

  const statusConfig = getStatusConfig(issue.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Link 
      href={`/issues/${issue.id}`} 
      className="group block outline-none ring-offset-2 ring-offset-white dark:ring-offset-gray-900 focus:ring-2 focus:ring-blue-500 rounded-2xl h-full"
    >
      <div className="relative flex flex-col h-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
        
        {/* Image Section */}
        <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
          {issue.image_url ? (
            // Standard img tag to seamlessly support Supabase dynamic public URLs without next.config.js modifications
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={issue.image_url} 
              alt={`Image of ${issue.title}`} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800/80">
              <MapPin className="w-10 h-10 mb-2 opacity-50" />
              <span className="text-sm font-medium">No Image Provided</span>
            </div>
          )}

          {/* Status Badge Overlay */}
          <div className="absolute top-4 right-4">
            <div className={`flex items-center px-2.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border ${statusConfig.styles}`}>
              <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
              {statusConfig.text}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {issue.title}
            </h3>
          </div>

          {/* Severity and Category Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border uppercase tracking-wider ${getSeverityStyles(issue.severity)}`}>
              {issue.severity}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              {issue.category}
            </span>
          </div>

          {/* Meta Information */}
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5 text-gray-400 dark:text-gray-500" />
              {formattedDate}
            </div>
            
            <div className="flex items-center text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">
              View Details &rarr;
            </div>
          </div>
        </div>
        
      </div>
    </Link>
  );
}
