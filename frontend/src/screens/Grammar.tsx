import { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronLeft, BookOpen, Calendar, ArrowLeft } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import axiosClient from '../api/axiosClient';
import gsap from 'gsap';

interface GrammarItem {
  id: number;
  pattern: string;
  structure: string;
  meaning: string;
  exampleSentence?: string;
  exampleMeaning?: string;
  notes?: string;
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

interface DayLesson {
  day: number;
  title: string;
  description: string;
  patternKeywords: string[]; // substrings to match grammar patterns
}

// Lesson plan per level
const LESSON_PLAN: Record<JlptLevel, DayLesson[]> = {
  N5: [
    { day: 1, title: 'Cấu trúc khẳng định & phủ định', description: 'Giới thiệu trợ từ chủ đề は và các cấu trúc cơ bản nhất.', patternKeywords: ['は～です', 'じゃないです', 'ですか'] },
    { day: 2, title: 'Trợ từ chỉ hành động', description: 'Cách dùng を, に, で để nói về hành động và địa điểm.', patternKeywords: ['を～ます', 'に行きます', 'で～ます'] },
    { day: 3, title: 'Sự tồn tại & Mong muốn', description: 'Diễn đạt có/không có và điều mình muốn làm.', patternKeywords: ['います', 'あります', 'たいです'] },
    { day: 4, title: 'Yêu cầu lịch sự & Cấm đoán', description: 'Nhờ người khác làm hoặc không làm gì đó một cách lịch sự.', patternKeywords: ['てください', 'ないでください'] },
  ],
  N4: [
    { day: 1, title: 'Thể て (Te-form nâng cao)', description: 'Kết nối các hành động, trạng thái liên tiếp.', patternKeywords: ['てから', 'ている', 'てしまう'] },
    { day: 2, title: 'Điều kiện & Giả định', description: 'Các cấu trúc điều kiện trong tiếng Nhật.', patternKeywords: ['たら', 'ば', 'なら'] },
    { day: 3, title: 'Khả năng & Cho phép', description: 'Diễn đạt khả năng và sự cho phép.', patternKeywords: ['られる', 'せる', 'させる'] },
  ],
  N3: [
    { day: 1, title: 'Diễn đạt phức tạp', description: 'Cấu trúc ngữ pháp nâng cao cho giao tiếp tự nhiên.', patternKeywords: ['ように', 'ために', 'そうだ'] },
    { day: 2, title: 'Thể bị động & Sai khiến', description: 'Câu bị động và câu sai khiến.', patternKeywords: ['られる', 'させられる'] },
  ],
  N2: [
    { day: 1, title: 'Ngữ pháp học thuật N2', description: 'Các mẫu câu thường gặp trong văn viết và thi cử.', patternKeywords: ['に対して', 'として', 'による'] },
  ],
  N1: [
    { day: 1, title: 'Ngữ pháp cao cấp N1', description: 'Các cấu trúc tinh tế và phức tạp nhất trong tiếng Nhật.', patternKeywords: ['にあたって', 'をもって', 'ならではの'] },
  ],
};

const JLPT_LEVELS: JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

const DAY_COLOR_MAP: Record<number, { bg: string; border: string; accent: string; badge: string }> = {
  1: { bg: 'from-red-50 to-orange-50/30', border: 'border-red-100 hover:border-red-300', accent: 'bg-red-500', badge: 'bg-red-100 text-red-700' },
  2: { bg: 'from-blue-50 to-indigo-50/30', border: 'border-blue-100 hover:border-blue-300', accent: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700' },
  3: { bg: 'from-emerald-50 to-teal-50/30', border: 'border-emerald-100 hover:border-emerald-300', accent: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-700' },
  4: { bg: 'from-amber-50 to-yellow-50/30', border: 'border-amber-100 hover:border-amber-300', accent: 'bg-amber-500', badge: 'bg-amber-100 text-amber-700' },
};

const getDayColors = (day: number) => DAY_COLOR_MAP[day] ?? DAY_COLOR_MAP[1];

export default function Grammar() {
  const [allGrammars, setAllGrammars] = useState<GrammarItem[]>([]);
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<JlptLevel>('N5');
  const [selectedDay, setSelectedDay] = useState<DayLesson | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const detailPanelRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Fetch grammars for level when a day is selected
  const fetchGrammars = async (level: JlptLevel) => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/grammars/search', { params: { level, size: 200 } });
      setAllGrammars(res.data?.content ?? []);
    } catch {
      setAllGrammars([]);
    } finally {
      setLoading(false);
    }
  };

  // When level changes, reset to day-selection view
  useEffect(() => {
    setSelectedDay(null);
    setSelectedGrammar(null);
    setAllGrammars([]);
    setSearchQuery('');
  }, [selectedLevel]);

  // When a day is selected, fetch
  useEffect(() => {
    if (selectedDay) {
      fetchGrammars(selectedLevel);
      // animate main content
      if (mainRef.current) {
        gsap.fromTo(mainRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
      }
    }
  }, [selectedDay]);

  // GSAP slide-in panel
  useEffect(() => {
    if (selectedGrammar && detailPanelRef.current) {
      gsap.fromTo(detailPanelRef.current, { x: '100%' }, { x: '0%', duration: 0.35, ease: 'power3.out' });
    }
  }, [selectedGrammar]);

  const handleCloseDetail = () => {
    if (detailPanelRef.current) {
      gsap.to(detailPanelRef.current, { x: '100%', duration: 0.25, ease: 'power3.in', onComplete: () => setSelectedGrammar(null) });
    } else {
      setSelectedGrammar(null);
    }
  };

  const handleSelectDay = (day: DayLesson) => {
    setSelectedDay(day);
    setSelectedGrammar(null);
    setSearchQuery('');
  };

  const handleBackToDays = () => {
    if (selectedGrammar) {
      handleCloseDetail();
      setTimeout(() => setSelectedDay(null), 300);
    } else {
      setSelectedDay(null);
    }
  };

  // Filter grammars for selected day
  const dayGrammars = selectedDay
    ? allGrammars.filter((g) =>
        selectedDay.patternKeywords.some((kw) => g.pattern.includes(kw) || g.pattern.toLowerCase().includes(kw.toLowerCase()))
      )
    : [];

  const filteredGrammars = dayGrammars.filter((g) => {
    const q = searchQuery.toLowerCase().trim();
    return !q || g.pattern.toLowerCase().includes(q) || g.meaning.toLowerCase().includes(q) || g.structure.toLowerCase().includes(q);
  });

  const lessons = LESSON_PLAN[selectedLevel] ?? [];

  return (
    <div className="flex h-full overflow-hidden relative">
      {/* Scrollable main content */}
      <div ref={mainRef} className="flex-1 overflow-y-auto p-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            NipponMaster Grammar Handbook
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Chọn trình độ và ngày học để khám phá các cấu trúc ngữ pháp tương ứng.
          </p>
        </div>

        {/* Level Tabs */}
        <div className="flex items-center gap-2 mb-7 flex-wrap">
          {JLPT_LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-primary/40 hover:text-primary'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* ── VIEW A: Day selection grid ── */}
        {!selectedDay && (
          <>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Lộ trình học {selectedLevel} — Chọn ngày để bắt đầu
            </p>
            {lessons.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[260px] bg-white rounded-2xl border border-dashed border-gray-200 p-10">
                <p className="text-gray-400 font-medium text-base">Chưa có lộ trình cho trình độ {selectedLevel}.</p>
                <p className="text-gray-300 text-sm mt-1">Nội dung sẽ được cập nhật sớm.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {lessons.map((lesson) => {
                  const colors = getDayColors(lesson.day);
                  return (
                    <button
                      key={lesson.day}
                      onClick={() => handleSelectDay(lesson)}
                      className={`text-left bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colors.badge}`}>
                          Ngày {lesson.day}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          {lesson.patternKeywords.length}+ cấu trúc
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{lesson.description}</p>
                      <div className={`mt-4 h-1 w-8 ${colors.accent} rounded-full group-hover:w-16 transition-all duration-300`} />
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ── VIEW B: Grammar list for selected day ── */}
        {selectedDay && (
          <>
            {/* Back + Day title */}
            <div className="flex items-center gap-3 mb-5">
              <button
                onClick={handleBackToDays}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-primary transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </button>
              <span className="text-gray-300">/</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-gray-700">Ngày {selectedDay.day}: {selectedDay.title}</span>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-6 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm trong ngày này..."
                className="pl-10 pr-4 py-2.5 bg-white border-gray-200 focus:border-primary text-sm"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Grammar cards */}
            {loading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredGrammars.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[200px] bg-white rounded-2xl border border-dashed border-gray-200 p-8">
                <p className="text-gray-400 font-medium">
                  {dayGrammars.length === 0
                    ? 'Chưa có dữ liệu cho ngày này.'
                    : 'Không tìm thấy mẫu ngữ pháp phù hợp.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
                {filteredGrammars.map((grammar) => (
                  <div
                    key={grammar.id}
                    onClick={() => setSelectedGrammar(grammar)}
                    className="bg-white border border-gray-100 hover:border-primary/25 hover:shadow-lg rounded-2xl p-6 cursor-pointer transition-all duration-200 group relative overflow-hidden flex flex-col justify-between"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/15 group-hover:bg-primary transition-colors duration-300 rounded-l-2xl" />
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-primary/70 bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                          Ngữ pháp
                        </span>
                        <Badge className="bg-primary text-white border-none text-xs font-semibold px-2 py-0.5">
                          {grammar.jlptLevel}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {grammar.pattern}
                      </h3>
                      <div className="bg-gray-50 rounded-xl p-3 mb-3 border border-gray-100 group-hover:bg-primary/5 transition-colors">
                        <p className="text-sm font-semibold text-gray-700 font-mono">{grammar.structure}</p>
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{grammar.meaning}</p>
                    </div>
                    {grammar.exampleSentence && (
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-700 line-clamp-1 font-mono">{grammar.exampleSentence}</p>
                        <p className="text-xs text-gray-400 line-clamp-1 italic mt-0.5">{grammar.exampleMeaning}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Slide-over Detail Panel */}
      {selectedGrammar && (
        <>
          <div onClick={handleCloseDetail} className="absolute inset-0 bg-black/30 backdrop-blur-sm z-20" />
          <div
            ref={detailPanelRef}
            className="absolute top-0 right-0 h-full w-full max-w-[460px] bg-white shadow-2xl flex flex-col z-30 border-l border-gray-100"
            style={{ transform: 'translateX(100%)' }}
          >
            <div className="shrink-0 bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Chi tiết cấu trúc
              </h2>
              <button onClick={handleCloseDetail} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="bg-gradient-to-br from-primary/8 to-transparent rounded-2xl p-6 border border-primary/12 relative">
                <Badge className="bg-primary text-white border-none text-xs absolute right-5 top-5">
                  {selectedGrammar.jlptLevel}
                </Badge>
                <h3 className="text-2xl font-extrabold text-primary mb-2 pr-14">{selectedGrammar.pattern}</h3>
                <p className="text-gray-700 font-medium leading-relaxed">{selectedGrammar.meaning}</p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Cấu trúc câu</h4>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <p className="text-base font-bold text-gray-800 font-mono leading-relaxed">{selectedGrammar.structure}</p>
                </div>
              </div>

              {selectedGrammar.notes && (
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Giải thích & Cách dùng</h4>
                  <div className="bg-red-50/30 border border-primary/10 rounded-xl p-4">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{selectedGrammar.notes}</p>
                  </div>
                </div>
              )}

              {selectedGrammar.exampleSentence && (
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Ví dụ minh họa</h4>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                    <div className="border-l-4 border-primary pl-4">
                      <p className="text-base font-bold text-gray-900 font-mono mb-1.5 leading-relaxed">{selectedGrammar.exampleSentence}</p>
                      <p className="text-sm text-gray-500 italic leading-relaxed">{selectedGrammar.exampleMeaning}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
