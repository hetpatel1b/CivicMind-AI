'use client';

import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploaderProps {
  imageFile: File | null;
  imagePreviewUrl: string | null;
  onChange: (file: File | null, url: string | null) => void;
}

export default function ImageUploader({ imagePreviewUrl, onChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cleanup object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handleFile = (file: File) => {
    setError(null);
    
    // Basic validation
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, WEBP).');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB.');
      return;
    }

    const url = URL.createObjectURL(file);
    onChange(file, url);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl">
              <ImageIcon className="w-4 h-4 text-indigo-400" />
            </div>
            Upload Evidence
          </h3>
          <p className="text-sm text-gray-400 mt-2">
            Provide a clear photo of the issue to help our AI analyze and route it.
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {imagePreviewUrl ? (
          <motion.div 
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-[1.5rem] overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group aspect-video sm:aspect-[21/9] bg-[#050505] ring-1 ring-white/5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={imagePreviewUrl} 
              alt="Preview" 
              className="w-full h-full object-contain"
            />
            
            <div className="absolute inset-0 bg-[#0a0f1c]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-md">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2.5 bg-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="px-6 py-2.5 bg-rose-500/20 text-rose-300 rounded-xl font-bold text-sm hover:bg-rose-500/30 transition-colors shadow-[0_0_20px_rgba(244,63,94,0.2)] border border-rose-500/30 outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                Remove
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`relative rounded-[1.5rem] border-2 border-dashed transition-all duration-500 overflow-hidden ${
              isDragging 
                ? 'border-indigo-400 bg-indigo-500/10 scale-[1.02] shadow-[0_0_30px_rgba(99,102,241,0.2)]' 
                : error 
                ? 'border-rose-400/50 bg-rose-500/5'
                : 'border-white/10 hover:border-indigo-400/50 hover:bg-white/5 bg-white/[0.02]'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isDragging && (
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 blur-xl animate-pulse" />
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileInput} 
              aria-label="Upload issue image"
            />
            
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center cursor-pointer relative z-10" onClick={() => fileInputRef.current?.click()}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-all duration-500 border ${
                isDragging ? 'bg-indigo-500 border-indigo-400 scale-110 shadow-[0_0_30px_rgba(99,102,241,0.5)]' : 'bg-[#0a0f1c]/80 border-white/10 backdrop-blur-md'
              }`}>
                <UploadCloud className={`w-8 h-8 transition-colors ${isDragging ? 'text-white' : 'text-indigo-400'}`} />
              </div>
              
              <h4 className="text-lg font-bold text-white mb-2">
                Click to upload or drag and drop
              </h4>
              <p className="text-gray-400 mb-6 font-medium text-sm">
                SVG, PNG, JPG or WEBP (max. 10MB)
              </p>
              
              <button
                type="button"
                className="px-6 py-2.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl font-bold text-sm hover:scale-105 hover:bg-indigo-500/30 hover:text-white transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
              >
                Select File
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 backdrop-blur-md">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <p className="text-sm text-rose-300 font-medium">{error}</p>
        </motion.div>
      )}
    </div>
  );
}
