import React from 'react';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] flex flex-col items-center justify-center p-6 sm:p-10">
      <AdminLoginForm />
    </div>
  );
}
