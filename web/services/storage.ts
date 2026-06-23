import { createClient } from '@/lib/supabase-browser';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export interface UploadResult {
  path: string;
  publicUrl: string;
}

/**
 * Validates and securely uploads an image to the 'civic-images' Supabase Storage bucket.
 * Intended for client-side usage via the browser Supabase client.
 *
 * @param file The image File object from the browser
 * @returns UploadResult containing the internal storage path and the public URL
 */
export async function uploadIssueImage(file: File): Promise<UploadResult> {
  // 1. Validate File Size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Upload failed: File exceeds the maximum allowed size of 10MB.');
  }

  // 2. Validate File Type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Upload failed: Only JPEG, PNG, and WEBP images are supported.');
  }

  // 3. Generate Unique Filename
  // Example: issues/1719238822-abcd1234.jpg
  const extension = file.name.split('.').pop() || 'jpg';
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 10);
  const filePath = `issues/${timestamp}-${randomStr}.${extension}`;

  // 4. Initialize Supabase Browser Client
  const supabase = createClient();

  // 5. Upload File
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('civic-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('[Storage Service] Upload Error:', uploadError.message);
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  if (!uploadData?.path) {
    throw new Error('Upload failed: Supabase did not return a valid file path.');
  }

  // 6. Retrieve Public URL
  const { data: urlData } = supabase.storage
    .from('civic-images')
    .getPublicUrl(uploadData.path);

  if (!urlData?.publicUrl) {
    throw new Error('Upload succeeded, but failed to retrieve the public URL.');
  }

  return {
    path: uploadData.path,
    publicUrl: urlData.publicUrl,
  };
}
