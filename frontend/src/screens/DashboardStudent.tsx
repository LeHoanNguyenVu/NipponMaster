import { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import axiosClient from '../api/axiosClient';
import type { ScreenType } from '../App';
import HeroCockpit from '../components/dashboard/HeroCockpit';
import ModuleProgressOverview from '../components/dashboard/ModuleProgressOverview';
import QuickFlashcardWidget from '../components/dashboard/QuickFlashcardWidget';
import { INITIAL_FALLBACK_CARDS, type FlashcardItem } from '../data/flashcardMnemonics';
import { loadStreakState, recordFlashcardReviewed, type StreakState } from '../utils/streakManager';
import { loadAllModulesProgress } from '../utils/moduleProgressManager';
import { getDaily10CardsDeck } from '../utils/srsCardManager';
import { isBeginnerGraduated, getBeginnerCourseSummary } from '../utils/beginnerProgressManager';
import { GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['dashboard', 'common']);
  const { user, updateUserLevel } = useAuthStore();

  // 1. Quản lý trạng thái Streak vô hạn chuẩn Duolingo
  const [streakState, setStreakState] = useState<StreakState>(() => loadStreakState());

  // 2. Kiểm tra tiến độ 5 chương Nhập Môn và trạng thái tốt nghiệp
  const isGraduated = isBeginnerGraduated();
  const [beginnerSummary, setBeginnerSummary] = useState(() => getBeginnerCourseSummary());

  useEffect(() => {
    setBeginnerSummary(getBeginnerCourseSummary());
  }, []);

  // Tự động nâng cấp lên N5 khi người dùng đã hoàn thành xuất sắc 5 chương & nhận bằng
  useEffect(() => {
    const currentStored = (user?.jlptLevel || localStorage.getItem('nippon_user_level') || 'STARTER').toUpperCase();
    if (isGraduated && currentStored === 'STARTER') {
      updateUserLevel('N5');
    }
  }, [isGraduated, user?.jlptLevel, updateUserLevel]);

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
      streakDays: streakState.currentStreak,
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
  const rawLevel = (user?.jlptLevel || stats.jlptLevel || localStorage.getItem('nippon_user_level') || 'STARTER').toUpperCase();
  const isStarter = rawLevel === 'STARTER';
  const normalizedLevelKey = isStarter ? 'STARTER' : rawLevel;

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

  // Xử lý khi học viên lật/xem 1 thẻ flashcard
  const handleCardReviewed = useCallback((cardIndex: number) => {
    const { justCheckedIn, state: updatedState } = recordFlashcardReviewed(cardIndex);
    setStreakState(updatedState);

    if (justCheckedIn) {
      console.log('🎉 Đã hoàn thành 10/10 flashcard và giữ lửa chuỗi streak hôm nay!');
    }
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

  const levelDisplay = isStarter ? t('dashboard:level.starter', 'Starter Course') : `${rawLevel} Level`;

  // 10 Cards Daily Deck - Bốc theo thuật toán Spaced Repetition (SRS)
  // Ở level Nhập Môn: CHỈ hiện những thẻ nằm bên trong nội dung nhập môn (STARTER)
  // Khi lên N5: Mở rộng các thẻ theo N5
  const daily10Cards = useMemo(() => {
    let candidateCards = cards;
    if (isStarter) {
      candidateCards = cards.filter(c => !c.jlptLevel || c.jlptLevel.toUpperCase() === 'STARTER');
      if (candidateCards.length < 10) {
        candidateCards = INITIAL_FALLBACK_CARDS.filter(c => !c.jlptLevel || c.jlptLevel.toUpperCase() === 'STARTER');
      }
    } else {
      candidateCards = cards.filter(c => !c.jlptLevel || c.jlptLevel.toUpperCase() === rawLevel || c.jlptLevel.toUpperCase() === 'N5');
      if (candidateCards.length < 10) {
        candidateCards = cards.length > 0 ? cards : INITIAL_FALLBACK_CARDS;
      }
    }
    return getDaily10CardsDeck(candidateCards, undefined, isStarter ? 'STARTER' : rawLevel);
  }, [cards, rawLevel, isStarter]);

  // Tiến độ tích lũy thực tế của 4 Module Cốt lõi (Nhập môn, 214 Bộ thủ, Ngữ pháp, Luyện nghe)
  const modulesProgress = useMemo(() => {
    return loadAllModulesProgress({
      kanjiLearned: stats.kanjiLearned,
      grammarLearned: stats.grammarLearned,
      listeningCompleted: stats.listeningCompleted,
    });
  }, [stats.kanjiLearned, stats.grammarLearned, stats.listeningCompleted]);

  const overallMastery = modulesProgress.overallMasteryPercent;

  return (
    <div className="max-w-[1360px] mx-auto p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 font-sans pb-16 animate-fade-in">
      {/* Tầng 1: Header chào mừng & Thanh 3 chỉ số thống kê (Streak Duolingo, Lộ trình, Thẻ hôm nay) */}
      <HeroCockpit
        fullName={user?.fullName || username || t('dashboard:greetings.studentFallback', 'Student')}
        levelDisplay={levelDisplay}
        targetLevel={user?.targetLevel}
        overallMastery={overallMastery}
        isRefreshing={isRefreshing}
        streakState={streakState}
        isStarter={isStarter}
        beginnerSummary={beginnerSummary}
      />

      {/* Tầng 2: Tiến độ 4 chức năng cốt lõi (Nhập môn, 214 Bộ thủ, Ngữ pháp, Luyện nghe)
          QUY TẮC BẮT BUỘC:
          - Ở level Nhập Môn: KHÔNG HIỆN bảng stat này!
          - Chỉ khi user đạt 5 chương và nhận bằng lên N5 thì mới hiện full ra! */}
      {!isStarter ? (
        <ModuleProgressOverview
          levelDisplay={levelDisplay}
          modulesProgress={modulesProgress}
          onNavigate={navigateTo}
        />
      ) : (
        /* Ở level Nhập Môn: Hiển thị Banner Lộ Trình 5 Chương Nhập Môn trực quan */
        <div 
          className="p-6 sm:p-7 bg-surface-container-low border border-outline-variant/70 shadow-flat-sm space-y-5 font-serif"
          style={{ borderRadius: '2px' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-primary/10 text-primary" style={{ borderRadius: '2px' }}>
                  <GraduationCap size={20} />
                </span>
                <span className="text-xs font-bold text-primary uppercase tracking-wider font-mono">
                  {t('dashboard:beginnerBanner.badge')}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-on-surface font-serif">
                {t('dashboard:beginnerBanner.title')}
              </h3>
              <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed font-serif">
                {t('dashboard:beginnerBanner.description')}
              </p>
            </div>
            <button
              onClick={() => navigateTo('beginner')}
              className="px-5 py-3 bg-primary text-on-primary font-bold text-sm cursor-pointer hover:bg-primary/90 transition-all shadow-flat-sm flex items-center justify-center gap-2 self-start sm:self-auto flex-shrink-0 font-serif"
              style={{ borderRadius: '2px' }}
            >
              <span>{t('dashboard:beginnerBanner.cta')}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
            {(t('dashboard:beginnerBanner.chapters', { returnObjects: true }) as any[] || []).map((ch, idx) => (
              <div 
                key={ch.num} 
                className="p-3 bg-surface-container-lowest border border-outline-variant/60 flex flex-col justify-between space-y-2 shadow-2xs font-serif"
                style={{ borderRadius: '2px' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-primary font-mono">CH. {ch.num}</span>
                  {idx < beginnerSummary.completedCount ? (
                    <CheckCircle2 size={16} className="text-emerald-600" />
                  ) : (
                    <span className="w-2 h-2 bg-outline-variant/60" style={{ borderRadius: '1px' }} />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface line-clamp-1 font-serif">{ch.title}</div>
                  <div className="text-xs text-on-surface-variant line-clamp-1 font-serif">{ch.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tầng 3: Thẻ ghi nhớ nhanh Flashcard full chiều rộng, theo dõi tiến độ điểm danh */}
      <QuickFlashcardWidget
        currentDeck={daily10Cards}
        levelDisplay={levelDisplay}
        onNavigate={navigateTo}
        todayReviewedCards={streakState.todayReviewedCards}
        todayGoalCards={streakState.todayGoalCards}
        checkedInToday={streakState.checkedInToday}
        onCardReviewed={handleCardReviewed}
      />
    </div>
  );
}
