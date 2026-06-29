import React from 'react';
import { Mail, FileCode2, BookOpen, Clock } from 'lucide-react';

export default function ContactInformation() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-[2rem] p-8 md:p-10 shadow-2xl h-full flex flex-col justify-between border border-indigo-500/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <h3 className="text-2xl font-extrabold mb-4">Direct Contact</h3>
        <p className="text-indigo-100/80 mb-10 leading-relaxed font-medium">
          Prefer to reach out directly? Use the channels below. We aim to respond to all inquiries within our standard response times.
        </p>

        <div className="space-y-8">
          <div className="flex items-start group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-5 h-5 text-indigo-300" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Support Email</p>
              <p className="text-base font-bold mt-1 text-white">support@civicmind.ai</p>
            </div>
          </div>

          <div className="flex items-start group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <FileCode2 className="w-5 h-5 text-indigo-300" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Project Repository</p>
              <p className="text-base font-bold mt-1 text-white">github.com/civicmind</p>
            </div>
          </div>

          <div className="flex items-start group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-5 h-5 text-indigo-300" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Documentation</p>
              <p className="text-base font-bold mt-1 text-white">docs.civicmind.ai</p>
            </div>
          </div>

          <div className="flex items-start group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Response Time</p>
              <p className="text-base font-bold mt-1 text-white flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Under 24 hours (Business Days)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
