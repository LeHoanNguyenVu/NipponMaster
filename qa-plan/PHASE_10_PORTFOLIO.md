# 🎯 PHASE 10 — ĐÓNG GÓI PORTFOLIO & CẬP NHẬT CV

> **Mục đích**: Tổng hợp tất cả artifacts, push GitHub, cập nhật CV sẵn sàng ứng tuyển.  
> **Thời gian ước tính**: 2-3 ngày  
> **Điều kiện bắt đầu**: Phase 9 (Test Report) đã hoàn thành

---

## 📋 TASK 10.1: Chuẩn bị folder qa-artifacts

- [ ] Kiểm tra folder `qa-artifacts/postman/` có file Collection export
- [ ] Kiểm tra folder `qa-artifacts/diagrams/` có các file PNG từ draw.io:
  - [ ] `use_case_diagram.png`
  - [ ] `system_architecture.png`
  - [ ] `jwt_state_transition.png`
  - [ ] `subscription_state_transition.png`
- [ ] Kiểm tra folder `qa-artifacts/screenshots/` có bug screenshots (nếu cần)

---

## 📋 TASK 10.2: Thêm QA section vào README.md

Thêm section sau vào README.md của project:

- [ ] Tiêu đề: "🧪 Quality Assurance"
- [ ] Bảng: Tài liệu | Tool | Link
- [ ] QA Highlights: Tổng TC, Tổng bugs, Pass rate, Techniques
- [ ] Link Postman Collection download
- [ ] Link Google Sheets (set "Anyone with link can view")

---

## 📋 TASK 10.3: Set permissions chia sẻ

- [ ] Google Sheets: Share → "Anyone with the link" → Viewer
- [ ] Confluence: Nếu dùng free tier → screenshot các trang thay link
- [ ] Jira: Nếu không public được → screenshot Scrum Board + Bug list

---

## 📋 TASK 10.4: Push lên GitHub

- [ ] `git add qa-artifacts/`
- [ ] `git add QA_MASTER_PLAN.md`
- [ ] `git add qa-plan/`
- [ ] `git commit -m "feat: add QA documentation & artifacts"`
- [ ] `git push`

---

## 📋 TASK 10.5: Cập nhật CV — Phần "Dự án cá nhân"

Viết vào CV:

```
📌 DỰ ÁN: NipponMaster — Nền tảng học tiếng Nhật trực tuyến
🔗 GitHub: github.com/yourname/nipponmaster
⏱️ Thời gian: 06/2026 – 10/2026
👥 Vai trò: QA Engineer (Kiêm Developer)
🛠️ Công nghệ: React 19, Spring Boot, PostgreSQL, Redis, Stripe API
```

- [ ] Viết mô tả dự án (2-3 dòng)
- [ ] Viết đóng góp QA (5-7 bullet points):
  - [ ] Viết SRS đặc tả 30+ Functional Requirements
  - [ ] Thiết kế Test Design: EP, BVA, Decision Table, State Transition
  - [ ] Viết & thực thi 150+ Test Cases (Functional, API, Security)
  - [ ] API Testing với Postman (50+ endpoints, test scripts)
  - [ ] Phát hiện & log 15+ bugs trên Jira
  - [ ] Xây dựng RTM liên kết Requirements → Test Cases → Bugs
  - [ ] Tạo Test Summary Report: Pass Rate ___%

---

## 📋 TASK 10.6: Cập nhật CV — Phần "Tools"

```
🛠️ QA Tools:
  • Jira — Bug tracking, Sprint management (Scrum workflow)
  • Google Sheets — Test Cases management, RTM, Reporting
  • Postman — API Testing, Collection, Test Scripts
  • Confluence — SRS, Test Plan, Test Summary Report
  • draw.io — Use Case Diagram, State Transition Diagram
  • ShareX — Bug screenshot & annotation
  • Git & GitHub — Version control
```

- [ ] Kiểm tra: Mỗi tool liệt kê đều đã dùng thật → không bịa
- [ ] Kiểm tra: Có evidence (screenshot/link) cho từng tool

---

## 📋 TASK 10.7: Chuẩn bị cho phỏng vấn

Chuẩn bị trả lời các câu hỏi phổ biến:

- [ ] "Em dùng tool gì quản lý test case?" → Google Sheets (show file thật)
- [ ] "Em dùng tool gì log bug?" → Jira (show board thật)
- [ ] "Em biết kỹ thuật test design nào?" → EP, BVA, Decision Table, State Transition (show Confluence)
- [ ] "Em đã tìm được bao nhiêu bug?" → ___ bugs, ___ Critical, ___ Major (show Jira filter)
- [ ] "Em test API bằng gì?" → Postman (show Collection + test scripts)
- [ ] "Pass rate bao nhiêu?" → ___% (show Test Summary Report)
- [ ] "RTM là gì, em đã làm chưa?" → Show RTM sheet liên kết Requirements → TC → Bug

---

## ✅ TIÊU CHÍ HOÀN THÀNH PHASE 10

- [ ] qa-artifacts/ đã push lên GitHub
- [ ] README.md có QA section
- [ ] Google Sheets share link "Anyone can view"
- [ ] CV đã cập nhật phần Dự án + Tools
- [ ] Chuẩn bị trả lời 7 câu hỏi phỏng vấn phổ biến
- [ ] **🎉 BỘ QA PORTFOLIO HOÀN CHỈNH — SẴN SÀNG ỨNG TUYỂN!**

---

**⬅️ Quay lại [QA Master Plan](file:///d:/Japanese%20Project/QA_MASTER_PLAN.md)**
