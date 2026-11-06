import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  X,
} from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import type { ChapterExercise, SubmitResult, TestHistoryItem } from '../types';

interface KanjiTestTabProps {
  readingExercises: ChapterExercise[];
  writingExercises: ChapterExercise[];
  testAnswers: Record<number, string>;
  setTestAnswers: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  submittingTest: boolean;
  submitResult: SubmitResult | null;
  showResultCard: boolean;
  setShowResultCard: React.Dispatch<React.SetStateAction<boolean>>;
  testHistory: TestHistoryItem[];
  showHistoryDropdown: boolean;
  setShowHistoryDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectChapterId: (id: number) => void;
  onSubmitReviewTest: () => Promise<void>;
  onReviewPastAttempt: (attempt: TestHistoryItem) => void;
}

export function KanjiTestTab({
  readingExercises = [],
  writingExercises = [],
  testAnswers,
  setTestAnswers,
  submittingTest,
  submitResult,
  showResultCard,
  setShowResultCard,
  testHistory,
  showHistoryDropdown,
  setShowHistoryDropdown,
  onSelectChapterId,
  onSubmitReviewTest,
  onReviewPastAttempt,
}: KanjiTestTabProps) {
  const { t } = useTranslation();
  const allExercises = [...readingExercises, ...writingExercises];

  return (
    <div className="space-y-6">
      {/* Hướng dẫn bài test */}
      <div className="bg-white border border-[#e7e5e4] p-6">
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#e7e5e4] gap-2">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1c1917]">
              {t('master.reviewTestTitle', 'Bài test ôn tập chương')}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {testHistory.length > 0 && (
              <button
                type="button"
                onClick={() => setShowHistoryDropdown(!showHistoryDropdown)}
                className="px-3 py-1.5 text-xs font-mono font-medium border border-[#d6d3d1] bg-[#fafaf9] hover:bg-white text-[#44403c] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>📜 Lịch sử làm test ({testHistory.length})</span>
              </button>
            )}
            <Badge variant="outline" className="text-xs font-mono">
              MỤC TIÊU: ≥ 85%
            </Badge>
          </div>
        </div>

        {/* Dropdown / Danh sách các lần test trước */}
        {showHistoryDropdown && testHistory.length > 0 && (
          <div className="mt-4 p-4 border border-[#e7e5e4] bg-[#fafaf9]">
            <div className="text-xs font-mono uppercase font-bold text-[#78716c] mb-3 flex items-center justify-between">
              <span>LỊCH SỬ CÁC LẦN LÀM BÀI TRƯỚC ĐÓ:</span>
              <button
                type="button"
                onClick={() => setShowHistoryDropdown(false)}
                className="text-xs text-[#78716c] hover:text-[#1c1917] cursor-pointer"
              >
                ✕ Đóng
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {testHistory.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3 bg-white border border-[#e7e5e4] flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#78716c]">
                      #{testHistory.length - idx}
                    </span>
                    <div>
                      <div className="text-xs font-medium text-[#1c1917]">
                        {item.date}
                      </div>
                      <div className="text-[11px] font-mono text-[#78716c]">
                        Đúng {item.correctCount}/{item.totalQuestions} câu
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 text-xs font-mono font-bold border ${
                        item.isPassed
                          ? 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]'
                          : 'bg-[#fef2f2] text-[#991b1b] border-[#fecaca]'
                      }`}
                    >
                      {item.score}% {item.isPassed ? '✓ Đạt' : '✕ Chưa đạt'}
                    </span>
                    <button
                      type="button"
                      onClick={() => onReviewPastAttempt(item)}
                      className="px-3 py-1 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      Xem lại bài thi 👁️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Thông báo nếu đã từng làm bài trước đó và đang ở bài mới */}
        {!showResultCard && testHistory.length > 0 && !showHistoryDropdown && (
          <div className="mt-4 p-3 bg-[#f5f5f4] border border-[#e7e5e4] flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-[#44403c]">
              Bạn đã từng làm bài test này (Lần gần nhất:{' '}
              <strong className="font-mono">{testHistory[0].date}</strong> — đạt{' '}
              <strong className="font-mono text-[#b91c1c]">{testHistory[0].score}%</strong>).
            </span>
            <button
              type="button"
              onClick={() => onReviewPastAttempt(testHistory[0])}
              className="text-[#b91c1c] hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Xem lại kết quả lần trước 👁️</span>
            </button>
          </div>
        )}

        {/* Thông báo kết quả nộp bài */}
        {showResultCard && submitResult && (() => {
          const correctNum = allExercises.filter((ex) => testAnswers[ex.id] === ex.correctAnswer).length;
          const wrongNum = allExercises.length - correctNum;

          return (
            <div
              className={`mt-4 p-5 border ${
                submitResult.isPassed
                  ? 'bg-[#f0fdf4] border-[#86efac] text-[#166534]'
                  : 'bg-[#fef2f2] border-[#fca5a5] text-[#991b1b]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  {submitResult.isPassed ? (
                    <CheckCircle2 className="w-7 h-7 text-[#166534] flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-7 h-7 text-[#991b1b] flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold text-base">
                      {submitResult.isPassed
                        ? '🎉 XUẤT SẮC! BẠN ĐÃ VƯỢT QUA BÀI TEST CHƯƠNG!'
                        : '⚠️ CHƯA ĐẠT CHUẨN MỞ KHÓA!'}
                    </div>
                    <div className="text-xs mt-1 text-[#44403c] leading-relaxed">
                      {submitResult.message}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2.5 text-xs font-mono">
                      <span className="font-bold">
                        Điểm số: <span className="text-sm font-bold">{submitResult.score}%</span>
                      </span>
                      <span className="text-[#a8a29e]">•</span>
                      <span>
                        Đúng: <span className="font-bold text-[#166534]">{correctNum}</span> / {allExercises.length} câu
                      </span>
                      <span className="text-[#a8a29e]">•</span>
                      <span>
                        Sai: <span className="font-bold text-[#b91c1c]">{wrongNum}</span> câu
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {submitResult.unlockedNextChapter && submitResult.nextChapterId && (
                    <button
                      type="button"
                      onClick={() => onSelectChapterId(submitResult.nextChapterId!)}
                      className="px-4 py-2 bg-[#166534] text-white text-xs font-medium hover:bg-[#14532d] flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                    >
                      <span>Sang Chương {submitResult.nextChapterNumber}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setTestAnswers({});
                      setShowResultCard(false);
                    }}
                    className="px-3.5 py-2 bg-white border border-[#d6d3d1] text-xs font-medium text-[#44403c] hover:bg-[#fafaf9] transition-colors cursor-pointer"
                  >
                    Làm lại bài 🔄
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Danh sách các câu trắc nghiệm */}
        <div className="mt-6 space-y-6">
          {allExercises.map((ex, index) => {
            let options: string[];
            try {
              options = ex.optionsJson ? JSON.parse(ex.optionsJson) : [];
            } catch {
              options = [];
            }

            const currentSelected = testAnswers[ex.id];
            const isCorrect = currentSelected === ex.correctAnswer;
            const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

            return (
              <div
                key={ex.id}
                className={`p-4 border transition-all ${
                  showResultCard
                    ? isCorrect
                      ? 'border-l-4 border-l-[#166534] border-[#e7e5e4] bg-white'
                      : 'border-l-4 border-l-[#b91c1c] border-[#e7e5e4] bg-[#fffbfb]'
                    : 'border-[#e7e5e4] bg-[#fafaf9]'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-[#78716c] font-mono mb-2">
                  <span className="font-bold">
                    CÂU {index + 1} / {allExercises.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <span>{ex.exerciseType === 'READING' ? 'よみましょう (Đọc câu)' : 'かきましょう (Viết chữ)'}</span>
                    {showResultCard &&
                      (isCorrect ? (
                        <span className="px-2 py-0.5 text-[11px] font-bold bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] flex items-center gap-1 rounded">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          ĐÚNG
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[11px] font-bold bg-[#fef2f2] text-[#991b1b] border border-[#fecaca] flex items-center gap-1 rounded">
                          <X className="w-3.5 h-3.5" />
                          SAI
                        </span>
                      ))}
                  </div>
                </div>

                <div className="font-serif text-base font-medium text-[#1c1917] mb-3 leading-relaxed">
                  {ex.questionText.split(/(\[[^\]]+\])/).map((part, pIdx) => {
                    if (part.startsWith('[') && part.endsWith(']')) {
                      const word = part.slice(1, -1);
                      return (
                        <span
                          key={pIdx}
                          className="text-[#b91c1c] bg-[#fef2f2] px-1.5 py-0.5 border border-[#fecaca] mx-1 rounded-none inline-block font-extrabold shadow-2xs"
                        >
                          {word}
                        </span>
                      );
                    }
                    return <span key={pIdx}>{part}</span>;
                  })}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {options.map((opt, optIdx) => {
                    const letter = OPTION_LETTERS[optIdx] || '';
                    const isChecked = currentSelected === opt;
                    const isAnswer = opt === ex.correctAnswer;

                    if (showResultCard) {
                      // Chế độ xem nhận xét / sửa bài
                      let btnClass = 'border-[#e7e5e4] bg-[#fafaf9] text-[#78716c] opacity-60';
                      let tag = null;

                      if (isAnswer) {
                        // Đáp án đúng luôn được highlight xanh lá
                        btnClass = 'border-2 border-[#166534] bg-[#f0fdf4] text-[#166534] font-bold shadow-sm';
                        tag = (
                          <span className="text-[10px] bg-[#166534] text-white px-1.5 py-0.5 font-sans font-semibold rounded">
                            Đúng ✓
                          </span>
                        );
                      } else if (isChecked && !isAnswer) {
                        // Lựa chọn của người dùng nhưng sai -> highlight đỏ
                        btnClass = 'border-2 border-[#b91c1c] bg-[#fef2f2] text-[#991b1b] font-bold line-through';
                        tag = (
                          <span className="text-[10px] bg-[#b91c1c] text-white px-1.5 py-0.5 font-sans font-semibold rounded">
                            Bạn chọn ✕
                          </span>
                        );
                      }

                      return (
                        <div
                          key={opt}
                          className={`p-2.5 text-xs font-medium border text-center transition-all flex items-center justify-between gap-1 select-none ${btnClass}`}
                        >
                          <span className="truncate">
                            <span className="font-bold font-mono mr-1">{letter}.</span>
                            {opt}
                          </span>
                          {tag}
                        </div>
                      );
                    }

                    // Chế độ làm bài bình thường
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          setTestAnswers((prev) => ({
                            ...prev,
                            [ex.id]: opt,
                          }))
                        }
                        className={`p-2.5 text-xs font-medium border text-center transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          isChecked
                            ? 'border-[#b91c1c] bg-[#b91c1c] text-white font-bold shadow-sm'
                            : 'border-[#e7e5e4] bg-white text-[#44403c] hover:border-[#d6d3d1]'
                        }`}
                      >
                        <span className="font-mono font-bold">{letter}.</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Lời giải thích chi tiết khi nộp bài */}
                {showResultCard && (
                  <div className="mt-3.5 pt-3 border-t border-[#e7e5e4] text-xs flex items-start gap-2.5">
                    <span className="font-bold text-[#1c1917] bg-[#f5f5f4] px-2 py-0.5 text-[11px] font-mono uppercase tracking-wide flex-shrink-0">
                      💡 GIẢI THÍCH
                    </span>
                    <span className="text-[#44403c] leading-relaxed">
                      {ex.explanation || `Từ vựng trong câu là "${ex.targetWord}", đáp án chính xác là "${ex.correctAnswer}".`}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Nút nộp bài / thao tác */}
        <div className="mt-8 pt-4 border-t border-[#e7e5e4] flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-[#78716c] font-mono">
            {showResultCard && submitResult
              ? `Hoàn thành chấm điểm: ${submitResult.score}% • Kiểm tra chi tiết đúng/sai bên trên`
              : `Đã trả lời: ${Object.keys(testAnswers).length} / ${allExercises.length} câu`}
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setTestAnswers({});
                setShowResultCard(false);
              }}
              className="px-4 py-2 border border-[#d6d3d1] text-xs font-medium text-[#44403c] hover:bg-white transition-colors cursor-pointer"
            >
              {showResultCard ? 'Làm bài kiểm tra mới 📝' : 'Làm lại từ đầu'}
            </button>

            {!showResultCard && (
              <button
                type="button"
                onClick={onSubmitReviewTest}
                disabled={submittingTest || Object.keys(testAnswers).length === 0}
                className="px-6 py-2.5 bg-[#b91c1c] text-white text-xs font-bold tracking-wide hover:bg-[#991b1b] transition-all flex items-center gap-2 shadow disabled:opacity-50 cursor-pointer"
              >
                {submittingTest ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang chấm điểm...</span>
                  </>
                ) : (
                  <span>Nộp bài kiểm tra & Lưu điểm thật 📝</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

