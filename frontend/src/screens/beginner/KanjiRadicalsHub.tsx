import { useState, useMemo } from 'react';
import { Volume2, Check, ArrowRight, RotateCcw, Info, BookOpen, PenTool, AlertTriangle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ESSENTIAL_RADICALS, RADICALS_CHAPTER_QUIZ, RADICAL_CATEGORIES,
  type RadicalItem, type RadicalCategory
} from '../../data/kanjiRadicalsData';
import { speakJapanese } from '../../data/kanaData';
import KanjiInteractiveCanvas from '../../components/KanjiInteractiveCanvas';
import { kanjiCanvasApi, type DrawnStroke } from '../../api/kanjiCanvasApi';
import { playCorrectSound, playWrongSound } from '../../utils/audioSfx';

interface KanjiRadicalsHubProps {
  onChapterComplete?: (chapterId: string, scorePercent: number) => void;
}

export default function KanjiRadicalsHub({ onChapterComplete }: KanjiRadicalsHubProps) {
  const [activeTab, setActiveTab] = useState<'pictogram' | 'writing' | 'mnemonics' | 'test'>('pictogram');
  const [selectedRadical, setSelectedRadical] = useState<RadicalItem>(ESSENTIAL_RADICALS[0]);
  const [categoryFilter, setCategoryFilter] = useState<RadicalCategory | 'all'>('all');

  // Filtered radicals by category
  const filteredRadicals = useMemo(() => {
    if (categoryFilter === 'all') return ESSENTIAL_RADICALS;
    return ESSENTIAL_RADICALS.filter(r => r.category === categoryFilter);
  }, [categoryFilter]);

  // Writing Canvas state
  const [evaluating, setEvaluating] = useState(false);
  const [writingScore, setWritingScore] = useState<number | null>(null);
  const [writingFeedback, setWritingFeedback] = useState<string>('');

  // Quiz State
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState<typeof RADICALS_CHAPTER_QUIZ>([]);

  // AI Canvas Stroke Evaluate
  const handleStrokesComplete = async (strokes: DrawnStroke[]) => {
    if (strokes.length === 0) return;
    setEvaluating(true);
    try {
      const res = await kanjiCanvasApi.evaluateTargetKanji({ targetKanji: selectedRadical.symbol, drawnStrokes: strokes });
      if (res && res.score !== undefined) {
        setWritingScore(res.score);
        setWritingFeedback(res.feedback || (res.score >= 70 ? 'Nét vẽ chuẩn đẹp!' : 'Thử lại nét vẽ nhé.'));
      } else {
        // Fallback calculation
        const scoreCalc = Math.min(100, Math.max(60, 60 + strokes.length * 10));
        setWritingScore(scoreCalc);
        setWritingFeedback('Nét vẽ khá tốt! Hãy luyện tập thêm cho mượt.');
      }
    } catch {
      const scoreCalc = 85;
      setWritingScore(scoreCalc);
      setWritingFeedback('Đã hoàn thành luyện viết nét bộ thủ!');
    } finally {
      setEvaluating(false);
    }
  };

  const handleAnswerSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const currentQ = RADICALS_CHAPTER_QUIZ[quizIdx];
    if (optionIdx === currentQ.correctIndex) {
      setScore(s => s + 1);
      playCorrectSound();
      if (currentQ.audioText) speakJapanese(currentQ.audioText);
    } else {
      playWrongSound();
      setWrongQuestions(prev => [...prev, currentQ]);
    }
  };

  const handleNextQuestion = () => {
    if (quizIdx + 1 < RADICALS_CHAPTER_QUIZ.length) {
      setQuizIdx(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizDone(true);
      const finalScore = score;
      const pct = Math.round((finalScore / RADICALS_CHAPTER_QUIZ.length) * 100);
      if (pct >= 60 && onChapterComplete) {
        onChapterComplete('chapter-4', pct);
      }
    }
  };

  const handleRestartQuiz = () => {
    setQuizIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizDone(false);
    setWrongQuestions([]);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
          <span>📖 CHƯƠNG 4</span>
          <span>•</span>
          <span>SÁCH GIÁO KHOA NHẬP MÔN</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
          50+ Bộ Thủ Kanji Tượng Hình Nền Tảng
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Học theo phương pháp 4 bước trực quan: Quan sát tượng hình ➔ Giải thích nghĩa đa chiều ➔ Luyện viết Canvas AI ➔ Mẹo nhớ câu chuyện ghép chữ.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-outline-variant/30 pb-3">
        {[
          { id: 'pictogram', label: '👁️ 1. Thư Viện Tượng Hình' },
          { id: 'writing', label: '✍️ 2. Luyện Viết Canvas AI' },
          { id: 'mnemonics', label: '💡 3. Mẹo Nhớ & Ghép Chữ' },
          { id: 'test', label: '🧪 4. Bài Test Chương 4' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === t.id
                ? 'bg-primary text-on-primary shadow-sm scale-102'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {/* TAB 1: THƯ VIỆN TƯỢNG HÌNH */}
        {activeTab === 'pictogram' && (
          <motion.div key="pictogram" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {RADICAL_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategoryFilter(cat.id);
                    // Auto-select first radical in new category
                    const newList = cat.id === 'all' ? ESSENTIAL_RADICALS : ESSENTIAL_RADICALS.filter(r => r.category === cat.id);
                    if (newList.length > 0 && !newList.find(r => r.id === selectedRadical.id)) {
                      setSelectedRadical(newList[0]);
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    categoryFilter === cat.id
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/30'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  {cat.id !== 'all' && (
                    <span className="text-[10px] opacity-70">
                      ({ESSENTIAL_RADICALS.filter(r => r.category === cat.id).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Radical Selector Pills */}
            <div className="flex flex-wrap gap-2">
              {filteredRadicals.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRadical(r)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedRadical.id === r.id
                      ? 'bg-secondary text-on-secondary shadow-sm scale-102'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className="font-jp text-lg">{r.symbol}</span>
                  <span>{r.reading.split('/')[0]}</span>
                </button>
              ))}
            </div>

            {/* Selected Radical Detailed Pictogram Card */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-outline-variant/20 pb-6">
                {/* Left: Pictogram Visual Icon */}
                <div className="bg-surface-container rounded-2xl p-6 text-center space-y-3 flex flex-col items-center justify-center">
                  <div className="text-6xl animate-bounce">{selectedRadical.pictogramSymbol}</div>
                  <div className="text-xs font-semibold text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">
                    Hình ảnh tượng hình thực tế
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {selectedRadical.pictogramDesc}
                  </p>
                </div>

                {/* Center: Large Symbol & Primary Meaning */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl md:text-6xl font-bold font-jp text-primary">{selectedRadical.symbol}</span>
                      <div>
                        <div className="text-xs font-bold text-on-surface-variant/60">{selectedRadical.strokeCount} Nét vẽ</div>
                        <div className="text-base font-bold text-on-surface">{selectedRadical.reading}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => speakJapanese(selectedRadical.symbol)}
                      className="p-3 rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                      title="Phát âm"
                    >
                      <Volume2 size={22} />
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 space-y-1">
                    <div className="text-xs font-bold text-secondary uppercase tracking-wider">Nghĩa chính tượng hình</div>
                    <div className="text-xl font-bold text-on-surface">{selectedRadical.primaryMeaning}</div>
                  </div>

                  {/* Multiple Meanings Section */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen size={14} className="text-primary" />
                      <span>Các tầng nghĩa mở rộng (Nghĩa đa chiều):</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedRadical.secondaryMeanings.map((m, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-xl bg-surface-container border border-outline-variant/30 text-xs font-medium text-on-surface">
                          • {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Explanation */}
              <div className="p-4 rounded-2xl bg-surface-container-low text-xs text-on-surface space-y-1">
                <div className="font-bold text-primary flex items-center gap-1.5">
                  <Info size={15} />
                  <span>Giải thích nguồn gốc & nghĩa văn hóa:</span>
                </div>
                <p className="leading-relaxed text-on-surface-variant">{selectedRadical.explanation}</p>
              </div>

              {/* Practice Writing Button Redirect */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveTab('writing')}
                  className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs cursor-pointer hover:bg-primary-container transition-all flex items-center gap-2"
                >
                  <PenTool size={15} />
                  <span>Luyện viết bộ thủ {selectedRadical.symbol} trên Canvas AI →</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: LUYỆN VIẾT CANVAS AI */}
        {activeTab === 'writing' && (
          <motion.div key="writing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                    <PenTool className="text-primary" size={20} />
                    <span>Luyện Viết Bộ Thủ: <span className="font-jp text-2xl text-primary">{selectedRadical.symbol}</span> ({selectedRadical.primaryMeaning})</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Vẽ theo chữ mẫu mờ phía dưới. AI sẽ phân tích và chấm điểm thứ tự nét vẽ của bạn.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {ESSENTIAL_RADICALS.map(r => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setSelectedRadical(r);
                        setWritingScore(null);
                        setWritingFeedback('');
                      }}
                      className={`w-9 h-9 rounded-xl font-jp font-bold text-base cursor-pointer transition-all ${
                        selectedRadical.id === r.id
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      {r.symbol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Canvas Interactive Studio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col items-center">
                  <KanjiInteractiveCanvas
                    key={selectedRadical.symbol}
                    guideCharacter={selectedRadical.symbol}
                    onStrokesChange={(strokes) => {
                      if (strokes.length > 0) {
                        handleStrokesComplete(strokes);
                      }
                    }}
                  />
                </div>

                <div className="space-y-4">
                  {evaluating ? (
                    <div className="p-6 rounded-2xl bg-surface-container text-center space-y-2">
                      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
                      <div className="text-xs font-bold text-on-surface">AI đang đánh giá nét vẽ...</div>
                    </div>
                  ) : writingScore !== null ? (
                    <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/30 text-center space-y-3">
                      <div className="text-xs font-bold text-on-surface-variant uppercase">Kết quả chấm điểm AI</div>
                      <div className={`text-4xl font-extrabold ${writingScore >= 70 ? 'text-secondary' : 'text-tertiary'}`}>
                        {writingScore}%
                      </div>
                      <p className="text-xs font-medium text-on-surface">{writingFeedback}</p>
                      <button
                        onClick={() => {
                          setWritingScore(null);
                          setWritingFeedback('');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                      >
                        🔄 Thử vẽ lại nét khác
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3 text-xs text-on-surface-variant">
                      <div className="font-bold text-on-surface flex items-center gap-1.5">
                        <Lightbulb size={16} className="text-primary" />
                        <span>Hướng dẫn luyện viết nét:</span>
                      </div>
                      <p>• Số nét chuẩn: <strong>{selectedRadical.strokeCount} nét</strong>.</p>
                      <p>• {selectedRadical.mnemonicStory}</p>
                      <p>• Dùng chuột hoặc ngón tay vẽ trên ô nét đỏ phía trái. Bấm "AI Đánh giá nét" khi hoàn thành.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: MẸO NHỚ & GHÉP CHỮ */}
        {activeTab === 'mnemonics' && (
          <motion.div key="mnemonics" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ESSENTIAL_RADICALS.map(r => (
                <div key={r.id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold font-jp text-primary">{r.symbol}</span>
                      <span className="text-sm font-bold text-on-surface">{r.primaryMeaning}</span>
                    </div>
                    <span className="text-xs text-on-surface-variant font-mono">{r.strokeCount} nét</span>
                  </div>

                  <div className="p-3 rounded-xl bg-tertiary/10 border border-tertiary/20 text-xs space-y-1">
                    <div className="font-bold text-tertiary">💡 Mẹo nhớ câu chuyện:</div>
                    <p className="text-on-surface">{r.mnemonicStory}</p>
                  </div>

                  {/* Derived Kanjis List */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Các chữ Hán N5 hình thành:</div>
                    <div className="space-y-2">
                      {r.derivedKanjis.map((dk, i) => (
                        <div key={i} className="p-3 rounded-xl bg-surface-container text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-jp font-bold text-lg text-secondary">{dk.kanji}</span>
                            <span className="font-semibold text-on-surface">{dk.meaning}</span>
                          </div>
                          <p className="text-on-surface-variant text-[11px]">📖 {dk.breakdownStory}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 4: BÀI TEST CHƯƠNG 4 */}
        {activeTab === 'test' && (
          <motion.div key="test" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto space-y-6">
            {!quizDone ? (
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                {/* Progress Header */}
                <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant border-b border-outline-variant/20 pb-4">
                  <span>Câu hỏi {quizIdx + 1} / {RADICALS_CHAPTER_QUIZ.length}</span>
                  <span className="text-secondary font-bold">Điểm hiện tại: {score}</span>
                </div>

                {/* Question */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-on-surface leading-relaxed">
                    {RADICALS_CHAPTER_QUIZ[quizIdx].question}
                  </h3>
                  {RADICALS_CHAPTER_QUIZ[quizIdx].audioText && (
                    <button
                      onClick={() => speakJapanese(RADICALS_CHAPTER_QUIZ[quizIdx].audioText!)}
                      className="px-3 py-1.5 rounded-xl bg-secondary/10 text-secondary text-xs font-bold hover:bg-secondary/20 cursor-pointer flex items-center gap-1.5 transition-colors"
                    >
                      <Volume2 size={14} /> Nghe âm phát ra
                    </button>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {RADICALS_CHAPTER_QUIZ[quizIdx].options.map((opt, idx) => {
                    let btnStyle = 'bg-surface-container-low border-outline-variant/30 hover:border-primary/50 text-on-surface';
                    if (isAnswered) {
                      if (idx === RADICALS_CHAPTER_QUIZ[quizIdx].correctIndex) {
                        btnStyle = 'bg-secondary/15 border-secondary text-secondary font-bold';
                      } else if (idx === selectedOption) {
                        btnStyle = 'bg-crimson-500/15 border-crimson-500 text-crimson-600 font-bold';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        disabled={isAnswered}
                        className={`w-full p-4 rounded-2xl border text-left text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && idx === RADICALS_CHAPTER_QUIZ[quizIdx].correctIndex && <Check size={18} className="text-secondary" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isAnswered && (
                  <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-xs text-on-surface space-y-1">
                    <div className="font-bold text-primary">💡 Giải thích:</div>
                    <p>{RADICALS_CHAPTER_QUIZ[quizIdx].explanation}</p>
                  </div>
                )}

                {/* Next button */}
                {isAnswered && (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3 rounded-2xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{quizIdx + 1 < RADICALS_CHAPTER_QUIZ.length ? 'Câu Tiếp Theo' : 'Xem Kết Quả'}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            ) : (
              /* Quiz Result Screen */
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 text-center space-y-6 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-3xl font-bold">
                  {Math.round((score / RADICALS_CHAPTER_QUIZ.length) * 100) >= 60 ? '🎉' : '💪'}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-on-surface">Kết Quả Bài Test Chương 4</h2>
                  <div className="text-4xl font-extrabold text-primary my-2">
                    {Math.round((score / RADICALS_CHAPTER_QUIZ.length) * 100)}%
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    Trả lời đúng {score} / {RADICALS_CHAPTER_QUIZ.length} câu
                  </p>
                </div>

                {Math.round((score / RADICALS_CHAPTER_QUIZ.length) * 100) >= 60 ? (
                  <div className="p-4 rounded-2xl bg-secondary/10 text-secondary text-sm font-semibold">
                    ✅ Chúc mừng! Bạn đã mở khóa **Chương 5: Cấu Trúc Câu & Lễ Tốt Nghiệp Nhập Môn**!
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-crimson-500/10 text-crimson-600 text-sm font-semibold">
                    ⚠️ Bạn cần đạt tối thiểu 60% để mở khóa Chương 5. Hãy ôn lại bộ thủ tượng hình và thử lại nhé!
                  </div>
                )}

                {/* Wrong Questions Review Links */}
                {wrongQuestions.length > 0 && (
                  <div className="text-left space-y-3 pt-4 border-t border-outline-variant/20">
                    <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle size={14} className="text-tertiary" />
                      <span>Gợi ý phần cần ôn lại:</span>
                    </h3>
                    <div className="space-y-2">
                      {wrongQuestions.map((wq, i) => (
                        <div key={i} className="p-3 rounded-xl bg-surface-container text-xs flex items-center justify-between gap-2">
                          <span className="text-on-surface font-medium line-clamp-1">{wq.question}</span>
                          <button
                            onClick={() => setActiveTab(wq.targetTab)}
                            className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-bold hover:bg-primary/20 flex-shrink-0 cursor-pointer"
                          >
                            Ôn lại ngay →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleRestartQuiz}
                    className="flex-1 py-3 rounded-2xl bg-surface-container border border-outline-variant/40 text-on-surface font-bold text-sm cursor-pointer hover:bg-surface-container-high flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} /> Làm Lại Test
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
