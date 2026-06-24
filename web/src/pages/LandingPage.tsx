import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import {
  ArrowRight,
  BookOpen,
  Cards,
  CheckCircle,
  Path,
  Compass,
  ArrowUpRight,
} from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const navigate = useNavigate();
  const roadmapRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);

  // Roadmap levels data
  const levels = [
    {
      id: 'n5',
      badge: 'N5 - Khởi đầu',
      title: 'Xây dựng nền tảng vững chắc',
      desc: 'Làm quen với bảng chữ cái Hiragana, Katakana, cấu trúc câu cơ bản và từ vựng đời sống thường ngày.',
      vocab: '800 từ vựng',
      kanji: '100 chữ Hán',
      grammar: '80 cấu trúc',
      color: 'border-emerald-800/40 bg-emerald-950/10 text-emerald-400',
    },
    {
      id: 'n4',
      badge: 'N4 - Sơ cấp',
      title: 'Giao tiếp tình huống cơ bản',
      desc: 'Nắm vững các kính ngữ cơ bản, hội thoại thường ngày trong văn phòng và cách chia động từ phức tạp.',
      vocab: '1,500 từ vựng',
      kanji: '300 chữ Hán',
      grammar: '120 cấu trúc',
      color: 'border-blue-800/40 bg-blue-950/10 text-blue-400',
    },
    {
      id: 'n3',
      badge: 'N3 - Trung cấp',
      title: 'Tự tin đọc hiểu & hội thoại',
      desc: 'Chuyển dịch từ hiểu biết cơ bản sang khả năng đọc hiểu văn bản, báo chí và tự tin trao đổi công việc.',
      vocab: '3,000 từ vựng',
      kanji: '650 chữ Hán',
      grammar: '150 cấu trúc',
      color: 'border-yellow-800/40 bg-yellow-950/10 text-yellow-400',
    },
    {
      id: 'n2',
      badge: 'N2 - Thượng cấp',
      title: 'Làm việc chuyên nghiệp',
      desc: 'Đọc hiểu sâu sắc các bài xã luận, xem tin tức thời sự không cần sub và giao tiếp lưu loát.',
      vocab: '6,000 từ vựng',
      kanji: '1,000 chữ Hán',
      grammar: '200 cấu trúc',
      color: 'border-orange-800/40 bg-orange-950/10 text-orange-400',
    },
    {
      id: 'n1',
      badge: 'N1 - Đỉnh cao',
      title: 'Thành thạo như người bản xứ',
      desc: 'Hoàn toàn làm chủ tiếng Nhật học thuật, văn học, các văn bản pháp lý và sắc thái ngôn ngữ tinh tế.',
      vocab: '10,000 từ vựng',
      kanji: '2,000 chữ Hán',
      grammar: '350 cấu trúc',
      color: 'border-crimson-800/40 bg-crimson-950/10 text-crimson-400',
    },
  ];

  useEffect(() => {
    // GSAP ScrollTrigger animation for the roadmap cards scaling and fading
    const cards = gsap.utils.toArray<HTMLElement>('.roadmap-card');
    
    // Create ScrollTrigger matchMedia for clean desktop animations
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      // 1. Stacking Card animation
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        
        gsap.to(card, {
          scale: 0.94 - (cards.length - i - 1) * 0.02,
          opacity: 0.4,
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top 30%',
            end: 'top 10%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      // 2. SVG path drawing animation
      if (svgPathRef.current && roadmapRef.current) {
        const path = svgPathRef.current;
        const pathLength = path.getTotalLength();
        
        // Setup initial stroke dash
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: roadmapRef.current,
            start: 'top 20%',
            end: 'bottom 80%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleScrollToRoadmap = () => {
    roadmapRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] bg-charcoal-950 text-charcoal-100 flex flex-col font-sans selection:bg-crimson-950 selection:text-crimson-200">
      
      {/* 1. Navbar */}
      <nav className="sticky top-0 z-50 w-full h-[72px] bg-charcoal-950/80 backdrop-blur-md border-b border-charcoal-900/60 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-crimson-600 flex items-center justify-center font-bold text-white tracking-tighter">
            日
          </div>
          <span className="text-sm font-extrabold tracking-widest text-white uppercase font-mono">
            NipponMaster
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={handleScrollToRoadmap} className="text-xs font-semibold uppercase tracking-wider text-charcoal-300 hover:text-white transition-colors cursor-pointer">
            Lộ trình
          </button>
          <a href="#features" className="text-xs font-semibold uppercase tracking-wider text-charcoal-300 hover:text-white transition-colors">
            Tính năng
          </a>
          <a href="#about" className="text-xs font-semibold uppercase tracking-wider text-charcoal-300 hover:text-white transition-colors">
            Về chúng tôi
          </a>
        </div>

        {/* CTA Button */}
        <div>
          <Button size="sm" icon={<ArrowRight size={14} />} iconPosition="right" onClick={() => navigate('/login')}>
            Bắt đầu học
          </Button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative w-full min-h-[calc(100dvh-72px)] flex items-center px-6 md:px-12 py-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Hero Left */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-crimson-400 uppercase">
                NipponMaster · 日本語
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[1.05]">
              Chinh phục tiếng Nhật <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 to-crimson-600">
                theo cách tối giản.
              </span>
            </h1>
            <p className="text-charcoal-300 text-sm md:text-base max-w-[50ch] leading-relaxed">
              Học từ vựng, chữ Hán và mẫu ngữ pháp N5 - N1 qua phương pháp lặp lại ngắt quãng thông minh và lộ trình trực quan hóa.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" icon={<ArrowRight size={16} />} iconPosition="right" onClick={() => navigate('/login')}>
                Bắt đầu học miễn phí
              </Button>
              <Button variant="ghost" size="lg" icon={<Compass size={18} />} onClick={handleScrollToRoadmap}>
                Khám phá lộ trình
              </Button>
            </div>
          </div>

          {/* Hero Right */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm md:max-w-md w-full">
              {/* Refracted Glass Overlay Background */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-crimson-900/20 to-charcoal-800/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Card padding="none" className="relative border-charcoal-800/80 bg-charcoal-900/60 overflow-hidden shadow-2xl rounded-2xl">
                <img
                  src="/hero_illust.png"
                  alt="NipponMaster Minimalist Study Workspace"
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </Card>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Roadmap Section (GSAP Stacking + SVG Path) */}
      <section ref={roadmapRef} className="relative bg-charcoal-950 py-24 px-6 md:px-12 border-t border-charcoal-900/40">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="max-w-xl mb-20 space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-crimson-500 uppercase block">
              ROADMAP
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Lộ trình bài học chuẩn JLPT N5 - N1
            </h2>
            <p className="text-charcoal-300 text-sm leading-relaxed">
              Từ người mới học chữ cái đến thành thạo như người bản xứ. Được chia nhỏ khoa học và trực quan.
            </p>
          </div>

          {/* Container Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative items-start">
            
            {/* Left side: SVG Path (Desktop only) */}
            <div className="hidden md:flex md:col-span-4 sticky top-32 justify-center h-[500px]">
              <svg className="w-full h-full" viewBox="0 0 100 400" fill="none">
                {/* Background Line (Muted) */}
                <path
                  d="M 50,0 Q 10,100 50,200 T 50,400"
                  stroke="var(--color-charcoal-800)"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Foreground Animated Line */}
                <path
                  ref={svgPathRef}
                  d="M 50,0 Q 10,100 50,200 T 50,400"
                  stroke="var(--color-crimson-600)"
                  strokeWidth="3.5"
                  fill="none"
                />
                
                {/* SVG Node points */}
                <circle cx="50" cy="10" r="6" className="fill-charcoal-950 stroke-emerald-500" strokeWidth="2.5" />
                <circle cx="27" cy="105" r="6" className="fill-charcoal-950 stroke-blue-500" strokeWidth="2.5" />
                <circle cx="50" cy="200" r="6" className="fill-charcoal-950 stroke-yellow-500" strokeWidth="2.5" />
                <circle cx="73" cy="295" r="6" className="fill-charcoal-950 stroke-orange-500" strokeWidth="2.5" />
                <circle cx="50" cy="390" r="6" className="fill-charcoal-950 stroke-crimson-500" strokeWidth="2.5" />
              </svg>
            </div>

            {/* Right side: Stacking Level Cards */}
            <div className="col-span-1.5 md:col-span-8 space-y-16 md:space-y-24">
              {levels.map((lvl, index) => (
                <div
                  key={lvl.id}
                  className="roadmap-card sticky top-24 w-full"
                  style={{
                    zIndex: index + 10,
                  }}
                >
                  <Card className="border border-charcoal-800/90 bg-charcoal-900/95 shadow-xl hover:border-charcoal-700/80 transition-colors">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={`border ${lvl.color} px-3 py-1 font-bold`}>
                          {lvl.badge}
                        </Badge>
                        <span className="text-[10px] font-mono text-charcoal-500 font-semibold">
                          PHASE 0{index + 1}
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        {lvl.title}
                      </h3>
                      
                      <p className="text-charcoal-300 text-xs md:text-sm leading-relaxed">
                        {lvl.desc}
                      </p>

                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-charcoal-900/60">
                        <div className="text-left">
                          <div className="text-xs text-charcoal-400">Từ vựng</div>
                          <div className="text-sm font-bold text-white font-mono">{lvl.vocab}</div>
                        </div>
                        <div className="text-left">
                          <div className="text-xs text-charcoal-400">Chữ Hán</div>
                          <div className="text-sm font-bold text-white font-mono">{lvl.kanji}</div>
                        </div>
                        <div className="text-left">
                          <div className="text-xs text-charcoal-400">Ngữ pháp</div>
                          <div className="text-sm font-bold text-white font-mono">{lvl.grammar}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Features Section (Bento Grid) */}
      <section id="features" className="bg-charcoal-900/20 py-24 px-6 md:px-12 border-t border-charcoal-900/40">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="max-w-xl space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-crimson-500 uppercase block">
              FEATURES
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Tính năng thiết kế chuyên biệt để ghi nhớ
            </h2>
            <p className="text-charcoal-300 text-sm leading-relaxed">
              Phương pháp học tối giản loại bỏ xao nhãng giúp bạn ghi nhớ sâu và lâu hơn.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Cell 1: Spaced Repetition SRS (Col span 2 on desktop) */}
            <Card className="md:col-span-2 flex flex-col justify-between border-charcoal-800/80 bg-charcoal-900/45 min-h-[300px]">
              <div className="space-y-3">
                <div className="p-2.5 bg-crimson-950/40 border border-crimson-800/40 rounded-lg text-crimson-400 w-fit">
                  <Cards size={20} weight="fill" />
                </div>
                <h3 className="text-xl font-bold text-white">Spaced Repetition Flashcard (SRS)</h3>
                <p className="text-charcoal-300 text-xs md:text-sm max-w-[50ch] leading-relaxed">
                  Thuật toán SM-2 thông minh tự động tính toán tần suất lặp lại ngắt quãng tối ưu cho từng từ vựng và chữ Hán, đưa thẻ cần ôn tập vào đúng thời điểm não bộ chuẩn bị quên.
                </p>
              </div>
              
              {/* Mock interactive UI preview */}
              <div className="mt-6 border border-charcoal-800/60 bg-charcoal-950/60 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-charcoal-900 flex items-center justify-center font-bold text-white text-base">
                    覚
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">覚える (Oboeru)</div>
                    <div className="text-[10px] text-charcoal-400">Nghĩa: Ghi nhớ, nhớ lại</div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <Badge variant="secondary" className="text-[9px] bg-red-950/20 text-red-400 border border-red-900/20 px-2 py-0.5">Quên</Badge>
                  <Badge variant="secondary" className="text-[9px] bg-emerald-950/20 text-emerald-400 border border-emerald-900/20 px-2 py-0.5">Thuộc</Badge>
                </div>
              </div>
            </Card>

            {/* Cell 2: Kanji Net Stroke (Col span 1) */}
            <Card className="flex flex-col justify-between border-charcoal-800/80 bg-charcoal-900/45 min-h-[300px]">
              <div className="space-y-3">
                <div className="p-2.5 bg-blue-950/40 border border-blue-800/40 rounded-lg text-blue-400 w-fit">
                  <Path size={20} weight="fill" />
                </div>
                <h3 className="text-xl font-bold text-white">Tra cứu Kanji & Nét vẽ</h3>
                <p className="text-charcoal-300 text-xs leading-relaxed">
                  Tìm kiếm và xem cấu trúc bộ thủ, số nét chi tiết của hàng nghìn chữ Kanji thông dụng.
                </p>
              </div>

              {/* Minimal SVG Stroke preview */}
              <div className="mt-6 border border-charcoal-800/60 bg-charcoal-950/60 rounded-xl p-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-charcoal-500" viewBox="0 0 100 100" fill="none">
                  {/* Grid background lines */}
                  <line x1="0" y1="50" x2="100" y2="50" stroke="var(--color-charcoal-800)" strokeDasharray="3" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="var(--color-charcoal-800)" strokeDasharray="3" />
                  {/* Kanji text with stroke placeholder */}
                  <text x="50" y="65" textAnchor="middle" fontSize="50" className="fill-white font-light opacity-95">日</text>
                  <path d="M 30,30 L 70,30" stroke="var(--color-crimson-500)" strokeWidth="2.5" strokeLinecap="round" className="opacity-80" />
                </svg>
              </div>
            </Card>

            {/* Cell 3: Grammar Handbook (Col span 1) */}
            <Card className="flex flex-col justify-between border-charcoal-800/80 bg-charcoal-900/45 min-h-[300px]">
              <div className="space-y-3">
                <div className="p-2.5 bg-yellow-950/40 border border-yellow-800/40 rounded-lg text-yellow-400 w-fit">
                  <BookOpen size={20} weight="fill" />
                </div>
                <h3 className="text-xl font-bold text-white">Sổ tay Ngữ pháp N5</h3>
                <p className="text-charcoal-300 text-xs leading-relaxed">
                  Học lý thuyết, cách kết hợp từ và phân biệt các mẫu ngữ pháp tương đồng cực trực quan.
                </p>
              </div>

              {/* Minimal structural badge preview */}
              <div className="mt-6 border border-charcoal-800/60 bg-charcoal-950/60 rounded-xl p-4 space-y-1.5">
                <div className="text-[10px] text-charcoal-400 uppercase font-mono">Cấu trúc mẫu</div>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="text-[9px]">Danh từ</Badge>
                  <span className="text-white text-xs">+</span>
                  <Badge variant="crimson" className="text-[9px]">だけ (dake)</Badge>
                </div>
              </div>
            </Card>

            {/* Cell 4: Custom Monogram / Visual badge (Col span 2) */}
            <Card className="md:col-span-2 flex flex-col justify-between border-charcoal-800/80 bg-charcoal-900/45 min-h-[300px]">
              <div className="space-y-3">
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/40 rounded-lg text-emerald-400 w-fit">
                  <CheckCircle size={20} weight="fill" />
                </div>
                <h3 className="text-xl font-bold text-white">Tối ưu hóa khả năng tập trung</h3>
                <p className="text-charcoal-300 text-xs md:text-sm max-w-[50ch] leading-relaxed">
                  Thiết kế loại bỏ mọi banner quảng cáo, thông báo rác hay các chi tiết game-hóa vô bổ, giúp bạn tập trung cao độ vào bản chất việc học ngôn ngữ.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <div className="flex items-center gap-2 border border-charcoal-800 px-3 py-1.5 rounded-lg text-xs text-charcoal-300 bg-charcoal-950/40">
                  <CheckCircle size={14} className="text-emerald-500" /> Không quảng cáo
                </div>
                <div className="flex items-center gap-2 border border-charcoal-800 px-3 py-1.5 rounded-lg text-xs text-charcoal-300 bg-charcoal-950/40">
                  <CheckCircle size={14} className="text-emerald-500" /> Spaced Repetition (SRS)
                </div>
                <div className="flex items-center gap-2 border border-charcoal-800 px-3 py-1.5 rounded-lg text-xs text-charcoal-300 bg-charcoal-950/40">
                  <CheckCircle size={14} className="text-emerald-500" /> Phản hồi lực vật lý
                </div>
              </div>
            </Card>

          </div>
        </div>
      </section>

      {/* 5. Call To Action (CTA) */}
      <section className="bg-charcoal-950 py-24 px-6 md:px-12 border-t border-charcoal-900/40">
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden border border-crimson-900/20 bg-gradient-to-br from-charcoal-900/90 to-crimson-950/20 p-8 md:p-12 text-center space-y-6 rounded-2xl shadow-xl">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-crimson-900/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white max-w-[25ch] mx-auto leading-tight">
              Bắt đầu hành trình chinh phục tiếng Nhật hôm nay
            </h2>
            <p className="text-charcoal-300 text-sm max-w-[45ch] mx-auto leading-relaxed">
              Trải nghiệm phương pháp tự học tối giản hiệu quả vượt trội. Hoàn toàn miễn phí ở lộ trình N5.
            </p>
            <div className="pt-2 flex justify-center">
              <Button size="lg" icon={<ArrowUpRight size={16} />} iconPosition="right" onClick={() => navigate('/register')}>
                Đăng ký tài khoản mới
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="mt-auto bg-charcoal-950 border-t border-charcoal-900/60 py-12 px-6 md:px-12 text-center md:text-left">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-charcoal-800 flex items-center justify-center font-bold text-white text-xs">
              日
            </div>
            <span className="text-xs font-bold tracking-widest text-white uppercase font-mono">
              NipponMaster
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs text-charcoal-400">
            <button onClick={handleScrollToRoadmap} className="hover:text-white transition-colors cursor-pointer">Lộ trình</button>
            <a href="#features" className="hover:text-white transition-colors">Tính năng</a>
            <a href="/login" className="hover:text-white transition-colors">Đăng nhập</a>
            <a href="/design-system" className="hover:text-white transition-colors">Design System</a>
          </div>

          <p className="text-[10px] text-charcoal-500 font-mono">
            &copy; {new Date().getFullYear()} NipponMaster. Bảo lưu mọi quyền.
          </p>
        </div>
      </footer>

    </div>
  );
}
