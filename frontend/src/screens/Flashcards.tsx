import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Settings, Volume2, RotateCcw, Zap, ChevronRight, Layers, BookOpen, Trophy, Flame, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useFlashcardStore, type FlashcardItem } from '../store/useFlashcardStore';
import { useAuthStore } from '../store/useAuthStore';

/* ─── Quality → SM-2 mapping ──────────────────────────── */
const RATINGS = [
  { label: 'Quên',       quality: 0, color: 'error',     interval: '< 1 phút', key: '1', icon: RotateCcw },
  { label: 'Khó',        quality: 2, color: 'tertiary',  interval: '5 phút',   key: '2', icon: Flame },
  { label: 'Trung bình', quality: 3, color: 'primary',   interval: '10 phút',  key: '3', icon: Clock },
  { label: 'Dễ',         quality: 5, color: 'secondary', interval: '4 ngày',   key: '4', icon: Zap },
] as const;

/* ─── Deck options ────────────────────────────────────── */
const DECKS = [
  { id: 'all',        label: 'Tất cả',   icon: Layers,   desc: 'Ôn tất cả thẻ đến hạn' },
  { id: 'vocabulary', label: 'Từ vựng',   icon: BookOpen,  desc: 'Từ vựng N5 - N1' },
  { id: 'kanji',      label: 'Hán tự',    icon: Sparkles,  desc: 'Chữ Kanji theo cấp độ' },
];

