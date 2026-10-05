import { useState, useEffect } from 'react';
import { Star, RotateCw, Volume2, Sparkles, SlidersHorizontal, ArrowRight, CheckCircle2, Flame } from 'lucide-react';
import type { ScreenType } from '../../App';
import type { FlashcardItem } from '../../data/flashcardMnemonics';
import { STANDARD_KANJI_INFO, resolveMnemonicInfo } from '../../data/flashcardMnemonics';
import { playBoostedJapaneseAudio } from '../../utils/audioBoost';

interface QuickFlashcardWidgetProps {
  currentDeck: FlashcardItem[];
  levelDisplay: string;
  onNavigate: (screen: ScreenType) => void;
  todayReviewedCards: number[];
  todayGoalCards: number;
  checkedInToday: boolean;
  onCardReviewed: (cardIndex: number) => void;
}

export default function QuickFlashcardWidget({
  currentDeck,
  levelDisplay,
  onNavigate,
  todayReviewedCards,
  todayGoalCards,
  checkedInToday,
  onCardReviewed,
}: QuickFlashcardWidgetProps) {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isDealing, setIsDealing] = useState<boolean>(false);
  const [showVolumePopup, setShowVolumePopup] = useState<boolean>(false);

  const [ttsVolume, setTtsVolume] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('nippon_tts_volume');
      if (saved) return Number(saved);
    } catch {}
    return 200;
  });

  const handleVolumeChange = (newVol: number) => {
    setTtsVolume(newVol);
    try {
      localStorage.setItem('nippon_tts_volume', newVol.toString());
    } catch {}
  };

  const deckLength = Math.max(1, currentDeck.length);
  const currentCardNumber = (cardIndex % deckLength) + 1;
  const activeCard = currentDeck[cardIndex % deckLength] || currentDeck[0];

  // Tự động ghi nhận thẻ hiện tại đã được học
  useEffect(() => {
    onCardReviewed(cardIndex % deckLength);
  }, [cardIndex, deckLength, onCardReviewed]);

  // Chuẩn hóa phát âm và cách đọc
  const kanjiKey = (activeCard?.kanji || '').trim();
  const kanaKey = (activeCard?.kana || '').trim();
  const standardInfo = STANDARD_KANJI_INFO[kanjiKey] || STANDARD_KANJI_INFO[kanaKey];

  const displayKana = standardInfo?.kana || (activeCard?.kana || activeCard?.kanji || '').replace(/[・·•]/g, '').split(/[,/、]/)[0].trim();
  const displayRomaji = standardInfo?.romaji || activeCard?.romaji || '';
  const playableWord = standardInfo?.kana || displayKana || activeCard?.kanji || '';

  // Mnemonic info
  const mnemonicInfo = resolveMnemonicInfo(activeCard);

  // Đổi thẻ kế tiếp
  const handleDealNextCard = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsFlipped(false);
    setIsDealing(true);
    setTimeout(() => {
      setCardIndex((prev) => (prev + 1) % deckLength);
    }, 150);
    setTimeout(() => {
      setIsDealing(false);
    }, 550);
  };

  const reviewedCount = todayReviewedCards.length;

  return (
    <section className="w-full bg-surface-container-lowest rounded-3xl p-6 md:p-8 border border-outline-variant/60 space-y-5 shadow-xs relative">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-outline-variant/30">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
            <Star size={18} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-on-surface">Luyện Trí Nhớ Nhanh (Flashcards)</h3>
            <p className="text-xs text-outline">Chạm vào bất kỳ khoảng trống nào trên thẻ để lật qua lại</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {levelDisplay}
          </span>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface border border-outline-variant/40">
            Thẻ {currentCardNumber} / {deckLength}
          </span>

          {/* Badge tiến độ điểm danh hôm nay */}
          {checkedInToday ? (
            <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 size={13} />
              <span>Đã hoàn thành 10/10 thẻ & Điểm danh!</span>
            </span>
          ) : (
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Flame size={13} className="text-amber-500 fill-amber-500" />
              <span>Điểm danh: {reviewedCount}/{todayGoalCards} thẻ</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Volume Slider Trigger Button */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowVolumePopup(!showVolumePopup);
              }}
              title={`Âm lượng phát âm: ${ttsVolume}% (Nhấn để điều chỉnh)`}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                showVolumePopup
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'
              }`}
            >
              <Volume2 size={15} className={ttsVolume > 150 ? 'text-amber-500' : ''} />
              <span className="text-xs font-bold hidden sm:inline">{ttsVolume}%</span>
            </button>

            {/* Volume Slider Popover */}
            {showVolumePopup && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-10 z-50 w-56 p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xl space-y-2.5 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                  <span className="flex items-center gap-1">
                    <SlidersHorizontal size={13} className="text-primary" />
                    Âm lượng loa
                  </span>
                  <span className="text-primary font-black">{ttsVolume}%</span>
                </div>

                <input
                  type="range"
                  min="50"
                  max="250"
                  step="10"
                  value={ttsVolume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                />

                {/* Quick Preset Buttons */}
                <div className="grid grid-cols-4 gap-1 pt-1 border-t border-outline-variant/30">
                  {[100, 150, 200, 250].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleVolumeChange(preset)}
                      className={`py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        ttsVolume === preset
                          ? 'bg-primary text-white shadow-2xs'
                          : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      {preset}%
                    </button>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    playBoostedJapaneseAudio(playableWord, ttsVolume, e);
                  }}
                  className="w-full py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Volume2 size={13} />
                  <span>Thử âm lượng</span>
                </button>
              </div>
            )}
          </div>

          {/* Deal Next Card Button */}
          <button
            onClick={(e) => handleDealNextCard(e)}
            disabled={isDealing}
            title="Chuyển sang thẻ tiếp theo"
            className="group text-xs font-bold text-primary hover:text-primary/80 transition-all cursor-pointer flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 px-3.5 py-2 rounded-xl flex-shrink-0"
          >
            <span className="text-base">🎴</span>
            <span>Đổi thẻ</span>
            <RotateCw size={14} className={`transition-transform duration-500 ${isDealing ? 'rotate-180' : 'group-hover:rotate-45'}`} />
          </button>
        </div>
      </div>

      {/* 2. Mini Segmented Progress Bar (Đánh dấu các thẻ đã học) */}
      <div className="w-full flex items-center gap-1.5">
        {Array.from({ length: Math.min(10, deckLength) }).map((_, idx) => {
          const isReviewed = todayReviewedCards.includes(idx);
          const isCurrent = idx === (cardIndex % deckLength);
          return (
            <div
              key={idx}
              title={`Thẻ ${idx + 1}: ${isReviewed ? 'Đã học hôm nay' : 'Chưa học'}`}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'bg-primary ring-2 ring-primary/40'
                  : isReviewed
                    ? 'bg-amber-500 shadow-2xs'
                    : 'bg-surface-container-high'
              }`}
            />
          );
        })}
      </div>

      {/* 3. Full-width 3D Flip Card: Click anywhere on the card to flip! */}
      <div 
        style={{ perspective: '1200px' }}
        className="w-full min-h-[290px] cursor-pointer select-none relative group"
        onClick={() => setIsFlipped((prev) => !prev)}
        title="Nhấn chuột để lật thẻ"
      >
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '290px',
            transition: 'transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1)',
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Mặt Trước (Front Face) */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            className="rounded-3xl bg-gradient-to-br from-primary/10 via-surface-container-low to-surface-container border-2 border-primary/30 flex flex-col items-center justify-center p-8 text-center shadow-md group-hover:border-primary/60 transition-colors"
          >
            <span className="text-8xl md:text-9xl font-black text-primary font-serif tracking-wide drop-shadow-xs">
              {activeCard.kanji}
            </span>

            <div className="mt-8 flex items-center gap-2">
              <span className="text-xs font-bold text-primary bg-primary/15 border border-primary/30 px-5 py-2 rounded-full flex items-center gap-2 shadow-2xs">
                <Sparkles size={15} />
                <span>Chạm vào thẻ để lật xem nghĩa & phiên âm</span>
              </span>
            </div>
          </div>

          {/* Mặt Sau (Back Face) - Click vào thẻ tự lật lại */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className="rounded-3xl bg-gradient-to-br from-amber-500/15 via-surface-container-low to-surface-container border-2 border-amber-500/40 p-6 md:p-8 flex flex-col justify-between shadow-md"
          >
            {/* Header bar of back face */}
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <span className="text-4xl md:text-5xl font-black text-primary font-serif">{activeCard.kanji}</span>
                <div>
                  <p className="text-lg md:text-xl font-black text-amber-600 dark:text-amber-400 flex items-center gap-2">
                    <span>{displayKana}</span>
                    {displayRomaji && displayRomaji.trim() !== '' && (
                      <span className="text-xs font-semibold text-outline">[{displayRomaji}]</span>
                    )}
                  </p>
                  {activeCard.hanViet && activeCard.hanViet.trim() !== '' && (
                    <p className="text-xs font-semibold text-outline">
                      Âm Hán: <span className="font-bold text-on-surface">{activeCard.hanViet}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Nút phát âm (chặn nổi bọt để không làm lật thẻ khi nghe) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playBoostedJapaneseAudio(playableWord, ttsVolume, e);
                }}
                title={`Phát âm từ vựng (Âm lượng ${ttsVolume}%)`}
                className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-white transition-all cursor-pointer shadow-2xs flex-shrink-0 flex items-center gap-2 font-bold text-xs"
              >
                <Volume2 size={18} />
                <span className="hidden sm:inline">Phát âm</span>
              </button>
            </div>

            {/* Two-column Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 flex-1 items-center">
              {/* Cột trái: Ý nghĩa & Mẹo nhớ */}
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-outline uppercase tracking-wider">Ý Nghĩa:</span>
                  <p className="text-lg sm:text-xl font-extrabold text-primary mt-0.5">
                    {activeCard.meaning}
                  </p>
                </div>

                {mnemonicInfo.mnemonicHint && (
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 shadow-2xs">
                    <span className="text-2xl flex-shrink-0">{mnemonicInfo.mnemonicIcon || '💡'}</span>
                    <div>
                      <p className="text-xs font-bold text-amber-800 dark:text-amber-300">
                        {mnemonicInfo.mnemonicTitle || 'Mẹo ghi nhớ'}:
                      </p>
                      <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium mt-0.5">
                        {mnemonicInfo.mnemonicHint}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Cột phải: Câu ví dụ thực tế */}
              <div>
                {activeCard.exampleJp && activeCard.exampleJp.trim() !== '' ? (
                  <div className="p-4 rounded-2xl bg-surface-container-lowest/90 border border-outline-variant/40 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-outline">Ví dụ thực tế:</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playBoostedJapaneseAudio(activeCard.exampleJp, ttsVolume, e);
                        }}
                        title="Phát âm câu ví dụ"
                        className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
                      >
                        <Volume2 size={14} />
                        <span>Nghe câu</span>
                      </button>
                    </div>
                    <p className="text-sm sm:text-base font-extrabold text-on-surface leading-snug">
                      {activeCard.exampleJp}
                    </p>
                    {activeCard.exampleRomaji && activeCard.exampleRomaji.trim() !== '' && (
                      <p className="text-xs text-outline italic">({activeCard.exampleRomaji})</p>
                    )}
                    {activeCard.exampleVi && activeCard.exampleVi.trim() !== '' && (
                      <p className="text-xs sm:text-sm font-bold text-primary pt-1 border-t border-outline-variant/30">
                        ➔ {activeCard.exampleVi}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-surface-container-lowest/60 border border-outline-variant/30 text-xs text-outline text-center">
                    Chưa có câu ví dụ cho thẻ này. Nhấn nút Loa 🔊 để nghe phát âm.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Nav to Kanji */}
      <div className="flex justify-end pt-1">
        <button
          onClick={() => onNavigate('kanji')}
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Khám phá toàn bộ 214 Bộ Thủ Kanji</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}
