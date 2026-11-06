import React from 'react';
import { Loader2, Lock, CheckCircle2, ChevronRight } from 'lucide-react';
import type { JlptLevel, GrammarLessonSummaryDto } from '../types';

interface GrammarLessonSidebarProps {
  selectedLevel: JlptLevel;
  lessons: GrammarLessonSummaryDto[];
  selectedLessonId: number;
  isTeacher: boolean;
  loadingLessons: boolean;
  onSelectLesson: (lessonId: number) => void;
  onShowLockedNotice: (msg: string) => void;
}

export const GrammarLessonSidebar: React.FC<GrammarLessonSidebarProps> = ({
  selectedLevel,
  lessons,
  selectedLessonId,
  isTeacher,
  loadingLessons,
  onSelectLesson,
  onShowLockedNotice,
}) => {
  const passedCount = lessons.filter((l) => l.isPassed).length;
  const totalCount =
    lessons.length ||
    (selectedLevel === 'N3' ? 30 : selectedLevel === 'N2' ? 26 : 25);

  const getCurriculumTitle = () => {
    if (selectedLevel === 'N5') return '25 Bài Minna no Nihongo I';
    if (selectedLevel === 'N4') return '25 Bài Minna no Nihongo II';
    return `Giáo trình Shinkanzen ${selectedLevel}`;
  };

  return (
    <div className="lg:col-span-4 space-y-4">
      <div className="bg-white border border-[#e7e5e4] p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#e7e5e4] mb-3">
          <div>
            <span className="text-xs font-mono font-bold text-[#b91c1c] uppercase block">
              LỘ TRÌNH BÀI HỌC
            </span>
            <h3 className="font-serif font-bold text-base text-[#1c1917]">
              {getCurriculumTitle()}
            </h3>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] font-bold">
            {passedCount}/{totalCount} Đạt
          </span>
        </div>

        {loadingLessons ? (
          <div className="py-12 flex flex-col items-center justify-center text-zinc-400 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#b91c1c]" />
            <span className="text-xs font-mono">Đang tải danh sách bài học...</span>
          </div>
        ) : (
          <div className="space-y-2 max-h-[780px] overflow-y-auto pr-1 scrollbar-thin">
            {lessons.map((lesson) => {
              const isSelected = lesson.id === selectedLessonId;
              const isUnlocked = isTeacher || lesson.isUnlocked !== false;

              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    if (!isUnlocked) {
                      onShowLockedNotice(
                        `Bài học số ${lesson.lessonNumber} hiện đang bị khóa! Bạn cần hoàn thành bài kiểm tra kiến thức của Bài trước đạt từ 85% trở lên (tối thiểu 17/20 câu đúng) để mở khóa bài học này.`
                      );
                      return;
                    }
                    onSelectLesson(lesson.id);
                  }}
                  className={`p-3 border transition-all flex items-start justify-between gap-3 ${
                    !isUnlocked
                      ? 'bg-[#f5f5f4]/80 border-[#e7e5e4] opacity-65 cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#fef2f2] border-[#b91c1c] shadow-2xs ring-1 ring-[#b91c1c]/20 cursor-pointer'
                      : 'bg-white border-[#e7e5e4] hover:border-[#a8a29e] hover:shadow-2xs cursor-pointer'
                  }`}
                  title={
                    !isUnlocked
                      ? `Bài ${lesson.lessonNumber} đang bị khóa. Cần đạt >= 85% bài kiểm tra trước đó để mở khóa!`
                      : undefined
                  }
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-xs flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                        !isUnlocked
                          ? 'bg-[#e7e5e4] text-[#a8a29e]'
                          : isSelected
                          ? 'bg-[#b91c1c] text-white'
                          : lesson.isPassed
                          ? 'bg-[#166534] text-white'
                          : 'bg-[#f5f5f4] text-[#78716c]'
                      }`}
                    >
                      {!isUnlocked ? (
                        <Lock className="w-3 h-3 text-[#78716c]" />
                      ) : (
                        String(lesson.sortOrder).padStart(2, '0')
                      )}
                    </span>
                    <div className="space-y-0.5">
                      <h4
                        className={`text-xs font-medium leading-snug line-clamp-2 ${
                          !isUnlocked
                            ? 'text-[#a8a29e]'
                            : isSelected
                            ? 'text-[#b91c1c] font-bold'
                            : 'text-[#1c1917]'
                        }`}
                      >
                        {lesson.titleVi}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-[#78716c] font-mono">
                        <span>⏱️ {lesson.durationStr}</span>
                        {lesson.highestScore > 0 && (
                          <span className="text-[#166534] font-bold">
                            • {lesson.highestScore}%
                          </span>
                        )}
                        {lesson.starsEarned > 0 && (
                          <span className="text-amber-500 font-bold">
                            {'★'.repeat(lesson.starsEarned)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 mt-1">
                    {!isUnlocked ? (
                      <Lock className="w-3.5 h-3.5 text-[#a8a29e]" />
                    ) : lesson.isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#a8a29e]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

