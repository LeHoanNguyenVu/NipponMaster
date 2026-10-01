# 🔧 PHASE 1 — SETUP JIRA, CONFLUENCE & CÁC TOOLS

> **Mục đích**: Đăng ký và cấu hình tất cả tools QA cần dùng.  
> **Thời gian ước tính**: 1-2 ngày  
> **Điều kiện bắt đầu**: Phase 0 đã hoàn thành (5 chức năng core ổn định)

---

## 📋 TASK 1.1: Đăng ký Jira + Confluence (Free)

- [ ] Truy cập https://www.atlassian.com/software/jira/free
- [ ] Đăng ký tài khoản bằng email
- [ ] Tạo Jira Site (VD: `nipponmaster.atlassian.net`)
- [ ] Chọn template **Scrum** khi tạo project
- [ ] Đặt tên project: **NipponMaster QA** — Project Key: **NM**
- [ ] Xác nhận Confluence miễn phí đi kèm Jira đã được kích hoạt

---

## 📋 TASK 1.2: Tạo Epics trên Jira (1 Epic = 1 Module)

Tạo các Epic sau trong Jira Backlog:

- [ ] **NM-EPIC-AUTH**: Authentication & Security (JWT, OAuth2, RBAC)
- [ ] **NM-EPIC-LEARN**: Student Learning (Vocabulary, Kanji, Grammar, Flashcards)
- [ ] **NM-EPIC-EXAM**: JLPT Exam & Battle Arena
- [ ] **NM-EPIC-TEACHER**: Teacher Space (Exam Builder, Content CMS, Gradebook)
- [ ] **NM-EPIC-ADMIN**: Admin Console (User Management, Role Assignment)
- [ ] **NM-EPIC-PAY**: Payment & Subscription (Stripe, Content Lock)
- [ ] **NM-EPIC-UI**: UI/UX & Cross-cutting (Landing Page, Dashboard, Responsive)

---

## 📋 TASK 1.3: Tạo Sprints trên Jira

- [ ] **QA Sprint 1** (Tuần 1): Setup + SRS + Test Plan
- [ ] **QA Sprint 2** (Tuần 2): Test Design + Viết Test Cases
- [ ] **QA Sprint 3** (Tuần 3): Postman API Testing + Viết thêm Test Cases
- [ ] **QA Sprint 4** (Tuần 4): Chạy test thật + Log Bug
- [ ] **QA Sprint 5** (Tuần 5): RTM + Test Report + Đóng gói CV

---

## 📋 TASK 1.4: Cấu hình Bug Workflow trên Jira

- [ ] Xác nhận Issue Types có: Story, Task, Bug, Sub-task
- [ ] Bug Workflow: `Open → In Progress → Fixed → Retest → Closed`
- [ ] Thêm nhánh: `In Progress → Won't Fix → Closed`
- [ ] Thêm nhánh: `Retest → Reopen → In Progress`
- [ ] Thêm Labels mẫu: `bug`, `module-auth`, `module-exam`, `module-payment`

---

## 📋 TASK 1.5: Tạo Confluence Space

- [ ] Tạo Space mới: **NipponMaster QA Documentation**
- [ ] Tạo trang trống: **SRS — Đặc Tả Yêu Cầu Phần Mềm**
- [ ] Tạo trang trống: **Test Plan — Kế Hoạch Kiểm Thử**
- [ ] Tạo trang trống: **Test Design — Thiết Kế Kiểm Thử**
- [ ] Tạo trang trống: **Test Summary Report — Báo Cáo Tổng Kết**

---

## 📋 TASK 1.6: Cài đặt các tools khác

- [ ] Cài **Postman Desktop**: https://www.postman.com/downloads/
- [ ] Tạo tài khoản Postman (để sync collection lên cloud)
- [ ] Truy cập **draw.io**: https://app.diagrams.net/ (không cần cài, dùng online)
- [ ] Cài **ShareX**: https://getsharex.com/ (screenshot + annotation)
- [ ] Test thử ShareX: chụp màn hình → vẽ mũi tên/khoanh đỏ → lưu file

---

## 📋 TASK 1.7: Tạo thư mục qa-artifacts trong project

- [ ] Tạo folder `d:\Japanese Project\qa-artifacts\`
- [ ] Tạo subfolder `qa-artifacts\postman\` (lưu Postman export)
- [ ] Tạo subfolder `qa-artifacts\diagrams\` (lưu draw.io export PNG)
- [ ] Tạo subfolder `qa-artifacts\screenshots\` (lưu bug screenshots)
- [ ] Thêm dòng vào `.gitignore` nếu cần: `qa-artifacts/screenshots/` (tùy chọn)

---

## ✅ TIÊU CHÍ HOÀN THÀNH PHASE 1

- [ ] Jira Project tạo xong, có 7 Epics + 5 Sprints
- [ ] Confluence Space tạo xong, có 4 trang trống
- [ ] Postman Desktop đã cài và đăng nhập
- [ ] draw.io truy cập được
- [ ] ShareX đã cài và chụp thử thành công
- [ ] Folder `qa-artifacts/` đã tạo trong project

---

**➡️ Hoàn thành Phase 1? Chuyển sang [Phase 2 — SRS](file:///d:/Japanese%20Project/qa-plan/PHASE_2_SRS.md)**
