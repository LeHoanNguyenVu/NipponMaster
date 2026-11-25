import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReadingSentence } from '../../../api/readingApi';

export type PlaybackSpeed = 0.75 | 1 | 1.25;

interface UseSentenceAudioOptions {
  sentences: ReadingSentence[];
  audioStatus: string;
  onFinishedAll?: () => void;
}

function releaseAudioElement(el: HTMLAudioElement) {
  el.onended = null;
  el.onerror = null;
  try {
    el.pause();
    el.removeAttribute('src');
    el.load();
  } catch {
    // Bỏ qua lỗi giải phóng phần tử audio
  }
}

/**
 * Phát audio tuần tự từng câu từ Supabase WAV (chỉ preload tối đa 2 câu kế tiếp và giải phóng phần tử cũ),
 * dùng playTokenRef đơn điệu chống race condition khi đổi câu nhanh,
 * tự động fallback sang Web Speech API (speechSynthesis, lang='ja-JP') nếu câu thiếu audioUrl hoặc WAV lỗi.
 */
export function useSentenceAudio({ sentences, audioStatus, onFinishedAll }: UseSentenceAudioOptions) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRateState] = useState<PlaybackSpeed>(1);
  const [repeatSentence, setRepeatSentence] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const preloadedRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const playbackRateRef = useRef<PlaybackSpeed>(1);
  const repeatRef = useRef<boolean>(false);
  const isPlayingRef = useRef<boolean>(false);
  const playTokenRef = useRef<number>(0);
  const sentencesRef = useRef<ReadingSentence[]>(sentences);
  const onFinishedRef = useRef(onFinishedAll);

  useEffect(() => {
    playbackRateRef.current = playbackRate;
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    repeatRef.current = repeatSentence;
  }, [repeatSentence]);

  useEffect(() => {
    sentencesRef.current = sentences;
  }, [sentences]);

  useEffect(() => {
    onFinishedRef.current = onFinishedAll;
  }, [onFinishedAll]);

  const hasReadyAudioFor = useCallback((idx: number) => {
    const s = sentencesRef.current[idx];
    return Boolean(s?.audioUrl && s.audioUrl.trim().length > 0);
  }, []);

  const usingFallback =
    audioStatus !== 'READY' || !sentences.some((s) => Boolean(s.audioUrl && s.audioUrl.trim()));

  const releaseAllPreloaded = useCallback(() => {
    preloadedRef.current.forEach((el) => {
      if (el !== audioRef.current) {
        releaseAudioElement(el);
      }
    });
    preloadedRef.current.clear();
  }, []);

  const stopInternal = useCallback(() => {
    playTokenRef.current += 1;
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isPlayingRef.current = false;
    setIsPlaying(false);
  }, []);

  // Preload chỉ 2 câu kế tiếp và giải phóng bộ đệm các câu nằm ngoài cửa sổ [currentIdx .. currentIdx + 2]
  const preloadUpcoming = useCallback((currentIdx: number) => {
    const list = sentencesRef.current;
    const keepUrls = new Set<string>();
    for (let offset = 0; offset <= 2; offset++) {
      const s = list[currentIdx + offset];
      if (s?.audioUrl) keepUrls.add(s.audioUrl);
    }

    preloadedRef.current.forEach((el, url) => {
      if (!keepUrls.has(url) && el !== audioRef.current) {
        releaseAudioElement(el);
        preloadedRef.current.delete(url);
      }
    });

    for (let offset = 1; offset <= 2; offset++) {
      const next = list[currentIdx + offset];
      if (next?.audioUrl && !preloadedRef.current.has(next.audioUrl)) {
        const el = new Audio();
        el.preload = 'auto';
        el.src = next.audioUrl;
        preloadedRef.current.set(next.audioUrl, el);
      }
    }
  }, []);

  const playAtRef = useRef<(idx: number) => void>(() => {});

  const speakWithWebSpeech = useCallback((idx: number, text: string, token: number) => {
    if (playTokenRef.current !== token) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'ja-JP';
    utter.rate = playbackRateRef.current;
    utter.onend = () => {
      if (playTokenRef.current !== token || !isPlayingRef.current) return;
      if (repeatRef.current) {
        playAtRef.current(idx);
      } else if (idx + 1 < sentencesRef.current.length) {
        playAtRef.current(idx + 1);
      } else {
        isPlayingRef.current = false;
        setIsPlaying(false);
        onFinishedRef.current?.();
      }
    };
    utter.onerror = (ev) => {
      if (playTokenRef.current !== token) return;
      if (ev.error === 'canceled' || ev.error === 'interrupted') return;
      isPlayingRef.current = false;
      setIsPlaying(false);
    };
    window.speechSynthesis.speak(utter);
  }, []);

  const playAt = useCallback(
    (idx: number) => {
      const list = sentencesRef.current;
      if (idx < 0 || idx >= list.length) {
        stopInternal();
        return;
      }

      const token = playTokenRef.current + 1;
      playTokenRef.current = token;

      if (audioRef.current) {
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      setActiveIdx(idx);
      isPlayingRef.current = true;
      setIsPlaying(true);

      const sentence = list[idx];
      if (hasReadyAudioFor(idx) && sentence.audioUrl) {
        const audioUrl = sentence.audioUrl;
        preloadUpcoming(idx);
        const cached = preloadedRef.current.get(audioUrl);
        const audio = cached || new Audio(audioUrl);
        audio.currentTime = 0;
        audio.playbackRate = playbackRateRef.current;
        audioRef.current = audio;

        let fellBack = false;
        const triggerFallback = () => {
          if (fellBack || playTokenRef.current !== token || !isPlayingRef.current) return;
          fellBack = true;
          preloadedRef.current.delete(audioUrl);
          if (audioRef.current === audio) {
            audioRef.current = null;
          }
          speakWithWebSpeech(idx, sentence.text, token);
        };

        audio.onended = () => {
          if (playTokenRef.current !== token || !isPlayingRef.current) return;
          if (repeatRef.current) {
            playAtRef.current(idx);
          } else if (idx + 1 < sentencesRef.current.length) {
            playAtRef.current(idx + 1);
          } else {
            isPlayingRef.current = false;
            setIsPlaying(false);
            onFinishedRef.current?.();
          }
        };
        audio.onerror = triggerFallback;
        audio.play().catch(triggerFallback);
      } else {
        speakWithWebSpeech(idx, sentence.text, token);
      }
    },
    [hasReadyAudioFor, preloadUpcoming, speakWithWebSpeech, stopInternal]
  );

  useEffect(() => {
    playAtRef.current = playAt;
  }, [playAt]);

  // Reset & release all preloaded audio elements when switching articles/versions or unmounting
  useEffect(() => {
    stopInternal();
    releaseAllPreloaded();
    setActiveIdx(0);
    return () => {
      stopInternal();
      releaseAllPreloaded();
    };
  }, [sentences, stopInternal, releaseAllPreloaded]);

  const togglePlay = useCallback(() => {
    if (isPlayingRef.current) {
      stopInternal();
    } else {
      playAt(activeIdx);
    }
  }, [activeIdx, playAt, stopInternal]);

  const prev = useCallback(() => {
    const target = Math.max(0, activeIdx - 1);
    if (isPlayingRef.current) {
      playAt(target);
    } else {
      setActiveIdx(target);
    }
  }, [activeIdx, playAt]);

  const next = useCallback(() => {
    const target = Math.min(sentencesRef.current.length - 1, activeIdx + 1);
    if (isPlayingRef.current) {
      playAt(target);
    } else {
      setActiveIdx(target);
    }
  }, [activeIdx, playAt]);

  const setPlaybackRate = useCallback((rate: PlaybackSpeed) => {
    setPlaybackRateState(rate);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeatSentence((r) => !r);
  }, []);

  return {
    activeIdx,
    isPlaying,
    playbackRate,
    repeatSentence,
    usingFallback,
    playSentence: playAt,
    togglePlay,
    pause: stopInternal,
    prev,
    next,
    setPlaybackRate,
    toggleRepeat,
  };
}
