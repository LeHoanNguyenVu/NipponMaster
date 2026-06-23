export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-[#0c0c0e] text-gray-100">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">NipponMaster</h1>
      <p className="text-gray-400 text-lg mb-8 max-w-[60ch] text-center">
        Nền tảng tự học Tiếng Nhật tối giản &amp; thông minh dành cho người Việt.
      </p>
      <div className="flex gap-4">
        <a href="/login" className="px-6 py-3 bg-[#e63946] text-white font-medium rounded-lg hover:bg-[#d62828] active:scale-[0.98] transition">
          Bắt đầu học
        </a>
        <a href="/register" className="px-6 py-3 bg-zinc-800 text-gray-200 font-medium rounded-lg hover:bg-zinc-700 active:scale-[0.98] transition">
          Đăng ký tài khoản
        </a>
      </div>
    </div>
  );
}
