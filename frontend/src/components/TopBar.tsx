import { Search, Bell, Settings } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="h-16 flex-shrink-0 bg-surface border-b border-outline-variant/30 flex items-center justify-between px-6 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative md:hidden">
            <span className="text-xl font-bold text-primary tracking-tight">NipponMaster</span>
        </div>
        <div className="hidden md:flex relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
          <input
            type="text"
            placeholder="Search vocabulary, grammar..."
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full text-sm font-medium text-on-surface">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          N1-N5 Level
        </div>
        <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors">
          <Bell size={20} />
        </button>
        <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors">
          <Settings size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary-container border border-outline-variant overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCin7qvUCMbF3p5EcQjepPtYHFtj3SYm_atJHwUyVEh_BalKSJ_ZV5RPXDtiA4uPXdUoohXhczbHiftUBxUNYiJaeLYM6ceceDaLYGaGqkr-YXN_TvQu5us533UcDFVbIeUAjxjhCVCegydeXuLZPl2IxeRKluoM42MdSGxWYKmZZ-5CREVVVXFgEBH8Jk65eobIULl2w3gYe8D03w8mWfs9BvOmGb51YHc69tfTWM4vMSYa0UNH4U0e1R4FZJ11D4NoPn3bnDNDB0"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
