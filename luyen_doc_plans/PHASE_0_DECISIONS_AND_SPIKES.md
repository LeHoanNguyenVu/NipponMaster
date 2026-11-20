# PHASE 0 – CHỐT QUYẾT ĐỊNH & SPIKE KỸ THUẬT

> **Mục tiêu**: Chốt những thứ mà nếu chọn sai sẽ phải đập đi làm lại (nguồn nội dung, TTS, phạm vi MVP), và chứng minh 4 kỹ thuật rủi ro nhất chạy được trước khi đầu tư.
> **Phụ thuộc**: Không · **Chặn**: Toàn bộ các phase sau · **Trạng thái**: ✅ **Hoàn thành (2026-11-20)**

---

## 0.1 🔴 QUYẾT ĐỊNH 1 – NGUỒN NỘI DUNG & BẢN QUYỀN (ĐÃ CHỐT CHO PRODUCTION)

### Bối cảnh pháp lý (tham khảo kỹ thuật – không thay thế tư vấn luật sư)

- **著作権法 Điều 10 khoản 2**: "tin vắn / thời sự chỉ truyền đạt sự thật" không phải tác phẩm → **sự kiện khách quan (facts) không có bản quyền**, nhưng **câu chữ, tiêu đề giàu tính sáng tạo và cách diễn đạt của bài báo thì có**.
- **Điều 32 (trích dẫn – 引用)**: chỉ được trích một phần làm phụ trợ → **không áp dụng cho việc đăng lại toàn văn**.
- **Điều 30-4**: không cho phép dùng bài báo để người dùng "thưởng thức" (đọc bài) → không áp dụng để sao chép bài.
- **Điều khoản sử dụng (ToS) thực tế đã rà soát (2026-11-20)**:
  - **Yahoo!ニュース (LINE Yahoo)**: Cấm tái sử dụng thương mại rõ ràng và là trang tổng hợp tin từ nhiều tòa soạn bên thứ ba (rủi ro pháp lý kép) → **LOẠI BỎ hoàn toàn**.
  - **Wikinews tiếng Nhật (`ja.wikinews.org`)**: **Đã đóng cửa từ 04/05/2026** (chỉ còn kho lưu trữ read-only) → **LOẠI BỎ**.
  - **Cơ quan công quyền Nhật Bản (公共データ利用規約 第1.0版 / 政府標準利用規約 2.0, tương thích CC BY 4.0)**: **Cho phép sử dụng thương mại, biên tập và tái cấu trúc** chỉ cần ghi nguồn đầy đủ, **không** bị ràng buộc ShareAlike như CC BY-SA → **Chọn làm Tầng 1 an toàn pháp lý tuyệt đối**.
  - **NHK NEWS WEB RSS**: Cấm sao chép/phân phối lại *nội dung bài viết*, nhưng hyperlinking và đưa tin độc lập từ *sự kiện khách quan* được pháp luật bảo vệ → **Chỉ dùng làm Tầng 2 (đọc metadata RSS tần suất thấp 1 lần/ngày, cách ly tuyệt đối văn bản gốc, viết bài nguyên bản 100% của NipponMaster)**.

### Kiến trúc Bản quyền 2 Tầng (Phương án B + C cho Production thương mại)

| Tầng | Vai trò | Giấy phép / Cơ sở pháp lý | Quy tắc xử lý bắt buộc |
|:-:|:---|:---|:---|
| **Tầng 1 (C)** ⭐ | Nguồn mở công quyền Nhật (đời sống, công nghệ, du lịch, nông nghiệp, thời tiết) | **公共データ利用規約 第1.0版 (PDL 1.0 / CC BY 4.0)** – cho phép thương mại | Đọc RSS/RDF chính thức → biên soạn lại theo cấp độ JLPT → ghi rõ tên cơ quan + liên kết gốc + giấy phép PDL 1.0 / CC BY 4.0 |
| **Tầng 2 (B)** ⭐ | Nguồn sự kiện thời sự nóng (NHK NEWS WEB RSS) | **著作権法 Điều 10 khoản 2** (chỉ lấy sự kiện khách quan, tác phẩm hoàn toàn nguyên bản) | Chỉ đọc RSS 1 lần/ngày (**cấm cào HTML**). Trích facts tiếng Việt → viết bài tiếng Nhật mới hoàn toàn không nhìn văn bản gốc → qua cổng chống sao chép & Admin duyệt |

