import { BarChart3, BookOpen, Headphones, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import type { ScreenType } from '../../App';
import type { AllModulesProgress, SingleModuleProgress } from '../../utils/moduleProgressManager';

interface ModuleProgressOverviewProps {
  levelDisplay: string;
  modulesProgress: AllModulesProgress;
  onNavigate: (screen: ScreenType) => void;
}

export default function ModuleProgressOverview({
  levelDisplay,
  modulesProgress,
  onNavigate,
}: ModuleProgressOverviewProps) {
  const cards: SingleModuleProgress[] = [
    modulesProgress.beginner,
    modulesProgress.kanji,
    modulesProgress.grammar,
    modulesProgress.listening,
  ];

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 text-white flex items-center justify-center shadow-md shadow-primary/20">
            <BarChart3 size={19} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl font-extrabold text-on-surface tracking-tight">
                Lộ Trình & Tiến Độ 4 Kỹ Năng Cốt Lõi
              </h2>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {levelDisplay}
              </span>
            </div>
            <p className="text-xs text-outline mt-0.5">
              Hệ thống bài học phân bổ toàn diện theo năng lực thực chiến Nhật ngữ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-2xl bg-surface-container-high/70 border border-outline-variant/50 text-on-surface flex items-center gap-2 shadow-2xs">
            <Sparkles size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-xs font-semibold text-outline">Tổng thể lộ trình:</span>
            <span className="text-sm font-black text-primary">
              {modulesProgress.overallMasteryPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* 4 Cards Grid - Đa sắc màu, có watermark Nhật Bản, trực quan & bắt mắt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        {cards.map((card) => {
          const isComplete = card.percent >= 100;

          return (
            <div
              key={card.key}
              id={`module-card-${card.key}`}
              data-testid={`module-card-${card.key}`}
              onClick={() => onNavigate(card.key as ScreenType)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onNavigate(card.key as ScreenType);
                }
              }}
              className={`group relative p-5 sm:p-5.5 rounded-3xl bg-gradient-to-br ${card.theme.gradient} border ${card.theme.border} ${card.theme.hoverBorder} hover:-translate-y-1.5 transition-all duration-300 cursor-pointer space-y-4 shadow-sm overflow-hidden select-none flex flex-col justify-between`}
            >
              {/* Watermark Chữ Hán/Kana Cổ Điển Nhạt ở Góc Dưới (Tạo chiều sâu văn hóa Nhật) */}
              <div
                className={`absolute -right-3 -bottom-5 text-8xl md:text-9xl font-black font-serif select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 ${card.theme.watermarkColor}`}
              >
                {card.japaneseWatermark}
              </div>

              {/* Phần Đầu Card: Tag Chủ đề & Badge Phần Trăm */}
              <div className="space-y-3 z-10">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${card.theme.badgeBg}`}
                  >
                    {card.categoryTag}
                  </span>

                  {isComplete ? (
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-2xs">
                      <CheckCircle2 size={13} />
                      <span>100%</span>
                    </span>
                  ) : (
                    <span
                      className={`text-xs font-black px-2.5 py-0.5 rounded-full bg-surface-container-lowest/80 border border-outline-variant/30 shadow-2xs ${card.theme.accentText}`}
                    >
                      {card.percent}%
                    </span>
                  )}
                </div>

                {/* Biểu tượng Nổi Bật & Tiêu đề */}
                <div className="flex items-start gap-3.5 pt-1">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-md transition-transform duration-300 group-hover:scale-105 shrink-0 ${card.theme.iconBg}`}
                  >
                    {card.iconType === 'text' ? (
                      <span className="font-serif">{card.iconText}</span>
                    ) : card.iconName === 'BookOpen' ? (
                      <BookOpen size={22} />
                    ) : (
                      <Headphones size={22} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-extrabold text-on-surface group-hover:text-primary transition-colors tracking-tight line-clamp-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-outline mt-0.5 line-clamp-1 leading-snug">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phần Thân Card: Bộ Đếm Tiến Độ & Thanh Bar Gradient */}
              <div className="space-y-3 pt-2 z-10 border-t border-outline-variant/20">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-outline font-medium">Tiến độ hoàn thành:</span>
                    <span className="font-extrabold text-on-surface">
                      <span className={card.theme.accentText}>{card.completed}</span> / {card.total}{' '}
                      <span className="text-[11px] text-outline font-normal">{card.unitLabel}</span>
                    </span>
                  </div>

                  {/* Thanh Progress Bar Dày, Bo Tròn, Gradient Rực Rỡ */}
                  <div className="w-full h-2.5 rounded-full bg-surface-container-high/80 overflow-hidden p-0.5 shadow-inner">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${card.theme.progressGradient} transition-all duration-700 ease-out shadow-2xs`}
                      style={{
                        width: `${Math.max(card.percent > 0 ? 6 : 0, Math.min(100, card.percent))}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Nút Kêu Gọi Hành Động (CTA Button) */}
                <div
                  className={`w-full py-2 px-3.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-between ${card.theme.actionBtn}`}
                >
                  <span>{card.actionText}</span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
