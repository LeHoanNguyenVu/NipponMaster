import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
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
  type ReadingToken,
  type ReadingVersionDetail,
} from '../../../api/readingApi';
import { useSentenceAudio } from '../hooks/useSentenceAudio';
import AudioBar from './AudioBar';
import KeyVocabPanel from './KeyVocabPanel';

interface ArticleReaderProps {
  versionId: number;
  userLevel: string;
  onBack: () => void;
  onSwitchVersion: (nextVersionId: number) => void;
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
}: ArticleReaderProps) {
  const { t, i18n } = useTranslation('reading');
  const targetLang: 'vi' | 'en' = (i18n.language || 'vi').startsWith('en') ? 'en' : 'vi';

  const [article, setArticle] = useState<ReadingVersionDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [furiganaMode, setFuriganaMode] = useState<FuriganaMode>('smart');
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<SelectedWordState | null>(null);
  const [completing, setCompleting] = useState<boolean>(false);
  const [completedToast, setCompletedToast] = useState<string | null>(null);

  const startedAtRef = useRef<number>(Date.now());
  const wordMeaningCacheRef = useRef<Map<string, string>>(new Map());
  const sentenceRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setSelectedWord(null);
    setCompletedToast(null);
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

    return () => {
      cancelled = true;
    };
  }, [versionId, t]);

  const sentences = useMemo(() => article?.sentences || [], [article]);

  const audio = useSentenceAudio({
    sentences,
    audioStatus: article?.audioStatus || 'PENDING',
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
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
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
  }, [audio]);

  const userRank = LEVEL_RANK[(userLevel || 'N5').toUpperCase()] ?? 1;

  const shouldShowFurigana = (token: ReadingToken): boolean => {
    if (furiganaMode === 'off') return false;
    if (!HAS_KANJI_REGEX.test(token.s) || !token.r || token.r === token.s) return false;
    if (furiganaMode === 'all') return true;
    // Smart mode: chỉ hiện cho từ/Kanji khó hơn cấp độ hiện tại của học viên (hoặc chưa rõ cấp độ)
    const tokenRank = token.lv ? (LEVEL_RANK[token.lv.toUpperCase()] ?? 5) : 5;
    return tokenRank > userRank;
  };

  const handleWordClick = async (token: ReadingToken, e: React.MouseEvent) => {
    e.stopPropagation();
    // Bỏ qua dấu câu/khoảng trắng
    if (!token.s.trim() || token.pos?.startsWith('記号')) return;

    const lookupKey = token.l || token.s;

    // 1. Ưu tiên tra tức thì từ keyVocab của bài
    const kvHit = article?.keyVocab?.find(
      (kv) => kv.word === token.s || kv.word === token.l || kv.word.includes(token.s)
    );
    if (kvHit?.meaningVi) {
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
      setCompletedToast(t('reader.completedToast', { total: res.totalCompleted }));
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4 animate-pulse">
        <div className="h-5 w-36 bg-surface-container" />
        <div className="h-10 w-3/4 bg-surface-container" />
        <div className="h-64 bg-surface-container-lowest border border-outline-variant/50 p-6" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center font-serif space-y-3">
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-10 font-serif">
      {/* Top Navigation & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} />
          {t('reader.back')}
        </button>

        {/* Furigana Mode & Translation Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div
            className="inline-flex items-center border border-outline-variant/60 bg-surface-container-lowest p-0.5"
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
                    : 'text-on-surface-variant hover:bg-surface-container'
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
                : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/60 hover:bg-surface-container'
            }`}
            style={{ borderRadius: '2px' }}
          >
            <Languages size={14} />
            {showTranslation ? t('reader.hideTranslation') : t('reader.showTranslation')}
          </button>
        </div>
      </div>

      {/* Main Editorial Washi Reading Sheet */}
      <article
        className="max-w-3xl mx-auto bg-surface-container-lowest border border-outline-variant/60 shadow-xs px-5 sm:px-8 py-6 sm:py-8 mb-6"
        style={{ borderRadius: '2px' }}
      >
        {/* Meta badges + Same-event Level Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-outline-variant/40">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="px-2.5 py-0.5 text-xs font-bold bg-primary text-on-primary"
              style={{ borderRadius: '2px' }}
            >
              {article.jlptLevel}
            </span>
            <span
              className="px-2.5 py-0.5 text-xs bg-surface-container text-on-surface-variant"
              style={{ borderRadius: '2px' }}
            >
              {t(`categories.${article.category}`, { defaultValue: article.category })}
            </span>
            <span className="text-xs text-outline">
              {t('card.minutes', { count: article.estimatedMinutes })} ·{' '}
              {t('card.chars', { count: article.charCount })}
            </span>
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
                        ? 'bg-primary/15 text-primary border-primary cursor-default'
                        : 'bg-surface-bright text-on-surface-variant border-outline-variant/60 hover:border-primary hover:text-primary cursor-pointer'
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

        {/* Article Title */}
        <h1 className="font-jp text-2xl sm:text-3xl font-bold text-on-surface leading-snug mb-2">
          {article.titleJa}
        </h1>
        {article.titleVi && (
          <p className="text-sm text-on-surface-variant mb-5">{article.titleVi}</p>
        )}

        {/* Pre-teaching Key Vocabulary */}
        <KeyVocabPanel keyVocab={article.keyVocab} />

        {/* Hint bar */}
        <p className="text-[11px] text-outline mb-4 flex flex-wrap items-center justify-between gap-2">
          <span>{t('reader.clickSentenceHint')}</span>
          <span className="hidden sm:inline">{t('reader.keyboardHint')}</span>
        </p>

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

        {/* Sentences Body with Pure React <ruby> / <rt> & Karaoke Highlight */}
        <div className="space-y-3" data-reading-body="true">
          {sentences.map((sentence, idx) => {
            const isActive = idx === audio.activeIdx && audio.isPlaying;
            const isSelected = idx === audio.activeIdx;
            const tokens = sentence.tokens && sentence.tokens.length > 0 ? sentence.tokens : null;

            return (
              <div
                key={sentence.idx}
                ref={(el) => {
                  sentenceRefs.current[idx] = el;
                }}
                onClick={() => audio.playSentence(idx)}
                className={`group relative pl-4 pr-3 py-2.5 border-l-3 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-primary/8 border-primary'
                    : isSelected
                    ? 'bg-surface-container-low/70 border-primary/40'
                    : 'border-transparent hover:bg-surface-container-low/50 hover:border-outline-variant'
                }`}
                style={{ borderRadius: '1px' }}
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
                        : 'text-outline/50 group-hover:text-primary'
                    }`}
                  >
                    {isActive ? <Volume2 size={15} /> : <Play size={13} />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className="font-jp text-lg sm:text-xl leading-[2.35] text-on-surface tracking-wide">
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
        <div className="mt-8 pt-6 border-t border-outline-variant/50 flex flex-col sm:flex-row items-center justify-between gap-3">
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

        {/* Legal Attribution Footer (2 mẫu đã chốt ở Phase 0 cho Production) */}
        <footer className="mt-6 pt-4 border-t border-outline-variant/40 text-[11px] text-outline leading-relaxed flex flex-wrap items-center justify-between gap-2">
          <span>
            {article.sourceLicense === 'PDL_1_0'
              ? t('reader.attribution.pdl', { source: article.sourceName })
              : t('reader.attribution.factsOnly', { source: article.sourceName })}
          </span>
          {article.sourceUrl && (
            <a
              href={article.sourceUrl}
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

      {/* Sticky Audio Bar */}
      <AudioBar
        activeIdx={audio.activeIdx}
        totalSentences={sentences.length}
        isPlaying={audio.isPlaying}
        playbackRate={audio.playbackRate}
        repeatSentence={audio.repeatSentence}
        usingFallback={audio.usingFallback}
        voiceName={article.voiceName}
        onTogglePlay={audio.togglePlay}
        onPrev={audio.prev}
        onNext={audio.next}
        onRateChange={audio.setPlaybackRate}
        onToggleRepeat={audio.toggleRepeat}
      />
    </div>
  );
}
