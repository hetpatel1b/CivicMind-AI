import React from 'react';
import { BellOff, Wind } from 'lucide-react';
import { FilterType } from './NotificationFilter';
import { motion } from 'framer-motion';

interface NotificationEmptyStateProps {
  filter: FilterType;
}

export default function NotificationEmptyState({ filter }: NotificationEmptyStateProps) {
  let title = 'No notifications yet';
  let desc = "You're all caught up! Check back later for new updates.";
  let Icon = BellOff;

  if (filter === 'Unread') {
    title = 'Inbox zero achieved';
    desc = "You've read all your notifications. Enjoy the peace and quiet.";
    Icon = Wind;
  } else if (filter === 'Read') {
    title = 'No read notifications';
    desc = "You haven't read any notifications yet.";
  } else if (['System', 'Moderation', 'Reputation', 'Reports'].includes(filter)) {
    title = `No ${filter.toLowerCase()} activity`;
    desc = `You don't have any recent updates matching the '${filter}' filter.`;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-24 px-4 text-center rounded-[2rem] border border-white/10 bg-white/5 my-8 shadow-inner"
    >
      <div className="w-20 h-20 bg-white/10 border border-white/20 shadow-inner rounded-full flex items-center justify-center text-gray-400 mb-6 relative">
        <div className="absolute inset-0 rounded-full border border-white/5" />
        <Icon className="w-10 h-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm font-medium text-gray-400 max-w-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}
