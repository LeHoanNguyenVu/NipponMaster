# PHASE 4: HỆ THỐNG CHẤM ĐIỂM CHUẨN JLPT 180 ĐIỂM, LỊCH SỬ & MỞ RỘNG KHO ĐỀ

## 1. Quy Tắc Chấm Điểm Chuẩn JLPT Quốc Tế (0 – 180 Điểm)

Đối với cấp độ **N5 & N4**, kỳ thi chia điểm thành 2 nhóm chấm điểm độc lập:
1. **Nhóm 1: Kiến thức ngôn ngữ (Từ vựng / Ngữ pháp) & Đọc hiểu (`言語知識・読解`)**:
   - Thang điểm: `0 ~ 120 điểm`.
   - Điểm liệt (`基準点`): **38 / 120 điểm** (Nếu dưới 38 điểm sẽ trượt bất kể tổng điểm).
2. **Nhóm 2: Nghe hiểu (`聴解`)**:
   - Thang điểm: `0 ~ 60 điểm`.
   - Điểm liệt (`基準点`): **19 / 60 điểm** (Nếu dưới 19 điểm sẽ trượt bất kể tổng điểm).
3. **Tổng điểm đỗ (`合格点`)**:
   - N5: **90 / 180 điểm** (và không phần nào bị điểm liệt).
   - N4: **90 / 180 điểm** (và không phần nào bị điểm liệt).
   - N3: **95 / 180 điểm** (3 phần tách biệt: Từ vựng/Ngữ pháp $\ge 19/60$, Đọc hiểu $\ge 19/60$, Nghe hiểu $\ge 19/60$).
   - N2: **90 / 180 điểm** (Mỗi phần $\ge 19/60$).
   - N1: **100 / 180 điểm** (Mỗi phần $\ge 19/60$).

---

## 2. Chế Độ Xem Lại Chi Tiết Sau Khi Nộp Bài (Detailed Review Mode)
- Sau khi bấm **Nộp bài (Chấm điểm)**, học viên được xem ngay:
  - **Bảng Chứng Nhận Kết Quả (Scorecard)**: Hiển thị trạng thái `合格 (ĐỖ)` hoặc `不合格 (CHƯA ĐẠT)`, điểm từng phần, thời gian hoàn thành.
  - **Chế độ Giải thích từng câu**:
    - Hiển thị đáp án đã chọn (Đúng màu xanh lá `#15803d`, Sai màu đỏ `#b91c1c`) và đáp án đúng.
    - Hiển thị hộp **Giải thích chi tiết tiếng Việt** (dịch nghĩa câu, giải thích từ vựng / cấu trúc ngữ pháp / lý do chọn đáp án).
    - Với phần Nghe hiểu: Hiển thị đầy đủ **Kịch bản hội thoại (`聴解原文`)** kèm nút nghe lại từng câu thoại.

---

## 3. Quy Trình Nạp Thêm Đề Thi PDF Mới (Scalable PDF Pipeline)
Khi bạn gửi thêm các file PDF đề thi JLPT khác vào thư mục `JLPT_tests/` (ví dụ: `N5 2012–2024`, `N4`, `N3`, `N2`, `N1`):
1. Chạy script cắt ảnh tự động ra `frontend/public/assets/jlpt/{level}/{year}/`.
2. Bóc tách câu hỏi, đoạn văn, đáp án & kịch bản nghe theo interface chuẩn `JlptExamPaper` trong `src/data/jlptExamsData.ts`.
3. Tự động xuất hiện trong danh sách Kho Đề Thi của cấp độ tương ứng và áp dụng ngay phân quyền Level-Gating + Phòng thi thực chiến.

