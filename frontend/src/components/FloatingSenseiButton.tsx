import { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import type { ScreenType } from '../App';

interface FloatingSenseiButtonProps {
  currentScreen: ScreenType;
  onAskSensei: (pageContext: string, quickQuestion?: string) => void;
}

const SCREEN_CONTEXT_LABELS: Record<ScreenType, string> = {
  dashboard: 'Trang tổng quan học tập',
  beginner: 'Khóa Nhập Môn (Hiragana, Katakana, Giao tiếp cơ bản)',
  kanji: 'Kho Hán Tự (Kanji Master)',
  grammar: 'Ngữ pháp Video & Bài tập',
  exams: 'Luyện Đề thi JLPT',
  translation: 'Dịch thuật & Phân tích cú pháp',
  listening: 'Phòng Luyện Nghe',
  pricing: 'Thông tin gói học Nippon Master',
  sensei: 'Trợ lý Sensei AI',
};

export default function FloatingSenseiButton({
  currentScreen,
  onAskSensei,
}: FloatingSenseiButtonProps) {
  const [open, setOpen] = useState(false);
  const [quickInput, setQuickInput] = useState('');

  if (currentScreen === 'sensei') return null;

  const baseLabel = SCREEN_CONTEXT_LABELS[currentScreen] || currentScreen;

  const buildContext = () => {
    if (currentScreen === 'translation') {
      try {
        const transCtx = sessionStorage.getItem('nippon_sensei_translation_ctx');
        if (transCtx) return transCtx;
      } catch {}
    }
    return baseLabel;
  };

  const handleGo = (question?: string) => {
    const trimmed = question?.trim();
    setOpen(false);
    setQuickInput('');
    onAskSensei(buildContext(), trimmed || undefined);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {open && (
        <div className="w-72 sm:w-80 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-jp text-xs font-bold">
                先生
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">Hỏi nhanh Sensei AI</p>
                <p className="text-[10px] text-outline truncate max-w-[180px]">{baseLabel}</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-outline hover:text-on-surface rounded cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          <textarea
            rows={2}
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (quickInput.trim()) handleGo(quickInput);
              }
            }}
            placeholder="Nhập câu hỏi rồi bấm Hỏi ngay để tạo chat mới & gửi luôn..."
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl p-2.5 text-xs text-on-surface focus:outline-none focus:border-primary/60 resize-none"
          />

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => handleGo()}
              className="text-xs text-primary font-semibold hover:underline cursor-pointer"
            >
              Mở khung chat đầy đủ
            </button>
            <button
              onClick={() => handleGo(quickInput)}
              disabled={!quickInput.trim()}
              className="px-3 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center gap-1 hover:opacity-95 disabled:opacity-45 cursor-pointer"
            >
              Hỏi ngay
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-4 py-2.5 rounded-full bg-primary text-on-primary shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 text-xs font-bold cursor-pointer border border-primary/20"
        title="Hỏi Sensei AI về nội dung đang học"
      >
        <Sparkles size={15} />
        <span>Hỏi Sensei</span>
      </button>
    </div>
  );
}
