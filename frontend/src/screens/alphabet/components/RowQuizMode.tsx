import { useEffect, useRef } from 'react';
import { Check, RotateCcw, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getKanaRowLabel, speakJapanese } from '../../../data/kanaData';
import type { KanaChar } from '../../../data/kanaData';
import type { QuizCardProps, RowQuizResultScreenProps } from '../types';

export function NoRowQuizSelected({
  lessonRow,
  onStartCurrentRow,
  onGoOverview,
  onGoComprehensive,
}: {
  lessonRow: string | null;
  onStartCurrentRow: () => void;
  onGoOverview: () => void;
  onGoComprehensive: () => void;
}) {
  return (
    <div className="text-center py-16 max-w-md mx-auto">
      <div className="text-5xl mb-4">✨</div>
      <h2 className="text-lg font-bold text-on-surface mb-2">Chưa có bài kiểm tra hàng</h2>
      <p className="text-sm text-on-surface-variant mb-6">
        Sau khi học xong một hàng ở thẻ <strong>&quot;Bài Học&quot;</strong>, hệ thống sẽ tự động đưa bạn đến đây để kiểm tra riêng hàng đó.
      </p>
      <div className="flex flex-col gap-2.5">
        {lessonRow && (
          <button
            onClick={onStartCurrentRow}
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:opacity-90"
          >
            Luyện tập ngay {getKanaRowLabel(lessonRow)}
          </button>
        )}
        <button
          onClick={onGoOverview}
          className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface font-semibold text-sm cursor-pointer hover:bg-surface-container"
        >
          Vào Bảng Tổng Quan chọn hàng học
        </button>
        <button
          onClick={onGoComprehensive}
          className="px-5 py-2.5 rounded-xl bg-surface-container text-primary font-semibold text-sm cursor-pointer hover:bg-surface-container-high"
        >
          Chuyển sang Luyện Tập Tổng Hợp
        </button>
      </div>
    </div>
  );
}

export function RowQuizResultScreen({
  score,
  total,
  wrongList,
  elapsed,
  rowLabel,
  onRetry,
  onNextRow,
  hasNextRow,
}: RowQuizResultScreenProps) {
  const pct = Math.round((score / total) * 100);
  const emoji = pct >= 90 ? '🎉' : pct >= 70 ? '👏' : pct >= 50 ? '📚' : '💪';
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <div className="max-w-lg mx-auto py-10 text-center">
      <div className="text-6xl mb-3">{emoji}</div>
      <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{rowLabel}</div>
      <h2 className="text-2xl font-bold text-on-surface mb-2">Kết Quả Luyện Tập Hàng</h2>

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

      {wrongList.length > 0 && (
        <div className="bg-error/5 rounded-2xl border border-error/20 p-5 mb-6 text-left">
          <h3 className="text-sm font-bold text-error mb-3">
            ❌ Chữ cần ôn lại ({wrongList.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {wrongList.map((c: KanaChar, i: number) => (
              <button
                key={i}
                onClick={() => speakJapanese(c.char)}
                className="px-3 py-2 rounded-xl bg-error/10 border border-error/20 cursor-pointer hover:bg-error/20 transition-colors flex items-center gap-1.5"
              >
                <span className="font-jp font-bold text-lg text-error">{c.char}</span>
                <span className="text-xs text-error/70 font-mono">{c.romaji}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <button
          onClick={onRetry}
          className="px-6 py-2.5 rounded-xl border-2 border-primary text-primary font-bold text-sm cursor-pointer hover:bg-primary/8 transition-colors flex items-center gap-2"
        >
          <RotateCcw size={16} /> Làm lại
        </button>

        <button
          onClick={onNextRow}
          className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
        >
          <span>{hasNextRow ? 'Bài tiếp theo' : 'Hoàn thành bảng → Tổng hợp'}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export function QuizCard({
  current,
  idx,
  total,
  input,
  result,
  score,
  onInput,
  onCheck,
}: QuizCardProps) {
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
        <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-4">
          {current.type === 'hiragana' ? 'Hiragana' : 'Katakana'}
        </div>
        <div className="text-8xl md:text-9xl font-bold font-jp text-on-surface mb-6 leading-none">
          {current.char}
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
              placeholder="Gõ romaji..."
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

