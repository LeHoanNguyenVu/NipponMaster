import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Languages,
  Play,
  Volume2,
  X,
  AlertCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  readingApi,
  type ReadingArticleCard,
  type ReadingToken,
  type ReadingVersionDetail,
} from '../../../api/readingApi';
import { useSentenceAudio } from '../hooks/useSentenceAudio';
import { useTextSelectionPopup } from '../../../hooks/useTextSelectionPopup';
import { getUserScope } from '../../../utils/userScope';
import AudioBar from './AudioBar';
import SelectionToolbar from './SelectionToolbar';
import NewspaperVisual, { formatRelativeTime } from './NewspaperVisual';

interface ArticleReaderProps {
  versionId: number;
  userLevel: string;
  onBack: () => void;
  onSwitchVersion: (nextVersionId: number) => void;
  onNavigateToTranslation?: () => void;
}

type FuriganaMode = 'smart' | 'all' | 'off';

const LEVEL_RANK: Record<string, number> = {
  STARTER: 0,
  N5: 1,
  N4: 2,
  N3: 3,
  N2: 4,
  N1: 5,
};

const HAS_KANJI_REGEX = /[\u4E00-\u9FFF]/;

interface SelectedWordState {
  token: ReadingToken;
  meaning: string | null;
  loading: boolean;
}

