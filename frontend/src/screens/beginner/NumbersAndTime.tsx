import { useState } from 'react';
import { Volume2, Check, ArrowRight, RotateCcw, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BASIC_NUMBERS, COUNTERS, HOURS_DATA, MINUTES_SPECIAL, DAYS_OF_WEEK,
  NUMBERS_CHAPTER_QUIZ, type CounterUnit
} from '../../data/numbersData';
import { speakJapanese } from '../../data/kanaData';

interface NumbersAndTimeProps {
  onChapterComplete?: (chapterId: string, scorePercent: number) => void;
}

export default function NumbersAndTime({ onChapterComplete }: NumbersAndTimeProps) {
  const [activeTab, setActiveTab] = useState<'numbers' | 'counters' | 'time' | 'test'>('numbers');
  const [selectedCounter, setSelectedCounter] = useState<CounterUnit>(COUNTERS[0]);

  // Quiz State
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState<typeof NUMBERS_CHAPTER_QUIZ>([]);

  const handleAnswerSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const currentQ = NUMBERS_CHAPTER_QUIZ[quizIdx];
    if (optionIdx === currentQ.correctIndex) {
      setScore(s => s + 1);
      if (currentQ.audioText) speakJapanese(currentQ.audioText);
    } else {
      setWrongQuestions(prev => [...prev, currentQ]);
    }
  };

  const handleNextQuestion = () => {
    if (quizIdx + 1 < NUMBERS_CHAPTER_QUIZ.length) {
      setQuizIdx(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizDone(true);
      const finalScore = score + (selectedOption === NUMBERS_CHAPTER_QUIZ[quizIdx].correctIndex ? 0 : 0); // already updated
      const pct = Math.round((finalScore / NUMBERS_CHAPTER_QUIZ.length) * 100);
      if (pct >= 60 && onChapterComplete) {
        onChapterComplete('chapter-2', pct);
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
          <span>📖 CHƯƠNG 2</span>
          <span>•</span>
          <span>SÁCH GIÁO KHOA NHẬP MÔN</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
          Số Đếm, Đơn Vị Đếm & Thời Gian
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Nắm vững quy tắc đọc số 1-10.000, bảng biến âm đơn vị đếm (1匹, 3匹...) và cách đọc Giờ/Phút chuẩn bản xứ.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-outline-variant/30 pb-3">
        {[
          { id: 'numbers', label: '🔢 1. Số Đếm Cơ Bản' },
          { id: 'counters', label: '📦 2. Đơn Vị Đếm (Biến Âm)' },
          { id: 'time', label: '⏰ 3. Giờ & Thời Gian' },
          { id: 'test', label: '🧪 4. Bài Test Chương 2' },
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
        {/* TAB 1: SỐ ĐẾM CƠ BẢN */}
        {activeTab === 'numbers' && (
          <motion.div key="numbers" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {BASIC_NUMBERS.map(n => (
                <div
                  key={n.value}
                  onClick={() => speakJapanese(n.hiragana)}
                  className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center group"
                >
                  <span className="text-xs font-bold text-on-surface-variant/60 mb-1">{n.value}</span>
                  <span className="text-3xl font-bold font-jp text-on-surface group-hover:text-primary transition-colors">{n.kanji}</span>
                  <span className="text-sm font-medium text-primary mt-1">{n.hiragana}</span>
                  <span className="text-xs text-on-surface-variant">{n.romaji}</span>
                  {n.irregularNote && (
                    <span className="mt-2 text-[10px] bg-tertiary/10 text-tertiary px-2 py-0.5 rounded-full font-medium">
                      ⚠️ Ghi chú
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Note box */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3">
              <Info className="text-primary flex-shrink-0 mt-0.5" size={20} />
              <div className="text-xs text-on-surface-variant space-y-1">
                <p className="font-bold text-on-surface">💡 Quy tắc đọc số hàng nghìn & vạn trong tiếng Nhật:</p>
                <p>• Hàng vạn (10.000) đếm theo cụm **4 số 0** (chứ không phải 3 số 0 như tiếng Anh): 10.000 = 1万 (いちまん).</p>
                <p>• Các số 4, 7, 9 có 2 cách đọc: 4 (よん/し), 7 (なな/しち), 9 (きゅう/く). Khi ghép với Giờ/Tháng sẽ dùng cách đọc cố định riêng.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: ĐƠN VỊ ĐẾM (BIẾN ÂM) */}
        {activeTab === 'counters' && (
          <motion.div key="counters" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Units Selector */}
            <div className="flex flex-wrap gap-2">
              {COUNTERS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCounter(c)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCounter.id === c.id
                      ? 'bg-secondary text-on-secondary shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className="font-jp text-sm">{c.kanji}</span>
                  <span>{c.reading}</span>
                </button>
              ))}
            </div>

            {/* Selected Unit Details */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 space-y-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-bold font-jp text-primary">{selectedCounter.kanji}</span>
                    <span className="text-xl font-bold text-on-surface">{selectedCounter.reading}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-1">📌 {selectedCounter.usedFor}</p>
                </div>
                <div className="p-3 rounded-2xl bg-surface-container text-xs text-on-surface font-medium space-y-1">
                  <div className="text-on-surface-variant text-[10px] uppercase font-bold">Ví dụ sử dụng</div>
                  <div className="font-jp text-sm font-bold text-secondary">{selectedCounter.exampleSentence}</div>
                  <div>{selectedCounter.exampleMeaning}</div>
                </div>
              </div>

              {/* 1-10 Mutations Matrix */}
              <div>
                <h3 className="text-sm font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span>🔥 Bảng Đếm 1 đến 10</span>
                  <span className="text-xs font-normal text-tertiary bg-tertiary/10 px-2 py-0.5 rounded-full">
                    Nền đỏ = Biến âm bất quy tắc
                  </span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {selectedCounter.mutations.map(m => (
                    <button
                      key={m.count}
                      onClick={() => speakJapanese(m.japanese)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all hover:scale-102 flex flex-col justify-between ${
                        m.isIrregular
                          ? 'bg-crimson-500/10 border-crimson-500/40 hover:bg-crimson-500/20'
                          : 'bg-surface-container-low border-outline-variant/30 hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                        <span className="font-bold">{m.count}</span>
                        {m.isIrregular && <span className="text-[10px] text-crimson-600 font-bold">Biến âm</span>}
                      </div>
                      <div className="font-jp text-lg font-bold text-on-surface">{m.japanese}</div>
                      <div className="text-xs text-on-surface-variant">{m.romaji}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: GIỜ & THỜI GIAN */}
        {activeTab === 'time' && (
          <motion.div key="time" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
            {/* Hours */}
            <div>
              <h3 className="text-base font-bold text-on-surface mb-3 flex items-center gap-2">
                <span>⏰ Cách Đọc Giờ (1時〜12時)</span>
                <span className="text-xs font-normal text-crimson-600 bg-crimson-500/10 px-2 py-0.5 rounded-full font-bold">
                  Chú ý 4時 (よじ), 7時 (しちじ), 9時 (くじ)
                </span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {HOURS_DATA.map(h => (
                  <div
                    key={h.hour}
                    onClick={() => speakJapanese(h.hiragana)}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all hover:scale-102 ${
                      h.isIrregular
                        ? 'bg-crimson-500/10 border-crimson-500/40 hover:bg-crimson-500/20'
                        : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40'
                    }`}
                  >
                    <span className="text-2xl font-bold font-jp text-on-surface block">{h.kanji}</span>
                    <span className="text-sm font-semibold text-primary block">{h.hiragana}</span>
                    <span className="text-xs text-on-surface-variant block">{h.romaji}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Minutes */}
            <div>
              <h3 className="text-base font-bold text-on-surface mb-3">
                ⏱️ Phút Biến Âm Phổ Biến (分 - ふん / ぷん)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {MINUTES_SPECIAL.map(m => (
                  <div
                    key={m.min}
                    onClick={() => speakJapanese(m.hiragana)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all hover:scale-102 ${
                      m.isIrregular
                        ? 'bg-tertiary/10 border-tertiary/30'
                        : 'bg-surface-container-lowest border-outline-variant/30'
                    }`}
                  >
                    <span className="text-xl font-bold font-jp text-on-surface block">{m.kanji}</span>
                    <span className="text-sm font-medium text-secondary block">{m.hiragana}</span>
                    <span className="text-xs text-on-surface-variant block">{m.romaji}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Days of Week */}
            <div>
              <h3 className="text-base font-bold text-on-surface mb-3">
                📅 Các Thứ Trong Tuần (曜日 - ようび)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {DAYS_OF_WEEK.map(d => (
                  <div
                    key={d.kanji}
                    onClick={() => speakJapanese(d.hiragana)}
                    className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/40 cursor-pointer transition-all"
                  >
                    <div className="text-2xl font-bold font-jp text-primary">{d.kanji}</div>
                    <div className="text-sm font-semibold text-on-surface mt-0.5">{d.hiragana}</div>
                    <div className="text-xs text-on-surface-variant mt-1">{d.meaning}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: BÀI TEST CHƯƠNG 2 */}
        {activeTab === 'test' && (
          <motion.div key="test" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto space-y-6">
            {!quizDone ? (
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                {/* Progress Header */}
                <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant border-b border-outline-variant/20 pb-4">
                  <span>Câu hỏi {quizIdx + 1} / {NUMBERS_CHAPTER_QUIZ.length}</span>
                  <span className="text-secondary font-bold">Điểm hiện tại: {score}</span>
                </div>

                {/* Question */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-on-surface leading-relaxed">
                    {NUMBERS_CHAPTER_QUIZ[quizIdx].question}
                  </h3>
                  {NUMBERS_CHAPTER_QUIZ[quizIdx].audioText && (
                    <button
                      onClick={() => speakJapanese(NUMBERS_CHAPTER_QUIZ[quizIdx].audioText!)}
                      className="px-3 py-1.5 rounded-xl bg-secondary/10 text-secondary text-xs font-bold hover:bg-secondary/20 cursor-pointer flex items-center gap-1.5 transition-colors"
                    >
                      <Volume2 size={14} /> Nghe phát âm câu hỏi
                    </button>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {NUMBERS_CHAPTER_QUIZ[quizIdx].options.map((opt, idx) => {
                    let btnStyle = 'bg-surface-container-low border-outline-variant/30 hover:border-primary/50 text-on-surface';
                    if (isAnswered) {
                      if (idx === NUMBERS_CHAPTER_QUIZ[quizIdx].correctIndex) {
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
                        {isAnswered && idx === NUMBERS_CHAPTER_QUIZ[quizIdx].correctIndex && <Check size={18} className="text-secondary" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on Answered */}
                {isAnswered && (
                  <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-xs text-on-surface space-y-1">
                    <div className="font-bold text-primary">💡 Giải thích:</div>
                    <p>{NUMBERS_CHAPTER_QUIZ[quizIdx].explanation}</p>
                  </div>
                )}

                {/* Next button */}
                {isAnswered && (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3 rounded-2xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{quizIdx + 1 < NUMBERS_CHAPTER_QUIZ.length ? 'Câu Tiếp Theo' : 'Xem Kết Quả'}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            ) : (
              /* Quiz Result Screen */
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 text-center space-y-6 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-3xl font-bold">
                  {Math.round((score / NUMBERS_CHAPTER_QUIZ.length) * 100) >= 60 ? '🎉' : '💪'}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-on-surface">Kết Quả Bài Test Chương 2</h2>
                  <div className="text-4xl font-extrabold text-primary my-2">
                    {Math.round((score / NUMBERS_CHAPTER_QUIZ.length) * 100)}%
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    Trả lời đúng {score} / {NUMBERS_CHAPTER_QUIZ.length} câu
                  </p>
                </div>

                {Math.round((score / NUMBERS_CHAPTER_QUIZ.length) * 100) >= 60 ? (
                  <div className="p-4 rounded-2xl bg-secondary/10 text-secondary text-sm font-semibold">
                    ✅ Chúc mừng! Bạn đã đạt yêu cầu và mở khóa **Chương 3: Chào Hỏi & Xưng Hô**!
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-crimson-500/10 text-crimson-600 text-sm font-semibold">
                    ⚠️ Bạn cần đạt tối thiểu 60% để mở khóa Chương 3. Hãy ôn lại kiến thức bên dưới và thử lại nhé!
                  </div>
                )}

                {/* Wrong Questions Review Links */}
                {wrongQuestions.length > 0 && (
                  <div className="text-left space-y-3 pt-4 border-t border-outline-variant/20">
                    <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle size={14} className="text-tertiary" />
                      <span>Các câu trả lời chưa đúng (Gợi ý ôn lại):</span>
                    </h3>
                    <div className="space-y-2">
                      {wrongQuestions.map((wq, i) => (
                        <div key={i} className="p-3 rounded-xl bg-surface-container text-xs flex items-center justify-between gap-2">
                          <span className="text-on-surface font-medium line-clamp-1">{wq.question}</span>
                          <button
                            onClick={() => setActiveTab(wq.targetTab)}
                            className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-bold hover:bg-primary/20 flex-shrink-0 cursor-pointer"
                          >
                            Ôn lại {wq.targetTab === 'numbers' ? 'Số đếm' : wq.targetTab === 'counters' ? 'Đơn vị đếm' : 'Thời gian'} →
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
