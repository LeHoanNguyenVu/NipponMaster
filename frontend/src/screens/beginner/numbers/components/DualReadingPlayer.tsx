import { Volume2 } from 'lucide-react';
import { speakJapanese } from '../../../../data/kanaData';
import type { DualReadingPlayerProps } from '../types';

export default function DualReadingPlayer({
  hiragana,
  romaji,
  colorClass = 'text-primary',
}: DualReadingPlayerProps) {
  const partsH = hiragana.split('/').map((s) => s.trim());
  const partsR = romaji.split('/').map((s) => s.trim());

  if (partsH.length > 1) {
    return (
      <div
        className="flex flex-col items-center w-full mt-1.5 space-y-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Văn bản Hiragana & Romaji chuẩn trực quan */}
        <div className="text-center">
          <span className={`text-sm font-bold font-jp block ${colorClass}`}>{hiragana}</span>
          <span className="text-xs text-on-surface-variant font-mono block">{romaji}</span>
        </div>

        {/* 2 Nút Loa Độc Lập Cho Từng Cách Đọc */}
        <div className="flex items-center justify-center gap-1.5 w-full pt-0.5">
          {partsH.map((h, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                speakJapanese(h);
              }}
              className="flex-1 max-w-[105px] px-2 py-1 rounded-xl bg-primary/10 hover:bg-primary hover:text-white text-primary border border-primary/25 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs group/btn"
              title={`Bấm để nghe cách đọc ${i + 1}: ${h} (${partsR[i] || ''})`}
            >
              <Volume2
                size={13}
                className="text-primary group-hover/btn:text-white group-hover/btn:scale-115 transition-transform flex-shrink-0"
              />
              <span className="font-jp truncate">{h}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full mt-1">
      <div className="flex items-center justify-center gap-1">
        <span className={`text-sm font-semibold ${colorClass}`}>{hiragana}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            speakJapanese(hiragana);
          }}
          className="p-0.5 rounded text-on-surface-variant/60 hover:text-primary transition-colors cursor-pointer"
          title={`Nghe: ${hiragana}`}
        >
          <Volume2 size={12} />
        </button>
      </div>
      <span className="text-xs text-on-surface-variant font-mono">{romaji}</span>
    </div>
  );
}

