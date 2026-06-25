'use client';

import React from 'react';
import { SeverityAnalytics } from '@/types/analytics';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid,
  Cell
} from 'recharts';

interface SeverityChartProps {
  /** Aggregated issue count and percentage by severity level */
  data: SeverityAnalytics[];
}

// Maps severity levels to semantic colors
const getSeverityColor = (severity: string): string => {
  const normalized = severity.toUpperCase();
  switch (normalized) {
    case 'CRITICAL': return '#ef4444'; // Red
    case 'HIGH': return '#f97316';     // Orange
    case 'MEDIUM': return '#eab308';   // Yellow
    case 'LOW': return '#22c55e';      // Green
    default: return '#9ca3af';         // Gray
  }
};

/**
 * A responsive Bar Chart displaying the volume of issues by severity level.
 * Rendered within a premium, glassmorphism-styled container.
 */
export default function SeverityChart({ data }: SeverityChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center h-96">
        <p className="text-gray-500 dark:text-gray-400 font-medium">No severity data available.</p>
      </div>
    );
  }

  return (
    <div 
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full h-96 flex flex-col"
      aria-label="Severity Distribution Bar Chart"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
        Issues by Severity
      </h3>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
              dataKey="severity" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              allowDecimals={false}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              formatter={(value: any, name: any, props: any) => [
                `${value} issues (${props.payload.percentage}%)`, 
                'Count'
              ]}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                color: '#111827'
              }}
              itemStyle={{ fontWeight: 600 }}
            />
            <Bar 
              dataKey="count" 
              name="Count"
              radius={[6, 6, 0, 0]}
              maxBarSize={50}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getSeverityColor(entry.severity)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
