import React from 'react';

const SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];

interface SeveritySelectorProps {
  value: string;
  onChange: (severity: string) => void;
}

export default function SeveritySelector({ value, onChange }: SeveritySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-gray-300 mb-2">
        Severity Level
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SEVERITIES.map((sev) => {
          const isSelected = value === sev;
          let colorClass = '';
          if (isSelected) {
            switch(sev) {
              case 'Low': colorClass = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'; break;
              case 'Medium': colorClass = 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'; break;
              case 'High': colorClass = 'bg-orange-500/20 border-orange-500/50 text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.2)]'; break;
              case 'Critical': colorClass = 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]'; break;
            }
          } else {
            colorClass = 'bg-white/[0.02] border-white/10 text-gray-400 hover:bg-white/5 hover:border-white/20 hover:text-white';
          }
          return (
            <button
              key={sev}
              type="button"
              onClick={() => onChange(sev)}
              className={`p-3.5 text-sm font-bold rounded-xl border text-center transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${colorClass}`}
            >
              {sev}
            </button>
          );
        })}
      </div>
    </div>
  );
}
