import { Users, Volume2 } from 'lucide-react';
import {
  PEOPLE_COUNTER_DATA,
  PEOPLE_SPECIAL_EXPRESSIONS,
  COUNTERS,
} from '../../../../data/numbersData';
import { speakJapanese } from '../../../../data/kanaData';
import DualReadingPlayer from '../components/DualReadingPlayer';
import type { PeopleCountersTabProps } from '../types';

export default function PeopleCountersTab({
  selectedCounter,
  setSelectedCounter,
}: PeopleCountersTabProps) {
  return (
    <div className="space-y-8">
      {/* Section 2A: Bảng Số Đếm Người Đặc Biệt */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <Users className="text-primary" size={20} />
              <span>Bảng Đếm Người Đặc Biệt (一人, 二人, 四人...)</span>
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Đơn vị đếm người là <strong>人 (にん - nin)</strong>, nhưng 1 người, 2 người và 4 người bắt buộc dùng cách đọc riêng.
            </p>
          </div>
          <span className="text-xs text-on-surface-variant hidden sm:inline">
            Bấm vào từng icon loa để nghe
          </span>
        </div>

        {/* Grid 1-10 Người */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {PEOPLE_COUNTER_DATA.map((p) => {
            const hasMulti = p.hiragana.includes('/');
            return (
              <div
                key={p.count}
                onClick={() => {
                  if (!hasMulti) speakJapanese(p.hiragana);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-102 flex flex-col justify-between ${
                  p.count === 1 || p.count === 2
                    ? 'bg-amber-500/12 border-amber-500/40 hover:bg-amber-500/20'
                    : p.count === 4
                    ? 'bg-crimson-500/12 border-crimson-500/40 hover:bg-crimson-500/20'
                    : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                    <span className="font-bold">{p.count} người</span>
                    {p.isSpecial && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-error/15 text-error">
                        Đặc biệt
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold font-jp text-on-surface mb-0.5">{p.kanji}</div>
                  <DualReadingPlayer hiragana={p.hiragana} romaji={p.romaji} />
                </div>

                {p.note && (
                  <div className="mt-2 text-[10px] text-on-surface-variant/80 border-t border-outline-variant/20 pt-1 leading-tight">
                    {p.note}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Các cụm từ đặc biệt về người */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
          {PEOPLE_SPECIAL_EXPRESSIONS.map((exp, idx) => (
            <div
              key={idx}
              onClick={() => speakJapanese(exp.hiragana)}
              className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary/40 cursor-pointer flex items-center justify-between text-xs transition-colors"
            >
              <div>
                <span className="font-jp font-bold text-sm text-on-surface mr-2">{exp.kanji}</span>
                <span className="text-primary font-semibold">({exp.hiragana})</span>
                <div className="text-on-surface-variant text-[11px] mt-0.5">{exp.meaning}</div>
              </div>
              <Volume2 size={15} className="text-primary/70 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Section 2B: Đơn Vị Đếm Đồ Vật & Bảng Biến Âm */}
      <div className="border-t border-outline-variant/30 pt-6 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <span>📦 Đơn Vị Đếm Đồ Vật Khác & Bảng Biến Âm 1-10</span>
          </h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Chọn đơn vị đếm bên dưới để xem chi tiết cách dùng và bảng biến âm 1 đến 10.
          </p>
        </div>

        {/* Units Selector */}
        <div className="flex flex-wrap gap-2">
          {COUNTERS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCounter(c)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCounter.id === c.id
                  ? 'bg-secondary text-on-secondary shadow-sm scale-102'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="font-jp text-sm">{c.kanji}</span>
              <span>{c.reading}</span>
            </button>
          ))}
        </div>

        {/* Selected Unit Details */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold font-jp text-primary">{selectedCounter.kanji}</span>
                <span className="text-xl font-bold text-on-surface">{selectedCounter.reading}</span>
              </div>
              <p className="text-sm text-on-surface-variant mt-1">📌 {selectedCounter.usedFor}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-container text-xs text-on-surface font-medium space-y-1">
              <div className="text-on-surface-variant text-[10px] uppercase font-bold">
                Ví dụ minh họa
              </div>
              <div className="font-jp text-sm font-bold text-secondary">
                {selectedCounter.exampleSentence}
              </div>
              <div>{selectedCounter.exampleMeaning}</div>
            </div>
          </div>

          {/* 1-10 Mutations Matrix */}
          <div>
            <h3 className="text-sm font-bold text-on-surface mb-3 flex items-center gap-2">
              <span>
                🔥 Bảng Đếm 1 đến 10 Của {selectedCounter.kanji} ({selectedCounter.reading})
              </span>
              <span className="text-xs font-normal text-crimson-600 bg-crimson-500/10 px-2 py-0.5 rounded-full font-bold">
                Nền đỏ = Biến âm bất quy tắc
              </span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {selectedCounter.mutations.map((m) => {
                const hasMulti = m.japanese.includes('/');
                return (
                  <div
                    key={m.count}
                    onClick={() => {
                      if (!hasMulti) speakJapanese(m.japanese);
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all hover:scale-102 flex flex-col justify-between ${
                      m.isIrregular
                        ? 'bg-crimson-500/10 border-crimson-500/40 hover:bg-crimson-500/20'
                        : 'bg-surface-container-low border-outline-variant/30 hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                      <span className="font-bold">{m.count}</span>
                      {m.isIrregular && (
                        <span className="text-[10px] text-crimson-600 font-bold">Biến âm</span>
                      )}
                    </div>
                    <div className="font-jp text-lg font-bold text-on-surface">{m.japanese}</div>
                    <DualReadingPlayer hiragana={m.japanese} romaji={m.romaji} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

