import { BarChart3, BookOpen, Headphones, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation(['dashboard', 'common']);

  const cards: SingleModuleProgress[] = [
    modulesProgress.beginner,
    modulesProgress.kanji,
    modulesProgress.grammar,
    modulesProgress.listening,
  ];

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 font-serif">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 bg-primary text-on-primary flex items-center justify-center shadow-flat-sm"
            style={{ borderRadius: '2px' }}
          >
            <BarChart3 size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface tracking-tight font-serif">
                {t('dashboard:skillsSection.title')}
              </h2>
              <span 
                className="text-xs font-bold px-2.5 py-0.5 border border-primary/40 bg-primary/10 text-primary font-mono"
                style={{ borderRadius: '2px' }}
              >
                {levelDisplay}
              </span>
            </div>
            <p className="text-xs text-outline mt-0.5 font-serif">
              {t('dashboard:skillsSection.subtitle')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div 
            className="px-3.5 py-1.5 bg-surface-container-high/70 border border-outline-variant/60 text-on-surface flex items-center gap-2 shadow-2xs font-serif"
            style={{ borderRadius: '2px' }}
          >
            <Sparkles size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-xs font-semibold text-outline">
              {t('dashboard:skillsSection.overallProgress')}
            </span>
            <span className="text-sm font-bold text-primary font-mono">
              {modulesProgress.overallMasteryPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* 4 Cards Grid - Washi Editorial style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        {cards.map((card) => {
          const isComplete = card.percent >= 100;
          const translatedTitle = t(`dashboard:skillsSection.modules.${card.key}.title`, { defaultValue: card.title });
          const translatedSubtitle = t(`dashboard:skillsSection.modules.${card.key}.subtitle`, { defaultValue: card.subtitle });
          const translatedAction = t(`dashboard:skillsSection.modules.${card.key}.action`, { defaultValue: card.actionText });

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
              className={`group relative p-5 bg-gradient-to-br ${card.theme.gradient} border ${card.theme.border} ${card.theme.hoverBorder} hover:-translate-y-1 transition-all duration-300 cursor-pointer space-y-4 shadow-flat-sm overflow-hidden select-none flex flex-col justify-between`}
              style={{ borderRadius: '2px' }}
            >
              {/* Watermark Japanese Characters */}
              <div
                className={`absolute -right-3 -bottom-5 text-8xl md:text-9xl font-black font-serif select-none pointer-events-none transition-transform duration-500 group-hover:scale-105 ${card.theme.watermarkColor}`}
              >
                {card.japaneseWatermark}
              </div>

              {/* Header: Tag & Percentage */}
              <div className="space-y-3 z-10 font-serif">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 uppercase tracking-wider border border-current/20 ${card.theme.badgeBg}`}
                    style={{ borderRadius: '1px' }}
                  >
                    {t(`dashboard:skillsSection.modules.${card.key}.categoryTag`, { defaultValue: card.categoryTag })}
                  </span>

                  {isComplete ? (
                    <span 
                      className="text-xs font-bold px-2 py-0.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-2xs font-mono"
                      style={{ borderRadius: '1px' }}
                    >
                      <CheckCircle2 size={13} />
                      <span>100%</span>
                    </span>
                  ) : (
                    <span
                      className={`text-xs font-black px-2.5 py-0.5 bg-surface-container-lowest/80 border border-outline-variant/40 shadow-2xs font-mono ${card.theme.accentText}`}
                      style={{ borderRadius: '1px' }}
                    >
                      {card.percent}%
                    </span>
                  )}
                </div>

                {/* Icon & Title */}
                <div className="flex items-start gap-3.5 pt-1">
                  <div
                    className={`w-11 h-11 flex items-center justify-center font-bold text-lg shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0 ${card.theme.iconBg}`}
                    style={{ borderRadius: '2px' }}
                  >
                    {card.iconType === 'text' ? (
                      <span className="font-serif">{card.iconText}</span>
                    ) : card.iconName === 'BookOpen' ? (
                      <BookOpen size={20} />
                    ) : (
                      <Headphones size={20} />
                    )}
                  </div>

                  <div className="min-w-0 font-serif">
                    <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors tracking-tight line-clamp-1">
                      {translatedTitle}
                    </h3>
                    <p className="text-xs text-outline mt-0.5 line-clamp-1 leading-snug">
                      {translatedSubtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Count & Bar */}
              <div className="space-y-3 pt-2 z-10 border-t border-outline-variant/30 font-serif">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-outline">{t('dashboard:skillsSection.completionLabel')}</span>
                    <span className="font-bold text-on-surface font-mono">
                      <span className={card.theme.accentText}>{card.completed}</span> / {card.total}{' '}
                      <span className="text-xs text-outline font-normal font-serif">
                        {t(`dashboard:skillsSection.modules.${card.key}.unitLabel`, { defaultValue: card.unitLabel })}
                      </span>
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-surface-container-high/80 overflow-hidden" style={{ borderRadius: '1px' }}>
                    <div
                      className={`h-full bg-gradient-to-r ${card.theme.progressGradient} transition-all duration-700 ease-out`}
                      style={{
                        width: `${Math.max(card.percent > 0 ? 6 : 0, Math.min(100, card.percent))}%`,
                      }}
                    />
                  </div>
                </div>

                {/* CTA Button */}
                <div
                  className={`w-full py-2 px-3.5 text-xs font-bold transition-all duration-200 flex items-center justify-between border border-outline-variant/40 shadow-flat-sm ${card.theme.actionBtn}`}
                  style={{ borderRadius: '2px' }}
                >
                  <span className="font-serif">{translatedAction}</span>
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
