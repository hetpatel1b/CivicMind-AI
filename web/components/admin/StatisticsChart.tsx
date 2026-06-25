'use client';

import React from 'react';
import { DailyAnalytics } from '@/types/analytics';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';

interface StatisticsChartProps {
  /** Time-series data representing daily reports and resolutions */
  data: DailyAnalytics[];
}

/**
 * A responsive Line Chart displaying the trends of issues reported versus resolved over time.
 * Rendered within a premium, glassmorphism-styled container.
 */
export default function StatisticsChart({ data }: StatisticsChartProps) {
  // Graceful fallback for empty states
  if (!data || data.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center h-96">
        <p className="text-gray-500 dark:text-gray-400 font-medium">No activity data available.</p>
      </div>
    );
  }

  return (
    <div 
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full h-96 flex flex-col"
      aria-label="Daily Activity Line Chart"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
        Activity Overview
      </h3>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#e5e7eb" 
              className="dark:stroke-gray-700"
            />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => {
                const d = new Date(value);
                return `${d.getMonth() + 1}/${d.getDate()}`;
              }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              allowDecimals={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ fontWeight: 600 }}
            />
            <Legend 
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px' }}
            />
            <Line 
              type="monotone" 
              name="Issues Reported"
              dataKey="reports" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line 
              type="monotone" 
              name="Issues Resolved"
              dataKey="resolved" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
