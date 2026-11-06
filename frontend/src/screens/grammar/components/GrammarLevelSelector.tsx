import React from 'react';
import { Lock } from 'lucide-react';
import type { JlptLevel } from '../types';

interface GrammarLevelSelectorProps {
  selectedLevel: JlptLevel;
  currentUserLevel: string;
  canAccessLevel: (lvl: JlptLevel) => boolean;
  onSelectLevel: (lvl: JlptLevel) => void;
  lockedNotice: string | null;
  onClearLockedNotice: () => void;
}

export const GrammarLevelSelector: React.FC<GrammarLevelSelectorProps> = ({
  selectedLevel,
  currentUserLevel,
  canAccessLevel,
  onSelectLevel,
  lockedNotice,
  onClearLockedNotice,
}) => {
  const levels: JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

  return (
    <>
      <div className="border-b border-[#e7e5e4] pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#78716c] uppercase block">
            GIÁO TRÌNH BÀI HỌC MINNA & SHINKANZEN MASTER
          </span>
          <h1 className="font-serif font-bold text-2xl text-[#1c1917] tracking-tight">
            Ngữ Pháp Tiếng Nhật N5 ~ N1
          </h1>
        </div>

        {/* Level Switcher (N5 - N1) */}
        <div className="flex items-center gap-1 bg-[#f5f5f4] p-1 border border-[#e7e5e4]">
          {levels.map((lvl) => {
            const isSelected = selectedLevel === lvl;
            const hasAccess = canAccessLevel(lvl);

            return (
              <button
                key={lvl}
                onClick={() => {
                  if (hasAccess) {
                    onSelectLevel(lvl);
                    onClearLockedNotice();
                  } else {
                    // Handled in parent or set notice
                    onSelectLevel(lvl);
                  }
                }}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-[#b91c1c] text-white shadow-2xs'
                    : hasAccess
                    ? 'text-[#57534e] hover:text-[#1c1917] hover:bg-white'
                    : 'text-[#a8a29e] hover:bg-red-50/50'
                }`}
                title={
                  hasAccess
                    ? `Xem giáo trình JLPT ${lvl}`
                    : `Khóa: Cần tài khoản JLPT ${lvl} trở lên (Hiện tại: ${currentUserLevel})`
                }
              >
                {!hasAccess && <Lock className="w-3 h-3 text-[#a8a29e]" />}
                <span>{lvl}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thông báo khóa cấp độ trang nhã */}
      {lockedNotice && (
        <div className="p-3 bg-[#fef2f2] border border-[#fecaca] text-xs text-[#991b1b] flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#b91c1c] shrink-0" />
            <span>{lockedNotice}</span>
          </div>
          <button
            onClick={onClearLockedNotice}
            className="text-[#991b1b] hover:text-black font-mono font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