### 7 Hàng rào bảo vệ pháp lý bắt buộc khi lên Production

1. **Tuyệt đối không cào HTML (Zero Web Scraping)**: Backend chỉ gửi HTTP GET đến URL RSS trong whitelist với tần suất thấp (1 lần/ngày), `User-Agent` định danh rõ (`NipponMaster-ReadingIngest/1.0`).
2. **Tường lửa Sự kiện (2-Step Facts Firewall)**:
   - Bước 1: Gemini chỉ trích 4–6 gạch đầu dòng sự kiện khách quan (Ai / Cái gì / Ở đâu / Khi nào / Số liệu) sang **tiếng Việt trung tính**.
   - Bước 2: Prompt sinh bài tiếng Nhật **chỉ nhận facts tiếng Việt**, tuyệt đối không nhận lại văn bản tiếng Nhật của RSS → triệt tiêu hoàn toàn nguy cơ đạo văn vô thức.
3. **Không công khai tiêu đề/tóm tắt gốc**: Cột `source_title` chỉ lưu nội bộ cho Admin chống trùng, **tuyệt đối không trả về** trong API công khai `/api/v1/reading/**`. Mỗi phiên bản đều có `title_ja` mới 100% do NipponMaster biên soạn.
4. **Cổng kiểm tra chống sao chép tự động (Originality Gate)**: Kiểm tra trùng lặp ký tự **8-gram < 10%** (chặt hơn mức 15% dự kiến ban đầu; spike thực tế chỉ 0%–4.4%) giữa bài sinh ra và chuỗi RSS gốc; vượt ngưỡng tự động viết lại.
5. **Ghi nguồn trung lập, không ngụ ý hợp tác / tài trợ**:
   - **Mẫu Tầng 1 (PDL 1.0 / CC BY 4.0)**:
     > *Nguồn thông tin công khai: [Tên cơ quan] (Giấy phép Dữ liệu Công cộng Nhật Bản 1.0 / CC BY 4.0) — Biên soạn lại cho mục đích học tiếng Nhật bởi NipponMaster · [Xem nguồn gốc ↗]*
   - **Mẫu Tầng 2 (Sự kiện thời sự – Phương án B)**:
     > *Bài đọc gốc do NipponMaster biên soạn cho mục đích học tiếng Nhật dựa trên sự kiện thời sự · Tham khảo tin gốc (liên kết ngoài): [Tên nguồn] ↗*
6. **Admin Review Gate (`REVIEW` → `PUBLISHED`)**: Mọi bài sinh tự động đều ở trạng thái `REVIEW`, bắt buộc Admin duyệt nội dung & tính chính xác trước khi hiển thị cho học viên.
7. **Kill-switch theo từng nguồn & Quy trình gỡ bài**: Cấu hình `reading.rss.enabled-sources` qua `application.properties`/env để tắt ngay bất kỳ nguồn nào không cần deploy lại (có thể chuyển sang 100% Tầng 1 mở bất cứ lúc nào), đồng thời chuẩn bị email/quy trình gỡ bài trong 24h nếu nhận yêu cầu từ chủ sở hữu nguồn tin.

### Danh sách RSS đã kiểm chứng HTTP 200 (2026-11-20) & Whitelist Host

