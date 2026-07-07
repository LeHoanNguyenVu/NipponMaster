import { useState, useEffect } from 'react';
import { Languages, Sparkles, FileText, ArrowRight, Loader2, BookOpen, Copy, Check, Info, ArrowLeftRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import axiosClient from '../api/axiosClient';
import { motion, AnimatePresence } from 'motion/react';

interface WordAnalysis {
  word: string;
  reading: string;
  meaning: string;
  partOfSpeech: string;
}

interface TranslateResponse {
  originalText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  pronunciation?: string;
  words?: WordAnalysis[];
}



const SAMPLE_SENTENCES: Record<string, string[]> = {
  ja: [
    '毎日ご飯を食べます。',
    '学校に行きます。',
    '先生はやさしいです。',
    'お元気ですか。'
  ],
  vi: [
    'Mỗi ngày tôi đều ăn cơm.',
    'Tôi đi đến trường.',
    'Thầy cô giáo rất hiền từ.',
    'Bạn có khỏe không?'
  ],
  en: [
    'I eat rice every day.',
    'I go to school.',
    'The teacher is kind.',
    'How are you?'
  ]
};

const LANG_NAMES: Record<string, string> = {
  ja: 'Tiếng Nhật',
  vi: 'Tiếng Việt',
  en: 'Tiếng Anh'
};

export default function Translation() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<TranslateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [sourceLang, setSourceLang] = useState('ja');
  const [targetLang, setTargetLang] = useState('vi');
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isTargetOpen, setIsTargetOpen] = useState(false);

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

  const handleTranslate = async (textToTranslate = inputText) => {
    const trimmed = textToTranslate.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.post<any, any>('/translate', {
        text: trimmed,
        sourceLang,
        targetLang
      });
      
      // Unpack response: API trả về ApiResponse với data chứa TranslateResponse
      const data: TranslateResponse = response.data ?? response;
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError('Đã xảy ra lỗi khi kết nối với hệ thống dịch thuật AI.');
    } finally {
      setIsLoading(false);
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
    
    // Tráo đổi văn bản và reset kết quả
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

  return (
    <div className="max-w-[1280px] mx-auto p-6 md:p-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Badge variant="primary" className="mb-3">AI Smart Tools</Badge>
          <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tight">
            Dịch thuật thông minh AI
          </h1>
          <p className="text-lg text-on-surface-variant">
            Dịch thuật đa hướng giữa tiếng Nhật, tiếng Việt và tiếng Anh. Hỗ trợ hiển thị phiên âm Furigana và phân tích từ vựng tiếng Nhật.
          </p>
        </div>
      </header>

      {/* Language Selector Bar */}
      <div className="flex items-center justify-center gap-3 bg-surface-container-low/60 backdrop-blur-md border border-outline-variant/40 p-3 rounded-2xl max-w-xl mx-auto shadow-sm">
        {/* Source Language Custom Dropdown */}
        <div className="relative flex-1">
          <button
            id="source-lang-select-btn"
            onClick={() => {
              setIsSourceOpen(!isSourceOpen);
              setIsTargetOpen(false);
            }}
            className="w-full bg-surface-container-lowest border border-outline-variant/60 text-on-surface rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium cursor-pointer flex justify-between items-center"
          >
            <span>{LANG_NAMES[sourceLang]}</span>
            <svg className={`w-4 h-4 transition-transform ${isSourceOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                {Object.entries(LANG_NAMES).map(([code, name]) => (
                  <button
                    key={code}
                    id={`source-lang-option-${code}`}
                    onClick={() => {
                      handleSourceLangChange(code);
                      setIsSourceOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/8 transition-colors cursor-pointer ${sourceLang === code ? 'text-primary font-bold bg-primary/4' : 'text-on-surface'}`}
                  >
                    {name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          id="swap-lang-btn"
          onClick={handleSwapLanguages}
          className="p-2.5 bg-primary/8 hover:bg-primary/15 text-primary rounded-xl transition-all border border-primary/20 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
          title="Đổi chiều ngôn ngữ"
        >
          <ArrowLeftRight size={18} />
        </button>

        {/* Target Language Custom Dropdown */}
        <div className="relative flex-1">
          <button
            id="target-lang-select-btn"
            onClick={() => {
              setIsTargetOpen(!isTargetOpen);
              setIsSourceOpen(false);
            }}
            className="w-full bg-surface-container-lowest border border-outline-variant/60 text-on-surface rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium cursor-pointer flex justify-between items-center"
          >
            <span>{LANG_NAMES[targetLang]}</span>
            <svg className={`w-4 h-4 transition-transform ${isTargetOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                {Object.entries(LANG_NAMES).map(([code, name]) => (
                  <button
                    key={code}
                    id={`target-lang-option-${code}`}
                    onClick={() => {
                      handleTargetLangChange(code);
                      setIsTargetOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/8 transition-colors cursor-pointer ${targetLang === code ? 'text-primary font-bold bg-primary/4' : 'text-on-surface'}`}
                  >
                    {name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Input Panel */}
        <div className="col-span-1 lg:col-span-6 space-y-4">
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-on-surface-variant flex items-center gap-2">
                <Languages size={18} className="text-primary" />
                Văn bản {LANG_NAMES[sourceLang]} (Nguồn)
              </span>
              <span className="text-xs text-outline">{inputText.length} ký tự</span>
            </div>

            <textarea
              id="translate-input-textarea"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Nhập hoặc dán câu ${LANG_NAMES[sourceLang].toLowerCase()} vào đây (Ví dụ: ${SAMPLE_SENTENCES[sourceLang][0]})`}
              className="w-full h-48 bg-surface-container-low text-on-surface border border-outline-variant/60 rounded-2xl p-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-lg font-jp resize-none"
            />

            <div className="flex flex-wrap gap-2 items-center justify-between">
              {/* Sample Quick Tags */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-xs text-outline font-medium">Gợi ý:</span>
                {SAMPLE_SENTENCES[sourceLang]?.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(s);
                      handleTranslate(s);
                    }}
                    className="px-2.5 py-1 bg-surface-container-low text-on-surface-variant hover:bg-primary/8 hover:text-primary rounded-lg text-xs font-medium border border-outline-variant/30 transition-all cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Translate Action Button */}
              <Button
                id="translate-btn"
                variant="primary"
                onClick={() => handleTranslate()}
                disabled={isLoading || !inputText.trim()}
                icon={isLoading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
              >
                {isLoading ? 'Đang dịch...' : 'Dịch ngay'}
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Result Panel */}
        <div className="col-span-1 lg:col-span-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-[320px] bg-surface-container-lowest border border-outline-variant/50 rounded-2xl flex flex-col items-center justify-center p-6 space-y-4"
              >
                <Loader2 size={40} className="text-primary animate-spin" />
                <p className="text-on-surface-variant font-medium">Trí tuệ nhân tạo đang phân tích câu...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full bg-error-container/20 border border-error/20 text-error rounded-2xl p-6 flex gap-3"
              >
                <Info size={20} className="shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Đã xảy ra lỗi</h4>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div
                key={result.originalText}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Translation Result Card */}
                <Card className="p-6 space-y-5 border-2 border-primary/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/4 rounded-full blur-3xl pointer-events-none" />

                  {/* Furigana Display */}
                  {result.pronunciation && (
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={14} className="fill-current" />
                        {sourceLang === 'ja' ? 'Phiên âm Furigana (Văn bản gốc)' : 'Phiên âm Furigana (Văn bản dịch)'}
                      </span>
                      <div
                        className="text-2xl md:text-3xl font-jp leading-[2.5] text-on-surface tracking-wide p-3 bg-surface-container-low/40 rounded-xl border border-outline-variant/30"
                        dangerouslySetInnerHTML={{ __html: result.pronunciation }}
                      />
                    </div>
                  )}

                  {/* Translation Text Result */}
                  <div className="space-y-2 pt-2 border-t border-outline-variant/40">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                        <FileText size={14} />
                        Bản dịch {LANG_NAMES[targetLang]}
                      </span>
                      <button
                        onClick={handleCopy}
                        className="text-outline hover:text-primary transition-colors p-1.5 hover:bg-surface-container-low rounded-lg cursor-pointer"
                        title="Sao chép bản dịch"
                      >
                        {copiedText ? <Check size={16} className="text-secondary" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <p className="text-xl font-medium text-on-surface font-sans leading-relaxed">
                      {result.translatedText}
                    </p>
                  </div>
                </Card>

                {/* Vocabulary Analysis Card */}
                {result.words && result.words.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                      <BookOpen size={18} className="text-secondary" />
                      Phân tích từ vựng tiếng Nhật ({result.words.length} từ)
                    </h3>
                    <div className="grid grid-cols-1 gap-2.5">
                      {result.words.map((w, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl hover:shadow-sm hover:border-secondary/20 transition-all group"
                        >
                          <div className="space-y-1">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-jp font-bold text-on-surface">{w.word}</span>
                              <span className="text-xs text-primary font-medium font-jp">({w.reading})</span>
                            </div>
                            <p className="text-sm text-on-surface-variant font-medium">{w.meaning}</p>
                          </div>
                          <span className="px-2.5 py-1 bg-surface-container-low text-on-surface-variant rounded-lg text-xs font-bold font-mono tracking-wider">
                            {w.partOfSpeech}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="w-full h-[320px] bg-surface-container-lowest border border-outline-variant/30 rounded-2xl border-dashed flex flex-col items-center justify-center p-6 text-center text-outline">
                <Languages size={48} className="mb-3 opacity-40" />
                <h3 className="font-bold text-on-surface-variant mb-1">Kết quả hiển thị tại đây</h3>
                <p className="text-sm max-w-xs">
                  {sourceLang === 'ja'
                    ? 'Nhập văn bản tiếng Nhật ở khung bên trái và bấm dịch để xem kết quả dịch và phiên âm Furigana.'
                    : `Nhập văn bản ${LANG_NAMES[sourceLang].toLowerCase()} ở khung bên trái và bấm dịch để nhận kết quả dịch sang tiếng Nhật, phiên âm Furigana và phân tích từ vựng.`}
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
