import { useEffect, useRef, useState, type RefObject } from 'react';
import {
  BookmarkPlus,
  Check,
  Languages,
  Loader2,
  Search,
  AlertCircle,
  X,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { readingApi, type ReadingKeyVocab, type ReadingSentence } from '../../../api/readingApi';
import { senseiApi } from '../../../api/senseiApi';
import { useAuthStore } from '../../../store/useAuthStore';
import type { TextSelectionPopupState } from '../../../hooks/useTextSelectionPopup';

export const TRANSLATION_PREFILL_STORAGE_KEY = 'nippon_translation_prefill';

interface SelectionToolbarProps {
  selection: TextSelectionPopupState | null;
  popupRef: RefObject<HTMLDivElement | null>;
  jlptLevel: string;
  targetLang: 'vi' | 'en';
  keyVocab?: ReadingKeyVocab[];
  sentences?: ReadingSentence[];
  onClearSelection: () => void;
  onNavigateToTranslation?: () => void;
}

interface QuickTranslatePopoverState {
  text: string;
  translation: string | null;
  loading: boolean;
  error: boolean;
  x: number;
  y: number;
}

interface ToastState {
  message: string;
  isError?: boolean;
}

export default function SelectionToolbar({
  selection,
  popupRef,
  jlptLevel,
  targetLang,
  keyVocab,
  sentences,
  onClearSelection,
  onNavigateToTranslation,
}: SelectionToolbarProps) {
  const { t } = useTranslation('reading');
  const { isAuthenticated } = useAuthStore();

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [popover, setPopover] = useState<QuickTranslatePopoverState | null>(null);

  const popoverRef = useRef<HTMLDivElement>(null);
  const translateCacheRef = useRef<Map<string, string>>(new Map());
  const toastTimerRef = useRef<number | null>(null);

  const showToast = (message: string, isError = false) => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToast({ message, isError });
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!popover) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPopover(null);
    };
    const onOutsidePointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (target && popoverRef.current?.contains(target)) return;
      setPopover(null);
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onOutsidePointer);
    window.addEventListener('touchstart', onOutsidePointer, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onOutsidePointer);
      window.removeEventListener('touchstart', onOutsidePointer);
    };
  }, [popover]);

  // Tận dụng keyVocab và token Kuromoji đã có trong bài để điền sẵn cách đọc/nghĩa khi lưu Flashcard
  const resolveLocalMeta = (word: string): { reading?: string; meaning?: string } => {
    const kv = keyVocab?.find((k) => k.word === word);
    let reading = kv?.reading || undefined;
    const meaning = targetLang === 'vi' && kv?.meaningVi ? kv.meaningVi : undefined;

    if (!reading && sentences) {
      for (const s of sentences) {
        const hit = s.tokens?.find((tk) => tk.s === word || tk.l === word);
        if (hit?.r) {
          reading = hit.r;
          break;
        }
      }
    }
    return { reading, meaning };
  };

  const handleSaveFlashcard = async () => {
    if (!selection || saving) return;
    const word = selection.text;

    if (!isAuthenticated) {
      onClearSelection();
      showToast(t('selectionToolbar.loginRequired'), true);
      return;
    }

    setSaving(true);
    try {
      const localMeta = resolveLocalMeta(word);
      const saved = await senseiApi.saveFlashcard({
        word,
        reading: localMeta.reading,
        meaning: localMeta.meaning,
        jlptLevel,
        language: targetLang,
      });
      onClearSelection();
      const msg = saved.reading
        ? t('selectionToolbar.savedToastWithReading', {
            word: saved.word,
            reading: saved.reading,
          })
        : t('selectionToolbar.savedToast', { word: saved.word });
      showToast(msg, false);
    } catch {
      showToast(t('selectionToolbar.saveError'), true);
    } finally {
      setSaving(false);
    }
  };

  const handleQuickTranslate = async () => {
    if (!selection) return;
    const text = selection.text;
    const posX = selection.x;
    const posY = selection.belowY;
    onClearSelection();

    const cacheKey = `${targetLang}:${text}`;
    const cached = translateCacheRef.current.get(cacheKey);
    if (cached) {
      setPopover({ text, translation: cached, loading: false, error: false, x: posX, y: posY });
      return;
    }

    setPopover({ text, translation: null, loading: true, error: false, x: posX, y: posY });
    try {
      const translated = await readingApi.quickTranslate(text, targetLang);
      if (translated) {
        translateCacheRef.current.set(cacheKey, translated);
        setPopover((prev) =>
          prev && prev.text === text
            ? { ...prev, translation: translated, loading: false, error: false }
            : prev
        );
      } else {
        setPopover((prev) =>
          prev && prev.text === text ? { ...prev, loading: false, error: true } : prev
        );
      }
    } catch {
      setPopover((prev) =>
        prev && prev.text === text ? { ...prev, loading: false, error: true } : prev
      );
    }
  };

  const handleAnalyze = () => {
    if (!selection) return;
    const text = selection.text;
    try {
      sessionStorage.setItem(TRANSLATION_PREFILL_STORAGE_KEY, text);
    } catch {
      // Bỏ qua nếu trình duyệt chặn sessionStorage
    }
    onClearSelection();
    onNavigateToTranslation?.();
  };

  return (
    <>
      {/* Floating Selection Toolbar */}
      {selection && (
        <div
          ref={popupRef}
          role="toolbar"
          aria-label={t('selectionToolbar.ariaLabel')}
          style={{ left: selection.x, top: selection.y, borderRadius: '2px' }}
          onMouseDown={(e) => {
            // Giữ nguyên selection đến khi click hoàn tất
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute z-50 inline-flex flex-wrap sm:flex-nowrap items-center bg-on-surface text-surface shadow-lg border border-outline-variant/40 divide-x divide-surface/15 max-w-[calc(100%-16px)]"
        >
          {selection.text.length <= 150 && (
            <button
              type="button"
              onClick={handleSaveFlashcard}
              disabled={saving}
              aria-label={t('selectionToolbar.saveFlashcard')}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold hover:bg-primary hover:text-on-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60"
            >
              {saving ? <Loader2 size={12} className="animate-spin" /> : <BookmarkPlus size={12} />}
              <span>{saving ? t('selectionToolbar.saving') : t('selectionToolbar.saveFlashcard')}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleQuickTranslate}
            aria-label={t('selectionToolbar.quickTranslate')}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold hover:bg-primary hover:text-on-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors cursor-pointer whitespace-nowrap"
          >
            <Languages size={12} />
            <span>{t('selectionToolbar.quickTranslate')}</span>
          </button>

          <button
            type="button"
            onClick={handleAnalyze}
            aria-label={t('selectionToolbar.analyze')}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold hover:bg-primary hover:text-on-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors cursor-pointer whitespace-nowrap"
          >
            <Search size={12} />
            <span>{t('selectionToolbar.analyze')}</span>
          </button>
        </div>
      )}

      {/* Inline Quick Translate Popover */}
      {popover && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label={t('selectionToolbar.quickTranslate')}
          style={{ left: Math.max(8, popover.x), top: Math.max(8, popover.y), borderRadius: '2px' }}
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute z-50 w-[min(340px,calc(100%-16px))] bg-surface-container-lowest border border-outline-variant/70 border-l-4 border-l-primary shadow-xl p-3.5 font-serif"
        >
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <span className="font-jp text-xs font-bold text-primary leading-snug break-words">
              {popover.text}
            </span>
            <button
              type="button"
              onClick={() => setPopover(null)}
              aria-label={t('selectionToolbar.closePopover')}
              className="p-0.5 text-outline hover:text-on-surface cursor-pointer shrink-0"
            >
              <X size={14} />
            </button>
          </div>

          {popover.loading ? (
            <div className="flex items-center gap-2 text-xs text-outline py-1">
              <Loader2 size={13} className="animate-spin text-primary" />
              <span>{t('selectionToolbar.translating')}</span>
            </div>
          ) : popover.error ? (
            <p className="text-xs text-error">{t('selectionToolbar.translateError')}</p>
          ) : (
            <p className="text-sm text-on-surface leading-relaxed">{popover.translation}</p>
          )}
        </div>
      )}

      {/* Save / Error Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{ borderRadius: '2px' }}
          className={`fixed bottom-24 right-5 z-50 px-4 py-2.5 border shadow-lg text-xs font-bold flex items-center gap-2 max-w-sm ${
            toast.isError
              ? 'bg-error-container text-on-error-container border-error/40'
              : 'bg-surface-container-lowest text-on-surface border-primary/50'
          }`}
        >
          {toast.isError ? (
            <AlertCircle size={15} className="text-error shrink-0" />
          ) : (
            <Check size={15} className="text-primary shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </>
  );
}
