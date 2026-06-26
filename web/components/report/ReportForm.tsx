'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import CategorySelector from './CategorySelector';
import SeveritySelector from './SeveritySelector';
import DescriptionInput from './DescriptionInput';
import LocationPicker from './LocationPicker';
import ImageUploader from './ImageUploader';
import ReportPreview from './ReportPreview';
import SubmissionSuccess from './SubmissionSuccess';
import FormActions from './FormActions';
import { uploadIssueImage } from '@/services/storage';
import { AlertCircle } from 'lucide-react';

const DEPARTMENT_MAP: Record<string, string> = {
  'Road Damage': 'Public Works',
  'Garbage': 'Sanitation',
  'Street Light': 'Utilities',
  'Water Supply': 'Water Management',
  'Drainage': 'Sanitation',
  'Traffic': 'Transportation',
  'Public Safety': 'Police',
  'Other': 'General'
};

export default function ReportForm() {
  const router = useRouter();
  
  // State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  
  // Form meta state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Consider the form valid only if required fields are provided
  // Note: we consider latitude and longitude optional for flexibility, 
  // but if required, we can check for them here.
  const isFormValid = title.trim() && category && severity && description.trim() && latitude && longitude;

  const handleReset = () => {
    setTitle('');
    setCategory('');
    setSeverity('');
    setDescription('');
    setLatitude('');
    setLongitude('');
    setImageFile(null);
    setImagePreviewUrl(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to report an issue.');
      }

      let finalImageUrl = '';

      if (imageFile) {
        const uploadResult = await uploadIssueImage(imageFile);
        finalImageUrl = uploadResult.publicUrl;
      } else {
        // Fallback placeholder image if none uploaded
        finalImageUrl = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800';
      }

      const payload = {
        title: title.trim(),
        description: description.trim(),
        category,
        severity,
        department: DEPARTMENT_MAP[category] || 'General',
        imageUrl: finalImageUrl,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };

      const response = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit the report.');
      }
      
      setSuccess(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/feed');
      }, 3000);
      
    } catch (err: unknown) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <SubmissionSuccess />;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      <div className="xl:col-span-8 bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Issue Details</h2>
        
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <ImageUploader 
            imageFile={imageFile} 
            imagePreviewUrl={imagePreviewUrl} 
            onChange={(file, url) => {
              setImageFile(file);
              setImagePreviewUrl(url);
            }} 
          />
          
          <LocationPicker 
            latitude={latitude}
            longitude={longitude}
            onChange={(lat, lng) => {
              setLatitude(lat);
              setLongitude(lng);
            }}
          />

          <CategorySelector value={category} onChange={setCategory} />
          
          <SeveritySelector value={severity} onChange={setSeverity} />

          <DescriptionInput 
            title={title}
            onTitleChange={setTitle}
            description={description}
            onDescriptionChange={setDescription}
          />

          <FormActions 
            loading={loading}
            disabled={!isFormValid}
            onReset={handleReset}
          />
        </form>
      </div>

      <div className="xl:col-span-4 xl:sticky xl:top-6">
        <ReportPreview 
          title={title}
          category={category}
          severity={severity}
          description={description}
          latitude={latitude}
          longitude={longitude}
          imagePreviewUrl={imagePreviewUrl}
        />
      </div>
    </div>
  );
}
