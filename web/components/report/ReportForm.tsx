'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '@/design-system/motion/variants';

import ReportStepper from './ReportStepper';
import CategorySelector from './CategorySelector';
import SeveritySelector from './SeveritySelector';
import DescriptionInput from './DescriptionInput';
import LocationPicker from './LocationPicker';
import ImageUploader from './ImageUploader';
import SubmissionSuccess from './SubmissionSuccess';
import AISuggestionsPanel from './AISuggestionsPanel';
import AILoadingIndicator from '@/components/ui/AILoadingIndicator';
import { uploadIssueImage } from '@/services/storage';
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle, Zap, Send } from 'lucide-react';
import { AIAnalysisResult } from '@/types/ai';
import ReportPreview from './ReportPreview';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ReportForm({ isDemo = false, onDemoSubmit }: { isDemo?: boolean, onDemoSubmit?: (payload: any) => void }) {
  
  // Stepper State
  const [currentStep, setCurrentStep] = useState(1);

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

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleImageChange = (file: File | null, url: string | null) => {
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

  const startAIAnalysis = async () => {
    if (!imageFile) return;

    setAiLoading(true);
    setAiError(null);
    setCurrentStep(2); // Move to AI step
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      let currentUrl = uploadedImageUrl;
      
      if (!isDemo && !currentUrl) {
        // First upload the image to get a public URL for the AI
        const uploadResult = await uploadIssueImage(imageFile);
        
        if (abortController.signal.aborted) return;
        
        currentUrl = uploadResult.publicUrl;
        setUploadedImageUrl(currentUrl);
      } else if (isDemo) {
        currentUrl = 'demo-image-url';
      }

      let reportData;

      if (isDemo) {
        // Mock AI response for demo mode
        await new Promise(r => setTimeout(r, 1500));
        reportData = {
          title: 'Demo Issue Analysis',
          description: 'This is an AI generated summary for the demo issue.',
          category: 'Road Damage',
          severity: 'High',
          confidence: 0.95
        };
      } else {
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
        reportData = data.report;
      }

      setAiSuggestions(reportData);
      // Automatically apply AI suggestions
      setTitle(reportData.title);
      setDescription(reportData.description);
      setCategory(reportData.category);
      setSeverity(reportData.severity);
      
      // Auto advance to Review step after a tiny delay for UX
      setTimeout(() => {
        setCurrentStep(3);
      }, 800);
      
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      console.error('[ReportForm] AI Analysis failed:', err);
      setAiError(err instanceof Error ? err.message : 'Analysis failed. Please fill manually.');
      // Keep on step 2 so user sees error and can choose to skip
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
    setAiSuggestions(null);
  };

  const handleSubmit = async () => {
    const isValid = title.trim() && category && severity && description.trim() && latitude && longitude;
    if (!isValid) {
      setError("Please fill out all required fields before submitting.");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      if (!isDemo) {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('You must be logged in to report an issue.');
        }
      }

      let finalImageUrl = '';

      if (imageFile) {
        if (isDemo) {
          finalImageUrl = 'https://placehold.co/600x400?text=Demo+Upload';
        } else if (uploadedImageUrl) {
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

      if (isDemo && onDemoSubmit) {
        await new Promise(r => setTimeout(r, 1000));
        onDemoSubmit(payload);
      } else {
        const response = await fetch('/api/issues', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Failed to submit the report.');
        }
      }
      
      setSuccess(true);
      
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

  // Navigation handlers
  const nextStep = () => {
    if (currentStep === 1 && imageFile) {
      startAIAnalysis();
    } else {
      setCurrentStep(Math.min(5, currentStep + 1));
    }
  };
  const prevStep = () => setCurrentStep(Math.max(1, currentStep - 1));

  // Step Validation
  const canProceed = () => {
    switch (currentStep) {
      case 1: return true; // Image is optional but recommended
      case 2: return !aiLoading;
      case 3: return title.trim() && category && severity && description.trim();
      case 4: return latitude && longitude;
      default: return true;
    }
  };

  return (
    <div className="w-full">
      <ReportStepper currentStep={currentStep} />

      <div className="bg-[#0a0f1c]/40 backdrop-blur-3xl rounded-[2rem] p-6 md:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-white/5 ring-1 ring-white/5 relative overflow-hidden min-h-[500px] flex flex-col">
        
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 backdrop-blur-md">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-sm text-rose-300 font-medium">{error}</p>
          </motion.div>
        )}

        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="step1" variants={fadeUp} initial="initial" animate="animate" exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
                <ImageUploader 
                  imageFile={imageFile} 
                  imagePreviewUrl={imagePreviewUrl} 
                  onChange={handleImageChange} 
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="step2" variants={fadeUp} initial="initial" animate="animate" exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }} className="flex flex-col items-center justify-center h-[400px]">
                {aiLoading ? (
                  <AILoadingIndicator size="lg" messages={["Uploading secure image...", "Analyzing visual evidence...", "Detecting civic category...", "Estimating severity level...", "Routing to department..."]} />
                ) : aiError ? (
                  <div className="text-center max-w-md mx-auto">
                    <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-rose-500/20">
                      <AlertCircle className="w-8 h-8 text-rose-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">AI Analysis Failed</h3>
                    <p className="text-gray-400 mb-6">{aiError}</p>
                    <button onClick={() => setCurrentStep(3)} className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors border border-white/10 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                      Fill Manually
                    </button>
                  </div>
                ) : (
                  <div className="text-center max-w-md mx-auto">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Analysis Complete</h3>
                    <p className="text-gray-400 mb-6">We&apos;ve generated intelligent suggestions based on your image.</p>
                  </div>
                )}
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="step3" variants={fadeUp} initial="initial" animate="animate" exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }} className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Issue Details</h3>
                  <p className="text-sm text-gray-400">Review and refine the AI-generated details.</p>
                </div>
                
                <AISuggestionsPanel 
                  hasImage={!!imageFile}
                  loading={false}
                  error={null}
                  suggestions={aiSuggestions}
                  onAnalyze={() => {}} // Disabled here
                  onApply={handleApplySuggestions}
                  onDismissError={() => {}}
                />

                <CategorySelector value={category} onChange={setCategory} />
                <SeveritySelector value={severity} onChange={setSeverity} />
                <DescriptionInput 
                  title={title}
                  onTitleChange={setTitle}
                  description={description}
                  onDescriptionChange={setDescription}
                />
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div key="step4" variants={fadeUp} initial="initial" animate="animate" exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }} className="h-full min-h-[450px]">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">Set Location</h3>
                  <p className="text-sm text-gray-400">Where is this issue located? Drag the pin to adjust.</p>
                </div>
                <LocationPicker 
                  latitude={latitude}
                  longitude={longitude}
                  onChange={(lat, lng) => {
                    setLatitude(lat);
                    setLongitude(lng);
                  }}
                />
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div key="step5" variants={fadeUp} initial="initial" animate="animate" exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">Final Review</h3>
                  <p className="text-sm text-gray-400">Make sure everything looks correct before submitting to the department.</p>
                </div>
                <ReportPreview 
                  title={title}
                  category={category}
                  severity={severity}
                  description={description}
                  latitude={latitude}
                  longitude={longitude}
                  imagePreviewUrl={imagePreviewUrl}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between z-10 relative">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1 || loading}
            className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              currentStep === 1 
                ? 'opacity-0 pointer-events-none' 
                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!canProceed()}
              className="px-8 py-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 hover:text-white border border-indigo-500/30 rounded-xl font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {currentStep === 1 && imageFile ? (
                <>Analyze with AI <Zap className="w-4 h-4 text-purple-400" /></>
              ) : currentStep === 1 && !imageFile ? (
                <>Skip & Continue <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>Continue <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-10 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white rounded-xl font-bold flex items-center gap-2 shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-white scale-100 hover:scale-105 active:scale-95"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Send className="w-4 h-4" /> Submit Report</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
