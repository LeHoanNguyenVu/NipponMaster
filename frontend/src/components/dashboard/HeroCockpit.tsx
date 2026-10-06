import { Flame, Award, BookCheck, RefreshCw, CheckCircle2 } from 'lucide-react';
import { type StreakState, getCurrentWeekDays } from '../../utils/streakManager';

interface HeroCockpitProps {
  fullName?: string;
  levelDisplay: string;
  targetLevel?: string;
  overallMastery: number;
  isRefreshing: boolean;
  streakState: StreakState;
  weeklyStudyMinutes?: number;
}

export default function HeroCockpit({
  fullName = 'Học viên',
  levelDisplay,
  targetLevel,
  overallMastery,
  isRefreshing,
  streakState,
}: HeroCockpitProps) {
  // Lời chào theo giờ
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng 🌅';
    if (hour < 18) return 'Chào buổi chiều ☀️';
    return 'Chào buổi tối 🌙';
  };

  const hasCustomTarget = targetLevel && targetLevel.toUpperCase() !== 'STARTER';

  const todayReviewedCount = streakState.todayReviewedCards.length;
  const todayGoal = streakState.todayGoalCards;
  const progressPct = Math.min(100, Math.round((todayReviewedCount / todayGoal) * 100));

  // 7 ngày trong tuần (T2 đến CN)
  const weekDays = getCurrentWeekDays(streakState.streakHistory);

  return (
    <section className="space-y-4">
      {/* 1. Header Greeting Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low border border-outline-variant/50 shadow-sm relative overflow-hidden">
        {/* Background Japanese Watermark */}
        <div className="absolute right-4 -bottom-4 text-8xl font-black text-on-surface/[0.03] select-none pointer-events-none font-serif tracking-widest">
          日本語
        </div>

        <div className="space-y-1.5 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Trình độ: {levelDisplay}</span>
            </span>

            {hasCustomTarget && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
                🎯 Mục tiêu: {targetLevel}
              </span>
            )}

            {isRefreshing && (
              <span className="text-[11px] text-outline flex items-center gap-1">
                <RefreshCw size={11} className="animate-spin" /> Đang cập nhật...
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
            {getGreeting()}, <span className="text-primary">{fullName}</span>!
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Hôm nay là một ngày tuyệt vời để tiếp tục hành trình rèn luyện tiếng Nhật.
          </p>
        </div>
      </div>

      {/* 2. Horizontal Stats Metric Cards Grid (3 Cột) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Metric 1: Chuỗi học tập Duolingo Style (Streak vô hạn) */}
        <div className={`p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border shadow-xs flex flex-col justify-between space-y-3 transition-all ${
          streakState.checkedInToday
            ? 'border-amber-500/50 shadow-amber-500/5'
            : 'border-outline-variant/60'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-outline">Chuỗi Học Tập (Streak)</span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              streakState.checkedInToday
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-500 shadow-2xs'
                : 'bg-surface-container-high text-outline border border-outline-variant/30'
            }`}>
              <Flame size={20} className={streakState.checkedInToday ? 'fill-current animate-pulse' : ''} />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className={`text-2xl sm:text-3xl font-black ${
                  streakState.checkedInToday ? 'text-amber-500' : 'text-on-surface'
                }`}>
                  {streakState.currentStreak}
                </span>
                <span className="text-xs font-bold text-outline">Ngày liên tiếp</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                streakState.checkedInToday
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                  : 'bg-surface-container-high text-outline'
              }`}>
                {streakState.checkedInToday ? '✓ Đã giữ lửa' : 'Chưa điểm danh'}
              </span>
            </div>

            {/* Dải 7 ngày tuần hiện tại */}
            <div className="flex items-center gap-1 mt-2.5">
              {weekDays.map((d, i) => (
                <div
                  key={i}
                  title={`${d.label} (${d.dateStr}): ${d.active ? 'Đã điểm danh' : 'Chưa điểm danh'}`}
                  className={`flex-1 py-1 rounded-md text-center text-[10px] font-bold transition-all ${
                    d.active
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : d.isToday
                        ? 'border border-amber-500 text-amber-600 bg-amber-500/10'
                        : 'bg-surface-container-high text-outline'
                  }`}
                >
                  {d.label}
                </div>
              ))}
            </div>

            {/* Tiến độ hoàn thành flashcard trong ngày */}
            <div className="mt-2.5 pt-2 border-t border-outline-variant/30 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-outline">Tiến độ hôm nay:</span>
                <span className="font-extrabold text-primary">{todayReviewedCount}/{todayGoal} thẻ</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    streakState.checkedInToday ? 'bg-amber-500' : 'bg-primary'
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Dòng note bắt buộc theo yêu cầu */}
            <p className="text-[10.5px] text-amber-700 dark:text-amber-300 font-medium mt-2 p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 leading-tight">
              * Bạn phải tối thiểu hoàn thành hết flashcard hôm nay mới được tính điểm danh nhé
            </p>
          </div>
        </div>

        {/* Metric 2: Tiến độ lộ trình tổng thể */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-outline">Lộ Trình {levelDisplay}</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
              <Award size={20} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {overallMastery}%
              </span>
              <span className="text-[10px] font-semibold text-outline">Tổng thể 4 module</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-primary transition-all duration-500" 
                style={{ width: `${overallMastery}%` }} 
              />
            </div>
            <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-2.5">
              ✓ Đồng bộ theo năng lực học tập thực tế
            </p>
          </div>
        </div>

        {/* Metric 3: Trạng thái Flashcard */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-outline">Nhiệm Vụ Flashcard</span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600">
              <BookCheck size={20} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-on-surface">{todayGoal}</span>
              <span className="text-xs font-bold text-outline">Thẻ mục tiêu hôm nay</span>
            </div>
            <p className="text-[11px] font-medium text-sky-600 dark:text-sky-400 mt-2 flex items-center gap-1">
              {streakState.checkedInToday ? (
                <>
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>Đã hoàn thành xuất sắc & Điểm danh!</span>
                </>
              ) : (
                <span>Còn {Math.max(0, todayGoal - todayReviewedCount)} thẻ cần học để giữ lửa</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
