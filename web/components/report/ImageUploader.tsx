'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileImage, XCircle, Trash2 } from 'lucide-react';

interface ImageUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function ImageUploader({ onFileSelect }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Invalid file type. Please upload a JPEG, PNG, or WEBP image.');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File is too large. Maximum size is 10MB.');
      return false;
    }

    return true;
  };

  const handleClear = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setSelectedFile(null);
    setError(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setSelectedFile(file);
      onFileSelect(file);
    } else {
      handleClear();
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };



  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      {/* Upload Zone */}
      {!previewUrl && (
        <div
          role="button"
          tabIndex={0}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={`relative overflow-hidden group cursor-pointer flex flex-col items-center justify-center w-full h-64 px-4 py-6 border-2 border-dashed rounded-2xl transition-all duration-300 ease-in-out bg-white/50 dark:bg-gray-900/50 backdrop-blur-md ${
            isDragging
              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-inner'
              : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 hover:shadow-lg'
          }`}
          aria-label="Upload an image of the civic issue"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className={`p-4 rounded-full transition-colors duration-300 ${isDragging ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-500'}`}>
              <UploadCloud className="w-8 h-8" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
                Click to upload <span className="font-normal text-gray-500 dark:text-gray-400">or drag and drop</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                JPEG, PNG, or WEBP (Max 10MB)
              </p>
            </div>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFile(e.target.files[0]);
              }
            }}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 flex items-center p-4 text-sm text-red-800 border border-red-200 rounded-xl bg-red-50/80 backdrop-blur-sm dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50 shadow-sm animate-in fade-in slide-in-from-top-2">
          <XCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Preview Zone */}
      {previewUrl && selectedFile && (
        <div className="mt-6 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg transition-all animate-in zoom-in-95 duration-300">
          <div className="relative w-full h-56 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Preview of the selected civic issue"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg flex-shrink-0">
                <FileImage className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleClear}
              className="p-2 ml-4 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 dark:text-gray-400 dark:hover:text-red-400 rounded-lg transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Remove image"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
