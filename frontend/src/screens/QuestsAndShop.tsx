/**
 * QuestsAndShop.tsx — Nhiệm Vụ Hàng Ngày, Huy Hiệu & Cửa Hàng Theme
 * Tab 1: Daily Quests + Achievement Badges
 * Tab 2: Theme Shop (Sakura Pink, Cyberpunk Tokyo, Washi Gold, Dark OLED)
 */
import { useState, useEffect, useCallback } from 'react';
import { Trophy, Store, Star, Check, Lock, Palette, Flame, Sparkles, Award, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useThemeStore, THEME_CATALOG, type ThemeId } from '../store/useThemeStore';
import { playCorrectSound, playFanfareSound } from '../utils/audioSfx';

// ══════════════════════════════════════════════════════
// DAILY QUESTS DATA
// ══════════════════════════════════════════════════════

interface DailyQuest {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  rewardCoins: number;
  rewardXP: number;
}

const DAILY_QUESTS: DailyQuest[] = [
  { id: 'flashcard', title: 'Lật 20 Thẻ Flashcards', description: 'Ôn luyện từ vựng bằng thẻ lật', icon: '🃏', target: 20, rewardCoins: 30, rewardXP: 50 },
  { id: 'quiz', title: 'Hoàn Thành 1 Bài Thi', description: 'Làm xong bất kỳ bài thi trắc nghiệm nào', icon: '📝', target: 1, rewardCoins: 40, rewardXP: 80 },
  { id: 'battle', title: 'Chiến Thắng 1 Trận 1v1', description: 'Thách đấu Đấu Trường và giành chiến thắng', icon: '⚔️', target: 1, rewardCoins: 50, rewardXP: 100 },
  { id: 'kanji', title: 'Luyện Viết 5 Bộ Thủ', description: 'Viết 5 bộ thủ Kanji trên Canvas AI', icon: '✍️', target: 5, rewardCoins: 35, rewardXP: 60 },
  { id: 'streak', title: 'Duy Trì Streak 3 Ngày', description: 'Đăng nhập và học tập liên tiếp 3 ngày', icon: '🔥', target: 3, rewardCoins: 100, rewardXP: 200 },
];

// ══════════════════════════════════════════════════════
// ACHIEVEMENT BADGES DATA
// ══════════════════════════════════════════════════════

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: 'vocab_king', title: 'Vua Từ Vựng N5', icon: '👑', description: 'Hoàn thành 500 thẻ Flashcards', condition: '500 flashcards' },
  { id: 'kanji_master', title: 'Cao Thủ Kanji', icon: '🏯', description: 'Viết đạt ≥80% trên 30 bộ thủ Kanji', condition: '30 kanji ≥80%' },
  { id: 'battle_hero', title: 'Chiến Thần Đấu Trường', icon: '⚔️', description: 'Thắng 10 trận 1v1 Battle Arena', condition: '10 wins' },
  { id: 'streak_7', title: 'Dũng Sĩ Streak 7 Ngày', icon: '🔥', description: 'Duy trì streak học tập 7 ngày liên tiếp', condition: '7 day streak' },
  { id: 'graduation', title: 'Cử Nhân Nhập Môn', icon: '🎓', description: 'Tốt nghiệp Khóa Nhập Môn 5 chương', condition: 'Graduation' },
  { id: 'perfectionist', title: 'Người Hoàn Hảo', icon: '💯', description: 'Đạt 100% trong bất kỳ bài thi nào', condition: '100% quiz' },
];

// ══════════════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════════════

