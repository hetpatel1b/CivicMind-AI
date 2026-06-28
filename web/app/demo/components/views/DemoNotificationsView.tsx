import React from 'react';
import { useDemo } from '../../context/DemoProvider';
import { Bell, CheckCircle2, AlertCircle, Info, ShieldAlert } from 'lucide-react';

interface DemoNotificationsViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function DemoNotificationsView({ onNavigate }: DemoNotificationsViewProps) {
  const { notifications, markNotificationRead } = useDemo();

  if (notifications.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
        <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Notifications</h2>
        <p className="text-gray-500">You're all caught up! We'll notify you when there's an update.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <p className="text-gray-500">Stay updated on your reports, rewards, and community alerts.</p>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => {
          const isUnread = !notif.is_read;
          
          let Icon = Info;
          let iconColor = 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
          
          if (notif.type === 'issue_resolved') {
            Icon = CheckCircle2;
            iconColor = 'text-green-500 bg-green-100 dark:bg-green-900/30';
          } else if (notif.type === 'badge_earned') {
            Icon = ShieldAlert;
            iconColor = 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
          }

          return (
            <div 
              key={notif.id} 
              onClick={() => markNotificationRead(notif.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                isUnread 
                  ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/50' 
                  : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconColor}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold ${isUnread ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {new Date(notif.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className={`text-sm ${isUnread ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
                  {notif.message}
                </p>
              </div>
              {isUnread && (
                <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 shrink-0"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
