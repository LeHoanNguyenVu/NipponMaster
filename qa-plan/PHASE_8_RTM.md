# 📊 PHASE 8 — REQUIREMENTS TRACEABILITY MATRIX (RTM)

> **Mục đích**: Tạo ma trận liên kết Requirements → Test Cases → Kết quả → Bug.  
> **Thời gian ước tính**: 1 ngày  
> **Vị trí**: Google Sheets tab "RTM"  
> **Điều kiện bắt đầu**: Phase 7 (Execute Tests) đã hoàn thành

---

## 📋 TASK 8.1: Tạo sheet RTM trên Google Sheets

- [ ] Mở file "NipponMaster — QA Test Suite"
- [ ] Chuyển sang tab "RTM"
- [ ] Tạo cấu trúc cột:

| Cột | Tên |
|-----|-----|
| A | Req ID (VD: FR-AUTH-001) |
| B | Mô tả yêu cầu |
| C | Module |
| D | Priority |
| E | Test Case IDs (liên kết) |
| F | Tổng TC |
| G | Pass |
| H | Fail |
| I | Blocked |
| J | Coverage % |
| K | Bug IDs (Jira) |
| L | Status (Covered / Partially / Not Covered) |

- [ ] Format header row (bold, nền xanh, freeze)
- [ ] Conditional Formatting cột L:
  - [ ] "Covered" → xanh lá
  - [ ] "Partially" → vàng
  - [ ] "Not Covered" → đỏ

---

## 📋 TASK 8.2: Điền dữ liệu RTM — Module Auth

- [ ] FR-AUTH-001 (Đăng ký) → TC-AUTH-001 đến 009 → Ghi Pass/Fail → Bug IDs
- [ ] FR-AUTH-002 (Đăng nhập) → TC-AUTH-010 đến 014 → Ghi Pass/Fail → Bug IDs
- [ ] FR-AUTH-003 (Refresh Token) → TC-AUTH-015, 016
- [ ] FR-AUTH-004 (Get user info) → (TC liên quan)
- [ ] FR-AUTH-005 (Logout) → TC-AUTH-017, 018, 019
- [ ] FR-AUTH-006 (OAuth2) → TC-AUTH-026, 027, 028
- [ ] FR-AUTH-007 (RBAC) → TC-AUTH-020, 021, 022
- [ ] FR-AUTH-008 (Rate Limiting) → TC-AUTH-025

---

## 📋 TASK 8.3: Điền dữ liệu RTM — Module Student

- [ ] FR-VOC-001 đến FR-VOC-002 → TC-STU-001 đến 006
- [ ] FR-KAN-001 đến FR-KAN-003 → TC-STU-007 đến 012
- [ ] FR-GRM-001 → TC-STU-013 đến 015
- [ ] FR-FLC-001 đến FR-FLC-002 → TC-STU-016 đến 020
- [ ] FR-EXM-001 đến FR-EXM-004 → TC-STU-021 đến 027

---

## 📋 TASK 8.4: Điền dữ liệu RTM — Module Payment

- [ ] FR-PAY-001 đến FR-PAY-006 → TC-PAY-001 đến 014

---

## 📋 TASK 8.5: Điền dữ liệu RTM — Module Teacher & Admin

- [ ] FR-TCH-001 đến FR-TCH-005 → TC-TCH-001 đến 022
- [ ] FR-ADM-001 đến FR-ADM-004 → TC-ADM-001 đến 015

---

## 📋 TASK 8.6: Tính toán Coverage

- [ ] Tính Coverage % cho từng requirement: `Pass / Tổng TC × 100`
- [ ] Tính tổng requirements covered vs not covered
- [ ] Đánh status: Covered (100% pass) / Partially (có fail) / Not Covered (0 TC)

---

## ✅ TIÊU CHÍ HOÀN THÀNH PHASE 8

- [ ] Sheet RTM đã điền đầy đủ 30+ requirements
- [ ] Mỗi requirement liên kết với ≥ 1 test case
- [ ] Pass/Fail/Blocked ghi chính xác (khớp với Sheets TC)
- [ ] Bug IDs liên kết đúng (khớp với Jira)
- [ ] Coverage % đã tính
- [ ] Tạo Jira Story "Tạo RTM" → chuyển Done

---

**➡️ Hoàn thành Phase 8? Chuyển sang [Phase 9 — Test Report](file:///d:/Japanese%20Project/qa-plan/PHASE_9_TEST_REPORT.md)**
