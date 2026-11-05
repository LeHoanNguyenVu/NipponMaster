import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  CheckCircle2,
  ChevronRight,
  Lock,
  Star,
  FileText,
  MessageSquare,
  Bookmark,
  Send,
  Smile,
  X,
  ThumbsUp,
  FolderOpen,
  Link,
  CornerDownRight,
  Play,
  Loader2,
  AlertCircle,
  History,
  RotateCcw,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../store/useAuthStore';
import { grammarApi } from '../api/grammarApi';
import type {
  GrammarLessonSummaryDto,
  GrammarLessonDetailDto,
  GrammarDiscussionDto,
  GrammarQuizItem
} from '../api/grammarApi';
import grammarChaptersData from '../data/grammarChapters.json';
import grammarLessonsCatalog from '../data/grammarLessonsCatalog.json';
import { getQuizForLesson } from '../data/grammarQuizBank';

type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

interface LightboxMedia {
  type: 'image' | 'video';
  url: string;
  title?: string;
}

// Fallback dữ liệu N5 Bài 1 khi backend chưa khởi động
const FALLBACK_N5_LESSON_1: GrammarLessonDetailDto = {
  id: 1,
  levelCode: 'N5',
  lessonNumber: 1,
  partNumber: 1,
  sortOrder: 1,
  titleVi: 'Khẳng định, Phủ định, Nghi vấn & Trợ từ chủ đề [は・も・の]',
  titleJa: '第1課：～は～です・～じゃありません・～ですか・～も・～の',
  videoId: 'YBI4nM5HC4c',
  durationStr: '1:54:38',
  durationSec: 6878,
  isUnlocked: true,
  isPassed: false,
  highestScore: 0,
  starsEarned: 0,
  timestamps: [
    { id: 1, timeSec: 15, timeStr: '00:15', title: 'Tổng quan bài 1 & Đại từ xưng hô', pattern: 'わたし・あなた・あの人', summary: 'Giới thiệu bản thân và cách gọi người khác lịch sự', sortOrder: 1 },
    { id: 2, timeSec: 90, timeStr: '01:30', title: 'Mẫu 1: Câu khẳng định danh từ', pattern: 'N1 は N2 です', summary: 'N1 là N2 (Trợ từ は phát âm là WA)', sortOrder: 2 },
    { id: 3, timeSec: 320, timeStr: '05:20', title: 'Mẫu 2: Câu phủ định danh từ', pattern: 'N1 は N2 じゃ / ではありません', summary: 'N1 không phải là N2 (じゃありません thân mật hơn ではありません)', sortOrder: 3 },
    { id: 4, timeSec: 580, timeStr: '09:40', title: 'Mẫu 3: Câu hỏi nghi vấn Có/Không', pattern: 'Câu + か', summary: 'Hỏi xác nhận thông tin, trả lời はい hoặc いいえ', sortOrder: 4 },
    { id: 5, timeSec: 810, timeStr: '13:30', title: 'Mẫu 4: Trợ từ đồng nhất "Cũng"', pattern: 'N も N です', summary: 'Thay thế trợ từ は khi đối tượng có cùng đặc điểm', sortOrder: 5 },
    { id: 6, timeSec: 990, timeStr: '16:30', title: 'Mẫu 5: Trợ từ sở hữu & Thuộc về', pattern: 'N1 の N2', summary: 'N2 thuộc về N1 hoặc giải thích bổ nghĩa cho N1', sortOrder: 6 }
  ],
  cheatsheets: [
    {
      id: 1,
      pattern: 'N1 は N2 です',
      badge: 'Căn bản ★',
      meaning: 'N1 là N2',
      structure: 'Danh từ 1 + は + Danh từ 2 + です',
      nuance: 'Trợ từ [は] luôn phát âm là [wa] khi đóng vai trò trợ từ chủ ngữ, không đọc là [ha].',
      examples: [
        { ja: 'わたしは マイケル です。', furigana: 'わたしは マイケル です。', vi: 'Tôi là Michael.' },
        { ja: 'サントスさんは ブラジル人 です。', furigana: 'サントスさんは ブラジルじん です。', vi: 'Anh Santos là người Brazil.' }
      ],
      sortOrder: 1
    },
    {
      id: 2,
      pattern: 'N1 は N2 じゃ／ではありません',
      badge: 'Phủ định',
      meaning: 'N1 không phải là N2',
      structure: 'Danh từ 1 + は + Danh từ 2 + じゃ／ではありません',
      nuance: '[じゃありません] thường dùng trong hội thoại hàng ngày. [ではありません] trang trọng hơn, dùng trong bài thi JLPT hoặc văn bản viết.',
      examples: [
        { ja: 'サントスさんは 学生じゃ ありません。', furigana: 'サントスさんは がくせいじゃ ありません。', vi: 'Anh Santos không phải là sinh viên.' }
      ],
      sortOrder: 2
    },
    {
      id: 3,
      pattern: 'Câu + か',
      badge: 'Nghi vấn',
      meaning: '... phải không? / ... có phải không?',
      structure: 'Câu khẳng định + か？',
      nuance: 'Cuối câu nghi vấn lên giọng nhẹ ở từ [か]. Trả lời câu hỏi nghi vấn Có/Không luôn bắt đầu bằng [はい] hoặc [いいえ].',
      examples: [
        { ja: 'ミラーさんは アメリカ人ですか。…はい、アメリカ人です。', furigana: 'ミラーさんは アメリカじんですか。…はい、アメリカじんです。', vi: 'Anh Miller có phải người Mỹ không? ... Vâng, là người Mỹ.' }
      ],
      sortOrder: 3
    }
  ],
  quizzes: [
    {
      id: 1,
      quizType: 'STAR',
      prompt: 'Sắp xếp các từ để hoàn thiện câu và chọn từ nằm ở vị trí ngôi sao [★]:',
      leftSentence: 'わたし',
      rightSentence: 'マイク・ミラーです。',
      starIndex: 0,
      fragments: [
        { id: 'f1', text: 'は' },
        { id: 'f2', text: 'アメリカ' },
        { id: 'f3', text: 'から' },
        { id: 'f4', text: '来ました' }
      ],
      correctAnswer: 'は',
      explanation: 'Thứ tự đúng: わたし [は] [アメリカ] [から] [来ました] マイク・ミラーです。(Vị trí sao số 1 là は).',
      sortOrder: 1
    },
    {
      id: 2,
      quizType: 'MCQ',
      prompt: 'Chọn trợ từ thích hợp điền vào chỗ trống: サントスさん _____ ブラジル人です。',
      options: ['は', 'が', 'を', 'に'],
      correctAnswer: 'は',
      explanation: 'Trợ từ [は] biểu thị chủ đề của câu: Anh Santos là người Brazil.',
      sortOrder: 2
    },
    {
      id: 3,
      quizType: 'MCQ',
      prompt: 'Dạng phủ định trang trọng của「です」dùng trong bài thi JLPT là gì?',
      options: ['ではありません', 'じゃありません', 'でした', 'くありません'],
      correctAnswer: 'ではありません',
      explanation: '[ではありません] là cách phủ định trang trọng tiêu chuẩn trong văn viết và bài thi.',
      sortOrder: 3
    }
  ]
};

const EMOJI_LIST = ['🎌', '🌸', '💡', '❓', '✍️', '👏', '💯', '📚', '✨', 'JP', '🗾', '🍙', '🍵', '👍', '🔥', '🎯', '⭐', '🎉', '🙏', '😊'];

// Bảng xếp hạng thứ bậc cấp độ JLPT
const LEVEL_RANK: Record<string, number> = {
  'STARTER': 1,
  'N5': 1,
  'N4': 2,
  'N3': 3,
  'N2': 4,
  'N1': 5,
};