| Mã nguồn | Tầng | URL RSS/RDF/Atom (đã test HTTP 200) | Encoding | Danh mục mặc định | Ghi chú |
|:---|:-:|:---|:---:|:---:|:---|
| `GOV_ONLINE` | C (PDL 1.0) | `https://www.gov-online.go.jp/rss/index.rdf` | UTF-8 (RDF 1.0) | `LIFE` | 20 items, có description, chủ đề đời sống rất sát JLPT |
| `DIGITAL_AGENCY` | C (PDL 1.0) | `https://www.digital.go.jp/rss/news.xml` | UTF-8 (RSS 2.0) | `SCI_TECH` | 36 items, công nghệ & chuyển đổi số |
| `KANKOCHO` | C (PDL 1.0) | `https://www.mlit.go.jp/kankocho/press.rdf` | Shift_JIS (RDF) | `CULTURE` | 50 items, du lịch & văn hóa Nhật |
| `SOUMU` | C (PDL 1.0) | `https://www.soumu.go.jp/news.rdf` | Shift_JIS (RDF) | `SCI_TECH` | 20 items, viễn thông, xã hội số |
| `MAFF` | C (PDL 1.0) | `https://www.maff.go.jp/j/press/rss.xml` | UTF-8 (RSS) | `LIFE` | 65 items, ẩm thực, nông nghiệp, đời sống |
| `JMA_REGULAR` | C (PDL 1.0) | `https://www.data.jma.go.jp/developer/xml/feed/regular.xml` | UTF-8 (Atom) | `WEATHER` | Tùy chọn – cần lọc tin thời tiết tổng hợp (tránh cảnh báo lặp) |
| `NHK_TOP` | B (Facts only) | `https://www.nhk.or.jp/rss/news/cat0.xml` | UTF-8 (RSS 2.0) | `SOCIETY` | 7 items nổi bật nhất, có description |
| `NHK_SOCIETY` | B (Facts only) | `https://www.nhk.or.jp/rss/news/cat1.xml` | UTF-8 (RSS 2.0) | `SOCIETY` | Thời sự xã hội |
| `NHK_CULTURE` | B (Facts only) | `https://www.nhk.or.jp/rss/news/cat2.xml` | UTF-8 (RSS 2.0) | `CULTURE` | Đời sống, văn hóa, giải trí |
| `NHK_SCITECH` | B (Facts only) | `https://www.nhk.or.jp/rss/news/cat3.xml` | UTF-8 (RSS 2.0) | `SCI_TECH` | Khoa học, y tế, công nghệ |
| `NHK_ECONOMY` | B (Facts only) | `https://www.nhk.or.jp/rss/news/cat5.xml` | UTF-8 (RSS 2.0) | `ECONOMY` | Kinh tế, doanh nghiệp |
| `NHK_SPORTS` | B (Facts only) | `https://www.nhk.or.jp/rss/news/cat7.xml` | UTF-8 (RSS 2.0) | `SPORTS` | Thể thao |

**Whitelist host cho `ReadingRssClient` (chống SSRF):**
```text
www.gov-online.go.jp
www.digital.go.jp
www.mlit.go.jp
www.soumu.go.jp
www.maff.go.jp
www.data.jma.go.jp
www.nhk.or.jp
```

> [!NOTE]
> Các nguồn đã loại bỏ sau khi kiểm chứng: `Yahoo!ニュース` (cấm thương mại trong ToS), `Wikinews ja` (đóng cửa 05/2026), `METI` (HTTP 403), `ENV` (HTTP 404), `CAO` & `MEXT` (lỗi chuỗi chứng chỉ SSL).

**Checklist quyết định 1:**
- [x] Chủ dự án chọn phương án: ☐ B ☑ **B + C (An toàn pháp lý tuyệt đối cho cả môi trường Production)** ☐ C
- [x] Danh sách RSS chốt (tên + URL đã kiểm chứng HTTP 200) và whitelist host cho backend (7 host như trên)
- [x] Mẫu dòng ghi nguồn hiển thị dưới mỗi bài được duyệt (2 mẫu riêng cho Tầng 1 PDL 1.0 & Tầng 2 Facts-only)
- [x] Không tạo Quiz sau bài đọc (theo yêu cầu của chủ dự án)

---

## 0.2 🔴 QUYẾT ĐỊNH 2 – CÔNG NGHỆ AUDIO (TTS)

`TtsController` hiện tại gọi endpoint TTS không chính thức của Google Translate, **giới hạn 200 ký tự**, không có cam kết sử dụng thương mại → **không dùng cho audio bài báo**, chỉ giữ làm fallback cho từ đơn.

**Checklist quyết định 2 (ĐÃ CHỐT):**
- [x] Chọn nhà cung cấp TTS chính: ☐ Google Cloud TTS ☑ **Gemini 2.5 Flash TTS (`gemini-2.5-flash-preview-tts`, dùng chung `GEMINI_API_KEY` sẵn có — KHÔNG dùng Google Standard TTS)**
- [x] Chọn 2 giọng đọc Phát thanh viên và **Random ngẫu nhiên theo từng bài báo**:
  - Giọng Nữ: **`Kore`** (Nữ phát thanh viên thời sự tự nhiên)
  - Giọng Nam: **`Puck`** (Nam phát thanh viên trầm, rõ chữ)
  - *Quy tắc:* Khi tạo một bài báo mới, hệ thống random 50/50 giữa `Kore` và `Puck` rồi lưu vào cột `voice_name` của bài đó để mọi câu trong cùng bài đồng nhất 1 giọng đọc.
