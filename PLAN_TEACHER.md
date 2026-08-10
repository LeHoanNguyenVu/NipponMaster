# 👨‍🏫 Kế Hoạch Triển Khai: Role TEACHER (Giảng Viên / Biên Soạn Nội Dung)

Tài liệu chi tiết quản lý toàn bộ công cụ tạo đề thi, biên soạn nội dung bài học, công cụ trợ lý AI cho giảng viên, quản lý lớp học và định hướng **tương lai dài hạn (Sprint 11 đến 24+)** dành cho **Teacher (Giảng viên)**.

---

## 📊 1. Hiện Trạng Codebase (Current Audit Status)

### Frontend Screens Đã Có:
- [DashboardTeacher.tsx](file:///d:/Japanese%20Project/frontend/src/screens/DashboardTeacher.tsx) — Trang tổng quan Giảng viên (Thống kê đề thi đã tạo, danh sách bài học, nút tạo nhanh nội dung).

### Backend APIs Đã Có:
- Role check `@PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")` bảo vệ các endpoint tạo nội dung.
- Dữ liệu sơ khởi trong `DataSeeder.java` hỗ trợ cấu trúc bài thi và danh mục từ vựng.

---

## 🏃 2. Lộ Trình Sprints & Tasks Chi Tiết (Từ Hiện Tại Đến Tương Lai Dài Hạn)

### 📍 GIAI ĐOẠN 1: STUDIO BIÊN SOẠN & NHẬP ĐỀ THI (Sprint 11) — [ĐÃ HOÀN THÀNH ✅]

#### [x] **Task 11.1: Trình Soạn Thảo Đề Thi JLPT Đa Định Dạng (JLPT Exam Builder Studio)** — [ĐÃ HOÀN THÀNH ✅]
- **Mô tả**: Studio biên soạn đề thi tương tác dành cho Giảng viên (`ExamBuilderStudio.tsx`). Cấu hình đề thi (Tiêu đề, Level N5-N1, Loại đề FULL/VOCABULARY/GRAMMAR/READING/LISTENING, Thời gian, Tổng điểm), quản lý danh sách câu hỏi kéo thả/di chuyển vị trí, nhập nội dung, 4 đáp án A/B/C/D, chọn đáp án đúng và lời giải chi tiết.
- **Công nghệ**: React State Engine, Spring Boot REST APIs (`POST /api/v1/exams`, `PUT /api/v1/exams/{id}`, `DELETE /api/v1/exams/{id}`).

#### [x] **Task 11.2: Nhập Đề Thi Hàng Loạt Từ File Excel / JSON (Bulk Question Import)** — [ĐÃ HOÀN THÀNH ✅]
- **Mô tả**: Tải file mẫu `.json`, Drag & drop file upload parser, ô dán trực tiếp JSON/CSV và **Bảng Live Preview Grid** kiểm tra tính hợp lệ của từng câu hỏi (báo lỗi nếu thiếu nội dung hoặc đáp án) trước khi Nạp 1-Click hàng chục/hàng trăm câu vào đề thi.
- **Công nghệ**: Frontend JSON/CSV Parser Engine, Interactive Preview Grid.

#### 💡 **[CÁC ĐIỂM TỐI ƯU UX/UI ĐÃ BỔ SUNG ✅]**:
- [x] **1. Nút Trộn Ngẫu Nhiên (Randomize Shuffle Toggles)**: Thêm tùy chọn `[x] Trộn thứ tự câu hỏi` và `[x] Đảo ngẫu nhiên 4 đáp án A, B, C, D` chống học vẹt khi làm bài thi.
- [x] **2. Xuất File In Đề Thi (.doc / Word Print-Ready)**: Nút **"📥 Xuất File Word In Đề (.doc)"** sinh tài liệu in ấn chuẩn gồm Trang đề bài + Trang Đáp án & Hướng dẫn giải chi tiết cho lớp học Offline.
- [x] **3. Thanh Tìm Kiếm & Lọc Đề Thi Theo Cấp Độ (Search Bar & Level Filter Pills)**: Thêm ô tìm kiếm đề thi theo tên & bộ lọc cấp độ `[🔍 Tất cả]`, `[N5]`, `[N4]`, `[N3]`, `[N2]`, `[N1]` trên `DashboardTeacher.tsx`.

---

### 📍 GIAI ĐOẠN 2: THƯ VIỆN BÀI HỌC & BẢNG ĐIỂM LỚP HỌC (Sprints 12 - 13) — [ĐÃ HOÀN THÀNH ✅]

#### [x] **Task 12.1: Bộ Công Cụ Biên Soạn Từ Vựng, Kanji & Ngữ Pháp (Content CMS Studio)** — [ĐÃ HOÀN THÀNH ✅]
- **Mô tả**: Studio biên soạn bài học giao diện Tab (`ContentCmsStudio.tsx`) dành cho Giảng viên. Thêm mới, cập nhật âm đọc On/Kun của Kanji, chỉnh sửa từ vựng, tạo câu ví dụ minh họa và bổ sung các cấu trúc ngữ pháp N5-N1.
- **Công nghệ**: Spring Boot REST APIs (`/api/v1/teacher/content/...`), `@PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")`, React Axios Client.

#### [x] **Task 13.1: Dashboard Thống Kê & Bảng Điểm Lớp Học (Teacher Analytics & Gradebook)** — [ĐÃ HOÀN THÀNH ✅]
- **Mô tả**: Console quản lý bảng điểm lớp học (`TeacherGradebookConsole.tsx`). Giảng viên theo dõi sĩ số sinh viên, phổ điểm trung bình, phát hiện học viên học yếu (`<50%` điểm bài thi) kèm cảnh báo `⚠️ Cần Hỗ Trợ` và xuất file báo cáo điểm số `.CSV` 1-Click.
- **Công nghệ**: Spring Data Aggregation APIs, Gradebook Table View, CSV Export Engine.

---

### 📍 GIAI ĐOẠN 3: CÔNG CỤ TRỢ LÝ AI DÀNH CHO GIẢNG VIÊN (Sprints 19 - 20) — [TRUNG HẠN 🔮]

#### [ ] **Task 19.1: Trình Biên Tập File Âm Thanh Bài Nghe JLPT (JLPT Audio Editor Studio)**
- **Mô tả**: Công cụ cắt ghép file âm thanh bài nghe trực tiếp trên trình duyệt dành cho giảng viên: Tự chèn tiếng bíp báo hiệu, chèn thời gian ngắt nghỉ giữa các câu hỏi, căn chỉnh mốc thời gian (Timestamps) khớp với từng câu hỏi nghe hiểu.
- **Công nghệ**: Web Audio API / Wavesurfer.js Editor,FFmpeg.wasm (Trình xử lý audio chạy trực tiếp trong browser).
- **Luồng chạy**:
  1. Giảng viên upload file MP3 bài nghe hội thoại.
  2. Dùng giao diện sóng âm (Waveform) kéo chọn vị trí câu 1, câu 2...
  3. Bấm "Tự động chèn khoảng nghỉ 10s & Tiếng bíp" ➔ Trình duyệt tự render ra file MP3 hoàn chỉnh ➔ Upload lên server.

#### [ ] **Task 19.2: Công Cụ Tự Động Tạo Câu Hỏi Đọc Hiểu Bằng AI (AI Assist Question Generator)**
- **Mô tả**: Giảng viên chỉ cần dán một đoạn văn/bài báo tiếng Nhật ➔ AI tự động trích xuất danh sách từ vựng theo cấp độ JLPT, phân tích ngữ pháp khó và tự động tạo 5 câu hỏi trắc nghiệm đọc hiểu kèm đáp án & lời giải thích chi tiết.
- **Công nghệ**: OpenAI GPT-4o API, Prompt Engineering for Educational Content.
- **Luồng chạy**:
  1. Giảng viên dán bài văn tiếng Nhật vào ô nhập liệu.
  2. Bấm "AI Tạo Đề Thi Đọc Hiểu".
  3. AI xử lý ➔ Trả về bảng 5 câu hỏi trắc nghiệm chuẩn form JLPT.
  4. Giảng viên duyệt/chỉnh sửa lại ➔ Bấm "Thêm vào Đề thi".

#### [ ] **Task 20.1: Phòng Học Trực Tuyến & Sửa Nét Vẽ Kanji Live (Live Classroom WebRTC)**
- **Mô tả**: Cho phép giảng viên mở lớp dạy trực tuyến (Live Stream), chia sẻ màn hình slide bài giảng, theo dõi canvas luyện viết Kanji trực tiếp của từng học viên trong lớp để sửa nét vẽ ngay tại chỗ.
- **Công nghệ**: WebRTC, Agora / LiveKit SDK, Canvas Real-time Data Synchronization via WebSocket.

---

### 📍 GIAI ĐOẠN 4: THƯƠNG MẠI HÓA KHÓA HỌC & CHỢ GIÁO TRÌNH (Sprints 23 - 24) — [DÀI HẠN 🚀]

#### [ ] **Task 23.1: Chợ Giáo Trình & Khóa Học Mở Giảng Viên (Teacher Course Marketplace)**
- **Mô tả**: Giảng viên có thể tự đóng gói các bộ đề thi độc quyền, khóa học video hoặc bộ thẻ Flashcards nâng cao ➔ Đăng bán trên Chợ Giáo Trình của ứng dụng ➔ Hệ thống tự động ăn chia hoa hồng chiết khấu.
- **Công nghệ**: Revenue Share Settlement Engine, Digital Rights Management (DRM) bảo vệ video/đề thi chống copy.
- **Luồng chạy**:
  1. Giảng viên đóng gói "Bộ 10 Đề Thi Dự Đoán JLPT N2 Kèm Video Giải".
  2. Đặt giá bán (vd: 299.000 VNĐ).
  3. Học viên mua ➔ Hệ thống tự động chuyển 70% doanh thu vào Ví Giảng Viên (Teacher Wallet).
  4. Giảng viên bấm "Rút tiền về Ngân hàng" ➔ Hệ thống xử lý payout tự động.
