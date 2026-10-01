# 🐛 PHASE 7 — CHẠY TEST THẬT & LOG BUG TRÊN JIRA

> **Mục đích**: Chạy toàn bộ test cases trên ứng dụng thật, ghi Actual Result, log Bug lên Jira.  
> **Thời gian ước tính**: 4-5 ngày  
> **Vị trí**: App (localhost) + Google Sheets + Jira + ShareX  
> **Điều kiện bắt đầu**: Phase 5 + 6 đã hoàn thành

---

## 📋 TASK 7.1: Chuẩn bị môi trường trước khi test

- [ ] Backend đang chạy: `.\mvnw.cmd spring-boot:run` → http://localhost:8080
- [ ] Frontend đang chạy: `npm run dev` → http://localhost:3000
- [ ] Supabase PostgreSQL đã Unpause (kiểm tra Dashboard)
- [ ] Redis đang chạy (Docker)
- [ ] Swagger truy cập được: http://localhost:8080/swagger-ui.html
- [ ] ShareX đã mở, sẵn sàng chụp (phím tắt Print Screen)
- [ ] Google Sheets đã mở sẵn

---

## 📋 TASK 7.2: Quy trình chạy test cho MỖI test case

```
Với mỗi Test Case trong Google Sheets:
  1. Đọc Precondition → chuẩn bị
  2. Đọc Test Data → nhập đúng dữ liệu
  3. Thực hiện từng Step
  4. So sánh Actual vs Expected:

  ✅ Nếu PASS:
     → Cột K (Actual): Ghi kết quả thực tế
     → Cột L (Status): "Pass"
     → Cột N (Date): Ngày hôm nay

  ❌ Nếu FAIL:
     → Cột K (Actual): Ghi rõ sai ở đâu
     → Cột L (Status): "Fail"
     → Chụp screenshot ShareX → annotate vùng lỗi
     → Mở Jira → tạo Bug Issue (xem Task 7.3)
     → Cột M (Bug ID): Ghi Jira issue ID (VD: NM-42)

  🟠 Nếu BLOCKED:
     → Cột L (Status): "Blocked"
     → Cột P (Notes): Ghi lý do blocked
```

---

## 📋 TASK 7.3: Format tạo Bug trên Jira

Mỗi bug trên Jira cần điền đầy đủ các trường:

- [ ] **Project**: NipponMaster QA (NM)
- [ ] **Issue Type**: Bug 🐛
- [ ] **Summary**: `[MODULE] Mô tả ngắn` (VD: "[AUTH] Đăng ký không redirect về Onboarding")
- [ ] **Priority**: Highest / High / Medium / Low / Lowest
- [ ] **Epic Link**: Chọn Epic tương ứng
- [ ] **Labels**: `bug`, `module-auth`, tên sprint
- [ ] **Attachment**: Upload screenshot ShareX

**Template cho Description:**
```
*Severity:* Critical / Major / Minor / Trivial

*Environment:*
- Browser: Chrome 120 / Windows 11
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

*Precondition:*
(Ghi điều kiện)

*Steps to Reproduce:*
1. (Bước 1)
2. (Bước 2)
3. (Bước 3)

*Expected Result:*
(Kết quả mong đợi)

*Actual Result:*
(Kết quả thực tế — ghi rõ sai ở đâu)

*Screenshot:*
(Đính kèm attachment)

*Related Test Case:* TC-xxx-xxx
```

- [ ] Tạo 1 bug mẫu trên Jira để thử format

---

## 📋 TASK 7.4: Chạy test — Ngày 1 (TC_AUTH)

- [ ] Chạy TC-AUTH-001 → TC-AUTH-009 (Đăng ký)
- [ ] Chạy TC-AUTH-010 → TC-AUTH-014 (Đăng nhập)
- [ ] Chạy TC-AUTH-015 → TC-AUTH-019 (Token)
- [ ] Chạy TC-AUTH-020 → TC-AUTH-025 (Security)
- [ ] Chạy TC-AUTH-026 → TC-AUTH-028 (OAuth2)
- [ ] Cập nhật tất cả Actual Result + Status trên Sheets
- [ ] Log bugs phát hiện lên Jira

---

## 📋 TASK 7.5: Chạy test — Ngày 2 (TC_STUDENT phần 1)

- [ ] Chạy TC-STU-001 → TC-STU-006 (Vocabulary)
- [ ] Chạy TC-STU-007 → TC-STU-012 (Kanji)
- [ ] Chạy TC-STU-013 → TC-STU-015 (Grammar)
- [ ] Chạy TC-STU-016 → TC-STU-020 (Flashcards)
- [ ] Cập nhật Actual Result + Status
- [ ] Log bugs lên Jira

---

## 📋 TASK 7.6: Chạy test — Ngày 3 (TC_STUDENT phần 2)

- [ ] Chạy TC-STU-013 → TC-STU-018 (Exam)
- [ ] Chạy TC-STU-019 → TC-STU-025 (Beginner + Luyện Nghe/Đọc hiểu)
- [ ] Cập nhật Actual Result + Status
- [ ] Log bugs lên Jira

---

## 📋 TASK 7.7: Chạy test — Ngày 4 (TC_TEACHER + TC_ADMIN)

- [ ] Chạy toàn bộ TC_TEACHER (TC-TCH-001 → TC-TCH-022)
- [ ] Chạy toàn bộ TC_ADMIN (TC-ADM-001 → TC-ADM-015)
- [ ] Cập nhật Actual Result + Status
- [ ] Log bugs lên Jira

---

## 📋 TASK 7.8: Chạy test — Ngày 5 (TC_PAYMENT + Retest)

- [ ] Chạy toàn bộ TC_PAYMENT (TC-PAY-001 → TC-PAY-014)
- [ ] **Retest các bugs đã fix** (Dev fix xong → test lại):
  - [ ] Mở từng bug trên Jira có status "Fixed"
  - [ ] Chạy lại test case liên quan
  - [ ] Nếu fix OK → Jira: chuyển "Fixed" → "Closed"
  - [ ] Nếu vẫn lỗi → Jira: chuyển "Fixed" → "Reopen"
- [ ] Cập nhật lại Status trên Google Sheets

---

## ✅ TIÊU CHÍ HOÀN THÀNH PHASE 7

- [ ] Tất cả test cases đã chạy (Status ≠ "Not Run")
- [ ] Cột Actual Result đã điền cho mọi TC
- [ ] Ít nhất 10-15 bugs đã log trên Jira (có screenshot)
- [ ] Mỗi TC Fail đều có Bug ID liên kết Jira
- [ ] Đã retest ít nhất một số bugs

---

**➡️ Hoàn thành Phase 7? Chuyển sang [Phase 8 — RTM](file:///d:/Japanese%20Project/qa-plan/PHASE_8_RTM.md)**
