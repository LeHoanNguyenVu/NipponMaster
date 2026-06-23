# 🗺️ NipponMaster — Kế Hoạch Triển Khai Chi Tiết (Sprints & Days)

> Kế hoạch này giúp bạn biết rõ lộ trình phát triển hợp lý nhất cho Web App. Bạn chỉ cần chọn đầu việc của từng ngày để yêu cầu tôi thực hiện tiếp.

---

## 🏃 SPRINT 1: Hạ Tầng Frontend, Xác Thực & Trang Chủ Cao Cấp (5 Ngày)
**Mục tiêu:** Cài đặt xong luồng dữ liệu (Auth flow), xây dựng Design System và hoàn thiện Landing Page có chuyển động GSAP mượt mà.

### 📍 Ngày 1: Cấu Trúc Định Tuyến & Quản Lý Trạng Thái
* [x] **Định tuyến (Routing):** Thiết lập React Router 7 điều hướng các trang: `/` (Landing), `/login`, `/register`, `/dashboard`, `/vocab`, `/kanji`, `/grammar`, `/flashcards`.
* [x] **API Client:** Tạo Axios client instance với Interceptor tự động lấy JWT từ LocalStorage gắn vào Header `Authorization`.
* [x] **Auth Store:** Sử dụng Zustand quản lý trạng thái đăng nhập, lưu trữ thông tin user hiện tại và token.

### 📍 Ngày 2: Xây Dựng Thư Viện Thành Phần (Design System)
* [x] **Cấu hình Theme:** Thiết lập hệ màu sắc Dark Mode Nhật Bản tối giản (Charcoal nền, Crimson làm màu nhấn) tại Tailwind v4.
* [x] **Base Components (tasteskill):**
  * [x] **Button:** Thiết kế hiệu ứng ấn vật lý (`active:scale-[0.98]`), căn chỉnh độ tương phản a11y, nhãn ngắn gọn.
  * [x] **Input:** Form inputs có label nằm trên, thông báo lỗi màu đỏ dịu phía dưới, focus ring rõ ràng.
  * [x] **Card:** Các thẻ chứa thông tin viền siêu mảnh (`border-zinc-800`), không đổ bóng đen nhòe nhoẹt.

### 📍 Ngày 3: Trang Chủ Premium (Landing Page với GSAP)
* [ ] **Hero Section:** Thiết kế bất đối xứng (Split Hero), chữ to có khoảng thở rộng, tối ưu chiều cao hiển thị trên thiết bị di động.
* [ ] **Chuyển động lộ trình (GSAP ScrollTrigger):** Khi cuộn trang, lộ trình học từ N5 -> N1 sẽ vẽ dần ra trên màn hình bằng SVG đường dẫn động kết hợp các thẻ thông tin dạng cuộn dính (**Sticky-Stack**).
* [ ] **Social Proof & Monogram:** Thiết kế biểu tượng SVG đại diện tối giản cho NipponMaster và hiển thị các công nghệ/tính năng nổi bật.

### 📍 Ngày 4: Trang Đăng Nhập & Đăng Ký (Auth Pages)
* [ ] **Giao diện:** Thiết kế form Đăng nhập, Đăng ký tối giản đồng bộ với hệ thống.
* [ ] **Tương tác:** Validation thời gian thực, loading state dạng khung xương (skeleton), hiển thị thông báo lỗi thân thiện.
* [ ] **Kết nối API:** Gửi request lên API `/api/v1/auth/login` và `/api/v1/auth/register`, lưu JWT token nhận về và chuyển hướng vào Dashboard.

### 📍 Ngày 5: Kiểm Thử E2E Luồng Xác Thực
* [ ] Chạy thử luồng Đăng ký -> Đăng nhập -> Lưu token -> Gọi API `/api/v1/auth/me` để lấy thông tin cá nhân.
* [ ] Sửa đổi các lỗi phát sinh, tối ưu hóa kích thước bundle tải trang.

---

## 🏃 SPRINT 2: Tra Cứu Bài Học & Hệ Thống Ôn Tập SRS (5 Ngày)
**Mục tiêu:** Xây dựng giao diện học từ vựng, chữ Hán và ôn tập thẻ ghi nhớ tự động lặp lại ngắt quãng (Spaced Repetition).

