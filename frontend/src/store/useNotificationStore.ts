import { create } from 'zustand';
import type { ScreenType } from '../App';

export interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  time: string;
  screen?: ScreenType;
  createdAt: number;
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-listening-200',
    icon: '🎧',
    title: 'Phòng Luyện Nghe Tình Huống Thực Tế',
    desc: 'Kho 200 bài nghe tình huống chuẩn JLPT N5-N1 đã mở khóa sẵn sàng cho bạn luyện tập!',
    time: '5 phút trước',
    screen: 'listening',
    createdAt: Date.now() - 5 * 60 * 1000,
  },
  {
    id: 'notif-battle-1v1',
    icon: '⚔️',
    title: 'Đấu Trường Đối Kháng 1v1',
    desc: 'Sora AI đang thách đấu bạn tại Đấu Trường Xếp Hạng Tiếng Nhật.',
    time: '1 giờ trước',
    screen: 'battle',
    createdAt: Date.now() - 60 * 60 * 1000,
  },
];

const NOTIF_LIST_KEY = 'nippon_notifications_list_v2';
const NOTIF_READ_KEY = 'nippon_notifications_read_v2';

interface NotificationState {
  notifications: NotificationItem[];
  readIds: string[];
  addNotification: (item: Omit<NotificationItem, 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => {
  // Load stored custom notifications + defaults
  let initialList = DEFAULT_NOTIFICATIONS;
  try {
    const storedList = localStorage.getItem(NOTIF_LIST_KEY);
    if (storedList) {
      const parsed: NotificationItem[] = JSON.parse(storedList);
      // Merge unique by id
      const ids = new Set(parsed.map((n) => n.id));
      initialList = [...parsed, ...DEFAULT_NOTIFICATIONS.filter((n) => !ids.has(n.id))];
    }
  } catch {}

  let initialReadIds: string[] = [];
  try {
    const storedRead = localStorage.getItem(NOTIF_READ_KEY);
    if (storedRead) initialReadIds = JSON.parse(storedRead);
  } catch {}

  return {
    notifications: initialList,
    readIds: initialReadIds,

    addNotification: (item) => {
      const newItem: NotificationItem = {
        ...item,
        createdAt: Date.now(),
      };
      set((state) => {
        // Prevent duplicate IDs
        const filtered = state.notifications.filter((n) => n.id !== item.id);
        const updated = [newItem, ...filtered];
        // Unmark this notification as read so it counts as new
        const updatedRead = state.readIds.filter((id) => id !== item.id);
        try {
          localStorage.setItem(NOTIF_LIST_KEY, JSON.stringify(updated.slice(0, 20)));
          localStorage.setItem(NOTIF_READ_KEY, JSON.stringify(updatedRead));
        } catch {}
        return { notifications: updated, readIds: updatedRead };
      });
    },

    markAsRead: (id: string) => {
      set((state) => {
        if (state.readIds.includes(id)) return state;
        const updated = [...state.readIds, id];
        try {
          localStorage.setItem(NOTIF_READ_KEY, JSON.stringify(updated));
        } catch {}
        return { readIds: updated };
      });
    },

    markAllAsRead: () => {
      set((state) => {
        const allIds = state.notifications.map((n) => n.id);
        try {
          localStorage.setItem(NOTIF_READ_KEY, JSON.stringify(allIds));
        } catch {}
        return { readIds: allIds };
      });
    },

    getUnreadCount: () => {
      const { notifications, readIds } = get();
      return notifications.filter((n) => !readIds.includes(n.id)).length;
    },
  };
});
