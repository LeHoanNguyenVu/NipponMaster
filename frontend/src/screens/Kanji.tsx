import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Lock,
  CheckCircle2,
  ChevronRight,
  PenTool,
  Eye,
  X,
  AlertCircle,
  Loader2,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Volume2,
  BookOpen,
  Maximize2
} from 'lucide-react';
import axiosClient from '../api/axiosClient';
import KanjiStrokeWriter from '../components/KanjiStrokeWriter';
import KanjiCanvasStudio from './KanjiCanvasStudio';
import SakuraCelebrationModal from '../components/kanji/SakuraCelebrationModal';
import { useTranslation } from 'react-i18next';
import { Badge } from '../components/ui/Badge';
import { useAuthStore } from '../store/useAuthStore';

// ─── TYPES ──────────────────────────────────────────────────────────────────
interface RoadmapChapter {
  id: number;
  chapterNumber: number;
  jlptLevel: string;
  titleJa: string;
  titleVi: string;
  titleEn: string;
  kanjiCount: number;
  displayOrder: number;
  illustrationUrl: string;
  description: string;
  isUnlocked: boolean;
  highestScore: number;
  isPassed: boolean;
}

interface AchievementStage {
  id: number;
  stage: number;
  title: string;
  description: string;
  passPercentage: number;
  testDataJson: string;
  displayOrder: number;
}

interface RoadmapResponse {
  level: string;
  totalChapters: number;
  completedChapters: number;
  totalKanji: number;
  learnedKanji: number;
  chapters: RoadmapChapter[];
  achievementTests: AchievementStage[];
}

interface ChapterKanjiItem {
  id: number;
  character: string;
  onReading?: string;
  kunReading?: string;
  romaji?: string;
  hanViet?: string;
  meaning: string;
  strokeCount: number;
  radical?: string;
  mnemonicHint?: string;
  mnemonicIcon?: string;
  mnemonicTitle?: string;
  exampleSentence?: string;
  exampleMeaning?: string;
  relatedWords?: string;
  chapterOrder?: number;
  imageUrl?: string;
}

interface ChapterVocab {
  id: number;
  word: string;
  reading: string;
  romaji: string;
  meaningVi: string;
  meaningEn: string;
  displayOrder: number;
}

interface ChapterExercise {
  id: number;
  exerciseType: 'READING' | 'WRITING';
  questionText: string;
  targetWord: string;
  correctAnswer: string;
  optionsJson?: string;
  explanation?: string;
  displayOrder: number;
}

interface ChapterMinigame {
  id: number;
  gameType: string;
  title: string;
  instruction: string;
  imageUrl?: string;
  gameDataJson: string;
  displayOrder: number;
}

interface UserChapterProgress {
  isUnlocked: boolean;
  highestScore: number;
  isPassed: boolean;
}

interface ChapterDetailResponse {
  chapter: RoadmapChapter;
  kanjis: ChapterKanjiItem[];
  vocabularies: ChapterVocab[];
  readingExercises: ChapterExercise[];
  writingExercises: ChapterExercise[];
  minigames: ChapterMinigame[];
  userProgress?: UserChapterProgress | null;
}

interface SubmitResult {
  score: number;
  isPassed: boolean;
  unlockedNextChapter: boolean;
  nextChapterId?: number;
  nextChapterNumber?: number;
  message: string;
}

