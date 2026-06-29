import React from 'react';
import Link from 'next/link';
import { ChevronRight, Check, Trash2 } from 'lucide-react';
import { NotificationRecord } from '@/types/notification';
import NotificationIcon from './NotificationIcon';

interface NotificationCardProps {
  notification: NotificationRecord;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NotificationCard({ notification, onMarkAsRead, onDelete }: NotificationCardProps) {
  const { id, type, title, message, isRead, createdAt } = notification;

  // Function to determine related URL
  const getHref = () => {
    if (type.includes('ISSUE')) return `/dashboard`;
    if (type === 'BADGE_EARNED') return `/reputation`;
    return `/profile`;
  };
  
  // Intelligent priority mapping
  const getPriorityStyles = () => {
    if (type === 'ISSUE_VERIFIED') return 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]';
    if (type === 'ISSUE_SUPPORTED') return 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]';
    if (type === 'BADGE_EARNED') return 'border-amber-500/50 bg-amber-500/10 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]';
    return 'border-white/20 bg-white/5';
  };

  return (
    <div 
      className={`group/card relative flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 border backdrop-blur-md hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] ${
        isRead 
          ? 'bg-[#0a0f1c]/50 border-white/5 opacity-80 hover:opacity-100 hover:border-white/10' 
          : `bg-[#0a0f1c]/90 ${getPriorityStyles()}`
      }`}
      aria-labelledby={`notification-title-${id}`}
    >
      {!isRead && (
        <div className="absolute -left-[1px] top-4 bottom-4 w-[3px] bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
      )}
      
      <div className="relative pt-1 shrink-0">
        <NotificationIcon type={type} />
        {!isRead && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 border-2 border-[#0a0f1c] rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h4 id={`notification-title-${id}`} className={`text-base font-bold truncate transition-colors ${isRead ? 'text-gray-400' : 'text-white group-hover/card:text-indigo-400'}`}>
            {title}
          </h4>
          <span className="text-xs font-black text-gray-500 shrink-0 whitespace-nowrap bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg shadow-inner">
            {new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <p className={`text-sm mb-4 line-clamp-2 leading-relaxed font-medium ${isRead ? 'text-gray-500' : 'text-gray-300'}`}>
          {message}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link 
            href={getHref()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-inner hover:shadow-[0_0_10px_rgba(99,102,241,0.2)]"
            aria-label={`View details for ${title}`}
          >
            View Details
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
          </Link>
          
          <div className="flex items-center gap-2 ml-auto">
            {!isRead && (
              <button
                onClick={() => onMarkAsRead(id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-300 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-xl shadow-inner hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                aria-label={`Mark "${title}" as read`}
              >
                <Check className="w-3.5 h-3.5" />
                Mark read
              </button>
            )}
            <button
              onClick={() => onDelete(id)}
              className="inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-gray-500 hover:text-rose-400 bg-white/5 border border-white/10 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-xl shadow-inner"
              aria-label={`Delete notification "${title}"`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
