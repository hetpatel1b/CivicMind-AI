import React from 'react';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import { ShieldCheck, Lock, Activity, Users, FileText, Database } from 'lucide-react';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#020817]">
      
      {/* Left Panel - Security Features (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] relative flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-[#0a0f1c] via-[#0f172a] to-[#1e1b4b]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen" />
          <div className="absolute top-[40%] left-[60%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[100px] mix-blend-screen" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold tracking-wide mb-6">
              <ShieldCheck className="w-4 h-4" />
              Restricted Area
            </div>
            <h1 className="text-4xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Secure Administration <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Portal</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
              Manage civic reports, moderate communities, monitor AI decisions, and keep CivicMind running securely.
            </p>
          </div>

          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <FeatureCard icon={<Lock />} title="Role-Based Access" desc="Enterprise-grade permission controls" />
            <FeatureCard icon={<Activity />} title="AI Assisted Moderation" desc="Automated classification & flagging" />
            <FeatureCard icon={<Database />} title="Audit Logging" desc="Comprehensive action tracking" />
            <FeatureCard icon={<ShieldCheck />} title="Enterprise Security" desc="End-to-end encrypted sessions" />
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
            <StatItem value="15K+" label="Active Reports" icon={<FileText className="w-4 h-4 text-indigo-400" />} />
            <StatItem value="96%" label="AI Accuracy" icon={<Activity className="w-4 h-4 text-purple-400" />} />
            <StatItem value="450K+" label="Citizens" icon={<Users className="w-4 h-4 text-blue-400" />} />
          </div>
        </div>

        {/* Trust Badges Footer */}
        <div className="relative z-10 flex flex-wrap gap-4 mt-12 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md border border-white/5"><Lock className="w-3 h-3" /> Encrypted Session</span>
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md border border-white/5"><ShieldCheck className="w-3 h-3" /> Administrator Only</span>
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md border border-white/5"><Database className="w-3 h-3" /> Audit Enabled</span>
        </div>
      </div>

      {/* Right Panel - Auth */}
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center items-center p-6 sm:p-12 relative bg-[#020817]">
        {/* Mobile Background Elements */}
        <div className="absolute inset-0 z-0 lg:hidden overflow-hidden">
          <div className="absolute top-0 right-0 w-[80%] h-[50%] rounded-full bg-indigo-900/20 blur-[100px] mix-blend-screen" />
        </div>
        
        <div className="relative z-10 w-full max-w-[420px]">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-300">
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5' }) : icon}
      </div>
      <div>
        <h3 className="text-white font-medium mb-1">{title}</h3>
        <p className="text-sm text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

function StatItem({ value, label, icon }: { value: string, label: string, icon: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
      </div>
      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
}
