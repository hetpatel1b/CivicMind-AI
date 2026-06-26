import React, { useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface ImageUploaderProps {
  imageFile: File | null;
  imagePreviewUrl: string | null;
  onChange: (file: File | null, url: string | null) => void;
}

export default function ImageUploader({ imagePreviewUrl, onChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be under 10MB');
        return;
      }
      const url = URL.createObjectURL(file);
      onChange(file, url);
    }
  };

  const clearImage = () => {
    onChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
        Photo (Optional)
      </label>
      
      {imagePreviewUrl ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 aspect-video bg-gray-100 dark:bg-gray-800">
          <img src={imagePreviewUrl} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 p-1.5 bg-gray-900/50 hover:bg-gray-900/70 text-white rounded-full transition-colors backdrop-blur-sm"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 hover:dark:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400 group"
        >
          <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mb-3 shadow-sm border border-gray-100 dark:border-gray-600 group-hover:scale-105 transition-transform">
            <UploadCloud className="w-6 h-6 text-blue-500" />
          </div>
          <span className="text-sm font-medium">Click to upload an image</span>
          <span className="text-xs mt-1">JPEG, PNG, WEBP (Max 10MB)</span>
        </button>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
