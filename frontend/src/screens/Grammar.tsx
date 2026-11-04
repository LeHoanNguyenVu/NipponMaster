import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Clock,
  CheckCircle2,
  Lock,
  ChevronRight,
  Star,
  FileText,
  MessageSquare,
  Award,
  GraduationCap,
  Lightbulb,
  Bookmark,
  Send,
  Smile,
  X,
  ThumbsUp,
  FolderOpen,
  Link,
  CornerDownRight,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../store/useAuthStore';

// Định nghĩa cấp độ & giáo trình
type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

interface TimestampItem {
  id: string;
  timeSec: number;
  timeStr: string;
  title: string;
  pattern: string;
  summary: string;
}

interface GrammarCheatsheet {
  id: string;
  pattern: string;
  badge: string;
  meaning: string;
  structure: string;
  nuance: string;
  examples: {
    ja: string;
    furigana: string;
    vi: string;
  }[];
}

interface StarQuestion {
  id: number;
  prompt: string;
  leftSentence: string;
  rightSentence: string;
  starIndex: number;
  fragments: { id: string; text: string; correctIndex: number }[];
  explanation: string;
}

interface MultipleChoiceQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface LessonItem {
  id: number;
  lessonNumber: number;
  titleVi: string;
  titleJa: string;
  duration: string;
  durationSec: number;
  videoId: string;
  curriculum: string;
  isUnlocked: boolean;
  isPassed: boolean;
  score?: number;
  timestamps: TimestampItem[];
  cheatsheet: GrammarCheatsheet[];
  quiz: {
    mcq: MultipleChoiceQuestion[];
    starQuestion: StarQuestion;
  };
}

interface CommentReplyItem {
  id: string;
  authorName: string;
  avatarLetter: string;
  avatarBg: string;
  role: 'teacher' | 'student';
  timeAgo: string;
  content: string;
  imageUrl?: string;
  imageName?: string;
  videoUrl?: string;
  videoName?: string;
  likes: number;
}

interface DiscussionItem {
  id: string;
  authorName: string;
  avatarLetter: string;
  avatarBg: string;
  role: 'teacher' | 'student';
  timeAgo: string;
  content: string;
  imageUrl?: string;
  imageName?: string;
  videoUrl?: string;
  videoName?: string;
  likes: number;
  replies: CommentReplyItem[];
}

