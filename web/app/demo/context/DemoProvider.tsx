'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_DATABASE } from '../data/mockDatabase';

type Role = 'citizen' | 'admin';

interface DemoContextType {
  role: Role;
  currentUser: any;
  users: any[];
  issues: any[];
  comments: any[];
  notifications: any[];
  stats: any;
  switchRole: (newRole: Role) => void;
  resetDemo: () => void;
  addIssue: (issue: any) => void;
  updateIssueStatus: (id: string, status: string) => void;
  addComment: (comment: any) => void;
  markNotificationRead: (id: string) => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

export function DemoProvider({ children, initialRole = 'citizen' }: { children: React.ReactNode, initialRole?: Role }) {
  const [isClient, setIsClient] = useState(false);
  
  // States
  const [role, setRole] = useState<Role>(initialRole);
  const [users, setUsers] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  // Initialize data
  useEffect(() => {
    setIsClient(true);
    resetDemo();
  }, []);

  const resetDemo = () => {
    setUsers([...DEMO_DATABASE.users]);
    setIssues([...DEMO_DATABASE.issues]);
    setComments([...DEMO_DATABASE.comments]);
    setNotifications([...DEMO_DATABASE.notifications]);
    setStats({...DEMO_DATABASE.stats});
  };

  const switchRole = (newRole: Role) => {
    setRole(newRole);
  };

  const addIssue = (issue: any) => {
    setIssues([issue, ...issues]);
  };

  const updateIssueStatus = (id: string, status: string) => {
    setIssues(issues.map(i => i.id === id ? { ...i, status } : i));
  };

  const addComment = (comment: any) => {
    setComments([...comments, comment]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  // Get current user based on role
  const currentUser = users.find(u => u.role === role);

  if (!isClient) return null;

  return (
    <DemoContext.Provider value={{
      role,
      currentUser,
      users,
      issues,
      comments,
      notifications,
      stats,
      switchRole,
      resetDemo,
      addIssue,
      updateIssueStatus,
      addComment,
      markNotificationRead
    }}>
      {children}
    </DemoContext.Provider>
  );
}

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
