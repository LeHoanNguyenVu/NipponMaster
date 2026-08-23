import { useEffect, useState } from 'react';
import { 
  Flame, Clock, Trophy, Play,
  Languages, Shapes, BookOpen, Headphones,
  CheckCircle2, AlertCircle, ArrowRight, Compass,
  BookMarked, RefreshCw, BarChart3, Star, Sparkles,
  Award, ChevronRight, RotateCw, Volume2, HelpCircle,
  PenTool, Info
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useDailyQuestsStore } from '../store/useDailyQuestsStore';
import KanjiStrokeWriter from '../components/KanjiStrokeWriter';
import axiosClient from '../api/axiosClient';
import type { ScreenType } from '../App';

interface Stats {
  jlptLevel: string;
  targetLevel: string;
  vocabLearned: number;
  vocabTotal: number;
  kanjiLearned: number;
  kanjiTotal: number;
  grammarLearned: number;
  grammarTotal: number;
  listeningCompleted: number;
  listeningTotal: number;
  battleWins: number;
  battleTotal: number;
  weeklyStudyMinutes: number;
  dueCardCount: number;
  streakDays: number;
  dueCards: any[];
}

interface DashboardStudentProps {
  onStartStudy?: () => void;
  onOpenBeginnerCourse?: () => void;
  onNavigate?: (screen: ScreenType) => void;
  username?: string;
}

const STATS_CACHE_KEY = 'nippon_student_stats_v3';

interface FlashcardItem {
  kanji: string;
  kana: string;
  romaji: string;
  hanViet: string;
  meaning: string;
  strokeCount: number;
  strokeGuide: string;
  exampleJp: string;
  exampleRomaji: string;
  exampleVi: string;
}

