import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, GraduationCap, Presentation, ShieldAlert, ArrowRight, ShieldCheck, RefreshCw, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

interface AuthProps {
  onAuthSuccess: () => void;
}

export default function Auth({ onAuthSuccess }: AuthProps) {
  const [view, setView] = useState<'login' | 'register' | 'verify'>('login');
  const [showPassword, setShowPassword] = useState(false);
  
  // Zustand Store
  const { login, register, error, clearError, isLoading, isAuthenticated } = useAuthStore();

  // Reset errors when switching views
  useEffect(() => {
    clearError();
  }, [view, clearError]);

  // If already authenticated, trigger success callback
  useEffect(() => {
    if (isAuthenticated) {
      onAuthSuccess();
    }
  }, [isAuthenticated, onAuthSuccess]);

  // LOGIN STATE
  const [loginForm, setLoginForm] = useState({
    usernameOrEmail: '',
    password: '',
    role: 'student' as 'student' | 'teacher' | 'system',
  });

  // REGISTER STATE
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: 'student' as 'student' | 'teacher',
    jlptLevel: 'N2',
    experienceYears: '',
    cvUrl: '',
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.usernameOrEmail || !loginForm.password) return;
    try {
      await login({
        username: loginForm.usernameOrEmail,
        password: loginForm.password,
        role: loginForm.role,
      });
    } catch (err) {
      // Error handled by store
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.fullName || !registerForm.email || !registerForm.password) return;
    try {
      await register({
        username: registerForm.email.split('@')[0], // Generate username from email
        fullName: registerForm.fullName,
        email: registerForm.email,
        phone: registerForm.phone,
        password: registerForm.password,
        role: registerForm.role,
        jlptLevel: registerForm.role === 'teacher' ? registerForm.jlptLevel : undefined,
        experienceYears: registerForm.role === 'teacher' ? parseInt(registerForm.experienceYears) || 0 : undefined,
        cvUrl: registerForm.role === 'teacher' ? registerForm.cvUrl : undefined,
      });
      // Move to verification/approval screen after successful register
      setView('verify');
    } catch (err) {
      // Error handled by store
    }
  };

  // --- SUBVIEW: LOGIN ---
  const renderLogin = () => (
    <div className="min-h-screen bg-pattern-hexagons flex flex-col items-center justify-center p-4">
      {/* Logo Area */}
      <div className="flex flex-col items-center mb-6 text-center">
        <div className="w-12 h-1.5 bg-primary rounded-full mb-4"></div>
        <h1 className="font-serif text-5xl font-bold text-on-surface tracking-tight mb-2">
          NipponMaster
        </h1>
        <p className="font-serif italic text-on-surface-variant text-lg">
          Hành trình chinh phục Nhật ngữ với tâm hồn Zen.
        </p>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md p-8 md:p-10 relative bg-surface-container-lowest border-outline-variant shadow-lg">
        <form className="space-y-6" onSubmit={handleLoginSubmit}>
          {error && (
            <div className="p-3 bg-error-container text-error rounded-xl text-sm border border-error/20 flex gap-2 items-center">
              <ShieldAlert size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Inputs */}
          <div className="space-y-5">
            <Input
              label="Tên đăng nhập hoặc Email"
              type="text"
              placeholder="Nhập tên đăng nhập hoặc email..."
              value={loginForm.usernameOrEmail}
              onChange={(e) => setLoginForm({ ...loginForm, usernameOrEmail: e.target.value })}
              required
            />

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Mật khẩu</label>
                <a href="#" className="text-xs text-primary font-medium hover:underline">Quên mật khẩu?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-surface-container-lowest border border-outline-variant focus:ring-primary/20 focus:border-primary text-on-surface placeholder:text-outline rounded-xl text-sm transition-all duration-150 outline-none py-2.5 px-4 focus:ring-4 pr-10"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3"
            isLoading={isLoading}
          >
            Đăng nhập
          </Button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/50"></div>
            </div>
            <div className="relative bg-surface-container-lowest px-4 text-xs font-bold text-outline uppercase tracking-wider">
              Lối vào dành cho
            </div>
          </div>

          {/* Role Selection */}
          <div className="flex justify-between px-2">
            {[
              { id: 'student', label: 'Học viên', icon: GraduationCap },
              { id: 'teacher', label: 'Giảng viên', icon: Presentation },
              { id: 'system', label: 'Hệ thống', icon: ShieldAlert }
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setLoginForm({ ...loginForm, role: r.id as any })}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${loginForm.role === r.id ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface-container-low text-outline group-hover:bg-surface-container-high'}`}>
                  <r.icon size={20} />
                </div>
                <span className={`text-xs font-medium ${loginForm.role === r.id ? 'text-on-surface font-bold' : 'text-on-surface-variant'}`}>{r.label}</span>
              </button>
            ))}
          </div>
        </form>
      </Card>

      <div className="mt-8 text-on-surface-variant text-sm">
        Chưa có tài khoản?{' '}
        <button onClick={() => setView('register')} className="font-bold text-primary hover:underline cursor-pointer">
          Đăng ký tham gia
        </button>
      </div>
      
      {/* Watermark Stamp */}
      <div className="mt-8 text-outline pointer-events-none flex items-center gap-2 opacity-30 select-none">
         <div className="w-6 h-6 border border-current rounded flex items-center justify-center text-xs font-serif">禪</div>
      </div>
    </div>
  );

  // --- SUBVIEW: REGISTER ---
  const renderRegister = () => (
    <div className="min-h-screen bg-pattern-paper flex">
      {/* Left Column (Hero Card) */}
      <div className="hidden lg:flex w-5/12 flex-col justify-between p-16 xl:p-24 border-r border-outline-variant/40 bg-surface-container-low relative">
        <div>
          <div className="flex items-center gap-3 mb-24">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl">
              学
            </div>
            <span className="font-serif font-bold text-xl text-on-surface">NipponMaster</span>
          </div>

          <h1 className="font-serif text-[3.5rem] leading-[1.1] font-bold text-on-surface tracking-tight mb-4">
            Bắt đầu hành<br />trình
          </h1>
          <h2 className="font-serif text-[3.5rem] leading-[1.1] italic text-primary/95 font-light mb-10">
            Chinh phục Nhật<br />Ngữ
          </h2>

          <p className="text-on-surface-variant text-base leading-relaxed max-w-sm mb-16">
            Hòa mình vào không gian học tập tĩnh lặng, nơi tri thức cổ điển gặp gỡ công nghệ hiện đại. NipponMaster mang đến sự an lạc trong từng bài học.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-surface object-cover" />
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-surface object-cover" />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-surface object-cover" />
          </div>
          <span className="text-xs font-medium text-on-surface-variant">Hơn 50,000 học viên đã tham gia ôn tập SRS</span>
        </div>
      </div>

      {/* Right Column (Form Panel) */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center p-6 md:p-12 lg:p-16 xl:px-24 overflow-y-auto">
        <div className="max-w-xl w-full mx-auto">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
             <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl">
              学
            </div>
            <span className="font-serif font-bold text-xl text-on-surface">NipponMaster</span>
          </div>

          <h2 className="font-serif text-4xl font-bold text-on-surface mb-2">Tạo tài khoản mới</h2>
          <p className="text-on-surface-variant mb-8 text-base">Khám phá vẻ đẹp của ngôn ngữ cùng chúng tôi.</p>

          <form className="space-y-6" onSubmit={handleRegisterSubmit}>
            {error && (
              <div className="p-3 bg-error-container text-error rounded-xl text-sm border border-error/20 flex gap-2 items-center">
                <ShieldAlert size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-3">Bạn tham gia với tư cách là?</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRegisterForm({ ...registerForm, role: 'student' })}
                  className={`flex flex-col items-center justify-center py-4 px-4 rounded-xl border transition-all cursor-pointer ${
                    registerForm.role === 'student' ? 'border-primary bg-primary/5 shadow-sm' : 'border-outline-variant bg-surface hover:bg-surface-container-low'
                  }`}
                >
                  <GraduationCap className={`mb-2 ${registerForm.role === 'student' ? 'text-primary' : 'text-outline'}`} size={24} />
                  <span className={`text-sm font-bold ${registerForm.role === 'student' ? 'text-on-surface' : 'text-on-surface-variant'}`}>Học viên</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRegisterForm({ ...registerForm, role: 'teacher' })}
                  className={`flex flex-col items-center justify-center py-4 px-4 rounded-xl border transition-all cursor-pointer ${
                    registerForm.role === 'teacher' ? 'border-primary bg-primary/5 shadow-sm' : 'border-outline-variant bg-surface hover:bg-surface-container-low'
                  }`}
                >
                  <Presentation className={`mb-2 ${registerForm.role === 'teacher' ? 'text-primary' : 'text-outline'}`} size={24} />
                  <span className={`text-sm font-bold ${registerForm.role === 'teacher' ? 'text-on-surface' : 'text-on-surface-variant'}`}>Giảng viên</span>
                </button>
              </div>
            </div>

            {/* Common Inputs */}
            <div className="space-y-4">
              <Input
                label="Họ và Tên"
                placeholder="Nhập họ và tên đầy đủ..."
                value={registerForm.fullName}
                onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                required
              />

              <Input
                label="Địa chỉ Email"
                type="email"
                placeholder="email@example.com"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                required
              />

              <Input
                label="Số điện thoại"
                type="tel"
                placeholder="Nhập số điện thoại..."
                value={registerForm.phone}
                onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                required
              />

              <Input
                label="Mật khẩu"
                type="password"
                placeholder="Tối thiểu 6 ký tự..."
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                required
              />

              {/* Dynamic Teacher Inputs */}
              {registerForm.role === 'teacher' && (
                <div className="p-5 bg-surface border border-outline-variant/60 rounded-xl space-y-4">
                  <div className="text-xs font-bold text-primary uppercase tracking-wider">Thông tin giảng dạy bổ sung</div>
                  
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase tracking-wide">Trình độ JLPT cao nhất</label>
                    <select
                      className="w-full bg-surface-container-lowest border border-outline-variant focus:ring-primary/20 focus:border-primary text-on-surface rounded-xl text-sm py-2.5 px-4 outline-none"
                      value={registerForm.jlptLevel}
                      onChange={(e) => setRegisterForm({ ...registerForm, jlptLevel: e.target.value })}
                    >
                      <option value="N1">N1 - Thượng cấp</option>
                      <option value="N2">N2 - Trung cấp cao</option>
                      <option value="N3">N3 - Trung cấp</option>
                    </select>
                  </div>

                  <Input
                    label="Số năm kinh nghiệm giảng dạy"
                    type="number"
                    min="0"
                    placeholder="Ví dụ: 3"
                    value={registerForm.experienceYears}
                    onChange={(e) => setRegisterForm({ ...registerForm, experienceYears: e.target.value })}
                    required
                  />

                  <Input
                    label="Link CV / Hồ sơ năng lực (LinkedIn, Drive...)"
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={registerForm.cvUrl}
                    onChange={(e) => setRegisterForm({ ...registerForm, cvUrl: e.target.value })}
                    required
                  />
                </div>
              )}
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer" />
              <label htmlFor="terms" className="text-on-surface-variant text-sm leading-relaxed cursor-pointer select-none">
                Tôi đồng ý với <a href="#" className="font-bold text-primary hover:underline">Điều khoản dịch vụ</a> và <a href="#" className="font-bold text-primary hover:underline">Chính sách bảo mật</a> của NipponMaster.
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-4 text-base"
              isLoading={isLoading}
              icon={<ArrowRight size={18} />}
              iconPosition="right"
            >
              Đăng ký tham gia
            </Button>
          </form>

          <div className="mt-8 text-center text-on-surface-variant text-sm">
            Bạn đã có tài khoản?{' '}
            <button onClick={() => setView('login')} className="font-bold text-primary hover:underline cursor-pointer">
              Đăng nhập ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // --- SUBVIEW: VERIFY (Approval Flow State) ---
  const renderVerify = () => (
    <div className="min-h-screen bg-pattern-waves flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Stamp */}
      <div className="absolute bottom-10 left-10 opacity-10 pointer-events-none transform -rotate-12 border-2 border-primary/50 p-2 w-48 text-center text-primary">
        <div className="text-xl font-bold tracking-widest">管理者</div>
        <div className="text-[9px] uppercase mt-1">Authorized Personnel Only</div>
      </div>

      {/* Verify Card */}
      <Card className="w-full max-w-md p-8 md:p-10 relative bg-surface-container-lowest border-outline-variant shadow-lg z-10">
        <div className="absolute -bottom-16 -right-16 text-primary-container/20 opacity-40 pointer-events-none">
          <ShieldCheck size={200} strokeWidth={1} />
        </div>

        <div className="relative z-10 text-center">
          <div className="flex flex-col items-center mb-8">
            <h1 className="font-serif text-4xl font-bold text-on-surface tracking-tight">
              NipponMaster
            </h1>
            <div className="w-12 h-1 bg-primary mt-4 mb-6 rounded-full"></div>
            
            <h2 className="font-serif text-2xl font-bold text-on-surface mb-3">Xác minh bảo mật</h2>
            
            {registerForm.role === 'teacher' ? (
              <div className="text-on-surface-variant text-sm leading-relaxed px-2 space-y-3 text-left bg-surface p-4 rounded-xl border border-outline-variant mt-2">
                <p className="font-bold text-primary">Cảm ơn Giảng viên {registerForm.fullName} đã đăng ký!</p>
                <p>Để đảm bảo chất lượng giảng dạy trên NipponMaster, tài khoản của bạn đã được chuyển sang trạng thái <strong>Chờ phê duyệt</strong>.</p>
                <p>Quản trị viên hệ thống sẽ kiểm tra CV của bạn trong vòng 24 giờ làm việc. Bạn sẽ nhận được email thông báo kích hoạt.</p>
              </div>
            ) : (
              <p className="text-on-surface-variant text-sm leading-relaxed px-4">
                Một mã xác thực 6 chữ số đã được gửi đến địa chỉ email của bạn. Vui lòng nhập mã để hoàn thành đăng ký.
              </p>
            )}
          </div>

          {registerForm.role !== 'teacher' && (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onAuthSuccess(); }}>
              {/* 6-digit Code Inputs */}
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-14 bg-surface-container-lowest border border-outline-variant focus:ring-primary/20 focus:border-primary text-on-surface rounded-xl text-center text-xl font-bold transition-all focus:ring-4 outline-none"
                    placeholder=""
                  />
                ))}
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3.5"
                icon={<ShieldCheck size={18} />}
              >
                Xác nhận kích hoạt
              </Button>

              {/* Resend & Timer */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button type="button" className="text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer">
                  <RefreshCw size={12} />
                  Gửi lại mã
                </button>
                <span className="text-on-surface-variant font-mono">01:57</span>
              </div>
            </form>
          )}

          {/* Back to Login */}
          <div className="mt-8 pt-6 border-t border-outline-variant/30">
            <button
              onClick={() => setView('login')}
              className="text-on-surface-variant hover:text-primary font-bold flex items-center justify-center gap-2 w-full transition-colors cursor-pointer text-sm"
            >
              <ArrowLeft size={16} /> Quay lại đăng nhập
            </button>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="w-full min-h-screen">
      {view === 'login' && renderLogin()}
      {view === 'register' && renderRegister()}
      {view === 'verify' && renderVerify()}
    </div>
  );
}
