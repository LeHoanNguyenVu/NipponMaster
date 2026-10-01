# 🔌 PHASE 6 — API TESTING TRÊN POSTMAN

> **Mục đích**: Test tất cả API endpoints bằng Postman, viết test scripts tự động.  
> **Thời gian ước tính**: 3-4 ngày  
> **Vị trí**: Postman Desktop App  
> **Điều kiện bắt đầu**: Phase 5 (Test Cases) đã hoàn thành

---

## 📋 TASK 6.1: Tạo Environment "NipponMaster Local"

Tạo environment với các variables sau:

- [ ] `base_url` = `http://localhost:8080`
- [ ] `token` = *(trống — auto set sau login)*
- [ ] `refresh_token` = *(trống — auto set sau login)*
- [ ] `admin_token` = *(trống — auto set)*
- [ ] `teacher_token` = *(trống — auto set)*
- [ ] `test_email` = `testqa@gmail.com`
- [ ] `test_password` = `Test1234A`
- [ ] `exam_id` = *(trống — auto set khi tạo exam)*

---

## 📋 TASK 6.2: Tạo Collection + Folder Auth

Collection name: **"NipponMaster API Tests"**

- [ ] POST `{{base_url}}/api/v1/auth/register` — Test: status 201, has "token"
- [ ] POST `{{base_url}}/api/v1/auth/login` — Test: status 200, auto-set `{{token}}`
- [ ] GET `{{base_url}}/api/v1/auth/me` — Header: Bearer {{token}}. Test: status 200, has "email", "role"
- [ ] POST `{{base_url}}/api/v1/auth/refresh` — Body: refreshToken. Test: auto-set new token
- [ ] POST `{{base_url}}/api/v1/auth/logout` — Test: status 200
- [ ] POST `{{base_url}}/api/v1/auth/login` (sai pass) — Test: status 401
- [ ] GET `{{base_url}}/api/v1/auth/me` (no token) — Test: status 401
- [ ] POST `{{base_url}}/api/v1/auth/oauth2/google` — Body: idToken

---

## 📋 TASK 6.3: Tạo Folder Kanji

- [ ] GET `{{base_url}}/api/v1/kanjis/search?level=N5` — Test: 200
- [ ] POST `{{base_url}}/api/v1/kanjis/canvas/recognize` — Body: image data
- [ ] POST `{{base_url}}/api/v1/kanjis/canvas/evaluate` — Body: strokes data

---

## 📋 TASK 6.6: Tạo Folder Exams

- [ ] GET `{{base_url}}/api/v1/exams?level=N5` — Test: 200
- [ ] POST `{{base_url}}/api/v1/exams` (Teacher token) — Create exam. Auto-set {{exam_id}}
- [ ] PUT `{{base_url}}/api/v1/exams/{{exam_id}}` — Update exam. Test: 200
- [ ] DELETE `{{base_url}}/api/v1/exams/{{exam_id}}` — Delete. Test: 200
- [ ] POST `{{base_url}}/api/v1/exams` (Student token) — Test: 403 Forbidden

---

## 📋 TASK 6.7: Tạo Folder Teacher

- [ ] GET `{{base_url}}/api/v1/teacher/stats` — Test: 200
- [ ] POST `{{base_url}}/api/v1/teacher/classes` — Create classroom. Test: 201
- [ ] GET `{{base_url}}/api/v1/teacher/classes` — Test: 200
- [ ] POST `{{base_url}}/api/v1/teacher/classes/{id}/students` — Add student. Test: 200

---

## 📋 TASK 6.8: Tạo Folder Admin

- [ ] GET `{{base_url}}/api/v1/admin/users` (Admin token) — Test: 200
- [ ] GET `{{base_url}}/api/v1/admin/users` (Student token) — Test: 403
- [ ] PUT `{{base_url}}/api/v1/admin/users/{id}/status` — Lock/Unlock. Test: 200
- [ ] POST `{{base_url}}/api/v1/admin/users/{id}/reset-password` — Test: 200
- [ ] PUT `{{base_url}}/api/v1/admin/users/{id}/role` — Change role. Test: 200

---

## 📋 TASK 6.9: Tạo Folder Payment & Subscription

- [ ] GET `{{base_url}}/api/v1/subscriptions/plans` — Test: 200
- [ ] GET `{{base_url}}/api/v1/subscriptions/my` — Test: 200
- [ ] GET `{{base_url}}/api/v1/subscriptions/access` — Test: 200
- [ ] POST `{{base_url}}/api/v1/payments/checkout` — Body: {planId}. Test: 200, has URL
- [ ] GET `{{base_url}}/api/v1/subscriptions/trial-status` — Test: 200

---

## 📋 TASK 6.10: Viết Test Scripts mẫu

Viết script trong tab "Tests" của Postman cho ít nhất 10 requests chính:

- [ ] Login: auto-set environment token
- [ ] Register: kiểm tra status 201 + has token
- [ ] /auth/me: kiểm tra có email, role
- [ ] Vocabulary search: kiểm tra response là array
- [ ] Admin users (Student token): kiểm tra 403
- [ ] Exam create (Teacher): auto-set exam_id
- [ ] Subscription plans: kiểm tra trả về mảng plans
- [ ] Payment checkout: kiểm tra có checkout URL
- [ ] Response time < 2000ms (áp dụng cho tất cả)
- [ ] Content-Type là application/json (áp dụng cho tất cả)

**Ví dụ script:**
```javascript
// Login — auto-set token
pm.test("Status 200", () => pm.response.to.have.status(200));
pm.test("Has token", () => {
    let json = pm.response.json();
    pm.expect(json).to.have.property("token");
    pm.environment.set("token", json.token);
    pm.environment.set("refresh_token", json.refreshToken);
});
pm.test("Response < 2s", () => pm.expect(pm.response.responseTime).to.be.below(2000));
```

---

## 📋 TASK 6.11: Chạy Collection Runner

- [ ] Đảm bảo Backend đang chạy (localhost:8080)
- [ ] Chọn Environment "NipponMaster Local"
- [ ] Mở Collection Runner → chọn toàn bộ Collection
- [ ] Click Run → xem kết quả Pass/Fail
- [ ] Screenshot kết quả Runner → lưu `qa-artifacts/screenshots/`
- [ ] Ghi kết quả vào Sheet TC_API trên Google Sheets

---

## 📋 TASK 6.12: Export Collection

- [ ] Right-click Collection → Export → v2.1
- [ ] Lưu vào: `qa-artifacts/postman/NipponMaster_API_Tests.postman_collection.json`
- [ ] Export Environment → lưu cùng folder
- [ ] Commit + push lên GitHub

---

## ✅ TIÊU CHÍ HOÀN THÀNH PHASE 6

- [ ] Environment tạo xong (8 variables)
- [ ] Collection có 8+ folders, 40-50 requests
- [ ] Ít nhất 10 requests có test scripts
- [ ] Collection Runner chạy xong → có screenshot kết quả
- [ ] Collection + Environment export → `qa-artifacts/postman/`
- [ ] Sheet TC_API cập nhật kết quả
- [ ] Tạo Jira Story "API Testing Postman" → chuyển Done

---

**➡️ Hoàn thành Phase 6? Chuyển sang [Phase 7 — Chạy Test & Log Bug](file:///d:/Japanese%20Project/qa-plan/PHASE_7_EXECUTE_TESTS.md)**
