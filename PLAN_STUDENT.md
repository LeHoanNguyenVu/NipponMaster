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

#### [ ] **Task 7.4: Chương 4 — 50+ Bộ Thủ Kanji Nền Tảng (Essential Kanji Radicals)** — [NGÀY 26 ⏳]
- **Mô tả**: Thư viện 30-50 bộ thủ xuất hiện nhiều nhất N5/N4 (Nhật 日, Nguyệt 月, Mộc 木, Thủy 水, Hỏa 火...). Mẹo nhớ Kanji qua câu chuyện ghép bộ thủ.

#### [ ] **Task 7.5: Chương 5 — Cấu Trúc Câu & Thì Ngữ Pháp Nhập Môn (Basic Sentence Structure)** — [NGÀY 26 ⏳]
- **Mô tả**: Mẫu câu `N1 は N2 です`, câu hỏi `か`, từ chỉ định (`これ/それ/あれ`), thì hiện tại & quá khứ đơn giản. Bài test tốt nghiệp Nhập Môn.

---

### 📍 GIAI ĐOẠN 2: THÁCH ĐẤU REAL-TIME & GAMIFICATION (Sprint 8) — [NGẮN HẠN ⏳]

#### [ ] **Task 8.1: Đấu Trường Thách Đấu Trắc Nghiệm Real-time 1v1 (JLPT Battle Arena)**
- **Mô tả**: Đấu đối kháng trắc nghiệm 10 câu trực tiếp giữa 2 học viên. Ai trả lời nhanh & đúng hơn sẽ thắng & tăng điểm Elo.
- **Công nghệ**: Spring WebSocket, STOMP protocol, Redis Pub/Sub, React SockJS/STOMP client.
- **Luồng chạy**:
  1. Student bấm "Tìm đối thủ" ➔ Client mở WebSocket `/ws/battle`.
  2. Matchmaking Service ghép 2 người cùng Elo ➔ Tạo phòng `battle-{roomId}`.
  3. Gửi đồng thời từng câu ➔ Đếm ngược 10s ➔ Tính điểm tốc độ + độ chính xác.
  4. Màn hình Knockout/Victory ➔ Cập nhật Rank Elo (Đồng ➔ Bạc ➔ Vàng ➔ Bạch Kim ➔ Kim Cương).

#### [ ] **Task 8.2: Nhiệm Vụ Hàng Ngày, Huy Hiệu & Cửa Hàng Theme (Quests & Theme Shop)**
- **Mô tả**: Daily Quests (Lật 30 Flashcards, làm 1 bài thi, giữ Streak) nhận Coins & EXP. Dùng Coins đổi Theme (Sakura Pink, Cyberpunk Tokyo, Washi Gold).

---

### 📍 GIAI ĐOẠN 3: AI ADVANCED SPEAKING & READING ASSISTANT (Sprints 17 - 18) — [TRUNG HẠN 🔮]

#### [ ] **Task 17.1: Studio Phản Xạ Nói Theo Băng AI (AI Pitch Accent & Rhythm Shadowing Studio)**
- **Mô tả**: Học viên ghi âm phát âm câu tiếng Nhật ➔ AI phân tích sóng âm (Waveform), chấm điểm nhịp điệu (Rhythm) và trọng âm cao độ (Pitch Accent: Atamadaka, Nakadaka, Odaka, Heiban) kèm hình vẽ đồ thị cao độ.
- **Công nghệ**: Web Audio API, Audio Pitch Detection (YIN Algorithm), SpeechRecognition API, Waveform Canvas.
- **Luồng chạy**:
  1. Học viên nghe câu mẫu tiếng Nhật của người bản xứ.
  2. Bấm "Ghi âm" và đọc theo (Shadowing).
  3. AI phân tích đồ thị pitch ➔ So sánh với mẫu ➔ Trả về điểm % tương đồng + tô đỏ từ bị đọc sai trọng âm.

#### [ ] **Task 17.2: Phân Tích Cú Pháp Bài Đọc JLPT Tự Động (AI Sentence Breakdown Studio)**
- **Mô tả**: Khi đọc bài văn JLPT Reading N3-N1 dài, học viên chỉ cần bôi đen câu ➔ AI tự động phân tích ngữ pháp: Tách Chủ ngữ, Vị ngữ, Bổ ngữ, tự động điền Furigana trên đầu chữ Kanji và dịch nghĩa từng cụm khi rê chuột (Hover).
- **Công nghệ**: Kuromoji.js / MeCab Morphological Analyzer, OpenAI GPT-4o Mini API, React Highlighting Annotator.

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
