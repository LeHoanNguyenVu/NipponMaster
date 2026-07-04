import { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronLeft, ChevronRight, Loader2, Play, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import axiosClient from '../api/axiosClient';
import KanjiStrokeWriter from '../components/KanjiStrokeWriter';
import gsap from 'gsap';

interface KanjiItem {
  id: number;
  character: string;
  onReading?: string;
  kunReading?: string;
  meaning: string;
  strokeCount: number;
  radical?: string;
  relatedWords?: string;
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

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

export default function Kanji() {
  const [kanjiList, setKanjiList] = useState<KanjiItem[]>([]);
  const [selectedKanji, setSelectedKanji] = useState<KanjiItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [strokeFilter, setStrokeFilter] = useState<'ALL' | '1-5' | '6-10' | 'gt10'>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(0);

  const detailPanelRef = useRef<HTMLDivElement>(null);

  // Fetch all N5 Kanjis
  const fetchKanjis = async () => {
    try {
      setLoading(true);
      // Fetch size=200 to get all N5 Kanji in one request for seamless search & filtering
      const response = await axiosClient.get('/kanjis/search', {
        params: {
          level: 'N5',
          size: 200,
        },
      });
      if (response.data?.content) {
        setKanjiList(response.data.content);
      }
    } catch (err) {
      console.error('Lỗi khi tải Kanji:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKanjis();
  }, []);

  // Slide-in / slide-out detail panel animations using GSAP
  useEffect(() => {
    if (selectedKanji && detailPanelRef.current) {
      gsap.fromTo(
        detailPanelRef.current,
        { x: '100%', opacity: 0.9 },
        { x: '0%', opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [selectedKanji]);

  const handleCloseDetail = () => {
    if (detailPanelRef.current) {
      gsap.to(detailPanelRef.current, {
        x: '100%',
        opacity: 0.9,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => setSelectedKanji(null),
      });
    } else {
      setSelectedKanji(null);
    }
  };

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, strokeFilter]);

  // Client-side search and filtering
  const filteredKanjis = kanjiList.filter((kanji) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      kanji.character.toLowerCase().includes(query) ||
      kanji.meaning.toLowerCase().includes(query) ||
      (kanji.onReading && kanji.onReading.toLowerCase().includes(query)) ||
      (kanji.kunReading && kanji.kunReading.toLowerCase().includes(query)) ||
      (kanji.radical && kanji.radical.toLowerCase().includes(query));

    let matchesStroke = true;
    if (strokeFilter === '1-5') {
      matchesStroke = kanji.strokeCount >= 1 && kanji.strokeCount <= 5;
    } else if (strokeFilter === '6-10') {
      matchesStroke = kanji.strokeCount >= 6 && kanji.strokeCount <= 10;
    } else if (strokeFilter === 'gt10') {
      matchesStroke = kanji.strokeCount > 10;
    }

    return matchesSearch && matchesStroke;
  });

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredKanjis.length / itemsPerPage);
  const paginatedKanjis = filteredKanjis.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="flex-1 flex overflow-hidden bg-surface-container-lowest relative">
      {/* Main Kanji Search & Grid View */}
      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar p-6 md:p-8">
        <div className="max-w-6xl mx-auto w-full space-y-6">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-on-surface tracking-tight">NipponMaster Kanji</h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Tra cứu chữ Hán N5 ({kanjiList.length} chữ), lọc theo số nét viết và xem thứ tự nét vẽ sinh động.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <Card className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between border-outline-variant/30">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-on-surface-variant" />
              <Input
                type="text"
                placeholder="Tìm Kanji, nghĩa Việt, âm On/Kun..."
                className="pl-9 bg-surface-container-low"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Stroke Count filter buttons */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button
                onClick={() => setStrokeFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  strokeFilter === 'ALL'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                Tất cả số nét
              </button>
              <button
                onClick={() => setStrokeFilter('1-5')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  strokeFilter === '1-5'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                1 - 5 nét
              </button>
              <button
                onClick={() => setStrokeFilter('6-10')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  strokeFilter === '6-10'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                6 - 10 nét
              </button>
              <button
                onClick={() => setStrokeFilter('gt10')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  strokeFilter === 'gt10'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                &gt; 10 nét
              </button>
            </div>
          </Card>

          {/* Grid view */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="animate-spin text-primary" size={40} />
              <span className="text-sm font-semibold text-on-surface-variant">Đang tải chữ Hán...</span>
            </div>
          ) : paginatedKanjis.length === 0 ? (
            <div className="text-center py-20 bg-surface-container-low rounded-2xl border border-outline-variant/30">
              <p className="text-base text-on-surface-variant font-medium">Không tìm thấy chữ Hán nào phù hợp.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-12">
              {paginatedKanjis.map((kanji, idx) => {
                const isSelected = selectedKanji?.id === kanji.id;
                
                // Alternate styles: gold outline accents for signature basic kanjis
                const goldAccentClass = idx % 4 === 0
                  ? 'border-[#e8c47a]/30 hover:border-[#e8c47a]/60 bg-gradient-to-br from-surface-container-lowest to-[#e8c47a]/3'
                  : 'border-outline-variant hover:border-primary/40';

                return (
                  <Card
                    key={kanji.id}
                    interactive
                    onClick={() => setSelectedKanji(kanji)}
                    className={`relative flex flex-col justify-between p-6 col-span-1 ${goldAccentClass} ${
                      isSelected ? 'border-2 border-primary scale-[1.01] shadow-md' : ''
                    }`}
                  >
                    <div>
                      {/* Badge and Stroke count */}
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="primary">{kanji.strokeCount} Nét</Badge>
                        {kanji.radical && <Badge variant="secondary">Bộ: {kanji.radical}</Badge>}
                        <Badge variant="crimson" className="ml-auto">{kanji.jlptLevel}</Badge>
                      </div>

                      {/* Character Display */}
                      <div className="flex items-end gap-4 mb-2">
                        <div className="text-5xl font-jp text-on-surface font-semibold">{kanji.character}</div>
                        <div className="mb-1 text-lg font-bold text-primary">{kanji.meaning.split('(')[0].trim()}</div>
                      </div>

                      {/* Meaning description */}
                      <div className="text-xs text-on-surface-variant font-medium mt-1 mb-4">
                        {kanji.meaning.includes('(') ? `(${kanji.meaning.split('(')[1]}` : ''}
                      </div>
                    </div>

                    {/* Onyomi / Kunyomi preview */}
                    <div className="pt-4 border-t border-outline-variant/30 space-y-1 mt-4 text-xs font-semibold">
                      <div className="text-on-surface-variant">
                        <span className="text-[10px] text-primary font-bold mr-1.5">ON:</span>
                        {kanji.onReading || '-'}
                      </div>
                      <div className="text-on-surface-variant">
                        <span className="text-[10px] text-teal-600 font-bold mr-1.5">KUN:</span>
                        {kanji.kunReading || '-'}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 py-8 border-t border-outline-variant/30">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
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
                onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
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

      {/* Right Side Detail Slide-out Panel */}
      {selectedKanji && (
        <div
          ref={detailPanelRef}
          className="absolute top-0 right-0 h-full w-full sm:w-[450px] bg-surface-container-low border-l border-outline-variant shadow-2xl flex flex-col z-30"
        >
          {/* Header Panel */}
          <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-container-low/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <BookOpen className="text-primary" size={20} />
              <h2 className="text-lg font-bold text-on-surface">Chi tiết chữ Hán</h2>
            </div>
            <button
              onClick={handleCloseDetail}
              className="p-1.5 hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Details Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
            
            {/* Core Kanji character display and basic info */}
            <div className="flex items-center gap-6">
              <div className="text-7xl font-jp font-bold text-on-surface select-none bg-surface-container-lowest w-24 h-24 rounded-2xl flex items-center justify-center shadow-sm border border-outline-variant/30">
                {selectedKanji.character}
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">{selectedKanji.meaning.split('(')[0].trim()}</div>
                <div className="text-sm text-on-surface-variant font-medium">
                  {selectedKanji.meaning.includes('(') ? selectedKanji.meaning : ''}
                </div>
                <div className="flex gap-1.5 mt-2">
                  <Badge variant="primary">{selectedKanji.strokeCount} nét</Badge>
                  <Badge variant="crimson">{selectedKanji.jlptLevel}</Badge>
                </div>
              </div>
            </div>

            {/* Stroke order animation section */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase text-on-surface-variant tracking-wider">Hoạt ảnh nét vẽ</h3>
              <KanjiStrokeWriter character={selectedKanji.character} />
            </div>

            {/* Onyomi / Kunyomi Details table */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase text-on-surface-variant tracking-wider">Cách đọc On / Kun</h3>
              <div className="border border-outline-variant/30 rounded-xl overflow-hidden bg-surface-container-lowest">
                <table className="w-full text-sm text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-outline-variant/20">
                      <td className="px-4 py-3 font-bold text-primary bg-primary/5 w-24">Âm ON (Katakana)</td>
                      <td className="px-4 py-3 font-jp text-on-surface font-medium">{selectedKanji.onReading || '-'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-teal-600 bg-teal-600/5">Âm KUN (Hiragana)</td>
                      <td className="px-4 py-3 font-jp text-on-surface font-medium">{selectedKanji.kunReading || '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Related Words section */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase text-on-surface-variant tracking-wider">Từ vựng liên quan</h3>
              <div className="space-y-2">
                {selectedKanji.relatedWords ? (
                  selectedKanji.relatedWords.split('、').map((word, index) => {
                    const parts = word.split(',');
                    const kanjiWord = parts[0]?.trim();
                    const meaningWord = parts[1]?.trim() || '';
                    return (
                      <div
                        key={index}
                        className="p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/20 hover:border-primary/20 transition-all flex items-center justify-between shadow-sm"
                      >
                        <span className="font-jp text-lg font-bold text-on-surface">{kanjiWord}</span>
                        {meaningWord && (
                          <span className="text-xs text-on-surface-variant font-semibold">{meaningWord}</span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-on-surface-variant italic">Không có dữ liệu từ vựng liên quan.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
