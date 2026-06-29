import React from 'react';
import { User, Calendar, FileText } from 'lucide-react';
import { ReporterInfo } from '@/services/issue-details';

interface IssueInformationProps {
  description: string | null;
  reporter: ReporterInfo | null;
  createdAt: string;
}

export default function IssueInformation({ description, reporter, createdAt }: IssueInformationProps) {
  return (
    <div className="bg-[#0a0f1c]/50 backdrop-blur-3xl rounded-[2rem] p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5 relative overflow-hidden">
      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-emerald-500 opacity-50" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/5 rounded-xl border border-white/10">
          <FileText className="w-5 h-5 text-gray-300" />
        </div>
        <h2 className="text-xl font-black text-white tracking-tight">Citizen Report</h2>
      </div>

      <div className="max-w-none mb-10">
        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-lg font-medium">
          {description || 'No detailed description provided by the citizen.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/10">
        
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 transition-colors hover:bg-white/10">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 overflow-hidden border border-white/20 shadow-inner">
            {reporter?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={reporter.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div>
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Reported By</p>
            <p className="text-base font-bold text-white">
              {reporter?.full_name || 'Anonymous Citizen'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10 transition-colors hover:bg-indigo-500/10">
          <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Calendar className="w-6 h-6 drop-shadow-sm" />
          </div>
          <div>
            <p className="text-xs font-black text-indigo-300/70 uppercase tracking-widest mb-1">Date Reported</p>
            <p className="text-base font-bold text-indigo-100">
              {new Date(createdAt).toLocaleDateString(undefined, { 
                year: 'numeric', month: 'long', day: 'numeric' 
              })}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
