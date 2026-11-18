# PHASE 6 – TIẾN ĐỘ ĐỌC, DASHBOARD & PHÂN QUYỀN LEVEL

> **Mục tiêu**: Lưu tiến độ bài đã đọc của học viên (không dùng Quiz theo yêu cầu) và hiển thị trên Dashboard (thay chỗ thẻ "Luyện Nghe" đã xóa).
> **Phụ thuộc**: Phase 4 · **Song song với**: Phase 5

---

## 6.1 Hoàn thành bài đọc (1-click / tự động khi đọc & nghe xong)

| Method | Endpoint | Body | Trả về |
|:---|:---|:---|:---|
| POST | `/api/v1/reading/versions/{id}/complete` | `{ readingSeconds }` | `{ completed: true, totalCompleted: int }` |

- [ ] Học viên bấm nút **"✓ Đánh dấu đã đọc xong"** ở cuối bài (hoặc tự động gợi ý khi nghe hết câu cuối cùng)
- [ ] Lưu vào `user_reading_progress` (`ON CONFLICT (user_id, version_id) DO UPDATE SET reading_seconds = ...`)
- [ ] Unit test lưu tiến độ hoàn thành bài đọc

## 6.2 Tiến độ & Dashboard

- [ ] `DashboardService` / `DashboardStatsResponse`: thêm `readingCompleted` (đếm từ `user_reading_progress`) và `readingTotal` – **dữ liệu thật từ DB**, không hard-code
- [ ] `moduleProgressManager.ts`: thêm module `reading` (key `'reading'`, theme màu riêng, icon `Newspaper`), đồng bộ với `readingCompleted`
- [ ] `ModuleProgressOverview.tsx`: thêm thẻ thứ 4 ("Luyện Đọc Báo Nhật"), lưới quay lại `lg:grid-cols-4`, xử lý icon `Newspaper`
- [ ] `DashboardStudent.tsx`: truyền `readingCompleted` vào `loadAllModulesProgress`
- [ ] i18n `dashboard.skillsSection.modules.reading` (vi + en), cập nhật lại tiêu đề tổng quan 4 kỹ năng cốt lõi
- [ ] Widget / Banner nhỏ "Bài đọc gợi ý hôm nay" = bài mới nhất đúng level user chưa đọc

## 6.3 Khóa theo level / gói học
- [ ] Theo quyết định Phase 0: STARTER bị ẩn module (giống Kanji/Ngữ pháp/Đề thi)
- [ ] (Nếu có giới hạn theo gói) kiểm tra quyền **ở backend**, không chỉ ẩn nút ở frontend

## 6.4 Kiểm thử
- [ ] `mvn -q test` + `npx tsc --noEmit` pass
- [ ] Browser subagent: đọc 1 bài → bấm Hoàn thành bài đọc → về Dashboard thấy thẻ "Luyện Đọc" tăng +1

---

## ✅ ĐIỀU KIỆN HOÀN THÀNH PHASE 6
- [ ] Lưu tiến độ hoàn thành bài đọc chính xác theo từng user
- [ ] Thẻ Dashboard hiển thị số liệu thật
- [ ] `graphify update .`
