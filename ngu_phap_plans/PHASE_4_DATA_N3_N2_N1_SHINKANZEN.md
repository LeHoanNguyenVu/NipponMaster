# KẾ HOẠCH PHASE 4: THIẾT LẬP DỮ LIỆU BÀI GIẢNG N3, N2, N1 (PLAYLIST YOUTUBE THỰC TẾ)

> **Mục tiêu**: Xây dựng toàn bộ hệ thống bài giảng ngữ pháp trung - cao cấp cho N3, N2 và N1 từ các Playlist YouTube chính thức do người dùng cung cấp. Phân loại chuẩn từng bài giảng, trích xuất mốc thời gian (YouTube Chapters) thực tế và tích hợp bài tập củng cố 20 câu (gồm câu trắc nghiệm và xếp sao ⭐ JLPT).
> **Trạng thái**: ✅ **ĐÃ HOÀN THÀNH 100%** (Đã đồng bộ vào Database Flyway V26, V27, V28 và Frontend).

---

## 🏛️ DANH SÁCH PLAYLIST CHÍNH THỨC ĐÃ TÍCH HỢP

### 1. Cấp độ N3 (22 bài giảng)
- **Nguồn Playlist**: `https://www.youtube.com/playlist?list=PLRteHYo5ofeRmU1s0dVwlF0SR1TTsaH0e`
- **Số lượng**: 22 video bài giảng ngữ pháp N3 chuyên sâu.
- **Trích xuất**: Đầy đủ mốc thời gian thực tế từng mẫu câu vào `grammarChapters.json` và bảng `grammar_timestamps`.

### 2. Cấp độ N2 (24 bài giảng)
- **Nguồn Playlist**: `https://www.youtube.com/playlist?list=PLRteHYo5ofeSvWIAz0mdj2TGmOM1l8wEr`
- **Số lượng**: 24 video bài giảng ngữ pháp N2 phân biệt sắc thái, cấu trúc kết hợp.
- **Trích xuất**: Toàn bộ YouTube Chapters phân đoạn chi tiết đã sẵn sàng.

### 3. Cấp độ N1 (35 bài giảng)
- **Nguồn Playlist**: `https://www.youtube.com/playlist?list=PLVuiXeAHir9tRXXfwtRiNre5SzxR7QRpg`
- **Số lượng**: 35 video ngữ pháp văn viết trang trọng, cấu trúc cao cấp N1.
- **Trích xuất**: Toàn bộ YouTube Chapters bóc tách theo từng bài giảng.

---

## 📋 KẾT QUẢ TRIỂN KHAI

1. **Khởi tạo danh mục 131 bài giảng toàn hệ thống (V26)**:
   - N5 (25 bài), N4 (25 bài), N3 (22 bài), N2 (24 bài), N1 (35 bài).
2. **Gắn kết mốc thời gian YouTube Chapters thực tế (V27 & `grammarChapters.json`)**:
   - Trích xuất tự động từ phân đoạn thực tế của video YouTube.
3. **Ngân hàng bài tập 20 câu/bài (V28 & `grammarQuizBank.ts`)**:
   - 16 câu trắc nghiệm MCQ + 4 câu bài tập xếp sao ⭐ JLPT.
4. **Trải nghiệm End-User hoàn chỉnh**:
   - Chuyển cấp độ N5 ~ N1 trực tiếp, sạch sẽ, không có nút debug hay ghi chú thừa.

