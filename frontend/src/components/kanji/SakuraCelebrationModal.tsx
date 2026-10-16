import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, ArrowRight, CheckCircle2, Trophy } from 'lucide-react';

interface SakuraCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  correctCount: number;
  totalQuestions: number;
  currentChapterNumber: number;
  currentChapterTitle?: string;
  nextChapterId?: number | null;
  nextChapterNumber?: number | null;
  nextChapterTitle?: string | null;
  onContinueToNextChapter?: (nextId: number) => void;
}

export default function SakuraCelebrationModal({
  isOpen,
  onClose,
  score,
  correctCount,
  totalQuestions,
  currentChapterNumber,
  currentChapterTitle,
  nextChapterId,
  nextChapterNumber,
  nextChapterTitle,
  onContinueToNextChapter,
}: SakuraCelebrationModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Khóa cuộn trang khi mở modal
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Hỗ trợ phím ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 🔔 Âm thanh chúc mừng nhẹ nhàng chuẩn phong cách Nhật (Web Audio API Chime)
  useEffect(() => {
    if (!isOpen) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Hợp âm chúc mừng)
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.1 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 1.3);
      });
    } catch {
      // Bỏ qua nếu trình duyệt chặn autoplay audio
    }
  }, [isOpen]);

  // 🌸 Canvas Sakura Petals Animation
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 🌸 70 cánh hoa anh đào với màu sắc đa dạng phân bố ngay từ đầu trên toàn bộ màn hình
    const petalCount = 70;
    const petalColors = ['#ffccd5', '#ffb3c1', '#ff8fab', '#fb7185', '#ffe4e6'];
    
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      // Phân bổ đều từ trên xuống dưới để cánh hoa rơi ngay lập tức khi modal bật ra
      y: Math.random() * (height + 100) - 50,
      size: Math.random() * 10 + 8,
      speedX: Math.random() * 2.0 + 0.8,
      speedY: Math.random() * 1.6 + 1.2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 3,
      opacity: Math.random() * 0.45 + 0.55,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.03 + 0.015,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(tick * p.swaySpeed + p.swayOffset) * 1.5;
        p.rotation += p.rotationSpeed;

        // Vòng lặp liên tục khi bay khỏi khung nhìn
        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x > width + 30) {
          p.x = -30;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        // Vẽ hình cánh hoa anh đào với đường cong Bezier kép uốn lượn
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size, -p.size / 2, -p.size * 0.8, p.size, 0, p.size * 1.4);
        ctx.bezierCurveTo(p.size * 0.8, p.size, p.size, -p.size / 2, 0, 0);
        ctx.fill();

        // Gân cánh hoa mờ nhẹ tạo độ chân thực
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, p.size * 0.2);
        ctx.lineTo(0, p.size * 1.0);
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 select-none font-serif">
      {/* Định nghĩa CSS Keyframe Animation Nảy Ra (Spring Pop-in Bounce) */}
      <style>{`
        @keyframes celebrationSpringBounce {
          0% {
            opacity: 0;
            transform: scale(0.2) translateY(80px) rotate(-4deg);
          }
          45% {
            opacity: 1;
            transform: scale(1.14) translateY(-14px) rotate(1.5deg);
          }
          65% {
            transform: scale(0.95) translateY(6px) rotate(-1deg);
          }
          82% {
            transform: scale(1.03) translateY(-2px) rotate(0.5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0) rotate(0deg);
          }
        }
        @keyframes trophyGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.6));
            transform: scale(1) rotate(0deg);
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(234, 88, 12, 0.9));
            transform: scale(1.15) rotate(6deg);
          }
        }
        @keyframes stampPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
      `}</style>

      {/* 1. Backdrop làm mờ sâu */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-[#1c1917]/75 backdrop-blur-md transition-opacity duration-300" 
      />

      {/* 2. Canvas Cánh Hoa Anh Đào (Z-30: Rơi cả trước và sau khung hình để tạo chiều sâu 3D) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-30 w-full h-full" 
      />

      {/* 3. Khung Pop-up có hiệu ứng NẢY RA (Bouncy Spring) */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative z-20 w-full max-w-lg bg-gradient-to-b from-[#fffaf7] via-[#fff] to-[#faf7f2] border-2 border-[#b91c1c]/50 p-6 sm:p-8 text-center"
        style={{
          animation: 'celebrationSpringBounce 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          boxShadow: '0 25px 70px -15px rgba(185, 28, 28, 0.4), 0 0 50px rgba(254, 205, 211, 0.6)',
          borderRadius: '4px',
        }}
      >
        {/* Nút đóng góc phải */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#78716c] hover:text-[#b91c1c] hover:bg-[#fee2e2] transition-colors rounded-none cursor-pointer"
          title="Đóng thông báo"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Traditional Japanese Stamp / Badge */}
        <div className="flex justify-center mb-3">
          <div 
            style={{ animation: 'stampPulse 2s ease-in-out infinite' }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#b91c1c]/10 border border-[#b91c1c]/30 text-[#b91c1c] text-xs font-mono font-black uppercase tracking-widest shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-[#b91c1c]" />
            <span>🌸 合格 · VƯỢT QUA BÀI TEST CHƯƠNG</span>
            <span className="text-sm">🌸</span>
          </div>
        </div>

        {/* Tiêu đề chính */}
        <h2 className="text-2xl sm:text-3xl font-black text-[#1c1917] tracking-tight">
          Chúc Mừng Bạn Đã Pass!
        </h2>
        <p className="text-xs sm:text-sm text-[#78716c] mt-1 font-sans">
          Chương {currentChapterNumber}: {currentChapterTitle || 'Ôn tập chữ Hán'}
        </p>

        {/* Khung Điểm Số Lớn */}
        <div className="my-5 py-4 px-6 bg-gradient-to-br from-[#fef2f2] via-[#fff] to-[#fff7ed] border border-[#fecaca] shadow-xs">
          <div className="flex items-center justify-center gap-4">
            <Trophy 
              style={{ animation: 'trophyGlow 2s ease-in-out infinite' }}
              className="w-10 h-10 text-[#ea580c]" 
            />
            <div className="text-5xl sm:text-6xl font-black text-[#b91c1c] font-mono tracking-tight drop-shadow-sm">
              {score}%
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-2 text-xs font-mono font-bold text-[#15803d]">
            <CheckCircle2 className="w-4 h-4 text-[#15803d]" />
            <span>Đúng {correctCount}/{totalQuestions} câu (Đạt chuẩn xuất sắc ≥ 85%)</span>
          </div>
        </div>

        {/* Khung Thông Báo Mở Khóa Chương Kế Tiếp */}
        {nextChapterNumber ? (
          <div className="p-4 bg-[#f0fdf4] border border-[#bbf7d0] text-left mb-6 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#15803d] uppercase tracking-wider mb-1 font-mono">
              <span className="text-base animate-pulse">🔓</span>
              <span>HỆ THỐNG ĐÃ MỞ KHÓA THÀNH CÔNG:</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-[#14532d]">
              Chương {nextChapterNumber}: {nextChapterTitle || `Chương ${nextChapterNumber}`}
            </p>
            <p className="text-xs text-[#166534] mt-0.5 font-sans">
              Toàn bộ chữ Hán, câu ngữ cảnh và minigame của chương tiếp theo đã sẵn sàng để bạn tiếp tục khám phá!
            </p>
          </div>
        ) : (
          <div className="p-4 bg-[#fefce8] border border-[#fef08a] text-left mb-6 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#854d0e] uppercase tracking-wider mb-1 font-mono">
              <span className="text-base">👑</span>
              <span>XUẤT SẮC HOÀN THÀNH:</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-[#713f12]">
              Bạn đã hoàn thành xuất sắc toàn bộ các chương trong cấp độ này!
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5 font-sans">
          {nextChapterId && onContinueToNextChapter ? (
            <button
              onClick={() => {
                onContinueToNextChapter(nextChapterId);
                onClose();
              }}
              className="w-full py-3 px-5 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg rounded-none hover:scale-[1.01]"
            >
              <span>Vào học Chương {nextChapterNumber} ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : null}

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-white hover:bg-[#fafaf9] text-[#44403c] border border-[#e7e5e4] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-none"
          >
            Xem lại chi tiết bài kiểm tra
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
