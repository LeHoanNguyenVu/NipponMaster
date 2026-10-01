# 📄 PHASE 2 — VIẾT SRS TRÊN CONFLUENCE

> **Mục đích**: Viết tài liệu đặc tả yêu cầu phần mềm — gốc rễ để truy xuất mọi test case.  
> **Thời gian ước tính**: 2-3 ngày  
> **Vị trí**: Confluence Page → "SRS — Đặc Tả Yêu Cầu Phần Mềm"  
> **Điều kiện bắt đầu**: Phase 1 đã hoàn thành

---

## 📋 TASK 2.1: Viết phần Giới thiệu & Tổng quan

Viết các mục sau vào trang SRS trên Confluence:

- [ ] **1.1 Mục đích tài liệu**: Mô tả tài liệu này dùng để làm gì
- [ ] **1.2 Phạm vi dự án**: NipponMaster — nền tảng học tiếng Nhật online
- [ ] **1.3 Đối tượng sử dụng**: 4 roles (Guest, Student, Teacher, Admin)
- [ ] **1.4 Thuật ngữ & viết tắt**: JWT, RBAC, SRS, SM-2, JLPT, Elo, BCrypt...
- [ ] **2.1 Kiến trúc hệ thống**: React 19 → Spring Boot → PostgreSQL → Redis
- [ ] **2.2 Công nghệ sử dụng**: Liệt kê đầy đủ tech stack

---

## 📋 TASK 2.2: Vẽ sơ đồ trên draw.io

- [ ] Vẽ **sơ đồ kiến trúc hệ thống** (Frontend → Backend → DB → Redis → Stripe)
- [ ] Vẽ **Use Case Diagram** với 4 actors (Guest, Student, Teacher, Admin)
- [ ] Export 2 sơ đồ ra PNG → lưu `qa-artifacts/diagrams/`
- [ ] Paste hình vào trang SRS trên Confluence

**Gợi ý Use Case Diagram:**

```
[Guest]   → Xem Landing Page, Đăng ký, Đăng nhập, Xem Pricing
[Student] → Tra cứu bài học, Flashcards, Thi JLPT, Mua gói học, Xem Dashboard
[Teacher] → Tạo đề thi, Import câu hỏi, Quản lý lớp, Xem Gradebook
[Admin]   → Quản lý Users, Khóa/Mở TK, Đổi Role, Quản lý Subscription Plans
```

---

## 📋 TASK 2.3: Viết Functional Requirements — Module Auth

Mỗi FR theo format: **ID — Tên — Mô tả — API — Screen — Priority**

- [ ] **FR-AUTH-001**: Đăng ký tài khoản (POST /api/v1/auth/register)
- [ ] **FR-AUTH-002**: Đăng nhập JWT (POST /api/v1/auth/login)
- [ ] **FR-AUTH-003**: Refresh Token (POST /api/v1/auth/refresh)
- [ ] **FR-AUTH-004**: Lấy thông tin user (GET /api/v1/auth/me)
- [ ] **FR-AUTH-005**: Logout + Blacklist Redis (POST /api/v1/auth/logout)
- [ ] **FR-AUTH-006**: OAuth2 Google (POST /api/v1/auth/oauth2/google)
- [ ] **FR-AUTH-007**: Phân quyền RBAC (@PreAuthorize)
- [ ] **FR-AUTH-008**: Rate Limiting (chống brute force)

---

## 📋 TASK 2.4: Viết Functional Requirements — Module Student Learning

- [ ] **FR-VOC-001**: Tra cứu từ vựng N5-N1 có phân trang & lọc
- [ ] **FR-VOC-002**: Xem chi tiết từ vựng (nghĩa, ví dụ, audio)
- [ ] **FR-KAN-001**: Tra cứu Kanji theo bộ thủ, nét, âm
- [ ] **FR-KAN-002**: Canvas vẽ Kanji + AI OCR nhận diện
- [ ] **FR-KAN-003**: AI chấm điểm thứ tự nét Kanji
- [ ] **FR-GRM-001**: Tra cứu ngữ pháp N5-N1
- [ ] **FR-FLC-001**: Lấy phiên học Flashcard (SM-2 scheduling)
- [ ] **FR-FLC-002**: Review flashcard (Easy/Medium/Hard/Forget)

