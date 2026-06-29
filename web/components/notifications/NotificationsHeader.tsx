import React from 'react';
import Link from 'next/link';
import { RefreshCw, Activity, ArrowRight, LayoutDashboard, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface NotificationsHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function NotificationsHeader({ onRefresh, isRefreshing }: NotificationsHeaderProps = {}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-8 shadow-xl border border-white/10 text-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <Activity className="w-8 h-8 text-indigo-300" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Activity Center
            </h1>
            <p className="text-indigo-200 mt-1.5 max-w-lg text-sm leading-relaxed">
              Your intelligent hub for civic updates, community engagement, and AI-curated insights.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="group relative flex items-center justify-center p-2.5 h-10 w-10 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              title="Refresh Activity"
            >
              <RefreshCw className={`w-4 h-4 text-white relative z-10 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            </button>
          )}
          
          <Link
            href="/dashboard"
            className="flex items-center gap-2 h-10 px-4 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-xl text-sm font-semibold text-white transition-all backdrop-blur-md"
          >
            <LayoutDashboard className="w-4 h-4 text-indigo-300" />
            Dashboard
          </Link>
          
          <Link
            href="/profile"
            className="flex items-center gap-2 h-10 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-semibold text-white transition-all backdrop-blur-md group"
          >
            <User className="w-4 h-4 text-indigo-200" />
            Profile
            <ArrowRight className="w-3.5 h-3.5 text-indigo-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
