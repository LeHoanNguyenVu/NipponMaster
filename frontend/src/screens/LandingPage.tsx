import { useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, Brain, Target, PenTool, Star, ChevronRight, GraduationCap, Award, Users, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  onNavigateAuth: () => void;
}

export default function LandingPage({ onNavigateAuth }: LandingPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.fromTo('.hero-text', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3 });
      // Feature cards stagger
      gsap.fromTo('.feature-card', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.features-section', start: 'top 80%' }});
      // Philosophy section
      gsap.fromTo('.philosophy-text', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.philosophy-section', start: 'top 75%' }});
      // CTA section
      gsap.fromTo('.cta-content', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.cta-section', start: 'top 80%' }});
    }, pageRef);

    // Marquee infinite scroll
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
      {/* ===== SECTION 1: HEADER ===== */}
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

      {/* ===== SECTION 2: HERO ===== */}
      <section className="relative pt-24 pb-16 min-h-[92vh] flex items-center overflow-hidden bg-surface">
        {/* Koi background covers the entire section */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-koi-horizontal.png" 
            alt="Đàn cá Koi Nhật Bản" 
            className="w-full h-full object-cover" 
          />
          {/* Smooth gradients to make text legible and fade into surface color */}
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
            {/* Stats row */}
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

      {/* ===== SECTION 3: FEATURES — LUYỆN THI ===== */}
      <section id="features" className="features-section py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
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

      {/* ===== SECTION 4: LUYỆN NGỮ PHÁP ===== */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Lộ trình toàn diện</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-on-surface mt-4 mb-6">Từ N5 đến N1<br/><span className="text-primary italic font-light">trong tầm tay bạn</span></h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">Mỗi cấp độ JLPT được chia thành các module nhỏ, dễ tiêu hóa. Bạn sẽ luôn biết mình đang ở đâu và cần làm gì tiếp theo.</p>
              <div className="space-y-4">
                {[
                  { level: 'N5', label: 'Nhập môn', desc: '800 từ vựng · 100 Kanji · Ngữ pháp cơ bản', icon: GraduationCap },
                  { level: 'N4', label: 'Sơ cấp', desc: '1,500 từ · 300 Kanji · Hội thoại hàng ngày', icon: BookOpen },
                  { level: 'N3', label: 'Trung cấp', desc: '3,500 từ · 650 Kanji · Đọc hiểu văn bản', icon: Award },
                  { level: 'N2', label: 'Trung cao cấp', desc: '6,000 từ · 1,000 Kanji · Tin tức & báo chí', icon: Target },
                  { level: 'N1', label: 'Cao cấp', desc: '10,000+ từ · 2,000 Kanji · Văn học & học thuật', icon: Star },
                ].map((l, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant/50 hover:border-primary/30 hover:bg-primary/3 transition-all group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-all">{l.level}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-on-surface text-sm">{l.label}</div>
                      <div className="text-xs text-on-surface-variant truncate">{l.desc}</div>
                    </div>
                    <ChevronRight size={16} className="text-outline shrink-0 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            {/* Stats / visual */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: Users, val: '50,000+', label: 'Học viên đang học', color: 'text-primary' },
                { icon: BookOpen, val: '2,500+', label: 'Bài học có sẵn', color: 'text-secondary' },
                { icon: Award, val: '12,000+', label: 'Chứng chỉ đạt được', color: 'text-tertiary' },
                { icon: Clock, val: '500,000+', label: 'Giờ học tích lũy', color: 'text-error' },
              ].map((s, i) => (
                <div key={i} className="feature-card bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm text-center hover:shadow-md transition-all">
                  <s.icon size={28} className={`mx-auto mb-3 ${s.color}`} />
                  <div className="text-3xl font-bold text-on-surface mb-1">{s.val}</div>
                  <div className="text-xs text-on-surface-variant font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: TRIẾT LÝ HỌC TẬP ===== */}
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

      {/* ===== SECTION 6: TIẾNG NÓI CỘNG ĐỒNG (Marquee) ===== */}
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

      {/* ===== SECTION 7A: CTA ===== */}
      <section className="cta-section py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center cta-content">
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

      {/* ===== SECTION 7B: FOOTER ===== */}
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
