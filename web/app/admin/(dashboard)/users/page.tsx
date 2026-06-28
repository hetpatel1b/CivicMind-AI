import React from 'react';
import { createAdminClient } from '@/lib/supabase-server';
import UserList from '@/components/admin/UserList';
import { Users as UsersIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const pageStr = typeof searchParams.page === 'string' ? searchParams.page : undefined;
  const searchStr = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const page = pageStr ? parseInt(pageStr, 10) : 1;
  const search = searchStr || '';
  const limit = 20;

  const supabase = await createAdminClient();
  
  let query = supabase.from('users').select('*', { count: 'exact' });
  
  if (search) {
    query = query.ilike('full_name', `%${search}%`);
  }
  
  const { data: users, count, error } = await query
    .range((page - 1) * limit, page * limit - 1)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch users:', error);
  }

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">User Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage citizens, view reputations, and handle account suspensions.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {count || 0} Total Users
            </span>
          </div>
        </div>
      </div>

      <UserList initialUsers={users || []} />
    </div>
  );
}
