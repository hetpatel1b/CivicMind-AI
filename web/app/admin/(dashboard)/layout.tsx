import { verifyAdministratorRole } from '@/services/auth';
import React from 'react';

import { redirect } from 'next/navigation';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enforce Role-Based Access Control server-side
  const isAdmin = await verifyAdministratorRole();
  
  if (!isAdmin) {
    // If citizen or guest, they cannot see admin pages.
    redirect('/admin/login');
  }

  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}
