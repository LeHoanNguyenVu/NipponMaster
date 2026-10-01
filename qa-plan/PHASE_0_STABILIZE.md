# 🔧 PHASE 0 — ỔN ĐỊNH 5 CHỨC NĂNG CORE TRƯỚC KHI QA

> **Mục đích**: Fix bug & hoàn thiện 5 chức năng cốt lõi để có đủ scope cho việc kiểm thử.  
> **Thời gian ước tính**: Tùy tình trạng hiện tại (có thể 1-3 tuần)  
> **Khi nào xong Phase này?**: Khi 5 chức năng bên dưới đều chạy được luồng chính từ đầu đến cuối mà không crash.

---

## 🎯 TẠI SAO CẦN PHASE NÀY?

- Hiện tại chỉ 1-2 chức năng tạm ổn, còn lại mới là nền móng
- Nếu test trên chức năng hỏng → test case nào cũng Blocked/Fail → không có giá trị
- Cần ít nhất 4-5 chức năng **chạy được luồng happy path** để bộ QA có đủ:
  - Test cases Pass lẫn Fail (realistic)
  - Bug reports thật (tìm được edge case, không phải bug hiển nhiên)
  - API test có endpoint trả đúng response

---

## 📋 5 CHỨC NĂNG CẦN ỔN ĐỊNH (GỢI Ý)

> Chọn 5 chức năng có **giá trị cao nhất cho CV Tester** — ưu tiên chức năng phức tạp, nhiều luồng để viết test case phong phú.

### Chức năng 1: Authentication (Đăng ký / Đăng nhập / JWT)

**Tại sao chọn**: Nền tảng của mọi thứ. Không login được thì không test được gì.

- [ ] Đăng ký tài khoản mới → thành công → lưu JWT vào localStorage
- [ ] Đăng nhập bằng email + password → thành công → redirect Dashboard
- [ ] Đăng nhập sai password → hiển thị thông báo lỗi rõ ràng
- [ ] Refresh Token hoạt động khi Access Token hết hạn
- [ ] Logout → xóa token localStorage → redirect về Landing Page
- [ ] Gọi API khi không có token → trả 401 Unauthorized
- [ ] Gọi API admin bằng role Student → trả 403 Forbidden
- [ ] Form validation: email sai format, password quá ngắn → hiện lỗi
- [ ] UI Auth.tsx: Tab Đăng nhập / Đăng ký chuyển mượt, không lỗi render

**Trạng thái hiện tại**: ⬜ Chưa kiểm tra / ⬜ Đang fix / ⬜ Ổn rồi

---

### Chức năng 2: Tra cứu bài học (Kanji / Grammar)

**Tại sao chọn**: Chức năng core của ứng dụng học. Nhiều luồng lọc/tìm kiếm/phân trang → test case phong phú.

- [ ] Kanji: Tìm kiếm Kanji theo keyword → trả kết quả
- [ ] Kanji: Xem chi tiết Kanji (âm On/Kun, nét, ví dụ ghép)
- [ ] Kanji: Canvas vẽ Kanji → AI nhận diện OCR
- [ ] Grammar: Tìm kiếm ngữ pháp theo level → trả kết quả
- [ ] Grammar: Xem chi tiết (cấu trúc, ý nghĩa, ví dụ)
- [ ] Content Lock: Nội dung bị khóa mờ khi chưa mua gói → hiển thị overlay
- [ ] API trả response đúng format, không 500 error

**Trạng thái hiện tại**: ⬜ Chưa kiểm tra / ⬜ Đang fix / ⬜ Ổn rồi

---

### Chức năng 3: Thi thử JLPT (Exam)

**Tại sao chọn**: Luồng phức tạp (chọn đề → làm bài → đếm ngược → nộp → chấm điểm → xem review). Rất nhiều test case hay.