export default function Grammar() {
  const { user } = useAuthStore();
  const isTeacher = user?.role?.toUpperCase() === 'TEACHER' || user?.role?.toUpperCase() === 'ADMIN';
  const currentAuthorName = user?.fullName || 'Học viên';
  const currentUserRole: 'teacher' | 'student' = isTeacher ? 'teacher' : 'student';

  // Cấp độ thực tế của tài khoản đang đăng nhập
  const currentUserLevel = (
    user?.jlptLevel ||
    user?.targetLevel ||
    localStorage.getItem('nippon_user_level') ||
    'N5'
  ).toUpperCase();

  // Kiểm tra quyền hạn theo cấp bậc tài khoản: N1 xem full N5-N1, N2 xem N5-N2, N5 xem N5
  const canAccessLevel = (lvl: JlptLevel): boolean => {
    if (isTeacher) return true;
    const userRank = LEVEL_RANK[currentUserLevel] || 1;
    const targetRank = LEVEL_RANK[lvl] || 1;
    return userRank >= targetRank;
  };

  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  // Khôi phục bài học & cấp độ gần nhất người dùng đã xem (khi thoát trang rồi vào lại)
  const getLastActiveState = (): { level: JlptLevel; lessonId: number } => {
    try {
      const saved = localStorage.getItem('grammar_last_active_lesson');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.lessonId) {
          const validLesson = (grammarLessonsCatalog as any[]).find(l => l.id === parsed.lessonId);
          if (validLesson) {
            const lvl = (validLesson.levelCode || parsed.levelCode || 'N5') as JlptLevel;
            return {
              level: lvl,
              lessonId: validLesson.id
            };
          }
        }
      }
    } catch (e) { }
    return { level: 'N5', lessonId: 1 };
  };

  const initialActive = getLastActiveState();

  // Helper lấy danh sách bài học mặc định từ catalog 131 bài
  const getInitialLessons = (lvl: JlptLevel): GrammarLessonSummaryDto[] => {
    return (grammarLessonsCatalog as any[]).filter(l => l.levelCode === lvl);
  };

  // Nếu cấp độ đã lưu vượt quá quyền của tài khoản hiện tại, ép về cấp độ cao nhất tài khoản được phép
  const safeInitialLevel: JlptLevel = canAccessLevel(initialActive.level)
    ? initialActive.level
    : (canAccessLevel(currentUserLevel as JlptLevel) ? (currentUserLevel as JlptLevel) : 'N5');
  const safeInitialLessons = getInitialLessons(safeInitialLevel);
  const safeInitialLessonId = safeInitialLessons.some(l => l.id === initialActive.lessonId)
    ? initialActive.lessonId
    : (safeInitialLessons[0]?.id || 1);

  // Cấp độ đang chọn: khôi phục từ bài học gần nhất đã xem (có kiểm tra quyền)
  const [selectedLevel, setSelectedLevel] = useState<JlptLevel>(safeInitialLevel);

  // Danh sách bài học của level hiện tại (khởi tạo ngay lập tức từ catalog 131 bài)
  const [lessons, setLessons] = useState<GrammarLessonSummaryDto[]>(() => safeInitialLessons);
  const [selectedLessonId, setSelectedLessonId] = useState<number>(safeInitialLessonId);
  const [lessonDetail, setLessonDetail] = useState<GrammarLessonDetailDto | null>(null);

  // Trạng thái tải
  const [loadingLessons, setLoadingLessons] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);

  // Bộ nhớ đệm Memory Cache (SWR) giúp phản hồi tức thì 0ms khi chuyển bài hoặc mở lại thảo luận
  const detailCacheRef = useRef<Map<number, GrammarLessonDetailDto>>(new Map());
  const discussionCacheRef = useRef<Map<number, GrammarDiscussionDto[]>>(new Map());

  // Tab học tập: 'cheatsheet' | 'quiz' | 'discussion'
  const [activeTab, setActiveTab] = useState<'cheatsheet' | 'quiz' | 'discussion'>('cheatsheet');
  const [activeTimestamp, setActiveTimestamp] = useState<number | null>(null);

  // Helper format giây -> mm:ss hoặc hh:mm:ss
  const formatTime = (sec: number): string => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) {
      return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Trạng thái Resume Video Watch (Lưu tiến độ xem & Pop-up tiếp tục)
  const [resumePrompt, setResumePrompt] = useState<{ lessonId: number; timeSec: number; timeStr: string; lessonTitle?: string } | null>(null);
  // Ghi nhận bài học đã được xử lý/hiển thị pop-up hỏi tiếp tục (chỉ hiện 1 lần duy nhất, tránh API đè lại)
  const promptedLessonRef = useRef<number | null>(null);
  const lastSyncTimeRef = useRef<number>(0);
  const currentWatchSecRef = useRef<number>(0);

  // Lưu tiến độ xem vào LocalStorage & đồng bộ lên Cloud Database
  const saveWatchProgress = (lessonId: number, sec: number, forceSync = false) => {
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
          updatedAt: Date.now()
        })
      );
    } catch (e) { }

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
    if (forceSync || (now - lastSyncTimeRef.current > 8000)) {
      lastSyncTimeRef.current = now;
      grammarApi.saveWatchProgress(lessonId, sec, timeStr).catch(() => { });
    }
  };

  // Trạng thái Bài Test 20 câu (MCQ & Star)
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({});
  const [starSlots, setStarSlots] = useState<Record<number, (string | null)[]>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState<boolean>(false);
  const [quizAttemptCount, setQuizAttemptCount] = useState<number>(0);
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<number, string[]>>({});

  // Trạng thái Facebook-style Lightbox Modal (Phóng to ảnh & video toàn màn hình)
  const [activeLightboxMedia, setActiveLightboxMedia] = useState<LightboxMedia | null>(null);

  // Trạng thái NipponMaster Custom Confirm Modal khi xóa comment
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<{
    discussionId: number;
    isReply: boolean;
    parentId?: number;
  } | null>(null);
  const [isDeletingComment, setIsDeletingComment] = useState<boolean>(false);

  // Trạng thái Hỏi Đáp & Thảo luận
  const [discussions, setDiscussions] = useState<GrammarDiscussionDto[]>([]);
  const [questionText, setQuestionText] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [attachedVideo, setAttachedVideo] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUrlInputModal, setShowUrlInputModal] = useState<'image' | 'video' | null>(null);
  const [mediaUrlInput, setMediaUrlInput] = useState('');

  // Trạng thái trả lời (Reply Threading)
  const [replyingToDiscussionId, setReplyingToDiscussionId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [replyAttachedImage, setReplyAttachedImage] = useState<string | null>(null);
  const [replyAttachedVideo, setReplyAttachedVideo] = useState<string | null>(null);
  const [showReplyEmoji, setShowReplyEmoji] = useState(false);

  // File Inputs ẩn
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const mainVideoInputRef = useRef<HTMLInputElement>(null);
  const replyImageInputRef = useRef<HTMLInputElement>(null);
  const replyVideoInputRef = useRef<HTMLInputElement>(null);

  // Lắng nghe phím Esc để đóng Lightbox hoặc Modal xác nhận xóa
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxMedia(null);
        setDeleteConfirmTarget(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 1. Tải danh sách bài học khi selectedLevel thay đổi
  useEffect(() => {
    let isMounted = true;
    const initialList = getInitialLessons(selectedLevel);
    setLessons(initialList);
    // Chỉ đổi bài học nếu bài hiện tại không thuộc cấp độ mới được chọn
    if (!initialList.some(l => l.id === selectedLessonId)) {
      if (initialList.length > 0) {
        setSelectedLessonId(initialList[0].id);
        try {
          localStorage.setItem(
            'grammar_last_active_lesson',
            JSON.stringify({
              lessonId: initialList[0].id,
              levelCode: selectedLevel,
              updatedAt: Date.now()
            })
          );
        } catch (e) { }
      }
    }

    async function loadLessons() {
      setLoadingLessons(true);
      try {
        const data = await grammarApi.getLessonsByLevel(selectedLevel);
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setLessons(data);
          // Chọn bài đầu tiên nếu bài hiện tại không thuộc level mới
          if (!data.some(l => l.id === selectedLessonId)) {
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
    return () => { isMounted = false; };
  }, [selectedLevel]);

  // 2. Tải chi tiết bài học & thảo luận khi selectedLessonId thay đổi (Tối ưu Song Song + SWR Cache 0ms)
  useEffect(() => {
    let isMounted = true;
    async function loadLessonDetail() {
      if (!selectedLessonId) return;

      // Reset quiz state khi đổi bài
      setMcqAnswers({});
      setStarSlots({});
      setQuizSubmitted(false);
      setQuizScore(null);
      setActiveTimestamp(null);

      // Đọc tiến độ xem đã lưu trong LocalStorage (nếu có)
      let localWatch: { timeSec: number; timeStr: string; updatedAt: number } | null = null;
      try {
        const raw = localStorage.getItem(`grammar_last_watch_${selectedLessonId}`);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed.timeSec === 'number' && parsed.timeSec >= 15) {
            localWatch = {
              timeSec: parsed.timeSec,
              timeStr: parsed.timeStr || formatTime(parsed.timeSec),
              updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : 0
            };
          }
        }
      } catch (e) { }

      // A. Phục hồi ngay lập tức từ bộ nhớ đệm Cache SWR (0ms phản hồi tức thì)
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
        let bestStr: string = '';

        const cachedSec = cached?.lastWatchSec && cached.lastWatchSec >= 15 ? cached.lastWatchSec : null;

        if (localWatch && cachedSec) {
          // Ưu tiên mốc thời gian xem tiến bộ hơn (lớn hơn) giữa local và cache
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
          const lessonTitle = cached?.titleVi || (grammarLessonsCatalog as any[]).find(l => l.id === selectedLessonId)?.titleVi || '';
          setResumePrompt({
            lessonId: selectedLessonId,
            timeSec: bestSec,
            timeStr: bestStr,
            lessonTitle
          });
        } else {
          setResumePrompt(null);
        }
      }

      // B. Tải SONG SONG cả 2 API qua mạng cùng lúc, không chờ nhau tuần tự
      const detailPromise = grammarApi.getLessonDetail(selectedLessonId)
        .then((detail) => {
          if (!isMounted || !detail || !detail.id) return;

          // Nếu server trả về mốc cũ hơn mốc local đã lưu (do người dùng vừa tua nhanh hoặc throttle chưa kịp gửi lên),
          // tự động đồng bộ mốc mới từ local lên server trong nền để dữ liệu hai bên khớp nhau!
          if (localWatch && localWatch.timeSec > (detail.lastWatchSec || 0)) {
            grammarApi.saveWatchProgress(selectedLessonId, localWatch.timeSec, localWatch.timeStr).catch(() => { });
            detail.lastWatchSec = localWatch.timeSec;
            detail.lastWatchTimeStr = localWatch.timeStr;
          }

          setLessonDetail(detail);
          detailCacheRef.current.set(selectedLessonId, detail);

          // QUY TẮC BẢO VỆ CHỐNG TRÙNG POP-UP:
          // Nếu bài học này ĐÃ được hiển thị hoặc người dùng đã bấm xem tiếp/đóng pop-up trước đó trong phiên này:
          // TUYỆT ĐỐI KHÔNG GHI ĐÈ hoặc bật lại pop-up lần 2!
          if (promptedLessonRef.current === selectedLessonId) {
            return;
          }

          // Trường hợp lần đầu vào bài (local & cache trước đó đều chưa có dữ liệu):
          if (detail.lastWatchSec && detail.lastWatchSec >= 15) {
            promptedLessonRef.current = selectedLessonId;
            setResumePrompt({
              lessonId: selectedLessonId,
              timeSec: detail.lastWatchSec,
              timeStr: detail.lastWatchTimeStr || formatTime(detail.lastWatchSec),
              lessonTitle: detail.titleVi
            });
            try {
              localStorage.setItem(
                `grammar_last_watch_${selectedLessonId}`,
                JSON.stringify({
                  timeSec: detail.lastWatchSec,
                  timeStr: detail.lastWatchTimeStr || formatTime(detail.lastWatchSec),
                  updatedAt: Date.now()
                })
              );
            } catch (e) { }
          }
        })
        .catch((err) => {
          console.warn('Không tải được chi tiết bài học từ API, dùng dữ liệu catalog local:', err);
        })
        .finally(() => {
          if (isMounted) setLoadingDetail(false);
        });

      const discussionPromise = grammarApi.getDiscussions(selectedLessonId)
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
    return () => { isMounted = false; };
  }, [selectedLessonId]);

  // Tìm bài học tương ứng trong catalog 131 bài
  const matchedCatalog = (grammarLessonsCatalog as any[]).find(l => l.id === selectedLessonId);
  const currentLesson: GrammarLessonDetailDto = (lessonDetail && lessonDetail.id === selectedLessonId)
    ? lessonDetail
    : (matchedCatalog as any || FALLBACK_N5_LESSON_1);

  // 1. Phân đoạn Mục lục thời gian YouTube Chapters (Bóc tách từ YouTube thực tế)
  const videoChapters: any[] = (grammarChaptersData as Record<string, any[]>)[currentLesson.videoId]
    || (currentLesson.timestamps && currentLesson.timestamps.length > 0 ? currentLesson.timestamps : []);

  // 2. Bài Test Kiến Thức 20 câu chuẩn module Kho Hán Tự (16 MCQ + 4 STAR, Đạt >= 85%)
  const fullQuizList: GrammarQuizItem[] = (currentLesson.quizzes && currentLesson.quizzes.length >= 20)
    ? currentLesson.quizzes
    : getQuizForLesson(currentLesson.lessonNumber, selectedLevel, currentLesson.titleVi);

  const mcqList: GrammarQuizItem[] = fullQuizList.filter(q => q.quizType === 'MCQ');
  const starList: GrammarQuizItem[] = fullQuizList.filter(q => q.quizType === 'STAR');

  // Trộn ngẫu nhiên (Fisher-Yates Shuffle) các đáp án A, B, C, D cho 16 câu trắc nghiệm MCQ
  // Giữ cố định trong suốt quá trình làm bài, chỉ xáo trộn lại khi đổi bài hoặc bấm "Làm lại bài test"
  useEffect(() => {
    if (!fullQuizList || fullQuizList.length === 0) return;
    const newMap: Record<number, string[]> = {};
    fullQuizList.forEach(q => {
      if (q.quizType === 'MCQ' && Array.isArray(q.options) && q.options.length > 0) {
        const copy = [...q.options];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        newMap[q.id] = copy;
      }
    });
    setShuffledOptionsMap(newMap);
  }, [currentLesson.id, currentLesson.quizzes, quizAttemptCount]);

  // Lắng nghe YouTube Iframe postMessage để tự động theo dõi tiến độ thời gian xem
  useEffect(() => {
    const iframe = document.getElementById('yt-lesson-player') as HTMLIFrameElement;
    if (!iframe) return;

    const interval = setInterval(() => {
      try {
        iframe.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 'yt-lesson-player' }), '*');
        iframe.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'getCurrentTime', args: [] }), '*');
      } catch (e) { }
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
      } catch (e) { }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      clearInterval(interval);
      window.removeEventListener('message', handleMessage);
    };
  }, [selectedLessonId, currentLesson.videoId]);

  // Tự động flush tiến độ xem lần cuối khi unmount trang hoặc chuyển bài
  useEffect(() => {
    return () => {
      const lastSec = currentWatchSecRef.current;
      if (selectedLessonId && lastSec >= 15) {
        grammarApi.saveWatchProgress(selectedLessonId, lastSec, formatTime(lastSec)).catch(() => { });
      }
    };
  }, [selectedLessonId]);

  // Mở Lightbox xem phóng to
  const handleOpenMedia = (media: LightboxMedia) => {
    setActiveLightboxMedia(media);
  };

  // Tua video theo timestamp & lưu tiến độ (Tối ưu phản hồi <10ms qua postMessage, không reload iframe)
  const handleJumpToTimestamp = (sec: number) => {
    setActiveTimestamp(sec);
    saveWatchProgress(currentLesson.id, sec, true); // forceSync = true để ghi nhận ngay lập tức lên server
    const iframe = document.getElementById('yt-lesson-player') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      try {
        // Gửi lệnh tua trực tiếp vào YouTube Player đang chạy (0ms giật lag, không tải lại trang video)
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'seekTo',
          args: [sec, true]
        }), '*');
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'playVideo',
          args: []
        }), '*');
        return;
      } catch (e) {
        console.warn('postMessage tua video thất bại, fallback reload:', e);
      }
    }
    // Fallback nếu iframe chưa gắn kết
    if (iframe) {
      iframe.src = `https://www.youtube.com/embed/${currentLesson.videoId}?start=${sec}&autoplay=1&enablejsapi=1`;
    }
  };

  // Tiếp tục xem từ đoạn đã lưu (Phản hồi tức thì 0ms, đóng pop-up ngay)
  const handleResumeWatching = (sec: number) => {
    if (selectedLessonId) {
      promptedLessonRef.current = selectedLessonId;
    }
    setResumePrompt(null);
    handleJumpToTimestamp(sec);
  };

  // Xem lại từ đầu (Phản hồi tức thì 0ms, đóng pop-up ngay)
  const handleRestartFromBeginning = () => {
    if (selectedLessonId) {
      promptedLessonRef.current = selectedLessonId;
      localStorage.removeItem(`grammar_last_watch_${selectedLessonId}`);
      if (detailCacheRef.current.has(selectedLessonId)) {
        const cached = detailCacheRef.current.get(selectedLessonId);
        if (cached) {
          cached.lastWatchSec = 0;
          cached.lastWatchTimeStr = "0:00";
        }
      }
      grammarApi.saveWatchProgress(selectedLessonId, 0, "0:00").catch(() => { });
    }
    setResumePrompt(null);
    handleJumpToTimestamp(0);
  };

  // Xử lý chọn mảnh từ ghép câu ngôi sao
  const handleSelectFragment = (qId: number, text: string) => {
    const current = starSlots[qId] || [null, null, null, null];
    const firstEmptyIndex = current.findIndex(slot => slot === null);
    if (firstEmptyIndex !== -1) {
      const nextSlots = [...current];
      nextSlots[firstEmptyIndex] = text;
      setStarSlots({ ...starSlots, [qId]: nextSlots });
    }
  };

  const handleRemoveSlot = (qId: number, index: number) => {
    const current = starSlots[qId] || [null, null, null, null];
    const nextSlots = [...current];
    nextSlots[index] = null;
    setStarSlots({ ...starSlots, [qId]: nextSlots });
  };

  const handleResetStar = (qId: number) => {
    setStarSlots({ ...starSlots, [qId]: [null, null, null, null] });
  };

  const handleResetTest = () => {
    setQuizSubmitted(false);
    setQuizScore(null);
    setMcqAnswers({});
    setStarSlots({});
    setQuizAttemptCount(c => c + 1); // Xáo trộn ngẫu nhiên thứ tự các đáp án cho lượt làm mới
  };

  // Xử lý Nộp Bài Test 20 Câu & Đánh Giá chuẩn >= 85%
  const handleSubmitFullQuiz = async () => {
    const answersPayload: Record<number, string> = { ...mcqAnswers };

    starList.forEach(q => {
      const slots = starSlots[q.id] || [];
      const starIdx = q.starIndex !== undefined && q.starIndex !== null ? q.starIndex : 0;
      const chosen = slots[starIdx];
      if (chosen) {
        answersPayload[q.id] = chosen;
      }
    });

    setIsSubmittingQuiz(true);
    try {
      const res = await grammarApi.submitQuiz(currentLesson.id, answersPayload);
      setQuizSubmitted(true);
      setQuizScore(res.score);

      if (res.passed) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });

        setLessons(prev => {
          const currentIdx = prev.findIndex(l => l.id === currentLesson.id);
          return prev.map((l, idx) => {
            if (l.id === currentLesson.id) {
              return { ...l, isPassed: true, highestScore: Math.max(l.highestScore || 0, res.score) };
            }
            if (idx === currentIdx + 1 || (res.nextLessonId && l.id === res.nextLessonId)) {
              return { ...l, isUnlocked: true };
            }
            return l;
          });
        });
      }
    } catch (err) {
      console.warn('Lỗi khi nộp bài qua API, chấm điểm cục bộ:', err);
      let correct = 0;
      const total = fullQuizList.length;
      fullQuizList.forEach(q => {
        if (q.quizType === 'MCQ') {
          if (mcqAnswers[q.id]?.trim() === q.correctAnswer?.trim()) correct++;
        } else if (q.quizType === 'STAR') {
          const slots = starSlots[q.id] || [];
          const starIdx = q.starIndex !== undefined && q.starIndex !== null ? q.starIndex : 0;
          if (slots[starIdx] === q.correctAnswer) correct++;
        }
      });

      const scoreCalc = total > 0 ? Math.round((correct / total) * 100) : 100;
      setQuizSubmitted(true);
      setQuizScore(scoreCalc);
      if (scoreCalc >= 85) {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
        setLessons(prev => {
          const currentIdx = prev.findIndex(l => l.id === currentLesson.id);
          return prev.map((l, idx) => {
            if (l.id === currentLesson.id) {
              return { ...l, isPassed: true, highestScore: Math.max(l.highestScore || 0, scoreCalc) };
            }
            if (idx === currentIdx + 1) {
              return { ...l, isUnlocked: true };
            }
            return l;
          });
        });
      }
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  const answeredCount = fullQuizList.reduce((acc, q) => {
    if (q.quizType === 'MCQ') {
      return acc + (mcqAnswers[q.id] ? 1 : 0);
    } else if (q.quizType === 'STAR') {
      const slots = starSlots[q.id] || [];
      return acc + (slots.filter(Boolean).length === 4 ? 1 : 0);
    }
    return acc;
  }, 0);

  const correctCount = fullQuizList.reduce((acc, q) => {
    if (q.quizType === 'MCQ') {
      return acc + (mcqAnswers[q.id]?.trim() === q.correctAnswer?.trim() ? 1 : 0);
    } else if (q.quizType === 'STAR') {
      const slots = starSlots[q.id] || [];
      const starIdx = q.starIndex !== undefined && q.starIndex !== null ? q.starIndex : 0;
      return acc + (slots[starIdx] === q.correctAnswer ? 1 : 0);
    }
    return acc;
  }, 0);

  const [isUploadingMedia, setIsUploadingMedia] = useState<boolean>(false);

  // Upload ảnh thảo luận từ máy tính lên Supabase Storage CDN
  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview tức thì cho trải nghiệm mượt mà
    const localUrl = URL.createObjectURL(file);
    setAttachedImage(localUrl);

    setIsUploadingMedia(true);
    try {
      const res = await grammarApi.uploadDiscussionMedia(file);
      if (res && res.url) {
        setAttachedImage(res.url);
      }
    } catch (err) {
      console.warn('Upload ảnh lên Supabase thất bại, sử dụng preview:', err);
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleMainVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setAttachedVideo(localUrl);
    }
  };

  const handleReplyImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setReplyAttachedImage(localUrl);

    setIsUploadingMedia(true);
    try {
      const res = await grammarApi.uploadDiscussionMedia(file);
      if (res && res.url) {
        setReplyAttachedImage(res.url);
      }
    } catch (err) {
      console.warn('Upload ảnh reply lên Supabase thất bại, sử dụng preview:', err);
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleReplyVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setReplyAttachedVideo(localUrl);
    }
  };

  // Mở popup xác nhận xóa comment chuẩn giao diện NipponMaster (thay cho window.confirm mặc định của trình duyệt)
  const handleRequestDeleteDiscussion = (discussionId: number, isReply: boolean = false, parentId?: number) => {
    setDeleteConfirmTarget({ discussionId, isReply, parentId });
  };

  // Thực thi xóa comment khi học viên xác nhận trên Modal NipponMaster
  const executeDeleteDiscussion = async () => {
    if (!deleteConfirmTarget) return;
    const { discussionId, isReply, parentId } = deleteConfirmTarget;
    setIsDeletingComment(true);

    try {
      await grammarApi.deleteDiscussion(discussionId);
      if (isReply && parentId) {
        setDiscussions(prev => {
          const updated = prev.map(d => {
            if (d.id === parentId) {
              return {
                ...d,
                replies: (d.replies || []).filter(r => r.id !== discussionId)
              };
            }
            return d;
          });
          discussionCacheRef.current.set(currentLesson.id, updated);
          return updated;
        });
      } else {
        setDiscussions(prev => {
          const updated = prev.filter(d => d.id !== discussionId);
          discussionCacheRef.current.set(currentLesson.id, updated);
          return updated;
        });
      }
    } catch (err) {
      console.warn('Lỗi khi gọi API xóa thảo luận, xóa cục bộ giao diện:', err);
      if (isReply && parentId) {
        setDiscussions(prev => {
          const updated = prev.map(d => {
            if (d.id === parentId) {
              return {
                ...d,
                replies: (d.replies || []).filter(r => r.id !== discussionId)
              };
            }
            return d;
          });
          discussionCacheRef.current.set(currentLesson.id, updated);
          return updated;
        });
      } else {
        setDiscussions(prev => {
          const updated = prev.filter(d => d.id !== discussionId);
          discussionCacheRef.current.set(currentLesson.id, updated);
          return updated;
        });
      }
    } finally {
      setIsDeletingComment(false);
      setDeleteConfirmTarget(null);
    }
  };

  const handleAttachMediaUrl = () => {
    if (!mediaUrlInput.trim()) return;
    if (showUrlInputModal === 'image') {
      setAttachedImage(mediaUrlInput.trim());
    } else if (showUrlInputModal === 'video') {
      setAttachedVideo(mediaUrlInput.trim());
    }
    setShowUrlInputModal(null);
    setMediaUrlInput('');
  };

  // Đăng câu hỏi thảo luận mới
  const handlePostQuestion = async () => {
    if (!questionText.trim() && !attachedImage && !attachedVideo) return;

    try {
      const created = await grammarApi.createDiscussion(currentLesson.id, {
        content: questionText.trim(),
        imageUrl: attachedImage || undefined,
        videoUrl: attachedVideo || undefined
      });
      if (created && !created.authorLevel) {
        created.authorLevel = currentUserLevel;
      }
      setDiscussions(prev => {
        const updated = [created, ...prev];
        discussionCacheRef.current.set(currentLesson.id, updated);
        return updated;
      });
    } catch (err) {
      console.warn('Lỗi đăng thảo luận API, fallback cục bộ:', err);
      const newDiscussion: GrammarDiscussionDto = {
        id: Date.now(),
        authorName: currentAuthorName,
        authorLevel: currentUserLevel,
        avatarLetter: currentAuthorName.charAt(0).toUpperCase() || 'U',
        avatarBg: isTeacher ? 'bg-[#b91c1c]' : 'bg-blue-600',
        role: currentUserRole,
        isSensei: isTeacher,
        timeAgo: 'Vừa xong',
        content: questionText.trim(),
        imageUrl: attachedImage || undefined,
        videoUrl: attachedVideo || undefined,
        helpfulCount: 0,
        replies: []
      };
      setDiscussions(prev => {
        const updated = [newDiscussion, ...prev];
        discussionCacheRef.current.set(currentLesson.id, updated);
        return updated;
      });
    }

    setQuestionText('');
    setAttachedImage(null);
    setAttachedVideo(null);
    setShowEmojiPicker(false);
  };

  // Đăng câu trả lời cho một chủ đề
  const handlePostReply = async (discussionId: number) => {
    if (!replyText.trim() && !replyAttachedImage && !replyAttachedVideo) return;

    try {
      const replyCreated = await grammarApi.createDiscussion(currentLesson.id, {
        content: replyText.trim(),
        imageUrl: replyAttachedImage || undefined,
        videoUrl: replyAttachedVideo || undefined,
        replyToId: discussionId
      });
      if (replyCreated && !replyCreated.authorLevel) {
        replyCreated.authorLevel = currentUserLevel;
      }
      setDiscussions(prev => {
        const updated = prev.map(d => {
          if (d.id === discussionId) {
            return {
              ...d,
              replies: [...(d.replies || []), replyCreated]
            };
          }
          return d;
        });
        discussionCacheRef.current.set(currentLesson.id, updated);
        return updated;
      });
    } catch (err) {
      console.warn('Lỗi đăng phản hồi API, fallback cục bộ:', err);
      const newReply: GrammarDiscussionDto = {
        id: Date.now(),
        authorName: currentAuthorName,
        authorLevel: currentUserLevel,
        avatarLetter: currentAuthorName.charAt(0).toUpperCase() || 'U',
        avatarBg: isTeacher ? 'bg-[#b91c1c]' : 'bg-emerald-600',
        role: currentUserRole,
        isSensei: isTeacher,
        timeAgo: 'Vừa xong',
        content: replyText.trim(),
        imageUrl: replyAttachedImage || undefined,
        videoUrl: replyAttachedVideo || undefined,
        helpfulCount: 0,
        replies: []
      };
      setDiscussions(prev => {
        const updated = prev.map(d => {
          if (d.id === discussionId) {
            return {
              ...d,
              replies: [...(d.replies || []), newReply]
            };
          }
          return d;
        });
        discussionCacheRef.current.set(currentLesson.id, updated);
        return updated;
      });
    }

    setReplyText('');
    setReplyAttachedImage(null);
    setReplyAttachedVideo(null);
    setReplyingToDiscussionId(null);
    setShowReplyEmoji(false);
  };

  // Thả tim hữu ích
  const handleLikeDiscussion = async (id: number) => {
    try {
      await grammarApi.toggleHelpful(id);
    } catch (err) {
      // ignore
    }
    setDiscussions(prev => prev.map(d => d.id === id ? { ...d, helpfulCount: d.helpfulCount + 1 } : d));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Inputs ẩn để chọn file từ máy */}
      <input type="file" ref={mainImageInputRef} accept="image/*" onChange={handleMainImageChange} className="hidden" />
      <input type="file" ref={mainVideoInputRef} accept="video/*" onChange={handleMainVideoChange} className="hidden" />
      <input type="file" ref={replyImageInputRef} accept="image/*" onChange={handleReplyImageChange} className="hidden" />
      <input type="file" ref={replyVideoInputRef} accept="video/*" onChange={handleReplyVideoChange} className="hidden" />

      {/* ════════ HEADER TRANG & BỘ CHỌN CẤP ĐỘ N5 ~ N1 ════════ */}
      <div className="border-b border-[#e7e5e4] pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-[#1c1917] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
              KHÓA HỌC CHUẨN JLPT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] tracking-tight">
            Phòng Học Ngữ Pháp Qua Video Bài Giảng
          </h1>
        </div>

        {/* Nút bấm chuyển cấp độ N5 ~ N1 (Phân quyền theo cấp bậc tài khoản thực tế) */}
        <div className="flex items-center gap-1 bg-[#f5f5f4] p-1 border border-[#e7e5e4]">
          {(['N5', 'N4', 'N3', 'N2', 'N1'] as JlptLevel[]).map((lvl) => {
            const isSelected = selectedLevel === lvl;
            const hasAccess = canAccessLevel(lvl);

            return (
              <button
                key={lvl}
                onClick={() => {
                  if (hasAccess) {
                    setSelectedLevel(lvl);
                    setLockedNotice(null);
                  } else {
                    setLockedNotice(
                      `Cấp độ ${lvl} hiện đang bị khóa. Tài khoản của bạn hiện ở cấp độ ${currentUserLevel} (được học từ N5 đến ${currentUserLevel}). Hãy vượt qua kỳ thi JLPT ${currentUserLevel} hoặc nâng cấp tài khoản để mở khóa giáo trình ${lvl}!`
                    );
                  }
                }}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${isSelected
                    ? 'bg-[#b91c1c] text-white shadow-2xs'
                    : hasAccess
                      ? 'text-[#57534e] hover:text-[#1c1917] hover:bg-white'
                      : 'text-[#a8a29e] hover:bg-red-50/50'
                  }`}
                title={hasAccess ? `Xem giáo trình JLPT ${lvl}` : `Khóa: Cần tài khoản JLPT ${lvl} trở lên`}
              >
                {!hasAccess && <Lock className="w-3 h-3 text-[#a8a29e]" />}
                <span>{lvl}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thông báo khóa cấp độ trang nhã */}
      {lockedNotice && (
        <div className="p-3 bg-[#fef2f2] border border-[#fecaca] text-xs text-[#991b1b] flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#b91c1c] shrink-0" />
            <span>{lockedNotice}</span>
          </div>
          <button
            onClick={() => setLockedNotice(null)}
            className="text-[#991b1b] hover:text-black font-mono font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ════════ LAYOUT 2 CỘT CHÍNH ════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CỘT TRÁI (8/12): PLAYER VIDEO + 3 TABS NỘI DUNG */}
        <div className="lg:col-span-8 space-y-4">
          {/* Tiêu đề bài học */}
          <div className="bg-white border border-[#e7e5e4] p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#78716c] font-mono mb-1">
              <span className="font-bold text-[#b91c1c]">
                BÀI {currentLesson.lessonNumber} • {selectedLevel}
              </span>
              <span>⏱️ {currentLesson.durationStr}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1c1917] leading-snug">
              {currentLesson.titleVi}
            </h2>
            <p className="text-xs font-serif text-[#78716c] mt-0.5">
              {currentLesson.titleJa}
            </p>
          </div>

          {/* TRÌNH PHÁT VIDEO BÀI GIẢNG YOUTUBE */}
          <div className="bg-[#0c0a09] border border-[#292524] shadow-lg overflow-hidden relative group">
            <div className="aspect-video w-full bg-black relative">
              {/* Pop-up tiếp tục bài giảng tại mốc thời gian xem lần cuối */}
              {resumePrompt && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-xs z-30 flex items-center justify-center p-4 animate-in fade-in duration-200">
                  <div className="bg-white border-2 border-[#1c1917] p-5 max-w-md w-full shadow-2xl relative text-left">
                    <button
                      onClick={() => {
                        if (selectedLessonId) {
                          promptedLessonRef.current = selectedLessonId;
                        }
                        setResumePrompt(null);
                      }}
                      className="absolute top-3 right-3 text-[#78716c] hover:text-[#1c1917] p-1 transition-colors"
                      title="Đóng"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-start gap-3.5 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#fef2f2] border border-[#fecaca] flex items-center justify-center shrink-0">
                        <History className="w-5 h-5 text-[#b91c1c]" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-base text-[#1c1917]">
                          Tiếp tục bài giảng Bài {currentLesson.sortOrder}
                        </h3>
                        <p className="text-xs text-[#57534e] mt-1.5 leading-relaxed">
                          Lần cuối bạn xem bài <strong className="text-[#1c1917] font-semibold">{currentLesson.titleVi}</strong> là ở đoạn <strong className="font-mono text-[#b91c1c] font-bold text-sm bg-[#fef2f2] px-1.5 py-0.5 border border-[#fecaca]">{resumePrompt.timeStr}</strong>. Bạn có muốn tiếp tục xem không?
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#e7e5e4]">
                      <button
                        onClick={handleRestartFromBeginning}
                        className="px-3.5 py-2 text-xs font-mono font-medium border border-[#d6d3d1] hover:bg-[#f5f5f4] text-[#57534e] transition-colors flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Xem lại từ đầu</span>
                      </button>
                      <button
                        onClick={() => handleResumeWatching(resumePrompt.timeSec)}
                        className="px-4 py-2 text-xs font-mono font-bold bg-[#b91c1c] hover:bg-[#991b1b] text-white shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Tiếp tục xem ({resumePrompt.timeStr})</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {loadingDetail && !currentLesson.videoId ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-2">
                  <Loader2 className="w-8 h-8 animate-spin text-[#b91c1c]" />
                  <span className="text-xs font-mono">Đang tải video bài giảng...</span>
                </div>
              ) : (
                <iframe
                  key={`yt-${currentLesson.id}-${currentLesson.videoId}`}
                  id="yt-lesson-player"
                  src={`https://www.youtube.com/embed/${currentLesson.videoId}?enablejsapi=1&autoplay=1`}
                  title={currentLesson.titleVi || "Japanese Grammar Video Lecture"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>
          </div>

          {/* INTERACTIVE TIMESTAMPS BAR (TUA VIDEO THEO PHÂN ĐOẠN YOUTUBE) */}
          {videoChapters && videoChapters.length > 0 && (
            <div className="bg-white border border-[#e7e5e4] p-3.5 shadow-xs">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#b91c1c]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1c1917]">
                    Mục lục thời gian:
                  </span>
                </div>
                <span className="text-[11px] text-[#a8a29e] hidden sm:inline">
                  {videoChapters.length} phân đoạn bài giảng • Bấm để tua nhanh đến phần học
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {videoChapters.map((ts, idx) => {
                  const isActive = activeTimestamp === ts.timeSec;
                  return (
                    <button
                      key={ts.id || idx}
                      onClick={() => handleJumpToTimestamp(ts.timeSec)}
                      className={`px-3 py-2 text-left border transition-all flex-shrink-0 min-w-[170px] max-w-[240px] ${isActive
                          ? 'bg-[#fef2f2] border-[#b91c1c] shadow-xs'
                          : 'bg-[#fafaf9] border-[#e7e5e4] hover:border-[#a8a29e]'
                        }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="px-1.5 py-0.5 bg-[#1c1917] text-white font-bold">
                          {ts.timeStr}
                        </span>
                        {isActive && <span className="text-[#b91c1c] text-[10px] font-bold">Đang phát 🟢</span>}
                      </div>
                      <div className="font-serif font-bold text-xs text-[#1c1917] mt-1 truncate" title={ts.title}>
                        {ts.title}
                      </div>
                      {ts.pattern && ts.pattern !== ts.title && (
                        <div className="text-[10px] text-[#78716c] truncate mt-0.5">
                          {ts.pattern}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 📑 HỆ THỐNG 3 TABS HỌC TẬP TRỌNG TÂM */}
          <div className="bg-white border border-[#e7e5e4] shadow-xs overflow-hidden">
            {/* Thanh chọn Tab */}
            <div className="flex border-b border-[#e7e5e4] bg-[#fafaf9] overflow-x-auto">
              <button
                onClick={() => setActiveTab('cheatsheet')}
                className={`px-5 py-3 text-xs font-mono font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${activeTab === 'cheatsheet'
                    ? 'border-[#b91c1c] text-[#b91c1c] bg-white'
                    : 'border-transparent text-[#78716c] hover:text-[#1c1917]'
                  }`}
              >
                <FileText className="w-4 h-4" />
                <span>1. Bảng Tóm Tắt Công Thức</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-5 py-3 text-xs font-mono font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${activeTab === 'quiz'
                    ? 'border-[#b91c1c] text-[#b91c1c] bg-white'
                    : 'border-transparent text-[#78716c] hover:text-[#1c1917]'
                  }`}
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>2. Bài Test Kiến Thức</span>
                {quizSubmitted && quizScore !== null && (
                  <span className={`px-1.5 py-0.2 text-[10px] ${quizScore >= 85 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {quizScore}%
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('discussion')}
                className={`px-5 py-3 text-xs font-mono font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${activeTab === 'discussion'
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
              {/* TAB 1: BẢNG CÔNG THỨC CHEATSHEET */}
              {activeTab === 'cheatsheet' && (
                <div className="space-y-6">
                  {currentLesson.cheatsheets && currentLesson.cheatsheets.length > 0 ? (
                    <div className="space-y-4">
                      {currentLesson.cheatsheets.map((item, idx) => (
                        <div key={item.id} className="p-4 border border-[#e7e5e4] bg-[#fafaf9] hover:bg-white transition-colors">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#1c1917] text-white flex items-center justify-center text-xs font-mono font-bold">
                                {idx + 1}
                              </span>
                              <span className="text-base font-serif font-bold text-[#b91c1c]">
                                {item.pattern}
                              </span>
                            </div>
                            {item.badge && (
                              <span className="px-2 py-0.5 text-xs font-mono font-bold bg-[#f5f5f4] text-[#44403c] border border-[#e7e5e4]">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs my-2.5">
                            <div className="p-2.5 bg-white border border-[#e7e5e4]">
                              <span className="text-[#a8a29e] font-mono uppercase block text-[10px] font-bold">Ý NGHĨA:</span>
                              <span className="font-semibold text-[#1c1917] text-sm">{item.meaning}</span>
                            </div>
                            <div className="p-2.5 bg-white border border-[#e7e5e4]">
                              <span className="text-[#a8a29e] font-mono uppercase block text-[10px] font-bold">CẤU TRÚC KẾT HỢP:</span>
                              <span className="font-mono text-[#b91c1c] font-bold">{item.structure}</span>
                            </div>
                          </div>

                          {item.nuance && (
                            <div className="text-xs text-[#44403c] bg-[#f5f5f4] p-3 border border-[#e7e5e4] mb-3 leading-relaxed">
                              <span className="font-bold text-[#1c1917]">💡 Sắc thái & Lưu ý: </span>
                              {item.nuance}
                            </div>
                          )}

                          {item.examples && Array.isArray(item.examples) && item.examples.length > 0 && (
                            <div className="space-y-1.5">
                              <span className="text-[11px] font-mono font-bold text-[#78716c] uppercase">VÍ DỤ TIÊU BIỂU:</span>
                              {item.examples.map((ex: any, exIdx: number) => (
                                <div key={exIdx} className="p-2.5 bg-white border border-[#e7e5e4] text-xs flex flex-col gap-0.5">
                                  <span className="font-serif font-bold text-sm text-[#1c1917]">{ex.ja}</span>
                                  <span className="text-[#78716c]">{ex.vi}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-[#78716c] border border-dashed border-[#d6d3d1] bg-[#fafaf9]">
                      📖 Bảng tóm tắt công thức cho bài học này đang được Sensei cập nhật chi tiết. Hãy theo dõi bài giảng video phía trên và thảo luận cùng các bạn học tại tab Hỏi Đáp nhé!
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: BÀI TEST KIẾN THỨC (20 CÂU - CHUẨN KHO HÁN TỰ - ĐẠT >= 85%) */}
              {activeTab === 'quiz' && (
                <div className="space-y-6">
                  {/* Thanh điều hướng & Tiến độ bài kiểm tra */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white border border-[#e7e5e4] shadow-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#b91c1c] bg-[#fef2f2] px-2 py-0.5 border border-[#fecaca]">
                          BÀI TEST KIẾN THỨC
                        </span>
                        <span className="text-xs font-serif font-bold text-[#1c1917]">
                          20 Câu hỏi tổng hợp
                        </span>
                      </div>
                      <div className="text-xs text-[#78716c] mt-1 flex flex-wrap items-center gap-3">
                        <span>Đã làm: <strong className="text-[#1c1917] font-mono font-bold">{answeredCount}/20</strong> câu</span>
                        <span>•</span>
                        <span>Chuẩn đạt: <strong className="text-[#b91c1c] font-bold">≥ 85%</strong> (tối thiểu 17/20 câu đúng)</span>
                      </div>
                    </div>

                    {/* Quick Nav Bubbles 1..20 */}
                    <div className="flex flex-wrap items-center gap-1 max-w-full sm:max-w-md">
                      {fullQuizList.map((q, idx) => {
                        const isAnswered = q.quizType === 'MCQ'
                          ? !!mcqAnswers[q.id]
                          : ((starSlots[q.id] || []).filter(Boolean).length === 4);
                        let btnBg = isAnswered
                          ? 'bg-[#1c1917] text-white border-[#1c1917]'
                          : 'bg-[#fafaf9] text-[#78716c] border-[#e7e5e4] hover:border-[#1c1917]';

                        if (quizSubmitted) {
                          const isCorrect = q.quizType === 'MCQ'
                            ? mcqAnswers[q.id]?.trim() === q.correctAnswer?.trim()
                            : ((starSlots[q.id] || [])[q.starIndex ?? 0] === q.correctAnswer);
                          btnBg = isCorrect ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-400 text-red-800';
                        }

                        return (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => {
                              const el = document.getElementById(`quiz-question-${q.id}`);
                              el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                            className={`w-6 h-6 text-[10px] font-mono font-bold border flex items-center justify-center transition-colors cursor-pointer ${btnBg}`}
                            title={`Câu ${idx + 1}`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Kết quả sau khi nộp bài */}
                  {quizSubmitted && quizScore !== null && (
                    <div
                      className={`p-5 border transition-all ${quizScore >= 85
                          ? 'bg-[#f0fdf4] border-[#86efac] text-[#166534]'
                          : 'bg-[#fef2f2] border-[#fca5a5] text-[#991b1b]'
                        }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          {quizScore >= 85 ? (
                            <CheckCircle2 className="w-8 h-8 text-[#166534] flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-8 h-8 text-[#991b1b] flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="font-bold text-base font-serif">
                              {quizScore >= 85
                                ? '🎉 XUẤT SẮC! BẠN ĐÃ VƯỢT QUA BÀI TEST KIẾN THỨC!'
                                : '⚠️ CHƯA ĐẠT CHUẨN MỞ KHÓA!'}
                            </div>
                            <div className="text-xs mt-1 text-[#44403c] leading-relaxed">
                              {quizScore >= 85
                                ? `Chúc mừng bạn đã đạt ${quizScore}% (${correctCount}/20 câu đúng), vượt qua chuẩn quy định (≥ 85%). Bài học tiếp theo đã được mở khóa!`
                                : `Bạn đạt ${quizScore}% (${correctCount}/20 câu đúng). Cần đạt tối thiểu 85% (tức từ 17/20 câu đúng trở lên) để mở khóa bài học kế tiếp. Hãy xem lại phần giải thích bên dưới và thử lại nhé!`}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right font-mono">
                            <div className="text-2xl font-bold">{quizScore}%</div>
                            <div className="text-[11px] text-[#78716c]">{correctCount}/20 câu đúng</div>
                          </div>
                          <button
                            onClick={handleResetTest}
                            className="px-4 py-2 bg-white border border-[#d6d3d1] text-[#1c1917] hover:bg-[#fafaf9] text-xs font-mono font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Làm lại 🔄</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Danh sách 20 Câu Hỏi (16 MCQ + 4 STAR) */}
                  <div className="space-y-6">
                    {/* PHẦN 1: 16 CÂU TRẮC NGHIỆM MCQ */}
                    {mcqList.length > 0 && (
                      <div className="space-y-4">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#78716c] border-b pb-1 flex items-center justify-between">
                          <span>PHẦN 1: TRẮC NGHIỆM TRỌNG TÂM NGỮ PHÁP ({mcqList.length} CÂU)</span>
                          <span className="text-[11px] font-normal text-[#a8a29e]">Chọn 1 đáp án chính xác nhất</span>
                        </div>

                        {mcqList.map((q, idx) => {
                          const isThisCorrect = mcqAnswers[q.id]?.trim() === q.correctAnswer?.trim();

                          return (
                            <div
                              key={q.id}
                              id={`quiz-question-${q.id}`}
                              className="p-4 border border-[#e7e5e4] bg-[#fafaf9] transition-all"
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="text-xs font-mono font-bold text-[#b91c1c]">
                                  CÂU {idx + 1} / 20:
                                </div>
                                {quizSubmitted && (
                                  <span
                                    className={`text-[11px] font-mono font-bold px-2 py-0.5 border ${isThisCorrect
                                        ? 'bg-green-100 border-green-300 text-green-800'
                                        : 'bg-red-100 border-red-300 text-red-800'
                                      }`}
                                  >
                                    {isThisCorrect ? '✓ Đúng' : '✕ Sai'}
                                  </span>
                                )}
                              </div>

                              <div className="text-sm font-serif font-bold text-[#1c1917] mb-3 leading-relaxed">
                                {q.prompt}
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {(shuffledOptionsMap[q.id] || (Array.isArray(q.options) ? q.options : [])).map((opt, optIdx) => {
                                  const isSelected = mcqAnswers[q.id] === opt;
                                  const isOptCorrect = opt === q.correctAnswer;
                                  const OPTION_LABELS = ['A', 'B', 'C', 'D'];
                                  let btnStyle = 'bg-white border-[#d6d3d1] hover:border-[#1c1917] text-[#1c1917]';

                                  if (quizSubmitted) {
                                    if (isOptCorrect) {
                                      btnStyle = 'bg-green-50 border-green-500 text-green-800 font-bold';
                                    } else if (isSelected) {
                                      btnStyle = 'bg-red-50 border-red-400 text-red-800 line-through';
                                    }
                                  } else if (isSelected) {
                                    btnStyle = 'bg-[#1c1917] text-white border-[#1c1917] font-bold shadow-2xs';
                                  }

                                  return (
                                    <button
                                      key={`${q.id}-${opt}-${optIdx}`}
                                      disabled={quizSubmitted}
                                      onClick={() => setMcqAnswers({ ...mcqAnswers, [q.id]: opt })}
                                      className={`px-3 py-2.5 text-xs font-serif border transition-all text-left flex items-center justify-between cursor-pointer ${btnStyle}`}
                                    >
                                      <div className="flex items-center gap-2.5 min-w-0">
                                        <span
                                          className={`w-5 h-5 rounded-full border text-[10px] font-mono font-bold flex items-center justify-center shrink-0 ${
                                            isSelected
                                              ? (quizSubmitted
                                                  ? (isOptCorrect ? 'border-green-600 bg-green-200 text-green-900' : 'border-red-500 bg-red-200 text-red-900')
                                                  : 'border-white bg-white/20 text-white')
                                              : (quizSubmitted && isOptCorrect
                                                  ? 'border-green-600 bg-green-200 text-green-900'
                                                  : 'border-[#d6d3d1] bg-[#f5f5f4] text-[#57534e]')
                                          }`}
                                        >
                                          {OPTION_LABELS[optIdx] || (optIdx + 1)}
                                        </span>
                                        <span className="leading-snug">{opt}</span>
                                      </div>
                                      {quizSubmitted && isOptCorrect && (
                                        <span className="text-green-600 font-bold text-xs shrink-0 ml-1">✓ Đúng</span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>

                              {quizSubmitted && q.explanation && (
                                <div className="mt-3 text-xs text-[#57534e] bg-white p-3 border border-[#e7e5e4] leading-relaxed">
                                  💡 <strong className="font-bold text-[#1c1917]">Giải thích:</strong> {q.explanation}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* PHẦN 2: 4 CÂU HỎI NGÔI SAO JLPT */}
                    {starList.length > 0 && (
                      <div className="space-y-4 pt-3">
                        <div className="flex items-center justify-between border-b pb-1">
                          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#b91c1c] flex items-center gap-1.5">
                            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                            <span>PHẦN 2: BÀI TẬP DẤU SAO JLPT ⭐ ({starList.length} CÂU)</span>
                          </div>
                          <span className="text-[11px] text-[#78716c]">Tìm từ chính xác ở vị trí [★]</span>
                        </div>

                        {starList.map((sq, sIdx) => {
                          const currentSlots = starSlots[sq.id] || [null, null, null, null];
                          const starIdx = sq.starIndex !== undefined && sq.starIndex !== null ? sq.starIndex : 0;
                          const isCorrect = currentSlots[starIdx] === sq.correctAnswer;

                          return (
                            <div
                              key={sq.id}
                              id={`quiz-question-${sq.id}`}
                              className="p-5 border-2 border-dashed border-[#d6d3d1] bg-[#fafaf9] space-y-4"
                            >
                              <div className="flex items-center justify-between border-b pb-1">
                                <div className="text-xs font-mono font-bold text-[#b91c1c] flex items-center gap-1.5">
                                  <span>CÂU {mcqList.length + sIdx + 1} / 20:</span>
                                </div>
                                {quizSubmitted && (
                                  <span
                                    className={`text-[11px] font-mono font-bold px-2 py-0.5 border ${isCorrect
                                        ? 'bg-green-100 border-green-300 text-green-800'
                                        : 'bg-red-100 border-red-300 text-red-800'
                                      }`}
                                  >
                                    {isCorrect ? '✓ Đúng vị trí ★' : '✕ Sai'}
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-[#57534e]">
                                {sq.prompt}
                              </p>

                              {/* 4 ô xếp mảnh từ */}
                              <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-[#e7e5e4] text-sm">
                                {sq.leftSentence && (
                                  <span className="font-serif font-bold text-[#1c1917]">{sq.leftSentence}</span>
                                )}

                                {[0, 1, 2, 3].map((slotIdx) => {
                                  const val = currentSlots[slotIdx];
                                  const isStar = slotIdx === starIdx;

                                  return (
                                    <div
                                      key={slotIdx}
                                      onClick={() => !quizSubmitted && val && handleRemoveSlot(sq.id, slotIdx)}
                                      className={`min-w-[70px] h-9 px-2.5 border-2 flex items-center justify-center font-serif font-bold text-xs cursor-pointer transition-all ${val
                                          ? isStar
                                            ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-xs'
                                            : 'bg-white border-[#1c1917] text-[#1c1917]'
                                          : isStar
                                            ? 'bg-amber-50/50 border-dashed border-amber-400 text-amber-600'
                                            : 'bg-[#f5f5f4] border-dashed border-[#d6d3d1] text-[#a8a29e]'
                                        }`}
                                    >
                                      {val ? (
                                        <span className="flex items-center gap-1">
                                          {isStar && <span className="text-amber-500">★</span>}
                                          {val}
                                        </span>
                                      ) : (
                                        <span className="text-[11px] font-mono">
                                          {isStar ? '★ (Vị trí sao)' : `[ ${slotIdx + 1} ]`}
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}

                                {sq.rightSentence && (
                                  <span className="font-serif font-bold text-[#1c1917]">{sq.rightSentence}</span>
                                )}
                              </div>

                              {/* Danh sách mảnh từ */}
                              <div className="space-y-1.5">
                                <span className="text-[11px] font-mono text-[#78716c]">
                                  Bấm vào từng mảnh từ dưới đây để xếp vào ô trống:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {(sq.fragments || []).map((frag: any, fIdx: number) => {
                                    const isPlaced = currentSlots.includes(frag.text);
                                    return (
                                      <button
                                        key={frag.id || fIdx}
                                        disabled={isPlaced || quizSubmitted}
                                        onClick={() => handleSelectFragment(sq.id, frag.text)}
                                        className={`px-3 py-1.5 text-xs font-serif font-bold border transition-all ${isPlaced
                                            ? 'bg-[#f5f5f4] text-[#a8a29e] border-[#e7e5e4] cursor-not-allowed line-through'
                                            : 'bg-white text-[#1c1917] border-[#d6d3d1] hover:border-[#b91c1c] hover:text-[#b91c1c] shadow-2xs cursor-pointer'
                                          }`}
                                      >
                                        {fIdx + 1}. {frag.text}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-1">
                                <button
                                  disabled={quizSubmitted}
                                  onClick={() => handleResetStar(sq.id)}
                                  className="text-xs text-[#78716c] hover:text-[#1c1917] underline font-mono disabled:opacity-50 cursor-pointer"
                                >
                                  Xếp lại câu này
                                </button>
                              </div>

                              {quizSubmitted && sq.explanation && (
                                <div className="mt-2 text-xs text-[#57534e] bg-white p-3 border border-[#e7e5e4] leading-relaxed">
                                  💡 <strong className="font-bold text-[#1c1917]">Giải thích:</strong> {sq.explanation}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Nút Nộp Bài Chung 20 Câu */}
                  {!quizSubmitted && (
                    <div className="pt-4 border-t border-[#e7e5e4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-xs font-mono text-[#78716c]">
                        {answeredCount < 20
                          ? `⚠️ Bạn đã hoàn thành ${answeredCount}/20 câu. Hãy làm đủ 20 câu để đạt kết quả tốt nhất!`
                          : `✓ Đã làm xong 20/20 câu. Bấm nộp bài để xem điểm số & kiểm tra điều kiện ≥ 85%!`}
                      </div>
                      <button
                        disabled={isSubmittingQuiz || answeredCount === 0}
                        onClick={handleSubmitFullQuiz}
                        className="px-6 py-2.5 bg-[#b91c1c] text-white text-xs font-mono font-bold hover:bg-[#991b1b] transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shrink-0"
                      >
                        {isSubmittingQuiz ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <span>Nộp Bài Test Kiến Thức (20 Câu) 📝</span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: HỎI ĐÁP & THẢO LUẬN */}
              {activeTab === 'discussion' && (
                <div className="space-y-6">
                  {/* Khung soạn câu hỏi */}
                  <div className="p-4 bg-white border border-[#e7e5e4] shadow-xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f5f5f4] pb-2">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#1c1917] flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#b91c1c]" />
                        <span>Đặt câu hỏi hoặc thảo luận về bài học:</span>
                      </div>

                      <div className="text-xs font-mono text-[#78716c] flex items-center gap-1.5">
                        <span>Đang đăng với tư cách:</span>
                        <strong className="text-[#1c1917]">{currentAuthorName}</strong>
                        {isTeacher ? (
                          <span className="px-1.5 py-0.2 bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca] text-[10px] font-bold">
                            Giảng viên
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 bg-[#f5f5f4] text-[#78716c] text-[10px] border border-[#e7e5e4]">
                            Học viên
                          </span>
                        )}
                        <span className="px-1.5 py-0.2 bg-[#fafaf9] text-[#b91c1c] border border-[#e7e5e4] text-[10px] font-bold">
                          {currentUserLevel}
                        </span>
                      </div>
                    </div>

                    <textarea
                      rows={3}
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="Nhập nội dung câu hỏi hoặc chia sẻ thắc mắc... (Bạn có thể chọn ảnh/video từ máy tính của bạn hoặc chèn icon bên dưới)"
                      className="w-full text-xs p-3 border border-[#d6d3d1] bg-[#fafaf9] focus:bg-white focus:outline-none focus:border-[#b91c1c] font-sans"
                    />

                    {/* Xem trước Media đính kèm */}
                    {(attachedImage || attachedVideo) && (
                      <div className="flex flex-wrap items-center gap-3 p-2.5 bg-[#f5f5f4] border border-[#e7e5e4]">
                        {attachedImage && (
                          <div className="relative group inline-block">
                            <div
                              onClick={() => handleOpenMedia({ type: 'image', url: attachedImage })}
                              className="cursor-pointer overflow-hidden rounded-xs border border-[#d6d3d1] shadow-2xs hover:opacity-90"
                              title="Bấm để phóng to như Facebook"
                            >
                              <img
                                src={attachedImage}
                                alt="Preview"
                                className="h-20 w-28 object-cover pointer-events-none"
                              />
                            </div>
                            <button
                              onClick={() => setAttachedImage(null)}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#b91c1c] text-white rounded-full flex items-center justify-center text-xs hover:bg-black transition-colors shadow-md z-10"
                              title="Xóa ảnh"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}

                        {attachedVideo && (
                          <div className="relative group inline-block">
                            <div
                              onClick={() => handleOpenMedia({ type: 'video', url: attachedVideo })}
                              onMouseEnter={(e) => {
                                const v = e.currentTarget.querySelector('video');
                                if (v) v.play().catch(() => { });
                              }}
                              onMouseLeave={(e) => {
                                const v = e.currentTarget.querySelector('video');
                                if (v) {
                                  v.pause();
                                  v.currentTime = 0;
                                }
                              }}
                              className="relative cursor-pointer overflow-hidden rounded-xs border border-zinc-700 bg-black w-36 h-20 shadow-2xs group"
                              title="Rê chuột xem thử không tiếng · Bấm để phóng to"
                            >
                              <video
                                src={attachedVideo}
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover pointer-events-none"
                              />
                              <div className="absolute inset-0 bg-black/25 group-hover:opacity-0 transition-opacity flex items-center justify-center pointer-events-none">
                                <Play className="w-5 h-5 text-white fill-white/80" />
                              </div>
                            </div>
                            <button
                              onClick={() => setAttachedVideo(null)}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#b91c1c] text-white rounded-full flex items-center justify-center text-xs hover:bg-black transition-colors shadow-md z-10"
                              title="Xóa video"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Trạng thái upload lên Cloud */}
                    {isUploadingMedia && (
                      <div className="flex items-center gap-1.5 text-xs text-[#b91c1c] font-mono py-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Đang đồng bộ file lên Supabase Storage...</span>
                      </div>
                    )}

                    {/* Popover Icon / Emoji */}
                    {showEmojiPicker && (
                      <div className="p-2.5 bg-white border border-[#e7e5e4] shadow-md flex flex-wrap gap-1.5 max-w-md animate-in fade-in zoom-in-95">
                        {EMOJI_LIST.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => setQuestionText(prev => prev + ' ' + emoji)}
                            className="w-8 h-8 flex items-center justify-center text-base hover:bg-[#f5f5f4] rounded-xs transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Hộp thoại dán link URL */}
                    {showUrlInputModal && (
                      <div className="p-2.5 bg-[#fdfbf7] border border-[#f5ecd8] flex items-center gap-2">
                        <Link className="w-4 h-4 text-amber-700 shrink-0" />
                        <input
                          type="text"
                          value={mediaUrlInput}
                          onChange={(e) => setMediaUrlInput(e.target.value)}
                          placeholder={showUrlInputModal === 'image' ? 'Dán đường dẫn ảnh online (VD: https://...)...' : 'Dán đường dẫn video online...'}
                          className="w-full text-xs px-2.5 py-1.5 border border-[#d6d3d1] bg-white focus:outline-none focus:border-[#b91c1c]"
                        />
                        <button
                          onClick={handleAttachMediaUrl}
                          className="px-3 py-1.5 bg-[#1c1917] text-white text-xs font-mono font-bold hover:bg-[#b91c1c] whitespace-nowrap"
                        >
                          Đính Kèm
                        </button>
                        <button
                          onClick={() => { setShowUrlInputModal(null); setMediaUrlInput(''); }}
                          className="p-1.5 text-[#78716c] hover:text-[#1c1917]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <div className="flex items-center border border-[#d6d3d1] bg-white">
                          <button
                            type="button"
                            onClick={() => mainImageInputRef.current?.click()}
                            className="px-2.5 py-1.5 text-xs text-[#1c1917] hover:bg-[#f5f5f4] flex items-center gap-1.5 font-medium transition-colors"
                            title="Chọn file ảnh từ thư mục máy tính của bạn"
                          >
                            <FolderOpen className="w-3.5 h-3.5 text-[#b91c1c]" />
                            <span>Ảnh từ máy</span>
                          </button>
                          <span className="w-px h-4 bg-[#e7e5e4]" />
                          <button
                            type="button"
                            onClick={() => setShowUrlInputModal(showUrlInputModal === 'image' ? null : 'image')}
                            className="px-2 py-1.5 text-xs text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f5f4]"
                            title="Dán link ảnh online"
                          >
                            <Link className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center border border-[#d6d3d1] bg-white">
                          <button
                            type="button"
                            onClick={() => mainVideoInputRef.current?.click()}
                            className="px-2.5 py-1.5 text-xs text-[#1c1917] hover:bg-[#f5f5f4] flex items-center gap-1.5 font-medium transition-colors"
                            title="Chọn file clip từ thư mục máy tính của bạn"
                          >
                            <FolderOpen className="w-3.5 h-3.5 text-[#b91c1c]" />
                            <span>Video từ máy</span>
                          </button>
                          <span className="w-px h-4 bg-[#e7e5e4]" />
                          <button
                            type="button"
                            onClick={() => setShowUrlInputModal(showUrlInputModal === 'video' ? null : 'video')}
                            className="px-2 py-1.5 text-xs text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f5f4]"
                            title="Dán link video online"
                          >
                            <Link className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className={`px-2.5 py-1.5 text-xs border flex items-center gap-1.5 transition-colors ${showEmojiPicker ? 'bg-[#b91c1c] text-white border-[#b91c1c]' : 'bg-white text-[#44403c] border-[#d6d3d1] hover:border-[#1c1917]'
                            }`}
                        >
                          <Smile className="w-3.5 h-3.5" />
                          <span>Icon</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handlePostQuestion}
                        className="px-5 py-2 bg-[#b91c1c] text-white text-xs font-mono font-bold hover:bg-[#991b1b] transition-all shadow-2xs flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Đăng Thảo Luận</span>
                      </button>
                    </div>
                  </div>

                  {/* Danh sách các câu hỏi & luồng bình luận */}
                  <div className="space-y-4">
                    {discussions.map((d) => (
                      <div key={d.id} className="p-4 border border-[#e7e5e4] bg-[#fafaf9] space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full ${d.avatarBg || 'bg-blue-600'} text-white flex items-center justify-center font-bold text-xs shadow-2xs`}>
                              {d.avatarLetter}
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className={`text-xs font-bold ${d.isSensei ? 'text-[#b91c1c]' : 'text-[#1c1917]'}`}>
                                  {d.authorName}
                                </span>
                                {d.isSensei ? (
                                  <span className="px-1.5 py-0.2 bg-[#fef2f2] text-[#b91c1c] text-[10px] font-mono font-bold border border-[#fecaca]">
                                    Giảng viên
                                  </span>
                                ) : (
                                  <span className="px-1.5 py-0.2 bg-[#f5f5f4] text-[#78716c] text-[10px] font-mono border border-[#e7e5e4]">
                                    Học viên
                                  </span>
                                )}
                                <span className="px-1.5 py-0.2 bg-[#fafaf9] text-[#b91c1c] text-[10px] font-mono font-bold border border-[#e7e5e4]">
                                  {d.authorLevel || (d.isSensei ? 'N1' : 'N5')}
                                </span>
                              </div>
                              <span className="text-[10px] text-[#a8a29e] font-mono">{d.timeAgo}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleLikeDiscussion(d.id)}
                              className="flex items-center gap-1 text-[11px] font-mono text-[#78716c] hover:text-[#b91c1c] transition-colors"
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>{d.helpfulCount}</span>
                            </button>
                            <button
                              onClick={() => {
                                setReplyingToDiscussionId(replyingToDiscussionId === d.id ? null : d.id);
                                setReplyText('');
                              }}
                              className="px-2.5 py-1 text-xs font-mono font-bold border border-[#d6d3d1] bg-white text-[#1c1917] hover:border-[#b91c1c] hover:text-[#b91c1c] flex items-center gap-1 shadow-2xs"
                            >
                              <CornerDownRight className="w-3 h-3 text-[#b91c1c]" />
                              <span>Trả lời ({(d.replies || []).length})</span>
                            </button>

                            {/* Nút xóa câu hỏi/thảo luận (dành cho người tạo bài hoặc Giáo viên/Admin) */}
                            {(isTeacher || (user?.id && d.authorId && user.id === d.authorId) || d.authorName === currentAuthorName) && (
                              <button
                                type="button"
                                onClick={() => handleRequestDeleteDiscussion(d.id, false)}
                                title="Xóa comment"
                                className="p-1 text-[#a8a29e] hover:text-[#b91c1c] hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-[#1c1917] leading-relaxed whitespace-pre-wrap pl-1">
                          {d.content}
                        </p>

                        {/* Render ảnh đính kèm */}
                        {d.imageUrl && (
                          <div className="pt-1 pl-1">
                            <div
                              onClick={() => handleOpenMedia({ type: 'image', url: d.imageUrl! })}
                              className="relative group inline-block cursor-pointer overflow-hidden rounded-xs border border-[#e7e5e4] shadow-xs hover:shadow-md transition-all my-1"
                              title="Bấm để phóng to ảnh như Facebook"
                            >
                              <img
                                src={d.imageUrl}
                                alt="Đính kèm"
                                className="max-h-64 max-w-full object-contain bg-white group-hover:scale-[1.01] transition-transform duration-200 pointer-events-none"
                              />
                            </div>
                          </div>
                        )}

                        {/* Render video đính kèm */}
                        {d.videoUrl && (
                          <div className="pt-1 pl-1">
                            <div
                              onClick={() => handleOpenMedia({ type: 'video', url: d.videoUrl! })}
                              onMouseEnter={(e) => {
                                const v = e.currentTarget.querySelector('video');
                                if (v) v.play().catch(() => { });
                              }}
                              onMouseLeave={(e) => {
                                const v = e.currentTarget.querySelector('video');
                                if (v) {
                                  v.pause();
                                  v.currentTime = 0;
                                }
                              }}
                              className="relative group cursor-pointer overflow-hidden rounded-xs border border-[#292524] bg-black max-w-md shadow-md transition-all hover:border-[#b91c1c] my-1"
                              title="Rê chuột xem thử không tiếng · Bấm vào để phóng to xem đầy đủ"
                            >
                              <video
                                src={d.videoUrl}
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                className="w-full max-h-60 object-cover bg-black pointer-events-none"
                              />
                              <div className="absolute inset-0 bg-black/25 group-hover:opacity-0 transition-opacity flex items-center justify-center pointer-events-none">
                                <div className="w-12 h-12 rounded-full bg-black/70 text-white flex items-center justify-center border border-white/30 shadow-md">
                                  <Play className="w-6 h-6 fill-white ml-0.5" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Thread Replies */}
                        {d.replies && d.replies.length > 0 && (
                          <div className="space-y-2.5 pt-2 border-t border-[#e7e5e4] pl-3 sm:pl-6">
                            {d.replies.map((reply) => {
                              const isReplyTeacher = reply.isSensei || reply.role === 'teacher';
                              return (
                                <div
                                  key={reply.id}
                                  className={`p-3 border transition-colors ${isReplyTeacher
                                      ? 'bg-white border-[#fecaca] border-l-4 border-l-[#b91c1c]'
                                      : 'bg-white border-[#e7e5e4] border-l-4 border-l-zinc-400'
                                    }`}
                                >
                                  <div className="flex items-center justify-between text-xs mb-1.5">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      <div className={`w-5 h-5 rounded-full ${reply.avatarBg || 'bg-blue-600'} text-white flex items-center justify-center text-[10px] font-bold`}>
                                        {reply.avatarLetter}
                                      </div>
                                      <span className={`font-bold ${isReplyTeacher ? 'text-[#b91c1c]' : 'text-[#1c1917]'}`}>
                                        {reply.authorName}
                                      </span>
                                      {isReplyTeacher ? (
                                        <span className="px-1.5 py-0.2 bg-[#fef2f2] text-[#b91c1c] text-[10px] font-mono font-bold border border-[#fecaca]">
                                          Giảng viên
                                        </span>
                                      ) : (
                                        <span className="px-1.5 py-0.2 bg-[#f5f5f4] text-[#78716c] text-[10px] font-mono border border-[#e7e5e4]">
                                          Học viên
                                        </span>
                                      )}
                                      <span className="px-1.5 py-0.2 bg-[#fafaf9] text-[#b91c1c] text-[10px] font-mono font-bold border border-[#e7e5e4]">
                                        {reply.authorLevel || (isReplyTeacher ? 'N1' : 'N5')}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[10px] text-[#a8a29e] font-mono">{reply.timeAgo}</span>
                                      {(isTeacher || (user?.id && reply.authorId && user.id === reply.authorId) || reply.authorName === currentAuthorName) && (
                                        <button
                                          type="button"
                                          onClick={() => handleRequestDeleteDiscussion(reply.id, true, d.id)}
                                          title="Xóa comment"
                                          className="text-[#a8a29e] hover:text-[#b91c1c] p-0.5 rounded-xs transition-colors cursor-pointer"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  <p className="text-xs text-[#1c1917] leading-relaxed pl-7 whitespace-pre-wrap">
                                    {reply.content}
                                  </p>

                                  {reply.imageUrl && (
                                    <div className="pl-7 pt-1">
                                      <div
                                        onClick={() => handleOpenMedia({ type: 'image', url: reply.imageUrl! })}
                                        className="cursor-pointer inline-block"
                                      >
                                        <img
                                          src={reply.imageUrl}
                                          alt="Reply attachment"
                                          className="max-h-48 rounded-xs border border-[#e7e5e4] object-contain shadow-2xs hover:opacity-90 pointer-events-none"
                                          title="Bấm để phóng to ảnh"
                                        />
                                      </div>
                                    </div>
                                  )}

                                  {reply.videoUrl && (
                                    <div className="pl-7 pt-1">
                                      <div
                                        onClick={() => handleOpenMedia({ type: 'video', url: reply.videoUrl! })}
                                        onMouseEnter={(e) => {
                                          const v = e.currentTarget.querySelector('video');
                                          if (v) v.play().catch(() => { });
                                        }}
                                        onMouseLeave={(e) => {
                                          const v = e.currentTarget.querySelector('video');
                                          if (v) {
                                            v.pause();
                                            v.currentTime = 0;
                                          }
                                        }}
                                        className="relative group cursor-pointer overflow-hidden rounded-xs border border-zinc-700 bg-black max-w-sm h-36"
                                        title="Rê chuột xem thử · Bấm để phóng to"
                                      >
                                        <video
                                          src={reply.videoUrl}
                                          muted
                                          loop
                                          playsInline
                                          className="w-full h-full object-cover pointer-events-none"
                                        />
                                        <div className="absolute inset-0 bg-black/25 group-hover:opacity-0 transition-opacity flex items-center justify-center pointer-events-none">
                                          <Play className="w-5 h-5 text-white fill-white" />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Inline Reply Form */}
                        {replyingToDiscussionId === d.id && (
                          <div className="mt-3 p-3.5 bg-white border border-[#d6d3d1] shadow-xs space-y-3 pl-3 sm:pl-6 animate-in fade-in">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f5f5f4] pb-1.5">
                              <span className="text-xs font-mono font-bold text-[#1c1917]">
                                Viết phản hồi cho {d.authorName}:
                              </span>

                              <span className="text-xs font-mono text-[#78716c] flex items-center gap-1.5">
                                <span>Trả lời với tư cách:</span>
                                <strong className="text-[#1c1917]">{currentAuthorName}</strong>
                                <span className="px-1.5 py-0.2 bg-[#f5f5f4] text-[#78716c] text-[10px] border border-[#e7e5e4]">
                                  {isTeacher ? 'Giảng viên' : 'Học viên'}
                                </span>
                                <span className="px-1.5 py-0.2 bg-[#fafaf9] text-[#b91c1c] border border-[#e7e5e4] text-[10px] font-bold">
                                  {currentUserLevel}
                                </span>
                              </span>
                            </div>

                            <textarea
                              rows={2}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Nhập phản hồi của bạn..."
                              className="w-full text-xs p-2.5 border border-[#d6d3d1] bg-[#fafaf9] focus:bg-white focus:outline-none focus:border-[#b91c1c]"
                            />

                            {(replyAttachedImage || replyAttachedVideo) && (
                              <div className="flex flex-wrap items-center gap-2 p-2 bg-[#f5f5f4] border border-[#e7e5e4] text-xs">
                                {replyAttachedImage && (
                                  <div className="relative group inline-block">
                                    <div
                                      onClick={() => handleOpenMedia({ type: 'image', url: replyAttachedImage })}
                                      className="cursor-pointer"
                                    >
                                      <img
                                        src={replyAttachedImage}
                                        alt="Preview"
                                        className="h-14 w-20 object-cover border pointer-events-none hover:opacity-90"
                                      />
                                    </div>
                                    <button
                                      onClick={() => setReplyAttachedImage(null)}
                                      className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#b91c1c] text-white rounded-full flex items-center justify-center text-[10px]"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                )}
                                {replyAttachedVideo && (
                                  <div className="relative group inline-block">
                                    <div
                                      onClick={() => handleOpenMedia({ type: 'video', url: replyAttachedVideo })}
                                      onMouseEnter={(e) => {
                                        const v = e.currentTarget.querySelector('video');
                                        if (v) v.play().catch(() => { });
                                      }}
                                      onMouseLeave={(e) => {
                                        const v = e.currentTarget.querySelector('video');
                                        if (v) {
                                          v.pause();
                                          v.currentTime = 0;
                                        }
                                      }}
                                      className="relative cursor-pointer overflow-hidden rounded border bg-black w-24 h-14 group"
                                      title="Rê chuột xem thử · Bấm phóng to"
                                    >
                                      <video
                                        src={replyAttachedVideo}
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover pointer-events-none"
                                      />
                                      <div className="absolute inset-0 bg-black/30 group-hover:opacity-0 transition-opacity flex items-center justify-center pointer-events-none">
                                        <Play className="w-4 h-4 text-white fill-white" />
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => setReplyAttachedVideo(null)}
                                      className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#b91c1c] text-white rounded-full flex items-center justify-center text-[10px]"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}

                            {showReplyEmoji && (
                              <div className="p-2 bg-white border border-[#e7e5e4] shadow-sm flex flex-wrap gap-1 max-w-sm">
                                {EMOJI_LIST.map((emoji) => (
                                  <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => setReplyText(prev => prev + ' ' + emoji)}
                                    className="w-7 h-7 flex items-center justify-center text-sm hover:bg-[#f5f5f4]"
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            )}

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => replyImageInputRef.current?.click()}
                                  className="px-2 py-1 text-xs border border-[#d6d3d1] bg-white hover:border-[#1c1917] flex items-center gap-1"
                                  title="Chọn ảnh từ máy tính của bạn"
                                >
                                  <FolderOpen className="w-3 h-3 text-[#b91c1c]" />
                                  <span>Ảnh từ máy</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => replyVideoInputRef.current?.click()}
                                  className="px-2 py-1 text-xs border border-[#d6d3d1] bg-white hover:border-[#1c1917] flex items-center gap-1"
                                  title="Chọn video từ máy tính của bạn"
                                >
                                  <FolderOpen className="w-3 h-3 text-[#b91c1c]" />
                                  <span>Video từ máy</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setShowReplyEmoji(!showReplyEmoji)}
                                  className="px-2 py-1 text-xs border border-[#d6d3d1] bg-white hover:border-[#1c1917] flex items-center gap-1"
                                >
                                  <Smile className="w-3 h-3" />
                                  <span>Icon</span>
                                </button>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setReplyingToDiscussionId(null)}
                                  className="px-3 py-1.5 text-xs text-[#78716c] hover:text-[#1c1917]"
                                >
                                  Hủy
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handlePostReply(d.id)}
                                  className="px-4 py-1.5 bg-[#b91c1c] text-white text-xs font-mono font-bold hover:bg-[#991b1b] shadow-2xs flex items-center gap-1"
                                >
                                  <Send className="w-3 h-3" />
                                  <span>Gửi Trả Lời</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI (4/12): PLAYLIST TOÀN BỘ BÀI HỌC CỦA LEVEL */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-[#e7e5e4] p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#e7e5e4] mb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#b91c1c] uppercase block">
                  LỘ TRÌNH BÀI HỌC
                </span>
                <h3 className="font-serif font-bold text-base text-[#1c1917]">
                  {selectedLevel === 'N5' ? '25 Bài Minna no Nihongo I' : selectedLevel === 'N4' ? '25 Bài Minna no Nihongo II' : `Giáo trình Shinkanzen ${selectedLevel}`}
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] font-bold">
                {lessons.filter(l => l.isPassed).length}/{lessons.length || (selectedLevel === 'N3' ? 30 : selectedLevel === 'N2' ? 26 : 25)} Đạt
              </span>
            </div>

            {loadingLessons ? (
              <div className="py-12 flex flex-col items-center justify-center text-zinc-400 gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#b91c1c]" />
                <span className="text-xs font-mono">Đang tải danh sách bài học...</span>
              </div>
            ) : (
              <div className="space-y-2 max-h-[780px] overflow-y-auto pr-1 scrollbar-thin">
                {lessons.map((lesson) => {
                  const isSelected = lesson.id === currentLesson.id;
                  const isUnlocked = isTeacher || lesson.isUnlocked !== false;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => {
                        if (!isUnlocked) {
                          setLockedNotice(
                            `Bài học số ${lesson.lessonNumber} hiện đang bị khóa! Bạn cần hoàn thành bài kiểm tra kiến thức của Bài trước đạt từ 85% trở lên (tối thiểu 17/20 câu đúng) để mở khóa bài học này.`
                          );
                          return;
                        }
                        setLockedNotice(null);
                        setSelectedLessonId(lesson.id);
                        try {
                          localStorage.setItem(
                            'grammar_last_active_lesson',
                            JSON.stringify({
                              lessonId: lesson.id,
                              levelCode: selectedLevel,
                              updatedAt: Date.now()
                            })
                          );
                        } catch (e) { }
                      }}
                      className={`p-3 border transition-all flex items-start justify-between gap-3 ${!isUnlocked
                          ? 'bg-[#f5f5f4]/80 border-[#e7e5e4] opacity-65 cursor-not-allowed'
                          : isSelected
                            ? 'bg-[#fef2f2] border-[#b91c1c] shadow-2xs ring-1 ring-[#b91c1c]/20 cursor-pointer'
                            : 'bg-white border-[#e7e5e4] hover:border-[#a8a29e] hover:shadow-2xs cursor-pointer'
                        }`}
                      title={!isUnlocked ? `Bài ${lesson.lessonNumber} đang bị khóa. Cần đạt >= 85% bài kiểm tra trước đó để mở khóa!` : undefined}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className={`w-6 h-6 rounded-xs flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${!isUnlocked
                            ? 'bg-[#e7e5e4] text-[#a8a29e]'
                            : isSelected
                              ? 'bg-[#b91c1c] text-white'
                              : lesson.isPassed
                                ? 'bg-[#166534] text-white'
                                : 'bg-[#f5f5f4] text-[#78716c]'
                          }`}>
                          {!isUnlocked ? <Lock className="w-3 h-3 text-[#78716c]" /> : String(lesson.sortOrder).padStart(2, '0')}
                        </span>
                        <div className="space-y-0.5">
                          <h4 className={`text-xs font-medium leading-snug line-clamp-2 ${!isUnlocked ? 'text-[#a8a29e]' : isSelected ? 'text-[#b91c1c] font-bold' : 'text-[#1c1917]'
                            }`}>
                            {lesson.titleVi}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] text-[#78716c] font-mono">
                            <span>⏱️ {lesson.durationStr}</span>
                            {lesson.highestScore > 0 && (
                              <span className="text-[#166534] font-bold">• {lesson.highestScore}%</span>
                            )}
                            {lesson.starsEarned > 0 && (
                              <span className="text-amber-500 font-bold">
                                {'★'.repeat(lesson.starsEarned)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 mt-1">
                        {!isUnlocked ? (
                          <Lock className="w-3.5 h-3.5 text-[#a8a29e]" />
                        ) : lesson.isPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#a8a29e]" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FACEBOOK-STYLE LIGHTBOX PORTAL */}
      {activeLightboxMedia && createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLightboxMedia(null)}
        >
          <button
            onClick={() => setActiveLightboxMedia(null)}
            className="absolute top-4 right-4 z-[100000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-2xl border border-white/20 hover:scale-105"
            title="Đóng (Esc)"
          >
            <X className="w-7 h-7" />
          </button>

          <div
            className="max-w-6xl max-h-[92vh] w-full flex flex-col items-center justify-center relative select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {activeLightboxMedia.type === 'image' ? (
              <div className="flex flex-col items-center max-w-full max-h-[85vh]">
                <img
                  src={activeLightboxMedia.url}
                  alt="Xem ảnh phóng to"
                  className="max-w-full max-h-[82vh] object-contain rounded shadow-2xl bg-black"
                />
              </div>
            ) : (
              <div className="w-full max-w-4xl flex flex-col items-center">
                <div className="w-full aspect-video bg-black rounded overflow-hidden shadow-2xl border border-zinc-800">
                  <video
                    src={activeLightboxMedia.url}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* NIPPONMASTER CUSTOM CONFIRMATION MODAL KHI XÓA COMMENT */}
      {deleteConfirmTarget && createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => !isDeletingComment && setDeleteConfirmTarget(null)}
        >
          <div
            className="bg-white border-2 border-[#1c1917] p-5 sm:p-6 max-w-sm sm:max-w-md w-full shadow-2xl relative text-left animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              disabled={isDeletingComment}
              onClick={() => setDeleteConfirmTarget(null)}
              className="absolute top-3.5 right-3.5 text-[#78716c] hover:text-[#1c1917] p-1 transition-colors cursor-pointer disabled:opacity-50"
              title="Đóng (Esc)"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="space-y-1 pr-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#b91c1c] block">
                  NIPPONMASTER
                </span>
                <h3 className="font-serif font-bold text-base text-[#1c1917] leading-snug">
                  Xác nhận xóa comment
                </h3>
                <p className="text-xs text-[#57534e] mt-2 leading-relaxed">
                  {deleteConfirmTarget.isReply
                    ? 'Bạn có chắc chắn muốn xóa câu trả lời này không? Hành động này không thể hoàn tác.'
                    : 'Bạn có chắc chắn muốn xóa comment này không? Tất cả các câu trả lời bên dưới cũng sẽ bị xóa theo.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#e7e5e4]">
              <button
                type="button"
                disabled={isDeletingComment}
                onClick={() => setDeleteConfirmTarget(null)}
                className="px-4 py-2 text-xs font-mono font-medium text-[#57534e] hover:text-[#1c1917] hover:bg-[#f5f5f4] border border-[#d6d3d1] transition-all cursor-pointer disabled:opacity-50"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={isDeletingComment}
                onClick={executeDeleteDiscussion}
                className="px-4 py-2 text-xs font-mono font-bold bg-[#b91c1c] hover:bg-[#991b1b] text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isDeletingComment ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang xóa...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa comment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
