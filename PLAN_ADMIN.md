# ⚙️ Kế Hoạch Triển Khai: Role ADMIN (Quản Trị Hệ Thống)

Tài liệu chi tiết quản lý toàn bộ hạ tầng hệ thống, phân quyền người dùng, quản lý gói dịch vụ đăng ký (Subscriptions), doanh thu thanh toán, an ninh mạng và định hướng **tương lai dài hạn (Sprint 14 đến 25+)** dành cho **System Admin (Quản trị viên)**.

---

## 📊 1. Hiện Trạng Codebase (Current Audit Status)

### Frontend Screens Đã Có:
- [DashboardAdmin.tsx](file:///d:/Japanese%20Project/frontend/src/screens/DashboardAdmin.tsx) — Trang quản trị tổng quan (Thống kê số lượng user, doanh thu, server status).
- [Pricing.tsx](file:///d:/Japanese%20Project/frontend/src/screens/Pricing.tsx) — Giao diện bảng giá gói học dành cho người dùng đăng ký.

### Backend APIs Đã Có:
- Role check `@PreAuthorize("hasRole('ADMIN')")` bảo vệ các endpoint hệ thống.
- Module Subscriptions & Payment:
  - `PaymentService.java` — Xử lý tạo Checkout Session và Mock Payment.
  - `SubscriptionService.java` — Quản lý trạng thái gói học của User.
  - `Flyway Database Migrations` (`V1__init_schema.sql`...) — Khởi tạo bảng `users`, `subscription_plans`, `user_subscriptions`, `payments`.

---

## 🏃 2. Lộ Trình Sprints & Tasks Chi Tiết (Từ Hiện Tại Đến Tương Lai Dài Hạn)

### 📍 GIAI ĐOẠN 1: QUẢN LÝ USER & PHÂN QUYỀN (Sprint 14) — [ĐÃ HOÀN THÀNH ✅]

#### [x] **Task 14.1: Trung Tâm Quản Lý Người Dùng (Admin User Management Console)** — [ĐÃ HOÀN THÀNH ✅]
- **Mô tả**: Màn hình Console quản lý người dùng cao cấp (`UserManagementConsole.tsx`). Tìm kiếm theo tên/email, bộ lọc Role Pills (`[Tất cả]`, `[Student]`, `[Teacher]`, `[Admin]`, `[Guest]`), khóa/mở khóa tài khoản 1-Click (`PUT /api/v1/admin/users/{id}/status`), Admin đặt lại mật khẩu (`POST /api/v1/admin/users/{id}/reset-password`) và thao tác hàng loạt (Bulk Lock/Unlock).
- **Công nghệ**: Spring Data Specification dynamic filtering, `@PreAuthorize("hasRole('ADMIN')")`, React Axios Client.

#### [x] **Task 14.2: Hệ Thống Phân Quyền Động (Dynamic Role & Permission Assignment)** — [ĐÃ HOÀN THÀNH ✅]
- **Mô tả**: Cho phép Admin thay đổi vai trò (Role) của người dùng trực tiếp trên giao diện (`PUT /api/v1/admin/users/{id}/role`). Hỗ trợ nâng cấp từ Student thành Teacher hoặc cấp quyền Admin hệ thống kèm cảnh báo an toàn.
- **Công nghệ**: Spring Security Role Assignment, React Role Switcher Modal.

---

### 📍 GIAI ĐOẠN 2: BẢNG GIÁ, THANH TOÁN STRIPE & DOANH THU (Sprint 15) — [ĐÃ HOÀN THÀNH ✅]

#### [x] **Task 15.1: Quản Lý Gói Dịch Vụ & Bảng Giá (Subscription Plan Management)** — [ĐÃ HOÀN THÀNH ✅]
- **Mô tả**: Admin có thể tạo mới, chỉnh sửa giá tiền, cấp độ JLPT áp dụng và thời hạn (1 tháng, 6 tháng, 1 năm) của các gói dịch vụ (`SubscriptionPlanConsole.tsx`).

#### [x] **Task 15.2: Tích Hợp Cổng Thanh Toán Stripe / VNPay (Real Payment Engine Integration)** — [ĐÃ HOÀN THÀNH ✅]
- **Mô tả**: Tích hợp cổng thanh toán Stripe Checkout API & Webhook Handler tự động kích hoạt gói học `user_subscriptions` cùng Modal Quét Mã QR MoMo/VNPay fallback.
- **Công nghệ**: Stripe Java SDK, Webhook Event Listener (`checkout.session.completed`), HMAC Signature Verification.
- **Luồng chạy**: Student chọn mua gói ➔ PaymentService gọi Stripe Checkout API ➔ Student trả tiền trên Stripe ➔ Stripe bắn Webhook `checkout.session.completed` về Backend `/api/v1/payment/webhook` ➔ Verify signature ➔ Kích hoạt gói học `user_subscriptions`.

---

### 📍 GIAI ĐOẠN 3: AN NINH MẠNG, B2B ENTERPRISE & AUTOMATION (Sprints 19 - 20) — [TRUNG HẠN 🔮]

#### [ ] **Task 19.1: Cổng Quản Lý Doanh Nghiệp & Trường Học B2B (Multi-tenant B2B Enterprise Portal)**
- **Mô tả**: Cho phép các trung tâm tiếng Nhật hoặc trường đại học mua bản quyền số lượng lớn (vd: 500 tài khoản học viên), tự quản lý sub-domain riêng (vd: `hust.nipponmaster.com`), tự gán lớp học và xem báo cáo tổng quan của toàn trường.
- **Công nghệ**: Multi-tenancy Architecture (Tenant ID separation), Subdomain Routing Engine.
- **Luồng chạy**:
  1. Admin tạo Tenant mới cho "Trường ĐH Bách Khoa".
  2. Cấp tài khoản Admin Doanh Nghiệp (Enterprise Admin).
  3. Enterprise Admin tự upload danh sách 500 sinh viên qua file Excel ➔ Hệ thống tự động kích hoạt tài khoản sinh viên thuộc trường đó.

#### [ ] **Task 19.2: Hệ Thống Phát Hiện Gian Lận & Chống Hack Bot (Anti-Cheating & Bot Detection)**
- **Mô tả**: Phát hiện và xử lý tự động các tài khoản dùng bot tự động gõ đáp án trong Đấu trường 1v1 hoặc gian lận làm bài thi JLPT (trả lời câu dài trong 0.1 giây).
- **Công nghệ**: Anomaly Detection Algorithm, Rate Limiting (Bucket Algorithm / Redis Leaky Bucket), IP Reputational Check.

#### [ ] **Task 20.1: Tự Động Hóa Chăm Sóc & Giữ Chân Học Viên (Automated User Retention Engine)**
- **Mô tả**: Cấu hình các chiến dịch Email/Push Notification tự động: Gửi email nhắc nhở học viên sắp đến ngày thi JLPT thật, gửi thông báo khôi phục học viên có dấu hiệu bỏ dở (sau 7 ngày không học), gửi email chúc mừng sinh nhật kèm mã giảm giá.
- **Công nghệ**: Spring Batch, RabbitMQ / Kafka Queue, Firebase Cloud Messaging (FCM).

---

### 📍 GIAI ĐOẠN 4: KIẾN TRÚC MICROSERVICES & ĐÁM MÂY TOÀN CẦU (Sprint 25+) — [DÀI HẠN 🚀]

#### [ ] **Task 25.1: Phân Tách Kiến Trúc Microservices & CDN Đám Mây (Global Microservices Architecture)**
- **Mô tả**: Phân tách Monolith Spring Boot hiện tại thành các dịch vụ độc lập (Auth Microservice, Placement Microservice, Real-time Battle Microservice, AI Speech Microservice) để sẵn sàng phục vụ hàng triệu người dùng cùng lúc.
- **Công nghệ**: Spring Cloud Gateway, Docker & Kubernetes (K8s), HashiCorp Consul, AWS S3 / Cloudflare Global CDN cho Audio & Images.
- **Luồng chạy**:
  1. Traffic tới ứng dụng qua Cloudflare CDN & API Gateway.
  2. API Gateway điều hướng request tới đúng Microservice tương ứng.
  3. Các Microservice giao tiếp bất đồng bộ qua Apache Kafka Event Bus.
