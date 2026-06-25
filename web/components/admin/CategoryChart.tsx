'use client';

import React from 'react';
import { CategoryAnalytics } from '@/types/analytics';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';

interface CategoryChartProps {
  /** Aggregated issue count and percentage by category */
  data: CategoryAnalytics[];
}

// Pre-defined premium color palette for categorical data
const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#14b8a6', '#6366f1'];

/**
 * A responsive Pie Chart displaying the distribution of issues across categories.
 * Rendered within a premium, glassmorphism-styled container.
 */
export default function CategoryChart({ data }: CategoryChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center h-96">
        <p className="text-gray-500 dark:text-gray-400 font-medium">No category data available.</p>
      </div>
    );
  }

  // Ensure data conforms to Recharts expected format (name/value) for standard Tooltip behavior
  const formattedData = data.map((item) => ({
    name: item.category,
    value: item.count,
    percentage: item.percentage
  }));

  return (
    <div 
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full h-96 flex flex-col"
      aria-label="Category Distribution Pie Chart"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
        Issues by Category
      </h3>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {formattedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any, name: any, props: any) => [
                `${value} issues (${props.payload.percentage}%)`, 
                name
              ]}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                color: '#111827'
              }}
              itemStyle={{ fontWeight: 600, color: '#111827' }}
            />
            <Legend 
              iconType="circle"
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ fontSize: '12px', paddingLeft: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
