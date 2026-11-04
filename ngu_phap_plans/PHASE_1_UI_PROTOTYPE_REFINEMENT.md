# KẾ HOẠCH PHASE 1: TINH CHỈNH GIAO DIỆN & BỘ LỌC CHE YOUTUBE BRANDING

> **Mục tiêu**: Xóa sạch các chi tiết thừa theo ảnh khoanh đỏ của User, bỏ tab ghi chú theo giờ, nâng cấp khu vực Hỏi Đáp đa phương tiện (ảnh, video, icon) và áp dụng giải pháp ẩn triệt để logo, tiêu đề YouTube.

---

## 📋 DANH SÁCH CÔNG VIỆC CẦN THỰC HIỆN

### 1. Dọn Dẹp Các Vùng Khoanh Đỏ (Theo Ảnh Phản Hồi)

- [x] **Xóa phụ đề dưới tiêu đề trang** (Ảnh 1): Bỏ dòng chữ *"Học ngữ pháp trực quan qua bài giảng YouTube · Bấm mốc thời gian tua tức thì · Tóm tắt công thức & Bài tập dấu sao ⭐ đạt ≥ 85% mở khóa bài"*. Giữ tiêu đề trang gọn gàng, trang trọng.
- [x] **Xóa dòng chữ nhỏ dưới các nút Level N5 ~ N1** (Ảnh 1): Bỏ các dòng phụ `Minna 1-25`, `Minna 26-50`, `Shinkanzen`. Chỉ hiển thị nhãn cấp độ ngắn gọn: `N5`, `N4`, `N3`, `N2`, `N1`.
- [x] **Xóa toàn bộ thanh thử nghiệm video** (Ảnh 1): Bỏ ô *"Thử nghiệm Video của bạn: [Dán link YouTube] [Nạp Video]"* để giao diện mang tính chất học tập chính thức, không còn cảm giác của bản nháp.
- [x] **Xóa huy hiệu điểm trên thanh thông tin bài học** (Ảnh 1): Bỏ nhãn `✓ Đã đạt 95%` cạnh thời lượng bài. Điểm kiểm tra sẽ được hiển thị trang trọng tại Tab 2 sau khi học viên nộp bài làm.
- [x] **Bỏ Tab Ghi Chú Theo Giờ** (Ảnh 2): Xóa hoàn toàn Tab 3 và các logic lưu trữ ghi chú thời gian.
- [x] **Xóa Card Giới Thiệu Tính Năng Ở Cột Phải** (Ảnh 3): Bỏ khối `✨ Điểm đặc sắc của Module Ngữ Pháp:...` ở cuối cột danh sách bài học để giao diện thoáng đãng, chuyên nghiệp.

---

### 2. Nâng Cấp Khu Vực "Hỏi Đáp" Đa Phương Tiện & Thảo Luận Đa Chiều

- Đổi tên tab: `3. Hỏi Đáp`.
- Khung nhập câu hỏi tích hợp bộ công cụ phong phú:
  1. **Chèn Ảnh từ máy tính hoặc link**:
     - Nút **"Ảnh từ máy"**: Mở hộp thoại chọn file ảnh trực tiếp từ thư mục của người dùng (`image/*`).
     - Nút **Link**: Tùy chọn dán link hình ảnh online.
     - Hiển thị thumbnail xem trước + tên file + nút `X` để hủy.
  2. **Chèn Video từ máy tính hoặc link**:
     - Nút **"Video từ máy"**: Mở hộp thoại chọn video clip trực tiếp từ thư mục của người dùng (`video/*`).
     - Nút **Link**: Tùy chọn dán link video online / YouTube.
     - Hiển thị badge clip + tên file + nút `X` để hủy.
  3. **Bộ Chọn Biểu Tượng Cảm Xúc / Icon (Emoji Picker Popover)**: Cung cấp danh mục emoji tiện lợi (🎌, 🌸, 💡, ❓, ✍️, 👏, 💯, 📚, ✨, 🇯🇵, v.v.) giúp chèn nhanh vào nội dung.
- **Hệ Thống Bình Luận Đa Chiều (Multi-user & Teacher Threading)**:
  - Một câu hỏi của học viên có thể nhận được phản hồi từ:
    - **Giảng viên (Sensei)**: Huy hiệu trang trọng `Giảng viên xác nhận ✓` với viền đỏ Washi đặc trưng.
    - **Các học viên khác (Peer Students)**: Học viên khác vào trao đổi, giải thích, chia sẻ kinh nghiệm ôn thi với huy hiệu `Học viên thảo luận`.
  - Nút **"Trả lời (Reply)"** mở khung bình luận lồng nhau (nested comments) ngay dưới từng bài đăng, hỗ trợ đính kèm ảnh/video từ máy và chèn emoji.
  - Tự động nhận diện vai trò thực tế từ tài khoản đăng nhập (`useAuthStore`) thay vì nút chọn thủ công.
  - **Trải nghiệm Media chuẩn Facebook/Threads**:
    - **Phóng to Ảnh**: Bấm vào ảnh mở Lightbox toàn màn hình nền đen (`createPortal` trực tiếp lên `document.body` tránh lỗi stacking context).
    - **Tương tác Video**: Rê chuột (hover) vào video tự chạy preview không tiếng (`muted`), bấm trực tiếp (click) vào video sẽ mở modal toàn màn hình có đầy đủ tiếng và thanh điều khiển.
    - **Giao diện tối giản, sạch sẽ**: Đã loại bỏ hoàn toàn các ghi chú tên file (ví dụ: `Vu Conan.mp4`, `image.jpg`) ở cả khung nhập liệu, bảng tin thảo luận và modal phóng to.

---

### 3. Cơ Chế Phát Video: Giữ Nguyên Chuẩn YouTube Embed (Hợp Pháp & Tôn Trọng Bản Quyền Tác Giả)

- **Quyết định thiết kế**:
  - Vì các video bài giảng tham khảo từ các kênh YouTube có mặt giảng viên/tác giả, việc che lấp hoặc gắn nhãn "Bản quyền NipponMaster" là không phù hợp và tiềm ẩn rủi ro bản quyền/pháp lý.
  - Hệ thống áp dụng **Trình phát chuẩn YouTube Embed nguyên bản (`youtube.com/embed/{id}`)**:
    - Hiển thị đầy đủ tiêu đề, tên kênh và giao diện gốc của YouTube theo đúng Điều khoản Dịch vụ (Terms of Service) của Google & YouTube.
    - Đảm bảo tính minh bạch, ghi nhận công lao của kênh giảng dạy, vận hành an toàn và hoàn toàn hợp pháp.
    - Giữ trọn vẹn các tính năng cao cấp của YouTube: Tự động điều chỉnh chất lượng (Auto/1080p), phụ đề (CC), chỉnh tốc độ phát (0.75x, 1.25x, 1.5x, 2x), chế độ rạp chiếu phim và toàn màn hình.
    - Kết hợp hoàn hảo với **Interactive Timestamps Bar** của NipponMaster: Học viên bấm mốc thời gian nào, video tự động tua tức thì tới đúng giây đó!

