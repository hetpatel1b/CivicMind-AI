'use client';

import React, { useState } from 'react';
import { Mail, Lock, ShieldAlert, Loader2, Info, ChevronDown } from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';
import { Card } from '@/design-system/components/Card';
import { Button } from '@/design-system/components/Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw new Error(signInError.message);
      }

      // Check if user is actually an admin
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Authentication failed.');

      const { data: userData, error: roleError } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (roleError || !['admin', 'super_admin', 'moderator'].includes(userData?.role?.toLowerCase())) {
        await supabase.auth.signOut();
        throw new Error('Unauthorized. Administrator access required.');
      }

      window.location.href = '/admin';
     
    } catch (err: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-inner mb-6 shadow-indigo-500/20">
          <ShieldAlert className="w-7 h-7 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Welcome Administrator</h2>
        <p className="text-slate-400 text-sm">
          Sign in with your administrator credentials.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Decorative corner glows */}
        <div className="absolute top-[-50px] right-[-50px] w-[100px] h-[100px] bg-indigo-500/20 rounded-full blur-[40px]" />
        <div className="absolute bottom-[-50px] left-[-50px] w-[100px] h-[100px] bg-purple-500/20 rounded-full blur-[40px]" />

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 font-medium flex items-center gap-2">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="space-y-1.5 group">
            <label className="text-sm font-medium text-slate-300 ml-1 transition-colors group-focus-within:text-indigo-400">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 border border-white/10 rounded-xl bg-[#0f172a]/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-[#0f172a]/80 transition-all sm:text-sm"
                placeholder="admin@civicmind.ai"
              />
            </div>
          </div>

          <div className="space-y-1.5 group">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-slate-300 transition-colors group-focus-within:text-indigo-400">Password</label>
              <a href="#" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 border border-white/10 rounded-xl bg-[#0f172a]/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-[#0f172a]/80 transition-all sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative flex items-center justify-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="peer h-4 w-4 appearance-none rounded border border-white/20 bg-transparent checked:bg-indigo-500 checked:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-1 focus:ring-offset-[#020817] transition-all cursor-pointer"
              />
              <svg className="absolute w-2.5 h-2.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white transition-opacity" viewBox="0 0 14 14" fill="none">
                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
              </svg>
            </div>
            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300 cursor-pointer select-none">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.2)] text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden group"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className="relative flex items-center gap-2">
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </span>
          </button>
        </form>

        {/* Demo Credentials Section */}
        <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
          <button 
            onClick={() => setShowDemo(!showDemo)}
            className="w-full flex items-center justify-between text-sm text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Need demo credentials?
            </span>
            <motion.div animate={{ rotate: showDemo ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {showDemo && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 p-3 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-slate-300 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email:</span>
                    <span className="text-indigo-300">admin@civicmind.ai</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Password:</span>
                    <span className="text-indigo-300">admin123</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5">
          <Lock className="w-3 h-3" />
          Protected by enterprise-grade authentication
        </div>
        <p className="text-center px-4">
          Only verified administrators can access moderation tools.
        </p>
      </div>
    </div>
  );
}
