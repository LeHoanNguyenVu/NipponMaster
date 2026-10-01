# 📊 PHASE 5 — VIẾT TEST CASES TRÊN GOOGLE SHEETS

> **Mục đích**: Viết 150-200 test cases chi tiết, quản lý trên Google Sheets.  
> **Thời gian ước tính**: 5-7 ngày  
> **Vị trí**: Google Sheets file "NipponMaster — QA Test Suite"  
> **Điều kiện bắt đầu**: Phase 4 (Test Design) đã hoàn thành

---

## 📋 TASK 5.1: Tạo & Setup Google Sheets

- [ ] Tạo file Google Sheets mới: **"NipponMaster — QA Test Suite"**
- [ ] Tạo 8 sheets (tabs): TC_AUTH, TC_STUDENT, TC_TEACHER, TC_ADMIN, TC_PAYMENT, TC_API, RTM, Summary

### Setup cấu trúc cột (áp dụng cho tất cả sheet TC):

| Cột | Tên | Mô tả |
|-----|-----|-------|
| A | TC-ID | Mã test case (VD: TC-AUTH-001) |
| B | Module | Module thuộc về |
| C | FR Linked | Liên kết SRS (VD: FR-AUTH-001) |
| D | Title | Tên test case ngắn gọn |
| E | Priority | P1 / P2 / P3 / P4 |
| F | Type | Positive / Negative / Boundary / Security |
| G | Precondition | Điều kiện tiên quyết |
| H | Test Data | Dữ liệu test |
| I | Steps | Các bước (đánh số) |
| J | Expected Result | Kết quả mong đợi |
| K | Actual Result | Kết quả thực tế (điền khi chạy test) |
| L | Status | Pass / Fail / Blocked / Skipped / Not Run |
| M | Bug ID | Link Jira Bug nếu Fail |
| N | Tested Date | Ngày chạy test |
| O | Tester | Tên người test |
| P | Notes | Ghi chú |

