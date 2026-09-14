import { create } from 'zustand';
import axiosClient from '../api/axiosClient';

export interface FlashcardItem {
  id: number;
  front: string;
  back: string;
  reading?: string;
  cardType: 'VOCABULARY' | 'KANJI' | 'GRAMMAR';
  intervalDays: number;
  easeFactor: number;
  repetitionCount: number;
  nextReviewAt: string | null;
  sourceId?: number;
  exampleSentence?: string;
  exampleMeaning?: string;
}

interface StudySessionResponse {
  newCount: number;
  reviewCount: number;
  cards: FlashcardItem[];
}

interface SessionStats {
  total: number;
  newCount: number;
  reviewCount: number;
  again: number;
  hard: number;
  good: number;
  easy: number;
}

interface FlashcardState {
  cards: FlashcardItem[];
  currentIndex: number;
  isLoading: boolean;
  error: string | null;
  sessionStats: SessionStats;
  sessionComplete: boolean;

  fetchStudySession: (userId: number) => Promise<void>;
  reviewCard: (cardId: number, quality: number) => Promise<void>;
  nextCard: () => void;
  resetSession: () => void;
}

export const useFlashcardStore = create<FlashcardState>((set, get) => ({
  cards: [],
  currentIndex: 0,
  isLoading: false,
  error: null,
  sessionComplete: false,
  sessionStats: { total: 0, newCount: 0, reviewCount: 0, again: 0, hard: 0, good: 0, easy: 0 },

  fetchStudySession: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosClient.get<any, any>(`/flashcards/user/${userId}/study-session`);
      // API trả về: { data: { newCount, reviewCount, cards } }
      const session: StudySessionResponse = res.data ?? res;
      const cards = session.cards ?? [];

      set({
        cards,
        currentIndex: 0,
        isLoading: false,
        sessionComplete: cards.length === 0,
        sessionStats: {
          total: cards.length,
          newCount: session.newCount ?? 0,
          reviewCount: session.reviewCount ?? 0,
          again: 0, hard: 0, good: 0, easy: 0,
        },
      });
    } catch {
      set({ cards: [], currentIndex: 0, isLoading: false, error: 'Không thể tải phiên ôn tập', sessionComplete: true, sessionStats: { total: 0, newCount: 0, reviewCount: 0, again: 0, hard: 0, good: 0, easy: 0 } });
    }
  },

  reviewCard: async (cardId: number, quality: number) => {
    const stats = { ...get().sessionStats };
    if (quality <= 1) stats.again++;
    else if (quality === 2) stats.hard++;
    else if (quality === 3) stats.good++;
    else stats.easy++;
    set({ sessionStats: stats });

    try {
      await axiosClient.post(`/flashcards/${cardId}/review?quality=${quality}`);
    } catch {
      // Silently handle - card still progresses locally
    }
  },

  nextCard: () => {
    const { currentIndex, cards } = get();
    if (currentIndex + 1 >= cards.length) {
      set({ sessionComplete: true });
    } else {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  resetSession: () => {
    set({ currentIndex: 0, sessionComplete: false, sessionStats: { total: 0, newCount: 0, reviewCount: 0, again: 0, hard: 0, good: 0, easy: 0 }, cards: [] });
  },
}));
