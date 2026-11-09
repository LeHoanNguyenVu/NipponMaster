import React, { useState } from 'react';
import { CheckCircle2, Clock, Lock, MessageSquare, Users } from 'lucide-react';
import type { JLPTExamPaper, JLPTLevelKey } from '../types';
import { JLPT_LEVEL_RANK } from '../types';
import { getAllCatalogExams } from '../data';
import { getExamLiveStats } from '../services/examService';

interface ExamLibraryViewProps {
  userLevel: JLPTLevelKey;
  isPrivilegedUser: boolean;
  onSelectExamDetail: (exam: JLPTExamPaper) => void;
}

const ALL_LEVELS: JLPTLevelKey[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

export const ExamLibraryView: React.FC<ExamLibraryViewProps> = ({
  userLevel,
  isPrivilegedUser,
  onSelectExamDetail,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevelKey>('N5');

  const userRank = JLPT_LEVEL_RANK[userLevel] ?? 1;

  const isLevelUnlocked = (level: JLPTLevelKey) => {
    if (isPrivilegedUser) return true;
    return JLPT_LEVEL_RANK[level] <= userRank;
  };

  const allExams = getAllCatalogExams();
  const filteredExams = allExams.filter((paper) => paper.level === selectedLevel);

  return (
    <div className="space-y-4 pb-12">
      {/* 1-Line Header & Level Switcher (N5 -> N1, 1 single horizontal row) */}
      <div className="rounded-xl bg-surface-container-low border border-outline-variant/30 px-5 py-3.5 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3 shrink-0">
          <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
            Kho Đề JLPT
          </span>
          <h1 className="text-base sm:text-lg lg:text-xl font-headline font-bold text-on-surface tracking-tight whitespace-nowrap">
            Tổng Hợp Đề Thi Năng Lực Nhật Ngữ (N5 – N1)
          </h1>
        </div>

        {/* Level Switcher: N5 -> N1 */}
        <div className="flex items-center gap-1.5 shrink-0">
          {ALL_LEVELS.map((lvl) => {
            const unlocked = isLevelUnlocked(lvl);
            const active = selectedLevel === lvl;
            const count = allExams.filter((p) => p.level === lvl).length;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-primary text-on-primary border-primary shadow-2xs'
                    : unlocked
                      ? 'bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:border-primary/40'
                      : 'bg-surface-container text-on-surface-variant/65 border-outline-variant/15'
                }`}
              >
                {unlocked ? <CheckCircle2 size={13} /> : <Lock size={13} />}
                <span>
                  {lvl} ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Study4 Compact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredExams.map((paper) => {
          const unlocked = isLevelUnlocked(paper.level);
          const liveStats = getExamLiveStats(paper.id);

          return (
            <div
              key={paper.id}
              className={`rounded-xl border p-4 flex flex-col justify-between transition-all bg-surface-container-lowest ${
                unlocked
                  ? 'border-outline-variant/45 hover:border-primary/50 hover:shadow-xs'
                  : 'border-outline-variant/25 opacity-75'
              }`}
            >
              <div className="space-y-2.5">
                <div>
                  <h3 className="text-base font-bold text-on-surface leading-snug">
                    Đề thi JLPT {paper.level}
                  </h3>
                  <p className="text-sm font-bold text-on-surface leading-snug">
                    Kỳ {paper.sessionVi.toLowerCase()}
                  </p>
                </div>

                {/* Study4 Stats: Duration | Real-time Attempts | Comments */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-on-surface-variant">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={13} />
                    {paper.totalMinutes} phút
                  </span>
                  <span>|</span>
                  <span className="inline-flex items-center gap-1">
                    <Users size={13} />
                    {liveStats.totalAttempts}
                  </span>
                  <span>|</span>
                  <span className="inline-flex items-center gap-1">
                    <MessageSquare size={13} />
                    {liveStats.commentCount}
                  </span>
                </div>

                <p className="text-xs font-medium text-on-surface">
                  {paper.sectionCount} phần thi | {paper.questionCount} câu hỏi
                </p>

                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {paper.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Outlined Action Button */}
              <div className="mt-4 pt-1">
                {unlocked ? (
                  <button
                    type="button"
                    onClick={() => onSelectExamDetail(paper)}
                    className="w-full py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-on-primary font-bold text-xs transition-colors cursor-pointer"
                  >
                    Chi tiết
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full py-2 rounded-lg border border-outline-variant/40 bg-surface-container text-on-surface-variant font-semibold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed"
                  >
                    <Lock size={13} />
                    Yêu cầu đạt {paper.level}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