/* ═══════════════════════════════════════════════════════ */
export default function Flashcards({ onExit }: { onExit: () => void }) {
  const { cards, currentIndex, isLoading, sessionComplete, sessionStats, fetchStudySession, reviewCard, nextCard, resetSession } = useFlashcardStore();
  const { user } = useAuthStore();

  const [isFlipped, setIsFlipped] = useState(false);
  const [showDeckPicker, setShowDeckPicker] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right'>('right');
  const cardRef = useRef<HTMLDivElement>(null);

  const currentCard: FlashcardItem | null = cards[currentIndex] ?? null;
  const progress = cards.length > 0 ? ((currentIndex + (sessionComplete ? 1 : 0)) / cards.length) * 100 : 0;

  /* ── Start session ── */
  const startSession = useCallback(async () => {
    setShowDeckPicker(false);
    setIsFlipped(false);
    await fetchStudySession(user?.id ?? 0);
  }, [fetchStudySession, user]);

  /* ── Handle rating ── */
  const handleRate = useCallback(async (quality: number) => {
    if (!currentCard || isAnimating) return;
    setIsAnimating(true);
    setExitDirection(quality >= 3 ? 'right' : 'left');

    await reviewCard(currentCard.id, quality);

    // Brief pause for exit animation
    setTimeout(() => {
      setIsFlipped(false);
      nextCard();
      setIsAnimating(false);
    }, 350);
  }, [currentCard, isAnimating, reviewCard, nextCard]);

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showDeckPicker || sessionComplete) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (!isAnimating) setIsFlipped(prev => !prev);
      }
      if (isFlipped && !isAnimating) {
        const rating = RATINGS.find(r => r.key === e.key);
        if (rating) handleRate(rating.quality);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, isAnimating, showDeckPicker, sessionComplete, handleRate]);

  /* ── Deck Picker Overlay ── */
  if (showDeckPicker) {
    return (
      <div className="min-h-screen flex flex-col bg-surface font-sans">
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16">
          <div className="flex items-center gap-4">
            <button onClick={onExit} className="text-on-surface-variant hover:bg-surface-container-low rounded-full p-2 transition-colors cursor-pointer">
              <X size={24} />
            </button>
            <span className="text-xl font-bold text-primary tracking-tight">NipponMaster</span>
          </div>
        </nav>

        <main className="flex-1 pt-24 pb-12 px-4 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/8 text-primary rounded-full text-sm font-medium mb-6">
              <Layers size={16} />
              Spaced Repetition System
            </div>
            <h1 className="text-4xl font-bold text-on-surface mb-3">Ôn tập hôm nay</h1>
            <p className="text-on-surface-variant text-lg">Chọn bộ thẻ bạn muốn ôn tập</p>
          </motion.div>

          <div className="w-full space-y-3">
            {DECKS.map((deck, i) => {
              const Icon = deck.icon;
              return (
                <motion.button
                  key={deck.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                  onClick={startSession}
                  className="w-full flex items-center gap-5 p-5 bg-surface-container-lowest border border-outline-variant/50 rounded-2xl hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer text-left"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors shrink-0">
                    <Icon size={26} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-on-surface">{deck.label}</h3>
                    <p className="text-sm text-on-surface-variant">{deck.desc}</p>
                  </div>
                  <ChevronRight size={20} className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </motion.button>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  /* ── Loading ── */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-surface-container-high border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant font-medium">Đang tải thẻ ôn tập…</p>
        </motion.div>
      </div>
    );
  }

  /* ── Session Complete ── */
  if (sessionComplete) {
    const totalReviewed = sessionStats.again + sessionStats.hard + sessionStats.good + sessionStats.easy;
    const masteredCount = sessionStats.good + sessionStats.easy;
    const masteryRate = totalReviewed > 0 ? Math.round((masteredCount / totalReviewed) * 100) : 0;

    return (
      <div className="min-h-screen flex flex-col bg-surface font-sans">
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16">
          <button onClick={onExit} className="text-on-surface-variant hover:bg-surface-container-low rounded-full p-2 transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </nav>

        <main className="flex-1 pt-24 pb-12 px-4 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-full text-center"
          >
            {/* Trophy */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-tertiary/20 to-primary/10 flex items-center justify-center mx-auto mb-6"
            >
              <Trophy size={44} className="text-tertiary" />
            </motion.div>

            <h1 className="text-3xl font-bold text-on-surface mb-2">Hoàn thành xuất sắc!</h1>
            <p className="text-on-surface-variant mb-8">Bạn đã ôn tập xong {totalReviewed} thẻ trong phiên này.</p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <StatBox label="Đã thuộc" value={masteredCount} accent="secondary" />
              <StatBox label="Tỷ lệ" value={`${masteryRate}%`} accent="primary" />
              <StatBox label="Cần ôn lại" value={sessionStats.again + sessionStats.hard} accent="error" />
              <StatBox label="Tổng thẻ" value={totalReviewed} accent="tertiary" />
            </div>

            {/* Breakdown bar */}
            {totalReviewed > 0 && (
              <div className="w-full h-3 rounded-full overflow-hidden flex mb-8 bg-surface-container-high">
                {sessionStats.easy > 0 && <div className="h-full bg-secondary transition-all" style={{ width: `${(sessionStats.easy / totalReviewed) * 100}%` }} />}
                {sessionStats.good > 0 && <div className="h-full bg-primary transition-all" style={{ width: `${(sessionStats.good / totalReviewed) * 100}%` }} />}
                {sessionStats.hard > 0 && <div className="h-full bg-tertiary transition-all" style={{ width: `${(sessionStats.hard / totalReviewed) * 100}%` }} />}
                {sessionStats.again > 0 && <div className="h-full bg-error transition-all" style={{ width: `${(sessionStats.again / totalReviewed) * 100}%` }} />}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => { resetSession(); setShowDeckPicker(true); }}
                className="flex-1 py-3.5 border border-outline-variant text-on-surface-variant rounded-xl font-medium hover:bg-surface-container-low transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                Ôn lại
              </button>
              <button
                onClick={onExit}
                className="flex-1 py-3.5 bg-primary text-on-primary rounded-xl font-medium hover:bg-primary/90 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                Hoàn tất
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  /* ═══ MAIN STUDY VIEW ═══ */
  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans">
      {/* ── Top Nav ── */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onExit} className="text-on-surface-variant hover:bg-surface-container-low rounded-full p-2 transition-colors cursor-pointer">
            <X size={24} />
          </button>
          <span className="text-xl font-bold text-primary tracking-tight hidden sm:inline">NipponMaster</span>
        </div>

        {/* Progress */}
        <div className="flex-1 max-w-md mx-6 flex flex-col items-center">
          <div className="w-full flex justify-between text-sm font-medium text-on-surface-variant mb-1.5">
            <span className="flex items-center gap-1.5">
              <Layers size={14} />
              Ôn tập SRS
            </span>
            <span>{currentIndex + 1} / {cards.length}</span>
          </div>
          <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        <button className="text-on-surface-variant hover:bg-surface-container-low rounded-full p-2 transition-colors cursor-pointer">
          <Settings size={24} />
        </button>
      </nav>

      {/* ── Card area ── */}
      <main className="flex-1 pt-24 pb-8 px-4 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        {currentCard && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              ref={cardRef}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: exitDirection === 'right' ? -120 : 120, scale: 0.9, rotate: exitDirection === 'right' ? -3 : 3 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full max-w-2xl mb-8"
              style={{ perspective: 1200 }}
            >
              <div
                className="relative w-full cursor-pointer"
                style={{ transformStyle: 'preserve-3d', minHeight: 400 }}
                onClick={() => { if (!isAnimating) setIsFlipped(prev => !prev); }}
              >
                {/* ── FRONT ── */}
                <motion.div
                  className="absolute inset-0 rounded-[2rem] bg-surface-container-lowest border border-outline-variant shadow-sm flex flex-col items-center justify-center p-8"
                  style={{ backfaceVisibility: 'hidden' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.55, ease: [0.4, 0.0, 0.2, 1] }}
                >
                  {/* Tags */}
                  <div className="absolute top-6 right-6 flex gap-2">
                    <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full text-xs font-bold uppercase tracking-wider">
                      N5
                    </span>
                    <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full text-xs font-bold uppercase tracking-wider">
                      {currentCard.cardType === 'KANJI' ? 'Kanji' : currentCard.cardType === 'GRAMMAR' ? 'Grammar' : 'Vocab'}
                    </span>
                  </div>

                  {/* Card counter pill */}
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1 bg-primary/8 text-primary rounded-full text-xs font-bold">
                      #{currentIndex + 1}
                    </span>
                  </div>

                  {/* Japanese text */}
                  <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                    className="text-7xl md:text-8xl font-jp font-medium text-on-surface mb-6 tracking-widest select-none"
                  >
                    {currentCard.front}
                  </motion.h2>

                  {/* Hint */}
                  <p className="text-sm text-on-surface-variant opacity-60 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-surface-container-low rounded text-[10px] font-mono font-bold">SPACE</span>
                    để lật thẻ
                  </p>
                </motion.div>

                {/* ── BACK ── */}
                <motion.div
                  className="absolute inset-0 rounded-[2rem] bg-surface-container-lowest border-2 border-primary/20 shadow-md flex flex-col items-center justify-center p-8"
                  style={{ backfaceVisibility: 'hidden' }}
                  animate={{ rotateY: isFlipped ? 0 : -180 }}
                  transition={{ duration: 0.55, ease: [0.4, 0.0, 0.2, 1] }}
                >
                  {/* Audio button */}
                  <button
                    className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors p-2.5 rounded-full hover:bg-surface-container-low cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Volume2 size={24} />
                  </button>

                  {/* Reading + Kanji */}
                  <div className="flex flex-col items-center gap-1 mb-4">
                    {currentCard.reading && (
                      <span className="text-xl text-primary font-medium tracking-widest">{currentCard.reading}</span>
                    )}
                    <h2 className="text-5xl md:text-6xl font-jp font-bold text-on-surface leading-none">{currentCard.front}</h2>
                  </div>

                  <div className="w-16 border-t-2 border-surface-variant my-4 rounded-full" />

                  {/* Meaning */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-on-surface mb-2">{currentCard.back}</h3>
                  </div>

                  {/* Example sentence */}
                  <div className="bg-surface-container-low/50 p-4 rounded-2xl w-full text-center max-w-md">
                    <p className="text-lg text-on-surface mb-1">
                      日本語の<span className="font-bold text-primary">{currentCard.front}</span>はとても面白いです。
                    </p>
                    <p className="text-sm text-on-surface-variant">Ví dụ sử dụng từ trong câu.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── Rating Buttons ── */}
        <AnimatePresence>
          {isFlipped && !isAnimating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl grid grid-cols-4 gap-3"
            >
              {RATINGS.map((r) => {
                const Icon = r.icon;
                return (
                  <motion.button
                    key={r.key}
                    whileHover={{ y: -4, scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleRate(r.quality)}
                    className={`flex flex-col items-center justify-center py-4 px-2 bg-surface-container-lowest border rounded-2xl transition-all shadow-sm cursor-pointer
                      ${r.color === 'error' ? 'border-error/20 text-error hover:bg-error/5' : ''}
                      ${r.color === 'tertiary' ? 'border-tertiary/20 text-tertiary hover:bg-tertiary/5' : ''}
                      ${r.color === 'primary' ? 'border-primary/20 text-primary hover:bg-primary/5' : ''}
                      ${r.color === 'secondary' ? 'border-secondary/20 text-secondary hover:bg-secondary/5' : ''}
                    `}
                  >
                    <Icon size={20} className="mb-1.5 opacity-70" />
                    <span className="text-sm font-bold mb-0.5">{r.label}</span>
                    <span className="text-xs opacity-60 mb-2">{r.interval}</span>
                    <div className="px-2 py-0.5 bg-surface text-on-surface-variant rounded-md text-[10px] font-mono font-medium">
                      {r.key}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ── Small stat box for session complete ── */
function StatBox({ label, value, accent }: { label: string; value: number | string; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`p-4 rounded-xl border bg-surface-container-lowest text-center
        ${accent === 'primary' ? 'border-primary/15' : ''}
        ${accent === 'secondary' ? 'border-secondary/15' : ''}
        ${accent === 'error' ? 'border-error/15' : ''}
        ${accent === 'tertiary' ? 'border-tertiary/15' : ''}
      `}
    >
      <p className={`text-2xl font-bold mb-1
        ${accent === 'primary' ? 'text-primary' : ''}
        ${accent === 'secondary' ? 'text-secondary' : ''}
        ${accent === 'error' ? 'text-error' : ''}
        ${accent === 'tertiary' ? 'text-tertiary' : ''}
      `}>{value}</p>
      <p className="text-xs text-on-surface-variant font-medium">{label}</p>
    </motion.div>
  );
}
