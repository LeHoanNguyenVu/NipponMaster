# KẾ HOẠCH PHASE 3: THIẾT LẬP DỮ LIỆU BÀI GIẢNG N5 & N4 (MINNA NO NIHONGO)

> **Mục tiêu**: Chuẩn bị đầy đủ 50 bài giảng ngữ pháp theo giáo trình chuẩn Minna no Nihongo (Bài 1 ~ 25 cho N5 và Bài 26 ~ 50 cho N4). Bao gồm liên kết video, các mốc thời gian tua thông minh, bảng tóm tắt công thức và ngân hàng bài kiểm tra củng cố sao ⭐.

---

## 📚 CẤU TRÚC GIÁO TRÌNH MINNA NO NIHONGO

### 1. Cấp độ N5: Minna no Nihongo I (25 Bài)
- **Bài 1 ~ 5**: Khẳng định/phủ định danh từ, đại từ chỉ định `これ・それ・あれ`, địa điểm `ここ・そこ`, thời gian và di chuyển `へ・で・と`.
- **Bài 6 ~ 10**: Tha động từ trợ từ `を`, địa điểm hành động `で`, rủ rê `～ませんか・～ましょう`, cho/nhận sơ cấp `あげます・もらいます`, tính từ `い/な`, tồn tại `います・あります`.
- **Bài 11 ~ 15**: Lượng từ/đếm số, so sánh hơn/nhất, mong muốn `～たい`, mục đích di chuyển `～に行きます`, thể Te `～てください・～ています・～てもいいですか`.
- **Bài 16 ~ 20**: Nối câu bằng thể Te, thể Nai `～ないでください`, thể từ điển `～辞書形・～ことができます`, thể Ta `～たことがあります`, thể thông thường (thể ngắn - Futsuukei).
- **Bài 21 ~ 25**: Trích dẫn `～と思います・～と言いました`, bổ ngữ cho danh từ (mệnh đề quan hệ), khi mà `～とき`, giả định `～たら`, dù cho `～ても`.

### 2. Cấp độ N4: Minna no Nihongo II (25 Bài: 26 ~ 50)
- **Bài 26 ~ 30**: Thể `～んです`, khả năng `可能形`, liệt kê `～し～し`, trạng thái tiếp diễn `～ています・～てあります`, chuẩn bị `～ておきます`.
- **Bài 31 ~ 35**: Ý chí `意向形`, dự định `～つもり`, mệnh lệnh/cấm đoán `命令形・禁止形`, trích dẫn chỉ thị, điều kiện `～ば・～なら`.
- **Bài 36 ~ 40**: Mục đích `～ように`, bị động `受身形`, biến đổi trạng thái `～てきます・～ていきます`, mục đích `～ために`, câu hỏi lồng `～かどうか`.
- **Bài 41 ~ 45**: Cho nhận tôn kính `いただきます・くださいます`, sai khiến `使役形`, sai khiến bị động, kính ngữ tôn kính ngữ `尊敬語`, khiêm nhường ngữ `謙譲語`.
- **Bài 46 ~ 50**: Thời điểm hành động `～ところ`, phán đoán `～はず`, truyền ngôn `～そうだ`, suy đoán `～ようだ`.

---

## 🛠️ QUY TRÌNH NẠP DỮ LIỆU & TỰ ĐỘNG HÓA

1. **Thu thập danh sách URL / Video ID**:
   - Tiếp nhận danh sách video playlist của User cho 25 bài N5 và 25 bài N4.
   - Trích xuất YouTube Video ID chuẩn (chuỗi 11 ký tự, ví dụ `dQw4w9WgXcQ`).

2. **Xây dựng Mốc thời gian (Timestamps)**:
   - Mỗi bài giảng tối thiểu 3 ~ 6 mốc thời gian ứng với từng điểm ngữ pháp quan trọng trong bài.
   - Định dạng: `{ timeSec: 90, timeStr: '01:30', pattern: 'N1 は N2 です', summary: 'Khẳng định danh từ' }`.

3. **Soạn thảo Bảng Tóm Tắt (Cheatsheet)**:
   - Mỗi mẫu ngữ pháp gồm: Công thức kết hợp (`N + は + N + です`), Sắc thái/Lưu ý ngữ cảnh, và 2 ví dụ có phiên âm furigana song ngữ Nhật - Việt.

4. **Biên soạn Ngân hàng Đề thi Củng cố & Xếp Sao ⭐**:
   - **Phần 1 - Trắc nghiệm (MCQ)**: 2 ~ 3 câu hỏi nhanh kiểm tra cách dùng trợ từ, chia thì, biến đổi thể.
   - **Phần 2 - Xếp sao ⭐ (Star Arrangement)**: 1 ~ 2 câu hỏi cấu trúc chuẩn JLPT. Học viên ghép 4 mảnh câu để tìm từ ở vị trí ngôi sao `★`.
   - Đáp án kèm lời giải thích cặn kẽ để học viên tự học sau khi nộp bài.

5. **Kịch bản Nạp Tự Động (Migration Seed)**:
   - Viết script Python/SQL `scripts/seed_grammar_n5_n4.py` nạp hàng loạt vào bảng `grammar_lessons`, `grammar_timestamps`, `grammar_cheatsheets`, `grammar_quizzes`.

