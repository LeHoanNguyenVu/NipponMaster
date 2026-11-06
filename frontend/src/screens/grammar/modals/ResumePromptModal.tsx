import React from 'react';
import { History, Play, RotateCcw, X } from 'lucide-react';
import type { ResumePromptData } from '../types';

interface ResumePromptModalProps {
  resumePrompt: ResumePromptData | null;
  lessonSortOrder?: number;
  lessonTitle?: string;
  onClose: () => void;
  onRestart: () => void;
  onResume: (sec: number) => void;
}

export const ResumePromptModal: React.FC<ResumePromptModalProps> = ({
  resumePrompt,
  lessonSortOrder,
  lessonTitle,
  onClose,
  onRestart,
  onResume,
}) => {
  if (!resumePrompt) return null;

  return (
    <div className="absolute inset-0 bg-black/75 backdrop-blur-xs z-30 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border-2 border-[#1c1917] p-5 max-w-md w-full shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#78716c] hover:text-[#1c1917] p-1 transition-colors cursor-pointer"
          title="Đóng"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#fef2f2] border border-[#fecaca] flex items-center justify-center shrink-0">
            <History className="w-5 h-5 text-[#b91c1c]" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-[#1c1917]">
              Tiếp tục bài giảng Bài {lessonSortOrder || 1}
            </h3>
            <p className="text-xs text-[#57534e] mt-1.5 leading-relaxed">
              Lần cuối bạn xem bài <strong className="text-[#1c1917] font-semibold">{lessonTitle || resumePrompt.lessonTitle || ''}</strong> là ở đoạn <strong className="font-mono text-[#b91c1c] font-bold text-sm bg-[#fef2f2] px-1.5 py-0.5 border border-[#fecaca]">{resumePrompt.timeStr}</strong>. Bạn có muốn tiếp tục xem không?
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#e7e5e4]">
          <button
            onClick={onRestart}
            className="px-3.5 py-2 text-xs font-mono font-medium border border-[#d6d3d1] hover:bg-[#f5f5f4] text-[#57534e] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xem lại từ đầu</span>
          </button>
          <button
            onClick={() => onResume(resumePrompt.timeSec)}
            className="px-4 py-2 text-xs font-mono font-bold bg-[#b91c1c] hover:bg-[#991b1b] text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Tiếp tục xem ({resumePrompt.timeStr})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

