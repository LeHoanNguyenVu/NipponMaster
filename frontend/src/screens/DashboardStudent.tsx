import { useEffect, useState, useMemo } from 'react';
import { 
  Flame, Clock, Trophy, Play,
  Languages, Headphones,
  CheckCircle2, ArrowRight,
  RefreshCw, BarChart3, Star, Sparkles,
  RotateCw, Volume2,
  PenTool, Info, SlidersHorizontal
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useDailyQuestsStore } from '../store/useDailyQuestsStore';
import KanjiStrokeWriter from '../components/KanjiStrokeWriter';
import axiosClient from '../api/axiosClient';
import { playBoostedJapaneseAudio } from '../utils/audioBoost';
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
  id?: number;
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
  imageUrl?: string;
  mnemonicHint?: string;
  mnemonicIcon?: string;
  mnemonicTitle?: string;
  jlptLevel?: string;
}

// Default Initial Cards used only while Supabase data is loading
const INITIAL_FALLBACK_CARDS: FlashcardItem[] = [
  {
    kanji: '木',
    kana: 'き',
    romaji: 'ki',
    hanViet: 'MỘC',
    meaning: 'Cây cối, gỗ',
    strokeCount: 4,
    strokeGuide: 'Nét ngang ➔ Nét sổ thẳng ➔ Nét phẩy trái ➔ Nét mác phải',
    exampleJp: '大きな木の下で休みます。',
    exampleRomaji: 'Ookina ki no shita de yasumimasu.',
    exampleVi: 'Nghỉ dưới gốc cây to.',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&auto=format&fit=crop&q=80',
    mnemonicTitle: 'Cây Cối & Gỗ (MỘC)',
    mnemonicHint: 'Thân cây thẳng đứng, cành lá tỏa hai bên và rễ cắm sâu vào lòng đất.',
    mnemonicIcon: '🌲',
    jlptLevel: 'STARTER',
  },
  {
    kanji: 'あ',
    kana: 'あ',
    romaji: 'a',
    hanViet: 'Hiragana A',
    meaning: 'Chữ cái A trong bảng chữ cái Hiragana',
    strokeCount: 3,
    strokeGuide: 'Nét ngang ➔ Nét sổ cong ➔ Nét vòng tròn xoắn ốc',
    exampleJp: 'ありがとう ございます。',
    exampleRomaji: 'Arigatou gozaimasu.',
    exampleVi: 'Cảm ơn bạn rất nhiều.',
    imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=400&auto=format&fit=crop&q=80',
    mnemonicTitle: 'Quả Táo Đỏ (Apple)',
    mnemonicHint: 'Nét xoắn tròn như thân quả táo đỏ, nét ngang trên đầu như cuống lá.',
    mnemonicIcon: '🍎',
    jlptLevel: 'STARTER',
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
    imageUrl: 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=400&auto=format&fit=crop&q=80',
    mnemonicTitle: 'Số Một (NHẤT)',
    mnemonicHint: 'Một ngón tay trỏ hoặc một nét ngang duy nhất vững chãi.',
    mnemonicIcon: '1️⃣',
    jlptLevel: 'STARTER',
  },
  {
    kanji: '本',
    kana: 'ほん',
    romaji: 'hon',
    hanViet: 'BẢN',
    meaning: 'Quyển sách, nguồn gốc',
    strokeCount: 5,
    strokeGuide: 'Bộ Mộc (木) thêm nét ngang ngắn ở chân',
    exampleJp: '毎日 日本語の本を 読みます。',
    exampleRomaji: 'Mainichi nihongo no hon o yomimasu.',
    exampleVi: 'Mỗi ngày tôi đều đọc sách tiếng Nhật.',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format&fit=crop&q=80',
    mnemonicTitle: 'Quyển Sách & Gốc Rễ (BẢN)',
    mnemonicHint: 'Cây cối (木) có thêm nét gạch ngang chỉ vào gốc rễ tạo nên sách vở.',
    mnemonicIcon: '📚',
    jlptLevel: 'STARTER',
  },
];

