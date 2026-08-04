# 🌐 Kế Hoạch Triển Khai: Role GUEST (Khách Chưa Đăng Nhập)

Tài liệu chi tiết quản lý toàn bộ lộ trình tính năng, luồng dữ liệu, công nghệ và định hướng phát triển **tương lai dài hạn** dành cho người dùng **Guest (Khách vãng lai chưa tạo tài khoản hoặc chưa đăng nhập)**.

---

## 📊 1. Hiện Trạng Codebase (Current Audit Status)

### Frontend Components Đã Có:
- [LandingPage.tsx](file:///d:/Japanese%20Project/frontend/src/screens/LandingPage.tsx) — Màn hình giới thiệu sản phẩm (Hero section, tính năng nổi bật, bảng giá, testimonial).
- [Auth.tsx](file:///d:/Japanese%20Project/frontend/src/screens/Auth.tsx) — Màn hình Đăng nhập / Đăng ký (Tab toggle, validation, JWT token storage).
- [DashboardGuest.tsx](file:///d:/Japanese%20Project/frontend/src/screens/DashboardGuest.tsx) — Giao diện xem thử dành cho khách khi truy cập ứng dụng.

### Backend APIs Đã Có:
- `POST /api/v1/auth/register` — Đăng ký tài khoản mới (Mã hóa BCrypt password).
- `POST /api/v1/auth/login` — Đăng nhập hệ thống, trả về JWT Access Token (15 phút) & Refresh Token (7 ngày).
- `POST /api/v1/auth/refresh` — Làm mới JWT Access Token.
- `GET /api/v1/auth/me` — Lấy thông tin user hiện tại.

---

## 🏃 2. Lộ Trình Sprints & Tasks Chi Tiết (Từ Hiện Tại Đến Tương Lai Dài Hạn)

### 📍 GIAI ĐOẠN 1: XÁC THỰC CƠ BẢN & LANDING PAGE (Sprints 1 - 5) — [ĐÃ HOÀN THÀNH ✅]

#### [x] **Task 1.1: Landing Page Khai Phá Năng Lực (Landing Page Hero & Feature Showcase)**
- **Mô tả**: Giao diện giới thiệu ấn tượng chào mừng người dùng mới, trình bày rõ giá trị lõi của ứng dụng (AI Speaking Tutor, Canvas Vẽ Kanji, Lộ trình Sách giáo khoa Nhập môn).
- **Công nghệ**: React 19, TailwindCSS, GSAP Animation, Lucide Icons, Framer Motion.
- **Luồng chạy**: Truy cập `/` ➔ Render `LandingPage.tsx` ➔ Bấm "Đăng nhập" ➔ Chuyển `#/auth`.

#### [x] **Task 1.2: Hệ Thống Đăng Nhập / Đăng Ký Bảo Mật JWT (JWT Authentication Engine)**
- **Mô tả**: Cho phép khách tạo tài khoản mới hoặc đăng nhập tài khoản có sẵn. Tự động lưu JWT token và chuyển tiếp tới Onboarding Hub.
- **Công nghệ**: Spring Security, JWT (JJWT), BCryptPasswordEncoder, Zustand Store (`useAuthStore`).
- **Luồng chạy**: Submit Form ➔ Call `POST /api/v1/auth/login` ➔ Verify Password ➔ Trả Token & Refresh Token ➔ Store LocalStorage ➔ Redirect Dashboard.

---

### 📍 GIAI ĐOẠN 2: THU HÚT & TỐI ƯU CHUYỂN ĐỔI NGƯỜI DÙNG (Sprints 17 - 18) — [TRUNG HẠN ⏳]

#### [ ] **Task 17.1: Công Cụ Chẩn Đoán Nhanh Năng Lực JLPT 2 Phút (Quick JLPT Assessor Tool)**
- **Mô tả**: Cho phép khách thử làm 3 câu trắc nghiệm nhanh ngay trên Landing Page (không cần đăng nhập) ➔ Hệ thống dự đoán trình độ JLPT (N5-N1) kèm biểu đồ radar năng lực sơ bộ để kích thích đăng ký.
- **Công nghệ**: React Local State, Quick Quiz Data, Animated Radar Chart.
- **Luồng chạy (User & Data Flow)**:
  1. Khách xem Landing Page ➔ Thấy Widget "Kiểm tra trình độ nhanh 2 phút".
  2. Khách chọn ngẫu nhiên 3 câu từ vựng/ngữ pháp ➔ Trả lời xong.
  3. App hiển thị kết quả chẩn đoán: *"Dự đoán trình độ: N4 (Đạt 66%). Đăng ký ngay để làm bài thi chẩn đoán chuyên sâu 20 câu!"*

#### [ ] **Task 17.2: Đăng Nhập Nhanh 1-Click (Social OAuth2 & Magic Link)**
- **Mô tả**: Hỗ trợ đăng nhập nhanh bằng Google, Facebook, Apple ID hoặc gửi đường dẫn đăng nhập không mật khẩu (Magic Link) qua Email.
- **Công nghệ**: Spring Security OAuth2 Client, Google Identity SDK, Apple Sign-in Web SDK, JavaMailSender.
- **Luồng chạy**:
  1. Khách bấm "Đăng nhập bằng Google".
  2. OAuth2 Popup mở ➔ Xác nhận cấp quyền ➔ Google trả về `id_token`.
  3. Client gửi token tới Backend `POST /api/v1/auth/oauth2/google` ➔ Backend tự động tạo User mới nếu chưa có ➔ Cấp JWT Token.

#### [ ] **Task 17.3: Trang Tiếp Nhận Link Giới Thiệu (Affiliate & Referral Landing Page)**
- **Mô tả**: Khách truy cập ứng dụng thông qua link giới thiệu từ bạn bè (`/ref=USER123`) ➔ Tự động hiển thị Popup ưu đãi tặng 7 ngày Premium + Mã giảm giá 20% khi tạo tài khoản.
- **Công nghệ**: URL Parameter Tracking, Referral Code Validation Service.

---

### 📍 GIAI ĐOẠN 3: SEO HUB TOÀN CẦU & SANDBOX TRẢI NGHIỆM (Sprints 21 - 22) — [DÀI HẠN 🔮]

#### [ ] **Task 21.1: Chế Độ Học Thử Sandbox 3 Ngày (Full Feature Guest Trial Sandbox)**
- **Mô tả**: Khách có thể bấm "Dùng thử miễn phí 3 ngày" mà không cần thẻ tín dụng hay đăng ký thông tin. Toàn bộ tiến độ học thử được lưu tạm trong trình duyệt (IndexedDB / LocalStorage).
- **Công nghệ**: LocalStorage / IndexedDB Sync Engine, Temporary Guest Session token.
- **Luồng chạy**:
  1. Khách chọn "Học thử 3 ngày".
  2. Hệ thống tạo Guest Session tạm thời với Hạn dùng 72 giờ.
  3. Khách được mở khóa trải nghiệm đầy đủ Sách giáo khoa Nhập môn, Flashcard, Thi thử JLPT.
  4. Hết 72h ➔ Hiện Modal mời gọi chuyển tiếp thành Tài Khoản Chính Thức (Tự động sync toàn bộ tiến độ học thử vào tài khoản mới).

#### [ ] **Task 21.2: Thư Viện Tra Cứu SEO Công Khai (SEO Organic Discovery Hub)**
- **Mô tả**: Mở công khai hàng ngàn trang Từ vựng N5-N1, Hán tự Kanji, Cấu trúc ngữ pháp lên Google Search nhằm thu hút hàng trăm ngàn lượt truy cập tự nhiên mỗi tháng (Organic Traffic).
- **Công nghệ**: Server-Side Rendering (Next.js SSG/SSR), Structured Data Schema (JSON-LD for Google Rich Snippets), Dynamic Sitemap Generator.
- **Luồng chạy**:
  1. Google Crawler quét các đường dẫn công khai `/dictionary/kanji/日`, `/grammar/n5/dewa-arimasen`.
  2. Server render sẵn HTML kèm Rich Snippets (Furigana, Nghĩa, Âm đọc) ➔ Tăng thứ hạng Google Search #1.
  3. Người dùng vãng lai tìm từ trên Google ➔ Click vào trang ➔ Xem từ vựng ➔ Có banner dẫn tới ứng dụng luyện tập chính.
