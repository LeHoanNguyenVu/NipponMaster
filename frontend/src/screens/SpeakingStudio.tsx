import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, ArrowLeft, Send, MessageCircle, Star, Award, RotateCcw, ChevronRight, Loader2, AlertTriangle, Sparkles } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { speakingApi, type SpeakingScenario, type ConversationEntry, type CorrectionItem, type ScoreBreakdown, type SpeakingTurnResponse } from '../api/speakingApi';

// ===== Types =====
type ViewState = 'scenarios' | 'conversation' | 'report';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  reading?: string;
  meaning?: string;
  corrections?: CorrectionItem[];
  score?: ScoreBreakdown;
}

// ===== SpeechRecognition Types =====
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

import ShadowingStudio from './ShadowingStudio';

// ===== Main Component =====
export default function SpeakingStudio() {
  const [subTab, setSubTab] = useState<'scenarios' | 'pitch'>('scenarios');
  const [view, setView] = useState<ViewState>('scenarios');

  if (subTab === 'pitch') {
    return (
      <div className="space-y-4">
        <div className="max-w-5xl mx-auto px-4 md:px-8 pt-4">
          <div className="flex bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/60 gap-1 w-fit">
            <button
              onClick={() => setSubTab('scenarios')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container-high cursor-pointer"
            >
              💬 Luyện Nói Thoại AI
            </button>
            <button
              onClick={() => setSubTab('pitch')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-on-primary shadow-sm cursor-pointer"
            >
              🎙️ Shadowing & Pitch Accent Studio
            </button>
          </div>
        </div>
        <ShadowingStudio />
      </div>
    );
  }
  const [scenarios, setScenarios] = useState<SpeakingScenario[]>([]);
  const [activeScenario, setActiveScenario] = useState<SpeakingScenario | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationHistory, setConversationHistory] = useState<ConversationEntry[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [allScores, setAllScores] = useState<ScoreBreakdown[]>([]);
  const [allCorrections, setAllCorrections] = useState<CorrectionItem[]>([]);
  const [isLoadingScenarios, setIsLoadingScenarios] = useState(true);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // ===== Load Scenarios =====
  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    setIsLoadingScenarios(true);
    try {
      const res = await speakingApi.getScenarios();
      setScenarios(res.data || []);
    } catch {
      // Fallback scenarios for offline/demo
      setScenarios([
        { id: 'hotel', title: 'Đặt phòng khách sạn', titleJp: 'ホテルの予約', description: 'Thực hành gọi điện đặt phòng khách sạn ở Tokyo.', icon: '🏨', level: 'N5', aiGreeting: 'いらっしゃいませ。東京ホテルでございます。ご予約のお問い合わせでしょうか？', aiGreetingReading: 'Irashaimase. Tōkyō hoteru de gozaimasu.', suggestedPhrases: ['予約したいです。', 'シングルルームをお願いします。', '二泊三日でお願いします。'] },
        { id: 'restaurant', title: 'Gọi món tại nhà hàng', titleJp: 'レストランで注文する', description: 'Thực hành gọi món ăn tại nhà hàng Nhật Bản.', icon: '🍣', level: 'N5', aiGreeting: 'いらっしゃいませ。何名様ですか？', aiGreetingReading: 'Irashaimase. Nan-mei-sama desu ka?', suggestedPhrases: ['一人です。', 'メニューをお願いします。', 'おすすめは何ですか？'] },
        { id: 'interview', title: 'Phỏng vấn xin việc', titleJp: '面接', description: 'Thực hành buổi phỏng vấn xin việc tại công ty Nhật.', icon: '💼', level: 'N4', aiGreeting: '本日はお越しいただきありがとうございます。まず、自己紹介をお願いします。', aiGreetingReading: 'Honjitsu wa okoshi itadaki arigatō gozaimasu.', suggestedPhrases: ['はじめまして。', 'ベトナムから来ました。', '日本語を勉強しています。'] },
        { id: 'directions', title: 'Hỏi đường đi', titleJp: '道を聞く', description: 'Thực hành hỏi đường khi lạc ở Shibuya, Tokyo.', icon: '🗺️', level: 'N5', aiGreeting: 'こんにちは。何かお困りですか？', aiGreetingReading: 'Konnichiwa. Nanika okomari desu ka?', suggestedPhrases: ['すみません、駅はどこですか？', 'この近くにコンビニはありますか？'] },
        { id: 'shopping', title: 'Mua sắm', titleJp: '買い物', description: 'Thực hành mua sắm tại cửa hàng ở Harajuku.', icon: '🛍️', level: 'N5', aiGreeting: 'いらっしゃいませ。何かお探しですか？', aiGreetingReading: 'Irashaimase. Nanika osagashi desu ka?', suggestedPhrases: ['Tシャツを探しています。', 'これはいくらですか？'] },
        { id: 'hospital', title: 'Khám bệnh', titleJp: '病院で', description: 'Thực hành khám bệnh tại phòng khám Nhật Bản.', icon: '🏥', level: 'N4', aiGreeting: 'こんにちは。今日はどうされましたか？', aiGreetingReading: 'Konnichiwa. Kyō wa dō saremashita ka?', suggestedPhrases: ['頭が痛いです。', '熱があります。', '昨日から具合が悪いです。'] },
      ]);
    } finally {
      setIsLoadingScenarios(false);
    }
  };

  // ===== Init Speech Recognition =====
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final_transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final_transcript += transcript;
        } else {
          interim += transcript;
        }
      }
      if (final_transcript) {
        setTextInput(prev => prev + final_transcript);
        setInterimTranscript('');
      } else {
        setInterimTranscript(interim);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript('');
    };

    recognition.onerror = () => {
      setIsListening(false);
      setInterimTranscript('');
    };

    recognitionRef.current = recognition;
  }, []);

  // ===== Auto-scroll chat =====
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, interimTranscript]);

  // ===== Handlers =====
  const handleSelectScenario = async (scenario: SpeakingScenario) => {
    setActiveScenario(scenario);
    setMessages([]);
    setConversationHistory([]);
    setAllScores([]);
    setAllCorrections([]);
    setView('conversation');

    try {
      const res = await speakingApi.startScenario(scenario.id);
      const data = res.data || scenario;
      const greeting: ChatMessage = {
        id: 'ai-0',
        role: 'ai',
        text: data.aiGreeting || scenario.aiGreeting,
        reading: data.aiGreetingReading || scenario.aiGreetingReading,
        meaning: '',
      };
      setMessages([greeting]);
      setConversationHistory([{ role: 'ai', message: greeting.text }]);
      speakJapanese(greeting.text);
    } catch {
      const greeting: ChatMessage = {
        id: 'ai-0',
        role: 'ai',
        text: scenario.aiGreeting,
        reading: scenario.aiGreetingReading,
      };
      setMessages([greeting]);
      setConversationHistory([{ role: 'ai', message: greeting.text }]);
      speakJapanese(greeting.text);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInterimTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakJapanese = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = useCallback(async (messageText?: string) => {
    const text = (messageText || textInput).trim();
    if (!text || isProcessing || !activeScenario) return;

    // Stop listening if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
    };
    setMessages(prev => [...prev, userMsg]);
    setTextInput('');
    setInterimTranscript('');
    setIsProcessing(true);

    const newHistory: ConversationEntry[] = [...conversationHistory, { role: 'user', message: text }];
    setConversationHistory(newHistory);

    try {
      const res = await speakingApi.sendTurn(activeScenario.id, text, newHistory);
      const data: SpeakingTurnResponse = res.data;

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        text: data.aiReply,
        reading: data.aiReplyReading,
        meaning: data.aiReplyMeaning,
        corrections: data.corrections,
        score: data.score,
      };
      setMessages(prev => [...prev, aiMsg]);
      setConversationHistory(prev => [...prev, { role: 'ai', message: data.aiReply }]);

      if (data.score) setAllScores(prev => [...prev, data.score]);
      if (data.corrections?.length) setAllCorrections(prev => [...prev, ...data.corrections]);
      if (data.suggestedNextPhrases?.length && activeScenario) {
        setActiveScenario({ ...activeScenario, suggestedPhrases: data.suggestedNextPhrases });
      }

      speakJapanese(data.aiReply);

      if (data.conversationComplete) {
        setTimeout(() => setView('report'), 2500);
      }
    } catch {
      const fallbackAiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        text: 'はい、分かりました。もう少し詳しく教えていただけますか？',
        reading: 'Hai, wakarimashita. Mō sukoshi kuwashiku oshiete itadakemasu ka?',
        meaning: 'Vâng, tôi hiểu rồi. Bạn có thể nói rõ hơn được không?',
      };
      setMessages(prev => [...prev, fallbackAiMsg]);
      setConversationHistory(prev => [...prev, { role: 'ai', message: fallbackAiMsg.text }]);
      speakJapanese(fallbackAiMsg.text);
    } finally {
      setIsProcessing(false);
    }
  }, [textInput, isProcessing, activeScenario, conversationHistory, isListening]);

  const handleFinishConversation = () => {
    setView('report');
  };

  const handleRestart = () => {
    if (activeScenario) handleSelectScenario(activeScenario);
  };

  const handleBackToScenarios = () => {
    window.speechSynthesis?.cancel();
    setView('scenarios');
    setActiveScenario(null);
    setMessages([]);
    setConversationHistory([]);
  };

  // ===== Compute final report =====
  const avgScore: ScoreBreakdown = allScores.length > 0
    ? {
        pronunciation: Math.round(allScores.reduce((s, x) => s + x.pronunciation, 0) / allScores.length),
        grammar: Math.round(allScores.reduce((s, x) => s + x.grammar, 0) / allScores.length),
        vocabulary: Math.round(allScores.reduce((s, x) => s + x.vocabulary, 0) / allScores.length),
        overall: Math.round(allScores.reduce((s, x) => s + x.overall, 0) / allScores.length),
        feedback: allScores[allScores.length - 1]?.feedback || '',
      }
    : { pronunciation: 75, grammar: 70, vocabulary: 72, overall: 72, feedback: '頑張りましょう！' };

  // ===== RENDER =====

  // --- Scenario Picker ---
  if (view === 'scenarios') {
    return (
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Sub-Tab Bar */}
          <div className="flex bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/60 gap-1 w-fit mb-6">
            <button
              onClick={() => setSubTab('scenarios')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-on-primary shadow-sm cursor-pointer"
            >
              💬 Luyện Nói Thoại AI
            </button>
            <button
              onClick={() => setSubTab('pitch')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container-high cursor-pointer"
            >
              🎙️ Shadowing & Pitch Accent Studio
            </button>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white text-xl shadow-lg">
                🎤
              </div>
              <div>
                <h1 className="text-2xl font-bold text-on-surface">AI Speaking Studio</h1>
                <p className="text-sm text-on-surface-variant">会話練習 — Phòng luyện nói thoại AI tiếng Nhật</p>
              </div>
            </div>
            <p className="text-on-surface-variant mt-3 max-w-2xl">
              Chọn một kịch bản bên dưới để bắt đầu thực hành hội thoại. AI sẽ đóng vai nhân viên/người Nhật, 
              phản hồi theo thời gian thực, chấm điểm phát âm và sửa lỗi ngữ pháp cho bạn.
            </p>
          </div>

          {/* Scenarios Grid */}
          {isLoadingScenarios ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
              <span className="ml-3 text-on-surface-variant">Đang tải kịch bản...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {scenarios.map((scenario, i) => (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Card
                    className="group relative overflow-hidden cursor-pointer border border-outline-variant/40 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                    onClick={() => handleSelectScenario(scenario)}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-4xl">{scenario.icon}</span>
                        <Badge variant="outline" className="text-xs font-medium">
                          {scenario.level}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-on-surface mb-1 group-hover:text-primary transition-colors">
                        {scenario.title}
                      </h3>
                      <p className="text-sm font-medium text-primary/70 font-jp mb-3">
                        {scenario.titleJp}
                      </p>
                      <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">
                        {scenario.description}
                      </p>
                      <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                        <MessageCircle size={16} />
                        Bắt đầu hội thoại
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Speech API Support Notice */}
          {!speechSupported && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="mt-6 p-4 rounded-2xl bg-tertiary/10 border border-tertiary/20 flex items-start gap-3"
            >
              <AlertTriangle size={20} className="text-tertiary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-on-surface">Trình duyệt không hỗ trợ Web Speech API</p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Bạn vẫn có thể nhập câu bằng bàn phím. Để sử dụng tính năng nhận diện giọng nói, hãy dùng Google Chrome hoặc Microsoft Edge.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // --- Conversation View ---
  if (view === 'conversation' && activeScenario) {
    return (
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Conversation Header */}
        <div className="flex-shrink-0 px-4 md:px-6 py-3 border-b border-outline-variant/30 bg-surface-container-low/80 backdrop-blur-sm">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleBackToScenarios}
                className="p-2 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <ArrowLeft size={18} className="text-on-surface-variant" />
              </button>
              <span className="text-2xl">{activeScenario.icon}</span>
              <div>
                <h2 className="text-sm font-semibold text-on-surface">{activeScenario.title}</h2>
                <p className="text-xs text-on-surface-variant font-jp">{activeScenario.titleJp}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleFinishConversation}
              className="text-xs"
            >
              <Award size={14} className="mr-1" />
              Kết thúc & Chấm điểm
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
          <div className="max-w-3xl mx-auto space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'order-2' : ''}`}>
                    {/* Bubble */}
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-sm ${
                        msg.role === 'ai'
                          ? 'bg-surface-container-low border border-outline-variant/30 rounded-tl-md'
                          : 'bg-primary text-on-primary rounded-tr-md'
                      }`}
                    >
                      <p className={`text-sm leading-relaxed font-jp ${msg.role === 'ai' ? 'text-on-surface' : ''}`}>
                        {msg.text}
                      </p>
                      {msg.reading && (
                        <p className={`text-xs mt-1 italic ${msg.role === 'ai' ? 'text-on-surface-variant' : 'text-on-primary/70'}`}>
                          {msg.reading}
                        </p>
                      )}
                      {msg.meaning && (
                        <p className={`text-xs mt-1 ${msg.role === 'ai' ? 'text-secondary' : 'text-on-primary/80'}`}>
                          💬 {msg.meaning}
                        </p>
                      )}
                    </div>

                    {/* AI Controls */}
                    {msg.role === 'ai' && (
                      <div className="flex items-center gap-2 mt-1.5 ml-1">
                        <button
                          onClick={() => speakJapanese(msg.text)}
                          className="p-1.5 rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant cursor-pointer"
                          title="Nghe phát âm"
                        >
                          <Volume2 size={14} className={isSpeaking ? 'text-primary animate-pulse' : ''} />
                        </button>
                      </div>
                    )}

                    {/* Corrections for user messages */}
                    {msg.corrections && msg.corrections.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        className="mt-2 space-y-1.5"
                      >
                        {msg.corrections.map((c, ci) => (
                          <div key={ci} className="flex items-start gap-2 p-2.5 rounded-xl bg-tertiary/8 border border-tertiary/15">
                            <Sparkles size={13} className="text-tertiary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-on-surface font-medium">{c.explanation}</p>
                              {c.corrected !== c.original && (
                                <p className="text-xs text-secondary mt-0.5 font-jp">✓ {c.corrected}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* Score for user messages */}
                    {msg.score && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-2 flex items-center gap-3 text-xs text-on-surface-variant"
                      >
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          Phát âm: {msg.score.pronunciation}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-secondary" />
                          Ngữ pháp: {msg.score.grammar}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-tertiary" />
                          Từ vựng: {msg.score.vocabulary}
                        </span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Interim transcript display */}
            {interimTranscript && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-primary/20 border border-primary/30 rounded-tr-md">
                  <p className="text-sm text-on-surface font-jp italic">{interimTranscript}</p>
                  <p className="text-xs text-on-surface-variant mt-1">🎤 Đang nghe...</p>
                </div>
              </motion.div>
            )}

            {/* Processing indicator */}
            {isProcessing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-tl-md">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-on-surface-variant">AI đang suy nghĩ...</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Suggested Phrases */}
        {activeScenario.suggestedPhrases?.length > 0 && (
          <div className="flex-shrink-0 px-4 md:px-6 py-2 border-t border-outline-variant/20 bg-surface/50">
            <div className="max-w-3xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs text-on-surface-variant flex-shrink-0">Gợi ý:</span>
              {activeScenario.suggestedPhrases.map((phrase, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(phrase)}
                  disabled={isProcessing}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 text-xs font-jp text-on-surface hover:bg-primary/10 hover:border-primary/30 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="flex-shrink-0 px-4 md:px-6 py-3 border-t border-outline-variant/30 bg-surface-container-low/80 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            {/* Microphone Button */}
            {speechSupported && (
              <button
                onClick={toggleListening}
                disabled={isProcessing}
                className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer flex-shrink-0 ${
                  isListening
                    ? 'bg-error text-on-error shadow-lg shadow-error/30 scale-110'
                    : 'bg-primary text-on-primary hover:shadow-lg hover:scale-105'
                } disabled:opacity-50`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                {isListening && (
                  <span className="absolute inset-0 rounded-full border-2 border-error animate-ping opacity-40" />
                )}
              </button>
            )}

            {/* Text Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Nhập tiếng Nhật hoặc nhấn 🎤 để nói..."
                className="w-full px-4 py-3 rounded-2xl bg-surface-container border border-outline-variant/30 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all font-jp"
                disabled={isProcessing}
              />
            </div>

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!textInput.trim() || isProcessing}
              className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-40 cursor-pointer flex-shrink-0"
            >
              {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Score Report View ---
  if (view === 'report') {
    const userMsgCount = messages.filter(m => m.role === 'user').length;
    return (
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white text-3xl shadow-xl mb-4"
            >
              🏆
            </motion.div>
            <h2 className="text-2xl font-bold text-on-surface">Kết Quả Luyện Nói</h2>
            <p className="text-sm text-on-surface-variant mt-1">
              {activeScenario?.title} — {userMsgCount} lượt nói
            </p>
          </div>

          {/* Overall Score Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-surface-container)" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="52" fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(avgScore.overall / 100) * 327} 327`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary">{avgScore.overall}</span>
                <span className="text-xs text-on-surface-variant">điểm tổng</span>
              </div>
            </div>
          </motion.div>

          {/* Score Breakdown */}
          <Card className="p-6 mb-6 border border-outline-variant/30">
            <h3 className="text-sm font-semibold text-on-surface mb-4">Phân tích chi tiết</h3>
            <div className="space-y-4">
              {[
                { label: 'Phát âm', labelJp: '発音', value: avgScore.pronunciation, color: 'bg-primary' },
                { label: 'Ngữ pháp', labelJp: '文法', value: avgScore.grammar, color: 'bg-secondary' },
                { label: 'Từ vựng', labelJp: '語彙', value: avgScore.vocabulary, color: 'bg-tertiary' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-on-surface">{item.label}</span>
                      <span className="text-xs text-on-surface-variant font-jp">({item.labelJp})</span>
                    </div>
                    <span className="text-sm font-bold text-on-surface">{item.value}/100</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-surface-container overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ delay: 0.7 + i * 0.15, duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feedback */}
            <div className="mt-5 p-3 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm text-on-surface font-jp">{avgScore.feedback}</p>
            </div>
          </Card>

          {/* Corrections Summary */}
          {allCorrections.length > 0 && (
            <Card className="p-6 mb-6 border border-outline-variant/30">
              <h3 className="text-sm font-semibold text-on-surface mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-tertiary" />
                Các điểm cần cải thiện ({allCorrections.length})
              </h3>
              <div className="space-y-3">
                {allCorrections.slice(0, 8).map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.05 }}
                    className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20"
                  >
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="text-[10px] flex-shrink-0 mt-0.5">
                        {c.type === 'grammar' ? '文法' : c.type === 'vocabulary' ? '語彙' : '発音'}
                      </Badge>
                      <p className="text-xs text-on-surface">{c.explanation}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button onClick={handleRestart} className="w-full sm:w-auto">
              <RotateCcw size={16} className="mr-2" />
              Thử lại kịch bản này
            </Button>
            <Button variant="outline" onClick={handleBackToScenarios} className="w-full sm:w-auto">
              <ArrowLeft size={16} className="mr-2" />
              Chọn kịch bản khác
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}
