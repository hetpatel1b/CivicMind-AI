'use client';

import React, { useState } from 'react';
import { Search, UserX, UserCheck, ShieldAlert, Star } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils/date';

export default function UserList({ initialUsers }: { initialUsers: any[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');

  // Placeholder action handler
  const handleToggleSuspend = (userId: string, isSuspended: boolean) => {
    if (!window.confirm(`Are you sure you want to ${isSuspended ? 'reactivate' : 'suspend'} this user?`)) return;
    
    // In a real implementation, this would call an API route.
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, role: isSuspended ? 'citizen' : 'suspended' } // Simplified for demonstration
        : u
    ));
  };

  const filteredUsers = users.filter(u => 
    (u.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
      
      {/* Search Bar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search users by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">Reputation</th>
              <th className="px-6 py-4 font-semibold">Joined</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  No users found matching your search.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => {
                const isSuspended = user.role === 'suspended';
                const isAdmin = user.role === 'admin' || user.role === 'super_admin';

                return (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shrink-0">
                          {user.full_name ? user.full_name[0].toUpperCase() : '?'}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            {user.full_name || 'Anonymous User'}
                            {isAdmin && <ShieldAlert className="w-3.5 h-3.5 text-blue-500" />}
                          </div>
                          <div className="text-xs text-slate-500">{user.email || 'No email'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${isAdmin ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                        ${isSuspended ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : ''}
                        ${!isAdmin && !isSuspended ? 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300' : ''}
                      `}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                        <Star className="w-4 h-4 text-amber-500" />
                        {user.reputation_score || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {!isAdmin && (
                        <button
                          onClick={() => handleToggleSuspend(user.id, isSuspended)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                            ${isSuspended 
                              ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20' 
                              : 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                            }
                          `}
                        >
                          {isSuspended ? (
                            <><UserCheck className="w-4 h-4" /> Reactivate</>
                          ) : (
                            <><UserX className="w-4 h-4" /> Suspend</>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
