import React from 'react';
import { AlertCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface SettingsErrorProps {
  message: string;
  onRetry: () => void;
}

export default function SettingsError({ message, onRetry }: SettingsErrorProps) {
  return (
    <div className="bg-rose-500/10 border border-rose-500/30 rounded-[2rem] p-8 md:p-12 text-center shadow-inner backdrop-blur-md">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 mb-6 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-white mb-3">Unable to Load Settings</h2>
      <p className="text-rose-200/80 mb-8 max-w-md mx-auto font-medium">
        {message}
      </p>
      <button 
        onClick={onRetry}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10 shadow-inner hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
