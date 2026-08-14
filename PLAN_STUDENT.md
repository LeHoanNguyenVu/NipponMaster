# 🎓 Kế Hoạch Triển Khai: Role STUDENT (Học Viên)

Tài liệu chi tiết quản lý toàn bộ lộ trình học tập, thuật toán chẩn đoán trình độ, công cụ luyện tập AI, gamification và định hướng **tương lai dài hạn (Sprint 6 đến 25+)** dành cho người dùng **Student (Học viên)**.

---

## 📊 1. Hiện Trạng Codebase (Current Audit Status)

### Frontend Screens Đã Có:
- [OnboardingScreen.tsx](file:///d:/Japanese%20Project/frontend/src/screens/OnboardingScreen.tsx) — Luồng đo trình độ đầu vào & chốt mục tiêu JLPT (N5-N1).
- [PlacementResultView.tsx](file:///d:/Japanese%20Project/frontend/src/components/onboarding/PlacementResultView.tsx) — Bảng phân tích chẩn đoán lỗi sai, gợi ý level học & gợi ý đo lại năng lực.
- [BeginnerCourseHub.tsx](file:///d:/Japanese%20Project/frontend/src/screens/BeginnerCourseHub.tsx) — Phân hệ Sách Giáo Khoa Nhập Môn (Sprint 7):
  - [AlphabetExplorer.tsx](file:///d:/Japanese%20Project/frontend/src/screens/AlphabetExplorer.tsx) (Chương 1: 104+ Kana, Luyện viết Canvas AI, Audio speech).
  - [NumbersAndTime.tsx](file:///d:/Japanese%20Project/frontend/src/screens/beginner/NumbersAndTime.tsx) (Chương 2: Số 1-10.000, 8 đơn vị đếm kèm Bảng Biến Âm 1-10, Giờ/Phút/Thứ).
  - [AisatsuPhrases.tsx](file:///d:/Japanese%20Project/frontend/src/screens/beginner/AisatsuPhrases.tsx) (Chương 3: Câu chào hỏi theo ngữ cảnh, Đại từ xưng hô, Hậu tố kính ngữ).
- [Vocabulary.tsx](file:///d:/Japanese%20Project/frontend/src/screens/Vocabulary.tsx) — Thư viện từ vựng N5-N1 (Lọc theo cấp độ, nghe âm thanh, bài tập).
- [Kanji.tsx](file:///d:/Japanese%20Project/frontend/src/screens/Kanji.tsx) — Học Hán tự Kanji N5-N1 (Bộ thủ, âm On/Kun, ví dụ ghép).
- [KanjiCanvasStudio.tsx](file:///d:/Japanese%20Project/frontend/src/screens/KanjiCanvasStudio.tsx) & [KanjiInteractiveCanvas.tsx](file:///d:/Japanese%20Project/frontend/src/components/KanjiInteractiveCanvas.tsx) — Studio luyện viết Kanji trên canvas nét vẽ, tích hợp AI nhận diện OCR & chấm điểm thứ tự nét.
- [Grammar.tsx](file:///d:/Japanese%20Project/frontend/src/screens/Grammar.tsx) — Thư viện Ngữ pháp (Cấu trúc, ý nghĩa, ví dụ phân tích, bài tập điền từ).
- [Flashcards.tsx](file:///d:/Japanese%20Project/frontend/src/screens/Flashcards.tsx) — Thẻ lật thông minh chuẩn thuật toán lặp lại ngắt quãng SM-2 (SuperMemo-2).
- [Exams.tsx](file:///d:/Japanese%20Project/frontend/src/screens/Exams.tsx) — Hệ thống thi thử JLPT chuẩn cấu trúc (Vocab, Grammar, Reading, Listening) có đồng hồ đếm ngược.
- [SpeakingStudio.tsx](file:///d:/Japanese%20Project/frontend/src/screens/SpeakingStudio.tsx) — Phòng luyện nói tiếng Nhật giao tiếp AI.
- [Translation.tsx](file:///d:/Japanese%20Project/frontend/src/screens/Translation.tsx) — Công cụ dịch thuật & phân tích cấu trúc câu tiếng Nhật.
- [DashboardStudent.tsx](file:///d:/Japanese%20Project/frontend/src/screens/DashboardStudent.tsx) — Trang chủ học viên: Thống kê streak, mục tiêu hàng ngày, tiến độ khoá học.

### Backend APIs Đã Có:
- `POST /api/v1/placement-test/submit` — Nộp bài Placement Test, tính điểm % từng phần (VOCAB, GRAMMAR, READING), nhận xét chẩn đoán.
- `POST /api/v1/onboarding/confirm-level` — Chốt trình độ JLPT học viên (`onboardingCompleted = true`).
- `GET /api/v1/vocabulary/search`, `GET /api/v1/kanjis/search`, `GET /api/v1/grammar/search` — Tra cứu bài học.
- `POST /api/v1/kanjis/canvas/evaluate`, `POST /api/v1/kanjis/canvas/recognize` — AI chấm nét vẽ Hán tự & OCR.
- `GET /api/v1/flashcards/study-session`, `POST /api/v1/flashcards/review` — Thuật toán SM-2 lặp lại ngắt quãng.

---

## 🏃 2. Lộ Trình Sprints & Tasks Chi Tiết (Từ Hiện Tại Đến Tương Lai Dài Hạn)

### 📍 GIAI ĐOẠN 1: NỀN TẢNG HỌC TẬP & ĐẦU VÀO (Sprints 6 - 7) — [ĐÃ HOÀN THÀNH ✅]

#### [x] **Task 6.1: Thuật Toán Phân Tích Chẩn Đoán Placement Test (Diagnostic Engine)**
- **Mô tả**: Phân tích % câu đúng từng kỹ năng. Thi N5 đạt <40% ➔ Tự động đề xuất "Học lại từ cơ bản Nhập môn".

#### [x] **Task 7.1 - 7.3: Phân Hệ Sách Giáo Khoa Nhập Môn (Chương 1, 2, 3)**
- **Mô tả**: Bảng chữ cái Kana (Luyện viết AI), Số đếm & Đơn vị đếm (Bảng Biến Âm 1-10), Chào hỏi & Xưng hô văn hóa kèm Bài test ôn tập cuối chương.

#### [x] **Task 7.4: Chương 4 — 50+ Bộ Thủ Kanji Tượng Hình Nền Tảng (Essential Kanji Radicals)** — [ĐÃ HOÀN THÀNH ✅]
- **Mô tả**: Thư viện 35+ bộ thủ tượng hình N5/N4 với phương pháp 4 bước (Quan sát Tượng hình ➔ Giải thích Nghĩa đa chiều ➔ Luyện viết Canvas AI ➔ Mẹo nhớ & Ghép chữ Hán).

#### [x] **Task 7.5: Chương 5 — Cấu Trúc Câu, Thì Ngữ Pháp & Lễ Tốt Nghiệp Nhập Môn** — [ĐÃ HOÀN THÀNH ✅]
- **Mô tả**: Mẫu câu `N1 は N2 です`, từ chỉ định, bảng thì Hiện tại ↔ Quá khứ & Bài Thi Tốt Nghiệp Nhập Môn 20 câu tổng hợp (Trao Bằng Chứng Nhận Tốt Nghiệp Nhập Môn).

#### 💡 **[GHI CHÚ TỐI ƯU UX/UI — ĐÃ HOÀN THÀNH ✅]**:
- [x] **1. Âm Thanh Hiệu Ứng (Web Audio SFX Engine)**: `audioSfx.ts` — Chuông *Ding! ✨* khi trả lời đúng, *Bzz* khi sai, *Tada! 🎉* hòa tấu tốt nghiệp, *Tick* đếm ngược battle, *Victory/Defeat* thắng/thua.
- [x] **2. Bộ Lọc Phân Loại Bộ Thủ Theo Chủ Đề**: Filter Pills Category trong Chương 4 (`[🔍 Tất cả]`, `[🌿 Tự nhiên (7)]`, `[👤 Con người & Cơ thể (3)]`, `[🏠 Đồ vật & Xây dựng]`).
- [x] **3. Tải Bằng Tốt Nghiệp Dạng Ảnh (.PNG)**: Nút "📥 Tải Bằng Chứng Nhận (.PNG)" trên Modal Tốt Nghiệp, tạo ảnh Canvas API chất lượng cao tải về máy.

---

### 📍 GIAI ĐOẠN 2: THÁCH ĐẤU REAL-TIME & GAMIFICATION (Sprint 8) — [ĐÃ HOÀN THÀNH ✅]

#### [x] **Task 8.1: Đấu Trường Thách Đấu Trắc Nghiệm Real-time 1v1 (JLPT Battle Arena)** — [ĐÃ HOÀN THÀNH ✅]
- **Mô tả**: Đấu đối kháng trắc nghiệm 10 câu trực tiếp. AI Bot Fallback ghép cặp tự động sau 3s nếu không có đối thủ thực.
- **Công nghệ**: React State Machine 3 phases (Lobby → Battle → Result), Web Audio SFX, localStorage Elo persistence.
- **Tính năng triển khai**:
  - 30 câu hỏi pool (N5-N4: Vocab, Kanji, Grammar, Numbers).
  - 5 AI Bot đối thủ theo trình độ (Sora AI, Kenji Bot, Yuki Chan, Sensei AI, Sakura Master).
  - Hệ thống Elo Rank 5 cấp (🥉 Đồng → 🥈 Bạc → 🥇 Vàng → 💎 Bạch Kim → 👑 Kim Cương).
  - Đếm ngược 10s/câu, tính điểm tốc độ (Base 100 + Speed Bonus 50), SFX Victory/Defeat.
  - Màn hình kết quả chi tiết 10 câu & cộng/trừ Elo + Coins thưởng.

#### [x] **Task 8.2: Nhiệm Vụ Hàng Ngày, Huy Hiệu & Cửa Hàng Theme (Quests & Theme Shop)** — [ĐÃ HOÀN THÀNH ✅]
- **Mô tả**: Daily Quests + Achievement Badges + Multi-Theme Shop Engine.
- **Tính năng triển khai**:
  - 5 Daily Quests (Lật Flashcards, Bài thi, Thắng 1v1, Viết Kanji, Streak) + Progress bars + Claim rewards.
  - 6 Achievement Badges (Vua Từ Vựng, Cao Thủ Kanji, Chiến Thần 1v1, Streak 7 Ngày...).
  - 5 Theme skins: 📜 Default, 🌸 Sakura Pink (500 Coins), 🏙️ Cyberpunk Tokyo (1000 Coins), ⛩️ Washi Gold (1500 Coins), 🌙 Dark OLED (300 Coins).
  - Theme Engine dùng Zustand + CSS Variables override toàn cục + localStorage persistence.

---

### 📍 GIAI ĐOẠN 3: AI ADVANCED SPEAKING & READING ASSISTANT (Sprint 17) — [ĐÃ HOÀN THÀNH ✅]

#### [x] **Task 17.1: Studio Phản Xạ Nói Theo Băng AI (AI Pitch Accent & Rhythm Shadowing Studio)** — [ĐÃ HOÀN THÀNH ✅]
- **Mô tả**: Giao diện `ShadowingStudio.tsx` — Học viên nghe câu mẫu tiếng Nhật bản xứ ➔ Bấm ghi âm đọc theo (Shadowing) ➔ AI phân tích sóng âm (Waveform), chấm điểm nhịp điệu và đồ thị cao độ pitch accent (Atamadaka, Nakadaka, Odaka, Heiban), tô đỏ từ bị đọc sai trọng âm.
- **Công nghệ**: Web Audio API, Canvas Graphic Pitch Contour, Syllable Analyzer, Spring Boot AI Speaking Controller.

#### [x] **Task 17.2: Phân Tích Cú Pháp Bài Đọc JLPT Tự Động (AI Sentence Breakdown Studio)** — [ĐÃ HOÀN THÀNH ✅]
- **Mô tả**: Giao diện `SentenceBreakdownStudio.tsx` — Phân tích cú pháp bài đọc JLPT Reading N5-N1: Tách Chủ ngữ (Xanh), Vị ngữ (Đỏ), Bổ ngữ/Trợ từ (Vàng), tự động chèn Furigana trên đầu chữ Kanji và Popover Tooltip tra cứu khi rê chuột (Hover).
- **Công nghệ**: React Ruby Furigana Annotator, Syntax Tokenizer, Spring Boot AI Reading Controller.

#### [ ] **Task 18.1: Phòng Luyện Nghe Tình Huống Thực Tế (Immersive Interactive Listening Room)**
- **Mô tả**: Mô phỏng các tình huống thực tế tại Nhật (Gọi món ở nhà hàng, Mua vé ở ga tàu, Phỏng vấn xin việc, Bệnh viện) với âm thanh môi trường xung quanh (Background Ambience). Học viên nghe và tương tác chọn hành động/câu đáp lại phù hợp.
- **Công nghệ**: Web Audio Spatial Panning, Branching Interactive Dialogue Tree.

---

### 📍 GIAI ĐOẠN 4: TRỢ LÝ AI CÁ NHÂN HÓA & ĐỔI THƯỞNG TOÀN CẦU (Sprints 21 - 25) — [DÀI HẠN 🚀]

#### [ ] **Task 21.1: Trợ Lý Gia Sư AI 24/7 (AI Personal Japanese Tutor Coach)**
- **Mô tả**: Chatbot gia sư AI xuất hiện ở mọi màn hình bài học, sẵn sàng giải đáp thắc mắc "Tại sao câu này chọn đáp án B?", phân biệt ngữ pháp tương tự (vd: ~てから vs ~あとで), tự động tạo bài tập củng cố dựa trên điểm yếu của học viên.
- **Công nghệ**: LangChain / LlamaIndex RAG (Retrieval-Augmented Generation) trên dữ liệu JLPT N5-N1.

#### [ ] **Task 22.1: Chợ Đổi Thưởng Quà Thật & Bảng Xếp Hạng Hàng Tuần (Global Leaderboard & Gift Marketplace)**
- **Mô tả**: Bảng xếp hạng học viên chăm chỉ toàn quốc hàng tuần. Học viên dùng Coins tích lũy từ bài học để đổi quà thật: Sách giáo trình JLPT, Móc khóa Nhật Bản, Mã giảm giá khóa học.
- **Công nghệ**: Redis Sorted Sets (`ZADD`/`ZREVRANGE`), Order Fulfillment Service.

#### [ ] **Task 25.1: Báo Cáo Phân Tích Năng Lực Dự Đoán Thi Đỗ JLPT (Predictive JLPT Pass Rate Dashboard)**
- **Mô tả**: Sử dụng Machine Learning để phân tích toàn bộ lịch sử học tập (Flashcards, Exams, Speed, Error rate) ➔ Tính toán tỉ lệ % khả năng đỗ kỳ thi JLPT thật sắp tới (vd: "Dự đoán tỉ lệ đỗ N3: 82.5%").
- **Công nghệ**: Python Scikit-Learn / TensorFlow Microservice, Recharts Analytics.
