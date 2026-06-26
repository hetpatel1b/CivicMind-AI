import React from 'react';

interface NotificationBadgeProps {
  isRead: boolean;
}

export default function NotificationBadge({ isRead }: NotificationBadgeProps) {
  if (isRead) return <div className="w-2.5 h-2.5 shrink-0" />; // Placeholder to keep alignment

  return (
    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 shadow-sm" />
  );
}