- [ ] Xem danh sách đề thi JLPT (lọc theo level)
- [ ] Bắt đầu làm bài thi → hiển thị câu hỏi + 4 đáp án
- [ ] Đồng hồ đếm ngược hoạt động đúng
- [ ] Chọn đáp án A/B/C/D → highlight đáp án đã chọn
- [ ] Chuyển câu hỏi (next/prev) → giữ đáp án đã chọn
- [ ] Nộp bài → chấm điểm tự động → hiển thị kết quả
- [ ] Xem review từng câu (đáp án đúng + giải thích)
- [ ] Hết thời gian → tự động nộp bài
- [ ] API endpoints trả response đúng

**Trạng thái hiện tại**: ⬜ Chưa kiểm tra / ⬜ Đang fix / ⬜ Ổn rồi

---

### Chức năng 4: Payment & Subscription (Thanh toán)

**Tại sao chọn**: Luồng tích hợp bên thứ 3 (Stripe) → test case integration rất ấn tượng trên CV. Có Decision Table, State Transition.

- [ ] Trang Pricing: Hiển thị đầy đủ các gói học
- [ ] Click "Mua gói" → redirect sang Stripe Checkout
- [ ] Thanh toán Stripe (test card 4242 4242 4242 4242) → thành công
- [ ] Hủy thanh toán → quay về trang Pricing
- [ ] Sau payment thành công: Subscription được kích hoạt
- [ ] Xem subscription hiện tại (GET /subscriptions/my)
- [ ] Nội dung unlock sau khi có subscription active
- [ ] Nội dung bị lock lại khi subscription expired
- [ ] API Payment endpoints trả response đúng

**Trạng thái hiện tại**: ⬜ Chưa kiểm tra / ⬜ Đang fix / ⬜ Ổn rồi

---

### Chức năng 5: Admin — Quản lý Users

**Tại sao chọn**: Test được phân quyền RBAC (Security Testing) — rất giá trị cho CV. Có luồng CRUD đơn giản nhưng đầy đủ.

- [ ] Truy cập Admin Dashboard bằng role Admin → thành công
- [ ] Truy cập Admin Dashboard bằng role Student → bị chặn (403)
- [ ] Xem danh sách users → hiển thị đúng
- [ ] Tìm kiếm user theo tên/email → trả kết quả
- [ ] Lọc user theo role (Student/Teacher/Admin/Guest)
- [ ] Khóa tài khoản user → user đó không login được nữa
- [ ] Mở khóa tài khoản → user login lại bình thường
- [ ] Thay đổi role user (Student → Teacher) → role thay đổi thật
- [ ] Reset mật khẩu user → mật khẩu mới hoạt động
- [ ] API Admin endpoints có @PreAuthorize bảo vệ đúng

**Trạng thái hiện tại**: ⬜ Chưa kiểm tra / ⬜ Đang fix / ⬜ Ổn rồi

---

## 📌 HƯỚNG DẪN THỰC HIỆN

1. **Đọc từng chức năng** ở trên → chạy thử app → tick những task nào đã OK
2. **Task nào lỗi** → ghi chú lỗi gì → fix code → test lại → tick
3. **Không cần hoàn hảo 100%** — chỉ cần luồng chính (happy path) chạy được
4. Những edge case lỗi sẽ để Tester (chính bạn ở Phase 7) phát hiện và log Bug

---

## ✅ TIÊU CHÍ HOÀN THÀNH PHASE 0

> Tick đủ các điều kiện dưới đây thì chuyển sang Phase 1:

- [ ] Auth: Đăng ký + Đăng nhập + Logout chạy được luồng chính
- [ ] Tra cứu: Kanji search + hiển thị OK, Grammar search + hiển thị OK
- [ ] Exam: Chọn đề → làm bài → nộp → xem điểm chạy được
- [ ] Payment: Xem Pricing + Stripe checkout test card chạy được
- [ ] Admin: Login admin + xem danh sách users + khóa/mở khóa chạy được
- [ ] Backend build thành công (`.\mvnw.cmd spring-boot:run`)
- [ ] Frontend build thành công (`npm run dev`)
- [ ] Không có lỗi crash toàn trang (white screen) trên các trang chính

---

**➡️ Hoàn thành Phase 0? Chuyển sang [Phase 1 — Setup Tools](file:///d:/Japanese%20Project/qa-plan/PHASE_1_SETUP_TOOLS.md)**
