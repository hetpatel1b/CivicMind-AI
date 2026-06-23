'use client';

import React, { useState, useEffect } from 'react';
import { AIAnalysisResult } from '@/types/ai';
import { AlertCircle, FileText, Activity, MapPin, Tag } from 'lucide-react';

interface ReportFormProps {
  report: AIAnalysisResult | null;
}

export default function ReportForm({ report }: ReportFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [severity, setSeverity] = useState('');
  const [department, setDepartment] = useState('');

  // Auto-fill form fields when the AI report arrives or changes
  useEffect(() => {
    if (report) {
      setTitle(report.title || '');
      setDescription(report.description || '');
      setCategory(report.category || '');
      setSeverity(report.severity || '');
      setDepartment(report.recommended_department || '');
    }
  }, [report]);

  if (!report) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-10 mt-6 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
        <FileText className="w-10 h-10 text-gray-400 mb-4" />
        <p className="text-gray-500 dark:text-gray-400 text-center text-sm font-medium">
          Upload an image and run AI analysis to generate a report.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mt-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-500" />
          AI Generated Report
        </h3>
        {report.confidence > 0 && (
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
            report.confidence >= 0.8 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
            report.confidence >= 0.5 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {(report.confidence * 100).toFixed(0)}% Confidence
          </span>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
            <Tag className="w-4 h-4 mr-1.5 text-gray-400" />
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-shadow"
            placeholder="E.g., Large pothole on Main St"
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
            <FileText className="w-4 h-4 mr-1.5 text-gray-400" />
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-shadow resize-none"
            placeholder="Detailed description of the issue..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Field */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
              <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-shadow"
            >
              <option value="Pothole">Pothole</option>
              <option value="Road Damage">Road Damage</option>
              <option value="Garbage">Garbage</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Broken Streetlight">Broken Streetlight</option>
              <option value="Drainage Issue">Drainage Issue</option>
              <option value="Traffic Signal Issue">Traffic Signal Issue</option>
              <option value="Public Safety Issue">Public Safety Issue</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Severity Field */}
          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1.5 text-gray-400" />
              Severity
            </label>
            <select
              id="severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-shadow"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
        </div>

        {/* Recommended Department Field */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
            <Activity className="w-4 h-4 mr-1.5 text-gray-400" />
            Recommended Department
          </label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-shadow"
          >
            <option value="Road Maintenance">Road Maintenance</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Water Department">Water Department</option>
            <option value="Electricity Department">Electricity Department</option>
            <option value="Traffic Department">Traffic Department</option>
            <option value="Municipal Corporation">Municipal Corporation</option>
          </select>
        </div>
      </div>
    </div>
  );
}
