import { Volume2, Info } from 'lucide-react';
import { BASIC_NUMBERS, AGE_DATA, AGE_QUESTION_PHRASES } from '../../../../data/numbersData';
import { speakJapanese } from '../../../../data/kanaData';
import DualReadingPlayer from '../components/DualReadingPlayer';

export default function NumbersTab() {
  return (
    <div className="space-y-8">
      {/* Section 1A: Basic Numbers 0-10.000 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
            <span>🔢 Bảng Số Đếm Cơ Bản (0 đến 10.000)</span>
          </h2>
          <span className="text-xs text-on-surface-variant">
            Bấm vào từng icon loa để nghe chuẩn từng cách đọc
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {BASIC_NUMBERS.map((n) => {
            const hasMultiReading = n.hiragana.includes('/');
            return (
              <div
                key={n.value}
                onClick={() => {
                  if (!hasMultiReading) speakJapanese(n.hiragana);
                }}
                className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center group"
              >
                <span className="text-xs font-bold text-on-surface-variant/60 mb-1">
                  {n.value.toLocaleString()}
                </span>
                <span className="text-3xl font-bold font-jp text-on-surface group-hover:text-primary transition-colors">
                  {n.kanji}
                </span>

                {/* Hiển thị loa riêng biệt nếu có 2 cách đọc */}
                <DualReadingPlayer hiragana={n.hiragana} romaji={n.romaji} />

                {n.irregularNote && (
                  <span
                    className="mt-2 text-[10px] bg-tertiary/10 text-tertiary px-2 py-0.5 rounded-full font-medium line-clamp-1"
                    title={n.irregularNote}
                  >
                    ⚠️ {n.irregularNote}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Note box */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3">
        <Info className="text-primary flex-shrink-0 mt-0.5" size={20} />
        <div className="text-xs text-on-surface-variant space-y-1">
          <p className="font-bold text-on-surface">💡 Điểm cốt lõi cần nhớ về số đếm tiếng Nhật:</p>
          <p>
            • Hàng vạn (10.000) chia theo cụm <strong>4 số 0</strong>: 10.000 = 1万 (いちまん), 100.000 = 10万 (じゅうまん), 1.000.000 = 100万 (ひゃくまん).
          </p>
          <p>
            • Các số 0 (ぜろ / れい), 4 (よん / し), 7 (なな / しち), 9 (きゅう / く) có 2 cách đọc tùy theo ngữ cảnh ghép câu.
          </p>
        </div>
      </div>

      {/* Section 1B: Bảng Đếm Tuổi & Bất Quy Tắc Hatachi */}
      <div className="border-t border-outline-variant/30 pt-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span>🎂 Bảng Đếm Tuổi (歳 / 才 - さい) & Bất Quy Tắc Tuổi 20</span>
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Công thức chung: <strong>Số đếm + さい (sai)</strong>. Chú ý các mốc biến âm âm ngắt (1, 8, 10 tuổi) và tuổi 20 đặc biệt.
            </p>
          </div>
        </div>

        {/* Banner Nổi Bật Tuổi 20 Hatachi */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-primary/10 to-transparent border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-bold text-xs">
                🌟 BẤT QUY TẮC ĐẶC BIỆT NHẤT
              </span>
              <span className="text-xs font-semibold text-amber-800">
                20 Tuổi = 二十歳 (はたち - hatachi)
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl">
              Tại Nhật Bản, 20 tuổi là mốc thành niên quan trọng được tổ chức ngày lễ lớn{' '}
              <strong>Lễ Thành Nhân (成人式 - Seijinshiki)</strong>. Người Nhật gọi riêng tuổi 20 là{' '}
              <strong>はたち (hatachi)</strong>, tuyệt đối <em>không đọc là にじゅっさい</em> khi nói tuổi đời.
            </p>
          </div>

          <button
            onClick={() => speakJapanese('はたち')}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs cursor-pointer flex items-center gap-2 shadow-sm flex-shrink-0 transition-colors"
          >
            <Volume2 size={16} /> Nghe: はたち (hatachi)
          </button>
        </div>

        {/* Grid 1-20 tuổi */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2.5">
          {AGE_DATA.map((a) => {
            const hasMulti = a.hiragana.includes('/');
            return (
              <div
                key={a.age}
                onClick={() => {
                  if (!hasMulti) speakJapanese(a.hiragana);
                }}
                className={`p-3 rounded-2xl border text-center cursor-pointer transition-all hover:scale-102 flex flex-col justify-between ${
                  a.age === 20
                    ? 'bg-amber-500/15 border-amber-500/50 shadow-sm'
                    : a.isSpecial
                    ? 'bg-crimson-500/10 border-crimson-500/30 hover:bg-crimson-500/20'
                    : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40'
                }`}
              >
                <div>
                  <span className="text-[11px] font-bold text-on-surface-variant block mb-1">
                    {a.age} tuổi
                  </span>
                  <span className="text-xl font-bold font-jp text-on-surface block">{a.kanji}</span>
                  <DualReadingPlayer
                    hiragana={a.hiragana}
                    romaji={a.romaji}
                    colorClass={
                      a.age === 20
                        ? 'text-amber-800'
                        : a.isSpecial
                        ? 'text-crimson-600'
                        : 'text-primary'
                    }
                  />
                </div>
                {a.culturalNote && (
                  <span
                    className="mt-1 text-[9px] text-on-surface-variant/80 font-medium line-clamp-1"
                    title={a.culturalNote}
                  >
                    {a.culturalNote}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Cách hỏi tuổi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {AGE_QUESTION_PHRASES.map((q, i) => (
            <div
              key={i}
              onClick={() => speakJapanese(q.hiragana)}
              className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/40 cursor-pointer flex items-center justify-between transition-all"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold font-jp text-primary">{q.kanji}</span>
                  <span className="text-xs font-bold text-on-surface">({q.hiragana})</span>
                  <span className="text-xs text-on-surface-variant font-mono">[{q.romaji}]</span>
                </div>
                <div className="text-xs text-on-surface-variant mt-0.5">{q.meaning}</div>
              </div>
              <Volume2 size={16} className="text-primary/70" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

