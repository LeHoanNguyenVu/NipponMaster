import { useEffect, useRef, useState } from 'react';
import {
  Newspaper,
  CheckCircle2,
  Volume2,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { readingApi, type ReadingArticleCard } from '../../../api/readingApi';
import NewspaperVisual, { formatRelativeTime } from './NewspaperVisual';

interface ArticleListProps {
  defaultLevel: string;
  onSelectVersion: (versionId: number) => void;
}

const LEVEL_TABS = ['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const;
const CATEGORY_TABS = [
  'ALL',
  'SOCIETY',
  'LIFE',
  'ECONOMY',
  'SCI_TECH',
  'SPORTS',
  'CULTURE',
  'WEATHER',
] as const;

export default function ArticleList({ defaultLevel, onSelectVersion }: ArticleListProps) {
  const { t, i18n } = useTranslation('reading');
  const lang: 'vi' | 'en' = (i18n.language || 'vi').startsWith('en') ? 'en' : 'vi';

  const initialLevel = LEVEL_TABS.includes(defaultLevel as (typeof LEVEL_TABS)[number])
    ? defaultLevel
    : 'ALL';

  const [level, setLevel] = useState<string>(initialLevel);
  const [category, setCategory] = useState<string>('ALL');
  const [page, setPage] = useState<number>(0);
  const [items, setItems] = useState<ReadingArticleCard[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadTick, setReloadTick] = useState<number>(0);
  const initialMountRef = useRef<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    const isInitialMount = initialMountRef.current;
    initialMountRef.current = false;

    setLoading(true);
    setError(null);

    readingApi
      .listArticles({ level, category, page, size: 13 })
      .then((res) => {
        if (cancelled) return;
        if (isInitialMount && level !== 'ALL' && category === 'ALL' && res.items.length === 0) {
          setLevel('ALL');
          return;
        }
        setItems(res.items);
        setTotalItems(res.totalItems);
        setTotalPages(res.totalPages);
      })
      .catch(() => {
        if (!cancelled) setError(t('list.loadError'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [level, category, page, reloadTick, t]);

  const leadArticle = items[0] ?? null;
  const secondaryArticles = items.slice(1);

  return (
    <div className="bg-surface-container-lowest min-h-[calc(100vh-4rem)] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-12">
        {/* NHK-style Newspaper Masthead & Section Navigation */}
        <header className="mb-7">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-[28px] font-black tracking-tight text-primary">
                News
              </span>
              <span className="hidden sm:inline text-xs font-semibold text-outline tracking-wide">
                {t('title')}
              </span>
            </div>

            {/* Compact JLPT Level Selector */}
            <div
              className="inline-flex items-center border border-outline-variant/60 bg-surface-container-low p-0.5"
              style={{ borderRadius: '2px' }}
              role="tablist"
              aria-label="JLPT Level"
            >
              {LEVEL_TABS.map((lv) => {
                const active = level === lv;
                return (
                  <button
                    key={lv}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setLevel(lv);
                      setPage(0);
                    }}
                    className={`px-2.5 py-1 text-xs font-bold transition-colors cursor-pointer ${
                      active
                        ? 'bg-primary text-on-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    style={{ borderRadius: '1px' }}
                  >
                    {t(`levels.${lv}`)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Horizontal Category Bar with NHK Crimson Underline & Crisp 2px Ink Rule */}
          <nav
            aria-label="News Categories"
            className="flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar border-b-2 border-on-surface"
          >
            {CATEGORY_TABS.map((cat) => {
              const active = category === cat;
              const label =
                cat === 'ALL'
                  ? t('categories.LATEST', { defaultValue: t('categories.ALL') })
                  : t(`categories.${cat}`);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategory(cat);
                    setPage(0);
                  }}
                  className={`relative pb-2.5 pt-1 text-sm whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'font-bold text-on-surface'
                      : 'font-medium text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-primary" />
                  )}
                </button>
              );
            })}
          </nav>
        </header>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
            <div className="lg:col-span-5 space-y-3">
              <div className="aspect-[16/10] bg-surface-container" />
              <div className="h-7 w-5/6 bg-surface-container" />
              <div className="h-4 w-1/3 bg-surface-container" />
              <div className="h-12 w-full bg-surface-container" />
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex gap-3 pb-4 border-b border-outline-variant/40">
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-full bg-surface-container" />
                    <div className="h-4 w-2/3 bg-surface-container" />
                  </div>
                  <div className="w-24 h-16 bg-surface-container shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-8 border border-error/30 bg-error-container/20 text-center space-y-3">
            <AlertCircle size={24} className="mx-auto text-error" />
            <p className="text-sm text-on-surface">{error}</p>
            <button
              type="button"
              onClick={() => setReloadTick((n) => n + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-primary text-on-primary cursor-pointer"
              style={{ borderRadius: '2px' }}
            >
              <RefreshCw size={14} />
              {t('list.retry')}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && items.length === 0 && (
          <div className="py-16 text-center space-y-2.5 border-b border-outline-variant/40">
            <Newspaper size={28} className="mx-auto text-outline" />
            <h3 className="text-base font-bold text-on-surface">{t('list.emptyTitle')}</h3>
            <p className="text-xs text-on-surface-variant max-w-md mx-auto">{t('list.emptyDesc')}</p>
            {(level !== 'ALL' || category !== 'ALL') && (
              <button
                type="button"
                onClick={() => {
                  setLevel('ALL');
                  setCategory('ALL');
                  setPage(0);
                }}
                className="mt-2 px-4 py-2 text-xs font-bold bg-primary text-on-primary cursor-pointer"
                style={{ borderRadius: '2px' }}
              >
                {t('list.resetFilter')}
              </button>
            )}
          </div>
        )}

        {/* NHK-style 3-Column Newspaper Frontpage */}
        {!loading && !error && leadArticle && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Hero Story (Col 1–5) */}
              <article
                onClick={() => onSelectVersion(leadArticle.versionId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectVersion(leadArticle.versionId);
                  }
                }}
                className="lg:col-span-5 group cursor-pointer space-y-3.5 pb-6 lg:pb-0 border-b lg:border-b-0 border-outline-variant/50"
              >
                <NewspaperVisual
                  category={leadArticle.category}
                  jlptLevel={leadArticle.jlptLevel}
                  sourceName={leadArticle.sourceName}
                  audioStatus={leadArticle.audioStatus}
                  coverImageUrl={leadArticle.coverImageUrl}
                  coverImageCredit={leadArticle.coverImageCredit}
                  alt={leadArticle.titleVi || leadArticle.titleJa}
                  variant="hero"
                />

                <div className="space-y-2">
                  <h2 className="font-jp text-xl sm:text-2xl font-extrabold text-on-surface group-hover:text-primary transition-colors leading-snug">
                    {leadArticle.titleJa}
                  </h2>

                  <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1 text-xs text-outline">
                    <span>{formatRelativeTime(leadArticle.publishedAt, lang)}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} />
                      {t('card.minutes', { count: leadArticle.estimatedMinutes })}
                    </span>
                    {leadArticle.completed && (
                      <span className="inline-flex items-center gap-1 font-semibold text-secondary">
                        <CheckCircle2 size={13} />
                        {t('card.completed')}
                      </span>
                    )}
                  </div>

                  {leadArticle.titleVi && (
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {leadArticle.titleVi}
                    </p>
                  )}
                </div>
              </article>

              {/* Right 2-Column News Wire (Col 6–12) */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-7">
                {secondaryArticles.map((card) => (
                  <article
                    key={card.versionId}
                    onClick={() => onSelectVersion(card.versionId)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectVersion(card.versionId);
                      }
                    }}
                    className="group cursor-pointer py-4 first:pt-0 md:nth-[2]:pt-0 border-b border-outline-variant/45 flex items-start justify-between gap-3.5"
                  >
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <h3 className="font-jp text-[15px] font-bold text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-3">
                        {card.titleJa}
                      </h3>

                      {card.titleVi && (
                        <p className="text-xs text-on-surface-variant line-clamp-1">
                          {card.titleVi}
                        </p>
                      )}

                      <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-outline pt-0.5">
                        <span>{formatRelativeTime(card.publishedAt, lang)}</span>
                        <span className="inline-flex items-center gap-0.5">
                          <Volume2
                            size={11}
                            className={card.audioStatus === 'READY' ? 'text-primary' : 'text-outline'}
                          />
                          {card.voiceName}
                        </span>
                        {card.completed && (
                          <span className="inline-flex items-center gap-0.5 font-semibold text-secondary">
                            <CheckCircle2 size={11} />
                            {t('card.completed')}
                          </span>
                        )}
                      </div>
                    </div>

                    <NewspaperVisual
                      category={card.category}
                      jlptLevel={card.jlptLevel}
                      audioStatus={card.audioStatus}
                      coverImageUrl={card.coverImageUrl}
                      alt={card.titleVi || card.titleJa}
                      variant="thumb"
                    />
                  </article>
                ))}
              </div>
            </div>

            {/* Footer Meta & Pagination */}
            <div className="mt-8 pt-4 border-t border-outline-variant/40 flex flex-wrap items-center justify-between gap-3 text-xs text-outline">
              <span>
                {t('list.showing', { count: items.length, total: totalItems })} ·{' '}
                {t('list.retentionNote')}
              </span>

              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={page <= 0}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    aria-label="Previous page"
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold border border-outline-variant/60 text-on-surface hover:border-primary disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    style={{ borderRadius: '2px' }}
                  >
                    <ChevronLeft size={14} />
                    <span>{page}</span>
                  </button>
                  <span className="font-mono text-xs">
                    {page + 1} / {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    aria-label="Next page"
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold border border-outline-variant/60 text-on-surface hover:border-primary disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    style={{ borderRadius: '2px' }}
                  >
                    <span>{page + 2}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
