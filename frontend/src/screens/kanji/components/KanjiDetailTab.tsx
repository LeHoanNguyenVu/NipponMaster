import { Fragment } from 'react';
import { PenTool } from 'lucide-react';
import KanjiStrokeWriter from '../../../components/KanjiStrokeWriter';
import type { ChapterKanjiItem } from '../types';

interface KanjiDetailTabProps {
  kanjis: ChapterKanjiItem[];
  activeKanji: ChapterKanjiItem | null;
  setActiveKanji: (kanji: ChapterKanjiItem) => void;
  onPracticeInStudio: (character: string) => void;
}

export function KanjiDetailTab({
  kanjis,
  activeKanji,
  setActiveKanji,
  onPracticeInStudio,
}: KanjiDetailTabProps) {
  return (
    <div className="space-y-6">
      {/* Danh sách chữ Hán trong chương */}
      <div className="bg-white border border-[#e7e5e4] p-4">
        <div className="text-xs uppercase font-mono text-[#78716c] mb-3">
          CHỌN CHỮ HÁN ĐỂ XEM CHI TIẾT & HOẠT ẢNH NÉT VẼ:
        </div>

        {/* Grid Kanji */}
        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
          {kanjis.map((k) => {
            const idx = kanjis.findIndex((item) => item.id === k.id);
            const isSelected = activeKanji?.id === k.id;
            return (
              <button
                key={k.id}
                type="button"
                onClick={() => setActiveKanji(k)}
                className={`aspect-square flex flex-col items-center justify-center border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#b91c1c] bg-[#b91c1c] text-white shadow'
                    : 'border-[#e7e5e4] bg-[#fafaf9] hover:bg-white text-[#1c1917]'
                }`}
              >
                <span className="text-xl font-serif">{k.character}</span>
                <span className={`text-[10px] ${isSelected ? 'text-red-100' : 'text-[#a8a29e]'}`}>
                  {idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Khung chi tiết chữ Hán đang chọn */}
      {activeKanji && (
        <div className="bg-white border border-[#e7e5e4] p-5 sm:p-6 shadow-xs">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* CỘT TRÁI: DUAL KHUNG HOẠT ẢNH NÉT BÚT & CẤU THÀNH BỘ THỦ PHÓNG TO */}
            <div className="xl:col-span-8 flex flex-col bg-[#fafaf9] border border-[#e7e5e4] p-4">
              <div className="text-xs uppercase font-mono text-[#78716c] mb-3 flex items-center justify-between">
                <span className="font-bold text-[#1c1917]">
                  HOẠT ẢNH NÉT BÚT & LƯỚI THƯ PHÁP CHUẨN
                </span>
                <span className="text-[10px] bg-white border border-[#e7e5e4] px-1.5 py-0.5 font-bold font-mono">
                  {activeKanji.strokeCount} NÉT
                </span>
              </div>

              {/* 2 khung hiển thị song song kế bên nhau: Nét bút cố định 175px, Cấu thành chiếm toàn bộ phần còn lại */}
              <div className="flex flex-col sm:flex-row gap-3.5 items-stretch">
                {/* Khung 1: Hoạt ảnh nét bút động (Demo) */}
                <div className="w-full sm:w-[175px] flex-shrink-0 bg-white border border-[#e7e5e4] p-2 flex flex-col items-center justify-between">
                  <div className="text-[10px] font-mono font-bold text-[#78716c] mb-1.5 uppercase w-full text-center pb-1 border-b border-[#f5f5f4]">
                    Hoạt ảnh nét bút
                  </div>
                  <div className="w-full flex-1 flex items-center justify-center py-1">
                    <KanjiStrokeWriter
                      character={activeKanji.character}
                      size={145}
                      showNumbers={true}
                    />
                  </div>
                </div>

                {/* Khung 2: Cấu thành bộ thủ mở rộng thoáng đãng */}
                <div className="flex-1 min-w-0 bg-white border border-[#e7e5e4] p-3.5 flex flex-col justify-between">
                  <div className="text-[10px] font-mono font-bold text-[#78716c] mb-2 uppercase w-full pb-1.5 border-b border-[#f5f5f4] flex items-center justify-between">
                    <span>Cấu thành bộ thủ</span>
                    <span className="text-[9px] bg-[#f5f5f4] text-[#78716c] px-1.5 py-0.5 font-bold">
                      {activeKanji.strokeCount} NÉT
                    </span>
                  </div>

                  <div className="w-full flex-1 flex flex-col items-center justify-center py-4 px-3 bg-[#fafaf9] border border-[#f5f5f4] min-h-[175px]">
                    {/* Cụm bộ thủ cấu thành phóng to, thẳng hàng ngang hoàn hảo */}
                    <div className="w-full flex flex-col items-center justify-center gap-2.5">
                      <div className="text-[11px] font-mono font-bold text-[#78716c] uppercase tracking-wider text-center">
                        Bộ phận ghép thành:
                      </div>
                      <div className="w-full flex items-center justify-center my-1.5">
                        {(() => {
                          const rawComponents = activeKanji.strokeGuide
                            ? activeKanji.strokeGuide.split(/->|\+/).map((p) => p.trim()).filter(Boolean)
                            : [activeKanji.character];

                          // Expand multipliers e.g. "口 x 4" -> ["口", "口", "口", "口"]
                          const components: string[] = [];
                          for (const raw of rawComponents) {
                            const match = raw.match(/^(.+?)\s*[xX*×]\s*(\d+)$/);
                            if (match) {
                              const char = match[1].trim();
                              const count = Math.min(Math.max(parseInt(match[2], 10), 1), 6);
                              for (let i = 0; i < count; i++) {
                                components.push(char);
                              }
                            } else {
                              components.push(raw);
                            }
                          }

                          const isGrid = components.length > 2;

                          if (isGrid) {
                            return (
                              <div className="grid grid-cols-3 gap-2.5 max-w-[240px] justify-items-center mx-auto">
                                {components.map((comp, pIdx) => (
                                  <div
                                    key={pIdx}
                                    className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white border-2 border-[#e7e5e4] shadow-xs hover:border-[#b91c1c] transition-colors"
                                  >
                                    <span className="text-2xl sm:text-3xl font-serif font-bold text-[#b91c1c] leading-none select-none">
                                      {comp}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            );
                          }

                          return (
                            <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
                              {components.map((comp, pIdx) => (
                                <Fragment key={pIdx}>
                                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 flex items-center justify-center bg-white border-2 border-[#e7e5e4] shadow-xs hover:border-[#b91c1c] transition-colors">
                                    <span className="text-3xl sm:text-4xl font-serif font-bold text-[#b91c1c] leading-none select-none">
                                      {comp}
                                    </span>
                                  </div>
                                  {pIdx < components.length - 1 && (
                                    <span className="text-xl sm:text-2xl font-mono font-bold text-[#a8a29e] flex-shrink-0 select-none px-0.5">
                                      +
                                    </span>
                                  )}
                                </Fragment>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nút thực hành tự vẽ chữ */}
              <div className="mt-4 pt-3 border-t border-[#e7e5e4]">
                <button
                  type="button"
                  onClick={() => onPracticeInStudio(activeKanji.character)}
                  className="w-full py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-sm"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Thực hành tự vẽ nét này</span>
                </button>
              </div>
            </div>

            {/* CỘT PHẢI: THÔNG TIN NGỮ ÂM, BỘ THỦ, MẸO NHỚ (THU GỌN VỪA VẶN) */}
            <div className="xl:col-span-4 space-y-4">
              <div>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-4xl font-serif font-bold text-[#1c1917]">
                    {activeKanji.character}
                  </h3>
                  <span className="text-lg font-serif font-bold text-[#b91c1c]">
                    {activeKanji.hanViet}
                  </span>
                  <span className="text-sm text-[#78716c]">
                    {activeKanji.meaning}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#e7e5e4]">
                <div>
                  <div className="text-[11px] font-mono uppercase text-[#a8a29e]">ÂM ON (Hán-Nhật)</div>
                  <div className="text-base font-serif font-bold text-[#1c1917] mt-0.5">
                    {activeKanji.onReading || '—'}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-[#a8a29e]">ÂM KUN (Thuần Nhật)</div>
                  <div className="text-base font-serif font-bold text-[#1c1917] mt-0.5">
                    {activeKanji.kunReading || '—'}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-[#a8a29e]">SỐ NÉT VIẾT</div>
                  <div className="text-sm font-medium text-[#44403c] mt-0.5">
                    {activeKanji.strokeCount} nét
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-[#a8a29e]">BỘ THỦ (RADICAL)</div>
                  <div className="text-sm font-medium text-[#44403c] mt-0.5">
                    {activeKanji.radical || '—'}
                  </div>
                </div>
              </div>

              {/* Mẹo nhớ siêu trí nhớ */}
              {activeKanji.mnemonicHint && (
                <div className="p-3 bg-[#fefce8] border border-[#fef08a] flex items-start gap-3">
                  <span className="text-xl">{activeKanji.mnemonicIcon || '💡'}</span>
                  <div>
                    <div className="text-xs font-bold text-[#854d0e] uppercase font-mono">
                      MẸO LIÊN TƯỞNG NHỚ CHỮ:
                    </div>
                    <p className="text-xs text-[#713f12] mt-0.5 leading-relaxed">
                      {activeKanji.mnemonicHint}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

