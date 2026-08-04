import { useState } from 'react';
import { Volume2, Check, ArrowRight, RotateCcw, Info, Sparkles, BookOpen, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GREETINGS, PRONOUNS, HONORIFIC_SUFFIXES, AISATSU_CHAPTER_QUIZ,
  type GreetingItem
} from '../../data/aisatsuData';
import { speakJapanese } from '../../data/kanaData';

interface AisatsuPhrasesProps {
  onChapterComplete?: (chapterId: string, scorePercent: number) => void;
}

export default function AisatsuPhrases({ onChapterComplete }: AisatsuPhrasesProps) {
  const [activeTab, setActiveTab] = useState<'greetings' | 'pronouns' | 'honorifics' | 'test'>('greetings');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Quiz State
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState<typeof AISATSU_CHAPTER_QUIZ>([]);

  const filteredGreetings = filterCategory === 'all'
    ? GREETINGS
    : GREETINGS.filter(g => g.category === filterCategory);

  const handleAnswerSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const currentQ = AISATSU_CHAPTER_QUIZ[quizIdx];
    if (optionIdx === currentQ.correctIndex) {
      setScore(s => s + 1);
      if (currentQ.audioText) speakJapanese(currentQ.audioText);
    } else {
      setWrongQuestions(prev => [...prev, currentQ]);
    }
  };

  const handleNextQuestion = () => {
    if (quizIdx + 1 < AISATSU_CHAPTER_QUIZ.length) {
      setQuizIdx(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizDone(true);
      const finalScore = score;
      const pct = Math.round((finalScore / AISATSU_CHAPTER_QUIZ.length) * 100);
      if (pct >= 60 && onChapterComplete) {
        onChapterComplete('chapter-3', pct);
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
          <span>📖 CHƯƠNG 3</span>
          <span>•</span>
          <span>SÁCH GIÁO KHOA NHẬP MÔN</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
          Chào Hỏi Giao Tiếp, Đại Từ & Xưng Hô Văn Hóa
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Học các mẫu câu chào hỏi chuẩn văn hóa Nhật (Aisatsu), cách dùng đại từ (私/僕/俺) và các hậu tố kính ngữ (-san, -sama, -kun, -chan).
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-outline-variant/30 pb-3">
        {[
          { id: 'greetings', label: '👋 1. Mẫu Câu Chào Hỏi (Aisatsu)' },
          { id: 'pronouns', label: '🗣️ 2. Đại Từ Xưng Hô' },
          { id: 'honorifics', label: '🏷️ 3. Hậu Tố Kính Ngữ (-san, -sama...)' },
          { id: 'test', label: '🧪 4. Bài Test Chương 3' },
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
        {/* TAB 1: CHÀO HỎI (GREETINGS) */}
        {activeTab === 'greetings' && (
          <motion.div key="greetings" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'daily', label: 'Hàng ngày (Sáng/Trưa/Tối)' },
                { id: 'farewell', label: 'Tạm biệt & Ra về' },
                { id: 'gratitude', label: 'Cảm ơn & Xin lỗi' },
                { id: 'meal', label: 'Bữa ăn' },
                { id: 'home', label: 'Đi & Về nhà' },
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => setFilterCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    filterCategory === c.id
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Greetings Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGreetings.map(g => (
                <div
                  key={g.id}
                  className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 hover:border-primary/40 transition-all flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        g.formality === 'Formal' ? 'bg-primary/10 text-primary' :
                        g.formality === 'Casual' ? 'bg-tertiary/10 text-tertiary' : 'bg-surface-container text-on-surface-variant'
                      }`}>
                        {g.formality === 'Formal' ? 'Lịch sự' : g.formality === 'Casual' ? 'Thân mật' : 'Trung tính'}
                      </span>
                      <button
                        onClick={() => speakJapanese(g.japanese)}
                        className="p-1.5 rounded-lg bg-surface-container hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>

                    <div className="text-xl md:text-2xl font-bold font-jp text-on-surface leading-tight">
                      {g.japanese}
                    </div>
                    <div className="text-xs font-medium text-primary">{g.romaji}</div>
                  </div>

                  <div className="border-t border-outline-variant/20 pt-3 space-y-1">
                    <div className="text-sm font-bold text-on-surface">{g.meaning}</div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">💡 {g.context}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 2: ĐẠI TỪ XƯNG HÔ */}
        {activeTab === 'pronouns' && (
          <motion.div key="pronouns" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRONOUNS.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => speakJapanese(p.japanese)}
                  className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 hover:border-primary/40 cursor-pointer transition-all space-y-3 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-3xl font-bold font-jp text-primary">{p.japanese}</span>
                      <span className="text-xs text-on-surface-variant ml-2">({p.hiragana} - {p.romaji})</span>
                    </div>
                    <span className="text-xs font-bold bg-secondary/10 text-secondary px-2.5 py-1 rounded-full">
                      {p.formality}
                    </span>
                  </div>

                  <div className="text-base font-bold text-on-surface">{p.meaning}</div>

                  <div className="bg-surface-container rounded-xl p-3 text-xs text-on-surface-variant space-y-1">
                    <div>👤 <strong>Dùng bởi:</strong> {p.usedBy}</div>
                    <div>📌 <strong>Ngữ cảnh:</strong> {p.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: HẬU TỐ KÍNH NGỮ */}
        {activeTab === 'honorifics' && (
          <motion.div key="honorifics" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {HONORIFIC_SUFFIXES.map(h => (
                <div
                  key={h.suffix}
                  className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold font-jp text-primary">{h.suffix}</span>
                    <span className="text-xs font-semibold text-on-surface-variant font-mono">{h.reading}</span>
                  </div>

                  <div className="text-sm font-bold text-on-surface">{h.meaning}</div>
                  <p className="text-xs text-on-surface-variant">📌 {h.usedFor}</p>

                  <div className="bg-surface-container rounded-xl p-3 text-xs">
                    <div className="text-on-surface-variant font-bold text-[10px] uppercase">Ví dụ mẫu</div>
                    <div className="font-jp text-sm font-bold text-secondary mt-0.5">{h.example}</div>
                    <div className="text-on-surface-variant">{h.exampleMeaning}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 4: BÀI TEST CHƯƠNG 3 */}
        {activeTab === 'test' && (
          <motion.div key="test" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto space-y-6">
            {!quizDone ? (
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                {/* Progress Header */}
                <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant border-b border-outline-variant/20 pb-4">
                  <span>Câu hỏi {quizIdx + 1} / {AISATSU_CHAPTER_QUIZ.length}</span>
                  <span className="text-secondary font-bold">Điểm hiện tại: {score}</span>
                </div>

                {/* Question */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-on-surface leading-relaxed">
                    {AISATSU_CHAPTER_QUIZ[quizIdx].question}
                  </h3>
                  {AISATSU_CHAPTER_QUIZ[quizIdx].audioText && (
                    <button
                      onClick={() => speakJapanese(AISATSU_CHAPTER_QUIZ[quizIdx].audioText!)}
                      className="px-3 py-1.5 rounded-xl bg-secondary/10 text-secondary text-xs font-bold hover:bg-secondary/20 cursor-pointer flex items-center gap-1.5 transition-colors"
                    >
                      <Volume2 size={14} /> Nghe câu phát âm
                    </button>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {AISATSU_CHAPTER_QUIZ[quizIdx].options.map((opt, idx) => {
                    let btnStyle = 'bg-surface-container-low border-outline-variant/30 hover:border-primary/50 text-on-surface';
                    if (isAnswered) {
                      if (idx === AISATSU_CHAPTER_QUIZ[quizIdx].correctIndex) {
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
                        {isAnswered && idx === AISATSU_CHAPTER_QUIZ[quizIdx].correctIndex && <Check size={18} className="text-secondary" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isAnswered && (
                  <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-xs text-on-surface space-y-1">
                    <div className="font-bold text-primary">💡 Giải thích:</div>
                    <p>{AISATSU_CHAPTER_QUIZ[quizIdx].explanation}</p>
                  </div>
                )}

                {/* Next button */}
                {isAnswered && (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3 rounded-2xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{quizIdx + 1 < AISATSU_CHAPTER_QUIZ.length ? 'Câu Tiếp Theo' : 'Xem Kết Quả'}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            ) : (
              /* Quiz Result Screen */
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 text-center space-y-6 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-3xl font-bold">
                  {Math.round((score / AISATSU_CHAPTER_QUIZ.length) * 100) >= 60 ? '🎉' : '💪'}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-on-surface">Kết Quả Bài Test Chương 3</h2>
                  <div className="text-4xl font-extrabold text-primary my-2">
                    {Math.round((score / AISATSU_CHAPTER_QUIZ.length) * 100)}%
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    Trả lời đúng {score} / {AISATSU_CHAPTER_QUIZ.length} câu
                  </p>
                </div>

                {Math.round((score / AISATSU_CHAPTER_QUIZ.length) * 100) >= 60 ? (
                  <div className="p-4 rounded-2xl bg-secondary/10 text-secondary text-sm font-semibold">
                    ✅ Chúc mừng! Bạn đã hoàn thành xuất sắc **Chương 3**!
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-crimson-500/10 text-crimson-600 text-sm font-semibold">
                    ⚠️ Bạn cần đạt tối thiểu 60% để mở khóa chương tiếp theo. Ôn lại kiến thức và thử lại nhé!
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
                            Ôn lại {wq.targetTab === 'greetings' ? 'Chào hỏi' : wq.targetTab === 'pronouns' ? 'Đại từ' : 'Hậu tố'} →
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
