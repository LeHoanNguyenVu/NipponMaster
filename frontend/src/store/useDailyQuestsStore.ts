import { create } from 'zustand';
import { useNotificationStore } from './useNotificationStore';
import type { ScreenType } from '../App';

export interface DailyQuest {
  id: string;
  title: string;
  reward: string;
  coins: number;
  current: number;
  max: number;
  completed: boolean;
  claimed: boolean;
  screen: ScreenType;
  actionLabel: string;
}

const getTodayDateStr = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const getTodayKey = () => `nippon_quests_${getTodayDateStr()}`;

const DEFAULT_QUESTS: DailyQuest[] = [
  {
    id: 'q_listen',
    title: 'Hoàn thành 1 bài Luyện nghe tình huống thực tế',
    reward: '+30 Coins',
    coins: 30,
    current: 0,
    max: 1,
    completed: false,
    claimed: false,
    screen: 'listening',
    actionLabel: 'Nghe ngay',
  },
  {
    id: 'q_flashcard',
    title: 'Ôn tập 5 thẻ ghi nhớ Flashcard đến hạn',
    reward: '+20 Coins',
    coins: 20,
    current: 0,
    max: 5,
    completed: false,
    claimed: false,
    screen: 'flashcards',
    actionLabel: 'Ôn thẻ',
  },
  {
    id: 'q_beginner',
    title: 'Học 1 bài trong Sách Nhập Môn (Bảng chữ cái & Chào hỏi)',
    reward: '+25 Coins',
    coins: 25,
    current: 0,
    max: 1,
    completed: false,
    claimed: false,
    screen: 'beginner',
    actionLabel: 'Học ngay',
  },
];

interface DailyQuestsState {
  quests: DailyQuest[];
  userStreak: number;
  isTodayStreakCompleted: boolean;
  updateProgress: (questId: string, amount?: number) => void;
  claimReward: (questId: string) => void;
  getCompletedCount: () => number;
}

export const useDailyQuestsStore = create<DailyQuestsState>((set, get) => {
  const todayKey = getTodayKey();
  const todayStr = getTodayDateStr();

  let initialQuests = DEFAULT_QUESTS;
  try {
    const stored = localStorage.getItem(todayKey);
    if (stored) {
      initialQuests = JSON.parse(stored);
    }
  } catch {}

  let initialStreak = 0;
  try {
    const storedStreak = localStorage.getItem('nippon_user_streak_count');
    if (storedStreak) {
      initialStreak = parseInt(storedStreak, 10);
    }
  } catch {}

  const lastAwardedDate = localStorage.getItem('nippon_streak_completed_date');
  const isTodayStreakCompleted = lastAwardedDate === todayStr;

  const saveQuests = (quests: DailyQuest[]) => {
    try {
      localStorage.setItem(todayKey, JSON.stringify(quests));
    } catch {}
  };

  const checkAndAwardStreak = (currentQuests: DailyQuest[]) => {
    const allDone = currentQuests.every((q) => q.completed || q.claimed);
    const currentDateStr = getTodayDateStr();
    const lastDate = localStorage.getItem('nippon_streak_completed_date');

    if (allDone && lastDate !== currentDateStr) {
      const prevStreak = parseInt(localStorage.getItem('nippon_user_streak_count') || '0', 10);
      const nextStreak = prevStreak + 1;

      try {
        localStorage.setItem('nippon_user_streak_count', String(nextStreak));
        localStorage.setItem('nippon_streak_completed_date', currentDateStr);
      } catch {}

      set({ userStreak: nextStreak, isTodayStreakCompleted: true });

      // Dispatch real system notification to Bell icon
      useNotificationStore.getState().addNotification({
        id: `streak_awarded_${currentDateStr}`,
        icon: '🔥',
        title: `Tuyệt Vời! +1 Ngày Chuỗi Học Tập (Streak)`,
        desc: `Bạn đã hoàn thành đủ cả 3 nhiệm vụ hôm nay! Chuỗi hiện tại: ${nextStreak} ngày.`,
        time: 'Vừa xong',
        screen: 'dashboard',
      });
    }
  };

  return {
    quests: initialQuests,
    userStreak: initialStreak,
    isTodayStreakCompleted,

    updateProgress: (questId: string, amount = 1) => {
      set((state) => {
        const updated = state.quests.map((q) => {
          if (q.id === questId) {
            const nextVal = Math.min(q.max, q.current + amount);
            const isDone = nextVal >= q.max;
            return {
              ...q,
              current: nextVal,
              completed: isDone,
            };
          }
          return q;
        });
        saveQuests(updated);
        checkAndAwardStreak(updated);
        return { quests: updated };
      });
    },

    claimReward: (questId: string) => {
      const { quests } = get();
      const target = quests.find((q) => q.id === questId);
      if (!target || target.claimed) return;

      const updated = quests.map((q) => (q.id === questId ? { ...q, claimed: true, completed: true, current: q.max } : q));
      saveQuests(updated);
      set({ quests: updated });

      // Dispatch real system notification to Bell icon for reward claim
      useNotificationStore.getState().addNotification({
        id: `quest_reward_${questId}_${Date.now()}`,
        icon: '🎁',
        title: `Nhận Thưởng Nhiệm Vụ Thành Công!`,
        desc: `Bạn đã hoàn thành "${target.title}" và nhận được ${target.reward}.`,
        time: 'Vừa xong',
        screen: 'dashboard',
      });

      // Check if all quests are now claimed/completed
      checkAndAwardStreak(updated);
    },

    getCompletedCount: () => {
      return get().quests.filter((q) => q.completed || q.claimed).length;
    },
  };
});
