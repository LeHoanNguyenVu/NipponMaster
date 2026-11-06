import React from 'react';
import type { GrammarQuizItem } from '../types';

interface McqQuestionCardProps {
  question: GrammarQuizItem;
  index: number;
  selectedAnswer: string | undefined;
  options: string[];
  quizSubmitted: boolean;
  onSelectAnswer: (val: string) => void;
}

export const McqQuestionCard: React.FC<McqQuestionCardProps> = ({
  question,
  index,
  selectedAnswer,
  options,
  quizSubmitted,
  onSelectAnswer,
}) => {
  const isThisCorrect = selectedAnswer?.trim() === question.correctAnswer?.trim();
  const OPTION_LABELS = ['A', 'B', 'C', 'D'];

  return (
    <div
      id={`quiz-question-${question.id}`}
      className="p-4 border border-[#e7e5e4] bg-[#fafaf9] transition-all"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-xs font-mono font-bold text-[#b91c1c]">
          CÂU {index + 1} / 20:
        </div>
        {quizSubmitted && (
          <span
            className={`text-[11px] font-mono font-bold px-2 py-0.5 border ${
              isThisCorrect
                ? 'bg-green-100 border-green-300 text-green-800'
                : 'bg-red-100 border-red-300 text-red-800'
            }`}
          >
            {isThisCorrect ? '✓ Đúng' : '✕ Sai'}
          </span>
        )}
      </div>

      <div className="text-sm font-serif font-bold text-[#1c1917] mb-3 leading-relaxed">
        {question.prompt}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt, optIdx) => {
          const isSelected = selectedAnswer === opt;
          const isOptCorrect = opt === question.correctAnswer;
          let btnStyle = 'bg-white border-[#d6d3d1] hover:border-[#1c1917] text-[#1c1917]';

          if (quizSubmitted) {
            if (isOptCorrect) {
              btnStyle = 'bg-green-50 border-green-500 text-green-800 font-bold';
            } else if (isSelected) {
              btnStyle = 'bg-red-50 border-red-400 text-red-800 line-through';
            }
          } else if (isSelected) {
            btnStyle = 'bg-[#1c1917] text-white border-[#1c1917] font-bold shadow-2xs';
          }

          return (
            <button
              key={`${question.id}-${opt}-${optIdx}`}
              disabled={quizSubmitted}
              onClick={() => onSelectAnswer(opt)}
              className={`px-3 py-2.5 text-xs font-serif border transition-all text-left flex items-center justify-between cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-5 h-5 rounded-full border text-[10px] font-mono font-bold flex items-center justify-center shrink-0 ${
                    isSelected
                      ? quizSubmitted
                        ? isOptCorrect
                          ? 'border-green-600 bg-green-200 text-green-900'
                          : 'border-red-500 bg-red-200 text-red-900'
                        : 'border-white bg-white/20 text-white'
                      : quizSubmitted && isOptCorrect
                      ? 'border-green-600 bg-green-200 text-green-900'
                      : 'border-[#d6d3d1] bg-[#f5f5f4] text-[#57534e]'
                  }`}
                >
                  {OPTION_LABELS[optIdx] || optIdx + 1}
                </span>
                <span className="leading-snug">{opt}</span>
              </div>
              {quizSubmitted && isOptCorrect && (
                <span className="text-green-600 font-bold text-xs shrink-0 ml-1">✓ Đúng</span>
              )}
            </button>
          );
        })}
      </div>

      {quizSubmitted && question.explanation && (
        <div className="mt-3 text-xs text-[#57534e] bg-white p-3 border border-[#e7e5e4] leading-relaxed">
          💡 <strong className="font-bold text-[#1c1917]">Giải thích:</strong> {question.explanation}
        </div>
      )}
    </div>
  );
};

