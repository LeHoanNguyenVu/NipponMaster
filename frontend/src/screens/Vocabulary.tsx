import { useState, useEffect, useRef } from 'react';
import { Search, PlusCircle, CheckCircle2, Volume2, BookOpen, X, ChevronLeft, ChevronRight, Loader2, Lock, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import axiosClient from '../api/axiosClient';
import { useAuthStore } from '../store/useAuthStore';
import KanjiStrokeWriter from '../components/KanjiStrokeWriter';
import gsap from 'gsap';

interface VocabularyItem {
  id: number;
  word: string;
  reading: string;
  meaning: string;
  exampleSentence?: string;
  exampleMeaning?: string;
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  wordType?: 'NOUN' | 'VERB' | 'I_ADJECTIVE' | 'NA_ADJECTIVE' | 'ADVERB' | 'PARTICLE' | 'CONJUNCTION' | 'COUNTER' | 'EXPRESSION';
  topic?: string;
}

const wordTypeOptions = [
  { value: 'ALL', label: 'Tất cả từ loại' },
  { value: 'NOUN', label: 'Danh từ' },
  { value: 'VERB', label: 'Động từ' },
  { value: 'I_ADJECTIVE', label: 'Tính từ đuôi -i' },
  { value: 'NA_ADJECTIVE', label: 'Tính từ đuôi -na' },
  { value: 'ADVERB', label: 'Trạng từ' },
];

const kanjiMeaningMap: Record<string, { meaning: string; onyomi: string; kunyomi?: string }> = {
  食: { meaning: 'Thực (ăn)', onyomi: 'ショク', kunyomi: 'た.べる' },
  飲: { meaning: 'Ẩm (uống)', onyomi: 'イン', kunyomi: 'の.む' },
  見: { meaning: 'Kiến (nhìn, xem)', onyomi: 'ケン', kunyomi: 'み.る' },
  聞: { meaning: 'Văn (nghe, hỏi)', onyomi: 'ブン、モン', kunyomi: 'き.く' },
  読: { meaning: 'Độc (đọc)', onyomi: 'ドク', kunyomi: 'よ.む' },
  書: { meaning: 'Thư (viết)', onyomi: 'ショ', kunyomi: 'か.く' },
  話: { meaning: 'Thoại (nói chuyện)', onyomi: 'ワ', kunyomi: 'はな.す' },
  買: { meaning: 'Mãi (mua)', onyomi: 'バイ', kunyomi: 'か.う' },
  学: { meaning: 'Học (học)', onyomi: 'ガク', kunyomi: 'まな.ぶ' },
  校: { meaning: 'Hiệu (trường học)', onyomi: 'コウ' },
  先: { meaning: 'Tiên (trước)', onyomi: 'セン', kunyomi: 'さき' },
  生: { meaning: 'Sinh (sống, sinh ra)', onyomi: 'セイ、ショウ', kunyomi: 'う.む、い.きる' },
  友: { meaning: 'Hữu (bạn bè)', onyomi: 'ユウ', kunyomi: 'とも' },
  達: { meaning: 'Đạt (đạt đến)', onyomi: 'タツ' },
  大: { meaning: 'Đại (to, lớn)', onyomi: 'ダイ、タイ', kunyomi: 'おお.きい' },
  小: { meaning: 'Tiểu (nhỏ, bé)', onyomi: 'ショウ', kunyomi: 'ちい.さい' },
  新: { meaning: 'Tân (mới)', onyomi: 'シン', kunyomi: 'あたら.しい' },
  古い: { meaning: 'Cổ (cũ)', onyomi: 'コ', kunyomi: 'ふる.い' },
  古: { meaning: 'Cổ (cũ)', onyomi: 'コ', kunyomi: 'ふる.i' },
  元: { meaning: 'Nguyên (khỏe mạnh)', onyomi: 'ゲン、ガン', kunyomi: 'moto' },
  気: { meaning: 'Khí (tinh thần)', onyomi: 'キ、ケ' },
  今: { meaning: 'Kim (bây giờ)', onyomi: 'コン、キン', kunyomi: 'いま' },
  日: { meaning: 'Nhật (ngày, mặt trời)', onyomi: 'ニチ、ジツ', kunyomi: 'ひ、か' },
  明: { meaning: 'Minh (sáng)', onyomi: 'メイ、ミョウ', kunyomi: 'あか.るい' },
  準: { meaning: 'Chuản (chuẩn bị)', onyomi: 'ジュン' },
  備: { meaning: 'Bị (trang bị)', onyomi: 'ビ', kunyomi: 'そな.える' },
  環: { meaning: 'Hoàn (vòng tròn, môi trường)', onyomi: 'カン' },
  境: { meaning: 'Cảnh (biên giới, ranh giới)', onyomi: 'キョウ', kunyomi: 'さかい' },
  複: { meaning: 'Phức (phức tạp, lặp lại)', onyomi: 'フク' },
  雑: { meaning: 'Tạp (hỗn tạp, pha trộn)', onyomi: 'ザツ、ゾウ' },
  比: { meaning: 'Bỉ (so sánh)', onyomi: 'ヒ', kunyomi: 'くら.べる' },
};

const getVisiblePages = (current: number, total: number) => {
  const current1 = current + 1;
  const pages: (number | string)[] = [];
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    
    if (current1 > 4) {
      pages.push('...');
    }
    
    const start = Math.max(2, current1 - 2);
    const end = Math.min(total - 1, current1 + 2);
    
    let adjustedStart = start;
    let adjustedEnd = end;
    if (current1 <= 4) {
      adjustedEnd = 5;
    }
    if (current1 >= total - 3) {
      adjustedStart = total - 4;
    }
    
    for (let i = adjustedStart; i <= adjustedEnd; i++) {
      if (i > 1 && i < total) {
        pages.push(i);
      }
    }
    
    if (current1 < total - 3) {
      pages.push('...');
    }
    
    pages.push(total);
  }
  
  return pages;
};

