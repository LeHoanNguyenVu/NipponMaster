import { HOURS_DATA, MINUTES_SPECIAL, DAYS_OF_WEEK } from '../../../../data/numbersData';
import { speakJapanese } from '../../../../data/kanaData';
import DualReadingPlayer from '../components/DualReadingPlayer';

export default function TimeAndHoursTab() {
  return (
    <div className="space-y-8">
      {/* Hours */}
      <div>
        <h3 className="text-base font-bold text-on-surface mb-3 flex items-center gap-2">
          <span>⏰ Cách Đọc Giờ (1時〜12時)</span>
          <span className="text-xs font-normal text-crimson-600 bg-crimson-500/10 px-2 py-0.5 rounded-full font-bold">
            Chú ý 4時 (よじ), 7時 (しちじ), 9時 (くじ)
          </span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {HOURS_DATA.map((h) => (
            <div
              key={h.hour}
              onClick={() => speakJapanese(h.hiragana)}
              className={`p-3 rounded-xl border text-center cursor-pointer transition-all hover:scale-102 ${
                h.isIrregular
                  ? 'bg-crimson-500/10 border-crimson-500/40 hover:bg-crimson-500/20'
                  : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40'
              }`}
            >
              <span className="text-2xl font-bold font-jp text-on-surface block">{h.kanji}</span>
              <span className="text-sm font-semibold text-primary block">{h.hiragana}</span>
              <span className="text-xs text-on-surface-variant block">{h.romaji}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Special Minutes */}
      <div>
        <h3 className="text-base font-bold text-on-surface mb-3">
          ⏱️ Phút Biến Âm Phổ Biến (分 - ふん / ぷん)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {MINUTES_SPECIAL.map((m) => {
            const hasMulti = m.hiragana.includes('/');
            return (
              <div
                key={m.min}
                onClick={() => {
                  if (!hasMulti) speakJapanese(m.hiragana);
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all hover:scale-102 ${
                  m.isIrregular
                    ? 'bg-tertiary/10 border-tertiary/30'
                    : 'bg-surface-container-lowest border-outline-variant/30'
                }`}
              >
                <span className="text-xl font-bold font-jp text-on-surface block text-center">
                  {m.kanji}
                </span>
                <DualReadingPlayer hiragana={m.hiragana} romaji={m.romaji} colorClass="text-secondary" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Days of Week */}
      <div>
        <h3 className="text-base font-bold text-on-surface mb-3">
          📅 Các Thứ Trong Tuần (曜日 - ようび)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {DAYS_OF_WEEK.map((d) => (
            <div
              key={d.kanji}
              onClick={() => speakJapanese(d.hiragana)}
              className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/40 cursor-pointer transition-all"
            >
              <div className="text-2xl font-bold font-jp text-primary">{d.kanji}</div>
              <div className="text-sm font-semibold text-on-surface mt-0.5">{d.hiragana}</div>
              <div className="text-xs text-on-surface-variant mt-1">{d.meaning}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

