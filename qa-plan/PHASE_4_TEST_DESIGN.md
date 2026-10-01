# 📐 PHASE 4 — THIẾT KẾ KIỂM THỬ (TEST DESIGN)

> **Mục đích**: Áp dụng các kỹ thuật thiết kế test ISTQB — phần giúp bạn nổi bật trên CV.  
> **Thời gian ước tính**: 1-2 ngày  
> **Vị trí**: Confluence Page → "Test Design — Thiết Kế Kiểm Thử"  
> **Điều kiện bắt đầu**: Phase 3 (Test Plan) đã hoàn thành

---

## 📋 TASK 4.1: Equivalence Partitioning (EP)

Chia dữ liệu đầu vào thành các nhóm tương đương → chỉ cần test 1 giá trị đại diện mỗi nhóm.

### EP cho trường Email đăng ký:
- [ ] Valid: email chuẩn (user@gmail.com) → 201
- [ ] Valid: email có dấu + (user+test@gmail.com) → 201
- [ ] Invalid: thiếu @ (usergmail.com) → 400
- [ ] Invalid: thiếu domain (user@) → 400
- [ ] Invalid: rỗng ("") → 400
- [ ] Invalid: email đã tồn tại → 409
- [ ] Invalid: SQL injection (`' OR 1=1 --`) → 400

### EP cho trường Password đăng ký:
- [ ] Valid: có chữ hoa + số + ≥8 ký tự (Test1234A) → 201
- [ ] Invalid: < 8 ký tự (Test1) → 400
- [ ] Invalid: không có chữ hoa (test1234a) → 400
- [ ] Invalid: không có số (TestTestA) → 400
- [ ] Invalid: rỗng → 400

### EP cho Level search Vocabulary:
- [ ] Valid: N5, N4, N3, N2, N1 → 200
- [ ] Invalid: N6 → 400
- [ ] Invalid: ký tự đặc biệt (@#$) → 400
- [ ] Invalid: rỗng → 400 hoặc trả tất cả

- [ ] **Tổng hợp tất cả bảng EP → paste vào Confluence**

---

## 📋 TASK 4.2: Boundary Value Analysis (BVA)

Test giá trị ở biên (min, min+1, max-1, max, vượt biên).

### BVA cho Password length (min=8, max=128):
- [ ] 7 ký tự → Invalid (dưới biên)
- [ ] 8 ký tự → Valid (biên dưới)
- [ ] 9 ký tự → Valid (trên biên dưới)
- [ ] 127 ký tự → Valid (dưới biên trên)
- [ ] 128 ký tự → Valid (biên trên)
- [ ] 129 ký tự → Invalid (vượt biên)

### BVA cho Pagination (page, size):
- [ ] page=0, size=20 → OK (trang đầu)
- [ ] page=-1, size=20 → 400 (invalid page)
- [ ] page=0, size=0 → 400 (invalid size)
- [ ] page=0, size=1 → OK (1 kết quả)
- [ ] page=99999, size=20 → 200 OK nhưng data rỗng

- [ ] **Tổng hợp tất cả bảng BVA → paste vào Confluence**

---

## 📋 TASK 4.3: Decision Table

Bảng quyết định cho logic có nhiều điều kiện kết hợp.

### Decision Table cho Placement Test Scoring:
- [ ] Tạo bảng: Điểm Vocab × Điểm Grammar × Điểm Reading → Level đề xuất
- [ ] Rule 1: Tất cả < 40% → N5
- [ ] Rule 2: Vocab ≥ 60% nhưng Grammar < 40% → N5
- [ ] Rule 3: Vocab + Grammar ≥ 60%, Reading < 60% → N4
- [ ] Rule 4: Tổng ≥ 60% nhưng < 80% → N3
- [ ] Rule 5: Tổng ≥ 80% nhưng < 90% → N2
- [ ] Rule 6: Tổng ≥ 90% → N1

### Decision Table cho Content Access (Subscription):
- [ ] Tạo bảng: Has Subscription × Subscription Level × Content Level → Allow/Deny
- [ ] No subscription + Any content → Deny (hiển thị lock overlay)
- [ ] Active N5 + Content N5 → Allow
- [ ] Active N5 + Content N3 → Deny
- [ ] Trial Active + Any content → Allow (trong 3 ngày)
- [ ] Trial Expired + Any content → Deny

- [ ] **Tổng hợp tất cả Decision Table → paste vào Confluence**

---

## 📋 TASK 4.4: State Transition Testing

Vẽ sơ đồ trạng thái và test các chuyển đổi.

### State Transition — JWT Token Lifecycle:
- [ ] Vẽ trên draw.io:
  ```
  Guest → Authenticated (login success)
  Authenticated → Authenticated (API call OK / refresh success)
  Authenticated → Token Expired (sau 15 phút)
  Token Expired → Authenticated (refresh success)
  Token Expired → Guest (refresh token cũng hết hạn 7 ngày)
  Authenticated → Blacklisted (logout)
  Blacklisted → Guest (mọi request → 401)
  ```
- [ ] Export PNG → `qa-artifacts/diagrams/jwt_state_transition.png`
- [ ] Paste vào Confluence

### State Transition — Subscription Status:
- [ ] Vẽ trên draw.io:
  ```
  No Subscription → Pending Payment (click mua gói)
  Pending Payment → Active (webhook success)
  Pending Payment → No Subscription (hủy thanh toán)
  Active → Expired (hết hạn gói)
  Expired → Pending Payment (mua lại)
  ```
- [ ] Export PNG → `qa-artifacts/diagrams/subscription_state_transition.png`
- [ ] Paste vào Confluence

---

## 📋 TASK 4.5: Error Guessing

Liệt kê các tình huống bất thường dựa trên kinh nghiệm.

- [ ] Double click nút "Mua gói" → chỉ tạo 1 checkout session?
- [ ] Stripe webhook gửi duplicate → không kích hoạt gói 2 lần?
- [ ] Refresh trang giữa bài thi JLPT → mất tiến độ?
- [ ] Upload JSON sai format vào Exam Builder → crash hay báo lỗi?
- [ ] Admin tự khóa chính mình → cho phép hay chặn?
- [ ] Vẽ hình vô nghĩa vào Kanji Canvas → AI trả gì?
- [ ] Truy cập URL trực tiếp mà không login → redirect login?
- [ ] Flashcard: Review 500 thẻ liên tục → memory leak UI?
- [ ] Internet mất khi đang nộp bài thi → thông báo lỗi?
- [ ] Teacher xóa đề thi có student đang làm → chặn hay cho?

- [ ] **Tổng hợp bảng Error Guessing → paste vào Confluence**

---

## ✅ TIÊU CHÍ HOÀN THÀNH PHASE 4

- [ ] EP cho ít nhất 3 trường (Email, Password, Level)
- [ ] BVA cho ít nhất 2 trường (Password length, Pagination)
- [ ] Decision Table cho Placement Test scoring
- [ ] Decision Table cho Content Access
- [ ] State Transition JWT → vẽ draw.io + paste Confluence
- [ ] State Transition Subscription → vẽ draw.io + paste Confluence
- [ ] 10 Error Guessing scenarios
- [ ] Tạo Jira Story "Viết Test Design" → chuyển Done

---

**➡️ Hoàn thành Phase 4? Chuyển sang [Phase 5 — Test Cases](file:///d:/Japanese%20Project/qa-plan/PHASE_5_TEST_CASES.md)**
