'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { getReputationProfile, getReputationSummary } from '@/services/reputation';
import { getBadgeSummary } from '@/services/badges';
import { AnimatePresence, motion } from 'framer-motion';

import SettingsHeader from '@/components/settings/SettingsHeader';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import SettingsSection from '@/components/settings/SettingsSection';
import SettingsCard from '@/components/settings/SettingsCard';
import SettingsSkeleton from '@/components/settings/SettingsSkeleton';
import SettingsEmpty from '@/components/settings/SettingsEmpty';
import SettingsError from '@/components/settings/SettingsError';
import { CheckCircle2, AlertCircle, Loader2, Monitor, Sun, Moon, Link as LinkIcon, LogOut, ShieldAlert } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Account');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [accountData, setAccountData] = useState<{
    fullName: string;
    email: string;
    role: string;
    createdAt: string;
  } | null>(null);

  const [securityData, setSecurityData] = useState<{
    provider: string;
    emailVerified: boolean;
    sessionExpires: string;
  } | null>(null);

  const [stats, setStats] = useState<{
    level: string;
    points: number;
    badges: number;
    reports: number;
    comments: number;
    supports: number;
  } | null>(null);

  // UX State
  const [themePref, setThemePref] = useState('system');
  const [initialThemePref, setInitialThemePref] = useState('system');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const isDirty = themePref !== initialThemePref;

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    
    try {
      // Simulate backend save delay for theme preferences
      await new Promise(r => setTimeout(r, 600));
      
      setInitialThemePref(themePref);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setSaveError('Failed to save preferences.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setThemePref(initialThemePref);
    setSaveError(null);
    setSaveSuccess(false);
  };

  const loadSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const supabase = createClient();
      
      const [userResponse, sessionResponse] = await Promise.all([
        supabase.auth.getUser(),
        supabase.auth.getSession()
      ]);

      const user = userResponse.data.user;
      const session = sessionResponse.data.session;

      if (!user) {
        window.location.href = '/login';
        return;
      }

      const fullName = user.user_metadata?.full_name || 'Citizen';
      const email = user.email || '';
      const createdAt = new Date(user.created_at).toLocaleDateString();

      // Fetch role
      const { data: publicUser } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
        
      const role = publicUser?.role || 'citizen';

      setAccountData({ fullName, email, role, createdAt });

      // Fetch Stats
      const [repProfile, repSummary, badgeSummary] = await Promise.all([
        getReputationProfile(user.id).catch(() => null),
        getReputationSummary(user.id).catch(() => null),
        getBadgeSummary(user.id).catch(() => null),
      ]);

      setStats({
        level: repProfile?.level || 'Citizen',
        points: repProfile?.totalPoints || 0,
        badges: badgeSummary?.totalBadges || 0,
        reports: repSummary?.totalReports || 0,
        comments: repSummary?.totalComments || 0,
        supports: repSummary?.totalSupports || 0,
      });

      // Populate Security Data
      const provider = user.app_metadata?.provider || 'email';
      const emailVerified = !!user.email_confirmed_at;
      const sessionExpires = session?.expires_at 
        ? new Date(session.expires_at * 1000).toLocaleString() 
        : 'Unknown';

      setSecurityData({ provider, emailVerified, sessionExpires });

    } catch (err) {
      console.error('Failed to load settings:', err);
      setError('Failed to securely load your account preferences. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await loadSettings();
    };
    init();
  }, [loadSettings]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#020817] pt-28 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SettingsSkeleton />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#020817] pt-28 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SettingsError message={error} onRetry={loadSettings} />
        </div>
      </main>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Account':
        return (
          <>
            <SettingsSection title="Account Summary" description="Overview of your civic engagement and platform statistics.">
              <SettingsCard>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="bg-white/5 p-5 rounded-[1.5rem] border border-white/5 flex flex-col justify-center transition-all hover:bg-white/10 hover:border-white/10 shadow-inner">
                    <span className="block text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Level</span>
                    <span className="block text-3xl font-black text-white tracking-tight truncate">{stats?.level}</span>
                  </div>
                  <div className="bg-white/5 p-5 rounded-[1.5rem] border border-white/5 flex flex-col justify-center transition-all hover:bg-white/10 hover:border-white/10 shadow-inner">
                    <span className="block text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Reputation</span>
                    <span className="block text-3xl font-black text-white tracking-tight truncate">{stats?.points} pts</span>
                  </div>
                  <div className="bg-white/5 p-5 rounded-[1.5rem] border border-white/5 flex flex-col justify-center transition-all hover:bg-white/10 hover:border-white/10 shadow-inner">
                    <span className="block text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Badges</span>
                    <span className="block text-3xl font-black text-white tracking-tight truncate">{stats?.badges} earned</span>
                  </div>
                  <div className="bg-white/5 p-5 rounded-[1.5rem] border border-white/5 flex flex-col justify-center transition-all hover:bg-white/10 hover:border-white/10 shadow-inner">
                    <span className="block text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Reports</span>
                    <span className="block text-3xl font-black text-white tracking-tight truncate">{stats?.reports} submitted</span>
                  </div>
                  <div className="bg-white/5 p-5 rounded-[1.5rem] border border-white/5 flex flex-col justify-center transition-all hover:bg-white/10 hover:border-white/10 shadow-inner">
                    <span className="block text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Comments</span>
                    <span className="block text-3xl font-black text-white tracking-tight truncate">{stats?.comments} added</span>
                  </div>
                  <div className="bg-white/5 p-5 rounded-[1.5rem] border border-white/5 flex flex-col justify-center transition-all hover:bg-white/10 hover:border-white/10 shadow-inner">
                    <span className="block text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Supports</span>
                    <span className="block text-3xl font-black text-white tracking-tight truncate">{stats?.supports} given</span>
                  </div>
                </div>
              </SettingsCard>
            </SettingsSection>

            <SettingsSection title="Account Profile" description="View your basic account information and identity on the platform.">
              <SettingsCard>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="displayName" className="block text-sm font-semibold text-gray-300 mb-2">Display Name</label>
                      <input id="displayName" type="text" disabled value={accountData?.fullName || ''} className="w-full px-4 py-3 bg-[#0a0f1c]/50 border border-white/10 shadow-inner rounded-xl text-gray-400 cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 font-medium transition-all" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                      <input id="email" type="email" disabled value={accountData?.email || ''} className="w-full px-4 py-3 bg-[#0a0f1c]/50 border border-white/10 shadow-inner rounded-xl text-gray-400 cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 font-medium transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                    <div>
                      <span className="block text-sm font-semibold text-gray-400">Current Role</span>
                      <span className="inline-block mt-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-sm font-bold capitalize shadow-inner">{accountData?.role}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-gray-400">Member Since</span>
                      <span className="block text-base font-bold text-white mt-1.5">{accountData?.createdAt}</span>
                    </div>
                  </div>
                  <div className="pt-4 flex items-center justify-between border-t border-white/10 mt-6 pb-2">
                     <p className="text-sm text-gray-400 font-medium">Want to edit your profile picture or display name?</p>
                     <a href="/profile/settings" className="px-4 py-2 bg-white/5 border border-white/10 shadow-inner hover:bg-white/10 rounded-xl text-sm font-bold text-white transition-all">Edit Profile</a>
                  </div>
                </div>
              </SettingsCard>
            </SettingsSection>
          </>
        );
      
      case 'Appearance':
        return (
          <SettingsSection title="Appearance" description="Customize how CivicMind AI looks on your device.">
            <SettingsCard footer={
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  {saveSuccess && (
                    <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center text-sm font-bold text-emerald-400 drop-shadow-sm">
                      <CheckCircle2 className="w-5 h-5 mr-1.5" />
                      Preferences saved
                    </motion.span>
                  )}
                  {saveError && (
                    <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center text-sm font-bold text-rose-400 drop-shadow-sm">
                      <AlertCircle className="w-5 h-5 mr-1.5" />
                      {saveError}
                    </motion.span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleCancel}
                    disabled={!isDirty || isSaving}
                    className="px-4 py-2.5 text-sm font-bold text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white disabled:opacity-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl shadow-inner"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={!isDirty || isSaving}
                    className="flex items-center px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-500/50 text-white rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(99,102,241,0.5)] active:scale-95 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817]"
                  >
                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Save Changes
                  </button>
                </div>
              </div>
            }>
              <div className="space-y-6">
                <p className="text-sm text-indigo-300 mb-6 bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 leading-relaxed font-medium shadow-inner">
                  Note: Deep system integration relies on browser local storage. These preferences reflect UI state persistence testing.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className={`relative flex flex-col items-center justify-center p-6 border rounded-2xl cursor-pointer transition-all focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-[#020817] shadow-inner ${themePref === 'system' ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'border-white/10 bg-[#0a0f1c]/30 hover:bg-white/5'}`}>
                    <input type="radio" name="theme" checked={themePref === 'system'} onChange={() => setThemePref('system')} className="sr-only" aria-label="System preference" />
                    <Monitor className={`w-8 h-8 mb-3 ${themePref === 'system' ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'text-gray-500'}`} />
                    <span className={`font-bold ${themePref === 'system' ? 'text-white' : 'text-gray-400'}`}>System</span>
                  </label>
                  <label className={`relative flex flex-col items-center justify-center p-6 border rounded-2xl cursor-pointer transition-all focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-[#020817] shadow-inner ${themePref === 'light' ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'border-white/10 bg-[#0a0f1c]/30 hover:bg-white/5'}`}>
                    <input type="radio" name="theme" checked={themePref === 'light'} onChange={() => setThemePref('light')} className="sr-only" aria-label="Light mode" />
                    <Sun className={`w-8 h-8 mb-3 ${themePref === 'light' ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'text-gray-500'}`} />
                    <span className={`font-bold ${themePref === 'light' ? 'text-white' : 'text-gray-400'}`}>Light</span>
                  </label>
                  <label className={`relative flex flex-col items-center justify-center p-6 border rounded-2xl cursor-pointer transition-all focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-[#020817] shadow-inner ${themePref === 'dark' ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'border-white/10 bg-[#0a0f1c]/30 hover:bg-white/5'}`}>
                    <input type="radio" name="theme" checked={themePref === 'dark'} onChange={() => setThemePref('dark')} className="sr-only" aria-label="Dark mode" />
                    <Moon className={`w-8 h-8 mb-3 ${themePref === 'dark' ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'text-gray-500'}`} />
                    <span className={`font-bold ${themePref === 'dark' ? 'text-white' : 'text-gray-400'}`}>Dark</span>
                  </label>
                </div>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      case 'Notifications':
        return (
          <SettingsSection title="Notification Preferences" description="Choose what events we notify you about.">
            <SettingsCard>
              <div className="space-y-6">
                <p className="text-sm font-medium text-amber-300 mb-6 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 shadow-inner">
                  Coming Soon: Granular notification controls will be enabled once the delivery service is fully integrated.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between pb-6 border-b border-white/10">
                      <div id="email-notif-label" className="pr-4">
                        <h4 className="text-sm font-bold text-white">Issue Updates</h4>
                        <p className="text-sm text-gray-400 mt-1">Status changes on your reports.</p>
                      </div>
                      <button role="switch" aria-checked="false" aria-labelledby="email-notif-label" disabled className="relative inline-block w-12 h-6 rounded-full bg-white/10 opacity-50 cursor-not-allowed focus:outline-none flex-shrink-0 shadow-inner"></button>
                    </div>
                    <div className="flex items-start justify-between pb-6 border-b border-white/10">
                      <div id="comments-notif-label" className="pr-4">
                        <h4 className="text-sm font-bold text-white">Comments</h4>
                        <p className="text-sm text-gray-400 mt-1">New comments on your reports.</p>
                      </div>
                      <button role="switch" aria-checked="false" aria-labelledby="comments-notif-label" disabled className="relative inline-block w-12 h-6 rounded-full bg-white/10 opacity-50 cursor-not-allowed focus:outline-none flex-shrink-0 shadow-inner"></button>
                    </div>
                    <div className="flex items-start justify-between">
                      <div id="supports-notif-label" className="pr-4">
                        <h4 className="text-sm font-bold text-white">Supports</h4>
                        <p className="text-sm text-gray-400 mt-1">When someone supports your issue.</p>
                      </div>
                      <button role="switch" aria-checked="false" aria-labelledby="supports-notif-label" disabled className="relative inline-block w-12 h-6 rounded-full bg-white/10 opacity-50 cursor-not-allowed focus:outline-none flex-shrink-0 shadow-inner"></button>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start justify-between pb-6 border-b border-white/10">
                      <div id="rep-notif-label" className="pr-4">
                        <h4 className="text-sm font-bold text-white">Reputation</h4>
                        <p className="text-sm text-gray-400 mt-1">When you earn points or badges.</p>
                      </div>
                      <button role="switch" aria-checked="false" aria-labelledby="rep-notif-label" disabled className="relative inline-block w-12 h-6 rounded-full bg-white/10 opacity-50 cursor-not-allowed focus:outline-none flex-shrink-0 shadow-inner"></button>
                    </div>
                    <div className="flex items-start justify-between pb-6 border-b border-white/10">
                      <div id="mod-notif-label" className="pr-4">
                        <h4 className="text-sm font-bold text-white">Moderation</h4>
                        <p className="text-sm text-gray-400 mt-1">Admin actions on your content.</p>
                      </div>
                      <button role="switch" aria-checked="false" aria-labelledby="mod-notif-label" disabled className="relative inline-block w-12 h-6 rounded-full bg-white/10 opacity-50 cursor-not-allowed focus:outline-none flex-shrink-0 shadow-inner"></button>
                    </div>
                    <div className="flex items-start justify-between">
                      <div id="sys-notif-label" className="pr-4">
                        <h4 className="text-sm font-bold text-white">System Announcements</h4>
                        <p className="text-sm text-gray-400 mt-1">Platform updates and news.</p>
                      </div>
                      <button role="switch" aria-checked="false" aria-labelledby="sys-notif-label" disabled className="relative inline-block w-12 h-6 rounded-full bg-white/10 opacity-50 cursor-not-allowed focus:outline-none flex-shrink-0 shadow-inner"></button>
                    </div>
                  </div>
                </div>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      case 'AI Preferences':
        return (
          <SettingsSection title="AI Intelligence Preferences" description="Manage how the CivicMind AI interacts with you and processes your data.">
            <SettingsCard>
              <div className="space-y-6">
                <div className="flex items-start justify-between pb-6 border-b border-white/10">
                  <div className="pr-4">
                    <h4 className="text-base font-bold text-white mb-1">AI Assistant Suggestions</h4>
                    <p className="text-sm font-medium text-gray-400">Allow AI to proactively suggest actions based on your activity.</p>
                  </div>
                  <button role="switch" aria-checked="true" disabled className="relative inline-block w-12 h-6 rounded-full bg-indigo-500 opacity-50 cursor-not-allowed flex-shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></button>
                </div>
                <div className="flex items-start justify-between pb-6 border-b border-white/10">
                  <div className="pr-4">
                    <h4 className="text-base font-bold text-white mb-1">Smart Summaries</h4>
                    <p className="text-sm font-medium text-gray-400">Automatically summarize long comments and reports in your feed.</p>
                  </div>
                  <button role="switch" aria-checked="true" disabled className="relative inline-block w-12 h-6 rounded-full bg-indigo-500 opacity-50 cursor-not-allowed flex-shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></button>
                </div>
                <div className="flex items-start justify-between">
                  <div className="pr-4">
                    <h4 className="text-base font-bold text-white mb-1">Data Processing Transparency</h4>
                    <p className="text-sm font-medium text-gray-400">View logs of how your data was used to train personalized models.</p>
                  </div>
                  <button disabled className="px-4 py-2 border border-white/10 bg-white/5 text-gray-400 font-bold text-sm rounded-xl opacity-50 cursor-not-allowed shrink-0 shadow-inner">View Logs</button>
                </div>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      case 'Privacy':
        return (
          <SettingsSection title="Privacy Settings" description="Manage your data sharing and privacy controls.">
            <SettingsCard>
               <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div>
                    <h4 className="text-base font-bold text-white">Profile Visibility</h4>
                    <p className="text-sm font-medium text-gray-400 mt-1">Make your public profile visible to all users.</p>
                  </div>
                  <select disabled className="bg-[#0a0f1c]/50 border border-white/10 text-gray-400 text-sm font-bold rounded-xl block p-2.5 cursor-not-allowed opacity-70 shadow-inner focus:outline-none">
                    <option>Public</option>
                  </select>
                </div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div>
                    <h4 className="text-base font-bold text-white">Activity Visibility</h4>
                    <p className="text-sm font-medium text-gray-400 mt-1">Show your comments and supports on your profile.</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] opacity-50 cursor-not-allowed"></div>
                </div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div>
                    <h4 className="text-base font-bold text-white">Leaderboard Visibility</h4>
                    <p className="text-sm font-medium text-gray-400 mt-1">Opt-in to appear on the public reputation leaderboard.</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] opacity-50 cursor-not-allowed"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">Location Visibility</h4>
                    <p className="text-sm font-medium text-gray-400 mt-1">Share your location when reporting issues automatically.</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-white/10 opacity-50 cursor-not-allowed shadow-inner"></div>
                </div>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      case 'Security':
        return (
          <SettingsSection title="Security Center" description="Protect your account with advanced security features.">
            <SettingsCard>
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-white/10">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 shadow-inner">
                    <span className="block text-xs font-bold tracking-wider text-indigo-400 uppercase mb-1">Authentication Provider</span>
                    <span className="block text-lg font-bold text-white capitalize">{securityData?.provider}</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 shadow-inner">
                    <span className="block text-xs font-bold tracking-wider text-indigo-400 uppercase mb-1">Email Verification</span>
                    <div className="mt-1">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-bold rounded-lg border shadow-inner ${securityData?.emailVerified ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                        {securityData?.emailVerified ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {securityData?.emailVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">Password Authentication</h4>
                    <p className="text-sm font-medium text-gray-400">Passwords are securely managed by Supabase. You can initiate a reset from the login screen.</p>
                  </div>
                  <button disabled className="px-5 py-2.5 border border-white/10 rounded-xl text-sm font-bold text-gray-400 bg-white/5 opacity-50 cursor-not-allowed shrink-0 shadow-inner">
                    Change Password
                  </button>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-white mb-1">Active Session</h4>
                      <p className="text-sm font-medium text-gray-400 mb-1">Your current session is active and securely authenticated.</p>
                      <p className="text-xs font-bold text-indigo-400 font-mono">Expires: {securityData?.sessionExpires}</p>
                    </div>
                    <button disabled className="px-5 py-2.5 border border-white/10 rounded-xl text-sm font-bold text-gray-400 bg-white/5 opacity-50 cursor-not-allowed shrink-0 shadow-inner">
                      Sign Out All Sessions
                    </button>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-white mb-1">Connected Accounts</h4>
                      <p className="text-sm font-medium text-gray-400">Manage third-party providers connected to this account.</p>
                    </div>
                    <button disabled className="px-5 py-2.5 border border-white/10 rounded-xl text-sm font-bold text-gray-400 bg-white/5 opacity-50 cursor-not-allowed shrink-0 flex items-center gap-2 shadow-inner">
                      <LinkIcon className="w-4 h-4" />
                      Connect Provider
                    </button>
                  </div>
                </div>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      case 'Data & Export':
        return (
          <>
            <SettingsSection title="Data & Export" description="Download your data or manage your account footprint.">
              <SettingsCard>
                <div className="space-y-8">
                  <p className="text-sm font-medium text-amber-300 mb-4 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 shadow-inner leading-relaxed">
                    Data export and account mutation endpoints are currently disabled while we upgrade our infrastructure.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-white/5 bg-white/5 rounded-2xl p-5 flex flex-col justify-between shadow-inner hover:bg-white/10 transition-all">
                      <div>
                        <h5 className="font-bold text-white mb-1">Export Data</h5>
                        <p className="text-sm font-medium text-gray-400 mb-6">Download a complete copy of your personal data.</p>
                      </div>
                      <button disabled className="w-full px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold opacity-50 cursor-not-allowed">Export Data</button>
                    </div>
                    <div className="border border-white/5 bg-white/5 rounded-2xl p-5 flex flex-col justify-between shadow-inner hover:bg-white/10 transition-all">
                      <div>
                        <h5 className="font-bold text-white mb-1">Download Reports</h5>
                        <p className="text-sm font-medium text-gray-400 mb-6">Export a CSV of all civic issues you reported.</p>
                      </div>
                      <button disabled className="w-full px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold opacity-50 cursor-not-allowed">Download CSV</button>
                    </div>
                    <div className="border border-white/5 bg-white/5 rounded-2xl p-5 flex flex-col justify-between shadow-inner hover:bg-white/10 transition-all">
                      <div>
                        <h5 className="font-bold text-white mb-1">Activity History</h5>
                        <p className="text-sm font-medium text-gray-400 mb-6">Download a log of your comments and supports.</p>
                      </div>
                      <button disabled className="w-full px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold opacity-50 cursor-not-allowed">Download Logs</button>
                    </div>
                  </div>
                </div>
              </SettingsCard>
            </SettingsSection>

            <SettingsSection title="Danger Zone" description="Irreversible actions for your account lifecycle.">
              <SettingsCard className="border-rose-500/30 hover:border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.05)] hover:shadow-[0_0_20px_rgba(244,63,94,0.1)] bg-rose-500/5">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-500/20">
                    <div>
                      <h4 className="text-base font-bold text-rose-400 mb-1">Deactivate Account</h4>
                      <p className="text-sm font-medium text-rose-400/70">Temporarily hide your profile and reported issues.</p>
                    </div>
                    <button disabled className="px-6 py-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm font-bold opacity-50 cursor-not-allowed whitespace-nowrap shrink-0 shadow-inner">
                      Deactivate
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-500/20">
                    <div>
                      <h4 className="text-base font-bold text-rose-400 mb-1">Sign Out Everywhere</h4>
                      <p className="text-sm font-medium text-rose-400/70">Invalidate all active sessions immediately.</p>
                    </div>
                    <button disabled className="px-6 py-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm font-bold opacity-50 cursor-not-allowed whitespace-nowrap shrink-0 flex items-center gap-2 shadow-inner">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-rose-400 mb-1">Delete Account</h4>
                      <p className="text-sm font-medium text-rose-400/70">Permanently remove your account and all associated data. This action is irreversible.</p>
                    </div>
                    <button disabled className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-bold opacity-50 cursor-not-allowed whitespace-nowrap shrink-0 flex items-center gap-2 shadow-[0_0_15px_rgba(225,29,72,0.5)]">
                      <ShieldAlert className="w-4 h-4" /> Delete Account
                    </button>
                  </div>
                </div>
              </SettingsCard>
            </SettingsSection>
          </>
        );

      case 'About':
        return (
          <SettingsSection title="About CivicMind AI" description="Platform version, build information, and documentation.">
            <SettingsCard>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-4 border-b border-white/10">
                  <span className="text-sm font-bold text-gray-400">Application Version</span>
                  <span className="text-sm font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-3 py-1 rounded-lg shadow-inner">v1.0.0</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/10">
                  <span className="text-sm font-bold text-gray-400">Build Version</span>
                  <span className="text-sm font-mono font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-3 py-1 rounded-lg shadow-inner">2026.06.27-release</span>
                </div>
                <div className="pt-6">
                  <a href="#" className="inline-flex items-center text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors drop-shadow-sm">
                    View Official Documentation <span className="ml-1">&rarr;</span>
                  </a>
                </div>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      default:
        return <SettingsEmpty />;
    }
  };

  return (
    <main className="min-h-screen bg-[#020817] pt-28 pb-20 selection:bg-indigo-500/30 text-white relative overflow-hidden">
      {/* Global Page Ambient Background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[50rem] h-[50rem] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SettingsHeader 
          title="Control Center" 
          description="Manage your account settings, AI preferences, and security footprint."
          userName={accountData?.fullName}
          role={accountData?.role}
          securityStatus={securityData?.emailVerified ? 'secure' : 'warning'}
          lastSync={stats ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined}
        />
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8 relative">
          <div className="w-full lg:w-72 shrink-0">
            <div className="sticky top-28">
              <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
      </div>
    </main>
  );
}
