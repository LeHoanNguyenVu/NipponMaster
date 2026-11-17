import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Bot,
  Send,
  Square,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  Sparkles,
  PanelLeft,
  AlertCircle,
  Compass,
  BookmarkPlus,
  BookMarked,
  Wand2,
  Keyboard,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { senseiApi, type ChatSession, type ChatMessage, type SavedCard } from '../api/senseiApi';
import { SenseiMarkdown } from '../components/SenseiMarkdown';
import { JapaneseVirtualKeyboard } from '../components/JapaneseVirtualKeyboard';

export interface QuickAskRequest {
  id: number;
  context: string;
  prompt?: string;
}

interface SenseiChatProps {
  quickAsk?: QuickAskRequest | null;
  onConsumeQuickAsk?: () => void;
}

const PERSONALIZED_ACTIONS_VI = [
  {
    label: 'Giải thích chỗ tôi hay sai',
    prompt:
      'Dựa vào kết quả thi thử, các chương Kanji/Ngữ pháp và từ vựng tôi đang yếu trên hệ thống, hãy chỉ ra những điểm tôi hay sai và giải thích cách khắc phục.',
  },
  {
    label: 'Tạo 5 câu luyện tập',
    prompt:
      'Dựa vào trình độ hiện tại và những từ vựng/ngữ pháp tôi cần củng cố, hãy tạo 5 câu bài tập ngắn (kèm đáp án và giải thích) để tôi luyện ngay.',
  },
  {
    label: 'Lập lộ trình tuần này',
    prompt:
      'Hãy lập cho tôi lộ trình học tiếng Nhật 7 ngày trong tuần này trên Nippon Master phù hợp với trình độ và phần tôi đang học dở.',
  },
];

const PERSONALIZED_ACTIONS_EN = [
  {
    label: 'Explain my common mistakes',
    prompt:
      'Based on my mock exam results and weak Kanji, Grammar, and Vocabulary chapters, please point out my common mistakes and explain how to fix them in English.',
  },
  {
    label: 'Create 5 practice questions',
    prompt:
      'Based on my current JLPT level and the vocabulary/grammar points I need to review, please create 5 short practice questions (with answers and English explanations).',
  },
  {
    label: 'Build my 7-day study plan',
    prompt:
      'Please create a personalized 7-day Japanese study plan for me this week on Nippon Master tailored to my current level and in-progress lessons.',
  },
];

const DEFAULT_TITLES = new Set(['Cuộc trò chuyện mới', 'New Conversation']);


