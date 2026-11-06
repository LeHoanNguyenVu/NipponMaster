import { useTranslation } from 'react-i18next';
import type { RoadmapResponse } from '../types';

interface KanjiLevelBarProps {
  selectedLevel: string;
  onSelectLevel: (lvl: string) => void;
  availableLevels: readonly string[];
  userLevel: string;
  viewMode: 'master' | 'canvas' | 'dictionary';
  onChangeViewMode: (mode: 'master' | 'canvas' | 'dictionary') => void;
  roadmap: RoadmapResponse | null;
}

export function KanjiLevelBar({
  selectedLevel,
  onSelectLevel,
  availableLevels,
  userLevel,
  viewMode,
  onChangeViewMode,
  roadmap,
}: KanjiLevelBarProps) {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#e7e5e4] gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-block px-2 py-0.5 text-xs font-semibold tracking-wider bg-[#b91c1c] text-white rounded-none">
              KANJI MASTER {selectedLevel}
            </span>
            <span className="text-xs uppercase tracking-widest text-[#78716c] font-mono">
              BẢN CHUẨN GIÁO TRÌNH
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1c1917] mt-1 tracking-tight">
            {t('master.title', { level: selectedLevel, defaultValue: `Kho Hán Tự — Kanji Master ${selectedLevel}` })}
          </h1>
          <p className="text-sm text-[#78716c] mt-1">
            {selectedLevel === 'N1'
              ? '30 Chương (必修編 · 熟達編 · 難読編) · 943 Chữ Hán · Sách chuẩn 漢字マスターN1 & Mẹo nhớ chiết tự · Đạt ≥ 85% mở khóa chương.'
              : selectedLevel === 'N2'
                ? '18 Chương · 505 Chữ Hán · Sơ đồ chuyên sâu & Minigame tình huống · Đạt ≥ 85% mở khóa chương.'
                : selectedLevel === 'N3'
                  ? '20 Chương · 376 Chữ Hán · Sơ đồ chuyên sâu & Minigame tình huống · Đạt ≥ 85% mở khóa chương.'
                  : selectedLevel === 'N4'
                    ? '9 Chương · 199 Chữ Hán · Tranh tình huống & Minigame đời sống · Đạt ≥ 85% mở khóa chương.'
                    : '15 Chương · 118 Chữ Hán · Tranh tượng hình · Minigame · Đạt ≥ 85% mở khóa chương.'}
          </p>

          {/* Level Selector Tabs: Chỉ hiển thị các cấp độ học viên đủ điều kiện truy cập theo tài khoản */}
          <div className="flex items-center gap-2 mt-3">
            {availableLevels.map((lvl) => {
              const isCur = selectedLevel === lvl;
              const isUserLvl = userLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    if (selectedLevel !== lvl) {
                      onSelectLevel(lvl);
                    }
                  }}
                  className={`px-3 py-1.5 text-xs font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCur
                      ? 'bg-[#b91c1c] text-white border-[#b91c1c] shadow-xs'
                      : 'bg-white text-[#44403c] border-[#e7e5e4] hover:border-[#a8a29e] hover:bg-[#fafaf9]'
                  }`}
                >
                  <span>JLPT {lvl}</span>
                  {lvl === 'N1' ? (
                    <span className={`text-[10px] ${isCur ? 'text-red-100' : 'text-[#78716c]'}`}>
                      (30 Chương)
                    </span>
                  ) : lvl === 'N2' ? (
                    <span className={`text-[10px] ${isCur ? 'text-red-100' : 'text-[#78716c]'}`}>
                      (18 Chương)
                    </span>
                  ) : lvl === 'N3' ? (
                    <span className={`text-[10px] ${isCur ? 'text-red-100' : 'text-[#78716c]'}`}>
                      (20 Chương)
                    </span>
                  ) : lvl === 'N4' ? (
                    <span className={`text-[10px] ${isCur ? 'text-red-100' : 'text-[#78716c]'}`}>
                      (9 Chương)
                    </span>
                  ) : (
                    <span className={`text-[10px] ${isCur ? 'text-red-100' : 'text-[#78716c]'}`}>
                      (15 Chương)
                    </span>
                  )}
                  {isUserLvl && (
                    <span className={`text-[9px] px-1 py-0.2 rounded-xs font-sans ${isCur ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-700'}`}>
                      Mục tiêu
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-[#f5f5f4] p-1 border border-[#e7e5e4]">
          <button
            type="button"
            onClick={() => onChangeViewMode('master')}
            className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
              viewMode === 'master'
                ? 'bg-white text-[#1c1917] shadow-sm font-semibold'
                : 'text-[#78716c] hover:text-[#1c1917]'
            }`}
          >
            {t('master.tabRoadmap', '🗾 Lộ trình Kanji Master')}
          </button>
          <button
            type="button"
            onClick={() => onChangeViewMode('canvas')}
            className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
              viewMode === 'canvas'
                ? 'bg-white text-[#1c1917] shadow-sm font-semibold'
                : 'text-[#78716c] hover:text-[#1c1917]'
            }`}
          >
            {t('master.tabCanvas', '✍️ Bảng vẽ & OCR Studio')}
          </button>
        </div>
      </div>

      {/* Tiến độ tổng quan */}
      {roadmap && viewMode === 'master' && (
        <div className="mt-4 p-4 bg-white border border-[#e7e5e4] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-xs text-[#78716c] uppercase font-mono">TIẾN ĐỘ CHƯƠNG</div>
              <div className="text-lg font-serif font-bold text-[#1c1917]">
                {roadmap.completedChapters} <span className="text-xs font-normal text-[#a8a29e]">/ {roadmap.totalChapters} Chương</span>
              </div>
            </div>
            <div className="h-8 w-px bg-[#e7e5e4]" />
            <div>
              <div className="text-xs text-[#78716c] uppercase font-mono">ĐIỀU KIỆN MỞ KHÓA</div>
              <div className="text-xs font-medium text-[#44403c] mt-1">
                Đạt điểm test <span className="font-bold text-[#b91c1c]">≥ 85%</span> ở bài kiểm tra cuối chương
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

