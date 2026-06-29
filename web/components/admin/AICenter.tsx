'use client';

import React, { useState } from 'react';
import { Sparkles, Activity, ShieldCheck, Cpu, Database, Settings2 } from 'lucide-react';
import { Card } from '@/design-system/components/Card';

export default function AICenter() {
  const [config, setConfig] = useState({
    autoCategorize: false,
    sentimentAnalysis: false,
    spamDetection: false,
    aiSuggestions: true,
  });

  const toggleConfig = (key: keyof typeof config) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tokens Used (30d)</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">1.2M</h3>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-right">45% of quota</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">API Latency</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">245ms</h3>
            </div>
          </div>
          <p className="text-sm font-medium text-emerald-500 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Healthy
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">AI Analyses</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">8,402</h3>
            </div>
          </div>
          <p className="text-sm font-medium text-emerald-500">+12% this week</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Model Used</p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Gemini 1.5 Pro</h3>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-500">v1.5-pro-001</p>
        </Card>
      </div>

      {/* Configuration Settings */}
      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Settings2 className="w-5 h-5 text-slate-400" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Automation Configuration</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">Auto-categorization</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Automatically assign categories and severities to new issues using AI. (Disabled by Global AI Principle)
              </p>
            </div>
            <button 
              disabled
              onClick={() => toggleConfig('autoCategorize')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${config.autoCategorize ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700 opacity-50 cursor-not-allowed'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.autoCategorize ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">Spam Detection</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Use AI to automatically flag spam comments. (Disabled by Global AI Principle)
              </p>
            </div>
            <button 
              disabled
              onClick={() => toggleConfig('spamDetection')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${config.spamDetection ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700 opacity-50 cursor-not-allowed'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.spamDetection ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">On-Demand AI Suggestions</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Allow administrators and users to manually request AI insights.
              </p>
            </div>
            <button 
              onClick={() => toggleConfig('aiSuggestions')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${config.aiSuggestions ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.aiSuggestions ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </Card>

    </div>
  );
}
