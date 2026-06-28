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
import { Sparkles, Loader2, Lightbulb, AlertTriangle } from 'lucide-react';
import { ChartExplanation } from '@/services/gemini';

interface SeverityChartProps {
  /** Aggregated issue count and percentage by severity level */
  data: SeverityAnalytics[];
}

// Maps severity levels to semantic colors
const getSeverityColor = (severity: string): string => {
  const normalized = (severity || 'LOW').toUpperCase();
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
        body: JSON.stringify({ chartType: 'Severity Breakdown', chartData: data })
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
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
          Severity Breakdown
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