- [x] Tạo bucket Supabase `reading-audio` (public read, write chỉ từ backend, giới hạn 10 MB/file, MIME whitelist `audio/wav`, `audio/mpeg`, `audio/mp3`, `audio/ogg`) — **ĐÃ TẠO & KIỂM CHỨNG THÀNH CÔNG (2026-11-20)**

---

## 0.3 🟡 QUYẾT ĐỊNH 3 – PHẠM VI MVP (ĐÃ CHỐT)

- [x] Số phiên bản mỗi sự kiện: ☐ 5 (N5…N1) ☑ **3 (`N5`, `N3`, `N1` – tiết kiệm 40% chi phí Gemini + TTS cho MVP; DB vẫn hỗ trợ đủ `N5..N1`, nâng lên 5 cấp chỉ cần đổi config `reading.ingest.target-levels`)**
- [x] Số sự kiện mới/ngày: ☑ **5** (5 sự kiện × 3 level = 15 bài/ngày) ☐ 10
- [x] Bài cần admin duyệt trước khi xuất bản? ☑ **Có (`REVIEW` → `PUBLISHED`, bắt buộc cho Production để kiểm soát bản quyền & độ chuẩn tiếng Nhật)** ☐ Tự động
- [x] Học viên Nhập Môn (STARTER) có thấy module không? ☑ **Ẩn như Kanji/Ngữ pháp/Đề thi (nhất quán với `Sidebar.tsx` & route guard `App.tsx`)** ☐ Cho đọc bản N5
- [x] Danh mục chủ đề (7 danh mục): `SOCIETY` (Xã hội) · `LIFE` (Đời sống) · `ECONOMY` (Kinh tế) · `SCI_TECH` (Khoa học–Công nghệ) · `SPORTS` (Thể thao) · `CULTURE` (Văn hóa–Giải trí) · `WEATHER` (Thời tiết)
- [x] Tên module trên Sidebar: `"Luyện Đọc"` (vi) / `"Reading"` (en), icon `Newspaper` của `lucide-react`

---

## 0.4 🧪 SPIKE KỸ THUẬT (ĐÃ HOÀN THÀNH CẢ 4 SPIKE – CODE NHÁP TRONG SCRATCH, KHÔNG MERGE)

### Spike 1 – Tách từ tiếng Nhật trong Java
- [x] Thử `com.atilika.kuromoji:kuromoji-ipadic:0.9.0` với Java 17 target / JDK 24 runtime của backend → chạy sạch, không lỗi tương thích, giấy phép **Apache 2.0** (an toàn thương mại).
- [x] So sánh với Sudachi: Kuromoji IPADIC đóng gói trọn bộ trong **1 JAR duy nhất 12.72 MB** trên Maven Central (Sudachi cần quản lý riêng file `.dic` 70–200+ MB, phức tạp deploy hơn nhiều).
- [x] Đo thực tế trên bài báo **822 ký tự (490 tokens)**:
  - Cold init: **298 ms**
  - Warm tokenize (trung bình 20 lần): **1.42 ms** (min 0.75 ms, max 2.52 ms) → **đạt vượt xa ngưỡng `< 50 ms`** (~35× nhanh hơn!).
  - Trả đầy đủ `surface`, `reading` (Katakana → chuyển sang Hiragana), `baseForm`, `partOfSpeechLevel1/2` (`名詞,固有名詞`, `名詞,数` lọc tên riêng/số chính xác).
- [x] Kết quả: ☑ **Kuromoji (`kuromoji-ipadic:0.9.0`)** ☐ Sudachi

