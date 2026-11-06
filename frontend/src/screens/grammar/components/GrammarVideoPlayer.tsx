import React from 'react';
import { Loader2, Bookmark } from 'lucide-react';
import { ResumePromptModal } from '../modals/ResumePromptModal';
import type { GrammarLessonDetailDto, JlptLevel, ResumePromptData, GrammarTimestampItem } from '../types';

interface GrammarVideoPlayerProps {
  currentLesson: GrammarLessonDetailDto;
  selectedLevel: JlptLevel;
  loadingDetail: boolean;
  resumePrompt: ResumePromptData | null;
  videoChapters: GrammarTimestampItem[];
  activeTimestamp: number | null;
  onJumpToTimestamp: (sec: number, videoId?: string) => void;
  onCloseResumePrompt: () => void;
  onRestartFromBeginning: (videoId?: string) => void;
  onResumeWatching: (sec: number, videoId?: string) => void;
}

export const GrammarVideoPlayer: React.FC<GrammarVideoPlayerProps> = ({
  currentLesson,
  selectedLevel,
  loadingDetail,
  resumePrompt,
  videoChapters,
  activeTimestamp,
  onJumpToTimestamp,
  onCloseResumePrompt,
  onRestartFromBeginning,
  onResumeWatching,
}) => {
  return (
    <div className="space-y-4">
      {/* Tiêu đề bài học */}
      <div className="bg-white border border-[#e7e5e4] p-4 shadow-xs">
        <div className="flex items-center justify-between text-xs text-[#78716c] font-mono mb-1">
          <span className="font-bold text-[#b91c1c]">
            BÀI {currentLesson.lessonNumber} • {selectedLevel}
          </span>
          <span>⏱️ {currentLesson.durationStr}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1c1917] leading-snug">
          {currentLesson.titleVi}
        </h2>
        <p className="text-xs font-serif text-[#78716c] mt-0.5">
          {currentLesson.titleJa}
        </p>
      </div>

      {/* TRÌNH PHÁT VIDEO BÀI GIẢNG YOUTUBE */}
      <div className="bg-[#0c0a09] border border-[#292524] shadow-lg overflow-hidden relative group">
        <div className="aspect-video w-full bg-black relative">
          {/* Pop-up tiếp tục bài giảng */}
          <ResumePromptModal
            resumePrompt={resumePrompt}
            lessonSortOrder={currentLesson.sortOrder}
            lessonTitle={currentLesson.titleVi}
            onClose={onCloseResumePrompt}
            onRestart={() => onRestartFromBeginning(currentLesson.videoId)}
            onResume={(sec) => onResumeWatching(sec, currentLesson.videoId)}
          />

          {loadingDetail && !currentLesson.videoId ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-[#b91c1c]" />
              <span className="text-xs font-mono">Đang tải video bài giảng...</span>
            </div>
          ) : (
            <iframe
              key={`yt-${currentLesson.id}-${currentLesson.videoId}`}
              id="yt-lesson-player"
              src={`https://www.youtube.com/embed/${currentLesson.videoId}?enablejsapi=1&autoplay=1`}
              title={currentLesson.titleVi || 'Japanese Grammar Video Lecture'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          )}
        </div>
      </div>

      {/* INTERACTIVE TIMESTAMPS BAR (TUA VIDEO THEO PHÂN ĐOẠN YOUTUBE) */}
      {videoChapters && videoChapters.length > 0 && (
        <div className="bg-white border border-[#e7e5e4] p-3.5 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#b91c1c]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1c1917]">
                Mục lục thời gian:
              </span>
            </div>
            <span className="text-[11px] text-[#a8a29e] hidden sm:inline">
              {videoChapters.length} phân đoạn bài giảng • Bấm để tua nhanh đến phần học
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {videoChapters.map((ts, idx) => {
              const isActive = activeTimestamp === ts.timeSec;
              return (
                <button
                  key={ts.id || idx}
                  onClick={() => onJumpToTimestamp(ts.timeSec, currentLesson.videoId)}
                  className={`px-3 py-2 text-left border transition-all flex-shrink-0 min-w-[170px] max-w-[240px] cursor-pointer ${
                    isActive
                      ? 'bg-[#fef2f2] border-[#b91c1c] shadow-xs'
                      : 'bg-[#fafaf9] border-[#e7e5e4] hover:border-[#1c1917] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={isActive ? 'font-bold text-[#b91c1c]' : 'text-[#78716c]'}>
                      ⏱️ {ts.timeStr}
                    </span>
                    {isActive && (
                      <span className="text-[10px] bg-[#b91c1c] text-white px-1 font-bold">
                        Đang phát
                      </span>
                    )}
                  </div>
                  <div className="font-serif font-bold text-xs text-[#1c1917] truncate">
                    {ts.pattern || ts.title}
                  </div>
                  <div className="text-[11px] text-[#78716c] truncate mt-0.5">
                    {ts.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

