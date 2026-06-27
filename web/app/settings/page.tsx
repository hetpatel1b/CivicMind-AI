'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { getReputationProfile, getReputationSummary } from '@/services/reputation';
import { getBadgeSummary } from '@/services/badges';

import SettingsHeader from '@/components/settings/SettingsHeader';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import SettingsSection from '@/components/settings/SettingsSection';
import SettingsCard from '@/components/settings/SettingsCard';
import SettingsSkeleton from '@/components/settings/SettingsSkeleton';
import SettingsEmpty from '@/components/settings/SettingsEmpty';
import SettingsError from '@/components/settings/SettingsError';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

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
    return <SettingsSkeleton />;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SettingsError error={error} onRetry={loadSettings} />
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
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
                    <span className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-1">Level</span>
                    <span className="block text-lg font-bold text-gray-900 dark:text-white truncate">{stats?.level}</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
                    <span className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-1">Reputation</span>
                    <span className="block text-lg font-bold text-gray-900 dark:text-white truncate">{stats?.points} pts</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
                    <span className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-1">Badges</span>
                    <span className="block text-lg font-bold text-gray-900 dark:text-white truncate">{stats?.badges} earned</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
                    <span className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-1">Reports</span>
                    <span className="block text-lg font-bold text-gray-900 dark:text-white truncate">{stats?.reports} submitted</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
                    <span className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-1">Comments</span>
                    <span className="block text-lg font-bold text-gray-900 dark:text-white truncate">{stats?.comments} added</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
                    <span className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-1">Supports</span>
                    <span className="block text-lg font-bold text-gray-900 dark:text-white truncate">{stats?.supports} given</span>
                  </div>
                </div>
              </SettingsCard>
            </SettingsSection>

            <SettingsSection title="Account Profile" description="View your basic account information and identity on the platform.">
              <SettingsCard>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="displayName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Display Name</label>
                      <input id="displayName" type="text" disabled value={accountData?.fullName || ''} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input id="email" type="email" disabled value={accountData?.email || ''} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div>
                      <span className="block text-sm font-semibold text-gray-500 dark:text-gray-400">Current Role</span>
                      <span className="block text-base font-medium text-gray-900 dark:text-white mt-1 capitalize">{accountData?.role}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-gray-500 dark:text-gray-400">Member Since</span>
                      <span className="block text-base font-medium text-gray-900 dark:text-white mt-1">{accountData?.createdAt}</span>
                    </div>
                  </div>
                  <div className="pt-4">
                     <p className="text-sm text-gray-500 dark:text-gray-400">To edit your profile picture and display name, please visit the <a href="/profile/settings" className="text-blue-600 hover:underline font-semibold">Profile Settings</a> page.</p>
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
                    <span className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                      <CheckCircle2 className="w-4 h-4 mr-1.5" />
                      Preferences saved
                    </span>
                  )}
                  {saveError && (
                    <span className="flex items-center text-sm font-medium text-red-600 dark:text-red-400">
                      <AlertCircle className="w-4 h-4 mr-1.5" />
                      {saveError}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleCancel}
                    disabled={!isDirty || isSaving}
                    className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={!isDirty || isSaving}
                    className="flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-95 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Save Changes
                  </button>
                </div>
              </div>
            }>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 leading-relaxed">
                  Note: Deep system integration relies on browser local storage. These preferences reflect UI state persistence testing.
                </p>
                <label className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1 ${themePref === 'system' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                  <input type="radio" name="theme" checked={themePref === 'system'} onChange={() => setThemePref('system')} className="h-5 w-5 text-blue-600 focus:outline-none" aria-label="System preference" />
                  <span className="text-gray-900 dark:text-white font-medium">System preference (Default)</span>
                </label>
                <label className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1 ${themePref === 'light' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                  <input type="radio" name="theme" checked={themePref === 'light'} onChange={() => setThemePref('light')} className="h-5 w-5 text-blue-600 focus:outline-none" aria-label="Light mode" />
                  <span className="text-gray-900 dark:text-white font-medium">Light mode</span>
                </label>
                <label className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1 ${themePref === 'dark' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                  <input type="radio" name="theme" checked={themePref === 'dark'} onChange={() => setThemePref('dark')} className="h-5 w-5 text-blue-600 focus:outline-none" aria-label="Dark mode" />
                  <span className="text-gray-900 dark:text-white font-medium">Dark mode</span>
                </label>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      case 'Notifications':
        return (
          <SettingsSection title="Notification Preferences" description="Choose what events we notify you about.">
            <SettingsCard>
              <div className="space-y-6">
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/30">
                  Coming Soon: Granular notification controls will be enabled once the delivery service is fully integrated.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div id="email-notif-label">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Issue Updates</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Status changes on your reports.</p>
                      </div>
                      <button role="switch" aria-checked="false" aria-labelledby="email-notif-label" disabled className="relative inline-block w-10 h-5 rounded-full bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"></button>
                    </div>
                    <div className="flex items-start justify-between">
                      <div id="comments-notif-label">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Comments</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">New comments on your reports.</p>
                      </div>
                      <button role="switch" aria-checked="false" aria-labelledby="comments-notif-label" disabled className="relative inline-block w-10 h-5 rounded-full bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"></button>
                    </div>
                    <div className="flex items-start justify-between">
                      <div id="supports-notif-label">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Supports</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">When someone supports your issue.</p>
                      </div>
                      <button role="switch" aria-checked="false" aria-labelledby="supports-notif-label" disabled className="relative inline-block w-10 h-5 rounded-full bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"></button>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div id="rep-notif-label">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Reputation</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">When you earn points or badges.</p>
                      </div>
                      <button role="switch" aria-checked="false" aria-labelledby="rep-notif-label" disabled className="relative inline-block w-10 h-5 rounded-full bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"></button>
                    </div>
                    <div className="flex items-start justify-between">
                      <div id="mod-notif-label">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Moderation</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Admin actions on your content.</p>
                      </div>
                      <button role="switch" aria-checked="false" aria-labelledby="mod-notif-label" disabled className="relative inline-block w-10 h-5 rounded-full bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"></button>
                    </div>
                    <div className="flex items-start justify-between">
                      <div id="sys-notif-label">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">System Announcements</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Platform updates and news.</p>
                      </div>
                      <button role="switch" aria-checked="false" aria-labelledby="sys-notif-label" disabled className="relative inline-block w-10 h-5 rounded-full bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"></button>
                    </div>
                  </div>
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
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">Profile Visibility</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Make your public profile visible to all users.</p>
                  </div>
                  <select disabled className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 text-sm rounded-lg block p-2.5 cursor-not-allowed opacity-70">
                    <option>Public</option>
                  </select>
                </div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">Activity Visibility</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Show your comments and supports on your profile.</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-blue-600 opacity-50 cursor-not-allowed"></div>
                </div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">Leaderboard Visibility</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Opt-in to appear on the public reputation leaderboard.</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-blue-600 opacity-50 cursor-not-allowed"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">Location Visibility</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Share your location when reporting issues automatically.</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed"></div>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <span className="block text-sm font-semibold text-gray-500 dark:text-gray-400">Authentication Provider</span>
                    <span className="block text-base font-medium text-gray-900 dark:text-white mt-1 capitalize">{securityData?.provider}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Email Verification</span>
                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-md ${securityData?.emailVerified ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                      {securityData?.emailVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Password Authentication</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Passwords are securely managed by Supabase. You can initiate a reset from the login screen.</p>
                  <button disabled className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 opacity-50 cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Change Password
                  </button>
                </div>
                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Active Session</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Your current session is active and securely authenticated.</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 font-mono">Expires: {securityData?.sessionExpires}</p>
                  <button disabled className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 opacity-50 cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Sign out all other sessions
                  </button>
                </div>
                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Connected Accounts</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Manage third-party providers connected to this account.</p>
                  <button disabled className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 opacity-50 cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Connect Provider
                  </button>
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
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/30 leading-relaxed">
                    Data export and account mutation endpoints are currently disabled while we upgrade our infrastructure.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-1">Export Data</h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Download a complete copy of your personal data.</p>
                      </div>
                      <button disabled className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold opacity-50 cursor-not-allowed">Export</button>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-1">Download Reports</h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Export a CSV of all civic issues you reported.</p>
                      </div>
                      <button disabled className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold opacity-50 cursor-not-allowed">Download</button>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-1">Activity History</h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Download a log of your comments and supports.</p>
                      </div>
                      <button disabled className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold opacity-50 cursor-not-allowed">Download</button>
                    </div>
                  </div>
                </div>
              </SettingsCard>
            </SettingsSection>

            <SettingsSection title="Danger Zone" description="Irreversible actions for your account lifecycle.">
              <SettingsCard>
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="pr-4">
                      <h4 className="text-base font-semibold text-red-600 dark:text-red-400 mb-1">Deactivate Account</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Temporarily hide your profile and reported issues.</p>
                    </div>
                    <button disabled className="px-5 py-2 border border-red-200 text-red-600 dark:border-red-900/50 dark:text-red-400 rounded-xl text-sm font-semibold opacity-50 cursor-not-allowed whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
                      Deactivate
                    </button>
                  </div>
                  <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="pr-4">
                      <h4 className="text-base font-semibold text-red-600 dark:text-red-400 mb-1">Sign Out Everywhere</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Invalidate all active sessions immediately.</p>
                    </div>
                    <button disabled className="px-5 py-2 border border-red-200 text-red-600 dark:border-red-900/50 dark:text-red-400 rounded-xl text-sm font-semibold opacity-50 cursor-not-allowed whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
                      Sign Out
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="pr-4">
                      <h4 className="text-base font-semibold text-red-600 dark:text-red-400 mb-1">Delete Account</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Permanently remove your account and all associated data. This action is irreversible.</p>
                    </div>
                    <button disabled className="px-5 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold opacity-50 cursor-not-allowed whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2">
                      Delete Account
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
                <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Application Version</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">v1.0.0</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Build Version</span>
                  <span className="text-sm font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">2026.06.27-release</span>
                </div>
                <div className="pt-4">
                  <a href="#" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">View Official Documentation &rarr;</a>
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
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-20 selection:bg-blue-100 dark:selection:bg-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SettingsHeader 
          title="Platform Settings" 
          description="Manage your account settings, set preferences, and secure your profile." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mt-8">
          <div className="col-span-1">
            <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          
          <div className="col-span-1 md:col-span-3">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderContent()}
            </div>
          </div>
        </div>
        
      </div>
    </main>
  );
}
