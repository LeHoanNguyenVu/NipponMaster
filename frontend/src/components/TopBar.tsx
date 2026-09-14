import { useState, useRef, useEffect } from 'react';
import { 
  Search, Bell, Menu, LogOut, Check, 
  Palette, Shield, Key, CreditCard, Camera, Upload,
  X, CheckCircle, AlertCircle, Laptop,
  Lock
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore, THEME_CATALOG } from '../store/useThemeStore';
import { useNotificationStore, type NotificationItem } from '../store/useNotificationStore';
import type { ScreenType } from '../App';

interface TopBarProps {
  onToggleSidebar?: () => void;
  onNavigate?: (screen: ScreenType) => void;
}

// Preset Avatars: Japanese Landscapes & Animals (100% Verified URLs)
const PRESET_AVATARS = [
  { 
    id: 'fuji', 
    name: 'Núi Phú Sĩ 🗻', 
    url: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=200&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'shrine', 
    name: 'Phố Cổ Kyoto ⛩️', 
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'sakura', 
    name: 'Hoa Anh Đào 🌸', 
    url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=200&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'shiba', 
    name: 'Chó Shiba Inu 🐕', 
    url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'cat', 
    name: 'Mèo Maneki Neko 🐱', 
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'deer', 
    name: 'Hươu Thần Nara 🦌', 
    url: 'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?w=200&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'koi', 
    name: 'Cá Chép Koi 🐟', 
    url: 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=200&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'castle', 
    name: 'Lâu Đài Himeji 🏯', 
    url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=200&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'monkey', 
    name: 'Khỉ Tuyết Onsen 🐒', 
    url: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=200&auto=format&fit=crop&q=80' 
  },
];

