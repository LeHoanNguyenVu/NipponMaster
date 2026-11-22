# PHASE 3 – AUDIO TỪNG CÂU (TTS) & LƯU TRỮ

> **Mục tiêu**: Mỗi phiên bản bài có audio cho **từng câu**, lưu trên Supabase Storage, đủ để phát liền mạch cả bài và highlight câu đang đọc.
> **Phụ thuộc**: Phase 0 (chọn TTS), Phase 1 · **Song song với**: Phase 2 · **Trạng thái**: ✅ **Hoàn thành Backend Pipeline (2026-11-22)** (mục Fallback Web Speech phía trình duyệt gắn kèm ở Phase 4 Reader)

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

- [x] `ReadingTtsService` (sử dụng `gemini-2.5-flash-preview-tts` với `responseModalities: ["AUDIO"]`)
  - [x] Random `voice_name` ∈ `{"Kore", "Puck"}` khi khởi tạo bài báo (50% Nam / 50% Nữ — đã triển khai từ Phase 1 & giữ đồng nhất khi sinh TTS)
  - [x] Prompt hướng dẫn phong cách đọc: `"ニュースキャスターのように、自然で聞き取りやすい日本語で読んでください: <câu tiếng Nhật>"`
  - [x] Đóng gói dữ liệu PCM 24kHz 16-bit mono từ Gemini TTS thành file `.wav` (`pcmToWav`, chuẩn RIFF header 44 bytes), đo `durationMs` chính xác
  - [x] Tốc độ chuẩn 1.0 (tốc độ 0.75×/1.25× chỉnh trực tiếp ở trình duyệt bằng `playbackRate`)
  - [x] Retry + backoff + xoay vòng danh sách `GEMINI_API_KEY` khi gặp giới hạn rate-limit; lỗi câu nào lưu tiến độ các câu đã xong và đặt `audio_status = FAILED`, chạy lại chỉ sinh bù câu thiếu
- [x] Upload qua `StorageService` (`SupabaseStorageService`): bucket `reading-audio`, đường dẫn `articles/{articleId}/{level}/{idx}.wav`
- [x] Ghi `audioUrl`, `durationMs` vào từng phần tử của `sentences` (jsonb), đặt `audio_status = READY` khi đủ
- [x] Sinh audio bất đồng bộ **sau khi** bài được admin publish (`POST /api/v1/admin/reading/articles/{id}/publish`, không tốn quota TTS cho bài bị reject)
- [x] Endpoint admin sinh / sinh lại audio (hỗ trợ `?voice=Kore|Puck&force=true|false`, bảo vệ quyền `ADMIN`): `POST /api/v1/admin/reading/versions/{id}/audio`
- [x] Đọc key từ biến môi trường / `backend/.env`, **không commit, không log**

## 3.3 Fallback
- [ ] Nếu `audio_status != READY`: frontend dùng Web Speech API (`speechSynthesis`, `lang = 'ja-JP'`) đọc từng câu, hiển thị nhãn "Giọng đọc tạm thời" *(triển khai trong `useSentenceAudio.ts` ở Phase 4)*

## 3.4 Kiểm thử
- [x] Unit test: đường dẫn file đúng format `articles/{articleId}/{level}/{idx}.wav`, WAV header hợp lệ, cập nhật đúng jsonb (`ReadingTtsServiceTest`)
- [x] Unit test: 1 câu lỗi → các câu khác vẫn lưu, trạng thái `FAILED`, chạy lại (`force=false`) chỉ sinh bù đúng câu thiếu rồi chuyển `READY`
- [x] Unit test đổi giọng (`Puck` → `Kore`) sinh lại toàn bộ + bảo mật phân quyền `ADMIN` (`AdminReadingControllerSecurityTest`)
- [x] E2E thật: sinh đủ WAV cho từng câu bài `id=1` (N5) lên Supabase `reading-audio` & kiểm chứng phát trực tiếp trên trình duyệt Chrome

---

## ✅ ĐIỀU KIỆN HOÀN THÀNH PHASE 3
- [x] Bài có `audio_status = READY`, đủ file `.wav` công khai trên Supabase cho mọi câu và phát mượt trên Chrome
- [x] Tổng chi phí TTS/ngày ước tính được ghi lại trong file này: **~\$0.12/ngày (≈ \$3.5/tháng)** ở gói trả phí Gemini API (5 sự kiện × 3 level = 15 bài/ngày × ~6 câu × ~4 giây ≈ 360 giây audio ≈ ~11.520 audio output tokens × \$10/1M tokens + ~\$0.003 text input; **\$0/ngày** nếu chạy trong hạn mức Free Tier). Lưu trữ Supabase: ~17 MB/ngày (~510 MB/tháng).
