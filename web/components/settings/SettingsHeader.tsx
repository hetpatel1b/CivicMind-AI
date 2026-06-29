import React from 'react';
import { Settings, ShieldCheck, RefreshCw, UserCircle } from 'lucide-react';

interface SettingsHeaderProps {
  title: string;
  description?: string;
  userName?: string;
  role?: string;
  securityStatus?: 'secure' | 'warning' | 'critical';
  lastSync?: string;
}

export default function SettingsHeader({ 
  title, 
  description, 
  userName, 
  role,
  securityStatus = 'secure',
  lastSync
}: SettingsHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#050505]/60 backdrop-blur-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 mb-10 text-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-inner">
            <Settings className="w-8 h-8 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-sm">
              {title}
            </h1>
            {description && (
              <p className="text-indigo-200/80 mt-1.5 max-w-lg text-sm leading-relaxed font-medium">
                {description}
              </p>
            )}
          </div>
        </div>

        {userName && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 px-4 py-2 bg-[#0a0f1c]/50 border border-white/5 rounded-xl backdrop-blur-md shadow-inner">
              <UserCircle className="w-8 h-8 text-indigo-300 drop-shadow-sm" />
              <div>
                <div className="text-sm font-bold text-white">{userName}</div>
                <div className="text-xs text-indigo-400 uppercase tracking-widest font-black mt-0.5">{role}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-2.5 bg-[#0a0f1c]/50 border border-white/5 rounded-xl backdrop-blur-md h-full shadow-inner">
              {securityStatus === 'secure' ? (
                <ShieldCheck className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              )}
              <span className="text-xs font-bold text-gray-300">
                {securityStatus === 'secure' ? 'Account Secure' : 'Action Needed'}
              </span>
            </div>

            {lastSync && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-[#0a0f1c]/50 border border-white/5 rounded-xl backdrop-blur-md h-full shadow-inner">
                <RefreshCw className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-gray-300">
                  Synced: {lastSync}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
