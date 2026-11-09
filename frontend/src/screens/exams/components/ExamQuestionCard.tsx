import React, { useState } from 'react';
import { CheckCircle2, Square, Star, Volume2, XCircle } from 'lucide-react';
import type { JLPTQuestion } from '../types';

interface ExamQuestionCardProps {
  question: JLPTQuestion;
  selectedOption: number | undefined;
  onSelectOption: (optionIdx: number) => void;
  isSubmitted: boolean;
}

function renderFormattedJapanese(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(<u>.*?<\/u>|★|【\s*\d+\s*】)/g);
    return (
      <React.Fragment key={lineIdx}>
        {lineIdx > 0 && <br />}
        {parts.map((part, idx) => {
          if (part.startsWith('<u>') && part.endsWith('</u>')) {
            const inner = part.slice(3, -4);
            return (
              <span
                key={idx}
                className="underline decoration-2 decoration-primary underline-offset-4 font-bold text-primary px-0.5"
              >
                {inner}
              </span>
            );
          }
          if (part === '★') {
            return (
              <span
                key={idx}
                className="inline-flex items-center justify-center mx-1 px-2.5 py-0.5 rounded bg-amber-500/15 border-2 border-amber-500 text-amber-700 dark:text-amber-300 font-bold text-sm align-middle"
              >
                ★
              </span>
            );
          }
          if (part.startsWith('【') && part.endsWith('】')) {
            return (
              <span
                key={idx}
                className="inline-flex items-center justify-center mx-1 px-2 py-0.5 rounded bg-primary/15 border border-primary/40 text-primary font-bold text-sm"
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

export const ExamQuestionCard: React.FC<ExamQuestionCardProps> = ({
  question,
  selectedOption,
  onSelectOption,
  isSubmitted,
}) => {
  // Star slots: [slot0, slot1, slot2 (★), slot3] stores index 0..3 of token
  const [starSlots, setStarSlots] = useState<(number | null)[]>([null, null, null, null]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const isAnswered = selectedOption !== undefined;
  const isCorrect = isSubmitted && selectedOption === question.correctAnswer;

  const handleStarTokenClick = (tokenIdx: number) => {
    if (isSubmitted) return;
    const existingSlot = starSlots.indexOf(tokenIdx);
    const nextSlots = [...starSlots];
    if (existingSlot !== -1) {
      nextSlots[existingSlot] = null;
    } else {
      const firstEmpty = nextSlots.indexOf(null);
      if (firstEmpty !== -1) {
        nextSlots[firstEmpty] = tokenIdx;
      }
    }
    setStarSlots(nextSlots);
    // In JLPT Star question, slot index 2 is position ★
    if (nextSlots[2] !== null) {
      onSelectOption(nextSlots[2]);
    }
  };

  const handlePlayDialogue = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const lines =
      question.dialogue && question.dialogue.length > 0
        ? question.dialogue
        : [{ speaker: 'N' as const, speakerLabel: '音声', jp: question.promptJp }];

    setIsPlayingAudio(true);

    lines.forEach((line, idx) => {
      const utterance = new SpeechSynthesisUtterance(line.jp);
      utterance.lang = 'ja-JP';
      utterance.rate = 1.0; // Fixed standard speed
      if (line.speaker === 'M') {
        utterance.pitch = 0.85;
      } else if (line.speaker === 'F') {
        utterance.pitch = 1.2;
      } else {
        utterance.pitch = 1.0;
      }
      if (idx === lines.length - 1) {
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
      }
      window.speechSynthesis.speak(utterance);
    });
  };

  return (
    <div
      id={`exam-q-${question.id}`}
      className={`rounded-xl border transition-all p-4 sm:p-5 bg-surface-container-lowest shadow-2xs ${
        isSubmitted
          ? isCorrect
            ? 'border-secondary/50 ring-1 ring-secondary/20'
            : 'border-error/50 ring-1 ring-error/20'
          : isAnswered
            ? 'border-primary/40'
            : 'border-outline-variant/30'
      }`}
    >
      {/* Header: Question Number & Format Badge */}
      <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-outline-variant/15">
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
              isSubmitted
                ? isCorrect
                  ? 'bg-secondary text-on-secondary'
                  : 'bg-error text-on-error'
                : isAnswered
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-on-surface'
            }`}
          >
            {question.number}
          </span>
          <span className="text-xs font-bold text-on-surface">
            Câu {question.number}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {question.format === 'star' && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
              ★ Sắp xếp câu
            </span>
          )}
          {isSubmitted && (
            <span
              className={`px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1 ${
                isCorrect
                  ? 'bg-secondary/15 text-secondary'
                  : 'bg-error/15 text-error'
              }`}
            >
              {isCorrect ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
              {isCorrect ? 'Đúng' : 'Sai'}
            </span>
          )}
        </div>
      </div>

      {/* Listening Audio Control: Single standard speed, no script during test */}
      {question.format === 'listening' && (
        <div className="mb-4">
          <button
            type="button"
            onClick={handlePlayDialogue}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
              isPlayingAudio
                ? 'bg-error text-on-error'
                : 'bg-primary text-on-primary hover:opacity-95'
            }`}
          >
            {isPlayingAudio ? <Square size={14} /> : <Volume2 size={15} />}
            {isPlayingAudio ? 'Dừng phát âm thanh' : 'Nghe bài thi'}
          </button>

          {/* Script is ONLY revealed after submission */}
          {isSubmitted && question.dialogue && (
            <div className="mt-3 pt-3 border-t border-outline-variant/20 space-y-1.5">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                Kịch bản nghe (聴解原文):
              </span>
              {question.dialogue.map((line, idx) => (
                <div key={idx} className="text-sm font-japanese text-on-surface flex items-start gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-surface-container text-on-surface-variant shrink-0">
                    {line.speakerLabel}
                  </span>
                  <span className="leading-relaxed">{line.jp}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Prompt Sentence */}
      <div className="font-japanese text-base sm:text-lg font-medium text-on-surface leading-relaxed mb-3.5">
        {renderFormattedJapanese(question.promptJp)}
      </div>

      {/* Clean Image Only: NO Vietnamese description, NO zoom button */}
      {question.imageUrl && (
        <div className="mb-4">
          <img
            src={question.imageUrl}
            alt=""
            className="max-h-72 w-auto object-contain mx-auto rounded-lg border border-outline-variant/30 bg-white p-2"
          />
        </div>
      )}

      {/* Star Question: Interactive word builder that DIRECTLY determines the answer without duplicate buttons */}
      {question.format === 'star' && question.starTokens ? (
        <div className="space-y-3 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/25">
          <div className="flex items-center justify-between text-xs text-amber-900 dark:text-amber-300 font-bold">
            <span className="flex items-center gap-1.5">
              <Star size={14} />
              Sắp xếp từ vào 4 vị trí (Từ ở vị trí ★ là đáp án của câu):
            </span>
            {!isSubmitted && (
              <button
                type="button"
                onClick={() => setStarSlots([null, null, null, null])}
                className="text-[11px] text-on-surface-variant hover:text-primary cursor-pointer font-medium"
              >
                Đặt lại
              </button>
            )}
          </div>

          {/* 4 In-Sentence Slots */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((slotIdx) => {
              const tokenIdx = starSlots[slotIdx];
              const isStar = slotIdx === 2;
              return (
                <div
                  key={slotIdx}
                  onClick={() => {
                    if (isSubmitted || tokenIdx === null) return;
                    const next = [...starSlots];
                    next[slotIdx] = null;
                    setStarSlots(next);
                  }}
                  className={`min-h-10 px-3 py-2 rounded-lg border-2 flex items-center justify-between text-sm font-japanese cursor-pointer transition-all ${
                    isStar
                      ? 'border-amber-500 bg-amber-500/10 font-bold'
                      : 'border-dashed border-outline-variant/40 bg-surface-container-lowest'
                  }`}
                >
                  <span className="text-[11px] font-bold text-on-surface-variant mr-1">
                    {isStar ? '★' : `Ô ${slotIdx + 1}`}
                  </span>
                  <span className="truncate">
                    {tokenIdx !== null ? `${tokenIdx + 1}. ${question.starTokens![tokenIdx]}` : '＿＿＿'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Token Pills to pick */}
          <div className="flex flex-wrap gap-2 pt-1">
            {question.starTokens.map((token, idx) => {
              const used = starSlots.includes(idx);
              const isStarChoice = starSlots[2] === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleStarTokenClick(idx)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-japanese border transition-all cursor-pointer ${
                    isStarChoice
                      ? 'bg-amber-500 text-white border-amber-600 font-bold shadow-2xs'
                      : used
                        ? 'bg-primary/15 border-primary text-primary font-bold'
                        : 'bg-surface-container-lowest border-outline-variant/35 text-on-surface hover:border-primary/50'
                  }`}
                >
                  {idx + 1}. {token}
                </button>
              );
            })}
          </div>

          {selectedOption !== undefined && (
            <div className="text-xs text-on-surface-variant pt-1 font-medium">
              Bạn đang chọn từ ở vị trí ★:{' '}
              <strong className="text-primary">
                {selectedOption + 1}. {question.options[selectedOption]}
              </strong>
            </div>
          )}
        </div>
      ) : (
        /* Standard 4-Option Multiple Choice Grid: If options are long, stack 1 per row */
        (() => {
          const isLongOptions = question.options.some((opt) => opt.length > 10);
          const gridClass = isLongOptions
            ? 'grid grid-cols-1 gap-2.5'
            : 'grid grid-cols-1 sm:grid-cols-2 gap-2';

          return (
            <div className={gridClass}>
              {question.options.map((optText, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isRightOption = question.correctAnswer === optIdx;

                let optionStyle =
                  'bg-surface-container-low hover:bg-surface-container border-outline-variant/25 text-on-surface';
                if (isSubmitted) {
                  if (isRightOption) {
                    optionStyle =
                      'bg-secondary/15 border-secondary text-secondary font-bold ring-1 ring-secondary/30';
                  } else if (isSelected && !isRightOption) {
                    optionStyle =
                      'bg-error/15 border-error text-error font-bold ring-1 ring-error/30';
                  } else {
                    optionStyle =
                      'bg-surface-container-low/40 border-outline-variant/15 text-on-surface-variant opacity-65';
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
                    onClick={() => onSelectOption(optIdx)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                      <span
                        className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
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
                    {isSubmitted && isSelected && !isRightOption && (
                      <XCircle size={16} className="text-error shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          );
        })()
      )}

      {/* Explanation Box (Visible when submitted) */}
      {isSubmitted && (
        <div className="mt-3 pt-2.5 border-t border-outline-variant/20 rounded-lg bg-surface-container-low/60 p-3 text-xs">
          <span className="font-bold text-primary block mb-0.5">
            Đáp án: {question.correctAnswer + 1}. {question.options[question.correctAnswer]}
          </span>
          <p className="text-on-surface-variant leading-relaxed">
            {question.explanationVi}
          </p>
        </div>
      )}
    </div>
  );
};