// Flashcard Library strictly scoped by JLPT level / stage
const LEVEL_CARDS_MAP: Record<string, FlashcardItem[]> = {
  STARTER: [
    {
      kanji: 'あ',
      kana: 'あ',
      romaji: 'a',
      hanViet: 'Ký tự Hiragana "A"',
      meaning: 'Chữ cái "A" trong bảng chữ cái Hiragana',
      strokeCount: 3,
      strokeGuide: 'Nét ngang ➔ Nét sổ cong ➔ Nét vòng tròn xoắn ốc',
      exampleJp: 'ありがとう ございます。',
      exampleRomaji: 'Arigatou gozaimasu.',
      exampleVi: 'Cảm ơn bạn rất nhiều.',
    },
    {
      kanji: '一',
      kana: 'いち',
      romaji: 'ichi',
      hanViet: 'NHẤT',
      meaning: 'Số 1, một',
      strokeCount: 1,
      strokeGuide: '1 nét ngang từ trái sang phải dứt khoát',
      exampleJp: '一つ ください。',
      exampleRomaji: 'Hitotsu kudasai.',
      exampleVi: 'Xin vui lòng cho tôi một cái.',
    },
    {
      kanji: '本',
      kana: 'ほん',
      romaji: 'hon',
      hanViet: 'BẢN / BỔN',
      meaning: 'Quyển sách, nguồn gốc',
      strokeCount: 5,
      strokeGuide: 'Bộ Mộc (木) thêm nét ngang ngắn ở chân',
      exampleJp: '毎日 日本語の本を 読みます。',
      exampleRomaji: 'Mainichi nihongo no hon o yomimasu.',
      exampleVi: 'Mỗi ngày tôi đều đọc sách tiếng Nhật.',
    },
    {
      kanji: '猫',
      kana: 'ねこ',
      romaji: 'neko',
      hanViet: 'MIÊU',
      meaning: 'Con mèo',
      strokeCount: 11,
      strokeGuide: 'Bộ Khuyển (犭) bên trái + Chữ Miêu (苗) bên phải',
      exampleJp: '可愛い猫が 庭で寝ています。',
      exampleRomaji: 'Kawaii neko ga niwa de nete imasu.',
      exampleVi: 'Con mèo đáng yêu đang ngủ trong sân vườn.',
    },
    {
      kanji: '川',
      kana: 'かわ',
      romaji: 'kawa',
      hanViet: 'XUYÊN',
      meaning: 'Dòng sông',
      strokeCount: 3,
      strokeGuide: '3 nét thẳng đứng uốn lượn tượng trưng cho dòng nước',
      exampleJp: '川の水が とても綺麗です。',
      exampleRomaji: 'Kawa no mizu ga totemo kirei desu.',
      exampleVi: 'Nước sông rất trong và đẹp.',
    },
    {
      kanji: '山',
      kana: 'やま',
      romaji: 'yama',
      hanViet: 'SƠN',
      meaning: 'Ngọn núi',
      strokeCount: 3,
      strokeGuide: 'Nét giữa cao nhất, 2 nét hai bên cân xứng',
      exampleJp: '富士山は 日本で一番高い山です。',
      exampleRomaji: 'Fujisan wa Nihon de ichiban takai yama desu.',
      exampleVi: 'Núi Phú Sĩ là ngọn núi cao nhất Nhật Bản.',
    },
  ],
  N5: [
    {
      kanji: '日',
      kana: 'ひ / にち',
      romaji: 'hi / nichi',
      hanViet: 'NHẬT',
      meaning: 'Mặt trời, ngày, Nhật Bản',
      strokeCount: 4,
      strokeGuide: 'Khung chữ nhật đóng mở từ trái sang phải, nét ngang ở giữa',
      exampleJp: '日曜日に 友達と遊びます。',
      exampleRomaji: 'Nichiyoubi ni tomodachi to asobimasu.',
      exampleVi: 'Tôi đi chơi với bạn vào ngày Chủ nhật.',
    },
    {
      kanji: '学',
      kana: 'がく / まな・ぶ',
      romaji: 'gaku / manabu',
      hanViet: 'HỌC',
      meaning: 'Học tập, học vấn, trường học',
      strokeCount: 8,
      strokeGuide: '3 chấm trên đầu ➔ Mái che ➔ Bộ Tử (子) phía dưới',
      exampleJp: '大学で 日本語を勉強しています。',
      exampleRomaji: 'Daigaku de nihongo o benkyou shite imasu.',
      exampleVi: 'Tôi đang học tiếng Nhật ở trường đại học.',
    },
    {
      kanji: '食',
      kana: 'た・べる / しょく',
      romaji: 'taberu / shoku',
      hanViet: 'THỰC',
      meaning: 'Ăn, món ăn, thực phẩm',
      strokeCount: 9,
      strokeGuide: 'Nón trên đầu ➔ Bộ Cấn (艮) phía dưới',
      exampleJp: '朝ごはんを しっかり食べます。',
      exampleRomaji: 'Asagohan o shikkari tabemasu.',
      exampleVi: 'Tôi ăn sáng rất đầy đủ.',
    },
    {
      kanji: '友',
      kana: 'ともだち / ゆう',
      romaji: 'tomodachi / yuu',
      hanViet: 'HỮU',
      meaning: 'Bạn bè, tình bạn',
      strokeCount: 4,
      strokeGuide: 'Nét ngang ➔ Nét phẩy cong ➔ Bộ Hựu (又) đan chéo',
      exampleJp: '友達と一緒に 旅行に行きます。',
      exampleRomaji: 'Tomodachi to issho ni ryokou ni ikimasu.',
      exampleVi: 'Tôi đi du lịch cùng với bạn bè.',
    },
  ],
  N4: [
    {
      kanji: '旅',
      kana: 'たび / りょ',
      romaji: 'tabi / ryo',
      hanViet: 'LỮ',
      meaning: 'Chuyến đi, du lịch',
      strokeCount: 10,
      strokeGuide: 'Bộ Phương (方) bên trái + Bộ Nhân phụ bên phải',
      exampleJp: '来月、日本へ 旅行に行きます。',
      exampleRomaji: 'Raigetsu, Nihon e ryokou ni ikimasu.',
      exampleVi: 'Tháng sau tôi sẽ đi du lịch Nhật Bản.',
    },
    {
      kanji: '店',
      kana: 'みせ / てん',
      romaji: 'mise / ten',
      hanViet: 'ĐIẾM',
      meaning: 'Cửa hàng, tiệm',
      strokeCount: 8,
      strokeGuide: 'Bộ Quảng (广) che phía trên + Chữ Chiếm (占) bên trong',
      exampleJp: 'この店のラーメンは とても美味しいです。',
      exampleRomaji: 'Kono mise no raamen wa totemo oishii desu.',
      exampleVi: 'Mì ramen ở quán này rất ngon.',
    },
  ],
  N3: [
    {
      kanji: '政',
      kana: 'まつりごと / せい',
      romaji: 'sei / shou',
      hanViet: 'CHÍNH',
      meaning: 'Chính trị, chính phủ, chính sách',
      strokeCount: 9,
      strokeGuide: 'Bộ Chính (正) bên trái + Bộ Phác (攵) bên phải',
      exampleJp: '国の政治について 深く考えます。',
      exampleRomaji: 'Kuni no seiji ni tsuite fukaku kangaemasu.',
      exampleVi: 'Tôi suy nghĩ sâu sắc về nền chính trị quốc gia.',
    },
  ],
  N2: [
    {
      kanji: '契',
      kana: 'ちぎ・る / けい',
      romaji: 'chigiru / kei',
      hanViet: 'KHẾ',
      meaning: 'Hợp đồng, khế ước, giao ước',
      strokeCount: 9,
      strokeGuide: 'Chữ Cầm phía trên + Bộ Đại (大) phía dưới',
      exampleJp: '新しい会社と 契約を結びました。',
      exampleRomaji: 'Atarashii kaisha to keiyaku o musubimashita.',
      exampleVi: 'Tôi đã ký kết hợp đồng với công ty mới.',
    },
  ],
  N1: [
    {
      kanji: '鑑',
      kana: 'かがみ / かん',
      romaji: 'kagami / kan',
      hanViet: 'GIÁM',
      meaning: 'Gương mẫu, thẩm định, giám định',
      strokeCount: 23,
      strokeGuide: 'Bộ Kim (金) bên trái + Bộ Giám (監) bên phải',
      exampleJp: '美術品の真贋を 鑑識する。',
      exampleRomaji: 'Bijutsuhin no shingan o kanshiki suru.',
      exampleVi: 'Giám định tính thật giả của tác phẩm nghệ thuật.',
    },
  ],
};

