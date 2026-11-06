import { useState, useRef, useEffect, useCallback } from 'react';
import { grammarApi } from '../../../api/grammarApi';
import type { ResumePromptData, JlptLevel, GrammarLessonDetailDto } from '../types';

export const formatTime = (sec: number): string => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) {
    return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
};

interface UseGrammarWatchProgressProps {
  selectedLessonId: number;
  selectedLevel: JlptLevel;
  detailCacheRef: React.MutableRefObject<Map<number, GrammarLessonDetailDto>>;
}

export function useGrammarWatchProgress({
  selectedLessonId,
  selectedLevel,
  detailCacheRef,
}: UseGrammarWatchProgressProps) {
  const [resumePrompt, setResumePrompt] = useState<ResumePromptData | null>(null);
  const [activeTimestamp, setActiveTimestamp] = useState<number | null>(null);

  // Ghi nhận bài học đã được xử lý/hiển thị pop-up hỏi tiếp tục (chỉ hiện 1 lần duy nhất, tránh API đè lại)
  const promptedLessonRef = useRef<number | null>(null);
  const lastSyncTimeRef = useRef<number>(0);
  const currentWatchSecRef = useRef<number>(0);

  // Lưu tiến độ xem vào LocalStorage & đồng bộ lên Cloud Database
  const saveWatchProgress = useCallback(
    (lessonId: number, sec: number, forceSync = false) => {
      if (sec < 5) return;
      const timeStr = formatTime(sec);
      currentWatchSecRef.current = sec;

      try {
        // 1. Lưu tiến độ riêng của từng bài học
        localStorage.setItem(
          `grammar_last_watch_${lessonId}`,
          JSON.stringify({ timeSec: sec, timeStr, updatedAt: Date.now() })
        );
        // 2. Lưu bài học gần nhất toàn hệ thống mà người dùng đang xem
        localStorage.setItem(
          'grammar_last_active_lesson',
          JSON.stringify({
            lessonId,
            levelCode: selectedLevel,
            timeSec: sec,
            timeStr,
            updatedAt: Date.now(),
          })
        );
      } catch {
        // ignore
      }

      // 3. Cập nhật ngay vào cache bộ nhớ để đồng bộ tức thì 0ms
      if (detailCacheRef.current.has(lessonId)) {
        const cached = detailCacheRef.current.get(lessonId);
        if (cached) {
          cached.lastWatchSec = sec;
          cached.lastWatchTimeStr = timeStr;
        }
      }

      // 4. Đồng bộ lên Cloud Database (bỏ qua throttle 8s nếu forceSync = true)
      const now = Date.now();
      if (forceSync || now - lastSyncTimeRef.current > 8000) {
        lastSyncTimeRef.current = now;
        grammarApi.saveWatchProgress(lessonId, sec, timeStr).catch(() => { });
      }
    },
    [selectedLevel, detailCacheRef]
  );

  // Lắng nghe YouTube Iframe postMessage để tự động theo dõi tiến độ thời gian xem
  useEffect(() => {
    const iframe = document.getElementById('yt-lesson-player') as HTMLIFrameElement;
    if (!iframe) return;

    const interval = setInterval(() => {
      try {
        iframe.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 'yt-lesson-player' }), '*');
        iframe.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'getCurrentTime', args: [] }), '*');
      } catch {
        // ignore
      }
    }, 4000);

    const handleMessage = (event: MessageEvent) => {
      try {
        if (typeof event.data === 'string') {
          const data = JSON.parse(event.data);
          if (data.event === 'infoDelivery' && data.info?.currentTime) {
            const currSec = Math.floor(data.info.currentTime);
            if (currSec >= 15 && selectedLessonId) {
              saveWatchProgress(selectedLessonId, currSec);
            }
          }
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      clearInterval(interval);
      window.removeEventListener('message', handleMessage);
    };
  }, [selectedLessonId, saveWatchProgress]);

  // Tự động flush tiến độ xem lần cuối khi unmount trang hoặc chuyển bài
  useEffect(() => {
    return () => {
      const lastSec = currentWatchSecRef.current;
      if (selectedLessonId && lastSec >= 15) {
        grammarApi.saveWatchProgress(selectedLessonId, lastSec, formatTime(lastSec)).catch(() => { });
      }
    };
  }, [selectedLessonId]);

  // Tua video theo timestamp & lưu tiến độ (Tối ưu phản hồi <10ms qua postMessage, không reload iframe)
  const handleJumpToTimestamp = useCallback(
    (sec: number, videoId?: string) => {
      setActiveTimestamp(sec);
      if (selectedLessonId) {
        saveWatchProgress(selectedLessonId, sec, true);
      }
      const iframe = document.getElementById('yt-lesson-player') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: 'command',
              func: 'seekTo',
              args: [sec, true],
            }),
            '*'
          );
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: 'command',
              func: 'playVideo',
              args: [],
            }),
            '*'
          );
          return;
        } catch (e) {
          console.warn('postMessage tua video thất bại, fallback reload:', e);
        }
      }
      if (iframe && videoId) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?start=${sec}&autoplay=1&enablejsapi=1`;
      }
    },
    [selectedLessonId, saveWatchProgress]
  );

  // Tiếp tục xem từ đoạn đã lưu (Phản hồi tức thì 0ms, đóng pop-up ngay)
  const handleResumeWatching = useCallback(
    (sec: number, videoId?: string) => {
      if (selectedLessonId) {
        promptedLessonRef.current = selectedLessonId;
      }
      setResumePrompt(null);
      handleJumpToTimestamp(sec, videoId);
    },
    [selectedLessonId, handleJumpToTimestamp]
  );

  // Xem lại từ đầu (Phản hồi tức thì 0ms, đóng pop-up ngay)
  const handleRestartFromBeginning = useCallback(
    (videoId?: string) => {
      if (selectedLessonId) {
        promptedLessonRef.current = selectedLessonId;
        localStorage.removeItem(`grammar_last_watch_${selectedLessonId}`);
        if (detailCacheRef.current.has(selectedLessonId)) {
          const cached = detailCacheRef.current.get(selectedLessonId);
          if (cached) {
            cached.lastWatchSec = 0;
            cached.lastWatchTimeStr = '0:00';
          }
        }
        grammarApi.saveWatchProgress(selectedLessonId, 0, '0:00').catch(() => { });
      }
      setResumePrompt(null);
      handleJumpToTimestamp(0, videoId);
    },
    [selectedLessonId, detailCacheRef, handleJumpToTimestamp]
  );

  const handleCloseResumePrompt = useCallback(() => {
    if (selectedLessonId) {
      promptedLessonRef.current = selectedLessonId;
    }
    setResumePrompt(null);
  }, [selectedLessonId]);

  return {
    resumePrompt,
    setResumePrompt,
    promptedLessonRef,
    activeTimestamp,
    setActiveTimestamp,
    saveWatchProgress,
    handleJumpToTimestamp,
    handleResumeWatching,
    handleRestartFromBeginning,
    handleCloseResumePrompt,
  };
}

