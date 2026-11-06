import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { resolveKanjiAssetUrl } from '../../utils/mediaUrl';
import KanjiCanvasStudio from '../KanjiCanvasStudio';
import SakuraCelebrationModal from '../../components/kanji/SakuraCelebrationModal';

import { useKanjiRoadmap } from './hooks/useKanjiRoadmap';
import { useKanjiSpeech } from './hooks/useKanjiSpeech';
import { useKanjiIllustrationModal } from './hooks/useKanjiIllustrationModal';
import { useKanjiChapterDetail } from './hooks/useKanjiChapterDetail';
import { useKanjiExercises } from './hooks/useKanjiExercises';

import { LoadingBar } from './components/LoadingBar';
import { KanjiLevelBar } from './components/KanjiLevelBar';
import { KanjiChapterSidebar } from './components/KanjiChapterSidebar';
import { ChapterHeaderBanner } from './components/ChapterHeaderBanner';
import { KanjiDetailTab } from './components/KanjiDetailTab';
import { KanjiContextTab } from './components/KanjiContextTab';
import { KanjiMinigameTab } from './components/KanjiMinigameTab';
import { KanjiTestTab } from './components/KanjiTestTab';
import { KanjiIllustrationModal } from './modals/KanjiIllustrationModal';

import {
  REVIEW_PAGES_CONFIG,
  N4_REVIEW_PAGES_CONFIG,
  N3_REVIEW_PAGES_CONFIG,
  N2_REVIEW_PAGES_CONFIG,
  N1_REVIEW_PAGES_CONFIG,
} from './reviewConfigs';