export default function QuestsAndShop() {
  const [activeTab, setActiveTab] = useState<'quests' | 'shop'>('quests');
  const { activeTheme, setTheme, unlockTheme, isThemeUnlocked } = useThemeStore();

  // Coins & Progress (from localStorage)
  const [coins, setCoins] = useState(parseInt(localStorage.getItem('nippon_coins') || '0', 10));
  const [xp, setXp] = useState(parseInt(localStorage.getItem('nippon_xp') || '0', 10));
  const [questProgress, setQuestProgress] = useState<Record<string, number>>(() => {
    const raw = localStorage.getItem('nippon_quest_progress');
    return raw ? JSON.parse(raw) : {};
  });
  const [claimedQuests, setClaimedQuests] = useState<string[]>(() => {
    const raw = localStorage.getItem('nippon_claimed_quests');
    return raw ? JSON.parse(raw) : [];
  });
  const [earnedBadges, setEarnedBadges] = useState<string[]>(() => {
    const raw = localStorage.getItem('nippon_badges');
    return raw ? JSON.parse(raw) : [];
  });

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('nippon_coins', String(coins));
  }, [coins]);
  useEffect(() => {
    localStorage.setItem('nippon_xp', String(xp));
  }, [xp]);

  // Claim quest reward
  const claimQuest = useCallback((quest: DailyQuest) => {
    if (claimedQuests.includes(quest.id)) return;
    const progress = questProgress[quest.id] || 0;
    if (progress < quest.target) return;

    playCorrectSound();
    setCoins(prev => prev + quest.rewardCoins);
    setXp(prev => prev + quest.rewardXP);
    const newClaimed = [...claimedQuests, quest.id];
    setClaimedQuests(newClaimed);
    localStorage.setItem('nippon_claimed_quests', JSON.stringify(newClaimed));
  }, [claimedQuests, questProgress]);

  // Purchase theme
  const purchaseTheme = useCallback((themeId: ThemeId, price: number) => {
    if (isThemeUnlocked(themeId)) {
      setTheme(themeId);
      return;
    }
    if (coins < price) return;

    playFanfareSound();
    setCoins(prev => prev - price);
    unlockTheme(themeId);
    setTheme(themeId);
  }, [coins, isThemeUnlocked, unlockTheme, setTheme]);

  // Simulated quest progress (for demo — replace with actual tracking)
  const simulateProgress = useCallback((questId: string) => {
    setQuestProgress(prev => {
      const quest = DAILY_QUESTS.find(q => q.id === questId);
      if (!quest) return prev;
      const current = prev[questId] || 0;
      const updated = { ...prev, [questId]: Math.min(quest.target, current + 1) };
      localStorage.setItem('nippon_quest_progress', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const totalDailyCoins = DAILY_QUESTS.reduce((sum, q) => sum + q.rewardCoins, 0);
  const claimedCount = claimedQuests.length;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-1">
          <Trophy size={14} /> NHIỆM VỤ & CỬA HÀNG
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
          Nhiệm Vụ Hàng Ngày & Theme Shop
        </h1>
        <div className="flex items-center gap-4 mt-2 text-sm font-medium text-on-surface-variant">
          <span className="flex items-center gap-1"><Star size={14} className="text-tertiary" /> {coins} Coins</span>
          <span className="flex items-center gap-1"><Zap size={14} className="text-secondary" /> {xp} XP</span>
          <span className="flex items-center gap-1"><Flame size={14} className="text-primary" /> Streak: {parseInt(localStorage.getItem('nippon_streak') || '0', 10)} ngày</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-outline-variant/30 pb-3">
        {[
          { id: 'quests', label: '🏆 Nhiệm Vụ & Huy Hiệu', icon: Trophy },
          { id: 'shop', label: '🛍️ Cửa Hàng Theme', icon: Palette },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === t.id
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ═══════════════════════════════════════════ */}
        {/* TAB 1: DAILY QUESTS & ACHIEVEMENTS         */}
        {/* ═══════════════════════════════════════════ */}
        {activeTab === 'quests' && (
          <motion.div key="quests" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">

            {/* Daily Quests Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
                  <Sparkles size={16} className="text-tertiary" /> Nhiệm Vụ Hàng Ngày
                </h2>
                <span className="text-xs font-medium text-on-surface-variant">{claimedCount}/{DAILY_QUESTS.length} hoàn thành</span>
              </div>

              <div className="space-y-3">
                {DAILY_QUESTS.map(quest => {
                  const progress = questProgress[quest.id] || 0;
                  const isComplete = progress >= quest.target;
                  const isClaimed = claimedQuests.includes(quest.id);
                  const progressPct = Math.min(100, (progress / quest.target) * 100);

                  return (
                    <motion.div
                      key={quest.id}
                      layout
                      className={`p-4 rounded-2xl border transition-all ${
                        isClaimed
                          ? 'bg-secondary/5 border-secondary/20 opacity-60'
                          : 'bg-surface-container-lowest border-outline-variant/30 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl flex-shrink-0">{quest.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-on-surface">{quest.title}</span>
                            {isClaimed && <Check size={14} className="text-secondary" />}
                          </div>
                          <p className="text-xs text-on-surface-variant mt-0.5">{quest.description}</p>

                          {/* Progress Bar */}
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${isComplete ? 'bg-secondary' : 'bg-primary'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPct}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                            <span className="text-[10px] font-bold text-on-surface-variant flex-shrink-0">
                              {progress}/{quest.target}
                            </span>
                          </div>
                        </div>

                        {/* Reward / Claim Button */}
                        <div className="flex flex-col items-center gap-1 flex-shrink-0">
                          {isClaimed ? (
                            <div className="px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary text-xs font-bold">
                              Đã nhận
                            </div>
                          ) : isComplete ? (
                            <button
                              onClick={() => claimQuest(quest)}
                              className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold cursor-pointer hover:bg-primary-container transition-colors animate-pulse"
                            >
                              Nhận thưởng!
                            </button>
                          ) : (
                            <button
                              onClick={() => simulateProgress(quest.id)}
                              className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant text-xs font-bold cursor-pointer hover:bg-surface-container-high transition-colors"
                            >
                              +1 (Demo)
                            </button>
                          )}
                          <span className="text-[10px] font-medium text-tertiary">
                            🪙 {quest.rewardCoins} • ⚡ {quest.rewardXP}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Achievement Badges Section */}
            <div className="space-y-3 pt-4 border-t border-outline-variant/20">
              <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
                <Award size={16} className="text-primary" /> Huy Hiệu Thành Tích
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {ACHIEVEMENTS.map(badge => {
                  const isEarned = earnedBadges.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-2xl text-center space-y-2 border transition-all ${
                        isEarned
                          ? 'bg-gradient-to-br from-tertiary/10 to-primary/5 border-tertiary/30 shadow-sm'
                          : 'bg-surface-container border-outline-variant/20 opacity-50 grayscale'
                      }`}
                    >
                      <div className="text-3xl">{badge.icon}</div>
                      <div className="text-xs font-bold text-on-surface">{badge.title}</div>
                      <div className="text-[10px] text-on-surface-variant">{badge.description}</div>
                      {isEarned && (
                        <div className="text-[10px] font-bold text-secondary flex items-center justify-center gap-1">
                          <Check size={10} /> Đã đạt
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════ */}
        {/* TAB 2: THEME SHOP                          */}
        {/* ═══════════════════════════════════════════ */}
        {activeTab === 'shop' && (
          <motion.div key="shop" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">

            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
                <Store size={16} className="text-primary" /> Cửa Hàng Theme
              </h2>
              <span className="text-sm font-bold text-tertiary flex items-center gap-1">
                <Star size={14} /> {coins} Coins
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {THEME_CATALOG.map(theme => {
                const unlocked = isThemeUnlocked(theme.id);
                const isActive = activeTheme === theme.id;
                const canAfford = coins >= theme.price;

                return (
                  <motion.div
                    key={theme.id}
                    whileHover={{ y: -2 }}
                    className={`rounded-3xl border overflow-hidden transition-all ${
                      isActive
                        ? 'border-primary shadow-lg ring-2 ring-primary/30'
                        : 'border-outline-variant/30 shadow-sm'
                    }`}
                  >
                    {/* Theme Preview Bar */}
                    <div
                      className="h-20 flex items-center justify-center gap-3 relative"
                      style={{ background: theme.preview.bg }}
                    >
                      <div className="text-4xl">{theme.emoji}</div>
                      <div>
                        <div className="text-xs font-bold" style={{ color: theme.preview.accent }}>
                          {theme.nameJP}
                        </div>
                        <div className="text-sm font-extrabold" style={{ color: theme.preview.text }}>
                          {theme.name}
                        </div>
                      </div>
                      {isActive && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold">
                          Đang dùng
                        </div>
                      )}
                    </div>

                    {/* Theme Info & Action */}
                    <div className="p-4 bg-surface-container-lowest space-y-3">
                      <p className="text-xs text-on-surface-variant">{theme.description}</p>

                      <div className="flex items-center justify-between">
                        {theme.price === 0 ? (
                          <span className="text-xs font-bold text-secondary">Miễn phí</span>
                        ) : (
                          <span className="text-xs font-bold text-tertiary flex items-center gap-1">
                            🪙 {theme.price} Coins
                          </span>
                        )}

                        {unlocked ? (
                          isActive ? (
                            <div className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center gap-1">
                              <Check size={12} /> Đang áp dụng
                            </div>
                          ) : (
                            <button
                              onClick={() => purchaseTheme(theme.id, 0)}
                              className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold cursor-pointer hover:bg-primary-container transition-colors"
                            >
                              Áp dụng
                            </button>
                          )
                        ) : canAfford ? (
                          <button
                            onClick={() => purchaseTheme(theme.id, theme.price)}
                            className="px-3 py-1.5 rounded-lg bg-tertiary text-on-tertiary text-xs font-bold cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-1"
                          >
                            🛒 Mua & Áp dụng
                          </button>
                        ) : (
                          <div className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant text-xs font-bold flex items-center gap-1 opacity-50">
                            <Lock size={12} /> Chưa đủ Coins
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
