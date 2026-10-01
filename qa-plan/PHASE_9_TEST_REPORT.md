# 📈 PHASE 9 — TEST SUMMARY REPORT

> **Mục đích**: Viết báo cáo tổng kết kiểm thử — con số, biểu đồ, nhận xét, khuyến nghị.  
> **Thời gian ước tính**: 1-2 ngày  
> **Vị trí**: Confluence Page → "Test Summary Report"  
> **Điều kiện bắt đầu**: Phase 7 + 8 đã hoàn thành

---

## 📋 TASK 9.1: Viết thông tin dự án

- [ ] Tên dự án, tech stack, roles
- [ ] Phạm vi test (modules đã test)
- [ ] Thời gian test (từ ngày — đến ngày)
- [ ] Tools sử dụng

---

## 📋 TASK 9.2: Tổng hợp kết quả kiểm thử

Lấy số liệu từ Google Sheets:

- [ ] Tổng số test cases
- [ ] Số Pass + tỉ lệ %
- [ ] Số Fail + tỉ lệ %
- [ ] Số Blocked + tỉ lệ %
- [ ] Số Skipped + tỉ lệ %
- [ ] **Test Pass Rate = Pass / (Pass + Fail) × 100**

---

## 📋 TASK 9.3: Tạo bảng kết quả theo Module

- [ ] Tạo bảng: Module | Total | Pass | Fail | Blocked | Pass Rate %
- [ ] Điền cho: AUTH, STUDENT, TEACHER, ADMIN, PAYMENT, API
- [ ] Paste vào Confluence

---

## 📋 TASK 9.4: Tạo biểu đồ (Charts)

Tạo trên Google Sheets tab "Summary" rồi screenshot/export → paste Confluence:

- [ ] **Pie chart**: Tổng Pass vs Fail vs Blocked vs Skipped
- [ ] **Bar chart**: Pass rate theo Module (AUTH 89%, STUDENT 92%...)
- [ ] **Bar chart**: Số bugs theo Module
- [ ] Screenshot 3 biểu đồ → paste vào Confluence

---

## 📋 TASK 9.5: Liệt kê Top Bugs

- [ ] Lấy danh sách bugs từ Jira (filter: project = NM AND type = Bug)
- [ ] Tạo bảng: Bug ID | Severity | Module | Summary | Status (Open/Closed)
- [ ] Liệt kê Top 5-10 bugs nghiêm trọng nhất
- [ ] Paste vào Confluence

---

## 📋 TASK 9.6: Viết Requirements Coverage

- [ ] Tổng requirements: ___ (từ SRS)
- [ ] Covered by test cases: ___ (___%)
- [ ] Partially covered: ___
- [ ] Not covered: ___
- [ ] Lấy số liệu từ RTM (Phase 8)

---

## 📋 TASK 9.7: Viết Đánh giá chất lượng

- [ ] Ưu điểm: (VD: Auth flow ổn định, API response nhanh...)
- [ ] Điểm cần cải thiện: (VD: Validation yếu ở form X, UI lỗi responsive...)
- [ ] Khuyến nghị trước Release: (VD: Fix tất cả Critical bugs, test thêm Mobile...)

---

## 📋 TASK 9.8: Viết Bài học kinh nghiệm (Lessons Learned)

- [ ] Ghi 3-5 bài học từ quá trình test
- [ ] VD: "API Testing bằng Postman bắt được nhiều bug hơn UI manual"
- [ ] VD: "Nên viết test case trước khi code (shift-left testing)"
- [ ] VD: "Decision Table giúp phát hiện logic gap trong scoring"

---

## 📋 TASK 9.9: Review số liệu nhất quán

- [ ] Kiểm tra: Tổng TC trong Report = Tổng TC trong Google Sheets
- [ ] Kiểm tra: Số bugs trong Report = Số bugs trên Jira
- [ ] Kiểm tra: Coverage trong Report = Coverage trong RTM
- [ ] Sửa nếu có sai lệch

---

## ✅ TIÊU CHÍ HOÀN THÀNH PHASE 9

- [ ] Test Summary Report trên Confluence viết đầy đủ (8 mục)
- [ ] Có 3+ biểu đồ (paste từ Google Sheets)
- [ ] Top 5-10 bugs liệt kê
- [ ] Đánh giá chất lượng + khuyến nghị
- [ ] Số liệu nhất quán giữa Sheets ↔ Report ↔ Jira
- [ ] Tạo Jira Story "Viết Test Summary Report" → chuyển Done

---

**➡️ Hoàn thành Phase 9? Chuyển sang [Phase 10 — Portfolio & CV](file:///d:/Japanese%20Project/qa-plan/PHASE_10_PORTFOLIO.md)**