### Spike 2 – Độ phủ dữ liệu JLPT có sẵn (Truy vấn trực tiếp PostgreSQL dev)
- [x] Đếm số liệu thực tế trên DB hiện tại (Flyway đang ở `V34`, bảng `users.id` kiểu `BIGINT`):
- [x] Kết luận bổ sung từ vựng: Tổng từ vựng N5–N1 hiện có trong DB còn **rất thiếu ở N5–N2** (cả bảng `vocabularies` chỉ có 17 từ JLPT N5–N1, `kanji_chapter_vocab` dồn nặng vào N1). **BẮT BUỘC bổ sung file từ điển JLPT cộng đồng (~8.000–10.000 từ N5–N1) ở Phase 2** dạng static classpath CSV (`reading/jlpt-vocab.csv`) dùng bộ **Jonathan Waller / `tanos.co.uk` thuần giấy phép CC BY 3.0** (có ghi credit, **TRÁNH** gói dẫn xuất dính EDRDG/JMdict **CC BY-SA** để không bị vướng điều khoản ShareAlike khi lên Production thương mại).
- [x] Kết quả thực tế từng bảng:

| Bảng | N5 | N4 | N3 | N2 | N1 | Tổng / Ghi chú |
|:---|:-:|:-:|:-:|:-:|:-:|:-:|
| `vocabularies` | 10 | 3 | 2 | 1 | 1 | 185 (gồm 168 `STARTER`) — **Rất thiếu** |
| `kanji_chapter_vocab` (distinct) | 296 | 73 | 201 | 216 | 3.140 | 4.601 dòng / ~3.926 distinct — **Thiếu nặng N5–N2** |
| `kanjis` | 117 | 209 | 371 | 501 | 943 | **2.141** — **Đầy đủ chuẩn JLPT** |
| `grammars` | 3 | 0 | 0 | 0 | 0 | 8 (gồm 5 `STARTER`) — **Thiếu mẫu regex/pattern** |
| `grammar_lessons` (bổ sung) | 25 | 25 | 30 | 26 | 25 | 131 bài giảng video |
| `grammar_timestamps` (bổ sung) | 272 (232 distinct) | 160 (136 distinct) | 150 (5 distinct) | 130 (5 distinct) | 125 (5 distinct) | 837 mốc (N3–N1 chỉ có tiêu đề chung, cần bổ sung danh sách pattern ngữ pháp N5–N1 cho Phase 2) |

### Spike 3 – Prompt sinh bài theo cấp độ (Chạy thật 3 sự kiện × 3 level = 9 bài)
- [x] Viết prompt 2 bước (RSS → facts tiếng Việt → JSON `{titleJa, titleVi, sentences[], keyVocab[]}`) chạy thật trên 3 sự kiện: `NHK_CULTURE`, `NHK_ECONOMY`, `GOV_ONLINE` × `N5, N3, N1` (model `gemini-3.1-flash-lite-preview`).
- [x] Kết quả kiểm tra chống sao chép (8-gram overlap với tiêu đề + tóm tắt RSS gốc):
  - **N5**: **0.0%** (LCS 2–7 ký tự)
  - **N3**: **2.5% – 4.4%** (LCS 10–16 ký tự, chủ yếu tên riêng như `大崎電気工業`, `骨髄バンク`)
  - **N1**: **1.2% – 2.0%** (LCS 10–14 ký tự)
  - → **9/9 bài đạt ngưỡng an toàn `< 10%`** (chặt hơn mục tiêu 15% ban đầu).
- [x] Kết quả chấm level lần đầu bằng classifier nháp:
  - **Theo Kanji + độ dài câu**: **6/9 đúng chính xác (67%)**, **9/9 đạt ±1 cấp (100%)** (N5: 100% Kanji N5; N3: độ dài câu 29–37.5 ký tự đúng chuẩn N3 nhưng rò ~16–24% Kanji N2; N1: 99–100% Kanji N1 & độ dài 53–62 ký tự).
  - **Theo từ vựng DB hiện tại**: chỉ đạt **3/9 (33%)** do DB thiếu cả từ căn bản (`する`, `病気`, `わるい` bị coi là OOV) → xác nhận 100% tính cấp thiết của việc nạp từ điển JLPT CC BY 3.0 ở Phase 2.
- [x] **Phát hiện cần cập nhật cho Phase 1 & Phase 2**:
  1. **Bắt buộc bật Structured Outputs (`responseSchema`)** khi gọi Gemini (ghi nhận 1 lần model tự sinh sai tên trường `"translationWire"` thay vì `"translationVi"` khi chỉ dùng `responseMimeType`).
  2. **Thêm ràng buộc bảo toàn mốc thời gian & thực thể** trong prompt (ghi nhận 1 bài N5 đổi "năm ngoái" thành `おととし`), cộng với Admin Review Gate.
  3. **Ưu tiên thứ tự model**: `gemini-3.1-flash-lite-preview` → `gemini-flash-lite-latest` → `gemini-2.5-flash-lite` kèm `thinkingConfig` (`thinkingLevel: "minimal"` / `thinkingBudget: 0`) và xoay vòng `GEMINI_API_KEY` + retry backoff khi gặp 429/503.

