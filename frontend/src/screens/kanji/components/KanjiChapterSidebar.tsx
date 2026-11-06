import { CheckCircle2, ChevronRight, Lock, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { RoadmapResponse } from '../types';
import { prefetchChapterDetail } from '../hooks/useKanjiChapterDetail';

interface KanjiChapterSidebarProps {
  roadmap: RoadmapResponse | null;
  loadingRoadmap: boolean;
  selectedLevel: string;
  selectedChapterId: number;
  onSelectChapter: (id: number) => void;
  isLowerLevel: boolean;
  userLevel?: string;
}

export function KanjiChapterSidebar({
  roadmap,
  loadingRoadmap,
  selectedLevel,
  selectedChapterId,
  onSelectChapter,
  isLowerLevel,
  userLevel,
}: KanjiChapterSidebarProps) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const totalFallback =
    selectedLevel === 'N1'
      ? 30
      : selectedLevel === 'N2'
        ? 18
        : selectedLevel === 'N3'
          ? 20
          : selectedLevel === 'N4'
            ? 9
            : 15;

  return (
    <div className="lg:col-span-4 bg-white border border-[#e7e5e4] p-4 sticky top-6">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e7e5e4]">
        <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#1c1917]">
          {t('master.chapterList', {
            total: roadmap?.totalChapters || totalFallback,
            level: selectedLevel,
            defaultValue: `Mục lục ${roadmap?.totalChapters || totalFallback} chương ${selectedLevel}`,
          })}
        </h2>
        <span className="text-xs text-[#78716c]">
          {roadmap?.chapters.length || totalFallback} Chương
        </span>
      </div>

      {loadingRoadmap ? (
        <div className="py-12 flex flex-col items-center justify-center text-[#78716c]">
          <Loader2 className="w-6 h-6 animate-spin mb-2 text-[#b91c1c]" />
          <span className="text-xs">Đang tải dữ liệu lộ trình...</span>
        </div>
      ) : (
        <div className="space-y-1.5 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
          {isLowerLevel && (
            <div className="mb-3 p-2.5 bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] text-[11px] flex items-start gap-2 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
              <span className="leading-tight">
                Bạn đang ở trình độ <strong>{userLevel?.toUpperCase()}</strong> — Toàn bộ các chương của <strong>{selectedLevel}</strong> đã được mở khóa tự do để bạn tra cứu và ôn tập!
              </span>
            </div>
          )}
          {roadmap?.chapters.map((chap) => {
            const isSelected = selectedChapterId === chap.id;
            const isUnlocked = chap.isUnlocked || isLowerLevel;
            const isLocked = !isUnlocked;
            const isPassed = chap.isPassed;
            const canAccess = isUnlocked;

            return (
              <div
                key={chap.id}
                role="button"
                tabIndex={canAccess ? 0 : -1}
                onClick={() => {
                  if (canAccess) {
                    onSelectChapter(chap.id);
                  }
                }}
                onKeyDown={(e) => {
                  if (canAccess && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onSelectChapter(chap.id);
                  }
                }}
                onMouseEnter={() => {
                  if (canAccess) prefetchChapterDetail(chap.id, selectedLevel);
                }}
                className={`w-full text-left p-3 border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'border-[#b91c1c] bg-[#fef2f2] shadow-sm'
                    : !canAccess
                      ? 'border-[#f5f5f4] bg-[#fafaf9] opacity-60 cursor-not-allowed'
                      : 'border-[#e7e5e4] bg-white hover:border-[#d6d3d1] cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Biểu tượng số chương */}
                  <div
                    className={`w-7 h-7 flex items-center justify-center font-mono text-xs font-bold border ${
                      isSelected
                        ? 'bg-[#b91c1c] text-white border-[#b91c1c]'
                        : isPassed
                          ? 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]'
                          : isLocked
                            ? 'bg-[#e7e5e4] text-[#78716c] border-[#d6d3d1]'
                            : 'bg-white text-[#44403c] border-[#e7e5e4]'
                    }`}
                  >
                    {chap.chapterNumber < 10 ? `0${chap.chapterNumber}` : chap.chapterNumber}
                  </div>

                  {/* Tên chương */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-serif font-bold text-sm text-[#1c1917] break-words">
                        {chap.titleJa}
                      </span>
                      <span className="text-xs text-[#78716c] break-words">
                        ({isEn ? chap.titleEn : chap.titleVi})
                      </span>
                    </div>
                    <div className="text-[11px] text-[#a8a29e] mt-0.5">
                      {chap.kanjiCount} Chữ Hán
                      {chap.highestScore > 0 && (
                        <span className="ml-2 text-[#166534] font-medium font-mono">
                          • {chap.highestScore}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Trạng thái khóa / đã qua bài */}
                <div className="flex items-center gap-1.5">
                  {isLocked ? (
                    <Lock className="w-4 h-4 text-[#a8a29e]" />
                  ) : isPassed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                  ) : (
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-[#b91c1c] translate-x-0.5' : 'text-[#d6d3d1] group-hover:text-[#78716c]'
                      }`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

