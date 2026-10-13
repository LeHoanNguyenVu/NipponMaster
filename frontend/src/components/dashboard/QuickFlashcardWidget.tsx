import { useState, useEffect } from 'react';
import { Star, RotateCw, Volume2, Sparkles, SlidersHorizontal, ArrowRight, CheckCircle2, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ScreenType } from '../../App';
import type { FlashcardItem } from '../../data/flashcardMnemonics';
import { STANDARD_KANJI_INFO, resolveMnemonicInfo, KANJI_ENGLISH_INFO } from '../../data/flashcardMnemonics';
import { playBoostedJapaneseAudio } from '../../utils/audioBoost';
import { recordCardReviewSRS, type SrsDifficulty } from '../../utils/srsCardManager';

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
  const { t, i18n } = useTranslation(['dashboard', 'common']);
  const currentLang = i18n.language || 'vi';
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
  const englishInfo = KANJI_ENGLISH_INFO[kanjiKey] || KANJI_ENGLISH_INFO[kanaKey];

  const displayKana = standardInfo?.kana || (activeCard?.kana || activeCard?.kanji || '').replace(/[・·•]/g, '').split(/[,/、]/)[0].trim();
  const displayRomaji = standardInfo?.romaji || activeCard?.romaji || '';
  const playableWord = standardInfo?.kana || displayKana || activeCard?.kanji || '';
  const cardMeaning = currentLang === 'en' && englishInfo?.meaning ? englishInfo.meaning : activeCard?.meaning;
  const cardExample = currentLang === 'en' && englishInfo?.example ? englishInfo.example : activeCard?.exampleVi;

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

  // Đánh giá ghi nhớ theo Spaced Repetition (SRS): Dễ (+7d), Thường (+3d), Khó (+1d)
  const handleRateSRS = (difficulty: SrsDifficulty) => {
    if (!activeCard) return;

    // 1. Ghi nhận SRS
    recordCardReviewSRS(activeCard, difficulty);

    // 2. Ghi nhận thẻ đã học để tích lũy điểm danh
    onCardReviewed(cardIndex % deckLength);

    // 3. Tự động lật lại mặt trước & chuyển thẻ tiếp theo
    setIsFlipped(false);
    setIsDealing(true);
    setTimeout(() => {
      setCardIndex((prev) => (prev + 1) % deckLength);
    }, 200);
    setTimeout(() => {
      setIsDealing(false);
    }, 600);
  };

  const reviewedCount = todayReviewedCards.length;

  return (
    <section 
      className="w-full bg-surface-container-lowest p-6 md:p-8 border border-outline-variant/60 space-y-5 shadow-flat-sm relative font-serif"
      style={{ borderRadius: '2px' }}
    >
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-outline-variant/30">
        <div className="flex items-center gap-2.5 flex-wrap font-serif">
          <div className="w-8 h-8 bg-primary/15 text-primary flex items-center justify-center shadow-2xs" style={{ borderRadius: '2px' }}>
            <Star size={18} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-on-surface font-serif">{t('dashboard:flashcardWidget.title')}</h3>
            <p className="text-xs text-outline font-serif">{t('dashboard:flashcardWidget.subtitle')}</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 border border-primary/30 bg-primary/10 text-primary font-mono" style={{ borderRadius: '2px' }}>
            {levelDisplay}
          </span>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 bg-surface-container-high text-on-surface border border-outline-variant/40 font-mono" style={{ borderRadius: '2px' }}>
            {t('dashboard:flashcardWidget.cardNumber', { current: currentCardNumber, total: deckLength })}
          </span>

          {/* Badge tiến độ điểm danh hôm nay */}
          {checkedInToday ? (
            <span className="text-[11px] font-extrabold px-2.5 py-0.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-serif" style={{ borderRadius: '2px' }}>
              <CheckCircle2 size={13} />
              <span>{t('dashboard:flashcardWidget.checkedInBadge')}</span>
            </span>
          ) : (
            <span className="text-[11px] font-bold px-2.5 py-0.5 bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1 font-serif" style={{ borderRadius: '2px' }}>
              <Flame size={13} className="text-amber-500 fill-amber-500" />
              <span>{t('dashboard:flashcardWidget.checkInBadge', { reviewed: reviewedCount, goal: todayGoalCards })}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 font-serif">
          {/* Volume Slider Trigger Button */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowVolumePopup(!showVolumePopup);
              }}
              title={t('dashboard:flashcardWidget.volumeTitle', { volume: ttsVolume })}
              className={`p-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                showVolumePopup
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface border-outline-variant/40'
              }`}
              style={{ borderRadius: '2px' }}
            >
              <Volume2 size={15} className={ttsVolume > 150 ? 'text-amber-500' : ''} />
              <span className="text-xs font-bold hidden sm:inline font-mono">{ttsVolume}%</span>
            </button>

            {/* Volume Slider Popover */}
            {showVolumePopup && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-10 z-50 w-56 p-3.5 bg-surface-container-lowest border border-outline-variant/60 shadow-xl space-y-2.5 animate-in fade-in zoom-in-95 duration-150"
                style={{ borderRadius: '2px' }}
              >
                <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                  <span className="flex items-center gap-1">
                    <SlidersHorizontal size={13} className="text-primary" />
                    {t('dashboard:flashcardWidget.volumeLabel')}
                  </span>
                  <span className="text-primary font-black font-mono">{ttsVolume}%</span>
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
                      className={`py-1 text-[10px] font-bold transition-all cursor-pointer border ${
                        ttsVolume === preset
                          ? 'bg-primary text-white border-primary shadow-2xs'
                          : 'bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/30'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      {preset}%
                    </button>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    playBoostedJapaneseAudio(playableWord, ttsVolume, e);
                  }}
                  className="w-full py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  style={{ borderRadius: '2px' }}
                >
                  <Volume2 size={13} />
                  <span>{t('dashboard:flashcardWidget.testVolume')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Deal Next Card Button */}
          <button
            onClick={(e) => handleDealNextCard(e)}
            disabled={isDealing}
            title={t('dashboard:flashcardWidget.dealCardTitle')}
            className="group text-xs font-bold text-primary hover:text-primary/80 transition-all cursor-pointer flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 border border-primary/30 px-3.5 py-2 flex-shrink-0 shadow-2xs font-serif"
            style={{ borderRadius: '2px' }}
          >
            <span className="text-base">🎴</span>
            <span>{t('dashboard:flashcardWidget.dealCard')}</span>
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
              title={t('dashboard:flashcardWidget.cardNumber', { current: idx + 1, total: deckLength })}
              className={`h-2 flex-1 transition-all duration-300 ${
                isCurrent
                  ? 'bg-primary ring-2 ring-primary/40'
                  : isReviewed
                    ? 'bg-amber-500 shadow-2xs'
                    : 'bg-surface-container-high'
              }`}
              style={{ borderRadius: '1px' }}
            />
          );
        })}
      </div>

      {/* 3. Full-width 3D Flip Card: Click anywhere on the card to flip! */}
      <div 
        style={{ perspective: '1200px' }}
        className="w-full min-h-[350px] cursor-pointer select-none relative group font-serif"
        onClick={() => setIsFlipped((prev) => !prev)}
        title={t('dashboard:flashcardWidget.clickSpaceToFlip')}
      >
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '350px',
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
              borderRadius: '2px',
            }}
            className="bg-gradient-to-br from-primary/10 via-surface-container-low to-surface-container border-2 border-primary/30 flex flex-col items-center justify-center p-8 text-center shadow-flat-sm group-hover:border-primary/60 transition-colors"
          >
            <span className="text-8xl md:text-9xl font-black text-primary font-serif tracking-wide drop-shadow-xs">
              {activeCard.kanji}
            </span>

            <div className="mt-8 flex items-center gap-2">
              <span className="text-xs font-bold text-primary bg-primary/15 border border-primary/30 px-5 py-2 flex items-center gap-2 shadow-2xs font-serif" style={{ borderRadius: '2px' }}>
                <Sparkles size={15} />
                <span>{t('dashboard:flashcardWidget.tapToFlip')}</span>
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
              borderRadius: '2px',
            }}
            className="bg-gradient-to-br from-amber-500/15 via-surface-container-low to-surface-container border-2 border-amber-500/40 p-6 md:p-8 flex flex-col justify-between shadow-flat-sm font-serif"
          >
            {/* Header bar of back face */}
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <span className="text-4xl md:text-5xl font-black text-primary font-serif">{activeCard.kanji}</span>
                <div>
                  <p className="text-lg md:text-xl font-black text-amber-600 dark:text-amber-400 flex items-center gap-2">
                    <span>{displayKana}</span>
                    {displayRomaji && displayRomaji.trim() !== '' && (
                      <span className="text-xs font-semibold text-outline font-mono">[{displayRomaji}]</span>
                    )}
                  </p>
                  {activeCard.hanViet && activeCard.hanViet.trim() !== '' && currentLang === 'vi' && (
                    <p className="text-xs font-semibold text-outline">
                      {t('dashboard:flashcardWidget.sinoVietnamese')} <span className="font-bold text-on-surface">{activeCard.hanViet}</span>
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
                title={t('dashboard:flashcardWidget.volumeTitle', { volume: ttsVolume })}
                className="p-2.5 bg-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-white border border-amber-500/30 transition-all cursor-pointer shadow-2xs flex-shrink-0 flex items-center gap-2 font-bold text-xs font-serif"
                style={{ borderRadius: '2px' }}
              >
                <Volume2 size={18} />
                <span className="hidden sm:inline">{t('dashboard:flashcardWidget.pronounce')}</span>
              </button>
            </div>

            {/* Two-column Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 flex-1 items-center">
              {/* Cột trái: Ý nghĩa & Mẹo nhớ */}
              <div className="space-y-3 font-serif">
                <div>
                  <span className="text-xs font-bold text-outline uppercase tracking-wider">{t('dashboard:flashcardWidget.meaningLabel')}</span>
                  <p className="text-lg sm:text-xl font-extrabold text-primary mt-0.5">
                    {cardMeaning}
                  </p>
                </div>

                {mnemonicInfo.mnemonicHint && currentLang === 'vi' && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 shadow-2xs" style={{ borderRadius: '2px' }}>
                    <span className="text-2xl flex-shrink-0">{mnemonicInfo.mnemonicIcon || '💡'}</span>
                    <div>
                      <p className="text-xs font-bold text-amber-800 dark:text-amber-300">
                        {mnemonicInfo.mnemonicTitle || t('dashboard:flashcardWidget.mnemonicTitle')}:
                      </p>
                      <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium mt-0.5">
                        {mnemonicInfo.mnemonicHint}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Cột phải: Câu ví dụ thực tế */}
              <div className="font-serif">
                {activeCard.exampleJp && activeCard.exampleJp.trim() !== '' ? (
                  <div className="p-4 bg-surface-container-lowest/90 border border-outline-variant/40 space-y-2 shadow-2xs" style={{ borderRadius: '2px' }}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-outline">{t('dashboard:flashcardWidget.exampleLabel')}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playBoostedJapaneseAudio(activeCard.exampleJp, ttsVolume, e);
                        }}
                        title="Play sentence audio"
                        className="p-1.5 text-primary hover:bg-primary/10 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
                        style={{ borderRadius: '2px' }}
                      >
                        <Volume2 size={14} />
                        <span>{t('dashboard:flashcardWidget.listenSentence')}</span>
                      </button>
                    </div>
                    <p className="text-sm sm:text-base font-extrabold text-on-surface leading-snug">
                      {activeCard.exampleJp}
                    </p>
                    {activeCard.exampleRomaji && activeCard.exampleRomaji.trim() !== '' && (
                      <p className="text-xs text-outline italic font-mono">({activeCard.exampleRomaji})</p>
                    )}
                    {cardExample && cardExample.trim() !== '' && (
                      <p className="text-xs sm:text-sm font-bold text-primary pt-1 border-t border-outline-variant/30">
                        ➔ {cardExample}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-surface-container-lowest/60 border border-outline-variant/30 text-xs text-outline text-center" style={{ borderRadius: '2px' }}>
                    {t('dashboard:flashcardWidget.noExample')}
                  </div>
                )}
              </div>
            </div>

            {/* 3 Nút Đánh Giá Spaced Repetition (SRS) ở Mặt Sau: Dễ (+7d), Thường (+3d), Khó (+1d) */}
            <div className="pt-3.5 border-t border-outline-variant/30 z-20 font-serif">
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full">
                {/* Nút Khó: +1 ngày */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRateSRS('hard');
                  }}
                  title={t('dashboard:flashcardWidget.srsHardTitle')}
                  className="py-2.5 px-3 bg-rose-500/15 hover:bg-rose-500 text-rose-700 dark:text-rose-300 hover:text-white border border-rose-500/35 hover:border-rose-500 transition-all cursor-pointer shadow-2xs flex flex-col items-center justify-center gap-0.5 group/btn"
                  style={{ borderRadius: '2px' }}
                >
                  <span className="text-xs sm:text-sm font-black">{t('dashboard:flashcardWidget.srsHard')}</span>
                  <span className="text-[10px] opacity-80 group-hover/btn:opacity-100 font-medium">
                    {t('dashboard:flashcardWidget.srsHardSub')}
                  </span>
                </button>

                {/* Nút Thường: +3 ngày */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRateSRS('medium');
                  }}
                  title={t('dashboard:flashcardWidget.srsMediumTitle')}
                  className="py-2.5 px-3 bg-amber-500/15 hover:bg-amber-500 text-amber-700 dark:text-amber-300 hover:text-white border border-amber-500/35 hover:border-amber-500 transition-all cursor-pointer shadow-2xs flex flex-col items-center justify-center gap-0.5 group/btn"
                  style={{ borderRadius: '2px' }}
                >
                  <span className="text-xs sm:text-sm font-black">{t('dashboard:flashcardWidget.srsMedium')}</span>
                  <span className="text-[10px] opacity-80 group-hover/btn:opacity-100 font-medium">
                    {t('dashboard:flashcardWidget.srsMediumSub')}
                  </span>
                </button>

                {/* Nút Dễ: +7 ngày */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRateSRS('easy');
                  }}
                  title={t('dashboard:flashcardWidget.srsEasyTitle')}
                  className="py-2.5 px-3 bg-emerald-500/15 hover:bg-emerald-500 text-emerald-700 dark:text-emerald-300 hover:text-white border border-emerald-500/35 hover:border-emerald-500 transition-all cursor-pointer shadow-2xs flex flex-col items-center justify-center gap-0.5 group/btn"
                  style={{ borderRadius: '2px' }}
                >
                  <span className="text-xs sm:text-sm font-black">{t('dashboard:flashcardWidget.srsEasy')}</span>
                  <span className="text-[10px] opacity-80 group-hover/btn:opacity-100 font-medium">
                    {t('dashboard:flashcardWidget.srsEasySub')}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Nav to Kanji */}
      <div className="flex justify-end pt-1 font-serif">
        <button
          onClick={() => onNavigate('kanji')}
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer font-serif"
        >
          <span>{t('dashboard:flashcardWidget.exploreKanji')}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}
