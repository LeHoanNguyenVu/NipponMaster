import React from 'react';
import { BookOpen } from 'lucide-react';
import type { GrammarCheatsheetItem } from '../types';

interface GrammarFormulaTabProps {
  cheatsheets?: GrammarCheatsheetItem[];
}

export const GrammarFormulaTab: React.FC<GrammarFormulaTabProps> = ({ cheatsheets }) => {
  return (
    <div className="space-y-6">
      {cheatsheets && cheatsheets.length > 0 ? (
        <div className="space-y-4">
          {cheatsheets.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 border border-[#e7e5e4] bg-[#fafaf9] hover:bg-white transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1c1917] text-white flex items-center justify-center text-xs font-mono font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-base font-serif font-bold text-[#b91c1c]">
                    {item.pattern}
                  </span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-mono font-bold bg-[#f5f5f4] text-[#44403c] border border-[#e7e5e4]">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs my-2.5">
                <div className="p-2.5 bg-white border border-[#e7e5e4]">
                  <span className="text-[#a8a29e] font-mono uppercase block text-[10px] font-bold">
                    Ý NGHĨA:
                  </span>
                  <span className="font-semibold text-[#1c1917] text-sm">
                    {item.meaning}
                  </span>
                </div>
                <div className="p-2.5 bg-white border border-[#e7e5e4]">
                  <span className="text-[#a8a29e] font-mono uppercase block text-[10px] font-bold">
                    CẤU TRÚC KẾT HỢP:
                  </span>
                  <span className="font-mono text-[#b91c1c] font-bold">
                    {item.structure}
                  </span>
                </div>
              </div>

              {item.nuance && (
                <div className="text-xs text-[#44403c] bg-[#f5f5f4] p-3 border border-[#e7e5e4] mb-3 leading-relaxed">
                  <span className="font-bold text-[#1c1917]">💡 Sắc thái & Lưu ý: </span>
                  {item.nuance}
                </div>
              )}

              {item.examples && Array.isArray(item.examples) && item.examples.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-[#78716c] uppercase">
                    VÍ DỤ TIÊU BIỂU:
                  </span>
                  {item.examples.map((ex: { ja?: string; vi?: string }, exIdx: number) => (
                    <div
                      key={exIdx}
                      className="p-2.5 bg-white border border-[#e7e5e4] text-xs flex flex-col gap-0.5"
                    >
                      <span className="font-serif font-bold text-sm text-[#1c1917]">
                        {ex.ja}
                      </span>
                      <span className="text-[#78716c]">{ex.vi}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 px-4 text-center border border-dashed border-[#e7e5e4] bg-[#fafaf9] flex flex-col items-center justify-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-white border border-[#e7e5e4] flex items-center justify-center text-[#78716c] shadow-2xs">
            <BookOpen className="w-5 h-5 text-[#b91c1c]" />
          </div>
          <div className="text-sm font-serif font-bold text-[#1c1917]">
            Chưa có bảng tóm tắt công thức cho bài học này
          </div>
          <p className="text-xs text-[#78716c] max-w-md leading-relaxed font-sans">
            Dữ liệu tóm tắt công thức trọng tâm cho bài giảng này đang được ban biên tập giáo trình NipponMaster hoàn thiện. Bạn hãy theo dõi các mốc thời gian trong video hoặc chuyển sang tab <strong>2. Bài Test Kiến Thức</strong> để luyện tập!
          </p>
        </div>
      )}
    </div>
  );
};

