# PHASE 0 – CHỐT QUYẾT ĐỊNH & SPIKE KỸ THUẬT

> **Mục tiêu**: Chốt những thứ mà nếu chọn sai sẽ phải đập đi làm lại (nguồn nội dung, TTS, phạm vi MVP), và chứng minh 3 kỹ thuật rủi ro nhất chạy được trước khi đầu tư.
> **Phụ thuộc**: Không · **Chặn**: Toàn bộ các phase sau

---

## 0.1 🔴 QUYẾT ĐỊNH 1 – NGUỒN NỘI DUNG & BẢN QUYỀN (bắt buộc chốt)

### Bối cảnh pháp lý (tóm tắt, không phải tư vấn pháp lý)

- **著作権法 Điều 10 khoản 2**: "tin vắn / thời sự chỉ truyền đạt sự thật" không phải tác phẩm → **sự kiện (facts) không có bản quyền**, nhưng **câu chữ, cách diễn đạt của bài báo thì có**.
- **Điều 32 (trích dẫn – 引用)**: chỉ được trích một phần, phần trích phải là phụ so với nội dung chính của mình, có ghi nguồn rõ ràng → **không áp dụng cho việc đăng lại toàn văn**.
- **Điều 30-4** cho phép dùng tác phẩm để phân tích/huấn luyện AI nhưng **không** cho phép mục đích để người dùng "thưởng thức" nội dung đó (tức là đọc bài) → không dùng điều này để đăng lại bài.
- Yahoo!ニュース, NHK NEWS WEB / NEWS WEB EASY, Asahi, Yomiuri, Nikkei đều cấm sao chép/đăng lại trong điều khoản sử dụng.

### Ba phương án

| | Phương án | Mô tả | Pháp lý | Chất lượng học | Chi phí |
|:-:|:---|:---|:-:|:-:|:-:|
| A | Copy toàn văn báo gốc | Cào toàn bộ bài từ NHK/Yahoo/Asahi rồi hiển thị | ❌ Vi phạm | N2–N1 là chính, N5–N3 trống | Thấp |
| **B** ⭐ | **Bài gốc do AI viết lại từ sự kiện nóng** | Chỉ đọc **RSS** (tiêu đề + đoạn tóm tắt + link). Gemini trích **facts** → viết **bài mới của NipponMaster** cho từng cấp N5…N1. Luôn hiển thị *"Nguồn tham khảo: NHK – [link bài gốc]"*. Có bước kiểm tra độ giống văn bản gốc. | ✅ An toàn nhất (vẫn nên hỏi luật sư trước khi thu phí) | Cao – có đủ 5 cấp, cùng 1 sự kiện | Gemini + TTS |
| C | Nguồn có giấy phép mở | Wikinews tiếng Nhật (CC BY 2.5), thông cáo báo chí của chính phủ (政府標準利用規約 2.0, tương thích CC BY 4.0) | ✅ Hợp pháp | Thấp – ít bài, khô, không phải báo "hot" | Thấp |

> [!IMPORTANT]
> **Đề xuất: Phương án B làm chính, C làm nguồn bổ sung.** Đúng tinh thần "lấy báo người ta làm bài đọc" (vẫn là tin nóng từ các báo lớn nhất), nhưng câu chữ là của mình → không sao chép, đồng thời giải quyết luôn bài toán phân cấp N5–N3. Nếu sau này muốn dùng nguyên văn báo, cần **ký hợp đồng license** (ví dụ chương trình cấp phép nội dung của báo / hãng tin).

### Nguồn RSS đề xuất (chỉ lấy metadata)

| Nguồn | Lý do | Ghi chú |
|:---|:---|:---|
| NHK NEWS WEB (RSS theo chuyên mục) | Lượng đọc rất lớn, tiếng Nhật chuẩn | Chỉ dùng tiêu đề/tóm tắt/link |
| Yahoo!ニュース トピックス (RSS) | Trang tin được xem nhiều nhất Nhật | Tổng hợp từ nhiều báo |
| Bổ sung (tùy chọn): Asahi / Mainichi RSS | Đa dạng chủ đề | Kiểm tra RSS còn hoạt động trong spike |
| Wikinews ja (phương án C) | Có thể hiển thị cả văn bản (CC BY) | Ghi rõ tác giả + giấy phép |

**Checklist quyết định 1:**
- [x] Chủ dự án chọn phương án: ☐ B ☑ **B + C (An toàn pháp lý tuyệt đối cho cả môi trường Production)** ☐ C
- [ ] Danh sách RSS chốt (tên + URL) và whitelist host cho backend
- [x] Mẫu dòng ghi nguồn hiển thị dưới mỗi bài được duyệt
- [x] Không tạo Quiz sau bài đọc (theo yêu cầu của chủ dự án)

---

## 0.2 🔴 QUYẾT ĐỊNH 2 – CÔNG NGHỆ AUDIO (TTS)

`TtsController` hiện tại gọi endpoint TTS không chính thức của Google Translate, **giới hạn 200 ký tự**, không có cam kết sử dụng thương mại → **không dùng cho audio bài báo**, chỉ giữ làm fallback cho từ đơn.

