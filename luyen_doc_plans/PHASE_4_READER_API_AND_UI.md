# PHASE 4 – API ĐỌC & GIAO DIỆN READER

> **Mục tiêu**: Học viên vào Sidebar "Luyện Đọc", chọn level/chủ đề, mở bài, đọc có furigana, nghe audio từng câu với highlight karaoke.
> **Phụ thuộc**: Phase 2, Phase 3

---

## 4.1 Backend – API công khai cho học viên

| Method | Endpoint | Mô tả |
|:---|:---|:---|
| GET | `/api/v1/reading/articles?level=N3&category=LIFE&page=0&size=12` | Danh sách version đã publish (title, category, level, ngày, số ký tự, đã đọc chưa) |
| GET | `/api/v1/reading/versions/{id}` | Chi tiết: câu + token + audio + key vocab + `otherLevels[]` (các bản khác level của cùng sự kiện) + nguồn tham khảo |
| POST | `/api/v1/reading/versions/{id}/complete` | Đánh dấu đã đọc + `readingSeconds` |

- [ ] `ReadingController` / `ReadingService` theo layering của các module khác (controller → service, trả `ApiResponse`)
- [ ] Chỉ trả version có article `PUBLISHED`; không tồn tại → `ResourceNotFoundException`
- [ ] Yêu cầu đăng nhập (không thêm vào danh sách `permitAll`)
- [ ] Validate `level` ∈ {N5..N1}, `size` ≤ 50
- [ ] Unit test service: lọc theo level/category, không lộ bài REVIEW

## 4.2 Frontend – cấu trúc file (theo cách `screens/grammar/`, `screens/exams/` đang tổ chức)

```
frontend/src/
├── api/readingApi.ts
├── screens/reading/
│   ├── ReadingScreen.tsx          # chọn giữa danh sách và reader
│   ├── components/
│   │   ├── ArticleList.tsx        # tab level + chip chủ đề + lưới thẻ bài
│   │   ├── ArticleReader.tsx      # câu + furigana + highlight
│   │   ├── AudioBar.tsx           # play/pause, tốc độ, câu trước/sau
│   │   └── KeyVocabPanel.tsx
│   └── hooks/useSentenceAudio.ts  # phát tuần tự các file mp3, trả về câu đang phát
└── locales/{vi,en}/reading.json
```

### Tích hợp vào app
- [ ] Thêm `'reading'` vào `ScreenType` (`App.tsx`), render `<ReadingScreen onNavigate={setCurrentScreen} />`
- [ ] Route guard Nhập Môn: thêm `'reading'` vào danh sách bị chặn (theo quyết định Phase 0)
- [ ] `Sidebar.tsx`: thêm `{ id: 'reading', icon: Newspaper }`; i18n `sidebar.modules.reading`
- [ ] `FloatingSenseiButton.tsx`: thêm nhãn ngữ cảnh `reading` (vi/en) – bắt buộc vì `Record<ScreenType, string>`
- [ ] Đăng ký namespace `reading` trong `i18n/index.ts`

### Màn hình danh sách
- [ ] Tab level N5…N1 (mặc định = level hiện tại của user)
- [ ] Chip chủ đề, thẻ bài: tiêu đề JP + tiêu đề VI, chủ đề, độ dài (~phút đọc), dấu ✓ nếu đã đọc
- [ ] Trạng thái loading / rỗng / lỗi

### Màn hình Reader
- [ ] Render câu từ token, furigana bằng phần tử `<ruby>` / `<rt>` tạo bằng React (**không dùng `dangerouslySetInnerHTML`**)
- [ ] Furigana thông minh: hiện cho token có level **khó hơn** level user; nút bật/tắt "Tất cả / Thông minh / Ẩn"
- [ ] Bấm vào 1 từ → popup nhỏ: cách đọc, nghĩa, level (dữ liệu token sẵn có; nghĩa lấy từ key vocab hoặc gọi dịch nhanh)
- [ ] Câu đang phát được highlight, tự cuộn vào giữa màn hình; bấm vào câu → phát câu đó
- [ ] AudioBar: Play/Pause, câu trước/sau, tốc độ 0.75× / 1× / 1.25×, lặp câu
- [ ] Nút hiện/ẩn bản dịch tiếng Việt từng câu
- [ ] Đổi level của cùng sự kiện (`otherLevels`)
- [ ] Ghi nguồn cuối bài: "Bài viết lại dựa trên sự kiện từ: NHK – [link]"
- [ ] Responsive mobile; điều khiển bàn phím (Space = play/pause, ←/→ = câu trước/sau); nút có `aria-label`
- [ ] Bám design system hiện tại (Washi editorial: `font-serif`, `borderRadius: 2px`, token màu `primary` / `surface-*`)

### Kiểm thử
- [ ] `npx tsc --noEmit` pass
- [ ] Browser subagent trên `http://localhost:3000`: mở Sidebar → Luyện Đọc → đổi level → mở bài → phát audio, thấy highlight chạy theo câu → đổi tốc độ → bật/tắt furigana

---

## ✅ ĐIỀU KIỆN HOÀN THÀNH PHASE 4
- [ ] Học viên đọc + nghe trọn 1 bài ở ít nhất 3 level khác nhau
- [ ] Không có lỗi console, không thiếu key i18n (vi + en)
- [ ] `graphify update .`
