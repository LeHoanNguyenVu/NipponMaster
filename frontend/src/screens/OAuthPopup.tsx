import { useState, useEffect } from 'react';
import { ShieldCheck, UserPlus, Check, ArrowLeft, Lock } from 'lucide-react';

interface MockAccount {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

const DEFAULT_GOOGLE_ACCOUNTS: MockAccount[] = [
  {
    id: 'g1',
    email: 'lehoannguyenvu@gmail.com',
    name: 'Lê Hoàn Nguyễn Vũ',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'g2',
    email: 'nihongo.student@gmail.com',
    name: 'Học Viên Tiếng Nhật',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'g3',
    email: 'admin.nipponmaster@gmail.com',
    name: 'Quản Trị Viên NipponMaster',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
  },
];

const DEFAULT_FACEBOOK_ACCOUNTS: MockAccount[] = [
  {
    id: 'fb1',
    email: 'nguyenvu.fb@facebook.com',
    name: 'Nguyễn Vũ (Facebook)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'fb2',
    email: 'nihongo.community@facebook.com',
    name: 'Cộng Đồng Tiếng Nhật',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  },
];

export default function OAuthPopup() {
  const [provider, setProvider] = useState<'GOOGLE' | 'FACEBOOK'>('GOOGLE');
  const [step, setStep] = useState<'SELECT_ACCOUNT' | 'CUSTOM_INPUT' | 'CONSENT'>('SELECT_ACCOUNT');
  const [accounts, setAccounts] = useState<MockAccount[]>(DEFAULT_GOOGLE_ACCOUNTS);
  const [selectedAccount, setSelectedAccount] = useState<MockAccount | null>(null);

  // Custom account input state
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');

  useEffect(() => {
    // Read provider from URL hash or query params
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(hash.split('?')[1] || '');

    const p = (urlParams.get('provider') || hashParams.get('provider') || 'google').toUpperCase();
    if (p === 'FACEBOOK') {
      setProvider('FACEBOOK');
      setAccounts(DEFAULT_FACEBOOK_ACCOUNTS);
    } else {
      setProvider('GOOGLE');
      setAccounts(DEFAULT_GOOGLE_ACCOUNTS);
    }
  }, []);

  const handleSelectAccount = (acc: MockAccount) => {
    setSelectedAccount(acc);
    setStep('CONSENT');
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    const newAcc: MockAccount = {
      id: 'custom_' + Date.now(),
      email: customEmail.trim(),
      name: customName.trim() || customEmail.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(customName || customEmail)}&background=random`,
    };
    setSelectedAccount(newAcc);
    setStep('CONSENT');
  };

  const handleConfirmAuth = () => {
    if (!selectedAccount) return;

    const payload = {
      provider,
      idToken: `oauth2_${provider.toLowerCase()}_token_${Date.now()}`,
      email: selectedAccount.email,
      fullName: selectedAccount.name,
      avatarUrl: selectedAccount.avatar,
    };

    // Send payload back to the opener window
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(
        {
          type: 'OAUTH_SUCCESS',
          payload,
        },
        '*'
      );
    }

    // Close the popup
    setTimeout(() => {
      window.close();
    }, 200);
  };

  const handleCancel = () => {
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ type: 'OAUTH_CANCEL' }, '*');
    }
    window.close();
  };

  const isGoogle = provider === 'GOOGLE';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-800 p-6 antialiased select-none">
      {/* Top Brand Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          {isGoogle ? (
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
            </svg>
          )}
          <span className="font-semibold text-sm text-slate-700">
            {isGoogle ? 'Đăng nhập bằng Google' : 'Đăng nhập bằng Facebook'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <Lock size={12} />
          <span>Xác thực an toàn</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center py-4">
        {step === 'SELECT_ACCOUNT' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {isGoogle ? 'Chọn một tài khoản' : 'Chọn tài khoản Facebook'}
              </h2>
              <p className="text-xs text-slate-500">
                để tiếp tục chuyển đến ứng dụng <strong className="text-slate-800">NipponMaster</strong>
              </p>
            </div>

            {/* Accounts List */}
            <div className="space-y-2 mb-4">
              {accounts.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleSelectAccount(acc)}
                  className="w-full flex items-center gap-3.5 p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-100 hover:border-slate-300 transition-all text-left cursor-pointer group shadow-xs"
                >
                  <img src={acc.avatar} alt={acc.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {acc.name}
                    </div>
                    <div className="text-xs text-slate-500 truncate">{acc.email}</div>
                  </div>
                </button>
              ))}

              {/* Option to use another account */}
              <button
                type="button"
                onClick={() => setStep('CUSTOM_INPUT')}
                className="w-full flex items-center gap-3.5 p-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 hover:bg-white hover:border-slate-400 transition-all text-left cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  <UserPlus size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                    Sử dụng một tài khoản khác...
                  </div>
                  <div className="text-xs text-slate-400">Đăng nhập tài khoản của chính bạn</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 'CUSTOM_INPUT' && (
          <div>
            <button
              type="button"
              onClick={() => setStep('SELECT_ACCOUNT')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold mb-4 cursor-pointer"
            >
              <ArrowLeft size={14} /> Quay lại danh sách tài khoản
            </button>

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {isGoogle ? 'Nhập tài khoản Google' : 'Nhập tài khoản Facebook'}
              </h2>
              <p className="text-xs text-slate-500">
                Nhập email và tên của bạn để ủy quyền vào <strong className="text-slate-800">NipponMaster</strong>
              </p>
            </div>

            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Địa chỉ Email</label>
                <input
                  type="email"
                  placeholder={isGoogle ? 'vidu@gmail.com' : 'vidu@facebook.com'}
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Họ và Tên</label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-md cursor-pointer transition-colors ${
                  isGoogle ? 'bg-[#4285F4] hover:bg-blue-600' : 'bg-[#1877F2] hover:bg-blue-700'
                }`}
              >
                Tiếp tục đến bước Cấp quyền
              </button>
            </form>
          </div>
        )}

        {step === 'CONSENT' && selectedAccount && (
          <div>
            <button
              type="button"
              onClick={() => setStep('SELECT_ACCOUNT')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold mb-4 cursor-pointer"
            >
              <ArrowLeft size={14} /> Chọn tài khoản khác
            </button>

            {/* Selected User Pill */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 mb-5 shadow-xs">
              <img src={selectedAccount.avatar} alt={selectedAccount.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-900 truncate">{selectedAccount.name}</div>
                <div className="text-xs text-slate-500 truncate">{selectedAccount.email}</div>
              </div>
              <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                <Check size={14} /> Đã chọn
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 mb-6 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Quyền hạn yêu cầu bởi NipponMaster:
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Xem địa chỉ email chính xác để kích hoạt và lưu tiến độ học tập</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Xem thông tin hồ sơ cơ bản (tên và ảnh đại diện)</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 font-semibold text-xs text-slate-700 cursor-pointer transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmAuth}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs text-white shadow-md cursor-pointer transition-colors ${
                  isGoogle ? 'bg-[#4285F4] hover:bg-blue-600' : 'bg-[#1877F2] hover:bg-blue-700'
                }`}
              >
                {isGoogle ? 'Cho phép & Đăng nhập' : 'Tiếp tục dưới tên ' + selectedAccount.name.split(' ').slice(-1)[0]}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Disclaimer */}
      <div className="pt-4 border-t border-slate-200 text-center">
        <p className="text-[11px] text-slate-400">
          Để tiếp tục, {isGoogle ? 'Google' : 'Facebook'} sẽ chia sẻ tên, địa chỉ email và ảnh hồ sơ của bạn với ứng dụng NipponMaster theo Điều khoản dịch vụ và Chính sách quyền riêng tư.
        </p>
      </div>
    </div>
  );
}
