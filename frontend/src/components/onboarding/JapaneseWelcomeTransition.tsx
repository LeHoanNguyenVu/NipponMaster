import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { JlptLevel } from '../../api/placementApi';

interface JapaneseWelcomeTransitionProps {
  level: JlptLevel | string;
  userName?: string;
  onComplete: () => void;
}

const LEVEL_LABELS: Record<string, { name: string; kanji: string; color: string; desc: string }> = {
  STARTER: { name: 'Tiếng Nhật Nhập Môn', kanji: '入門', color: '#10b981', desc: '50 Bảng chữ cái, Aisatsu & Bộ thủ sơ cấp' },
  N5: { name: 'JLPT N5 (Sơ Cấp 1)', kanji: '五級', color: '#3b82f6', desc: 'Từ vựng căn bản & Ngữ pháp giao tiếp sơ cấp' },
  N4: { name: 'JLPT N4 (Sơ Cấp 2)', kanji: '四級', color: '#06b6d4', desc: 'Mở rộng giao tiếp & Kỹ năng hội thoại đời sống' },
  N3: { name: 'JLPT N3 (Trung Cấp)', kanji: '三級', color: '#f59e0b', desc: 'Luyện đề đọc hiểu, Kanji trung cấp & Ngữ cảnh tự nhiên' },
  N2: { name: 'JLPT N2 (Thượng Cấp)', kanji: '二級', color: '#ef4444', desc: 'Tiếng Nhật thương mại & Tin tức chuyên sâu' },
  N1: { name: 'JLPT N1 (Cao Cấp)', kanji: '一級', color: '#8b5cf6', desc: 'Đỉnh cao ngôn ngữ, dịch thuật & Học thuật' },
};

export default function JapaneseWelcomeTransition({
  level,
  userName = 'bạn',
  onComplete,
}: JapaneseWelcomeTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const levelInfo = LEVEL_LABELS[level] || LEVEL_LABELS.N5;

  // 🌸 Canvas Sakura Petals Animation
  useEffect(() => {
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

    // Create 45 sakura petals
    const petalCount = 45;
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 6,
      speedX: Math.random() * 1.5 + 0.5,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.5 + 0.4,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? '#ffccd5' : '#ffb3c1',
    }));

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(tick * p.swaySpeed + p.swayOffset) * 0.8;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) {
          p.x = -20;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        // Draw petal shape
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size, -p.size / 2, -p.size, p.size, 0, p.size * 1.3);
        ctx.bezierCurveTo(p.size, p.size, p.size, -p.size / 2, 0, 0);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ⏳ Progressive Loading Simulation (5.0s total)
  useEffect(() => {
    const duration = 5000; // ms (5 seconds)
    const intervalTime = 40;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProg = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProg);

      if (nextProg >= 100) {
        clearInterval(timer);
        setIsFinished(true);

        // 🎉 Trigger celebration Japanese confetti burst
        try {
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#c01538', '#ff758f', '#ffd6e0', '#f59e0b', '#ffffff'],
            disableForReducedMotion: true,
          });
        } catch {
          // ignore
        }

        // Trigger gentle fade out exit
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 450);
        }, 1200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleSkipClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 350);
  };

  // Status message based on progress
  const getStatusMessage = () => {
    if (progress < 25) return '🌸 Đang phân tích năng lực & lưu kết quả đánh giá...';
    if (progress < 55) return `⛩️ Thiết lập lộ trình cá nhân hóa trình độ ${levelInfo.name}...`;
    if (progress < 85) return '📚 Tải kho học liệu từ vựng, ngữ pháp & thẻ nhớ SRS mục tiêu...';
    return `✨ Sẵn sàng! Chúc ${userName} có những giờ học bổ ích tại NipponMaster!`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1.02 : 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(135deg, #1b1214 0%, #28171b 50%, #150b0e 100%)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: '"Plus Jakarta Sans", "Noto Sans JP", sans-serif',
      }}
    >
      {/* Background Sakura Petals Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Decorative Rising Sun / Hinomaru Radiant Halo */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 550,
          height: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192, 21, 56, 0.28) 0%, rgba(192, 21, 56, 0.08) 50%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 580,
          width: '100%',
          background: 'rgba(32, 20, 24, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 28,
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Top Japanese Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 99,
            background: 'rgba(192, 21, 56, 0.22)',
            border: '1px solid rgba(244, 114, 182, 0.4)',
            color: '#fbcfe8',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginBottom: 24,
          }}
        >
          <span>🌸 ようこそ · NIPPONMASTER 🌸</span>
        </motion.div>

        {/* Torii Gate & Kanji Crest */}
        <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto 20px' }}>
          {/* Subtle spinning glow ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: -6,
              borderRadius: '50%',
              border: '2px dashed rgba(244, 114, 182, 0.3)',
            }}
          />

          {/* Crest Disc */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c01538 0%, #830e26 100%)',
              border: '3px solid rgba(255, 255, 255, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(192, 21, 56, 0.45)',
            }}
          >
            <span style={{ fontSize: 32, fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
              {levelInfo.kanji}
            </span>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#ffd6e0', letterSpacing: '0.08em', marginTop: 2 }}>
              {level === 'STARTER' ? 'START' : level}
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: 8,
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
          }}
        >
          Chào mừng, <span style={{ color: '#ff758f' }}>{userName}</span>! 🎌
        </h1>

        <p
          style={{
            fontSize: 14,
            color: '#d1c7c9',
            lineHeight: 1.6,
            marginBottom: 28,
          }}
        >
          Hệ thống đang chuẩn bị giáo trình <b>{levelInfo.name}</b> dành riêng cho bạn.
        </p>

        {/* Level Highlight Pill */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 16,
            padding: '12px 18px',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'left',
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Trình độ mục tiêu
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f3f4f6', marginTop: 2 }}>
              {levelInfo.name}
            </div>
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: 8,
              background: `${levelInfo.color}25`,
              color: levelInfo.color,
              border: `1px solid ${levelInfo.color}50`,
            }}
          >
            {levelInfo.desc}
          </span>
        </div>

        {/* Progress Bar Container */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#fbcfe8', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <span>Tiến trình khởi tạo</span>
            </span>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#ffffff', fontFamily: 'monospace' }}>
              {progress}%
            </span>
          </div>

          {/* Progress Bar Track */}
          <div
            style={{
              height: 10,
              width: '100%',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 99,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #c01538 0%, #f43f5e 50%, #f59e0b 100%)',
                borderRadius: 99,
                boxShadow: '0 0 12px rgba(244, 63, 94, 0.6)',
                transition: 'width 0.1s ease-out',
              }}
            />
          </div>
        </div>

        {/* Status Dynamic Message */}
        <div style={{ minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={getStatusMessage()}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: 13,
                color: isFinished ? '#a7f3d0' : '#e5e7eb',
                fontWeight: 600,
                margin: 0,
              }}
            >
              {getStatusMessage()}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Skip Button (Bottom Right) */}
      <button
        id="welcome-skip-btn"
        type="button"
        onClick={handleSkipClick}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          zIndex: 20,
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 12,
          padding: '8px 16px',
          color: '#d1d5db',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          backdropFilter: 'blur(8px)',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.18)';
          (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.08)';
          (e.currentTarget as HTMLButtonElement).style.color = '#d1d5db';
        }}
      >
        <span>Bỏ qua & Vào học ngay</span>
        <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}
