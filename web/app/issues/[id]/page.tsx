'use client';

import React, { useEffect, useState, use } from 'react';
import { getIssueDetails, IssueDetail } from '@/services/issue-details';
import { AlertCircle, Loader2, MapPin, Calendar, User, ShieldAlert, CheckCircle2, Clock, ThumbsUp, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import SupportButton from '@/components/support/SupportButton';
import CommentList from '@/components/comments/CommentList';
import CommentForm from '@/components/comments/CommentForm';
import { IssueComment } from '@/types/comment';

export default function IssuePage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15 requires unwrapping async route params in Client Components using React.use()
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const [issue, setIssue] = useState<IssueDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Discussion state
  const [comments, setComments] = useState<IssueComment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  useEffect(() => {
    // Validate UUID format first to prevent network requests for malformed URLs
    const isValidUUID = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

    async function loadIssue() {
      try {
        setIsLoading(true);
        setError(null);

        // Pre-flight validation checks to prevent runtime crashes or DB errors
        if (!isValidUUID(id)) {
          setError('INVALID_ID');
          setIsLoading(false);
          return;
        }

        // Uses the dedicated issue-details service, no inline Supabase calls
        const data = await getIssueDetails(id);
        if (!data) {
          setError('NOT_FOUND');
        } else {
          setIssue(data);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred while loading the issue.');
      } finally {
        setIsLoading(false);
      }
    }

    async function loadUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    }

    async function loadComments() {
      try {
        setIsCommentsLoading(true);
        setCommentsError(null);
        const response = await fetch(`/api/comments?issueId=${id}`);
        const data = await response.json();
        
        if (response.ok && data.success) {
          setComments(data.comments || []);
        } else {
          setCommentsError(data.error || 'Failed to load comments');
        }
      } catch {
        setCommentsError('An unexpected error occurred while loading comments.');
      } finally {
        setIsCommentsLoading(false);
      }
    }

    if (id) {
      loadIssue();
      loadUser();
      loadComments();
    }
  }, [id]);

  const handleCommentAdded = (newComment: IssueComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading issue details...</p>
        </div>
      </main>
    );
  }

  // Defensive rendering: Friendly error state for malformed route parameters
  if (error === 'INVALID_ID') {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-12 max-w-lg w-full text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Invalid Issue Link</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">The link you followed appears to be broken or malformed. Please verify you have the correct URL.</p>
          <Link href="/feed" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Browse All Issues
          </Link>
        </div>
      </main>
    );
  }

  if (error === 'NOT_FOUND') {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-12 max-w-lg w-full text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Issue Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">The report you are looking for does not exist or has been removed.</p>
          <Link href="/feed" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            Return to Feed
          </Link>
        </div>
      </main>
    );
  }

  if (error || !issue) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-red-50 dark:bg-red-900/20 rounded-3xl p-8 border border-red-200 dark:border-red-800/50 flex items-start">
          <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400 mr-4 shrink-0" />
          <div>
            <h1 className="text-xl font-bold text-red-800 dark:text-red-300 mb-2">Error Loading Issue</h1>
            <p className="text-red-600 dark:text-red-400">{error || 'An unknown error occurred.'}</p>
            <button onClick={() => window.location.reload()} className="mt-6 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-700 transition-colors">
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Format the creation date
  const formattedDate = new Date(issue.created_at).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  const primaryImage = issue.images && issue.images.length > 0 ? issue.images[0].image_url : null;
  const reporterName = issue.reporter?.full_name || issue.reporter?.email || 'Anonymous Citizen';

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/feed" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-6">
          &larr; Back to Feed
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Image Header */}
          <div className="relative w-full h-72 sm:h-96 bg-gray-100 dark:bg-gray-900 shrink-0">
            {primaryImage ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img 
                src={primaryImage} 
                alt={issue.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                <MapPin className="w-16 h-16 mb-4 opacity-50" />
                <span className="text-lg font-medium">No Image Provided</span>
              </div>
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
              <div className="flex flex-wrap gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
                  {issue.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border border-white/30 ${
                  issue.severity === 'CRITICAL' ? 'bg-red-500/90 text-white' :
                  issue.severity === 'HIGH' ? 'bg-orange-500/90 text-white' :
                  issue.severity === 'MEDIUM' ? 'bg-yellow-500/90 text-white' :
                  'bg-green-500/90 text-white'
                }`}>
                  {issue.severity}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {issue.title}
              </h1>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Main Info */}
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-3">
                    <ShieldAlert className="w-5 h-5 mr-2 text-blue-500" />
                    Description
                  </h3>
                  <div className="prose prose-blue dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {issue.description || 'No detailed description provided for this report.'}
                    </p>
                  </div>
                </section>
              </div>

              {/* Sidebar Meta */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 space-y-6">
                
                {/* Status Block */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Status</h4>
                  <div className="flex items-center text-gray-900 dark:text-white font-medium">
                    {issue.status.toLowerCase() === 'resolved' ? (
                      <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                    ) : issue.status.toLowerCase() === 'in progress' ? (
                      <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mr-2 text-gray-400" />
                    )}
                    {issue.status}
                  </div>
                </div>

                {/* Reporter Block */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Reported By</h4>
                  <div className="flex items-center text-gray-900 dark:text-white font-medium">
                    {issue.reporter?.avatar_url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={issue.reporter.avatar_url} alt="" className="w-6 h-6 rounded-full mr-2 shadow-sm" />
                    ) : (
                      <User className="w-5 h-5 mr-2 text-gray-400" />
                    )}
                    {reporterName}
                  </div>
                </div>

                {/* Date Block */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Date Reported</h4>
                  <div className="flex items-start text-gray-900 dark:text-white font-medium text-sm">
                    <Calendar className="w-5 h-5 mr-2 text-gray-400 shrink-0" />
                    <span>{formattedDate}</span>
                  </div>
                </div>

                {/* Location Block */}
                {issue.location_name && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Location</h4>
                    <div className="flex items-start text-gray-900 dark:text-white font-medium text-sm">
                      <MapPin className="w-5 h-5 mr-2 text-gray-400 shrink-0" />
                      <span>{issue.location_name}</span>
                    </div>
                  </div>
                )}
                
                {/* Support Section */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  {currentUserId ? (
                    <SupportButton issueId={issue.id} userId={currentUserId} />
                  ) : (
                    <button
                      disabled
                      aria-disabled="true"
                      className="relative overflow-hidden w-full flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-white text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 opacity-70 cursor-not-allowed"
                    >
                      <span className="flex items-center relative z-10">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Login to Support
                        <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          {issue.upvotes_count}
                        </span>
                      </span>
                    </button>
                  )}
                </div>

              </div>
            </div>

            {/* Discussion Section */}
            <div className="mt-12 pt-10 border-t border-gray-200 dark:border-gray-800">
              <div className="max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    <MessageSquare className="w-6 h-6 mr-3 text-blue-500" />
                    Discussion
                  </h3>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-sm font-semibold px-3 py-1 rounded-full">
                    {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                  </span>
                </div>

                <div className="mb-10">
                  {currentUserId ? (
                    <CommentForm 
                      issueId={issue.id} 
                      userId={currentUserId} 
                      onCommentAdded={handleCommentAdded} 
                    />
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center">
                      <p className="text-gray-600 dark:text-gray-400 font-medium mb-4">
                        Login to participate in the discussion.
                      </p>
                      <Link 
                        href="/login" 
                        className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Sign In
                      </Link>
                    </div>
                  )}
                </div>

                {commentsError ? (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center text-sm font-medium border border-red-100 dark:border-red-800/30">
                    <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                    {commentsError}
                  </div>
                ) : (
                  <CommentList comments={comments} isLoading={isCommentsLoading} />
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
