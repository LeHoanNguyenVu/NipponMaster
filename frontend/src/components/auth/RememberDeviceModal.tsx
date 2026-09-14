import { useState } from 'react';
import { ShieldCheck, Laptop, Check, X } from 'lucide-react';

interface RememberDeviceModalProps {
  isOpen: boolean;
  userEmail?: string;
  userName?: string;
  avatarUrl?: string;
  provider?: 'GOOGLE' | 'FACEBOOK';
  onConfirm: (remember: boolean) => void;
}

export default function RememberDeviceModal({
  isOpen,
  userEmail,
  userName,
  avatarUrl,
  provider = 'GOOGLE',
  onConfirm,
}: RememberDeviceModalProps) {
  const [imgError, setImgError] = useState(false);

  if (!isOpen) return null;

  const initialLetter = (userName || userEmail || 'U').trim()[0].toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative overflow-hidden text-center transform animate-scale-up">
        {/* Glow decoration */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Icon */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
          <Laptop size={32} />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-md">
            <ShieldCheck size={14} />
          </div>
        </div>

        {/* User preview badge */}
        {(userName || userEmail) && (
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/40 mb-4 max-w-full shadow-xs">
            {avatarUrl && !imgError ? (
              <img
                src={avatarUrl}
                alt={userName || 'User'}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={() => setImgError(true)}
                className="w-5 h-5 rounded-full object-cover border border-outline-variant/40"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-primary text-on-primary font-bold text-[10px] flex items-center justify-center shadow-xs">
                {initialLetter}
              </div>
            )}
            <span className="text-xs font-semibold text-on-surface truncate max-w-[200px]">
              {userName || userEmail}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/15 text-primary uppercase tracking-wider">
              {provider}
            </span>
          </div>
        )}

        <h3 className="text-xl font-bold text-on-surface mb-2 font-serif">
          Duy trì đăng nhập trên thiết bị này?
        </h3>

        <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
          Trình duyệt sẽ tự động đăng nhập mỗi khi bạn mở website trên thiết bị này. Phiên đăng nhập an toàn và chỉ bị thu hồi khi bạn chủ động đăng xuất hoặc đăng nhập từ một thiết bị khác.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => onConfirm(true)}
            className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <Check size={16} /> Lưu & Tự động đăng nhập
          </button>

          <button
            type="button"
            onClick={() => onConfirm(false)}
            className="w-full py-2.5 px-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <X size={14} /> Không lưu (Chỉ phiên duyệt này)
          </button>
        </div>
      </div>
    </div>
  );
}