### Spike 4 – TTS & Supabase Storage (ĐÃ KIỂM CHỨNG THÀNH CÔNG TOÀN LUỒNG)
- [x] Sinh audio tiếng Nhật bằng `gemini-2.5-flash-preview-tts` với cả 2 giọng `Kore` (Nữ) và `Puck` (Nam) bằng `GEMINI_API_KEY` trong `backend/.env` — trả PCM 24kHz 16-bit mono (`audio/L16;codec=pcm;rate=24000`), đóng gói WAV ~48 KB/giây (3.65 giây = 175 KB).
- [x] Tạo bucket `reading-audio`, upload file test `spike/test_kore.wav` (HTTP 200), kiểm chứng public URL phát trực tiếp không cần auth (HTTP 200, `Content-Type: audio/wav`, header `RIFF` hợp lệ), xác nhận ghi trái phép bị chặn (HTTP 400), và đã xóa file spike.
- [x] **Phát hiện cho Phase 3**: `SupabaseStorageService.deleteFile()` hiện gọi `DELETE /storage/v1/object/{bucket}/{path}` nhưng Supabase Storage trả HTTP 400 nếu không gọi `DELETE /storage/v1/object/{bucket}` với body `{"prefixes":[path]}` → cần sửa nhỏ nếu Phase 3/Admin có tính năng xóa audio cũ.

---

## 📌 CẬP NHẬT ƯỚC LƯỢNG & LƯU Ý CHO CÁC PHASE SAU (TỪ KẾT QUẢ SPIKE)

| Phase | Thay đổi / Lưu ý kỹ thuật rút ra từ Phase 0 | Ảnh hưởng ước lượng |
|:-:|:---|:---|
| **Phase 1** | (1) `ReadingRssClient` cần hỗ trợ đọc **UTF-8 + Shift_JIS** (cho `KANKOCHO`/`SOUMU`) và 3 định dạng **RSS 2.0 / RDF 1.0 / Atom**. (2) `ReadingContentGenerator` dùng **Structured Outputs (`responseSchema`)** + 2-Step Facts Firewall. (3) Không trả `source_title` ra API học viên. (4) Migration đúng là **`V35`** (hiện mới nhất là `V34`, `users.id` là `BIGINT`). | +0.25 ngày (hỗ trợ Shift_JIS + RDF/Atom + `responseSchema`) |
| **Phase 2** | **BẮT BUỘC bổ sung 2 file resource tĩnh**: từ điển từ vựng JLPT N5–N1 (~8.000+ từ, CC BY 3.0 thuần, không dùng nguồn CC BY-SA) và danh sách mẫu ngữ pháp JLPT N5–N1 (do `vocabularies` và `grammars` trong DB rất thưa). Bảng `kanjis` (2.141 chữ) dùng trực tiếp từ DB. | +0.5 ngày (nạp & làm sạch bộ từ vựng/ngữ pháp tĩnh) |
| **Phase 3** | File xuất ra dạng **`.wav` (PCM 24kHz 16-bit mono)** upload lên bucket `reading-audio` đã tạo sẵn (~175 KB/câu ≈ ~1 MB/bài; 15 bài/ngày ≈ 15 MB/ngày). Sửa nhẹ `SupabaseStorageService.deleteFile()` nếu cần xóa audio bài cũ. | Không đổi (bucket đã tạo sẵn!) |

---

## ✅ ĐIỀU KIỆN HOÀN THÀNH PHASE 0
- [x] Cả 3 quyết định có câu trả lời rõ ràng và được ghi lại ở file này (bản quyền 2 tầng B+C an toàn Production, TTS Gemini 2.5 Flash + bucket `reading-audio`, phạm vi MVP 3 level × 5 sự kiện/ngày + Admin duyệt)
- [x] Cả 4 spike đã chạy thực tế, đo đạc số liệu cụ thể và đạt chuẩn
- [x] Đã cập nhật lưu ý & ước lượng cho Phase 1, 2, 3 dựa trên phát hiện thực tế từ spike
