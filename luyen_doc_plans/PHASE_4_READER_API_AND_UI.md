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

- [x] `ReadingController` / `ReadingService` theo layering của các module khác (controller → service, trả `ApiResponse`)
- [x] Chỉ trả version có article `PUBLISHED`; không tồn tại → `ResourceNotFoundException`
- [x] Yêu cầu đăng nhập (không thêm vào danh sách `permitAll`)
- [x] Validate `level` ∈ {N5..N1}, `size` ≤ 50 (ném `BusinessException` → HTTP 400)
- [x] Unit test service: lọc theo level/category, không lộ bài REVIEW

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
│   └── hooks/useSentenceAudio.ts  # phát tuần tự các file wav/mp3, trả về câu đang phát (+ fallback Web Speech API)
└── locales/{vi,en}/reading.json
```

### Tích hợp vào app
- [x] Thêm `'reading'` vào `ScreenType` (`App.tsx`), render `<ReadingScreen onNavigate={setCurrentScreen} />`
- [x] Route guard Nhập Môn: thêm `'reading'` vào danh sách bị chặn (theo quyết định Phase 0)
- [x] `Sidebar.tsx`: thêm `{ id: 'reading', icon: Newspaper }`; i18n `sidebar.modules.reading`
- [x] `FloatingSenseiButton.tsx`: thêm nhãn ngữ cảnh `reading` (vi/en) – bắt buộc vì `Record<ScreenType, string>`
- [x] Đăng ký namespace `reading` trong `i18n/index.ts`

### Màn hình danh sách
- [x] Tab level N5…N1 (mặc định = level hiện tại của user)
- [x] Chip chủ đề, thẻ bài: tiêu đề JP + tiêu đề VI, chủ đề, độ dài (~phút đọc), dấu ✓ nếu đã đọc
- [x] Trạng thái loading / rỗng / lỗi

### Màn hình Reader
- [x] Render câu từ token, furigana bằng phần tử `<ruby>` / `<rt>` tạo bằng React (**không dùng `dangerouslySetInnerHTML`**)
- [x] Furigana thông minh: hiện cho token có level **khó hơn** level user; nút bật/tắt "Tất cả / Thông minh / Ẩn"
- [x] Bấm vào 1 từ → popup nhỏ: cách đọc, nghĩa, level (dữ liệu token sẵn có; nghĩa lấy từ key vocab hoặc gọi dịch nhanh)
- [x] Câu đang phát được highlight, tự cuộn vào giữa màn hình; bấm vào câu → phát câu đó
- [x] AudioBar: Play/Pause, câu trước/sau, tốc độ 0.75× / 1× / 1.25×, lặp câu
- [x] Nút hiện/ẩn bản dịch tiếng Việt từng câu
- [x] Đổi level của cùng sự kiện (`otherLevels`)
- [x] Ghi nguồn cuối bài: 2 mẫu chuẩn pháp lý (PDL 1.0 / CC BY 4.0 cho nguồn chính phủ Nhật & mẫu Facts-only cho nguồn tin tức)
- [x] Responsive mobile; điều khiển bàn phím (Space = play/pause, ←/→ = câu trước/sau); nút có `aria-label`
- [x] Bám design system hiện tại (Washi editorial: `font-serif`, `borderRadius: 2px`, token màu `primary` / `surface-*`)

### Kiểm thử
- [x] `npx tsc --noEmit` pass
- [x] Browser subagent trên `http://localhost:3000`: mở Sidebar → Luyện Đọc → đổi level → mở bài → phát audio, thấy highlight chạy theo câu → đổi tốc độ → bật/tắt furigana

---

## ✅ ĐIỀU KIỆN HOÀN THÀNH PHASE 4
- [x] Học viên đọc + nghe trọn 1 bài ở ít nhất 3 level khác nhau (N5, N3, N1 – đều có audio WAV `READY` phát thực tế trên Chrome)
- [x] Không có lỗi console, không thiếu key i18n (vi + en)
- [x] `graphify update .`
