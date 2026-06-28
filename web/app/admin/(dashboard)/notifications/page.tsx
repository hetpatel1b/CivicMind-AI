import React from 'react';

export default function AdminNotificationsPage() {
  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Notifications</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          System alerts and notifications will appear here.
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-500">
        You have no new notifications.
      </div>
    </div>
  );
}
