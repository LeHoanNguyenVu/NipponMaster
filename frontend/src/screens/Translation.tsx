import { useState, useEffect, useRef } from 'react';
import {
  Languages,
  Sparkles,
  FileText,
  Loader2,
  BookOpen,
  Copy,
  Check,
  Info,
  ArrowLeftRight,
  Volume2,
  History,
  Trash2,
  X
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import axiosClient from '../api/axiosClient';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface WordAnalysis {
  word: string;
  reading: string;
  meaning: string;
  partOfSpeech: string;
  sinoVietnamese?: string;
}

interface TranslateResponse {
  originalText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  pronunciation?: string;
  words?: WordAnalysis[];
  grammarNotes?: string;
  detectedLevel?: string;
}

interface TranslationHistoryItem {
  id: string;
  text: string;
  sourceLang: string;
  targetLang: string;
  translatedText: string;
  timestamp: number;
}

const SAMPLE_SENTENCES: Record<string, string[]> = {
  ja: [
    '毎日ご飯を食べます。',
    '学校に行きます。',
    '先生はやさしいです。',
    'お元気ですか。',
    '彼の一言に傷つけられたのかと思いきや、むしろそれをバネにして頑張った。'
  ],
  vi: [
    'Mỗi ngày tôi đều ăn cơm.',
    'Tôi đi đến trường.',
    'Thầy cô giáo rất hiền từ.',
    'Bạn có khỏe không?',
    'Mặc dù trời mưa to nhưng tôi vẫn quyết định đi đến thư viện học bài.'
  ],
  en: [
    'I eat rice every day.',
    'I go to school.',
    'The teacher is kind.',
    'How are you?',
    'Even though it was raining heavily, I decided to go to the library.'
  ]
};

const LANG_NAMES: Record<string, string> = {
  ja: 'Tiếng Nhật',
  vi: 'Tiếng Việt',
  en: 'Tiếng Anh'
};

const HISTORY_STORAGE_KEY = 'nipponmaster_translation_history';

export default function Translation() {
  const { t } = useTranslation(['translation', 'common']);
  const getLangName = (lang: string) => t(`translation:languages.${lang}`, LANG_NAMES[lang] || lang);

  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<TranslateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [sourceLang, setSourceLang] = useState('ja');
  const [targetLang, setTargetLang] = useState('vi');
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isTargetOpen, setIsTargetOpen] = useState(false);
  const [history, setHistory] = useState<TranslationHistoryItem[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (raw) {
        setHistory(JSON.parse(raw));
      }
    } catch (e) {
      console.warn('Could not load translation history', e);
    }
  }, []);

  // Save history helper
  const saveToHistory = (source: string, target: string, original: string, translated: string) => {
    try {
      setHistory((prev) => {
        const filtered = prev.filter((item) => item.text !== original);
        const updated: TranslationHistoryItem[] = [
          {
            id: Date.now().toString(),
            text: original,
            sourceLang: source,
            targetLang: target,
            translatedText: translated,
            timestamp: Date.now()
          },
          ...filtered
        ].slice(0, 10); // Giữ tối đa 10 lịch sử gần nhất
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.warn('Could not save translation history', e);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  };

  // Close custom dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#source-lang-select-btn') && !target.closest('#target-lang-select-btn')) {
        setIsSourceOpen(false);
        setIsTargetOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // ---------------- Dịch nhanh (stream) ----------------
  const streamRef = useRef<EventSource | null>(null);
  const lastTranslatedRef = useRef<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const stopStream = () => {
    streamRef.current?.close();
    streamRef.current = null;
  };

  useEffect(() => stopStream, []);

  const fastFallback = async (text: string, src: string, tgt: string) => {
    const response = await axiosClient.post<any, any>('/translate/fast', { text, sourceLang: src, targetLang: tgt });
    return response.data ?? response;
  };

  const handleTranslate = async (textToTranslate = inputText, src = sourceLang, tgt = targetLang) => {
    const trimmed = textToTranslate.trim();
    if (!trimmed) return;
    const key = `${src}>${tgt}:${trimmed}`;
    if (key === lastTranslatedRef.current && result?.translatedText) return;
    lastTranslatedRef.current = key;

    stopStream();
    setIsLoading(true);
    setIsStreaming(true);
    setError(null);

    const base = (import.meta.env.VITE_API_BASE_URL || '/api/v1') as string;
    const url = `${base}/translate/stream?text=${encodeURIComponent(trimmed)}&sourceLang=${src}&targetLang=${tgt}`;
    const es = new EventSource(url);
    streamRef.current = es;
    let acc = '';

    const finish = (translated: string) => {
      setIsLoading(false);
      setIsStreaming(false);
      setResult({ originalText: trimmed, translatedText: translated, sourceLang: src, targetLang: tgt });
      if (translated) {
        saveToHistory(src, tgt, trimmed, translated);
        try {
          sessionStorage.setItem(
            'nippon_sensei_translation_ctx',
            `Đoạn vừa dịch (${src}→${tgt}): "${trimmed}" => "${translated}"`
          );
        } catch { }
      }
    };

    es.addEventListener('chunk', (ev) => {
      if (streamRef.current !== es) return;
      acc += JSON.parse((ev as MessageEvent).data).text ?? '';
      setIsLoading(false);
      setResult({ originalText: trimmed, translatedText: acc, sourceLang: src, targetLang: tgt });
    });

    es.addEventListener('done', (ev) => {
      if (streamRef.current !== es) return;
      stopStream();
      const data = JSON.parse((ev as MessageEvent).data);
      if (data?.translatedText) {
        finish(data.translatedText);
      } else {
        setIsLoading(false);
        setIsStreaming(false);
        setError(t('translation:errorDefault', 'Hệ thống dịch AI tạm thời quá tải. Vui lòng thử lại sau.'));
      }
    });

    es.onerror = async () => {
      if (streamRef.current !== es) return;
      stopStream();
      try {
        const data = await fastFallback(trimmed, src, tgt);
        if (data?.translatedText) finish(data.translatedText);
        else throw new Error('empty');
      } catch (err: any) {
        setIsLoading(false);
        setIsStreaming(false);
        setError(
          err?.message ||
          t('translation:errorDefault', 'Đã xảy ra lỗi khi kết nối với hệ thống dịch thuật AI. Vui lòng thử lại sau.')
        );
      }
    };
  };

  // Gõ là dịch (debounce 500ms)
  useEffect(() => {
    if (!inputText.trim()) {
      stopStream();
      setResult(null);
      setIsLoading(false);
      setIsStreaming(false);
      lastTranslatedRef.current = '';
      try {
        sessionStorage.removeItem('nippon_sensei_translation_ctx');
      } catch { }
      return;
    }
    const timer = setTimeout(() => handleTranslate(inputText, sourceLang, targetLang), 250);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, sourceLang, targetLang]);

  // Phân tích chi tiết (furigana, từ vựng, ngữ pháp) – chạy riêng, không làm chậm bản dịch
  const handleDeepAnalyze = async () => {
    if (!result?.originalText) return;
    setIsAnalyzing(true);
    try {
      const response = await axiosClient.post<any, any>('/translate', {
        text: result.originalText,
        sourceLang: result.sourceLang,
        targetLang: result.targetLang
      });
      const data: TranslateResponse = response.data ?? response;
      setResult((prev) => (prev ? { ...prev, ...data, translatedText: prev.translatedText || data.translatedText } : data));
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = () => {
    if (!result?.translatedText) return;
    navigator.clipboard.writeText(result.translatedText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleSwapLanguages = () => {
    const prevSource = sourceLang;
    const prevTarget = targetLang;
    setSourceLang(prevTarget);
    setTargetLang(prevSource);

    setInputText(result?.translatedText || '');
    setResult(null);
  };

  const handleSourceLangChange = (lang: string) => {
    setSourceLang(lang);
    if (lang === targetLang) {
      setTargetLang(lang === 'ja' ? 'vi' : 'ja');
    }
    setResult(null);
  };

  const handleTargetLangChange = (lang: string) => {
    setTargetLang(lang);
    if (lang === sourceLang) {
      setSourceLang(lang === 'ja' ? 'vi' : 'ja');
    }
    setResult(null);
  };

  const handleSpeak = (text: string, lang = 'ja') => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ja' ? 'ja-JP' : (lang === 'vi' ? 'vi-VN' : 'en-US');
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
      setIsSpeaking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl + Enter or Cmd + Enter to trigger translate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleTranslate();
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto p-4 md:p-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
          {t('translation:title', 'Dịch thuật & Phân tích cú pháp AI')}
        </h1>
      </header>

      {/* Language Selector Bar */}
      <div className="flex items-center justify-center gap-3 bg-surface-container-low/70 backdrop-blur-md border border-outline-variant/40 p-3 rounded-2xl max-w-xl mx-auto shadow-sm">
        {/* Source Language Dropdown */}
        <div className="relative flex-1">
          <button
            id="source-lang-select-btn"
            onClick={() => {
              setIsSourceOpen(!isSourceOpen);
              setIsTargetOpen(false);
            }}
            className="w-full bg-surface-container-lowest border border-outline-variant/60 text-on-surface rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium cursor-pointer flex justify-between items-center shadow-xs"
          >
            <span className="font-semibold">{getLangName(sourceLang)}</span>
            <svg
              className={`w-4 h-4 text-on-surface-variant transition-transform ${isSourceOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {isSourceOpen && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute left-0 right-0 z-50 mt-1 bg-surface-container border border-outline-variant rounded-xl shadow-lg overflow-hidden"
              >
                {Object.keys(LANG_NAMES).map((code) => (
                  <button
                    key={code}
                    id={`source-lang-option-${code}`}
                    onClick={() => {
                      handleSourceLangChange(code);
                      setIsSourceOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/8 transition-colors cursor-pointer ${sourceLang === code ? 'text-primary font-bold bg-primary/4' : 'text-on-surface'
                      }`}
                  >
                    {getLangName(code)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Swap Button */}
        <button
          id="swap-lang-btn"
          onClick={handleSwapLanguages}
          className="p-2.5 bg-primary/8 hover:bg-primary/15 text-primary rounded-xl transition-all border border-primary/20 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center shrink-0"
          title={t('translation:swapTooltip', 'Đổi chiều ngôn ngữ')}
        >
          <ArrowLeftRight size={18} />
        </button>

        {/* Target Language Dropdown */}
        <div className="relative flex-1">
          <button
            id="target-lang-select-btn"
            onClick={() => {
              setIsTargetOpen(!isTargetOpen);
              setIsSourceOpen(false);
            }}
            className="w-full bg-surface-container-lowest border border-outline-variant/60 text-on-surface rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium cursor-pointer flex justify-between items-center shadow-xs"
          >
            <span className="font-semibold">{getLangName(targetLang)}</span>
            <svg
              className={`w-4 h-4 text-on-surface-variant transition-transform ${isTargetOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {isTargetOpen && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute left-0 right-0 z-50 mt-1 bg-surface-container border border-outline-variant rounded-xl shadow-lg overflow-hidden"
              >
                {Object.keys(LANG_NAMES).map((code) => (
                  <button
                    key={code}
                    id={`target-lang-option-${code}`}
                    onClick={() => {
                      handleTargetLangChange(code);
                      setIsTargetOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/8 transition-colors cursor-pointer ${targetLang === code ? 'text-primary font-bold bg-primary/4' : 'text-on-surface'
                      }`}
                  >
                    {getLangName(code)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Input Panel */}
        <div className="col-span-1 lg:col-span-6 space-y-4">
          <Card className="p-6 space-y-4 shadow-sm border border-outline-variant/50">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-on-surface-variant flex items-center gap-2">
                <Languages size={18} className="text-primary" />
                {t('translation:sourceLabel', {
                  lang: getLangName(sourceLang),
                  defaultValue: `Văn bản ${getLangName(sourceLang)} (Nguồn)`
                })}
              </span>
              <div className="flex items-center gap-3">
                {inputText.trim() && (
                  <button
                    onClick={() => {
                      setInputText('');
                      setResult(null);
                    }}
                    className="text-xs text-outline hover:text-error transition-colors flex items-center gap-1 cursor-pointer"
                    title="Xóa nội dung"
                  >
                    <X size={14} />
                    Xóa
                  </button>
                )}
                <span className="text-xs font-mono text-outline">
                  {t('translation:charCount', { count: inputText.length, defaultValue: `${inputText.length} ký tự` })}
                </span>
              </div>
            </div>

            <div className="relative">
              <textarea
                ref={textareaRef}
                id="translate-input-textarea"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('translation:inputPlaceholder', {
                  lang: getLangName(sourceLang).toLowerCase(),
                  sample: SAMPLE_SENTENCES[sourceLang]?.[0] || '',
                  defaultValue: `Nhập hoặc dán câu ${getLangName(sourceLang).toLowerCase()} vào đây...`
                })}
                className="w-full h-52 bg-surface-container-low text-on-surface border border-outline-variant/60 rounded-2xl p-4 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all text-lg font-jp resize-none leading-relaxed"
              />
            </div>
          </Card>

          {/* Translation History Drawer */}
          {history.length > 0 && (
            <Card className="p-4 bg-surface-container-low/40 border border-outline-variant/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                  <History size={14} className="text-primary" />
                  {t('translation:historyTitle', 'Lịch sử dịch gần đây')}
                </span>
                <button
                  onClick={clearHistory}
                  className="text-xs text-outline hover:text-error transition-colors flex items-center gap-1 cursor-pointer"
                  title={t('translation:clearHistory', 'Xóa lịch sử')}
                >
                  <Trash2 size={12} />
                  {t('translation:clearHistory', 'Xóa')}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => {
                      setInputText(h.text);
                      setSourceLang(h.sourceLang);
                      setTargetLang(h.targetLang);
                      handleTranslate(h.text, h.sourceLang, h.targetLang);
                    }}
                    className="text-left px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 hover:border-primary/40 hover:bg-primary/4 transition-all text-xs text-on-surface cursor-pointer group max-w-full"
                  >
                    <span className="font-medium text-primary font-mono text-[10px] uppercase mr-1">
                      {h.sourceLang}→{h.targetLang}:
                    </span>
                    <span className="text-on-surface group-hover:text-primary transition-colors font-jp truncate inline-block max-w-[180px] align-bottom">
                      {h.text}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Result Panel */}
        <div className="col-span-1 lg:col-span-6">
          <AnimatePresence>
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-[360px] bg-surface-container-lowest border border-outline-variant/50 rounded-2xl flex flex-col items-center justify-center p-6 space-y-4 shadow-sm"
              >
                <div className="relative">
                  <Loader2 size={44} className="text-primary animate-spin" />
                  <Sparkles size={18} className="text-secondary absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-on-surface font-bold text-base">
                    {t('translation:translatingFast', 'Đang dịch...')}
                  </p>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full bg-error-container/20 border border-error/30 text-error rounded-2xl p-6 flex gap-3 shadow-xs"
              >
                <Info size={22} className="shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold">{t('translation:errorTitle', 'Đã xảy ra lỗi')}</h4>
                  <p className="text-sm">{error}</p>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div
                key={result.originalText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="space-y-5"
              >
                {/* Translation Result Card */}
                <Card className="p-6 space-y-5 border-2 border-primary/15 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/4 rounded-full blur-3xl pointer-events-none" />

                  {/* Header bar of result: Language label & actions */}
                  <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                        <FileText size={15} className="text-primary" />
                        {t('translation:translationResult', {
                          lang: getLangName(targetLang),
                          defaultValue: `Bản dịch ${getLangName(targetLang)}`
                        })}
                      </span>
                    </div>

                    {/* Top action buttons */}
                    <div className="flex items-center gap-1.5">
                      {/* Audio speak for Japanese */}
                      <button
                        onClick={() => {
                          const textToSpeak = targetLang === 'ja' ? result.translatedText : result.originalText;
                          handleSpeak(textToSpeak, targetLang === 'ja' ? 'ja' : sourceLang);
                        }}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${isSpeaking
                            ? 'bg-primary text-on-primary border-primary'
                            : 'text-outline hover:text-primary hover:bg-surface-container-low border-transparent'
                          }`}
                        title={t('translation:listenAudio', 'Nghe phát âm')}
                      >
                        <Volume2 size={16} />
                      </button>

                      <button
                        onClick={handleCopy}
                        className="p-1.5 rounded-lg border border-transparent text-outline hover:text-primary hover:bg-surface-container-low transition-colors cursor-pointer"
                        title={t('translation:copyBtn', 'Sao chép bản dịch')}
                      >
                        {copiedText ? <Check size={16} className="text-secondary" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Furigana Display (Pronunciation HTML) */}
                  {result.pronunciation && (
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={14} className="fill-current" />
                        {sourceLang === 'ja'
                          ? t('translation:furiganaSource', 'Phiên âm Furigana (Văn bản gốc)')
                          : t('translation:furiganaTarget', 'Phiên âm Furigana (Văn bản dịch)')}
                      </span>
                      <div
                        className="text-2xl md:text-3xl font-jp leading-[2.6] text-on-surface tracking-wide p-4 bg-surface-container-low/50 rounded-2xl border border-outline-variant/30 select-text"
                        dangerouslySetInnerHTML={{ __html: result.pronunciation }}
                      />
                    </div>
                  )}

                  {/* Translation Text Result */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-medium text-outline">Nội dung đã dịch:</span>
                    <p className="text-xl md:text-2xl font-medium text-on-surface font-sans leading-relaxed select-text">
                      {result.translatedText}
                      {isStreaming && <span className="inline-block w-2 h-6 ml-1 align-middle bg-primary/70 animate-pulse rounded-sm" />}
                    </p>
                  </div>

                  {!isStreaming && !result.words?.length && !result.grammarNotes && (
                    <button
                      onClick={handleDeepAnalyze}
                      disabled={isAnalyzing}
                      className="w-full py-2.5 rounded-xl border border-dashed border-primary/40 text-primary text-sm font-bold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                      {isAnalyzing
                        ? t('translation:analyzingShort', 'Đang phân tích Furigana, từ vựng, ngữ pháp...')
                        : t('translation:deepAnalyzeBtn', 'Phân tích chi tiết (Furigana · Từ vựng · Ngữ pháp)')}
                    </button>
                  )}
                </Card>

                {/* AI Grammar & Nuance Notes Card */}
                {result.grammarNotes && result.grammarNotes.trim() && (
                  <Card className="p-5 border border-primary/20 bg-primary/3 rounded-2xl space-y-2.5 shadow-xs">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                      <Sparkles size={16} className="fill-primary/30" />
                      <span>{t('translation:grammarNotesTitle', 'Phân tích ngữ pháp & Sắc thái câu')}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line select-text">
                      {result.grammarNotes}
                    </p>
                  </Card>
                )}

                {/* Vocabulary Analysis Card */}
                {result.words && result.words.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-base md:text-lg font-bold text-on-surface flex items-center gap-2">
                      <BookOpen size={18} className="text-secondary" />
                      {t('translation:vocabTitle', {
                        count: result.words.length,
                        defaultValue: `Phân tích từ vựng tiếng Nhật (${result.words.length} từ)`
                      })}
                    </h3>
                    <div className="grid grid-cols-1 gap-2.5">
                      {result.words.map((w, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl hover:shadow-xs hover:border-secondary/30 transition-all gap-2"
                        >
                          <div className="space-y-1">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="text-xl font-jp font-bold text-on-surface">{w.word}</span>
                              {w.reading && w.reading !== w.word && (
                                <span className="text-xs text-primary font-medium font-jp">({w.reading})</span>
                              )}
                              {w.sinoVietnamese && (
                                <span className="px-2 py-0.5 rounded-md bg-secondary/10 text-secondary border border-secondary/20 text-xs font-semibold">
                                  Hán Việt: {w.sinoVietnamese}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-on-surface-variant font-medium">{w.meaning}</p>
                          </div>
                          {w.partOfSpeech && (
                            <span className="self-start sm:self-center px-2.5 py-1 bg-surface-container-low text-on-surface-variant rounded-lg text-xs font-bold font-mono tracking-wider shrink-0">
                              {w.partOfSpeech}
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="w-full h-[360px] bg-surface-container-lowest border border-outline-variant/30 rounded-2xl border-dashed flex flex-col items-center justify-center p-6 text-center text-outline">
                <div className="p-4 rounded-full bg-surface-container-low/60 mb-3">
                  <Languages size={40} className="opacity-50 text-primary" />
                </div>
                <h3 className="font-bold text-on-surface mb-1">
                  {t('translation:placeholderTitle', 'Kết quả hiển thị tại đây')}
                </h3>
                <p className="text-sm max-w-sm text-on-surface-variant">
                  {sourceLang === 'ja'
                    ? t(
                      'translation:placeholderSourceJa',
                      'Nhập văn bản tiếng Nhật ở khung bên trái và bấm dịch để nhận bản dịch chuẩn ngữ cảnh, Furigana và phân tích ngữ pháp AI.'
                    )
                    : t('translation:placeholderSourceOther', {
                      lang: getLangName(sourceLang).toLowerCase(),
                      defaultValue: `Nhập văn bản ${getLangName(sourceLang).toLowerCase()} ở khung bên trái để nhận kết quả dịch sang tiếng Nhật kèm phiên âm Furigana và phân tích từ vựng.`
                    })}
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
