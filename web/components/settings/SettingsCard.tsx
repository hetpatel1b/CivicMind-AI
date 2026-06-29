import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SettingsCardProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function SettingsCard({ title, description, icon: Icon, children, action, footer, className = '' }: SettingsCardProps) {
  return (
    <div className={`bg-[#0a0f1c]/80 rounded-[1.5rem] p-6 border border-white/5 shadow-inner backdrop-blur-md transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:border-white/10 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
        <div className="flex items-start gap-4 flex-1">
          {Icon && (
            <div className="p-2.5 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-400 shrink-0 shadow-inner">
              <Icon className="w-5 h-5 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            </div>
          )}
          <div className="flex-1 w-full">
            {title && <h3 className="text-base font-bold text-white">{title}</h3>}
            {description && <p className={`text-sm font-medium text-gray-400 leading-relaxed max-w-lg ${title ? 'mt-1' : ''}`}>{description}</p>}
            {children && <div className={title || description ? "mt-4" : ""}>{children}</div>}
          </div>
        </div>
        
        {action && (
          <div className="shrink-0 sm:ml-auto flex items-center">
            {action}
          </div>
        )}
      </div>
      {footer && (
        <div className="mt-6 pt-6 border-t border-white/10">
          {footer}
        </div>
      )}
    </div>
  );
}
