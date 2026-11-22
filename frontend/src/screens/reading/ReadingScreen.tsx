import { useState } from 'react';
import type { ScreenType } from '../../App';
import { useAuthStore } from '../../store/useAuthStore';
import ArticleList from './components/ArticleList';
import ArticleReader from './components/ArticleReader';

interface ReadingScreenProps {
  onNavigate?: (screen: ScreenType) => void;
}

export default function ReadingScreen({ onNavigate: _onNavigate }: ReadingScreenProps) {
  const { user } = useAuthStore();
  const [selectedVersionId, setSelectedVersionId] = useState<number | null>(null);

  const userLevel = (user?.jlptLevel || localStorage.getItem('nippon_user_level') || 'N5').toUpperCase();

  if (selectedVersionId !== null) {
    return (
      <ArticleReader
        versionId={selectedVersionId}
        userLevel={userLevel}
        onBack={() => setSelectedVersionId(null)}
        onSwitchVersion={(nextId) => setSelectedVersionId(nextId)}
      />
    );
  }

  return (
    <ArticleList
      defaultLevel={userLevel}
      onSelectVersion={(versionId) => setSelectedVersionId(versionId)}
    />
  );
}
