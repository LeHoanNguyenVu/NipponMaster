import { useState, useMemo } from 'react';
import {
  Volume2, Check, ArrowRight, RotateCcw, AlertTriangle, Info,
  Calendar, Users, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BASIC_NUMBERS, COUNTERS, HOURS_DATA, MINUTES_SPECIAL, DAYS_OF_WEEK,
  AGE_DATA, AGE_QUESTION_PHRASES,
  PEOPLE_COUNTER_DATA, PEOPLE_SPECIAL_EXPRESSIONS,
  DAYS_OF_MONTH_DATA, REFLEX_PROMPTS,
  NUMBERS_CHAPTER_QUIZ, type CounterUnit
} from '../../data/numbersData';
import { speakJapanese } from '../../data/kanaData';
import { saveChapterScore } from '../../utils/beginnerProgressManager';

interface NumbersAndTimeProps {
  onChapterComplete?: (chapterId: string, scorePercent: number) => void;
}

type TabType = 'numbers' | 'people_counters' | 'days_of_month' | 'time' | 'reflex' | 'test';

/**
 * Component hiển thị cách đọc và nút loa riêng biệt khi có từ 2 cách đọc (chứa dấu '/')
 */
function DualReadingPlayer({
  hiragana,
  romaji,
  colorClass = 'text-primary',
}: {
  hiragana: string;
  romaji: string;
  colorClass?: string;
}) {
  const partsH = hiragana.split('/').map(s => s.trim());
  const partsR = romaji.split('/').map(s => s.trim());

  if (partsH.length > 1) {
    return (
      <div className="flex flex-col items-center w-full mt-1.5 space-y-1.5" onClick={e => e.stopPropagation()}>
        {/* Văn bản Hiragana & Romaji chuẩn trực quan */}
        <div className="text-center">
          <span className={`text-sm font-bold font-jp block ${colorClass}`}>{hiragana}</span>
          <span className="text-xs text-on-surface-variant font-mono block">{romaji}</span>
        </div>

        {/* 2 Nút Loa Độc Lập Cho Từng Cách Đọc */}
        <div className="flex items-center justify-center gap-1.5 w-full pt-0.5">
          {partsH.map((h, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                speakJapanese(h);
              }}
              className="flex-1 max-w-[105px] px-2 py-1 rounded-xl bg-primary/10 hover:bg-primary hover:text-white text-primary border border-primary/25 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs group/btn"
              title={`Bấm để nghe cách đọc ${i + 1}: ${h} (${partsR[i] || ''})`}
            >
              <Volume2 size={13} className="text-primary group-hover/btn:text-white group-hover/btn:scale-115 transition-transform flex-shrink-0" />
              <span className="font-jp truncate">{h}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full mt-1">
      <div className="flex items-center justify-center gap-1">
        <span className={`text-sm font-semibold ${colorClass}`}>{hiragana}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            speakJapanese(hiragana);
          }}
          className="p-0.5 rounded text-on-surface-variant/60 hover:text-primary transition-colors cursor-pointer"
          title={`Nghe: ${hiragana}`}
        >
          <Volume2 size={12} />
        </button>
      </div>
      <span className="text-xs text-on-surface-variant font-mono">{romaji}</span>
    </div>
  );
}

