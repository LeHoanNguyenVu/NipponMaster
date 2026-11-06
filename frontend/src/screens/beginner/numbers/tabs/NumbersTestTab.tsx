import { Volume2, Check, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import { NUMBERS_CHAPTER_QUIZ } from '../../../../data/numbersData';
import { speakJapanese } from '../../../../data/kanaData';
import type { NumbersTestTabProps, TabType } from '../types';

export default function NumbersTestTab({
  quizIdx,
  selectedOption,
  isAnswered,
  score,
  quizDone,
  wrongQuestions,
  handleAnswerSelect,
  handleNextQuestion,
  handleRestartQuiz,
  onNavigateTab,
}: NumbersTestTabProps) {
  const currentQuizItem = NUMBERS_CHAPTER_QUIZ[quizIdx];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {!quizDone ? (
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant border-b border-outline-variant/20 pb-4">
            <span>
              Câu hỏi {quizIdx + 1} / {NUMBERS_CHAPTER_QUIZ.length}
            </span>
            <span className="text-secondary font-bold">Điểm hiện tại: {score}</span>
          </div>

          {/* Question */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-on-surface leading-relaxed">
              {currentQuizItem.question}
            </h3>
            {currentQuizItem.audioText && (
              <button
                onClick={() => speakJapanese(currentQuizItem.audioText!)}
                className="px-3 py-1.5 rounded-xl bg-secondary/10 text-secondary text-xs font-bold hover:bg-secondary/20 cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <Volume2 size={14} /> Nghe phát âm câu hỏi
              </button>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQuizItem.options.map((opt, idx) => {
              let btnStyle =
                'bg-surface-container-low border-outline-variant/30 hover:border-primary/50 text-on-surface';
              if (isAnswered) {
                if (idx === currentQuizItem.correctIndex) {
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
                  {isAnswered && idx === currentQuizItem.correctIndex && (
                    <Check size={18} className="text-secondary" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation on Answered */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-xs text-on-surface space-y-1">
              <div className="font-bold text-primary">💡 Giải thích:</div>
              <p>{currentQuizItem.explanation}</p>
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
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-surface-container text-xs flex items-center justify-between gap-2"
                    >
                      <span className="text-on-surface font-medium line-clamp-1">{wq.question}</span>
                      <button
                        onClick={() => onNavigateTab(targetTabKey)}
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
    </div>
  );
}