interface LightboxMedia {
  type: 'image' | 'video';
  url: string;
  title?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// DỮ LIỆU BÀI HỌC MẪU
// ═══════════════════════════════════════════════════════════════════════════
const LESSON_PLAYLIST_N5: LessonItem[] = [
  {
    id: 1,
    lessonNumber: 1,
    titleVi: 'Khẳng định, Phủ định, Nghi vấn & Trợ từ chủ đề [は・も・の]',
    titleJa: '第1課：～は～です・～じゃありません・～ですか・～も・～の',
    duration: '18:35',
    durationSec: 1115,
    videoId: 'dQw4w9WgXcQ',
    curriculum: 'Minna no Nihongo I (Bài 1 ~ 25)',
    isUnlocked: true,
    isPassed: true,
    score: 95,
    timestamps: [
      { id: 'ts1', timeSec: 15, timeStr: '00:15', title: 'Tổng quan bài 1 & Đại từ xưng hô', pattern: 'わたし・あなた・あの人', summary: 'Giới thiệu bản thân và cách gọi người khác lịch sự' },
      { id: 'ts2', timeSec: 90, timeStr: '01:30', title: 'Mẫu 1: Câu khẳng định danh từ', pattern: 'N1 は N2 です', summary: 'N1 là N2 (Trợ từ は phát âm là WA)' },
      { id: 'ts3', timeSec: 320, timeStr: '05:20', title: 'Mẫu 2: Câu phủ định danh từ', pattern: 'N1 は N2 じゃ / ではありません', summary: 'N1 không phải là N2 (じゃありません thân mật hơn ではありません)' },
      { id: 'ts4', timeSec: 580, timeStr: '09:40', title: 'Mẫu 3: Câu hỏi nghi vấn Có/Không', pattern: 'Câu + か', summary: 'Hỏi xác nhận thông tin, trả lời はい hoặc いいえ' },
      { id: 'ts5', timeSec: 810, timeStr: '13:30', title: 'Mẫu 4: Trợ từ đồng nhất "Cũng"', pattern: 'N も N です', summary: 'Thay thế trợ từ は khi đối tượng có cùng đặc điểm' },
      { id: 'ts6', timeSec: 990, timeStr: '16:30', title: 'Mẫu 5: Trợ từ sở hữu & Thuộc về', pattern: 'N1 の N2', summary: 'N2 thuộc về N1 hoặc giải thích bổ nghĩa cho N1' },
    ],
    cheatsheet: [
      {
        id: 'cs1',
        pattern: 'N1 は N2 です',
        badge: 'Khẳng định căn bản',
        meaning: 'N1 là N2',
        structure: 'Danh từ 1 + は + Danh từ 2 + です',
        nuance: 'Trợ từ「は」đóng vai trò chỉ định chủ đề chính của câu văn. Trong văn viết ký tự là「は」(ha) nhưng luôn đọc chuẩn âm là「わ」(wa).「です」thể hiện thái độ lịch sự, trang trọng.',
        examples: [
          { ja: 'わたしは マイク・ミラーです。', furigana: 'わたしは マイク・ミラーです。', vi: 'Tôi là Mike Miller.' },
          { ja: 'サントスさんは ブラジル人です。', furigana: 'サントスさんは ブラジルじんです。', vi: 'Anh Santos là người Brazil.' }
        ]
      },
      {
        id: 'cs2',
        pattern: 'N1 は N2 じゃ / ではありません',
        badge: 'Phủ định hiện tại',
        meaning: 'N1 không phải là N2',
        structure: 'Danh từ 1 + は + Danh từ 2 + じゃありません / ではありません',
        nuance: '「じゃありません」thường dùng trong đàm thoại giao tiếp hàng ngày thân mật. Trong văn viết trang trọng, diễn văn hoặc báo chí trang trọng ưu tiên dùng「ではありません」.',
        examples: [
          { ja: 'サントスさんは 学生じゃありません。', furigana: 'サントスさんは がくせいじゃありません。', vi: 'Anh Santos không phải là học sinh.' },
          { ja: 'わたしは 医者ではありません。', furigana: 'わたしは いしゃではありません。', vi: 'Tôi không phải là bác sĩ.' }
        ]
      },
      {
        id: 'cs4',
        pattern: 'N1 も N2 です',
        badge: 'Trợ từ đồng nhất',
        meaning: 'N1 cũng là N2',
        structure: 'Danh từ 1 + も + Danh từ 2 + です',
        nuance: 'Dùng「も」thay thế hoàn toàn cho「は」khi danh từ chủ ngữ mang cùng đặc tính, nghề nghiệp hoặc quốc tịch với chủ ngữ đã nhắc trước đó.',
        examples: [
          { ja: 'ミラーさんは 会社員です。グプタさんも 会社員です。', furigana: 'ミラーさんは かいしゃいんです。グプタさんも かいしゃいんです。', vi: 'Anh Miller là nhân viên công ty. Anh Gupta cũng là nhân viên công ty.' }
        ]
      },
      {
        id: 'cs5',
        pattern: 'N1 の N2',
        badge: 'Trợ từ sở hữu',
        meaning: 'N2 của N1 / N2 thuộc N1',
        structure: 'Danh từ 1 + の + Danh từ 2',
        nuance: 'N1 bổ nghĩa cho N2. N1 có thể là tổ chức, công ty sở tại (IMCの社員: nhân viên công ty IMC) hoặc chủ sở hữu tài sản (わたしの本: sách của tôi).',
        examples: [
          { ja: 'ミラーさんは IMCの 社員です。', furigana: 'ミラーさんは IMCの しゃいんです。', vi: 'Anh Miller là nhân viên của công ty IMC.' }
        ]
      }
    ],
    quiz: {
      mcq: [
        {
          id: 1,
          question: 'Chọn trợ từ thích hợp điền vào chỗ trống:「わたし [ ? ] ベトナム人です。」',
          options: ['① は', '② を', '③ に', '④ が'],
          correctAnswer: '① は',
          explanation: 'Chủ đề của câu chỉ người nói (わたし) cần điền trợ từ は (đọc là wa).'
        },
        {
          id: 2,
          question: 'Chọn câu phủ định đúng:「サントスさんは 先生 [ ? ]。」',
          options: ['① です', '② じゃありません', '③ でした', '④ ます'],
          correctAnswer: '② じゃありません',
          explanation: 'Dạng phủ định danh từ lịch sự ở thì hiện tại là じゃありません (hoặc ではありません).'
        }
      ],
      starQuestion: {
        id: 3,
        prompt: 'Sắp xếp 4 cụm từ để tạo thành câu hoàn chỉnh và tìm cụm từ ở vị trí ngôi sao [ ★ ]:',
        leftSentence: 'ミラーさんは',
        rightSentence: 'です。',
        starIndex: 2,
        fragments: [
          { id: 'f1', text: '会社員', correctIndex: 3 },
          { id: 'f2', text: 'の', correctIndex: 2 },
          { id: 'f3', text: 'IMC', correctIndex: 1 },
          { id: 'f4', text: 'アメリカ人', correctIndex: 0 },
        ],
        explanation: 'Câu hoàn chỉnh:「ミラーさんは アメリカ人 IMC の ★ 会社員 です。」— Thứ tự: ④ アメリカ人 → ③ IMC → ② の (vị trí ngôi sao ★) → ① 会社員.'
      }
    }
  },
  {
    id: 2,
    lessonNumber: 2,
    titleVi: 'Chỉ thị từ đồ vật [これ・それ・あれ・この・その・あの]',
    titleJa: '第2課：これ・それ・あれ・この・その・あの・そうです',
    duration: '21:10',
    durationSec: 1270,
    videoId: 'dQw4w9WgXcQ',
    curriculum: 'Minna no Nihongo I (Bài 1 ~ 25)',
    isUnlocked: true,
    isPassed: false,
    timestamps: [
      { id: 'ts2_1', timeSec: 0, timeStr: '00:00', title: 'Phân biệt hệ thống Ko-So-A-Do', pattern: 'これ・それ・あれ', summary: 'Khoảng cách giữa người nói và người nghe' },
      { id: 'ts2_2', timeSec: 300, timeStr: '05:00', title: 'Mẫu 1: これ / それ / あれ は N です', pattern: 'これ・それ・あれ は N です', summary: 'Cái này / cái đó / cái kia là vật gì' },
      { id: 'ts2_3', timeSec: 720, timeStr: '12:00', title: 'Mẫu 2: この / その / あの N は...', pattern: 'この・その・あの + Danh từ', summary: 'Định từ đi kèm danh từ chỉ định' },
    ],
    cheatsheet: [
      {
        id: 'cs2_1',
        pattern: 'これ / それ / あれ は N です',
        badge: 'Đại từ chỉ vật',
        meaning: 'Cái này / Cái đó / Cái kia là N',
        structure: 'これ (gần người nói) / それ (gần người nghe) / あれ (xa cả hai) + は + N + です',
        nuance: 'Đây là các đại từ độc lập, không được ghép trực tiếp danh từ ngay sau chúng.',
        examples: [
          { ja: 'これは 辞書です。', furigana: 'これは じしょです。', vi: 'Đây là cuốn từ điển.' }
        ]
      }
    ],
    quiz: {
      mcq: [
        {
          id: 1,
          question: 'Vật ở gần người nghe, người nói muốn hỏi thì dùng từ nào?',
          options: ['① これ', '② それ', '③ あれ', '④ どれ'],
          correctAnswer: '② それ',
          explanation: 'Gần người nghe dùng それ, gần người nói dùng これ, xa cả hai dùng あれ.'
        }
      ],
      starQuestion: {
        id: 2,
        prompt: 'Sắp xếp các từ để hoàn thiện câu và tìm từ ở vị trí ngôi sao [ ★ ]:',
        leftSentence: 'これは',
        rightSentence: '本です。',
        starIndex: 1,
        fragments: [
          { id: 'f2_1', text: '日本語', correctIndex: 1 },
          { id: 'f2_2', text: 'の', correctIndex: 2 },
          { id: 'f2_3', text: 'わたし', correctIndex: 0 },
          { id: 'f2_4', text: 'の', correctIndex: 3 }
        ],
        explanation: 'Câu hoàn chỉnh:「これは わたし の 日本語 ★ の 本です。」(Đây là cuốn sách tiếng Nhật của tôi).'
      }
    }
  },
  {
    id: 3,
    lessonNumber: 3,
    titleVi: 'Chỉ thị từ địa điểm & Phương hướng [ここ・そこ・あそこ・どこ]',
    titleJa: '第3課：ここ・そこ・あそこ・こちら・そちら・あちら',
    duration: '19:40',
    durationSec: 1180,
    videoId: 'dQw4w9WgXcQ',
    curriculum: 'Minna no Nihongo I (Bài 1 ~ 25)',
    isUnlocked: false,
    isPassed: false,
    timestamps: [],
    cheatsheet: [],
    quiz: { mcq: [], starQuestion: {} as any }
  },
  {
    id: 4,
    lessonNumber: 4,
    titleVi: 'Thời gian, Giờ giấc, Thứ ngày & Động từ chia thì [ます・ません・ました]',
    titleJa: '第4課：今～時～分・～から～まで・動詞ます形',
    duration: '24:15',
    durationSec: 1455,
    videoId: 'dQw4w9WgXcQ',
    curriculum: 'Minna no Nihongo I (Bài 1 ~ 25)',
    isUnlocked: false,
    isPassed: false,
    timestamps: [],
    cheatsheet: [],
    quiz: { mcq: [], starQuestion: {} as any }
  },
  {
    id: 5,
    lessonNumber: 5,
    titleVi: 'Phương tiện di chuyển & Điểm đến với trợ từ [へ・で・と]',
    titleJa: '第5課：～へ行きます・～で帰ります・～と来ます',
    duration: '22:50',
    durationSec: 1370,
    videoId: 'dQw4w9WgXcQ',
    curriculum: 'Minna no Nihongo I (Bài 1 ~ 25)',
    isUnlocked: false,
    isPassed: false,
    timestamps: [],
    cheatsheet: [],
    quiz: { mcq: [], starQuestion: {} as any }
  }
];

const EMOJI_LIST = ['🎌', '🌸', '💡', '❓', '✍️', '👏', '💯', '📚', '✨', '🇯🇵', '🗾', '🍙', '🍵', '👍', '🔥', '🎯', '⭐', '🎉', '🙏', '😊'];

export default function Grammar() {
  const { user } = useAuthStore();
  const isTeacher = user?.role === 'teacher' || user?.role === 'admin';
  const currentAuthorName = user?.fullName || user?.username || 'Bạn (Học viên)';
  const currentUserRole: 'teacher' | 'student' = isTeacher ? 'teacher' : 'student';

  const [selectedLevel, setSelectedLevel] = useState<JlptLevel>('N5');
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [activeTimestamp, setActiveTimestamp] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'cheatsheet' | 'quiz' | 'discussion'>('cheatsheet');

  // Trạng thái bài test
  const [mcqAnswers, setMcqAnswers] = useState<{ [qId: number]: string }>({});
  const [selectedSlots, setSelectedSlots] = useState<(string | null)[]>([null, null, null, null]);
  const [starSubmitted, setStarSubmitted] = useState<boolean>(false);
  const [isStarCorrect, setIsStarCorrect] = useState<boolean | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Trạng thái Facebook-style Lightbox Modal (Phóng to ảnh & video toàn màn hình)
  const [activeLightboxMedia, setActiveLightboxMedia] = useState<LightboxMedia | null>(null);

  // Trạng thái Hỏi Đáp & Thảo luận
  const [discussions, setDiscussions] = useState<DiscussionItem[]>([
    {
      id: 'd1',
      authorName: 'Hoàng Long',
      avatarLetter: 'L',
      avatarBg: 'bg-blue-600',
      role: 'student',
      timeAgo: '1 giờ trước',
      content: 'Thầy ơi, khi nào thì mình nên dùng「ではありません」thay vì「じゃありません」ạ? Trong đề thi JLPT N5 họ hay ra bẫy dạng này không ạ? 🎌🤔',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1000&auto=format&fit=crop&q=85',
      imageName: 'bai_tap_mau_n5.jpg',
      likes: 6,
      replies: [
        {
          id: 'r1',
          authorName: 'Yamada Sensei',
          avatarLetter: 'Y',
          avatarBg: 'bg-[#b91c1c]',
          role: 'teacher',
          timeAgo: '45 phút trước',
          content: 'Chào em! Trong giao tiếp hàng ngày nói chuyện với bạn bè thì người Nhật luôn dùng「じゃありません」cho tự nhiên. Nhưng trong đề thi JLPT hoặc khi viết văn bản trang trọng thì sẽ dùng「ではありません」. Cả hai nghĩa hoàn toàn giống nhau nhé! 🌸',
          likes: 12
        },
        {
          id: 'r2',
          authorName: 'Thu Trang (Học viên N4)',
          avatarLetter: 'T',
          avatarBg: 'bg-purple-600',
          role: 'student',
          timeAgo: '30 phút trước',
          content: 'Mình vừa thi đợt tháng 7 xong, phần đọc hiểu hay có「ではありません」lắm bạn nhé, còn phần nghe thì hay gặp「じゃありません」. Chúc bạn học tốt! 👍',
          likes: 4
        }
      ]
    },
    {
      id: 'd2',
      authorName: 'Mai Anh',
      avatarLetter: 'M',
      avatarBg: 'bg-emerald-600',
      role: 'student',
      timeAgo: '3 giờ trước',
      content: 'Mọi người cho mình hỏi trợ từ「も」ở phút 13:30 nếu câu trước là phủ định thì câu sau dùng thế nào ạ? 💡',
      likes: 3,
      replies: [
        {
          id: 'r3',
          authorName: 'Quang Huy',
          avatarLetter: 'H',
          avatarBg: 'bg-amber-600',
          role: 'student',
          timeAgo: '2 giờ trước',
          content: 'Câu sau vẫn dùng「も」được bạn nhé, ví dụ:「わたしは 医者じゃありません。サントスさんも 医者じゃありません」(Tôi không phải bác sĩ, anh Santos cũng không phải bác sĩ).',
          likes: 5
        }
      ]
    }
  ]);

  // Khung soạn câu hỏi chính
  const [questionText, setQuestionText] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [attachedImageName, setAttachedImageName] = useState<string>('');
  const [attachedVideo, setAttachedVideo] = useState<string | null>(null);
  const [attachedVideoName, setAttachedVideoName] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUrlInputModal, setShowUrlInputModal] = useState<'image' | 'video' | null>(null);
  const [mediaUrlInput, setMediaUrlInput] = useState('');

