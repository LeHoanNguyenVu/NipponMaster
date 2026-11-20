# PHASE 7 – QA E2E, REVIEW & PHÁT HÀNH

> **Mục tiêu**: Kiểm thử toàn luồng trên trình duyệt thật, review code + bảo mật, chạy nội dung thật vài ngày trước khi mở cho học viên.
> **Phụ thuộc**: Phase 5, Phase 6

---

## 7.1 Kiểm thử E2E (browser subagent, `http://localhost:3000`)

- [ ] Học viên N3: Sidebar → Luyện Đọc → tab N3 → mở bài → nghe hết bài với highlight → đổi sang bản N5 của cùng sự kiện
- [ ] Bôi đen → Lưu flashcard / Dịch nhanh / Xem nghĩa & phân tích (3 luồng)
- [ ] Bấm hoàn thành bài đọc → Dashboard cập nhật +1
- [ ] Học viên STARTER: không thấy module, gõ thẳng vào màn hình bị chuyển về Nhập Môn
- [ ] Đổi ngôn ngữ UI vi ↔ en: không thiếu chuỗi
- [ ] Mobile viewport (375px): đọc, bôi đen, audio đều dùng được
- [ ] Audio lỗi → fallback Web Speech hoạt động
- [ ] Xóa `recording.mp4` sinh ra sau khi test

## 7.2 Review code & bảo mật

- [ ] `/ponytail-review` hoặc `code-reviewer` cho toàn bộ diff của module
- [ ] `security-auditor` tập trung vào:
  - [ ] Endpoint admin ingest/publish/audio **bắt buộc quyền ADMIN** (và sửa luôn rule `/api/v1/admin/**` đang `permitAll` trong `SecurityConfig`, sau khi kiểm tra các màn admin hiện có vẫn gửi token)
  - [ ] RSS client: whitelist host (SSRF), tắt external entity (XXE), giới hạn dung lượng & timeout
  - [ ] Prompt injection từ nội dung RSS vào Gemini
  - [ ] Không render HTML thô từ dữ liệu bài (`dangerouslySetInnerHTML`)
  - [ ] Không lộ bài `REVIEW`/`REJECTED`
  - [ ] Secret (Gemini, TTS, Supabase) chỉ nằm trong `.env`, không log
- [ ] Rate limit: endpoint `translate/fast` khi bị gọi dồn dập từ toolbar (debounce phía client + kiểm tra giới hạn phía server nếu đã có)
- [ ] Nâng cấp bản vá bảo mật Spring Boot (`spring-boot-starter-parent`: `4.1.1` → `4.1.3` hoặc bản patch `4.1.x` mới nhất) trong `backend/pom.xml` ở commit riêng, rồi chạy lại `mvn -q test` trước khi lên Production

## 7.3 Hiệu năng
- [ ] API danh sách < 200 ms (có index `jlpt_level`, phân trang)
- [ ] Reader: chỉ tải trước mp3 của 2 câu kế tiếp, không tải cả bài một lúc
- [ ] Bài 1.000 ký tự render không giật trên mobile

## 7.4 Chạy thử nội dung thật (soft launch)
- [ ] Bật `reading.ingest.enabled=true` trên môi trường staging 3–5 ngày, admin duyệt bài mỗi ngày
- [ ] Theo dõi: tỉ lệ bài bị reject, tỉ lệ `needsReview`, chi phí Gemini + TTS/ngày
- [ ] Chỉnh prompt / ngưỡng classifier theo kết quả

## 7.5 Phát hành
- [ ] Cập nhật [MASTER_PLAN.md](./MASTER_PLAN.md): đánh dấu hoàn thành các phase
- [ ] `graphify update .`
- [ ] Commit theo từng phần logic (schema, pipeline, classifier, audio, UI, toolbar, quiz) – chỉ push khi chủ dự án yêu cầu

---

## ✅ ĐIỀU KIỆN HOÀN THÀNH PHASE 7 (= MODULE HOÀN THÀNH)
- [ ] Toàn bộ checklist E2E pass
- [ ] Review code + bảo mật không còn vấn đề mức cao
- [ ] Soft launch ổn định, chi phí nằm trong ngân sách đã chốt
