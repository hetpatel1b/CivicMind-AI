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
import { Sparkles, Loader2, Lightbulb, AlertTriangle } from 'lucide-react';
import { ChartExplanation } from '@/services/gemini';
import { Card } from '@/design-system/components/Card';

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
  const [explanation, setExplanation] = React.useState<ChartExplanation | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchExplanation = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/insights/chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chartType: 'Distribution by Category', chartData: data })
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message || 'Failed to fetch explanation');
      setExplanation(resData.insights);
    } catch (err: unknown) {
      console.error(err);
      setError('AI explanation unavailable.');
    } finally {
      setLoading(false);
    }
  };

  if (!data || data.length === 0) {
    return (
      <Card className="p-6 flex flex-col items-center justify-center h-96">
        <p className="text-gray-500 dark:text-gray-400 font-medium">No category data available.</p>
      </Card>
    );
  }

  // Ensure data conforms to Recharts expected format (name/value) for standard Tooltip behavior
  const formattedData = data.map((item) => ({
    name: item.category,
    value: item.count,
    percentage: item.percentage
  }));

  return (
    <Card 
      className="p-6 w-full h-96 flex flex-col"
      aria-label="Category Distribution Pie Chart"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
          Distribution by Category
        </h3>
        {!explanation && !loading && !error && (
          <button
            onClick={fetchExplanation}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40 rounded-xl transition-colors border border-indigo-200 dark:border-indigo-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Explain
          </button>
        )}
        {loading && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-indigo-500">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Analyzing chart...
          </span>
        )}
        {error && (
          <span className="text-xs font-medium text-red-500">{error}</span>
        )}
      </div>

      {explanation && (
        <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 animate-in fade-in zoom-in-95">
          <h4 className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-indigo-500" /> Chart Explanation
          </h4>
          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed mb-3 font-medium">
            {explanation.explanation}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {explanation.insights.length > 0 && (
              <div className="bg-white/50 dark:bg-gray-800/50 p-2.5 rounded-xl border border-white dark:border-gray-700">
                <h5 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5">Key Insights</h5>
                <ul className="space-y-1">
                  {explanation.insights.map((ins, i) => (
                    <li key={i} className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-blue-500 mt-1 shrink-0"></span> {ins}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {explanation.recommendations.length > 0 && (
              <div className="bg-white/50 dark:bg-gray-800/50 p-2.5 rounded-xl border border-white dark:border-gray-700">
                <h5 className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Lightbulb className="w-3 h-3"/> Recommendations</h5>
                <ul className="space-y-1">
                  {explanation.recommendations.map((rec, i) => (
                    <li key={i} className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-500 mt-1 shrink-0"></span> {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {explanation.anomalies.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 p-2.5 rounded-xl border border-red-100 dark:border-red-900/30 md:col-span-2">
                <h5 className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Anomalies</h5>
                <ul className="space-y-1">
                  {explanation.anomalies.map((anom, i) => (
                    <li key={i} className="text-xs text-red-700 dark:text-red-300 flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-red-500 mt-1 shrink-0"></span> {anom}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex-1 w-full min-h-[300px]">
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
               
               
              formatter={(value: any  , name: any  , props: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => [
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
    </Card>
  );
}
