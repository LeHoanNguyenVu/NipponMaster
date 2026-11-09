# PHASE 2: PHÒNG THI THỰC CHIẾN & 4 ĐỊNH DẠNG CÂU HỎI CHUẨN DỰ ÁN

## 1. Mục Tiêu Giai Đoạn 2
- Xây dựng giao diện **Phòng Thi Thực Chiến (Exam Simulator)** đồng bộ 100% trải nghiệm với các bài test Ngữ Pháp, Hán Tự và Luyện Nghe trong dự án.
- Hỗ trợ đầy đủ **4 định dạng câu hỏi đặc trưng của đề thi JLPT** kèm hình ảnh minh họa cắt từ đề gốc và phóng to Lightbox.

---

## 2. Chi Tiết 4 Định Dạng Câu Hỏi (Question Formats)

### Định Dạng 1: Trắc Nghiệm Từ Vựng / Chữ Hán / Ngữ Pháp (Standard & Illustrated MCQ)
- Áp dụng cho:
  - `文字・語彙`: Mondai 1 (Cách đọc Kanji), Mondai 2 (Viết Kanji/Katakana), Mondai 3 (Điền từ ngữ cảnh), Mondai 4 (Câu đồng nghĩa).
  - `文法`: Mondai 1 (Trắc nghiệm trợ từ & mẫu câu ngữ pháp).
- **Tính năng hiển thị**:
  - Hỗ trợ hiển thị từ gạch chân đậm rõ ràng (`<u>先週</u>`, `<u>しゃわー</u>`) đúng chuẩn giấy thi JLPT.
  - Hỗ trợ **Hình ảnh minh họa đính kèm câu hỏi** (`imageUrl`), ví dụ: Câu 27 (hộp 5 quả táo) và Câu 28 (kính trên bàn) trong đề N5 2011. Học viên có thể bấm vào ảnh để phóng to toàn màn hình (Lightbox).
  - 4 nút đáp án mang huy hiệu `[1]`, `[2]`, `[3]`, `[4]`.

### Định Dạng 2: Câu Hỏi Ghép Từ Ngôi Sao JLPT (`[★]` Star Ordering)
- Áp dụng cho: `文法` Mondai 2 (Sắp xếp 4 mảnh ghép vào câu và chọn từ ở vị trí `★`).
- **Tính năng tương tác (Đồng bộ `StarQuestionCard` của module Ngữ Pháp)**:
  - Cho phép học viên bấm vào các mảnh ghép để lắp lần lượt vào 4 khay `[ 1 ] [ 2 ] [ ★ ] [ 4 ]`, hệ thống tự động ghi nhận đáp án tại vị trí `[ ★ ]`.
  - Hoặc bấm chọn trực tiếp đáp án `1, 2, 3, 4` nếu muốn làm nhanh.
  - Khi xem lại kết quả, hệ thống hiển thị thứ tự ghép câu chuẩn xác kèm giải thích ngữ pháp.

### Định Dạng 3: Đọc Hiểu Đoạn Văn & Tìm Kiếm Thông Tin (Dokkai & Cloze Passage)
- Áp dụng cho:
  - `文法` Mondai 3: Điền từ vào đoạn văn (Cloze Passage - Bài văn của Ken-san và Minji-san với các ô `[22]` ~ `[26]`).
  - `読解` Mondai 4: Đọc hiểu đoạn văn ngắn (短文), bao gồm cả câu hỏi chọn sơ đồ căn phòng có hình ảnh (`reading_q28.png`) và thư nhắn Memo.
  - `読解` Mondai 5: Đọc hiểu đoạn văn trung bình (中文).
  - `読解` Mondai 6: Tìm kiếm thông tin trên tờ rơi quảng cáo (`reading_q32_flyer.png` - Tờ rơi siêu thị あらきや).
- **Tính năng hiển thị**:
  - Khung bài đọc nền giấy Washi đóng khung rõ ràng phía trên hoặc bên trái, có hỗ trợ phóng to hình ảnh tờ rơi / sơ đồ phòng.

### Định Dạng 4: Nghe Hiểu Tương Tác (Choukai Audio + Visual + Script)
- Áp dụng cho: `聴解` Mondai 1 (Nghe chọn hành động/đồ vật), Mondai 2 (Nghe nắm điểm chính), Mondai 3 (Nghe nhìn tranh mũi tên phát biểu câu giao tiếp), Mondai 4 (Phản xạ nhanh câu ngắn).
- **Tính năng tương tác**:
  - **Trình phát âm thanh hội thoại (Dialogue Audio Player)**: Phát lần lượt từng lượt thoại của nhân vật Nam (`男`) và Nữ (`女`) với giọng đọc phân biệt cao độ tự nhiên qua Web Speech API (hoặc file MP3 khi có), có thanh trạng thái câu thoại đang phát.
  - **Hình ảnh tình huống**: Hiển thị tranh 4 đáp án (`listening_m1_q1.png`, `listening_m1_q3.png`, `listening_m1_q4.png`) hoặc tranh mũi tên chỉ người nói (`listening_m3_q1.png` ~ `q5.png`).
  - **Kịch bản nghe (`聴解原文`)**: Trong lúc đang thi có thể ẩn kịch bản để rèn nghe thực tế (hoặc bật gợi ý trong chế độ luyện tập), và sau khi nộp bài sẽ hiển thị toàn bộ kịch bản hội thoại Nhật - Việt kèm giải thích đáp án.

