import React from 'react';
import { createAdminClient } from '@/lib/admin/supabase-admin';
import CommunityModeration from '@/components/admin/CommunityModeration';
import { MessageSquare } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminCommunityPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const pageStr = typeof searchParams.page === 'string' ? searchParams.page : undefined;
  const page = pageStr ? parseInt(pageStr, 10) : 1;
  const limit = 20;

  const supabase = await createAdminClient();
  
  // Fetch comments with user and issue details
  const { data: comments, count, error } = await supabase
    .from('comments')
    .select(`
      id,
      content,
      created_at,
      user_id,
      users (full_name, email, role),
      issue_id,
      issues (title)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    console.error('Failed to fetch comments:', error);
  }

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Community Moderation</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Review community comments, detect spam, and enforce guidelines.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {count || 0} Total Comments
            </span>
          </div>
        </div>
      </div>

      <CommunityModeration initialComments={comments || []} />
    </div>
  );
}
