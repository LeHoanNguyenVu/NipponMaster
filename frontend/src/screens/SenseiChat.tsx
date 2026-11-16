import { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import { senseiApi, type ChatSession, type ChatMessage, type SavedCard } from '../api/senseiApi';
import { SenseiMarkdown } from '../components/SenseiMarkdown';

export interface QuickAskRequest {
  id: number;
  context: string;
  prompt?: string;
}

interface SenseiChatProps {
  quickAsk?: QuickAskRequest | null;
  onConsumeQuickAsk?: () => void;
}

const PERSONALIZED_ACTIONS = [
  {
    label: 'Giải thích chỗ tôi hay sai',
    prompt: 'Dựa vào kết quả thi thử, các chương Kanji/Ngữ pháp và từ vựng tôi đang yếu trên hệ thống, hãy chỉ ra những điểm tôi hay sai và giải thích cách khắc phục.',
  },
  {
    label: 'Tạo 5 câu luyện tập',
    prompt: 'Dựa vào trình độ hiện tại và những từ vựng/ngữ pháp tôi cần củng cố, hãy tạo 5 câu bài tập ngắn (kèm đáp án và giải thích) để tôi luyện ngay.',
  },
  {
    label: 'Lập lộ trình tuần này',
    prompt: 'Hãy lập cho tôi lộ trình học tiếng Nhật 7 ngày trong tuần này trên Nippon Master phù hợp với trình độ và phần tôi đang học dở.',
  },
];

export default function SenseiChat({ quickAsk, onConsumeQuickAsk }: SenseiChatProps) {
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

  const abortRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handledQuickAskIdRef = useRef<number | null>(null);

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
          'Chưa thể kết nối máy chủ Sensei AI. Hãy chắc chắn bạn đã khởi động lại backend để nạp bản cập nhật mới.'
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
      // Bỏ qua nếu backend chưa khởi động lại để nạp V34
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
      const created = await senseiApi.createSession();
      setSessions((prev) => [created, ...prev]);
      setActiveSessionId(created.id);

      if (req.prompt && req.prompt.trim()) {
        await sendToSession(created.id, req.prompt.trim(), req.context || undefined);
      } else {
        textareaRef.current?.focus();
      }
    } catch (err: any) {
      setError(err?.message || 'Không thể khởi tạo cuộc trò chuyện mới.');
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
      setError(err?.message || 'Không tải được lịch sử hội thoại.');
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
      const created = await senseiApi.createSession();
      setSessions((prev) => [created, ...prev]);
      setActiveSessionId(created.id);
      setMessages([]);
      setMobileSidebarOpen(false);
      textareaRef.current?.focus();
    } catch (err: any) {
      setError(err?.message || 'Không tạo được cuộc trò chuyện mới.');
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
      setError(err?.message || 'Không xóa được cuộc trò chuyện.');
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
                      title:
                        s.title === 'Cuộc trò chuyện mới'
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
        setError(err?.message || 'Đã xảy ra lỗi khi gửi câu hỏi tới Sensei AI.');
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
        const created = await senseiApi.createSession();
        setSessions((prev) => [created, ...prev]);
        targetSessionId = created.id;
        setActiveSessionId(created.id);
      }

      if (!overrideText) setInput('');
      await sendToSession(targetSessionId, text);
    } catch (err: any) {
      setIsStreaming(false);
      setError(err?.message || 'Đã xảy ra lỗi khi tạo phiên chat.');
    }
  };

  // Bôi đen chữ Nhật trong câu trả lời -> hiện nút "+ Lưu Flashcard" 1 click
  const handleFeedMouseUp = () => {
    const sel = window.getSelection();
    const selected = sel?.toString().trim() || '';
    if (!selected || selected.length > 40 || !/[\u3040-\u30ff\u4e00-\u9faf]/.test(selected)) {
      setSelectionPopup(null);
      return;
    }
    const range = sel?.getRangeAt(0);
    const rect = range?.getBoundingClientRect();
    if (rect && rect.width > 0) {
      setSelectionPopup({
        text: selected,
        x: Math.min(window.innerWidth - 180, Math.max(16, rect.left)),
        y: Math.max(64, rect.top - 42),
      });
    }
  };

  const handleQuickSaveWord = async () => {
    if (!selectionPopup) return;
    const word = selectionPopup.text;
    setSelectionPopup(null);
    window.getSelection()?.removeAllRanges();
    try {
      const saved = await senseiApi.saveFlashcard({ word });
      setSavedCards((prev) => [saved, ...prev.filter((c) => c.id !== saved.id)]);
      setSaveToast(`Đã lưu "${saved.word}" vào sổ tay Flashcard`);
      setTimeout(() => setSaveToast(null), 2600);
    } catch {
      setSaveToast('Không lưu được thẻ (cần backend đã bật bản cập nhật mới)');
      setTimeout(() => setSaveToast(null), 2600);
    }
  };

  const handleDeleteSavedCard = async (cardId: number) => {
    try {
      await senseiApi.deleteFlashcard(cardId);
      setSavedCards((prev) => prev.filter((c) => c.id !== cardId));
    } catch {}
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-surface overflow-hidden relative">
      {/* Floating 1-click Save Flashcard pill on text selection */}
      {selectionPopup && (
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleQuickSaveWord();
          }}
          style={{ left: selectionPopup.x, top: selectionPopup.y }}
          className="fixed z-50 px-3 py-1.5 rounded-full bg-primary text-on-primary shadow-lg text-xs font-bold flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer"
        >
          <BookmarkPlus size={14} />
          <span>Lưu "{selectionPopup.text}" vào Flashcard</span>
        </button>
      )}

      {/* Save Toast */}
      {saveToast && (
        <div className="fixed top-20 right-5 z-50 px-4 py-2.5 rounded-xl bg-surface-container-highest border border-primary/40 text-on-surface text-xs font-bold shadow-lg flex items-center gap-2">
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
            Cuộc trò chuyện mới
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
          {loadingSessions ? (
            <div className="p-4 text-xs text-outline text-center">Đang tải hội thoại...</div>
          ) : sessions.length === 0 ? (
            <div className="p-4 text-xs text-outline text-center">
              Chưa có hội thoại nào. Hãy đặt câu hỏi đầu tiên cho Sensei!
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
                          <span className="text-xs font-bold truncate">{s.title}</span>
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
                            setEditingTitle(s.title);
                          }}
                          title="Đổi tên"
                          className="p-1 rounded hover:bg-surface-container-high text-outline hover:text-primary cursor-pointer"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteSession(s.id)}
                          title="Xóa"
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
              title="Danh sách hội thoại"
            >
              <PanelLeft size={18} />
            </button>
            <Sparkles size={18} className="text-primary shrink-0" />
            <h1 className="text-sm md:text-base font-bold text-on-surface truncate">
              {sessions.find((s) => s.id === activeSessionId)?.title || 'Hỏi đáp cùng Sensei AI'}
            </h1>
          </div>

          <button
            onClick={() => setShowSavedDrawer((v) => !v)}
            className="px-2.5 py-1.5 rounded-xl bg-surface-container-low hover:bg-primary/10 border border-outline-variant/40 text-xs font-semibold text-on-surface flex items-center gap-1.5 cursor-pointer shrink-0"
            title="Bôi đen từ tiếng Nhật trong câu trả lời để lưu 1 click"
          >
            <BookMarked size={14} className="text-primary" />
            <span>Sổ tay ({savedCards.length})</span>
          </button>
        </div>

        {/* Active Page Context Banner (if jumped from a lesson/translation) */}
        {pageContext && (
          <div className="px-4 py-2 bg-primary/8 border-b border-primary/20 flex items-center justify-between gap-2 text-xs text-primary">
            <span className="flex items-center gap-1.5 font-medium truncate">
              <Compass size={14} className="shrink-0" />
              Ngữ cảnh: <strong>{pageContext}</strong>
            </span>
            <button
              onClick={() => setPageContext(null)}
              className="p-0.5 hover:bg-primary/15 rounded cursor-pointer"
              title="Bỏ ngữ cảnh"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Messages Feed */}
        <div
          className="flex-1 overflow-y-auto px-4 md:px-8 py-6"
          onMouseUp={handleFeedMouseUp}
        >
          <div className="max-w-3xl mx-auto space-y-6">
            {error && (
              <div className="p-3.5 rounded-2xl bg-error-container/25 border border-error/30 text-error text-sm flex items-start gap-2.5">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {loadingMessages ? (
              <div className="text-center py-12 text-sm text-outline">Đang tải lịch sử tin nhắn...</div>
            ) : messages.length === 0 ? (
              <div className="py-12 md:py-20 space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/12 border border-primary/25 text-primary flex items-center justify-center font-jp text-2xl font-bold shadow-xs">
                  先生
                </div>
                <h2 className="text-2xl font-bold text-on-surface tracking-tight">
                  Xin chào! Mình là Sensei AI của Nippon Master
                </h2>
                <p className="text-sm text-on-surface-variant max-w-lg mx-auto leading-relaxed">
                  Hỏi bất kỳ thắc mắc nào về <strong>từ vựng, Kanji, ngữ pháp, đề JLPT</strong> hoặc
                  cách dùng các tính năng trên ứng dụng — mình sẽ tra cứu trực tiếp kho bài học để
                  trả lời cho bạn.
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
                          <span>Sensei đang tra cứu bài học và soạn câu trả lời...</span>
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
            {/* Compact personalized quick-actions popover */}
            {showPersonalMenu && (
              <div className="absolute bottom-full mb-2 left-0 w-72 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xl p-2 space-y-1 z-30">
                <div className="px-2.5 py-1 text-[11px] font-bold text-outline uppercase tracking-wider">
                  Trợ lý cá nhân hóa
                </div>
                {PERSONALIZED_ACTIONS.map((act, i) => (
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

            <div className="flex items-end gap-2 bg-surface-container-low border border-outline-variant/60 focus-within:border-primary/60 rounded-2xl p-2 shadow-xs transition-colors">
              <button
                onClick={() => setShowPersonalMenu((v) => !v)}
                disabled={isStreaming}
                className="p-2 rounded-xl text-outline hover:text-primary hover:bg-surface-container transition-colors shrink-0 cursor-pointer disabled:opacity-40"
                title="Gợi ý cá nhân hóa (Giải thích câu sai, Tạo bài tập, Lập lộ trình)"
              >
                <Wand2 size={17} />
              </button>

              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
                placeholder="Hỏi Sensei về từ vựng, Kanji, ngữ pháp hoặc cách làm bài... (Enter để gửi)"
                className="flex-1 bg-transparent text-on-surface placeholder:text-outline px-1.5 py-1.5 text-sm md:text-[15px] focus:outline-none resize-none max-h-36 leading-relaxed"
              />

              {isStreaming ? (
                <button
                  onClick={handleStopStream}
                  className="p-2.5 rounded-xl bg-error text-on-error hover:opacity-90 transition-opacity shrink-0 cursor-pointer flex items-center gap-1 text-xs font-bold"
                  title="Dừng trả lời"
                >
                  <Square size={15} className="fill-current" />
                  <span className="hidden sm:inline">Dừng</span>
                </button>
              ) : (
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="p-2.5 rounded-xl bg-primary text-on-primary hover:opacity-95 disabled:opacity-40 transition-opacity shrink-0 cursor-pointer"
                  title="Gửi câu hỏi"
                >
                  <Send size={17} />
                </button>
              )}
            </div>
            <p className="text-[11px] text-outline text-center mt-1.5">
              Nippon Master có thể mắc sai sót, hãy cân nhắc câu trả lời!
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
              <h3 className="text-sm font-bold text-on-surface">Sổ tay từ vựng ({savedCards.length})</h3>
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
                Chưa có từ nào. Bôi đen một từ tiếng Nhật trong câu trả lời của Sensei để lưu 1 click!
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
                    title="Xóa thẻ"
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
