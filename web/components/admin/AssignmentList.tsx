'use client';

import React, { useState } from 'react';
import { Building2, Calendar, ClipboardCheck, AlertCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils/date';

export default function AssignmentList({ initialIssues }: { initialIssues: any[] }) {
  const [issues, setIssues] = useState(initialIssues);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const departments = [
    'Public Works Department',
    'Road Maintenance',
    'Sanitation',
    'Water Department',
    'Electricity Department',
    'Traffic Department'
  ];

  const handleAssign = async (issueId: string, e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const department = formData.get('department') as string;
    const officer = formData.get('officer') as string;
    const priority = formData.get('priority') as string;
    const eta = formData.get('eta') as string;
    
    if (!department || !officer) return;

    setProcessingId(issueId);
    try {
      const res = await fetch(`/api/issues/${issueId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          department, officer, priority, eta
        })
      });

      if (!res.ok) throw new Error('Failed to assign issue');
      
      // Remove from view
      setIssues(issues.filter(i => i.id !== issueId));
      
    } catch (err) {
      alert('Error assigning issue. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  if (issues.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
          <ClipboardCheck className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">All Issues Assigned!</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
          There are no verified issues waiting for assignment right now.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {issues.map((issue) => (
        <div key={issue.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col xl:flex-row gap-8 shadow-sm">
          
          {/* Issue Info */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-xs font-semibold mb-3">
                  VERIFIED
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{issue.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm mb-4">
                  {issue.description}
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-slate-400" />
                    Severity: <span className="text-slate-900 dark:text-white">{issue.severity}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    Reported: <span className="text-slate-900 dark:text-white">{formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Form */}
          <div className="xl:w-[400px] shrink-0 bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-blue-500" />
              Assign Department
            </h4>
            
            <form onSubmit={(e) => handleAssign(issue.id, e)} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Department</label>
                <select 
                  name="department"
                  required
                  defaultValue={issue.department || ''}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="" disabled>Select Department...</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Assigned Officer (Name/ID)</label>
                <input 
                  type="text"
                  name="officer"
                  required
                  placeholder="e.g. Officer Smith or ID-492"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Priority</label>
                  <select 
                    name="priority"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Target ETA</label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2 w-4 h-4 text-slate-400" />
                    <input 
                      type="date"
                      name="eta"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Assign Officer (Optional)</label>
                <select 
                  name="officer"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Unassigned</option>
                  <option value="Officer Smith">Officer Smith (Available)</option>
                  <option value="Officer Johnson">Officer Johnson (Busy)</option>
                </select>
              </div>

              <button 
                type="submit"
                disabled={processingId === issue.id}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <ClipboardCheck className="w-4 h-4" />
                Dispatch & Assign
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