- [ ] Tạo header row (bold, nền xanh đậm, chữ trắng)
- [ ] Freeze header row (row 1)
- [ ] **Conditional Formatting cột L (Status)**:
  - [ ] `Pass` → nền xanh lá (#00c853)
  - [ ] `Fail` → nền đỏ (#ff1744)
  - [ ] `Blocked` → nền cam (#ff9100)
  - [ ] `Not Run` → nền xám nhạt (#e0e0e0)
  - [ ] `Skipped` → nền vàng (#ffd600)
- [ ] **Data Validation cột L**: Dropdown [Pass, Fail, Blocked, Skipped, Not Run]
- [ ] **Data Validation cột E**: Dropdown [P1 - Critical, P2 - High, P3 - Medium, P4 - Low]
- [ ] **Data Validation cột F**: Dropdown [Positive, Negative, Boundary, Security, Integration]

---

## 📋 TASK 5.2: Viết Test Cases — Sheet TC_AUTH (25-28 TCs)

### Nhóm Đăng ký:
- [ ] TC-AUTH-001: Đăng ký thành công với thông tin hợp lệ (Positive, P1)
- [ ] TC-AUTH-002: Đăng ký với email đã tồn tại → 409 (Negative, P1)
- [ ] TC-AUTH-003: Đăng ký với email sai format (thiếu @) (Negative, P2)
- [ ] TC-AUTH-004: Đăng ký với email rỗng (Negative, P2)
- [ ] TC-AUTH-005: Đăng ký password < 8 ký tự (Boundary, P2)
- [ ] TC-AUTH-006: Đăng ký password = 8 ký tự (Boundary, P2)
- [ ] TC-AUTH-007: Đăng ký password không có chữ hoa (Negative, P2)
- [ ] TC-AUTH-008: Đăng ký password không có số (Negative, P2)
- [ ] TC-AUTH-009: Đăng ký fullName rỗng (Negative, P2)

### Nhóm Đăng nhập:
- [ ] TC-AUTH-010: Đăng nhập thành công (Positive, P1)
- [ ] TC-AUTH-011: Đăng nhập email không tồn tại (Negative, P1)
- [ ] TC-AUTH-012: Đăng nhập sai password (Negative, P1)
- [ ] TC-AUTH-013: Đăng nhập tài khoản bị khóa (Negative, P1)
- [ ] TC-AUTH-014: JWT token lưu vào localStorage (Positive, P1)

### Nhóm Token:
- [ ] TC-AUTH-015: Refresh token thành công (Positive, P1)
- [ ] TC-AUTH-016: Refresh token hết hạn → 401 (Negative, P1)
- [ ] TC-AUTH-017: Logout xóa token localStorage (Positive, P1)
- [ ] TC-AUTH-018: Logout blacklist token Redis (Positive, P1)
- [ ] TC-AUTH-019: Dùng token blacklisted → 401 (Security, P1)

### Nhóm Security:
- [ ] TC-AUTH-020: API không có token → 401 (Security, P1)
- [ ] TC-AUTH-021: Student gọi API Admin → 403 (Security, P1)
- [ ] TC-AUTH-022: Teacher gọi API Admin → 403 (Security, P1)
- [ ] TC-AUTH-023: SQL Injection trong email (Security, P1)
- [ ] TC-AUTH-024: XSS script trong fullName (Security, P1)
- [ ] TC-AUTH-025: Brute force login 100 lần → 429 (Security, P2)

### Nhóm OAuth2:
- [ ] TC-AUTH-026: OAuth2 Google đăng nhập thành công (Positive, P2)
- [ ] TC-AUTH-027: OAuth2 Google tài khoản mới → tự tạo user (Positive, P2)
- [ ] TC-AUTH-028: OAuth2 Google tài khoản đã có → login (Positive, P2)

---

## 📋 TASK 5.3: Viết Test Cases — Sheet TC_STUDENT (20-25 TCs)

### Nhóm Kanji (8 TCs):
- [ ] TC-STU-001: Tìm kiếm Kanji theo keyword (Positive, P2)
- [ ] TC-STU-002: Xem chi tiết Kanji (âm On/Kun, nét) (Positive, P2)
- [ ] TC-STU-003: Canvas vẽ Kanji → AI nhận diện đúng (Positive, P2)
- [ ] TC-STU-004: Canvas vẽ sai → "Không nhận diện" (Negative, P2)
- [ ] TC-STU-005: AI chấm điểm thứ tự nét (Positive, P2)
- [ ] TC-STU-006: Clear canvas → reset nét vẽ (Positive, P3)
- [ ] TC-STU-007: Nội dung bị khóa khi chưa mua gói (Positive, P1)
- [ ] TC-STU-008: Nội dung unlock sau khi mua gói (Positive, P1)

### Nhóm Grammar (3 TCs):
- [ ] TC-STU-009: Tìm kiếm ngữ pháp theo level (Positive, P2)
- [ ] TC-STU-010: Xem chi tiết ngữ pháp (Positive, P2)
- [ ] TC-STU-011: Grammar bị khóa khi chưa mua gói (Positive, P1)

### Nhóm JLPT Exam (7 TCs):
- [ ] TC-STU-012: Xem danh sách đề thi theo level (Positive, P1)
- [ ] TC-STU-013: Bắt đầu bài thi + đếm ngược (Positive, P1)
- [ ] TC-STU-014: Chọn đáp án A/B/C/D (Positive, P1)
- [ ] TC-STU-015: Chuyển câu hỏi giữ đáp án đã chọn (Positive, P1)
- [ ] TC-STU-016: Nộp bài → chấm điểm tự động (Positive, P1)
- [ ] TC-STU-017: Xem review từng câu đúng/sai (Positive, P2)
- [ ] TC-STU-018: Hết giờ → tự động nộp bài (Positive, P1)

### Nhóm Beginner Course (5 TCs):
- [ ] TC-STU-019: Chương 1: 104+ Kana + canvas (Positive, P2)
- [ ] TC-STU-020: Chương 2: Số + Đơn vị đếm (Positive, P2)
- [ ] TC-STU-021: Chương 3: Chào hỏi ngữ cảnh (Positive, P2)
- [ ] TC-STU-022: Chương 4: 35+ Bộ thủ Kanji (Positive, P2)
- [ ] TC-STU-023: Chương 5: Thi Tốt Nghiệp + Bằng PNG (Positive, P2)

### Nhóm Luyện Nghe & Đọc Hiểu (2 TCs):
- [ ] TC-STU-024: Listening Room: phát audio + điều chỉnh tốc độ nghe (Positive, P3)
- [ ] TC-STU-025: Sentence Breakdown: phân tích cú pháp + Furigana (Positive, P3)

---

## 📋 TASK 5.4: Viết Test Cases — Sheet TC_TEACHER (20-24 TCs)

- [ ] TC-TCH-001: Truy cập Dashboard Teacher (role Teacher) (P1)
- [ ] TC-TCH-002: Student truy cập Teacher Dashboard → bị chặn (P1)
- [ ] TC-TCH-003: Tạo đề thi mới (title, level, type, time) (P1)
- [ ] TC-TCH-004: Thêm câu hỏi (nội dung + 4 đáp án + đáp án đúng) (P1)
- [ ] TC-TCH-005: Sửa câu hỏi (P2)
- [ ] TC-TCH-006: Xóa câu hỏi (P2)
- [ ] TC-TCH-007: Toggle "Trộn ngẫu nhiên câu hỏi" (P3)
- [ ] TC-TCH-008: Toggle "Đảo ngẫu nhiên đáp án" (P3)
- [ ] TC-TCH-009: Import JSON hợp lệ (P1)
- [ ] TC-TCH-010: Import JSON sai format → lỗi parse (P1)
- [ ] TC-TCH-011: Import CSV + Preview Grid (P2)
- [ ] TC-TCH-012: Export đề thi Word (.doc) (P2)
- [ ] TC-TCH-013: Xóa đề thi + confirm dialog (P1)
- [ ] TC-TCH-014: Tìm kiếm đề thi theo tên (P2)
- [ ] TC-TCH-015: Lọc đề thi theo level (P2)
- [ ] TC-TCH-016: Tạo lớp học + sinh Join Code (P1)
- [ ] TC-TCH-017: Thêm học viên vào lớp bằng Email (P1)
- [ ] TC-TCH-018: Xem thống kê giảng viên (P2)
- [ ] TC-TCH-019: Xem bảng điểm Gradebook (P2)
- [ ] TC-TCH-020: Export bảng điểm CSV (P2)
- [ ] TC-TCH-021: Content CMS: Thêm từ vựng mới (P2)
- [ ] TC-TCH-022: Content CMS: Thêm Kanji mới (P2)

---

## 📋 TASK 5.5: Viết Test Cases — Sheet TC_ADMIN (15-18 TCs)

- [ ] TC-ADM-001: Truy cập Admin Dashboard (role Admin) (P1)
- [ ] TC-ADM-002: Non-Admin truy cập → bị chặn 403 (P1)
- [ ] TC-ADM-003: Xem danh sách users + tìm kiếm (P1)
- [ ] TC-ADM-004: Lọc users theo role (P2)
- [ ] TC-ADM-005: Khóa tài khoản user (P1)
- [ ] TC-ADM-006: Mở khóa tài khoản user (P1)
- [ ] TC-ADM-007: Bulk Lock nhiều users (P2)
- [ ] TC-ADM-008: Reset mật khẩu user (P1)
- [ ] TC-ADM-009: Thay đổi role (Student → Teacher) (P1)
- [ ] TC-ADM-010: Đổi role lên Admin → cảnh báo (P1)
- [ ] TC-ADM-011: Admin không tự khóa chính mình (P1)
- [ ] TC-ADM-012: Quản lý Subscription Plans CRUD (P2)
- [ ] TC-ADM-013: Enterprise: Import SV từ CSV (P2)
- [ ] TC-ADM-014: Anti-Cheat: DS tài khoản bị flag (P2)
- [ ] TC-ADM-015: Anti-Cheat: Khóa TK gian lận (P2)

---

## 📋 TASK 5.6: Viết Test Cases — Sheet TC_PAYMENT (15-20 TCs)

- [ ] TC-PAY-001: Hiển thị bảng giá đầy đủ (P1)
- [ ] TC-PAY-002: Card Master Bundle N5-N1 highlight (P3)
- [ ] TC-PAY-003: Click "Mua gói" → redirect Stripe (P1)
- [ ] TC-PAY-004: Thanh toán test card 4242... thành công (P1)
- [ ] TC-PAY-005: Hủy thanh toán → quay về Pricing (P1)
- [ ] TC-PAY-006: Webhook kích hoạt subscription (P1)
- [ ] TC-PAY-007: Double click "Mua gói" → chỉ 1 session (P2)
- [ ] TC-PAY-008: Xem subscription hiện tại (P1)
- [ ] TC-PAY-009: Content unlock sau subscription active (P1)
- [ ] TC-PAY-010: Content lock khi subscription expired (P1)
- [ ] TC-PAY-011: Trial status hiển thị đúng (P2)
- [ ] TC-PAY-012: Lock overlay mờ hiển thị (P2)
- [ ] TC-PAY-013: Test card bị decline (4000...0002) (P1)
- [ ] TC-PAY-014: Xem lịch sử đơn hàng (P2)

---

## ✅ TIÊU CHÍ HOÀN THÀNH PHASE 5

- [ ] Google Sheets tạo xong, setup header + formatting + validation
- [ ] Sheet TC_AUTH: 25-28 test cases viết xong (Status = Not Run)
- [ ] Sheet TC_STUDENT: 20-26 test cases viết xong
- [ ] Sheet TC_TEACHER: 20-22 test cases viết xong
- [ ] Sheet TC_ADMIN: 15-18 test cases viết xong
- [ ] Sheet TC_PAYMENT: 14-20 test cases viết xong
- [ ] Tổng tối thiểu 100+ test cases
- [ ] Tạo Jira Stories cho mỗi sheet → chuyển Done

---

**➡️ Hoàn thành Phase 5? Chuyển sang [Phase 6 — API Testing](file:///d:/Japanese%20Project/qa-plan/PHASE_6_API_TESTING.md)**
