import { useState, useRef, useCallback } from 'react';
import axiosClient from '../../../api/axiosClient';
import { useAuthStore } from '../../../store/useAuthStore';
import { JLPT_RANK, type RoadmapResponse } from '../types';

export function useKanjiRoadmap() {
  const { user } = useAuthStore();

  const userLevel = (user?.jlptLevel || localStorage.getItem('nippon_user_level') || 'N4').toUpperCase();
  const userRank = user?.role === 'ADMIN' ? 5 : (JLPT_RANK[userLevel] || 2);

  // Danh sách cấp độ học viên được phép xem & truy cập (chỉ hiển thị và cho phép truy cập các level <= level tài khoản)
  const availableLevels: readonly string[] = (['N5', 'N4', 'N3', 'N2', 'N1'] as const).filter(
    (lvl) => JLPT_RANK[lvl] <= userRank
  );

  // Cấp độ đang học: Mặc định theo level tài khoản, và bị khóa nếu vượt quá quyền truy cập
  const [selectedLevel, setSelectedLevel] = useState<string>(() => {
    const target = ['N5', 'N4', 'N3', 'N2', 'N1'].includes(userLevel) ? userLevel : 'N4';
    return availableLevels.includes(target) ? target : (availableLevels[availableLevels.length - 1] || 'N4');
  });

  const [selectedChapterId, setSelectedChapterId] = useState<number>(0);
  const detailRequestIdRef = useRef<number>(0);

  // Tự động kiểm soát quyền truy cập khi quyền hạn thay đổi (điều chỉnh state ngay trong render)
  const [prevAvailable, setPrevAvailable] = useState(availableLevels);
  if (prevAvailable !== availableLevels) {
    setPrevAvailable(availableLevels);
    if (!availableLevels.includes(selectedLevel)) {
      setSelectedLevel(availableLevels[availableLevels.length - 1] || 'N4');
      setSelectedChapterId(0);
    }
  }

  const currentLevelRank = JLPT_RANK[selectedLevel?.toUpperCase() || ''] || 0;
  const isLowerLevel = userRank > currentLevelRank;

  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState<boolean>(true);

  // 1. Tải lộ trình các chương từ Database theo Level được chọn
  const fetchRoadmap = useCallback(async (level: string = selectedLevel) => {
    try {
      setLoadingRoadmap(true);
      const res = await axiosClient.get(`/kanji/${level.toLowerCase()}/roadmap`);
      const data: RoadmapResponse = (res as { data?: RoadmapResponse })?.data ?? (res as unknown as RoadmapResponse);
      if (data && data.chapters) {
        setRoadmap(data);
        if (data.chapters.length > 0) {
          // Giữ nguyên chương người dùng đang xem nếu thuộc level này, hoặc chọn chương đầu tiên
          setSelectedChapterId((prev) => {
            if (prev && data.chapters.some((c) => c.id === prev)) {
              return prev;
            }
            const currentUnlocked = data.chapters.find((c) => (c.isUnlocked || isLowerLevel) && !c.isPassed) || data.chapters[0];
            return currentUnlocked.id;
          });
        }
      }
    } catch (err) {
      console.error('Failed to load Kanji roadmap:', err);
    } finally {
      setLoadingRoadmap(false);
    }
  }, [selectedLevel, isLowerLevel]);

  return {
    availableLevels,
    selectedLevel,
    setSelectedLevel,
    selectedChapterId,
    setSelectedChapterId,
    detailRequestIdRef,
    isLowerLevel,
    roadmap,
    loadingRoadmap,
    fetchRoadmap,
  };
}
