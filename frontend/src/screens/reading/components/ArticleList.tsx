import { useEffect, useState } from 'react';
import { Newspaper, CheckCircle2, Clock, Volume2, RefreshCw, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { readingApi, type ReadingArticleCard } from '../../../api/readingApi';

interface ArticleListProps {
  defaultLevel: string;
  onSelectVersion: (versionId: number) => void;
}

const LEVEL_TABS = ['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const;
const CATEGORY_CHIPS = [
  'ALL',
  'SOCIETY',
  'LIFE',
  'ECONOMY',
  'SCI_TECH',
  'SPORTS',
  'CULTURE',
  'WEATHER',
] as const;

const LEVEL_COLORS: Record<string, string> = {
  N5: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  N4: 'bg-teal-50 text-teal-800 border-teal-200',
  N3: 'bg-amber-50 text-amber-800 border-amber-200',
  N2: 'bg-orange-50 text-orange-800 border-orange-200',
  N1: 'bg-rose-50 text-rose-800 border-rose-200',
};

export default function ArticleList({ defaultLevel, onSelectVersion }: ArticleListProps) {
  const { t } = useTranslation('reading');

  const initialLevel = LEVEL_TABS.includes(defaultLevel as (typeof LEVEL_TABS)[number])
    ? defaultLevel
    : 'ALL';

  const [level, setLevel] = useState<string>(initialLevel);
  const [category, setCategory] = useState<string>('ALL');
  const [items, setItems] = useState<ReadingArticleCard[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [didFallbackAll, setDidFallbackAll] = useState<boolean>(false);

  const loadArticles = async (lv: string, cat: string, allowInitialFallback = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await readingApi.listArticles({ level: lv, category: cat, page: 0, size: 24 });
      if (allowInitialFallback && lv !== 'ALL' && cat === 'ALL' && res.items.length === 0 && !didFallbackAll) {
        // Nếu level mặc định của user (ví dụ N4/N2 ở MVP 3 cấp) chưa có bài, tự chuyển sang ALL để học viên thấy ngay bài sẵn có
        setDidFallbackAll(true);
        setLevel('ALL');
        const allRes = await readingApi.listArticles({ level: 'ALL', category: 'ALL', page: 0, size: 24 });
        setItems(allRes.items);
        setTotalItems(allRes.totalItems);
        return;
      }
      setItems(res.items);
      setTotalItems(res.totalItems);
    } catch {
      setError(t('list.loadError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles(level, category, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, category]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 font-serif">
      {/* Editorial Washi Masthead */}
      <header className="mb-6 pb-5 border-b border-outline-variant/60">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 bg-primary text-on-primary flex items-center justify-center shadow-xs"
            style={{ borderRadius: '2px' }}
          >
            <Newspaper size={20} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              {t('title')}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">{t('subtitle')}</p>
          </div>
        </div>
      </header>

      {/* Level Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3" role="tablist" aria-label="JLPT Level">
        {LEVEL_TABS.map((lv) => {
          const active = level === lv;
          return (
            <button
              key={lv}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setLevel(lv)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                active
                  ? 'bg-primary text-on-primary border-primary shadow-2xs'
                  : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/60 hover:bg-surface-container'
              }`}
              style={{ borderRadius: '2px' }}
            >
              {t(`levels.${lv}`)}
            </button>
          );
        })}
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap items-center gap-1.5 mb-6">
        {CATEGORY_CHIPS.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 text-xs border transition-colors cursor-pointer ${
                active
                  ? 'bg-secondary text-on-secondary border-secondary font-semibold'
                  : 'bg-surface-bright text-on-surface-variant border-outline-variant/50 hover:bg-surface-container'
              }`}
              style={{ borderRadius: '2px' }}
            >
              {t(`categories.${cat}`)}
            </button>
          );
        })}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-44 bg-surface-container-lowest border border-outline-variant/50 p-5 animate-pulse"
              style={{ borderRadius: '2px' }}
            >
              <div className="h-4 w-20 bg-surface-container mb-3" />
              <div className="h-6 w-5/6 bg-surface-container mb-2" />
              <div className="h-4 w-2/3 bg-surface-container mb-6" />
              <div className="h-3 w-1/2 bg-surface-container" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div
          className="p-6 bg-error-container/30 border border-error/40 text-center space-y-3"
          style={{ borderRadius: '2px' }}
        >
          <AlertCircle size={24} className="mx-auto text-error" />
          <p className="text-sm text-on-surface">{error}</p>
          <button
            type="button"
            onClick={() => loadArticles(level, category, false)}
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
        <div
          className="p-10 bg-surface-container-lowest border border-outline-variant/60 text-center space-y-2.5"
          style={{ borderRadius: '2px' }}
        >
          <Newspaper size={28} className="mx-auto text-outline" />
          <h3 className="text-base font-bold text-on-surface">{t('list.emptyTitle')}</h3>
          <p className="text-xs text-on-surface-variant max-w-md mx-auto">{t('list.emptyDesc')}</p>
          {(level !== 'ALL' || category !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                setLevel('ALL');
                setCategory('ALL');
              }}
              className="mt-2 px-4 py-2 text-xs font-bold bg-primary text-on-primary cursor-pointer"
              style={{ borderRadius: '2px' }}
            >
              {t('list.resetFilter')}
            </button>
          )}
        </div>
      )}

      {/* Article Cards Grid */}
      {!loading && !error && items.length > 0 && (
        <>
          <p className="text-xs text-outline mb-3">
            {t('list.showing', { count: items.length, total: totalItems })}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((card) => (
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
                className="group bg-surface-container-lowest border border-outline-variant/60 hover:border-primary/70 p-5 flex flex-col justify-between transition-all cursor-pointer shadow-2xs hover:shadow-md"
                style={{ borderRadius: '2px' }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`px-2 py-0.5 text-[11px] font-bold border ${
                          LEVEL_COLORS[card.jlptLevel] || 'bg-surface-container text-on-surface'
                        }`}
                        style={{ borderRadius: '2px' }}
                      >
                        {card.jlptLevel}
                      </span>
                      <span
                        className="px-2 py-0.5 text-[11px] bg-surface-container text-on-surface-variant"
                        style={{ borderRadius: '2px' }}
                      >
                        {t(`categories.${card.category}`, { defaultValue: card.category })}
                      </span>
                    </div>

                    {card.completed && (
                      <span
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary"
                        title={t('card.completed')}
                      >
                        <CheckCircle2 size={15} />
                        {t('card.completed')}
                      </span>
                    )}
                  </div>

                  <h2 className="font-jp text-lg font-bold text-on-surface group-hover:text-primary transition-colors leading-snug mb-1.5">
                    {card.titleJa}
                  </h2>
                  {card.titleVi && (
                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {card.titleVi}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-[11px] text-outline">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} />
                    {t('card.minutes', { count: card.estimatedMinutes })} ·{' '}
                    {t('card.chars', { count: card.charCount })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Volume2 size={12} className={card.audioStatus === 'READY' ? 'text-primary' : 'text-outline'} />
                    {card.voiceName === 'Puck' ? 'Puck' : 'Kore'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
