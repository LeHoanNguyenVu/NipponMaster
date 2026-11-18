# PHASE 3 – AUDIO TỪNG CÂU (TTS) & LƯU TRỮ

> **Mục tiêu**: Mỗi phiên bản bài có audio cho **từng câu**, lưu trên Supabase Storage, đủ để phát liền mạch cả bài và highlight câu đang đọc.
> **Phụ thuộc**: Phase 0 (chọn TTS), Phase 1 · **Song song với**: Phase 2

---

## 3.1 Vì sao audio theo từng câu (không phải 1 file cả bài)?

| | 1 file cả bài | **Mỗi câu 1 file** ⭐ |
|:---|:---|:---|
| Highlight câu đang đọc | Cần timestamp/forced alignment phức tạp | Có sẵn: file nào đang phát = câu nào |
| Bấm vào câu để nghe lại | Phải tua | Phát đúng file đó |
| Chế độ Shadowing (dừng sau mỗi câu) | Khó | Dễ |
| Lỗi TTS 1 câu | Hỏng cả bài | Chỉ sinh lại câu lỗi |

## 3.2 Việc cần làm (CHỐT DÙNG GEMINI 2.5 FLASH TTS – RANDOM GIỌNG NAM `Puck` & NỮ `Kore`)

> [!IMPORTANT]
> **Quy định bắt buộc theo yêu cầu chủ dự án:**
> - Sử dụng **Gemini 2.5 Flash TTS (`gemini-2.5-flash-preview-tts`)** thông qua `GEMINI_API_KEY` sẵn có (tuyệt đối **không** dùng Google Translate TTS cho bài báo).
> - Mỗi bài báo (hoặc mỗi version) sẽ được **random ngẫu nhiên 1 trong 2 giọng**:
>   - **`Kore`** (Giọng Nữ phát thanh viên thời sự)
>   - **`Puck`** (Giọng Nam phát thanh viên trầm, rõ ràng)
> - Lưu tên giọng đã random vào cột `voice_name` của bảng `reading_article_versions` để tất cả các câu trong cùng 1 bài đều đọc thống nhất bằng đúng giọng Nam hoặc Nữ đó.

- [ ] `ReadingTtsService` (sử dụng `gemini-2.5-flash-preview-tts` với `responseModalities: ["AUDIO"]`)
  - [ ] Random `voice_name` ∈ `{"Kore", "Puck"}` khi khởi tạo bài báo (50% Nam / 50% Nữ)
  - [ ] Prompt hướng dẫn phong cách đọc: `"ニュースキャスターのように、自然で聞き取りやすい日本語で読んでください: <câu tiếng Nhật>"`
  - [ ] Đóng gói dữ liệu PCM 24kHz 16-bit mono từ Gemini TTS thành file `.wav` (hoặc `.mp3`), đo `durationMs`
  - [ ] Tốc độ chuẩn 1.0 (tốc độ 0.75×/1.25× chỉnh trực tiếp ở trình duyệt bằng `playbackRate`)
  - [ ] Retry + xoay vòng danh sách `GEMINI_API_KEY` (như `GeminiClient`) khi gặp giới hạn rate-limit; lỗi hẳn → `audio_status = FAILED`
- [ ] Upload qua `SupabaseStorageService` có sẵn: bucket `reading-audio`, đường dẫn `articles/{articleId}/{level}/{idx}.wav`
- [ ] Ghi `audioUrl`, `durationMs` vào từng phần tử của `sentences` (jsonb), đặt `audio_status = READY` khi đủ
- [ ] Sinh audio **sau khi** bài được admin publish (không tốn quota TTS cho bài bị reject)
- [ ] Endpoint admin sinh lại audio (có thể chọn đổi giọng Nam/Nữ nếu muốn): `POST /api/v1/admin/reading/versions/{id}/audio`
- [ ] Đọc key từ biến môi trường / `backend/.env`, **không commit, không log**

## 3.3 Fallback
- [ ] Nếu `audio_status != READY`: frontend dùng Web Speech API (`speechSynthesis`, `lang = 'ja-JP'`) đọc từng câu, hiển thị nhãn "Giọng đọc tạm thời"

## 3.4 Kiểm thử
- [ ] Unit test: đường dẫn file đúng format, cập nhật đúng jsonb
- [ ] Unit test: 1 câu lỗi → các câu khác vẫn lưu, trạng thái `FAILED`, chạy lại chỉ sinh câu thiếu
- [ ] Thủ công: phát được 1 file mp3 từ URL Supabase trên Chrome

---

## ✅ ĐIỀU KIỆN HOÀN THÀNH PHASE 3
- [ ] Bài đã publish có `audio_status = READY`, đủ mp3 cho mọi câu
- [ ] Tổng chi phí TTS/ngày ước tính được ghi lại trong file này: ______
