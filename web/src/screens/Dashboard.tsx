import { useEffect, useRef } from 'react';
import { Zap, Flame, Languages, Shapes, BookOpen, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';
import gsap from 'gsap';

const LayersIcon = ({ className, size }: any) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 12 12 17 22 12" /><polyline points="2 17 12 22 22 17" /></svg>;

export default function Dashboard({ onStartStudy }: { onStartStudy: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entry animation
      gsap.fromTo('.gsap-fade-in',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
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
  }, []);

  return (
    <div ref={containerRef} className="max-w-[1280px] mx-auto p-6 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 gsap-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tight">Chào mừng trở lại, Sensei!</h1>
          <p className="text-lg text-on-surface-variant">Here is your learning progress for today.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-outline font-medium uppercase tracking-wider mb-1">Current Streak</p>
          <div className="flex items-center gap-2 text-tertiary justify-end">
            <Flame className="fill-tertiary" size={28} />
            <span className="text-2xl font-bold">14 Days</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SRS Card */}
        <div className="col-span-1 lg:col-span-8 bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant shadow-sm relative overflow-hidden flex flex-col justify-between gsap-fade-in gsap-hover-card">
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary-container/30 to-transparent pointer-events-none rounded-r-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <LayersIcon className="text-primary" size={20} />
              <h2 className="text-sm text-primary uppercase tracking-wider font-bold">Spaced Repetition</h2>
            </div>
            <h3 className="text-3xl font-bold text-on-surface mb-3">42 thẻ cần ôn tập hôm nay</h3>
            <p className="text-base text-on-surface-variant max-w-lg">Consistent daily reviews are the key to long-term memory. You have a mix of N3 and N4 vocabulary waiting.</p>
          </div>
          <div className="mt-8 flex items-center gap-4 relative z-10">
            <Button
              onClick={onStartStudy}
              variant="primary"
              size="md"
              icon={<Zap size={18} className="fill-current" />}
            >
              Học ngay
            </Button>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-surface-container-lowest flex items-center justify-center text-xs font-medium text-on-surface">N3</div>
              <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-surface-container-lowest flex items-center justify-center text-xs font-medium text-on-surface">Vb</div>
              <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-surface-container-lowest flex items-center justify-center text-xs font-medium text-on-surface">+3</div>
            </div>
          </div>
        </div>

        {/* Daily Goal */}
        <div className="col-span-1 lg:col-span-4 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm flex flex-col items-center justify-center gsap-fade-in gsap-hover-card">
          <h2 className="text-sm text-on-surface-variant uppercase tracking-wider font-bold self-start w-full mb-6">Daily Goal</h2>
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" className="stroke-surface-container-highest" strokeWidth="8"></circle>
              <circle cx="64" cy="64" r="56" fill="none" className="stroke-secondary" strokeWidth="8" strokeDasharray="351.858" strokeDashoffset="87.964" strokeLinecap="round"></circle>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold text-on-surface">75%</span>
              <span className="text-xs text-on-surface-variant">30/40 Min</span>
            </div>
          </div>
          <p className="text-sm text-center text-on-surface-variant">Almost there! Just 10 more minutes.</p>
        </div>

        {/* Stats Row */}
        <div className="col-span-1 lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Vocabulary Mastery', val: '1,240', pct: 65, icon: Languages, color: 'bg-primary' },
            { label: 'Kanji Learned', val: '450', pct: 45, icon: Shapes, color: 'bg-tertiary' },
            { label: 'Grammar Points', val: '85', pct: 80, icon: BookOpen, color: 'bg-secondary' },
          ].map((stat, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant shadow-sm flex flex-col gsap-fade-in gsap-hover-card">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-on-surface-variant">{stat.label}</span>
                <stat.icon className="text-outline" size={20} />
              </div>
              <div className="text-3xl font-bold text-on-surface mb-3">{stat.val}</div>
              <div className="w-full bg-surface-container-highest rounded-full h-1.5 mb-2">
                <div className={`${stat.color} h-1.5 rounded-full`} style={{ width: `${stat.pct}%` }}></div>
              </div>
              <span className="text-xs text-on-surface-variant">{stat.pct}% of N3 Goal</span>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="col-span-1 lg:col-span-12 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm gsap-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-on-surface">Recent Activity</h2>
            <button className="text-primary text-sm font-medium hover:underline cursor-pointer">View All</button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer group border border-transparent hover:border-outline-variant">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-jp text-2xl font-medium">覚</div>
                <div>
                  <h4 className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">Reviewed "Oboeru" (To memorize)</h4>
                  <p className="text-xs text-on-surface-variant">Vocabulary • 10 mins ago</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-secondary-container text-on-secondary-container rounded text-xs font-medium">Correct</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer group border border-transparent hover:border-outline-variant">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">N3 Grammar Mini-Test</h4>
                  <p className="text-xs text-on-surface-variant">Exam • 2 hours ago</p>
                </div>
              </div>
              <span className="text-sm font-bold text-on-surface">8/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