export default function TopBar({ onToggleSidebar, onNavigate }: TopBarProps) {
  const { user, logout, updateUserAvatar, changePassword } = useAuthStore();
  const { activeTheme, setTheme } = useThemeStore();
  const { notifications, readIds, markAsRead, markAllAsRead } = useNotificationStore();

  // Active Dropdowns & Modals
  const [activeDropdown, setActiveDropdown] = useState<'notifications' | 'avatar' | null>(null);
  const [activeModal, setActiveModal] = useState<'avatar' | 'password' | 'deposit' | 'theme' | 'security' | null>(null);

  const [imgError, setImgError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Avatar Modal State
  const [avatarSuccessMsg, setAvatarSuccessMsg] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Change Password Form State
  const [currentPass, setCurrentPass] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [isSubmittingPass, setIsSubmittingPass] = useState<boolean>(false);
  const [passStatus, setPassStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleNotificationClick = (item: NotificationItem) => {
    markAsRead(item.id);
    if (item.screen && onNavigate) {
      onNavigate(item.screen);
    }
    setActiveDropdown(null);
  };

  const unreadCount = notifications.filter((n) => !readIds.includes(n.id)).length;

  // Close dropdowns on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setActiveModal(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const userAvatar = user?.avatarUrl || (user?.email ? localStorage.getItem(`user_avatar_${user.email}`) : null) || (user?.id ? localStorage.getItem(`user_avatar_${user.id}`) : null) || localStorage.getItem('user_avatar_global');

  useEffect(() => {
    setImgError(false);
  }, [userAvatar, user?.avatarUrl]);

  const currentLevel = user?.jlptLevel || user?.targetLevel || 'N5';
  const levelDisplay = currentLevel === 'STARTER' ? 'Nhập Môn' : `${currentLevel} Level`;
  const initialLetter = (user?.username || user?.email || 'U').trim()[0].toUpperCase();

  const getLevelBadgeColor = (lvl: string) => {
    switch (lvl.toUpperCase()) {
      case 'N5':
      case 'STARTER':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
      case 'N4':
        return 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30';
      case 'N3':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30';
      case 'N2':
        return 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30';
      case 'N1':
        return 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30';
      default:
        return 'bg-primary/15 text-primary border-primary/30';
    }
  };

  // Handler: Select Preset Avatar
  const handleSelectPresetAvatar = async (url: string) => {
    try {
      await updateUserAvatar(url);
      setImgError(false);
      setAvatarSuccessMsg('Đã cập nhật ảnh đại diện thành công!');
      setTimeout(() => {
        setAvatarSuccessMsg(null);
        setActiveModal(null);
      }, 1200);
    } catch (e) {
      console.error(e);
    }
  };

  // Handler: Upload Avatar from Computer
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Dung lượng ảnh tối đa là 5MB. Vui lòng chọn ảnh nhỏ hơn.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Url = reader.result as string;
        await updateUserAvatar(base64Url);
        setImgError(false);
        setAvatarSuccessMsg('Tải ảnh đại diện lên thành công!');
        setTimeout(() => {
          setAvatarSuccessMsg(null);
          setActiveModal(null);
          setIsUploading(false);
        }, 1200);
      } catch (err) {
        console.error(err);
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert('Có lỗi khi đọc file hình ảnh.');
    };
    reader.readAsDataURL(file);
  };

  // Handler: Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass || !confirmPass) {
      setPassStatus({ type: 'error', message: 'Vui lòng nhập đầy đủ các trường thông tin.' });
      return;
    }
    if (newPass.length < 6) {
      setPassStatus({ type: 'error', message: 'Mật khẩu mới phải có tối thiểu 6 ký tự.' });
      return;
    }
    if (newPass !== confirmPass) {
      setPassStatus({ type: 'error', message: 'Mật khẩu xác nhận không khớp với mật khẩu mới.' });
      return;
    }

    setIsSubmittingPass(true);
    setPassStatus({ type: 'idle', message: '' });

    try {
      await changePassword(currentPass, newPass, confirmPass);
      setPassStatus({ 
        type: 'success', 
        message: 'Đổi mật khẩu thành công! Bạn có thể đăng nhập bằng mật khẩu mới này.' 
      });
      setTimeout(() => {
        setPassStatus({ type: 'idle', message: '' });
        setCurrentPass('');
        setNewPass('');
        setConfirmPass('');
        setActiveModal(null);
        setIsSubmittingPass(false);
      }, 1800);
    } catch (err: any) {
      setIsSubmittingPass(false);
      setPassStatus({ 
        type: 'error', 
        message: err.message || 'Mật khẩu hiện tại không chính xác. Vui lòng kiểm tra lại.' 
      });
    }
  };

  return (
    <>
      <header ref={containerRef} className="h-16 flex-shrink-0 bg-surface-container-lowest border-b border-outline-variant/40 flex items-center justify-between px-4 md:px-6 relative z-30">
        {/* Left Area: Search & Mobile Menu Button */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={onToggleSidebar}
              aria-label="Open menu"
              className="p-1.5 -ml-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <Menu size={22} />
            </button>
            <span className="text-lg font-bold text-primary tracking-tight font-serif">NipponMaster</span>
          </div>
          <div className="hidden md:flex relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" size={16} />
            <input
              type="text"
              placeholder="Tìm kiếm từ vựng, ngữ pháp, kanji N5-N1..."
              aria-label="Search database"
              className="w-full bg-surface-container-low border border-outline-variant/60 rounded-full py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface placeholder:text-outline"
            />
          </div>
        </div>

        {/* Right Area: Status Badge, Notifications, User Avatar */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* 1. JLPT Level Badge (Clean static badge, non-clickable) */}
          <div 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border select-none transition-all shadow-2xs ${getLevelBadgeColor(currentLevel)}`}
            title={`Trình độ JLPT hiện tại: ${levelDisplay}`}
          >
            <span className="w-2 h-2 rounded-full bg-current" />
            <span>{levelDisplay}</span>
          </div>

          {/* 2. Notifications Icon & Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? null : 'notifications')}
              aria-label="Notifications"
              className={`p-2 rounded-xl border transition-all cursor-pointer relative ${
                activeDropdown === 'notifications'
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-surface-container-low border-outline-variant/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {activeDropdown === 'notifications' && (
              <div className="absolute right-0 mt-2 w-80 md:w-96 bg-surface-container-lowest border border-outline-variant/60 rounded-3xl shadow-2xl p-4 space-y-3 z-50 animate-scale-up">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/40">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Thông Báo</h4>
                    {unreadCount > 0 ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600">
                        {unreadCount} mới
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-outline">Đã đọc tất cả</span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[11px] font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Check size={12} /> Đã đọc tất cả
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto no-scrollbar">
                  {notifications.map((item) => {
                    const isRead = readIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleNotificationClick(item)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isRead
                            ? 'bg-surface-container-low/40 border-outline-variant/30 text-outline opacity-70'
                            : 'bg-surface-container-low border-primary/25 text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-xs font-bold truncate">{item.title}</p>
                            <span className="text-[10px] text-outline flex-shrink-0">{item.time}</span>
                          </div>
                          <p className="text-[11px] text-on-surface-variant leading-snug line-clamp-2">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 3. User Avatar & System Account Options Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'avatar' ? null : 'avatar')}
              aria-label="User Profile"
              className="w-9 h-9 rounded-xl border border-outline-variant/60 bg-surface-container-low p-0.5 overflow-hidden transition-all hover:scale-105 hover:border-primary/60 cursor-pointer shadow-xs"
            >
              {userAvatar && !imgError ? (
                <img
                  src={userAvatar}
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={() => setImgError(true)}
                  className="w-full h-full rounded-[10px] object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-[10px] bg-primary text-on-primary font-bold text-xs flex items-center justify-center shadow-inner">
                  {initialLetter}
                </div>
              )}
            </button>

            {/* System Account Dropdown */}
            {activeDropdown === 'avatar' && (
              <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest border border-outline-variant/60 rounded-3xl shadow-2xl p-4 space-y-3 z-50 animate-scale-up">
                {/* User Info Header */}
                <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
                  <div className="w-11 h-11 rounded-xl bg-primary text-on-primary font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                    {userAvatar && !imgError ? (
                      <img
                        src={userAvatar}
                        alt="User"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      initialLetter
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-on-surface truncate">
                      {user?.fullName || user?.username || 'Học viên'}
                    </p>
                    <p className="text-[10px] text-outline truncate">{user?.email || 'student@nipponmaster.com'}</p>
                    <span className="inline-block mt-0.5 text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-primary/15 text-primary uppercase tracking-wider">
                      {user?.role || 'STUDENT'}
                    </span>
                  </div>
                </div>

                {/* Account & System Management Options */}
                <div className="space-y-1 pt-1">
                  {/* Option 1: Thay Avatar */}
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      setActiveModal('avatar');
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-surface-container-low text-xs font-semibold text-on-surface flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Camera size={15} className="text-sky-500" />
                    <span>Thay Đổi Ảnh Đại Diện</span>
                  </button>

                  {/* Option 2: Sửa Mật Khẩu */}
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      setActiveModal('password');
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-surface-container-low text-xs font-semibold text-on-surface flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Key size={15} className="text-amber-500" />
                    <span>Đổi Mật Khẩu Tài Khoản</span>
                  </button>

                  {/* Option 3: Chỉnh Theme Màu Sắc */}
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      setActiveModal('theme');
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-surface-container-low text-xs font-semibold text-on-surface flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Palette size={15} className="text-purple-500" />
                      <span>Giao Diện & Chủ Đề (Theme)</span>
                    </div>
                    <span className="text-[10px] font-bold text-primary">
                      {THEME_CATALOG.find((t) => t.id === activeTheme)?.emoji || '🎨'}
                    </span>
                  </button>

                  {/* Option 4: Nạp Tiền & Ví Coins */}
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      setActiveModal('deposit');
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-surface-container-low text-xs font-semibold text-on-surface flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <CreditCard size={15} className="text-emerald-500" />
                      <span>Nạp Tiền & Quản Lý Ví</span>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600">
                      Coins
                    </span>
                  </button>

                  {/* Option 5: Bảo Mật & Phiên Đăng Nhập */}
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      setActiveModal('security');
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-surface-container-low text-xs font-semibold text-on-surface flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Shield size={15} className="text-indigo-500" />
                    <span>Bảo Mật & Thiết Bị</span>
                  </button>
                </div>

                {/* Logout Button */}
                <div className="pt-2 border-t border-outline-variant/40">
                  <button
                    onClick={() => {
                      logout();
                      setActiveDropdown(null);
                    }}
                    className="w-full p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                  >
                    <LogOut size={14} />
                    <span>Đăng Xuất Khỏi Thiết Bị</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MODAL 1: THAY ĐỔI ẢNH ĐẠI DIỆN (PHONG CẢNH / ĐỘNG VẬT & TẢI ẢNH TỪ MÁY) */}
      {/* ========================================================================= */}
      {activeModal === 'avatar' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-scale-up max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2">
                <Camera className="text-primary" size={20} />
                <h3 className="text-base font-bold text-on-surface">Thay Đổi Ảnh Đại Diện</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)} 
                className="p-1 rounded-lg text-outline hover:bg-surface-container cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {avatarSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle size={16} />
                <span>{avatarSuccessMsg}</span>
              </div>
            )}

            {/* Button: Tải Ảnh Lên Từ Máy Tính */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-dashed border-primary/40 text-center space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Upload size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">Tự tải ảnh lên từ máy tính của bạn</p>
                <p className="text-[11px] text-outline mt-0.5">Hỗ trợ PNG, JPG, WEBP (Tối đa 5MB)</p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary/90 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
              >
                <Upload size={14} />
                <span>{isUploading ? 'Đang xử lý ảnh...' : 'Chọn Ảnh Từ Thiết Bị'}</span>
              </button>
            </div>

            {/* Preset Avatars Grid: Japanese Landscapes & Animals */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-outline uppercase tracking-wider">
                  Hoặc Chọn Ảnh Phong Cảnh & Động Vật Nhật Bản
                </label>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {PRESET_AVATARS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectPresetAvatar(item.url)}
                    className="group relative rounded-2xl overflow-hidden border-2 border-outline-variant/40 hover:border-primary transition-all p-1 hover:scale-105 cursor-pointer bg-surface-container-low text-left"
                  >
                    <img 
                      src={item.url} 
                      alt={item.name} 
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      className="w-full h-20 rounded-xl object-cover" 
                    />
                    <span className="block text-[11px] font-semibold text-center mt-1.5 text-on-surface truncate">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ĐỔI MẬT KHẨU TÀI KHOẢN (REAL BACKEND SYNC) */}
      {/* ========================================================================= */}
      {activeModal === 'password' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2">
                <Key className="text-primary" size={20} />
                <h3 className="text-base font-bold text-on-surface">Đổi Mật Khẩu Tài Khoản</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)} 
                className="p-1 rounded-lg text-outline hover:bg-surface-container cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {passStatus.type === 'error' && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{passStatus.message}</span>
              </div>
            )}

            {passStatus.type === 'success' && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle size={16} />
                <span>{passStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  required
                  placeholder="Nhập mật khẩu bạn đang dùng"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary text-on-surface"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface">Mật khẩu mới</label>
                <input
                  type="password"
                  required
                  placeholder="Tối thiểu 6 ký tự"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary text-on-surface"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface">Xác nhận lại mật khẩu mới</label>
                <input
                  type="password"
                  required
                  placeholder="Nhập lại chính xác mật khẩu mới"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary text-on-surface"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2.5 rounded-xl border border-outline-variant text-xs font-bold text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingPass}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isSubmittingPass ? 'Đang cập nhật...' : 'Cập Nhật Mật Khẩu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: GIAO DIỆN & CHỦ ĐỀ MÀU SẮC (THEMES) */}
      {/* ========================================================================= */}
      {activeModal === 'theme' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2">
                <Palette className="text-purple-600" size={20} />
                <h3 className="text-base font-bold text-on-surface">Giao Diện & Chủ Đề Màu Sắc</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)} 
                className="p-1 rounded-lg text-outline hover:bg-surface-container cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-outline uppercase tracking-wider">
                Chọn phong cách màu sắc yêu thích
              </label>
              <div className="grid grid-cols-1 gap-2">
                {THEME_CATALOG.map((theme) => {
                  const isSelected = activeTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setTheme(theme.id)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary/10 border-primary font-bold text-primary shadow-2xs'
                          : 'bg-surface-container-low border-outline-variant/40 hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{theme.emoji}</span>
                        <div>
                          <p className="font-bold text-xs">{theme.name}</p>
                          <p className="text-[10px] text-outline">{theme.description}</p>
                        </div>
                      </div>
                      {isSelected && <Check size={16} className="text-primary flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-colors cursor-pointer shadow-sm"
            >
              Áp Dụng
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: NẠP TIỀN & QUẢN LÝ VÍ COINS */}
      {/* ========================================================================= */}
      {activeModal === 'deposit' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2">
                <CreditCard className="text-emerald-600" size={20} />
                <h3 className="text-base font-bold text-on-surface">Ví Tiền & Nạp Coins</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)} 
                className="p-1 rounded-lg text-outline hover:bg-surface-container cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Current Balance Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent border border-emerald-500/30 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-outline uppercase tracking-wider">Số Dư Khả Dụng</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">250</span>
                  <span className="text-xs font-bold text-on-surface">Coins</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                  Tài khoản Chuẩn
                </span>
              </div>
            </div>

            {/* Deposit Packages */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-outline uppercase tracking-wider">
                  Các Gói Nạp Coins Ưu Đãi
                </label>
                <span className="text-[10px] font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full">
                  Sắp Ra Mắt 🚀
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { price: '50.000đ', coins: '500 Coins', bonus: '+50 Coins' },
                  { price: '100.000đ', coins: '1.200 Coins', bonus: '+200 Coins', hot: true },
                  { price: '200.000đ', coins: '2.600 Coins', bonus: '+600 Coins' },
                ].map((pkg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl border text-center space-y-1 relative bg-surface-container-low ${
                      pkg.hot ? 'border-primary/60 bg-primary/5' : 'border-outline-variant/50'
                    }`}
                  >
                    {pkg.hot && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-extrabold px-2 py-0.2 rounded-full bg-primary text-on-primary">
                        HOT
                      </span>
                    )}
                    <p className="text-xs font-black text-on-surface">{pkg.coins}</p>
                    <p className="text-[11px] font-bold text-primary">{pkg.price}</p>
                    <span className="inline-block text-[9px] font-medium text-emerald-600">{pkg.bonus}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-on-surface-variant leading-relaxed bg-surface-container-low p-3 rounded-xl border border-outline-variant/40">
              💡 Cổng nạp tự động qua <strong>VietQR, MoMo và VNPay</strong> đang được phát triển để phục vụ nạp Coins mua vật phẩm & khóa học.
            </p>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-xs font-bold text-on-surface transition-colors cursor-pointer"
            >
              Đóng Cửa Sổ
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: THÔNG TIN THIẾT BỊ & BẢO MẬT */}
      {/* ========================================================================= */}
      {activeModal === 'security' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2">
                <Shield className="text-indigo-600" size={20} />
                <h3 className="text-base font-bold text-on-surface">Bảo Mật & Thiết Bị</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)} 
                className="p-1 rounded-lg text-outline hover:bg-surface-container cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {/* Session Info */}
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-2">
                <div className="flex items-center gap-2.5 text-xs font-bold text-on-surface">
                  <Laptop size={16} className="text-primary" />
                  <span>Phiên Đăng Nhập Hiện Tại</span>
                </div>
                <div className="text-[11px] text-on-surface-variant space-y-1 pl-6">
                  <p>• Trình duyệt: {navigator.userAgent.includes('Chrome') ? 'Google Chrome' : 'Web Browser'}</p>
                  <p>• Hệ điều hành: {navigator.platform || 'Windows / macOS'}</p>
                  <p>• Trạng thái token: <span className="text-emerald-600 font-bold">JWT Hoạt Động (24 giờ)</span></p>
                </div>
              </div>

              {/* Security Status */}
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-2">
                <div className="flex items-center gap-2.5 text-xs font-bold text-on-surface">
                  <Lock size={16} className="text-emerald-600" />
                  <span>Xác Thực Tài Khoản</span>
                </div>
                <p className="text-[11px] text-on-surface-variant pl-6">
                  Email đăng ký: <strong>{user?.email || 'Chưa cập nhật'}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-colors cursor-pointer shadow-sm"
            >
              Đã Hiểu
            </button>
          </div>
        </div>
      )}
    </>
  );
}
