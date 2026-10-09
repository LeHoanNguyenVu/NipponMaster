import { useState, useEffect, lazy, Suspense } from 'react';
import { CheckCircle2, Lock, ChevronRight, GraduationCap, VolumeX, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Lazy loading chapter components to optimize performance & initial load time
const AlphabetExplorer = lazy(() => import('./AlphabetExplorer'));
const NumbersAndTime = lazy(() => import('./beginner/NumbersAndTime'));
const AisatsuPhrases = lazy(() => import('./beginner/AisatsuPhrases'));
const KanjiRadicalsHub = lazy(() => import('./beginner/KanjiRadicalsHub'));
const BasicGrammarHub = lazy(() => import('./beginner/BasicGrammarHub'));

import { 
  computeStrictCourseProgress, 
  saveChapterScore,
  UNLOCK_THRESHOLD, 
  type ChapterProgressMap as ChapterProgress 
} from '../utils/beginnerProgressManager';

export { computeStrictCourseProgress, UNLOCK_THRESHOLD };

export default function BeginnerCourseHub() {
  const [activeChapter, setActiveChapter] = useState<string>('chapter-1');
  const [progress, setProgress] = useState<ChapterProgress>(computeStrictCourseProgress);
  const [hasJaVoice, setHasJaVoice] = useState<boolean>(true);

  // Đồng bộ và làm sạch tiến độ khi mount
  useEffect(() => {
    const strict = computeStrictCourseProgress();
    setProgress(strict);
    try {
      localStorage.setItem('beginner_course_progress', JSON.stringify(strict));
    } catch {}

    // Check TTS voices
    if (window.speechSynthesis) {
      const checkVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const ja = voices.some(v => v.lang.startsWith('ja'));
        setHasJaVoice(ja || voices.length === 0);
      };
      checkVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = checkVoices;
      }
    }
  }, []);

  // Bảo vệ route: Nếu activeChapter hiện tại đang bị khóa, tự động cưỡng chế chuyển về Chương 1
  useEffect(() => {
    if (progress[activeChapter] && !progress[activeChapter].unlocked) {
      setActiveChapter('chapter-1');
    }
  }, [progress, activeChapter]);

  const handleChapterComplete = (chapterId: string, scorePercent: number) => {
    try {
      const chNum = parseInt(chapterId.replace('chapter-', ''), 10);
      if (!isNaN(chNum)) {
        saveChapterScore(chNum, scorePercent);
      }
    } catch {}

    const updated = computeStrictCourseProgress();
    setProgress(updated);
    try {
      localStorage.setItem('beginner_course_progress', JSON.stringify(updated));
    } catch {}
  };

  const CHAPTERS = [
    {
      id: 'chapter-1',
      number: '01',
      title: 'Chương 1: Bảng Chữ Cái Hiragana & Katakana',
      desc: 'Học 104+ chữ cái, luyện viết canvas AI & phát âm chuẩn',
      icon: 'あ',
    },
    {
      id: 'chapter-2',
      number: '02',
      title: 'Chương 2: Số Đếm, Đơn Vị Đếm & Thời Gian',
      desc: 'Số 1-10.000, 8 đơn vị đếm biến âm & đọc Giờ/Phút/Thứ',
      icon: '🔢',
    },
    {
      id: 'chapter-3',
      number: '03',
      title: 'Chương 3: Chào Hỏi Giao Tiếp & Xưng Hô Văn Hóa',
      desc: 'Mẫu câu chào hỏi (Aisatsu), đại từ (私/僕/俺) & hậu tố (-san, -sama)',
      icon: '👋',
    },
    {
      id: 'chapter-4',
      number: '04',
      title: 'Chương 4: 50+ Bộ Thủ Kanji Tượng Hình Nền Tảng',
      desc: '35+ bộ thủ tượng hình, giải thích nghĩa đa chiều & luyện viết Canvas AI',
      icon: '⛩️',
    },
    {
      id: 'chapter-5',
      number: '05',
      title: 'Chương 5: Cấu Trúc Câu & Thì Ngữ Pháp Nhập Môn',
      desc: 'Mẫu câu N1 は N2 です, từ chỉ định, bảng thì & Bài Thi Tốt Nghiệp',
      icon: '🎓',
    },
  ];

  const completedCount = Object.values(progress).filter(p => p.completed).length;
  const progressPercent = Math.round((completedCount / CHAPTERS.length) * 100);

  return (
    <div className="flex flex-col min-h-screen bg-surface font-sans">
      {/* Voice Warning Banner if ja-JP missing */}
      {!hasJaVoice && (
        <div className="bg-tertiary/15 border-b border-tertiary/30 px-4 py-2 text-xs text-tertiary font-medium flex items-center justify-center gap-2">
          <VolumeX size={15} />
          <span>Lưu ý: Trình duyệt chưa có sẵn giọng đọc tiếng Nhật (ja-JP). Bạn vẫn có thể học chữ và làm bài bình thường!</span>
        </div>
      )}

      {/* Header Bar with Overall Course Progress */}
      <div className="bg-surface-container-low border-b border-outline-variant/30 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-sm">
              <GraduationCap size={22} />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-on-surface tracking-tight flex items-center gap-2">
                <span>Lộ Trình Sách Giáo Khoa Nhập Môn Tiếng Nhật</span>
              </h1>
              <p className="text-xs text-on-surface-variant">Lộ trình học chuẩn từ con số 0 dành cho học viên mới bắt đầu</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="w-full md:w-64 space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-on-surface-variant">Tiến độ lộ trình</span>
              <span className="text-primary font-bold">{completedCount}/{CHAPTERS.length} Chương ({progressPercent}%)</span>
            </div>
            <div className="h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Left Table of Contents / Right Chapter View */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        {/* Left Table of Contents (Desktop sidebar / Mobile cards) */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-3">
          <h2 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">
            📘 Mục Lục Sách Giáo Khoa
          </h2>

          <div className="space-y-2.5">
            {CHAPTERS.map((ch, idx) => {
              const chProgress = progress[ch.id] || { completed: false, bestScore: 0, unlocked: false };
              const isActive = activeChapter === ch.id;
              const isLocked = !chProgress.unlocked;
              const prevChapter = CHAPTERS[idx - 1];

              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    if (!isLocked) setActiveChapter(ch.id);
                  }}
                  disabled={isLocked}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 relative ${
                    isActive
                      ? 'bg-primary text-on-primary border-primary shadow-md scale-101'
                      : isLocked
                      ? 'bg-surface-container/40 border-outline-variant/20 opacity-60 cursor-not-allowed'
                      : 'bg-surface-container-lowest border-outline-variant/30 text-on-surface hover:border-primary/40 hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    {/* Chapter Icon / Status */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0 ${
                      isActive ? 'bg-on-primary/20 text-on-primary' : 'bg-surface-container text-primary'
                    }`}>
                      {ch.icon}
                    </div>

                    {/* Chapter Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${isActive ? 'text-on-primary' : 'text-on-surface'}`}>
                          {ch.title.split(':')[0]}
                        </span>
                        {chProgress.completed && (
                          <CheckCircle2 size={14} className={isActive ? 'text-on-primary' : 'text-secondary'} />
                        )}
                      </div>
                      <p className={`text-[11px] truncate ${isActive ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                        {ch.title.split(':')[1]}
                      </p>
                    </div>

                    {/* Lock / Arrow Status */}
                    {isLocked ? (
                      <Lock size={15} className="text-on-surface-variant/50 flex-shrink-0" />
                    ) : (
                      <ChevronRight size={16} className={`flex-shrink-0 ${isActive ? 'text-on-primary' : 'text-on-surface-variant'}`} />
                    )}
                  </div>

                  {/* Chapter Mini Progress Bar & Unlock Condition */}
                  <div className="w-full pt-1.5 border-t border-current/10 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-semibold">
                      {isLocked ? (
                        <span className="text-error/80 flex items-center gap-1 font-medium truncate">
                          🔒 Cần test ≥ 85% {prevChapter ? prevChapter.title.split(':')[0] : 'chương trước'}
                        </span>
                      ) : chProgress.completed ? (
                        <span className={isActive ? 'text-on-primary font-bold' : 'text-secondary font-bold'}>
                          ✅ Đã vượt qua ({chProgress.bestScore}%)
                        </span>
                      ) : (
                        <span className={isActive ? 'text-on-primary/90' : 'text-on-surface-variant'}>
                          Điểm test: <strong className={isActive ? 'text-on-primary' : 'text-primary'}>{chProgress.bestScore}%</strong> / 85%
                        </span>
                      )}
                      <span className={`font-mono text-[9px] flex-shrink-0 ${isActive ? 'text-on-primary/80' : 'text-on-surface-variant/70'}`}>
                        Mục tiêu: ≥85%
                      </span>
                    </div>

                    {/* Mini Progress Bar with 85% Marker */}
                    <div className={`h-1.5 w-full rounded-full overflow-hidden relative ${isActive ? 'bg-black/20' : 'bg-surface-container-high'}`}>
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isActive
                            ? 'bg-white'
                            : chProgress.completed
                            ? 'bg-secondary'
                            : 'bg-primary'
                        }`}
                        style={{ width: `${Math.min(100, chProgress.bestScore)}%` }}
                      />
                      {/* Target 85% threshold mark */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-tertiary/70 z-10"
                        style={{ left: '85%' }}
                        title="Mốc 85% để mở khóa chương tiếp theo"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Chapter Display Area with Custom Top & Center Loading Indicator */}
        <div className="flex-1 min-w-0 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl min-h-[600px] shadow-sm">
          {!progress[activeChapter]?.unlocked ? (
            <LockedChapterView onGoBack={() => setActiveChapter('chapter-1')} />
          ) : (
            <Suspense fallback={<ChapterLoadingState />}>
              <AnimatePresence mode="wait">
                {activeChapter === 'chapter-1' && (
                  <motion.div key="chapter-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <AlphabetExplorer onChapterComplete={handleChapterComplete} />
                  </motion.div>
                )}

                {activeChapter === 'chapter-2' && (
                  <motion.div key="chapter-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <NumbersAndTime onChapterComplete={handleChapterComplete} />
                  </motion.div>
                )}

                {activeChapter === 'chapter-3' && (
                  <motion.div key="chapter-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <AisatsuPhrases onChapterComplete={handleChapterComplete} />
                  </motion.div>
                )}

                {activeChapter === 'chapter-4' && (
                  <motion.div key="chapter-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <KanjiRadicalsHub onChapterComplete={handleChapterComplete} />
                  </motion.div>
                )}

                {activeChapter === 'chapter-5' && (
                  <motion.div key="chapter-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <BasicGrammarHub onChapterComplete={handleChapterComplete} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Custom Loading Fallback Component with Progress Bar
 * Displayed when user switches chapters to prevent waiting anxiety
 */
function ChapterLoadingState() {
  return (
    <div className="w-full h-full min-h-[500px] flex flex-col justify-between relative overflow-hidden">
      {/* Top Animated Progress Bar */}
      <div className="w-full h-1.5 bg-surface-container-high overflow-hidden">
        <div className="h-full bg-primary animate-pulse w-3/4 transition-all duration-300" />
      </div>

      {/* Center Skeleton & Loading Spinner */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4 text-center">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-3 border-primary/20 border-t-primary animate-spin" />
          <Sparkles className="absolute inset-0 m-auto text-primary" size={20} />
        </div>
        <div>
          <h4 className="text-base font-bold text-on-surface">Đang Tải Nội Dung Bài Học...</h4>
          <p className="text-xs text-on-surface-variant mt-1">Đang tối ưu tài nguyên phát âm và bài tập thực hành</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Màn hình bảo vệ khi người dùng cố truy cập chương chưa mở khóa
 */
function LockedChapterView({ onGoBack }: { onGoBack: () => void }) {
  return (
    <div className="w-full h-full min-h-[550px] flex flex-col items-center justify-center p-8 text-center space-y-5">
      <div className="w-20 h-20 rounded-3xl bg-error/10 border border-error/20 text-error flex items-center justify-center shadow-inner">
        <Lock size={36} />
      </div>

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-2xl font-bold text-on-surface">Chương Này Đang Bị Khóa 🔒</h3>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          Theo quy chuẩn lộ trình học tập, bạn bắt buộc phải hoàn thành bài kiểm tra tổng hợp ở Chương trước đó với điểm số <strong>từ 85% trở lên</strong> thì mới được mở khóa chương này.
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={onGoBack}
          className="px-6 py-3 rounded-2xl bg-primary text-on-primary font-bold text-xs sm:text-sm cursor-pointer hover:bg-primary-container transition-all shadow-sm active:scale-98 flex items-center gap-2"
        >
          <span>Quay Lại Học Chương 1</span>
        </button>
      </div>
    </div>
  );
}
