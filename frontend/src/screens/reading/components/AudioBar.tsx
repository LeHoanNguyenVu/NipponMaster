import { Pause, Play, RotateCcw, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { PlaybackSpeed } from '../hooks/useSentenceAudio';

interface AudioBarProps {
  activeIdx: number;
  totalSentences: number;
  isPlaying: boolean;
  playbackRate: PlaybackSpeed;
  repeatSentence: boolean;
  voiceName: string;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onRateChange: (rate: PlaybackSpeed) => void;
  onToggleRepeat: () => void;
}

const RATES: PlaybackSpeed[] = [0.75, 1, 1.25];

export default function AudioBar({
  activeIdx,
  totalSentences,
  isPlaying,
  playbackRate,
  repeatSentence,
  voiceName,
  onTogglePlay,
  onPrev,
  onNext,
  onRateChange,
  onToggleRepeat,
}: AudioBarProps) {
  const { t } = useTranslation('reading');

  const voiceLabel =
    voiceName === 'Puck' ? t('card.voiceMale') : t('card.voiceFemale');

  return (
    <div
      className="bg-surface-container-low/90 border border-outline-variant/60 px-3.5 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 font-sans"
      style={{ borderRadius: '2px' }}
      role="region"
      aria-label="Audio Player"
    >
      {/* Left: Transport Controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onPrev}
          disabled={activeIdx <= 0}
          aria-label={t('audio.prev')}
          className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container disabled:opacity-35 transition-colors cursor-pointer disabled:cursor-not-allowed"
          style={{ borderRadius: '2px' }}
        >
          <SkipBack size={16} />
        </button>

        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? t('audio.pause') : t('audio.play')}
          className="w-9 h-9 bg-primary text-on-primary hover:opacity-95 flex items-center justify-center shadow-xs transition-opacity cursor-pointer"
          style={{ borderRadius: '2px' }}
        >
          {isPlaying ? <Pause size={17} /> : <Play size={17} className="ml-0.5" />}
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={activeIdx >= totalSentences - 1}
          aria-label={t('audio.next')}
          className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container disabled:opacity-35 transition-colors cursor-pointer disabled:cursor-not-allowed"
          style={{ borderRadius: '2px' }}
        >
          <SkipForward size={16} />
        </button>

        <button
          type="button"
          onClick={onToggleRepeat}
          aria-label={t('audio.repeat')}
          aria-pressed={repeatSentence}
          className={`p-1.5 transition-colors cursor-pointer ${
            repeatSentence
              ? 'bg-primary/15 text-primary border border-primary/40'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
          }`}
          style={{ borderRadius: '2px' }}
        >
          <RotateCcw size={15} />
        </button>
      </div>

      {/* Center: Sentence Progress & Voice Info */}
      <div className="flex items-center gap-2 text-xs text-on-surface-variant flex-wrap">
        <span className="font-semibold text-on-surface">
          {t('audio.sentenceProgress', {
            current: Math.min(activeIdx + 1, Math.max(1, totalSentences)),
            total: Math.max(1, totalSentences),
          })}
        </span>
        <span className="text-outline">·</span>
        <span className="inline-flex items-center gap-1">
          <Volume2 size={13} className="text-primary" />
          {voiceLabel}
        </span>
      </div>

      {/* Right: Playback Rate */}
      <div className="flex items-center gap-1" role="group" aria-label={t('audio.speed')}>
        {RATES.map((rate) => {
          const active = playbackRate === rate;
          return (
            <button
              key={rate}
              type="button"
              onClick={() => onRateChange(rate)}
              className={`px-2 py-1 text-xs font-mono transition-colors cursor-pointer ${
                active
                  ? 'bg-primary text-on-primary font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
              style={{ borderRadius: '2px' }}
            >
              {rate}×
            </button>
          );
        })}
      </div>
    </div>
  );
}
