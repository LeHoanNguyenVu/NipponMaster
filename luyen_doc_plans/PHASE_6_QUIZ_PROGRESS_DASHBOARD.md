# PHASE 6 – TIẾN ĐỘ ĐỌC, DASHBOARD & PHÂN QUYỀN LEVEL

> **Mục tiêu**: Lưu tiến độ bài đã đọc của học viên (không dùng Quiz theo yêu cầu) và hiển thị trên Dashboard (thay chỗ thẻ "Luyện Nghe" đã xóa).
> **Phụ thuộc**: Phase 4 · **Song song với**: Phase 5

---

## 6.1 Hoàn thành bài đọc (1-click / tự động khi đọc & nghe xong)

| Method | Endpoint | Body | Trả về |
|:---|:---|:---|:---|
| POST | `/api/v1/reading/versions/{id}/complete` | `{ readingSeconds }` | `{ completed: true, totalCompleted: int }` |

- [x] Học viên bấm nút **"✓ Đánh dấu đã đọc xong"** ở cuối bài (kèm thanh gợi ý tự động khi nghe hết câu cuối cùng)
- [x] Lưu vào `user_reading_progress` (`ON CONFLICT (user_id, version_id) DO UPDATE SET reading_seconds = ...`)
- [x] Unit test lưu tiến độ hoàn thành bài đọc (`ReadingArticleServiceTest` & `DashboardServiceTest`)

## 6.2 Tiến độ & Dashboard

- [x] `DashboardService` / `DashboardStatsResponse`: thêm `readingCompleted` (đếm từ `user_reading_progress`) và `readingTotal` – **dữ liệu thật từ DB**, không hard-code
- [x] `moduleProgressManager.ts`: thêm module `reading` (key `'reading'`, theme màu riêng, icon `Newspaper`), đồng bộ với `readingCompleted` & `readingTotal`
- [x] `ModuleProgressOverview.tsx`: thêm thẻ thứ 4 ("Luyện Đọc Báo Nhật"), lưới quay lại `lg:grid-cols-4`, xử lý icon `Newspaper`
- [x] `DashboardStudent.tsx`: truyền `readingCompleted` & `readingTotal` vào `loadAllModulesProgress`
- [x] i18n `dashboard.skillsSection.modules.reading` (vi + en), cập nhật lại tiêu đề tổng quan 4 kỹ năng cốt lõi
- [x] Widget / Banner nhỏ "Bài đọc gợi ý hôm nay" = bài mới nhất đúng level user chưa đọc (`GET /api/v1/reading/recommended`, bấm "Đọc ngay" mở thẳng vào bài)

## 6.3 Khóa theo level / gói học
- [x] Theo quyết định Phase 0: STARTER bị ẩn module (giống Kanji/Ngữ pháp/Đề thi; banner gợi ý cũng ẩn với STARTER)
- [x] Kiểm tra xác thực & validate tham số ở backend (`ReadingArticleController` yêu cầu JWT, từ chối `level` ngoài `N5..N1`, chỉ trả bài `PUBLISHED`)

## 6.4 Kiểm thử
- [x] `mvn -q test` (`reading.**` + `dashboard.**`) + `npx tsc --noEmit` pass
- [x] Browser subagent: đọc 1 bài (bấm từ banner gợi ý) → bấm Hoàn thành bài đọc → về Dashboard thấy thẻ "Luyện Đọc" tăng +1 (`1/3` → `2/3`, `33%` → `67%`)

---

## ✅ ĐIỀU KIỆN HOÀN THÀNH PHASE 6
- [x] Lưu tiến độ hoàn thành bài đọc chính xác theo từng user
- [x] Thẻ Dashboard hiển thị số liệu thật
- [x] `graphify update .`
