import { useEffect, useState } from 'react';
import type { ScreenType } from '../../App';
import { useAuthStore } from '../../store/useAuthStore';
import ArticleList from './components/ArticleList';
import ArticleReader from './components/ArticleReader';

interface ReadingScreenProps {
  onNavigate?: (screen: ScreenType) => void;
}

const OPEN_VERSION_STORAGE_KEY = 'nippon_reading_open_version';

function parseReadingVersionFromHash(hash: string): number | null {
  const m = /^#\/reading\/(\d+)$/i.exec(hash.trim());
  if (!m) return null;
  const parsed = Number(m[1]);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export default function ReadingScreen({ onNavigate }: ReadingScreenProps) {
  const { user } = useAuthStore();
  const [selectedVersionId, setSelectedVersionId] = useState<number | null>(() => {
    const fromHash = parseReadingVersionFromHash(window.location.hash);
    if (fromHash !== null) return fromHash;
    try {
      const raw = sessionStorage.getItem(OPEN_VERSION_STORAGE_KEY);
      if (raw) {
        const parsed = Number(raw);
        if (Number.isInteger(parsed) && parsed > 0) return parsed;
      }
    } catch {}
    return null;
  });

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(OPEN_VERSION_STORAGE_KEY);
      if (raw) {
        sessionStorage.removeItem(OPEN_VERSION_STORAGE_KEY);
        const parsed = Number(raw);
        if (Number.isInteger(parsed) && parsed > 0 && window.location.hash !== `#/reading/${parsed}`) {
          window.history.replaceState(null, '', `#/reading/${parsed}`);
        }
      }
    } catch {}
  }, []);

  // Đồng bộ nút Back/Forward của chuột & trình duyệt giữa trang danh sách (#/reading) và bài đọc chi tiết (#/reading/:id)
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.trim();
      if (hash.toLowerCase().startsWith('#/reading')) {
        setSelectedVersionId(parseReadingVersionFromHash(hash));
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const openVersion = (versionId: number) => {
    setSelectedVersionId(versionId);
    const targetHash = `#/reading/${versionId}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  };

  const backToList = () => {
    setSelectedVersionId(null);
    if (window.location.hash !== '#/reading') {
      window.location.hash = '#/reading';
    }
  };

  const userLevel = (user?.jlptLevel || localStorage.getItem('nippon_user_level') || 'N5').toUpperCase();

  if (selectedVersionId !== null) {
    return (
      <ArticleReader
        key={selectedVersionId}
        versionId={selectedVersionId}
        userLevel={userLevel}
        onBack={backToList}
        onSwitchVersion={openVersion}
        onNavigateToTranslation={() => onNavigate?.('translation')}
      />
    );
  }

  return (
    <ArticleList
      defaultLevel={userLevel}
      onSelectVersion={openVersion}
    />
  );
}
