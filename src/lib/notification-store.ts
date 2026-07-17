import { create } from 'zustand';

export type NotificationType = 'streak_risk' | 'streak_lost' | 'milestone' | 'tip';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: number;
  read: boolean;
  action?: { label: string; onClick: () => void };
}

interface NotificationState {
  notifications: AppNotification[];
  addNotification: (n: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markRead: (id: string) => void;
  dismiss: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (n) =>
    set((s) => ({
      notifications: [
        {
          ...n,
          id: `${n.type}-${Date.now()}`,
          timestamp: Date.now(),
          read: false,
        },
        ...s.notifications,
      ],
    })),
  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  dismiss: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    })),
  clearAll: () => set({ notifications: [] }),
}));
