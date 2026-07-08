package com.nihongo.api.common.config;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.grammar.entity.Grammar;
import com.nihongo.api.modules.grammar.repository.GrammarRepository;
import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.kanji.repository.KanjiRepository;
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
}
