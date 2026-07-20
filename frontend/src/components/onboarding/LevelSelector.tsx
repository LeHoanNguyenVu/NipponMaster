import { JlptLevel } from '../../api/placementApi';

interface LevelSelectorProps {
  onSelect: (level: JlptLevel) => void;
  isLoading: boolean;
}

const LEVELS: { level: JlptLevel; label: string; desc: string; vocab: string; time: string; color: string; badge: string }[] = [
  { level: 'N5', label: 'N5 — Cơ Bản', desc: 'Giao tiếp hàng ngày đơn giản', vocab: '800 từ vựng', time: '~150 giờ', color: '#2b5f43', badge: '🟢' },
  { level: 'N4', label: 'N4 — Sơ Cấp', desc: 'Hiểu hội thoại quen thuộc', vocab: '1,500 từ vựng', time: '~300 giờ', color: '#1d6b9b', badge: '🔵' },
  { level: 'N3', label: 'N3 — Trung Cấp', desc: 'Đọc hiểu tình huống thực tế', vocab: '3,750 từ vựng', time: '~450 giờ', color: '#7c5c2e', badge: '🟡' },
  { level: 'N2', label: 'N2 — Cao Cấp', desc: 'Hiểu văn bản phức tạp, báo chí', vocab: '6,000 từ vựng', time: '~600 giờ', color: '#8b1a1a', badge: '🟠' },
  { level: 'N1', label: 'N1 — Thượng Thừa', desc: 'Đọc văn học, tài liệu học thuật', vocab: '10,000+ từ vựng', time: '~900 giờ', color: '#5a1a7a', badge: '🔴' },
];

export default function LevelSelector({ onSelect, isLoading }: LevelSelectorProps) {
  return (
    <div>
      <h2 style={{ fontFamily: 'Geist, sans-serif', fontSize: 20, fontWeight: 600, color: '#231815', marginBottom: 8 }}>
        Chọn trình độ phù hợp với bạn
      </h2>
      <p style={{ color: '#5a5450', fontSize: 14, marginBottom: 24 }}>
        Bạn đã học tiếng Nhật trước đây? Hãy chọn cấp độ bạn tự tin nhất.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {LEVELS.map(({ level, label, desc, vocab, time, color, badge }) => (
          <button
            key={level}
            id={`level-select-${level}`}
            disabled={isLoading}
            onClick={() => onSelect(level)}
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '16px 20px', borderRadius: 14, cursor: 'pointer',
              border: `2px solid ${color}22`, background: `${color}08`,
              textAlign: 'left', transition: 'all 0.18s ease',
              opacity: isLoading ? 0.6 : 1,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = `${color}14`;
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${color}66`;
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateX(4px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = `${color}08`;
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${color}22`;
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateX(0)';
            }}
          >
            <span style={{ fontSize: 28 }}>{badge}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#231815' }}>{label}</div>
              <div style={{ fontSize: 13, color: '#5a5450', marginTop: 2 }}>{desc}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color, background: `${color}15`, padding: '2px 10px', borderRadius: 99 }}>{vocab}</div>
              <div style={{ fontSize: 11, color: '#8c827b', marginTop: 4 }}>{time}</div>
            </div>
            <span style={{ color, fontSize: 18, marginLeft: 4 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