// Smart Mnemonic & Visual Registry for 100% reliable image association & mnemonic hints (All URLs 100% verified 200 OK)
const SMART_MNEMONIC_REGISTRY: Record<string, { imageUrl: string; mnemonicTitle: string; mnemonicHint: string; mnemonicIcon: string }> = {
  // ── Hiragana Seion (清音 - 46 chữ cái thuần) ──
  'あ': { imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Quả Táo (Apple)', mnemonicHint: 'Nét xoắn tròn như thân quả táo đỏ, nét ngang trên đầu như cuống lá táo.', mnemonicIcon: '🍎' },
  'い': { imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Hai Chú Chó (Inu)', mnemonicHint: 'Hai nét sổ song song như hai chú chó đang đứng cạnh nhau.', mnemonicIcon: '🐕' },
  'う': { imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Chú Thỏ (Usagi)', mnemonicHint: 'Nét chữ う cong cúp xuống như tai thỏ trắng dễ thương.', mnemonicIcon: '🐇' },
  'え': { imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Con Tôm (Ebi)', mnemonicHint: 'Nét chữ え trông như con tôm chiên tempura đang uốn mình.', mnemonicIcon: '🦐' },
  'お': { imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Cơm Nắm (Onigiri)', mnemonicHint: 'Nét vòng tròn của chữ お gợi nhớ chiếc cơm nắm tam giác Onigiri.', mnemonicIcon: '🍙' },
  'か': { imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Chiếc Ô (Kasa)', mnemonicHint: 'Nét trái như cán ô, nét phải như vải mở ra che mưa.', mnemonicIcon: '☂️' },
  'き': { imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Chìa Khóa (Key)', mnemonicHint: 'Các nét ngang và thân cắm thẳng y hệt răng cưa chiếc chìa khóa.', mnemonicIcon: '🗝️' },
  'く': { imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Đôi Giày (Kutsu)', mnemonicHint: 'Nét gập nhọn như mũi giày hướng về phía trước.', mnemonicIcon: '👟' },
  'け': { imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Kệ Gỗ (Keshigomu)', mnemonicHint: 'Cột trụ bên trái và thanh gỗ ngang như kệ gỗ chứa đồ.', mnemonicIcon: '🧹' },
  'こ': { imageUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Trẻ Em (Kodomo)', mnemonicHint: 'Hai nét uốn cong như hai em bé đang vui vẻ chơi đùa.', mnemonicIcon: '👦' },
  'さ': { imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Hoa Anh Đào (Sakura)', mnemonicHint: 'Nét uốn mềm mại như cành hoa sakura nghiêng mình trong gió.', mnemonicIcon: '🌸' },
  'し': { imageUrl: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Lưỡi Câu Cá', mnemonicHint: 'Đường cong dứt khoát uốn ngược lên như lưỡi câu cá dưới biển.', mnemonicIcon: '🎣' },
  'す': { imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Món Sushi (Sushi)', mnemonicHint: 'Nét thắt nút tròn như cuộn sushi truyền thống Nhật Bản.', mnemonicIcon: '🍣' },
  'せ': { imageUrl: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Thầy Cô (Sensei)', mnemonicHint: 'Cấu trúc như bục giảng và bàn học của người thầy.', mnemonicIcon: '👩‍🏫' },
  'そ': { imageUrl: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Bầu Trời (Sora)', mnemonicHint: 'Nét zic-zac uốn lượn như đường chim bay trên bầu trời.', mnemonicIcon: '🌤️' },
  'た': { imageUrl: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Quả Trứng (Tamago)', mnemonicHint: 'Chữ た lồng ghép nét tròn như quả trứng gà bổ dưỡng.', mnemonicIcon: '🥚' },
  'ち': { imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Bản Đồ (Chizu)', mnemonicHint: 'Nét cong bụng tròn như đường viền chỉ lối trên bản đồ.', mnemonicIcon: '🗺️' },
  'つ': { imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Sóng Biển (Tsunami)', mnemonicHint: 'Vòng cung tròn đơn độc như đỉnh sóng dâng trào.', mnemonicIcon: '🌊' },
  'て': { imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Bàn Tay & Bức Thư (Te)', mnemonicHint: 'Nét cong chữ C ngược như bàn tay xòe ra đón thư.', mnemonicIcon: '✉️' },
  'と': { imageUrl: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Đồng Hồ (Tokei)', mnemonicHint: 'Nét cong ôm như mặt đồng hồ kim chạy tích tắc.', mnemonicIcon: '🕐' },
  'な': { imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Mùa Hè (Natsu)', mnemonicHint: 'Các nét đan xen như ánh nắng rực rỡ của mùa hè.', mnemonicIcon: '☀️' },
  'に': { imageUrl: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Nhật Bản (Nihon)', mnemonicHint: 'Nét sổ và hai thanh ngang như cổng Torii truyền thống.', mnemonicIcon: '⛩️' },
  'ぬ': { imageUrl: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Sợi Mì (Noodle)', mnemonicHint: 'Nét thắt xoắn tròn như sợi mì ramen cuộn trong bát.', mnemonicIcon: '🍜' },
  'ね': { imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Chú Mèo (Neko)', mnemonicHint: 'Cột thẳng và đuôi xoắn tròn giống chú mèo đang ngủ cuộn đuôi.', mnemonicIcon: '🐱' },
  'の': { imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Rong Biển (Nori)', mnemonicHint: '1 nét xoắn ốc tròn đầy như cuộn rong biển khô bọc sushi.', mnemonicIcon: '🌿' },
  'は': { imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Bông Hoa (Hana)', mnemonicHint: 'Cột thẳng và cánh hoa nở bên phải như đóa hoa xuân.', mnemonicIcon: '🌷' },
  'ひ': { imageUrl: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Mỉm Cười (Hito)', mnemonicHint: 'Nét uốn cong đáy như khuôn mặt mỉm cười rạng rỡ.', mnemonicIcon: '😊' },
  'ふ': { imageUrl: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Núi Phú Sĩ (Fuji)', mnemonicHint: 'Đỉnh núi và các đám mây mờ ảo quanh núi Phú Sĩ.', mnemonicIcon: '🗻' },
  'へ': { imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Ngọn Đồi (Hill)', mnemonicHint: 'Mái dốc hình tam giác như sườn đồi thoai thoải.', mnemonicIcon: '⛰️' },
  'ほ': { imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Ngôi Sao (Hoshi)', mnemonicHint: 'Cột trụ và nét thắt như người ngước nhìn bầu trời sao.', mnemonicIcon: '⭐' },
  'ま': { imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Cửa Sổ (Mado)', mnemonicHint: 'Hai nét ngang như chấn song cửa sổ mở ra khu vườn.', mnemonicIcon: '🪟' },
  'み': { imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Dòng Nước (Mizu)', mnemonicHint: 'Nét uốn lượn như dòng nước suối mát lành.', mnemonicIcon: '💧' },
  'む': { imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Côn Trùng (Mushi)', mnemonicHint: 'Nét thắt nút và dấu chấm như chú bọ đang bò.', mnemonicIcon: '🐞' },
  'め': { imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Đôi Mắt (Me)', mnemonicHint: 'Vòng tròn bao quanh như tròng mắt sáng ngời.', mnemonicIcon: '👁️' },
  'も': { imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Khu Rừng (Mori)', mnemonicHint: 'Lưỡi câu với 2 nét ngang như cây cối trong rừng rậm.', mnemonicIcon: '🌳' },
  'や': { imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Ngọn Núi (Yama)', mnemonicHint: 'Nét móc sườn phẩy như ngọn núi cao vút.', mnemonicIcon: '🏔️' },
  'ゆ': { imageUrl: 'https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Suối Nước Nóng (Yu)', mnemonicHint: 'Làn khói bốc lên từ bể suối nước nóng Onsen mùa đông.', mnemonicIcon: '♨️' },
  'よ': { imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Ban Đêm (Yoru)', mnemonicHint: 'Cánh cửa mở vào đêm tối lung linh huyền ảo.', mnemonicIcon: '🌙' },
  'ら': { imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Sư Tử (Raion)', mnemonicHint: 'Cổ cong và bờm sư tử dũng mãnh.', mnemonicIcon: '🦁' },
  'り': { imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Quả Táo (Ringo)', mnemonicHint: 'Hai nét sổ mềm mại như quả táo đỏ chín mọng.', mnemonicIcon: '🍎' },
  'る': { imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Đá Quý (Ruby)', mnemonicHint: 'Đường cong dẫn tới viên ngọc quý xoắn ở đuôi.', mnemonicIcon: '💎' },
  'れ': { imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Nghỉ Ngơi (Resting)', mnemonicHint: 'Hình dáng người đang ngồi thiền tĩnh tâm thư thái.', mnemonicIcon: '🧘' },
  'ろ': { imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Con Đường (Road)', mnemonicHint: 'Đường lộ uốn khúc không có vòng thắt ở đuôi.', mnemonicIcon: '🛣️' },
  'わ': { imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Cá Sấu (Wani)', mnemonicHint: 'Nét tròn bên phải như miệng cá sấu há to.', mnemonicIcon: '🐊' },
  'を': { imageUrl: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Trợ Từ (WO)', mnemonicHint: 'Chữ đặc biệt chỉ làm trợ từ tân ngữ trong câu.', mnemonicIcon: '📌' },
  'ん': { imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Âm Cuối (N)', mnemonicHint: 'Âm mũi đứng cuối từ, nét uốn như chữ N la-tinh.', mnemonicIcon: '🔤' },

  // ── Hiragana Dakuon (濁音 - Âm Đục) ──
  'が': { imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Trường Học (Gakkou)', mnemonicHint: 'Chữ か thêm 2 vạch ten-ten → từ がっこう (gakkou) = Trường học.', mnemonicIcon: '🏫' },
  'ぎ': { imageUrl: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Ngân Hàng (Ginkou)', mnemonicHint: 'Chữ き thêm 2 vạch ten-ten → từ ぎんこう (ginkou) = Ngân hàng.', mnemonicIcon: '🏦' },
  'ぐ': { imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Sức Khỏe Tốt (Guai)', mnemonicHint: 'Chữ く thêm 2 vạch ten-ten → từ ぐあい (guai) = Tình trạng tốt.', mnemonicIcon: '👍' },
  'げ': { imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Khỏe Mạnh (Genki)', mnemonicHint: 'Chữ け thêm 2 vạch năng lượng ten-ten → từ げんき (genki) = Tràn đầy sức khỏe!', mnemonicIcon: '💪' },
  'ご': { imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Bát Cơm Trắng (Gohan)', mnemonicHint: 'Chữ こ thêm 2 vạch ten-ten → từ ごはん (gohan) = Bát cơm thơm dẻo.', mnemonicIcon: '🍚' },
  'ざ': { imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Tạp Chí (Zasshi)', mnemonicHint: 'Chữ さ thêm 2 vạch ten-ten → từ ざっし (zasshi) = Tạp chí.', mnemonicIcon: '📖' },
  'じ': { imageUrl: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Thời Gian (Jikan)', mnemonicHint: 'Chữ し thêm 2 vạch ten-ten → từ じかん (jikan) = Thời gian.', mnemonicIcon: '⏰' },
  'ず': { imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Bản Đồ (Chizu)', mnemonicHint: 'Chữ す thêm 2 vạch ten-ten → từ ちず (chizu) = Bản đồ.', mnemonicIcon: '🗺️' },
  'ぜ': { imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Toàn Bộ (Zenbu)', mnemonicHint: 'Chữ せ thêm 2 vạch ten-ten → từ ぜんぶ (zenbu) = Toàn bộ.', mnemonicIcon: '✨' },
  'ぞ': { imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Chú Voi (Zou)', mnemonicHint: 'Chữ そ thêm 2 vạch ten-ten → từ ぞう (zou) = Chú voi to lớn.', mnemonicIcon: '🐘' },
  'だ': { imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Đại Học (Daigaku)', mnemonicHint: 'Chữ た thêm 2 vạch ten-ten → từ だいがく (daigaku) = Trường đại học.', mnemonicIcon: '🎓' },
  'ぢ': { imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Âm Đục (Hanadi)', mnemonicHint: 'Chữ ち thêm 2 vạch ten-ten → âm đục trong từ ghép.', mnemonicIcon: '🩸' },
  'づ': { imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Tiếp Theo (Tsuduki)', mnemonicHint: 'Chữ つ thêm 2 vạch ten-ten → từ つづき (tsuduki) = Phần tiếp theo.', mnemonicIcon: '⏩' },
  'で': { imageUrl: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Tàu Điện (Densha)', mnemonicHint: 'Chữ て thêm 2 vạch ten-ten → từ でんしゃ (densha) = Tàu điện.', mnemonicIcon: '🚆' },
  'ど': { imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Cánh Cửa (Doa)', mnemonicHint: 'Chữ と thêm 2 vạch ten-ten → từ ドア (doa) = Cánh cửa.', mnemonicIcon: '🚪' },
  'ば': { imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Xe Buýt (Basu)', mnemonicHint: 'Chữ は thêm 2 vạch ten-ten → từ バス (basu) = Xe buýt.', mnemonicIcon: '🚌' },
  'び': { imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Bệnh Viện (Byouin)', mnemonicHint: 'Chữ ひ thêm 2 vạch ten-ten → từ びょういん (byouin) = Bệnh viện.', mnemonicIcon: '🏥' },
  'ぶ': { imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Ngữ Pháp (Bunpou)', mnemonicHint: 'Chữ ふ thêm 2 vạch ten-ten → từ ぶんぽう (bunpou) = Ngữ pháp.', mnemonicIcon: '📚' },
  'べ': { imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Học Tập (Benkyou)', mnemonicHint: 'Chữ へ thêm 2 vạch ten-ten → từ べんきょう (benkyou) = Học bài.', mnemonicIcon: '📝' },
  'ぼ': { imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Mũ Nón (Boushi)', mnemonicHint: 'Chữ ほ thêm 2 vạch ten-ten → từ ぼうし (boushi) = Mũ nón.', mnemonicIcon: '🧢' },

  // ── Hiragana Handakuon (半濁音 - Âm Bán Đục) ──
  'ぱ': { imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Bánh Mì (Pan)', mnemonicHint: 'Chữ は thêm vòng tròn nhỏ maru → từ パン (pan) = Bánh mì giòn.', mnemonicIcon: '🍞' },
  'ぴ': { imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Đàn Piano (Piano)', mnemonicHint: 'Chữ ひ thêm vòng tròn nhỏ maru → từ ピアノ (piano) = Đàn piano.', mnemonicIcon: '🎹' },
  'ぷ': { imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Hồ Bơi (Puuru)', mnemonicHint: 'Chữ ふ thêm vòng tròn nhỏ maru → từ プール (puuru) = Hồ bơi.', mnemonicIcon: '🏊' },
  'ぺ': { imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Bút Mực (Pen)', mnemonicHint: 'Chữ へ thêm vòng tròn nhỏ maru → từ ペン (pen) = Bút mực.', mnemonicIcon: '🖊️' },
  'ぽ': { imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Túi Áo (Poketto)', mnemonicHint: 'Chữ ほ thêm vòng tròn nhỏ maru → từ ポケット (poketto) = Túi áo.', mnemonicIcon: '🧥' },

  // ── Katakana Seion (46 Chữ Cái Katakana Thuần) ──
  'ア': { imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Kem Tươi (Aisu)', mnemonicHint: 'Katakana ア nét gập sắc như que kem ốc quế mát lạnh → từ アイス (aisu) = Kem tươi.', mnemonicIcon: '🍦' },
  'イ': { imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Chú Chó (Inu)', mnemonicHint: 'Katakana イ nét phẩy thẳng như chú chó đứng canh nhà → từ イヌ (inu) = Con chó.', mnemonicIcon: '🐕' },
  'ウ': { imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Trang Web (Website)', mnemonicHint: 'Katakana ウ nét bao tròn như màn hình duyệt web → từ ウェブサイト (webusaito) = Trang web.', mnemonicIcon: '🌐' },
  'エ': { imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Thang Máy (Elevator)', mnemonicHint: 'Katakana エ nét hình khung cửa thang máy mở ra → từ エレベーター (erebeetaa) = Thang máy.', mnemonicIcon: '🛗' },
  'オ': { imageUrl: 'https://images.unsplash.com/photo-1546768292-fb12f6c92568?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Quả Cam (Orange)', mnemonicHint: 'Katakana オ nét mở rộng như múi cam tươi mọng nước → từ オレンジ (orenji) = Quả cam.', mnemonicIcon: '🍊' },
  'カ': { imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Máy Ảnh (Camera)', mnemonicHint: 'Katakana カ nét gập mạnh mẽ như ống kính máy ảnh chụp hình → từ カメラ (kamera) = Máy ảnh.', mnemonicIcon: '📷' },
  'キ': { imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Nhà Bếp (Kitchen)', mnemonicHint: 'Katakana キ sắc sảo tựa kệ treo đồ nấu ăn trong bếp → từ キッチン (kicchin) = Nhà bếp.', mnemonicIcon: '🍳' },
  'ク': { imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Lớp Học (Class)', mnemonicHint: 'Katakana ク nét góc nhọn như góc bàn học trong lớp → từ クラス (kurasu) = Lớp học.', mnemonicIcon: '🏫' },
  'ケ': { imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Bánh Kem (Cake)', mnemonicHint: 'Katakana ケ như chiếc dao cắt bánh sinh nhật → từ ケーキ (keeki) = Bánh kem ngọt ngào.', mnemonicIcon: '🍰' },
  'コ': { imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Cà Phê (Coffee)', mnemonicHint: 'Katakana コ là chiếc cốc cà phê nhìn nghiêng → từ コーヒー (koohii) = Tách cà phê ấm áp.', mnemonicIcon: '☕' },
  'サ': { imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Món Salad (Salad)', mnemonicHint: 'Katakana サ như chiếc dĩa trộn rau củ quả → từ サラダ (sarada) = Đĩa salad tươi ngon.', mnemonicIcon: '🥗' },
  'シ': { imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Áo Sơ Mi (Shirt)', mnemonicHint: 'Katakana シ có các nét hất như cổ áo sơ mi cài khuy → từ シャツ (shatsu) = Áo sơ mi.', mnemonicIcon: '👔' },
  'ス': { imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Thể Thao (Sports)', mnemonicHint: 'Katakana ス nét xiên nhanh nhẹn như vận động viên chạy nước rút → từ スポーツ (supootsu) = Thể thao.', mnemonicIcon: '⚽' },
  'セ': { imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Áo Len (Sweater)', mnemonicHint: 'Katakana セ nét đan len ấm áp mùa đông → từ セーター (seetaa) = Áo len giữ ấm.', mnemonicIcon: '🧶' },
  'ソ': { imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Ghế Sofa (Sofa)', mnemonicHint: 'Katakana ソ nét tựa lưng êm ái như ghế đệm sofa → từ ソファ (sofa) = Ghế sofa phòng khách.', mnemonicIcon: '🛋️' },
  'タ': { imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Xe Taxi (Taxi)', mnemonicHint: 'Katakana タ nét vươn ra như biển báo taxi đón khách → từ タクシー (takushii) = Xe taxi.', mnemonicIcon: '🚕' },
  'チ': { imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Phô Mai (Cheese)', mnemonicHint: 'Katakana チ nét cắt chéo như miếng phô mai thơm ngậy → từ チーズ (chiizu) = Phô mai vàng béo.', mnemonicIcon: '🧀' },
  'ツ': { imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Chuyến Đi (Tour)', mnemonicHint: 'Katakana ツ 3 nét rủ xuống như đoàn người hào hứng đi tour → từ ツアー (tsuaa) = Chuyến du lịch.', mnemonicIcon: '🧳' },
  'テ': { imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Bài Thi (Test)', mnemonicHint: 'Katakana テ nét gạch chia ô như trang giấy thi trắc nghiệm → từ テスト (tesuto) = Bài kiểm tra.', mnemonicIcon: '📝' },
  'ト': { imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Cà Chua (Tomato)', mnemonicHint: 'Katakana ト nét nhánh cây nâng đỡ quả cà chua đỏ mọng → từ トマト (tomato) = Quả cà chua.', mnemonicIcon: '🍅' },
  'ナ': { imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Con Dao (Knife)', mnemonicHint: 'Katakana ナ nét cắt ngang sắc bén như lưỡi dao gọt hoa quả → từ ナイフ (naifu) = Con dao.', mnemonicIcon: '🔪' },
  'ニ': { imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Tin Tức (News)', mnemonicHint: 'Katakana ニ hai nét ngang như dòng tiêu đề bản tin thời sự → từ ニュース (nyuusu) = Tin tức.', mnemonicIcon: '📺' },
  'ヌ': { imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Thuyền Ca-nô (Canoe)', mnemonicHint: 'Katakana ヌ nét đan chéo như tay chèo thuyền ca-nô trên hồ → từ カヌー (kanuu) = Thuyền ca-nô.', mnemonicIcon: '🛶' },
  'ネ': { imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Cà Vạt (Necktie)', mnemonicHint: 'Katakana ネ nút thắt vuông vắn như chiếc cà vạt lịch lãm → từ ネクタイ (nekutai) = Chiếc cà vạt.', mnemonicIcon: '👔' },
  'ノ': { imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Sổ Ghi Chép (Notebook)', mnemonicHint: 'Katakana ノ 1 nét vuốt thanh mảnh như trang sổ mở ra → từ ノート (nooto) = Quyển vở ghi bài.', mnemonicIcon: '📓' },
  'ハ': { imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Hamburger', mnemonicHint: 'Katakana ハ 2 nét mở ra như 2 nửa bánh hamburger kẹp thịt → từ ハンバーガー (hanbaagaa) = Bánh kẹp.', mnemonicIcon: '🍔' },
  'ヒ': { imageUrl: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Máy Sưởi (Heater)', mnemonicHint: 'Katakana ヒ nét gập tỏa nhiệt như lò sưởi ấm áp → từ ヒーター (hiitaa) = Máy sưởi ấm mùa đông.', mnemonicIcon: '♨️' },
  'フ': { imageUrl: 'https://images.unsplash.com/photo-1584990347449-397397732a39?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Cái Nĩa (Fork)', mnemonicHint: 'Katakana フ nét cong nhọn như đầu chiếc nĩa ăn đồ Tây → từ フォーク (fooku) = Cái nĩa ăn uống.', mnemonicIcon: '🍴' },
  'ヘ': { imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Mũ Bảo Hiểm (Helmet)', mnemonicHint: 'Katakana ヘ vòm cong cứng cáp che chắn như mũ bảo hiểm → từ ヘルメット (herumetto) = Mũ bảo hiểm.', mnemonicIcon: '🪖' },
  'ホ': { imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Khách Sạn (Hotel)', mnemonicHint: 'Katakana ホ cột trụ sảnh lớn như tòa nhà khách sạn sang trọng → từ ホテル (hoteru) = Khách sạn nghỉ dưỡng.', mnemonicIcon: '🏨' },
  'マ': { imageUrl: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Khẩu Trang (Mask)', mnemonicHint: 'Katakana マ nét quai ôm gọn gàng như chiếc khẩu trang bảo vệ → từ マスク (masuku) = Khẩu trang.', mnemonicIcon: '😷' },
  'ミ': { imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Sữa Tươi (Milk)', mnemonicHint: 'Katakana ミ 3 nét song song như 3 dòng sữa tươi thanh khiết → từ ミルク (miruku) = Ly sữa tươi ngon.', mnemonicIcon: '🥛' },
  'ム': { imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Trò Chơi (Game)', mnemonicHint: 'Katakana ム nét góc tam giác như tay cầm chơi game → từ ゲーム (geemu) = Trò chơi điện tử.', mnemonicIcon: '🎮' },
  'メ': { imageUrl: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Email (Mail)', mnemonicHint: 'Katakana メ nét chéo niêm phong như phong bì thư điện tử → từ メール (meeru) = Thư điện tử.', mnemonicIcon: '✉️' },
  'モ': { imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Người Mẫu (Model)', mnemonicHint: 'Katakana モ dáng đứng thẳng thanh thoát như người mẫu thời trang → từ モデル (moderu) = Người mẫu.', mnemonicIcon: '👗' },
  'ヤ': { imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Áo Phông (Shirt)', mnemonicHint: 'Katakana ヤ nét vát nhẹ như tay áo phông trẻ trung năng động → từ シャツ (shatsu) = Áo thun.', mnemonicIcon: '👕' },
  'ユ': { imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Đồng Phục (Uniform)', mnemonicHint: 'Katakana ユ nét vuông vắn như bộ đồng phục thể thao chuẩn mực → từ ユニフォーム (yunifoomu) = Đồng phục.', mnemonicIcon: '🥋' },
  'ヨ': { imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Châu Âu (Europe)', mnemonicHint: 'Katakana ヨ 3 thanh ngang như các tầng tháp Eiffel châu Âu → từ ヨーロッパ (yooroppa) = Châu Âu.', mnemonicIcon: '🗼' },
  'ラ': { imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Đài Radio (Radio)', mnemonicHint: 'Katakana ラ nét ăng-ten phía trên bắt sóng đài phát thanh → từ ラジオ (rajio) = Đài radio cổ điển.', mnemonicIcon: '📻' },
  'リ': { imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Điều Khiển (Remote)', mnemonicHint: 'Katakana リ 2 nét đứng như các nút bấm trên điều khiển từ xa → từ リモコン (rimokon) = Điều khiển tivi.', mnemonicIcon: '📱' },
  'ル': { imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Quy Tắc (Rule)', mnemonicHint: 'Katakana ル 2 nét vạch ranh giới quy chuẩn cần tuân thủ → từ ルール (ruuru) = Quy tắc chung.', mnemonicIcon: '📜' },
  'レ': { imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Nhà Hàng (Restaurant)', mnemonicHint: 'Katakana レ nét móc thanh thoát như bảng thực đơn ẩm thực → từ レストラン (resutoran) = Nhà hàng sang trọng.', mnemonicIcon: '🍽️' },
  'ロ': { imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Người Máy (Robot)', mnemonicHint: 'Katakana ロ hình khối vuông vắn như đầu người máy thông minh → từ ロボット (robotto) = Robot.', mnemonicIcon: '🤖' },
  'ワ': { imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Rượu Vang (Wine)', mnemonicHint: 'Katakana ワ như chiếc ly đựng rượu vang đỏ sóng sánh → từ ワイン (wain) = Ly rượu vang đỏ.', mnemonicIcon: '🍷' },
  'ヲ': { imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Hoạt Hình (Anime)', mnemonicHint: 'Katakana ヲ nét uốn lượn phong cách hoạt họa sinh động → từ アニメ (anime) = Phim anime Nhật Bản.', mnemonicIcon: '🎬' },
  'ン': { imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Chung Cư (Mansion)', mnemonicHint: 'Katakana ン nét hất vươn cao như tòa chung cư hiện đại → từ マンション (manshon) = Khu căn hộ cao cấp.', mnemonicIcon: '🏢' },

  // ── Katakana Dakuon & Handakuon (10 Chữ Âm Đục & Bán Đục) ──
  'ガ': { imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Vườn Hoa (Garden)', mnemonicHint: 'Katakana ガ thêm ten-ten như hoa lá đâm chồi nở rộ → từ ガーデン (gaaden) = Khu vườn ngát hương.', mnemonicIcon: '🌻' },
  'ギ': { imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Đàn Guitar (Guitar)', mnemonicHint: 'Katakana ギ thêm ten-ten như dây đàn rung lên âm thanh sống động → từ ギター (gitaa) = Cây đàn ghi-ta.', mnemonicIcon: '🎸' },
  'グ': { imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Ly Thủy Tinh (Glass)', mnemonicHint: 'Katakana グ thêm ten-ten như giọt nước đọng trên ly thủy tinh → từ グラス (gurasu) = Chiếc ly pha lê.', mnemonicIcon: '🥂' },
  'ゲ': { imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Điện Tử (Game)', mnemonicHint: 'Katakana ゲ thêm ten-ten như phím bấm tay cầm điện tử → từ ゲーム (geemu) = Trò chơi game hấp dẫn.', mnemonicIcon: '🕹️' },
  'ゴ': { imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Đánh Golf (Golf)', mnemonicHint: 'Katakana ゴ thêm ten-ten như quả bóng lăn vào lỗ gôn trên cỏ xanh → từ ゴルフ (gorufu) = Môn đánh golf.', mnemonicIcon: '⛳' },
  'パ': { imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Hộ Chiếu (Passport)', mnemonicHint: 'Katakana パ thêm dấu tròn maru như con dấu thị thực xuất nhập cảnh → từ パスポート (pasupooto) = Hộ chiếu du lịch.', mnemonicIcon: '🛂' },
  'ピ': { imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Bánh Pizza (Pizza)', mnemonicHint: 'Katakana ピ thêm dấu tròn maru tròn trịa như chiếc bánh pizza phô mai → từ ピザ (piza) = Bánh pizza nóng hổi.', mnemonicIcon: '🍕' },
  'プ': { imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Hộp Quà (Present)', mnemonicHint: 'Katakana プ thêm dấu tròn maru như chiếc nơ hoa xinh xắn trên hộp quà → từ プレゼント (purezento) = Hộp quà tặng.', mnemonicIcon: '🎁' },
  'ペ': { imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Thú Cưng (Pet)', mnemonicHint: 'Katakana ペ thêm dấu tròn maru tròn xoe như đôi mắt chú cún cưng → từ ペット (petto) = Thú cưng đáng yêu.', mnemonicIcon: '🐶' },
  'ポ': { imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&auto=format&fit=crop&q=80', mnemonicTitle: 'Áp Phích (Poster)', mnemonicHint: 'Katakana ポ thêm dấu tròn maru như đinh ghim cố định tờ áp phích → từ ポスター (posutaa) = Tờ áp phích nghệ thuật.', mnemonicIcon: '🖼️' },

  // ── Core Numbers & Kanji & Vocabularies (Icon chuẩn xác 100% theo từ vựng) ──
  '一': { imageUrl: '', mnemonicTitle: 'Số 1 (NHẤT)', mnemonicHint: 'Một nét ngang phẳng lặng biểu thị số 1 (ichi).', mnemonicIcon: '1️⃣' },
  '二': { imageUrl: '', mnemonicTitle: 'Số 2 (NHỊ)', mnemonicHint: 'Hai thanh ngang song song biểu thị số 2 (ni).', mnemonicIcon: '2️⃣' },
  '三': { imageUrl: '', mnemonicTitle: 'Số 3 (TAM)', mnemonicHint: 'Ba nét ngang xếp chồng biểu thị số 3 (san).', mnemonicIcon: '3️⃣' },
  '四': { imageUrl: '', mnemonicTitle: 'Số 4 (TỨ)', mnemonicHint: 'Khung vuông chia bốn biểu thị số 4 (yon / shi).', mnemonicIcon: '4️⃣' },
  '五': { imageUrl: '', mnemonicTitle: 'Số 5 (NGŨ)', mnemonicHint: 'Nét chữ cân đối biểu thị số 5 (go).', mnemonicIcon: '5️⃣' },
  '六': { imageUrl: '', mnemonicTitle: 'Số 6 (LỤC)', mnemonicHint: 'Chữ Lục biểu thị con số 6 (roku).', mnemonicIcon: '6️⃣' },
  '七': { imageUrl: '', mnemonicTitle: 'Số 7 (THẤT)', mnemonicHint: 'Chữ Thất biểu thị con số 7 (nana / shichi).', mnemonicIcon: '7️⃣' },
  '八': { imageUrl: '', mnemonicTitle: 'Số 8 (BÁT)', mnemonicHint: 'Hai nét xòe rộng như sườn núi biểu thị số 8 (hachi).', mnemonicIcon: '8️⃣' },
  '九': { imageUrl: '', mnemonicTitle: 'Số 9 (CỬU)', mnemonicHint: 'Nét móc cong biểu thị con số 9 (kyuu / ku).', mnemonicIcon: '9️⃣' },
  '十': { imageUrl: '', mnemonicTitle: 'Số 10 (THẬP)', mnemonicHint: 'Dấu thập tròn trĩnh biểu thị con số 10 (juu).', mnemonicIcon: '🔟' },
  '百': { imageUrl: '', mnemonicTitle: 'Số 100 (BÁCH)', mnemonicHint: 'Chữ Bách biểu thị số 100 (hyaku).', mnemonicIcon: '💯' },
  '千': { imageUrl: '', mnemonicTitle: 'Số 1.000 (THIÊN)', mnemonicHint: 'Chữ Thiên biểu thị một ngàn (sen).', mnemonicIcon: '💵' },
  '万': { imageUrl: '', mnemonicTitle: 'Số 10.000 (VẠN)', mnemonicHint: 'Chữ Vạn biểu thị mười ngàn (man).', mnemonicIcon: '💴' },
  '円': { imageUrl: '', mnemonicTitle: 'Tiền Yên (VIÊN)', mnemonicHint: 'Đồng tiền Yên Nhật (en).', mnemonicIcon: '🪙' },
  '木': { imageUrl: '', mnemonicTitle: 'Cây Cối (MỘC)', mnemonicHint: 'Thân cây thẳng, cành lá tỏa hai bên (ki).', mnemonicIcon: '🌲' },
  '本': { imageUrl: '', mnemonicTitle: 'Sách Vở (BẢN)', mnemonicHint: 'Gốc rễ tri thức làm nên trang sách (hon).', mnemonicIcon: '📚' },
  '山': { imageUrl: '', mnemonicTitle: 'Ngọn Núi (SƠN)', mnemonicHint: 'Ba đỉnh núi nhô cao hùng vĩ giữa đất trời (yama).', mnemonicIcon: '🏔️' },
  '川': { imageUrl: '', mnemonicTitle: 'Dòng Sông (XUYÊN)', mnemonicHint: 'Ba dòng nước uốn lượn chảy xuôi ra biển (kawa).', mnemonicIcon: '🏞️' },
  '水': { imageUrl: '', mnemonicTitle: 'Nước Trong (THỦY)', mnemonicHint: 'Dòng nước suối trong lành mát lạnh (mizu).', mnemonicIcon: '💧' },
  '火': { imageUrl: '', mnemonicTitle: 'Ngọn Lửa (HỎA)', mnemonicHint: 'Ngọn lửa bốc cháy với tia lửa bập bùng (hi / ka).', mnemonicIcon: '🔥' },
  '日': { imageUrl: '', mnemonicTitle: 'Mặt Trời (NHẬT)', mnemonicHint: 'Mặt trời tỏa sáng rực rỡ, ngày mới (hi / nichi).', mnemonicIcon: '☀️' },
  '月': { imageUrl: '', mnemonicTitle: 'Mặt Trăng (NGUYỆT)', mnemonicHint: 'Vành trăng khuyết sáng lung linh trong đêm (tsuki).', mnemonicIcon: '🌙' },
  '人': { imageUrl: '', mnemonicTitle: 'Con Người (NHÂN)', mnemonicHint: 'Hai nét tựa vào nhau biểu thị con người (hito / jin).', mnemonicIcon: '🚶' },
  '猫': { imageUrl: '', mnemonicTitle: 'Con Mèo (MIÊU)', mnemonicHint: 'Chú mèo dễ thương (neko).', mnemonicIcon: '🐱' },
  '犬': { imageUrl: '', mnemonicTitle: 'Con Chó (KHUYỂN)', mnemonicHint: 'Chú chó Shiba trung thành (inu).', mnemonicIcon: '🐕' },
  '花': { imageUrl: '', mnemonicTitle: 'Bông Hoa (HOA)', mnemonicHint: 'Đóa hoa anh đào tươi thắm nở rộ (hana).', mnemonicIcon: '🌸' },
  '車': { imageUrl: '', mnemonicTitle: 'Xe Hơi (XA)', mnemonicHint: 'Chiếc xe hơi bốn bánh bon bon trên đường (kuruma).', mnemonicIcon: '🚗' },
  '雨': { imageUrl: '', mnemonicTitle: 'Cơn Mưa (VŨ)', mnemonicHint: 'Mái hiên và những giọt mưa rơi tí tách (ame).', mnemonicIcon: '🌧️' },
  '食べる': { imageUrl: '', mnemonicTitle: 'Ăn Cơm (Thực)', mnemonicHint: 'Dùng bữa cơm thơm ngon (taberu).', mnemonicIcon: '🍱' },
  '飲む': { imageUrl: '', mnemonicTitle: 'Uống Nước (Ẩm)', mnemonicHint: 'Uống một tách trà xanh ấm áp (nomu).', mnemonicIcon: '🍵' },
  '行く': { imageUrl: '', mnemonicTitle: 'Đi Lại (Hành)', mnemonicHint: 'Cất bước lên đường đi du lịch (iku).', mnemonicIcon: '🚶‍♂️' },
  '見る': { imageUrl: '', mnemonicTitle: 'Nhìn, Xem (Kiến)', mnemonicHint: 'Đôi mắt chăm chú ngắm nhìn thế giới (miru).', mnemonicIcon: '👀' },
  '友達': { imageUrl: '', mnemonicTitle: 'Bạn Bè (Hữu Đạt)', mnemonicHint: 'Những người bạn thân thiết cùng học tiếng Nhật (tomodachi).', mnemonicIcon: '🤝' },
  '学校': { imageUrl: '', mnemonicTitle: 'Trường Học (Học Hiệu)', mnemonicHint: 'Trường học nơi thầy cô và bạn bè gắn kết (gakkou).', mnemonicIcon: '🏫' },
  '先生': { imageUrl: '', mnemonicTitle: 'Thầy Cô (Tiên Sinh)', mnemonicHint: 'Thầy cô tận tâm hướng dẫn từng nét chữ (sensei).', mnemonicIcon: '👨‍🏫' },
  '今日': { imageUrl: '', mnemonicTitle: 'Hôm Nay (Kim Nhật)', mnemonicHint: 'Bắt đầu ngày hôm nay ngập tràn năng lượng (kyou).', mnemonicIcon: '📅' },
  'ペン': { imageUrl: '', mnemonicTitle: 'Bút Mực (Pen)', mnemonicHint: 'Cây bút mực nắn nót ghi bài (pen).', mnemonicIcon: '🖊️' },
  'パン': { imageUrl: '', mnemonicTitle: 'Bánh Mì (Pan)', mnemonicHint: 'Ổ bánh mì giòn tan nóng hổi (pan).', mnemonicIcon: '🍞' },
  '旅行': { imageUrl: '', mnemonicTitle: 'Du Lịch (Lữ Hành)', mnemonicHint: 'Xách vali lên và đi du lịch (ryokou).', mnemonicIcon: '✈️' },
  '学': { imageUrl: '', mnemonicTitle: 'Học Tập (HỌC)', mnemonicHint: 'Chăm chỉ học tập mở mang tri thức (gaku).', mnemonicIcon: '🎓' },
  '店': { imageUrl: '', mnemonicTitle: 'Cửa Tiệm (ĐIẾM)', mnemonicHint: 'Cửa hàng mua sắm tiện lợi (mise / ten).', mnemonicIcon: '🏪' },
};

// Từ điển chuẩn hóa cách đọc Kana & Romaji cho các chữ Hán và số đếm cơ bản
const STANDARD_KANJI_INFO: Record<string, { kana: string; romaji: string }> = {
  '一': { kana: 'いち', romaji: 'ichi' },
  '二': { kana: 'に', romaji: 'ni' },
  '三': { kana: 'さん', romaji: 'san' },
  '四': { kana: 'よん', romaji: 'yon' },
  '五': { kana: 'ご', romaji: 'go' },
  '六': { kana: 'ろく', romaji: 'roku' },
  '七': { kana: 'なな', romaji: 'nana' },
  '八': { kana: 'はち', romaji: 'hachi' },
  '九': { kana: 'きゅう', romaji: 'kyuu' },
  '十': { kana: 'じゅう', romaji: 'juu' },
  '百': { kana: 'ひゃく', romaji: 'hyaku' },
  '千': { kana: 'せん', romaji: 'sen' },
  '万': { kana: 'まん', romaji: 'man' },
  '円': { kana: 'えん', romaji: 'en' },
  '木': { kana: 'き', romaji: 'ki' },
  '本': { kana: 'ほん', romaji: 'hon' },
  '山': { kana: 'やま', romaji: 'yama' },
  '川': { kana: 'かわ', romaji: 'kawa' },
  '水': { kana: 'みず', romaji: 'mizu' },
  '火': { kana: 'ひ', romaji: 'hi' },
  '日': { kana: 'ひ', romaji: 'hi' },
  '月': { kana: 'つき', romaji: 'tsuki' },
  '人': { kana: 'ひと', romaji: 'hito' },
  '猫': { kana: 'ねこ', romaji: 'neko' },
  '犬': { kana: 'いぬ', romaji: 'inu' },
  '花': { kana: 'はな', romaji: 'hana' },
  '車': { kana: 'くるま', romaji: 'kuruma' },
  '雨': { kana: 'あめ', romaji: 'ame' },
  '食べる': { kana: 'たべる', romaji: 'taberu' },
  '飲む': { kana: 'のむ', romaji: 'nomu' },
  '行く': { kana: 'いく', romaji: 'iku' },
  '見る': { kana: 'みる', romaji: 'miru' },
  '友達': { kana: 'ともだち', romaji: 'tomodachi' },
  '学校': { kana: 'がっこう', romaji: 'gakkou' },
  '先生': { kana: 'せんせい', romaji: 'sensei' },
  '今日': { kana: 'きょう', romaji: 'kyou' },
};


// Resolve mnemonic info with Smart Registry fallback
const resolveMnemonicInfo = (card: FlashcardItem) => {
  const charKey = (card.kanji || card.kana || '').trim();
  const fallback = SMART_MNEMONIC_REGISTRY[charKey] || SMART_MNEMONIC_REGISTRY[card.kana] || SMART_MNEMONIC_REGISTRY[card.kanji];

  return {
    imageUrl: card.imageUrl || fallback?.imageUrl || null,
    mnemonicTitle: card.mnemonicTitle || fallback?.mnemonicTitle || (card.meaning ? card.meaning.split(',')[0].replace(/Chữ cái Hiragana |Chữ cái Katakana /g, '') : 'Minh họa'),
    mnemonicHint: card.mnemonicHint || fallback?.mnemonicHint || (card.exampleVi ? `Liên tưởng qua câu ví dụ: "${card.exampleVi}"` : null),
    mnemonicIcon: card.mnemonicIcon || fallback?.mnemonicIcon || '💡',
  };
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
  const [cards, setCards] = useState<FlashcardItem[]>(() => {
    try {
      const cached = localStorage.getItem('nippon_quick_cards_cache');
      if (cached) return JSON.parse(cached);
    } catch {}
    return INITIAL_FALLBACK_CARDS;
  });

  // Audio volume state (default 200% = +100% boost, range 50% - 250%)
  const [ttsVolume, setTtsVolume] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('nippon_tts_volume');
      if (saved) return Number(saved);
    } catch {}
    return 200;
  });
  const [showVolumePopup, setShowVolumePopup] = useState<boolean>(false);

  const handleVolumeChange = (newVol: number) => {
    setTtsVolume(newVol);
    try {
      localStorage.setItem('nippon_tts_volume', newVol.toString());
    } catch {}
  };

  // User's strict JLPT Level (STARTER, N5, N4, N3, N2, N1)
  const rawLevel = stats.jlptLevel || user?.jlptLevel || 'STARTER';
  const normalizedLevelKey = rawLevel.toUpperCase();

  // Fetch quick practice cards strictly from Supabase Database via API for this level
  useEffect(() => {
    let active = true;
    const fetchQuickPracticeCards = async () => {
      try {
        const res = await axiosClient.get('/flashcards/quick-practice', {
          params: { level: normalizedLevelKey, limit: 30 },
        });
        const data = res.data.data ?? res.data;
        if (active && Array.isArray(data) && data.length > 0) {
          setCards(data);
          try {
            localStorage.setItem('nippon_quick_cards_cache', JSON.stringify(data));
          } catch {}
        }
      } catch (err) {
        console.warn('Could not fetch quick practice cards from backend, using cache', err);
      }
    };

    fetchQuickPracticeCards();
    return () => {
      active = false;
    };
  }, [normalizedLevelKey]);

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

  // Pure Vietnamese level conversion
  const formatLevel = (lvl?: string) => {
    if (!lvl || lvl.toUpperCase() === 'STARTER') return 'Nhập Môn';
    return lvl.toUpperCase();
  };

  const levelDisplay = formatLevel(rawLevel);
  const hasCustomTarget = user?.targetLevel && user.targetLevel.toUpperCase() !== 'STARTER';

  // 10 Cards Daily Deck - strictly filtered for current JLPT level and capped at 10
  const daily10Cards = useMemo(() => {
    const rawDeck = cards.filter(c => !c.jlptLevel || c.jlptLevel.toUpperCase() === normalizedLevelKey);
    const sourceDeck = rawDeck.length > 0 ? rawDeck : (cards.length > 0 ? cards : INITIAL_FALLBACK_CARDS);
    
    // Deterministic daily shuffle based on today's date so deck is consistent throughout the day
    const todayStr = new Date().toISOString().slice(0, 10);
    const shuffled = [...sourceDeck].sort((a, b) => {
      const hashA = (a.kanji + todayStr).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const hashB = (b.kanji + todayStr).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return (hashA % 17) - (hashB % 17);
    });
    return shuffled.slice(0, 10);
  }, [cards, normalizedLevelKey]);

  const currentDeck = daily10Cards.length > 0 ? daily10Cards : INITIAL_FALLBACK_CARDS;
  const currentCardNumber = (cardIndex % currentDeck.length) + 1;
  const activeCard = currentDeck[cardIndex % currentDeck.length] || INITIAL_FALLBACK_CARDS[0];

  // Chuẩn hóa phát âm và cách đọc Kana & Romaji cho thẻ hiện tại
  const kanjiKey = (activeCard.kanji || '').trim();
  const kanaKey = (activeCard.kana || '').trim();
  const standardInfo = STANDARD_KANJI_INFO[kanjiKey] || STANDARD_KANJI_INFO[kanaKey];

  const displayKana = standardInfo?.kana || (activeCard.kana || activeCard.kanji || '').replace(/[・·•]/g, '').split(/[,/、]/)[0].trim();
  const displayRomaji = standardInfo?.romaji || activeCard.romaji || '';
  const playableWord = standardInfo?.kana || displayKana || activeCard.kanji || '';

  // Resolve mnemonic & visual info (Supabase API first, Smart Registry fallback)
  const mnemonicInfo = resolveMnemonicInfo(activeCard);
  const displayMnemonicHint = mnemonicInfo.mnemonicHint;
  const displayMnemonicTitle = mnemonicInfo.mnemonicTitle;
  const displayMnemonicIcon = mnemonicInfo.mnemonicIcon || '💡';

  // Card Deal: Cycle smoothly through the 10 daily cards
  const handleDealNextCard = () => {
    setIsFlipped(false);
    setCardTab('info');
    setIsDealing(true);
    setTimeout(() => {
      setCardIndex((prev) => (prev + 1) % currentDeck.length);
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

  // Percentage calculations
  const vocabPct = stats.vocabTotal > 0 ? Math.min(100, Math.round((stats.vocabLearned / stats.vocabTotal) * 100)) : 0;
  const kanjiPct = stats.kanjiTotal > 0 ? Math.min(100, Math.round((stats.kanjiLearned / stats.kanjiTotal) * 100)) : 0;
  const grammarPct = stats.grammarTotal > 0 ? Math.min(100, Math.round((stats.grammarLearned / stats.grammarTotal) * 100)) : 0;
  const overallMastery = Math.max(5, Math.round((vocabPct + kanjiPct + grammarPct) / 3));

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
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/60 space-y-3.5 shadow-xs flex flex-col justify-between relative">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30 relative">
            <div className="flex items-center gap-2 flex-wrap">
              <Star size={18} className="text-primary flex-shrink-0" />
              <h3 className="text-base font-bold text-on-surface">Luyện Trí Nhớ Nhanh</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {levelDisplay}
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                Thẻ {currentCardNumber}/{currentDeck.length} hôm nay
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Volume Slider Trigger Button */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVolumePopup(!showVolumePopup);
                  }}
                  title={`Âm lượng phát âm: ${ttsVolume}% (Nhấn để điều chỉnh)`}
                  className={`p-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    showVolumePopup
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'
                  }`}
                >
                  <Volume2 size={14} className={ttsVolume > 150 ? 'text-amber-500' : ''} />
                  <span className="text-[11px] font-bold hidden sm:inline">{ttsVolume}%</span>
                </button>

                {/* Volume Slider Popover */}
                {showVolumePopup && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-9 z-50 w-56 p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xl space-y-2.5 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                      <span className="flex items-center gap-1">
                        <SlidersHorizontal size={13} className="text-primary" />
                        Âm lượng loa
                      </span>
                      <span className="text-primary font-black">{ttsVolume}%</span>
                    </div>

                    <input
                      type="range"
                      min="50"
                      max="250"
                      step="10"
                      value={ttsVolume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                    />

                    {/* Quick Preset Buttons */}
                    <div className="grid grid-cols-4 gap-1 pt-1 border-t border-outline-variant/30">
                      {[100, 150, 200, 250].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => handleVolumeChange(preset)}
                          className={`py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            ttsVolume === preset
                              ? 'bg-primary text-white shadow-2xs'
                              : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                          }`}
                        >
                          {preset}%
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        playBoostedJapaneseAudio(playableWord, ttsVolume, e);
                      }}
                      className="w-full py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Volume2 size={13} />
                      <span>Thử âm lượng</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Hand Deal Next Card Button */}
              <button
                onClick={handleDealNextCard}
                disabled={isDealing}
                title="Chuyển sang thẻ tiếp theo trong 10 thẻ hôm nay"
                className="group text-xs font-bold text-primary hover:text-primary/80 transition-all cursor-pointer flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 px-2.5 sm:px-3 py-1.5 rounded-xl flex-shrink-0"
              >
                <span className="text-sm">🎴</span>
                <span className="hidden sm:inline">Đổi thẻ</span>
                <RotateCw size={13} className={`transition-transform duration-500 ${isDealing ? 'rotate-180' : 'group-hover:rotate-45'}`} />
              </button>
            </div>
          </div>

          {/* 10-Card Mini Segmented Progress Bar */}
          <div className="w-full flex items-center gap-1">
            {Array.from({ length: currentDeck.length }).map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  idx < currentCardNumber
                    ? 'bg-gradient-to-r from-primary to-amber-500 shadow-2xs'
                    : 'bg-surface-container-high'
                }`}
              />
            ))}
          </div>

          {/* 3D Flip Card Container with Card Deal In Animation */}
          <div 
            style={{ perspective: '1200px' }}
            className={`w-full min-h-[290px] cursor-pointer select-none relative ${isDealing ? 'animate-deal-card' : ''}`}
            onClick={() => !isFlipped && setIsFlipped(true)}
          >
            <div 
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                minHeight: '290px',
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
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl font-black text-primary font-serif">{activeCard.kanji}</span>
                    <div>
                      <p className="text-base font-black text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                        <span>{displayKana}</span>
                        {displayRomaji && displayRomaji.trim() !== '' && (
                          <span className="text-xs font-semibold text-outline">[{displayRomaji}]</span>
                        )}
                      </p>
                      {activeCard.hanViet && activeCard.hanViet.trim() !== '' && (
                        <p className="text-[11px] font-semibold text-outline">
                          Âm Hán: <span className="font-bold text-on-surface">{activeCard.hanViet}</span>
                        </p>
                      )}
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

                {/* Tab 1: Hybrid Visual Mnemonic Pod + Meaning & Example */}
                {cardTab === 'info' ? (
                  <div className="py-1 flex flex-col justify-between gap-2.5 flex-1">
                    {/* Top Row: Visual Illustration Pod + Meaning & Mnemonic Hook */}
                    <div className="flex items-start gap-3">
                      {/* Left: Themed Icon Mnemonic Pod */}
                      <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl border-2 border-amber-500/35 shadow-xs flex-shrink-0 bg-gradient-to-br from-amber-500/25 via-amber-500/10 to-orange-500/10 flex flex-col items-center justify-center p-1.5 text-center group transition-transform duration-300 hover:scale-105">
                        <span className="text-3xl sm:text-4xl filter drop-shadow-xs transition-transform duration-300 group-hover:scale-110 select-none">
                          {displayMnemonicIcon}
                        </span>
                        <span className="text-[10px] font-extrabold text-amber-800 dark:text-amber-200 mt-1 line-clamp-1 px-1.5 py-0.5 rounded-md bg-surface-container-lowest/80 border border-amber-500/20 shadow-2xs">
                          {displayMnemonicTitle || 'Minh họa'}
                        </span>
                      </div>

                      {/* Right Details: Meaning + Audio + Mnemonic Hint */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs sm:text-sm font-bold text-on-surface truncate">
                            Nghĩa: <span className="text-primary font-black text-sm sm:text-base">{activeCard.meaning}</span>
                          </p>
                          <button
                            onClick={(e) => playBoostedJapaneseAudio(playableWord, ttsVolume, e)}
                            title={`Phát âm từ vựng (Âm lượng ${ttsVolume}%)`}
                            className="p-1.5 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-white transition-all cursor-pointer shadow-2xs flex-shrink-0"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>

                        {/* Mnemonic Memory Hook */}
                        {displayMnemonicHint && (
                          <div className="p-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-1.5 shadow-2xs">
                            <span className="text-xs mt-0.5 flex-shrink-0">💡</span>
                            <p className="text-[11px] text-amber-900 dark:text-amber-200 leading-snug font-medium line-clamp-2">
                              <b className="font-bold text-amber-800 dark:text-amber-300">Mẹo nhớ: </b>
                              {displayMnemonicHint}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom: Example Sentence Box */}
                    {activeCard.exampleJp && activeCard.exampleJp.trim() !== '' ? (
                      <div className="p-2 sm:p-2.5 rounded-xl bg-surface-container-lowest/90 border border-outline-variant/40 space-y-0.5 shadow-2xs">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs sm:text-sm font-extrabold text-on-surface leading-snug tracking-wide truncate">
                            {activeCard.exampleJp}
                          </p>
                          <button
                            onClick={(e) => playBoostedJapaneseAudio(activeCard.exampleJp, ttsVolume, e)}
                            title={`Phát âm câu ví dụ (Âm lượng ${ttsVolume}%)`}
                            className="p-1 rounded-lg text-primary hover:bg-primary/10 transition-colors cursor-pointer flex-shrink-0"
                          >
                            <Volume2 size={13} />
                          </button>
                        </div>
                        {activeCard.exampleRomaji && activeCard.exampleRomaji.trim() !== '' && (
                          <p className="text-[10px] sm:text-xs text-outline italic truncate">({activeCard.exampleRomaji})</p>
                        )}
                        {activeCard.exampleVi && activeCard.exampleVi.trim() !== '' && (
                          <p className="text-[11px] sm:text-xs font-bold text-primary truncate">➔ {activeCard.exampleVi}</p>
                        )}
                      </div>
                    ) : (
                      <div className="p-2 rounded-xl bg-surface-container-lowest/70 border border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
                        <span>Nhấn loa 🔊 để nghe cách phát âm chính xác</span>
                        <button
                          onClick={(e) => playBoostedJapaneseAudio(activeCard.kanji, ttsVolume, e)}
                          className="text-primary font-bold hover:underline cursor-pointer"
                        >
                          Nghe ngay
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Tab 2: Interactive Stroke Writer with Replay & Multi-character Selector */
                  <div className="py-1 flex items-center justify-between gap-3">
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                          <PenTool size={13} />
                          <span>
                            Quy tắc: {activeCard.strokeCount > 0 ? `${activeCard.strokeCount} nét` : 'Nét bút thuận'}
                          </span>
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
                        {activeCard.strokeGuide && activeCard.strokeGuide.trim() !== ''
                          ? activeCard.strokeGuide
                          : 'Viết theo thứ tự từ trên xuống dưới, từ trái sang phải chuẩn nét bút tiếng Nhật.'}
                      </p>
                    </div>

                    <div className="w-28 h-28 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center p-1 shadow-inner flex-shrink-0">
                      <KanjiStrokeWriter key={strokeKey} character={activeCard.kanji} size={96} standalone={false} />
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
            className="w-full py-2.5 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary/90 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5 group"
          >
            <Play size={14} className="fill-current group-hover:translate-x-0.5 transition-transform" />
            <span>Vào Kho Thẻ Flashcards (Ôn Tập Thêm)</span>
          </button>
        </div>
      </section>
    </div>
  );
}
