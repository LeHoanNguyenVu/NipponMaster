package com.nihongo.api.common.config;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.grammar.entity.Grammar;
import com.nihongo.api.modules.grammar.repository.GrammarRepository;
import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.kanji.repository.KanjiRepository;
import com.nihongo.api.modules.placement.entity.PlacementQuestion;
import com.nihongo.api.modules.placement.repository.PlacementQuestionRepository;
import com.nihongo.api.modules.subscription.entity.SubscriptionPlan;
import com.nihongo.api.modules.subscription.repository.SubscriptionPlanRepository;
import com.nihongo.api.modules.vocabulary.entity.Vocabulary;
import com.nihongo.api.modules.vocabulary.repository.VocabularyRepository;
import com.nihongo.api.modules.auth.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;

/**
 * Seed dữ liệu mẫu N5 khi khởi động ứng dụng.
 * Chỉ seed nếu database trống (tránh duplicate khi restart).
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final VocabularyRepository vocabularyRepository;
    private final KanjiRepository kanjiRepository;
    private final GrammarRepository grammarRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;
    private final PlacementQuestionRepository placementQuestionRepository;
    private final SubscriptionPlanRepository subscriptionPlanRepository;

    @Override
    public void run(String... args) {
        try {
            jdbcTemplate.execute("ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check");
            log.info("✅ Dropped check constraint users_role_check on users table");
        } catch (Exception e) {
            log.warn("Could not drop constraint: {}", e.getMessage());
        }
        seedAdminUser();
        seedVocabulary();
        seedKanji();
        seedGrammar();
        seedPlacementQuestions();
        seedSubscriptionPlans();
    }

    private void seedAdminUser() {
        if (!userRepository.existsByEmail("admin@nihongo.com")) {
            User admin = User.builder()
                    .email("admin@nihongo.com")
                    .password(passwordEncoder.encode("admin123"))
                    .fullName("System Admin")
                    .role(User.Role.ADMIN)
                    .isActive(true)
                    .build();
            userRepository.save(admin);
            log.info("✅ Seeded default admin user: admin@nihongo.com / admin123");
        }

        if (!userRepository.existsByEmail("student@nihongo.com")) {
            User student = User.builder()
                    .email("student@nihongo.com")
                    .password(passwordEncoder.encode("student123"))
                    .fullName("Nguyễn Học Viên")
                    .role(User.Role.STUDENT)
                    .isActive(true)
                    .build();
            userRepository.save(student);
            log.info("✅ Seeded default student user: student@nihongo.com / student123");
        }

        if (!userRepository.existsByEmail("teacher@nihongo.com")) {
            User teacher = User.builder()
                    .email("teacher@nihongo.com")
                    .password(passwordEncoder.encode("teacher123"))
                    .fullName("Trần Giảng Viên")
                    .role(User.Role.TEACHER)
                    .isActive(true)
                    .build();
            userRepository.save(teacher);
            log.info("✅ Seeded default teacher user: teacher@nihongo.com / teacher123");
        }

        if (!userRepository.existsByEmail("guest@nihongo.com")) {
            User guest = User.builder()
                    .email("guest@nihongo.com")
                    .password(passwordEncoder.encode("guest123"))
                    .fullName("Lê Khách Tham Quan")
                    .role(User.Role.GUEST)
                    .isActive(true)
                    .build();
            userRepository.save(guest);
            log.info("✅ Seeded default guest user: guest@nihongo.com / guest123");
        }
    }

    private void seedVocabulary() {
        if (vocabularyRepository.count() > 0) {
            log.info("Vocabulary đã có data, bỏ qua seed.");
            return;
        }

        List<Vocabulary> vocabs = List.of(
                vocab("食べる", "たべる", "Ăn", Vocabulary.WordType.VERB, "DAILY_LIFE",
                        "毎日ご飯を食べます。", "Mỗi ngày tôi ăn cơm."),
                vocab("飲む", "のむ", "Uống", Vocabulary.WordType.VERB, "DAILY_LIFE",
                        "水を飲みます。", "Tôi uống nước."),
                vocab("見る", "みる", "Nhìn, xem", Vocabulary.WordType.VERB, "DAILY_LIFE",
                        "テレビを見ます。", "Tôi xem TV."),
                vocab("聞く", "きく", "Nghe, hỏi", Vocabulary.WordType.VERB, "DAILY_LIFE",
                        "音楽を聞きます。", "Tôi nghe nhạc."),
                vocab("読む", "よむ", "Đọc", Vocabulary.WordType.VERB, "DAILY_LIFE",
                        "本を読みます。", "Tôi đọc sách."),
                vocab("書く", "かく", "Viết", Vocabulary.WordType.VERB, "DAILY_LIFE",
                        "手紙を書きます。", "Tôi viết thư."),
                vocab("話す", "はなす", "Nói, nói chuyện", Vocabulary.WordType.VERB, "DAILY_LIFE",
                        "日本語を話します。", "Tôi nói tiếng Nhật."),
                vocab("買う", "かう", "Mua", Vocabulary.WordType.VERB, "SHOPPING",
                        "本を買います。", "Tôi mua sách."),
                vocab("学校", "がっこう", "Trường học", Vocabulary.WordType.NOUN, "EDUCATION",
                        "学校に行きます。", "Tôi đi đến trường."),
                vocab("先生", "せんせい", "Giáo viên, thầy/cô", Vocabulary.WordType.NOUN, "EDUCATION",
                        "先生はやさしいです。", "Thầy/cô rất hiền."),
                vocab("学生", "がくせい", "Học sinh, sinh viên", Vocabulary.WordType.NOUN, "EDUCATION",
                        "私は学生です。", "Tôi là sinh viên."),
                vocab("友達", "ともだち", "Bạn bè", Vocabulary.WordType.NOUN, "DAILY_LIFE",
                        "友達と遊びます。", "Tôi chơi với bạn."),
                vocab("大きい", "おおきい", "To, lớn", Vocabulary.WordType.I_ADJECTIVE, "DAILY_LIFE",
                        "大きい犬がいます。", "Có một con chó to."),
                vocab("小さい", "ちいさい", "Nhỏ, bé", Vocabulary.WordType.I_ADJECTIVE, "DAILY_LIFE",
                        "小さい猫がいます。", "Có một con mèo nhỏ."),
                vocab("新しい", "あたらしい", "Mới", Vocabulary.WordType.I_ADJECTIVE, "DAILY_LIFE",
                        "新しい車を買いました。", "Tôi đã mua xe mới."),
                vocab("古い", "ふるい", "Cũ", Vocabulary.WordType.I_ADJECTIVE, "DAILY_LIFE",
                        "古い家に住んでいます。", "Tôi sống trong ngôi nhà cũ."),
                vocab("きれい", "きれい", "Đẹp, sạch sẽ", Vocabulary.WordType.NA_ADJECTIVE, "DAILY_LIFE",
                        "この花はきれいです。", "Bông hoa này đẹp."),
                vocab("元気", "げんき", "Khỏe mạnh, vui vẻ", Vocabulary.WordType.NA_ADJECTIVE, "DAILY_LIFE",
                        "お元気ですか。", "Bạn có khỏe không?"),
                vocab("今日", "きょう", "Hôm nay", Vocabulary.WordType.NOUN, "TIME",
                        "今日は暑いです。", "Hôm nay trời nóng."),
                vocab("明日", "あした", "Ngày mai", Vocabulary.WordType.NOUN, "TIME",
                        "明日学校に行きます。", "Ngày mai tôi đi học.")
        );

        vocabularyRepository.saveAll(vocabs);
        log.info("✅ Seed {} từ vựng N5 thành công.", vocabs.size());
    }

    private void seedKanji() {
        if (kanjiRepository.count() > 0) {
            log.info("Kanji đã có data, bỏ qua seed.");
            return;
        }

        List<Kanji> kanjis = List.of(
                kanji("日", "ニチ、ジツ", "ひ、か", "Ngày, mặt trời", 4, "日", "日本、毎日、日曜日"),
                kanji("月", "ゲツ、ガツ", "つき", "Tháng, mặt trăng", 4, "月", "月曜日、一月、今月"),
                kanji("火", "カ", "ひ", "Lửa", 4, "火", "火曜日、火事、花火"),
                kanji("水", "スイ", "みず", "Nước", 4, "水", "水曜日、水泳、飲み水"),
                kanji("木", "モク、ボク", "き、こ", "Cây, gỗ", 4, "木", "木曜日、大木、木材"),
                kanji("金", "キン、コン", "かね、かな", "Vàng, tiền", 8, "金", "金曜日、お金、金色"),
                kanji("土", "ド、ト", "つち", "Đất", 3, "土", "土曜日、土地、土木"),
                kanji("山", "サン", "やま", "Núi", 3, "山", "富士山、山田、登山"),
                kanji("川", "セン", "かわ", "Sông", 3, "川", "川口、小川、河川"),
                kanji("人", "ジン、ニン", "ひと", "Người", 2, "人", "日本人、一人、人口"),
                kanji("大", "ダイ、タイ", "おお.きい", "To, lớn", 3, "大", "大学、大きい、大人"),
                kanji("小", "ショウ", "ちい.さい、こ、お", "Nhỏ, bé", 3, "小", "小学校、小さい、小説"),
                kanji("上", "ジョウ", "うえ、あ.げる", "Trên", 3, "一", "上手、以上、上げる"),
                kanji("下", "カ、ゲ", "した、さ.げる", "Dưới", 3, "一", "下手、地下、下げる"),
                kanji("中", "チュウ", "なか", "Trong, giữa", 4, "丨", "中学、中国、中心")
        );

        kanjiRepository.saveAll(kanjis);
        log.info("✅ Seed {} Kanji N5 thành công.", kanjis.size());
    }

    private void seedGrammar() {
        if (grammarRepository.count() > 0) {
            log.info("Grammar đã có data, bỏ qua seed.");
            return;
        }

        List<Grammar> grammars = List.of(
                grammar("～は～です", "N は N です", "A là B (khẳng định)",
                        "私は学生です。", "Tôi là sinh viên.",
                        "Cấu trúc cơ bản nhất trong tiếng Nhật. は là trợ từ chủ đề (đọc là 'wa')."),
                grammar("～は～じゃないです", "N は N じゃないです", "A không phải là B (phủ định)",
                        "私は先生じゃないです。", "Tôi không phải là giáo viên.",
                        "Dạng lịch sự hơn: ～ではありません"),
                grammar("～は～ですか", "N は N ですか", "A có phải là B không? (câu hỏi)",
                        "あなたは学生ですか。", "Bạn có phải là sinh viên không?",
                        "Thêm か vào cuối câu để tạo câu hỏi."),
                grammar("～を～ます", "N を V-ます", "Làm gì (với trợ từ tân ngữ を)",
                        "ご飯を食べます。", "Tôi ăn cơm.",
                        "を đánh dấu tân ngữ trực tiếp (đọc là 'o')."),
                grammar("～に行きます", "場所 に 行きます/来ます/帰ります", "Đi đến / Đến / Về (nơi nào đó)",
                        "学校に行きます。", "Tôi đi đến trường.",
                        "に chỉ đích đến của chuyển động."),
                grammar("～で～ます", "場所 で V-ます", "Làm gì ở đâu (trợ từ nơi chốn で)",
                        "図書館で勉強します。", "Tôi học ở thư viện.",
                        "で chỉ nơi diễn ra hành động."),
                grammar("～がいます/あります", "N がいます / あります", "Có (sinh vật) / Có (đồ vật)",
                        "猫がいます。本があります。", "Có con mèo. Có quyển sách.",
                        "います dùng cho sinh vật, あります dùng cho đồ vật."),
                grammar("～たいです", "V-ます stem + たいです", "Muốn làm gì",
                        "日本に行きたいです。", "Tôi muốn đi Nhật.",
                        "Chia từ thể ます bỏ ます rồi thêm たいです."),
                grammar("～てください", "V-て + ください", "Hãy làm gì (yêu cầu lịch sự)",
                        "ここに名前を書いてください。", "Hãy viết tên ở đây.",
                        "Dạng て (te-form) + ください là cách yêu cầu lịch sự."),
                grammar("～ないでください", "V-ない + でください", "Xin đừng làm gì (cấm lịch sự)",
                        "ここで写真を撮らないでください。", "Xin đừng chụp ảnh ở đây.",
                        "Thể ない (phủ định) + でください.")
        );

        grammarRepository.saveAll(grammars);
        log.info("✅ Seed {} mẫu ngữ pháp N5 thành công.", grammars.size());
    }

    // --- Helper methods ---

    private Vocabulary vocab(String word, String reading, String meaning,
                             Vocabulary.WordType type, String topic,
                             String example, String exampleMeaning) {
        return Vocabulary.builder()
                .word(word).reading(reading).meaning(meaning)
                .wordType(type).topic(topic).jlptLevel(User.JlptLevel.N5)
                .exampleSentence(example).exampleMeaning(exampleMeaning)
                .build();
    }

    private Kanji kanji(String character, String on, String kun, String meaning,
                        int strokes, String radical, String related) {
        return Kanji.builder()
                .character(character).onReading(on).kunReading(kun)
                .meaning(meaning).strokeCount(strokes)
                .radical(radical).relatedWords(related)
                .jlptLevel(User.JlptLevel.N5)
                .build();
    }

    private Grammar grammar(String pattern, String structure, String meaning,
                             String example, String exampleMeaning, String notes) {
        return Grammar.builder()
                .pattern(pattern).structure(structure).meaning(meaning)
                .exampleSentence(example).exampleMeaning(exampleMeaning)
                .notes(notes).jlptLevel(User.JlptLevel.N5)
                .build();
    }

    // ─────────────────────────────────────────────────────────────────────
    // PLACEMENT TEST QUESTIONS SEEDER
    // ─────────────────────────────────────────────────────────────────────

    private void seedPlacementQuestions() {
        if (placementQuestionRepository.count() > 0) {
            log.info("Placement questions đã có data, bỏ qua seed.");
            return;
        }

        List<PlacementQuestion> questions = new java.util.ArrayList<>();

        // ── N5: VOCAB (6 câu) ───────────────────────────────────────────
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.VOCAB,
                "「___」に　なにを　いれますか。　わたしは　まいにち　ごはんを　___。",
                List.of("A. たべます", "B. のみます", "C. かきます", "D. ききます"),
                0,
                "食べます (たべます) nghĩa là 'ăn'. まいにち = mỗi ngày, ごはん = cơm. Đáp án A là đúng vì 'ăn cơm' là diễn đạt tự nhiên.",
                1));

        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.VOCAB,
                "この　かばんは　___です。ちいさくて　かるい。",
                List.of("A. おおきい", "B. べんりな", "C. たかい", "D. あたらしい"),
                1,
                "便利な (べんりな) nghĩa là 'tiện lợi'. Câu mô tả cái túi nhỏ và nhẹ → tiện lợi là phù hợp nhất với ngữ cảnh.",
                2));

        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.VOCAB,
                "「山」の　よみかたは　なんですか。",
                List.of("A. かわ", "B. やま", "C. うみ", "D. そら"),
                1,
                "山 (やま) nghĩa là 'núi'. かわ=sông, うみ=biển, そら=bầu trời. Cách đọc Kun'yomi của 山 là やま.",
                3));

        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.VOCAB,
                "わたしの　たんじょうびは　___です。(Ngày sinh của tôi là 15 tháng 5)",
                List.of("A. ごがつ　じゅうごにち", "B. ごがつ　じゅうにち", "C. ろくがつ　じゅうごにち", "D. ごがつ　いつか"),
                0,
                "5月15日 = ごがつ じゅうごにち. ご=5, がつ=tháng, じゅうご=15, にち=ngày.",
                4));

        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.VOCAB,
                "つくえの　うえに　ほんが　___。",
                List.of("A. います", "B. あります", "C. おきます", "D. みます"),
                1,
                "あります dùng cho đồ vật (vô tri giác). います dùng cho người/động vật. Quyển sách (本) là đồ vật nên dùng あります.",
                5));

        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.VOCAB,
                "これは　___ですか。 ─ これは　えんぴつです。",
                List.of("A. なに", "B. だれ", "C. どこ", "D. いつ"),
                0,
                "なに = 'cái gì'. だれ=ai, どこ=ở đâu, いつ=khi nào. Câu hỏi về vật → dùng なに (何).",
                6));

        // ── N5: GRAMMAR (6 câu) ─────────────────────────────────────────
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.GRAMMAR,
                "わたしは　がっこう　___　いきます。",
                List.of("A. を", "B. に", "C. が", "D. は"),
                1,
                "に chỉ đích đến của chuyển động (行く, 来る, 帰る). 'Đi đến trường' = がっこうに いきます. を dùng cho tân ngữ trực tiếp.",
                7));

        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.GRAMMAR,
                "たなかさんは　にほんご___　はなします。",
                List.of("A. が", "B. に", "C. で", "D. を"),
                3,
                "を (を) đánh dấu tân ngữ trực tiếp. 'Nói tiếng Nhật' = にほんごを はなします. で chỉ phương tiện hoặc nơi chốn.",
                8));

        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.GRAMMAR,
                "きのう　えいがを　みました。とても　___かったです。",
                List.of("A. たのし", "B. たのしい", "C. たのして", "D. たのしく"),
                0,
                "Tính từ đuôi い khi đứng trước かったです (quá khứ lịch sự) phải bỏ い → たのし + かったです. たのしかった = đã vui.",
                9));

        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.GRAMMAR,
                "もっと　ゆっくり　はなして___。",
                List.of("A. みます", "B. ください", "C. います", "D. あります"),
                1,
                "てください là cách yêu cầu lịch sự: 'Xin hãy làm gì đó'. はなしてください = 'Xin hãy nói chậm hơn'.",
                10));

        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.GRAMMAR,
                "あした　がっこうに　い___と　おもいます。",
                List.of("A. く", "B. き", "C. って", "D. か"),
                0,
                "～と　おもいます (tôi nghĩ rằng...) đứng sau thể từ điển của động từ. 行く (いく) + と おもいます.",
                11));

        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.GRAMMAR,
                "わたしは　コーヒー___　こうちゃ___　すきです。",
                List.of("A. も / も", "B. や / や", "C. と / と", "D. か / か"),
                0,
                "も...も nghĩa là 'cả...lẫn...'. 'Tôi thích cả cà phê lẫn trà'. と liệt kê đầy đủ, や liệt kê không đầy đủ.",
                12));

        // ── N5: READING (3 câu) ─────────────────────────────────────────
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.READING,
                "「たなかさんは　まいあさ　ろくじに　おきます。そして　しちじに　がっこうへ　いきます。」\nたなかさんは　なんじに　おきますか？",
                List.of("A. ごじ", "B. ろくじ", "C. しちじ", "D. はちじ"),
                1,
                "Đoạn văn viết 'まいあさ ろくじに おきます' = mỗi sáng thức dậy lúc 6 giờ. ろくじ = 6 giờ.",
                13));

        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.READING,
                "「きょうは　あついです。でも　あしたは　さむく　なります。」\nあしたの　てんきは　どうですか？",
                List.of("A. あつい", "B. さむい", "C. あめ", "D. はれ"),
                1,
                "Câu 2 nói 'あした は さむく なります' = ngày mai sẽ trở nên lạnh. さむい = lạnh.",
                14));

        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.READING,
                "「わたしは　まいにち　じてんしゃで　かいしゃへ　いきます。でんしゃは　つかいません。」\nこのひとは　なにで　かいしゃへ　いきますか？",
                List.of("A. でんしゃ", "B. バス", "C. じてんしゃ", "D. くるま"),
                2,
                "Đoạn văn nói 'じてんしゃで かいしゃへ いきます' = đi làm bằng xe đạp. じてんしゃ = xe đạp.",
                15));

        // ── N4: VOCAB (6 câu) ───────────────────────────────────────────
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.VOCAB,
                "かれは　しごとを　やめて、___しました。(Anh ấy nghỉ việc và bắt đầu kinh doanh)",
                List.of("A. けっこん", "B. りゅうがく", "C. どくりつ", "D. たいしょく"),
                2,
                "独立 (どくりつ) nghĩa là 'độc lập, tự kinh doanh'. けっこん=kết hôn, りゅうがく=du học, たいしょく=nghỉ hưu.",
                1));

        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.VOCAB,
                "かぜで　ねつが　でたので、___に　いきました。",
                List.of("A. びょういん", "B. ぎんこう", "C. ゆうびんきょく", "D. スーパー"),
                0,
                "病院 (びょういん) = bệnh viện. Khi bị sốt do cảm → đi bệnh viện là tự nhiên nhất.",
                2));

        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.VOCAB,
                "この　もんだいは　___すぎて、わかりません。",
                List.of("A. むずかしい", "B. むずかし", "C. むずかしく", "D. むずかしさ"),
                1,
                "Trước すぎる, tính từ đuôい phải bỏ い → むずかし + すぎる. むずかしすぎる = quá khó.",
                3));

        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.VOCAB,
                "しあいに　まけて、とても___です。",
                List.of("A. うれしい", "B. たのしい", "C. かなしい", "D. おもしろい"),
                2,
                "悲しい (かなしい) = buồn. Thua trận đấu → cảm thấy buồn là cảm xúc phù hợp nhất.",
                4));

        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.VOCAB,
                "電車が　___ので、会社に　おくれました。",
                List.of("A. おそい", "B. はやい", "C. おくれた", "D. こんだ"),
                3,
                "込んだ (こんだ) = đông/tắc. Tàu đông nên đi làm trễ là lý do hợp lý. おくれた=bị trễ, おそい=chậm.",
                5));

        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.VOCAB,
                "この　しごとを　___には、けいけんが　ひつようです。",
                List.of("A. する", "B. した", "C. すること", "D. して"),
                2,
                "～には (để làm gì đó) đứng sau thể từ điển + こと: することには = để làm việc này. Đây là cấu trúc danh hóa động từ.",
                6));

        // ── N4: GRAMMAR (7 câu) ─────────────────────────────────────────
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.GRAMMAR,
                "もっと　はやく　おきれば、　バスに　___のに。",
                List.of("A. のれた", "B. のる", "C. のれる", "D. のって"),
                0,
                "Cấu trúc ～ば～のに (giá mà... thì...) diễn đạt tiếc nuối. のれた = đã có thể lên tàu (quá khứ điều kiện).",
                7));

        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.GRAMMAR,
                "かのじょは　うたが　___そうです。",
                List.of("A. じょうずな", "B. じょうず", "C. じょうずく", "D. じょうずに"),
                1,
                "そうです (có vẻ như) sau tính từ na: bỏ な → じょうず + そうです. じょうずそう = có vẻ giỏi.",
                8));

        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.GRAMMAR,
                "てんきが　よければ、ピクニックに　___。",
                List.of("A. いきます", "B. いきたいです", "C. いこうと　おもいます", "D. いきました"),
                2,
                "よければ là điều kiện 'nếu thời tiết tốt'. Kết hợp với ý định → いこうと おもいます (dự định đi) là tự nhiên nhất.",
                9));

        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.GRAMMAR,
                "この　くすりを　のんで___ば、すぐ　なおります。",
                List.of("A. よけれ", "B. よかれ", "C. いけれ", "D. おけれ"),
                0,
                "よければ là thể điều kiện của いい (tốt). Uống thuốc này → nếu tốt (dùng đúng cách) thì sẽ khỏi nhanh.",
                10));

        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.GRAMMAR,
                "きのう　ともだちに　プレゼントを　もらい___。",
                List.of("A. ました", "B. ました　か", "C. たかったです", "D. てください"),
                0,
                "もらいました = đã nhận được. もらう là động từ nhận (nhận từ người khác). Thì quá khứ lịch sự = ました.",
                11));

        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.GRAMMAR,
                "せんせいに　しつもんを　___もいいですか。",
                List.of("A. して", "B. する", "C. した", "D. し"),
                0,
                "てもいいですか là cấu trúc xin phép 'Tôi có thể... không?'. Thể て của する = して. してもいいですか = Tôi có thể hỏi không?",
                12));

        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.GRAMMAR,
                "あの　えいがは　みた___　ありません。",
                List.of("A. こと", "B. の", "C. もの", "D. ところ"),
                0,
                "～たことがない = chưa từng... Đây là cấu trúc diễn đạt kinh nghiệm chưa có. みたことがない = chưa từng xem.",
                13));

        // ── N4: READING (3 câu) ─────────────────────────────────────────
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.READING,
                "「たなか：もしもし、やまださん、あした　いっしょに　えいがを　みませんか。\nやまだ：いいですね。でも、あしたは　ちょっと　つごうが　わるくて...。あさってはどうですか。\nたなか：あさって？　いいですよ。」\nふたりは　いつ　えいがを　みますか？",
                List.of("A. きょう", "B. あした", "C. あさって", "D. まだ　きめていない"),
                2,
                "Yamada nói không rảnh vào ngày mai nhưng đề xuất あさって (ngày kia), và Tanaka đồng ý. → Họ sẽ xem phim vào あさって.",
                14));

        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.READING,
                "「このレストランは　へいじつ　ごご12じから　よる9じまで　えいぎょうしています。どようびと　にちようびは　ごぜん11じから　えいぎょうします。もんようびは　やすみです。」\nどようびは　なんじから　あいていますか？",
                List.of("A. ごぜん11じ", "B. ごご12じ", "C. よる9じ", "D. やすみ"),
                0,
                "Thứ 7 và Chủ nhật mở từ ごぜん11じ (11 giờ sáng). Ngày thường mở từ 12 giờ trưa.",
                15));

        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.READING,
                "「わたしは　りゅうがくせいです。にほんに　きて、2ねんに　なります。さいしょは　ひらがなも　よめませんでした。でも　いま、かんじも　すこし　よめます。にほんごは　むずかしいですが、たのしいです。」\nこのひとが　にほんに　きた　とき、どうでしたか？",
                List.of("A. かんじが　よめた", "B. ひらがなも　よめなかった", "C. にほんごが　じょうずだった", "D. たのしかった"),
                1,
                "Đoạn văn viết 'さいしょは ひらがなも よめませんでした' = lúc đầu không thể đọc cả hiragana. Đây là trạng thái khi mới đến.",
                16));

        // ── N3: VOCAB (4 câu mẫu) ───────────────────────────────────────
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.VOCAB,
                "彼女は　いつも　___な　態度で　話します。(Cô ấy luôn nói chuyện với thái độ...)",
                List.of("A. 礼儀正しい", "B. 失礼な", "C. 遠慮ない", "D. 無礼な"),
                0,
                "礼儀正しい (れいぎただしい) = lịch sự, có phép tắc. 失礼=vô lễ, 遠慮ない=không ngần ngại, 無礼=vô lễ. Từ 'いつも' (luôn luôn) gợi ý phẩm chất tốt.",
                1));

        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.GRAMMAR,
                "この　問題は　難しすぎて、___解けません。",
                List.of("A. なかなか", "B. ずっと", "C. もっと", "D. やっと"),
                0,
                "なかなか + 否定 (phủ định) = 'mãi không...'. なかなか解けない = mãi không giải được. Diễn đạt sự khó khăn kéo dài.",
                2));

        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.GRAMMAR,
                "雨が降って___、試合を　中止に　なりました。",
                List.of("A. から", "B. ので", "C. ため", "D. しまい"),
                1,
                "ので là liên từ nguyên nhân lịch sự, phù hợp trong văn viết/trang trọng. から mang tính chủ quan hơn. 雨が降ったので = vì trời mưa.",
                3));

        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.READING,
                "「最近、SNSの利用が増えています。便利な面がある一方で、個人情報の漏えいや誹謗中傷などの問題も起きています。」\nこの文章の　主な内容は　何ですか？",
                List.of("A. SNSは非常に便利だ", "B. SNSは使わない方がいい", "C. SNSには利点と問題点の両面がある", "D. 個人情報の漏えいは増えている"),
                2,
                "Từ '便利な面がある一方で...問題も起きています' (có mặt tiện lợi nhưng đồng thời cũng xảy ra vấn đề) → nội dung nói về cả hai mặt của SNS.",
                4));

        placementQuestionRepository.saveAll(questions);
        log.info("✅ Seed {} câu hỏi Placement Test (N5/N4/N3) thành công.", questions.size());
    }

    /**
     * Helper tạo PlacementQuestion nhanh.
     */
    private PlacementQuestion pq(User.JlptLevel level, PlacementQuestion.Section section,
                                   String questionText, List<String> options,
                                   int correctOption, String explanation, int order) {
        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            return PlacementQuestion.builder()
                    .level(level)
                    .section(section)
                    .questionText(questionText)
                    .optionsJson(mapper.writeValueAsString(options))
                    .correctOption(correctOption)
                    .explanation(explanation)
                    .displayOrder(order)
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Lỗi serialize options JSON", e);
        }
    }

    private void seedSubscriptionPlans() {
        if (subscriptionPlanRepository.count() > 0) {
            log.info("📦 Subscription plans already seeded — skipping");
            return;
        }

        log.info("📦 Seeding subscription plans...");

        subscriptionPlanRepository.saveAll(List.of(
                SubscriptionPlan.builder()
                        .name("Gói N5 — Nhập môn")
                        .description("Trọn bộ nội dung JLPT N5: ~800 từ vựng, ~100 Kanji, ngữ pháp cơ bản.")
                        .planType(SubscriptionPlan.PlanType.SINGLE_LEVEL)
                        .jlptLevel(User.JlptLevel.N5)
                        .price(199000L)
                        .currency("VND")
                        .durationDays(365)
                        .badge(null)
                        .features("Toàn bộ từ vựng N5\nToàn bộ Kanji N5\nNgữ pháp N5 chi tiết\nFlashcard SRS không giới hạn\nBài thi thử N5")
                        .build(),
                SubscriptionPlan.builder()
                        .name("Gói N4 — Sơ cấp")
                        .description("Nâng cấp lên JLPT N4: ~1500 từ vựng, ~300 Kanji, ngữ pháp sơ cấp.")
                        .planType(SubscriptionPlan.PlanType.SINGLE_LEVEL)
                        .jlptLevel(User.JlptLevel.N4)
                        .price(249000L)
                        .currency("VND")
                        .durationDays(365)
                        .badge(null)
                        .features("Toàn bộ từ vựng N4\nToàn bộ Kanji N4\nNgữ pháp N4 chi tiết\nFlashcard SRS không giới hạn\nBài thi thử N4")
                        .build(),
                SubscriptionPlan.builder()
                        .name("Gói N3 — Trung cấp")
                        .description("Chinh phục JLPT N3: ~3750 từ vựng, ~650 Kanji, ngữ pháp trung cấp.")
                        .planType(SubscriptionPlan.PlanType.SINGLE_LEVEL)
                        .jlptLevel(User.JlptLevel.N3)
                        .price(299000L)
                        .currency("VND")
                        .durationDays(365)
                        .badge("Popular")
                        .features("Toàn bộ từ vựng N3\nToàn bộ Kanji N3\nNgữ pháp N3 chi tiết\nFlashcard SRS không giới hạn\nBài thi thử N3\nPhân tích đọc hiểu")
                        .build(),
                SubscriptionPlan.builder()
                        .name("Gói N2 — Cao cấp")
                        .description("Luyện thi JLPT N2: ~6000 từ vựng, ~1000 Kanji, ngữ pháp nâng cao.")
                        .planType(SubscriptionPlan.PlanType.SINGLE_LEVEL)
                        .jlptLevel(User.JlptLevel.N2)
                        .price(349000L)
                        .currency("VND")
                        .durationDays(365)
                        .badge(null)
                        .features("Toàn bộ từ vựng N2\nToàn bộ Kanji N2\nNgữ pháp N2 nâng cao\nFlashcard SRS không giới hạn\nBài thi thử N2\nPhân tích đọc hiểu chuyên sâu")
                        .build(),
                SubscriptionPlan.builder()
                        .name("Gói N1 — Thành thạo")
                        .description("Đỉnh cao JLPT N1: ~10000 từ vựng, ~2000 Kanji, ngữ pháp chuyên gia.")
                        .planType(SubscriptionPlan.PlanType.SINGLE_LEVEL)
                        .jlptLevel(User.JlptLevel.N1)
                        .price(399000L)
                        .currency("VND")
                        .durationDays(365)
                        .badge(null)
                        .features("Toàn bộ từ vựng N1\nToàn bộ Kanji N1\nNgữ pháp N1 chuyên gia\nFlashcard SRS không giới hạn\nBài thi thử N1\nPhân tích đọc hiểu & nghe hiểu")
                        .build(),
                SubscriptionPlan.builder()
                        .name("Trọn bộ N5–N1 — Master Bundle")
                        .description("Mở khóa TOÀN BỘ nội dung từ N5 đến N1. Tiết kiệm 50% so với mua lẻ!")
                        .planType(SubscriptionPlan.PlanType.FULL_BUNDLE)
                        .jlptLevel(null) // All levels
                        .price(999000L)
                        .currency("VND")
                        .durationDays(365)
                        .badge("Best Value")
                        .features("Mở khóa toàn bộ N5-N1\nTừ vựng + Kanji + Ngữ pháp đầy đủ\nFlashcard SRS không giới hạn\nBài thi thử tất cả cấp độ\nPhân tích đọc hiểu chuyên sâu\nƯu tiên hỗ trợ kỹ thuật\nCập nhật nội dung miễn phí")
                        .build()
        ));

        log.info("✅ Seeded 6 subscription plans (N5-N1 + Full Bundle)");
    }
}