### 📍 Ngày 6: Trang Từ Vựng N5 (Vocabulary Explorer)
* [ ] **Giao diện:** Danh sách từ vựng dạng bảng grid bất đối xứng, hỗ trợ phân trang (Pagination).
* [ ] **Chức năng:** Tìm kiếm từ vựng thời gian thực qua API `/api/v1/vocabularies/search`. Lọc theo từ loại (Danh từ, Động từ, Tính từ).
* [ ] **Chi tiết:** Bấm vào từ vựng mở panel trượt từ cạnh phải (Slide-over) hiển thị ví dụ, nghĩa và âm đọc của từ.

### 📍 Ngày 7: Trang Chữ Hán N5 (Kanji Dictionary)
* [ ] **Giao diện:** Lưới hiển thị các chữ Kanji N5 trực quan, phân loại theo số nét.
* [ ] **Chức năng:** Tìm kiếm Kanji theo bộ thủ (radical), âm On/Kun hoặc nghĩa tiếng Việt.
* [ ] **Hiệu ứng:** Vẽ hoạt ảnh các nét chữ Kanji (nếu có dữ liệu nét vẽ).

### 📍 Ngày 8: Trang Ngữ Pháp N5 (Grammar Handbook)
* [ ] **Giao diện:** Thư viện cấu trúc ngữ pháp N5.
* [ ] **Chức năng:** Xem cấu trúc câu, giải nghĩa chi tiết các trợ từ và ví dụ thực tế.

### 📍 Ngày 9: Giao Diện Học Flashcard SRS (Card Flipping UI)
* [ ] Thiết kế thẻ Flashcard có thể lật trước-sau bằng CSS 3D hoặc Motion (`motion/react`) cực mượt.
* [ ] Giao diện các nút đánh giá mức độ ghi nhớ (Dễ, Trung bình, Khó, Quên) tương ứng thuật toán lặp lại ngắt quãng SM-2.

### 📍 Ngày 10: Tích Hợp API Ôn Tập Flashcard SRS
* [ ] Kết nối các nút đánh giá với API của backend để tính toán khoảng thời gian ôn tập tiếp theo (Interval).
* [ ] Xây dựng màn hình hoàn thành buổi ôn tập với thống kê số thẻ đã thuộc.

---

## 🏃 SPRINT 3: Dashboard Cá Nhân & Tối Ưu Hóa (3 Ngày)
**Mục tiêu:** Thống kê tiến độ học tập và kiểm thử hiệu năng trước khi đóng gói.

### 📍 Ngày 11: Dashboard Cá Nhân (User Dashboard)
* [ ] Biểu đồ trực quan tiến độ học Kanji/Từ vựng N5 đã thuộc.
* [ ] Thống kê chuỗi ngày học liên tiếp (Streak) để giữ lửa học tập cho người dùng.
* [ ] Danh sách các từ vựng/chữ Hán cần ôn tập gấp trong ngày.

### 📍 Ngày 12: Tối Ưu Hóa Trải Nghiệm & Hiệu Năng (Lighthouse Audit)
* [ ] Kiểm tra khả năng đáp ứng chế độ giảm chuyển động (`prefers-reduced-motion`).
* [ ] Chạy audit Google Lighthouse kiểm tra điểm Performance, Accessibility (>90 điểm).
* [ ] Fix các lỗi layout trên nhiều kích thước màn hình điện thoại/máy tính bảng.

### 📍 Ngày 13: Đóng Gói Sản Phẩm
* [ ] Build thử ứng dụng thành thư mục tĩnh (`dist/`) để kiểm tra lỗi TypeScript compile.
* [ ] Bàn giao sản phẩm hoàn thiện.

---

## 💡 Hướng Dẫn Chọn Việc Hôm Nay
* Nếu bạn đồng ý với kế hoạch trên, hãy nói: **"Hãy bắt đầu Sprint 1 - Ngày 1"**
* Tôi sẽ tự động triển khai phần cấu hình định tuyến React Router 7, viết Axios Client tích hợp JWT Interceptor và tạo Auth Store bằng Zustand.