export default function NumbersAndTime({ onChapterComplete }: NumbersAndTimeProps) {
  const [activeTab, setActiveTab] = useState<TabType>('numbers');
  const [selectedCounter, setSelectedCounter] = useState<CounterUnit>(COUNTERS[0]);

  // Calendar filter state
  const [calendarFilter, setCalendarFilter] = useState<'all' | 'special'>('all');

  // Reflex Game State
  const [reflexIdx, setReflexIdx] = useState(0);
  const [reflexStreak, setReflexStreak] = useState(0);
  const [reflexSelected, setReflexSelected] = useState<string | null>(null);
  const [reflexFeedback, setReflexFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Chapter Quiz State
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState<typeof NUMBERS_CHAPTER_QUIZ>([]);

  // Filtered days of month
  const displayedDays = useMemo(() => {
    if (calendarFilter === 'special') {
      return DAYS_OF_MONTH_DATA.filter(d => d.isSpecial);
    }
    return DAYS_OF_MONTH_DATA;
  }, [calendarFilter]);

  // Current reflex prompt & Shuffled options to guarantee equal 25% probability across A, B, C, D
  const currentPrompt = REFLEX_PROMPTS[reflexIdx];

  const shuffledReflexOptions = useMemo(() => {
    if (!currentPrompt) return [];
    const arr = [...currentPrompt.options];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [reflexIdx, currentPrompt]);

  // Handle Reflex choice
  const handleReflexChoice = (optionReading: string) => {
    if (reflexFeedback !== null || !currentPrompt) return;
    const isCorrect = optionReading === currentPrompt.correctReading;
    setReflexSelected(optionReading);

    if (isCorrect) {
      setReflexFeedback('correct');
      setReflexStreak(s => s + 1);
      speakJapanese(currentPrompt.correctReading);
      setTimeout(() => {
        setReflexFeedback(null);
        setReflexSelected(null);
        setReflexIdx((prev) => (prev + 1) % REFLEX_PROMPTS.length);
      }, 1000);
    } else {
      setReflexFeedback('wrong');
      setReflexStreak(0);
      setTimeout(() => {
        setReflexFeedback(null);
        setReflexSelected(null);
      }, 1300);
    }
  };

  const handleNextReflex = () => {
    setReflexFeedback(null);
    setReflexSelected(null);
    setReflexIdx((prev) => (prev + 1) % REFLEX_PROMPTS.length);
  };

  // Handle Quiz
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
      const finalScore = score + (selectedOption === NUMBERS_CHAPTER_QUIZ[quizIdx].correctIndex ? 0 : 0);
      const pct = Math.round((finalScore / NUMBERS_CHAPTER_QUIZ.length) * 100);
      try {
        saveChapterScore(2, pct);
      } catch {}
      if (onChapterComplete) {
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
        <p className="text-sm text-on-surface-variant mt-1 max-w-3xl leading-relaxed">
          Nắm vững trọn vẹn số đếm 1-10.000, <strong>Bảng đếm người đặc biệt (hitori, futari, yonin)</strong>, 
          <strong>Quy tắc đếm tuổi (二十歳 - はたち hatachi)</strong>, 
          <strong>31 Ngày trong tháng (tsuitachi, futsuka... hatsuka)</strong> và luyện phản xạ tốc độ.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-outline-variant/30 pb-3">
        {[
          { id: 'numbers', label: '🔢 1. Số Đếm & Tuổi (Hatachi)' },
          { id: 'people_counters', label: '👥 2. Đếm Người & Đơn Vị Đếm' },
          { id: 'days_of_month', label: '📅 3. 31 Ngày Trong Tháng' },
          { id: 'time', label: '⏰ 4. Giờ, Phút & Thứ' },
          { id: 'reflex', label: '⚡ 5. Luyện Phản Xạ Nhanh' },
          { id: 'test', label: '🧪 6. Bài Test Chương 2' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
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
        {/* ══════════════════════════════════════════════════════ */}
        {/* TAB 1: SỐ ĐẾM CƠ BẢN & ĐẾM TUỔI (HATACHI)              */}
        {/* ══════════════════════════════════════════════════════ */}
        {activeTab === 'numbers' && (
          <motion.div key="numbers" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
            {/* Section 1A: Basic Numbers 0-10.000 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
                  <span>🔢 Bảng Số Đếm Cơ Bản (0 đến 10.000)</span>
                </h2>
                <span className="text-xs text-on-surface-variant">Bấm vào từng icon loa để nghe chuẩn từng cách đọc</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {BASIC_NUMBERS.map(n => {
                  const hasMultiReading = n.hiragana.includes('/');
                  return (
                    <div
                      key={n.value}
                      onClick={() => {
                        if (!hasMultiReading) speakJapanese(n.hiragana);
                      }}
                      className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center group"
                    >
                      <span className="text-xs font-bold text-on-surface-variant/60 mb-1">{n.value.toLocaleString()}</span>
                      <span className="text-3xl font-bold font-jp text-on-surface group-hover:text-primary transition-colors">{n.kanji}</span>
                      
                      {/* Hiển thị loa riêng biệt nếu có 2 cách đọc */}
                      <DualReadingPlayer hiragana={n.hiragana} romaji={n.romaji} />

                      {n.irregularNote && (
                        <span className="mt-2 text-[10px] bg-tertiary/10 text-tertiary px-2 py-0.5 rounded-full font-medium line-clamp-1" title={n.irregularNote}>
                          ⚠️ {n.irregularNote}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Note box */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3">
              <Info className="text-primary flex-shrink-0 mt-0.5" size={20} />
              <div className="text-xs text-on-surface-variant space-y-1">
                <p className="font-bold text-on-surface">💡 Điểm cốt lõi cần nhớ về số đếm tiếng Nhật:</p>
                <p>• Hàng vạn (10.000) chia theo cụm <strong>4 số 0</strong>: 10.000 = 1万 (いちまん), 100.000 = 10万 (じゅうまん), 1.000.000 = 100万 (ひゃくまん).</p>
                <p>• Các số 0 (ぜろ / れい), 4 (よん / し), 7 (なな / しち), 9 (きゅう / く) có 2 cách đọc tùy theo ngữ cảnh ghép câu.</p>
              </div>
            </div>

            {/* Section 1B: Bảng Đếm Tuổi & Bất Quy Tắc Hatachi */}
            <div className="border-t border-outline-variant/30 pt-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                    <span>🎂 Bảng Đếm Tuổi (歳 / 才 - さい) & Bất Quy Tắc Tuổi 20</span>
                  </h2>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Công thức chung: <strong>Số đếm + さい (sai)</strong>. Chú ý các mốc biến âm âm ngắt (1, 8, 10 tuổi) và tuổi 20 đặc biệt.
                  </p>
                </div>
              </div>

              {/* Banner Nổi Bật Tuổi 20 Hatachi */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-primary/10 to-transparent border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-bold text-xs">
                      🌟 BẤT QUY TẮC ĐẶC BIỆT NHẤT
                    </span>
                    <span className="text-xs font-semibold text-amber-800">20 Tuổi = 二十歳 (はたち - hatachi)</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl">
                    Tại Nhật Bản, 20 tuổi là mốc thành niên quan trọng được tổ chức ngày lễ lớn <strong>Lễ Thành Nhân (成人式 - Seijinshiki)</strong>. 
                    Người Nhật gọi riêng tuổi 20 là <strong>はたち (hatachi)</strong>, tuyệt đối <em>không đọc là にじゅっさい</em> khi nói tuổi đời.
                  </p>
                </div>

                <button
                  onClick={() => speakJapanese('はたち')}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs cursor-pointer flex items-center gap-2 shadow-sm flex-shrink-0 transition-colors"
                >
                  <Volume2 size={16} /> Nghe: はたち (hatachi)
                </button>
              </div>

              {/* Grid 1-20 tuổi */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2.5">
                {AGE_DATA.map(a => {
                  const hasMulti = a.hiragana.includes('/');
                  return (
                    <div
                      key={a.age}
                      onClick={() => {
                        if (!hasMulti) speakJapanese(a.hiragana);
                      }}
                      className={`p-3 rounded-2xl border text-center cursor-pointer transition-all hover:scale-102 flex flex-col justify-between ${
                        a.age === 20
                          ? 'bg-amber-500/15 border-amber-500/50 shadow-sm'
                          : a.isSpecial
                          ? 'bg-crimson-500/10 border-crimson-500/30 hover:bg-crimson-500/20'
                          : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40'
                      }`}
                    >
                      <div>
                        <span className="text-[11px] font-bold text-on-surface-variant block mb-1">{a.age} tuổi</span>
                        <span className="text-xl font-bold font-jp text-on-surface block">{a.kanji}</span>
                        <DualReadingPlayer hiragana={a.hiragana} romaji={a.romaji} colorClass={a.age === 20 ? 'text-amber-800' : a.isSpecial ? 'text-crimson-600' : 'text-primary'} />
                      </div>
                      {a.culturalNote && (
                        <span className="mt-1 text-[9px] text-on-surface-variant/80 font-medium line-clamp-1" title={a.culturalNote}>
                          {a.culturalNote}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Cách hỏi tuổi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {AGE_QUESTION_PHRASES.map((q, i) => (
                  <div
                    key={i}
                    onClick={() => speakJapanese(q.hiragana)}
                    className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/40 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold font-jp text-primary">{q.kanji}</span>
                        <span className="text-xs font-bold text-on-surface">({q.hiragana})</span>
                        <span className="text-xs text-on-surface-variant font-mono">[{q.romaji}]</span>
                      </div>
                      <div className="text-xs text-on-surface-variant mt-0.5">{q.meaning}</div>
                    </div>
                    <Volume2 size={16} className="text-primary/70" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════ */}
        {/* TAB 2: ĐẾM NGƯỜI ĐẶC BIỆT & ĐƠN VỊ ĐẾM                 */}
        {/* ══════════════════════════════════════════════════════ */}
        {activeTab === 'people_counters' && (
          <motion.div key="people_counters" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
            {/* Section 2A: Bảng Số Đếm Người Đặc Biệt */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                    <Users className="text-primary" size={20} />
                    <span>Bảng Đếm Người Đặc Biệt (一人, 二人, 四人...)</span>
                  </h2>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Đơn vị đếm người là <strong>人 (にん - nin)</strong>, nhưng 1 người, 2 người và 4 người bắt buộc dùng cách đọc riêng.
                  </p>
                </div>
                <span className="text-xs text-on-surface-variant hidden sm:inline">Bấm vào từng icon loa để nghe</span>
              </div>

              {/* Grid 1-10 Người */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {PEOPLE_COUNTER_DATA.map(p => {
                  const hasMulti = p.hiragana.includes('/');
                  return (
                    <div
                      key={p.count}
                      onClick={() => {
                        if (!hasMulti) speakJapanese(p.hiragana);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-102 flex flex-col justify-between ${
                        p.count === 1 || p.count === 2
                          ? 'bg-amber-500/12 border-amber-500/40 hover:bg-amber-500/20'
                          : p.count === 4
                          ? 'bg-crimson-500/12 border-crimson-500/40 hover:bg-crimson-500/20'
                          : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                          <span className="font-bold">{p.count} người</span>
                          {p.isSpecial && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-error/15 text-error">
                              Đặc biệt
                            </span>
                          )}
                        </div>
                        <div className="text-2xl font-bold font-jp text-on-surface mb-0.5">{p.kanji}</div>
                        <DualReadingPlayer hiragana={p.hiragana} romaji={p.romaji} />
                      </div>

                      {p.note && (
                        <div className="mt-2 text-[10px] text-on-surface-variant/80 border-t border-outline-variant/20 pt-1 leading-tight">
                          {p.note}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Các cụm từ đặc biệt về người */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
                {PEOPLE_SPECIAL_EXPRESSIONS.map((exp, idx) => (
                  <div
                    key={idx}
                    onClick={() => speakJapanese(exp.hiragana)}
                    className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary/40 cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div>
                      <span className="font-jp font-bold text-sm text-on-surface mr-2">{exp.kanji}</span>
                      <span className="text-primary font-semibold">({exp.hiragana})</span>
                      <div className="text-on-surface-variant text-[11px] mt-0.5">{exp.meaning}</div>
                    </div>
                    <Volume2 size={15} className="text-primary/70 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2B: Đơn Vị Đếm Đồ Vật & Bảng Biến Âm */}
            <div className="border-t border-outline-variant/30 pt-6 space-y-4">
              <div>
                <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <span>📦 Đơn Vị Đếm Đồ Vật Khác & Bảng Biến Âm 1-10</span>
                </h2>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Chọn đơn vị đếm bên dưới để xem chi tiết cách dùng và bảng biến âm 1 đến 10.
                </p>
              </div>

              {/* Units Selector */}
              <div className="flex flex-wrap gap-2">
                {COUNTERS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCounter(c)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedCounter.id === c.id
                        ? 'bg-secondary text-on-secondary shadow-sm scale-102'
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
                  <div className="p-3.5 rounded-2xl bg-surface-container text-xs text-on-surface font-medium space-y-1">
                    <div className="text-on-surface-variant text-[10px] uppercase font-bold">Ví dụ minh họa</div>
                    <div className="font-jp text-sm font-bold text-secondary">{selectedCounter.exampleSentence}</div>
                    <div>{selectedCounter.exampleMeaning}</div>
                  </div>
                </div>

                {/* 1-10 Mutations Matrix */}
                <div>
                  <h3 className="text-sm font-bold text-on-surface mb-3 flex items-center gap-2">
                    <span>🔥 Bảng Đếm 1 đến 10 Của {selectedCounter.kanji} ({selectedCounter.reading})</span>
                    <span className="text-xs font-normal text-crimson-600 bg-crimson-500/10 px-2 py-0.5 rounded-full font-bold">
                      Nền đỏ = Biến âm bất quy tắc
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {selectedCounter.mutations.map(m => {
                      const hasMulti = m.japanese.includes('/');
                      return (
                        <div
                          key={m.count}
                          onClick={() => {
                            if (!hasMulti) speakJapanese(m.japanese);
                          }}
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
                          <DualReadingPlayer hiragana={m.japanese} romaji={m.romaji} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════ */}
        {/* TAB 3: 31 NGÀY TRONG THÁNG (TSUITACHI... HATSUKA)      */}
        {/* ══════════════════════════════════════════════════════ */}
        {activeTab === 'days_of_month' && (
          <motion.div key="days_of_month" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <Calendar className="text-primary" size={20} />
                  <span>Bảng Ngày Trong Tháng (1 đến 31 Ngày)</span>
                </h2>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  10 ngày đầu tháng, ngày 14, 20 và 24 là bất quy tắc bắt buộc phải thuộc lòng. Bấm vào ô ngày để nghe phát âm!
                </p>
              </div>

              {/* Filter button */}
              <div className="flex gap-2">
                <button
                  onClick={() => setCalendarFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    calendarFilter === 'all'
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  Tất cả 31 ngày
                </button>
                <button
                  onClick={() => setCalendarFilter('special')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                    calendarFilter === 'special'
                      ? 'bg-crimson-600 text-white'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span>Chỉ ngày bất quy tắc (14 ngày)</span>
                </button>
              </div>
            </div>

            {/* Mẹo phân biệt dễ nhầm */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
                <span className="font-bold text-amber-800 flex items-center gap-1.5">
                  <span>⚠️ Ngày 4 vs Ngày 8:</span>
                </span>
                <p className="text-on-surface-variant">
                  • Ngày 4 = <strong>四日 (よっか - yokka)</strong> (Âm ngắt sokuon)<br />
                  • Ngày 8 = <strong>八日 (ようか - youka)</strong> (Trường âm ou kéo dài)
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-secondary/10 border border-secondary/30 text-xs space-y-1">
                <span className="font-bold text-secondary flex items-center gap-1.5">
                  <span>🌟 Ngày 1 vs Khoảng 1 ngày:</span>
                </span>
                <p className="text-on-surface-variant">
                  • Ngày mùng 1 đầu tháng = <strong>一日 (ついたち - tsuitachi)</strong><br />
                  • Khoảng thời gian 1 ngày = <strong>一日 (いちにち - ichinichi)</strong>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-crimson-500/10 border border-crimson-500/30 text-xs space-y-1">
                <span className="font-bold text-crimson-600 flex items-center gap-1.5">
                  <span>🌟 Ngày 20 vs 20 Tuổi:</span>
                </span>
                <p className="text-on-surface-variant">
                  • Ngày 20 = <strong>二十日 (はつか - hatsuka)</strong><br />
                  • 20 Tuổi = <strong>二十歳 (はたち - hatachi)</strong>
                </p>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
              {displayedDays.map(d => {
                const hasMulti = d.hiragana.includes('/');
                return (
                  <div
                    key={d.day}
                    onClick={() => {
                      if (!hasMulti) speakJapanese(d.hiragana);
                    }}
                    className={`p-3.5 rounded-2xl border text-center cursor-pointer transition-all hover:scale-103 flex flex-col justify-between ${
                      d.isSpecial
                        ? 'bg-crimson-500/10 border-crimson-500/40 hover:bg-crimson-500/20 shadow-sm'
                        : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                      <span className="font-mono font-bold">Ngày {d.day}</span>
                      {d.isSpecial && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-crimson-600 text-white">
                          Đặc biệt
                        </span>
                      )}
                    </div>

                    <div className="my-1">
                      <span className="text-2xl font-bold font-jp text-on-surface block">{d.kanji}</span>
                      <DualReadingPlayer hiragana={d.hiragana} romaji={d.romaji} colorClass={d.isSpecial ? 'text-crimson-600' : 'text-primary'} />
                    </div>

                    {d.mnemonicNote && (
                      <span className="text-[9px] text-on-surface-variant/80 border-t border-outline-variant/20 pt-1 mt-1 block line-clamp-1" title={d.mnemonicNote}>
                        {d.mnemonicNote}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════ */}
        {/* TAB 4: GIỜ, PHÚT & THỨ TRONG TUẦN                      */}
        {/* ══════════════════════════════════════════════════════ */}
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
                {MINUTES_SPECIAL.map(m => {
                  const hasMulti = m.hiragana.includes('/');
                  return (
                    <div
                      key={m.min}
                      onClick={() => {
                        if (!hasMulti) speakJapanese(m.hiragana);
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all hover:scale-102 ${
                        m.isIrregular
                          ? 'bg-tertiary/10 border-tertiary/30'
                          : 'bg-surface-container-lowest border-outline-variant/30'
                      }`}
                    >
                      <span className="text-xl font-bold font-jp text-on-surface block text-center">{m.kanji}</span>
                      <DualReadingPlayer hiragana={m.hiragana} romaji={m.romaji} colorClass="text-secondary" />
                    </div>
                  );
                })}
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

        {/* ══════════════════════════════════════════════════════ */}
        {/* TAB 5: BÀI LUYỆN PHẢN XẠ NHANH (SPEED REFLEX)          */}
        {/* ══════════════════════════════════════════════════════ */}
        {activeTab === 'reflex' && (
          <motion.div key="reflex" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                <Zap size={14} /> Chế Độ Phản Xạ Cao Tốc
              </div>
              <h2 className="text-xl font-bold text-on-surface">Rèn Luyện Phản Xạ Số & Thời Gian</h2>
              <p className="text-xs text-on-surface-variant max-w-md mx-auto">
                Ngân hàng <strong>30 câu hỏi ngẫu nhiên</strong> bao quát 5 chủ đề. Đáp án được xáo trộn ngẫu nhiên hoàn toàn (xác suất 25% cho A, B, C, D) giúp bạn phản xạ tự nhiên chuẩn xác!
              </p>
            </div>

            {/* Streak Counter Banner */}
            <div className="p-3 rounded-2xl bg-surface-container flex items-center justify-between text-xs font-bold">
              <span className="text-on-surface-variant">Câu {reflexIdx + 1}/{REFLEX_PROMPTS.length} (Tổng 30 câu ngẫu nhiên)</span>
              <span className="flex items-center gap-1 text-amber-600">
                <span>🔥 Chuỗi đúng liên tiếp:</span>
                <span className="text-base font-extrabold">{reflexStreak}</span>
              </span>
            </div>

            {/* Flash Prompt Card */}
            {currentPrompt && (
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 text-center space-y-6 shadow-sm">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10">
                    {currentPrompt.categoryLabel}
                  </span>
                  <div className="text-5xl md:text-6xl font-extrabold text-on-surface my-4 tracking-tight">
                    {currentPrompt.promptDisplay}
                  </div>
                  <p className="text-xs text-on-surface-variant font-medium">
                    Gợi ý: {currentPrompt.hint}
                  </p>
                </div>

                {/* 4 Choices (Được xáo trộn ngẫu nhiên 100%) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {shuffledReflexOptions.map((opt, idx) => {
                    const isCorrect = opt.reading === currentPrompt.correctReading;
                    const isChosen = reflexSelected === opt.reading;
                    let btnClass = 'bg-surface-container-low border-outline-variant/30 hover:border-primary/50 text-on-surface';

                    if (reflexFeedback !== null) {
                      if (isCorrect) {
                        btnClass = 'bg-secondary/20 border-secondary text-secondary font-bold scale-102';
                      } else if (isChosen) {
                        btnClass = 'bg-crimson-500/20 border-crimson-500 text-crimson-600 font-bold';
                      }
                    }

                    return (
                      <button
                        key={`${opt.reading}_${idx}`}
                        onClick={() => handleReflexChoice(opt.reading)}
                        disabled={reflexFeedback !== null}
                        className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${btnClass}`}
                      >
                        <span className="font-jp text-lg font-bold block">{opt.reading}</span>
                        <span className="text-xs text-on-surface-variant block font-mono">{opt.romaji}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Message */}
                <div className="h-6">
                  {reflexFeedback === 'correct' && (
                    <span className="text-sm font-bold text-secondary flex items-center justify-center gap-1">
                      <Check size={16} /> Chính xác! Rất tuyệt vời!
                    </span>
                  )}
                  {reflexFeedback === 'wrong' && (
                    <span className="text-sm font-bold text-crimson-600">
                      Chưa chính xác! Đáp án đúng: {currentPrompt.correctReading} ({currentPrompt.correctRomaji})
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-outline-variant/20 flex justify-end">
                  <button
                    onClick={handleNextReflex}
                    className="text-xs text-primary font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    Đổi câu hỏi khác <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════ */}
        {/* TAB 6: BÀI TEST CHƯƠNG 2 TOÀN DIỆN (16 CÂU HỎI)        */}
        {/* ══════════════════════════════════════════════════════ */}
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
                  {Math.round((score / NUMBERS_CHAPTER_QUIZ.length) * 100) >= 85 ? '🎉' : '💪'}
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

                {Math.round((score / NUMBERS_CHAPTER_QUIZ.length) * 100) >= 85 ? (
                  <div className="p-4 rounded-2xl bg-secondary/10 text-secondary text-sm font-semibold">
                    ✅ Chúc mừng! Bạn đã đạt {Math.round((score / NUMBERS_CHAPTER_QUIZ.length) * 100)}% (≥ 85%) và mở khóa thành công <strong>Chương 3: Chào Hỏi & Xưng Hô Văn Hóa</strong>!
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-crimson-500/10 text-crimson-600 text-sm font-semibold">
                    ⚠️ Bạn cần đạt tối thiểu <strong>85%</strong> để mở khóa Chương 3 (Điểm hiện tại: {Math.round((score / NUMBERS_CHAPTER_QUIZ.length) * 100)}%). Hãy ôn lại kiến thức gợi ý bên dưới và thử lại nhé!
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
                      {wrongQuestions.map((wq, i) => {
                        let targetTabLabel = 'Số đếm';
                        let targetTabKey: TabType = 'numbers';
                        if (wq.targetTab === 'people_age') {
                          targetTabLabel = 'Đếm người & Tuổi';
                          targetTabKey = 'people_counters';
                        } else if (wq.targetTab === 'days_of_month') {
                          targetTabLabel = '31 Ngày trong tháng';
                          targetTabKey = 'days_of_month';
                        } else if (wq.targetTab === 'counters') {
                          targetTabLabel = 'Đơn vị đếm';
                          targetTabKey = 'people_counters';
                        } else if (wq.targetTab === 'time') {
                          targetTabLabel = 'Thời gian';
                          targetTabKey = 'time';
                        }

                        return (
                          <div key={i} className="p-3 rounded-xl bg-surface-container text-xs flex items-center justify-between gap-2">
                            <span className="text-on-surface font-medium line-clamp-1">{wq.question}</span>
                            <button
                              onClick={() => setActiveTab(targetTabKey)}
                              className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-bold hover:bg-primary/20 flex-shrink-0 cursor-pointer"
                            >
                              Ôn lại {targetTabLabel} →
                            </button>
                          </div>
                        );
                      })}
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