export default function ArticleReader({
  versionId,
  userLevel,
  onBack,
  onSwitchVersion,
  onNavigateToTranslation,
}: ArticleReaderProps) {
  const { t, i18n } = useTranslation('reading');
  const targetLang: 'vi' | 'en' = (i18n.language || 'vi').startsWith('en') ? 'en' : 'vi';

  const [article, setArticle] = useState<ReadingVersionDetail | null>(null);
  const [latestNews, setLatestNews] = useState<ReadingArticleCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [furiganaMode, setFuriganaMode] = useState<FuriganaMode>('smart');
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<SelectedWordState | null>(null);
  const [completing, setCompleting] = useState<boolean>(false);
  const [completedToast, setCompletedToast] = useState<string | null>(null);
  const [finishedAudioPrompt, setFinishedAudioPrompt] = useState<boolean>(false);

  const startedAtRef = useRef<number>(Date.now());
  const wordMeaningCacheRef = useRef<Map<string, string>>(new Map());
  const sentenceRefs = useRef<Array<HTMLDivElement | null>>([]);
  const readerContainerRef = useRef<HTMLDivElement>(null);
  const readingBodyRef = useRef<HTMLDivElement>(null);
  const selectionToolbarRef = useRef<HTMLDivElement>(null);

  const { selection: textSelection, clearSelection } = useTextSelectionPopup({
    containerRef: readerContainerRef,
    scopeRef: readingBodyRef,
    popupRef: selectionToolbarRef,
    maxLength: 200,
    estimatedWidth: 336,
    estimatedHeight: 40,
    minTopPadding: 8,
    enabled: !loading && !error && !!article,
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setSelectedWord(null);
    setCompletedToast(null);
    setFinishedAudioPrompt(false);
    startedAtRef.current = Date.now();

    readingApi
      .getVersionDetail(versionId)
      .then((data) => {
        if (!cancelled) {
          setArticle(data);
        }
      })
      .catch(() => {
        if (!cancelled) setError(t('list.loadError'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // Nạp danh sách "Tin mới nhất" cho cột phải (giống bố cục trang chi tiết NHK)
    readingApi
      .listArticles({ level: 'ALL', page: 0, size: 6 })
      .then((res) => {
        if (!cancelled) {
          setLatestNews((res.items || []).filter((it) => it.versionId !== versionId).slice(0, 5));
        }
      })
      .catch(() => {
        if (!cancelled) setLatestNews([]);
      });

    return () => {
      cancelled = true;
    };
  }, [versionId, t]);

  const sentences = useMemo(() => article?.sentences || [], [article]);

  const audio = useSentenceAudio({
    sentences,
    audioStatus: article?.audioStatus || 'PENDING',
    onFinishedAll: () => {
      if (article && !article.completed) {
        setFinishedAudioPrompt(true);
      }
    },
  });

  // Cuộn mượt câu đang phát vào giữa màn hình (karaoke sync)
  useEffect(() => {
    if (!audio.isPlaying) return;
    const el = sentenceRefs.current[audio.activeIdx];
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [audio.activeIdx, audio.isPlaying]);

  // Điều khiển bàn phím: Space = Play/Pause, ← / → = Câu trước/sau
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        target &&
        (tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          tag === 'BUTTON' ||
          tag === 'A' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        audio.togglePlay();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        audio.prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        audio.next();
      } else if (e.key === 'Escape') {
        setSelectedWord(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [audio.togglePlay, audio.prev, audio.next]);

  // Chỉ chấp nhận sourceUrl giao thức https:// để chặn javascript:/data: URL
  const safeSourceUrl = useMemo(() => {
    if (!article?.sourceUrl) return null;
    try {
      const parsed = new URL(article.sourceUrl);
      return parsed.protocol === 'https:' ? parsed.toString() : null;
    } catch {
      return null;
    }
  }, [article?.sourceUrl]);

  const userRank = LEVEL_RANK[(userLevel || 'N5').toUpperCase()] ?? 1;

  const shouldShowFurigana = (token: ReadingToken): boolean => {
    if (furiganaMode === 'off') return false;
    if (!HAS_KANJI_REGEX.test(token.s) || !token.r || token.r === token.s) return false;
    if (furiganaMode === 'all') return true;
    const tokenRank = token.lv ? (LEVEL_RANK[token.lv.toUpperCase()] ?? 5) : 5;
    return tokenRank > userRank;
  };

  const handleWordClick = async (token: ReadingToken, e: React.MouseEvent) => {
    if (window.getSelection()?.toString().trim()) return;
    e.stopPropagation();
    if (!token.s.trim() || token.pos?.startsWith('記号')) return;

    const lookupKey = token.l || token.s;

    // 1. Tra ngầm từ keyVocab của bài (không hiện hộp từ vựng trước bài đọc)
    const kvHit = article?.keyVocab?.find(
      (kv) => kv.word === token.s || kv.word === token.l
    );
    if (targetLang === 'vi' && kvHit?.meaningVi) {
      setSelectedWord({ token, meaning: kvHit.meaningVi, loading: false });
      return;
    }

    // 2. Tra từ cache phiên
    const cached = wordMeaningCacheRef.current.get(`${targetLang}:${lookupKey}`);
    if (cached) {
      setSelectedWord({ token, meaning: cached, loading: false });
      return;
    }

    // 3. Gọi dịch nhanh /api/v1/translate/fast
    setSelectedWord({ token, meaning: null, loading: true });
    try {
      const meaning = await readingApi.quickTranslate(lookupKey, targetLang);
      if (meaning) {
        wordMeaningCacheRef.current.set(`${targetLang}:${lookupKey}`, meaning);
      }
      setSelectedWord((prev) =>
        prev && prev.token === token ? { token, meaning: meaning || null, loading: false } : prev
      );
    } catch {
      setSelectedWord((prev) =>
        prev && prev.token === token ? { token, meaning: null, loading: false } : prev
      );
    }
  };

  const handleMarkComplete = async () => {
    if (!article || completing) return;
    setCompleting(true);
    try {
      const elapsedSec = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000));
      const res = await readingApi.completeVersion(article.versionId, elapsedSec);
      setArticle((prev) => (prev ? { ...prev, completed: true } : prev));
      setFinishedAudioPrompt(false);
      setCompletedToast(t('reader.completedToast', { total: res.totalCompleted }));
      try {
        const scope = getUserScope();
        localStorage.removeItem(`${scope}nippon_student_stats_v3`);
        localStorage.removeItem('nippon_student_stats_v3');
      } catch {}
    } catch {
      setCompletedToast(t('list.loadError'));
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-surface-container-lowest min-h-[calc(100vh-4rem)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
          <div className="lg:col-span-8 space-y-4">
            <div className="h-9 w-5/6 bg-surface-container" />
            <div className="h-44 w-full bg-surface-container" />
            <div className="h-64 w-full bg-surface-container" />
          </div>
          <div className="lg:col-span-4 space-y-4">
            <div className="h-6 w-32 bg-surface-container" />
            <div className="h-20 w-full bg-surface-container" />
            <div className="h-20 w-full bg-surface-container" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="bg-surface-container-lowest min-h-[calc(100vh-4rem)] px-4 py-14 text-center space-y-3">
        <AlertCircle size={28} className="mx-auto text-error" />
        <p className="text-sm text-on-surface">{error || t('list.loadError')}</p>
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-xs font-bold bg-primary text-on-primary cursor-pointer"
          style={{ borderRadius: '2px' }}
        >
          {t('reader.back')}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest min-h-[calc(100vh-4rem)] font-sans">
      <div
        ref={readerContainerRef}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-14"
      >
        <SelectionToolbar
          selection={textSelection}
          popupRef={selectionToolbarRef}
          jlptLevel={article.jlptLevel}
          targetLang={targetLang}
          keyVocab={article.keyVocab}
          sentences={sentences}
          onClearSelection={clearSelection}
          onNavigateToTranslation={onNavigateToTranslation}
        />

        {/* NHK-style Top News Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-7 border-b-2 border-on-surface">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline cursor-pointer"
            >
              <ArrowLeft size={15} />
              <span>News</span>
            </button>
            <span className="text-outline">/</span>
            <span className="text-sm font-bold text-on-surface">
              {t(`categories.${article.category}`, { defaultValue: article.category })}
            </span>
          </div>

          {/* Inline Furigana & Translation Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div
              className="inline-flex items-center border border-outline-variant/60 bg-surface-container-low p-0.5"
              style={{ borderRadius: '2px' }}
              role="group"
              aria-label={t('reader.furiganaLabel')}
            >
              {(
                [
                  { id: 'smart', label: t('reader.furiganaSmart') },
                  { id: 'all', label: t('reader.furiganaAll') },
                  { id: 'off', label: t('reader.furiganaOff') },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFuriganaMode(opt.id)}
                  className={`px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                    furiganaMode === opt.id
                      ? 'bg-primary text-on-primary font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  style={{ borderRadius: '1px' }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowTranslation((v) => !v)}
              aria-pressed={showTranslation}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border transition-colors cursor-pointer ${
                showTranslation
                  ? 'bg-secondary text-on-secondary border-secondary font-bold'
                  : 'bg-surface-container-low text-on-surface-variant border-outline-variant/60 hover:text-on-surface'
              }`}
              style={{ borderRadius: '2px' }}
            >
              <Languages size={14} />
              {showTranslation ? t('reader.hideTranslation') : t('reader.showTranslation')}
            </button>
          </div>
        </div>

        {/* 2-Column NHK Article Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 items-start">
          {/* Left Main Article Column (8 cols) */}
          <article className="lg:col-span-8 min-w-0">
            {/* Headline */}
            <h1 className="font-jp text-2xl sm:text-[30px] font-extrabold text-on-surface leading-[1.35] mb-2">
              {article.titleJa}
            </h1>
            {article.titleVi && (
              <p className="text-sm sm:text-base text-on-surface-variant mb-3.5 leading-relaxed">
                {article.titleVi}
              </p>
            )}

            {/* Byline + Same-Event JLPT Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-outline-variant/45 text-xs text-outline">
              <div className="flex items-center flex-wrap gap-2">
                <span>{formatRelativeTime(article.publishedAt, targetLang)}</span>
                <span>·</span>
                <span className="font-bold text-primary">{article.jlptLevel}</span>
                <span>·</span>
                <span>{t('card.minutes', { count: article.estimatedMinutes })}</span>
                <span>·</span>
                <span>{t('card.chars', { count: article.charCount })}</span>
              </div>

              {article.otherLevels && article.otherLevels.length > 1 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-outline">{t('reader.otherLevels')}</span>
                  {article.otherLevels.map((lv) => {
                    const isCurrent = lv.versionId === article.versionId;
                    return (
                      <button
                        key={lv.versionId}
                        type="button"
                        disabled={isCurrent}
                        onClick={() => onSwitchVersion(lv.versionId)}
                        className={`px-2 py-0.5 text-[11px] font-bold border transition-colors ${
                          isCurrent
                            ? 'bg-primary text-on-primary border-primary cursor-default'
                            : 'bg-surface-container-low text-on-surface-variant border-outline-variant/60 hover:border-primary hover:text-primary cursor-pointer'
                        }`}
                        style={{ borderRadius: '2px' }}
                      >
                        {lv.jlptLevel}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Editorial Cover + Docked Inline Audio Player (NHK style) */}
            <div className="space-y-3 mb-6">
              <NewspaperVisual
                category={article.category}
                jlptLevel={article.jlptLevel}
                sourceName={article.sourceName}
                audioStatus={article.audioStatus}
                coverImageUrl={article.coverImageUrl}
                coverImageCredit={article.coverImageCredit}
                alt={article.titleVi || article.titleJa}
                variant="article"
              />

              <AudioBar
                activeIdx={audio.activeIdx}
                totalSentences={sentences.length}
                isPlaying={audio.isPlaying}
                playbackRate={audio.playbackRate}
                repeatSentence={audio.repeatSentence}
                voiceName={article.voiceName}
                onTogglePlay={audio.togglePlay}
                onPrev={audio.prev}
                onNext={audio.next}
                onRateChange={audio.setPlaybackRate}
                onToggleRepeat={audio.toggleRepeat}
              />
            </div>

            {/* Inline Dictionary Popover when a word is clicked */}
            {selectedWord && (
              <div
                className="mb-5 p-3.5 bg-surface-container-low border-l-4 border-primary border-y border-r border-outline-variant/60 flex items-start justify-between gap-3"
                style={{ borderRadius: '2px' }}
                role="dialog"
                aria-label={selectedWord.token.s}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-jp text-lg font-bold text-on-surface">
                      {selectedWord.token.s}
                    </span>
                    {selectedWord.token.r && (
                      <span className="font-jp text-xs text-primary font-medium">
                        【{selectedWord.token.r}】
                      </span>
                    )}
                    {selectedWord.token.lv && (
                      <span
                        className="px-1.5 py-0.5 text-[10px] font-bold bg-primary/10 text-primary border border-primary/20"
                        style={{ borderRadius: '2px' }}
                      >
                        {selectedWord.token.lv}
                      </span>
                    )}
                    {selectedWord.token.l && selectedWord.token.l !== selectedWord.token.s && (
                      <span className="text-[11px] text-outline">
                        {t('reader.wordPopup.baseForm')}:{' '}
                        <span className="font-jp text-on-surface">{selectedWord.token.l}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    <span className="font-semibold">{t('reader.wordPopup.meaning')}: </span>
                    {selectedWord.loading
                      ? t('reader.wordPopup.translating')
                      : selectedWord.meaning || t('reader.wordPopup.noMeaning')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedWord(null)}
                  aria-label={t('reader.wordPopup.close')}
                  className="p-1 text-outline hover:text-on-surface cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            )}

            {/* Newspaper Body Paragraphs (Clean flowing prose with pure React <ruby>/<rt>) */}
            <div ref={readingBodyRef} className="space-y-4" data-reading-body="true">
              {sentences.map((sentence, idx) => {
                const isActive = idx === audio.activeIdx && audio.isPlaying;
                const isSelected = idx === audio.activeIdx;
                const tokens =
                  sentence.tokens && sentence.tokens.length > 0 ? sentence.tokens : null;

                return (
                  <div
                    key={sentence.idx}
                    ref={(el) => {
                      sentenceRefs.current[idx] = el;
                    }}
                    onClick={() => {
                      if (window.getSelection()?.toString().trim()) return;
                      audio.playSentence(idx);
                    }}
                    className={`group relative pl-3.5 pr-2 py-2 border-l-[3px] transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-primary/8 border-primary'
                        : isSelected
                        ? 'bg-surface-container-low/60 border-primary/40'
                        : 'border-transparent hover:bg-surface-container-low/40 hover:border-outline-variant/70'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          audio.playSentence(idx);
                        }}
                        aria-label={`${t('audio.play')} ${idx + 1}`}
                        className={`mt-2 shrink-0 p-1 transition-colors cursor-pointer ${
                          isActive
                            ? 'text-primary'
                            : 'text-outline/40 group-hover:text-primary'
                        }`}
                      >
                        {isActive ? <Volume2 size={15} /> : <Play size={13} />}
                      </button>

                      <div className="flex-1 min-w-0">
                        <p className="font-jp text-lg sm:text-[19px] leading-[2.3] text-on-surface tracking-wide">
                          {tokens
                            ? tokens.map((tk, tIdx) => {
                                const showRt = shouldShowFurigana(tk);
                                const isPunct = !tk.s.trim() || tk.pos?.startsWith('記号');
                                return (
                                  <span
                                    key={`${idx}-${tIdx}`}
                                    onClick={isPunct ? undefined : (e) => handleWordClick(tk, e)}
                                    className={
                                      isPunct
                                        ? undefined
                                        : 'hover:bg-primary/12 hover:text-primary transition-colors px-0.5 rounded-[2px]'
                                    }
                                  >
                                    {showRt ? (
                                      <ruby>
                                        {tk.s}
                                        <rt className="text-[10px] text-outline select-none font-normal">
                                          {tk.r}
                                        </rt>
                                      </ruby>
                                    ) : (
                                      tk.s
                                    )}
                                  </span>
                                );
                              })
                            : sentence.text}
                        </p>

                        {showTranslation && sentence.translationVi && (
                          <p className="mt-1.5 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/30 pt-1.5">
                            {sentence.translationVi}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Completion Action */}
            <div className="mt-8 pt-6 border-t border-outline-variant/50 space-y-3">
              {finishedAudioPrompt && !article.completed && (
                <div
                  role="status"
                  className="px-3.5 py-2.5 bg-secondary/10 border border-secondary/35 text-xs text-on-surface flex flex-wrap items-center justify-between gap-2"
                  style={{ borderRadius: '2px' }}
                >
                  <span className="font-semibold">{t('reader.finishedAudioHint')}</span>
                  <button
                    type="button"
                    onClick={handleMarkComplete}
                    disabled={completing}
                    className="px-3 py-1 bg-secondary text-on-secondary font-bold cursor-pointer hover:opacity-95 disabled:opacity-50"
                    style={{ borderRadius: '2px' }}
                  >
                    {completing ? t('reader.completing') : t('reader.markComplete')}
                  </button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {article.completed ? (
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-secondary">
                    <CheckCircle2 size={18} />
                    <span>{t('reader.completedBadge')}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleMarkComplete}
                    disabled={completing}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-on-secondary hover:opacity-95 text-xs sm:text-sm font-bold cursor-pointer transition-opacity disabled:opacity-50 shadow-xs"
                    style={{ borderRadius: '2px' }}
                  >
                    <CheckCircle2 size={16} />
                    {completing ? t('reader.completing') : t('reader.markComplete')}
                  </button>
                )}
                {completedToast && (
                  <span className="text-xs font-semibold text-secondary">{completedToast}</span>
                )}
              </div>
            </div>

            {/* Legal Attribution Footer (2 mẫu đã chốt ở Phase 0 cho Production) */}
            <footer className="mt-6 pt-4 border-t border-outline-variant/40 text-[11px] text-outline leading-relaxed flex flex-wrap items-center justify-between gap-2">
              <span>
                {article.sourceLicense === 'PDL_1_0'
                  ? t('reader.attribution.pdl', { source: article.sourceName })
                  : t('reader.attribution.factsOnly', { source: article.sourceName })}
              </span>
              {safeSourceUrl && (
                <a
                  href={safeSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline font-semibold shrink-0"
                >
                  {t('reader.attribution.openSource')}
                  <ExternalLink size={11} />
                </a>
              )}
            </footer>
          </article>

          {/* Right Sidebar: "Tin mới nhất" (NHK Article Detail Right Rail) */}
          <aside className="lg:col-span-4 lg:border-l lg:border-outline-variant/40 lg:pl-7 space-y-4">
            <div className="border-b border-outline-variant/50">
              <h2 className="inline-block text-sm font-extrabold text-on-surface pb-2 border-b-[3px] border-primary">
                {t('reader.latestNewsTitle')}
              </h2>
            </div>

            {latestNews.length === 0 ? (
              <p className="text-xs text-outline py-4">{t('list.emptyTitle')}</p>
            ) : (
              <div className="divide-y divide-outline-variant/40">
                {latestNews.map((item) => (
                  <div
                    key={item.versionId}
                    onClick={() => onSwitchVersion(item.versionId)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSwitchVersion(item.versionId);
                      }
                    }}
                    className="group py-3.5 first:pt-1 flex items-start justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="font-jp text-[13px] font-bold text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-3">
                        {item.titleJa}
                      </h3>
                      <p className="text-[11px] text-outline">
                        {formatRelativeTime(item.publishedAt, targetLang)}
                      </p>
                    </div>

                    <NewspaperVisual
                      category={item.category}
                      jlptLevel={item.jlptLevel}
                      audioStatus={item.audioStatus}
                      coverImageUrl={item.coverImageUrl}
                      alt={item.titleVi || item.titleJa}
                      variant="thumb"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 px-7 py-2.5 rounded-full bg-on-surface text-surface text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
              >
                <span>{t('reader.viewAllNews')}</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
