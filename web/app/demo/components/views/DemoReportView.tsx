import React, { useState } from 'react';
import { useDemo } from '../../context/DemoProvider';
import { MockAIService } from '../../services/DemoServices';
import { Camera, MapPin, Loader2, CheckCircle2 } from 'lucide-react';

interface DemoReportViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function DemoReportView({ onNavigate }: DemoReportViewProps) {
  const { addIssue, currentUser } = useDemo();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setTimeout(async () => {
      const analysis = await MockAIService.getIssueAnalysis(description);
      setAiAnalysis({
        suggestedCategory: analysis.category,
        suggestedDepartment: 'Public Works', // Mock
        suggestedPriority: analysis.urgency.toLowerCase(),
        confidenceScore: analysis.confidence,
        summary: `This issue appears to be related to ${analysis.tags.join(', ')}.`
      });
      setLoading(false);
      setStep(2);
    }, 1500); // Mock processing time
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const newIssue = {
        id: `issue-demo-${Date.now()}`,
        title,
        description,
        category: aiAnalysis.suggestedCategory,
        sub_category: 'Demo Category',
        latitude: 19.0760,
        longitude: 72.8777,
        address: 'Demo Location, City',
        status: 'pending',
        urgency: aiAnalysis.suggestedPriority,
        user_id: currentUser.id,
        user_name: currentUser.full_name,
        ai_confidence_score: aiAnalysis.confidenceScore,
        upvotes_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: ['https://placehold.co/600x400?text=Demo+Upload']
      };
      addIssue(newIssue);
      setStep(3);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Report an Issue</h2>
              <p className="text-gray-500">Provide details about the issue. CivicMind AI will automatically categorize it.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="E.g. Large pothole on Main Street"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea 
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the issue in detail..."
                />
              </div>

              <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click to upload a photo (Mock)</p>
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={loading || !title || !description}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex justify-center items-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze with AI'}
              </button>
            </div>
          </div>
        )}

        {step === 2 && aiAnalysis && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Analysis Complete</h2>
              <p className="text-gray-500">Review the AI-generated classification before submitting.</p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900/50 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-blue-100 dark:border-blue-800/30">
                <span className="text-gray-600 dark:text-gray-400">Suggested Category</span>
                <span className="font-semibold text-gray-900 dark:text-white">{aiAnalysis.suggestedCategory}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-blue-100 dark:border-blue-800/30">
                <span className="text-gray-600 dark:text-gray-400">Assigned Department</span>
                <span className="font-semibold text-gray-900 dark:text-white">{aiAnalysis.suggestedDepartment}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-blue-100 dark:border-blue-800/30">
                <span className="text-gray-600 dark:text-gray-400">Priority Level</span>
                <span className={`font-semibold px-3 py-1 rounded-full text-sm ${aiAnalysis.suggestedPriority === 'high' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'}`}>{aiAnalysis.suggestedPriority}</span>
              </div>
              <div>
                <span className="block text-gray-600 dark:text-gray-400 mb-2">AI Summary</span>
                <p className="text-gray-900 dark:text-white bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 text-sm">{aiAnalysis.summary}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-colors"
              >
                Back
              </button>
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold flex justify-center items-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Issue'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12 space-y-4">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Issue Reported Successfully</h2>
            <p className="text-gray-500 max-w-md mx-auto">Your issue has been logged into the Demo database. The relevant department will be notified.</p>
            <div className="pt-8">
              <button 
                onClick={() => onNavigate('feed')}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
              >
                Go to Feed
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
