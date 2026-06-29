import React from 'react';
import Link from 'next/link';
import { IssueFeedItem } from '@/services/feed';
import { Calendar, MapPin, ShieldAlert, CheckCircle2, Clock, ThumbsUp, MessageSquare, Share2, Bookmark, Sparkles, Verified } from 'lucide-react';
import { Badge } from '@/design-system/components/Badge';

interface IssueCardProps {
  issue: IssueFeedItem;
  onCardClick?: (e: React.MouseEvent, issueId: string) => void;
}

export default function IssueCard({ issue, onCardClick }: IssueCardProps) {
  const formattedDate = new Date(issue.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const seed = issue.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const mockVotes = (seed % 150) + 12;
  const mockComments = (seed % 45) + 3;
  const mockDistance = ((seed % 50) / 10 + 0.5).toFixed(1);
  const isVerified = seed % 3 === 0;
  const hasAiSummary = seed % 2 === 0;

  const getSeverityStyles = (severity: string) => {
    switch ((severity || 'LOW').toUpperCase()) {
      case 'CRITICAL':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30 ring-1 ring-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.2)]';
      case 'HIGH':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30 ring-1 ring-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]';
      case 'MEDIUM':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 ring-1 ring-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
      case 'LOW':
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 ring-1 ring-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]';
    }
  };

  const getStatusConfig = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s === 'resolved' || s === 'closed') {
      return { 
        icon: CheckCircle2, 
        text: 'Resolved', 
        styles: 'text-emerald-400 bg-[#050505]/90 border-emerald-500/20 ring-1 ring-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
      };
    }
    if (s === 'in progress' || s === 'in-progress') {
      return { 
        icon: Clock, 
        text: 'In Progress', 
        styles: 'text-indigo-400 bg-[#050505]/90 border-indigo-500/20 ring-1 ring-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
      };
    }
    return { 
      icon: ShieldAlert, 
      text: 'Open', 
      styles: 'text-gray-300 bg-[#050505]/90 border-white/10 ring-1 ring-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]' 
    };
  };

  const statusConfig = getStatusConfig(issue.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="group relative flex flex-col h-full bg-[#0a0f1c]/80 backdrop-blur-3xl border border-white/10 ring-1 ring-white/5 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-500 transform hover:-translate-y-1.5 hover:border-white/20">
      
      {/* Image Section */}
      <Link 
        href={`/issues/${issue.id}`} 
        className="block relative w-full h-48 bg-[#050505] overflow-hidden shrink-0"
        onClick={(e) => onCardClick?.(e, issue.id)}
      >
        {issue.image_url ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img 
            src={issue.image_url} 
            alt={`Image of ${issue.title}`} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-[#050505] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#050505]" />
            <MapPin className="w-10 h-10 mb-2 opacity-30 text-indigo-500 z-10" />
            <span className="text-sm font-medium z-10 tracking-wider uppercase text-gray-500">No Image</span>
          </div>
        )}

        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/40 to-transparent opacity-90" />

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm border ${statusConfig.styles}`}>
            <StatusIcon className="w-3.5 h-3.5 mr-1.5 drop-shadow-md" />
            {statusConfig.text}
          </div>
        </div>

        {/* Distance Indicator */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center text-white text-[11px] font-bold tracking-wider uppercase bg-[#050505]/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 ring-1 ring-white/5 shadow-inner">
          <MapPin className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
          {mockDistance} mi away
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5 pb-4 relative z-10">
        
        {/* Verification & AI Badges */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-widest ${getSeverityStyles(issue.severity)}`}>
            {issue.severity}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-white/5 text-gray-300 border border-white/10 ring-1 ring-white/5">
            {issue.category}
          </span>
          
          <div className="flex-1" />
          
          {hasAiSummary && (
            <div title="AI Summary Available" className="p-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          )}
          {isVerified && (
            <div title="Community Verified" className="p-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <Verified className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        <Link 
          href={`/issues/${issue.id}`} 
          className="block mb-3 focus:outline-none"
          onClick={(e) => onCardClick?.(e, issue.id)}
        >
          <h3 className="text-lg font-bold text-white line-clamp-2 leading-snug group-hover:text-indigo-400 transition-colors drop-shadow-sm">
            {issue.title}
          </h3>
        </Link>
        
        {/* Quick description snippet */}
        <p className="text-sm text-gray-400 line-clamp-2 mb-6 font-medium leading-relaxed">
          {issue.description || 'No description provided for this intelligence report.'}
        </p>

        {/* Interactive Metrics */}
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-gray-400">
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-xs font-bold hover:text-white transition-colors">
              <ThumbsUp className="w-4 h-4 text-indigo-400/70" />
              {mockVotes}
            </button>
            <Link href={`/issues/${issue.id}#comments`} className="flex items-center gap-1.5 text-xs font-bold hover:text-white transition-colors">
              <MessageSquare className="w-4 h-4 text-indigo-400/70" />
              {mockComments}
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold px-2 mr-2 border-r border-white/10 flex items-center text-gray-500 tracking-wider uppercase">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-600" />
              {formattedDate}
            </span>
            <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-500 hover:text-white" title="Bookmark">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-500 hover:text-white" title="Share">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
