# Nippon Master — Tài liệu Kiến trúc Module AI & RAG

Tài liệu mô tả kiến trúc 2 chức năng AI cốt lõi trên **Nippon Master** (chạy trên Gemini API Free Tier + PostgreSQL `pgvector` + Spring Boot + React):
1. **Dịch nhanh AI** (`modules/translator`) — phản hồi tốc độ cao như Google Dịch.
2. **Trợ lý Sensei AI với RAG** (`modules/ai/rag`, `modules/ai/assistant`, `modules/ai/core`) — hỏi đáp tiếng Nhật dựa trên dữ liệu bài học thực tế của hệ thống và hồ sơ cá nhân học viên.

---

## 1. Dịch nhanh AI (`/api/v1/translate`)

### Chiến lược 3 tầng tốc độ
1. **Tầng 1 — Cache LRU In-Memory** (`FastTranslationService`): 5.000 câu, TTL 7 ngày → phản hồi `~0 ms`.
2. **Tầng 2 — Từ điển nội bộ** (`KanjiChapterVocabRepository`): từ đơn/cụm ngắn tiếng Nhật có sẵn trong DB → phản hồi `~20–300 ms`, không tốn API.
3. **Tầng 3 — Gemini Streaming** (`FastGeminiTranslator`):
   - Model chain ưu tiên `gemini-2.5-flash` (`thinkingBudget = 0`) → `gemini-flash-lite-latest` → `gemini-3.1-flash-lite`, tự fallback khi lỗi 404/429/5xx.
   - HTTP/2 keep-alive + output text thuần qua SSE (`GET /api/v1/translate/stream`).
   - Nhận diện ngôn ngữ Unicode miễn phí (`LanguageDetector`).

### Phân tích sâu theo yêu cầu (Lazy Analysis)
- Endpoint `POST /api/v1/translate` giữ nguyên chế độ phân tích sâu (Furigana `<ruby>`, từ vựng, Hán Việt, ngữ pháp) và chỉ chạy khi người dùng bấm nút **Phân tích chi tiết**.

---

## 2. Hệ thống RAG & Vector DB (`pgvector`)

### Schema (`V32__create_rag_knowledge_base.sql`)
- Bảng `knowledge_chunks` lưu `source_type`, `source_id`, `jlpt_level`, `title`, `content`, `content_hash` (SHA-256), `embedding vector(768)`, `metadata` JSONB.
- Index **HNSW** (`vector_cosine_ops`) + **GIN Full-Text** (`to_tsvector('simple', ...)`).

### Nguồn dữ liệu & Đồng bộ tăng dần
- `KnowledgeChunkBuilder` trích xuất từ: `FAQ` (5), `GRAMMAR` (8), `GRAMMAR_LESSON` (131 bài gộp timestamps & cheatsheets), `VOCAB` (185), `KANJI` (2.141), `KANJI_VOCAB` (4.601), `EXAM_QUESTION`.
- `GeminiEmbeddingClient`: dùng cố định `models/gemini-embedding-001` (`outputDimensionality = 768`), lô 20 items, delay 2.5s và backoff 62s khi gặp 429 Free Tier.
- `KnowledgeSyncService`: so khớp `content_hash` để chỉ tạo embedding cho dữ liệu mới/đổi.

### Hybrid Search (`KnowledgeSearchService`)
- Kết hợp tìm kiếm vector HNSW + khớp từ khóa Kanji/từ >= 2 ký tự (bỏ qua kana đơn như `は`, `が`) + Full-Text Search + lọc cấp độ JLPT.

### Endpoints RAG
- `GET  /api/v1/ai/rag/stats`: thống kê số vector và trạng thái sync.
- `POST /api/v1/ai/rag/sync?async=true`: đồng bộ tăng dần ở chế độ nền.
- `GET  /api/v1/ai/rag/search?q=...&level=N5&topK=5`: kiểm thử truy xuất trực tiếp.
- `POST /api/v1/ai/rag/evaluate`: chạy bộ 30 câu hỏi chuẩn để đo Hit@5 Accuracy và latency.

---

## 3. Trợ lý Sensei AI (`/api/v1/ai/chat`)

### Luồng xử lý & Cá nhân hóa
1. **Kiểm tra hạn mức (`AiRateLimiter`)**: mặc định 50 tin nhắn/ngày/user (dịch nhanh LLM: 30 lượt/phút; cache/dict miễn phí).
2. **Bảo vệ an toàn (`SenseiPromptBuilder`)**: lọc prompt injection, giới hạn phạm vi tiếng Nhật & Nippon Master, cấm sinh thẻ HTML `<ruby>`.
3. **Cá nhân hóa (`StudentLearningContextService`)**: đính kèm trình độ hiện tại/mục tiêu, 3 bài thi JLPT gần nhất, chương Kanji/bài Ngữ pháp yếu, từ hay quên trên SRS & sổ tay (không gửi email/password).
4. **Hội thoại tối ưu SQL + Tóm tắt ngắn hạn (`SenseiAssistantService`)**:
   - Đọc đúng 8 tin nhắn gần nhất từ SQL (`ORDER BY created_at DESC LIMIT 8`).
   - Giới hạn tối đa 30 phiên chat gần nhất/user (`V33__create_ai_chat_tables.sql`).
   - Tự tóm tắt nền hội thoại dài (`>= 12` tin) vào `chat_sessions.context_summary`.
5. **Lưu nhanh Flashcard 1 click (`V34__create_ai_saved_cards.sql`)**: `POST/GET/DELETE /api/v1/ai/chat/flashcards`.

---

## 4. Giám sát & Kiểm thử

- **Admin Metrics API:** `GET /api/v1/admin/ai/metrics` (hiển thị tại tab **Giám Sát AI & RAG** trong `DashboardAdmin.tsx`).
- **Unit & Integration Tests:**
  ```bash
  cd backend
  ./mvnw test -Dtest=SenseiAssistantTest,KnowledgeSyncServiceTest,FastTranslationServiceTest,TranslationServiceTest,AiEndToEndIntegrationTest
  ```
- **Load Test (`k6`):**
  ```bash
  k6 run docs/k6-translate-load-test.js
  ```

