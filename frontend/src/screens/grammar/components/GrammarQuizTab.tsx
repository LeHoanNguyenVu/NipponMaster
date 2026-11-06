import React from 'react';
import { CheckCircle2, AlertCircle, RotateCcw, Star, Loader2 } from 'lucide-react';
import { McqQuestionCard } from './McqQuestionCard';
import { StarQuestionCard } from './StarQuestionCard';
import type { GrammarQuizItem } from '../types';

interface GrammarQuizTabProps {
  fullQuizList: GrammarQuizItem[];
  mcqList: GrammarQuizItem[];
  starList: GrammarQuizItem[];
  mcqAnswers: Record<number, string>;
  starSlots: Record<number, (string | null)[]>;
  quizSubmitted: boolean;
  quizScore: number | null;
  isSubmittingQuiz: boolean;
  shuffledOptionsMap: Record<number, string[]>;
  answeredCount: number;
  correctCount: number;
  onSelectMcqAnswer: (qId: number, val: string) => void;
  onSelectStarFragment: (qId: number, text: string) => void;
  onRemoveStarSlot: (qId: number, slotIdx: number) => void;
  onResetStar: (qId: number) => void;
  onResetTest: () => void;
  onSubmitFullQuiz: () => void;
}

export const GrammarQuizTab: React.FC<GrammarQuizTabProps> = ({
  fullQuizList,
  mcqList,
  starList,
  mcqAnswers,
  starSlots,
  quizSubmitted,
  quizScore,
  isSubmittingQuiz,
  shuffledOptionsMap,
  answeredCount,
  correctCount,
  onSelectMcqAnswer,
  onSelectStarFragment,
  onRemoveStarSlot,
  onResetStar,
  onResetTest,
  onSubmitFullQuiz,
}) => {
  return (
    <div className="space-y-6">
      {/* Thanh điều hướng & Tiến độ bài kiểm tra */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white border border-[#e7e5e4] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#b91c1c] bg-[#fef2f2] px-2 py-0.5 border border-[#fecaca]">
              BÀI TEST KIẾN THỨC
            </span>
            <span className="text-xs font-serif font-bold text-[#1c1917]">
              20 Câu hỏi tổng hợp
            </span>
          </div>
          <div className="text-xs text-[#78716c] mt-1 flex flex-wrap items-center gap-3">
            <span>
              Đã làm: <strong className="text-[#1c1917] font-mono font-bold">{answeredCount}/20</strong> câu
            </span>
            <span>•</span>
            <span>
              Chuẩn đạt: <strong className="text-[#b91c1c] font-bold">≥ 85%</strong> (tối thiểu 17/20 câu đúng)
            </span>
          </div>
        </div>

        {/* Quick Nav Bubbles 1..20 */}
        <div className="flex flex-wrap items-center gap-1 max-w-full sm:max-w-md">
          {fullQuizList.map((q, idx) => {
            const isAnswered =
              q.quizType === 'MCQ'
                ? !!mcqAnswers[q.id]
                : (starSlots[q.id] || []).filter(Boolean).length === 4;
            let btnBg = isAnswered
              ? 'bg-[#1c1917] text-white border-[#1c1917]'
              : 'bg-[#fafaf9] text-[#78716c] border-[#e7e5e4] hover:border-[#1c1917]';

            if (quizSubmitted) {
              const isCorrect =
                q.quizType === 'MCQ'
                  ? mcqAnswers[q.id]?.trim() === q.correctAnswer?.trim()
                  : (starSlots[q.id] || [])[q.starIndex ?? 0] === q.correctAnswer;
              btnBg = isCorrect
                ? 'bg-green-100 border-green-500 text-green-800'
                : 'bg-red-100 border-red-400 text-red-800';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  const el = document.getElementById(`quiz-question-${q.id}`);
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`w-6 h-6 text-[10px] font-mono font-bold border flex items-center justify-center transition-colors cursor-pointer ${btnBg}`}
                title={`Câu ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Kết quả sau khi nộp bài */}
      {quizSubmitted && quizScore !== null && (
        <div
          className={`p-5 border transition-all ${
            quizScore >= 85
              ? 'bg-[#f0fdf4] border-[#86efac] text-[#166534]'
              : 'bg-[#fef2f2] border-[#fca5a5] text-[#991b1b]'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              {quizScore >= 85 ? (
                <CheckCircle2 className="w-8 h-8 text-[#166534] flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-8 h-8 text-[#991b1b] flex-shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold text-base font-serif">
                  {quizScore >= 85
                    ? '🎉 XUẤT SẮC! BẠN ĐÃ VƯỢT QUA BÀI TEST KIẾN THỨC!'
                    : '⚠️ CHƯA ĐẠT CHUẨN MỞ KHÓA!'}
                </div>
                <div className="text-xs mt-1 text-[#44403c] leading-relaxed">
                  {quizScore >= 85
                    ? `Chúc mừng bạn đã đạt ${quizScore}% (${correctCount}/20 câu đúng), vượt qua chuẩn quy định (≥ 85%). Bài học tiếp theo đã được mở khóa!`
                    : `Bạn đạt ${quizScore}% (${correctCount}/20 câu đúng). Cần đạt tối thiểu 85% (tức từ 17/20 câu đúng trở lên) để mở khóa bài học kế tiếp. Hãy xem lại phần giải thích bên dưới và thử lại nhé!`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right font-mono">
                <div className="text-2xl font-bold">{quizScore}%</div>
                <div className="text-[11px] text-[#78716c]">{correctCount}/20 câu đúng</div>
              </div>
              <button
                onClick={onResetTest}
                className="px-4 py-2 bg-white border border-[#d6d3d1] text-[#1c1917] hover:bg-[#fafaf9] text-xs font-mono font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại 🔄</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Danh sách 20 Câu Hỏi (16 MCQ + 4 STAR) */}
      <div className="space-y-6">
        {/* PHẦN 1: 16 CÂU TRẮC NGHIỆM MCQ */}
        {mcqList.length > 0 && (
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#78716c] border-b pb-1 flex items-center justify-between">
              <span>PHẦN 1: TRẮC NGHIỆM TRỌNG TÂM NGỮ PHÁP ({mcqList.length} CÂU)</span>
              <span className="text-[11px] font-normal text-[#a8a29e]">Chọn 1 đáp án chính xác nhất</span>
            </div>

            {mcqList.map((q, idx) => (
              <McqQuestionCard
                key={q.id}
                question={q}
                index={idx}
                selectedAnswer={mcqAnswers[q.id]}
                options={shuffledOptionsMap[q.id] || (Array.isArray(q.options) ? q.options : [])}
                quizSubmitted={quizSubmitted}
                onSelectAnswer={(val) => onSelectMcqAnswer(q.id, val)}
              />
            ))}
          </div>
        )}

        {/* PHẦN 2: 4 CÂU HỎI NGÔI SAO JLPT */}
        {starList.length > 0 && (
          <div className="space-y-4 pt-3">
            <div className="flex items-center justify-between border-b pb-1">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#b91c1c] flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>PHẦN 2: BÀI TẬP DẤU SAO JLPT ⭐ ({starList.length} CÂU)</span>
              </div>
              <span className="text-[11px] text-[#78716c]">Tìm từ chính xác ở vị trí [★]</span>
            </div>

            {starList.map((sq, sIdx) => (
              <StarQuestionCard
                key={sq.id}
                question={sq}
                questionNumber={mcqList.length + sIdx + 1}
                slots={starSlots[sq.id] || [null, null, null, null]}
                quizSubmitted={quizSubmitted}
                onSelectFragment={onSelectStarFragment}
                onRemoveSlot={onRemoveStarSlot}
                onResetStar={onResetStar}
              />
            ))}
          </div>
        )}
      </div>

      {/* Nút Nộp Bài Chung 20 Câu */}
      {!quizSubmitted && (
        <div className="pt-4 border-t border-[#e7e5e4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-mono text-[#78716c]">
            {answeredCount < 20
              ? `⚠️ Bạn đã hoàn thành ${answeredCount}/20 câu. Hãy làm đủ 20 câu để đạt kết quả tốt nhất!`
              : `✓ Đã làm xong 20/20 câu. Bấm nộp bài để xem điểm số & kiểm tra điều kiện ≥ 85%!`}
          </div>
          <button
            disabled={isSubmittingQuiz || answeredCount === 0}
            onClick={onSubmitFullQuiz}
            className="px-6 py-2.5 bg-[#b91c1c] text-white text-xs font-mono font-bold hover:bg-[#991b1b] transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shrink-0"
          >
            {isSubmittingQuiz ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>Nộp Bài Test Kiến Thức (20 Câu) 📝</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

