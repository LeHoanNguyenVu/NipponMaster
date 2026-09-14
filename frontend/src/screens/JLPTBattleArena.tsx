/**
 * JLPTBattleArena.tsx — Đấu Trường Thách Đấu Trắc Nghiệm Real-time 1v1
 * 3 màn hình: Sảnh Ghép Cặp → Sàn Đấu Split 1v1 → Kết Quả Chiến Đấu
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Swords, Zap, Trophy, RotateCcw, ArrowLeft, Timer, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getRandomBattleQuestions, selectBotForElo, getRankForElo, calculateEloDelta,
  type BattleQuestion, type BotOpponent
} from '../data/battleData';
import { playCorrectSound, playWrongSound, playVictorySound, playDefeatSound, playTickSound } from '../utils/audioSfx';

type BattlePhase = 'lobby' | 'battle' | 'result';

interface PlayerState {
  name: string;
  avatar: string;
  elo: number;
  score: number;
  correctCount: number;
  answers: (number | null)[]; // selected option index per question
}

export default function JLPTBattleArena() {
  const [phase, setPhase] = useState<BattlePhase>('lobby');
  const [searching, setSearching] = useState(false);
  const [searchTimer, setSearchTimer] = useState(0);

  // Player state
  const savedElo = parseInt(localStorage.getItem('nippon_battle_elo') || '800', 10);
  const savedCoins = parseInt(localStorage.getItem('nippon_coins') || '0', 10);
  const [playerElo, setPlayerElo] = useState(savedElo);
  const [coins, setCoins] = useState(savedCoins);

  // Battle state
  const [questions, setQuestions] = useState<BattleQuestion[]>([]);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [timer, setTimer] = useState(10);
  const [player, setPlayer] = useState<PlayerState>({
    name: 'Bạn', avatar: '⚔️', elo: savedElo, score: 0, correctCount: 0, answers: []
  });
  const [opponent, setOpponent] = useState<PlayerState>({
    name: '', avatar: '', elo: 0, score: 0, correctCount: 0, answers: []
  });
  const [playerAnswered, setPlayerAnswered] = useState(false);
  const [botRef] = useState<{ bot: BotOpponent | null }>({ bot: null });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const botTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Elo delta for result screen
  const [eloDelta, setEloDelta] = useState(0);

  // ════════════════════════════════════════════════
  // MATCHMAKING
  // ════════════════════════════════════════════════
  const startMatchmaking = useCallback(() => {
    setSearching(true);
    setSearchTimer(0);

    // After 3 seconds, auto-match with AI Bot
    const searchInterval = setInterval(() => {
      setSearchTimer(prev => {
        if (prev >= 3) {
          clearInterval(searchInterval);
          // Match with bot
          const bot = selectBotForElo(playerElo);
          botRef.bot = bot;
          setOpponent({
            name: bot.name, avatar: bot.avatar, elo: bot.elo,
            score: 0, correctCount: 0, answers: []
          });
          setSearching(false);
          // Start battle after brief "found" animation
          setTimeout(() => startBattle(bot), 1200);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(searchInterval);
  }, [playerElo]);

  // ════════════════════════════════════════════════
  // BATTLE START
  // ════════════════════════════════════════════════
  const startBattle = useCallback((_bot?: BotOpponent) => {
    const qs = getRandomBattleQuestions(10);
    setQuestions(qs);
    setCurrentQIdx(0);
    setTimer(10);
    setPlayerAnswered(false);
    setPlayer(prev => ({ ...prev, score: 0, correctCount: 0, answers: [] }));
    setOpponent(prev => ({ ...prev, score: 0, correctCount: 0, answers: [] }));
    setPhase('battle');
  }, []);

  // ════════════════════════════════════════════════
  // QUESTION TIMER
  // ════════════════════════════════════════════════
  useEffect(() => {
    if (phase !== 'battle') return;
    if (currentQIdx >= questions.length) return;

    setTimer(10);
    setPlayerAnswered(false);

    // Start countdown
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          // Time's up — auto next question
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        if (prev <= 4) playTickSound();
        return prev - 1;
      });
    }, 1000);

    // Bot answers after its average response time (with some variance)
    if (botRef.bot) {
      const variance = (Math.random() - 0.5) * 2000;
      const botDelay = Math.max(1500, botRef.bot.avgResponseMs + variance);
      botTimerRef.current = setTimeout(() => {
        simulateBotAnswer();
      }, botDelay);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (botTimerRef.current) clearTimeout(botTimerRef.current);
    };
  }, [phase, currentQIdx, questions.length]);

  // ════════════════════════════════════════════════
  // BOT AI ANSWER SIMULATION
  // ════════════════════════════════════════════════
  const simulateBotAnswer = useCallback(() => {
    if (!botRef.bot || currentQIdx >= questions.length) return;
    const q = questions[currentQIdx];
    const isCorrect = Math.random() < botRef.bot.accuracy;
    const botAnswer = isCorrect ? q.correctIndex : ((q.correctIndex + 1 + Math.floor(Math.random() * 3)) % 4);
    const speedBonus = isCorrect ? Math.floor(Math.random() * 30) + 10 : 0;

    setOpponent(prev => ({
      ...prev,
      answers: [...prev.answers, botAnswer],
      correctCount: prev.correctCount + (isCorrect ? 1 : 0),
      score: prev.score + (isCorrect ? 100 + speedBonus : 0),
    }));
  }, [currentQIdx, questions]);

  // ════════════════════════════════════════════════
  // PLAYER ANSWER
  // ════════════════════════════════════════════════
  const handlePlayerAnswer = useCallback((optionIdx: number) => {
    if (playerAnswered || currentQIdx >= questions.length) return;
    setPlayerAnswered(true);

    const q = questions[currentQIdx];
    const isCorrect = optionIdx === q.correctIndex;
    const speedBonus = isCorrect ? Math.min(50, timer * 5) : 0;

    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }

    setPlayer(prev => ({
      ...prev,
      answers: [...prev.answers, optionIdx],
      correctCount: prev.correctCount + (isCorrect ? 1 : 0),
      score: prev.score + (isCorrect ? 100 + speedBonus : 0),
    }));

    // Move to next question after delay
    setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (botTimerRef.current) clearTimeout(botTimerRef.current);
      moveToNext();
    }, 1200);
  }, [playerAnswered, currentQIdx, questions, timer]);

  // ════════════════════════════════════════════════
  // TIME UP (no answer)
  // ════════════════════════════════════════════════
  const handleTimeUp = useCallback(() => {
    if (playerAnswered) return;
    setPlayer(prev => ({ ...prev, answers: [...prev.answers, null] }));
    setTimeout(() => moveToNext(), 800);
  }, [playerAnswered]);

  // ════════════════════════════════════════════════
  // NEXT QUESTION or END
  // ════════════════════════════════════════════════
  const moveToNext = useCallback(() => {
    const nextIdx = currentQIdx + 1;
    if (nextIdx >= questions.length) {
      endBattle();
    } else {
      setCurrentQIdx(nextIdx);
    }
  }, [currentQIdx, questions.length]);

  // ════════════════════════════════════════════════
  // END BATTLE
  // ════════════════════════════════════════════════
  const endBattle = useCallback(() => {
    // Use functional update to get latest values
    setPlayer(prevPlayer => {
      setOpponent(prevOpp => {
        const won = prevPlayer.score >= prevOpp.score;
        const delta = calculateEloDelta(playerElo, prevOpp.elo, won);
        const newElo = Math.max(0, playerElo + delta);
        const coinsWon = won ? 50 : 10;

        setEloDelta(delta);
        setPlayerElo(newElo);
        setCoins(prev => {
          const newCoins = prev + coinsWon;
          localStorage.setItem('nippon_coins', String(newCoins));
          return newCoins;
        });
        localStorage.setItem('nippon_battle_elo', String(newElo));

        if (won) {
          playVictorySound();
        } else {
          playDefeatSound();
        }
        setPhase('result');
        return prevOpp;
      });
      return prevPlayer;
    });
  }, [playerElo]);

  // ════════════════════════════════════════════════
  // RESET for new battle
  // ════════════════════════════════════════════════
  const resetToLobby = () => {
    setPhase('lobby');
    setSearching(false);
    setSearchTimer(0);
    setQuestions([]);
    setCurrentQIdx(0);
    setPlayerAnswered(false);
    botRef.bot = null;
  };

  const rank = getRankForElo(playerElo);
  const currentQ = questions[currentQIdx];
  const playerWon = player.score >= opponent.score;

  // ════════════════════════════════════════════════
  //  RENDER
  // ════════════════════════════════════════════════

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <AnimatePresence mode="wait">

        {/* ═══════════════════════════════════════════ */}
        {/* PHASE 1: MATCHMAKING LOBBY                 */}
        {/* ═══════════════════════════════════════════ */}
        {phase === 'lobby' && (
          <motion.div key="lobby" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
                <Swords size={16} /> JLPT BATTLE ARENA 1v1
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface">
                Đấu Trường Thách Đấu
              </h1>
              <p className="text-sm text-on-surface-variant max-w-lg mx-auto">
                Thách đấu trắc nghiệm 10 câu trực tiếp. Ai trả lời nhanh & đúng hơn sẽ thắng!
              </p>
            </div>

            {/* Player Rank Card */}
            <div className={`bg-gradient-to-br ${rank.bgGradient} border border-outline-variant/30 rounded-3xl p-6 md:p-8 text-center space-y-4 shadow-sm`}>
              <div className="text-5xl">{rank.emoji}</div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: rank.color }}>
                  Hạng {rank.label} ({rank.labelJP})
                </div>
                <div className="text-3xl font-extrabold text-on-surface mt-1">{playerElo} Elo</div>
              </div>
              <div className="flex items-center justify-center gap-4 text-xs font-medium text-on-surface-variant">
                <span className="flex items-center gap-1"><Trophy size={14} className="text-tertiary" /> {coins} Coins</span>
                <span className="flex items-center gap-1"><Star size={14} className="text-primary" /> Tổng trận: {parseInt(localStorage.getItem('nippon_battles') || '0', 10)}</span>
              </div>
            </div>

            {/* Matchmaking Button */}
            {!searching && !opponent.name ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startMatchmaking}
                className="w-full py-4 rounded-2xl bg-primary text-on-primary font-bold text-lg cursor-pointer hover:bg-primary-container transition-colors shadow-lg flex items-center justify-center gap-3"
              >
                <Swords size={22} /> Tìm Đối Thủ
              </motion.button>
            ) : searching ? (
              <div className="text-center space-y-4 py-8">
                {/* Radar animation */}
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                  <div className="absolute inset-2 rounded-full border-2 border-primary/50 animate-ping" style={{ animationDelay: '0.3s' }} />
                  <div className="absolute inset-4 rounded-full border-2 border-primary/70 animate-ping" style={{ animationDelay: '0.6s' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Swords size={28} className="text-primary animate-pulse" />
                  </div>
                </div>
                <div className="text-sm font-bold text-on-surface">
                  Đang tìm đối thủ... ({searchTimer}s)
                </div>
                <div className="text-xs text-on-surface-variant">
                  Nếu không có đối thủ thực, AI Bot sẽ tự ghép cặp sau 3 giây.
                </div>
              </div>
            ) : opponent.name ? (
              /* Opponent Found Card */
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 text-center space-y-3 shadow-md">
                <div className="text-xs font-bold text-secondary uppercase tracking-wider">Đã tìm thấy đối thủ!</div>
                <div className="text-5xl">{opponent.avatar}</div>
                <div className="text-xl font-extrabold text-on-surface">{opponent.name}</div>
                <div className="text-sm font-medium text-on-surface-variant">{opponent.elo} Elo — {getRankForElo(opponent.elo).emoji} {getRankForElo(opponent.elo).label}</div>
                <div className="flex items-center justify-center gap-2 text-xs text-primary font-bold animate-pulse">
                  <Zap size={14} /> Trận đấu sắp bắt đầu...
                </div>
              </motion.div>
            ) : null}
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════ */}
        {/* PHASE 2: BATTLE ARENA                      */}
        {/* ═══════════════════════════════════════════ */}
        {phase === 'battle' && currentQ && (
          <motion.div key="battle" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-5">

            {/* Score Bar */}
            <div className="grid grid-cols-3 items-center gap-4">
              {/* Player */}
              <div className="text-center space-y-1">
                <div className="text-2xl">⚔️</div>
                <div className="text-sm font-bold text-on-surface">Bạn</div>
                <div className="text-2xl font-extrabold text-primary">{player.score}</div>
              </div>

              {/* VS & Timer */}
              <div className="text-center space-y-1">
                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Câu {currentQIdx + 1}/10
                </div>
                <div className={`text-4xl font-extrabold ${timer <= 3 ? 'text-error animate-pulse' : 'text-on-surface'}`}>
                  {timer}
                </div>
                <div className="flex items-center justify-center gap-1 text-[10px] font-medium text-on-surface-variant">
                  <Timer size={11} /> giây
                </div>
              </div>

              {/* Opponent */}
              <div className="text-center space-y-1">
                <div className="text-2xl">{opponent.avatar}</div>
                <div className="text-sm font-bold text-on-surface">{opponent.name}</div>
                <div className="text-2xl font-extrabold text-tertiary">{opponent.score}</div>
              </div>
            </div>

            {/* Score Progress Bars */}
            <div className="grid grid-cols-2 gap-3">
              <div className="h-2 rounded-full bg-surface-container overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: `${Math.min(100, (player.score / 1500) * 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="h-2 rounded-full bg-surface-container overflow-hidden">
                <motion.div
                  className="h-full bg-tertiary rounded-full"
                  animate={{ width: `${Math.min(100, (opponent.score / 1500) * 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm"
              >
                {/* Level Badge */}
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    currentQ.level === 'N5' ? 'bg-secondary/15 text-secondary' : 'bg-primary/15 text-primary'
                  }`}>
                    {currentQ.level}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-surface-container text-on-surface-variant capitalize">
                    {currentQ.category}
                  </span>
                </div>

                {/* Question */}
                <h2 className="text-lg md:text-xl font-bold text-on-surface font-jp leading-relaxed">
                  {currentQ.question}
                </h2>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = player.answers[currentQIdx] === i;
                    const isCorrect = i === currentQ.correctIndex;
                    const showResult = playerAnswered;

                    return (
                      <motion.button
                        key={i}
                        whileHover={!playerAnswered ? { scale: 1.02 } : {}}
                        whileTap={!playerAnswered ? { scale: 0.98 } : {}}
                        onClick={() => handlePlayerAnswer(i)}
                        disabled={playerAnswered}
                        className={`p-4 rounded-2xl text-left text-sm font-semibold transition-all cursor-pointer border-2 ${
                          showResult && isCorrect
                            ? 'bg-secondary/15 border-secondary text-secondary'
                            : showResult && isSelected && !isCorrect
                            ? 'bg-error/10 border-error text-error'
                            : isSelected
                            ? 'bg-primary/15 border-primary text-primary'
                            : 'bg-surface-container border-transparent text-on-surface hover:bg-surface-container-high hover:border-outline-variant/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center text-xs font-bold text-on-surface-variant flex-shrink-0">
                            {['A', 'B', 'C', 'D'][i]}
                          </span>
                          <span className="font-jp">{opt}</span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════ */}
        {/* PHASE 3: RESULT                            */}
        {/* ═══════════════════════════════════════════ */}
        {phase === 'result' && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">

            {/* Victory / Defeat Banner */}
            <div className={`text-center py-8 rounded-3xl ${
              playerWon
                ? 'bg-gradient-to-br from-secondary/15 to-secondary/5 border border-secondary/30'
                : 'bg-gradient-to-br from-error/10 to-error/5 border border-error/20'
            }`}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="text-6xl mb-3"
              >
                {playerWon ? '🏆' : '💪'}
              </motion.div>
              <h2 className={`text-3xl font-extrabold ${playerWon ? 'text-secondary' : 'text-error'}`}>
                {playerWon ? 'CHIẾN THẮNG!' : 'THUA CUỘC'}
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                {playerWon ? 'Tuyệt vời! Bạn đã chiến thắng xuất sắc!' : 'Đừng nản! Hãy luyện tập thêm và thử lại!'}
              </p>
            </div>

            {/* Score Comparison */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 text-center space-y-2">
                <div className="text-2xl">⚔️</div>
                <div className="text-sm font-bold text-on-surface">Bạn</div>
                <div className="text-3xl font-extrabold text-primary">{player.score}</div>
                <div className="text-xs text-on-surface-variant">{player.correctCount}/10 đúng</div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 text-center space-y-2">
                <div className="text-2xl">{opponent.avatar}</div>
                <div className="text-sm font-bold text-on-surface">{opponent.name}</div>
                <div className="text-3xl font-extrabold text-tertiary">{opponent.score}</div>
                <div className="text-xs text-on-surface-variant">{opponent.correctCount}/10 đúng</div>
              </div>
            </div>

            {/* Elo & Coins Earned */}
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-4 rounded-2xl text-center ${
                eloDelta >= 0 ? 'bg-secondary/10 border border-secondary/20' : 'bg-error/10 border border-error/20'
              }`}>
                <div className="text-xs font-bold text-on-surface-variant uppercase">Elo</div>
                <div className={`text-xl font-extrabold ${eloDelta >= 0 ? 'text-secondary' : 'text-error'}`}>
                  {eloDelta >= 0 ? '+' : ''}{eloDelta}
                </div>
                <div className="text-xs text-on-surface-variant">{playerElo} Elo — {getRankForElo(playerElo).emoji} {getRankForElo(playerElo).label}</div>
              </div>
              <div className="p-4 rounded-2xl bg-tertiary/10 border border-tertiary/20 text-center">
                <div className="text-xs font-bold text-on-surface-variant uppercase">Coins thưởng</div>
                <div className="text-xl font-extrabold text-tertiary">+{playerWon ? 50 : 10}</div>
                <div className="text-xs text-on-surface-variant">Tổng: {coins}</div>
              </div>
            </div>

            {/* Question Review */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">📋 Chi tiết 10 câu hỏi</h3>
              <div className="space-y-2">
                {questions.map((q, i) => {
                  const pAnswer = player.answers[i];
                  const isCorrect = pAnswer === q.correctIndex;
                  return (
                    <div key={q.id} className="flex items-center gap-3 text-xs p-2 rounded-xl bg-surface-container">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                        isCorrect ? 'bg-secondary/20 text-secondary' : 'bg-error/15 text-error'
                      }`}>
                        {isCorrect ? '✓' : '✗'}
                      </span>
                      <span className="text-on-surface font-medium font-jp line-clamp-1 flex-1">{q.question}</span>
                      <span className="text-[10px] text-on-surface-variant flex-shrink-0">
                        {q.options[q.correctIndex]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={resetToLobby}
                className="flex-1 py-3.5 rounded-2xl bg-surface-container border border-outline-variant/40 text-on-surface font-bold text-sm cursor-pointer hover:bg-surface-container-high flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> Về Sảnh Đấu
              </button>
              <button
                onClick={() => {
                  resetToLobby();
                  setTimeout(() => startMatchmaking(), 300);
                }}
                className="flex-1 py-3.5 rounded-2xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:bg-primary-container transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} /> Đấu Tiếp
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
