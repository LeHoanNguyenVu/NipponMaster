import { Flame, Award, BookCheck, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { type StreakState, getCurrentWeekDays } from '../../utils/streakManager';

interface HeroCockpitProps {
  fullName?: string;
  levelDisplay: string;
  targetLevel?: string;
  overallMastery: number;
  isRefreshing: boolean;
  streakState: StreakState;
  weeklyStudyMinutes?: number;
  isStarter?: boolean;
  beginnerSummary?: {
    completedCount: number;
    totalCount: number;
    percent: number;
  };
}

export default function HeroCockpit({
  fullName,
  levelDisplay,
  targetLevel,
  overallMastery,
  isRefreshing,
  streakState,
  isStarter,
  beginnerSummary,
}: HeroCockpitProps) {
  const { t } = useTranslation(['dashboard', 'common']);
  const displayName = (fullName && fullName !== 'Học viên') ? fullName : t('dashboard:greetings.studentFallback', 'Học viên');

  // Greeting by hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('dashboard:greetings.morning');
    if (hour < 18) return t('dashboard:greetings.afternoon');
    return t('dashboard:greetings.evening');
  };

  const hasCustomTarget = targetLevel && targetLevel.toUpperCase() !== 'STARTER';

  const todayReviewedCount = streakState.todayReviewedCards.length;
  const todayGoal = streakState.todayGoalCards;
  const progressPct = Math.min(100, Math.round((todayReviewedCount / todayGoal) * 100));

  // 7 days of current week
  const weekDays = getCurrentWeekDays(streakState.streakHistory);
  const localizedDays = t('dashboard:streak.daysOfWeek', { returnObjects: true }) as string[];

  return (
    <section className="space-y-4">
      {/* 1. Header Greeting Bar */}
      <div 
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-surface-container-low border border-outline-variant/70 shadow-flat-sm relative overflow-hidden"
        style={{ borderRadius: '2px' }}
      >
        {/* Background Japanese Watermark */}
        <div className="absolute right-4 -bottom-4 text-8xl font-black text-on-surface/[0.04] select-none pointer-events-none font-serif tracking-widest">
          日本語
        </div>

        <div className="space-y-1.5 z-10 font-serif">
          <div className="flex flex-wrap items-center gap-2">
            <span 
              className="text-xs font-bold px-3 py-1 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-2xs font-serif"
              style={{ borderRadius: '2px' }}
            >
              <span className="w-2 h-2 bg-emerald-500 animate-pulse" style={{ borderRadius: '1px' }} />
              <span>{t('dashboard:greetings.level', { level: levelDisplay })}</span>
            </span>

            {hasCustomTarget && (
              <span 
                className="text-xs font-semibold px-2.5 py-1 bg-primary/15 text-primary border border-primary/30 font-serif"
                style={{ borderRadius: '2px' }}
              >
                {t('dashboard:greetings.target', { level: targetLevel })}
              </span>
            )}

            {isRefreshing && (
              <span className="text-xs text-outline flex items-center gap-1 font-mono">
                <RefreshCw size={12} className="animate-spin" /> {t('dashboard:greetings.refreshing')}
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight font-serif">
            {getGreeting()}, <span className="text-primary">{displayName}</span>!
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant font-serif">
            {t('dashboard:greetings.sub')}
          </p>
        </div>
      </div>

      {/* 2. Horizontal Stats Metric Cards Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Metric 1: Streak */}
        <div 
          className={`p-5 bg-surface-container-lowest border shadow-flat-sm flex flex-col justify-between space-y-3 transition-all ${
            streakState.checkedInToday
              ? 'border-amber-500/70 shadow-amber-500/10'
              : 'border-outline-variant/70'
          }`}
          style={{ borderRadius: '2px' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-outline font-serif">
              {t('dashboard:streak.title')}
            </span>
            <div 
              className={`w-9 h-9 flex items-center justify-center transition-all ${
                streakState.checkedInToday
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-500 shadow-2xs'
                  : 'bg-surface-container-high text-outline border border-outline-variant/30'
              }`}
              style={{ borderRadius: '2px' }}
            >
              <Flame size={20} className={streakState.checkedInToday ? 'fill-current animate-pulse' : ''} />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className={`text-2xl sm:text-3xl font-black font-serif ${
                  streakState.checkedInToday ? 'text-amber-500' : 'text-on-surface'
                }`}>
                  {streakState.currentStreak}
                </span>
                <span className="text-xs font-bold text-outline font-serif">
                  {t('dashboard:streak.days')}
                </span>
              </div>
              <span 
                className={`text-xs font-bold px-2 py-0.5 border ${
                  streakState.checkedInToday
                    ? 'border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-400'
                    : 'border-outline-variant/50 bg-surface-container-high text-outline'
                }`}
                style={{ borderRadius: '1px' }}
              >
                {streakState.checkedInToday ? t('dashboard:streak.saved') : t('dashboard:streak.notCheckedIn')}
              </span>
            </div>

            {/* 7 Days of Current Week */}
            <div className="flex items-center gap-1 mt-3">
              {weekDays.map((d, i) => (
                <div
                  key={i}
                  title={`${d.label} (${d.dateStr})`}
                  className={`flex-1 py-1.5 text-center text-xs font-bold font-serif transition-all border ${
                    d.active
                      ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                      : d.isToday
                        ? 'border-amber-500 text-amber-600 bg-amber-500/10'
                        : 'bg-surface-container-high text-outline border-transparent'
                  }`}
                  style={{ borderRadius: '1px' }}
                >
                  {Array.isArray(localizedDays) && localizedDays[i] ? localizedDays[i] : d.label}
                </div>
              ))}
            </div>

            {/* Daily Flashcard Progress */}
            <div className="mt-3 pt-2.5 border-t border-outline-variant/40 space-y-1.5 font-serif">
              <div className="flex items-center justify-between text-xs">
                <span className="text-outline">{t('dashboard:streak.todayProgress')}</span>
                <span className="font-bold text-primary">
                  {t('dashboard:streak.cardsCount', { reviewed: todayReviewedCount, goal: todayGoal })}
                </span>
              </div>
              <div className="w-full h-2 bg-surface-container-high overflow-hidden" style={{ borderRadius: '1px' }}>
                <div 
                  className={`h-full transition-all duration-500 ${
                    streakState.checkedInToday ? 'bg-amber-500' : 'bg-primary'
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <p 
              className="text-xs text-amber-800 dark:text-amber-200 font-serif mt-2.5 p-2 bg-amber-500/10 border border-amber-500/30 leading-snug"
              style={{ borderRadius: '2px' }}
            >
              {t('dashboard:streak.note')}
            </p>
          </div>
        </div>

        {/* Metric 2: Overall Roadmap Progress */}
        <div 
          className="p-5 bg-surface-container-lowest border border-outline-variant/70 shadow-flat-sm flex flex-col justify-between space-y-3"
          style={{ borderRadius: '2px' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-outline font-serif">
              {isStarter ? t('dashboard:roadmap.starterTitle') : t('dashboard:roadmap.levelTitle', { level: levelDisplay })}
            </span>
            <div 
              className="w-9 h-9 bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600"
              style={{ borderRadius: '2px' }}
            >
              <Award size={20} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-serif">
                {isStarter
                  ? t('dashboard:roadmap.starterCompleted', { completed: beginnerSummary?.completedCount ?? 0 })
                  : `${overallMastery}%`}
              </span>
              <span className="text-xs font-semibold text-outline font-serif">
                {isStarter
                  ? t('dashboard:roadmap.starterPercent', { percent: beginnerSummary?.percent ?? 0 })
                  : t('dashboard:roadmap.overall4Skills')}
              </span>
            </div>
            <div className="w-full h-2 bg-surface-container-high overflow-hidden" style={{ borderRadius: '1px' }}>
              <div 
                className="h-full bg-emerald-600 transition-all duration-500" 
                style={{ 
                  width: `${isStarter ? (beginnerSummary?.percent ?? 0) : overallMastery}%` 
                }} 
              />
            </div>
            <p className="text-xs font-serif text-emerald-700 dark:text-emerald-300 mt-3">
              {isStarter
                ? t('dashboard:roadmap.starterGoal')
                : t('dashboard:roadmap.syncNote')}
            </p>
          </div>
        </div>

        {/* Metric 3: Flashcard Mission */}
        <div 
          className="p-5 bg-surface-container-lowest border border-outline-variant/70 shadow-flat-sm flex flex-col justify-between space-y-3"
          style={{ borderRadius: '2px' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-outline font-serif">
              {t('dashboard:mission.title')}
            </span>
            <div 
              className="w-9 h-9 bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600"
              style={{ borderRadius: '2px' }}
            >
              <BookCheck size={20} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-on-surface font-serif">{todayGoal}</span>
              <span className="text-xs font-bold text-outline font-serif">
                {t('dashboard:mission.dailyTarget')}
              </span>
            </div>
            <p className="text-xs font-serif text-sky-700 dark:text-sky-300 mt-3 flex items-center gap-1.5">
              {streakState.checkedInToday ? (
                <>
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  <span>{t('dashboard:mission.completed')}</span>
                </>
              ) : (
                <span>
                  {t('dashboard:mission.remaining', { count: Math.max(0, todayGoal - todayReviewedCount) })}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
