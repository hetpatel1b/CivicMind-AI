import { NotificationRecord } from '@/types/notification';

// Mock data to simulate the backend state
let MOCK_NOTIFICATIONS: NotificationRecord[] = [
  {
    id: 'n-1',
    userId: 'user-1',
    type: 'ISSUE_VERIFIED',
    title: 'Issue Verified',
    message: 'Your report "Pothole on Main St" has been verified by the community.',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
  },
  {
    id: 'n-2',
    userId: 'user-1',
    type: 'BADGE_EARNED',
    title: 'Badge Unlocked!',
    message: 'Congratulations! You have earned the Active Citizen badge.',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 'n-3',
    userId: 'user-1',
    type: 'COMMENT_RECEIVED',
    title: 'New Comment',
    message: 'Jane Doe commented on your issue "Broken Streetlight".',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: 'n-4',
    userId: 'user-1',
    type: 'ISSUE_RESOLVED',
    title: 'Issue Resolved',
    message: 'The city has resolved your issue "Graffiti on Park Wall". Thank you for reporting!',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: 'n-5',
    userId: 'user-1',
    type: 'ISSUE_SUPPORTED',
    title: 'New Support',
    message: 'Your issue "Illegal Dumping" received 5 new supports today.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
  }
];

export async function getNotifications(_userId: string): Promise<NotificationRecord[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  return MOCK_NOTIFICATIONS.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function markAsRead(notificationId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));
  MOCK_NOTIFICATIONS = MOCK_NOTIFICATIONS.map(n => 
    n.id === notificationId ? { ...n, isRead: true } : n
  );
}

export async function markAllAsRead(_userId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 400));
  MOCK_NOTIFICATIONS = MOCK_NOTIFICATIONS.map(n => ({ ...n, isRead: true }));
}

export async function clearReadNotifications(_userId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 400));
  MOCK_NOTIFICATIONS = MOCK_NOTIFICATIONS.filter(n => !n.isRead);
}
