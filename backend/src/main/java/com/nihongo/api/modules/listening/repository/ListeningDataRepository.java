package com.nihongo.api.modules.listening.repository;

import com.nihongo.api.modules.listening.dto.ListeningScenarioDTO.*;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class ListeningDataRepository {

    private final Map<String, ScenarioDetail> scenarioDetails = new LinkedHashMap<>();
    private final List<ScenarioSummary> scenarioSummaries = new ArrayList<>();

    public ListeningDataRepository() {
        initScenarios();
    }

    public List<ScenarioSummary> findAllSummaries() {
        return new ArrayList<>(scenarioSummaries);
    }

    public Optional<ScenarioDetail> findDetailById(String id) {
        return Optional.ofNullable(scenarioDetails.get(id));
    }

    private void initScenarios() {
        // --- 1. SEED N5 SCENARIOS (20 Bài) ---
        seedN5Scenarios();

        // --- 2. SEED N4 SCENARIOS (30 Bài) ---
        seedN4Scenarios();

        // --- 3. SEED N3 SCENARIOS (40 Bài) ---
        seedN3Scenarios();

        // --- 4. SEED N2 SCENARIOS (50 Bài) ---
        seedN2Scenarios();

        // --- 5. SEED N1 SCENARIOS (60 Bài) ---
        seedN1Scenarios();
    }

    // ==========================================
    // 🟢 N5 SEEDING (20 SCENARIOS)
    // ==========================================
    private void seedN5Scenarios() {
        String[][] n5Meta = {
            {"n5-01", "Cửa Hàng Tiện Lợi Konbini: Mua Cơm Nắm & Nước Suối", "コンビニでおにぎりと水を買う", "DINING", "KONBINI", "Tanaka", "Nhân viên thu ngân", "👨‍💼", "Tập nghe câu hỏi hâm nóng cơm nắm và hỏi thẻ tích điểm của nhân viên Konbini."},
            {"n5-02", "Quán Mì Ramen: Chọn Độ Cứng Sợi Mì & Gọi Trứng Lòng Đào", "ラーメン屋で注文する", "DINING", "RAMEN", "Kenji", "Đầu bếp Ramen", "👨‍🍳", "Nghe nhân viên hỏi về độ đậm nước dùng và chọn món ăn kèm."},
            {"n5-03", "Hỏi Đường Đến Ga Shinjuku: Rẽ Trái Hay Đi Thẳng?", "新宿駅への道を聞く", "TRAVEL", "STATION", "Yuki", "Người đi đường", "👩", "Luyện nghe các từ chỉ phương hướng cơ bản: migi (phải), hidari (trái), massugu (thẳng)."},
            {"n5-04", "Tiệm Bánh Mì Tokyo: Hỏi Giá & Mua Bánh Melonpan", "パン屋でメロンパンを買う", "SHOPPING", "CAFE", "Aoi", "Nhân viên tiệm bánh", "👩‍🍳", "Luyện nghe các con số đếm tiền yên và đơn vị đếm cái bánh."},
            {"n5-05", "Quán Cà Phê: Chọn Size Cốc & Lấy Hóa Đơn", "カフェでコーヒーを頼む", "DINING", "CAFE", "Ren", "Barista", "☕", "Nghe câu hỏi chọn cà phê nóng hay đá (Hotto / Aisu) và size cốc."},
            {"n5-06", "Hỏi Giờ Tàu Chạy: Chuyến Tàu Đi Shibuya Mấy Giờ?", "渋谷行きの電車の時間を聞く", "TRAVEL", "STATION", "Sato", "Nhân viên nhà ga", "👮‍♂️", "Luyện nghe giờ và phút: ~ji ~fun."},
            {"n5-07", "Thư Viện Trường Học: Mượn Sách Tiếng Nhật N5", "図書館で本を借りる", "LIFE", "OFFICE", "Yamada Sensei", "Thủ thư", "📚", "Nghe quy định mượn sách trong bao nhiêu ngày."},
            {"n5-08", "Cửa Hàng Quần Áo Uniqlo: Tìm Size Áo Thun", "ユニクロでTシャツを探す", "SHOPPING", "STREET", "Hana", "Nhân viên bán hàng", "🛍️", "Nghe nhân viên giới thiệu các màu sắc và size S/M/L."},
            {"n5-09", "Tiệm Cơm Bò Gyudon Sukiya: Chọn Suất Ăn Kèm Canh Miso", "すき家で牛丼を注文する", "DINING", "RAMEN", "Kenta", "Nhân viên quán cơm", "🍱", "Luyện nghe các từ: namimori (suất thường), ohmori (suất lớn), setto (suất kèm)."},
            {"n5-10", "Mua Kem Ở Máy Bán Hàng Tự Động: Nhờ Người Đổi Tiền Xu", "自販機で小銭を両替してもらう", "SHOPPING", "STREET", "Takuya", "Bạn cùng lớp", "🍦", "Nghe từ vựng về tiền xu (hyaku-en) và đổi tiền."},
            {"n5-11", "Tự Giới Thiệu Bản Thân: Chào Hỏi Ngày Đầu Tiên Ở Lớp", "教室での自己紹介", "LIFE", "OFFICE", "Suzuki", "Lớp trưởng", "🏫", "Luyện nghe các câu chào hỏi chuẩn mực: Hajimemashite, Douzo yoroshiku."},
            {"n5-12", "Nhờ Chụp Ảnh Ở Công Viên Công Cộng", "公園で写真を撮ってもらう", "LIFE", "STREET", "Emi", "Khách du lịch", "📸", "Nghe các mẫu câu nhờ vả lịch sự: Shashin o totte kudasai."},
            {"n5-13", "Tìm Nhà Vệ Sinh Ở Trung Tâm Thương Mại", "デパートでトイレを探す", "TRAVEL", "STATION", "Mori", "Bảo vệ toà nhà", "🏢", "Nghe chỉ dẫn số tầng và vị trí nhà vệ sinh (otearai)."},
            {"n5-14", "Đi Taxi Về Khách Sạn: Chỉ Địa Chỉ Cho Tài Xế", "タクシーでホテルへ行く", "TRAVEL", "STREET", "Bác Tài Xế", "Lái xe Taxi", "🚖", "Nghe câu hỏi điểm đến và xác nhận dừng xe (koko de tomete kudasai)."},
            {"n5-15", "Hỏi Bạn Cùng Bàn Xem Hôm Nay Là Thứ Mấy", "今日は何曜日か聞く", "LIFE", "OFFICE", "Mai", "Bạn học", "📅", "Luyện nghe các thứ trong tuần: Getsuyoubi đến Nichiyoubi."},
            {"n5-16", "Mua Táo & Chuối Ở Siêu Thị: Hỏi Đồ Giảm Giá", "スーパーで果物を買う", "SHOPPING", "KONBINI", "Obasan", "Chủ sạp hoa quả", "🍎", "Nghe các từ chỉ độ tươi ngon và từ giảm giá han-gaku (nửa giá)."},
            {"n5-17", "Chúc Mừng Sinh Nhật Bạn & Tặng Hộp Bánh", "友達の誕生日を祝う", "LIFE", "CAFE", "Shin", "Bạn thân", "🎂", "Nghe câu chúc Otanjoubi omedetou và đáp lại Arigatou."},
            {"n5-18", "Mượn Cây Dù Khi Trời Bất Chợt Đổ Mưa", "雨の日に傘を借りる", "LIFE", "OFFICE", "Kobayashi", "Đồng nghiệp", "☂️", "Nghe câu hỏi về thời tiết Ame (mưa) và mượn ô."},
            {"n5-19", "Hỏi Mật Khẩu Wifi Tại Quán Trà Sữa", "カフェでWi-Fiのパスワードを聞く", "LIFE", "CAFE", "Nana", "Nhân viên quán", "📶", "Luyện nghe bảng chữ cái Romaji và số đếm trong mật khẩu."},
            {"n5-20", "Thanh Toán Tiền Điện Nước Tại Quầy Konbini", "コンビニで公共料金を支払う", "LIFE", "KONBINI", "Matsuda", "Thu ngân Konbini", "🧾", "Nghe nhân viên xác nhận hóa đơn và đóng dấu đã thu tiền."}
        };

        for (int i = 0; i < n5Meta.length; i++) {
            String[] m = n5Meta[i];
            ScenarioSummary summary = ScenarioSummary.builder()
                .id(m[0])
                .title(m[1])
                .titleJp(m[2])
                .level("N5")
                .category(m[3])
                .durationMin(3)
                .difficulty("BEGINNER")
                .ambienceType(m[4])
                .characterName(m[5])
                .characterRole(m[6])
                .characterAvatar(m[7])
                .description(m[8])
                .keyVocabCount(6)
                .totalTurns(4)
                .build();

            scenarioSummaries.add(summary);
            scenarioDetails.put(m[0], buildScenarioDetail(summary, "N5"));
        }
    }

    // ==========================================
    // 🟡 N4 SEEDING (30 SCENARIOS)
    // ==========================================
    private void seedN4Scenarios() {
        String[][] n4Meta = {
            {"n4-01", "Mua Vé Tàu Shinkansen Đi Kyoto: Chọn Ghế Toa Chỉ Định", "新幹線の指定席切符を買う", "TRAVEL", "STATION", "Watanabe", "Nhân viên quầy vé", "🚄", "Phân biệt Shiteiseki (ghế chỉ định) và Jiyuseki (ghế tự do)."},
            {"n4-02", "Báo Mất Ví Tại Bốt Cảnh Sát Koban", "交番で落とし物の届出をする", "LIFE", "OFFICE", "Cảnh sát viên", "Cảnh sát Koban", "👮", "Miêu tả màu sắc, hình dáng chiếc ví và giấy tờ bên trong."},
            {"n4-03", "Khám Bệnh Đau Dạ Dày Tại Phòng Khám", "病院で胃の痛みを説明する", "HEALTH", "CLINIC", "Bác sĩ Nakamura", "Bác sĩ nội khoa", "👨‍⚕️", "Trình bày triệu chứng đau từ khi nào và lắng nghe hướng dẫn uống thuốc."},
            {"n4-04", "Gọi Món Tại Quán Nhậu Izakaya Cùng Đồng Nghiệp", "居酒屋で飲み物を注文する", "DINING", "RAMEN", "Shota", "Nhân viên Izakaya", "🍺", "Nghe câu mời Kanpai và gọi các món nhậu Edamame, Yakitori."},
            {"n4-05", "Trả Phòng Khách Sạn Ryokan Truyền Thống", "旅館のチェックアウト", "TRAVEL", "CAFE", "Okami-san", "Chủ quán Ryokan", "👘", "Luyện nghe kính ngữ cảm ơn và thanh toán chi phí phát sinh."},
            {"n4-06", "Xin Nghỉ Ốm Qua Điện Thoại Với Quản Lý", "電話で会社を休む連絡をする", "WORK", "OFFICE", "Buchou Yoshida", "Trưởng phòng", "📱", "Mẫu câu xin nghỉ phép lịch sự: Kyou wa netsu ga atte oyasumi itadakemasen ka."},
            {"n4-07", "Nhờ Bạn Chuyển Đồ Đạc Chuyển Nhà Cuối Tuần", "引越しの手伝いを頼む", "LIFE", "STREET", "Daiki", "Bạn đại học", "📦", "Luyện nghe mẫu câu nhờ vả thể て: Tettsudatte kuremasen ka."},
            {"n4-08", "Mua Thẻ SIM Du Lịch Tại Sân Bay Haneda", "空港で旅行用SIMカードを買う", "TRAVEL", "STATION", "Rina", "Nhân viên viễn thông", "📶", "Luyện nghe về dung lượng GB và thời hạn sử dụng 7 ngày / 30 ngày."},
            {"n4-09", "Hẹn Giờ Gặp Nhau Ở Tượng Chó Hachiko Shibuya", "ハチ公前での待ち合わせ", "LIFE", "STREET", "Kaito", "Bạn thân", "🐕", "Luyện nghe về địa điểm và xác nhận mốc thời gian gặp mặt."},
            {"n4-10", "Đặt Bàn Tiệc Sinh Nhật 4 Người Tại Nhà Hàng Ý", "イタリアンレストランの予約", "DINING", "CAFE", "Maria", "Nhân viên đặt bàn", "🍝", "Nghe xác nhận số người (yonin) và giờ đặt bàn."},
            {"n4-11", "Đăng Ký Thẻ Thành Viên Thư Viện Quận", "区民図書館の利用カードを作る", "LIFE", "OFFICE", "Takahashi", "Nhân viên ủy ban", "🪪", "Nghe hướng dẫn điền phiếu đăng ký và xuất trình thẻ cư trú zairyuu kaado."},
            {"n4-12", "Nhờ Nhân Viên Chỉ Cách Sạc Pin Điện Thoại", "スマホの充電スポットを聞く", "SHOPPING", "KONBINI", "Kato", "Nhân viên", "🔋", "Nghe hướng dẫn thuê pin sạc dự phòng di động Juudenki."},
            {"n4-13", "Mua Thuốc Cảm Ở Hiệu Thuốc Matsumoto Kiyoshi", "ドラッグストアで風邪薬を買う", "HEALTH", "CLINIC", "Dược sĩ Yoko", "Dược sĩ", "💊", "Luyện nghe về triệu chứng ho, sổ mũi và liều lượng uống 1 ngày 3 lần."},
            {"n4-14", "Hỏi Tuyến Xe Buýt Đi Chùa Vàng Kinkaku-ji", "金閣寺行きのバスを聞く", "TRAVEL", "STATION", "Bác lái xe buýt", "Lái xe buýt Kyoto", "🚌", "Luyện nghe số tuyến xe buýt và điểm xuống Basutei."},
            {"n4-15", "Trao Đổi Về Tin Dự Báo Bão Sắp Đổ Bộ", "台風の天気予報について話す", "LIFE", "OFFICE", "Ogawa", "Đồng nghiệp", "🌪️", "Luyện nghe từ vựng thời tiết: Taifuu, Ooame, Kaze ga tsuyoi."},
            {"n4-16", "Rủ Bạn Đi Lễ Hội Pháo Hoa Mùa Hè Hanabi", "花火大会に誘う", "LIFE", "STREET", "Ayumi", "Bạn cùng lớp", "🎆", "Mẫu câu rủ rê ~mashou ka / ~masen ka và mặc áo Yukata."},
            {"n4-17", "Thuê Xe Đạp Công Cộng Tự Động Tại Kyoto", "シェアサイクルの使い方を聞く", "TRAVEL", "STATION", "Tatsuro", "Hướng dẫn viên", "🚲", "Nghe hướng dẫn quét mã QR để mở khóa xe đạp."},
            {"n4-18", "Hỏi Cách Phân Loại Rác Ở Khu Chung Cư", "アパートのゴミの分別ルール", "LIFE", "OFFICE", "Bác Ooya", "Chủ nhà trọ", "🗑️", "Luyện nghe phân biệt rác cháy được (Moeru gomi) và rác tái chế."},
            {"n4-19", "Nhờ Người Thợ Sửa Xe Đạp Bị Thủng Săm", "自転車のパンク修理を頼む", "LIFE", "STREET", "Bác Thợ Sửa Xe", "Chủ tiệm sửa xe", "🔧", "Nghe báo giá sửa xe và thời gian quay lại lấy xe."},
            {"n4-20", "Mua Vé Công Viên Universal Studios Japan (USJ)", "USJの入場チケットを買う", "TRAVEL", "CAFE", "Haruto", "Nhân viên bán vé", "🎢", "Nghe phân biệt vé vào cổng Studio Pass và vé đi nhanh Express Pass."},
            {"n4-21", "Hỏi Địa Chỉ Quán Cà Phê Mèo Nổi Tiếng", "人気の猫カフェの場所を聞く", "LIFE", "CAFE", "Misaki", "Nhân viên thông tin", "🐱", "Nghe giải thích thời gian tính tiền theo giờ và quy tắc chơi với mèo."},
            {"n4-22", "Đi Cắt Tóc Tại Salon Tóc Shibuya", "ヘアサロンで髪を切る", "SHOPPING", "CAFE", "Ken Stylist", "Nhà tạo mẫu tóc", "✂️", "Nghe câu hỏi muốn cắt ngắn bao nhiêu centimet (sukoshi dake / 3cm)."},
            {"n4-23", "Nộp Đơn Xin Gia Hạn Thẻ Cư Trú Tại Cục Xuất Nhập Cảnh", "入国管理局での手続き", "LIFE", "OFFICE", "Cán bộ Nyukan", "Cán bộ hành chính", "🏢", "Nghe gọi số thứ tự và kiểm tra hồ sơ giấy tờ chứng minh thu nhập."},
            {"n4-24", "Mua Áo Mưa & Dù Tiện Lợi Khi Gặp Mưa Bất Chợt", "雨宿りでビニール傘を買う", "SHOPPING", "KONBINI", "Jun", "Thu ngân", "☔", "Luyện nghe kích thước ô 60cm, 65cm và thanh toán."},
            {"n4-25", "Hỏi Cách Sử Dụng Máy Giặt Tiền Xu Coin Laundry", "コインランドリーの使い方", "LIFE", "OFFICE", "Chị hàng xóm", "Cư dân khu phố", "🧺", "Nghe lượng xà phòng tự động và thời gian sấy khô Kansouki 30 phút."},
            {"n4-26", "Tặng Quà Lưu Niệm Omiyage Cho Gia Đình Chủ Nhà", "ホームステイ先にお土産を渡す", "LIFE", "CAFE", "Okaasan", "Mẹ nuôi Homestay", "🎁", "Mẫu câu tặng quà lịch sự: Kore wa watashi no kuni no omiyage desu."},
            {"n4-27", "Đổi Kích Cỡ Giày Thể Thao Tại Cửa Hàng Giày ABC-Mart", "靴屋でサイズ交換をお願いする", "SHOPPING", "STREET", "Sora", "Nhân viên bán giày", "👟", "Luyện nghe số đo centimet giày (26.5cm, 27.0cm)."},
            {"n4-28", "Hỏi Cách Gửi Bưu Phẩm Quốc Tế Về Việt Nam", "郵便局から国際郵便を送る", "LIFE", "OFFICE", "Nhân viên Bưu điện", "Bưu điện Yubinkyoku", "📦", "Phân biệt EMS (Chuyển phát nhanh) và Funabin (Đường biển)."},
            {"n4-29", "Tham Gia Lớp Học Nấu Ăn Món Nhật Cơ Bản", "料理教室で巻き寿司を作る", "LIFE", "CAFE", "Sensei Nấu Ăn", "Giảng viên ẩm thực", "🍣", "Nghe các động từ nấu nướng: kiru (cắt), maku (cuộn), nureru (làm ướt)."},
            {"n4-30", "Thảo Luận Kế Hoạch Đi Leo Núi Phú Sĩ Cuối Tuần", "富士登山の日程を相談する", "TRAVEL", "STREET", "Yuma", "Trưởng nhóm leo núi", "🗻", "Nghe chuẩn bị trang phục ấm, gậy leo núi và đồ ăn năng lượng."}
        };

        for (int i = 0; i < n4Meta.length; i++) {
            String[] m = n4Meta[i];
            ScenarioSummary summary = ScenarioSummary.builder()
                .id(m[0])
                .title(m[1])
                .titleJp(m[2])
                .level("N4")
                .category(m[3])
                .durationMin(4)
                .difficulty("BEGINNER")
                .ambienceType(m[4])
                .characterName(m[5])
                .characterRole(m[6])
                .characterAvatar(m[7])
                .description(m[8])
                .keyVocabCount(8)
                .totalTurns(5)
                .build();

            scenarioSummaries.add(summary);
            scenarioDetails.put(m[0], buildScenarioDetail(summary, "N4"));
        }
    }

    // ==========================================
    // 🟠 N3 SEEDING (40 SCENARIOS)
    // ==========================================
    private void seedN3Scenarios() {
        for (int i = 1; i <= 40; i++) {
            String id = String.format("n3-%02d", i);
            String title = getN3Title(i);
            String titleJp = getN3TitleJp(i);
            String cat = i % 4 == 0 ? "WORK" : (i % 3 == 0 ? "HEALTH" : (i % 2 == 0 ? "TRAVEL" : "LIFE"));
            String amb = i % 3 == 0 ? "OFFICE" : (i % 2 == 0 ? "STATION" : "CAFE");

            ScenarioSummary summary = ScenarioSummary.builder()
                .id(id)
                .title("N3: " + title)
                .titleJp(titleJp)
                .level("N3")
                .category(cat)
                .durationMin(5)
                .difficulty("INTERMEDIATE")
                .ambienceType(amb)
                .characterName("Nhân vật N3-" + i)
                .characterRole("Đối tác / Quản lý / Bác sĩ")
                .characterAvatar("🧑‍💼")
                .description("Luyện nghe hội thoại giao tiếp tự nhiên đời sống & công sở trung cấp N3.")
                .keyVocabCount(10)
                .totalTurns(6)
                .build();

            scenarioSummaries.add(summary);
            scenarioDetails.put(id, buildScenarioDetail(summary, "N3"));
        }
    }

    // ==========================================
    // 🔴 N2 SEEDING (50 SCENARIOS)
    // ==========================================
    private void seedN2Scenarios() {
        for (int i = 1; i <= 50; i++) {
            String id = String.format("n2-%02d", i);
            String title = getN2Title(i);
            String titleJp = getN2TitleJp(i);

            ScenarioSummary summary = ScenarioSummary.builder()
                .id(id)
                .title("N2: " + title)
                .titleJp(titleJp)
                .level("N2")
                .category(i % 2 == 0 ? "WORK" : "LIFE")
                .durationMin(6)
                .difficulty("ADVANCED")
                .ambienceType(i % 2 == 0 ? "OFFICE" : "STREET")
                .characterName("Kính ngữ N2-" + i)
                .characterRole("Trưởng phòng / Khách hàng VIP")
                .characterAvatar("👔")
                .description("Hội thoại thương mại thương thảo, phỏng vấn tuyển dụng và xử lý khủng hoảng N2.")
                .keyVocabCount(12)
                .totalTurns(6)
                .build();

            scenarioSummaries.add(summary);
            scenarioDetails.put(id, buildScenarioDetail(summary, "N2"));
        }
    }

    // ==========================================
    // 🟣 N1 SEEDING (60 SCENARIOS)
    // ==========================================
    private void seedN1Scenarios() {
        for (int i = 1; i <= 60; i++) {
            String id = String.format("n1-%02d", i);
            String title = getN1Title(i);
            String titleJp = getN1TitleJp(i);

            ScenarioSummary summary = ScenarioSummary.builder()
                .id(id)
                .title("N1: " + title)
                .titleJp(titleJp)
                .level("N1")
                .category(i % 3 == 0 ? "WORK" : "LIFE")
                .durationMin(7)
                .difficulty("ADVANCED")
                .ambienceType("OFFICE")
                .characterName("Chuyên gia N1-" + i)
                .characterRole("Giáo sư / Giám đốc điều hành")
                .characterAvatar("🎓")
                .description("Diễn thuyết hội thảo khoa học, phân tích kinh tế chính trị và tranh biện phản biện N1.")
                .keyVocabCount(15)
                .totalTurns(7)
                .build();

            scenarioSummaries.add(summary);
            scenarioDetails.put(id, buildScenarioDetail(summary, "N1"));
        }
    }

    // Helper method to build branching tree for each scenario
    private ScenarioDetail buildScenarioDetail(ScenarioSummary summary, String level) {
        Map<String, DialogueNode> nodes = new LinkedHashMap<>();
        String charName = summary.getCharacterName();

        // Node 1: Greeting & Opening
        DialogueNode node1 = DialogueNode.builder()
            .nodeId("node-1")
            .speaker("NPC")
            .speakerName(charName)
            .japaneseText(getGreetingJp(level, summary.getCategory()))
            .furiganaText(getGreetingFurigana(level, summary.getCategory()))
            .romajiText(getGreetingRomaji(level, summary.getCategory()))
            .vietnameseText(getGreetingVi(level, summary.getCategory()))
            .audioSpeedHint(level.equals("N5") ? "SLOW" : (level.equals("N4") ? "NORMAL" : "FAST"))
            .culturalNote("Người Nhật luôn bắt đầu cuộc trò chuyện bằng lời chào lịch sự và nụ cười nhẹ.")
            .options(Arrays.asList(
                DialogueOption.builder()
                    .optionId("opt-1-1")
                    .japaneseText(getOption1Jp(level))
                    .romajiText(getOption1Romaji(level))
                    .vietnameseText(getOption1Vi(level))
                    .nextNodeId("node-2-polite")
                    .etiquetteRating("PERFECT")
                    .score(100)
                    .feedback("Rất tốt! Bạn dùng đúng chuẩn kính ngữ theo văn hóa Nhật.")
                    .build(),
                DialogueOption.builder()
                    .optionId("opt-1-2")
                    .japaneseText(getOption2Jp(level))
                    .romajiText(getOption2Romaji(level))
                    .vietnameseText(getOption2Vi(level))
                    .nextNodeId("node-2-casual")
                    .etiquetteRating("CASUAL")
                    .score(75)
                    .feedback("Chấp nhận được, nhưng câu nói hơi suồng sã nếu nói với người lạ.")
                    .build()
            ))
            .isEnding(false)
            .build();

        // Node 2 Polite: NPC response with a listening question
        DialogueNode node2Polite = DialogueNode.builder()
            .nodeId("node-2-polite")
            .speaker("NPC")
            .speakerName(charName)
            .japaneseText(getNode2PoliteJp(level, summary.getTitle()))
            .furiganaText(getNode2PoliteFurigana(level, summary.getTitle()))
            .romajiText(getNode2PoliteRomaji(level, summary.getTitle()))
            .vietnameseText(getNode2PoliteVi(level, summary.getTitle()))
            .audioSpeedHint(level.equals("N5") ? "SLOW" : "NORMAL")
            .culturalNote("Chú ý nghe kỹ các con số và thời gian được nhắc tới trong lời thoại.")
            .quiz(ListeningQuiz.builder()
                .quizId("quiz-1")
                .questionJp("相手は何と言いましたか？ (Người nói vừa thông báo điều gì?)")
                .questionVi("Người đối thoại vừa đưa ra thông tin then chốt nào?")
                .options(Arrays.asList(
                    "Đồng ý và hướng dẫn các bước tiếp theo",
                    "Từ chối vì đã hết giờ phục vụ",
                    "Yêu cầu xuất trình thêm hộ chiếu",
                    "Hẹn quay lại vào ngày mai"
                ))
                .correctAnswerIndex(0)
                .explanation("Nhân vật đã phản hồi tích cực và hướng dẫn chi tiết theo yêu cầu của bạn.")
                .build())
            .options(Arrays.asList(
                DialogueOption.builder()
                    .optionId("opt-2-1")
                    .japaneseText(level.equals("N5") ? "はい、おねがいします。" : "かしこまりました。よろしくお願いいたします。")
                    .romajiText(level.equals("N5") ? "Hai, onegaishimasu." : "Kashikomarimashita. Yoroshiku onegai itashimasu.")
                    .vietnameseText("Vâng, xin nhờ bạn / Tôi đã hiểu, xin nhờ quý vị.")
                    .nextNodeId("node-3-finish")
                    .etiquetteRating("PERFECT")
                    .score(100)
                    .feedback("Tuyệt vời! Bạn hoàn thành xuất sắc tình huống giao tiếp.")
                    .build()
            ))
            .isEnding(false)
            .build();

        // Node 2 Casual: NPC response with a mild reaction
        DialogueNode node2Casual = DialogueNode.builder()
            .nodeId("node-2-casual")
            .speaker("NPC")
            .speakerName(charName)
            .japaneseText(level.equals("N5") ? "あ、はい。わかりました。" : "承知いたしました。ではこちらをご覧ください。")
            .furiganaText(level.equals("N5") ? "あ、はい。わかりました。" : "承知[しょうち]いたしました。ではこちらをごらんください。")
            .romajiText(level.equals("N5") ? "A, hai. Wakarimashita." : "Shouchi itashimashita. Dewa kochira o goran kudasai.")
            .vietnameseText("À, vâng. Tôi hiểu rồi. Mời bạn xem bên này.")
            .audioSpeedHint("NORMAL")
            .options(Arrays.asList(
                DialogueOption.builder()
                    .optionId("opt-2-casual-1")
                    .japaneseText(level.equals("N5") ? "ありがとう！" : "ありがとうございます。")
                    .romajiText(level.equals("N5") ? "Arigatou!" : "Arigatou gozaimasu.")
                    .vietnameseText("Cảm ơn nhé! / Xin cảm ơn rất nhiều.")
                    .nextNodeId("node-3-finish")
                    .etiquetteRating("POLITE")
                    .score(85)
                    .feedback("Hoàn thành tình huống.")
                    .build()
            ))
            .isEnding(false)
            .build();

        // Node 3: Ending node
        DialogueNode node3Finish = DialogueNode.builder()
            .nodeId("node-3-finish")
            .speaker("NPC")
            .speakerName(charName)
            .japaneseText(level.equals("N5") ? "どうもありがとうございました！またどうぞ！" : "ご利用いただき、誠にありがとうございました。またのお越しをお待ちしております。")
            .furiganaText(level.equals("N5") ? "どうもありがとうございました！またどうぞ！" : "ご利用[りよう]いただき、誠[まこと]にありがとうございました。またのお越[こ]しをお待[ま]ちしております。")
            .romajiText(level.equals("N5") ? "Doumo arigatou gozaimashita! Mata douzo!" : "Goriyou itadaki, makoto ni arigatou gozaimashita. Mata no okoshi o omachi shite orimasu.")
            .vietnameseText("Cảm ơn quý khách rất nhiều! Hẹn gặp lại quý khách lần sau!")
            .audioSpeedHint("NORMAL")
            .culturalNote("Lời chào kết thúc kinh điển thể hiện lòng hiếu khách Omotenashi của người Nhật.")
            .isEnding(true)
            .endingType("SUCCESS")
            .build();

        nodes.put("node-1", node1);
        nodes.put("node-2-polite", node2Polite);
        nodes.put("node-2-casual", node2Casual);
        nodes.put("node-3-finish", node3Finish);

        List<KeyVocabulary> vocabs = Arrays.asList(
            KeyVocabulary.builder().word("いらっしゃいませ").reading("irasshaimase").meaning("Kính chào quý khách").level(level).build(),
            KeyVocabulary.builder().word("お願いします").reading("onegaishimasu").meaning("Làm ơn / Xin nhờ").level(level).build(),
            KeyVocabulary.builder().word("大丈夫").reading("daijoubu").meaning("Ổn / Không sao").level(level).build()
        );

        List<String> grammar = Arrays.asList(
            "Cấu trúc kính ngữ lịch sự: ~をお願いします (~o onegaishimasu)",
            "Câu xác nhận thông tin: ~ですか (~desu ka)"
        );

        return ScenarioDetail.builder()
            .summary(summary)
            .initialNodeId("node-1")
            .nodes(nodes)
            .keyVocabularies(vocabs)
            .grammarPoints(grammar)
            .build();
    }

    // Helper text generators
    private String getGreetingJp(String level, String category) {
        if (level.equals("N5")) return "いらっしゃいませ！何にしますか？";
        if (level.equals("N4")) return "いらっしゃいませ！本日はどのようなご用件でしょうか？";
        if (level.equals("N3")) return "お待たせいたしました。本日の件についてご説明いたします。";
        if (level.equals("N2")) return "本日はお忙しい中、お時間をいただき誠にありがとうございます。";
        return "平素は格別のご高配を賜り、厚く御礼申し上げます。本日の議題について討議を進めたいと存じます。";
    }

    private String getGreetingFurigana(String level, String category) {
        if (level.equals("N5")) return "いらっしゃいませ！何[なに]にしますか？";
        if (level.equals("N4")) return "いらっしゃいませ！本日[ほんじつ]はどのようなご用件[ようけん]でしょうか？";
        if (level.equals("N3")) return "お待[ま]たせいたしました。本日[ほんじつ]の件[けん]についてご説明[せつめい]いたします。";
        if (level.equals("N2")) return "本日[ほんじつ]はお忙[いそが]しい中[なか]、お時間[じかん]をいただき誠[まこと]にありがとうございます。";
        return "平素[へいそ]は格別[かくべつ]のご高配[こうはい]を賜[たまわ]り、厚[あつ]く御礼[おんれい]申[もう]し上[あ]げます。本日[ほんじつ]の議題[ぎだい]について討議[とうぎ]を進[すす]めたいと存[ぞん]じます。";
    }

    private String getGreetingRomaji(String level, String category) {
        if (level.equals("N5")) return "Irasshaimase! Nani ni shimasu ka?";
        if (level.equals("N4")) return "Irasshaimase! Honjitsu wa dono you na go-youken deshou ka?";
        if (level.equals("N3")) return "Omatase itashimashita. Honjitsu no ken ni tsuite go-setsumei itashimasu.";
        if (level.equals("N2")) return "Honjitsu wa oisogashii naka, ojikan o itadaki makoto ni arigatou gozaimasu.";
        return "Heiso wa kakubetsu no go-kouhai o tamawari, atsuku onrei moushiagemasu.";
    }

    private String getGreetingVi(String level, String category) {
        if (level.equals("N5")) return "Kính chào quý khách! Quý khách muốn dùng gì ạ?";
        if (level.equals("N4")) return "Kính chào quý khách! Hôm nay quý khách cần hỗ trợ việc gì ạ?";
        if (level.equals("N3")) return "Xin lỗi đã để quý vị phải đợi. Tôi xin phép trình bày về nội dung hôm nay.";
        if (level.equals("N2")) return "Rất cảm ơn quý vị đã dành thời gian quý báu trong lúc bận rộn ngày hôm nay.";
        return "Xin chân thành cảm ơn sự hợp tác đặc biệt của quý vị thời gian qua. Tôi xin phép bắt đầu thảo luận nội dung nghị trình.";
    }

    private String getOption1Jp(String level) {
        if (level.equals("N5")) return "これをお願いします。いくらですか？";
        if (level.equals("N4")) return "こちらをお願いしたいのですが、よろしいでしょうか？";
        if (level.equals("N3")) return "ぜひ詳細を伺いたいと存じます。よろしくお願いします。";
        if (level.equals("N2")) return "恐れ入りますが、企画書の概要からご説明いただけますでしょうか。";
        return "本件の背景と市場への影響について、ご見解をお聞かせ願えますでしょうか。";
    }

    private String getOption1Romaji(String level) {
        if (level.equals("N5")) return "Kore o onegaishimasu. Ikura desu ka?";
        if (level.equals("N4")) return "Kochira o onegai shitai no desu ga, yoroshii deshou ka?";
        if (level.equals("N3")) return "Zehi shousai o ukagaitai to zonjimasu. Yoroshiku onegaishimasu.";
        if (level.equals("N2")) return "Osoreirimasu ga, kikakusho no gaiyou kara go-setsumei itadakemasu deshou ka.";
        return "Honken no haikei to shijou e no eikyou ni tsuite, go-kenkai o okikase nagaemasu deshou ka.";
    }

    private String getOption1Vi(String level) {
        if (level.equals("N5")) return "Làm ơn cho tôi cái này. Hết bao nhiêu tiền ạ?";
        if (level.equals("N4")) return "Tôi muốn nhờ cái này, có được không ạ?";
        if (level.equals("N3")) return "Tôi rất mong muốn được nghe chi tiết. Xin nhờ anh/chị.";
        if (level.equals("N2")) return "Xin phép cho hỏi anh/chị có thể trình bày từ phần tổng quan bản kế hoạch không ạ?";
        return "Xin vui lòng cho chúng tôi được lắng nghe quan điểm của quý vị về bối cảnh và tác động thị trường.";
    }

    private String getOption2Jp(String level) {
        if (level.equals("N5")) return "これ、ちょうだい！";
        if (level.equals("N4")) return "これ、頼んでいい？";
        if (level.equals("N3")) return "内容を教えてください。";
        if (level.equals("N2")) return "資料を見せてくれますか？";
        return "結論から話してください。";
    }

    private String getOption2Romaji(String level) {
        if (level.equals("N5")) return "Kore, choudai!";
        if (level.equals("N4")) return "Kore, tanonde ii?";
        if (level.equals("N3")) return "Naiyou o oshiete kudasai.";
        if (level.equals("N2")) return "Shiryou o misete kuremasu ka?";
        return "Ketsuron kara hanashite kudasai.";
    }

    private String getOption2Vi(String level) {
        if (level.equals("N5")) return "Lấy cho tôi cái này đi!";
        if (level.equals("N4")) return "Tôi gọi món này được không?";
        if (level.equals("N3")) return "Hãy chỉ cho tôi nội dung đi.";
        if (level.equals("N2")) return "Cho tôi xem tài liệu được không?";
        return "Hãy nói thẳng từ phần kết luận đi.";
    }

    private String getNode2PoliteJp(String level, String title) {
        if (level.equals("N5")) return "はい、かしこまりました！全部で500円になります。";
        if (level.equals("N4")) return "かしこまりました！それでは確認させていただきます。合計で1200円です。";
        if (level.equals("N3")) return "承知いたしました。では、こちらの資料に沿ってご案内申し上げます。";
        if (level.equals("N2")) return "ご指摘ありがとうございます。それでは要点を絞ってご説明いたします。";
        return "的確なご指摘、誠に恐縮でございます。市場動向を踏まえた多角的な分析結果をご報告申し上げます。";
    }

    private String getNode2PoliteFurigana(String level, String title) {
        if (level.equals("N5")) return "はい、かしこまりました！全部[ぜんぶ]で500円[えん]になります。";
        if (level.equals("N4")) return "かしこまりました！それでは確認[かくにん]させていただきます。合計[ごうけい]で1200円[えん]です。";
        if (level.equals("N3")) return "承知[しょうち]いたしました。では、こちらの資料[しりょう]に沿[そ]ってご案内[あんない]申[もう]し上[あ]げます。";
        if (level.equals("N2")) return "ご指摘[してき]ありがとうございます。それでは要点[ようてん]を絞[しぼ]ってご説明[せつめい]いたします。";
        return "的確[てきかく]なご指摘[してき]、誠[まこと]に恐縮[きょうしゅく]でございます。市場動向[しじょうどうこう]を踏[ふ]まえた多角的[たかくてき]な分析結果[ぶんせきけっか]をご報告[ほうこく]申[もう]し上[あ]げます。";
    }

    private String getNode2PoliteRomaji(String level, String title) {
        if (level.equals("N5")) return "Hai, kashikomarimashita! Zenbu de gohyaku-en ni narimasu.";
        if (level.equals("N4")) return "Kashikomarimashita! Sore dewa kakunin sasete itadakimasu. Goukei de sen ni-hyaku-en desu.";
        if (level.equals("N3")) return "Shouchi itashimashita. Dewa, kochira no shiryou ni sotte go-annai moushiagemasu.";
        if (level.equals("N2")) return "Go-shiteki arigatou gozaimasu. Sore dewa youten o shibotte go-setsumei itashimasu.";
        return "Tekikaku na go-shiteki, makoto ni kyoushuku de gozaimasu. Shijou doukou o fumaeta takakuteki na bunseki kekka o go-houkoku moushiagemasu.";
    }

    private String getNode2PoliteVi(String level, String title) {
        if (level.equals("N5")) return "Vâng, tôi hiểu rồi! Tổng cộng hết 500 yên ạ.";
        if (level.equals("N4")) return "Tôi đã hiểu! Xin phép cho tôi xác nhận lại. Tổng cộng là 1200 yên ạ.";
        if (level.equals("N3")) return "Tôi hiểu rồi. Vậy xin phép được hướng dẫn dựa theo tài liệu này.";
        if (level.equals("N2")) return "Cảm ơn đóng góp ý kiến của quý vị. Tôi xin phép tóm lược các điểm chính.";
        return "Rất cảm kích trước nhận định xác đáng của quý vị. Tôi xin báo cáo kết quả phân tích đa chiều dựa trên biến động thị trường.";
    }

    private String getN3Title(int i) {
        String[] titles = {
            "Phỏng Vấn Xin Việc Arubaito Tại Quán Cà Phê", "Đặt Phòng Khách Sạn Có Suất Ăn Sáng Kèm Suối Nước Nóng",
            "Báo Cáo Tiến Độ Dự Án Với Quản Lý Người Nhật", "Thuê Căn Hộ Với Trung Tâm Môi Giới Bất Động Sản",
            "Khám Chuyên Khoa Mắt & Đo Thị Lực", "Nghe Thông Báo Tàu Điện Hoãn Do Bão Tuyết",
            "Đăng Ký Dịch Vụ Internet Cáp Quang Tại Nhà", "Tham Quan Bảo Tàng Nghệ Thuật Có Hướng Dẫn Viên",
            "Phàn Nàn Về Tiếng Ồn Của Phòng Hàng Xóm", "Đổi Trả Hàng Mua Bị Lỗi Tại Trung Tâm Điện Máy",
            "Hỏi Thủ Tục Mở Tài Khoản Ngân Hàng Yucho", "Thương Lượng Thời Gian Giao Hàng Với Nhà Cung Cấp",
            "Đăng Ký Tham Gia Hoạt Động Tình Nguyện Địa Phương", "Xin Ý Kiến Đóng Góp Về Bản Thiết Kế Sản Phẩm",
            "Đặt Lịch Khám Răng Định Kỳ Tại Nha Khoa", "Nghe Dự Báo Động Đất & Hướng Dẫn Sơ Tán Khẩn Cấp",
            "Hỏi Cách Gia Hạn Hợp Đồng Thuê Nhà Trọ", "Mua Bảo Hiểm Du Lịch Quốc Tế Cho Chuyến Đi Công Tác",
            "Thảo Luận Đổi Ca Làm Việc Với Bạn Cùng Nhóm", "Góp Ý Cải Thiện Môi Trường Làm Việc Tại Xưởng",
            "Hỏi Cách Đăng Ký Lớp Học Bằng Lái Xe Ô Tô", "Trao Đổi Về Chi Phí Bảo Dưỡng Xe Định Kỳ",
            "Tham Gia Hội Thảo Định Hướng Du Học Sinh", "Nhờ Thầy Cô Viết Thư Giới Thiệu Học Bổng",
            "Hỏi Cách Sử Dụng Ứng Dụng Thanh Toán Không Tiền Mặt", "Báo Cáo Sự Cố Mất Điện Cục Bộ Tại Khu Dân Cư",
            "Đặt Vé Máy Bay Khứ Hồi Đi Hokkaido Mùa Đông", "Hỏi Quy Trình Nhận Lại Hành Lý Thất Lạc Ở Sân Bay",
            "Thảo Luận Kế Hoạch Tổ Chức Lễ Hội Văn Hóa Trường", "Hỏi Ý Kiến Khách Hàng Về Dịch Vụ Nhà Hàng",
            "Đăng Ký Tham Gia Câu Lạc Bộ Kendo Truyền Thống", "Trao Đổi Về Phong Tục Tặng Quà Dịp Tết Ochugen",
            "Hỏi Thủ Tục Khai Báo Thuế Thu Nhập Cá Nhân", "Nhờ Hàng Xóm Nhận Hộ Bưu Phẩm Khi Đi Vắng",
            "Hỏi Cách Mua Vé Xem Buổi Biểu Diễn Ca Nhạc J-Pop", "Trao Đổi Về Lộ Trình Luyện Thi Đỗ JLPT N3",
            "Hỏi Thực Đơn Dành Cho Người Ăn Chay Tại Nhà Hàng", "Tham Gia Buổi Giao Lưu Ngôn Ngữ Việt - Nhật",
            "Hỏi Cách Làm Thủ Tục Đăng Ký Kết Hôn Tại Quận", "Tổng Kết Đánh Giá Sau Chuyến Dã Ngoại Công Ty"
        };
        return (i - 1 < titles.length) ? titles[i - 1] : ("Hội Thoại N3 Tình Huống Đời Sống #" + i);
    }

    private String getN3TitleJp(int i) {
        return "N3 実用会話シチュエーション第" + i + "課";
    }

    private String getN2Title(int i) {
        String[] titles = {
            "Thuyết Trình Kế Hoạch Marketing Mở Rộng Thị Trường Đông Nam Á", "Đàm Phán Hợp Đồng Cung Ứng Linh Kiện Điện Tử",
            "Xử Lý Khiếu Nại Của Khách Hàng VIP Về Sự Cố Hệ Thống", "Phỏng Vấn Tuyển Dụng Vị Trí Kỹ Sư Cầu Nối BrSE",
            "Thảo Luận Chính Sách Làm Việc Linh Hoạt Từ Xa (Remote Work)", "Báo Cáo Phân Tích Xu Hướng Tiêu Dùng Thế Hệ Trẻ Nhật Bản",
            "Hội Nghị Ban Giám Đốc Về Tối Ưu Hóa Chi Phí Vận Hành", "Thương Thảo Gia Hạn Bản Quyền Phần Mềm Độc Quyền",
            "Phân Tích Báo Cáo Tài Chính Quý 3 Cùng Kế Toán Trưởng", "Giải Trình Biện Pháp Khắc Phục Lỗi Bảo Mật Máy Chủ",
            "Đàm Phán Tỷ Lệ Chiết Khấu Với Chuỗi Đại Lý Bán Lẻ", "Thảo Luận Chiến Lược Tuyển Dụng Nhân Sự Chất Lượng Cao",
            "Thuyết Phục Đối Tác Đầu Tư Vào Dự Án Công Nghệ Xanh", "Hội Thảo Đánh Giá Rủi Ro Tín Dụng Ngân Hàng",
            "Báo Cáo Khảo Sát Mức Độ Hài Lòng Của Người Dùng (CSAT)", "Thương Lượng Bồi Thường Hợp Đồng Chậm Tiến Độ",
            "Phỏng Vấn Vòng Cuối Cùng Với Giám Đốc Nhân Sự (HRD)", "Thảo Luận Phương Án Chuyển Đổi Số Doanh Nghiệp (DX)",
            "Đánh Giá Hiệu Quả Chiến Dịch Quảng Cáo Trên Mạng Xã Hội", "Thuyết Trình Ý Tưởng Cải Tiến Quy Trình Sản Xuất Kaizen",
            "Họp Giao Ban Khẩn Cấp Ứng Phó Với Biến Động Tỷ Giá Yên", "Đàm Phán Điều Khoản Bảo Mật Thông Tin (NDA)",
            "Thảo Luận Kế Hoạch Đào Tạo Nội Bộ Cho Nhân Viên Mới", "Báo Cáo Nghiên Cứu Khả Thi Dự Án Năng Lượng Tái Tạo",
            "Phỏng Vấn Báo Chí Về Thành Tựu Công Nghệ Mới Của Công Ty"
        };
        return (i - 1 < titles.length) ? titles[i - 1] : ("Hội Thoại N2 Kính Ngữ Doanh Nghiệp #" + i);
    }

    private String getN2TitleJp(int i) {
        return "N2 ビジネス敬語・折衝コミュニケーション第" + i + "課";
    }

    private String getN1Title(int i) {
        String[] titles = {
            "Tranh Biện Chính Sách Tiền Tệ Của Ngân Hàng Trung Ương Nhật Bản (BOJ)", "Phân Tích Biến Động Chuỗi Cung Ứng Bán Dẫn Toàn Cầu",
            "Diễn Thuyết Tại Hội Thảo Khoa Học Trí Tuệ Nhân Tạo & Đạo Đức AI", "Bình Luận Văn Học Cổ Điển Nhật Bản & Giá Trị Thẩm Mỹ Wabi-Sabi",
            "Hội Thảo Pháp Lý Về Quyền Riêng Tư Dữ Liệu & Luật Bảo Vệ Thông Tin", "Phân Tích Tác Động Của Già Hóa Dân Số Đến Quỹ An Sinh Xã Hội",
            "Thảo Luận Triết Học Về Tự Do Ý Chí Trong Thời Đại Số Hóa", "Đánh Giá Xu Hướng Địa Chính Trị Khu Vực Châu Á - Thái Bình Dương",
            "Báo Cáo Chuyên Sâu Về Công Nghệ Năng Lượng Nhiệt Hạch Tương Lai", "Bình Luận Về Sự Tiến Hóa Của Ngôn Ngữ Học Nhật Bản Đương Đại",
            "Hội Nghị Bàn Tròn Về Chuyển Dịch Cơ Cấu Năng Lượng Không Phát Thải", "Phân Tích Tâm Lý Học Hành Vi Trong Thị Trường Chứng Khoán",
            "Thuyết Trình Đề Tài Nghiên Cứu Công Nghệ Sinh Học Tế Bào Gốc iPS", "Tranh Luận Về Mô Hình Kinh Tế Tuần Hoàn & Phát Triển Bền Vững (SDGs)",
            "Phê Bình Điện Ảnh & Nghệ Thuật Sân Khấu Kịch Kabuki Hiện Đại"
        };
        return (i - 1 < titles.length) ? titles[i - 1] : ("N1 学術論議・時事評論ディスカッション第" + i + "課");
    }

    private String getN1TitleJp(int i) {
        return "N1 高度論理的思考・時事討論第" + i + "課";
    }
}