// Minh họa ngữ cảnh theo chủ đề tình huống cho câu đọc
const SCENARIO_THEMES: Record<number, { emoji: string; badge: string; scene: string; iconBg: string; meaningVi: string }> = {
  1: { emoji: '🍎', badge: 'Quầy hoa quả', scene: 'Đi chợ mua sắm', iconBg: 'bg-red-50 text-red-600 border-red-200', meaningVi: 'Làm ơn cho tôi một quả táo.' },
  2: { emoji: '🏫', badge: 'Phòng học', scene: 'Giờ lên lớp', iconBg: 'bg-amber-50 text-amber-700 border-amber-200', meaningVi: 'Trong lớp học có một học sinh.' },
  3: { emoji: '🍊', badge: 'Quầy trái cây', scene: 'Mua quýt Nhật (Mikan)', iconBg: 'bg-orange-50 text-orange-600 border-orange-200', meaningVi: 'Tôi đã mua hai quả quýt.' },
  4: { emoji: '👥', badge: 'Bạn bè', scene: 'Đôi bạn cùng đi', iconBg: 'bg-blue-50 text-blue-600 border-blue-200', meaningVi: 'Tôi sẽ đi cùng hai người: anh Tanaka và anh Suzuki.' },
  5: { emoji: '🍰', badge: 'Tiệm bánh ngọt', scene: 'Thưởng thức bánh kem', iconBg: 'bg-pink-50 text-pink-600 border-pink-200', meaningVi: 'Tôi đã ăn ba cái bánh ngọt.' },
  6: { emoji: '🛋️', badge: 'Phòng khách', scene: 'Bạn bè sum họp', iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200', meaningVi: 'Trong phòng có bốn người bạn.' },
  7: { emoji: '🖊️', badge: 'Văn phòng phẩm', scene: 'Dụng cụ học tập', iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200', meaningVi: 'Chiếc bút bi này giá 100 Yên.' },
  8: { emoji: '👔', badge: 'Shop thời trang', scene: 'Mua trang phục', iconBg: 'bg-teal-50 text-teal-600 border-teal-200', meaningVi: 'Giá của chiếc áo sơ mi là 3,000 Yên.' },
  9: { emoji: '💴', badge: 'Ví tiền', scene: 'Tài chính cá nhân', iconBg: 'bg-yellow-50 text-yellow-700 border-yellow-200', meaningVi: 'Trong ví tôi có 10,000 Yên (1 vạn).' },
  10: { emoji: '📚', badge: 'Giá sách', scene: 'Sắp xếp tài liệu', iconBg: 'bg-purple-50 text-purple-600 border-purple-200', meaningVi: 'Tôi đã xếp sáu cuốn sách ngay ngắn.' },
};

// Minh họa ngữ cảnh cho câu viết chữ Hán
const WRITING_THEMES: Record<number, { emoji: string; badge: string; scene: string; meaningVi: string }> = {
  1: { emoji: '🥖', badge: 'Tiệm bánh mì', scene: 'Bữa sáng', meaningVi: 'Tôi đã mua một ổ bánh mì.' },
  2: { emoji: '👨‍👩‍👧', badge: 'Gia đình', scene: 'Con cái', meaningVi: 'Anh Suzuki có hai người con.' },
  3: { emoji: '📓', badge: 'Bàn học', scene: 'Vở ghi chép', meaningVi: 'Trên bàn có ba cuốn vở ghi.' },
  4: { emoji: '🏡', badge: 'Tổ ấm', scene: 'Thành viên gia đình', meaningVi: 'Gia đình tôi có bốn người.' },
  5: { emoji: '🥚', badge: 'Hộp trứng', scene: 'Nhà bếp', meaningVi: 'Trong hộp có năm quả trứng.' },
  6: { emoji: '☕', badge: 'Quán cà phê', scene: 'Thức uống', meaningVi: 'Cốc cà phê này giá 100 Yên.' },
  7: { emoji: '📖', badge: 'Hiệu sách', scene: 'Từ điển Nhật', meaningVi: 'Cuốn từ điển này giá 3,000 Yên.' },
  8: { emoji: '💴', badge: 'Thanh toán', scene: 'Thu ngân', meaningVi: 'Tôi đã thanh toán bằng 10,000 Yên tiền Nhật.' },
  9: { emoji: '⌚', badge: 'Đồng hồ', scene: 'Trang sức', meaningVi: 'Giá của chiếc đồng hồ đeo tay là 8,000 Yên.' },
  10: { emoji: '🤝', badge: 'Gặp gỡ', scene: 'Bạn bè tụ họp', meaningVi: 'Sáu người bạn đã cùng nhau tụ họp.' },
};

// Minh họa ngữ cảnh đặc thù N4 Chương 1 (Bài 1-1 Gia đình & Bài 1-2 Sinh hoạt hàng ngày)
// Minh họa ngữ cảnh đặc thù N4 Chương 1 (Chương 1: 家族 - Gia đình)
const N4_CH1_READING_THEMES: Record<number, { emoji: string; badge: string; scene: string; meaningVi: string }> = {
  1: { emoji: '👩', badge: 'Chị gái', scene: 'Sống tự lập ở Tokyo', meaningVi: 'Chị gái tôi đang sống một mình ở Tokyo.' },
  2: { emoji: '👨‍👩‍👧‍👦', badge: 'Gia đình', scene: 'Thành viên trong nhà', meaningVi: 'Gia đình tôi có 5 người.' },
  3: { emoji: '👨‍🏫', badge: 'Anh trai', scene: 'Nghề nghiệp giáo viên', meaningVi: 'Anh trai tôi là giáo viên tiếng Anh trường cấp ba.' },
  4: { emoji: '🙋‍♂️', badge: 'Bản thân', scene: 'Giới thiệu họ tên', meaningVi: 'Tên tôi là Yamada Taro.' },
  5: { emoji: '🎓', badge: 'Em gái', scene: 'Bước vào cổng đại học', meaningVi: 'Năm nay em gái tôi đã trở thành sinh viên đại học.' },
  6: { emoji: '👴👵', badge: 'Cha mẹ', scene: 'Kính trọng đấng sinh thành', meaningVi: 'Tôi rất kính trọng cha mẹ mình.' },
  7: { emoji: '🤝', badge: 'Anh em', scene: 'Thuận hòa yêu thương', meaningVi: 'Anh em trong nhà phải thuận hòa, đoàn kết.' },
  8: { emoji: '🛍️', badge: 'Vợ chồng', scene: 'Đi mua sắm cùng nhau', meaningVi: 'Tôi đã cùng vợ đi mua sắm.' },
  9: { emoji: '🌾', badge: 'Nuôi nấng', scene: 'Lớn lên giữa thiên nhiên', meaningVi: 'Anh ấy đã lớn lên giữa thiên nhiên Hokkaido.' },
  10: { emoji: '👴', badge: 'Ông nội', scene: 'Kỷ niệm người thầy xưa', meaningVi: 'Ông nội tôi ngày xưa là thầy giáo.' },
};

const N4_CH1_WRITING_THEMES: Record<number, { emoji: string; badge: string; scene: string; meaningVi: string }> = {
  1: { emoji: '🏥', badge: 'Chị gái', scene: 'Nghề y tá điều dưỡng', meaningVi: 'Chị gái tôi làm nghề y tá.' },
  2: { emoji: '👨‍👩‍👧', badge: 'Gia đình', scene: 'Giới thiệu tổ ấm', meaningVi: 'Tôi xin giới thiệu về gia đình mình.' },
  3: { emoji: '⚽', badge: 'Anh trai', scene: 'Xem bóng đá sôi động', meaningVi: 'Tôi đã cùng anh trai đi xem trận bóng đá.' },
  4: { emoji: '🎧', badge: 'Bản thân', scene: 'Sở thích nghe nhạc', meaningVi: 'Sở thích của tôi là nghe nhạc.' },
  5: { emoji: '✉️', badge: 'Em gái', scene: 'Lá thư từ phương xa', meaningVi: 'Tôi đã nhận được thư từ em gái gửi tới.' },
  6: { emoji: '🎮', badge: 'Em trai', scene: 'Đam mê trò chơi điện tử', meaningVi: 'Em trai tôi rất thích chơi điện tử.' },
  7: { emoji: '👵', badge: 'Nuôi dạy', scene: 'Bà nuôi 6 người con', meaningVi: 'Bà tôi đã nuôi nấng 6 người con khôn lớn.' },
  8: { emoji: '🏡', badge: 'Nhà ở', scene: 'Cuối tuần thảnh thơi ở nhà', meaningVi: 'Cuối tuần tôi thảnh thơi nghỉ ngơi ở nhà mình.' },
  9: { emoji: '📏', badge: 'Anh em', scene: 'Chiều cao các anh em', meaningVi: 'Trong số các anh em thì ai là người cao nhất?' },
  10: { emoji: '🧳', badge: 'Gia đình', scene: 'Cả nhà sum vầy du lịch', meaningVi: 'Cả gia đình sum họp cùng nhau đi du lịch.' },
};

// ─── COMPONENT CHÍNH ────────────────────────────────────────────────────────
export default function Kanji() {
  const { t, i18n } = useTranslation(['kanji', 'common']);
  const isEn = i18n.language === 'en';
  const { user } = useAuthStore();

  // Cấp độ đang học (Mặc định theo level tài khoản của User hoặc N4)
  const [selectedLevel, setSelectedLevel] = useState<string>(() => {
    const userLvl = user?.jlptLevel ? user.jlptLevel.toUpperCase() : 'N4';
    return ['N4', 'N5'].includes(userLvl) ? userLvl : 'N4';
  });

  // Xếp hạng cấp độ JLPT: STARTER < N5 < N4 < N3 < N2 < N1
  // Nếu học viên có level cao hơn cấp độ đang xem (VD: User N4 xem N5), toàn bộ chương sẽ tự động mở khóa
  const JLPT_RANK: Record<string, number> = { STARTER: 0, N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 };
  const userRank = JLPT_RANK[user?.jlptLevel?.toUpperCase() || ''] || 0;
  const currentLevelRank = JLPT_RANK[selectedLevel?.toUpperCase() || ''] || 0;
  const isLowerLevel = userRank > currentLevelRank;

  // Bộ lọc bài học nhỏ trong chương (VD: Bài 1-1: 家族 vs Bài 1-2: 毎日)
  const [lessonFilter, setLessonFilter] = useState<'ALL' | '1-1' | '1-2'>('ALL');

  // Chế độ xem: 'master' (Kanji Master N5/N4) | 'canvas' (Studio vẽ nét) | 'dictionary' (Tra cứu tự do)
  const [viewMode, setViewMode] = useState<'master' | 'canvas' | 'dictionary'>('master');

  // Dữ liệu Roadmap
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState<boolean>(true);
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);

  // Chi tiết chương được chọn
  const [chapterDetail, setChapterDetail] = useState<ChapterDetailResponse | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);

  // 4 Thẻ chuyên sâu: 1: 'kanjis' | 2: 'context' | 3: 'minigame' | 4: 'test'
  const [activeTab, setActiveTab] = useState<'kanjis' | 'context' | 'minigame' | 'test'>('kanjis');

  const [activeKanji, setActiveKanji] = useState<ChapterKanjiItem | null>(null);
  const [showIllustrationModal, setShowIllustrationModal] = useState<boolean>(false);
  const [modalImageUrl, setModalImageUrl] = useState<string>('');
  const [modalImageTitle, setModalImageTitle] = useState<string>('');

  // Thu phóng & Di chuyển tranh tượng hình trong Modal
  const [modalZoom, setModalZoom] = useState<number>(1);
  const [modalPan, setModalPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [modalDragging, setModalDragging] = useState<boolean>(false);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedDistance = useRef<number>(0);

  // Khóa cuộn toàn bộ trang (body, html, main container) khi mở Modal tranh tượng hình
  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (showIllustrationModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (mainEl) mainEl.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (mainEl) mainEl.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (mainEl) mainEl.style.overflow = '';
    };
  }, [showIllustrationModal]);

  // Hỗ trợ phím ESC để thoát modal
  useEffect(() => {
    if (!showIllustrationModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIllustrationModal]);

  const handleCloseModal = () => {
    setShowIllustrationModal(false);
    setModalZoom(1);
    setModalPan({ x: 0, y: 0 });
    setModalDragging(false);
  };

  const handleModalWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (e.deltaY < 0) {
      // Cuộn lên -> Phóng to
      setModalZoom((prev) => Math.min(prev + 0.25, 4.0));
    } else {
      // Cuộn xuống -> Thu nhỏ
      setModalZoom((prev) => {
        const next = Math.max(prev - 0.25, 1);
        if (next === 1) setModalPan({ x: 0, y: 0 });
        return next;
      });
    }
  };

  const handleImageMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setModalDragging(true);
      dragStartPos.current = {
        x: e.clientX - modalPan.x,
        y: e.clientY - modalPan.y,
      };
      hasMovedDistance.current = 0;
    }
  };

  const handleImageMouseMove = (e: React.MouseEvent) => {
    if (!modalDragging) return;
    const newX = e.clientX - dragStartPos.current.x;
    const newY = e.clientY - dragStartPos.current.y;
    hasMovedDistance.current += Math.abs(newX - modalPan.x) + Math.abs(newY - modalPan.y);
    setModalPan({ x: newX, y: newY });
  };

  const handleImageMouseUp = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setModalDragging(false);
      // Nếu di chuột dưới 6px, xem như click trái -> Phóng to (Zoom In)
      if (hasMovedDistance.current < 6) {
        setModalZoom((prev) => Math.min(prev + 0.5, 4.0));
      }
    }
  };

  const handleImageContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // Click chuột phải -> Thu nhỏ (Zoom Out)
    setModalZoom((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) {
        setModalPan({ x: 0, y: 0 });
      }
      return next;
    });
  };

  // Thẻ 4: State bài thi & lịch sử các lần thi
  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({});
  const [submittingTest, setSubmittingTest] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);
  const [showResultCard, setShowResultCard] = useState<boolean>(false);
  const [showSakuraCelebration, setShowSakuraCelebration] = useState<boolean>(false);
  const [testHistory, setTestHistory] = useState<
    Array<{
      id: string;
      date: string;
      score: number;
      correctCount: number;
      totalQuestions: number;
      isPassed: boolean;
      answers: Record<number, string>;
    }>
  >([]);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState<boolean>(false);

  // Minigame states
  const [minigameInputs, setMinigameInputs] = useState<Record<string, string>>({});

  // Câu ngữ cảnh interactive states
  const [readingAnswers, setReadingAnswers] = useState<Record<number, string>>({});
  const [writingAnswers, setWritingAnswers] = useState<Record<number, string>>({});

  // TTS Pronunciation helper (Web Speech API)
  const speakJapanese = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const clean = text.replace(/\[|\]/g, '').replace(/Kanji đúng là:.*$/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleOpenIllustration = () => {
    if (!chapterDetail?.chapter.illustrationUrl) return;
    setModalImageUrl(chapterDetail.chapter.illustrationUrl);
    setModalImageTitle(`Chương ${chapterDetail.chapter.chapterNumber}: ${chapterDetail.chapter.titleJa} (${chapterDetail.chapter.titleVi}) — Tranh Tượng Hình`);
    setShowIllustrationModal(true);
  };

  const REVIEW_PAGES_CONFIG: Record<number, { page: number; file: string }> = {
    1: { page: 18, file: 'chap1_review_p18.webp' },
    2: { page: 27, file: 'chap2_review_p27.webp' },
    3: { page: 35, file: 'chap3_review_p35.webp' },
    4: { page: 43, file: 'chap4_review_p43.webp' },
    5: { page: 51, file: 'chap5_review_p51.webp' },
    6: { page: 61, file: 'chap6_review_p61.webp' },
    7: { page: 69, file: 'chap7_review_p69.webp' },
    8: { page: 77, file: 'chap8_review_p77.webp' },
    9: { page: 85, file: 'chap9_review_p85.webp' },
    10: { page: 93, file: 'chap10_review_p93.webp' },
    11: { page: 103, file: 'chap11_review_p103.webp' },
    12: { page: 111, file: 'chap12_review_p111.webp' },
    13: { page: 119, file: 'chap13_review_p119.webp' },
    14: { page: 127, file: 'chap14_review_p127.webp' },
    15: { page: 135, file: 'chap15_review_p135.webp' },
  };

  const handleOpenReviewPage = () => {
    const chNum = chapterDetail?.chapter.chapterNumber || 1;
    if (selectedLevel === 'N4') {
      setModalImageUrl(`/assets/kanji/n4/reviews/chap${chNum}_review_p11.webp`);
      setModalImageTitle(`Chương ${chNum} N4: Trang ôn tập ngữ cảnh & Viết chữ trong giáo trình (Trang 11)`);
    } else {
      const revConfig = REVIEW_PAGES_CONFIG[chNum] || { page: 18, file: `chap${chNum}_review_p18.webp` };
      setModalImageUrl(`/assets/kanji/n5/reviews/${revConfig.file}`);
      setModalImageTitle(`Chương ${chNum}: Trang ${revConfig.page} (Câu ngữ cảnh & Viết chữ trong giáo trình)`);
    }
    setShowIllustrationModal(true);
  };

  const handleOpenMinigameImage = (url: string, title: string) => {
    setModalImageUrl(url);
    setModalImageTitle(title);
    setShowIllustrationModal(true);
  };

  // Canvas Studio target
  const [canvasInitialKanji, setCanvasInitialKanji] = useState<string>('一');

  // 1. Tải lộ trình các chương từ Database theo Level được chọn (N5 / N4)
  const fetchRoadmap = async (level: string = selectedLevel) => {
    try {
      setLoadingRoadmap(true);
      const res: any = await axiosClient.get(`/kanji/${level.toLowerCase()}/roadmap`);
      const data: RoadmapResponse = res?.data ?? res;
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
  };

  useEffect(() => {
    fetchRoadmap(selectedLevel);
  }, [selectedLevel]);

  // 2. Tải chi tiết chương được chọn
  const fetchChapterDetail = async (chapterId: number, level: string = selectedLevel) => {
    try {
      setLoadingDetail(true);
      setSubmitResult(null);
      setShowResultCard(false);
      setTestAnswers({});
      setMinigameInputs({});
      setShowHistoryDropdown(false);
      setLessonFilter('ALL');

      // Tải lịch sử làm bài thi của chương này từ localStorage
      try {
        const savedHistory = localStorage.getItem(`kanji_test_history_${chapterId}`);
        if (savedHistory) {
          setTestHistory(JSON.parse(savedHistory));
        } else {
          setTestHistory([]);
        }
      } catch (e) {
        setTestHistory([]);
      }

      const res: any = await axiosClient.get(`/kanji/${level.toLowerCase()}/chapters/${chapterId}`);
      const data: ChapterDetailResponse = res?.data ?? res;
      if (data && data.chapter) {
        setChapterDetail(data);
        if (data.kanjis && data.kanjis.length > 0) {
          setActiveKanji(data.kanjis[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load chapter details:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    if (selectedChapterId) {
      fetchChapterDetail(selectedChapterId, selectedLevel);
    }
  }, [selectedChapterId, selectedLevel]);

  // 3. Xử lý nộp bài test ôn tập
  const handleSubmitReviewTest = async () => {
    if (!chapterDetail) return;
    const allExercises = [
      ...(chapterDetail.readingExercises || []),
      ...(chapterDetail.writingExercises || []),
    ];

    if (allExercises.length === 0) return;

    let correctCount = 0;
    allExercises.forEach((ex) => {
      if (testAnswers[ex.id] === ex.correctAnswer) {
        correctCount++;
      }
    });

    const totalQuestions = allExercises.length;
    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);

    try {
      setSubmittingTest(true);
      const res: any = await axiosClient.post(`/kanji/${selectedLevel.toLowerCase()}/chapters/${selectedChapterId}/submit`, {
        score: calculatedScore,
        totalQuestions,
        correctCount,
        answers: testAnswers,
      });

      const result: SubmitResult = res?.data ?? res;
      if (result) {
        setSubmitResult(result);
        setShowResultCard(true);

        // Kích hoạt pop-up chúc mừng hoa anh đào rơi nếu đạt chuẩn pass (>= 85%)
        if (result.isPassed || calculatedScore >= 85) {
          setShowSakuraCelebration(true);
        }

        // Lưu kết quả làm bài vào lịch sử của chương này
        const newHistoryItem = {
          id: Date.now().toString(),
          date: new Date().toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          score: calculatedScore,
          correctCount,
          totalQuestions,
          isPassed: calculatedScore >= 85,
          answers: { ...testAnswers },
        };
        const nextHistory = [newHistoryItem, ...testHistory];
        setTestHistory(nextHistory);
        try {
          localStorage.setItem(`kanji_test_history_${selectedChapterId}`, JSON.stringify(nextHistory));
        } catch (e) {}

        // Tải lại roadmap để cập nhật ổ khóa & điểm số trên cột trái mà không nhảy trang
        fetchRoadmap(selectedLevel);
      }
    } catch (err) {
      console.error('Failed to submit test:', err);
    } finally {
      setSubmittingTest(false);
    }
  };

  // Helper xem lại kết quả lần test trước
  const handleReviewPastAttempt = (attempt: any) => {
    setTestAnswers(attempt.answers);
    setSubmitResult({
      score: attempt.score,
      isPassed: attempt.isPassed,
      unlockedNextChapter: false,
      message: attempt.isPassed
        ? `Lần thi (${attempt.date}): Xuất sắc đạt ${attempt.score}% (${attempt.correctCount}/${attempt.totalQuestions} câu đúng).`
        : `Lần thi (${attempt.date}): Đạt ${attempt.score}% (${attempt.correctCount}/${attempt.totalQuestions} câu đúng).`,
    });
    setShowResultCard(true);
    setShowHistoryDropdown(false);
  };

  // Helper chuyển sang Canvas Studio luyện chữ
  const handlePracticeInStudio = (char: string) => {
    setCanvasInitialKanji(char);
    setViewMode('canvas');
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1c1917] p-4 md:p-8 font-sans selection:bg-[#e7e5e4]">
      {/* ─── THANH ĐIỀU HƯỚNG CHÍNH ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#e7e5e4] gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-block px-2 py-0.5 text-xs font-semibold tracking-wider bg-[#b91c1c] text-white rounded-none">
                KANJI MASTER {selectedLevel}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#78716c] font-mono">
                BẢN CHUẨN GIÁO TRÌNH
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1c1917] mt-1 tracking-tight">
              {t('master.title', `Kho Hán Tự — Kanji Master ${selectedLevel}`)}
            </h1>
            <p className="text-sm text-[#78716c] mt-1">
              {selectedLevel === 'N4'
                ? '9 Chương · 199 Chữ Hán · Tranh tình huống & Minigame đời sống · Đạt ≥ 85% mở khóa chương.'
                : '15 Chương · 118 Chữ Hán · Tranh tượng hình · Minigame · Đạt ≥ 85% mở khóa chương.'}
            </p>

            {/* Level Selector Tabs: N5 & N4 */}
            <div className="flex items-center gap-2 mt-3">
              {(['N5', 'N4'] as const).map((lvl) => {
                const isCur = selectedLevel === lvl;
                const isUserLvl = user?.jlptLevel?.toUpperCase() === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => {
                      if (selectedLevel !== lvl) {
                        setSelectedLevel(lvl);
                        setSelectedChapterId(0);
                      }
                    }}
                    className={`px-3 py-1.5 text-xs font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCur
                        ? 'bg-[#b91c1c] text-white border-[#b91c1c] shadow-xs'
                        : 'bg-white text-[#44403c] border-[#e7e5e4] hover:border-[#a8a29e] hover:bg-[#fafaf9]'
                    }`}
                  >
                    <span>JLPT {lvl}</span>
                    {lvl === 'N4' ? (
                      <span className={`text-[10px] ${isCur ? 'text-red-100' : 'text-[#78716c]'}`}>
                        (9 Chương)
                      </span>
                    ) : (
                      <span className={`text-[10px] ${isCur ? 'text-red-100' : 'text-[#78716c]'}`}>
                        (15 Chương)
                      </span>
                    )}
                    {isUserLvl && (
                      <span className={`text-[9px] px-1 py-0.2 rounded-xs font-sans ${isCur ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-700'}`}>
                        Mục tiêu
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-[#f5f5f4] p-1 border border-[#e7e5e4]">
            <button
              onClick={() => setViewMode('master')}
              className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                viewMode === 'master'
                  ? 'bg-white text-[#1c1917] shadow-sm font-semibold'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              {t('master.tabRoadmap', '🗾 Lộ trình Kanji Master')}
            </button>
            <button
              onClick={() => setViewMode('canvas')}
              className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                viewMode === 'canvas'
                  ? 'bg-white text-[#1c1917] shadow-sm font-semibold'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              {t('master.tabCanvas', '✍️ Bảng vẽ & OCR Studio')}
            </button>
          </div>
        </div>

        {/* Tiến độ tổng quan */}
        {roadmap && viewMode === 'master' && (
          <div className="mt-4 p-4 bg-white border border-[#e7e5e4] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs text-[#78716c] uppercase font-mono">TIẾN ĐỘ CHƯƠNG</div>
                <div className="text-lg font-serif font-bold text-[#1c1917]">
                  {roadmap.completedChapters} <span className="text-xs font-normal text-[#a8a29e]">/ {roadmap.totalChapters} Chương</span>
                </div>
              </div>
              <div className="h-8 w-px bg-[#e7e5e4]" />
              <div>
                <div className="text-xs text-[#78716c] uppercase font-mono">ĐIỀU KIỆN MỞ KHÓA</div>
                <div className="text-xs font-medium text-[#44403c] mt-1">
                  Đạt điểm test <span className="font-bold text-[#b91c1c]">≥ 85%</span> ở bài kiểm tra cuối chương
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── NỘI DUNG VIEW MODE: CANVAS STUDIO ─────────────────────────── */}
      {viewMode === 'canvas' && (
        <div className="max-w-7xl mx-auto">
          <KanjiCanvasStudio
            initialKanji={canvasInitialKanji}
            onBackToLearning={() => setViewMode('master')}
          />
        </div>
      )}

      {/* ─── NỘI DUNG VIEW MODE: KANJI MASTER ──────────────────────────── */}
      {viewMode === 'master' && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ════════ CỘT TRÁI: MỤC LỤC 15 CHƯƠNG (SIDEBAR) ════════ */}
          <div className="lg:col-span-4 bg-white border border-[#e7e5e4] p-4 sticky top-6">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e7e5e4]">
              <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#1c1917]">
                {t('master.chapterList', { total: roadmap?.totalChapters || (selectedLevel === 'N4' ? 9 : 15), level: selectedLevel, defaultValue: `Mục lục ${roadmap?.totalChapters || (selectedLevel === 'N4' ? 9 : 15)} chương ${selectedLevel}` })}
              </h2>
              <span className="text-xs text-[#78716c]">
                {roadmap?.chapters.length || (selectedLevel === 'N4' ? 9 : 15)} Chương
              </span>
            </div>


            {loadingRoadmap ? (
              <div className="py-12 flex flex-col items-center justify-center text-[#78716c]">
                <Loader2 className="w-6 h-6 animate-spin mb-2 text-[#b91c1c]" />
                <span className="text-xs">Đang tải dữ liệu lộ trình...</span>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
                {isLowerLevel && (
                  <div className="mb-3 p-2.5 bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] text-[11px] flex items-start gap-2 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
                    <span className="leading-tight">
                      Bạn đang ở trình độ <strong>{user?.jlptLevel?.toUpperCase()}</strong> — Toàn bộ các chương của <strong>{selectedLevel}</strong> đã được mở khóa tự do để bạn tra cứu và ôn tập!
                    </span>
                  </div>
                )}
                {roadmap?.chapters.map((chap) => {
                  const isSelected = selectedChapterId === chap.id;
                  const isUnlocked = chap.isUnlocked || isLowerLevel;
                  const isLocked = !isUnlocked;
                  const isPassed = chap.isPassed;
                  const canAccess = !isLocked;

                  return (
                    <div
                      key={chap.id}
                      onClick={() => {
                        if (canAccess) {
                          setSelectedChapterId(chap.id);
                        }
                      }}
                      className={`w-full text-left p-3 border transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-[#b91c1c] bg-[#fef2f2] shadow-sm'
                          : !canAccess
                          ? 'border-[#f5f5f4] bg-[#fafaf9] opacity-60 cursor-not-allowed'
                          : 'border-[#e7e5e4] bg-white hover:border-[#d6d3d1] cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Biểu tượng số chương */}
                        <div
                          className={`w-7 h-7 flex items-center justify-center font-mono text-xs font-bold border ${
                            isSelected
                              ? 'bg-[#b91c1c] text-white border-[#b91c1c]'
                              : isPassed
                              ? 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]'
                              : isLocked
                              ? 'bg-[#e7e5e4] text-[#78716c] border-[#d6d3d1]'
                              : 'bg-white text-[#44403c] border-[#e7e5e4]'
                          }`}
                        >
                          {chap.chapterNumber < 10 ? `0${chap.chapterNumber}` : chap.chapterNumber}
                        </div>

                        {/* Tên chương */}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-sm text-[#1c1917]">
                              {chap.titleJa}
                            </span>
                            <span className="text-xs text-[#78716c]">
                              ({isEn ? chap.titleEn : chap.titleVi})
                            </span>
                          </div>
                          <div className="text-[11px] text-[#a8a29e] mt-0.5">
                            {chap.kanjiCount} Chữ Hán
                            {chap.highestScore > 0 && (
                              <span className="ml-2 text-[#166534] font-medium font-mono">
                                • {chap.highestScore}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Trạng thái khóa / đã qua bài */}
                      <div className="flex items-center gap-1.5">
                        {isLocked ? (
                          <Lock className="w-4 h-4 text-[#a8a29e]" />
                        ) : isPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                        ) : (
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isSelected ? 'text-[#b91c1c] translate-x-0.5' : 'text-[#d6d3d1] group-hover:text-[#78716c]'
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ════════ CỘT PHẢI: KHUNG HỌC TẬP 4 THẺ CHUYÊN SÂU ════════ */}
          <div className="lg:col-span-8 space-y-6">
            {loadingDetail ? (
              <div className="bg-white border border-[#e7e5e4] p-16 flex flex-col items-center justify-center text-[#78716c]">
                <Loader2 className="w-8 h-8 animate-spin mb-3 text-[#b91c1c]" />
                <span className="text-sm font-medium">Đang tải nội dung chương học...</span>
              </div>
            ) : chapterDetail ? (
              <>
                {/* Header chương đang chọn */}
                <div className="bg-white border border-[#e7e5e4] p-6 relative overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#b91c1c]">
                        <span>CHƯƠNG {chapterDetail.chapter.chapterNumber}</span>
                        <span>•</span>
                        <span>{chapterDetail.kanjis.length} CHỮ HÁN</span>
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-[#1c1917] mt-1">
                        {chapterDetail.chapter.titleJa}{' '}
                        <span className="text-xl font-normal text-[#78716c]">
                          ({isEn ? chapterDetail.chapter.titleEn : chapterDetail.chapter.titleVi})
                        </span>
                      </h2>
                      <p className="text-sm text-[#78716c] mt-2 max-w-xl">
                        {chapterDetail.chapter.description}
                      </p>
                    </div>

                    {/* Cụm nút công cụ */}
                    <div className="flex items-center gap-2 flex-wrap self-start md:self-auto">
                      {/* Nút xem tranh tượng hình mở đầu */}
                      {chapterDetail.chapter.illustrationUrl && (
                        <button
                          onClick={handleOpenIllustration}
                          className="px-3.5 py-2 border border-[#e7e5e4] bg-[#fafaf9] hover:bg-white text-xs font-medium text-[#1c1917] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#b91c1c]" />
                          <span>Xem tranh tượng hình</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 4 THẺ ĐIỀU HƯỚNG CHUYÊN SÂU */}
                  {/* 4 THẺ ĐIỀU HƯỚNG CHUYÊN SÂU */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-t border-[#e7e5e4] mt-6 pt-4">
                    <button
                      onClick={() => setActiveTab('kanjis')}
                      className={`px-3 py-2.5 text-xs font-medium tracking-wide border transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center ${
                        activeTab === 'kanjis'
                          ? 'border-[#b91c1c] bg-[#fff5f5] text-[#b91c1c] font-bold shadow-sm'
                          : 'border-[#e7e5e4] bg-[#fafaf9] text-[#78716c] hover:bg-white hover:text-[#1c1917]'
                      }`}
                    >
                      <span>{t('master.tab1', 'Chữ Hán & Nét vẽ')}</span>
                      <span className="text-[10px] bg-[#f5f5f4] px-1.5 py-0.5 rounded font-mono font-bold">
                        {chapterDetail.kanjis.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('context')}
                      className={`px-3 py-2.5 text-xs font-medium tracking-wide border transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center ${
                        activeTab === 'context'
                          ? 'border-[#b91c1c] bg-[#fff5f5] text-[#b91c1c] font-bold shadow-sm'
                          : 'border-[#e7e5e4] bg-[#fafaf9] text-[#78716c] hover:bg-white hover:text-[#1c1917]'
                      }`}
                    >
                      <span>{t('master.tab2', 'Câu ngữ cảnh')}</span>
                      <span className="text-[10px] bg-[#f5f5f4] px-1.5 py-0.5 rounded font-mono font-bold">
                        {(chapterDetail.readingExercises?.length || 0) + (chapterDetail.writingExercises?.length || 0)}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('minigame')}
                      className={`px-3 py-2.5 text-xs font-medium tracking-wide border transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center ${
                        activeTab === 'minigame'
                          ? 'border-[#b91c1c] bg-[#fff5f5] text-[#b91c1c] font-bold shadow-sm'
                          : 'border-[#e7e5e4] bg-[#fafaf9] text-[#78716c] hover:bg-white hover:text-[#1c1917]'
                      }`}
                    >
                      <span>{t('master.tab3', 'Minigame tình huống')}</span>
                      <span className="text-[10px] bg-[#f5f5f4] px-1.5 py-0.5 rounded font-mono font-bold">
                        {chapterDetail.minigames?.length || 0}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('test')}
                      className={`px-3 py-2.5 text-xs font-medium tracking-wide border transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center ${
                        activeTab === 'test'
                          ? 'border-[#b91c1c] bg-[#fff5f5] text-[#b91c1c] font-bold shadow-sm'
                          : 'border-[#e7e5e4] bg-[#fafaf9] text-[#78716c] hover:bg-white hover:text-[#1c1917]'
                      }`}
                    >
                      <span>{t('master.tab4', 'Test ôn tập')}</span>
                    </button>
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────────
                    THẺ 1: CHỮ HÁN & NÉT VẼ (KANJIS & STROKES)
                ────────────────────────────────────────────────────────────── */}
                {activeTab === 'kanjis' && (
                  <div className="space-y-6">
                    {/* Danh sách chữ Hán trong chương */}
                    <div className="bg-white border border-[#e7e5e4] p-4">
                      <div className="text-xs uppercase font-mono text-[#78716c] mb-3">
                        CHỌN CHỮ HÁN ĐỂ XEM CHI TIẾT & HOẠT ẢNH NÉT VẼ:
                      </div>

                      {/* Grid Kanji */}
                      <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
                        {chapterDetail.kanjis.map((k) => {
                          const idx = chapterDetail.kanjis.findIndex((item) => item.id === k.id);
                          const isSelected = activeKanji?.id === k.id;
                          return (
                            <button
                              key={k.id}
                              onClick={() => setActiveKanji(k)}
                              className={`aspect-square flex flex-col items-center justify-center border transition-all ${
                                isSelected
                                  ? 'border-[#b91c1c] bg-[#b91c1c] text-white shadow'
                                  : 'border-[#e7e5e4] bg-[#fafaf9] hover:bg-white text-[#1c1917]'
                              }`}
                            >
                              <span className="text-xl font-serif">{k.character}</span>
                              <span className={`text-[10px] ${isSelected ? 'text-red-100' : 'text-[#a8a29e]'}`}>
                                {idx + 1}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Khung chi tiết chữ Hán đang chọn */}
                    {activeKanji && (() => {
                      const activeKanjiIndex = chapterDetail?.kanjis ? chapterDetail.kanjis.findIndex((k) => k.id === activeKanji.id) : 0;
                      const chapterNum = chapterDetail?.chapter.chapterNumber || selectedChapterId;
                      const illustrationUrl =
                        activeKanji.imageUrl ||
                        `/assets/kanji/n5/illustrations/chap${chapterNum}_kanji_${activeKanjiIndex + 1}.webp`;

                      return (
                        <div className="bg-white border border-[#e7e5e4] p-5 sm:p-6 shadow-xs">
                          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                            {/* CỘT TRÁI: DUAL KHUNG HOẠT ẢNH NÉT BÚT & ẢNH MINH HỌA NGÓN TAY/TƯỢNG HÌNH KẾ BÊN */}
                            <div className="xl:col-span-6 flex flex-col bg-[#fafaf9] border border-[#e7e5e4] p-4">
                              <div className="text-xs uppercase font-mono text-[#78716c] mb-3 flex items-center justify-between">
                                <span className="font-bold text-[#1c1917]">NÉT BÚT CHUẨN & MINH HỌA TRỰC QUAN</span>
                                <span className="text-[10px] bg-white border border-[#e7e5e4] px-1.5 py-0.5 font-bold font-mono">
                                  {activeKanji.strokeCount} NÉT
                                </span>
                              </div>

                              {/* 2 khung hiển thị song song kế bên nhau */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
                                {/* Khung 1: Hoạt ảnh nét bút động (Demo) */}
                                <div className="bg-white border border-[#e7e5e4] p-2 flex flex-col items-center justify-between">
                                  <div className="text-[10px] font-mono font-bold text-[#78716c] mb-1.5 uppercase w-full text-center pb-1 border-b border-[#f5f5f4]">
                                    Hoạt ảnh nét bút
                                  </div>
                                  <div className="w-full flex-1 flex items-center justify-center py-1">
                                    <KanjiStrokeWriter
                                      character={activeKanji.character}
                                      size={165}
                                      showNumbers={true}
                                    />
                                  </div>
                                </div>

                                {/* Khung 2: Ảnh minh họa nét ngón tay / tượng hình kế bên */}
                                <div className="bg-white border border-[#e7e5e4] p-2 flex flex-col items-center justify-between">
                                  <div className="text-[10px] font-mono font-bold text-[#78716c] mb-1.5 uppercase w-full text-center pb-1 border-b border-[#f5f5f4]">
                                    Minh họa nét
                                  </div>
                                  <div className="w-full flex-1 flex items-center justify-center p-3 bg-[#fafaf9] border border-[#f5f5f4] min-h-[175px]">
                                    <img
                                      src={illustrationUrl}
                                      alt={`Minh họa nét chữ ${activeKanji.character}`}
                                      className="max-h-[145px] max-w-full object-contain transition-transform hover:scale-105"
                                      onError={(e) => {
                                        // Ẩn ảnh nếu không tìm thấy file thay vì hiển thị nhầm ảnh chữ Hán chương 1
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        if (target.parentElement) {
                                          const fallbackEl = target.parentElement.querySelector('.kanji-fallback-badge');
                                          if (fallbackEl) (fallbackEl as HTMLElement).style.display = 'flex';
                                        }
                                      }}
                                    />
                                    <div className="kanji-fallback-badge hidden flex-col items-center justify-center text-center p-2 text-[#a8a29e]">
                                      <span className="text-3xl font-serif text-[#d6d3d1] mb-1">{activeKanji.character}</span>
                                      <span className="text-[10px] font-mono">Hình tượng hình</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Nút thực hành tự vẽ chữ */}
                              <div className="mt-4 pt-3 border-t border-[#e7e5e4]">
                                <button
                                  onClick={() => handlePracticeInStudio(activeKanji.character)}
                                  className="w-full py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-sm"
                                >
                                  <PenTool className="w-3.5 h-3.5" />
                                  <span>Thực hành tự vẽ nét này</span>
                                </button>
                              </div>
                            </div>

                            {/* CỘT PHẢI: THÔNG TIN NGỮ ÂM, BỘ THỦ, MẸO NHỚ */}
                            <div className="xl:col-span-6 space-y-4">
                              <div>
                                {chapterDetail?.chapter.jlptLevel === 'N4' && (
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-mono px-2 py-0.5 bg-[#fef2f2] text-[#b91c1c] border border-red-200 font-bold uppercase">
                                      Chương {chapterDetail.chapter.chapterNumber}: {chapterDetail.chapter.titleJa} ({chapterDetail.chapter.titleVi})
                                    </span>
                                    <span className="text-[10px] font-mono text-[#78716c]">
                                      Chữ {activeKanjiIndex + 1} / {chapterDetail.kanjis.length}
                                    </span>
                                  </div>
                                )}
                                <div className="flex items-baseline gap-3">
                                  <h3 className="text-4xl font-serif font-bold text-[#1c1917]">
                                    {activeKanji.character}
                                  </h3>
                                  <span className="text-lg font-serif font-bold text-[#b91c1c]">
                                    {activeKanji.hanViet}
                                  </span>
                                  <span className="text-sm text-[#78716c]">
                                    {activeKanji.meaning}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#e7e5e4]">
                                <div>
                                  <div className="text-[11px] font-mono uppercase text-[#a8a29e]">ÂM ON (Hán-Nhật)</div>
                                  <div className="text-base font-serif font-bold text-[#1c1917] mt-0.5">
                                    {activeKanji.onReading || '—'}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-[11px] font-mono uppercase text-[#a8a29e]">ÂM KUN (Thuần Nhật)</div>
                                  <div className="text-base font-serif font-bold text-[#1c1917] mt-0.5">
                                    {activeKanji.kunReading || '—'}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-[11px] font-mono uppercase text-[#a8a29e]">SỐ NÉT VIẾT</div>
                                  <div className="text-sm font-medium text-[#44403c] mt-0.5">
                                    {activeKanji.strokeCount} nét
                                  </div>
                                </div>
                                <div>
                                  <div className="text-[11px] font-mono uppercase text-[#a8a29e]">BỘ THỦ (RADICAL)</div>
                                  <div className="text-sm font-medium text-[#44403c] mt-0.5">
                                    {activeKanji.radical || '—'}
                                  </div>
                                </div>
                              </div>

                              {/* Mẹo nhớ siêu trí nhớ */}
                              {activeKanji.mnemonicHint && (
                                <div className="p-3 bg-[#fefce8] border border-[#fef08a] flex items-start gap-3">
                                  <span className="text-xl">{activeKanji.mnemonicIcon || '💡'}</span>
                                  <div>
                                    <div className="text-xs font-bold text-[#854d0e] uppercase font-mono">
                                      MẸO LIÊN TƯỞNG NHỚ CHỮ:
                                    </div>
                                    <p className="text-xs text-[#713f12] mt-0.5 leading-relaxed">
                                      {activeKanji.mnemonicHint}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Từ vựng liên quan */}
                              {activeKanji.relatedWords && (
                                <div>
                                  <div className="text-xs uppercase font-mono text-[#78716c] mb-1.5">
                                    TỪ VỰNG TIÊU BIỂU:
                                  </div>
                                  <div className="text-xs font-medium text-[#44403c] bg-[#fafaf9] p-2.5 border border-[#e7e5e4]">
                                    {activeKanji.relatedWords}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* ─────────────────────────────────────────────────────────────
                    THẺ 2: CÂU NGỮ CẢNH (CONTEXT SENTENCES - VISUAL SCENARIO CARDS)
                ────────────────────────────────────────────────────────────── */}
                {activeTab === 'context' && (
                  <div className="space-y-6">
                    {/* Header bar với nút Xem trang sách gốc P.18 */}
                    <div className="bg-white border border-[#e7e5e4] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-[#b91c1c]" />
                        <div>
                          <h3 className="font-serif font-bold text-sm text-[#1c1917]">
                            {chapterDetail.chapter.jlptLevel === 'N4' && chapterDetail.chapter.chapterNumber === 1
                              ? 'Tình Huống Ngữ Cảnh Chuẩn Giáo Trình N4 (Chương 1: 家族)'
                              : `Tình Huống Ngữ Cảnh Chuẩn Giáo Trình (Chương ${chapterDetail.chapter.chapterNumber})`}
                          </h3>
                          <p className="text-[11px] text-[#78716c]">
                            {chapterDetail.chapter.jlptLevel === 'N4' && chapterDetail.chapter.chapterNumber === 1
                              ? '20 câu luyện đọc & viết chữ Hán kèm 12 từ vựng ứng dụng về đời sống gia đình'
                              : '20 câu luyện đọc & viết chữ Hán trong bối cảnh đời sống Nhật Bản thực tế'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleOpenReviewPage}
                        className="px-3.5 py-1.5 border border-[#b91c1c] bg-[#fef2f2] hover:bg-[#b91c1c] text-[#b91c1c] hover:text-white text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer shadow-2xs w-fit rounded-none"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{selectedLevel === 'N4' ? 'Xem trang bài tập trong sách N4' : 'Xem trang bài tập gốc trong sách (P.18)'}</span>
                        <Maximize2 className="w-3 h-3 opacity-70" />
                      </button>
                    </div>

                    {/* Phần 1: よみましょう (Đọc câu ngữ cảnh - Thẻ trực quan) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#e7e5e4]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#b91c1c]" />
                          <h4 className="font-serif font-bold text-base text-[#1c1917]">
                            1. よみましょう (Đọc câu ngữ cảnh)
                          </h4>
                          <span className="text-xs text-[#78716c]">
                            — Nghe phát âm chuẩn & kiểm tra cách đọc từng chữ
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#78716c]">
                          {chapterDetail.readingExercises?.length || 0} CÂU
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {chapterDetail.readingExercises?.map((ex, idx) => {
                          const isN4Ch1 = chapterDetail.chapter.jlptLevel === 'N4' && chapterDetail.chapter.chapterNumber === 1;
                          const theme = isN4Ch1
                            ? (N4_CH1_READING_THEMES[idx + 1] || {
                                emoji: '📖',
                                badge: 'Chương 1: 家族',
                                scene: 'Ngữ cảnh giao tiếp',
                                meaningVi: ex.explanation || ''
                              })
                            : (SCENARIO_THEMES[idx + 1] || {
                                emoji: '📖',
                                badge: `Tình huống ${idx + 1}`,
                                scene: 'Ngữ cảnh giao tiếp',
                                iconBg: 'bg-stone-50 text-stone-700 border-stone-200',
                                meaningVi: ex.explanation || ''
                              });
                          let options: string[] = [];
                          try {
                            options = typeof ex.optionsJson === 'string' ? JSON.parse(ex.optionsJson) : (ex.optionsJson || []);
                          } catch {
                            options = [ex.correctAnswer];
                          }
                          const selected = readingAnswers[ex.id];

                          return (
                            <div
                              key={ex.id}
                              className="bg-white border border-[#e7e5e4] p-4.5 flex flex-col justify-between hover:border-[#b91c1c]/40 transition-all shadow-xs"
                            >
                              {/* Header thẻ: Emoji minh họa & Badge tình huống + Nút nghe âm thanh */}
                              <div>
                                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#f5f5f4]">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl p-1 bg-[#fafaf9] rounded border border-[#e7e5e4]">{theme.emoji}</span>
                                    <div>
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[11px] font-bold font-serif text-[#1c1917]">
                                          {theme.badge}
                                        </span>
                                        <span className="text-[9px] font-mono px-1 py-0.2 bg-[#f5f5f4] text-[#78716c]">
                                          #{idx + 1}
                                        </span>
                                      </div>
                                      <div className="text-[10px] text-[#a8a29e]">{theme.scene}</div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => speakJapanese(ex.questionText)}
                                    className="p-1.5 hover:bg-[#fef2f2] text-[#78716c] hover:text-[#b91c1c] transition-colors rounded-none cursor-pointer flex items-center gap-1 text-xs font-mono font-bold"
                                    title="Nghe phát âm chuẩn giọng bản xứ"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                    <span className="hidden sm:inline text-[10px]">Phát âm</span>
                                  </button>
                                </div>

                                {/* Câu tiếng Nhật với chữ Hán nổi bật */}
                                <div className="font-serif text-base font-bold text-[#1c1917] leading-relaxed mb-1.5">
                                  {ex.questionText.split(/(\[[^\]]+\])/).map((part, pIdx) => {
                                    if (part.startsWith('[') && part.endsWith(']')) {
                                      const word = part.slice(1, -1);
                                      return (
                                        <span
                                          key={pIdx}
                                          className="text-[#b91c1c] bg-[#fef2f2] px-1.5 py-0.5 border border-[#fecaca] mx-1 rounded-none inline-block font-extrabold shadow-2xs"
                                        >
                                          {word}
                                        </span>
                                      );
                                    }
                                    return <span key={pIdx}>{part}</span>;
                                  })}
                                </div>

                                {/* Dịch nghĩa tiếng Việt */}
                                <p className="text-xs text-[#78716c] italic mb-3">
                                  &ldquo;{theme.meaningVi}&rdquo;
                                </p>
                              </div>

                              {/* Lựa chọn cách đọc tương tác */}
                              <div className="pt-2 border-t border-[#f5f5f4] space-y-2">
                                <div className="text-[10px] uppercase font-mono text-[#a8a29e]">
                                  Chọn cách đọc chuẩn của chữ trong ngoặc:
                                </div>
                                <div className="grid grid-cols-2 gap-1.5">
                                  {options.map((opt) => {
                                    const isChosen = selected === opt;
                                    const isCorrect = opt === ex.correctAnswer;
                                    let btnStyle = 'bg-[#fafaf9] border-[#e7e5e4] text-[#44403c] hover:bg-white hover:border-[#d6d3d1]';
                                    if (selected) {
                                      if (isCorrect) {
                                        btnStyle = 'bg-[#15803d] text-white border-[#15803d] font-bold shadow-xs';
                                      } else if (isChosen) {
                                        btnStyle = 'bg-[#dc2626] text-white border-[#dc2626] font-bold';
                                      } else {
                                        btnStyle = 'opacity-40 bg-[#f5f5f4] text-[#a8a29e] border-[#e7e5e4]';
                                      }
                                    }

                                    return (
                                      <button
                                        key={opt}
                                        onClick={() =>
                                          setReadingAnswers({
                                            ...readingAnswers,
                                            [ex.id]: opt,
                                          })
                                        }
                                        className={`px-2.5 py-1.5 text-xs font-serif text-center border transition-all cursor-pointer rounded-none ${btnStyle}`}
                                      >
                                        {opt}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Giải thích ngữ cảnh khi đã chọn */}
                                {selected && (
                                  <div className="p-2.5 bg-[#fefce8] border border-[#fef08a] text-[11px] text-[#713f12] mt-2">
                                    <div className="font-bold flex items-center gap-1 font-mono text-xs">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
                                      <span>Đáp án: {ex.correctAnswer}</span>
                                    </div>
                                    {ex.explanation && (
                                      <div className="mt-1 text-[#854d0e] leading-snug">{ex.explanation}</div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Phần 2: かきましょう (Viết chữ Hán) */}
                    <div className="space-y-3 pt-4 border-t border-[#e7e5e4]">
                      <div className="flex items-center justify-between pb-2 border-b border-[#e7e5e4]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#b91c1c]" />
                          <h4 className="font-serif font-bold text-base text-[#1c1917]">
                            2. かきましょう (Viết chữ Hán)
                          </h4>
                          <span className="text-xs text-[#78716c]">
                            — Đọc câu Hiragana và chọn chữ Kanji tương ứng
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#78716c]">
                          {chapterDetail.writingExercises?.length || 0} CÂU
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {chapterDetail.writingExercises?.map((ex, idx) => {
                          const isN4Ch1 = chapterDetail.chapter.jlptLevel === 'N4' && chapterDetail.chapter.chapterNumber === 1;
                          const theme = isN4Ch1
                            ? (N4_CH1_WRITING_THEMES[idx + 1] || {
                                emoji: '✍️',
                                badge: 'Chương 1: 家族',
                                scene: 'Thực hành chữ viết',
                                meaningVi: ex.explanation || ''
                              })
                            : (WRITING_THEMES[idx + 1] || {
                                emoji: '✍️',
                                badge: `Chữ Hán ${idx + 1}`,
                                scene: 'Thực hành chữ viết',
                                meaningVi: ex.explanation || ''
                              });
                          let options: string[] = [];
                          try {
                            options = typeof ex.optionsJson === 'string' ? JSON.parse(ex.optionsJson) : (ex.optionsJson || []);
                          } catch {
                            options = [ex.correctAnswer];
                          }
                          const selected = writingAnswers[ex.id];

                          return (
                            <div
                              key={ex.id}
                              className="bg-white border border-[#e7e5e4] p-4.5 flex flex-col justify-between hover:border-[#b91c1c]/40 transition-all shadow-xs"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#f5f5f4]">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl p-1 bg-[#fafaf9] rounded border border-[#e7e5e4]">{theme.emoji}</span>
                                    <div>
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[11px] font-bold font-serif text-[#1c1917]">
                                          {theme.badge}
                                        </span>
                                        <span className="text-[9px] font-mono px-1 py-0.2 bg-[#f5f5f4] text-[#78716c]">
                                          #{idx + 1}
                                        </span>
                                      </div>
                                      <div className="text-[10px] text-[#a8a29e]">{theme.scene}</div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => speakJapanese(ex.questionText)}
                                    className="p-1.5 hover:bg-[#fef2f2] text-[#78716c] hover:text-[#b91c1c] transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono font-bold"
                                    title="Nghe phát âm câu"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                    <span className="hidden sm:inline text-[10px]">Phát âm</span>
                                  </button>
                                </div>

                                <div className="font-serif text-base font-bold text-[#1c1917] leading-relaxed mb-1.5">
                                  {ex.questionText.split(/(\[[^\]]+\])/).map((part, pIdx) => {
                                    if (part.startsWith('[') && part.endsWith(']')) {
                                      const word = part.slice(1, -1);
                                      return (
                                        <span
                                          key={pIdx}
                                          className="text-[#b91c1c] bg-[#fef2f2] px-1.5 py-0.5 border border-[#fecaca] mx-1 rounded-none inline-block font-extrabold shadow-2xs"
                                        >
                                          {word}
                                        </span>
                                      );
                                    }
                                    return <span key={pIdx}>{part}</span>;
                                  })}
                                </div>

                                <p className="text-xs text-[#78716c] italic mb-3">
                                  &ldquo;{theme.meaningVi}&rdquo;
                                </p>
                              </div>

                              <div className="pt-2 border-t border-[#f5f5f4] space-y-2">
                                <div className="text-[10px] uppercase font-mono text-[#a8a29e]">
                                  Chọn chữ Kanji tương ứng:
                                </div>
                                <div className="grid grid-cols-4 gap-1.5">
                                  {options.map((opt) => {
                                    const isChosen = selected === opt;
                                    const isCorrect = opt === ex.correctAnswer;
                                    let btnStyle = 'bg-[#fafaf9] border-[#e7e5e4] text-[#1c1917] hover:bg-white';
                                    if (selected) {
                                      if (isCorrect) {
                                        btnStyle = 'bg-[#15803d] text-white border-[#15803d] font-bold shadow-xs';
                                      } else if (isChosen) {
                                        btnStyle = 'bg-[#dc2626] text-white border-[#dc2626] font-bold';
                                      } else {
                                        btnStyle = 'opacity-40 bg-[#f5f5f4] text-[#a8a29e] border-[#e7e5e4]';
                                      }
                                    }

                                    return (
                                      <button
                                        key={opt}
                                        onClick={() =>
                                          setWritingAnswers({
                                            ...writingAnswers,
                                            [ex.id]: opt,
                                          })
                                        }
                                        className={`py-2 text-sm font-serif font-bold text-center border transition-all cursor-pointer rounded-none ${btnStyle}`}
                                      >
                                        {opt}
                                      </button>
                                    );
                                  })}
                                </div>

                                {selected && (
                                  <div className="p-2.5 bg-[#fefce8] border border-[#fef08a] text-[11px] text-[#713f12] mt-2 flex items-center justify-between">
                                    <div>
                                      <div className="font-bold flex items-center gap-1 font-mono text-xs">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
                                        <span>Chữ Hán chuẩn: {ex.correctAnswer}</span>
                                      </div>
                                      {ex.explanation && (
                                        <div className="mt-0.5 text-[#854d0e]">{ex.explanation}</div>
                                      )}
                                    </div>
                                    <button
                                      onClick={() => handlePracticeInStudio(ex.correctAnswer.charAt(0))}
                                      className="px-2.5 py-1 bg-[#1c1917] hover:bg-[#292524] text-white text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap ml-2"
                                      title="Luyện viết chữ này trên bảng vẽ"
                                    >
                                      <PenTool className="w-3 h-3" />
                                      <span>Tập vẽ</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Phần 3: Bảng từ vựng ứng dụng */}
                    {chapterDetail.vocabularies?.length > 0 && (
                      <div className="bg-white border border-[#e7e5e4] p-6 shadow-xs">
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#e7e5e4]">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#b91c1c]" />
                            <h3 className="font-serif font-bold text-base text-[#1c1917]">
                              3. Từ vựng ứng dụng xuất hiện trong chương
                            </h3>
                          </div>
                          <span className="text-xs text-[#78716c] font-mono font-bold">
                            {chapterDetail.vocabularies.length} TỪ
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {chapterDetail.vocabularies.map((v) => {
                            return (
                              <div
                                key={v.id}
                                className="p-3 border border-[#e7e5e4] bg-[#fafaf9] flex items-center justify-between hover:bg-white transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => speakJapanese(v.word)}
                                    className="p-1 text-[#78716c] hover:text-[#b91c1c] hover:bg-[#fef2f2] transition-colors cursor-pointer"
                                    title="Nghe phát âm từ"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-serif font-bold text-sm text-[#1c1917]">
                                        {v.word}
                                      </span>
                                    </div>
                                    <span className="text-xs text-[#78716c] font-mono">
                                      ({v.reading})
                                    </span>
                                  </div>
                                </div>
                                <span className="text-xs text-[#44403c] font-medium text-right">
                                  {isEn ? v.meaningEn : v.meaningVi}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ─────────────────────────────────────────────────────────────
                    THẺ 3: MINIGAME TÌNH HUỐNG (AUTHENTIC SCENARIO MINIGAMES)
                ────────────────────────────────────────────────────────────── */}
                {activeTab === 'minigame' && (
                  <div className="space-y-8">
                    {chapterDetail.minigames?.map((game) => {
                      let parsedData: any = {};
                      try {
                        parsedData = JSON.parse(game.gameDataJson);
                      } catch (e) {
                        parsedData = {};
                      }

                      return (
                        <div key={game.id} className="bg-white border border-[#e7e5e4] p-6 shadow-xs">
                          {/* Header minigame */}
                          <div className="flex items-start justify-between pb-3 border-b border-[#e7e5e4] mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-mono uppercase bg-[#1c1917] text-white px-2 py-0.5 font-bold">
                                  {game.gameType}
                                </span>
                                <span className="text-[11px] font-mono text-[#b91c1c] font-bold">
                                  CHƯƠNG {chapterDetail.chapter.chapterNumber}
                                </span>
                              </div>
                              <h3 className="font-serif font-bold text-xl text-[#1c1917]">
                                {game.title}
                              </h3>
                              <p className="text-xs text-[#78716c] mt-1">{game.instruction}</p>
                            </div>
                          </div>

                          {/* Tranh minh họa riêng của từng bài tập (Cropped từ sách) */}
                          {game.imageUrl && (
                            <div className="mb-6 border border-[#e7e5e4] bg-[#fafaf9] p-3 flex flex-col items-center group relative">
                              <img
                                src={game.imageUrl}
                                alt={game.title}
                                className="max-h-[420px] max-w-full object-contain rounded-none border border-[#e7e5e4] bg-white shadow-xs"
                              />
                              <button
                                onClick={() => handleOpenMinigameImage(game.imageUrl!, game.title)}
                                className="mt-2.5 px-3 py-1 bg-white hover:bg-[#b91c1c] text-[#44403c] hover:text-white border border-[#e7e5e4] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>Phóng to tranh bài tập này</span>
                              </button>
                            </div>
                          )}

                          {/* Giao diện tương tác câu đố */}
                          <div className="space-y-4 bg-[#fafaf9] p-5 border border-[#e7e5e4]">
                            {/* Dạng 1: ORDERING (Sắp xếp từ bé đến lớn) */}
                            {game.gameType === 'ORDERING' && (
                              <div className="space-y-4">
                                {parsedData.example && (
                                  <div className="p-3 bg-[#f5f5f4] border border-[#e7e5e4] text-xs font-mono flex items-center justify-between">
                                    <span className="font-bold text-[#1c1917]">
                                      📌 {parsedData.example.prompt || 'Ví dụ mẫu (れい)'}
                                    </span>
                                    <span className="font-bold text-[#15803d] bg-white px-2 py-0.5 border border-[#e7e5e4]">
                                      {parsedData.example.formula || '三 < 四 < 八'}
                                    </span>
                                  </div>
                                )}

                                {parsedData.questions?.map((q: any) => {
                                  const key = `ord_${game.id}_${q.id}`;
                                  const selectedOpt = minigameInputs[key];
                                  const correctFormula = q.formula;
                                  const revFormula = [...q.items].reverse().join(' < ');
                                  const mixFormula = [q.items[1], q.items[0], q.items[2]].join(' < ');
                                  const options = [correctFormula, revFormula, mixFormula];

                                  return (
                                    <div key={q.id} className="bg-white p-4 border border-[#e7e5e4]">
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="text-sm font-serif font-bold text-[#1c1917]">
                                          {q.prompt}
                                        </div>
                                        <span className="text-xs font-mono text-[#78716c]">
                                          Sắp xếp: [ {q.items?.join(', ')} ]
                                        </span>
                                      </div>
                                      <div className="flex flex-wrap items-center gap-2 mt-2">
                                        {options.map((opt) => {
                                          const isSelected = selectedOpt === opt;
                                          const isCorrect = opt === correctFormula;
                                          let style = 'bg-[#fafaf9] text-[#44403c] border-[#e7e5e4] hover:bg-white';
                                          if (selectedOpt) {
                                            if (isCorrect) style = 'bg-[#15803d] text-white border-[#15803d] font-bold';
                                            else if (isSelected) style = 'bg-[#dc2626] text-white border-[#dc2626] font-bold';
                                            else style = 'opacity-40 bg-[#f5f5f4] border-[#e7e5e4] text-[#a8a29e]';
                                          }

                                          return (
                                            <button
                                              key={opt}
                                              onClick={() =>
                                                setMinigameInputs({
                                                  ...minigameInputs,
                                                  [key]: opt,
                                                })
                                              }
                                              className={`px-3.5 py-1.5 text-xs font-mono border transition-all cursor-pointer ${style}`}
                                            >
                                              {opt}
                                            </button>
                                          );
                                        })}
                                      </div>
                                      {selectedOpt && (
                                        <div className="mt-2 text-xs font-mono text-[#15803d] font-bold">
                                          ✓ Thứ tự đúng: {q.formula}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* Dạng 2: COUNTING (Đếm đồ vật trong tranh) */}
                            {game.gameType === 'COUNTING' && (
                              <div className="space-y-4">
                                {parsedData.example && (
                                  <div className="p-3 bg-[#f5f5f4] border border-[#e7e5e4] text-xs font-mono flex items-center justify-between">
                                    <span className="font-bold text-[#1c1917]">
                                      📌 {parsedData.example.item}
                                    </span>
                                    <span className="font-bold text-[#15803d] bg-white px-2 py-0.5 border border-[#e7e5e4]">
                                      {parsedData.example.kanji} ({parsedData.example.reading})
                                    </span>
                                  </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {parsedData.questions?.map((q: any) => {
                                    const key = `count_${game.id}_${q.id}`;
                                    const selectedOpt = minigameInputs[key];

                                    return (
                                      <div key={q.id} className="bg-white p-3.5 border border-[#e7e5e4]">
                                        <div className="text-xs font-serif font-bold text-[#1c1917] mb-2">
                                          {q.item}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                          {q.options?.map((opt: string) => {
                                            const isSelected = selectedOpt === opt;
                                            const isCorrect = opt === q.answer;
                                            let style = 'bg-[#fafaf9] text-[#44403c] border-[#e7e5e4] hover:bg-white';
                                            if (selectedOpt) {
                                              if (isCorrect) style = 'bg-[#15803d] text-white border-[#15803d] font-bold';
                                              else if (isSelected) style = 'bg-[#dc2626] text-white border-[#dc2626] font-bold';
                                              else style = 'opacity-40 bg-[#f5f5f4] border-[#e7e5e4] text-[#a8a29e]';
                                            }

                                            return (
                                              <button
                                                key={opt}
                                                onClick={() =>
                                                  setMinigameInputs({
                                                    ...minigameInputs,
                                                    [key]: opt,
                                                  })
                                                }
                                                className={`px-3 py-1.5 text-xs font-serif border transition-all cursor-pointer ${style}`}
                                              >
                                                {opt}
                                              </button>
                                            );
                                          })}
                                        </div>
                                        {selectedOpt && (
                                          <div className="text-[11px] text-[#15803d] font-bold mt-2 font-mono">
                                            ✓ Đáp án: {q.answer}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Dạng 3: CALCULATION (Tính tiền) */}
                            {game.gameType === 'CALCULATION' && (
                              <div className="space-y-4">
                                {parsedData.example && (
                                  <div className="p-3 bg-[#f5f5f4] border border-[#e7e5e4] text-xs font-mono flex items-center justify-between">
                                    <span className="font-bold text-[#1c1917]">
                                      📌 {parsedData.example.items}
                                    </span>
                                    <span className="font-bold text-[#15803d] bg-white px-2 py-0.5 border border-[#e7e5e4]">
                                      {parsedData.example.answer}
                                    </span>
                                  </div>
                                )}

                                <div className="space-y-3">
                                  {parsedData.problems?.map((p: any) => {
                                    const key = `calc_${game.id}_${p.id}`;
                                    const selectedOpt = minigameInputs[key];

                                    return (
                                      <div key={p.id} className="bg-white p-3.5 border border-[#e7e5e4]">
                                        <div className="text-xs font-serif font-bold text-[#1c1917] mb-2">
                                          {p.items}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                          {p.options?.map((opt: string) => {
                                            const isSelected = selectedOpt === opt;
                                            const isCorrect = opt === p.answer;
                                            let style = 'bg-[#fafaf9] text-[#44403c] border-[#e7e5e4] hover:bg-white';
                                            if (selectedOpt) {
                                              if (isCorrect) style = 'bg-[#15803d] text-white border-[#15803d] font-bold';
                                              else if (isSelected) style = 'bg-[#dc2626] text-white border-[#dc2626] font-bold';
                                              else style = 'opacity-40 bg-[#f5f5f4] border-[#e7e5e4] text-[#a8a29e]';
                                            }

                                            return (
                                              <button
                                                key={opt}
                                                onClick={() =>
                                                  setMinigameInputs({
                                                    ...minigameInputs,
                                                    [key]: opt,
                                                  })
                                                }
                                                className={`px-3 py-1.5 text-xs font-mono border transition-all cursor-pointer ${style}`}
                                              >
                                                {opt}
                                              </button>
                                            );
                                          })}
                                        </div>
                                        {selectedOpt && (
                                          <div className="text-[11px] text-[#15803d] font-bold mt-2 font-mono">
                                            ✓ Tổng tiền đúng: {p.answer}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Dạng 4: POSTCARD_FILL (Bưu thiếp) */}
                            {game.gameType === 'POSTCARD_FILL' && (
                              <div className="space-y-4">
                                {parsedData.example && (
                                  <div className="p-3 bg-[#f5f5f4] border border-[#e7e5e4] text-xs font-mono flex items-center justify-between">
                                    <span className="font-bold text-[#1c1917]">
                                      📌 {parsedData.example.label}
                                    </span>
                                    <span className="font-bold text-[#15803d] bg-white px-2 py-0.5 border border-[#e7e5e4]">
                                      {parsedData.example.answer}
                                    </span>
                                  </div>
                                )}

                                <div className="space-y-3">
                                  {parsedData.sections?.map((s: any) => {
                                    const key = `post_${game.id}_${s.id}`;
                                    const selectedOpt = minigameInputs[key];

                                    return (
                                      <div key={s.id} className="bg-white p-3.5 border border-[#e7e5e4]">
                                        <div className="text-xs font-serif font-bold text-[#1c1917]">
                                          {s.label}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 mt-2">
                                          {s.options?.map((opt: string) => {
                                            const isSelected = selectedOpt === opt;
                                            const isCorrect = opt === s.answer;
                                            let style = 'bg-[#fafaf9] text-[#44403c] border-[#e7e5e4] hover:bg-white';
                                            if (selectedOpt) {
                                              if (isCorrect) style = 'bg-[#15803d] text-white border-[#15803d] font-bold';
                                              else if (isSelected) style = 'bg-[#dc2626] text-white border-[#dc2626] font-bold';
                                              else style = 'opacity-40 bg-[#f5f5f4] border-[#e7e5e4] text-[#a8a29e]';
                                            }

                                            return (
                                              <button
                                                key={opt}
                                                onClick={() =>
                                                  setMinigameInputs({
                                                    ...minigameInputs,
                                                    [key]: opt,
                                                  })
                                                }
                                                className={`px-3 py-1.5 text-xs font-mono border transition-all cursor-pointer ${style}`}
                                              >
                                                {opt}
                                              </button>
                                            );
                                          })}
                                        </div>
                                        {selectedOpt && (
                                          <div className="text-[11px] text-[#15803d] font-bold mt-2 font-mono">
                                            ✓ Điền chuẩn: {s.answer}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Dạng 5: Trắc nghiệm tình huống & Câu hỏi tương tác (PICTURE_MATCH / Generic questions) */}
                            {((game.gameType === 'PICTURE_MATCH' || !['ORDERING', 'COUNTING'].includes(game.gameType)) &&
                              parsedData.questions &&
                              parsedData.questions.length > 0 &&
                              !parsedData.questions[0].formula &&
                              !parsedData.questions[0].counter) && (
                              <div className="space-y-4">
                                {parsedData.example && (
                                  <div className="p-3 bg-[#f5f5f4] border border-[#e7e5e4] text-xs font-mono flex items-center justify-between">
                                    <span className="font-bold text-[#1c1917]">
                                      📌 {parsedData.example.prompt || parsedData.example.item || 'Ví dụ mẫu (れい)'}
                                    </span>
                                    <span className="font-bold text-[#15803d] bg-white px-2 py-0.5 border border-[#e7e5e4]">
                                      {parsedData.example.answer || parsedData.example.kanji || ''}
                                    </span>
                                  </div>
                                )}

                                <div className="space-y-3">
                                  {parsedData.questions.map((q: any) => {
                                    const key = `q_${game.id}_${q.id}`;
                                    const selectedOpt = minigameInputs[key];

                                    return (
                                      <div key={q.id} className="bg-white p-4 border border-[#e7e5e4] shadow-xs">
                                        <div className="text-xs sm:text-sm font-serif font-bold text-[#1c1917] mb-2.5 flex items-center gap-2">
                                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#fafaf9] border border-[#e7e5e4] text-[10px] font-mono text-[#78716c]">
                                            {q.id}
                                          </span>
                                          <span>{q.prompt}</span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                          {q.options?.map((opt: string) => {
                                            const isSelected = selectedOpt === opt;
                                            const isCorrect = opt === q.answer;
                                            let style = 'bg-[#fafaf9] text-[#44403c] border-[#e7e5e4] hover:bg-white hover:border-[#a8a29e]';
                                            if (selectedOpt) {
                                              if (isCorrect) style = 'bg-[#15803d] text-white border-[#15803d] font-bold shadow-xs';
                                              else if (isSelected) style = 'bg-[#dc2626] text-white border-[#dc2626] font-bold shadow-xs';
                                              else style = 'opacity-40 bg-[#f5f5f4] border-[#e7e5e4] text-[#a8a29e]';
                                            }

                                            return (
                                              <button
                                                key={opt}
                                                onClick={() =>
                                                  setMinigameInputs({
                                                    ...minigameInputs,
                                                    [key]: opt,
                                                  })
                                                }
                                                className={`px-3.5 py-2 text-xs sm:text-sm font-serif border transition-all cursor-pointer ${style}`}
                                              >
                                                {opt}
                                              </button>
                                            );
                                          })}
                                        </div>
                                        {selectedOpt && (
                                          <div className="mt-3 pt-2.5 border-t border-[#f5f5f4] flex flex-col gap-1">
                                            <div className="text-xs font-mono font-bold text-[#15803d] flex items-center gap-1.5">
                                              <span>✓ Đáp án đúng:</span>
                                              <span className="underline decoration-2">{q.answer}</span>
                                            </div>
                                            {q.explanation && (
                                              <div className="text-[11px] font-sans text-[#78716c] bg-[#fafaf9] p-2 border border-[#f5f5f4] rounded">
                                                💡 {q.explanation}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ─────────────────────────────────────────────────────────────
                    THẺ 4: TEST ÔN TẬP CHƯƠNG (ふくしゅう)
                ────────────────────────────────────────────────────────────── */}
                {activeTab === 'test' && (
                  <div className="space-y-6">
                    {/* Hướng dẫn bài test */}
                    <div className="bg-white border border-[#e7e5e4] p-6">
                      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#e7e5e4] gap-2">
                        <div>
                          <h3 className="font-serif font-bold text-lg text-[#1c1917]">
                            {t('master.reviewTestTitle', 'Bài test ôn tập chương')}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {testHistory.length > 0 && (
                            <button
                              onClick={() => setShowHistoryDropdown(!showHistoryDropdown)}
                              className="px-3 py-1.5 text-xs font-mono font-medium border border-[#d6d3d1] bg-[#fafaf9] hover:bg-white text-[#44403c] flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <span>📜 Lịch sử làm test ({testHistory.length})</span>
                            </button>
                          )}
                          <Badge variant="outline" className="text-xs font-mono">
                            MỤC TIÊU: ≥ 85%
                          </Badge>
                        </div>
                      </div>

                      {/* Dropdown / Danh sách các lần test trước */}
                      {showHistoryDropdown && testHistory.length > 0 && (
                        <div className="mt-4 p-4 border border-[#e7e5e4] bg-[#fafaf9]">
                          <div className="text-xs font-mono uppercase font-bold text-[#78716c] mb-3 flex items-center justify-between">
                            <span>LỊCH SỬ CÁC LẦN LÀM BÀI TRƯỚC ĐÓ:</span>
                            <button
                              onClick={() => setShowHistoryDropdown(false)}
                              className="text-xs text-[#78716c] hover:text-[#1c1917] cursor-pointer"
                            >
                              ✕ Đóng
                            </button>
                          </div>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {testHistory.map((item, idx) => (
                              <div
                                key={item.id || idx}
                                className="p-3 bg-white border border-[#e7e5e4] flex flex-wrap items-center justify-between gap-3"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-xs font-bold text-[#78716c]">
                                    #{testHistory.length - idx}
                                  </span>
                                  <div>
                                    <div className="text-xs font-medium text-[#1c1917]">
                                      {item.date}
                                    </div>
                                    <div className="text-[11px] font-mono text-[#78716c]">
                                      Đúng {item.correctCount}/{item.totalQuestions} câu
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <span
                                    className={`px-2 py-0.5 text-xs font-mono font-bold border ${
                                      item.isPassed
                                        ? 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]'
                                        : 'bg-[#fef2f2] text-[#991b1b] border-[#fecaca]'
                                    }`}
                                  >
                                    {item.score}% {item.isPassed ? '✓ Đạt' : '✕ Chưa đạt'}
                                  </span>
                                  <button
                                    onClick={() => handleReviewPastAttempt(item)}
                                    className="px-3 py-1 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-medium transition-colors cursor-pointer"
                                  >
                                    Xem lại bài thi 👁️
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Thông báo nếu đã từng làm bài trước đó và đang ở bài mới */}
                      {!showResultCard && testHistory.length > 0 && !showHistoryDropdown && (
                        <div className="mt-4 p-3 bg-[#f5f5f4] border border-[#e7e5e4] flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="text-[#44403c]">
                            Bạn đã từng làm bài test này (Lần gần nhất: <strong className="font-mono">{testHistory[0].date}</strong> — đạt <strong className="font-mono text-[#b91c1c]">{testHistory[0].score}%</strong>).
                          </span>
                          <button
                            onClick={() => handleReviewPastAttempt(testHistory[0])}
                            className="text-[#b91c1c] hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <span>Xem lại kết quả lần trước 👁️</span>
                          </button>
                        </div>
                      )}

                      {/* Thông báo kết quả nộp bài */}
                      {showResultCard && submitResult && (() => {
                        const allEx = [
                          ...(chapterDetail.readingExercises || []),
                          ...(chapterDetail.writingExercises || []),
                        ];
                        const correctNum = allEx.filter((ex) => testAnswers[ex.id] === ex.correctAnswer).length;
                        const wrongNum = allEx.length - correctNum;

                        return (
                          <div
                            className={`mt-4 p-5 border ${
                              submitResult.isPassed
                                ? 'bg-[#f0fdf4] border-[#86efac] text-[#166534]'
                                : 'bg-[#fef2f2] border-[#fca5a5] text-[#991b1b]'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex items-start gap-3.5">
                                {submitResult.isPassed ? (
                                  <CheckCircle2 className="w-7 h-7 text-[#166534] flex-shrink-0 mt-0.5" />
                                ) : (
                                  <AlertCircle className="w-7 h-7 text-[#991b1b] flex-shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <div className="font-bold text-base">
                                    {submitResult.isPassed
                                      ? '🎉 XUẤT SẮC! BẠN ĐÃ VƯỢT QUA BÀI TEST CHƯƠNG!'
                                      : '⚠️ CHƯA ĐẠT CHUẨN MỞ KHÓA!'}
                                  </div>
                                  <div className="text-xs mt-1 text-[#44403c] leading-relaxed">
                                    {submitResult.message}
                                  </div>
                                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2.5 text-xs font-mono">
                                    <span className="font-bold">
                                      Điểm số: <span className="text-sm font-bold">{submitResult.score}%</span>
                                    </span>
                                    <span className="text-[#a8a29e]">•</span>
                                    <span>
                                      Đúng: <span className="font-bold text-[#166534]">{correctNum}</span> / {allEx.length} câu
                                    </span>
                                    <span className="text-[#a8a29e]">•</span>
                                    <span>
                                      Sai: <span className="font-bold text-[#b91c1c]">{wrongNum}</span> câu
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-center">
                                {submitResult.unlockedNextChapter && submitResult.nextChapterId && (
                                  <button
                                    onClick={() => setSelectedChapterId(submitResult.nextChapterId!)}
                                    className="px-4 py-2 bg-[#166534] text-white text-xs font-medium hover:bg-[#14532d] flex items-center gap-1.5 transition-colors shadow-sm"
                                  >
                                    <span>Sang Chương {submitResult.nextChapterNumber}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    setTestAnswers({});
                                    setShowResultCard(false);
                                  }}
                                  className="px-3.5 py-2 bg-white border border-[#d6d3d1] text-xs font-medium text-[#44403c] hover:bg-[#fafaf9] transition-colors"
                                >
                                  Làm lại bài 🔄
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Danh sách 20 câu trắc nghiệm */}
                      <div className="mt-6 space-y-6">
                        {[
                          ...(chapterDetail.readingExercises || []),
                          ...(chapterDetail.writingExercises || []),
                        ].map((ex, index) => {
                          let options: string[] = [];
                          try {
                            options = ex.optionsJson ? JSON.parse(ex.optionsJson) : [];
                          } catch (e) {
                            options = [];
                          }

                          const currentSelected = testAnswers[ex.id];
                          const isCorrect = currentSelected === ex.correctAnswer;
                          const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

                          return (
                            <div
                              key={ex.id}
                              className={`p-4 border transition-all ${
                                showResultCard
                                  ? isCorrect
                                    ? 'border-l-4 border-l-[#166534] border-[#e7e5e4] bg-white'
                                    : 'border-l-4 border-l-[#b91c1c] border-[#e7e5e4] bg-[#fffbfb]'
                                  : 'border-[#e7e5e4] bg-[#fafaf9]'
                              }`}
                            >
                              <div className="flex items-center justify-between text-xs text-[#78716c] font-mono mb-2">
                                <span className="font-bold">CÂU {index + 1} / 20</span>
                                <div className="flex items-center gap-2">
                                  <span>{ex.exerciseType === 'READING' ? 'よみましょう (Đọc câu)' : 'かきましょう (Viết chữ)'}</span>
                                  {showResultCard && (
                                    isCorrect ? (
                                      <span className="px-2 py-0.5 text-[11px] font-bold bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] flex items-center gap-1 rounded">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        ĐÚNG
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 text-[11px] font-bold bg-[#fef2f2] text-[#991b1b] border border-[#fecaca] flex items-center gap-1 rounded">
                                        <X className="w-3.5 h-3.5" />
                                        SAI
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>

                              <div className="font-serif text-base font-medium text-[#1c1917] mb-3">
                                {ex.questionText}
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {options.map((opt, optIdx) => {
                                  const letter = OPTION_LETTERS[optIdx] || '';
                                  const isChecked = currentSelected === opt;
                                  const isAnswer = opt === ex.correctAnswer;

                                  if (showResultCard) {
                                    // Chế độ xem nhận xét / sửa bài
                                    let btnClass = 'border-[#e7e5e4] bg-[#fafaf9] text-[#78716c] opacity-60';
                                    let tag = null;

                                    if (isAnswer) {
                                      // Đáp án đúng luôn được highlight xanh lá
                                      btnClass = 'border-2 border-[#166534] bg-[#f0fdf4] text-[#166534] font-bold shadow-sm';
                                      tag = (
                                        <span className="text-[10px] bg-[#166534] text-white px-1.5 py-0.5 font-sans font-semibold rounded">
                                          Đúng ✓
                                        </span>
                                      );
                                    } else if (isChecked && !isAnswer) {
                                      // Lựa chọn của người dùng nhưng sai -> highlight đỏ
                                      btnClass = 'border-2 border-[#b91c1c] bg-[#fef2f2] text-[#991b1b] font-bold line-through';
                                      tag = (
                                        <span className="text-[10px] bg-[#b91c1c] text-white px-1.5 py-0.5 font-sans font-semibold rounded">
                                          Bạn chọn ✕
                                        </span>
                                      );
                                    }

                                    return (
                                      <div
                                        key={opt}
                                        className={`p-2.5 text-xs font-medium border text-center transition-all flex items-center justify-between gap-1 select-none ${btnClass}`}
                                      >
                                        <span className="truncate">
                                          <span className="font-bold font-mono mr-1">{letter}.</span>
                                          {opt}
                                        </span>
                                        {tag}
                                      </div>
                                    );
                                  }

                                  // Chế độ làm bài bình thường
                                  return (
                                    <button
                                      key={opt}
                                      onClick={() =>
                                        setTestAnswers({
                                          ...testAnswers,
                                          [ex.id]: opt,
                                        })
                                      }
                                      className={`p-2.5 text-xs font-medium border text-center transition-all flex items-center justify-center gap-1 ${
                                        isChecked
                                          ? 'border-[#b91c1c] bg-[#b91c1c] text-white font-bold shadow-sm'
                                          : 'border-[#e7e5e4] bg-white text-[#44403c] hover:border-[#d6d3d1]'
                                      }`}
                                    >
                                      <span className="font-mono font-bold">{letter}.</span>
                                      <span>{opt}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Lời giải thích chi tiết khi nộp bài */}
                              {showResultCard && (
                                <div className="mt-3.5 pt-3 border-t border-[#e7e5e4] text-xs flex items-start gap-2.5">
                                  <span className="font-bold text-[#1c1917] bg-[#f5f5f4] px-2 py-0.5 text-[11px] font-mono uppercase tracking-wide flex-shrink-0">
                                    💡 GIẢI THÍCH
                                  </span>
                                  <span className="text-[#44403c] leading-relaxed">
                                    {ex.explanation || `Từ vựng trong câu là "${ex.targetWord}", đáp án chính xác là "${ex.correctAnswer}".`}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Nút nộp bài / thao tác */}
                      <div className="mt-8 pt-4 border-t border-[#e7e5e4] flex flex-wrap items-center justify-between gap-4">
                        <span className="text-xs text-[#78716c] font-mono">
                          {showResultCard && submitResult
                            ? `Hoàn thành chấm điểm: ${submitResult.score}% • Kiểm tra chi tiết đúng/sai bên trên`
                            : `Đã trả lời: ${Object.keys(testAnswers).length} / 20 câu`}
                        </span>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setTestAnswers({});
                              setShowResultCard(false);
                            }}
                            className="px-4 py-2 border border-[#d6d3d1] text-xs font-medium text-[#44403c] hover:bg-white transition-colors"
                          >
                            {showResultCard ? 'Làm bài kiểm tra mới 📝' : 'Làm lại từ đầu'}
                          </button>

                          {!showResultCard && (
                            <button
                              onClick={handleSubmitReviewTest}
                              disabled={submittingTest || Object.keys(testAnswers).length === 0}
                              className="px-6 py-2.5 bg-[#b91c1c] text-white text-xs font-bold tracking-wide hover:bg-[#991b1b] transition-all flex items-center gap-2 shadow disabled:opacity-50"
                            >
                              {submittingTest ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span>Đang chấm điểm...</span>
                                </>
                              ) : (
                                <span>Nộp bài kiểm tra & Lưu điểm thật 📝</span>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* ─── MODAL PHÓNG TO TRANH TƯỢNG HÌNH & BÀI TẬP N5 (PORTAL FULL SCREEN VIEWER) ─── */}
      {showIllustrationModal && (modalImageUrl || chapterDetail?.chapter.illustrationUrl) && createPortal(
        <div
          className="fixed inset-0 z-[999999] w-screen h-screen bg-[#09090b]/98 backdrop-blur-md flex flex-col select-none overflow-hidden"
          onWheel={handleModalWheel}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Header Bar: Chỉ chừa lại Tên chương / Tranh bài tập, Độ thu phóng, và Nút X thoát */}
          <div className="w-full flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#18181b] border-b border-[#27272a] shadow-xl z-20 flex-shrink-0">
            {/* Tên chương */}
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-[#b91c1c]" />
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#f4f4f5] tracking-wide truncate max-w-[65vw]">
                {modalImageTitle || (chapterDetail ? `Chương ${chapterDetail.chapter.chapterNumber}: ${chapterDetail.chapter.titleJa} (${chapterDetail.chapter.titleVi})` : 'Xem tranh')}
              </h3>
            </div>

            {/* Độ thu phóng & Nút X */}
            <div className="flex items-center gap-3">
              {/* Độ thu phóng */}
              <div className="flex items-center gap-1 bg-[#27272a] p-1 border border-[#3f3f46]">
                <button
                  onClick={() =>
                    setModalZoom((prev) => {
                      const next = Math.max(prev - 0.25, 1);
                      if (next === 1) setModalPan({ x: 0, y: 0 });
                      return next;
                    })
                  }
                  className="px-2 py-0.5 hover:bg-[#3f3f46] text-[#f4f4f5] text-xs font-bold cursor-pointer transition-colors"
                  title="Thu nhỏ (-)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[#f4f4f5] text-xs font-mono font-bold px-2 border-x border-[#3f3f46]">
                  Độ thu phóng: {Math.round(modalZoom * 100)}%
                </span>
                <button
                  onClick={() => {
                    setModalZoom(1);
                    setModalPan({ x: 0, y: 0 });
                  }}
                  className="px-2 py-0.5 hover:bg-[#3f3f46] text-[#f4f4f5] text-xs font-bold cursor-pointer transition-colors"
                  title="Tỉ lệ gốc 100%"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setModalZoom((prev) => Math.min(prev + 0.25, 4.0))}
                  className="px-2 py-0.5 hover:bg-[#3f3f46] text-[#f4f4f5] text-xs font-bold cursor-pointer transition-colors"
                  title="Phóng to (+)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Nút thoát chỉ có icon X bên trong */}
              <button
                onClick={handleCloseModal}
                className="w-8 h-8 flex items-center justify-center bg-[#b91c1c] hover:bg-[#dc2626] text-white transition-colors cursor-pointer shadow-md rounded-none"
                title="Đóng (ESC)"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Viewport chứa ảnh phóng to / di chuyển */}
          <div
            className={`flex-1 w-full h-full overflow-hidden relative flex items-center justify-center p-2 sm:p-6 bg-[#09090b] select-none ${
              modalDragging
                ? 'cursor-grabbing'
                : modalZoom > 1
                ? 'cursor-grab'
                : 'cursor-zoom-in'
            }`}
            onMouseDown={handleImageMouseDown}
            onMouseMove={handleImageMouseMove}
            onMouseUp={handleImageMouseUp}
            onMouseLeave={() => setModalDragging(false)}
            onContextMenu={handleImageContextMenu}
          >
            <div
              style={{
                transform: `translate(${modalPan.x}px, ${modalPan.y}px) scale(${modalZoom})`,
                transformOrigin: 'center center',
                transition: modalDragging ? 'none' : 'transform 0.12s ease-out',
              }}
              className="max-h-full max-w-full flex items-center justify-center pointer-events-none"
            >
              <img
                src={modalImageUrl || chapterDetail?.chapter.illustrationUrl || ''}
                alt={modalImageTitle || "Tranh minh họa"}
                draggable={false}
                className="max-h-[84vh] max-w-[94vw] object-contain shadow-2xl border border-[#27272a] bg-white pointer-events-none select-none"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
      {/* Pop-up chúc mừng vượt qua bài thi ôn tập kèm hiệu ứng cánh hoa anh đào rơi */}
      <SakuraCelebrationModal
        isOpen={showSakuraCelebration}
        onClose={() => setShowSakuraCelebration(false)}
        score={submitResult?.score ?? 0}
        correctCount={
          submitResult && chapterDetail
            ? Math.round(
                ((submitResult.score ?? 0) / 100) *
                  ((chapterDetail.readingExercises?.length || 0) + (chapterDetail.writingExercises?.length || 0))
              )
            : 0
        }
        totalQuestions={(chapterDetail?.readingExercises?.length || 0) + (chapterDetail?.writingExercises?.length || 0)}
        currentChapterNumber={chapterDetail?.chapter.chapterNumber || selectedChapterId}
        currentChapterTitle={chapterDetail ? `${chapterDetail.chapter.titleJa} (${chapterDetail.chapter.titleVi})` : ''}
        nextChapterId={
          submitResult?.nextChapterId ||
          roadmap?.chapters.find(
            (c) => c.chapterNumber === ((chapterDetail?.chapter.chapterNumber || selectedChapterId) + 1)
          )?.id ||
          null
        }
        nextChapterNumber={
          submitResult?.nextChapterNumber ||
          ((chapterDetail?.chapter.chapterNumber || selectedChapterId) + 1)
        }
        nextChapterTitle={
          roadmap?.chapters.find(
            (c) => c.chapterNumber === ((chapterDetail?.chapter.chapterNumber || selectedChapterId) + 1)
          )
            ? `${roadmap.chapters.find((c) => c.chapterNumber === ((chapterDetail?.chapter.chapterNumber || selectedChapterId) + 1))?.titleJa} (${roadmap.chapters.find((c) => c.chapterNumber === ((chapterDetail?.chapter.chapterNumber || selectedChapterId) + 1))?.titleVi})`
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
