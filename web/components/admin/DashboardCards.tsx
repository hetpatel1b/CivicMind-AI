import React from 'react';
import { DashboardStatistics } from '@/types/analytics';
import { 
  FileText, 
  Users, 
  Clock3, 
  CheckCircle2, 
  ThumbsUp, 
  MessageCircle 
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface DashboardCardsProps {
  /** The aggregated statistics to display across the cards */
  statistics: DashboardStatistics;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 300, damping: 24 } 
  }
};

/**
 * A responsive grid of premium metric cards designed for the Admin Dashboard.
 * Utilizes glassmorphism and subtle hover effects to present key performance indicators.
 */
export default function DashboardCards({ statistics }: DashboardCardsProps) {
  // Graceful fallback if data is somehow unavailable
  if (!statistics) return null;

  const cards = [
    {
      id: 'total-issues',
      title: 'Total Issues',
      value: statistics.totalIssues,
      icon: <FileText className="w-6 h-6" />,
      colorClass: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30'
    },
    {
      id: 'total-users',
      title: 'Users',
      value: statistics.totalUsers,
      icon: <Users className="w-6 h-6" />,
      colorClass: 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30'
    },
    {
      id: 'pending-issues',
      title: 'Pending',
      value: statistics.pendingIssues,
      icon: <Clock3 className="w-6 h-6" />,
      colorClass: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
    },
    {
      id: 'resolved-issues',
      title: 'Resolved',
      value: statistics.resolvedIssues,
      icon: <CheckCircle2 className="w-6 h-6" />,
      colorClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30'
    },
    {
      id: 'total-supports',
      title: 'Supports',
      value: statistics.totalSupports,
      icon: <ThumbsUp className="w-6 h-6" />,
      colorClass: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30'
    },
    {
      id: 'total-comments',
      title: 'Comments',
      value: statistics.totalComments,
      icon: <MessageCircle className="w-6 h-6" />,
      colorClass: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30'
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {cards.map((card) => (
        <motion.div
          key={card.id}
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-between group overflow-hidden"
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div>
            <p className="text-sm font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-1">
              {card.title}
            </p>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {card.value.toLocaleString()}
            </p>
          </div>
          <div className={`p-4 rounded-2xl ${card.colorClass} ring-4 ring-white dark:ring-gray-800 transition-transform duration-300 group-hover:scale-110`}>
            {card.icon}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
