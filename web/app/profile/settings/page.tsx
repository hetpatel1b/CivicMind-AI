'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { User, Camera, Shield, Save, AlertCircle, UploadCloud, Bell, Globe, Lock, Trash2, Download } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [role, setRole] = useState('citizen');
  
  // Edit State
  const [initialFullName, setInitialFullName] = useState('');
  const [initialAvatarUrl, setInitialAvatarUrl] = useState<string | null>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // UX State
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDirty = fullName !== initialFullName || selectedFile !== null || avatarUrl !== initialAvatarUrl;

  useEffect(() => {
    async function loadProfile() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/login');
          return;
        }

        setUserId(user.id);
        setEmail(user.email || '');
        setCreatedAt(user.created_at);
        
        const currentName = user.user_metadata?.full_name || '';
        const currentAvatar = user.user_metadata?.avatar_url || null;
        
        setFullName(currentName);
        setInitialFullName(currentName);
        
        setAvatarUrl(currentAvatar);
        setInitialAvatarUrl(currentAvatar);

        // Fetch extra info from public.users if needed
        const { data: publicUser } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
          
        if (publicUser) {
          setRole(publicUser.role);
        }

      } catch (err) {
        console.error('Error loading settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [router]);

  // Prevent accidental navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate type
      if (!file.type.startsWith('image/')) {
        setValidationError('Please select a valid image file.');
        return;
      }
      
      // Validate size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setValidationError('Image size must be less than 5MB.');
        return;
      }
      
      setValidationError(null);
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAvatarUrl(null); // Mark for removal
  };

  const handleCancel = () => {
    if (isDirty) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        return;
      }
    }
    // Reset
    setFullName(initialFullName);
    setAvatarUrl(initialAvatarUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    setValidationError(null);
    setSuccess(null);
  };

  const validate = () => {
    if (fullName.trim().length === 0) {
      setValidationError('Full Name is required.');
      return false;
    }
    if (fullName.trim().length > 50) {
      setValidationError('Full Name cannot exceed 50 characters.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      const supabase = createClient();
      let newAvatarUrl = avatarUrl;
      
      // Upload new avatar if selected
      if (selectedFile && userId) {
        const fileExt = selectedFile.name.split('.').pop();
        const filePath = `avatars/${userId}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('civic-images')
          .upload(filePath, selectedFile);
          
        if (uploadError) {
          throw new Error('Failed to upload image. Please try again.');
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('civic-images')
          .getPublicUrl(data.path);
          
        newAvatarUrl = publicUrl;
      }
      
      const updates = {
        full_name: fullName.trim(),
        avatar_url: newAvatarUrl
      };

      // 1. Update Auth Metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: updates
      });
      
      if (authError) throw authError;

      // 2. Update Public Users table
      const { error: dbError } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId);
        
      if (dbError) throw dbError;

      // Success
      setInitialFullName(updates.full_name);
      setInitialAvatarUrl(updates.avatar_url);
      setAvatarUrl(updates.avatar_url);
      setSelectedFile(null);
      setPreviewUrl(null);
      setSuccess('Profile updated successfully.');
      
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-12 flex justify-center">
        <div className="w-full max-w-4xl px-4 animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-8"></div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl h-[500px] shadow-sm border border-gray-100 dark:border-gray-700"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your profile, preferences, and security.</p>
          </div>
          <Link href="/profile" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
            &larr; Back to Profile
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="text-sm text-red-800 dark:text-red-300">
              <span className="font-bold block mb-1">Error Saving Profile</span>
              {error}
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
            <div className="text-sm text-green-800 dark:text-green-300 font-medium">
              {success}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Edit Section */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Edit Profile */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Edit Profile</h2>
              
              <div className="space-y-6">
                
                {/* Avatar Management */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Profile Picture</label>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex shrink-0 items-center justify-center overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
                      {(previewUrl || avatarUrl) ? (
                        <img src={previewUrl || avatarUrl as string} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          ref={fileInputRef} 
                          onChange={handleFileChange}
                        />
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                        >
                          <Camera className="w-4 h-4" />
                          Change
                        </button>
                        {(previewUrl || avatarUrl) && (
                          <button 
                            onClick={handleRemoveAvatar}
                            className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        JPG, GIF or PNG. Max size of 5MB.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors dark:text-white"
                    placeholder="Enter your full name"
                  />
                  {validationError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationError}</p>
                  )}
                </div>

              </div>

              {/* Save Actions */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-3">
                <button 
                  onClick={handleCancel}
                  disabled={saving || !isDirty}
                  className="px-6 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving || !isDirty}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <UploadCloud className="w-4 h-4 animate-bounce" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Preferences Section (UI Only Placeholder) */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 opacity-75">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Receive alerts for issue updates.</p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 px-2 py-1 rounded">Coming Soon</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Language & Region</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Set your preferred locale.</p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 px-2 py-1 rounded">Coming Soon</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Account Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Account Overview</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between border-b border-gray-50 dark:border-gray-700 pb-2">
                  <span className="text-gray-500 dark:text-gray-400">Member Since</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(createdAt).toLocaleDateString()}
                  </span>
                </li>
                <li className="flex justify-between border-b border-gray-50 dark:border-gray-700 pb-2">
                  <span className="text-gray-500 dark:text-gray-400">Email</span>
                  <span className="font-medium text-gray-900 dark:text-white truncate max-w-[120px]" title={email}>
                    {email}
                  </span>
                </li>
                <li className="flex justify-between pb-2">
                  <span className="text-gray-500 dark:text-gray-400">Current Role</span>
                  <span className="font-medium text-gray-900 dark:text-white capitalize">
                    {role}
                  </span>
                </li>
              </ul>
            </div>

            {/* Security Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-400" />
                Security
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                Your authentication and session are securely managed by Supabase. Password resets can be initiated from the login screen.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
                <Shield className="w-4 h-4" />
                Account Secured
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-100 dark:border-red-900/30">
              <h3 className="font-semibold text-red-800 dark:text-red-400 mb-2">Danger Zone</h3>
              <p className="text-xs text-red-600 dark:text-red-300 mb-4 opacity-80">
                Irreversible actions for your account. These features will be enabled in a future update.
              </p>
              <div className="space-y-2">
                <button disabled className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded-lg opacity-50 cursor-not-allowed">
                  <Download className="w-4 h-4" />
                  Export Data
                </button>
                <button disabled className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded-lg opacity-50 cursor-not-allowed">
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
