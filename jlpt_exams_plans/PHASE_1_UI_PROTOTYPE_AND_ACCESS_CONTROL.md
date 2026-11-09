# PHASE 1: THIẾT KẾ GIAO DIỆN KHO ĐỀ THI JLPT & KIỂM SOÁT CẤP ĐỘ (LEVEL-GATING)

## 1. Mục Tiêu Giai Đoạn 1
- Thay thế màn hình Mockup tĩnh cũ trong [`Exams.tsx`](file:///d:/Japanese%20Project/frontend/src/screens/Exams.tsx) bằng **Kho Đề Thi JLPT Thực Chiến Qua Các Năm** theo phong cách **Editorial Washi** (`#fcfbf9`, `#1c1917`, `#b91c1c`).
- Đảm bảo quy tắc phân quyền cấp độ (Level-Gating):
  - Học viên có thể chọn làm bài thi ở **cấp độ hiện tại (`user.jlptLevel`)** hoặc **các cấp độ thấp hơn (`<= userRank`)**.
  - Các cấp độ cao hơn trình độ hiện tại của học viên sẽ bị khóa (`Lock`) kèm thông báo hướng dẫn nâng cấp trình độ.
  - Khi học viên chọn một cấp độ thấp hơn cấp độ hiện tại (ví dụ: học viên `N3` hoặc `N2` chọn đề `N5`), hệ thống hiển thị biểu ngữ xác nhận mở khóa tự do để ôn tập.

---

## 2. Cấu Trúc Giao Diện Kho Đề (Library View)

### 2.1. Thanh Chọn Cấp Độ (JLPT Level Selector Bar)
- Hiển thị 5 cấp độ `N5`, `N4`, `N3`, `N2`, `N1`:
  - **Cấp độ hiện tại (`lvl === userLevel`)**: Gắn nhãn `Cấp hiện tại` nổi bật.
  - **Cấp độ thấp hơn (`rank < userRank`)**: Mở khóa hoàn toàn, gắn nhãn `Ôn tập`.
  - **Cấp độ cao hơn (`rank > userRank`)**: Hiển thị icon `Lock`, vô hiệu hóa thao tác bấm hoặc hiển thị thông báo khóa cấp độ.

### 2.2. Bộ Lọc Theo Năm Thi & Chế Độ Luyện Tập
- **Lọc theo Năm thi**: `Tất cả các năm`, `2010–2011`, `2012`, `2015`, `2018`, `2021`, `2023`, `2024`...
- **Hai chế độ làm bài linh hoạt**:
  1. **Thi Toàn Bộ Đề Chuẩn Quốc Tế (Full Exam Mode)**: Làm trọn vẹn cả 3 phần (Từ vựng + Ngữ pháp/Đọc hiểu + Nghe hiểu) với đồng hồ đếm ngược chuẩn thời gian quy định (ví dụ N5: 90 phút = 20 + 40 + 30 phút).
  2. **Luyện Từng Kỹ Năng (Section Practice Mode)**: Cho phép học viên bấm vào làm riêng từng phần:
     - Phần 1: `文字・語彙` (Chữ Hán & Từ vựng)
     - Phần 2: `文法・読解` (Ngữ pháp & Đọc hiểu)
     - Phần 3: `聴解` (Nghe hiểu)

### 2.3. Bảng Thông Số Chuẩn Kỳ Thi Theo Cấp Độ
- Hiển thị rõ bảng cấu trúc thời gian & điểm đỗ/điểm liệt chuẩn của cấp độ đang chọn (ví dụ N5: Tổng `0 ~ 180 điểm`, Điểm đỗ `90/180`, Điểm liệt Ngôn ngữ & Đọc hiểu `38/120`, Điểm liệt Nghe hiểu `19/60`).

