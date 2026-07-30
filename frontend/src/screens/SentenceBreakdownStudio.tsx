import { useState, useEffect } from 'react';
import { Sparkles, Search, BookOpen, ToggleLeft, ToggleRight, ArrowRight, Info, Layers, RefreshCw } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';
import { sentenceBreakdownApi, type SentenceAnalyzeResponse, type TokenDto } from '../api/sentenceBreakdownApi';

interface SentenceBreakdownStudioProps {
  initialSentence?: string;
  onNavigateToGrammar?: (grammarId: number) => void;
}

const SAMPLE_SENTENCES = [
  { level: 'N5', text: '日本語を勉強してから、日本へ行きたいです。' },
  { level: 'N4', text: '毎日薬を飲まなければなりません。' },
  { level: 'N5', text: '図書館で本を借りることができますか。' },
  { level: 'N4', text: '先生はやさしいので、話すのが好きです。' },
  { level: 'N3', text: '雨が降っているにもかかわらず、出かけました。' }
];

export default function SentenceBreakdownStudio({ initialSentence, onNavigateToGrammar }: SentenceBreakdownStudioProps) {
  const [inputText, setInputText] = useState(initialSentence || '日本語を勉強してから、日本へ行きたいです。');
  const [showFurigana, setShowFurigana] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SentenceAnalyzeResponse | null>(null);
  const [selectedToken, setSelectedToken] = useState<TokenDto | null>(null);

  const handleAnalyze = async (textToAnalyze = inputText) => {
    const trimmed = textToAnalyze.trim();
    if (!trimmed) return;
    setIsLoading(true);
    try {
      const data = await sentenceBreakdownApi.analyzeSentence(trimmed);
      setResult(data);
      if (data.tokens && data.tokens.length > 0) {
        setSelectedToken(data.tokens[0]);
      }
    } catch (err) {
      console.error('Lỗi khi phân tích cú pháp câu:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleAnalyze(inputText);
  }, []);

  const getTokenColorClass = (pos: string) => {
    switch (pos) {
      case 'VERB_CONJUGATED':
        return 'bg-rose-500/10 text-rose-600 border-rose-500/30 dark:bg-rose-500/20 dark:text-rose-400 hover:bg-rose-500/20';
      case 'NOUN':
        return 'bg-teal-500/10 text-teal-600 border-teal-500/30 dark:bg-teal-500/20 dark:text-teal-400 hover:bg-teal-500/20';
      case 'PARTICLE':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400 hover:bg-amber-500/20';
      case 'ADJECTIVE':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/30 dark:bg-purple-500/20 dark:text-purple-400 hover:bg-purple-500/20';
      default:
        return 'bg-blue-500/10 text-blue-600 border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-400 hover:bg-blue-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Input & Controls */}
      <Card className="p-6 border-outline-variant/30 bg-surface-container-low shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                🧩
              </div>
              <h2 className="text-lg font-bold text-on-surface">Phân Tích Cú Pháp Câu Tiếng Nhật</h2>
            </div>
            <button
              onClick={() => setShowFurigana(!showFurigana)}
              className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:bg-surface-variant transition-colors cursor-pointer"
            >
              {showFurigana ? <ToggleRight size={18} className="text-primary" /> : <ToggleLeft size={18} />}
              <span>Furigana: {showFurigana ? 'Bật' : 'Tắt'}</span>
            </button>
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="Nhập câu tiếng Nhật cần phân tích... (Ví dụ: 日本語を勉強してから、日本へ行きたいです。)"
              className="w-full px-4 py-3.5 pr-28 rounded-xl bg-surface-container-lowest border border-outline-variant/40 focus:border-primary focus:outline-none text-on-surface font-jp font-medium text-base shadow-inner transition-colors"
            />
            <Button
              onClick={() => handleAnalyze()}
              disabled={isLoading}
              className="absolute right-2 text-sm px-4 py-2 flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              {isLoading ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <>
                  <Search size={16} />
                  <span>Phân tích</span>
                </>
              )}
            </Button>
          </div>

          {/* Quick Sample Sentences */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={12} className="text-amber-500" /> Câu mẫu:
            </span>
            {SAMPLE_SENTENCES.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(item.text);
                  handleAnalyze(item.text);
                }}
                className="text-xs px-2.5 py-1 rounded-md bg-surface-container-highest/60 text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all font-jp font-medium border border-outline-variant/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Badge variant="primary" className="text-[10px] py-0 px-1">{item.level}</Badge>
                <span>{item.text}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Analysis Results Display */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Main Sentence Display Box */}
          <Card className="p-6 border-primary/20 bg-gradient-to-br from-surface-container-low via-surface-container-lowest to-surface-container-low shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Kết quả phân tích cú pháp</span>
                <Badge variant="crimson" className="text-xs">Tiếng Nhật ➔ Tiếng Việt</Badge>
              </div>

              {/* Furigana Ruby Sentence Container */}
              <div className="p-6 bg-surface-container-lowest/80 rounded-2xl border border-outline-variant/30 shadow-inner">
                {showFurigana ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: result.furiganaRubyHtml }}
                    className="font-jp text-3xl font-bold leading-relaxed text-on-surface selection:bg-primary/20 tracking-wide [&>ruby]:px-1 [&>ruby>rt]:text-xs [&>ruby>rt]:text-primary [&>ruby>rt]:font-semibold"
                  />
                ) : (
                  <div className="font-jp text-3xl font-bold leading-relaxed text-on-surface tracking-wide">
                    {result.originalSentence}
                  </div>
                )}
              </div>

              {/* Translation Text */}
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
                <Info size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold uppercase text-primary tracking-wider">Bản dịch tiếng Việt</div>
                  <div className="text-base font-semibold text-on-surface mt-0.5">{result.translatedSentence}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Interactive Token Blocks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 border-outline-variant/30 bg-surface-container-low space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers size={18} className="text-primary" />
                  <h3 className="text-base font-bold text-on-surface">Các thành phần trong câu (Tokens)</h3>
                </div>
                <span className="text-xs text-on-surface-variant">Click vào khối từ để xem chi tiết</span>
              </div>

              {/* Token Chips Grid */}
              <div className="flex flex-wrap gap-2.5 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20 min-h-[100px] items-center">
                {result.tokens.map((token, idx) => {
                  const isSelected = selectedToken?.surface === token.surface;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedToken(token)}
                      className={`px-3.5 py-2 rounded-xl border font-jp font-bold text-lg transition-all duration-200 cursor-pointer flex flex-col items-center shadow-sm ${getTokenColorClass(
                        token.partOfSpeech
                      )} ${isSelected ? 'ring-2 ring-primary ring-offset-2 shadow-md scale-105' : ''}`}
                    >
                      <span className="text-xs font-normal opacity-80 font-sans tracking-tight">{token.reading}</span>
                      <span>{token.surface}</span>
                    </button>
                  );
                })}
              </div>

              {/* Legend Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-on-surface-variant">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> Danh từ</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Động từ chia thể</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Trợ từ</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Tính từ</span>
              </div>
            </Card>

            {/* Token Detail Inspector */}
            <Card className="p-6 border-primary/20 bg-surface-container-lowest shadow-sm flex flex-col justify-between">
              {selectedToken ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Chi tiết từ loại</span>
                    <Badge variant="primary">{selectedToken.jlptLevel}</Badge>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-jp font-bold text-on-surface bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/20">
                      {selectedToken.surface}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-primary">Cách đọc: {selectedToken.reading}</div>
                      <div className="text-xs text-on-surface-variant mt-0.5">Từ gốc: <span className="font-jp font-bold text-on-surface">{selectedToken.baseForm}</span></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-on-surface-variant uppercase">Phân loại</div>
                    <div className="px-3 py-1.5 bg-surface-container-high rounded-lg font-bold text-sm text-on-surface">
                      {selectedToken.partOfSpeechLabel}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-on-surface-variant uppercase">Giải thích ý nghĩa & thể chia</div>
                    <p className="text-xs leading-relaxed text-on-surface font-medium bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
                      {selectedToken.explanation}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-on-surface-variant text-xs italic">
                  Click vào một khối từ trong câu để xem phân tích chi tiết.
                </div>
              )}
            </Card>
          </div>

          {/* Matched Grammar Handbook Rules */}
          <Card className="p-6 border-outline-variant/30 bg-surface-container-low space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-primary" />
                <h3 className="text-base font-bold text-on-surface">Cấu Trúc Ngữ Pháp Nhận Diện Được</h3>
              </div>
              <Badge variant="primary">{result.matchedGrammars.length} Mẫu ngữ pháp</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.matchedGrammars.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-all shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-jp font-bold text-lg text-primary">{rule.pattern}</span>
                    <Badge variant="crimson">{rule.jlptLevel}</Badge>
                  </div>
                  <div className="text-xs font-bold text-on-surface">Cấu trúc: <code className="bg-surface-container-high px-2 py-0.5 rounded font-jp text-primary">{rule.structure}</code></div>
                  <div className="text-xs font-medium text-on-surface-variant">Nghĩa: {rule.meaning}</div>
                  <p className="text-xs text-on-surface-variant italic pt-1 border-t border-outline-variant/10">
                    {rule.explanation}
                  </p>
                  <button
                    onClick={() => {
                      if (onNavigateToGrammar && rule.grammarId) {
                        onNavigateToGrammar(rule.grammarId);
                      } else {
                        alert(`📖 Mẫu ngữ pháp [${rule.pattern}]:\n- Cấu trúc: ${rule.structure}\n- Nghĩa: ${rule.meaning}\n- Cách dùng: ${rule.explanation}`);
                      }
                    }}
                    className="mt-2 text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Xem cấu trúc đầy đủ trong Handbook 📖</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