export default function DashboardStudent({
  onStartStudy,
  onOpenBeginnerCourse,
  onNavigate,
  username,
}: DashboardStudentProps) {
  const { user } = useAuthStore();
  const { quests, userStreak, isTodayStreakCompleted, claimReward, updateProgress } = useDailyQuestsStore();

  // Instant Stale-While-Revalidate
  const [stats, setStats] = useState<Stats>(() => {
    try {
      const cached = localStorage.getItem(STATS_CACHE_KEY);
      if (cached) return JSON.parse(cached);
    } catch {}
    return {
      jlptLevel: user?.jlptLevel || 'STARTER',
      targetLevel: user?.targetLevel || '',
      vocabLearned: 0,
      vocabTotal: 100,
      kanjiLearned: 0,
      kanjiTotal: 50,
      grammarLearned: 0,
      grammarTotal: 25,
      listeningCompleted: 0,
      listeningTotal: 200,
      battleWins: 0,
      battleTotal: 0,
      weeklyStudyMinutes: 30,
      dueCardCount: 0,
      streakDays: userStreak || 0,
      dueCards: [],
    };
  });

  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [cardTab, setCardTab] = useState<'info' | 'stroke'>('info');
  const [strokeKey, setStrokeKey] = useState<number>(0);
  const [isDealing, setIsDealing] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Fetch updated stats from backend
  useEffect(() => {
    let active = true;
    const fetchStats = async () => {
      setIsRefreshing(true);
      try {
        const res = await axiosClient.get('/dashboard/stats');
        const data = res.data.data ?? res.data;
        if (active && data) {
          setStats(data);
          try {
            localStorage.setItem(STATS_CACHE_KEY, JSON.stringify(data));
          } catch {}
        }
      } catch (err) {
        console.warn('Silent fallback for dashboard stats', err);
      } finally {
        if (active) setIsRefreshing(false);
      }
    };

    fetchStats();
    return () => {
      active = false;
    };
  }, []);

  const navigateTo = (screen: ScreenType) => {
    if (onNavigate) {
      onNavigate(screen);
    } else if (screen === 'flashcards' && onStartStudy) {
      onStartStudy();
    } else if (screen === 'beginner' && onOpenBeginnerCourse) {
      onOpenBeginnerCourse();
    }
  };

  // Japanese Speech Synthesis (TTS Audio Pronunciation - High volume, crystal clear)
  const speakJapanese = (text: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.volume = 1.0; // 100% Max Volume
      utterance.rate = 0.85;  // Clear, natural cadence
      utterance.pitch = 1.0;

      // Select best available Japanese voice
      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find((v) => v.lang === 'ja-JP' || v.lang === 'ja_JP' || v.lang.startsWith('ja'));
      if (jaVoice) {
        utterance.voice = jaVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  // Card Deal / Swap Animation with Hand Placement effect
  const handleDealNextCard = () => {
    setIsFlipped(false);
    setCardTab('info');
    setIsDealing(true);
    setTimeout(() => {
      setCardIndex((prev) => prev + 1);
    }, 150);
    setTimeout(() => {
      setIsDealing(false);
    }, 550);
  };

  // Time-based dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng 🌅';
    if (hour < 18) return 'Chào buổi chiều ☀️';
    return 'Chào buổi tối 🌙';
  };

  // Pure Vietnamese level conversion
  const formatLevel = (lvl?: string) => {
    if (!lvl || lvl.toUpperCase() === 'STARTER') return 'Nhập Môn';
    return lvl.toUpperCase();
  };

  const rawLevel = stats.jlptLevel || user?.jlptLevel || 'STARTER';
  const levelDisplay = formatLevel(rawLevel);
  const hasCustomTarget = user?.targetLevel && user.targetLevel.toUpperCase() !== 'STARTER';

  // Percentage calculations
  const vocabPct = stats.vocabTotal > 0 ? Math.min(100, Math.round((stats.vocabLearned / stats.vocabTotal) * 100)) : 0;
  const kanjiPct = stats.kanjiTotal > 0 ? Math.min(100, Math.round((stats.kanjiLearned / stats.kanjiTotal) * 100)) : 0;
  const grammarPct = stats.grammarTotal > 0 ? Math.min(100, Math.round((stats.grammarLearned / stats.grammarTotal) * 100)) : 0;
  const overallMastery = Math.max(5, Math.round((vocabPct + kanjiPct + grammarPct) / 3));

  // Determine current user level key
  const normalizedLevelKey = rawLevel.toUpperCase();
  const currentDeck = LEVEL_CARDS_MAP[normalizedLevelKey] || LEVEL_CARDS_MAP.STARTER;
  const activeCard = currentDeck[cardIndex % currentDeck.length];
  const displayStreak = Math.max(userStreak, stats.streakDays);

  // 7-Day Consistency tracker
  const daysOfWeek = [
    { label: 'T2', active: true },
    { label: 'T3', active: true },
    { label: 'T4', active: displayStreak >= 3 },
    { label: 'T5', active: displayStreak >= 4 },
    { label: 'T6', active: displayStreak >= 5 },
    { label: 'T7', active: displayStreak >= 6 },
    { label: 'CN', active: displayStreak >= 7 },
  ];

  return (
    <div className="max-w-[1360px] mx-auto p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 font-sans pb-16 animate-fade-in">
      {/* ========================================================================= */}
      {/* 1. HERO COCKPIT: TRUNG TÂM TIẾN ĐỘ HỌC TẬP THÔNG MINH                    */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-high/90 border border-outline-variant/60 p-6 md:p-8 shadow-sm">
        {/* Artistic Japanese background watermark */}
        <div className="absolute right-6 -bottom-6 text-[130px] font-black text-on-surface/[0.035] select-none pointer-events-none font-serif tracking-widest">
          日本語
        </div>

        {/* Ambient glowing radial light */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Greeting & Stage Progress */}
          <div className="space-y-3.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Trình độ hiện tại: {levelDisplay}</span>
              </span>

              {hasCustomTarget && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
                  🎯 Mục tiêu: {user.targetLevel}
                </span>
              )}

              {isRefreshing && (
                <span className="text-[11px] text-outline flex items-center gap-1">
                  <RefreshCw size={11} className="animate-spin" /> Đang cập nhật...
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
              {getGreeting()}, <span className="text-primary">{user?.fullName || username || 'Học viên'}</span>!
            </h1>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Bạn đang ở bước <strong className="text-primary">{levelDisplay}</strong> (xây dựng nền tảng tiếng Nhật). Hãy hoàn thành các bài học nhập môn và luyện nghe mỗi ngày để tự tin bước vào cấp độ tiếp theo.
            </p>

            {/* 5-Step Beginner Roadmap */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                <span>Lộ trình làm chủ khóa học {levelDisplay}</span>
                <span className="text-primary font-black">{overallMastery}%</span>
              </div>

              {/* Progress track */}
              <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden p-0.5 border border-outline-variant/40">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-primary to-amber-500 transition-all duration-700 shadow-2xs"
                  style={{ width: `${overallMastery}%` }}
                />
              </div>

              {/* Milestone checkpoints */}
              <div className="grid grid-cols-5 text-center text-[10px] sm:text-[11px] font-semibold text-on-surface-variant pt-1 gap-1">
                <div className="text-primary font-bold">1. Chữ Cái 🈸</div>
                <div>2. Số Đếm 🔢</div>
                <div>3. Chào Hỏi 💬</div>
                <div>4. Bộ Thủ ✍️</div>
                <div>5. Lên N5 🏆</div>
              </div>
            </div>
          </div>

          {/* Right: Streak & Weekly Study Flame Hub */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-surface-container-lowest via-surface-container-lowest to-surface-container-low border border-outline-variant/70 shadow-md space-y-3.5 flex-shrink-0 min-w-[280px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shadow-xs">
                  <Flame size={26} className="fill-amber-500 text-amber-500 animate-flame" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Chuỗi Học Tập</h4>
                  <p className="text-2xl font-black text-amber-500 leading-none mt-0.5">
                    {displayStreak} <span className="text-xs font-semibold text-outline">Ngày</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 7-Day Consistency Tracker */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] text-outline">
                <span>Điểm danh 7 ngày qua:</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                  {isTodayStreakCompleted ? '✓ Đã xong 3/3 task hôm nay' : 'Xong 3 task/ngày'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-1.5">
                {daysOfWeek.map((d, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 py-1.5 rounded-xl text-center text-xs font-bold transition-all ${
                      d.active 
                        ? 'bg-amber-500 text-white shadow-xs' 
                        : 'bg-surface-container-high text-outline'
                    }`}
                  >
                    <span className="block text-[9px] opacity-80">{d.label}</span>
                    <span className="text-[10px]">{d.active ? '✓' : '·'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Time Info */}
            <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between text-xs">
              <span className="text-outline flex items-center gap-1">
                <Clock size={13} className="text-primary" /> Thời gian tuần:
              </span>
              <span className="font-bold text-on-surface">{stats.weeklyStudyMinutes} phút</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MA TRẬN 4 KỸ NĂNG CỐT LÕI (THIẾT KẾ CARD CAO CẤP & BẮT MẮT)           */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 size={20} className="text-primary" />
            <h2 className="text-lg md:text-xl font-extrabold text-on-surface tracking-tight">
              Bảng Chỉ Số 4 Kỹ Năng ({levelDisplay})
            </h2>
          </div>
          <span className="text-xs font-semibold text-outline">Tiến độ tích lũy thực tế</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Bảng Chữ Cái */}
          <div 
            onClick={() => navigateTo('beginner')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-surface-container-lowest to-surface-container-lowest border border-emerald-500/30 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer space-y-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-lg shadow-2xs border border-emerald-500/30">
                あ
              </div>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">100%</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-surface group-hover:text-emerald-600 transition-colors">
                Bảng Chữ Cái & Âm Đọc
              </h3>
              <p className="text-xs text-outline mt-0.5">50 chữ cái Hiragana & Katakana</p>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Card 2: Từ Vựng */}
          <div 
            onClick={() => navigateTo('vocabulary')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-primary/10 via-surface-container-lowest to-surface-container-lowest border border-primary/30 hover:border-primary hover:shadow-lg transition-all cursor-pointer space-y-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-primary/15 text-primary flex items-center justify-center font-bold shadow-2xs border border-primary/30">
                <Languages size={20} />
              </div>
              <span className="text-xs font-black text-primary">{vocabPct}%</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                Từ Vựng Căn Bản
              </h3>
              <p className="text-xs text-outline mt-0.5">{stats.vocabLearned} / {stats.vocabTotal} từ đã học</p>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${Math.max(6, vocabPct)}%` }} />
            </div>
          </div>

          {/* Card 3: Chữ Hán */}
          <div 
            onClick={() => navigateTo('kanji')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-surface-container-lowest to-surface-container-lowest border border-amber-500/30 hover:border-amber-500 hover:shadow-lg transition-all cursor-pointer space-y-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg shadow-2xs border border-amber-500/30">
                漢
              </div>
              <span className="text-xs font-black text-amber-600 dark:text-amber-400">{kanjiPct}%</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-surface group-hover:text-amber-600 transition-colors">
                Chữ Hán (Kanji)
              </h3>
              <p className="text-xs text-outline mt-0.5">{stats.kanjiLearned} / {stats.kanjiTotal} chữ đã học</p>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full rounded-full bg-amber-500 transition-all duration-500" style={{ width: `${Math.max(6, kanjiPct)}%` }} />
            </div>
          </div>

          {/* Card 4: Luyện Nghe Tình Huống */}
          <div 
            onClick={() => navigateTo('listening')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-sky-500/10 via-surface-container-lowest to-surface-container-lowest border border-sky-500/30 hover:border-sky-500 hover:shadow-lg transition-all cursor-pointer space-y-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold shadow-2xs border border-sky-500/30">
                <Headphones size={20} />
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-600 border border-sky-500/30">
                200 Bài
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-surface group-hover:text-sky-600 transition-colors">
                Luyện Nghe Tình Huống
              </h3>
              <p className="text-xs text-outline mt-0.5">200 kịch bản thực tế đời thường</p>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full rounded-full bg-sky-500 transition-all duration-500" style={{ width: '15%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE SECTION: NHIỆM VỤ HÀNG NGÀY & THẺ LUYỆN TRÍ NHỚ NHANH      */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 Cols): Nhiệm Vụ Hàng Ngày (Nhận Thưởng Coins & Chuông Báo) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/60 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
            <div className="flex items-center gap-2">
              <Trophy size={19} className="text-amber-500" />
              <h3 className="text-base font-bold text-on-surface">Nhiệm Vụ Hàng Ngày (Nhận Thưởng)</h3>
            </div>
            <span className="text-xs font-bold text-primary bg-primary/15 px-2.5 py-0.5 rounded-full">
              Thưởng Coins
            </span>
          </div>

          <div className="space-y-3">
            {quests.map((quest) => (
              <div
                key={quest.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  quest.claimed
                    ? 'bg-surface-container-low/50 border-outline-variant/30 opacity-80'
                    : quest.completed
                    ? 'bg-emerald-500/10 border-emerald-500/40 shadow-xs'
                    : 'bg-surface-container-low border-outline-variant/40 hover:border-primary/40'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    quest.claimed || quest.completed 
                      ? 'bg-emerald-500 text-white shadow-xs' 
                      : 'border-2 border-outline-variant text-outline'
                  }`}>
                    {quest.claimed || quest.completed ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <span className="text-xs font-bold">{quest.current}/{quest.max}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs sm:text-sm font-bold truncate ${
                      quest.claimed ? 'line-through text-outline' : 'text-on-surface'
                    }`}>
                      {quest.title}
                    </p>
                    <p className="text-[11px] font-semibold text-amber-500 mt-0.5">
                      Thưởng: <strong>{quest.reward}</strong>
                    </p>
                  </div>
                </div>

                {/* Quest Action / Claim Button */}
                <div className="flex-shrink-0">
                  {quest.claimed ? (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-500/15 px-3 py-1.5 rounded-xl inline-block">
                      Đã nhận
                    </span>
                  ) : quest.completed ? (
                    <button
                      onClick={() => claimReward(quest.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm animate-bounce cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles size={13} />
                      <span>Nhận thưởng</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        updateProgress(quest.id, 1);
                        navigateTo(quest.screen);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary hover:bg-primary/90 text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                    >
                      <span>{quest.actionLabel}</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (5 Cols): Interactive Memory Card Pod (Luyện Trí Nhớ Nhanh & Luyện Viết Nét) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/60 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
            <div className="flex items-center gap-2">
              <Star size={18} className="text-primary" />
              <h3 className="text-base font-bold text-on-surface">Luyện Trí Nhớ Nhanh</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {levelDisplay}
              </span>
            </div>

            {/* Hand Deal Next Card Button */}
            <button
              onClick={handleDealNextCard}
              disabled={isDealing}
              className="group text-xs font-bold text-primary hover:text-primary/80 transition-all cursor-pointer flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-xl"
            >
              <span className="text-sm">🎴</span>
              <span>Đổi thẻ khác</span>
              <RotateCw size={13} className={`transition-transform duration-500 ${isDealing ? 'rotate-180' : 'group-hover:rotate-45'}`} />
            </button>
          </div>

          {/* 3D Flip Card Container with Card Deal In Animation */}
          <div 
            style={{ perspective: '1200px' }}
            className={`w-full min-h-[260px] cursor-pointer select-none relative ${isDealing ? 'animate-deal-card' : ''}`}
            onClick={() => !isFlipped && setIsFlipped(true)}
          >
            <div 
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                minHeight: '260px',
                transition: 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)',
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front Face */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
                className="rounded-2xl bg-gradient-to-br from-primary/10 via-surface-container-low to-surface-container border-2 border-primary/30 flex flex-col items-center justify-center p-6 text-center shadow-md hover:border-primary/60 transition-colors"
              >
                <span className="text-7xl font-black text-primary font-serif tracking-wide drop-shadow-xs">
                  {activeCard.kanji}
                </span>

                <div className="mt-6">
                  <span className="text-xs font-bold text-primary bg-primary/15 border border-primary/30 px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs">
                    <Sparkles size={14} />
                    <span>Chạm để lật thẻ</span>
                  </span>
                </div>
              </div>

              {/* Back Face (Rich Details + Stroke Order Tab) */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
                className="rounded-2xl bg-gradient-to-br from-amber-500/15 via-surface-container-low to-surface-container border-2 border-amber-500/40 p-4 flex flex-col justify-between shadow-md overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header: Mode Tabs (Thông tin vs Cách viết nét) */}
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-primary font-serif">{activeCard.kanji}</span>
                    <div>
                      <p className="text-base font-black text-amber-600 dark:text-amber-400">
                        {activeCard.kana} <span className="text-xs font-medium text-outline">[{activeCard.romaji}]</span>
                      </p>
                      <p className="text-[11px] font-semibold text-outline">Âm Hán: {activeCard.hanViet}</p>
                    </div>
                  </div>

                  {/* Tab Switcher */}
                  <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30">
                    <button
                      onClick={() => setCardTab('info')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        cardTab === 'info' ? 'bg-primary text-white shadow-xs' : 'text-outline hover:text-on-surface'
                      }`}
                    >
                      <Info size={12} />
                      <span>Ý nghĩa</span>
                    </button>
                    <button
                      onClick={() => setCardTab('stroke')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        cardTab === 'stroke' ? 'bg-amber-600 text-white shadow-xs' : 'text-outline hover:text-on-surface'
                      }`}
                    >
                      <PenTool size={12} />
                      <span>Cách viết</span>
                    </button>
                  </div>
                </div>

                {/* Tab 1: Meaning & Example Sentence (Bigger Font + Audio) */}
                {cardTab === 'info' ? (
                  <div className="space-y-2 py-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-on-surface">
                        Nghĩa: <span className="text-primary font-black text-base">{activeCard.meaning}</span>
                      </p>
                      <button
                        onClick={(e) => speakJapanese(activeCard.kana, e)}
                        title="Phát âm từ vựng"
                        className="p-1.5 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-white transition-all cursor-pointer shadow-2xs"
                      >
                        <Volume2 size={15} />
                      </button>
                    </div>

                    {/* Example Box with Enhanced Font Size */}
                    <div className="p-2.5 rounded-xl bg-surface-container-lowest/90 border border-outline-variant/40 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-extrabold text-on-surface leading-snug tracking-wide">
                          {activeCard.exampleJp}
                        </p>
                        <button
                          onClick={(e) => speakJapanese(activeCard.exampleJp, e)}
                          title="Phát âm câu ví dụ"
                          className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors cursor-pointer flex-shrink-0"
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-outline italic">({activeCard.exampleRomaji})</p>
                      <p className="text-xs font-bold text-primary">➔ {activeCard.exampleVi}</p>
                    </div>
                  </div>
                ) : (
                  /* Tab 2: Interactive Stroke Writer with Replay Button */
                  <div className="py-1 flex items-center justify-between gap-3">
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                          <PenTool size={13} />
                          <span>Quy tắc: {activeCard.strokeCount} nét</span>
                        </div>
                        {/* Replay Stroke Animation Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setStrokeKey((k) => k + 1);
                          }}
                          className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-800 dark:text-amber-200 hover:text-white text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                          title="Xem lại từng nét viết"
                        >
                          <RotateCw size={11} />
                          <span>Xem lại</span>
                        </button>
                      </div>
                      <p className="text-xs text-on-surface-variant font-medium leading-relaxed bg-surface-container-lowest/90 p-2 rounded-xl border border-outline-variant/30">
                        {activeCard.strokeGuide}
                      </p>
                    </div>

                    <div className="w-24 h-24 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center p-1 shadow-inner flex-shrink-0">
                      <KanjiStrokeWriter key={strokeKey} character={activeCard.kanji} size={88} standalone={false} />
                    </div>
                  </div>
                )}

                {/* Footer: Flip back button */}
                <div className="text-center pt-1 border-t border-outline-variant/20">
                  <button
                    onClick={() => setIsFlipped(false)}
                    className="text-xs font-bold text-outline hover:text-primary transition-colors cursor-pointer py-0.5"
                  >
                    Chạm để lật lại mặt trước
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTo('flashcards')}
            className="w-full py-2.5 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary/90 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
          >
            <Play size={14} className="fill-current" />
            <span>Vào Kho Thẻ Flashcards ({stats.dueCardCount > 0 ? `${stats.dueCardCount} Thẻ Cần Ôn` : 'Ôn Tập Thêm'})</span>
          </button>
        </div>
      </section>
    </div>
  );
}
