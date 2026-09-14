import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Headphones, Volume2, VolumeX, Play, RotateCcw, ArrowLeft, 
  Sparkles, HelpCircle, 
  Search, Clock, Zap, 
  Eye, EyeOff, Radio, ChevronRight, Flame, MessageSquare
} from 'lucide-react';
import { 
  listeningApi, 
  type ListeningScenarioSummary, 
  type ListeningScenarioDetail, 
  type DialogueNode, 
  type DialogueOption 
} from '../api/listeningApi';
import { ambienceEngine, speakJapaneseVoice } from '../utils/listeningAmbience';
import { playCorrectSound, playWrongSound } from '../utils/audioSfx';

export default function ListeningRoom() {
  // --- View States ---
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [scenarios, setScenarios] = useState<ListeningScenarioSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // --- Active Scenario Session ---
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [scenarioDetail, setScenarioDetail] = useState<ListeningScenarioDetail | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string>('node-1');
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [etiquettePoints, setEtiquettePoints] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // --- Audio & Playback Controls ---
  const [ambienceEnabled, setAmbienceEnabled] = useState<boolean>(true);
  const ambienceVolume = 0.35;
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // --- Subtitle & Assist Controls ---
  const [blindMode, setBlindMode] = useState<boolean>(false);
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [showRomaji, setShowRomaji] = useState<boolean>(false);
  const [showVietnamese, setShowVietnamese] = useState<boolean>(true);

  // --- Quiz Interaction ---
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  // --- Session Submission Results ---
  const [sessionResult, setSessionResult] = useState<any>(null);

  const roomRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Scenarios Catalog
  const fetchScenarios = useCallback(async () => {
    try {
      setLoading(true);
      const data = await listeningApi.getScenarios(
        selectedLevel === 'ALL' ? undefined : selectedLevel,
        selectedCategory === 'ALL' ? undefined : selectedCategory,
        searchKeyword.trim() ? searchKeyword.trim() : undefined
      );
      setScenarios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch scenarios:', err);
      setScenarios([]);
    } finally {
      setLoading(false);
    }
  }, [selectedLevel, selectedCategory, searchKeyword]);

  useEffect(() => {
    fetchScenarios();
  }, [fetchScenarios]);

  // 2. Load Scenario Detail
  const startScenario = async (scenario: ListeningScenarioSummary) => {
    try {
      setLoading(true);
      const detail = await listeningApi.getScenarioDetail(scenario.id);
      setScenarioDetail(detail);
      setActiveScenarioId(scenario.id);
      setCurrentNodeId(detail.initialNodeId);
      setVisitedNodes([detail.initialNodeId]);
      setSessionStartTime(Date.now());
      setQuizScore({ correct: 0, total: 0 });
      setEtiquettePoints(0);
      setIsCompleted(false);
      setSelectedQuizAnswer(null);
      setIsQuizSubmitted(false);
      setLastFeedback(null);
      setSessionResult(null);

      // Default speed tuned to level
      if (scenario.level === 'N5') setSpeechSpeed(0.75);
      else if (scenario.level === 'N4') setSpeechSpeed(0.85);
      else setSpeechSpeed(1.0);

      // Start Ambience
      if (ambienceEnabled) {
        ambienceEngine.play(scenario.ambienceType);
        ambienceEngine.setVolume(ambienceVolume);
      }
    } catch (err) {
      console.error('Failed to start scenario:', err);
    } finally {
      setLoading(false);
    }
  };

  // Play node speech
  const playCurrentNodeSpeech = useCallback(() => {
    if (!scenarioDetail || !currentNodeId) return;
    const node = scenarioDetail.nodes[currentNodeId];
    if (!node) return;

    setIsPlayingAudio(true);
    speakJapaneseVoice(node.japaneseText, speechSpeed, 1.0, () => {
      setIsPlayingAudio(false);
    });
  }, [scenarioDetail, currentNodeId, speechSpeed]);

  // Auto-play speech when node changes
  useEffect(() => {
    if (activeScenarioId && scenarioDetail && currentNodeId) {
      const timer = setTimeout(() => {
        playCurrentNodeSpeech();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentNodeId, activeScenarioId, scenarioDetail, playCurrentNodeSpeech]);

  // Handle Ambience volume or toggle change
  useEffect(() => {
    if (!activeScenarioId || !scenarioDetail) return;
    if (ambienceEnabled) {
      ambienceEngine.play(scenarioDetail.summary.ambienceType);
      ambienceEngine.setVolume(ambienceVolume);
    } else {
      ambienceEngine.stop();
    }
    return () => {
      ambienceEngine.stop();
    };
  }, [ambienceEnabled, ambienceVolume, activeScenarioId, scenarioDetail]);

  // Handle Option Selection
  const handleSelectOption = (opt: DialogueOption) => {
    setEtiquettePoints((prev) => prev + opt.score);
    setLastFeedback(opt.feedback);

    if (opt.score >= 90) {
      playCorrectSound();
    }

    if (!scenarioDetail) return;
    const nextNode = scenarioDetail.nodes[opt.nextNodeId];
    if (nextNode) {
      setCurrentNodeId(opt.nextNodeId);
      setVisitedNodes((prev) => [...prev, opt.nextNodeId]);
      setSelectedQuizAnswer(null);
      setIsQuizSubmitted(false);

      if (nextNode.isEnding) {
        handleFinishSession();
      }
    }
  };

  // Handle Quiz Submission
  const handleQuizAnswer = (selectedIndex: number, quiz: NonNullable<DialogueNode['quiz']>) => {
    setSelectedQuizAnswer(selectedIndex);
    setIsQuizSubmitted(true);

    const isCorrect = selectedIndex === quiz.correctAnswerIndex;
    if (isCorrect) {
      playCorrectSound();
      setQuizScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      playWrongSound();
      setQuizScore((prev) => ({ correct: prev.correct, total: prev.total + 1 }));
    }
  };

  // Submit Completed Session
  const handleFinishSession = async () => {
    if (!activeScenarioId) return;
    const durationSeconds = Math.round((Date.now() - sessionStartTime) / 1000);
    try {
      const res = await listeningApi.submitSession({
        scenarioId: activeScenarioId,
        visitedNodeIds: visitedNodes,
        quizCorrectCount: quizScore.correct,
        quizTotalCount: Math.max(1, quizScore.total),
        etiquetteScoreTotal: etiquettePoints,
        durationSeconds,
      });
      setSessionResult(res);
      setIsCompleted(true);
      ambienceEngine.stop();
    } catch (err) {
      console.error('Failed to submit listening session', err);
    }
  };

  // Exit back to catalog
  const exitToCatalog = () => {
    window.speechSynthesis.cancel();
    ambienceEngine.stop();
    setActiveScenarioId(null);
    setScenarioDetail(null);
    setSessionResult(null);
    setIsCompleted(false);
  };

  // Helper render ruby Furigana
  const renderJapaneseWithFurigana = (furiganaText: string) => {
    if (!furiganaText) return null;
    try {
      // Parses format: "本日[ほんじつ]は..." -> <ruby>本日<rt>ほんじつ</rt></ruby>
      const parts = furiganaText.split(/(\p{Script=Han}+\[[^\]]+\])/gu);
      return (
        <span className="font-serif tracking-wide leading-relaxed">
          {parts.map((part, index) => {
            const match = part.match(/^(\p{Script=Han}+)\[([^\]]+)\]$/u);
            if (match) {
              const kanji = match[1];
              const reading = match[2];
              return showFurigana ? (
                <ruby key={index} className="mx-0.5">
                  {kanji}
                  <rt className="text-[11px] text-primary select-none font-sans font-normal opacity-90">{reading}</rt>
                </ruby>
              ) : (
                <span key={index}>{kanji}</span>
              );
            }
            return <span key={index}>{part}</span>;
          })}
        </span>
      );
    } catch {
      return <span>{furiganaText}</span>;
    }
  };

  const currentNode = scenarioDetail?.nodes[currentNodeId];

  // =========================================================================
  // RENDER: SCENARIO PLAYER (IN SESSION)
  // =========================================================================
  if (activeScenarioId && scenarioDetail && currentNode) {
    const summary = scenarioDetail.summary;

    return (
      <div ref={roomRef} className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-outline-variant/60">
          <button
            onClick={exitToCatalog}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-outline-variant/60 bg-surface-container-low hover:bg-surface-container text-xs font-bold text-on-surface transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Thoát Kịch Bản
          </button>

          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase ${
              summary.level === 'N5' ? 'bg-emerald-100 text-emerald-800' :
              summary.level === 'N4' ? 'bg-sky-100 text-sky-800' :
              summary.level === 'N3' ? 'bg-amber-100 text-amber-800' :
              summary.level === 'N2' ? 'bg-orange-100 text-orange-800' : 'bg-purple-100 text-purple-800'
            }`}>
              {summary.level}
            </span>
            <span className="text-xs font-bold text-on-surface-variant truncate max-w-[240px] md:max-w-md">
              {summary.title}
            </span>
          </div>

          {/* Ambience & Speed Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAmbienceEnabled(!ambienceEnabled)}
              title={ambienceEnabled ? 'Tắt âm thanh môi trường' : 'Bật âm thanh môi trường'}
              className={`p-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                ambienceEnabled 
                  ? 'bg-primary/10 border-primary/30 text-primary' 
                  : 'bg-surface-container-low border-outline-variant text-outline'
              }`}
            >
              {ambienceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="hidden sm:inline">Ambience</span>
            </button>

            {/* Speed Controller */}
            <div className="flex items-center bg-surface-container-low border border-outline-variant/60 rounded-xl p-1 gap-1">
              {[0.75, 1.0, 1.25].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSpeechSpeed(spd)}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    speechSpeed === spd
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Stage: Character NPC & Speech Bubble */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Character Header */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-high border border-outline-variant flex items-center justify-center text-3xl shadow-inner relative">
                {summary.characterAvatar}
                {isPlayingAudio && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary" />
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-on-surface">{currentNode.speakerName}</h3>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                    {summary.characterRole}
                  </span>
                </div>
                <p className="text-xs text-outline mt-0.5">Bối cảnh: {summary.ambienceType}</p>
              </div>
            </div>

            {/* Audio Replay & Blind Listening Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBlindMode(!blindMode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                  blindMode 
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300' 
                    : 'bg-surface-container-low border-outline-variant text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {blindMode ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{blindMode ? 'Blind Mode (Đang ẩn)' : 'Luyện Tai (Ẩn Chữ)'}</span>
              </button>

              <button
                onClick={playCurrentNodeSpeech}
                disabled={isPlayingAudio}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {isPlayingAudio ? (
                  <>
                    <Radio size={14} className="animate-pulse" /> Đang nói...
                  </>
                ) : (
                  <>
                    <Play size={14} /> Nghe Lại
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Speech Bubble / Dialogue Display */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface-container-low border border-outline-variant/50 relative">
            {blindMode ? (
              <div className="text-center py-6 space-y-3">
                <Headphones size={36} className="mx-auto text-primary animate-bounce opacity-80" />
                <p className="text-sm font-bold text-on-surface">Đang ở chế độ Blind Listening (Luyện tai không phụ đề)</p>
                <p className="text-xs text-on-surface-variant">Lắng nghe thật kỹ giọng đọc của nhân vật trước khi chọn câu đối đáp hoặc bấm mở phụ đề.</p>
                <button
                  onClick={() => setBlindMode(false)}
                  className="text-xs text-primary font-bold underline cursor-pointer hover:opacity-80"
                >
                  Hiển thị phụ đề tiếng Nhật & Tiếng Việt
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Japanese text with Furigana */}
                <div className="text-2xl md:text-3xl text-on-surface font-medium leading-loose">
                  {renderJapaneseWithFurigana(currentNode.furiganaText || currentNode.japaneseText)}
                </div>

                {/* Romaji */}
                {showRomaji && currentNode.romajiText && (
                  <p className="text-xs font-mono text-outline italic">
                    {currentNode.romajiText}
                  </p>
                )}

                {/* Vietnamese Meaning */}
                {showVietnamese && currentNode.vietnameseText && (
                  <p className="text-sm text-on-surface-variant font-medium pt-2 border-t border-outline-variant/30">
                    💡 <span className="font-semibold text-on-surface">Nghĩa:</span> {currentNode.vietnameseText}
                  </p>
                )}

                {/* Cultural Note */}
                {currentNode.culturalNote && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs">
                    <Sparkles size={14} className="flex-shrink-0 mt-0.5 text-amber-600" />
                    <span><strong className="font-bold">Mẹo văn hóa:</strong> {currentNode.culturalNote}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Subtitle Assist Bar */}
          {!blindMode && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-outline-variant/40 text-xs font-medium text-on-surface-variant">
              <span>Trợ năng hiển thị:</span>
              <button
                onClick={() => setShowFurigana(!showFurigana)}
                className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer font-bold ${
                  showFurigana ? 'bg-primary/10 border-primary text-primary' : 'bg-surface-container border-outline-variant text-outline'
                }`}
              >
                Furigana
              </button>
              <button
                onClick={() => setShowRomaji(!showRomaji)}
                className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer font-bold ${
                  showRomaji ? 'bg-primary/10 border-primary text-primary' : 'bg-surface-container border-outline-variant text-outline'
                }`}
              >
                Romaji
              </button>
              <button
                onClick={() => setShowVietnamese(!showVietnamese)}
                className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer font-bold ${
                  showVietnamese ? 'bg-primary/10 border-primary text-primary' : 'bg-surface-container border-outline-variant text-outline'
                }`}
              >
                Dịch Nghĩa TV
              </button>
            </div>
          )}
        </div>

        {/* Mini-Quiz Check (If Node has comprehension check) */}
        {currentNode.quiz && (
          <div className="bg-surface-container-lowest border-2 border-primary/30 rounded-3xl p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <HelpCircle size={18} />
              <span>Thử Thách Nghe Hiểu Tức Thì (Comprehension Check)</span>
            </div>
            <p className="text-base font-bold text-on-surface">{currentNode.quiz.questionJp}</p>
            <p className="text-xs text-on-surface-variant font-medium">{currentNode.quiz.questionVi}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentNode.quiz.options.map((optionText, idx) => {
                const isSelected = selectedQuizAnswer === idx;
                const isCorrect = isQuizSubmitted && idx === currentNode.quiz!.correctAnswerIndex;
                const isWrong = isQuizSubmitted && isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    disabled={isQuizSubmitted}
                    onClick={() => handleQuizAnswer(idx, currentNode.quiz!)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                      isCorrect 
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold'
                        : isWrong
                        ? 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-200'
                        : isSelected
                        ? 'bg-primary/10 border-primary text-primary font-bold'
                        : 'bg-surface-container-low border-outline-variant/60 hover:bg-surface-container-high text-on-surface'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center text-[10px] font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{optionText}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {isQuizSubmitted && (
              <div className="p-3 rounded-xl bg-surface-container text-xs text-on-surface-variant">
                <strong className="text-on-surface font-bold">Giải thích:</strong> {currentNode.quiz.explanation}
              </div>
            )}
          </div>
        )}

        {/* Branching Dialogue Decisions (User Options) */}
        {!currentNode.isEnding && currentNode.options && currentNode.options.length > 0 && (
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 shadow-md space-y-4">
            <h4 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <MessageSquare size={16} className="text-primary" />
              <span>Chọn Câu Trả Lời & Đối Đáp Của Bạn:</span>
            </h4>

            <div className="space-y-3">
              {currentNode.options.map((opt) => (
                <button
                  key={opt.optionId}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full p-4 rounded-2xl border border-outline-variant/60 bg-surface-container-low hover:bg-surface-container hover:border-primary/50 text-left transition-all duration-200 cursor-pointer group shadow-xs hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-base font-bold text-on-surface group-hover:text-primary transition-colors font-serif">
                        {opt.japaneseText}
                      </p>
                      <p className="text-xs text-on-surface-variant font-medium">
                        {opt.vietnameseText}
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-outline group-hover:text-primary transition-transform group-hover:translate-x-1 flex-shrink-0 mt-1" />
                  </div>
                </button>
              ))}
            </div>

            {lastFeedback && (
              <p className="text-xs text-primary font-bold italic pt-1">
                💬 {lastFeedback}
              </p>
            )}
          </div>
        )}

        {/* Completed Modal */}
        {isCompleted && sessionResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl shadow-2xl max-w-lg w-full p-8 text-center space-y-6 relative overflow-hidden animate-scale-up">
              <div className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-3xl mx-auto shadow-inner">
                🎉
              </div>

              <div>
                <h3 className="text-2xl font-bold text-on-surface font-serif">Hoàn Thành Kịch Bản Luyện Nghe!</h3>
                <p className="text-xs text-on-surface-variant mt-1">{summary.title}</p>
              </div>

              {/* Performance Score Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/40">
                  <p className="text-[10px] uppercase font-bold text-outline">Tổng Điểm</p>
                  <p className="text-2xl font-black text-primary">{sessionResult.totalScore}</p>
                </div>
                <div className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/40">
                  <p className="text-[10px] uppercase font-bold text-outline">Độ Hiểu Nghe</p>
                  <p className="text-2xl font-black text-sky-600">{sessionResult.listeningAccuracyPercent}%</p>
                </div>
                <div className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/40">
                  <p className="text-[10px] uppercase font-bold text-outline">Ứng Xử</p>
                  <p className="text-2xl font-black text-amber-600">{sessionResult.etiquetteScorePercent}%</p>
                </div>
              </div>

              {/* Rewards */}
              <div className="flex items-center justify-center gap-6 py-2">
                <div className="flex items-center gap-1.5 text-amber-600 font-bold text-sm">
                  <Zap size={18} /> +{sessionResult.earnedXp} XP
                </div>
                <div className="flex items-center gap-1.5 text-yellow-600 font-bold text-sm">
                  <Flame size={18} /> +{sessionResult.earnedCoins} Coins
                </div>
              </div>

              {sessionResult.badgeUnlocked && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-800 dark:text-amber-200">
                  🏆 Đã Mở Khóa: {sessionResult.badgeUnlocked}
                </div>
              )}

              <p className="text-xs text-on-surface-variant leading-relaxed">
                {sessionResult.feedbackMessage}
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => startScenario(summary)}
                  className="flex-1 py-3 px-4 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-surface-container text-xs font-bold text-on-surface cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw size={14} /> Luyện Lại
                </button>
                <button
                  onClick={exitToCatalog}
                  className="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Chọn Bài Khác <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // RENDER: SCENARIO CATALOG BROWSER (200 SCENARIOS ACROSS N5 - N1)
  // =========================================================================
  return (
    <div ref={roomRef} className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      {/* Hero Banner Header */}
      <div className="relative rounded-3xl bg-gradient-to-br from-surface-container-low via-surface-container-lowest to-primary/5 border border-outline-variant/60 p-6 md:p-10 overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary text-xs font-bold tracking-wide">
            <Headphones size={14} />
            <span>PHÒNG LUYỆN NGHE TÌNH HUỐNG THỰC TẾ (200 BÀI HỌC)</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-on-surface font-serif tracking-tight">
            Luyện Tai Nghe Chuẩn Bản Xứ
          </h1>

          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Hòa mình vào các tình huống thực tế sống động tại Nhật Bản với âm thanh môi trường 3D, cây hội thoại rẽ nhánh và hệ thống câu hỏi phản xạ phân tầng từ <strong>N5 (20 bài)</strong> đến <strong>N1 (60 bài)</strong>.
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-bold text-on-surface-variant pt-2">
            <span className="flex items-center gap-1.5">🟢 N5 (20 bài chậm rãi)</span>
            <span className="flex items-center gap-1.5">🟡 N4 (30 bài đời sống)</span>
            <span className="flex items-center gap-1.5">🟠 N3 (40 bài công sở)</span>
            <span className="flex items-center gap-1.5">🔴 N2 (50 bài thương mại)</span>
            <span className="flex items-center gap-1.5">🟣 N1 (60 bài học thuật)</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="space-y-4">
        {/* Level Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'ALL', label: 'Tất Cả (200)' },
            { id: 'N5', label: 'N5 Nhập Môn (20)' },
            { id: 'N4', label: 'N4 Cơ Bản (30)' },
            { id: 'N3', label: 'N3 Trung Cấp (40)' },
            { id: 'N2', label: 'N2 Nâng Cao (50)' },
            { id: 'N1', label: 'N1 Chuyên Gia (60)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedLevel(tab.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex-shrink-0 ${
                selectedLevel === tab.id
                  ? 'bg-primary text-on-primary shadow-md scale-105'
                  : 'bg-surface-container-low border border-outline-variant/60 text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Pills & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {[
              { id: 'ALL', label: 'Tất Cả Chủ Đề' },
              { id: 'DINING', label: '🍽️ Ẩm Thực' },
              { id: 'TRAVEL', label: '🚄 Du Lịch & Ga Tàu' },
              { id: 'SHOPPING', label: '🛍️ Mua Sắm & Konbini' },
              { id: 'WORK', label: '💼 Công Sở & Phỏng Vấn' },
              { id: 'HEALTH', label: '🏥 Y Tế & Sức Khỏe' },
              { id: 'LIFE', label: '🎓 Đời Sống Hàng Ngày' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-surface-container-highest border border-primary text-primary font-bold'
                    : 'bg-surface-container-low border border-outline-variant/40 text-outline hover:text-on-surface'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Tìm kiếm theo tiêu đề hoặc từ khóa..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container-low border border-outline-variant/60 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Scenario Grid */}
      {loading ? (
        <div className="text-center py-20 space-y-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-on-surface-variant font-bold">Đang tải danh mục bài nghe...</p>
        </div>
      ) : scenarios.length === 0 ? (
        <div className="text-center py-16 bg-surface-container-low border border-outline-variant/60 rounded-3xl p-8 space-y-2">
          <p className="text-base font-bold text-on-surface">Không tìm thấy bài nghe phù hợp</p>
          <p className="text-xs text-outline">Hãy thử thay đổi bộ lọc cấp độ hoặc từ khóa tìm kiếm.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {scenarios.map((s) => (
            <div
              key={s.id}
              onClick={() => startScenario(s)}
              className="group bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/60 hover:border-primary/50 rounded-3xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-lg relative overflow-hidden"
            >
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    s.level === 'N5' ? 'bg-emerald-100 text-emerald-800' :
                    s.level === 'N4' ? 'bg-sky-100 text-sky-800' :
                    s.level === 'N3' ? 'bg-amber-100 text-amber-800' :
                    s.level === 'N2' ? 'bg-orange-100 text-orange-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    JLPT {s.level}
                  </span>

                  <span className="text-[11px] font-bold text-outline flex items-center gap-1">
                    <Clock size={12} /> {s.durationMin} phút
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors font-serif leading-snug line-clamp-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-outline font-medium truncate mt-0.5">
                    {s.titleJp}
                  </p>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                  {s.description}
                </p>
              </div>

              {/* Footer Character & Action */}
              <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{s.characterAvatar}</span>
                  <div>
                    <p className="text-xs font-bold text-on-surface">{s.characterName}</p>
                    <p className="text-[10px] text-outline">{s.characterRole}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-on-primary text-xs font-bold transition-all">
                  Luyện Nghe <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
