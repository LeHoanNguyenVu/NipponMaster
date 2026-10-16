import { useState, useEffect } from 'react';
import { Star, RotateCw, Volume2, Sparkles, SlidersHorizontal, CheckCircle2, Flame, Dices, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ScreenType } from '../../App';
import type { FlashcardItem } from '../../data/flashcardMnemonics';
import { STANDARD_KANJI_INFO, resolveMnemonicInfo, KANJI_ENGLISH_INFO } from '../../data/flashcardMnemonics';
import { playBoostedJapaneseAudio } from '../../utils/audioBoost';
import { recordCardReviewSRS, type SrsDifficulty } from '../../utils/srsCardManager';

interface QuickFlashcardWidgetProps {
  currentDeck: FlashcardItem[];
  levelDisplay: string;
  onNavigate?: (screen: ScreenType) => void;
  todayReviewedCards: number[];
  todayGoalCards: number;
  checkedInToday: boolean;
  onCardReviewed: (cardIndex: number) => void;
  onRefreshDeck?: () => void;
}

export default function QuickFlashcardWidget({
  currentDeck,
  levelDisplay,
  todayReviewedCards,
  todayGoalCards,
  checkedInToday,
  onCardReviewed,
  onRefreshDeck,
}: QuickFlashcardWidgetProps) {
  const { t, i18n } = useTranslation(['dashboard', 'common']);
  const currentLang = i18n.language || 'vi';
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isDealing, setIsDealing] = useState<boolean>(false);
  const [isShufflingDeck, setIsShufflingDeck] = useState<boolean>(false);
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

  // Đảm bảo 100% thẻ đều có câu ví dụ, romaji và dịch nghĩa hoàn chỉnh
  const resolvedExampleJp = activeCard?.exampleJp && activeCard.exampleJp.trim() !== ''
    ? activeCard.exampleJp
    : `「${activeCard.kanji}」の言葉を毎日勉強します。`;

  const resolvedExampleRomaji = activeCard?.exampleRomaji && activeCard.exampleRomaji.trim() !== ''
    ? activeCard.exampleRomaji
    : `'${displayKana || activeCard.kanji}' no kotoba o mainichi benkyou shimasu.`;

  const resolvedExampleVi = (activeCard?.exampleVi && activeCard.exampleVi.trim() !== '' ? activeCard.exampleVi : (currentLang === 'en' && englishInfo?.example ? englishInfo.example : null))
    || `Mỗi ngày tôi đều học chữ ${activeCard.kanji} (${cardMeaning ? cardMeaning.split(';')[0].split(',')[0].trim() : 'từ vựng'}).`;

  // Mnemonic info
  const mnemonicInfo = resolveMnemonicInfo(activeCard);

  // Đổi sang thẻ tiếp theo trong bộ 10 thẻ
  const handleDealNextCard = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsFlipped(false);
    setIsDealing(true);
    setTimeout(() => {
      setCardIndex((prev) => (prev + 1) % deckLength);
    }, 150);
    setTimeout(() => {
      setIsDealing(false);
    }, 500);
  };

  // Bốc ngẫu nhiên 10 thẻ mới từ kho dữ liệu (N5/Starter)
  const handleTriggerRefreshDeck = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!onRefreshDeck) return;
    setIsFlipped(false);
    setIsDealing(true);
    setIsShufflingDeck(true);
    setTimeout(() => {
      setCardIndex(0);
      onRefreshDeck();
    }, 200);
    setTimeout(() => {
      setIsDealing(false);
      setIsShufflingDeck(false);
    }, 600);
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
    }, 550);
  };

  const reviewedCount = todayReviewedCards.length;

  return (
    <section 
      className="w-full bg-surface-container-lowest p-5 sm:p-7 md:p-8 border border-outline-variant/60 space-y-5 shadow-flat-sm relative font-serif"
      style={{ borderRadius: '4px' }}
    >
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-outline-variant/30">
        <div className="flex items-center gap-2.5 flex-wrap font-serif">
          <div className="w-8 h-8 bg-primary/15 text-primary flex items-center justify-center shadow-2xs rounded-xs">
            <Star size={18} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-on-surface font-serif">{t('dashboard:flashcardWidget.title')}</h3>
            <p className="text-xs text-outline font-serif">{t('dashboard:flashcardWidget.subtitle')}</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 border border-primary/30 bg-primary/10 text-primary font-mono rounded-xs">
            {levelDisplay}
          </span>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 bg-surface-container-high text-on-surface border border-outline-variant/40 font-mono rounded-xs">
            {t('dashboard:flashcardWidget.cardNumber', { current: currentCardNumber, total: deckLength })}
          </span>

          {/* Badge tiến độ điểm danh hôm nay */}
          {checkedInToday ? (
            <span className="text-[11px] font-extrabold px-2.5 py-0.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-serif rounded-xs">
              <CheckCircle2 size={13} />
              <span>{t('dashboard:flashcardWidget.checkedInBadge')}</span>
            </span>
          ) : (
            <span className="text-[11px] font-bold px-2.5 py-0.5 bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1 font-serif rounded-xs">
              <Flame size={13} className="text-amber-500 fill-amber-500" />
              <span>{t('dashboard:flashcardWidget.checkInBadge', { reviewed: reviewedCount, goal: todayGoalCards })}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap font-serif">
          {/* Volume Slider Trigger Button */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowVolumePopup(!showVolumePopup);
              }}
              title={t('dashboard:flashcardWidget.volumeTitle', { volume: ttsVolume })}
              className={`p-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border rounded-xs ${
                showVolumePopup
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface border-outline-variant/40'
              }`}
            >
              <Volume2 size={15} className={ttsVolume > 150 ? 'text-amber-500' : ''} />
              <span className="text-xs font-bold hidden sm:inline font-mono">{ttsVolume}%</span>
            </button>

            {/* Volume Slider Popover */}
            {showVolumePopup && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-10 z-50 w-56 p-3.5 bg-surface-container-lowest border border-outline-variant/60 shadow-xl space-y-2.5 animate-in fade-in zoom-in-95 duration-150 rounded-xs"
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

                <div className="grid grid-cols-4 gap-1 pt-1 border-t border-outline-variant/30">
                  {[100, 150, 200, 250].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleVolumeChange(preset)}
                      className={`py-1 text-[10px] font-bold transition-all cursor-pointer border rounded-xs ${
                        ttsVolume === preset
                          ? 'bg-primary text-white border-primary shadow-2xs'
                          : 'bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/30'
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
                  className="w-full py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 rounded-xs"
                >
                  <Volume2 size={13} />
                  <span>{t('dashboard:flashcardWidget.testVolume')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Nút Thẻ Tiếp Theo (Next Card) */}
          <button
            onClick={(e) => handleDealNextCard(e)}
            disabled={isDealing}
            title="Xem thẻ tiếp theo trong bộ 10 thẻ"
            className="text-xs font-bold text-on-surface hover:text-primary transition-all cursor-pointer flex items-center gap-1.5 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/40 px-3 py-2 flex-shrink-0 shadow-2xs font-serif rounded-xs"
          >
            <span>Thẻ kế tiếp</span>
            <ChevronRight size={14} className={isDealing ? 'translate-x-1' : ''} />
          </button>

          {/* Nút Đổi Bộ Thẻ Mới (Bốc 10 thẻ ngẫu nhiên khác từ kho N5) */}
          {onRefreshDeck && (
            <button
              onClick={(e) => handleTriggerRefreshDeck(e)}
              disabled={isDealing || isShufflingDeck}
              title="Bốc 10 thẻ ngẫu nhiên mới từ kho chữ Hán"
              className="group text-xs font-bold text-primary hover:text-primary/90 transition-all cursor-pointer flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 border border-primary/35 px-3 py-2 flex-shrink-0 shadow-2xs font-serif rounded-xs"
            >
              <Dices size={14} className={isShufflingDeck ? 'animate-spin text-amber-600' : 'group-hover:rotate-45 transition-transform'} />
              <span>Đổi bộ 10 thẻ mới</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Mini Segmented Progress Bar */}
      <div className="w-full flex items-center gap-1.5">
        {Array.from({ length: Math.min(10, deckLength) }).map((_, idx) => {
          const isReviewed = todayReviewedCards.includes(idx);
          const isCurrent = idx === (cardIndex % deckLength);
          return (
            <div
              key={idx}
              title={t('dashboard:flashcardWidget.cardNumber', { current: idx + 1, total: deckLength })}
              className={`h-2 flex-1 transition-all duration-300 rounded-xs ${
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

      {/* 3. Full-width 3D Flip Card - Sử dụng CSS Grid Stacking chống tràn chiều cao */}
      <div 
        style={{ perspective: '1200px' }}
        className="w-full select-none font-serif"
      >
        <div 
          className="w-full grid [grid-template-areas:'card'] transition-transform duration-500 [transform-style:preserve-3d]"
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Mặt Trước (Front Face) */}
          <div 
            onClick={() => setIsFlipped(true)}
            style={{
              gridArea: 'card',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderRadius: '4px',
            }}
            className="w-full min-h-[420px] cursor-pointer bg-gradient-to-br from-primary/5 via-surface-container-low to-surface-container border-2 border-primary/30 flex flex-col items-center justify-between p-6 sm:p-8 text-center shadow-flat-sm hover:border-primary/60 transition-all group"
          >
            {/* Top metadata */}
            <div className="w-full flex items-center justify-between text-xs text-outline font-mono">
              <span className="font-bold px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-xs">
                {activeCard.jlptLevel || 'N5'}
              </span>
              <span className="font-semibold text-outline/80">
                Chạm vào thẻ để lật xem chi tiết
              </span>
              <span className="font-bold text-on-surface">
                #{currentCardNumber}
              </span>
            </div>

            {/* Kanji trung tâm duy nhất - Chuẩn phương pháp Flashcard không lộ nghĩa/âm Hán */}
            <div className="flex flex-col items-center justify-center my-auto py-10">
              <span className="text-8xl sm:text-9xl md:text-[10.5rem] font-black text-primary font-serif tracking-widest drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
                {activeCard.kanji}
              </span>
            </div>

            {/* Bottom prompt button */}
            <div className="w-full flex justify-center pt-2">
              <span className="text-xs font-bold text-primary bg-primary/15 border border-primary/30 px-5 py-2.5 flex items-center gap-2 shadow-2xs font-serif rounded-xs group-hover:bg-primary group-hover:text-white transition-colors">
                <Sparkles size={15} />
                <span>{t('dashboard:flashcardWidget.tapToFlip')}</span>
              </span>
            </div>
          </div>

          {/* Mặt Sau (Back Face) */}
          <div 
            style={{
              gridArea: 'card',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderRadius: '4px',
            }}
            className="w-full min-h-[420px] bg-gradient-to-br from-amber-500/10 via-surface-container-lowest to-surface-container-low border-2 border-amber-500/40 p-5 sm:p-7 md:p-8 flex flex-col justify-between shadow-flat-sm font-serif space-y-5"
          >
            {/* Header bar of back face */}
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl font-black text-primary font-serif">{activeCard.kanji}</span>
                <div>
                  <p className="text-lg sm:text-xl font-black text-amber-700 dark:text-amber-400 flex items-center gap-2 font-mono">
                    <span>{displayKana}</span>
                    {displayRomaji && displayRomaji.trim() !== '' && (
                      <span className="text-xs font-semibold text-outline">[{displayRomaji}]</span>
                    )}
                  </p>
                  {activeCard.hanViet && activeCard.hanViet.trim() !== '' && currentLang === 'vi' && (
                    <p className="text-xs font-semibold text-outline">
                      {t('dashboard:flashcardWidget.sinoVietnamese')} <span className="font-bold text-on-surface">{activeCard.hanViet}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Nút phát âm */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playBoostedJapaneseAudio(playableWord, ttsVolume, e);
                  }}
                  title={t('dashboard:flashcardWidget.volumeTitle', { volume: ttsVolume })}
                  className="p-2 sm:px-3 sm:py-2 bg-amber-500/20 text-amber-800 dark:text-amber-200 hover:bg-amber-500 hover:text-white border border-amber-500/35 transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 font-bold text-xs font-serif rounded-xs"
                >
                  <Volume2 size={16} />
                  <span className="hidden sm:inline">{t('dashboard:flashcardWidget.pronounce')}</span>
                </button>

                {/* Nút lật lại mặt trước */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  title="Lật lại mặt trước của thẻ"
                  className="p-2 sm:px-3 sm:py-2 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/40 text-on-surface text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 rounded-xs"
                >
                  <RotateCw size={14} />
                  <span className="hidden sm:inline">Lật thẻ</span>
                </button>
              </div>
            </div>

            {/* Nội dung 2 cột: Ý nghĩa + Mẹo nhớ & Câu ví dụ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1 items-stretch py-1">
              {/* Cột trái: Ý nghĩa & Mẹo nhớ */}
              <div className="space-y-3 flex flex-col justify-start">
                <div className="p-3.5 bg-surface-container/60 border border-outline-variant/40 rounded-xs">
                  <span className="text-[11px] font-bold text-outline uppercase tracking-wider">{t('dashboard:flashcardWidget.meaningLabel')}</span>
                  <p className="text-lg sm:text-xl font-black text-primary mt-0.5">
                    {cardMeaning}
                  </p>
                </div>

                {mnemonicInfo.mnemonicHint && currentLang === 'vi' && (
                  <div className="p-3.5 bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 shadow-2xs rounded-xs flex-1">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{mnemonicInfo.mnemonicIcon || '💡'}</span>
                    <div className="space-y-0.5">
                      <p className="text-xs font-black text-amber-800 dark:text-amber-300">
                        {mnemonicInfo.mnemonicTitle || t('dashboard:flashcardWidget.mnemonicTitle')}:
                      </p>
                      <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
                        {mnemonicInfo.mnemonicHint}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Cột phải: Câu ví dụ thực tế - 100% thẻ đều có câu ví dụ */}
              <div className="flex flex-col justify-start">
                <div className="p-4 bg-surface-container/70 border border-outline-variant/50 space-y-2.5 shadow-2xs rounded-xs h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-outline-variant/30">
                      <span className="text-[11px] font-bold text-outline">{t('dashboard:flashcardWidget.exampleLabel')}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playBoostedJapaneseAudio(resolvedExampleJp, ttsVolume, e);
                        }}
                        title="Phát âm câu ví dụ"
                        className="p-1 text-primary hover:bg-primary/10 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold rounded-xs"
                      >
                        <Volume2 size={14} />
                        <span>{t('dashboard:flashcardWidget.listenSentence')}</span>
                      </button>
                    </div>
                    <p className="text-base sm:text-lg font-black text-on-surface leading-snug mt-2">
                      {resolvedExampleJp}
                    </p>
                    {resolvedExampleRomaji && (
                      <p className="text-xs text-outline italic font-mono mt-1">({resolvedExampleRomaji})</p>
                    )}
                  </div>
                  {resolvedExampleVi && (
                    <p className="text-xs sm:text-sm font-bold text-primary pt-2 border-t border-outline-variant/30">
                      ➔ {resolvedExampleVi}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 3 Nút Đánh Giá Spaced Repetition (SRS) tích hợp đẹp trong footer của thẻ */}
            <div className="pt-3.5 border-t border-outline-variant/30 space-y-2">
              <div className="text-[11px] font-bold text-outline uppercase tracking-wider text-center">
                {t('dashboard:flashcardWidget.srsRatingTitle', 'Đánh giá ghi nhớ:')}
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
                {/* Nút Khó: +1 ngày */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRateSRS('hard');
                  }}
                  title={t('dashboard:flashcardWidget.srsHardTitle')}
                  className="py-2.5 px-3 bg-rose-500/15 hover:bg-rose-500 text-rose-700 dark:text-rose-300 hover:text-white border border-rose-500/35 hover:border-rose-500 transition-all cursor-pointer shadow-2xs flex flex-col items-center justify-center gap-0.5 rounded-xs"
                >
                  <span className="text-xs sm:text-sm font-black">{t('dashboard:flashcardWidget.srsHard')}</span>
                  <span className="text-[10px] opacity-80 font-medium">
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
                  className="py-2.5 px-3 bg-amber-500/15 hover:bg-amber-500 text-amber-700 dark:text-amber-300 hover:text-white border border-amber-500/35 hover:border-amber-500 transition-all cursor-pointer shadow-2xs flex flex-col items-center justify-center gap-0.5 rounded-xs"
                >
                  <span className="text-xs sm:text-sm font-black">{t('dashboard:flashcardWidget.srsMedium')}</span>
                  <span className="text-[10px] opacity-80 font-medium">
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
                  className="py-2.5 px-3 bg-emerald-500/15 hover:bg-emerald-500 text-emerald-700 dark:text-emerald-300 hover:text-white border border-emerald-500/35 hover:border-emerald-500 transition-all cursor-pointer shadow-2xs flex flex-col items-center justify-center gap-0.5 rounded-xs"
                >
                  <span className="text-xs sm:text-sm font-black">{t('dashboard:flashcardWidget.srsEasy')}</span>
                  <span className="text-[10px] opacity-80 font-medium">
                    {t('dashboard:flashcardWidget.srsEasySub')}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
