import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, CheckCircle2, Maximize2, PenTool, Volume2 } from 'lucide-react';
import type { ChapterDetailResponse } from '../types';
import {
  N1_REVIEW_PAGES_CONFIG,
  N2_REVIEW_PAGES_CONFIG,
  N3_REVIEW_PAGES_CONFIG,
} from '../reviewConfigs';
import {
  N3_CH1_READING_THEMES,
  N3_CH1_WRITING_THEMES,
  N3_CH2_READING_THEMES,
  N3_CH2_WRITING_THEMES,
  N4_CH1_READING_THEMES,
  N4_CH1_WRITING_THEMES,
  SCENARIO_THEMES,
  WRITING_THEMES,
} from '../themes';

interface KanjiContextTabProps {
  chapterDetail: ChapterDetailResponse;
  selectedLevel: string;
  readingAnswers: Record<number, string>;
  setReadingAnswers: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  writingAnswers: Record<number, string>;
  setWritingAnswers: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  speakJapanese: (text: string) => void;
  onPracticeInStudio: (character: string) => void;
  onOpenReviewPage: () => void;
}

export function KanjiContextTab({
  chapterDetail,
  selectedLevel,
  readingAnswers,
  setReadingAnswers,
  writingAnswers,
  setWritingAnswers,
  speakJapanese,
  onPracticeInStudio,
  onOpenReviewPage,
}: KanjiContextTabProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="space-y-6">
      {/* Header bar với nút Xem trang sách gốc P.18 */}
      <div className="bg-white border border-[#e7e5e4] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#b91c1c]" />
          <div>
            <h3 className="font-serif font-bold text-sm text-[#1c1917]">
              {chapterDetail.chapter.jlptLevel === 'N3' && chapterDetail.chapter.chapterNumber === 1
                ? 'Tình Huống Ngữ Cảnh Chuẩn Giáo Trình N3 (Chương 1: 生活)'
                : chapterDetail.chapter.jlptLevel === 'N4' && chapterDetail.chapter.chapterNumber === 1
                  ? 'Tình Huống Ngữ Cảnh Chuẩn Giáo Trình N4 (Chương 1: 家族)'
                  : `Tình Huống Ngữ Cảnh Chuẩn Giáo Trình (Chương ${chapterDetail.chapter.chapterNumber})`}
            </h3>
            <p className="text-[11px] text-[#78716c]">
              {chapterDetail.chapter.jlptLevel === 'N3' && chapterDetail.chapter.chapterNumber === 1
                ? '20 câu luyện đọc & viết chữ Hán kèm từ vựng ứng dụng về đời sống hàng ngày'
                : chapterDetail.chapter.jlptLevel === 'N4' && chapterDetail.chapter.chapterNumber === 1
                  ? '20 câu luyện đọc & viết chữ Hán kèm 12 từ vựng ứng dụng về đời sống gia đình'
                  : '20 câu luyện đọc & viết chữ Hán trong bối cảnh đời sống Nhật Bản thực tế'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenReviewPage}
          className="px-3.5 py-1.5 border border-[#b91c1c] bg-[#fef2f2] hover:bg-[#b91c1c] text-[#b91c1c] hover:text-white text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer shadow-2xs w-fit rounded-none"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>
            {selectedLevel === 'N1'
              ? `Xem trang bài tập trong sách N1 (Trang ${N1_REVIEW_PAGES_CONFIG[chapterDetail?.chapter.chapterNumber || 1]?.page || 17})`
              : selectedLevel === 'N2'
                ? `Xem trang bài tập trong sách N2 (Trang ${N2_REVIEW_PAGES_CONFIG[chapterDetail?.chapter.chapterNumber || 1]?.page || 15})`
                : selectedLevel === 'N3'
                  ? `Xem trang bài tập trong sách N3 (Trang ${N3_REVIEW_PAGES_CONFIG[chapterDetail?.chapter.chapterNumber || 1]?.page || 12})`
                  : selectedLevel === 'N4'
                    ? 'Xem trang bài tập trong sách N4'
                    : 'Xem trang bài tập gốc trong sách (P.18)'}
          </span>
          <Maximize2 className="w-3 h-3 opacity-70" />
        </button>
      </div>

      {/* Phần 1: よみましょう (Đọc câu ngữ cảnh - Thẻ trực quan) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#e7e5e4]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#b91c1c]" />
            <h4 className="font-serif font-bold text-base text-[#1c1917]">
              1. よみましょう (Đọc câu ngữ cảnh)
            </h4>
            <span className="text-xs text-[#78716c]">
              — Nghe phát âm chuẩn & kiểm tra cách đọc từng chữ
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-[#78716c]">
            {chapterDetail.readingExercises?.length || 0} CÂU
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapterDetail.readingExercises?.map((ex, idx) => {
            const isN3Ch1 = chapterDetail.chapter.jlptLevel === 'N3' && chapterDetail.chapter.chapterNumber === 1;
            const isN3Ch2 = chapterDetail.chapter.jlptLevel === 'N3' && chapterDetail.chapter.chapterNumber === 2;
            const isN4Ch1 = chapterDetail.chapter.jlptLevel === 'N4' && chapterDetail.chapter.chapterNumber === 1;
            const theme = isN3Ch1
              ? (N3_CH1_READING_THEMES[idx + 1] || {
                emoji: '📖',
                badge: 'Chương 1: 生活',
                scene: 'Ngữ cảnh đời sống',
                meaningVi: ex.explanation || '',
              })
              : isN3Ch2
                ? (N3_CH2_READING_THEMES[idx + 1] || {
                  emoji: '🏡',
                  badge: 'Chương 2: 家',
                  scene: 'Không gian sống',
                  meaningVi: ex.explanation || '',
                })
                : isN4Ch1
                  ? (N4_CH1_READING_THEMES[idx + 1] || {
                    emoji: '📖',
                    badge: 'Chương 1: 家族',
                    scene: 'Ngữ cảnh giao tiếp',
                    meaningVi: ex.explanation || '',
                  })
                  : (SCENARIO_THEMES[idx + 1] || {
                    emoji: '📖',
                    badge: `Tình huống ${idx + 1}`,
                    scene: 'Ngữ cảnh giao tiếp',
                    iconBg: 'bg-stone-50 text-stone-700 border-stone-200',
                    meaningVi: ex.explanation || '',
                  });
            let options: string[];
            try {
              options = typeof ex.optionsJson === 'string' ? JSON.parse(ex.optionsJson) : (ex.optionsJson || []);
            } catch {
              options = [ex.correctAnswer];
            }
            const selected = readingAnswers[ex.id];

            return (
              <div
                key={ex.id}
                className="bg-white border border-[#e7e5e4] p-4.5 flex flex-col justify-between hover:border-[#b91c1c]/40 transition-all shadow-xs"
              >
                {/* Header thẻ: Emoji minh họa & Badge tình huống + Nút nghe âm thanh */}
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#f5f5f4]">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl p-1 bg-[#fafaf9] rounded border border-[#e7e5e4]">{theme.emoji}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold font-serif text-[#1c1917]">
                            {theme.badge}
                          </span>
                          <span className="text-[9px] font-mono px-1 py-0.2 bg-[#f5f5f4] text-[#78716c]">
                            #{idx + 1}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#a8a29e]">{theme.scene}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakJapanese(ex.questionText)}
                      className="p-1.5 hover:bg-[#fef2f2] text-[#78716c] hover:text-[#b91c1c] transition-colors rounded-none cursor-pointer flex items-center gap-1 text-xs font-mono font-bold"
                      title="Nghe phát âm chuẩn giọng bản xứ"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span className="hidden sm:inline text-[10px]">Phát âm</span>
                    </button>
                  </div>

                  {/* Câu tiếng Nhật với chữ Hán nổi bật */}
                  <div className="font-serif text-base font-bold text-[#1c1917] leading-relaxed mb-1.5">
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

                  {/* Dịch nghĩa tiếng Việt */}
                  <p className="text-xs text-[#78716c] italic mb-3">
                    &ldquo;{theme.meaningVi}&rdquo;
                  </p>
                </div>

                {/* Lựa chọn cách đọc tương tác */}
                <div className="pt-2 border-t border-[#f5f5f4] space-y-2">
                  <div className="text-[10px] uppercase font-mono text-[#a8a29e]">
                    Chọn cách đọc chuẩn của chữ trong ngoặc:
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {options.map((opt) => {
                      const isChosen = selected === opt;
                      const isCorrect = opt === ex.correctAnswer;
                      let btnStyle = 'bg-[#fafaf9] border-[#e7e5e4] text-[#44403c] hover:bg-white hover:border-[#d6d3d1]';
                      if (selected) {
                        if (isCorrect) {
                          btnStyle = 'bg-[#15803d] text-white border-[#15803d] font-bold shadow-xs';
                        } else if (isChosen) {
                          btnStyle = 'bg-[#dc2626] text-white border-[#dc2626] font-bold';
                        } else {
                          btnStyle = 'opacity-40 bg-[#f5f5f4] text-[#a8a29e] border-[#e7e5e4]';
                        }
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setReadingAnswers((prev) => ({
                              ...prev,
                              [ex.id]: opt,
                            }))
                          }
                          className={`px-2.5 py-1.5 text-xs font-serif text-center border transition-all cursor-pointer rounded-none ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Giải thích ngữ cảnh khi đã chọn */}
                  {selected && (
                    <div className="p-2.5 bg-[#fefce8] border border-[#fef08a] text-[11px] text-[#713f12] mt-2">
                      <div className="font-bold flex items-center gap-1 font-mono text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
                        <span>Đáp án: {ex.correctAnswer}</span>
                      </div>
                      {ex.explanation && (
                        <div className="mt-1 text-[#854d0e] leading-snug">{ex.explanation}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phần 2: かきましょう (Viết chữ Hán) */}
      <div className="space-y-3 pt-4 border-t border-[#e7e5e4]">
        <div className="flex items-center justify-between pb-2 border-b border-[#e7e5e4]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#b91c1c]" />
            <h4 className="font-serif font-bold text-base text-[#1c1917]">
              2. かきましょう (Viết chữ Hán)
            </h4>
            <span className="text-xs text-[#78716c]">
              — Đọc câu Hiragana và chọn chữ Kanji tương ứng
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-[#78716c]">
            {chapterDetail.writingExercises?.length || 0} CÂU
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapterDetail.writingExercises?.map((ex, idx) => {
            const isN3Ch1 = chapterDetail.chapter.jlptLevel === 'N3' && chapterDetail.chapter.chapterNumber === 1;
            const isN3Ch2 = chapterDetail.chapter.jlptLevel === 'N3' && chapterDetail.chapter.chapterNumber === 2;
            const isN4Ch1 = chapterDetail.chapter.jlptLevel === 'N4' && chapterDetail.chapter.chapterNumber === 1;
            const theme = isN3Ch1
              ? (N3_CH1_WRITING_THEMES[idx + 1] || {
                emoji: '✍️',
                badge: 'Chương 1: 生活',
                scene: 'Thực hành chữ viết',
                meaningVi: ex.explanation || '',
              })
              : isN3Ch2
                ? (N3_CH2_WRITING_THEMES[idx + 1] || {
                  emoji: '🏡',
                  badge: 'Chương 2: 家',
                  scene: 'Thực hành chữ viết',
                  meaningVi: ex.explanation || '',
                })
                : isN4Ch1
                  ? (N4_CH1_WRITING_THEMES[idx + 1] || {
                    emoji: '✍️',
                    badge: 'Chương 1: 家族',
                    scene: 'Thực hành chữ viết',
                    meaningVi: ex.explanation || '',
                  })
                  : (WRITING_THEMES[idx + 1] || {
                    emoji: '✍️',
                    badge: `Chữ Hán ${idx + 1}`,
                    scene: 'Thực hành chữ viết',
                    meaningVi: ex.explanation || '',
                  });
            let options: string[];
            try {
              options = typeof ex.optionsJson === 'string' ? JSON.parse(ex.optionsJson) : (ex.optionsJson || []);
            } catch {
              options = [ex.correctAnswer];
            }
            const selected = writingAnswers[ex.id];

            return (
              <div
                key={ex.id}
                className="bg-white border border-[#e7e5e4] p-4.5 flex flex-col justify-between hover:border-[#b91c1c]/40 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#f5f5f4]">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl p-1 bg-[#fafaf9] rounded border border-[#e7e5e4]">{theme.emoji}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold font-serif text-[#1c1917]">
                            {theme.badge}
                          </span>
                          <span className="text-[9px] font-mono px-1 py-0.2 bg-[#f5f5f4] text-[#78716c]">
                            #{idx + 1}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#a8a29e]">{theme.scene}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakJapanese(ex.questionText)}
                      className="p-1.5 hover:bg-[#fef2f2] text-[#78716c] hover:text-[#b91c1c] transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono font-bold"
                      title="Nghe phát âm câu"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span className="hidden sm:inline text-[10px]">Phát âm</span>
                    </button>
                  </div>

                  <div className="font-serif text-base font-bold text-[#1c1917] leading-relaxed mb-1.5">
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

                  <p className="text-xs text-[#78716c] italic mb-3">
                    &ldquo;{theme.meaningVi}&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-[#f5f5f4] space-y-2">
                  <div className="text-[10px] uppercase font-mono text-[#a8a29e]">
                    Chọn chữ Kanji tương ứng:
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {options.map((opt) => {
                      const isChosen = selected === opt;
                      const isCorrect = opt === ex.correctAnswer;
                      let btnStyle = 'bg-[#fafaf9] border-[#e7e5e4] text-[#1c1917] hover:bg-white';
                      if (selected) {
                        if (isCorrect) {
                          btnStyle = 'bg-[#15803d] text-white border-[#15803d] font-bold shadow-xs';
                        } else if (isChosen) {
                          btnStyle = 'bg-[#dc2626] text-white border-[#dc2626] font-bold';
                        } else {
                          btnStyle = 'opacity-40 bg-[#f5f5f4] text-[#a8a29e] border-[#e7e5e4]';
                        }
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setWritingAnswers((prev) => ({
                              ...prev,
                              [ex.id]: opt,
                            }))
                          }
                          className={`py-2 text-sm font-serif font-bold text-center border transition-all cursor-pointer rounded-none ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {selected && (
                    <div className="p-2.5 bg-[#fefce8] border border-[#fef08a] text-[11px] text-[#713f12] mt-2 flex items-center justify-between">
                      <div>
                        <div className="font-bold flex items-center gap-1 font-mono text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
                          <span>Chữ Hán chuẩn: {ex.correctAnswer}</span>
                        </div>
                        {ex.explanation && (
                          <div className="mt-0.5 text-[#854d0e]">{ex.explanation}</div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => onPracticeInStudio(ex.correctAnswer.charAt(0))}
                        className="px-2.5 py-1 bg-[#1c1917] hover:bg-[#292524] text-white text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap ml-2"
                        title="Luyện viết chữ này trên bảng vẽ"
                      >
                        <PenTool className="w-3 h-3" />
                        <span>Tập vẽ</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phần 3: Bảng từ vựng ứng dụng */}
      {chapterDetail.vocabularies?.length > 0 && (
        <div className="bg-white border border-[#e7e5e4] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#e7e5e4]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#b91c1c]" />
              <h3 className="font-serif font-bold text-base text-[#1c1917]">
                3. Từ vựng ứng dụng xuất hiện trong chương
              </h3>
            </div>
            <span className="text-xs text-[#78716c] font-mono font-bold">
              {chapterDetail.vocabularies.length} TỪ
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {chapterDetail.vocabularies.map((v) => (
              <div
                key={v.id}
                className="p-3 border border-[#e7e5e4] bg-[#fafaf9] flex items-center justify-between hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => speakJapanese(v.word)}
                    className="p-1 text-[#78716c] hover:text-[#b91c1c] hover:bg-[#fef2f2] transition-colors cursor-pointer"
                    title="Nghe phát âm từ"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif font-bold text-sm text-[#1c1917]">
                        {v.word}
                      </span>
                    </div>
                    <span className="text-xs text-[#78716c] font-mono">
                      ({v.reading})
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#44403c] font-medium text-right">
                  {isEn ? v.meaningEn : v.meaningVi}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

