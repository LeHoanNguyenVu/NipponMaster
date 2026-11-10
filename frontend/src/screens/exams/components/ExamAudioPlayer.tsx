import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import type { JLPTDialogueLine } from '../types';

interface ExamAudioPlayerProps {
  audioUrl?: string;
  dialogue?: JLPTDialogueLine[];
  promptJp?: string;
  questionNumber: number;
}

export const ExamAudioPlayer: React.FC<ExamAudioPlayerProps> = ({
  audioUrl,
  dialogue,
  promptJp,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // Estimate duration for TTS if no actual audio file is loaded (approx 4.5 Japanese characters/sec)
  const estimatedTtsDuration = useMemo(() => {
    const totalChars =
      dialogue && dialogue.length > 0
        ? dialogue.reduce((sum, line) => sum + line.jp.length, 0)
        : (promptJp || '').length;
    return Math.max(8, Math.round(totalChars / 4.5));
  }, [dialogue, promptJp]);

  const duration = audioUrl ? audioDuration : estimatedTtsDuration;

  // Cleanup on unmount
  useEffect(() => {
    const audioElement = audioRef.current;
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      if (audioElement) {
        audioElement.pause();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatTime = (secs: number) => {
    const safeSecs = Math.max(0, Math.floor(secs));
    const m = Math.floor(safeSecs / 60);
    const s = safeSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Play dialogue using Web Speech Synthesis
  const playSpeechSynthesis = (startSec: number = 0) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const lines =
      dialogue && dialogue.length > 0
        ? dialogue
        : [{ speaker: 'N' as const, speakerLabel: '音声', jp: promptJp || '' }];

    // If starting mid-way, estimate which line to start from
    let accSec = 0;
    const remainingLines: JLPTDialogueLine[] = [];
    for (const line of lines) {
      const lineSec = Math.max(2, line.jp.length / 4.5);
      if (accSec + lineSec >= startSec) {
        remainingLines.push(line);
      }
      accSec += lineSec;
    }
    const linesToSpeak = remainingLines.length > 0 ? remainingLines : lines;

    linesToSpeak.forEach((line, idx) => {
      const utterance = new SpeechSynthesisUtterance(line.jp);
      utterance.lang = 'ja-JP';
      utterance.rate = 1.0;
      utterance.volume = isMuted ? 0 : volume;
      if (line.speaker === 'M') {
        utterance.pitch = 0.85;
      } else if (line.speaker === 'F') {
        utterance.pitch = 1.2;
      } else {
        utterance.pitch = 1.0;
      }

      if (idx === linesToSpeak.length - 1) {
        utterance.onend = () => {
          setIsPlaying(false);
          setCurrentTime(0);
          if (timerRef.current) window.clearInterval(timerRef.current);
        };
        utterance.onerror = () => {
          setIsPlaying(false);
          if (timerRef.current) window.clearInterval(timerRef.current);
        };
      }

      window.speechSynthesis.speak(utterance);
    });

    // Simulated progress timer
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 0.2;
        if (next >= estimatedTtsDuration) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          setIsPlaying(false);
          return 0;
        }
        return next;
      });
    }, 200);
  };

  const handleTogglePlay = () => {
    if (audioUrl) {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      if (isPlaying) {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        if (timerRef.current) window.clearInterval(timerRef.current);
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        playSpeechSynthesis(currentTime);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextTime = parseFloat(e.target.value);
    setCurrentTime(nextTime);

    if (audioUrl && audioRef.current) {
      audioRef.current.currentTime = nextTime;
    } else if (isPlaying) {
      playSpeechSynthesis(nextTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVol = parseFloat(e.target.value);
    setVolume(nextVol);
    setIsMuted(nextVol === 0);

    if (audioRef.current) {
      audioRef.current.volume = nextVol;
      audioRef.current.muted = nextVol === 0;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  // Percentages for styled track backgrounds
  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
  const currentVol = isMuted ? 0 : volume;
  const volumePercent = Math.min(100, Math.max(0, currentVol * 100));

  return (
    <div className="w-full rounded-md border border-outline-variant/30 bg-surface-container-lowest/80 px-3 py-2 transition-all">
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setAudioDuration(audioRef.current.duration || estimatedTtsDuration);
            }
          }}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {/* Audio Player Bar - Exact visual match with Study4 / audio player standard */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 w-full">
        {/* 1. Play / Pause Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className="p-1 rounded text-slate-700 dark:text-slate-200 hover:text-primary transition-colors cursor-pointer shrink-0 focus:outline-none"
          title={isPlaying ? 'Tạm dừng nghe' : 'Phát âm thanh bài thi'}
        >
          {isPlaying ? (
            <Pause size={15} fill="currentColor" />
          ) : (
            <Play size={15} fill="currentColor" />
          )}
        </button>

        {/* 2. Main Timeline Seek Slider */}
        <div className="relative flex-1 flex items-center min-w-0">
          <input
            type="range"
            min={0}
            max={duration || 10}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            style={{
              background: `linear-gradient(to right, #cbd5e1 ${progressPercent}%, #e2e8f0 ${progressPercent}%)`,
            }}
            className="w-full h-1 rounded-full appearance-none cursor-pointer focus:outline-none accent-slate-500
              [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
              [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border 
              [&::-webkit-slider-thumb]:border-slate-300 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-xs"
          />
        </div>

        {/* 3. Time Duration Label (00:00) */}
        <span className="text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0 select-none tabular-nums">
          {formatTime(currentTime)}
        </span>

        {/* 4. Speaker / Volume Icon */}
        <button
          type="button"
          onClick={toggleMute}
          className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors cursor-pointer shrink-0 focus:outline-none"
          title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
        >
          {isMuted || currentVol === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        {/* 5. Volume Slider (Blue Track with White Knob as in screenshot) */}
        <div className="relative w-14 sm:w-20 shrink-0 flex items-center">
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={currentVol}
            onChange={handleVolumeChange}
            style={{
              background: `linear-gradient(to right, #0284c7 ${volumePercent}%, #e0f2fe ${volumePercent}%)`,
            }}
            className="w-full h-1 rounded-full appearance-none cursor-pointer focus:outline-none accent-sky-600
              [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
              [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border 
              [&::-webkit-slider-thumb]:border-sky-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-xs"
          />
        </div>
      </div>
    </div>
  );
};

