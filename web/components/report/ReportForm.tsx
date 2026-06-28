'use client';

import React, { useState, useRef, useEffect } from 'react';
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
import AISuggestionsPanel from './AISuggestionsPanel';
import { uploadIssueImage } from '@/services/storage';
import { AlertCircle } from 'lucide-react';
import { AIAnalysisResult } from '@/types/ai';

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
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  
  // Submission Meta State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // AI Meta State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<AIAnalysisResult | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Consider the form valid only if required fields are provided
  const isFormValid = title.trim() && category && severity && description.trim() && latitude && longitude;

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleImageChange = async (file: File | null, url: string | null) => {
    // 1. Cancel any in-flight AI requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // 2. Update basic state
    setImageFile(file);
    setImagePreviewUrl(url);
    setUploadedImageUrl(null); // Reset cached URL since image changed
    setAiSuggestions(null);
    setAiError(null);
    setAiLoading(false);
  };

  const handleAnalyzeImage = async () => {
    if (!imageFile) return;

    setAiLoading(true);
    setAiError(null);
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      let currentUrl = uploadedImageUrl;
      
      if (!currentUrl) {
        // First upload the image to get a public URL for the AI
        const uploadResult = await uploadIssueImage(imageFile);
        
        if (abortController.signal.aborted) return;
        
        currentUrl = uploadResult.publicUrl;
        setUploadedImageUrl(currentUrl);
      }

      // Now request analysis
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: currentUrl }),
        signal: abortController.signal
      });

      if (abortController.signal.aborted) return;

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || data.error || 'Failed to analyze image');
      }

      setAiSuggestions(data.report);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Ignored, user changed image mid-flight
        return;
      }
      console.error('[ReportForm] AI Analysis failed:', err);
      setAiError(err instanceof Error ? err.message : 'Analysis failed. Please fill manually.');
    } finally {
      if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
        setAiLoading(false);
      }
    }
  };

  const handleApplySuggestions = (suggestions: AIAnalysisResult) => {
    setTitle(suggestions.title);
    setDescription(suggestions.description);
    setCategory(suggestions.category);
    setSeverity(suggestions.severity);
    // Hide the suggestions after applying so they don't clutter the UI
    setAiSuggestions(null);
  };

  const handleReset = () => {
    setTitle('');
    setCategory('');
    setSeverity('');
    setDescription('');
    setLatitude('');
    setLongitude('');
    setImageFile(null);
    setImagePreviewUrl(null);
    setUploadedImageUrl(null);
    setError(null);
    setAiSuggestions(null);
    setAiError(null);
    setAiLoading(false);
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
        if (uploadedImageUrl) {
          // Reuse the URL if we already uploaded it for AI Analysis
          finalImageUrl = uploadedImageUrl;
        } else {
          const uploadResult = await uploadIssueImage(imageFile);
          finalImageUrl = uploadResult.publicUrl;
        }
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

        <AISuggestionsPanel 
          hasImage={!!imageFile}
          loading={aiLoading}
          error={aiError}
          suggestions={aiSuggestions}
          onAnalyze={handleAnalyzeImage}
          onApply={handleApplySuggestions}
          onDismissError={() => setAiError(null)}
        />

        <form onSubmit={handleSubmit} className="space-y-8">
          <ImageUploader 
            imageFile={imageFile} 
            imagePreviewUrl={imagePreviewUrl} 
            onChange={handleImageChange} 
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
            disabled={!isFormValid || aiLoading}
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
