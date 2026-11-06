import React from 'react';
import type { GrammarQuizItem } from '../types';

interface StarQuestionCardProps {
  question: GrammarQuizItem;
  questionNumber: number;
  slots: (string | null)[];
  quizSubmitted: boolean;
  onSelectFragment: (qId: number, text: string) => void;
  onRemoveSlot: (qId: number, slotIdx: number) => void;
  onResetStar: (qId: number) => void;
}

export const StarQuestionCard: React.FC<StarQuestionCardProps> = ({
  question,
  questionNumber,
  slots,
  quizSubmitted,
  onSelectFragment,
  onRemoveSlot,
  onResetStar,
}) => {
  const currentSlots = slots || [null, null, null, null];
  const starIdx = question.starIndex !== undefined && question.starIndex !== null ? question.starIndex : 0;
  const isCorrect = currentSlots[starIdx] === question.correctAnswer;

  return (
    <div
      id={`quiz-question-${question.id}`}
      className="p-5 border-2 border-dashed border-[#d6d3d1] bg-[#fafaf9] space-y-4"
    >
      <div className="flex items-center justify-between border-b pb-1">
        <div className="text-xs font-mono font-bold text-[#b91c1c] flex items-center gap-1.5">
          <span>CÂU {questionNumber} / 20:</span>
        </div>
        {quizSubmitted && (
          <span
            className={`text-[11px] font-mono font-bold px-2 py-0.5 border ${isCorrect
                ? 'bg-green-100 border-green-300 text-green-800'
                : 'bg-red-100 border-red-300 text-red-800'
              }`}
          >
            {isCorrect ? '✓ Đúng vị trí ★' : '✕ Sai'}
          </span>
        )}
      </div>

      <p className="text-xs text-[#57534e]">{question.prompt}</p>

      {/* 4 ô xếp mảnh từ */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-[#e7e5e4] text-sm">
        {question.leftSentence && (
          <span className="font-serif font-bold text-[#1c1917]">{question.leftSentence}</span>
        )}

        {[0, 1, 2, 3].map((slotIdx) => {
          const val = currentSlots[slotIdx];
          const isStar = slotIdx === starIdx;

          return (
            <div
              key={slotIdx}
              onClick={() => !quizSubmitted && val && onRemoveSlot(question.id, slotIdx)}
              className={`min-w-[70px] h-9 px-2.5 border-2 flex items-center justify-center font-serif font-bold text-xs cursor-pointer transition-all ${val
                  ? isStar
                    ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-xs'
                    : 'bg-white border-[#1c1917] text-[#1c1917]'
                  : isStar
                    ? 'bg-amber-50/50 border-dashed border-amber-400 text-amber-600'
                    : 'bg-[#f5f5f4] border-dashed border-[#d6d3d1] text-[#a8a29e]'
                }`}
            >
              {val ? (
                <span className="flex items-center gap-1">
                  {isStar && <span className="text-amber-500">★</span>}
                  {val}
                </span>
              ) : (
                <span className="text-[11px] font-mono">
                  {isStar ? '★ (Vị trí sao)' : `[ ${slotIdx + 1} ]`}
                </span>
              )}
            </div>
          );
        })}

        {question.rightSentence && (
          <span className="font-serif font-bold text-[#1c1917]">{question.rightSentence}</span>
        )}
      </div>

      {/* Danh sách mảnh từ */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-mono text-[#78716c]">
          Bấm vào từng mảnh từ dưới đây để xếp vào ô trống:
        </span>
        <div className="flex flex-wrap gap-2">
          {(question.fragments || []).map((frag, fIdx) => {
            const isPlaced = currentSlots.includes(frag.text);
            return (
              <button
                key={frag.id || fIdx}
                disabled={isPlaced || quizSubmitted}
                onClick={() => onSelectFragment(question.id, frag.text)}
                className={`px-3 py-1.5 text-xs font-serif font-bold border transition-all ${isPlaced
                    ? 'bg-[#f5f5f4] text-[#a8a29e] border-[#e7e5e4] cursor-not-allowed line-through'
                    : 'bg-white text-[#1c1917] border-[#d6d3d1] hover:border-[#b91c1c] hover:text-[#b91c1c] shadow-2xs cursor-pointer'
                  }`}
              >
                {fIdx + 1}. {frag.text}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          disabled={quizSubmitted}
          onClick={() => onResetStar(question.id)}
          className="text-xs text-[#78716c] hover:text-[#1c1917] underline font-mono disabled:opacity-50 cursor-pointer"
        >
          Xếp lại câu này
        </button>
      </div>

      {quizSubmitted && question.explanation && (
        <div className="text-xs text-[#57534e] bg-white p-3 border border-[#e7e5e4] leading-relaxed">
          💡 <strong className="font-bold text-[#1c1917]">Giải thích:</strong> {question.explanation}
        </div>
      )}
    </div>
  );
};

