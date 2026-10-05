import { Flame, Clock, Award, BookCheck, RefreshCw } from 'lucide-react';

interface HeroCockpitProps {
  fullName?: string;
  levelDisplay: string;
  targetLevel?: string;
  overallMastery: number;
  isRefreshing: boolean;
  displayStreak: number;
  weeklyStudyMinutes: number;
}

export default function HeroCockpit({
  fullName = 'Học viên',
  levelDisplay,
  targetLevel,
  overallMastery,
  isRefreshing,
  displayStreak,
  weeklyStudyMinutes,
}: HeroCockpitProps) {
  // Lời chào theo giờ
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng 🌅';
    if (hour < 18) return 'Chào buổi chiều ☀️';
    return 'Chào buổi tối 🌙';
  };

  const hasCustomTarget = targetLevel && targetLevel.toUpperCase() !== 'STARTER';

  // 7 ngày điểm danh trong tuần
  const daysOfWeek = [
    { label: 'T2', active: true },
    { label: 'T3', active: true },
    { label: 'T4', active: displayStreak >= 3 },
    { label: 'T5', active: displayStreak >= 4 },
    { label: 'T6', active: displayStreak >= 5 },
    { label: 'T7', active: displayStreak >= 6 },
    { label: 'CN', active: displayStreak >= 7 },
  ];

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

      {/* 2. Horizontal Stats Metric Cards Grid (4 Cột) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Chuỗi học tập (Streak) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-outline">Chuỗi Học Tập</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Flame size={20} className="fill-current" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-amber-500">{displayStreak}</span>
              <span className="text-xs font-bold text-outline">Ngày liên tiếp</span>
            </div>
            {/* 7-day dot checklist */}
            <div className="flex items-center gap-1 mt-2.5">
              {daysOfWeek.map((d, i) => (
                <div
                  key={i}
                  title={`${d.label}: ${d.active ? 'Đã điểm danh' : 'Chưa điểm danh'}`}
                  className={`flex-1 py-1 rounded-md text-center text-[10px] font-bold transition-all ${
                    d.active
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'bg-surface-container-high text-outline'
                  }`}
                >
                  {d.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metric 2: Thời gian học tuần */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-outline">Thời Gian Học Tuần</span>
            <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              <Clock size={20} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-on-surface">{weeklyStudyMinutes}</span>
              <span className="text-xs font-bold text-outline">Phút</span>
            </div>
            <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-2">
              ✓ Đạt 100% mục tiêu tuần
            </p>
          </div>
        </div>

        {/* Metric 3: Tiến độ lộ trình tổng thể */}
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
              <span className="text-[10px] font-semibold text-outline">Giai đoạn 3/5</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-primary transition-all duration-500" 
                style={{ width: `${overallMastery}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Metric 4: Thẻ nhớ Flashcard hôm nay */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-outline">Bộ Thẻ Ôn Tập</span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600">
              <BookCheck size={20} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-on-surface">10</span>
              <span className="text-xs font-bold text-outline">Thẻ chọn lọc hôm nay</span>
            </div>
            <p className="text-[11px] font-medium text-sky-600 dark:text-sky-400 mt-2">
              Lật thẻ ôn phản xạ bên dưới
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
