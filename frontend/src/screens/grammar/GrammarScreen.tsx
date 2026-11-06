import React, { useState, useEffect, useRef } from 'react';
import { FileText, Star, MessageSquare } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { grammarApi } from '../../api/grammarApi';
import grammarChaptersData from '../../data/grammarChapters.json';
import grammarLessonsCatalog from '../../data/grammarLessonsCatalog.json';
import { getQuizForLesson } from '../../data/grammarQuizBank';

import type {
  JlptLevel,
  GrammarLessonSummaryDto,
  GrammarLessonDetailDto,
  GrammarDiscussionDto,
  GrammarQuizItem,
  GrammarTimestampItem,
  LightboxMedia,
} from './types';
import { LEVEL_RANK, FALLBACK_N5_LESSON_1 } from './types';

import { useGrammarWatchProgress, formatTime } from './hooks/useGrammarWatchProgress';
import { useGrammarQuiz } from './hooks/useGrammarQuiz';
import { useGrammarDiscussions } from './hooks/useGrammarDiscussions';

import { GrammarLevelSelector } from './components/GrammarLevelSelector';
import { GrammarVideoPlayer } from './components/GrammarVideoPlayer';
import { GrammarFormulaTab } from './components/GrammarFormulaTab';
import { GrammarQuizTab } from './components/GrammarQuizTab';
import { GrammarDiscussionTab } from './components/GrammarDiscussionTab';
import { GrammarLessonSidebar } from './components/GrammarLessonSidebar';

import { MediaLightboxModal } from './modals/MediaLightboxModal';
import { UrlInputModal } from './modals/UrlInputModal';
import { DeleteCommentConfirmModal } from './modals/DeleteCommentConfirmModal';

