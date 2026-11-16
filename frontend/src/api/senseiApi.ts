import axiosClient from './axiosClient';

export interface SourceCitation {
  chunkId?: number;
  sourceType: string;
  sourceId: number;
  title: string;
  jlptLevel?: string;
  route: string;
  score: number;
}

export interface ChatSession {
  id: number;
  title: string;
  jlptLevel?: string;
  lastMessagePreview?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: number;
  sessionId: number;
  role: 'USER' | 'ASSISTANT';
  content: string;
  sources?: SourceCitation[];
  createdAt: string;
}

export interface SavedCard {
  id: number;
  word: string;
  reading?: string;
  meaning?: string;
  jlptLevel?: string;
  createdAt: string;
}

export interface StreamHandlers {
  onSources?: (sources: SourceCitation[]) => void;
  onChunk: (text: string) => void;
  onDone?: (saved: ChatMessage) => void;
  onError?: (err: Error) => void;
  signal?: AbortSignal;
}

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1') as string;

export const senseiApi = {
  async listSessions(): Promise<ChatSession[]> {
    const res: any = await axiosClient.get('/ai/chat/sessions');
    return res.data ?? res ?? [];
  },

  async createSession(payload?: { title?: string; jlptLevel?: string }): Promise<ChatSession> {
    const res: any = await axiosClient.post('/ai/chat/sessions', payload || {});
    return res.data ?? res;
  },

  async renameSession(sessionId: number, title: string): Promise<ChatSession> {
    const res: any = await axiosClient.patch(`/ai/chat/sessions/${sessionId}`, { title });
    return res.data ?? res;
  },

  async deleteSession(sessionId: number): Promise<void> {
    await axiosClient.delete(`/ai/chat/sessions/${sessionId}`);
  },

  async getMessages(sessionId: number): Promise<ChatMessage[]> {
    const res: any = await axiosClient.get(`/ai/chat/sessions/${sessionId}/messages`);
    return res.data ?? res ?? [];
  },

  async saveFlashcard(payload: {
    word: string;
    reading?: string;
    meaning?: string;
    jlptLevel?: string;
  }): Promise<SavedCard> {
    const res: any = await axiosClient.post('/ai/chat/flashcards', payload);
    return res.data ?? res;
  },

  async listFlashcards(): Promise<SavedCard[]> {
    const res: any = await axiosClient.get('/ai/chat/flashcards');
    return res.data ?? res ?? [];
  },

  async deleteFlashcard(cardId: number): Promise<void> {
    await axiosClient.delete(`/ai/chat/flashcards/${cardId}`);
  },

  async streamMessage(
    sessionId: number,
    payload: { message: string; levelFilter?: string; pageContext?: string },
    handlers: StreamHandlers
  ): Promise<void> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}/ai/chat/sessions/${sessionId}/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: handlers.signal,
    });

    if (!res.ok || !res.body) {
      let msg = `HTTP ${res.status}: Không thể kết nối với Sensei AI`;
      try {
        const errJson = await res.json();
        if (errJson?.message) msg = errJson.message;
      } catch {}
      throw new Error(msg);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let finished = false;

    const dispatchEvent = (rawBlock: string) => {
      const lines = rawBlock.split(/\r?\n/);
      let eventName = 'message';
      const dataLines: string[] = [];

      for (const line of lines) {
        if (line.startsWith('event:')) {
          eventName = line.slice(6).trim();
        } else if (line.startsWith('data:')) {
          dataLines.push(line.slice(5).trim());
        }
      }

      if (dataLines.length === 0) return;
      const rawData = dataLines.join('\n');

      try {
        const parsed = JSON.parse(rawData);
        if (eventName === 'sources') {
          handlers.onSources?.(Array.isArray(parsed) ? parsed : []);
        } else if (eventName === 'chunk') {
          if (parsed?.text) handlers.onChunk(parsed.text);
        } else if (eventName === 'done') {
          finished = true;
          handlers.onDone?.(parsed as ChatMessage);
        } else if (eventName === 'error') {
          finished = true;
          handlers.onError?.(new Error(parsed?.message || 'Lỗi xử lý từ máy chủ'));
        }
      } catch {
        // Bỏ qua frame dữ liệu chưa hoàn chỉnh
      }
    };

    try {
      while (!finished) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const blocks = buffer.split(/\r?\n\r?\n/);
        buffer = blocks.pop() ?? '';
        for (const block of blocks) {
          if (block.trim()) dispatchEvent(block);
          if (finished) break;
        }
      }

      if (!finished && buffer.trim()) {
        dispatchEvent(buffer);
      }
    } finally {
      reader.cancel().catch(() => {});
    }
  },
};

