import { useState, useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, Brain, Target, PenTool, Star, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  onNavigateAuth: () => void;
}

export default function LandingPage({ onNavigateAuth }: LandingPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [activeLevel, setActiveLevel] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-text', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo('.feature-card', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.features-section', start: 'top 80%' } });
      gsap.fromTo('.philosophy-text', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.philosophy-section', start: 'top 75%' } });
      gsap.fromTo('.cta-content', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.cta-section', start: 'top 80%' } });
    }, pageRef);

    const marquee = marqueeRef.current;
    if (marquee) {
      const inner = marquee.querySelector('.marquee-inner') as HTMLElement;
      if (inner) {
        const clone = inner.cloneNode(true) as HTMLElement;
        marquee.appendChild(clone);
        gsap.to(marquee.children, { xPercent: -100, duration: 40, ease: 'none', repeat: -1 });
      }
    }

    return () => ctx.revert();
  }, []);

  const testimonials = [
    { name: 'Minh Thư', role: 'Đạt N2 sau 8 tháng', text: 'Phương pháp SRS của NipponMaster giúp tôi nhớ từ vựng lâu hơn bất kỳ ứng dụng nào khác. Từ N4 lên N2 chỉ trong 8 tháng!', stars: 5 },
    { name: 'Hoàng Nam', role: 'Kỹ sư phần mềm tại Tokyo', text: 'Nhờ NipponMaster mà tôi tự tin giao tiếp tiếng Nhật trong công việc. Giao diện đẹp, bài học chất lượng!', stars: 5 },
    { name: 'Thanh Hằng', role: 'Du học sinh Osaka', text: 'Lộ trình học rõ ràng từ N5 đến N1. Tôi đặc biệt yêu thích phần luyện ngữ pháp theo ngữ cảnh thực tế.', stars: 5 },
    { name: 'Đức Anh', role: 'Đạt N3 sau 5 tháng', text: 'Hệ thống flashcard thông minh cùng bài thi thử JLPT khiến việc ôn tập không còn nhàm chán.', stars: 5 },
    { name: 'Phương Linh', role: 'Giáo viên tiếng Nhật', text: 'Tôi giới thiệu NipponMaster cho tất cả học viên. Nền tảng này giúp các em tự học hiệu quả ngoài giờ lên lớp.', stars: 5 },
    { name: 'Quốc Bảo', role: 'Đạt N1 sau 14 tháng', text: 'Từ zero đến N1 — hành trình dài nhưng NipponMaster luôn đồng hành. Cảm ơn đội ngũ phát triển!', stars: 5 },
    { name: 'Yến Nhi', role: 'Sinh viên năm 3', text: 'Giao diện mang phong cách Nhật Bản rất đẹp mắt, tạo cảm hứng học tập mỗi ngày. Highly recommend!', stars: 5 },
    { name: 'Trọng Nhân', role: 'Nhân viên công ty Nhật', text: 'Phần luyện Kanji theo bộ thủ rất trực quan. Tôi đã ghi nhớ hơn 800 Kanji chỉ trong 4 tháng.', stars: 4 },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-surface font-sans">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="NipponMaster Logo" className="w-9 h-9 object-contain" />
            <span className="text-xl font-bold text-on-surface tracking-tight">NipponMaster</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-on-surface-variant">
            <a href="#features" className="hover:text-primary transition-colors">Phương pháp</a>
            <a href="#philosophy" className="hover:text-primary transition-colors">Triết lý</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Cộng đồng</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={onNavigateAuth} className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer hidden sm:block">Đăng nhập</button>
            <button onClick={onNavigateAuth} className="bg-primary text-on-primary text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-sm cursor-pointer flex items-center gap-1.5">
              Bắt đầu miễn phí <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-24 pb-16 min-h-[92vh] flex items-center overflow-hidden bg-surface">
        <div className="absolute inset-0 z-0">
          <img src="/hero-koi-horizontal.png" alt="Đàn cá Koi Nhật Bản" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 z-10 w-full">
          <div className="max-w-2xl">
            <h1 className="hero-text font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-on-surface leading-[1.1] tracking-tight mb-6">
              Chinh phục<br />
              <span className="text-primary">Nhật ngữ</span><br />
              <span className="font-light italic text-on-surface/80">theo cách của bạn</span>
            </h1>
            <p className="hero-text text-lg text-on-surface-variant leading-relaxed max-w-lg mb-10">
              Từ N5 đến N1, NipponMaster đồng hành cùng bạn trên mọi chặng đường — với phương pháp SRS thông minh, bài giảng từ giảng viên chất lượng, và cộng đồng hơn 50,000 học viên.
            </p>
            <div className="hero-text flex flex-wrap gap-4">
              <button onClick={onNavigateAuth} className="bg-primary text-on-primary font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl text-base flex items-center gap-2 cursor-pointer">
                Bắt đầu hành trình <ArrowRight size={18} />
              </button>
              <a href="#features" className="border-2 border-outline-variant text-on-surface font-bold px-8 py-4 rounded-xl hover:border-primary hover:text-primary transition-all text-base flex items-center gap-2 cursor-pointer">
                Khám phá lộ trình <ChevronRight size={18} />
              </a>
            </div>
            <div className="hero-text mt-12 flex gap-8">
              {[
                { val: '50,000+', label: 'Học viên' },
                { val: '2,500+', label: 'Bài học' },
                { val: '98%', label: 'Hài lòng' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-on-surface">{s.val}</div>
                  <div className="text-xs text-on-surface-variant font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features-section py-24 relative bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/samurai_background.png')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/50 to-surface pointer-events-none z-0" />
        <div className="absolute inset-0 bg-surface/10 pointer-events-none z-0" />
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Phương pháp học tập</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-on-surface mt-4 mb-4">Luyện thi JLPT hiệu quả</h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Hệ thống được thiết kế khoa học để giúp bạn chinh phục mọi cấp độ JLPT — từ N5 cơ bản đến N1 nâng cao.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: 'SRS Thông minh', desc: 'Hệ thống lặp lại ngắt quãng giúp ghi nhớ từ vựng và Kanji vào trí nhớ dài hạn. Thuật toán tối ưu thời điểm ôn tập.', color: 'bg-primary/10 text-primary' },
              { icon: Target, title: 'Thi thử JLPT', desc: 'Bộ đề thi thử mô phỏng 100% cấu trúc JLPT thực tế. Phân tích điểm mạnh yếu theo từng phần thi.', color: 'bg-secondary/10 text-secondary' },
              { icon: PenTool, title: 'Ngữ pháp theo ngữ cảnh', desc: 'Học ngữ pháp qua ví dụ thực tế, hội thoại tự nhiên. Mỗi mẫu câu đi kèm giải thích chi tiết và bài tập.', color: 'bg-tertiary/10 text-tertiary' },
              { icon: BookOpen, title: 'Kanji theo bộ thủ', desc: 'Phân loại Kanji thông minh theo bộ thủ, tần suất sử dụng và cấp độ JLPT. Luyện viết trực tiếp trên màn hình.', color: 'bg-error/10 text-error' },
            ].map((f, i) => (
              <div key={i} className="feature-card bg-surface-container-lowest rounded-2xl p-7 border border-outline-variant shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <f.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2">{f.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAKURA ROADMAP - Cải tiến: cành sát lề trái, hoa từ búp đến nở, thêm lá */}
      <section className="py-28 relative bg-cover bg-center overflow-visible" style={{ backgroundImage: "url('/sakura_roadmap_bg_pagoda.png')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none z-10" />

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes sakura-fall {
            0% { transform: translateY(-20px) translateX(0) rotate(0deg) scale(0.6); opacity: 0; }
            15% { opacity: 1; }
            90% { opacity: 0.9; }
            100% { transform: translateY(620px) translateX(160px) rotate(400deg) scale(0.85); opacity: 0; }
          }
          @keyframes bozu-swing {
            0%, 100% { transform: rotate(-6deg); }
            50% { transform: rotate(6deg); }
          }
          .bozu-doll { transform-origin: top center; }
          .sakura-glow { animation: pulse-glow 2s ease-in-out infinite; }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }
        `}} />

        {(() => {
          const levels = [
            { level: 'N5', x: 80, y: 140, label: 'Nhập môn', desc: '800 từ vựng · 100 Kanji · Ngữ pháp cơ bản' },
            { level: 'N4', x: 200, y: 225, label: 'Sơ cấp', desc: '1,500 từ · 300 Kanji · Hội thoại hàng ngày' },
            { level: 'N3', x: 320, y: 185, label: 'Trung cấp', desc: '3,500 từ · 650 Kanji · Đọc hiểu văn bản' },
            { level: 'N2', x: 440, y: 285, label: 'Trung cao cấp', desc: '6,000 từ · 1,000 Kanji · Tin tức & báo chí' },
            { level: 'N1', x: 560, y: 415, label: 'Cao cấp', desc: '10,000+ từ · 2,000 Kanji · Văn học & học thuật' },
          ];

          // Vẽ hoa theo giai đoạn: N5 = búp, N4 = nụ hé, N3 = bán nở, N2 = nở nhiều, N1 = nở rộ
          const renderFlowerByLevel = (level: string, isActive: boolean) => {
            const activeScale = isActive ? 1.25 : 1;
            const lightColor = '#ffb7c5';

            switch (level) {
              case 'N5': // Búp hoa
                return (
                  <g className="transition-transform duration-300" style={{ transform: `scale(${activeScale})` }}>
                    <ellipse cx="0" cy="0" rx="12" ry="18" fill={lightColor} stroke="#ff3b60" strokeWidth="1.2" />
                    <path d="M -8,0 Q 0,-12 8,0" fill="none" stroke="#ff2047" strokeWidth="0.8" opacity="0.5" />
                    <ellipse cx="0" cy="0" rx="6" ry="10" fill="#ff9eb5" opacity="0.6" />
                    {isActive && <circle cx="0" cy="0" r="22" fill="none" stroke="#ffb7c5" strokeWidth="0.5" className="animate-ping" />}
                  </g>
                );
              case 'N4': // Nụ hé mở
                return (
                  <g className="transition-transform duration-300" style={{ transform: `scale(${activeScale})` }}>
                    <circle cx="0" cy="0" r="14" fill={lightColor} />
                    <path d="M -10,-6 Q 0,-14 10,-6 Q 0,-2 -10,-6" fill="#ff9eb5" stroke="#ff3b60" strokeWidth="0.8" />
                    <path d="M -6,4 Q 0,10 6,4" fill="none" stroke="#ff2047" strokeWidth="0.8" opacity="0.5" />
                    <circle cx="0" cy="-2" r="4" fill="#ffc2d1" opacity="0.7" />
                    {isActive && <circle cx="0" cy="0" r="22" fill="none" stroke="#ffb7c5" strokeWidth="0.5" className="animate-ping" />}
                  </g>
                );
              case 'N3': // Hoa bán nở
                return (
                  <g className="transition-transform duration-300" style={{ transform: `scale(${activeScale})` }}>
                    <circle cx="0" cy="0" r="16" fill={lightColor} opacity="0.3" className="blur-sm" />
                    {[0, 72, 144, 216, 288].map((angle) => (
                      <g key={angle} transform={`rotate(${angle})`}>
                        <path d="M 0,0 C -8,-10 -12,-12 -8,-16 C -4,-18 4,-18 8,-16 C 12,-12 8,-10 0,0" fill={lightColor} stroke="#ff3b60" strokeWidth="0.8" />
                      </g>
                    ))}
                    <circle cx="0" cy="0" r="5" fill="#fce4a8" />
                    <circle cx="0" cy="0" r="3" fill="#ffb347" />
                    {isActive && <circle cx="0" cy="0" r="26" fill="none" stroke="#ffb7c5" strokeWidth="0.5" className="animate-ping" />}
                  </g>
                );
              case 'N2': // Hoa nở nhiều cánh
                return (
                  <g className="transition-transform duration-300" style={{ transform: `scale(${activeScale})` }}>
                    <circle cx="0" cy="0" r="20" fill={lightColor} opacity="0.25" className="blur-sm" />
                    {[0, 60, 120, 180, 240, 300].map((angle) => (
                      <g key={angle} transform={`rotate(${angle})`}>
                        <path d="M 0,0 C -10,-12 -15,-15 -10,-20 C -5,-23 5,-23 10,-20 C 15,-15 10,-12 0,0" fill="#ff9eb5" stroke="#ff3b60" strokeWidth="0.8" />
                        <path d="M -6,-10 Q 0,-18 6,-10" fill="none" stroke="#ff2047" strokeWidth="0.6" opacity="0.3" />
                      </g>
                    ))}
                    <circle cx="0" cy="0" r="8" fill="#fce4a8" />
                    <circle cx="0" cy="0" r="4" fill="#ffb347" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                      <g key={a} transform={`rotate(${a})`}>
                        <line x1="0" y1="6" x2="0" y2="12" stroke="#ffb347" strokeWidth="1" />
                        <circle cx="0" cy="12" r="1.5" fill="#fce4a8" />
                      </g>
                    ))}
                    {isActive && <circle cx="0" cy="0" r="32" fill="none" stroke="#ffb7c5" strokeWidth="0.5" className="animate-ping" />}
                  </g>
                );
              case 'N1': // Hoa nở rộ đầy đủ
              default:
                return (
                  <g className="transition-transform duration-300" style={{ transform: `scale(${activeScale})` }}>
                    <circle cx="0" cy="0" r="24" fill={lightColor} opacity="0.3" className="blur-sm" />
                    {[0, 72, 144, 216, 288].map((angle) => (
                      <g key={angle} transform={`rotate(${angle})`}>
                        <path d="M 0,0 C -14,-16 -20,-20 -14,-26 C -8,-30 8,-30 14,-26 C 20,-20 14,-16 0,0" fill="#ff85a3" stroke="#ff3b60" strokeWidth="0.8" />
                        <path d="M -8,-14 Q 0,-24 8,-14" fill="none" stroke="#ff2047" strokeWidth="0.8" opacity="0.4" />
                        <path d="M -12,-8 Q -16,-16 -10,-20" fill="none" stroke="#ff2047" strokeWidth="0.6" opacity="0.3" />
                      </g>
                    ))}
                    {/* Lớp cánh trong */}
                    {[36, 156, 276].map((angle) => (
                      <g key={angle} transform={`rotate(${angle})`}>
                        <path d="M 0,0 C -6,-10 -10,-12 -6,-16 C -2,-18 2,-18 6,-16 C 10,-12 6,-10 0,0" fill="#ffc2d1" stroke="#ff5c7c" strokeWidth="0.6" />
                      </g>
                    ))}
                    <circle cx="0" cy="0" r="10" fill="#fce4a8" />
                    <circle cx="0" cy="0" r="5" fill="#ffb347" />
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
                      <g key={a} transform={`rotate(${a})`}>
                        <line x1="0" y1="8" x2="0" y2="16" stroke="#ffb347" strokeWidth="1.2" />
                        <circle cx="0" cy="16" r="2" fill="#fce4a8" />
                      </g>
                    ))}
                    {isActive && <circle cx="0" cy="0" r="38" fill="none" stroke="#ffb7c5" strokeWidth="0.8" className="animate-ping" />}
                  </g>
                );
            }
          };

          return (
            <div className="max-w-7xl mx-auto px-0 lg:px-6 relative z-20">
              <div className="text-center mb-16 px-6">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Lộ trình học tập</span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mt-4 mb-4 leading-tight">
                  Từ N5 đến N1 <span className="text-primary italic font-light">trong tầm tay bạn</span>
                </h2>
                <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
                  Mỗi cấp độ JLPT được phân chia khoa học và kết nối liền mạch như hành trình phát triển của đóa hoa anh đào từ nụ nhỏ e ấp đến khi nở rộ rực rỡ.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Cột trái: SVG chiếm toàn bộ, sát mép trái */}
                <div className="lg:col-span-7 relative w-full overflow-visible">
                  {/* Cánh hoa rơi */}
                  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                    {[
                      { id: 1, left: '2%', delay: '0s', duration: '7.5s', scale: 0.9 },
                      { id: 2, left: '15%', delay: '2.2s', duration: '9.5s', scale: 1.2 },
                      { id: 3, left: '28%', delay: '4s', duration: '8s', scale: 0.8 },
                      { id: 4, left: '45%', delay: '1.2s', duration: '11s', scale: 1.1 },
                      { id: 5, left: '58%', delay: '5.8s', duration: '8.5s', scale: 0.95 },
                      { id: 6, left: '75%', delay: '2.8s', duration: '10.5s', scale: 1.25 },
                      { id: 7, left: '22%', delay: '0.6s', duration: '9s', scale: 0.85 },
                      { id: 8, left: '55%', delay: '3.4s', duration: '10s', scale: 1.15 },
                      { id: 9, left: '38%', delay: '5s', duration: '7.8s', scale: 0.75 },
                      { id: 10, left: '68%', delay: '1.8s', duration: '11.5s', scale: 1.3 }
                    ].map((p) => (
                      <div
                        key={p.id}
                        className="absolute top-[-25px] w-4 h-4 bg-[#ffb7c5] border border-[#ff9ebb] rounded-full select-none shadow-md"
                        style={{
                          left: p.left,
                          animationDelay: p.delay,
                          animationDuration: p.duration,
                          transform: `scale(${p.scale})`,
                          animationName: 'sakura-fall',
                          animationIterationCount: 'infinite',
                          animationTimingFunction: 'linear',
                          clipPath: 'path("M 8 0 C 13 -4, 18 1, 14 8 C 11 13, 5 13, 2 8 C -2 1, 3 -4, 8 0 M 5 2 C 2 -2, -2 1, 2 5")'
                        }}
                      />
                    ))}
                  </div>

                  {/* SVG - Cành hoa mới, bắt đầu từ sát lề trái (x=0) */}
                  <svg 
                    viewBox="0 0 700 550" 
                    role="img"
                    aria-label="Roadmap of JLPT levels from N5 to N1 designed as a blooming cherry blossom branch"
                    className="w-full select-none relative z-20"
                  >
                    <defs>
                      <radialGradient id="sakuraGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffb7c5" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="barkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e1007" />
                        <stop offset="50%" stopColor="#2e190e" />
                        <stop offset="100%" stopColor="#3f2516" />
                      </linearGradient>
                      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
                      </filter>
                    </defs>

                    <circle cx="350" cy="275" r="220" fill="url(#sakuraGlow)" opacity="0.1" />

                    {/* CÀNH CHÍNH - xuất phát từ sát lề trái (x=0) */}
                    <path
                      d="M 0,130 C 40,125 80,130 120,135 
                         C 180,145 210,210 240,222 
                         C 280,238 320,175 360,185 
                         C 410,198 440,265 480,290 
                         C 520,315 550,385 580,415 
                         C 620,450 680,460 760,465"
                      fill="none"
                      stroke="url(#barkGrad)"
                      strokeWidth="14"
                      strokeLinecap="round"
                      filter="url(#shadow)"
                    />
                    {/* Đường gân sáng */}
                    <path
                      d="M 0,128 C 40,123 80,128 120,133 
                         C 180,143 210,208 240,220 
                         C 280,236 320,173 360,183 
                         C 410,196 440,263 480,288 
                         C 520,313 550,383 580,413 
                         C 620,448 680,458 760,463"
                      fill="none"
                      stroke="#4a2e1a"
                      strokeWidth="2"
                      opacity="0.6"
                    />

                    {/* CÁC NHÁNH PHỤ */}
                    <path d="M 80,132 Q 130,85 170,105" fill="none" stroke="url(#barkGrad)" strokeWidth="6" strokeLinecap="round" />
                    <path d="M 120,100 Q 150,70 185,88" fill="none" stroke="url(#barkGrad)" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 220,220 Q 270,175 310,195" fill="none" stroke="url(#barkGrad)" strokeWidth="5" strokeLinecap="round" />
                    <path d="M 260,190 Q 285,160 310,175" fill="none" stroke="url(#barkGrad)" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 340,182 Q 380,135 425,155" fill="none" stroke="url(#barkGrad)" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 460,288 Q 510,240 550,270" fill="none" stroke="url(#barkGrad)" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 570,415 Q 620,370 660,400" fill="none" stroke="url(#barkGrad)" strokeWidth="3" strokeLinecap="round" />

                    {/* LÁ CÂY - thêm nhiều lá hơn */}
                    {[
                      { x: 100, y: 120, r: 20, s: 1.1 },
                      { x: 150, y: 95, r: -15, s: 0.9 },
                      { x: 200, y: 100, r: 30, s: 1.0 },
                      { x: 250, y: 200, r: -25, s: 1.2 },
                      { x: 300, y: 185, r: 15, s: 0.9 },
                      { x: 370, y: 165, r: -20, s: 1.0 },
                      { x: 430, y: 150, r: 25, s: 1.1 },
                      { x: 500, y: 260, r: -30, s: 1.0 },
                      { x: 540, y: 250, r: 20, s: 0.9 },
                      { x: 600, y: 390, r: -15, s: 1.2 },
                      { x: 650, y: 380, r: 30, s: 1.0 },
                    ].map((leaf, idx) => (
                      <g key={`leaf-${idx}`} transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`} filter="url(#shadow)">
                        <path d="M 0,0 C -7,-16 -16,-14 -11,-6 C -7,0 -2,1 0,0" fill="#657a65" stroke="#465446" strokeWidth="0.6" />
                        <path d="M 0,0 C 7,-16 16,-14 11,-6 C 7,0 2,1 0,0" fill="#748c74" stroke="#465446" strokeWidth="0.6" />
                        <path d="M 0,-2 L 0,-16" stroke="#465446" strokeWidth="0.8" fill="none" />
                      </g>
                    ))}

                    {/* NÚT MIZUHIKI */}
                    {levels.map((l, idx) => (
                      <g key={`mizu-${idx}`} transform={`translate(${l.x}, ${l.y + 28})`} opacity="0.85" filter="url(#shadow)">
                        <path d="M -12,0 C -16,-8 16,-8 12,0" fill="none" stroke="#cca42b" strokeWidth="1.5" />
                        <path d="M -8,2 C -12,10 12,10 8,2" fill="none" stroke="#a61c1c" strokeWidth="1.5" />
                        <path d="M -4,6 L -6,16 M 4,6 L 6,16" fill="none" stroke="#a61c1c" strokeWidth="1.2" strokeLinecap="round" />
                      </g>
                    ))}

                    {/* BÚP BÊ TERU TERU BOZU */}
                    {[
                      { x: 175, y: 105, len: 55 },
                      { x: 410, y: 150, len: 65 },
                      { x: 635, y: 400, len: 60 }
                    ].map((b, idx) => (
                      <g
                        key={`bozu-${idx}`}
                        className="bozu-doll"
                        style={{
                          transformOrigin: `${b.x}px ${b.y}px`,
                          animation: `bozu-swing ${3.4 + idx}s ease-in-out infinite`
                        }}
                      >
                        <line x1={b.x - 0.5} y1={b.y} x2={b.x - 0.5} y2={b.y + b.len} stroke="#a61c1c" strokeWidth="0.8" />
                        <line x1={b.x + 0.5} y1={b.y} x2={b.x + 0.5} y2={b.y + b.len} stroke="#cca42b" strokeWidth="0.8" />
                        <circle cx={b.x} cy={b.y + 8} r="2.5" fill="#7a4e32" />

                        <g transform={`translate(${b.x}, ${b.y + b.len})`} filter="url(#shadow)">
                          <path d="M -7,9 C -4,7 4,7 7,9" fill="none" stroke="#cca42b" strokeWidth="2" />
                          <path d="M -9,9 C -8,21 -15,34 -8,41 C -4,44 4,44 8,41 C 15,34 8,21 9,9 Z" fill="#f5ebe0" stroke="#bdad9e" strokeWidth="0.7" />
                          <circle cx="0" cy="0" r="11" fill="#f5ebe0" stroke="#bdad9e" strokeWidth="0.7" />
                          <circle cx="-3.2" cy="-2" r="1.1" fill="#2d1c10" />
                          <circle cx="3.2" cy="-2" r="1.1" fill="#2d1c10" />
                          <circle cx="-5.5" cy="1" r="2.2" fill="#ffb7c5" opacity="0.6" />
                          <circle cx="5.5" cy="1" r="2.2" fill="#ffb7c5" opacity="0.6" />
                          <path d="M -1.5,1.8 Q 0,3 1.5,1.8" stroke="#2d1c10" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                          <path d="M -3.5,9 Q 0,7 3.5,9 Q 5,12 0,10 Q -5,12 -3.5,9" fill="#ff5c7c" />
                        </g>
                      </g>
                    ))}

                    {/* CÁC BÔNG HOA THEO CẤP ĐỘ */}
                    {levels.map((l) => {
                      const isActive = activeLevel === l.level;
                      return (
                        <g
                          key={l.level}
                          transform={`translate(${l.x}, ${l.y})`}
                          className="cursor-pointer"
                          onMouseEnter={() => setActiveLevel(l.level)}
                          onMouseLeave={() => setActiveLevel(null)}
                        >
                          {isActive && (
                            <circle cx="0" cy="0" r="45" className="fill-primary/20 animate-ping opacity-70" />
                          )}
                          {renderFlowerByLevel(l.level, isActive)}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Cột phải: danh sách level */}
                <div className="lg:col-span-5 flex flex-col gap-5 px-6 lg:px-0">
                  {[...levels].reverse().map((l) => {
                    const isActive = activeLevel === l.level;
                    return (
                      <div
                        key={l.level}
                        className={`flex items-center gap-6 p-6 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-md ${isActive
                          ? 'border-primary bg-primary/5 shadow-lg -translate-x-2 scale-[1.02]'
                          : 'border-outline-variant/40 bg-surface-container-lowest/50 hover:border-primary/40 hover:bg-primary/[0.02] hover:-translate-x-1'
                          }`}
                        onMouseEnter={() => setActiveLevel(l.level)}
                        onMouseLeave={() => setActiveLevel(null)}
                      >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-base shrink-0 transition-all duration-300 ${isActive
                          ? 'bg-primary text-on-primary scale-110 shadow-md'
                          : 'bg-primary/10 text-primary'
                          }`}>
                          {l.level}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-serif text-lg font-bold transition-colors duration-300 ${isActive ? 'text-primary' : 'text-on-surface'}`}>
                            {l.label}
                          </div>
                          <div className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                            {l.desc}
                          </div>
                        </div>
                        <ChevronRight size={20} className={`shrink-0 transition-all duration-300 ${isActive ? 'text-primary translate-x-1' : 'text-outline'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="philosophy-section relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/cranes-sun.jpg" alt="Đàn hạc bay về mặt trời đỏ" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a00]/85 via-[#1a0a00]/60 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <span className="philosophy-text text-xs font-bold uppercase tracking-[0.25em] text-[#e8c47a]">Triết lý học tập</span>
            <h2 className="philosophy-text font-serif text-4xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight">
              <span className="italic font-light">Học tập là hành trình</span><br />không phải đích đến
            </h2>
            <div className="philosophy-text w-16 h-[2px] bg-[#e8c47a] mb-8"></div>
            <p className="philosophy-text font-serif italic text-xl text-white/90 leading-relaxed mb-6">
              "七転び八起き" — <span className="text-[#e8c47a]">Nana korobi ya oki</span>
            </p>
            <p className="philosophy-text font-serif italic text-lg text-white/75 leading-relaxed mb-8">
              Ngã bảy lần, đứng dậy tám lần. Tinh thần kiên trì của người Nhật chính là triết lý cốt lõi mà NipponMaster mang đến cho mỗi học viên.
            </p>
            <p className="philosophy-text text-white/65 leading-relaxed">
              Chúng tôi tin rằng mỗi người đều có thể chinh phục tiếng Nhật khi được đồng hành bởi phương pháp đúng đắn, giảng viên tận tâm, và một cộng đồng luôn sẵn sàng hỗ trợ.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Tiếng nói cộng đồng</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-on-surface mt-4 mb-4">Được tin tưởng bởi<br /><span className="text-primary italic font-light">hàng nghìn học viên</span></h2>
        </div>
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          <div className="marquee-inner flex gap-6 px-3">
            {testimonials.map((t, i) => (
              <div key={i} className="inline-flex flex-col bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm w-[340px] whitespace-normal shrink-0 hover:shadow-md transition-all">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => <Star key={j} size={14} className="text-[#e8c47a] fill-[#e8c47a]" />)}
                </div>
                <p className="text-sm text-on-surface leading-relaxed mb-4 line-clamp-4">"{t.text}"</p>
                <div className="mt-auto pt-3 border-t border-outline-variant/30">
                  <div className="font-bold text-on-surface text-sm">{t.name}</div>
                  <div className="text-xs text-on-surface-variant">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-32 relative bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/torii_background.png')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/65 to-surface pointer-events-none z-0" />
        <div className="absolute inset-0 bg-surface/10 pointer-events-none z-0" />
        <div className="relative max-w-4xl mx-auto px-6 text-center cta-content z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Sẵn sàng chưa?</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-on-surface mt-4 mb-4">
            Viết tiếp chương mới<br />cho <span className="text-primary italic">hành trình của bạn</span>
          </h2>
          <p className="text-on-surface-variant text-lg mb-10 max-w-xl mx-auto">
            Hàng nghìn người đã bắt đầu hành trình chinh phục tiếng Nhật cùng NipponMaster. Bạn sẽ là người tiếp theo?
          </p>
          <button onClick={onNavigateAuth} className="bg-primary text-on-primary font-bold px-10 py-5 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl text-lg flex items-center gap-3 mx-auto cursor-pointer">
            Bắt đầu ngay hôm nay <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                <span className="text-lg font-bold text-on-surface">NipponMaster</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">Nền tảng học tiếng Nhật trực tuyến hàng đầu Việt Nam. Chinh phục JLPT cùng phương pháp SRS thông minh.</p>
            </div>
            {[
              { title: 'Sản phẩm', links: ['Lộ trình N5-N1', 'Thi thử JLPT', 'Flashcard SRS', 'Ngữ pháp'] },
              { title: 'Hỗ trợ', links: ['Trung tâm trợ giúp', 'Liên hệ', 'Câu hỏi thường gặp', 'Blog'] },
              { title: 'Pháp lý', links: ['Điều khoản dịch vụ', 'Chính sách bảo mật', 'Cookie Policy', 'Giấy phép'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold text-on-surface text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-on-surface-variant">© 2026 NipponMaster. All rights reserved.</p>
            <p className="text-xs text-on-surface-variant">Thiết kế với ❤️ tại Việt Nam 🇻🇳</p>
          </div>
        </div>
      </footer>
    </div>
  );
}