export const GrammarScreen: React.FC = () => {
  const { user } = useAuthStore();
  const isTeacher = user?.role === 'TEACHER' || user?.role === 'ADMIN';
  const currentUserLevel = user?.jlptLevel || 'N5';
  const currentAuthorName = user?.fullName || user?.username || 'Học viên';
  const currentUserRole: 'teacher' | 'student' = isTeacher ? 'teacher' : 'student';

  const canAccessLevel = (lvl: JlptLevel): boolean => {
    if (isTeacher) return true;
    const userRank = LEVEL_RANK[currentUserLevel as JlptLevel] || 1;
    const targetRank = LEVEL_RANK[lvl] || 1;
    return targetRank <= userRank;
  };

  const getLastActiveState = (): { level: JlptLevel; lessonId: number } => {
    try {
      const raw = localStorage.getItem('grammar_last_active_lesson');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.lessonId) {
          const validLesson = (grammarLessonsCatalog as GrammarLessonSummaryDto[]).find(
            (l) => l.id === parsed.lessonId
          );
          if (validLesson) {
            const lvl = (validLesson.levelCode || parsed.levelCode || 'N5') as JlptLevel;
            return {
              level: lvl,
              lessonId: validLesson.id,
            };
          }
        }
      }
    } catch {
      // ignore
    }
    return { level: 'N5', lessonId: 1 };
  };

  const initialActive = getLastActiveState();

  const getInitialLessons = (lvl: JlptLevel): GrammarLessonSummaryDto[] => {
    return (grammarLessonsCatalog as GrammarLessonSummaryDto[]).filter((l) => l.levelCode === lvl);
  };

  const safeInitialLevel: JlptLevel = canAccessLevel(initialActive.level)
    ? initialActive.level
    : canAccessLevel(currentUserLevel as JlptLevel)
      ? (currentUserLevel as JlptLevel)
      : 'N5';

  const safeInitialLessons = getInitialLessons(safeInitialLevel);
  const safeInitialLessonId = safeInitialLessons.some((l) => l.id === initialActive.lessonId)
    ? initialActive.lessonId
    : safeInitialLessons[0]?.id || 1;

  // Cấp độ đang chọn & Danh sách bài học
  const [selectedLevel, setSelectedLevel] = useState<JlptLevel>(safeInitialLevel);
  const [lessons, setLessons] = useState<GrammarLessonSummaryDto[]>(() => safeInitialLessons);
  const [selectedLessonId, setSelectedLessonId] = useState<number>(safeInitialLessonId);
  const [lessonDetail, setLessonDetail] = useState<GrammarLessonDetailDto | null>(null);

  // Trạng thái tải & Thông báo khóa
  const [loadingLessons, setLoadingLessons] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  // Tabs học tập: 'cheatsheet' | 'quiz' | 'discussion'
  const [activeTab, setActiveTab] = useState<'cheatsheet' | 'quiz' | 'discussion'>('cheatsheet');
  const [activeLightboxMedia, setActiveLightboxMedia] = useState<LightboxMedia | null>(null);

  // SWR Caches
  const detailCacheRef = useRef<Map<number, GrammarLessonDetailDto>>(new Map());
  const discussionCacheRef = useRef<Map<number, GrammarDiscussionDto[]>>(new Map());

  // Hook 1: Tiến độ xem video & resume popup
  const {
    resumePrompt,
    setResumePrompt,
    promptedLessonRef,
    activeTimestamp,
    setActiveTimestamp,
    handleJumpToTimestamp,
    handleResumeWatching,
    handleRestartFromBeginning,
    handleCloseResumePrompt,
  } = useGrammarWatchProgress({
    selectedLessonId,
    selectedLevel,
    detailCacheRef,
  });

  // Bài học hiện tại
  const matchedCatalog = (grammarLessonsCatalog as GrammarLessonSummaryDto[]).find((l) => l.id === selectedLessonId);
  const currentLesson: GrammarLessonDetailDto =
    lessonDetail && lessonDetail.id === selectedLessonId
      ? lessonDetail
      : (matchedCatalog as unknown as GrammarLessonDetailDto) || FALLBACK_N5_LESSON_1;

  const videoChapters: GrammarTimestampItem[] =
    (grammarChaptersData as Record<string, GrammarTimestampItem[]>)[currentLesson.videoId] ||
    (currentLesson.timestamps && currentLesson.timestamps.length > 0
      ? currentLesson.timestamps
      : []);

  // Bài kiểm tra 20 câu (16 MCQ + 4 STAR)
  const fullQuizList: GrammarQuizItem[] =
    currentLesson.quizzes && currentLesson.quizzes.length >= 20
      ? currentLesson.quizzes
      : getQuizForLesson(currentLesson.lessonNumber, selectedLevel, currentLesson.titleVi);

  const mcqList = fullQuizList.filter((q) => q.quizType === 'MCQ');
  const starList = fullQuizList.filter((q) => q.quizType === 'STAR');

  // Hook 2: Quiz
  const {
    mcqAnswers,
    starSlots,
    quizSubmitted,
    quizScore,
    isSubmittingQuiz,
    shuffledOptionsMap,
    answeredCount,
    correctCount,
    resetQuizForNewLesson,
    handleSelectMcqAnswer,
    handleSelectFragment,
    handleRemoveSlot,
    handleResetStar,
    handleResetTest,
    handleSubmitFullQuiz,
  } = useGrammarQuiz({
    currentLessonId: currentLesson.id,
    fullQuizList,
    starList,
    setLessons,
  });

  // Hook 3: Thảo luận & hỏi đáp
  const {
    discussions,
    setDiscussions,
    questionText,
    setQuestionText,
    attachedImage,
    setAttachedImage,
    attachedVideo,
    setAttachedVideo,
    showEmojiPicker,
    setShowEmojiPicker,
    showUrlInputModal,
    setShowUrlInputModal,
    mediaUrlInput,
    setMediaUrlInput,
    replyingToDiscussionId,
    setReplyingToDiscussionId,
    replyText,
    setReplyText,
    replyAttachedImage,
    setReplyAttachedImage,
    replyAttachedVideo,
    setReplyAttachedVideo,
    showReplyEmoji,
    setShowReplyEmoji,
    deleteConfirmTarget,
    setDeleteConfirmTarget,
    isDeletingComment,
    isUploadingMedia,
    mainImageInputRef,
    mainVideoInputRef,
    replyImageInputRef,
    replyVideoInputRef,
    handleMainImageChange,
    handleMainVideoChange,
    handleReplyImageChange,
    handleReplyVideoChange,
    handleAttachMediaUrl,
    handlePostQuestion,
    handlePostReply,
    handleLikeDiscussion,
    handleRequestDeleteDiscussion,
    executeDeleteDiscussion,
  } = useGrammarDiscussions({
    currentLessonId: currentLesson.id,
    currentUserLevel,
    currentAuthorName,
    currentUserRole,
    isTeacher,
    discussionCacheRef,
  });

  // Đóng lightbox khi nhấn phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxMedia(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 1. Tải danh sách bài học khi selectedLevel thay đổi
  useEffect(() => {
    let isMounted = true;
    async function loadLessons() {
      setLoadingLessons(true);
      try {
        const data = await grammarApi.getLessonsByLevel(selectedLevel);
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setLessons(data);
          if (!data.some((l) => l.id === selectedLessonId)) {
            setSelectedLessonId(data[0].id);
          }
        }
      } catch (err) {
        console.warn('Backend chưa sẵn sàng, dùng danh mục từ catalog local:', err);
      } finally {
        if (isMounted) setLoadingLessons(false);
      }
    }
    loadLessons();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLevel]);

  // 2. Tải chi tiết bài học & thảo luận khi selectedLessonId thay đổi (Song song + SWR Cache)
  useEffect(() => {
    let isMounted = true;
    async function loadLessonDetail() {
      if (!selectedLessonId) return;

      resetQuizForNewLesson();
      setActiveTimestamp(null);

      // Đọc tiến độ xem đã lưu trong LocalStorage
      let localWatch: { timeSec: number; timeStr: string; updatedAt: number } | null = null;
      try {
        const raw = localStorage.getItem(`grammar_last_watch_${selectedLessonId}`);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed.timeSec === 'number' && parsed.timeSec >= 15) {
            localWatch = {
              timeSec: parsed.timeSec,
              timeStr: parsed.timeStr || formatTime(parsed.timeSec),
              updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : 0,
            };
          }
        }
      } catch {
        // ignore
      }

      // A. Phục hồi ngay từ SWR Cache
      const cached = detailCacheRef.current.get(selectedLessonId);
      if (cached) {
        setLessonDetail(cached);
      } else {
        setLoadingDetail(true);
      }

      if (discussionCacheRef.current.has(selectedLessonId)) {
        setDiscussions(discussionCacheRef.current.get(selectedLessonId)!);
      }

      // Xử lý Pop-up Tiếp tục xem: ƯU TIÊN MỐC THỜI GIAN MỚI NHẤT & CHỈ HIỂN THỊ ĐÚNG 1 LẦN DUY NHẤT
      if (promptedLessonRef.current !== selectedLessonId) {
        let bestSec: number | null = null;
        let bestStr = '';

        const cachedSec =
          cached?.lastWatchSec && cached.lastWatchSec >= 15 ? cached.lastWatchSec : null;

        if (localWatch && cachedSec) {
          if (localWatch.timeSec >= cachedSec) {
            bestSec = localWatch.timeSec;
            bestStr = localWatch.timeStr;
          } else {
            bestSec = cachedSec;
            bestStr = cached?.lastWatchTimeStr || formatTime(cachedSec);
          }
        } else if (localWatch) {
          bestSec = localWatch.timeSec;
          bestStr = localWatch.timeStr;
        } else if (cachedSec) {
          bestSec = cachedSec;
          bestStr = cached!.lastWatchTimeStr || formatTime(cachedSec);
        }

        if (bestSec && bestSec >= 15) {
          promptedLessonRef.current = selectedLessonId;
          const lessonTitle =
            cached?.titleVi ||
            (grammarLessonsCatalog as GrammarLessonSummaryDto[]).find((l) => l.id === selectedLessonId)?.titleVi ||
            '';
          setResumePrompt({
            lessonId: selectedLessonId,
            timeSec: bestSec,
            timeStr: bestStr,
            lessonTitle,
          });
        } else {
          setResumePrompt(null);
        }
      }

      // B. Tải song song cả 2 API qua mạng
      const detailPromise = grammarApi
        .getLessonDetail(selectedLessonId)
        .then((detail) => {
          if (!isMounted || !detail || !detail.id) return;

          if (localWatch && localWatch.timeSec > (detail.lastWatchSec || 0)) {
            grammarApi
              .saveWatchProgress(selectedLessonId, localWatch.timeSec, localWatch.timeStr)
              .catch(() => { });
            detail.lastWatchSec = localWatch.timeSec;
            detail.lastWatchTimeStr = localWatch.timeStr;
          }

          setLessonDetail(detail);
          detailCacheRef.current.set(selectedLessonId, detail);

          if (promptedLessonRef.current === selectedLessonId) {
            return;
          }

          if (detail.lastWatchSec && detail.lastWatchSec >= 15) {
            promptedLessonRef.current = selectedLessonId;
            setResumePrompt({
              lessonId: selectedLessonId,
              timeSec: detail.lastWatchSec,
              timeStr: detail.lastWatchTimeStr || formatTime(detail.lastWatchSec),
              lessonTitle: detail.titleVi,
            });
            try {
              localStorage.setItem(
                `grammar_last_watch_${selectedLessonId}`,
                JSON.stringify({
                  timeSec: detail.lastWatchSec,
                  timeStr: detail.lastWatchTimeStr || formatTime(detail.lastWatchSec),
                  updatedAt: Date.now(),
                })
              );
            } catch {
              // ignore
            }
          }
        })
        .catch((err) => {
          console.warn('Không tải được chi tiết bài học từ API, dùng dữ liệu catalog local:', err);
        })
        .finally(() => {
          if (isMounted) setLoadingDetail(false);
        });

      const discussionPromise = grammarApi
        .getDiscussions(selectedLessonId)
        .then((discList) => {
          if (isMounted && Array.isArray(discList)) {
            setDiscussions(discList);
            discussionCacheRef.current.set(selectedLessonId, discList);
          }
        })
        .catch((err) => {
          console.warn('Không tải được thảo luận từ API:', err);
        });

      await Promise.allSettled([detailPromise, discussionPromise]);
    }

    loadLessonDetail();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLessonId]);

  const handleSelectLesson = (lessonId: number) => {
    setLockedNotice(null);
    setSelectedLessonId(lessonId);
    try {
      localStorage.setItem(
        'grammar_last_active_lesson',
        JSON.stringify({
          lessonId,
          levelCode: selectedLevel,
          updatedAt: Date.now(),
        })
      );
    } catch {
      // ignore
    }
  };

  const handleSelectLevel = (lvl: JlptLevel) => {
    if (canAccessLevel(lvl)) {
      setSelectedLevel(lvl);
      setLockedNotice(null);
      const initialList = getInitialLessons(lvl);
      setLessons(initialList);
      if (!initialList.some((l) => l.id === selectedLessonId)) {
        if (initialList.length > 0) {
          setSelectedLessonId(initialList[0].id);
          try {
            localStorage.setItem(
              'grammar_last_active_lesson',
              JSON.stringify({
                lessonId: initialList[0].id,
                levelCode: lvl,
                updatedAt: Date.now(),
              })
            );
          } catch {
            // ignore
          }
        }
      }
    } else {
      setLockedNotice(
        `Cấp độ ${lvl} hiện đang bị khóa. Tài khoản của bạn hiện ở cấp độ ${currentUserLevel} (được học từ N5 đến ${currentUserLevel}). Hãy vượt qua kỳ thi JLPT ${currentUserLevel} hoặc nâng cấp tài khoản để mở khóa giáo trình ${lvl}!`
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Inputs ẩn để chọn file từ máy */}
      <input
        type="file"
        ref={mainImageInputRef}
        accept="image/*"
        onChange={handleMainImageChange}
        className="hidden"
      />
      <input
        type="file"
        ref={mainVideoInputRef}
        accept="video/*"
        onChange={handleMainVideoChange}
        className="hidden"
      />
      <input
        type="file"
        ref={replyImageInputRef}
        accept="image/*"
        onChange={handleReplyImageChange}
        className="hidden"
      />
      <input
        type="file"
        ref={replyVideoInputRef}
        accept="video/*"
        onChange={handleReplyVideoChange}
        className="hidden"
      />

      {/* ════════ HEADER TRANG & BỘ CHỌN CẤP ĐỘ N5 ~ N1 ════════ */}
      <GrammarLevelSelector
        selectedLevel={selectedLevel}
        currentUserLevel={currentUserLevel}
        canAccessLevel={canAccessLevel}
        onSelectLevel={handleSelectLevel}
        lockedNotice={lockedNotice}
        onClearLockedNotice={() => setLockedNotice(null)}
      />

      {/* ════════ LAYOUT 2 CỘT CHÍNH ════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CỘT TRÁI (8/12): PLAYER VIDEO + 3 TABS NỘI DUNG */}
        <div className="lg:col-span-8 space-y-4">
          <GrammarVideoPlayer
            currentLesson={currentLesson}
            selectedLevel={selectedLevel}
            loadingDetail={loadingDetail}
            resumePrompt={resumePrompt}
            videoChapters={videoChapters}
            activeTimestamp={activeTimestamp}
            onJumpToTimestamp={handleJumpToTimestamp}
            onCloseResumePrompt={handleCloseResumePrompt}
            onRestartFromBeginning={handleRestartFromBeginning}
            onResumeWatching={handleResumeWatching}
          />

          {/* 📑 HỆ THỐNG 3 TABS HỌC TẬP TRỌNG TÂM */}
          <div className="bg-white border border-[#e7e5e4] shadow-xs overflow-hidden">
            {/* Thanh chọn Tab */}
            <div className="flex border-b border-[#e7e5e4] bg-[#fafaf9] overflow-x-auto">
              <button
                onClick={() => setActiveTab('cheatsheet')}
                className={`px-5 py-3 text-xs font-mono font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${activeTab === 'cheatsheet'
                  ? 'border-[#b91c1c] text-[#b91c1c] bg-white'
                  : 'border-transparent text-[#78716c] hover:text-[#1c1917]'
                  }`}
              >
                <FileText className="w-4 h-4" />
                <span>1. Bảng Tóm Tắt Công Thức</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-5 py-3 text-xs font-mono font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${activeTab === 'quiz'
                  ? 'border-[#b91c1c] text-[#b91c1c] bg-white'
                  : 'border-transparent text-[#78716c] hover:text-[#1c1917]'
                  }`}
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>2. Bài Test Kiến Thức</span>
                {quizSubmitted && quizScore !== null && (
                  <span
                    className={`px-1.5 py-0.2 text-[10px] ${quizScore >= 85 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                  >
                    {quizScore}%
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('discussion')}
                className={`px-5 py-3 text-xs font-mono font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${activeTab === 'discussion'
                  ? 'border-[#b91c1c] text-[#b91c1c] bg-white'
                  : 'border-transparent text-[#78716c] hover:text-[#1c1917]'
                  }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>3. Hỏi Đáp ({discussions.length})</span>
              </button>
            </div>

            {/* Nội dung từng Tab */}
            <div className="p-5">
              {activeTab === 'cheatsheet' && (
                <GrammarFormulaTab cheatsheets={currentLesson.cheatsheets} />
              )}

              {activeTab === 'quiz' && (
                <GrammarQuizTab
                  fullQuizList={fullQuizList}
                  mcqList={mcqList}
                  starList={starList}
                  mcqAnswers={mcqAnswers}
                  starSlots={starSlots}
                  quizSubmitted={quizSubmitted}
                  quizScore={quizScore}
                  isSubmittingQuiz={isSubmittingQuiz}
                  shuffledOptionsMap={shuffledOptionsMap}
                  answeredCount={answeredCount}
                  correctCount={correctCount}
                  onSelectMcqAnswer={handleSelectMcqAnswer}
                  onSelectStarFragment={handleSelectFragment}
                  onRemoveStarSlot={handleRemoveSlot}
                  onResetStar={handleResetStar}
                  onResetTest={handleResetTest}
                  onSubmitFullQuiz={handleSubmitFullQuiz}
                />
              )}

              {activeTab === 'discussion' && (
                <GrammarDiscussionTab
                  discussions={discussions}
                  questionText={questionText}
                  attachedImage={attachedImage}
                  attachedVideo={attachedVideo}
                  showEmojiPicker={showEmojiPicker}
                  isUploadingMedia={isUploadingMedia}
                  currentAuthorName={currentAuthorName}
                  currentUserRole={currentUserRole}
                  isTeacher={isTeacher}
                  currentUserId={user?.id}
                  replyingToDiscussionId={replyingToDiscussionId}
                  replyText={replyText}
                  replyAttachedImage={replyAttachedImage}
                  replyAttachedVideo={replyAttachedVideo}
                  showReplyEmoji={showReplyEmoji}
                  onQuestionTextChange={setQuestionText}
                  onRemoveAttachedImage={() => setAttachedImage(null)}
                  onRemoveAttachedVideo={() => setAttachedVideo(null)}
                  onToggleEmojiPicker={() => setShowEmojiPicker((v) => !v)}
                  onSelectEmoji={(em) => setQuestionText((prev) => prev + em)}
                  onOpenUrlModal={(type) => setShowUrlInputModal(type)}
                  onTriggerMainImageInput={() => mainImageInputRef.current?.click()}
                  onTriggerMainVideoInput={() => mainVideoInputRef.current?.click()}
                  onPostQuestion={handlePostQuestion}
                  onOpenMedia={(med) => setActiveLightboxMedia(med)}
                  onLikeDiscussion={handleLikeDiscussion}
                  onToggleReply={(id) => {
                    setReplyingToDiscussionId((prev) => (prev === id ? null : id));
                    setReplyText('');
                    setReplyAttachedImage(null);
                    setReplyAttachedVideo(null);
                  }}
                  onRequestDeleteDiscussion={handleRequestDeleteDiscussion}
                  onReplyTextChange={setReplyText}
                  onRemoveReplyImage={() => setReplyAttachedImage(null)}
                  onRemoveReplyVideo={() => setReplyAttachedVideo(null)}
                  onToggleReplyEmoji={() => setShowReplyEmoji((v) => !v)}
                  onSelectReplyEmoji={(em) => setReplyText((prev) => prev + em)}
                  onTriggerReplyImageInput={() => replyImageInputRef.current?.click()}
                  onTriggerReplyVideoInput={() => replyVideoInputRef.current?.click()}
                  onSubmitReply={handlePostReply}
                />
              )}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI (4/12): PLAYLIST TOÀN BỘ BÀI HỌC CỦA LEVEL */}
        <GrammarLessonSidebar
          selectedLevel={selectedLevel}
          lessons={lessons}
          selectedLessonId={selectedLessonId}
          isTeacher={isTeacher}
          loadingLessons={loadingLessons}
          onSelectLesson={handleSelectLesson}
          onShowLockedNotice={(msg) => setLockedNotice(msg)}
        />
      </div>

      {/* FACEBOOK-STYLE LIGHTBOX PORTAL */}
      <MediaLightboxModal
        activeLightboxMedia={activeLightboxMedia}
        onClose={() => setActiveLightboxMedia(null)}
      />

      {/* MODAL NHẬP URL TRỰC TIẾP */}
      <UrlInputModal
        showUrlInputModal={showUrlInputModal}
        mediaUrlInput={mediaUrlInput}
        onUrlChange={setMediaUrlInput}
        onClose={() => {
          setShowUrlInputModal(null);
          setMediaUrlInput('');
        }}
        onConfirm={handleAttachMediaUrl}
      />

      {/* MODAL XÁC NHẬN XÓA COMMENT THẢO LUẬN NIPPONMASTER */}
      <DeleteCommentConfirmModal
        deleteConfirmTarget={deleteConfirmTarget}
        isDeletingComment={isDeletingComment}
        onCancel={() => setDeleteConfirmTarget(null)}
        onConfirm={executeDeleteDiscussion}
      />
    </div>
  );
};

export default GrammarScreen;
