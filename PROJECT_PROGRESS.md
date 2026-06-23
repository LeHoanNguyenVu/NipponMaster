# 📓 NipponMaster — Nhật Ký Tiến Trình Dự Án

> File này được đặt ở thư mục gốc để bạn dễ dàng giám sát, theo dõi trạng thái và các bước cần thực hiện tiếp theo của toàn bộ dự án.

---

## 🎯 Trạng Thái Hiện Tại
* **Backend:** **Đã hoàn thành Phase 1A** (JWT Security, Swagger, Seed N5).
* **Frontend:** **Đã khởi tạo Phase 1B** (Vite + React + TS, cài đặt GSAP & Tailwind v4).
* **Database:** Supabase PostgreSQL (Đã kết nối và tự động seed dữ liệu mẫu).

---

## 📋 Checklist Tiến Trình Chi Tiết

### 🔹 Phase 1A: Hoàn Thiện Backend (Đã Hoàn Thành)
- [x] **JWT Authentication:** Tích hợp thư viện `jjwt` 0.12.6, tạo JWT filter bảo mật, cập nhật SecurityConfig.
- [x] **Swagger UI:** Cấu hình thư viện `springdoc-openapi` tại `/swagger-ui.html` kèm cơ chế xác thực Bearer Token để kiểm thử API.
- [x] **Database Seeder:** Tạo `DataSeeder` tự động thêm 20 từ vựng N5, 15 Kanji N5, và 10 mẫu ngữ pháp N5 vào Supabase Database khi database trống.
- [x] **Build & Compile:** Đã biên dịch toàn bộ source code Java ổn định không lỗi.

### 🔸 Phase 1B: Phát Triển Frontend Web App (Đang Triển Khai)
- [x] **Khởi tạo Scaffold:** Tạo dự án React v19 + Vite v6 + TS tại thư mục `web/`.
- [x] **Cài đặt thư viện cốt lõi:** `gsap`, `motion`, `tailwindcss` (v4), `zustand`, `axios`, `react-router-dom`, `@phosphor-icons/react`.
- [x] **Cấu hình Dev Environment:** Thiết lập API Proxy trong `vite.config.ts` để map `/api` sang server cổng `8080`. Cấu hình Font (Geist + Noto Sans JP) & Theme tối giản tại `index.css`.
- [x] **Auth Client & Global State:** Viết Axios instance kèm JWT Interceptor + Zustand store quản lý Auth.
- [x] **Design System (Ngày 2):** Thiết lập hệ màu sắc Charcoal & Crimson tối giản tại `index.css`, viết các component cơ bản Button, Input, Card, Badge chuẩn a11y và tạo trang Showcase tại `/design-system`.
- [ ] **Landing Page (GSAP):** Thiết kế giao diện trang chủ phong cách tối giản Nhật Bản với hiệu ứng chuyển động scroll-driven lộ trình học.
- [ ] **Auth Pages:** Giao diện Đăng nhập / Đăng ký.
- [ ] **Vocabulary & Kanji Pages:** Giao diện tra cứu, tìm kiếm từ vựng và chữ Hán N5.
- [ ] **SRS Flashcard Review Page:** Xây dựng tính năng tự học ôn tập lặp lại ngắt quãng (SM-2).

---

## ⚠️ Lưu Ý Cơ Sở Dữ Liệu Supabase
Nếu chạy backend báo lỗi `tenant/user not found`, điều đó có nghĩa là database Supabase miễn phí của bạn đã bị Pause do lâu ngày không sử dụng. Hãy truy cập [Supabase Dashboard](https://supabase.com/dashboard), chọn dự án và nhấn **Restore Project** để kích hoạt lại.

## ⚙️ Hướng Dẫn Vận Hành Local

### 1. Khởi Chạy Backend (Spring Boot)
Cần đảm bảo file `.env` ở thư mục gốc có đầy đủ các biến môi trường và dự án Supabase đã được Unpause:
```bash
# Cú pháp chạy server qua Maven Wrapper:
.\mvnw.cmd spring-boot:run
```
* **Swagger API UI:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

### 2. Khởi Chạy Frontend (React + Vite)
Di chuyển vào thư mục `web/` và khởi chạy server dev:
```bash
cd web
npm run dev
```
* **Local Web App URL:** [http://localhost:3000](http://localhost:3000) hoặc [http://localhost:3001](http://localhost:3001) (tùy thuộc vào cổng trống khả dụng).

---

*Cập nhật lần cuối: 2026-06-23 14:10*
