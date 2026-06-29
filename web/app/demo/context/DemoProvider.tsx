'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_DATABASE } from '../data/mockDatabase';

type Role = 'citizen' | 'admin';

interface DemoContextType {
  role: Role;
  currentUser: any /* eslint-disable-line @typescript-eslint/no-explicit-any */;
  users: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */;
  issues: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */;
  comments: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */;
  notifications: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */;
  stats: any /* eslint-disable-line @typescript-eslint/no-explicit-any */;
  switchRole: (newRole: Role) => void;
  resetDemo: () => void;
  addIssue: (issue: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => void;
  updateIssueStatus: (id: string, status: string) => void;
  addComment: (comment: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => void;
  markNotificationRead: (id: string) => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

export function DemoProvider({ children, initialRole = 'citizen' }: { children: React.ReactNode, initialRole?: Role }) {
  const [isClient, setIsClient] = useState(false);
  
  // States
  const [role, setRole] = useState<Role>(initialRole);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [issues, setIssues] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comments, setComments] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notifications, setNotifications] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState<any>(null);

  const resetDemo = () => {
    setUsers([...DEMO_DATABASE.users]);
    setIssues(DEMO_DATABASE.issues.map((issue, index) => {
      const defaultImages = [
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1584489311894-39f8f2b7a42b?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1579727670732-35805d762f0f?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1596700078864-77a80b3aa9dc?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600'
      ];
      return {
        ...issue,
        image_url: defaultImages[index % defaultImages.length]
      };
    }));
    setComments([...DEMO_DATABASE.comments]);
    setNotifications([...DEMO_DATABASE.notifications]);
    setStats({...DEMO_DATABASE.stats});
  };

  // Initialize data
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    resetDemo();
  }, []);

  const switchRole = (newRole: Role) => {
    setRole(newRole);
  };

  const addIssue = (issue: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
    setIssues([issue, ...issues]);
  };

  const updateIssueStatus = (id: string, status: string) => {
    setIssues(issues.map(i => i.id === id ? { ...i, status } : i));
  };

  const addComment = (comment: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
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
