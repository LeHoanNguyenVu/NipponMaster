import { Zap, Check, ArrowRight } from 'lucide-react';
import { REFLEX_PROMPTS } from '../../../../data/numbersData';
import type { NumberReflexGameTabProps } from '../types';

export default function NumberReflexGameTab({
  reflexIdx,
  reflexStreak,
  reflexSelected,
  reflexFeedback,
  shuffledReflexOptions,
  handleReflexChoice,
  handleNextReflex,
}: NumberReflexGameTabProps) {
  const currentPrompt = REFLEX_PROMPTS[reflexIdx];

  return (
    <div className="max-w-xl mx-auto space-y-6">
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
        <span className="text-on-surface-variant">
          Câu {reflexIdx + 1}/{REFLEX_PROMPTS.length} (Tổng 30 câu ngẫu nhiên)
        </span>
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
              let btnClass =
                'bg-surface-container-low border-outline-variant/30 hover:border-primary/50 text-on-surface';

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
                  <span className="text-xs text-on-surface-variant block font-mono">
                    {opt.romaji}
                  </span>
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
                Chưa chính xác! Đáp án đúng: {currentPrompt.correctReading} (
                {currentPrompt.correctRomaji})
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
    </div>
  );
}

