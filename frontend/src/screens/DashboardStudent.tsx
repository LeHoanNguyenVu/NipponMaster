import { useEffect, useState, useMemo } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import axiosClient from '../api/axiosClient';
import type { ScreenType } from '../App';
import HeroCockpit from '../components/dashboard/HeroCockpit';
import SkillMatrixSection from '../components/dashboard/SkillMatrixSection';
import QuickFlashcardWidget from '../components/dashboard/QuickFlashcardWidget';
import { INITIAL_FALLBACK_CARDS, type FlashcardItem } from '../data/flashcardMnemonics';

interface Stats {
  jlptLevel: string;
  targetLevel: string;
  vocabLearned: number;
  vocabTotal: number;
  kanjiLearned: number;
  kanjiTotal: number;
  grammarLearned: number;
  grammarTotal: number;
  listeningCompleted: number;
  listeningTotal: number;
  weeklyStudyMinutes: number;
  dueCardCount: number;
  streakDays: number;
}

interface DashboardStudentProps {
  onStartStudy?: () => void;
  onOpenBeginnerCourse?: () => void;
  onNavigate?: (screen: ScreenType) => void;
  username?: string;
}

const STATS_CACHE_KEY = 'nippon_student_stats_v3';

export default function DashboardStudent({
  onStartStudy,
  onOpenBeginnerCourse,
  onNavigate,
  username,
}: DashboardStudentProps) {
  const { user } = useAuthStore();
  const userStreak = 0;

  // Stale-While-Revalidate Stats
  const [stats, setStats] = useState<Stats>(() => {
    try {
      const cached = localStorage.getItem(STATS_CACHE_KEY);
      if (cached) return JSON.parse(cached);
    } catch {}
    return {
      jlptLevel: user?.jlptLevel || 'STARTER',
      targetLevel: user?.targetLevel || '',
      vocabLearned: 0,
      vocabTotal: 100,
      kanjiLearned: 0,
      kanjiTotal: 214,
      grammarLearned: 0,
      grammarTotal: 50,
      listeningCompleted: 0,
      listeningTotal: 20,
      weeklyStudyMinutes: 30,
      dueCardCount: 0,
      streakDays: userStreak || 0,
    };
  });

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [cards, setCards] = useState<FlashcardItem[]>(() => {
    try {
      const cached = localStorage.getItem('nippon_quick_cards_cache');
      if (cached) return JSON.parse(cached);
    } catch {}
    return INITIAL_FALLBACK_CARDS;
  });

  // User's strict JLPT Level (STARTER, N5, N4, N3, N2, N1)
  const rawLevel = stats.jlptLevel || user?.jlptLevel || 'STARTER';
  const normalizedLevelKey = rawLevel.toUpperCase();

  // Fetch quick practice cards strictly from API for this level
  useEffect(() => {
    let active = true;
    const fetchQuickPracticeCards = async () => {
      try {
        const res = await axiosClient.get('/flashcards/quick-practice', {
          params: { level: normalizedLevelKey, limit: 30 },
        });
        const data = res.data.data ?? res.data;
        if (active && Array.isArray(data) && data.length > 0) {
          setCards(data);
          try {
            localStorage.setItem('nippon_quick_cards_cache', JSON.stringify(data));
          } catch {}
        }
      } catch (err) {
        console.warn('Could not fetch quick practice cards from backend, using fallback', err);
      }
    };

    fetchQuickPracticeCards();
    return () => {
      active = false;
    };
  }, [normalizedLevelKey]);

  // Fetch updated stats from backend
  useEffect(() => {
    let active = true;
    const fetchStats = async () => {
      setIsRefreshing(true);
      try {
        const res = await axiosClient.get('/dashboard/stats');
        const data = res.data.data ?? res.data;
        if (active && data) {
          setStats(data);
          try {
            localStorage.setItem(STATS_CACHE_KEY, JSON.stringify(data));
          } catch {}
        }
      } catch (err) {
        console.warn('Silent fallback for dashboard stats', err);
      } finally {
        if (active) setIsRefreshing(false);
      }
    };

    fetchStats();
    return () => {
      active = false;
    };
  }, []);

  const navigateTo = (screen: ScreenType) => {
    if (onNavigate) {
      onNavigate(screen);
    } else if (screen === 'kanji' && onStartStudy) {
      onStartStudy();
    } else if (screen === 'beginner' && onOpenBeginnerCourse) {
      onOpenBeginnerCourse();
    }
  };

  // Pure Vietnamese level conversion
  const formatLevel = (lvl?: string) => {
    if (!lvl || lvl.toUpperCase() === 'STARTER') return 'Nhập Môn';
    return lvl.toUpperCase();
  };

  const levelDisplay = formatLevel(rawLevel);

  // 10 Cards Daily Deck - strictly filtered for current level and capped at 10
  const daily10Cards = useMemo(() => {
    const rawDeck = cards.filter(c => !c.jlptLevel || c.jlptLevel.toUpperCase() === normalizedLevelKey);
    const sourceDeck = rawDeck.length > 0 ? rawDeck : (cards.length > 0 ? cards : INITIAL_FALLBACK_CARDS);
    
    // Deterministic daily shuffle based on today's date so deck is consistent throughout the day
    const todayStr = new Date().toISOString().slice(0, 10);
    const shuffled = [...sourceDeck].sort((a, b) => {
      const hashA = (a.kanji + todayStr).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const hashB = (b.kanji + todayStr).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return (hashA % 17) - (hashB % 17);
    });
    return shuffled.slice(0, 10);
  }, [cards, normalizedLevelKey]);

  // Percentage calculations
  const vocabPct = stats.vocabTotal > 0 ? Math.min(100, Math.round((stats.vocabLearned / stats.vocabTotal) * 100)) : 0;
  const kanjiPct = stats.kanjiTotal > 0 ? Math.min(100, Math.round((stats.kanjiLearned / stats.kanjiTotal) * 100)) : 0;
  const grammarPct = stats.grammarTotal > 0 ? Math.min(100, Math.round((stats.grammarLearned / stats.grammarTotal) * 100)) : 0;
  const overallMastery = Math.max(5, Math.round((vocabPct + kanjiPct + grammarPct) / 3));

  const displayStreak = Math.max(userStreak, stats.streakDays);

  return (
    <div className="max-w-[1360px] mx-auto p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 font-sans pb-16 animate-fade-in">
      {/* Tầng 1: Header chào mừng & Thanh 4 chỉ số thống kê (Streak, Giờ học, Lộ trình, Thẻ hôm nay) */}
      <HeroCockpit
        fullName={user?.fullName || username || 'Học viên'}
        levelDisplay={levelDisplay}
        targetLevel={user?.targetLevel}
        overallMastery={overallMastery}
        isRefreshing={isRefreshing}
        displayStreak={displayStreak}
        weeklyStudyMinutes={stats.weeklyStudyMinutes}
      />

      {/* Tầng 2: Ma trận tiến độ 4 chức năng cốt lõi (Nhập môn, 214 Bộ thủ, Ngữ pháp, Luyện nghe) */}
      <SkillMatrixSection
        levelDisplay={levelDisplay}
        kanjiLearned={stats.kanjiLearned}
        kanjiTotal={stats.kanjiTotal}
        grammarLearned={stats.grammarLearned}
        grammarTotal={stats.grammarTotal}
        listeningCompleted={stats.listeningCompleted}
        listeningTotal={stats.listeningTotal}
        onNavigate={navigateTo}
      />

      {/* Tầng 3: Thẻ ghi nhớ nhanh Flashcard full chiều rộng */}
      <QuickFlashcardWidget
        currentDeck={daily10Cards}
        levelDisplay={levelDisplay}
        onNavigate={navigateTo}
      />
    </div>
  );
}