export default function SenseiChat({ quickAsk, onConsumeQuickAsk }: SenseiChatProps) {
  const { i18n } = useTranslation();
  const isEn = (i18n.language || 'vi').startsWith('en');
  const langCode = isEn ? 'en' : 'vi';

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [pageContext, setPageContext] = useState<string | null>(null);

  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Phase 6: 1-click Save Flashcard & Sổ tay từ vựng cá nhân
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [showSavedDrawer, setShowSavedDrawer] = useState(false);
  const [selectionPopup, setSelectionPopup] = useState<{ text: string; x: number; y: number } | null>(null);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [showPersonalMenu, setShowPersonalMenu] = useState(false);
  const [showJpKeyboard, setShowJpKeyboard] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const popupBtnRef = useRef<HTMLButtonElement>(null);
  const handledQuickAskIdRef = useRef<number | null>(null);

  const displaySessionTitle = (rawTitle?: string) => {
    if (!rawTitle || DEFAULT_TITLES.has(rawTitle)) {
      return isEn ? 'New Conversation' : 'Cuộc trò chuyện mới';
    }
    return rawTitle;
  };

  useEffect(() => {
    initLoad();
    loadSavedCards();
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Xử lý fast-chatbox: tạo ngay cuộc trò chuyện mới và tự gửi tin nhắn luôn
  useEffect(() => {
    if (!quickAsk || quickAsk.id === handledQuickAskIdRef.current) return;
    handledQuickAskIdRef.current = quickAsk.id;
    onConsumeQuickAsk?.();
    handleQuickAskFlow(quickAsk);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quickAsk]);

  const initLoad = async () => {
    setLoadingSessions(true);
    setError(null);
    try {
      const list = await senseiApi.listSessions();
      setSessions(list);
      if (!quickAsk && list.length > 0) {
        selectSession(list[0].id);
      }
    } catch (err: any) {
      setError(
        err?.message ||
          (isEn
            ? 'Could not connect to Sensei AI server. Please make sure the backend is running.'
            : 'Chưa thể kết nối máy chủ Sensei AI. Hãy chắc chắn bạn đã khởi động lại backend để nạp bản cập nhật mới.')
      );
    } finally {
      setLoadingSessions(false);
    }
  };

  const loadSavedCards = async () => {
    try {
      const cards = await senseiApi.listFlashcards();
      setSavedCards(cards);
    } catch {
      // Bỏ qua nếu backend chưa khởi động lại
    }
  };

  const handleQuickAskFlow = async (req: QuickAskRequest) => {
    if (isStreaming) {
      abortRef.current?.abort();
      setIsStreaming(false);
    }
    setError(null);
    setPageContext(req.context || null);
    setMessages([]);
    try {
      const created = await senseiApi.createSession({ language: langCode });
      setSessions((prev) => [created, ...prev]);
      setActiveSessionId(created.id);

      if (req.prompt && req.prompt.trim()) {
        await sendToSession(created.id, req.prompt.trim(), req.context || undefined);
      } else {
        textareaRef.current?.focus();
      }
    } catch (err: any) {
      setError(
        err?.message ||
          (isEn ? 'Could not start a new conversation.' : 'Không thể khởi tạo cuộc trò chuyện mới.')
      );
    }
  };

  const selectSession = async (sessionId: number) => {
    if (isStreaming) {
      abortRef.current?.abort();
      setIsStreaming(false);
    }
    setActiveSessionId(sessionId);
    setMobileSidebarOpen(false);
    setLoadingMessages(true);
    setError(null);
    try {
      const msgs = await senseiApi.getMessages(sessionId);
      setMessages(msgs);
    } catch (err: any) {
      setError(
        err?.message ||
          (isEn ? 'Failed to load conversation history.' : 'Không tải được lịch sử hội thoại.')
      );
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleNewChat = async () => {
    if (isStreaming) {
      abortRef.current?.abort();
      setIsStreaming(false);
    }
    setError(null);
    setPageContext(null);
    try {
      const created = await senseiApi.createSession({ language: langCode });
      setSessions((prev) => [created, ...prev]);
      setActiveSessionId(created.id);
      setMessages([]);
      setMobileSidebarOpen(false);
      textareaRef.current?.focus();
    } catch (err: any) {
      setError(
        err?.message ||
          (isEn ? 'Failed to create a new conversation.' : 'Không tạo được cuộc trò chuyện mới.')
      );
    }
  };

  const handleRenameSubmit = async (sessionId: number) => {
    const trimmed = editingTitle.trim();
    if (!trimmed) {
      setEditingSessionId(null);
      return;
    }
    try {
      const updated = await senseiApi.renameSession(sessionId, trimmed);
      setSessions((prev) => prev.map((s) => (s.id === sessionId ? { ...s, title: updated.title } : s)));
    } catch {
      // Giữ nguyên nếu đổi tên lỗi
    } finally {
      setEditingSessionId(null);
    }
  };

  const handleDeleteSession = async (sessionId: number) => {
    try {
      await senseiApi.deleteSession(sessionId);
      const remaining = sessions.filter((s) => s.id !== sessionId);
      setSessions(remaining);
      if (activeSessionId === sessionId) {
        if (remaining.length > 0) {
          selectSession(remaining[0].id);
        } else {
          setActiveSessionId(null);
          setMessages([]);
        }
      }
    } catch (err: any) {
      setError(
        err?.message ||
          (isEn ? 'Failed to delete conversation.' : 'Không xóa được cuộc trò chuyện.')
      );
    }
  };

  const handleStopStream = () => {
    abortRef.current?.abort();
    setIsStreaming(false);
  };

  const sendToSession = async (targetSessionId: number, text: string, ctx?: string) => {
    const tempUserId = Date.now();
    const tempBotId = tempUserId + 1;

    const userMsg: ChatMessage = {
      id: tempUserId,
      sessionId: targetSessionId,
      role: 'USER',
      content: text,
      createdAt: new Date().toISOString(),
    };
    const botPlaceholder: ChatMessage = {
      id: tempBotId,
      sessionId: targetSessionId,
      role: 'ASSISTANT',
      content: '',
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg, botPlaceholder]);
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      await senseiApi.streamMessage(
        targetSessionId,
        {
          message: text,
          pageContext: ctx ?? (pageContext || undefined),
          language: langCode,
        },
        {
          signal: controller.signal,
          onChunk: (chunk) => {
            setMessages((prev) =>
              prev.map((m) => (m.id === tempBotId ? { ...m, content: m.content + chunk } : m))
            );
          },
          onDone: (saved) => {
            setIsStreaming(false);
            setMessages((prev) => prev.map((m) => (m.id === tempBotId ? saved : m)));
            setSessions((prev) =>
              prev.map((s) =>
                s.id === targetSessionId
                  ? {
                      ...s,
                      title: DEFAULT_TITLES.has(s.title)
                        ? text.length > 48
                          ? text.slice(0, 48) + '...'
                          : text
                        : s.title,
                      lastMessagePreview: saved.content.slice(0, 80),
                    }
                  : s
              )
            );
          },
          onError: (err) => {
            setIsStreaming(false);
            setError(err.message);
          },
        }
      );
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        setError(
          err?.message ||
            (isEn
              ? 'An error occurred while sending your question to Sensei AI.'
              : 'Đã xảy ra lỗi khi gửi câu hỏi tới Sensei AI.')
        );
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  };

  const handleSend = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || isStreaming) return;

    setShowPersonalMenu(false);
    setError(null);
    let targetSessionId = activeSessionId;

    try {
      if (!targetSessionId) {
        const created = await senseiApi.createSession({ language: langCode });
        setSessions((prev) => [created, ...prev]);
        targetSessionId = created.id;
        setActiveSessionId(created.id);
      }

      if (!overrideText) setInput('');
      await sendToSession(targetSessionId, text);
    } catch (err: any) {
      setIsStreaming(false);
      setError(
        err?.message ||
          (isEn ? 'Failed to create chat session.' : 'Đã xảy ra lỗi khi tạo phiên chat.')
      );
    }
  };

  // ---------------- Bàn phím tiếng Nhật ảo ----------------
  const handleInsertKeyboardText = (chars: string) => {
    const el = textareaRef.current;
    if (!el) {
      setInput((prev) => prev + chars);
      return;
    }
    const start = el.selectionStart ?? input.length;
    const end = el.selectionEnd ?? input.length;
    const next = input.slice(0, start) + chars + input.slice(end);
    setInput(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + chars.length;
      el.setSelectionRange(pos, pos);
    });
  };

  const handleBackspaceKeyboard = () => {
    const el = textareaRef.current;
    if (!el) {
      setInput((prev) => prev.slice(0, -1));
      return;
    }
    const start = el.selectionStart ?? input.length;
    const end = el.selectionEnd ?? input.length;
    if (start !== end) {
      const next = input.slice(0, start) + input.slice(end);
      setInput(next);
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(start, start);
      });
    } else if (start > 0) {
      const next = input.slice(0, start - 1) + input.slice(end);
      setInput(next);
      requestAnimationFrame(() => {
        el.focus();
        const pos = start - 1;
        el.setSelectionRange(pos, pos);
      });
    }
  };

  // ---------------- Bôi đen chữ Nhật -> hiện nút "+ Lưu Flashcard" chuẩn tọa độ góc ----------------
  const updateSelectionPopup = useCallback(() => {
    const sel = window.getSelection();
    const selected = sel?.toString().trim() || '';
    if (!selected || selected.length > 40 || !/[\u3040-\u30ff\u4e00-\u9faf]/.test(selected)) {
      setSelectionPopup(null);
      return;
    }

    if (!sel || sel.rangeCount === 0 || !containerRef.current || !feedRef.current) {
      setSelectionPopup(null);
      return;
    }

    // Đảm bảo vùng bôi đen nằm bên trong khung tin nhắn
    const anchorNode = sel.anchorNode;
    if (anchorNode && !feedRef.current.contains(anchorNode)) {
      setSelectionPopup(null);
      return;
    }

    const range = sel.getRangeAt(0);
    const clientRects = range.getClientRects();
    const rect = clientRects.length > 0 ? clientRects[0] : range.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) {
      setSelectionPopup(null);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const feedRect = feedRef.current.getBoundingClientRect();

    // Tính tọa độ tương đối so với containerRef (tránh hoàn toàn lỗi lệch tọa độ khi <main> có CSS transform từ GSAP)
    const pillEstimatedWidth = 250;
    const pillHeight = 36;
    const minX = Math.max(12, feedRect.left - containerRect.left + 12);
    const maxX = Math.max(minX, feedRect.right - containerRect.left - pillEstimatedWidth - 12);

    const rawX = rect.left - containerRect.left;
    const clampedX = Math.min(maxX, Math.max(minX, rawX));

    // Nếu bôi đen sát mép trên của khung chat, hiển thị nút ở ngay bên dưới dòng chữ thay vì bị che phía trên
    const minTopY = Math.max(56, feedRect.top - containerRect.top + 8);
    const maxBottomY = Math.max(minTopY, feedRect.bottom - containerRect.top - pillHeight - 8);
    const aboveY = rect.top - containerRect.top - pillHeight - 8;
    const belowY = rect.bottom - containerRect.top + 8;

    const rawY = aboveY < minTopY ? belowY : aboveY;
    const clampedY = Math.min(maxBottomY, Math.max(minTopY, rawY));

    setSelectionPopup({
      text: selected,
      x: clampedX,
      y: clampedY,
    });
  }, []);

  // Bắt sự kiện nhả chuột trên toàn cửa sổ (kể cả khi kéo chuột lố ra sát mép góc ngoài bubble)
  useEffect(() => {
    const onGlobalMouseUp = (e: MouseEvent) => {
      if (popupBtnRef.current && popupBtnRef.current.contains(e.target as Node)) {
        return;
      }
      requestAnimationFrame(updateSelectionPopup);
    };
    window.addEventListener('mouseup', onGlobalMouseUp);
    return () => window.removeEventListener('mouseup', onGlobalMouseUp);
  }, [updateSelectionPopup]);

  const handleQuickSaveWord = async () => {
    if (!selectionPopup) return;
    const word = selectionPopup.text;
    setSelectionPopup(null);
    window.getSelection()?.removeAllRanges();
    try {
      const saved = await senseiApi.saveFlashcard({ word, language: langCode });
      setSavedCards((prev) => [saved, ...prev.filter((c) => c.id !== saved.id)]);
      setSaveToast(
        isEn
          ? `Saved "${saved.word}" to Flashcard Notebook`
          : `Đã lưu "${saved.word}" vào sổ tay Flashcard`
      );
      setTimeout(() => setSaveToast(null), 2600);
    } catch {
      setSaveToast(
        isEn
          ? 'Could not save flashcard (please make sure backend is updated)'
          : 'Không lưu được thẻ (cần backend đã bật bản cập nhật mới)'
      );
      setTimeout(() => setSaveToast(null), 2600);
    }
  };

  const handleDeleteSavedCard = async (cardId: number) => {
    try {
      await senseiApi.deleteFlashcard(cardId);
      setSavedCards((prev) => prev.filter((c) => c.id !== cardId));
    } catch {}
  };

  const personalizedActions = isEn ? PERSONALIZED_ACTIONS_EN : PERSONALIZED_ACTIONS_VI;
  const activeSession = sessions.find((s) => s.id === activeSessionId);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-4rem)] flex bg-surface overflow-hidden relative"
    >
      {/* Floating 1-click Save Flashcard pill on text selection (positioned relative to containerRef) */}
      {selectionPopup && (
        <button
          ref={popupBtnRef}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleQuickSaveWord();
          }}
          style={{ left: selectionPopup.x, top: selectionPopup.y }}
          className="absolute z-50 max-w-[260px] px-3 py-1.5 rounded-full bg-primary text-on-primary shadow-lg text-xs font-bold flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer border border-on-primary/15"
        >
          <BookmarkPlus size={14} className="shrink-0" />
          <span className="truncate">
            {isEn
              ? `Save "${selectionPopup.text}" to Flashcards`
              : `Lưu "${selectionPopup.text}" vào Flashcard`}
          </span>
        </button>
      )}

      {/* Save Toast */}
      {saveToast && (
        <div className="absolute top-16 right-5 z-50 px-4 py-2.5 rounded-xl bg-surface-container-highest border border-primary/40 text-on-surface text-xs font-bold shadow-lg flex items-center gap-2">
          <Check size={14} className="text-primary" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Mobile backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Sessions Sidebar */}
      <aside
        className={`w-72 shrink-0 bg-surface-container-low border-r border-outline-variant/50 flex flex-col z-40
          fixed inset-y-0 left-0 md:relative md:translate-x-0 transition-transform duration-200
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4 border-b border-outline-variant/40 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center font-jp font-bold text-sm shadow-xs">
              先生
            </div>
            <h2 className="text-sm font-bold text-on-surface leading-tight">Sensei AI</h2>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1 text-outline hover:text-on-surface md:hidden cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-3">
          <button
            onClick={handleNewChat}
            className="w-full py-2.5 px-3 rounded-xl bg-primary text-on-primary font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-xs cursor-pointer"
          >
            <Plus size={16} />
            {isEn ? 'New Conversation' : 'Cuộc trò chuyện mới'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
          {loadingSessions ? (
            <div className="p-4 text-xs text-outline text-center">
              {isEn ? 'Loading conversations...' : 'Đang tải hội thoại...'}
            </div>
          ) : sessions.length === 0 ? (
            <div className="p-4 text-xs text-outline text-center">
              {isEn
                ? 'No conversations yet. Ask Sensei your first question!'
                : 'Chưa có hội thoại nào. Hãy đặt câu hỏi đầu tiên cho Sensei!'}
            </div>
          ) : (
            sessions.map((s) => {
              const isActive = s.id === activeSessionId;
              const isEditing = editingSessionId === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => !isEditing && selectSession(s.id)}
                  className={`group rounded-xl p-2.5 cursor-pointer transition-colors border ${
                    isActive
                      ? 'bg-primary/10 border-primary/30 text-on-surface'
                      : 'border-transparent hover:bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {isEditing ? (
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRenameSubmit(s.id);
                          if (e.key === 'Escape') setEditingSessionId(null);
                        }}
                        autoFocus
                        className="flex-1 min-w-0 bg-surface-container-lowest border border-primary/50 rounded-lg px-2 py-1 text-xs text-on-surface focus:outline-none"
                      />
                      <button
                        onClick={() => handleRenameSubmit(s.id)}
                        className="p-1 text-primary hover:bg-primary/10 rounded cursor-pointer"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => setEditingSessionId(null)}
                        className="p-1 text-outline hover:text-error rounded cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold truncate">
                            {displaySessionTitle(s.title)}
                          </span>
                          {s.jlptLevel && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-container-high text-primary font-mono shrink-0">
                              {s.jlptLevel}
                            </span>
                          )}
                        </div>
                        {s.lastMessagePreview && (
                          <p className="text-[11px] text-outline truncate mt-0.5">
                            {s.lastMessagePreview}
                          </p>
                        )}
                      </div>
                      <div
                        className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            setEditingSessionId(s.id);
                            setEditingTitle(displaySessionTitle(s.title));
                          }}
                          title={isEn ? 'Rename' : 'Đổi tên'}
                          className="p-1 rounded hover:bg-surface-container-high text-outline hover:text-primary cursor-pointer"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteSession(s.id)}
                          title={isEn ? 'Delete' : 'Xóa'}
                          className="p-1 rounded hover:bg-surface-container-high text-outline hover:text-error cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <section className="flex-1 flex flex-col min-w-0 bg-surface">
        {/* Top Control Bar */}
        <div className="px-4 py-3 border-b border-outline-variant/40 bg-surface-container-lowest flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-lg bg-surface-container-low text-on-surface md:hidden cursor-pointer"
              title={isEn ? 'Conversation list' : 'Danh sách hội thoại'}
            >
              <PanelLeft size={18} />
            </button>
            <Sparkles size={18} className="text-primary shrink-0" />
            <h1 className="text-sm md:text-base font-bold text-on-surface truncate">
              {activeSession
                ? displaySessionTitle(activeSession.title)
                : isEn
                  ? 'Ask Sensei AI'
                  : 'Hỏi đáp cùng Sensei AI'}
            </h1>
          </div>

          <button
            id="sensei-notebook-toggle-btn"
            onClick={() => setShowSavedDrawer((v) => !v)}
            className="px-2.5 py-1.5 rounded-xl bg-surface-container-low hover:bg-primary/10 border border-outline-variant/40 text-xs font-semibold text-on-surface flex items-center gap-1.5 cursor-pointer shrink-0"
            title={
              isEn
                ? 'Highlight any Japanese text in answers to save in 1 click'
                : 'Bôi đen từ tiếng Nhật trong câu trả lời để lưu 1 click'
            }
          >
            <BookMarked size={14} className="text-primary" />
            <span>
              {isEn ? `Notebook (${savedCards.length})` : `Sổ tay (${savedCards.length})`}
            </span>
          </button>
        </div>

        {/* Active Page Context Banner (if jumped from a lesson/translation) */}
        {pageContext && (
          <div className="px-4 py-2 bg-primary/8 border-b border-primary/20 flex items-center justify-between gap-2 text-xs text-primary">
            <span className="flex items-center gap-1.5 font-medium truncate">
              <Compass size={14} className="shrink-0" />
              {isEn ? 'Context:' : 'Ngữ cảnh:'} <strong>{pageContext}</strong>
            </span>
            <button
              onClick={() => setPageContext(null)}
              className="p-0.5 hover:bg-primary/15 rounded cursor-pointer"
              title={isEn ? 'Clear context' : 'Bỏ ngữ cảnh'}
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Messages Feed */}
        <div
          ref={feedRef}
          className="flex-1 overflow-y-auto px-4 md:px-8 py-6"
          onMouseUp={updateSelectionPopup}
          onScroll={() => selectionPopup && setSelectionPopup(null)}
        >
          <div className="max-w-3xl mx-auto space-y-6">
            {error && (
              <div className="p-3.5 rounded-2xl bg-error-container/25 border border-error/30 text-error text-sm flex items-start gap-2.5">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {loadingMessages ? (
              <div className="text-center py-12 text-sm text-outline">
                {isEn ? 'Loading message history...' : 'Đang tải lịch sử tin nhắn...'}
              </div>
            ) : messages.length === 0 ? (
              <div className="py-12 md:py-20 space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/12 border border-primary/25 text-primary flex items-center justify-center font-jp text-2xl font-bold shadow-xs">
                  先生
                </div>
                <h2 className="text-2xl font-bold text-on-surface tracking-tight">
                  {isEn
                    ? "Hello! I'm Sensei AI from Nippon Master"
                    : 'Xin chào! Mình là Sensei AI của Nippon Master'}
                </h2>
                <p className="text-sm text-on-surface-variant max-w-lg mx-auto leading-relaxed">
                  {isEn ? (
                    <>
                      Ask any question about <strong>vocabulary, Kanji, grammar, JLPT exams</strong>{' '}
                      or how to use features on the platform — I will look up lessons directly to
                      help you.
                    </>
                  ) : (
                    <>
                      Hỏi bất kỳ thắc mắc nào về <strong>từ vựng, Kanji, ngữ pháp, đề JLPT</strong>{' '}
                      hoặc cách dùng các tính năng trên ứng dụng — mình sẽ tra cứu trực tiếp kho bài
                      học để trả lời cho bạn.
                    </>
                  )}
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isUser = msg.role === 'USER';
                const isLastAssistantStreaming =
                  isStreaming && !isUser && idx === messages.length - 1;

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center font-jp font-bold text-xs shrink-0 mt-1 shadow-xs">
                        先生
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] space-y-2 ${
                        isUser
                          ? 'bg-primary text-on-primary rounded-2xl rounded-tr-sm px-4 py-3 shadow-xs'
                          : 'bg-surface-container-lowest border border-outline-variant/50 rounded-2xl rounded-tl-sm px-5 py-4 shadow-xs flex-1'
                      }`}
                    >
                      {isUser ? (
                        <p className="text-[15px] whitespace-pre-wrap leading-relaxed">
                          {msg.content}
                        </p>
                      ) : msg.content ? (
                        <div className="select-text">
                          <SenseiMarkdown content={msg.content} />
                          {isLastAssistantStreaming && (
                            <span className="inline-block w-2 h-4 ml-1 align-middle bg-primary animate-pulse rounded-xs" />
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-xs text-outline py-1">
                          <Bot size={15} className="animate-bounce text-primary" />
                          <span>
                            {isEn
                              ? 'Sensei is looking up lessons and composing an answer...'
                              : 'Sensei đang tra cứu bài học và soạn câu trả lời...'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Composer */}
        <div className="p-3 md:p-4 border-t border-outline-variant/40 bg-surface-container-lowest">
          <div className="max-w-3xl mx-auto relative">
            {/* Virtual Japanese Keyboard */}
            {showJpKeyboard && (
              <JapaneseVirtualKeyboard
                isEn={isEn}
                onInsert={handleInsertKeyboardText}
                onBackspace={handleBackspaceKeyboard}
                onClose={() => setShowJpKeyboard(false)}
              />
            )}

            {/* Compact personalized quick-actions popover */}
            {showPersonalMenu && (
              <div className="absolute bottom-full mb-2 left-0 w-72 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xl p-2 space-y-1 z-30">
                <div className="px-2.5 py-1 text-[11px] font-bold text-outline uppercase tracking-wider">
                  {isEn ? 'Personalized Assistant' : 'Trợ lý cá nhân hóa'}
                </div>
                {personalizedActions.map((act, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(act.prompt)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Sparkles size={13} className="text-primary shrink-0" />
                    <span>{act.label}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-end gap-1.5 bg-surface-container-low border border-outline-variant/60 focus-within:border-primary/60 rounded-2xl p-2 shadow-xs transition-colors">
              <button
                type="button"
                onClick={() => {
                  setShowPersonalMenu((v) => !v);
                  setShowJpKeyboard(false);
                }}
                disabled={isStreaming}
                className={`p-2 rounded-xl transition-colors shrink-0 cursor-pointer disabled:opacity-40 ${
                  showPersonalMenu
                    ? 'bg-primary/12 text-primary'
                    : 'text-outline hover:text-primary hover:bg-surface-container'
                }`}
                title={
                  isEn
                    ? 'Personalized suggestions (Mistakes, Practice quiz, Study plan)'
                    : 'Gợi ý cá nhân hóa (Giải thích câu sai, Tạo bài tập, Lập lộ trình)'
                }
              >
                <Wand2 size={17} />
              </button>

              <button
                id="sensei-jp-keyboard-toggle-btn"
                type="button"
                onClick={() => {
                  setShowJpKeyboard((v) => !v);
                  setShowPersonalMenu(false);
                }}
                disabled={isStreaming}
                className={`px-2 py-1.5 rounded-xl transition-colors shrink-0 cursor-pointer disabled:opacity-40 flex items-center gap-1 text-xs font-bold border ${
                  showJpKeyboard
                    ? 'bg-primary text-on-primary border-primary'
                    : 'text-outline hover:text-primary hover:bg-surface-container border-outline-variant/40'
                }`}
                title={
                  isEn
                    ? 'Open Japanese Virtual Keyboard (Hiragana, Katakana, Romaji IME, Kanji)'
                    : 'Mở bàn phím tiếng Nhật ảo (Hiragana, Katakana, Gõ Romaji, Kanji)'
                }
              >
                <Keyboard size={15} />
                <span className="font-jp text-[11px]">あ</span>
              </button>

              <textarea
                ref={textareaRef}
                id="sensei-chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
                placeholder={
                  isEn
                    ? 'Ask Sensei about vocabulary, Kanji, grammar, or JLPT tips... (Enter to send)'
                    : 'Hỏi Sensei về từ vựng, Kanji, ngữ pháp hoặc cách làm bài... (Enter để gửi)'
                }
                className="flex-1 bg-transparent text-on-surface placeholder:text-outline px-1.5 py-1.5 text-sm md:text-[15px] focus:outline-none resize-none max-h-36 leading-relaxed"
              />

              {isStreaming ? (
                <button
                  onClick={handleStopStream}
                  className="p-2.5 rounded-xl bg-error text-on-error hover:opacity-90 transition-opacity shrink-0 cursor-pointer flex items-center gap-1 text-xs font-bold"
                  title={isEn ? 'Stop generating' : 'Dừng trả lời'}
                >
                  <Square size={15} className="fill-current" />
                  <span className="hidden sm:inline">{isEn ? 'Stop' : 'Dừng'}</span>
                </button>
              ) : (
                <button
                  id="sensei-send-btn"
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="p-2.5 rounded-xl bg-primary text-on-primary hover:opacity-95 disabled:opacity-40 transition-opacity shrink-0 cursor-pointer"
                  title={isEn ? 'Send question' : 'Gửi câu hỏi'}
                >
                  <Send size={17} />
                </button>
              )}
            </div>
            <p className="text-[11px] text-outline text-center mt-1.5">
              {isEn
                ? 'Nippon Master can make mistakes. Please verify important information!'
                : 'Nippon Master có thể mắc sai sót, hãy cân nhắc câu trả lời!'}
            </p>
          </div>
        </div>
      </section>

      {/* Saved Flashcards Drawer */}
      {showSavedDrawer && (
        <aside className="w-72 shrink-0 bg-surface-container-low border-l border-outline-variant/50 flex flex-col z-30">
          <div className="p-4 border-b border-outline-variant/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookMarked size={16} className="text-primary" />
              <h3 className="text-sm font-bold text-on-surface">
                {isEn
                  ? `Vocabulary Notebook (${savedCards.length})`
                  : `Sổ tay từ vựng (${savedCards.length})`}
              </h3>
            </div>
            <button
              onClick={() => setShowSavedDrawer(false)}
              className="p-1 text-outline hover:text-on-surface cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {savedCards.length === 0 ? (
              <p className="text-xs text-outline text-center py-6 leading-relaxed">
                {isEn
                  ? 'No saved words yet. Highlight any Japanese word in Sensei’s reply to save it in 1 click!'
                  : 'Chưa có từ nào. Bôi đen một từ tiếng Nhật trong câu trả lời của Sensei để lưu 1 click!'}
              </p>
            ) : (
              savedCards.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 flex items-start justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="font-jp font-bold text-sm text-on-surface">{c.word}</span>
                      {c.reading && (
                        <span className="text-xs font-jp text-primary">({c.reading})</span>
                      )}
                    </div>
                    {c.meaning && (
                      <p className="text-xs text-on-surface-variant mt-0.5">{c.meaning}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteSavedCard(c.id)}
                    className="p-1 text-outline hover:text-error cursor-pointer shrink-0"
                    title={isEn ? 'Remove card' : 'Xóa thẻ'}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
