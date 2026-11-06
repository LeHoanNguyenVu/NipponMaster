import { useEffect, useRef } from 'react';
import {
  ChevronRight,
  ArrowLeft,
  Award,
  RotateCcw,
  ArrowRight,
  ListChecks,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getQuizSetsByScope } from '../../../data/quizBankData';
import { speakJapanese } from '../../../data/kanaData';
import type {
  CompScopeType,
  ComprehensiveScopePickerProps,
  QuizSetsGridProps,
  ComprehensiveResultScreenProps,
  CompQuizQuestionCardProps,
} from '../types';

/* MÀN HÌNH 1: CHỌN MỤC LUYỆN TẬP */
export function ComprehensiveScopePicker({ onSelectScope }: ComprehensiveScopePickerProps) {
  const scopes: {
    id: CompScopeType;
    icon: string;
    title: string;
    subtitle: string;
    desc: string;
  }[] = [
    {
      id: 'all-h',
      icon: 'あ',
      title: 'Toàn bộ Hiragana',
      subtitle: '15 bài kiểm tra chuyên biệt (300 câu)',
      desc: 'Bao quát trọn vẹn 71 chữ cái Hiragana (Âm trong, Âm đục, Bán đục) và từ vựng ứng dụng.',
    },
    {
      id: 'all-k',
      icon: 'ア',
      title: 'Toàn bộ Katakana',
      subtitle: '15 bài kiểm tra chuyên biệt (300 câu)',
      desc: 'Bao quát trọn vẹn 71 chữ cái Katakana, phân biệt nét dễ nhầm (シ/ツ, ソ/ン) và từ mượn.',
    },
    {
      id: 'mix',
      icon: '🔀',
      title: 'Trộn lẫn Hiragana & Katakana',
      subtitle: '15 bài kiểm tra chuyên biệt (300 câu)',
      desc: 'Rèn luyện phản xạ chuyển đổi song song cả 2 bảng chữ cái một cách tức thì.',
    },
    {
      id: 'yoon',
      icon: '⭐',
      title: 'Âm ghép Yōon (Hiragana & Katakana)',
      subtitle: '15 bài kiểm tra chuyên biệt (300 câu)',
      desc: 'Chuyên đề 66 âm ghép kết hợp với ya, yu, yo nhỏ và hàng chục từ vựng đời sống thực tế.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🃏</div>
        <h2 className="text-2xl font-bold text-on-surface mb-2">Luyện Tập Tổng Hợp</h2>
        <p className="text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
          Mỗi mục bao gồm <strong>15 bài trắc nghiệm độc lập</strong> (20 câu/bài) được phân bổ theo lộ trình kiến thức chuẩn, bao quát toàn diện các hàng âm và hoàn toàn không bị trùng lặp câu hỏi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scopes.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelectScope(s.id)}
            className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-left cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary font-jp font-bold flex items-center justify-center text-2xl group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                  {s.icon}
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
                  15 Bài Test
                </span>
              </div>

              <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors text-base mb-1">
                {s.title}
              </h3>
              <p className="text-xs font-semibold text-primary mb-2">{s.subtitle}</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">{s.desc}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs font-bold text-primary">
              <span>Xem danh sách 15 bài</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* MÀN HÌNH 2: DANH SÁCH 15 BÀI TEST ĐỘC LẬP CỦA MỤC ĐÃ CHỌN */
export function QuizSetsGrid({
  scope,
  savedScores,
  onSelectSet,
  onBackToScopes,
}: QuizSetsGridProps) {
  const quizSets = getQuizSetsByScope(scope);

  const scopeTitles: Record<CompScopeType, { title: string; icon: string }> = {
    'all-h': { title: 'Toàn Bộ Hiragana', icon: 'あ' },
    'all-k': { title: 'Toàn Bộ Katakana', icon: 'ア' },
    'mix': { title: 'Trộn Lẫn Cả 2 Bảng', icon: '🔀' },
    'yoon': { title: 'Âm Ghép Yōon', icon: '⭐' },
  };

  const currentInfo = scopeTitles[scope];

  const completedCount = quizSets.filter((s) => {
    const key = `${scope}_${s.id}`;
    return savedScores[key] !== undefined;
  }).length;

  return (
    <div className="max-w-5xl mx-auto py-4">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-outline-variant/30">
        <button
          onClick={onBackToScopes}
          className="flex items-center gap-2 text-xs font-bold text-on-surface-variant hover:text-primary cursor-pointer transition-colors w-fit px-3 py-1.5 rounded-xl hover:bg-surface-container"
        >
          <ArrowLeft size={16} /> Quay lại chọn mục khác
        </button>

        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-on-surface-variant">
            Tiến độ hoàn thành: <strong className="text-primary">{completedCount}/15 bài</strong>
          </div>
          <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / 15) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-on-surface flex items-center gap-2 mb-1">
          <span>{currentInfo.icon}</span>
          <span>15 Bài Trắc Nghiệm Độc Lập — {currentInfo.title}</span>
        </h2>
        <p className="text-xs text-on-surface-variant">
          Các bài test có nội dung câu hỏi hoàn toàn tách biệt, được chia nhỏ giúp bạn luyện tập tuần tự và nâng cao phản xạ.
        </p>
      </div>

      {/* Grid 15 bài test */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {quizSets.map((set) => {
          const key = `${scope}_${set.id}`;
          const saved = savedScores[key];
          const isCompleted = saved !== undefined;
          const isPerfect = saved?.bestScore === set.questions.length;

          return (
            <div
              key={set.id}
              onClick={() => onSelectSet(set)}
              className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-xl bg-primary/10 text-primary font-mono text-xs font-bold">
                    {set.title}
                  </span>

                  {isCompleted ? (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        isPerfect ? 'bg-secondary/15 text-secondary' : 'bg-primary/10 text-primary'
                      }`}
                    >
                      <Award size={12} /> {saved.bestScore}/{set.questions.length}
                    </span>
                  ) : (
                    <span className="text-[11px] text-on-surface-variant/60 font-medium">Chưa làm</span>
                  )}
                </div>

                <h4 className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors mb-1">
                  {set.subtitle}
                </h4>

                <p className="text-[11px] text-on-surface-variant leading-relaxed line-clamp-2">
                  {set.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                <span className="text-[11px] text-on-surface-variant/70 font-medium">
                  {set.questions.length} câu hỏi
                </span>
                <span className="font-bold text-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Làm bài <ChevronRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* MÀN HÌNH 3: KẾT QUẢ BÀI TEST VỚI 3 NÚT ĐIỀU HƯỚNG */
export function ComprehensiveResultScreen({
  quizSet,
  score,
  total,
  wrongList,
  elapsed,
  onRetry,
  onNextSet,
  hasNextSet,
  onBackToSets,
}: ComprehensiveResultScreenProps) {
  const pct = Math.round((score / total) * 100);
  const emoji = pct >= 90 ? '🏆' : pct >= 75 ? '🎉' : pct >= 50 ? '📚' : '💪';
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <div className="max-w-lg mx-auto py-8 text-center">
      <div className="text-6xl mb-2">{emoji}</div>
      <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
        {quizSet.title}: {quizSet.subtitle}
      </div>
      <h2 className="text-2xl font-bold text-on-surface mb-2">Kết Quả Bài Kiểm Tra</h2>

      <div
        className={`text-5xl font-bold mb-1 ${
          pct >= 80 ? 'text-secondary' : pct >= 50 ? 'text-tertiary' : 'text-error'
        }`}
      >
        {score}/{total}
      </div>
      <div className="text-sm text-on-surface-variant mb-6">
        {pct}% chính xác • {minutes > 0 ? `${minutes} phút ` : ''}{seconds} giây
      </div>

      {/* Thông báo tiến độ mở khóa Chương 2 */}
      {pct >= 85 ? (
        <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/30 text-secondary text-xs sm:text-sm font-semibold mb-6 text-left flex items-start gap-2.5">
          <span className="text-base flex-shrink-0">🎉</span>
          <div>
            <strong>Chúc mừng!</strong> Bạn đã đạt <strong>{pct}% (≥ 85%)</strong> trong bài test tổng hợp và mở khóa thành công <strong>Chương 2: Số Đếm, Đơn Vị Đếm & Thời Gian</strong>!
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs sm:text-sm font-medium mb-6 text-left flex items-start gap-2.5">
          <span className="text-base flex-shrink-0">⚠️</span>
          <div>
            Bạn cần đạt tối thiểu <strong>85% điểm</strong> ở bài kiểm tra tổng hợp để mở khóa Chương 2 (Hiện tại: <strong>{pct}%</strong>). Hãy ôn luyện và thử làm lại nhé!
          </div>
        </div>
      )}

      {wrongList.length > 0 && (
        <div className="bg-error/5 rounded-2xl border border-error/20 p-5 mb-6 text-left">
          <h3 className="text-sm font-bold text-error mb-3">
            ❌ Câu cần xem lại ({wrongList.length})
          </h3>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
            {wrongList.map((q, i) => (
              <button
                key={i}
                onClick={() => speakJapanese(q.prompt)}
                className="px-3 py-2 rounded-xl bg-error/10 border border-error/20 cursor-pointer hover:bg-error/20 transition-colors flex items-center gap-1.5"
              >
                <span className="font-jp font-bold text-lg text-error">{q.prompt}</span>
                <span className="text-xs text-error/70 font-mono">[{q.romaji}]</span>
                {q.subText && <span className="text-[10px] text-error/60">({q.subText})</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3 Nút tiện lợi: Làm lại, Bài tiếp theo, Danh sách 15 bài */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-xl border-2 border-primary text-primary font-bold text-sm cursor-pointer hover:bg-primary/8 transition-colors flex items-center gap-2"
        >
          <RotateCcw size={16} /> Làm lại bài này
        </button>

        {hasNextSet ? (
          <button
            onClick={onNextSet}
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:opacity-90 flex items-center gap-2 shadow-sm"
          >
            <span>Bài tiếp theo (Bài {String(quizSet.id + 1).padStart(2, '0')})</span>
            <ArrowRight size={16} />
          </button>
        ) : null}

        <button
          onClick={onBackToSets}
          className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant font-semibold text-sm cursor-pointer hover:bg-surface-container flex items-center gap-2"
        >
          <ListChecks size={16} /> Danh sách 15 bài test
        </button>
      </div>
    </div>
  );
}

/* MÀN HÌNH 4: THẺ CÂU HỎI TRẮC NGHIỆM TỔNG HỢP */
export function CompQuizQuestionCard({
  current,
  idx,
  total,
  input,
  result,
  score,
  onInput,
  onCheck,
}: CompQuizQuestionCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [idx]);

  if (!current) return null;

  return (
    <div className="max-w-md mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-on-surface-variant mb-3">
        <span>
          Câu {idx + 1}/{total}
        </span>
        <span className="font-semibold text-secondary">✓ {score} đúng</span>
      </div>
      <div className="h-1.5 bg-surface-container rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${((idx + 1) / total) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-8 text-center shadow-sm mb-6">
        <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
          {current.type === 'char' ? 'Nhận diện mặt chữ' : 'Từ vựng ứng dụng'}
        </div>

        {current.subText && (
          <div className="text-xs text-primary font-medium mb-3">{current.subText}</div>
        )}

        <div className="text-7xl md:text-8xl font-bold font-jp text-on-surface mb-6 leading-none">
          {current.prompt}
        </div>

        {/* Answer input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onCheck();
          }}
        >
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => onInput(e.target.value)}
              placeholder="Gõ phiên âm romaji..."
              disabled={result !== null}
              autoFocus
              className={`flex-1 px-4 py-3 rounded-xl text-center text-lg font-bold border-2 outline-none transition-all ${
                result === 'correct'
                  ? 'border-secondary bg-secondary/10 text-secondary'
                  : result === 'wrong'
                  ? 'border-error bg-error/10 text-error'
                  : 'border-outline-variant focus:border-primary'
              }`}
            />
            <button
              type="submit"
              disabled={!input.trim() || result !== null}
              className="px-5 py-3 rounded-xl bg-primary text-on-primary font-bold cursor-pointer hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              <Check size={18} />
            </button>
          </div>
        </form>

        {/* Feedback message */}
        <AnimatePresence>
          {result === 'wrong' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-sm text-error font-medium"
            >
              Đáp án đúng: <span className="font-bold font-mono text-base">{current.romaji}</span>
            </motion.div>
          )}
          {result === 'correct' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-sm text-secondary font-bold"
            >
              Chính xác! ✓
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

