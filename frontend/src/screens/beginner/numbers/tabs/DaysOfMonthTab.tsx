import { useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { DAYS_OF_MONTH_DATA } from '../../../../data/numbersData';
import { speakJapanese } from '../../../../data/kanaData';
import DualReadingPlayer from '../components/DualReadingPlayer';
import type { DaysOfMonthTabProps } from '../types';

export default function DaysOfMonthTab({
  calendarFilter,
  setCalendarFilter,
}: DaysOfMonthTabProps) {
  // Filtered days of month
  const displayedDays = useMemo(() => {
    if (calendarFilter === 'special') {
      return DAYS_OF_MONTH_DATA.filter((d) => d.isSpecial);
    }
    return DAYS_OF_MONTH_DATA;
  }, [calendarFilter]);

  return (
    <div className="space-y-6">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <Calendar className="text-primary" size={20} />
            <span>Bảng Ngày Trong Tháng (1 đến 31 Ngày)</span>
          </h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            10 ngày đầu tháng, ngày 14, 20 và 24 là bất quy tắc bắt buộc phải thuộc lòng. Bấm vào ô ngày để nghe phát âm!
          </p>
        </div>

        {/* Filter button */}
        <div className="flex gap-2">
          <button
            onClick={() => setCalendarFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              calendarFilter === 'all'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Tất cả 31 ngày
          </button>
          <button
            onClick={() => setCalendarFilter('special')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
              calendarFilter === 'special'
                ? 'bg-crimson-600 text-white'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span>Chỉ ngày bất quy tắc (14 ngày)</span>
          </button>
        </div>
      </div>

      {/* Mẹo phân biệt dễ nhầm */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
          <span className="font-bold text-amber-800 flex items-center gap-1.5">
            <span>⚠️ Ngày 4 vs Ngày 8:</span>
          </span>
          <p className="text-on-surface-variant">
            • Ngày 4 = <strong>四日 (よっか - yokka)</strong> (Âm ngắt sokuon)
            <br />• Ngày 8 = <strong>八日 (ようか - youka)</strong> (Trường âm ou kéo dài)
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-secondary/10 border border-secondary/30 text-xs space-y-1">
          <span className="font-bold text-secondary flex items-center gap-1.5">
            <span>🌟 Ngày 1 vs Khoảng 1 ngày:</span>
          </span>
          <p className="text-on-surface-variant">
            • Ngày mùng 1 đầu tháng = <strong>一日 (ついたち - tsuitachi)</strong>
            <br />• Khoảng thời gian 1 ngày = <strong>一日 (いちにち - ichinichi)</strong>
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-crimson-500/10 border border-crimson-500/30 text-xs space-y-1">
          <span className="font-bold text-crimson-600 flex items-center gap-1.5">
            <span>🌟 Ngày 20 vs 20 Tuổi:</span>
          </span>
          <p className="text-on-surface-variant">
            • Ngày 20 = <strong>二十日 (はつか - hatsuka)</strong>
            <br />• 20 Tuổi = <strong>二十歳 (はたち - hatachi)</strong>
          </p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
        {displayedDays.map((d) => {
          const hasMulti = d.hiragana.includes('/');
          return (
            <div
              key={d.day}
              onClick={() => {
                if (!hasMulti) speakJapanese(d.hiragana);
              }}
              className={`p-3.5 rounded-2xl border text-center cursor-pointer transition-all hover:scale-103 flex flex-col justify-between ${
                d.isSpecial
                  ? 'bg-crimson-500/10 border-crimson-500/40 hover:bg-crimson-500/20 shadow-sm'
                  : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                <span className="font-mono font-bold">Ngày {d.day}</span>
                {d.isSpecial && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-crimson-600 text-white">
                    Đặc biệt
                  </span>
                )}
              </div>

              <div className="my-1">
                <span className="text-2xl font-bold font-jp text-on-surface block">{d.kanji}</span>
                <DualReadingPlayer
                  hiragana={d.hiragana}
                  romaji={d.romaji}
                  colorClass={d.isSpecial ? 'text-crimson-600' : 'text-primary'}
                />
              </div>

              {d.mnemonicNote && (
                <span
                  className="text-[9px] text-on-surface-variant/80 border-t border-outline-variant/20 pt-1 mt-1 block line-clamp-1"
                  title={d.mnemonicNote}
                >
                  {d.mnemonicNote}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

