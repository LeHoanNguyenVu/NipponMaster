import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, ZoomIn } from 'lucide-react';
import type { JLPTQuestion, JLPTReadingPassage } from '../types';
import { ExamImageModal } from './ExamImageModal';

interface ExamPassageCardProps {
  passage: JLPTReadingPassage;
  questions: JLPTQuestion[];
  answers: Record<string, number>;
  onSelectOption: (questionId: string, optionIdx: number) => void;
  isSubmitted: boolean;
}

function renderFormattedPassage(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(<b>.*?<\/b>|<strong>.*?<\/strong>|<u>.*?<\/u>|【\s*\d+\s*】)/g);
    return (
      <React.Fragment key={lineIdx}>
        {lineIdx > 0 && <br />}
        {parts.map((part, idx) => {
          if (
            (part.startsWith('<b>') && part.endsWith('</b>')) ||
            (part.startsWith('<strong>') && part.endsWith('</strong>'))
          ) {
            const inner = part.startsWith('<b>') ? part.slice(3, -4) : part.slice(8, -9);
            return (
              <strong key={idx} className="font-bold text-primary px-0.5">
                {inner}
              </strong>
            );
          }
          if (part.startsWith('<u>') && part.endsWith('</u>')) {
            const inner = part.slice(3, -4);
            return (
              <span key={idx} className="underline decoration-2 decoration-primary underline-offset-4 font-bold text-primary px-0.5">
                {inner}
              </span>
            );
          }
          if (part.startsWith('【') && part.endsWith('】')) {
            return (
              <span
                key={idx}
                className="inline-flex items-center justify-center mx-1 px-2 py-0.5 rounded bg-primary/15 border border-primary/40 text-primary font-bold text-sm font-japanese align-baseline"
              >
                {part}
              </span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </React.Fragment>
    );
  });
}

export const ExamPassageCard: React.FC<ExamPassageCardProps> = ({
  passage,
  questions,
  answers,
  onSelectOption,
  isSubmitted,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="rounded-xl border border-outline-variant/35 bg-surface-container-lowest p-4 sm:p-6 shadow-2xs space-y-5">
      {/* 1. Single Continuous Passage Header & Content */}
      <div className="rounded-xl bg-surface-container-low border-l-4 border-primary p-4 sm:p-5 space-y-3">
        {passage.title && (
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <BookOpen size={16} />
            <span>{passage.title}</span>
          </div>
        )}

        <div className="font-japanese text-base sm:text-lg leading-relaxed text-on-surface whitespace-pre-line">
          {renderFormattedPassage(passage.contentJp)}
        </div>

        {/* Clean Illustration Image: interactive zoom and detailed view */}
        {passage.imageUrl && (
          <div className="pt-3 text-center">
            <div
              className="group relative inline-block max-w-full rounded-xl overflow-hidden border border-outline-variant/35 bg-white p-2.5 shadow-xs cursor-zoom-in transition-all hover:border-primary/60 hover:shadow-md"
              onClick={() => setIsModalOpen(true)}
              title="Nhấp để phóng to và xem chi tiết ảnh"
            >
              <img
                src={passage.imageUrl}
                alt={passage.title || 'Tài liệu bài đọc'}
                className="max-h-[550px] w-auto max-w-full object-contain mx-auto transition-transform duration-200 group-hover:scale-[1.01]"
              />
              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center pointer-events-none">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-xs">
                  <ZoomIn size={14} />
                  Xem ảnh chi tiết (Phóng to)
                </span>
              </div>
            </div>

            <div className="mt-2.5">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface text-xs font-bold border border-outline-variant/40 transition-all cursor-pointer shadow-2xs"
              >
                <ZoomIn size={14} />
                Xem ảnh chi tiết (Phóng to tài liệu)
              </button>
            </div>

            <ExamImageModal
              isOpen={isModalOpen}
              imageUrl={passage.imageUrl}
              title={passage.title ? `Tài liệu bài đọc: ${passage.title}` : 'Chi tiết tài liệu bài đọc'}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        )}
      </div>

      {/* 2. Uninterrupted List of Sub-Questions right below the passage */}
      <div className="space-y-4 pt-1">
        {questions.map((q) => {
          const selectedOption = answers[q.id];
          const isAnswered = selectedOption !== undefined;
          const isCorrect = isSubmitted && selectedOption === q.correctAnswer;

          return (
            <div
              key={q.id}
              id={`exam-q-${q.id}`}
              className={`rounded-xl border p-3.5 sm:p-4 transition-all bg-surface-container-lowest ${
                isSubmitted
                  ? isCorrect
                    ? 'border-secondary/50 ring-1 ring-secondary/20'
                    : 'border-error/50 ring-1 ring-error/20'
                  : isAnswered
                    ? 'border-primary/40'
                    : 'border-outline-variant/25'
              }`}
            >
              {/* Question Label */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-secondary text-on-secondary'
                          : 'bg-error text-on-error'
                        : isAnswered
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-high text-on-surface'
                    }`}
                  >
                    {q.number}
                  </span>
                  <span className="font-japanese text-sm sm:text-base font-bold text-on-surface">
                    {q.promptJp}
                  </span>
                </div>

                {isSubmitted && (
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 ${
                      isCorrect ? 'text-secondary bg-secondary/15' : 'text-error bg-error/15'
                    }`}
                  >
                    {isCorrect ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                    {isCorrect ? 'Đúng' : 'Sai'}
                  </span>
                )}
              </div>

              {/* 4 Options Grid: Automatically stack 1 column if options are long, otherwise 2-4 columns */}
              {(() => {
                const isLongOptions = q.options.some((opt) => opt.length > 8);
                const gridClass = isLongOptions
                  ? 'grid grid-cols-1 gap-2.5'
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2';

                return (
                  <div className={gridClass}>
                    {q.options.map((optText, optIdx) => {
                      const isSelected = selectedOption === optIdx;
                      const isRightOption = q.correctAnswer === optIdx;

                      let optionStyle =
                        'bg-surface-container-low hover:bg-surface-container border-outline-variant/20 text-on-surface';
                      if (isSubmitted) {
                        if (isRightOption) {
                          optionStyle =
                            'bg-secondary/15 border-secondary text-secondary font-bold ring-1 ring-secondary/30';
                        } else if (isSelected && !isRightOption) {
                          optionStyle =
                            'bg-error/15 border-error text-error font-bold ring-1 ring-error/30';
                        } else {
                          optionStyle =
                            'bg-surface-container-low/40 border-outline-variant/15 text-on-surface-variant opacity-60';
                        }
                      } else if (isSelected) {
                        optionStyle =
                          'bg-primary/15 border-primary text-primary font-bold ring-1 ring-primary/30';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => onSelectOption(q.id, optIdx)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0 flex-1">
                            <span
                              className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                                isSubmitted && isRightOption
                                  ? 'bg-secondary text-on-secondary'
                                  : isSubmitted && isSelected && !isRightOption
                                    ? 'bg-error text-on-error'
                                    : isSelected
                                      ? 'bg-primary text-on-primary'
                                      : 'bg-surface-container-high text-on-surface-variant'
                              }`}
                            >
                              {optIdx + 1}
                            </span>
                            <span className="font-japanese text-sm sm:text-base leading-relaxed break-words whitespace-normal text-on-surface">
                              {optText}
                            </span>
                          </div>
                          {isSubmitted && isRightOption && (
                            <CheckCircle2 size={16} className="text-secondary shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })()}

              {/* Explanation (when submitted) */}
              {isSubmitted && (
                <div className="mt-2.5 pt-2 border-t border-outline-variant/20 text-xs text-on-surface-variant">
                  <span className="font-bold text-primary mr-1">
                    Đáp án {q.correctAnswer + 1}:
                  </span>
                  {q.explanationVi}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

