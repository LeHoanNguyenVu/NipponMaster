import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../../../api/axiosClient';
import type { ChapterDetailResponse, ChapterKanjiItem, RoadmapChapter } from '../types';

// Client-side cache (stale-while-revalidate)
export const chapterDetailCache = new Map<string, ChapterDetailResponse>();
const chapterPrefetchInflight = new Set<string>();

export const prefetchChapterDetail = (chapterId: number, level: string) => {
  const key = `${level}:${chapterId}`;
  if (!chapterId || chapterDetailCache.has(key) || chapterPrefetchInflight.has(key)) return;
  chapterPrefetchInflight.add(key);
  axiosClient
    .get(`/kanji/${level.toLowerCase()}/chapters/${chapterId}`)
    .then((res) => {
      const data = (res as { data?: ChapterDetailResponse })?.data ?? (res as unknown as ChapterDetailResponse);
      if (data && data.chapter) chapterDetailCache.set(key, data);
    })
    .catch(() => { /* ignore */ })
    .finally(() => chapterPrefetchInflight.delete(key));
};

interface UseKanjiChapterDetailProps {
  selectedChapterId: number;
  selectedLevel: string;
  chapters?: RoadmapChapter[];
  detailRequestIdRef: React.MutableRefObject<number>;
  onResetChapterStates?: () => void;
}

export function useKanjiChapterDetail({
  selectedChapterId,
  selectedLevel,
  chapters = [],
  detailRequestIdRef,
  onResetChapterStates,
}: UseKanjiChapterDetailProps) {
  const [chapterDetail, setChapterDetail] = useState<ChapterDetailResponse | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [activeKanji, setActiveKanji] = useState<ChapterKanjiItem | null>(null);

  const fetchChapterDetail = useCallback(
    async (chapterId: number, level: string = selectedLevel) => {
      if (!chapterId || chapterId <= 0) return;
      const reqId = ++detailRequestIdRef.current;
      const cacheKey = `${level}:${chapterId}`;
      const cached = chapterDetailCache.get(cacheKey);

      try {
        if (cached) {
          setChapterDetail(cached);
          if (cached.kanjis && cached.kanjis.length > 0) setActiveKanji(cached.kanjis[0]);
          setLoadingDetail(false);
        } else {
          setLoadingDetail(true);
        }

        if (onResetChapterStates) {
          onResetChapterStates();
        }

        const res = await axiosClient.get(`/kanji/${level.toLowerCase()}/chapters/${chapterId}`);
        if (reqId !== detailRequestIdRef.current) {
          return;
        }

        const data: ChapterDetailResponse =
          (res as { data?: ChapterDetailResponse })?.data ?? (res as unknown as ChapterDetailResponse);
        if (data && data.chapter) {
          if (data.chapter.jlptLevel && data.chapter.jlptLevel.toUpperCase() !== level.toUpperCase()) {
            console.warn(`[Kanji] Ignored mismatched chapter level: got ${data.chapter.jlptLevel}, expected ${level}`);
            return;
          }
          chapterDetailCache.set(cacheKey, data);
          if (cached) {
            if (JSON.stringify(cached) !== JSON.stringify(data)) setChapterDetail(data);
          } else {
            setChapterDetail(data);
            if (data.kanjis && data.kanjis.length > 0) {
              setActiveKanji(data.kanjis[0]);
            }
          }

          // Prefetch next 2 chapters
          const idx = chapters.findIndex((c) => c.id === chapterId);
          if (idx >= 0) {
            chapters.slice(idx + 1, idx + 3).forEach((c) => prefetchChapterDetail(c.id, level));
          }
        }
      } catch (err) {
        if (reqId === detailRequestIdRef.current) {
          console.error('Failed to load chapter details:', err);
        }
      } finally {
        if (reqId === detailRequestIdRef.current) {
          setLoadingDetail(false);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedLevel, chapters, onResetChapterStates]
  );

  useEffect(() => {
    if (selectedChapterId && selectedChapterId > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchChapterDetail(selectedChapterId, selectedLevel);
    }
  }, [selectedChapterId, selectedLevel, fetchChapterDetail]);

  return {
    chapterDetail,
    setChapterDetail,
    loadingDetail,
    activeKanji,
    setActiveKanji,
    fetchChapterDetail,
  };
}