  // Khung trả lời lồng nhau (Thread reply)
  const [replyingToDiscussionId, setReplyingToDiscussionId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [replyAttachedImage, setReplyAttachedImage] = useState<string | null>(null);
  const [replyAttachedImageName, setReplyAttachedImageName] = useState<string>('');
  const [replyAttachedVideo, setReplyAttachedVideo] = useState<string | null>(null);
  const [replyAttachedVideoName, setReplyAttachedVideoName] = useState<string>('');
  const [showReplyEmoji, setShowReplyEmoji] = useState(false);

  // File Inputs ẩn
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const mainVideoInputRef = useRef<HTMLInputElement>(null);
  const replyImageInputRef = useRef<HTMLInputElement>(null);
  const replyVideoInputRef = useRef<HTMLInputElement>(null);

  const currentLesson = LESSON_PLAYLIST_N5.find(l => l.id === selectedLessonId) || LESSON_PLAYLIST_N5[0];
  const starQ = currentLesson.quiz.starQuestion;

  // Lắng nghe phím ESC để đóng Lightbox phóng to
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxMedia(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mở Lightbox xem phóng to
  const handleOpenMedia = (media: LightboxMedia) => {
    setActiveLightboxMedia(media);
  };

  // Tua video theo timestamp
  const handleJumpToTimestamp = (sec: number) => {
    setActiveTimestamp(sec);
    const iframe = document.getElementById('yt-lesson-player') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = `https://www.youtube.com/embed/${currentLesson.videoId}?start=${sec}&autoplay=1`;
    }
  };

  // Xử lý kéo thả / click xếp từ câu ngôi sao
  const handleSelectFragment = (fragText: string) => {
    if (starSubmitted) return;
    const firstEmptyIndex = selectedSlots.findIndex(s => s === null);
    if (firstEmptyIndex !== -1) {
      const newSlots = [...selectedSlots];
      newSlots[firstEmptyIndex] = fragText;
      setSelectedSlots(newSlots);
    }
  };

  const handleRemoveSlot = (index: number) => {
    if (starSubmitted) return;
    const newSlots = [...selectedSlots];
    newSlots[index] = null;
    setSelectedSlots(newSlots);
  };

  const handleCheckStarAnswer = () => {
    if (!starQ || !starQ.fragments) return;
    if (selectedSlots.some(s => s === null)) {
      alert('Vui lòng xếp đủ cả 4 mảnh từ vào các vị trí trống trước khi kiểm tra!');
      return;
    }
    const sortedCorrect = [...starQ.fragments].sort((a, b) => a.correctIndex - b.correctIndex).map(f => f.text);
    const isAllCorrect = selectedSlots.every((val, idx) => val === sortedCorrect[idx]);
    setIsStarCorrect(isAllCorrect);
    setStarSubmitted(true);

    if (isAllCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleResetStar = () => {
    setSelectedSlots([null, null, null, null]);
    setStarSubmitted(false);
    setIsStarCorrect(null);
  };

  // Nộp bài test củng cố (MCQ + Star)
  const handleSubmitFullQuiz = () => {
    let correctCount = 0;
    const total = (currentLesson.quiz.mcq?.length || 0) + 1;

    currentLesson.quiz.mcq.forEach(q => {
      if (mcqAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    if (isStarCorrect) {
      correctCount++;
    }

    const calculated = Math.round((correctCount / total) * 100);
    setQuizScore(calculated);
    setQuizSubmitted(true);

    if (calculated >= 85) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  // Chọn ảnh từ máy tính (Main form)
  const handleMainImageFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setAttachedImage(localUrl);
      setAttachedImageName(file.name);
    }
  };

  // Chọn video từ máy tính (Main form)
  const handleMainVideoFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setAttachedVideo(localUrl);
      setAttachedVideoName(file.name);
    }
  };

  // Chọn ảnh từ máy tính (Reply form)
  const handleReplyImageFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setReplyAttachedImage(localUrl);
      setReplyAttachedImageName(file.name);
    }
  };

  // Chọn video từ máy tính (Reply form)
  const handleReplyVideoFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setReplyAttachedVideo(localUrl);
      setReplyAttachedVideoName(file.name);
    }
  };

  // Đính kèm media qua link online
  const handleAttachMediaUrl = () => {
    if (!mediaUrlInput.trim()) return;
    if (showUrlInputModal === 'image') {
      setAttachedImage(mediaUrlInput.trim());
      setAttachedImageName('Hình ảnh từ liên kết');
    } else if (showUrlInputModal === 'video') {
      setAttachedVideo(mediaUrlInput.trim());
      setAttachedVideoName('Video từ liên kết');
    }
    setShowUrlInputModal(null);
    setMediaUrlInput('');
  };

  // Đăng câu hỏi mới (Dùng trực tiếp tài khoản thật của người dùng)
  const handlePostQuestion = () => {
    if (!questionText.trim() && !attachedImage && !attachedVideo) return;

    const newDiscussion: DiscussionItem = {
      id: Date.now().toString(),
      authorName: currentAuthorName,
      avatarLetter: currentAuthorName.charAt(0).toUpperCase() || 'U',
      avatarBg: isTeacher ? 'bg-[#b91c1c]' : 'bg-blue-600',
      role: currentUserRole,
      timeAgo: 'Vừa xong',
      content: questionText.trim(),
      imageUrl: attachedImage || undefined,
      imageName: attachedImageName,
      videoUrl: attachedVideo || undefined,
      videoName: attachedVideoName,
      likes: 0,
      replies: []
    };

    setDiscussions([newDiscussion, ...discussions]);
    setQuestionText('');
    setAttachedImage(null);
    setAttachedImageName('');
    setAttachedVideo(null);
    setAttachedVideoName('');
    setShowEmojiPicker(false);
  };

  // Đăng câu trả lời cho một chủ đề (Dùng trực tiếp tài khoản thật)
  const handlePostReply = (discussionId: string) => {
    if (!replyText.trim() && !replyAttachedImage && !replyAttachedVideo) return;

    const newReply: CommentReplyItem = {
      id: Date.now().toString(),
      authorName: currentAuthorName,
      avatarLetter: currentAuthorName.charAt(0).toUpperCase() || 'U',
      avatarBg: isTeacher ? 'bg-[#b91c1c]' : 'bg-emerald-600',
      role: currentUserRole,
      timeAgo: 'Vừa xong',
      content: replyText.trim(),
      imageUrl: replyAttachedImage || undefined,
      imageName: replyAttachedImageName,
      videoUrl: replyAttachedVideo || undefined,
      videoName: replyAttachedVideoName,
      likes: 0
    };

    setDiscussions(discussions.map(d => {
      if (d.id === discussionId) {
        return {
          ...d,
          replies: [...d.replies, newReply]
        };
      }
      return d;
    }));

    setReplyText('');
    setReplyAttachedImage(null);
    setReplyAttachedImageName('');
    setReplyAttachedVideo(null);
    setReplyAttachedVideoName('');
    setReplyingToDiscussionId(null);
    setShowReplyEmoji(false);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1c1917] p-3 md:p-6 font-sans selection:bg-[#e7e5e4]">
      {/* Ẩn các file input thật để kích hoạt bằng nút giao diện */}
      <input type="file" accept="image/*" ref={mainImageInputRef} onChange={handleMainImageFilePicked} className="hidden" />
      <input type="file" accept="video/*" ref={mainVideoInputRef} onChange={handleMainVideoFilePicked} className="hidden" />
      <input type="file" accept="image/*" ref={replyImageInputRef} onChange={handleReplyImageFilePicked} className="hidden" />
      <input type="file" accept="video/*" ref={replyVideoInputRef} onChange={handleReplyVideoFilePicked} className="hidden" />

      {/* ─── BANNER TIÊU ĐỀ & CHỌN LEVEL (GỌN GÀNG THEO YÊU CẦU) ─── */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e7e5e4] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider bg-[#b91c1c] text-white">
                BÀI GIẢNG CHUYÊN SÂU
              </span>
              <span className="text-xs font-mono text-[#78716c] bg-[#f5f5f4] px-2 py-0.5 border border-[#e7e5e4]">
                SMART CINEMA CLASSROOM 🎬
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1c1917] mt-1.5 tracking-tight flex items-center gap-2">
              <GraduationCap className="w-7 h-7 text-[#b91c1c]" />
              <span>Phòng Học Ngữ Pháp Qua Video Bài Giảng</span>
            </h1>
          </div>

          {/* Level Switcher (N5..N1) */}
          <div className="flex items-center gap-1.5 bg-[#f5f5f4] p-1.5 border border-[#e7e5e4]">
            {(['N5', 'N4', 'N3', 'N2', 'N1'] as JlptLevel[]).map((lvl) => {
              const isSelected = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3.5 py-1.5 text-xs font-mono font-bold transition-all ${
                    isSelected
                      ? 'bg-[#b91c1c] text-white shadow-xs'
                      : 'text-[#44403c] hover:bg-white hover:text-[#1c1917]'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── NỘI DUNG CHÍNH: BỐ CỤC PHÒNG HỌC 2 CỘT ─────────────────────────── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ════════ CỘT TRÁI (8/12): VIDEO PLAYER & 3 TABS HỌC TẬP ════════ */}
        <div className="lg:col-span-8 space-y-5">
          {/* Header Bài Học Đang Chọn */}
          <div className="p-4 bg-white border border-[#e7e5e4] shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <span className="px-2 py-0.5 text-xs font-mono font-bold bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca]">
                BÀI {currentLesson.lessonNumber} · {currentLesson.curriculum}
              </span>
              <div className="flex items-center gap-2 text-xs font-mono text-[#78716c]">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentLesson.duration}</span>
              </div>
            </div>
            <h2 className="text-lg md:text-xl font-serif font-bold text-[#1c1917]">
              {currentLesson.titleVi}
            </h2>
            <p className="text-xs font-serif text-[#78716c] mt-0.5">
              {currentLesson.titleJa}
            </p>
          </div>

          {/* 🎬 TRÌNH PHÁT VIDEO BÀI GIẢNG (CHUẨN YOUTUBE EMBED PLAYER NGUYÊN BẢN) */}
          <div className="bg-[#0c0a09] border border-[#292524] shadow-lg overflow-hidden relative group">
            <div className="aspect-video w-full bg-black relative">
              <iframe
                id="yt-lesson-player"
                src={`https://www.youtube.com/embed/${currentLesson.videoId}?enablejsapi=1&autoplay=0`}
                title="Japanese Grammar Video Lecture"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>

          {/* ⏱️ INTERACTIVE TIMESTAMPS BAR (CLICK NHẢY ĐẾN ĐOẠN GIẢNG MẪU CÂU) */}
          <div className="bg-white border border-[#e7e5e4] p-3.5 shadow-xs">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#b91c1c]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1c1917]">
                  Mục lục thời gian thông minh (Bấm để tua video):
                </span>
              </div>
              <span className="text-[11px] text-[#a8a29e] hidden sm:inline">
                Tự động nhảy đến vị trí giáo viên bắt đầu giảng
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {currentLesson.timestamps.map((ts) => {
                const isActive = activeTimestamp === ts.timeSec;
                return (
                  <button
                    key={ts.id}
                    onClick={() => handleJumpToTimestamp(ts.timeSec)}
                    className={`px-3 py-2 text-left border transition-all flex-shrink-0 min-w-[170px] ${
                      isActive
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
                    <div className="font-serif font-bold text-xs text-[#1c1917] mt-1 truncate">
                      {ts.pattern}
                    </div>
                    <div className="text-[10px] text-[#78716c] truncate mt-0.5">
                      {ts.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 📑 HỆ THỐNG 3 TABS HỌC TẬP TRỌNG TÂM */}
          <div className="bg-white border border-[#e7e5e4] shadow-xs overflow-hidden">
            {/* Thanh chọn Tab */}
            <div className="flex border-b border-[#e7e5e4] bg-[#fafaf9] overflow-x-auto">
              <button
                onClick={() => setActiveTab('cheatsheet')}
                className={`px-5 py-3 text-xs font-mono font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                  activeTab === 'cheatsheet'
                    ? 'border-[#b91c1c] text-[#b91c1c] bg-white'
                    : 'border-transparent text-[#78716c] hover:text-[#1c1917]'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>1. Bảng Tóm Tắt Công Thức</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-5 py-3 text-xs font-mono font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                  activeTab === 'quiz'
                    ? 'border-[#b91c1c] text-[#b91c1c] bg-white'
                    : 'border-transparent text-[#78716c] hover:text-[#1c1917]'
                }`}
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>2. Bài Test Củng Cố & Xếp Sao ⭐</span>
                {quizSubmitted && quizScore !== null && (
                  <span className={`px-1.5 py-0.2 text-[10px] ${quizScore >= 85 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {quizScore}%
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('discussion')}
                className={`px-5 py-3 text-xs font-mono font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                  activeTab === 'discussion'
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
                  <div className="p-3 bg-[#fdfbf7] border border-[#f5ecd8] text-xs text-[#854d0e] flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-[#854d0e] shrink-0 mt-0.5" />
                    <div>
                      <strong>Ghi nhớ nhanh:</strong> Bạn không cần phải tạm dừng video để chép tay! Toàn bộ công thức kết hợp, sắc thái và ví dụ tiêu biểu đã được tổng hợp sẵn bên dưới theo thứ tự bài giảng.
                    </div>
                  </div>

                  <div className="space-y-4">
                    {currentLesson.cheatsheet.map((item, idx) => (
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
                          <span className="px-2 py-0.5 text-xs font-mono font-bold bg-[#f5f5f4] text-[#44403c] border border-[#e7e5e4]">
                            {item.badge}
                          </span>
                        </div>

                        {/* Ý nghĩa & Cấu trúc */}
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

                        {/* Sắc thái & Lưu ý */}
                        <div className="text-xs text-[#44403c] bg-[#f5f5f4] p-3 border border-[#e7e5e4] mb-3 leading-relaxed">
                          <span className="font-bold text-[#1c1917]">💡 Sắc thái & Lưu ý: </span>
                          {item.nuance}
                        </div>

                        {/* Ví dụ mẫu */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono font-bold text-[#78716c] uppercase">VÍ DỤ TIÊU BIỂU:</span>
                          {item.examples.map((ex, exIdx) => (
                            <div key={exIdx} className="p-2.5 bg-white border border-[#e7e5e4] text-xs flex flex-col gap-0.5">
                              <span className="font-serif font-bold text-sm text-[#1c1917]">{ex.ja}</span>
                              <span className="text-[#78716c]">{ex.vi}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: BÀI TEST CỦNG CỐ & XẾP SAO ⭐ */}
              {activeTab === 'quiz' && (
                <div className="space-y-6">
                  {/* Banner hướng dẫn làm bài */}
                  <div className="p-4 bg-[#fef2f2] border border-[#fecaca] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8 text-[#b91c1c] shrink-0" />
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#991b1b]">
                          BÀI KIỂM TRA CỦNG CỐ BÀI {currentLesson.lessonNumber}
                        </h4>
                        <p className="text-xs text-[#7f1d1d] mt-0.5">
                          Hoàn thành các câu trắc nghiệm và câu sắp xếp ngôi sao đạt <strong className="font-bold">≥ 85%</strong> để mở khóa bài tiếp theo!
                        </p>
                      </div>
                    </div>
                    {quizSubmitted && quizScore !== null && (
                      <div className={`px-4 py-2 border font-mono font-bold text-center ${
                        quizScore >= 85 ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'
                      }`}>
                        <div className="text-xl">{quizScore}%</div>
                        <div className="text-[10px]">{quizScore >= 85 ? '✓ ĐẠT CHUẨN' : '✕ CHƯA ĐẠT'}</div>
                      </div>
                    )}
                  </div>

                  {/* Phần 1: Các câu trắc nghiệm MCQ */}
                  <div className="space-y-5">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#78716c] border-b pb-1">
                      PHẦN 1: TRẮC NGHIỆM CHỌN MẪU CÂU (TRỌNG TÂM NGỮ PHÁP)
                    </div>

                    {currentLesson.quiz.mcq.map((q, idx) => (
                      <div key={q.id} className="p-4 border border-[#e7e5e4] bg-[#fafaf9]">
                        <div className="text-xs font-mono font-bold text-[#b91c1c] mb-1">
                          CÂU {idx + 1}:
                        </div>
                        <div className="text-sm font-serif font-bold text-[#1c1917] mb-3">
                          {q.question}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {q.options.map((opt) => {
                            const isSelected = mcqAnswers[q.id] === opt;
                            const isCorrect = opt === q.correctAnswer;
                            let btnStyle = 'bg-white border-[#d6d3d1] hover:border-[#1c1917]';
                            if (quizSubmitted) {
                              if (isCorrect) btnStyle = 'bg-green-50 border-green-500 text-green-800 font-bold';
                              else if (isSelected && !isCorrect) btnStyle = 'bg-red-50 border-red-500 text-red-800 line-through';
                            } else if (isSelected) {
                              btnStyle = 'bg-[#1c1917] border-[#1c1917] text-white font-bold';
                            }

                            return (
                              <button
                                key={opt}
                                disabled={quizSubmitted}
                                onClick={() => setMcqAnswers({ ...mcqAnswers, [q.id]: opt })}
                                className={`px-3 py-2 text-xs border transition-all text-left ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="mt-2.5 p-2.5 bg-white border border-[#e7e5e4] text-xs text-[#44403c]">
                            <span className="font-bold text-[#1c1917]">💡 Giải thích: </span>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Phần 2: BÀI TẬP SẮP XẾP VỊ TRÍ NGÔI SAO ⭐ */}
                  {starQ && starQ.fragments && (
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between border-b pb-1">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#b91c1c] flex items-center gap-1.5">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                          <span>PHẦN 2: BÀI TẬP DẤU SAO JLPT ⭐ (TÌM TỪ TẠI VỊ TRÍ ★)</span>
                        </div>
                        <span className="text-[11px] text-[#78716c]">Dạng bài trọng điểm thi JLPT</span>
                      </div>

                      <div className="p-5 border-2 border-dashed border-[#d6d3d1] bg-[#fafaf9] space-y-4">
                        <p className="text-xs text-[#57534e]">
                          {starQ.prompt}
                        </p>

                        {/* Khung ghép câu hoàn chỉnh */}
                        <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-[#e7e5e4] text-sm">
                          {starQ.leftSentence && (
                            <span className="font-serif font-bold text-[#1c1917]">{starQ.leftSentence}</span>
                          )}

                          {/* 4 Slots để xếp từ */}
                          {[0, 1, 2, 3].map((slotIdx) => {
                            const val = selectedSlots[slotIdx];
                            const isStar = slotIdx === starQ.starIndex;

                            return (
                              <div
                                key={slotIdx}
                                onClick={() => val && handleRemoveSlot(slotIdx)}
                                className={`min-w-[70px] h-9 px-2.5 border-2 flex items-center justify-center font-serif font-bold text-xs cursor-pointer transition-all ${
                                  val
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

                          {starQ.rightSentence && (
                            <span className="font-serif font-bold text-[#1c1917]">{starQ.rightSentence}</span>
                          )}
                        </div>

                        {/* 4 Mảnh từ xáo trộn để người học bấm chọn */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono text-[#78716c]">
                            Bấm vào từng mảnh từ dưới đây để xếp vào ô trống:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {starQ.fragments.map((frag, fIdx) => {
                              const isPlaced = selectedSlots.includes(frag.text);
                              return (
                                <button
                                  key={frag.id}
                                  disabled={isPlaced || starSubmitted}
                                  onClick={() => handleSelectFragment(frag.text)}
                                  className={`px-3 py-1.5 text-xs font-serif font-bold border transition-all ${
                                    isPlaced
                                      ? 'bg-[#f5f5f4] text-[#a8a29e] border-[#e7e5e4] cursor-not-allowed line-through'
                                      : 'bg-white text-[#1c1917] border-[#d6d3d1] hover:border-[#b91c1c] hover:text-[#b91c1c] shadow-2xs'
                                  }`}
                                >
                                  {fIdx + 1}. {frag.text}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Nút hành động kiểm tra câu sao */}
                        <div className="flex items-center justify-between pt-2">
                          <button
                            onClick={handleResetStar}
                            className="text-xs text-[#78716c] hover:text-[#1c1917] underline font-mono"
                          >
                            Xếp lại từ đầu
                          </button>

                          <button
                            disabled={starSubmitted}
                            onClick={handleCheckStarAnswer}
                            className="px-4 py-1.5 bg-[#1c1917] text-white text-xs font-mono font-bold hover:bg-[#b91c1c] transition-colors disabled:opacity-50"
                          >
                            Kiểm tra vị trí ngôi sao ★
                          </button>
                        </div>

                        {/* Kết quả kiểm tra câu sao */}
                        {starSubmitted && isStarCorrect !== null && (
                          <div className={`p-3 border text-xs ${
                            isStarCorrect ? 'bg-green-50 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800'
                          }`}>
                            <div className="font-bold mb-1">
                              {isStarCorrect ? '🎉 Chính xác! Bạn đã xếp đúng vị trí ngôi sao!' : '✕ Chưa chính xác! Hãy đọc lại lời giải bên dưới:'}
                            </div>
                            <p className="text-[11px] leading-relaxed">
                              {starQ.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Nút Nộp Bài Chung */}
                  <div className="pt-4 border-t border-[#e7e5e4] flex items-center justify-between">
                    <span className="text-xs font-mono text-[#78716c]">
                      {quizSubmitted
                        ? `Điểm kiểm tra của bạn: ${quizScore}% (${quizScore! >= 85 ? 'ĐÃ ĐẠT CHUẨN ĐỂ MỞ BÀI TIẾP THEO' : 'CHƯA ĐẠT CHUẨN 85%'})`
                        : 'Hoàn thành câu hỏi trắc nghiệm & câu ngôi sao rồi bấm Nộp bài'}
                    </span>
                    {!quizSubmitted ? (
                      <button
                        onClick={handleSubmitFullQuiz}
                        className="px-6 py-2.5 bg-[#b91c1c] text-white text-xs font-mono font-bold hover:bg-[#991b1b] transition-all shadow-xs flex items-center gap-2"
                      >
                        <span>Nộp Bài Test & Đánh Giá 📝</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setQuizScore(null);
                          setMcqAnswers({});
                          handleResetStar();
                        }}
                        className="px-4 py-2 bg-white border border-[#d6d3d1] text-xs font-medium hover:bg-[#fafaf9]"
                      >
                        Làm lại bài kiểm tra 🔄
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: HỎI ĐÁP & THẢO LUẬN (CHẾ ĐỘ TÀI KHOẢN THẬT & XEM ẢNH/VIDEO KIỂU FACEBOOK) */}
              {activeTab === 'discussion' && (
                <div className="space-y-6">
                  {/* Khung soạn câu hỏi / chủ đề mới */}
                  <div className="p-4 bg-white border border-[#e7e5e4] shadow-xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f5f5f4] pb-2">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#1c1917] flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#b91c1c]" />
                        <span>Đặt câu hỏi hoặc thảo luận về bài học:</span>
                      </div>

                      {/* Hiển thị danh tính tài khoản thật của người dùng */}
                      <div className="text-xs font-mono text-[#78716c] flex items-center gap-1.5">
                        <span>Đang đăng với tư cách:</span>
                        <strong className="text-[#1c1917]">{currentAuthorName}</strong>
                        {isTeacher ? (
                          <span className="px-1.5 py-0.2 bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca] text-[10px] font-bold">
                            Giảng viên ★
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 bg-[#f5f5f4] text-[#78716c] text-[10px]">
                            Học viên
                          </span>
                        )}
                      </div>
                    </div>

                    <textarea
                      rows={3}
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="Nhập nội dung câu hỏi hoặc chia sẻ thắc mắc... (Bạn có thể chọn ảnh/video từ máy tính của bạn hoặc chèn icon cảm xúc bên dưới)"
                      className="w-full text-xs p-3 border border-[#d6d3d1] bg-[#fafaf9] focus:bg-white focus:outline-none focus:border-[#b91c1c] font-sans"
                    />

                    {/* Xem trước Media đính kèm từ máy hoặc link */}
                    {(attachedImage || attachedVideo) && (
                      <div className="flex flex-wrap items-center gap-3 p-2.5 bg-[#f5f5f4] border border-[#e7e5e4]">
                        {attachedImage && (
                          <div className="relative group inline-block">
                            <div
                              onClick={() => handleOpenMedia({ type: 'image', url: attachedImage, title: attachedImageName })}
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
                              onClick={() => { setAttachedImage(null); setAttachedImageName(''); }}
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
                              onClick={() => handleOpenMedia({ type: 'video', url: attachedVideo, title: attachedVideoName })}
                              onMouseEnter={(e) => {
                                const v = e.currentTarget.querySelector('video');
                                if (v) v.play().catch(() => {});
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
                              onClick={() => { setAttachedVideo(null); setAttachedVideoName(''); }}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#b91c1c] text-white rounded-full flex items-center justify-center text-xs hover:bg-black transition-colors shadow-md z-10"
                              title="Xóa video"
                            >
                              <X className="w-3 h-3" />
                            </button>

                          </div>
                        )}
                      </div>
                    )}

                    {/* Popover Bảng chọn Icon / Emoji */}
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

                    {/* Hộp thoại dán link URL nếu user muốn chèn online */}
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

                    {/* Thanh công cụ: Nút Tải Ảnh (Máy tính & URL), Tải Video (Máy tính & URL), Chèn Icon, và Gửi */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {/* Nhóm Chèn Ảnh */}
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

                        {/* Nhóm Chèn Video */}
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

                        {/* Nút Emoji */}
                        <button
                          type="button"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className={`px-2.5 py-1.5 text-xs border flex items-center gap-1.5 transition-colors ${
                            showEmojiPicker ? 'bg-[#b91c1c] text-white border-[#b91c1c]' : 'bg-white text-[#44403c] border-[#d6d3d1] hover:border-[#1c1917]'
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

                  {/* Danh sách các câu hỏi & luồng bình luận (Threading) */}
                  <div className="space-y-4">
                    {discussions.map((d) => (
                      <div key={d.id} className="p-4 border border-[#e7e5e4] bg-[#fafaf9] space-y-3">
                        {/* Header Chủ đề */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full ${d.avatarBg} text-white flex items-center justify-center text-xs font-bold font-mono`}>
                              {d.avatarLetter}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-[#1c1917]">{d.authorName}</span>
                                {d.role === 'teacher' ? (
                                  <span className="px-1.5 py-0.2 bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca] text-[10px] font-mono font-bold">
                                    Giảng viên ★
                                  </span>
                                ) : (
                                  <span className="px-1.5 py-0.2 bg-[#f5f5f4] text-[#78716c] text-[10px] font-mono">
                                    Học viên
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-[#a8a29e] font-mono">{d.timeAgo}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1 text-[11px] font-mono text-[#78716c] hover:text-[#b91c1c] transition-colors">
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>{d.likes}</span>
                            </button>
                            <button
                              onClick={() => {
                                setReplyingToDiscussionId(replyingToDiscussionId === d.id ? null : d.id);
                                setReplyText('');
                              }}
                              className="px-2.5 py-1 text-xs font-mono font-bold border border-[#d6d3d1] bg-white text-[#1c1917] hover:border-[#b91c1c] hover:text-[#b91c1c] flex items-center gap-1 shadow-2xs"
                            >
                              <CornerDownRight className="w-3 h-3 text-[#b91c1c]" />
                              <span>Trả lời ({d.replies.length})</span>
                            </button>
                          </div>
                        </div>

                        {/* Nội dung câu hỏi */}
                        <p className="text-xs text-[#1c1917] leading-relaxed whitespace-pre-wrap pl-1">
                          {d.content}
                        </p>

                        {/* Render ảnh đính kèm: BẤM VÀO ĐỂ PHÓNG TO KIỂU FACEBOOK */}
                        {d.imageUrl && (
                          <div className="pt-1 pl-1">
                            <div
                              onClick={() => handleOpenMedia({ type: 'image', url: d.imageUrl!, title: d.imageName || 'Hình ảnh đính kèm' })}
                              className="relative group inline-block cursor-pointer overflow-hidden rounded-xs border border-[#e7e5e4] shadow-xs hover:shadow-md transition-all my-1"
                              title="Bấm để phóng to ảnh như Facebook"
                            >
                              <img
                                src={d.imageUrl}
                                alt={d.imageName || 'Đính kèm'}
                                className="max-h-64 max-w-full object-contain bg-white group-hover:scale-[1.01] transition-transform duration-200 pointer-events-none"
                              />
                            </div>

                          </div>
                        )}

                        {/* Render video đính kèm: HOVER TỰ CHẠY KHÔNG TIẾNG · CLICK PHÓNG TO KIỂU FACEBOOK */}
                        {d.videoUrl && (
                          <div className="pt-1 pl-1">
                            <div
                              onClick={() => handleOpenMedia({ type: 'video', url: d.videoUrl!, title: d.videoName || 'Video minh họa' })}
                              onMouseEnter={(e) => {
                                const v = e.currentTarget.querySelector('video');
                                if (v) v.play().catch(() => {});
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

                        {/* ─── CÁC CÂU TRẢ LỜI CỦA GIẢNG VIÊN VÀ CÁC HỌC VIÊN KHÁC (THREAD REPLIES) ─── */}
                        {d.replies.length > 0 && (
                          <div className="space-y-2.5 pt-2 border-t border-[#e7e5e4] pl-3 sm:pl-6">
                            {d.replies.map((reply) => {
                              const isReplyTeacher = reply.role === 'teacher';
                              return (
                                <div
                                  key={reply.id}
                                  className={`p-3 border transition-colors ${
                                    isReplyTeacher
                                      ? 'bg-white border-[#fecaca] border-l-4 border-l-[#b91c1c]'
                                      : 'bg-white border-[#e7e5e4] border-l-4 border-l-zinc-400'
                                  }`}
                                >
                                  <div className="flex items-center justify-between text-xs mb-1.5">
                                    <div className="flex items-center gap-2">
                                      <div className={`w-5 h-5 rounded-full ${reply.avatarBg} text-white flex items-center justify-center text-[10px] font-bold`}>
                                        {reply.avatarLetter}
                                      </div>
                                      <span className={`font-bold ${isReplyTeacher ? 'text-[#b91c1c]' : 'text-[#1c1917]'}`}>
                                        {reply.authorName}
                                      </span>
                                      {isReplyTeacher ? (
                                        <span className="px-1.5 py-0.2 bg-[#fef2f2] text-[#b91c1c] text-[10px] font-mono font-bold border border-[#fecaca]">
                                          Giảng viên xác nhận ✓
                                        </span>
                                      ) : (
                                        <span className="px-1.5 py-0.2 bg-[#f5f5f4] text-[#78716c] text-[10px] font-mono">
                                          Học viên thảo luận
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10px] text-[#a8a29e] font-mono">{reply.timeAgo}</span>
                                  </div>

                                  <p className="text-xs text-[#1c1917] leading-relaxed pl-7 whitespace-pre-wrap">
                                    {reply.content}
                                  </p>

                                  {/* Ảnh đính kèm trong câu trả lời (phóng to khi click) */}
                                  {reply.imageUrl && (
                                    <div className="pl-7 pt-1">
                                      <div
                                        onClick={() => handleOpenMedia({ type: 'image', url: reply.imageUrl!, title: reply.imageName })}
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

                                  {/* Video đính kèm trong câu trả lời (hover demo + click phóng to) */}
                                  {reply.videoUrl && (
                                    <div className="pl-7 pt-1">
                                      <div
                                        onClick={() => handleOpenMedia({ type: 'video', url: reply.videoUrl!, title: reply.videoName })}
                                        onMouseEnter={(e) => {
                                          const v = e.currentTarget.querySelector('video');
                                          if (v) v.play().catch(() => {});
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

                        {/* ─── KHUNG TRẢ LỜI CHO CHỦ ĐỀ NÀY (INLINE REPLY FORM) ─── */}
                        {replyingToDiscussionId === d.id && (
                          <div className="mt-3 p-3.5 bg-white border border-[#d6d3d1] shadow-xs space-y-3 pl-3 sm:pl-6 animate-in fade-in">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f5f5f4] pb-1.5">
                              <span className="text-xs font-mono font-bold text-[#1c1917]">
                                Viết phản hồi cho {d.authorName}:
                              </span>

                              <span className="text-xs font-mono text-[#78716c]">
                                Trả lời với tư cách: <strong className="text-[#1c1917]">{currentAuthorName}</strong> ({isTeacher ? 'Giảng viên' : 'Học viên'})
                              </span>
                            </div>

                            <textarea
                              rows={2}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder={`Nhập phản hồi của bạn...`}
                              className="w-full text-xs p-2.5 border border-[#d6d3d1] bg-[#fafaf9] focus:bg-white focus:outline-none focus:border-[#b91c1c]"
                            />

                            {/* Xem trước Media đính kèm của reply */}
                            {(replyAttachedImage || replyAttachedVideo) && (
                              <div className="flex flex-wrap items-center gap-2 p-2 bg-[#f5f5f4] border border-[#e7e5e4] text-xs">
                                {replyAttachedImage && (
                                  <div className="relative group inline-block">
                                    <div
                                      onClick={() => handleOpenMedia({ type: 'image', url: replyAttachedImage, title: replyAttachedImageName })}
                                      className="cursor-pointer"
                                    >
                                      <img
                                        src={replyAttachedImage}
                                        alt="Preview"
                                        className="h-14 w-20 object-cover border pointer-events-none hover:opacity-90"
                                      />
                                    </div>
                                    <button
                                      onClick={() => { setReplyAttachedImage(null); setReplyAttachedImageName(''); }}
                                      className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#b91c1c] text-white rounded-full flex items-center justify-center text-[10px]"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                )}
                                {replyAttachedVideo && (
                                  <div className="relative group inline-block">
                                    <div
                                      onClick={() => handleOpenMedia({ type: 'video', url: replyAttachedVideo, title: replyAttachedVideoName })}
                                      onMouseEnter={(e) => {
                                        const v = e.currentTarget.querySelector('video');
                                        if (v) v.play().catch(() => {});
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
                                      onClick={() => { setReplyAttachedVideo(null); setReplyAttachedVideoName(''); }}
                                      className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#b91c1c] text-white rounded-full flex items-center justify-center text-[10px]"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Popover Emoji của Reply */}
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

                            {/* Toolbar của Reply */}
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

        {/* ════════ CỘT PHẢI (4/12): PLAYLIST DANH SÁCH BÀI HỌC ════════ */}
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
              <span className="text-xs font-mono font-bold text-[#166534] bg-[#f0fdf4] px-2 py-1 border border-[#bbf7d0]">
                1/25 Đạt
              </span>
            </div>

            <div className="space-y-2">
              {LESSON_PLAYLIST_N5.map((lesson) => {
                const isCurrent = lesson.id === selectedLessonId;
                const isLocked = !lesson.isUnlocked;

                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      if (!isLocked) {
                        setSelectedLessonId(lesson.id);
                        setActiveTimestamp(0);
                      }
                    }}
                    className={`p-3 border transition-all text-left flex items-start justify-between gap-3 ${
                      isCurrent
                        ? 'border-[#b91c1c] bg-[#fef2f2] shadow-xs'
                        : isLocked
                        ? 'border-[#f5f5f4] bg-[#fafaf9] opacity-60 cursor-not-allowed'
                        : 'border-[#e7e5e4] bg-white hover:border-[#a8a29e] cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 flex items-center justify-center font-mono text-xs font-bold shrink-0 border ${
                          isCurrent
                            ? 'bg-[#b91c1c] text-white border-[#b91c1c]'
                            : lesson.isPassed
                            ? 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]'
                            : isLocked
                            ? 'bg-[#e7e5e4] text-[#78716c] border-[#d6d3d1]'
                            : 'bg-white text-[#1c1917] border-[#e7e5e4]'
                        }`}
                      >
                        {lesson.lessonNumber < 10 ? `0${lesson.lessonNumber}` : lesson.lessonNumber}
                      </div>

                      <div className="min-w-0">
                        <div className="font-serif font-bold text-xs text-[#1c1917] truncate">
                          {lesson.titleVi}
                        </div>
                        <div className="text-[11px] text-[#78716c] font-mono mt-0.5 flex items-center gap-2">
                          <span>⏱️ {lesson.duration}</span>
                          {lesson.score && (
                            <span className="text-[#166534] font-bold">• {lesson.score}%</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 mt-1">
                      {isLocked ? (
                        <Lock className="w-4 h-4 text-[#a8a29e]" />
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
          </div>
        </div>
      </div>

      {/* ════════ FACEBOOK-STYLE LIGHTBOX PORTAL (PHÓNG TO ẢNH & VIDEO TRỰC TIẾP TRÊN BODY) ════════ */}
      {activeLightboxMedia && createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLightboxMedia(null)}
        >
          {/* Nút đóng ở góc trên bên phải */}
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
                  alt={activeLightboxMedia.title || 'Xem ảnh phóng to'}
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
    </div>
  );
}