export default function Vocabulary() {
  const [vocabList, setVocabList] = useState<VocabularyItem[]>([]);
  const [selectedWord, setSelectedWord] = useState<VocabularyItem | null>(null);
  
  // Search & Filters
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('N5');
  const [selectedWordType, setSelectedWordType] = useState<string>('ALL');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [srsLoading, setSrsLoading] = useState<Record<number, boolean>>({});
  const [accessRestricted, setAccessRestricted] = useState(false);

  // SRS Connection Map: word -> flashcardId
  const [srsCardMap, setSrsCardMap] = useState<Record<string, number>>({});

  const { user } = useAuthStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const pageSize = 9; // asymmetric grid looks great with multiples of 3

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
      setCurrentPage(0); // Reset page on query change
    }, 300);
    return () => clearTimeout(timer);
  }, [searchKeyword]);

  // Load SRS cards mapping for current user
  const fetchSrsCards = async () => {
    if (!user?.id) return;
    try {
      const res = await axiosClient.get<any, any>(`/flashcards/user/${user.id}?size=1000`);
      if (res && res.success && res.data && res.data.content) {
        const mapping: Record<string, number> = {};
        res.data.content.forEach((card: any) => {
          mapping[card.front] = card.id;
        });
        setSrsCardMap(mapping);
      }
    } catch (error) {
      console.error('Error fetching SRS mapping:', error);
    }
  };

  useEffect(() => {
    fetchSrsCards();
  }, [user?.id]);

  // Load vocabularies
  const fetchVocabularies = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedKeyword) params.append('keyword', debouncedKeyword);
      if (selectedLevel) params.append('level', selectedLevel);
      if (selectedWordType && selectedWordType !== 'ALL') params.append('wordType', selectedWordType);
      params.append('page', currentPage.toString());
      params.append('size', pageSize.toString());

      const res = await axiosClient.get<any, any>(`/vocabularies/search?${params.toString()}`);
      let pageData = null;
      if (res && res.success && res.data) {
        if (res.data.page) {
          pageData = res.data.page;
          setAccessRestricted(!!res.data.accessRestricted);
        } else {
          pageData = res.data;
          setAccessRestricted(false);
        }
      }
      if (pageData) {
        setVocabList(pageData.content || []);
        setTotalPages(pageData.totalPages || 0);
        setTotalElements(pageData.totalElements || 0);
      } else {
        setVocabList([]);
        setTotalPages(0);
        setTotalElements(0);
      }
    } catch (error) {
      console.error('Error loading vocabularies:', error);
      setVocabList([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVocabularies();
  }, [debouncedKeyword, selectedLevel, selectedWordType, currentPage]);

  // GSAP stagger animations when vocabList loads
  useEffect(() => {
    if (vocabList.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.gsap-vocab-card',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [vocabList]);

  // Detail panel transition
  useEffect(() => {
    if (sidebarRef.current) {
      if (selectedWord) {
        gsap.fromTo(sidebarRef.current,
          { x: 380, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out', overwrite: 'auto' }
        );
      } else {
        gsap.to(sidebarRef.current,
          { x: 380, opacity: 0, duration: 0.3, ease: 'power3.in', overwrite: 'auto' }
        );
      }
    }
  }, [selectedWord]);

  // Handle adding/removing from SRS Deck
  const handleToggleSrs = async (word: VocabularyItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!user?.id) return;
    
    const isCurrentlyInSrs = !!srsCardMap[word.word];
    setSrsLoading(prev => ({ ...prev, [word.id]: true }));

    try {
      if (isCurrentlyInSrs) {
        // Remove from SRS
        const cardId = srsCardMap[word.word];
        const res = await axiosClient.delete<any, any>(`/flashcards/${cardId}`);
        if (res && res.success) {
          setSrsCardMap(prev => {
            const next = { ...prev };
            delete next[word.word];
            return next;
          });
        }
      } else {
        // Add to SRS
        const payload = {
          user: { id: user.id },
          front: word.word,
          back: word.meaning,
          reading: word.reading,
          cardType: 'VOCABULARY'
        };
        const res = await axiosClient.post<any, any>('/flashcards', payload);
        if (res && res.success && res.data) {
          setSrsCardMap(prev => ({
            ...prev,
            [word.word]: res.data.id
          }));
        }
      }
    } catch (error) {
      console.error('Error toggling SRS:', error);
    } finally {
      setSrsLoading(prev => ({ ...prev, [word.id]: false }));
    }
  };

  // Browser TTS speaker function
  const playAudio = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Helper to extract Kanji characters from a Japanese word
  const getKanjiBreakdown = (text: string) => {
    const kanjiRegex = /[\u4e00-\u9faf]/g;
    const matches = text.match(kanjiRegex);
    if (!matches) return [];
    
    // Remove duplicates
    const uniqueKanji = Array.from(new Set(matches));
    
    return uniqueKanji.map(char => {
      const details = kanjiMeaningMap[char] || { meaning: 'Chữ Hán bổ trợ', onyomi: '...' };
      return { char, ...details };
    });
  };

  const getWordTypeBadgeClass = (type?: string) => {
    switch (type) {
      case 'VERB': return 'primary';
      case 'NOUN': return 'outline';
      case 'I_ADJECTIVE':
      case 'NA_ADJECTIVE': return 'secondary';
      default: return 'outline';
    }
  };

  const getWordTypeLabel = (type?: string) => {
    if (!type) return 'Từ loại';
    const mapping: Record<string, string> = {
      NOUN: 'Danh từ',
      VERB: 'Động từ',
      I_ADJECTIVE: 'Tính từ -i',
      NA_ADJECTIVE: 'Tính từ -na',
      ADVERB: 'Trạng từ',
      PARTICLE: 'Trợ từ',
      CONJUNCTION: 'Liên từ',
      COUNTER: 'Từ chỉ lượng',
      EXPRESSION: 'Cụm từ',
    };
    return mapping[type] || type;
  };

  return (
    <div ref={containerRef} className="flex h-full relative overflow-hidden bg-surface">
      <div className={`flex-1 p-6 md:p-8 overflow-y-auto transition-all duration-300 ${selectedWord ? 'md:pr-[380px]' : ''}`}>
        <div className="max-w-[1280px] mx-auto">
          {/* Header & Controls */}
          <div className="mb-8 flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tight">NipponMaster Vocabulary</h1>
              <p className="text-lg text-on-surface-variant">
                Tra cứu từ vựng tiếng Nhật ({totalElements} từ), lọc theo cấp độ và thêm nhanh vào bộ thẻ SRS.
              </p>
            </div>
            
            {/* Filters panel */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant">
              {/* Search input */}
              <div className="w-full lg:w-80">
                <Input
                  icon={<Search size={18} />}
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Tìm Kanji, Hiragana hoặc nghĩa tiếng Việt..."
                />
              </div>

              {/* Word type segmented selectors */}
              <div className="flex flex-wrap items-center gap-1.5 bg-surface-container-low p-1 rounded-xl">
                {wordTypeOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSelectedWordType(opt.value);
                      setCurrentPage(0);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedWordType === opt.value
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* JLPT levels filter */}
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl">
                {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setSelectedLevel(lvl);
                      setCurrentPage(0);
                    }}
                    className={`w-10 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedLevel === lvl
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Access Restricted Banner */}
          {accessRestricted && (
            <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-tertiary/10 to-surface-container-high border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
                  <Lock size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface flex items-center gap-2">
                    Nội dung cấp độ {selectedLevel} bị giới hạn (Xem thử 5 từ vựng)
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Nâng cấp gói học để mở khóa toàn bộ từ vựng, ngữ pháp và tính năng ôn tập SRS cho level này.
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={<CreditCard size={16} />}
                onClick={() => {
                  window.location.hash = '#/pricing';
                  window.dispatchEvent(new HashChangeEvent('hashchange'));
                }}
              >
                Xem gói học
              </Button>
            </div>
          )}

          {/* Loading state */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3">
              <Loader2 className="animate-spin text-primary" size={32} />
              <span className="text-sm text-on-surface-variant font-medium">Đang tải dữ liệu...</span>
            </div>
          ) : vocabList.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center bg-surface-container-lowest rounded-3xl border border-outline-variant/60 shadow-sm max-w-xl mx-auto px-6">
              <BookOpen size={48} className="text-outline mb-4" />
              <h3 className="text-xl font-bold text-on-surface mb-2">Không tìm thấy từ vựng nào</h3>
              <p className="text-on-surface-variant text-sm mb-6 max-w-md">
                Thử thay đổi từ khóa tìm kiếm hoặc chọn lọc từ loại/JLPT khác để tìm từ vựng.
              </p>
              <Button variant="secondary" onClick={() => { setSearchKeyword(''); setSelectedWordType('ALL'); }}>
                Reset bộ lọc
              </Button>
            </div>
          ) : (
            /* Symmetric Card Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-12">
              {vocabList.map((word, index) => {
                const isSelected = selectedWord?.id === word.id;
                const isInSrs = !!srsCardMap[word.word];
                const isSrsButtonLoading = srsLoading[word.id];

                // Alternate styles: gold outline accents for N5 signature words
                const goldAccentClass = index % 3 === 0
                  ? 'border-[#e8c47a]/30 hover:border-[#e8c47a]/60 bg-gradient-to-br from-surface-container-lowest to-[#e8c47a]/3'
                  : 'border-outline-variant hover:border-primary/40';

                return (
                  <Card
                    key={word.id}
                    interactive
                    onClick={() => setSelectedWord(word)}
                    className={`gsap-vocab-card relative flex flex-col justify-between p-6 col-span-1 ${goldAccentClass} ${
                      isSelected ? 'border-2 border-primary scale-[1.01] shadow-md' : ''
                    }`}
                  >
                    {/* Add to SRS icon */}
                    <button
                      onClick={(e) => handleToggleSrs(word, e)}
                      disabled={isSrsButtonLoading}
                      className={`absolute top-4 right-4 p-1 rounded-full transition-all z-10 hover:bg-surface-container-low cursor-pointer ${
                        isInSrs ? 'text-primary' : 'text-outline hover:text-primary'
                      }`}
                    >
                      {isSrsButtonLoading ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : isInSrs ? (
                        <CheckCircle2 size={24} className="fill-current text-white bg-primary rounded-full" />
                      ) : (
                        <PlusCircle size={24} />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={getWordTypeBadgeClass(word.wordType)}>
                          {getWordTypeLabel(word.wordType)}
                        </Badge>
                        <Badge variant="crimson">{word.jlptLevel}</Badge>
                      </div>
                      
                      <div className="flex items-end gap-3 mb-1">
                        <div className="text-4xl md:text-5xl font-jp text-on-surface font-semibold">{word.word}</div>
                        <button
                          onClick={(e) => playAudio(word.word, e)}
                          className="mb-1 p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer"
                          title="Phát âm"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                      <div className="text-sm text-on-surface-variant font-medium tracking-wide mb-4">【{word.reading}】</div>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/30 mt-6">
                      <p className="text-base font-bold text-on-surface line-clamp-2">{word.meaning}</p>
                      {word.topic && (
                        <span className="text-[10px] text-primary font-bold uppercase tracking-wider mt-2 block">
                          Chủ đề: {word.topic.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 py-8 border-t border-outline-variant/30">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                icon={<ChevronLeft size={16} />}
              >
                Trước
              </Button>
              <div className="flex items-center gap-1.5">
                {getVisiblePages(currentPage, totalPages).map((p, idx) => {
                  if (p === '...') {
                    return (
                      <span key={`dots-${idx}`} className="px-2 text-sm text-on-surface-variant font-bold select-none">
                        ...
                      </span>
                    );
                  }
                  const pageIndex = (p as number) - 1;
                  return (
                    <button
                      key={pageIndex}
                      onClick={() => setCurrentPage(pageIndex)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currentPage === pageIndex
                          ? 'bg-primary text-on-primary shadow-sm scale-105'
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage === totalPages - 1}
                icon={<ChevronRight size={16} />}
                iconPosition="right"
              >
                Sau
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Slide-over Detail Panel */}
      <aside
        ref={sidebarRef}
        className={`fixed md:absolute top-0 right-0 h-full w-full sm:w-[360px] bg-surface-container-lowest border-l border-outline-variant shadow-2xl z-40 flex flex-col overflow-y-auto ${
          selectedWord ? 'pointer-events-auto' : 'pointer-events-none opacity-0 translate-x-full'
        }`}
      >
        {selectedWord && (
          <>
            <div className="sticky top-0 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant p-4 flex justify-between items-center z-10">
              <div className="flex items-center gap-2 text-primary">
                <BookOpen size={20} />
                <span className="text-sm font-bold text-on-surface uppercase tracking-wide">Chi Tiết Từ Vựng</span>
              </div>
              <button
                onClick={() => setSelectedWord(null)}
                className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6">
              {/* Word presentation */}
              <div className="text-center bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/40">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Badge variant={getWordTypeBadgeClass(selectedWord.wordType)}>
                    {getWordTypeLabel(selectedWord.wordType)}
                  </Badge>
                  <Badge variant="crimson">{selectedWord.jlptLevel}</Badge>
                </div>
                <h2 className="text-5xl font-jp font-bold text-on-surface leading-tight mb-2 flex items-center justify-center gap-2">
                  {selectedWord.word}
                </h2>
                <p className="text-lg text-on-surface-variant font-medium mb-1">【{selectedWord.reading}】</p>
                <p className="text-xl text-primary font-bold mt-2">{selectedWord.meaning}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant={srsCardMap[selectedWord.word] ? 'secondary' : 'primary'}
                  className="flex-1"
                  onClick={() => handleToggleSrs(selectedWord)}
                  disabled={srsLoading[selectedWord.id]}
                  icon={srsLoading[selectedWord.id] ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                >
                  {srsCardMap[selectedWord.word] ? 'Đã trong SRS Deck' : 'Thêm vào SRS Deck'}
                </Button>
                <Button
                  variant="secondary"
                  className="px-3"
                  onClick={() => playAudio(selectedWord.word)}
                >
                  <Volume2 size={20} />
                </Button>
              </div>

              <div className="h-px w-full bg-outline-variant/30"></div>

              {/* Stroke Order Animated Practice */}
              <div>
                <h3 className="text-xs text-on-surface-variant uppercase font-bold tracking-widest mb-3">
                  ✍️ Thứ Tự Nét Vẽ Từ Vựng (Stroke Order)
                </h3>
                <div className="flex flex-wrap justify-center gap-3 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/40">
                  {Array.from(selectedWord.word).map((char, cIdx) => (
                    <div key={cIdx} className="flex flex-col items-center gap-1">
                      <KanjiStrokeWriter character={char} size={150} />
                      <span className="text-[11px] font-bold text-on-surface-variant font-jp">{char}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kanji Breakdown */}
              {getKanjiBreakdown(selectedWord.word).length > 0 && (
                <div>
                  <h3 className="text-xs text-on-surface-variant uppercase font-bold tracking-widest mb-3">Phân tích chữ Hán</h3>
                  <div className="space-y-2.5">
                    {getKanjiBreakdown(selectedWord.word).map((k, idx) => (
                      <Card key={idx} padding="sm" className="flex gap-4 bg-surface border border-outline-variant/50 items-center">
                        <div className="text-3xl font-jp text-on-surface flex-shrink-0 w-10 text-center font-bold">{k.char}</div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-on-surface truncate">{k.meaning}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {k.onyomi && <Badge variant="secondary">On: {k.onyomi}</Badge>}
                            {k.kunyomi && <Badge variant="outline">Kun: {k.kunyomi}</Badge>}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Example sentence */}
              {selectedWord.exampleSentence && (
                <div>
                  <h3 className="text-xs text-on-surface-variant uppercase font-bold tracking-widest mb-3">Ví dụ minh họa</h3>
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/50">
                    <p className="text-lg text-on-surface mb-2 font-jp leading-relaxed font-medium">
                      {selectedWord.exampleSentence}
                    </p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {selectedWord.exampleMeaning}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
