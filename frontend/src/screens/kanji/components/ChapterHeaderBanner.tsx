import { useTranslation } from 'react-i18next';
import type { ChapterDetailResponse } from '../types';

interface ChapterHeaderBannerProps {
  chapterDetail: ChapterDetailResponse;
  activeTab: 'kanjis' | 'context' | 'minigame' | 'test';
  setActiveTab: (tab: 'kanjis' | 'context' | 'minigame' | 'test') => void;
}

export function ChapterHeaderBanner({
  chapterDetail,
  activeTab,
  setActiveTab,
}: ChapterHeaderBannerProps) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const contextExerciseCount =
    (chapterDetail.readingExercises?.length || 0) + (chapterDetail.writingExercises?.length || 0);

  return (
    <div className="bg-white border border-[#e7e5e4] p-6 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#b91c1c]">
            <span>CHƯƠNG {chapterDetail.chapter.chapterNumber}</span>
            <span>•</span>
            <span>{chapterDetail.kanjis.length} CHỮ HÁN</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#1c1917] mt-1">
            {chapterDetail.chapter.titleJa}{' '}
            <span className="text-xl font-normal text-[#78716c]">
              ({isEn ? chapterDetail.chapter.titleEn : chapterDetail.chapter.titleVi})
            </span>
          </h2>
        </div>
      </div>

      {/* 4 THẺ ĐIỀU HƯỚNG CHUYÊN SÂU */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-t border-[#e7e5e4] mt-6 pt-4">
        <button
          type="button"
          onClick={() => setActiveTab('kanjis')}
          className={`px-3 py-2.5 text-xs font-medium tracking-wide border transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center cursor-pointer ${
            activeTab === 'kanjis'
              ? 'border-[#b91c1c] bg-[#fff5f5] text-[#b91c1c] font-bold shadow-sm'
              : 'border-[#e7e5e4] bg-[#fafaf9] text-[#78716c] hover:bg-white hover:text-[#1c1917]'
          }`}
        >
          <span>{t('master.tab1', 'Chữ Hán & Nét vẽ')}</span>
          <span className="text-[10px] bg-[#f5f5f4] px-1.5 py-0.5 rounded font-mono font-bold">
            {chapterDetail.kanjis.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('context')}
          className={`px-3 py-2.5 text-xs font-medium tracking-wide border transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center cursor-pointer ${
            activeTab === 'context'
              ? 'border-[#b91c1c] bg-[#fff5f5] text-[#b91c1c] font-bold shadow-sm'
              : 'border-[#e7e5e4] bg-[#fafaf9] text-[#78716c] hover:bg-white hover:text-[#1c1917]'
          }`}
        >
          <span>{t('master.tab2', 'Câu ngữ cảnh')}</span>
          <span className="text-[10px] bg-[#f5f5f4] px-1.5 py-0.5 rounded font-mono font-bold">
            {contextExerciseCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('minigame')}
          className={`px-3 py-2.5 text-xs font-medium tracking-wide border transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center cursor-pointer ${
            activeTab === 'minigame'
              ? 'border-[#b91c1c] bg-[#fff5f5] text-[#b91c1c] font-bold shadow-sm'
              : 'border-[#e7e5e4] bg-[#fafaf9] text-[#78716c] hover:bg-white hover:text-[#1c1917]'
          }`}
        >
          <span>{t('master.tab3', 'Minigame tình huống')}</span>
          <span className="text-[10px] bg-[#f5f5f4] px-1.5 py-0.5 rounded font-mono font-bold">
            {chapterDetail.minigames?.length || 0}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('test')}
          className={`px-3 py-2.5 text-xs font-medium tracking-wide border transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center cursor-pointer ${
            activeTab === 'test'
              ? 'border-[#b91c1c] bg-[#fff5f5] text-[#b91c1c] font-bold shadow-sm'
              : 'border-[#e7e5e4] bg-[#fafaf9] text-[#78716c] hover:bg-white hover:text-[#1c1917]'
          }`}
        >
          <span>{t('master.tab4', 'Test ôn tập')}</span>
        </button>
      </div>
    </div>
  );
}

