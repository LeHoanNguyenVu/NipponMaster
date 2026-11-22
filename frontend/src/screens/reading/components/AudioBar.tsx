import { Play, Pause, SkipBack, SkipForward, Repeat, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { PlaybackSpeed } from '../hooks/useSentenceAudio';

interface AudioBarProps {
  activeIdx: number;
  totalSentences: number;
  isPlaying: boolean;
  playbackRate: PlaybackSpeed;
  repeatSentence: boolean;
  usingFallback: boolean;
  voiceName: string;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onRateChange: (rate: PlaybackSpeed) => void;
  onToggleRepeat: () => void;
}

const SPEEDS: PlaybackSpeed[] = [0.75, 1, 1.25];

export default function AudioBar({
  activeIdx,
  totalSentences,
  isPlaying,
  playbackRate,
  repeatSentence,
  usingFallback,
  voiceName,
  onTogglePlay,
  onPrev,
  onNext,
  onRateChange,
  onToggleRepeat,
}: AudioBarProps) {
  const { t } = useTranslation('reading');

  return (
    <div
      className="sticky bottom-3 z-30 mx-auto max-w-3xl bg-surface-container-lowest/95 backdrop-blur-xs border border-outline-variant/70 shadow-lg px-4 py-3 flex flex-wrap items-center justify-between gap-3 font-serif"
      style={{ borderRadius: '2px' }}
    >
      {/* Left: Transport Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={activeIdx <= 0}
          aria-label={t('audio.prev')}
          className="p-2 border border-outline-variant/60 text-on-surface-variant hover:bg-surface-container hover:text-on-surface disabled:opacity-40 cursor-pointer transition-colors"
          style={{ borderRadius: '2px' }}
        >
          <SkipBack size={16} />
        </button>

        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? t('audio.pause') : t('audio.play')}
          className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary hover:bg-primary-container cursor-pointer transition-colors shadow-xs"
          style={{ borderRadius: '2px' }}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={activeIdx >= totalSentences - 1}
          aria-label={t('audio.next')}
          className="p-2 border border-outline-variant/60 text-on-surface-variant hover:bg-surface-container hover:text-on-surface disabled:opacity-40 cursor-pointer transition-colors"
          style={{ borderRadius: '2px' }}
        >
          <SkipForward size={16} />
        </button>

        <button
          type="button"
          onClick={onToggleRepeat}
          aria-label={t('audio.repeat')}
          aria-pressed={repeatSentence}
          className={`p-2 border cursor-pointer transition-colors ${
            repeatSentence
              ? 'bg-primary/10 border-primary text-primary'
              : 'border-outline-variant/60 text-on-surface-variant hover:bg-surface-container'
          }`}
          style={{ borderRadius: '2px' }}
        >
          <Repeat size={15} />
        </button>
      </div>

      {/* Center: Sentence Counter & Voice / Fallback Indicator */}
      <div className="flex items-center gap-2.5 text-xs text-on-surface-variant">
        <span className="font-semibold text-on-surface">
          {t('audio.sentenceProgress', {
            current: Math.min(activeIdx + 1, Math.max(1, totalSentences)),
            total: Math.max(1, totalSentences),
          })}
        </span>
        <span className="text-outline">·</span>
        <span className="inline-flex items-center gap-1 text-[11px]">
          <Volume2 size={13} className="text-primary" />
          {voiceName === 'Puck' ? t('card.voiceMale') : t('card.voiceFemale')}
        </span>
        {usingFallback && (
          <span
            className="px-2 py-0.5 text-[11px] bg-tertiary-container/40 text-tertiary border border-tertiary/30 font-medium"
            style={{ borderRadius: '2px' }}
          >
            {t('audio.fallbackBadge')}
          </span>
        )}
      </div>

      {/* Right: Playback Speed */}
      <div className="flex items-center gap-1" role="group" aria-label={t('audio.speed')}>
        {SPEEDS.map((spd) => (
          <button
            key={spd}
            type="button"
            onClick={() => onRateChange(spd)}
            aria-label={`${t('audio.speed')} ${spd}x`}
            className={`px-2 py-1 text-xs border cursor-pointer transition-colors ${
              playbackRate === spd
                ? 'bg-primary text-on-primary border-primary font-bold'
                : 'bg-surface-bright text-on-surface-variant border-outline-variant/60 hover:bg-surface-container'
            }`}
            style={{ borderRadius: '2px' }}
          >
            {spd}×
          </button>
        ))}
      </div>
    </div>
  );
}
