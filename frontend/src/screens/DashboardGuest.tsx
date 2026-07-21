import { useEffect, useRef } from 'react';
import { Sparkles, Languages, Shapes, BookOpen, UserCheck, GraduationCap, Compass } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/useAuthStore';
import gsap from 'gsap';

export default function DashboardGuest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { changeUserRole, user } = useAuthStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entry animation
      gsap.fromTo('.gsap-fade-in',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
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
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 gsap-fade-in">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/8 text-secondary rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass size={14} className="animate-pulse" />
            Khách tham quan
          </div>
          <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tight">
            Chào mừng bạn đến với NipponMaster, {user?.username || 'Bạn'}!
          </h1>
          <p className="text-lg text-on-surface-variant">
            Hãy khám phá các tính năng của nền tảng học tiếng Nhật thông minh AI trước khi bắt đầu hành trình.
          </p>
        </div>
      </header>

      {/* JLPT Placement Test CTA Banner */}
      <div
        className="gsap-fade-in"
        style={{
          background: 'linear-gradient(135deg, #c01538 0%, #9f1239 100%)',
          borderRadius: 20, padding: '24px 28px',
          display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
          boxShadow: '0 8px 32px rgba(192,21,56,0.25)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', right: -30, top: -30,
          width: 140, height: 140, background: 'rgba(255,255,255,0.06)',
          borderRadius: '50%',
        }} />
        <div style={{ fontSize: 44, flexShrink: 0 }}>📝</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 18, marginBottom: 6 }}>
            Kiểm Tra Trình Độ Tiếng Nhật Miễn Phí Ngay!
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Làm bài thi thử chuẩn JLPT (N5–N1), nhận đánh giá năng lực chi tiết và lộ trình học tập cá nhân hóa trong vài phút.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
          <a
            id="guest-placement-test-cta"
            href="#/auth"
            style={{
              padding: '11px 22px', borderRadius: 12,
              background: '#fff', color: '#c01538',
              fontWeight: 700, fontSize: 14,
              textDecoration: 'none', display: 'inline-block',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
          >
            🎌 Đăng ký & Thi thử ngay
          </a>
        </div>
      </div>

      {/* CTA Box (Role Upgrading) */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-surface-container-lowest rounded-3xl p-8 md:p-10 border border-primary/20 shadow-lg relative overflow-hidden gsap-fade-in">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/8 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-secondary/8 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary animate-bounce" size={24} />
            <h2 className="text-2xl font-bold text-on-surface">Bạn đã sẵn sàng để nâng cấp trải nghiệm học tập?</h2>
          </div>
          <p className="text-base text-on-surface-variant leading-relaxed">
            Chọn vai trò phù hợp với bạn để mở khóa toàn bộ sức mạnh của NipponMaster. Học viên sẽ được ôn tập SRS cá nhân hóa, trong khi Giảng viên có thể biên soạn và phân phối bài học.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              id="upgrade-to-student-btn"
              onClick={() => changeUserRole('student')}
              variant="primary"
              size="lg"
              icon={<UserCheck size={20} />}
            >
              Trở thành Học viên (Student)
            </Button>
            <Button
              id="upgrade-to-teacher-btn"
              onClick={() => changeUserRole('teacher')}
              variant="secondary"
              size="lg"
              icon={<GraduationCap size={20} />}
            >
              Trở thành Giảng viên (Teacher)
            </Button>
          </div>
        </div>
      </div>

      {/* Key features grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-on-surface gsap-fade-in">Khám phá các phân hệ học tập</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Từ vựng thông minh N5-N1',
              desc: 'Học từ vựng qua lưới thẻ grid bất đối xứng trực quan, hỗ trợ tra cứu chi tiết, âm đọc bản xứ và ví dụ sinh động.',
              icon: Languages,
              color: 'text-primary bg-primary/8'
            },
            {
              title: 'Hán tự trực quan & nét vẽ',
              desc: 'Luyện chữ Kanji theo cấp độ bộ thủ, học âm On/Kun và tra cứu nghĩa Việt ngữ chính xác.',
              icon: Shapes,
              color: 'text-tertiary bg-tertiary/8'
            },
            {
              title: 'Thư viện cấu trúc ngữ pháp',
              desc: 'Tổng hợp hàng trăm cấu trúc câu N5 thực tế với các trợ từ, cách dùng và chú thích chi tiết cho người tự học.',
              icon: BookOpen,
              color: 'text-secondary bg-secondary/8'
            }
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm flex flex-col gap-4 gsap-fade-in gsap-hover-card">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-on-surface mb-2">{feature.title}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