---

## 📋 TASK 2.5: Viết Functional Requirements — Module Exam

- [ ] **FR-EXM-001**: Xem danh sách đề thi JLPT theo level
- [ ] **FR-EXM-002**: Bắt đầu làm bài thi (đếm ngược)
- [ ] **FR-EXM-003**: Nộp bài thi & chấm điểm tự động
- [ ] **FR-EXM-004**: Xem review đáp án + giải thích

---

## 📋 TASK 2.6: Viết Functional Requirements — Module Payment

- [ ] **FR-PAY-001**: Hiển thị bảng giá gói học
- [ ] **FR-PAY-002**: Tạo phiên thanh toán Stripe Checkout
- [ ] **FR-PAY-003**: Webhook kích hoạt subscription sau payment
- [ ] **FR-PAY-004**: Kiểm tra quyền truy cập nội dung theo gói
- [ ] **FR-PAY-005**: Xem subscription hiện tại
- [ ] **FR-PAY-006**: Kiểm tra trạng thái dùng thử (trial)

---

## 📋 TASK 2.7: Viết Functional Requirements — Module Admin

- [ ] **FR-ADM-001**: Xem danh sách users (search, filter role)
- [ ] **FR-ADM-002**: Khóa/Mở khóa tài khoản
- [ ] **FR-ADM-003**: Đặt lại mật khẩu user
- [ ] **FR-ADM-004**: Thay đổi role user

---

## 📋 TASK 2.8: Viết Functional Requirements — Module Teacher

- [ ] **FR-TCH-001**: Tạo đề thi mới (Exam Builder Studio)
- [ ] **FR-TCH-002**: Thêm/sửa/xóa câu hỏi trong đề thi
- [ ] **FR-TCH-003**: Import câu hỏi hàng loạt (JSON/CSV)
- [ ] **FR-TCH-004**: Tạo lớp học + sinh Join Code
- [ ] **FR-TCH-005**: Thêm học viên vào lớp

---

## 📋 TASK 2.9: Viết Non-Functional Requirements

- [ ] **NFR-001 Performance**: API response < 2 giây
- [ ] **NFR-002 Security**: Password hash BCrypt, JWT signed, RBAC
- [ ] **NFR-003 Security**: SQL Injection prevention, XSS prevention
- [ ] **NFR-004 Usability**: Giao diện hiển thị đúng tiếng Nhật (Hiragana, Katakana, Kanji)
- [ ] **NFR-005 Compatibility**: Chrome, Firefox, Edge (phiên bản mới nhất)
- [ ] **NFR-006 Reliability**: Database Supabase auto-reconnect sau Pause

---

## 📋 TASK 2.10: Viết danh sách API Endpoints

- [ ] Liệt kê tất cả API endpoints từ backend controllers (hoặc Swagger)
- [ ] Format bảng: Method | URL | Mô tả | Auth Required | Role Required
- [ ] Paste vào cuối trang SRS trên Confluence

---

## ✅ TIÊU CHÍ HOÀN THÀNH PHASE 2

- [ ] Trang SRS trên Confluence đã viết đầy đủ
- [ ] Có ít nhất 30-35 Functional Requirements (FR-xxx)
- [ ] Có 5-6 Non-Functional Requirements (NFR-xxx)
- [ ] Có Use Case Diagram + sơ đồ kiến trúc (paste từ draw.io)
- [ ] Có bảng API Endpoints
- [ ] Tạo Jira Story "Viết SRS" → chuyển Done

---

**➡️ Hoàn thành Phase 2? Chuyển sang [Phase 3 — Test Plan](file:///d:/Japanese%20Project/qa-plan/PHASE_3_TEST_PLAN.md)**
