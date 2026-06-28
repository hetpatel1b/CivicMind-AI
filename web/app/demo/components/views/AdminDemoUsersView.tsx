import React from 'react';
import { useDemo } from '../../context/DemoProvider';
import { ShieldCheck, User } from 'lucide-react';

interface AdminDemoUsersViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function AdminDemoUsersView({ onNavigate }: AdminDemoUsersViewProps) {
  const { users, issues, comments } = useDemo();
  
  const citizens = users.filter(u => u.role === 'citizen');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Citizen Directory</h1>
        <p className="text-gray-500">Manage community members and view their contributions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {citizens.map(citizen => {
          const citizenIssues = issues.filter(i => i.user_id === citizen.id);
          const citizenComments = comments.filter(c => c.user_id === citizen.id);
          
          return (
            <div key={citizen.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                {citizen.avatar_url ? (
                  <img src={citizen.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{citizen.full_name}</h3>
              <p className="text-sm text-gray-500 mb-4">{citizen.email}</p>
              
              <div className="flex gap-4 w-full border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
                <div className="flex-1">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{citizen.reputation_score}</div>
                  <div className="text-xs text-gray-500 uppercase">Reputation</div>
                </div>
                <div className="flex-1 border-l border-gray-100 dark:border-gray-700">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{citizenIssues.length}</div>
                  <div className="text-xs text-gray-500 uppercase">Reports</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
