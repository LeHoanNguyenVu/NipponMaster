# 📄 PHASE 3 — VIẾT TEST PLAN TRÊN CONFLUENCE

> **Mục đích**: Viết kế hoạch kiểm thử tổng thể — chiến lược, phạm vi, rủi ro, công cụ.  
> **Thời gian ước tính**: 1-2 ngày  
> **Vị trí**: Confluence Page → "Test Plan — Kế Hoạch Kiểm Thử"  
> **Điều kiện bắt đầu**: Phase 2 (SRS) đã hoàn thành

---

## 📋 TASK 3.1: Viết Mục đích & Phạm vi

- [ ] **Mục đích**: Kiểm thử thủ công các chức năng đã triển khai của NipponMaster
- [ ] **In Scope**: Liệt kê 5 modules sẽ test (Auth, Learning, Exam, Payment, Admin)
- [ ] **Out of Scope**: Ghi rõ những gì KHÔNG test (Sprint 21-25+, Performance, Automation, Mobile Native)

---

## 📋 TASK 3.2: Viết Phương pháp kiểm thử

- [ ] Manual Functional Testing (UI trên browser)
- [ ] API Testing (Postman)
- [ ] Security Testing cơ bản (RBAC, JWT, injection)
- [ ] UI/UX Testing (responsive, cross-browser)
- [ ] Regression Testing (sau mỗi fix bug → test lại)

---

## 📋 TASK 3.3: Viết Môi trường kiểm thử

- [ ] Frontend URL: `http://localhost:3000`
- [ ] Backend URL: `http://localhost:8080`
- [ ] Swagger UI: `http://localhost:8080/swagger-ui.html`
- [ ] Database: Supabase PostgreSQL (remote)
- [ ] Cache: Redis (local Docker)
- [ ] Browser: Chrome, Firefox, Edge (phiên bản mới nhất)
- [ ] OS: Windows 11

---

## 📋 TASK 3.4: Viết Entry & Exit Criteria

**Entry Criteria** (điều kiện bắt đầu test):
- [ ] Backend build thành công, Swagger truy cập được
- [ ] Frontend build thành công, trang chủ hiển thị đúng
- [ ] Database Supabase đã Unpause, có seed data
- [ ] Redis đang chạy
- [ ] Ít nhất 5 chức năng core ổn định (Phase 0 passed)

**Exit Criteria** (điều kiện kết thúc test):
- [ ] 100% test cases đã thực thi
- [ ] 0 bug Blocker/Critical còn Open
- [ ] Test pass rate ≥ 85%
- [ ] Tất cả P1 requirements đã được cover bởi test cases

**Suspension Criteria** (điều kiện tạm dừng):
- [ ] Database Supabase bị Pause → phải Unpause trước
- [ ] Backend crash liên tục → chờ fix
- [ ] Blocking bug chặn luồng chính

---

## 📋 TASK 3.5: Viết bảng phân bổ Test Cases theo Module

- [ ] Tạo bảng: Module | Loại Test | Số TC dự kiến | Ưu tiên
- [ ] Auth: Functional + Security, 25-28 TCs, P1
- [ ] Student Learning: Functional + UI, 35-40 TCs, P2
- [ ] Exam: Functional + UI, 15-20 TCs, P1
- [ ] Payment: Functional + Integration, 15-20 TCs, P1
- [ ] Admin: Functional + Security, 15-18 TCs, P1
- [ ] API (all): API Testing, 50-60 TCs, P1

---

## 📋 TASK 3.6: Viết Rủi ro & Giảm thiểu

- [ ] Rủi ro 1: DB Supabase tự Pause → Giảm thiểu: Kiểm tra + Unpause trước mỗi phiên test
- [ ] Rủi ro 2: Stripe sandbox lỗi → Giảm thiểu: Dùng test card, retry
- [ ] Rủi ro 3: Redis không chạy → Giảm thiểu: Kiểm tra Docker container
- [ ] Rủi ro 4: API third-party timeout → Giảm thiểu: Set timeout 10s, retry
- [ ] Rủi ro 5: Dữ liệu test bị thay đổi giữa chừng → Giảm thiểu: Backup seed data

---

## 📋 TASK 3.7: Viết Công cụ & Deliverables

**Công cụ:**
- [ ] Jira: Bug tracking & Sprint management
- [ ] Google Sheets: Test Cases & RTM
- [ ] Postman: API Testing
- [ ] Confluence: SRS, Test Plan, Test Report
- [ ] draw.io: Diagrams
- [ ] ShareX: Screenshot + annotation

**Deliverables:**
- [ ] SRS Document (Confluence) ← đã xong Phase 2
- [ ] Test Plan (Confluence) ← đang viết
- [ ] Test Design (Confluence)
- [ ] 150+ Test Cases (Google Sheets)
- [ ] Postman Collection (export .json)
- [ ] Bug Reports (Jira Issues)
- [ ] RTM (Google Sheets)
- [ ] Test Summary Report (Confluence)

---

## ✅ TIÊU CHÍ HOÀN THÀNH PHASE 3

- [ ] Trang Test Plan trên Confluence đã viết đầy đủ (7 mục chính)
- [ ] In/Out Scope rõ ràng
- [ ] Entry/Exit/Suspension Criteria đầy đủ
- [ ] Bảng phân bổ TC theo module
- [ ] 5 rủi ro + cách giảm thiểu
- [ ] Tạo Jira Story "Viết Test Plan" → chuyển Done

---

**➡️ Hoàn thành Phase 3? Chuyển sang [Phase 4 — Test Design](file:///d:/Japanese%20Project/qa-plan/PHASE_4_TEST_DESIGN.md)**
