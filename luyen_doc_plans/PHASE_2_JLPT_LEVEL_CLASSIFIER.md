# PHASE 2 – PHÂN LOẠI / KIỂM ĐỊNH CẤP ĐỘ JLPT

> **Mục tiêu**: Mỗi phiên bản bài có `computed_level` đáng tin cậy, dùng để (1) kiểm tra bài AI viết có đúng level mục tiêu không, (2) phân loại bài từ nguồn mở (phương án C).
> **Phụ thuộc**: Phase 1 (tokenizer) · **Có thể chạy song song**: Phase 3

---

## 2.1 Vì sao không chỉ "nhờ AI đoán level"?

LLM đoán level JLPT không ổn định (cùng 1 bài, hỏi 2 lần có thể ra 2 kết quả) và không giải thích được. Còn công thức thuần túy (chỉ đếm độ dài câu) thì bỏ qua từ vựng – yếu tố quyết định lớn nhất. → **Kết hợp**: chấm bằng dữ liệu JLPT có sẵn trong DB là chính, LLM chỉ làm "ý kiến thứ hai".

> [!NOTE]
> Nghiên cứu về đọc hiểu ngoại ngữ (Laufer, Nation…) cho thấy người học cần biết khoảng **95–98% số từ** trong văn bản để hiểu được thoải mái. Đây là cơ sở cho ngưỡng độ phủ dưới đây. Tham khảo thêm công cụ đo độ khó tiếng Nhật **jReadability** (Lee & Hasebe) nếu muốn bổ sung chỉ số độ khó văn bản.

---

## 2.2 Thuật toán đề xuất (4 tín hiệu + 1 ý kiến thứ hai)

Với mỗi phiên bản bài, sau khi tách từ bằng Kuromoji:

| # | Tín hiệu | Cách tính | Nguồn dữ liệu |
|:-:|:---|:---|:---|
| 1 | **Độ phủ từ vựng** (quan trọng nhất) | Bỏ qua tên riêng (POS `固有名詞`), số, ký hiệu, trợ từ. Với mỗi từ (dạng gốc/lemma) tra level JLPT. `Cov(L)` = tỉ lệ token có level ≤ L. **Level từ vựng = level dễ nhất mà `Cov(L) ≥ 95%`** | `vocabularies`, `kanji_chapter_vocab` (+ danh sách bổ sung từ Spike 2) |
| 2 | **Độ phủ Kanji** | Tương tự với từng chữ Kanji, ngưỡng 97% | `kanjis.jlpt_level` |
| 3 | **Ngữ pháp** | So khớp các mẫu ngữ pháp (regex/chuỗi) trong bài; lấy level **cao nhất** của mẫu xuất hiện ≥ 1 lần | `grammars.jlpt_level` |
| 4 | **Độ dài câu trung bình** (ký tự/câu) | Ngưỡng gợi ý ban đầu: N5 ≤ 20 · N4 ≤ 28 · N3 ≤ 38 · N2 ≤ 50 · N1 > 50 (**sẽ hiệu chỉnh ở 2.4**) | Tính trực tiếp |
| 5 | Ý kiến thứ hai (LLM) | Hỏi Gemini level + lý do ngắn | `GeminiClient` |

**Kết hợp:**

```text
base   = max(vocabLevel, kanjiLevel)                 // không được dễ hơn từ/chữ khó nhất
if grammarLevel  > base  -> base = base + 1 (tối đa bằng grammarLevel)
if sentenceLevel > base + 1 -> base = base + 1
computed_level = base
if |computed_level - llmLevel| >= 2 -> đánh dấu needsReview = true (admin xem tay)
```

*(N5 = 1 … N1 = 5, "lớn hơn" = khó hơn)*

**Từ không có trong danh sách JLPT** (từ thời sự như 物価高, 線状降水帯): không tính là "N1" mà
- nếu nằm trong `key_vocab` của bài (có giải nghĩa + furigana) → bỏ qua khi tính độ phủ;
- nếu không → tính là vượt level, và generator phải đưa nó vào `key_vocab` hoặc thay bằng từ dễ hơn.

`level_metrics` lưu lại toàn bộ để debug & hiển thị cho admin:
```json
{ "coverage": {"N5":0.71,"N4":0.88,"N3":0.96,"N2":0.99,"N1":0.99},
  "kanjiCoverage": {...}, "grammarMax": "N3", "avgSentenceLen": 31.4,
  "outOfListWords": ["線状降水帯"], "llmLevel": "N3", "needsReview": false }
```

---

## 2.3 Vòng lặp "viết – chấm – viết lại" (dùng cho phương án B)

- [ ] Generator nhận `targetLevel` + danh sách từ/ngữ pháp cho phép
- [ ] Chấm bằng classifier → nếu `computed_level` khó hơn target: gửi lại Gemini **danh sách từ vượt level** để thay thế; tối đa 2 lần
- [ ] Sau 2 lần vẫn lệch → lưu với `needsReview = true`, admin quyết định

## 2.4 Hiệu chuẩn (calibration)

- [ ] Tạo bộ dữ liệu chuẩn ~100 đoạn văn đã biết level: đoạn đọc hiểu trong **đề JLPT có trong dự án** (`JLPT_tests/`, `frontend/src/screens/exams/data/`) + bài đọc giáo trình đã có
- [ ] Chạy classifier, in ma trận nhầm lẫn
- [ ] Tinh chỉnh ngưỡng (95% / 97% / độ dài câu) cho tới khi đạt:
  - [ ] **Đúng level ≥ 60%**
  - [ ] **Lệch tối đa 1 cấp ≥ 90%**
- [ ] Đưa ngưỡng ra `application.properties` (`reading.level.vocab-coverage=0.95`…) để chỉnh không cần build lại

## 2.5 Kiểm thử
- [ ] Unit test `LevelClassifier` với 5 đoạn văn mẫu cố định (mỗi level 1 đoạn) → đúng ±1
- [ ] Unit test: tên riêng & số không làm tăng level
- [ ] Unit test: từ ngoài danh sách có trong `key_vocab` được bỏ qua
- [ ] Test bộ hiệu chuẩn chạy được bằng `mvn -q test` (đặt ngưỡng pass ở mức ±1 ≥ 90%)

---

## ✅ ĐIỀU KIỆN HOÀN THÀNH PHASE 2
- [ ] Bộ hiệu chuẩn đạt chỉ tiêu ở 2.4
- [ ] Mọi version sinh ra ở Phase 1 đều có `computed_level` + `level_metrics`
- [ ] Màn hình/endpoint admin thấy được các bài `needsReview`
