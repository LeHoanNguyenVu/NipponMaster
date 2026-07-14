import { useEffect, useRef, useState } from 'react';
import { Zap, Flame, Languages, Shapes, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import axiosClient from '../api/axiosClient';
import gsap from 'gsap';

const LayersIcon = ({ className, size }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 12 12 17 22 12" />
    <polyline points="2 17 12 22 22 17" />
  </svg>
);

interface Stats {
  vocabLearned: number;
  vocabTotal: number;
  kanjiLearned: number;
  kanjiTotal: number;
  grammarLearned: number;
  grammarTotal: number;
  dueCardCount: number;
  streakDays: number;
  dueCards: any[];
}

export default function DashboardStudent({ onStartStudy, username }: { onStartStudy: () => void, username?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    const fetchStats = async () => {
      try {
        const res = await axiosClient.get('/dashboard/stats');
        const data = res.data.data ?? res.data;
        if (active) {
          setStats(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchStats();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!loading && containerRef.current) {
      const ctx = gsap.context(() => {
        // Staggered entry animation
        gsap.fromTo('.gsap-fade-in',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out'
          }
        );

        // Micro-interactions on cards
        const cards = containerRef.current?.querySelectorAll('.gsap-hover-card');
        cards?.forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -6, scale: 1.01, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
          });
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="max-w-[1280px] mx-auto p-6 md:p-8 space-y-8 animate-pulse">
        <div className="h-10 bg-surface-container-high w-1/3 rounded-lg"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="col-span-1 lg:col-span-8 h-48 bg-surface-container-high rounded-2xl"></div>
          <div className="col-span-1 lg:col-span-4 h-48 bg-surface-container-high rounded-2xl"></div>
          <div className="col-span-1 lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-surface-container-high rounded-2xl"></div>
            <div className="h-32 bg-surface-container-high rounded-2xl"></div>
            <div className="h-32 bg-surface-container-high rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate percentages
  const vocabPct = stats && stats.vocabTotal > 0 ? Math.round((stats.vocabLearned / stats.vocabTotal) * 100) : 0;
  const kanjiPct = stats && stats.kanjiTotal > 0 ? Math.round((stats.kanjiLearned / stats.kanjiTotal) * 100) : 0;
  const grammarPct = stats && stats.grammarTotal > 0 ? Math.round((stats.grammarLearned / stats.grammarTotal) * 100) : 0;

  return (
    <div ref={containerRef} className="max-w-[1280px] mx-auto p-6 md:p-8 space-y-8 font-sans">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 gsap-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tight">
            Chào mừng trở lại, {username || 'Học viên'}!
          </h1>
          <p className="text-lg text-on-surface-variant">Dưới đây là tiến độ học tập thực tế của bạn hôm nay.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-outline font-medium uppercase tracking-wider mb-1">Chuỗi ngày học (Streak)</p>
          <div className="flex items-center gap-2 text-tertiary justify-end">
            <Flame className="fill-tertiary" size={28} />
            <span className="text-2xl font-bold">{stats?.streakDays ?? 0} Ngày</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SRS Card */}
        <div className="col-span-1 lg:col-span-8 bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant shadow-sm relative overflow-hidden flex flex-col justify-between gsap-fade-in gsap-hover-card">
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary-container/20 to-transparent pointer-events-none rounded-r-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <LayersIcon className="text-primary" size={20} />
              <h2 className="text-sm text-primary uppercase tracking-wider font-bold">Lặp lại ngắt quãng (SRS)</h2>
            </div>
            <h3 className="text-3xl font-bold text-on-surface mb-3">
              {stats?.dueCardCount ?? 0} thẻ đến hạn ôn tập hôm nay
            </h3>
            <p className="text-base text-on-surface-variant max-w-lg">
              Hãy duy trì thói quen ôn tập hàng ngày để chuyển hóa kiến thức từ trí nhớ ngắn hạn sang dài hạn.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4 relative z-10">
            <Button
              id="start-study-btn"
              onClick={onStartStudy}
              variant="primary"
              size="md"
              icon={<Zap size={18} className="fill-current" />}
              disabled={!stats || stats.dueCardCount === 0}
            >
              Ôn tập ngay
            </Button>
            {stats && stats.dueCardCount > 0 && (
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-surface-container-lowest flex items-center justify-center text-xs font-semibold text-on-surface">N5</div>
                <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-surface-container-lowest flex items-center justify-center text-xs font-semibold text-on-surface">SRS</div>
              </div>
            )}
          </div>
        </div>

        {/* Daily Goal / Stats summary */}
        <div className="col-span-1 lg:col-span-4 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm flex flex-col items-center justify-center gsap-fade-in gsap-hover-card">
          <h2 className="text-sm text-on-surface-variant uppercase tracking-wider font-bold self-start w-full mb-6">Mục tiêu hôm nay</h2>
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg 
              className="w-full h-full transform -rotate-90"
              role="img"
              aria-label="Daily goal progress circle"
            >
              <circle cx="64" cy="64" r="56" fill="none" className="stroke-surface-container-highest" strokeWidth="8"></circle>
              {stats && stats.dueCardCount === 0 ? (
                <circle cx="64" cy="64" r="56" fill="none" className="stroke-secondary" strokeWidth="8" strokeDasharray="351.858" strokeDashoffset="0" strokeLinecap="round"></circle>
              ) : (
                <circle cx="64" cy="64" r="56" fill="none" className="stroke-primary" strokeWidth="8" strokeDasharray="351.858" strokeDashoffset={351.858 - (351.858 * (stats && stats.dueCardCount > 0 ? 0.3 : 1.0))} strokeLinecap="round"></circle>
              )}
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold text-on-surface">
                {stats && stats.dueCardCount === 0 ? '100%' : 'Chờ ôn'}
              </span>
              <span className="text-xs text-on-surface-variant">
                {stats && stats.dueCardCount === 0 ? 'Đã hoàn thành' : `${stats?.dueCardCount ?? 0} thẻ`}
              </span>
            </div>
          </div>
          <p className="text-sm text-center text-on-surface-variant">
            {stats && stats.dueCardCount === 0 ? 'Chúc mừng! Bạn đã hoàn thành xuất sắc.' : 'Hãy hoàn thành các thẻ đến hạn ôn tập.'}
          </p>
        </div>

        {/* Stats Row */}
        <div className="col-span-1 lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Từ vựng đã thuộc', val: `${stats?.vocabLearned ?? 0} / ${stats?.vocabTotal ?? 0}`, pct: vocabPct, icon: Languages, color: 'bg-primary' },
            { label: 'Chữ Hán đã thuộc', val: `${stats?.kanjiLearned ?? 0} / ${stats?.kanjiTotal ?? 0}`, pct: kanjiPct, icon: Shapes, color: 'bg-tertiary' },
            { label: 'Ngữ pháp đã thuộc', val: `${stats?.grammarLearned ?? 0} / ${stats?.grammarTotal ?? 0}`, pct: grammarPct, icon: BookOpen, color: 'bg-secondary' },
          ].map((stat, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant shadow-sm flex flex-col gsap-fade-in gsap-hover-card">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-semibold text-on-surface-variant">{stat.label}</span>
                <stat.icon className="text-outline" size={20} />
              </div>
              <div className="text-3xl font-bold text-on-surface mb-3">{stat.val}</div>
              <div className="w-full bg-surface-container-highest rounded-full h-1.5 mb-2">
                <div className={`${stat.color} h-1.5 rounded-full`} style={{ width: `${stat.pct}%` }}></div>
              </div>
              <span className="text-xs text-on-surface-variant">Hoàn thành {stat.pct}% lộ trình N5</span>
            </div>
          ))}
        </div>

        {/* Recent Due Cards (Urgent Review list) */}
        <div className="col-span-1 lg:col-span-12 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm gsap-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
              <AlertCircle size={20} className="text-tertiary" />
              Thẻ cần ôn tập khẩn cấp
            </h2>
            <span className="text-xs text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full font-medium">
              Top 5 thẻ hạn sắp nhất
            </span>
          </div>

          {stats && stats.dueCards && stats.dueCards.length > 0 ? (
            <div className="space-y-3">
              {stats.dueCards.map((card: any) => (
                <div key={card.id} className="flex items-center justify-between p-3.5 rounded-xl hover:bg-surface-container-low transition-colors border border-transparent hover:border-outline-variant group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/8 text-primary flex items-center justify-center font-bold text-lg select-none">
                      {card.cardType === 'VOCABULARY' ? 'Từ' : card.cardType === 'KANJI' ? 'Tự' : 'Ngữ'}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                        {card.front} {card.reading ? `(${card.reading})` : ''}
                      </h4>
                      <p className="text-sm text-on-surface-variant">
                        Nghĩa: {card.back}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-on-surface-variant flex items-center gap-1">
                      <Clock size={12} />
                      Độ dễ: {card.easeFactor.toFixed(1)}
                    </span>
                    <span className="px-2.5 py-1 bg-surface-container-high text-on-surface rounded text-xs font-semibold">
                      Đến hạn
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-on-surface-variant bg-surface-container-low/30 rounded-xl border border-dashed border-outline-variant/60">
              <p className="text-sm font-medium mb-1">Tuyệt vời! Không có thẻ nào cần ôn tập khẩn cấp.</p>
              <p className="text-xs text-outline">Hãy tiếp tục học thêm từ vựng mới để làm phong phú kho tàng từ điển của bạn.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
