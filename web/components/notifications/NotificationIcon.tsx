import React from 'react';
import { 
  Bell, 
  ShieldAlert, 
  MessageSquare, 
  Award, 
  Trophy, 
  ThumbsUp, 
  Info 
} from 'lucide-react';
import { NotificationType } from '@/types/notification';

interface NotificationIconProps {
  type: NotificationType | string;
}

export default function NotificationIcon({ type }: NotificationIconProps) {
  let Icon = Bell;
  let color = 'text-gray-500';
  let bg = 'bg-gray-100 dark:bg-gray-800';

  switch (type) {
    case 'ISSUE_VERIFIED':
      Icon = ShieldAlert;
      color = 'text-blue-500';
      bg = 'bg-blue-100 dark:bg-blue-900/30';
      break;
    case 'ISSUE_RESOLVED':
      Icon = Trophy;
      color = 'text-green-500';
      bg = 'bg-green-100 dark:bg-green-900/30';
      break;
    case 'COMMENT_RECEIVED':
      Icon = MessageSquare;
      color = 'text-purple-500';
      bg = 'bg-purple-100 dark:bg-purple-900/30';
      break;
    case 'BADGE_EARNED':
      Icon = Award;
      color = 'text-yellow-500';
      bg = 'bg-yellow-100 dark:bg-yellow-900/30';
      break;
    case 'ISSUE_SUPPORTED':
      Icon = ThumbsUp;
      color = 'text-orange-500';
      bg = 'bg-orange-100 dark:bg-orange-900/30';
      break;
    default:
      Icon = Info;
      color = 'text-indigo-500';
      bg = 'bg-indigo-100 dark:bg-indigo-900/30';
      break;
  }

  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
  );
}
