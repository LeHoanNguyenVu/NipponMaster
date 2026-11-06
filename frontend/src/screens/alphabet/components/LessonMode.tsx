import { Volume2, Lightbulb, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import KanjiInteractiveCanvas from '../../../components/KanjiInteractiveCanvas';
import KanjiStrokeWriter from '../../../components/KanjiStrokeWriter';
import { getKanaRowLabel, speakJapanese } from '../../../data/kanaData';
import type { LessonModeProps } from '../types';

export function NoLessonSelected({ onGoOverview }: { onGoOverview: () => void }) {
  return (
    <div className="text-center py-16 max-w-md mx-auto">
      <div className="text-5xl mb-4">📖</div>
      <h2 className="text-lg font-bold text-on-surface mb-2">Chưa chọn hàng để học</h2>
      <p className="text-sm text-on-surface-variant mb-6">
        Hãy vào bảng tổng quan và bấm nút <strong>"Học hàng này"</strong> tại hàng chữ cái bạn muốn bắt đầu.
      </p>
      <button
        onClick={onGoOverview}
        className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:opacity-90"
      >
        Vào Bảng Tổng Quan
      </button>
    </div>
  );
}

export default function LessonMode({
  chars,
  idx,
  step,
  row,
  kanaType,
  onNextChar,
  onPrevChar,
  onSetStep,
  isLastChar,
  onComplete,
}: LessonModeProps) {
  const current = chars[idx];
  if (!current) return null;

  const STEPS = [
    { id: 'learn' as const, label: 'Học', emoji: '📖' },
    { id: 'write' as const, label: 'Luyện viết', emoji: '✍️' },
    { id: 'pronounce' as const, label: 'Phát âm', emoji: '🔊' },
  ];

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-on-surface">
            {kanaType === 'hiragana' ? 'Hiragana' : 'Katakana'} — {getKanaRowLabel(row)}
          </h2>
          <span className="text-sm text-on-surface-variant font-medium">
            {idx + 1} / {chars.length}
          </span>
        </div>
        <div className="flex gap-1.5">
          {chars.map((c, i) => (
            <div key={c.char} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`h-1.5 w-full rounded-full transition-colors ${
                  i < idx ? 'bg-secondary' : i === idx ? 'bg-primary' : 'bg-surface-container-high'
                }`}
              />
              <span
                className={`text-xs font-jp font-bold ${
                  i === idx
                    ? 'text-primary'
                    : i < idx
                    ? 'text-secondary'
                    : 'text-on-surface-variant/50'
                }`}
              >
                {c.char}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step switcher */}
      <div className="flex gap-1 p-1 mb-6 bg-surface-container rounded-xl w-fit">
        {STEPS.map((s) => (
          <button
            key={s.id}
            onClick={() => onSetStep(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              step === s.id
                ? 'bg-primary text-on-primary'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {step === 'learn' && (
          <motion.div
            key="learn"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 flex flex-col items-center">
                <div className="w-52 h-52 md:w-64 md:h-64 rounded-3xl bg-surface-container-lowest border-2 border-outline-variant/30 flex items-center justify-center mb-4 shadow-sm">
                  <span className="text-[120px] md:text-[150px] font-bold font-jp text-on-surface leading-none">
                    {current.char}
                  </span>
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{current.romaji}</div>
                <div className="text-sm text-on-surface-variant">
                  {current.strokeCount} nét •{' '}
                  {current.category === 'seion'
                    ? 'Âm trong'
                    : current.category === 'dakuon'
                    ? 'Âm đục'
                    : current.category === 'handakuon'
                    ? 'Bán đục'
                    : 'Âm ghép'}
                </div>
                <button
                  onClick={() => speakJapanese(current.char)}
                  className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-on-secondary font-semibold text-sm cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <Volume2 size={16} /> Nghe phát âm
                </button>
              </div>

              <div className="flex-1 space-y-4 w-full">
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5">
                  <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                    Ví dụ từ vựng
                  </h3>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold font-jp text-on-surface">
                      {current.exampleWord}
                    </span>
                    <button
                      onClick={() => speakJapanese(current.exampleWord)}
                      className="p-2 rounded-lg hover:bg-surface-container cursor-pointer"
                    >
                      <Volume2 size={16} className="text-on-surface-variant" />
                    </button>
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    <span className="font-semibold text-on-surface">{current.exampleReading}</span> —{' '}
                    {current.exampleMeaning}
                  </p>
                </div>

                <div className="bg-tertiary/8 rounded-2xl border border-tertiary/20 p-5">
                  <h3 className="text-sm font-bold text-tertiary mb-2">💡 Mẹo ghi nhớ</h3>
                  <p className="text-sm text-on-surface leading-relaxed">
                    Hãy nhìn kỹ hình dạng chữ <strong className="font-jp text-lg">{current.char}</strong> và liên tưởng nó với một hình ảnh quen thuộc.
                    Ví dụ trong từ &quot;<span className="font-jp">{current.exampleWord}</span>&quot; ({current.exampleMeaning}), chữ <strong className="font-jp">{current.char}</strong> xuất hiện rõ ràng.
                    Luyện viết từ 3-5 lần để thành thạo thứ tự nét!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* BƯỚC LUYỆN VIẾT — TỰ LUYỆN KÈM THỨ TỰ NÉT CHUẨN */}
        {step === 'write' && (
          <motion.div
            key="write"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Cột trái: Bảng vẽ Washi cho user tự luyện viết */}
              <div className="flex-1 flex flex-col items-center w-full">
                <div className="flex items-center justify-between w-full max-w-[320px] mb-3">
                  <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                    <span>✍️ Luyện viết chữ</span>
                    <span className="font-jp text-primary text-2xl font-bold">{current.char}</span>
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    {current.strokeCount} nét
                  </span>
                </div>

                <KanjiInteractiveCanvas
                  guideCharacter={current.char}
                  width={280}
                  height={280}
                />

                <p className="text-xs text-on-surface-variant text-center mt-3 max-w-xs">
                  Sử dụng thanh công cụ để <strong>Hoàn tác</strong>, <strong>Xóa bảng</strong> hoặc{' '}
                  <strong>Ẩn/Hiện chữ mẫu</strong> để tự thử thách.
                </p>
              </div>

              {/* Cột phải: Hướng dẫn thứ tự nét trực quan & Mẹo luyện viết */}
              <div className="flex-1 w-full space-y-4">
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                      <span>Thứ tự nét viết chuẩn</span>
                    </h4>
                    <span className="text-xs font-mono font-bold text-primary">
                      [{current.romaji}] • {current.strokeCount} nét
                    </span>
                  </div>

                  <div className="bg-surface-container/60 rounded-xl p-4 flex flex-col items-center justify-center">
                    <KanjiStrokeWriter
                      key={current.char}
                      character={current.char}
                      size={170}
                      showNumbers={true}
                      standalone={true}
                    />
                    <span className="text-[11px] text-on-surface-variant mt-2 text-center">
                      Bấm nút <span className="font-semibold text-primary">↺ Xem lại nét</span> để xem hoạt ảnh từng nét viết
                    </span>
                  </div>
                </div>

                <div className="bg-amber-500/8 rounded-2xl border border-amber-500/20 p-5 space-y-2.5">
                  <div className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb size={15} className="text-amber-600" />
                    <span>Phương pháp tự luyện viết:</span>
                  </div>
                  <ul className="text-xs text-on-surface-variant space-y-1.5 list-disc pl-4 leading-relaxed">
                    <li>
                      <strong>Quan sát số nét:</strong> Nhìn các số thứ tự màu sắc (1, 2, 3...) ở khung bên trên để biết nét nào đặt bút trước.
                    </li>
                    <li>
                      <strong>Tập viết theo mẫu:</strong> Đồ theo nét mờ trên bảng vẽ bên trái 3–5 lần cho tới khi quen tay.
                    </li>
                    <li>
                      <strong>Thử thách nhớ mặt chữ:</strong> Bấm nút <strong>&quot;Ẩn mẫu&quot;</strong> ở thanh công cụ để tự viết lại theo trí nhớ.
                    </li>
                    <li>
                      Khi đã quen tay và tự tin, bấm <strong>&quot;Phát âm&quot;</strong> bên dưới để hoàn thành bài học!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'pronounce' && (
          <motion.div
            key="pronounce"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="max-w-md mx-auto text-center space-y-6">
              <div className="w-48 h-48 rounded-3xl bg-surface-container-lowest border-2 border-outline-variant/30 flex items-center justify-center mx-auto shadow-sm">
                <span className="text-[100px] font-bold font-jp text-on-surface leading-none">
                  {current.char}
                </span>
              </div>

              <div>
                <div className="text-2xl font-bold text-primary mb-1">{current.romaji}</div>
                <p className="text-sm text-on-surface-variant">Bấm các nút bên dưới để nghe phát âm chuẩn bản xứ</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => speakJapanese(current.char, 0.6)}
                  className="w-full py-3 rounded-xl bg-secondary text-on-secondary font-bold text-sm cursor-pointer hover:opacity-90 flex items-center justify-center gap-2 transition-opacity"
                >
                  <Volume2 size={18} /> Phát âm chậm: {current.char}
                </button>
                <button
                  onClick={() => speakJapanese(current.char, 1.0)}
                  className="w-full py-3 rounded-xl bg-secondary/20 text-secondary font-bold text-sm cursor-pointer hover:bg-secondary/30 flex items-center justify-center gap-2 transition-colors"
                >
                  <Volume2 size={18} /> Phát âm chuẩn: {current.char}
                </button>
                <button
                  onClick={() => speakJapanese(current.exampleWord, 0.7)}
                  className="w-full py-3 rounded-xl bg-tertiary/10 text-tertiary font-bold text-sm cursor-pointer hover:bg-tertiary/20 flex items-center justify-center gap-2 transition-colors"
                >
                  <Volume2 size={18} /> Nghe ví dụ: {current.exampleWord} ({current.exampleMeaning})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-outline-variant/20">
        <button
          onClick={onPrevChar}
          disabled={idx === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} /> Chữ trước
        </button>

        {isLastChar && step === 'pronounce' ? (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
          >
            <Sparkles size={16} /> Hoàn thành hàng → Luyện tập
          </button>
        ) : (
          <button
            onClick={() => {
              if (step === 'learn') onSetStep('write');
              else if (step === 'write') onSetStep('pronounce');
              else onNextChar();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary font-semibold text-sm cursor-pointer hover:opacity-90 transition-opacity"
          >
            {step === 'pronounce' ? 'Chữ tiếp theo' : step === 'learn' ? 'Luyện viết' : 'Phát âm'}{' '}
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

