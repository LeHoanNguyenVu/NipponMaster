# PHASE 7 – QA E2E, REVIEW & PHÁT HÀNH

> **Mục tiêu**: Kiểm thử toàn luồng trên trình duyệt thật, review code + bảo mật, chạy nội dung thật vài ngày trước khi mở cho học viên.
> **Phụ thuộc**: Phase 5, Phase 6

---

## 7.1 Kiểm thử E2E (browser subagent, `http://localhost:3000`)

- [x] Học viên N3: Sidebar → Luyện Đọc → tab N3 → mở bài → nghe bài với highlight karaoke → đổi sang bản N5 của cùng sự kiện
- [x] Bôi đen → Lưu flashcard / Dịch nhanh / Xem nghĩa & phân tích (3 luồng, đã verify ở Phase 5 & Phase 7)
- [x] Bấm hoàn thành bài đọc → Dashboard cập nhật +1 (`1/3` → `2/3`, đã verify ở Phase 6)
- [x] Học viên STARTER: không thấy module ở Sidebar, Dashboard chỉ hiện banner Nhập Môn, không gọi `/reading/recommended`
- [x] Đổi ngôn ngữ UI vi ↔ en: không thiếu chuỗi trên Reading & Dashboard
- [x] Mobile viewport (375px): đọc, furigana, bôi đen Selection Toolbar (3 nút), sticky AudioBar đều dùng mượt không tràn mép
- [x] Audio lỗi → fallback Web Speech API (đã gia cố chống race condition `playTokenRef` & double-fallback trong `useSentenceAudio.ts`)
- [x] Xóa `recording.mp4` sinh ra sau khi test

## 7.2 Review code & bảo mật

- [x] `code-reviewer` review toàn bộ diff module (Phases 1–6) và đã sửa toàn bộ lỗi CRITICAL / HIGH (race condition & memory leak `useSentenceAudio`, phân trang `ArticleList`, `SelectionToolbar` giới hạn 150 ký tự, khóa concurrency `ReadingIngestService` & `ReadingTtsService`, xóa audio cũ khi đổi giọng, sửa prompt viết lại khi quá dễ, chống double SSE ở `Translation.tsx`, scope cache stats theo user)
- [x] `security-auditor` audit và đã khắc phục toàn bộ điểm CRITICAL / HIGH:
  - [x] Khóa toàn bộ `/api/v1/admin/**` và `/api/v1/ai/rag/**` bằng `hasRole("ADMIN")` trong `SecurityConfig`, bỏ `or permitAll()` ở `AdminDashboardController`, bổ sung `@PreAuthorize("hasRole('ADMIN')")` cho `AdminAiMonitorController` & `RagAdminController` (đã verify live: unauth trả `403`)
  - [x] RSS client: whitelist 7 host (SSRF, `Redirect.NEVER`), tắt DTD/XXE (`ACCESS_EXTERNAL_DTD=""`), kiểm tra `isSafeSourceLink` chặn `javascript:`/`data:`/domain ngoài, giới hạn 2 MB + timeout đọc 15s + cap độ dài title/description + bỏ UTF-8 BOM
  - [x] Prompt injection & bản quyền: lọc thẻ `rss_data`/`<`/`>`, giới hạn `maxOutputTokens=2048`, kiểm tra cả `titleJa` + giới hạn LCS (<18 ký tự) + chuẩn hóa Unicode NFKC trong `CopyrightGuardService`
  - [x] Không render HTML thô (`dangerouslySetInnerHTML`), kiểm tra `https:` cho `sourceUrl` trên cả backend & frontend
  - [x] Không lộ bài `REVIEW`/`REJECTED`, không lộ `sourceTitle`, không lộ stacktrace/SQL trong HTTP 500 (`GlobalExceptionHandler`)
  - [x] Chuyển `GEMINI_API_KEY` từ query string `?key=` sang header `x-goog-api-key` ở `ReadingContentGenerator`, `ReadingTtsService`, `FastGeminiTranslator`; bắt buộc `jwt.secret=${JWT_SECRET}` trong `application-prod.properties`
- [x] Rate limit & chống DoS: thêm `@Size(max = 500)` trên `TranslateRequest`, giới hạn 500 ký tự trên `/translate/stream`, áp dụng `AiRateLimiter` cho `POST /api/v1/translate`, thay `newCachedThreadPool()` bằng `ThreadPoolExecutor` giới hạn 4–16 luồng (queue 64)
- [x] Nâng cấp bản vá bảo mật Spring Boot (`spring-boot-starter-parent`: `4.1.1` → `4.1.3`) trong `backend/pom.xml`, đã chạy lại toàn bộ unit test `reading` + `dashboard` + `translator` pass (`MVN_EXIT=0`)

## 7.3 Hiệu năng
- [x] API danh sách: có index `jlpt_level`, phân trang `size <= 50` & cap `page <= 10000` (từ máy dev tới Supabase Singapore: trung bình ~393ms gồm 2 RTT mạng quốc tế; triển khai cùng region < 50ms)
- [x] Reader: chỉ preload 2 câu kế tiếp và tự giải phóng (`pause`/`removeAttribute('src')`/`load`) các phần tử audio ngoài cửa sổ để chống rò rỉ bộ nhớ
- [x] Render bằng React thuần trên mobile 375px mượt, 0 lỗi console

## 7.4 Chạy thử nội dung thật (soft launch – bước vận hành của chủ dự án)
- [ ] Bật `reading.ingest.enabled=true` trên môi trường staging 3–5 ngày, admin duyệt bài mỗi ngày
- [ ] Theo dõi: tỉ lệ bài bị reject, tỉ lệ `needsReview`, chi phí Gemini + TTS/ngày
- [ ] Chỉnh prompt / ngưỡng classifier theo kết quả

## 7.5 Phát hành
- [x] Cập nhật [MASTER_PLAN.md](./MASTER_PLAN.md): đánh dấu hoàn thành các phase 0–7 (mã nguồn sẵn sàng staging/soft-launch)
- [x] `graphify update .`
- [ ] Commit theo từng phần logic (schema, pipeline, classifier, audio, UI, toolbar, dashboard, security) – chỉ thực hiện / push khi chủ dự án yêu cầu

---

## ✅ ĐIỀU KIỆN HOÀN THÀNH PHASE 7 (= MODULE HOÀN THÀNH)
- [x] Toàn bộ checklist E2E pass (0 lỗi console, 0 lỗi network `4xx/5xx`)
- [x] Review code + bảo mật không còn vấn đề mức CRITICAL / HIGH
- [ ] Soft launch 3–5 ngày trên staging ổn định trước khi mở Production công khai