export default function KanjiScreen() {
  const { user } = useAuthStore();
  const userLevel = (user?.jlptLevel || localStorage.getItem('nippon_user_level') || 'N4').toUpperCase();

  // Mode: 'master' | 'canvas' | 'dictionary'
  const [viewMode, setViewMode] = useState<'master' | 'canvas' | 'dictionary'>('master');
  const [activeTab, setActiveTab] = useState<'kanjis' | 'context' | 'minigame' | 'test'>('kanjis');
  const [canvasInitialKanji, setCanvasInitialKanji] = useState<string>('一');

  // Roadmap & Levels hook
  const {
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
  } = useKanjiRoadmap();

  // Speech TTS hook
  const { playingAudioId, speakJapanese, handlePlayDialogueAudio } = useKanjiSpeech({
    selectedChapterId,
    selectedLevel,
    activeTab,
    viewMode,
  });

  // Illustration modal hook
  const {
    showIllustrationModal,
    modalImageUrl,
    modalImageTitle,
    modalZoom,
    modalPan,
    modalDragging,
    handleOpenModal,
    handleCloseModal,
    handleModalWheel,
    handleImageMouseDown,
    handleImageMouseMove,
    handleImageMouseUp,
    handleImageContextMenu,
    zoomIn,
    zoomOut,
    resetZoom,
  } = useKanjiIllustrationModal();

  // Minigame states
  const [minigameInputs, setMinigameInputs] = useState<Record<string, string>>({});
  const [activeBlankKey, setActiveBlankKey] = useState<string | null>(null);
  const [checkedGames, setCheckedGames] = useState<Record<number, boolean>>({});
  const [showSolutions, setShowSolutions] = useState<Record<number, boolean>>({});
  const [shuffleSeeds, setShuffleSeeds] = useState<Record<number, number>>({});

  const handleResetMinigames = useCallback(() => {
    setMinigameInputs({});
    setActiveBlankKey(null);
    setCheckedGames({});
    setShowSolutions({});
    setShuffleSeeds({});
  }, []);

  // Chapter detail hook
  const {
    chapterDetail,
    setChapterDetail,
    loadingDetail,
    activeKanji,
    setActiveKanji,
  } = useKanjiChapterDetail({
    selectedChapterId,
    selectedLevel,
    chapters: roadmap?.chapters,
    detailRequestIdRef,
    onResetChapterStates: handleResetMinigames,
  });

  // Exercises & Test hook
  const {
    readingAnswers,
    setReadingAnswers,
    writingAnswers,
    setWritingAnswers,
    testAnswers,
    setTestAnswers,
    submittingTest,
    submitResult,
    showResultCard,
    setShowResultCard,
    showSakuraCelebration,
    setShowSakuraCelebration,
    testHistory,
    showHistoryDropdown,
    setShowHistoryDropdown,
    handleSubmitReviewTest,
    handleReviewPastAttempt,
  } = useKanjiExercises({
    selectedChapterId,
    selectedLevel,
    chapterDetail,
    onRefreshRoadmap: fetchRoadmap,
  });

  // Level change handler
  useEffect(() => {
    detailRequestIdRef.current++;
    setSelectedChapterId(0);
    setChapterDetail(null);
    fetchRoadmap(selectedLevel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLevel]);

  // Practice character in canvas studio
  const handlePracticeInStudio = (char: string) => {
    setCanvasInitialKanji(char);
    setViewMode('canvas');
  };

  // Open review page textbook illustration
  const handleOpenReviewPage = () => {
    const chNum = chapterDetail?.chapter.chapterNumber || 1;
    if (selectedLevel === 'N1') {
      const revConfig = N1_REVIEW_PAGES_CONFIG[chNum] || { page: 17, file: `chap${chNum}_review.webp` };
      handleOpenModal(
        resolveKanjiAssetUrl(`/assets/kanji/n1/reviews/${revConfig.file}`),
        `Chương ${chNum} N1: Trang ôn tập 復習 trong giáo trình 漢字マスターN1 (Trang ${revConfig.page})`
      );
    } else if (selectedLevel === 'N2') {
      const revConfig = N2_REVIEW_PAGES_CONFIG[chNum] || { page: 15, file: `chap${chNum}_review.webp` };
      handleOpenModal(
        resolveKanjiAssetUrl(`/assets/kanji/n2/reviews/${revConfig.file}`),
        `Chương ${chNum} N2: Trang ôn tập ngữ cảnh & Viết chữ trong giáo trình (Trang ${revConfig.page})`
      );
    } else if (selectedLevel === 'N3') {
      const revConfig = N3_REVIEW_PAGES_CONFIG[chNum] || { page: 12, file: `chap${chNum}_review.webp` };
      handleOpenModal(
        resolveKanjiAssetUrl(`/assets/kanji/n3/reviews/${revConfig.file}`),
        `Chương ${chNum} N3: Trang ôn tập ngữ cảnh & Viết chữ trong giáo trình (Trang ${revConfig.page})`
      );
    } else if (selectedLevel === 'N4') {
      const revConfig = N4_REVIEW_PAGES_CONFIG[chNum] || { page: 27, file: `chap${chNum}_review.webp` };
      handleOpenModal(
        resolveKanjiAssetUrl(`/assets/kanji/n4/reviews/${revConfig.file}`),
        `Chương ${chNum} N4: Trang ôn tập ngữ cảnh & Viết chữ trong giáo trình (Trang ${revConfig.page})`
      );
    } else {
      const revConfig = REVIEW_PAGES_CONFIG[chNum] || { page: 18, file: `chap${chNum}_review_p18.webp` };
      handleOpenModal(
        resolveKanjiAssetUrl(`/assets/kanji/n5/reviews/${revConfig.file}`),
        `Chương ${chNum}: Trang ${revConfig.page} (Câu ngữ cảnh & Viết chữ trong giáo trình)`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1c1917] p-4 md:p-8 font-sans selection:bg-[#e7e5e4]">
      {/* Thanh điều hướng cấp độ & chế độ xem */}
      <KanjiLevelBar
        selectedLevel={selectedLevel}
        onSelectLevel={(lvl) => {
          setSelectedLevel(lvl);
          setSelectedChapterId(0);
        }}
        availableLevels={availableLevels}
        userLevel={userLevel}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        roadmap={roadmap}
      />

      {/* Chế độ xem Canvas Studio */}
      {viewMode === 'canvas' && (
        <div className="max-w-7xl mx-auto">
          <KanjiCanvasStudio
            initialKanji={canvasInitialKanji}
            onBackToLearning={() => setViewMode('master')}
          />
        </div>
      )}

      {/* Chế độ xem Lộ trình Kanji Master */}
      {viewMode === 'master' && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cột trái: Sidebar các chương */}
          <KanjiChapterSidebar
            roadmap={roadmap}
            loadingRoadmap={loadingRoadmap}
            selectedLevel={selectedLevel}
            selectedChapterId={selectedChapterId}
            onSelectChapter={setSelectedChapterId}
            isLowerLevel={isLowerLevel}
            userLevel={user?.jlptLevel}
          />

          {/* Cột phải: Khung học tập 4 thẻ chuyên sâu */}
          <div className="lg:col-span-8 space-y-6 min-w-0">
            {loadingDetail ? (
              <div className="bg-white border border-[#e7e5e4]">
                <LoadingBar label="Đang tải nội dung chương học..." />
              </div>
            ) : chapterDetail ? (
              <>
                {/* Header chương & 4 nút chuyển Tab */}
                <ChapterHeaderBanner
                  chapterDetail={chapterDetail}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />

                {/* Thẻ 1: Chữ Hán & Nét vẽ */}
                {activeTab === 'kanjis' && (
                  <KanjiDetailTab
                    kanjis={chapterDetail.kanjis}
                    activeKanji={activeKanji}
                    setActiveKanji={setActiveKanji}
                    onPracticeInStudio={handlePracticeInStudio}
                  />
                )}

                {/* Thẻ 2: Câu ngữ cảnh */}
                {activeTab === 'context' && (
                  <KanjiContextTab
                    chapterDetail={chapterDetail}
                    selectedLevel={selectedLevel}
                    readingAnswers={readingAnswers}
                    setReadingAnswers={setReadingAnswers}
                    writingAnswers={writingAnswers}
                    setWritingAnswers={setWritingAnswers}
                    speakJapanese={speakJapanese}
                    onPracticeInStudio={handlePracticeInStudio}
                    onOpenReviewPage={handleOpenReviewPage}
                  />
                )}

                {/* Thẻ 3: Minigame tình huống */}
                {activeTab === 'minigame' && (
                  <KanjiMinigameTab
                    minigames={chapterDetail.minigames}
                    chapterNumber={chapterDetail.chapter.chapterNumber}
                    minigameInputs={minigameInputs}
                    setMinigameInputs={setMinigameInputs}
                    activeBlankKey={activeBlankKey}
                    setActiveBlankKey={setActiveBlankKey}
                    checkedGames={checkedGames}
                    setCheckedGames={setCheckedGames}
                    showSolutions={showSolutions}
                    setShowSolutions={setShowSolutions}
                    shuffleSeeds={shuffleSeeds}
                    setShuffleSeeds={setShuffleSeeds}
                    playingAudioId={playingAudioId}
                    handlePlayDialogueAudio={handlePlayDialogueAudio}
                    onOpenModal={handleOpenModal}
                  />
                )}

                {/* Thẻ 4: Test ôn tập chương */}
                {activeTab === 'test' && (
                  <KanjiTestTab
                    readingExercises={chapterDetail.readingExercises || []}
                    writingExercises={chapterDetail.writingExercises || []}
                    testAnswers={testAnswers}
                    setTestAnswers={setTestAnswers}
                    submittingTest={submittingTest}
                    submitResult={submitResult}
                    showResultCard={showResultCard}
                    setShowResultCard={setShowResultCard}
                    testHistory={testHistory}
                    showHistoryDropdown={showHistoryDropdown}
                    setShowHistoryDropdown={setShowHistoryDropdown}
                    onSelectChapterId={setSelectedChapterId}
                    onSubmitReviewTest={handleSubmitReviewTest}
                    onReviewPastAttempt={handleReviewPastAttempt}
                  />
                )}
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* Modal phóng to tranh bài tập */}
      <KanjiIllustrationModal
        isOpen={showIllustrationModal}
        imageUrl={modalImageUrl}
        imageTitle={
          modalImageTitle ||
          (chapterDetail
            ? `Chương ${chapterDetail.chapter.chapterNumber}: ${chapterDetail.chapter.titleJa} (${chapterDetail.chapter.titleVi})`
            : 'Xem tranh')
        }
        zoom={modalZoom}
        pan={modalPan}
        isDragging={modalDragging}
        onClose={handleCloseModal}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetZoom={resetZoom}
        onWheel={handleModalWheel}
        onMouseDown={handleImageMouseDown}
        onMouseMove={handleImageMouseMove}
        onMouseUp={handleImageMouseUp}
        onContextMenu={handleImageContextMenu}
      />

      {/* Modal chúc mừng hoa anh đào khi pass bài test */}
      <SakuraCelebrationModal
        isOpen={showSakuraCelebration}
        onClose={() => setShowSakuraCelebration(false)}
        score={submitResult?.score ?? 0}
        correctCount={
          submitResult && chapterDetail
            ? Math.round(
                ((submitResult.score ?? 0) / 100) *
                  ((chapterDetail.readingExercises?.length || 0) +
                    (chapterDetail.writingExercises?.length || 0))
              )
            : 0
        }
        totalQuestions={
          (chapterDetail?.readingExercises?.length || 0) +
          (chapterDetail?.writingExercises?.length || 0)
        }
        currentChapterNumber={chapterDetail?.chapter.chapterNumber || selectedChapterId}
        currentChapterTitle={
          chapterDetail
            ? `${chapterDetail.chapter.titleJa} (${chapterDetail.chapter.titleVi})`
            : ''
        }
        nextChapterId={
          submitResult?.nextChapterId ||
          roadmap?.chapters.find(
            (c) =>
              c.chapterNumber ===
              (chapterDetail?.chapter.chapterNumber || selectedChapterId) + 1
          )?.id ||
          null
        }
        nextChapterNumber={
          submitResult?.nextChapterNumber ||
          (chapterDetail?.chapter.chapterNumber || selectedChapterId) + 1
        }
        nextChapterTitle={
          roadmap?.chapters.find(
            (c) =>
              c.chapterNumber ===
              (chapterDetail?.chapter.chapterNumber || selectedChapterId) + 1
          )
            ? `${
                roadmap.chapters.find(
                  (c) =>
                    c.chapterNumber ===
                    (chapterDetail?.chapter.chapterNumber || selectedChapterId) + 1
                )?.titleJa
              } (${
                roadmap.chapters.find(
                  (c) =>
                    c.chapterNumber ===
                    (chapterDetail?.chapter.chapterNumber || selectedChapterId) + 1
                )?.titleVi
              })`
            : null
        }
        onContinueToNextChapter={(nextId) => {
          setSelectedChapterId(nextId);
          setActiveTab('kanjis');
          setShowResultCard(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

