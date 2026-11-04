# KẾ HOẠCH PHASE 5: TÍCH HỢP TOÀN DIỆN, LƯU TIẾN ĐỘ & KIỂM THỬ E2E

> **Mục tiêu**: Kết nối hoàn chỉnh giữa giao diện Frontend React và hệ thống Backend Spring Boot + PostgreSQL. Đảm bảo toàn bộ luồng học từ xem video, tua mốc thời gian, làm bài test củng cố, mở khóa bài mới $\ge 85\%$, và hỏi đáp đính kèm ảnh/video/icon hoạt động trơn tru.

---

## 🔗 CÁC HẠNG MỤC KẾT NỐI HỆ THỐNG

### 1. Kết Nối API & Trạng Thái Học Viên
- Thay thế toàn bộ dữ liệu mẫu (mock) trên Frontend bằng các hook gọi API từ `grammarApi.ts`:
  - `fetchLessonsByLevel(level)`
  - `fetchLessonDetail(lessonId)`
  - `submitLessonQuiz(lessonId, answers)`
  - `fetchDiscussions(lessonId)`
  - `postDiscussion(lessonId, payload)`
- Lưu điểm cao nhất và thời gian xem video gần nhất vào cơ sở dữ liệu khi học viên tương tác.
- Logic mở khóa liên hoàn: Khi học viên làm bài test đạt $\ge 85\%$, hệ thống tự động kích hoạt trạng thái mở khóa cho bài tiếp theo, bắn pháo hoa confetti và cập nhật biểu tượng ổ khóa mở trên thanh playlist.

### 2. Tích Hợp Hệ Thống Hỏi Đáp Đa Phương Tiện
- Xử lý upload ảnh/video đính kèm câu hỏi lên dịch vụ lưu trữ (Supabase Storage / local bucket).
- Tích hợp bộ chọn Icon (Emoji Picker) chuẩn quốc tế, hỗ trợ hiển thị đẹp mắt trên mọi thiết bị.
- Phân quyền phản hồi: Đánh dấu huy hiệu riêng cho câu trả lời của giáo viên (Sensei / Admin).

### 3. Tối Ưu Hóa Trình Xem Video White-labeled (Clean Mask Player)
- Đảm bảo lớp phủ `CinemaHeaderMask` và `CinemaBrandingGuard` co giãn hoàn hảo theo tỷ lệ khung hình 16:9 trên các kích thước màn hình:
  - Màn hình Desktop / Laptop lớn (1080p, 2K, 4K).
  - Màn hình Tablet & Smartphone xoay ngang / dọc.
- Kiểm tra các thao tác: Bấm mốc thời gian tua video, dừng/phát, chuyển bài học mới mà không làm lộ tên video YouTube hoặc logo YouTube.

---

## 🧪 KỊCH BẢN KIỂM THỬ CHẤT LƯỢNG (E2E TEST CASES)

| STT | Kịch Bản Kiểm Thử | Kết Quả Kỳ Vọng | Trạng Thái |
|:---:|:---|:---|:---:|
| 1 | Học viên chọn cấp độ N5, N4, N3, N2, N1 | Danh sách bài học và giáo trình tương ứng hiển thị chuẩn xác, không còn các dòng chữ phụ nhỏ. | Chờ test |
| 2 | Bấm vào các mốc thời gian trên Timestamps Bar | Video tự động tua tới đúng giây giảng bài, nhãn mốc thời gian sáng đèn xanh 🟢. | Chờ test |
| 3 | Lớp che YouTube Player trên máy tính & điện thoại | Không nhìn thấy tiêu đề video, tên kênh, nút chia sẻ và logo YouTube. Không thể click ra ngoài YouTube. | Chờ test |
| 4 | Học viên làm bài test và đạt điểm < 85% | Hệ thống báo chưa đạt chuẩn, hiển thị giải thích chi tiết, bài kế tiếp vẫn bị khóa 🔒. | Chờ test |
| 5 | Học viên làm bài test và đạt điểm $\ge 85\%$ | Hệ thống chúc mừng bằng Confetti, ghi nhận điểm cao nhất, bài kế tiếp tự động mở khóa 🔓. | Chờ test |
| 6 | Thao tác câu hỏi ngôi sao ⭐ (Star Question) | Kéo/bấm từ vào 4 vị trí `[ 1 ] [ 2 ] [ ★ ] [ 4 ]`, kiểm tra đúng sai và hiển thị giải thích ngữ pháp. | Chờ test |
| 7 | Đặt câu hỏi trong tab "Hỏi Đáp" có kèm Ảnh, Video và Icon | Câu hỏi hiển thị ngay lập tức với hình ảnh/video xem trước và emoji rõ nét. | Chờ test |
| 8 | Giáo viên / Sensei phản hồi câu hỏi | Xuất hiện khung phản hồi viền đỏ trang trọng của Sensei, học viên nhận thông báo phản hồi. | Chờ test |