| Lựa chọn | Ưu | Nhược |
|:---|:---|:---|
| **Google Cloud Text-to-Speech** (giọng ja-JP Neural2 / WaveNet) ⭐ | Ổn định, chất lượng cao, có SSML, có gói miễn phí hằng tháng | Cần bật billing GCP + service key |
| Gemini TTS (model TTS của Gemini API) | Dùng chung hạ tầng Gemini đã có | Model đang ở giai đoạn preview, tên model có thể đổi |
| Web Speech API của trình duyệt | Miễn phí, không cần server | Giọng khác nhau mỗi máy, không lưu file được → chỉ làm fallback |

**Checklist quyết định 2 (ĐÃ CHỐT):**
- [x] Chọn nhà cung cấp TTS chính: ☐ Google Cloud TTS ☑ **Gemini 2.5 Flash TTS (`gemini-2.5-flash-preview-tts`, dùng chung `GEMINI_API_KEY` sẵn có — KHÔNG dùng Google Standard TTS)**
- [x] Chọn 2 giọng đọc Phát thanh viên và **Random ngẫu nhiên theo từng bài báo**:
  - Giọng Nữ: **`Kore`** (Nữ phát thanh viên thời sự tự nhiên)
  - Giọng Nam: **`Puck`** (Nam phát thanh viên trầm, rõ chữ)
  - *Quy tắc:* Khi tạo một bài báo mới, hệ thống random 50/50 giữa `Kore` và `Puck` rồi lưu vào cột `voice_name` của bài đó để mọi câu trong cùng bài đồng nhất 1 giọng đọc.
- [ ] Tạo bucket Supabase `reading-audio` (public read, write chỉ từ backend)

---

## 0.3 🟡 QUYẾT ĐỊNH 3 – PHẠM VI MVP

- [ ] Số phiên bản mỗi sự kiện: ☐ 5 (N5…N1) ☐ 3 (N5, N3, N1 – rẻ hơn, khuyên dùng cho MVP)
- [ ] Số sự kiện mới/ngày: ☐ 5 ☐ 10
- [ ] Bài cần admin duyệt trước khi xuất bản? ☐ Có (khuyên dùng giai đoạn đầu) ☐ Tự động
- [ ] Học viên Nhập Môn (STARTER) có thấy module không? ☐ Ẩn như Kanji/Ngữ pháp (khuyên dùng) ☐ Cho đọc bản N5
- [ ] Danh mục chủ đề: Xã hội · Đời sống · Kinh tế · Khoa học–Công nghệ · Thể thao · Văn hóa–Giải trí · Thời tiết
- [ ] Tên module trên Sidebar: "Luyện Đọc" / "Reading" (icon `Newspaper` của lucide-react)

---

## 0.4 🧪 SPIKE KỸ THUẬT (mỗi spike ≤ 0.5 ngày, code nháp không merge)

### Spike 1 – Tách từ tiếng Nhật trong Java
- [ ] Thử `com.atilika.kuromoji:kuromoji-ipadic` (nhẹ, có sẵn trên Maven, trả về surface / reading / base form / POS) với Java đang dùng của backend
- [ ] So sánh nhanh với Sudachi (chính xác hơn với từ mới nhưng từ điển nặng hàng trăm MB) → chọn 1
- [ ] Đo: tách 1 bài 800 ký tự < 50 ms sau khi khởi động
- [ ] Kết quả: ☐ Kuromoji ☐ Sudachi

### Spike 2 – Độ phủ dữ liệu JLPT có sẵn
- [ ] Đếm số từ theo level trong bảng `vocabularies`, `kanji_chapter_vocab`; số Kanji theo level trong `kanjis`; số mẫu ngữ pháp trong `grammars`
- [ ] Nếu từ vựng < ~8.000 từ N5–N1: bổ sung danh sách JLPT cộng đồng (ví dụ bộ của Jonathan Waller / tanos – kiểm tra lại giấy phép CC BY trước khi nhập)
- [ ] Ghi kết quả vào bảng dưới

| Bảng | N5 | N4 | N3 | N2 | N1 |
|:---|:-:|:-:|:-:|:-:|:-:|
| vocabularies | | | | | |
| kanjis | | | | | |
| grammars | | | | | |

### Spike 3 – Prompt sinh bài theo cấp độ
- [ ] Viết prompt Gemini: đầu vào = facts (gạch đầu dòng) + level + danh sách từ/ngữ pháp cho phép → đầu ra JSON `{title, sentences[], keyVocab[]}`
- [ ] Sinh thử 3 sự kiện × 3 level, chạy qua classifier nháp (Phase 2) → bao nhiêu % đúng level ngay lần đầu?
- [ ] Kiểm tra độ giống bài gốc (n-gram overlap với đoạn tóm tắt RSS) để chắc chắn không sao chép

### Spike 4 – TTS (ĐÃ KIỂM CHỨNG THÀNH CÔNG)
- [x] Sinh audio tiếng Nhật bằng `gemini-2.5-flash-preview-tts` với cả 2 giọng `Kore` (Nữ) và `Puck` (Nam) bằng `GEMINI_API_KEY` trong `backend/.env` — đã nghe thử và duyệt chất lượng
- [ ] Upload lên Supabase bằng `SupabaseStorageService`, phát được trên trình duyệt

---

## ✅ ĐIỀU KIỆN HOÀN THÀNH PHASE 0
- [ ] Cả 3 quyết định có câu trả lời và được ghi lại ở file này
- [ ] 4 spike đạt hoặc có phương án thay thế
- [ ] Cập nhật lại ước lượng các phase sau nếu spike lộ ra vấn đề
