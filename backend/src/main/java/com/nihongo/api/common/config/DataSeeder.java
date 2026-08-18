package com.nihongo.api.common.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.auth.repository.UserRepository;
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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

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
            jdbcTemplate.execute("ALTER TABLE users DROP CONSTRAINT IF EXISTS users_jlpt_level_check");
            log.info("Dropped check constraints users_role_check & users_jlpt_level_check on users table");
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
                    .fullName("NipponMaster Admin")
                    .role(User.Role.ADMIN)
                    .jlptLevel(User.JlptLevel.N1)
                    .targetLevel(User.JlptLevel.N1)
                    .onboardingCompleted(true)
                    .build();
            userRepository.save(admin);
            log.info("Seed Admin user: admin@nihongo.com");
        }

        if (!userRepository.existsByEmail("teacher@nihongo.com")) {
            User teacher = User.builder()
                    .email("teacher@nihongo.com")
                    .password(passwordEncoder.encode("teacher123"))
                    .fullName("Yamada Sensei")
                    .role(User.Role.TEACHER)
                    .jlptLevel(User.JlptLevel.N1)
                    .targetLevel(User.JlptLevel.N1)
                    .onboardingCompleted(true)
                    .build();
            userRepository.save(teacher);
            log.info("Seed Teacher user: teacher@nihongo.com");
        }

        if (!userRepository.existsByEmail("student@nihongo.com")) {
            User student = User.builder()
                    .email("student@nihongo.com")
                    .password(passwordEncoder.encode("student123"))
                    .fullName("Nguyen Van A")
                    .role(User.Role.STUDENT)
                    .jlptLevel(User.JlptLevel.N5)
                    .targetLevel(User.JlptLevel.N4)
                    .onboardingCompleted(true)
                    .build();
            userRepository.save(student);
            log.info("Seed Student user: student@nihongo.com");
        }
    }

    private void seedVocabulary() {
        if (vocabularyRepository.count() > 0) {
            log.info("Vocabulary data exists, skipping.");
            return;
        }

        List<Vocabulary> vocabs = List.of(
                vocab("私", "わたし", "Tôi", Vocabulary.WordType.NOUN, "Chào hỏi", "私はベトナム人です。", "Tôi là người Việt Nam."),
                vocab("本", "ほん", "Sách", Vocabulary.WordType.NOUN, "Đồ dùng", "日本語の本を読みます。", "Tôi đọc sách tiếng Nhật."),
                vocab("食べる", "たべる", "Ăn", Vocabulary.WordType.VERB, "Hoạt động", "毎朝ご飯を食べます。", "Mỗi sáng tôi ăn cơm."),
                vocab("飲む", "のむ", "Uống", Vocabulary.WordType.VERB, "Hoạt động", "水を飲みます。", "Tôi uống nước."),
                vocab("行く", "いく", "Đi", Vocabulary.WordType.VERB, "Di chuyển", "学校に行きます。", "Tôi đi học.")
        );

        vocabularyRepository.saveAll(vocabs);
        log.info("Seeded vocabulary successfully.");
    }

    private void seedKanji() {
        if (kanjiRepository.count() > 0) {
            log.info("Kanji data exists, skipping.");
            return;
        }

        List<Kanji> kanjis = List.of(
                kanji("日", "ニチ", "ひ", "Mặt trời, ngày", 4, "日", "日本, 毎日"),
                kanji("月", "ゲツ", "つき", "Mặt trăng, tháng", 4, "月", "月曜日, 今月"),
                kanji("水", "スイ", "みず", "Nước", 4, "水", "水曜日, お水"),
                kanji("火", "カ", "ひ", "Lửa", 4, "火", "火曜日, 花火"),
                kanji("木", "モク", "き", "Cây", 4, "木", "木曜日, 大木")
        );

        kanjiRepository.saveAll(kanjis);
        log.info("Seeded kanji successfully.");
    }

    private void seedGrammar() {
        if (grammarRepository.count() > 0) {
            log.info("Grammar data exists, skipping.");
            return;
        }

        List<Grammar> grammars = List.of(
                grammar("～は～です", "N1 は N2 です", "N1 là N2", "私は学生です。", "Tôi là học sinh.", "Cấu trúc cơ bản"),
                grammar("～か", "Câu + か", "Câu hỏi", "これは本ですか。", "Đây có phải sách không?", "Thêm か ở cuối câu")
        );

        grammarRepository.saveAll(grammars);
        log.info("Seeded grammar successfully.");
    }

    private Vocabulary vocab(String word, String reading, String meaning, Vocabulary.WordType type, String topic, String example, String exampleMeaning) {
        return Vocabulary.builder()
                .word(word).reading(reading).meaning(meaning)
                .wordType(type).topic(topic).jlptLevel(User.JlptLevel.N5)
                .exampleSentence(example).exampleMeaning(exampleMeaning)
                .build();
    }

    private Kanji kanji(String character, String on, String kun, String meaning, int strokes, String radical, String related) {
        return Kanji.builder()
                .character(character).onReading(on).kunReading(kun)
                .meaning(meaning).strokeCount(strokes)
                .radical(radical).relatedWords(related)
                .jlptLevel(User.JlptLevel.N5)
                .build();
    }

    private Grammar grammar(String pattern, String structure, String meaning, String example, String exampleMeaning, String notes) {
        return Grammar.builder()
                .pattern(pattern).structure(structure).meaning(meaning)
                .exampleSentence(example).exampleMeaning(exampleMeaning)
                .notes(notes).jlptLevel(User.JlptLevel.N5)
                .build();
    }

    private void seedPlacementQuestions() {
        if (placementQuestionRepository.count() >= 75) {
            log.info("Placement questions standard 75 items exist, skipping.");
            return;
        }

        if (placementQuestionRepository.count() > 0) {
            log.info("Updating placement questions dataset...");
            placementQuestionRepository.deleteAll();
        }

        List<PlacementQuestion> questions = new ArrayList<>();

        // N5
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.VOCAB, "わたしは まいにち ごはんを ___。", List.of("A. たべます", "B. のみます", "C. かきます", "D. ききます"), 0, "たべます = ăn.", 1));
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.VOCAB, "この かばんは ___です。", List.of("A. おおきい", "B. べんりな", "C. たかい", "D. あたらしい"), 1, "べんりな = tiện lợi.", 2));
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.VOCAB, "「山」の よみかたは なんですか。", List.of("A. かわ", "B. やま", "C. うみ", "D. そら"), 1, "山 = やま.", 3));
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.VOCAB, "たんじょうびは ___です。(15/5)", List.of("A. ごがつ じゅうごにち", "B. ごがつ じゅうにち", "C. ろくがつ じゅうごにち", "D. ごがつ いつか"), 0, "5月15日 = ごがつ じゅうごにち.", 4));
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.VOCAB, "つくえの うえに ほんが ___。", List.of("A. います", "B. あります", "C. おきます", "D. みます"), 1, "あります cho đồ vật.", 5));
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.VOCAB, "これは ___ですか。", List.of("A. なに", "B. だれ", "C. どこ", "D. いつ"), 0, "なに = cái gì.", 6));
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.GRAMMAR, "わたしは がっこう ___ いきます。", List.of("A. を", "B. に", "C. が", "D. は"), 1, "に chỉ đích đến.", 7));
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.GRAMMAR, "たなかさんは にほんご___ はなします。", List.of("A. が", "B. に", "C. で", "D. を"), 3, "を tân ngữ.", 8));
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.GRAMMAR, "とても ___かったです。", List.of("A. たのし", "B. たのしい", "C. たのして", "D. たのしく"), 0, "たのしかった = đã vui.", 9));
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.GRAMMAR, "はなして___。", List.of("A. みます", "B. ください", "C. います", "D. あります"), 1, "てください = xin hãy.", 10));
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.GRAMMAR, "い___と おもいます。", List.of("A. く", "B. き", "C. って", "D. か"), 0, "いくとおもいます = tôi nghĩ sẽ đi.", 11));
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.GRAMMAR, "コーヒー___ こうちゃ___ すきです。", List.of("A. も / も", "B. や / や", "C. と / と", "D. か / か"), 0, "も...も = cả...lẫn...", 12));
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.READING, "「まいあさ ろくじに おきます。」なんじにおきますか？", List.of("A. ごじ", "B. ろくじ", "C. しちじ", "D. はちじ"), 1, "ろくじ = 6 giờ.", 13));
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.READING, "「あしたは さむく なります。」あしたのてんきは？", List.of("A. あつい", "B. さむい", "C. あめ", "D. はれ"), 1, "さむい = lạnh.", 14));
        questions.add(pq(User.JlptLevel.N5, PlacementQuestion.Section.READING, "「じてんしゃで かいしゃへ いきます。」なにでいきますか？", List.of("A. でんしゃ", "B. バス", "C. じてんしゃ", "D. くるま"), 2, "じてんしゃ = xe đạp.", 15));

        // N4
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.VOCAB, "しごとを やめて、___しました。", List.of("A. けっこん", "B. りゅうがく", "C. どくりつ", "D. たいしょく"), 2, "どくりつ = tự kinh doanh.", 1));
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.VOCAB, "ねつが でたので ___に いきました。", List.of("A. びょういん", "B. ぎんこう", "C. ゆうびんきょく", "D. スーパー"), 0, "びょういん = bệnh viện.", 2));
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.VOCAB, "むずかし___て、わかりません。", List.of("A. すぎ", "B. さ", "C. く", "D. い"), 0, "むずかしすぎる = quá khó.", 3));
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.VOCAB, "しあいに まけて、とても___です。", List.of("A. うれしい", "B. たのしい", "C. かなしい", "D. おもしろい"), 2, "かなしい = buồn.", 4));
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.VOCAB, "電車が ___ので おくれました。", List.of("A. おそい", "B. はやい", "C. おくれた", "D. こんだ"), 3, "こんだ = đông đúc/tắc.", 5));
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.VOCAB, "この しごとを ___には けいけんが ひつようです。", List.of("A. する", "B. した", "C. すること", "D. して"), 2, "することには = để làm việc này.", 6));
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.GRAMMAR, "バスに ___のに。", List.of("A. のれた", "B. のる", "C. のれる", "D. のって"), 0, "のれたのに = giá mà đã có thể lên bus.", 7));
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.GRAMMAR, "うたが ___そうです。", List.of("A. じょうずな", "B. じょうず", "C. じょうずく", "D. じょうずに"), 1, "じょうずそう = có vẻ hát hay.", 8));
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.GRAMMAR, "ピクニックに ___。", List.of("A. いきます", "B. いきたいです", "C. いこうと おもいます", "D. いきました"), 2, "いこうとおもいます = định đi.", 9));
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.GRAMMAR, "のんで ___ば すぐ なおります。", List.of("A. よければ", "B. よかれ", "C. いければ", "D. おければ"), 0, "よければ = nếu uống tốt.", 10));
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.GRAMMAR, "プレゼントを もらい___。", List.of("A. ました", "B. ましたか", "C. たかったです", "D. てください"), 0, "もらいました = đã nhận.", 11));
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.GRAMMAR, "しつもんを ___もいいですか。", List.of("A. して", "B. する", "C. した", "D. し"), 0, "してもいいですか = có thể hỏi không.", 12));
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.READING, "「あさってはどうですか。あさって？いいですよ。」いつみますか？", List.of("A. きょう", "B. あした", "C. あさって", "D. まだ"), 2, "あさって = ngày kia.", 13));
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.READING, "「どようびと にちようびは ごぜん11じから」どようびは？", List.of("A. ごぜん11じ", "B. ごご12じ", "C. よる9じ", "D. やすみ"), 0, "11h sáng.", 14));
        questions.add(pq(User.JlptLevel.N4, PlacementQuestion.Section.READING, "「さいしょは ひらがなも よめませんでした」きたときどうでしたか？", List.of("A. よめた", "B. ひらがなもよめなかった", "C. じょうずだった", "D. たのしかった"), 1, "Chưa đọc được cả Hiragana.", 15));

        // N3
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.VOCAB, "彼女はいつも___な態度で接する。", List.of("A. 礼儀正しい", "B. 厚かましい", "C. 乱暴な", "D. 大ざっぱな"), 0, "礼儀正しい = lịch sự.", 1));
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.VOCAB, "ネットの___状態が不安定だ。", List.of("A. 接続", "B. 連続", "C. 結合", "D. 連絡"), 0, "接続 = kết nối.", 2));
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.VOCAB, "___に検討する必要がある。", List.of("A. 慎重", "B. 深刻", "C. 厳重", "D. 貴重"), 0, "慎重に = thận trọng.", 3));
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.VOCAB, "出発が来週に___された。", List.of("A. 中止", "B. 延期", "C. 停止", "D. 辞退"), 1, "延期 = hoãn lại.", 4));
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.VOCAB, "一人で多くの問題を___いる。", List.of("A. 抱えて", "B. 捕まえて", "C. 握って", "D. 支えて"), 0, "抱える = gánh vác.", 5));
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.VOCAB, "返事は___で分からない。", List.of("A. 曖昧", "B. 明確", "C. 正確", "D. 明白"), 0, "曖昧 = mập mờ.", 6));
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.GRAMMAR, "いくら考えても___解けない。", List.of("A. なかなか", "B. ずっと", "C. もっと", "D. やっと"), 0, "なかなか解けない = mãi không giải được.", 7));
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.GRAMMAR, "雨が降っている___出かけた。", List.of("A. にもかかわらず", "B. おかげで", "C. せいで", "D. ついでに"), 0, "にもかかわらず = mặc dù.", 8));
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.GRAMMAR, "先生のご指導の___合格できた。", List.of("A. おかげで", "B. せいで", "C. くせに", "D. ために"), 0, "おかげで = nhờ có.", 9));
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.GRAMMAR, "毎日野菜を食べる___している。", List.of("A. ように", "B. ことに", "C. そうに", "D. らしい"), 0, "ようにする = cố gắng duy trì.", 10));
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.GRAMMAR, "家についた___大雨が降り出した。", List.of("A. とたんに", "B. 最中に", "C. たびに", "D. ついでに"), 0, "とたんに = vừa mới... thì ngay.", 11));
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.GRAMMAR, "約束を破る___はいかない。", List.of("A. わけに", "B. はずには", "C. つもりには", "D. かぎりに"), 0, "わけにはいかない = không thể.", 12));
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.READING, "「テレワークの利点と課題」主張は？", List.of("A. 廃止", "B. 利点と課題の両面がある", "C. 通勤増やす", "D. 強制"), 1, "Có hai mặt lợi và hại.", 13));
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.READING, "「就寝前のスマホは睡眠低下」避けるべきは？", List.of("A. 野菜", "B. 就寝前のスマホ使用", "C. 運動", "D. 早寝"), 1, "Dùng smartphone trước khi ngủ.", 14));
        questions.add(pq(User.JlptLevel.N3, PlacementQuestion.Section.READING, "「紙の書籍の手触りや感覚」支持理由は？", List.of("A. 安い", "B. 手触りやめくる感覚", "C. 便利", "D. 暗い場所"), 1, "Cảm giác giở trang sách.", 15));

        // N2
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.VOCAB, "新商品開発を___に海外進出。", List.of("A. 契機", "B. 基準", "C. 限界", "D. 兆候"), 0, "契機 = bước ngoặt.", 1));
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.VOCAB, "状況を正確に___しないと指示できない。", List.of("A. 把握", "B. 遭遇", "C. 獲得", "D. 提示"), 0, "把握 = nắm bắt.", 2));
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.VOCAB, "___な対応が求められている。", List.of("A. 迅速", "B. 緩慢", "C. 冗長", "D. 存分"), 0, "迅速 = nhanh chóng.", 3));
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.VOCAB, "発言に多くの___が含まれている。", List.of("A. 矛盾", "B. 調和", "C. 一致", "D. 妥協"), 0, "矛盾 = mâu thuẫn.", 4));
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.VOCAB, "規制を___して経済活性化。", List.of("A. 緩和", "B. 強化", "C. 促進", "D. 抑圧"), 0, "緩和 = nới lỏng.", 5));
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.VOCAB, "互いに___した。", List.of("A. 妥協", "B. 断絶", "C. 対立", "D. 孤立"), 0, "妥協 = thỏa hiệp.", 6));
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.GRAMMAR, "研究成果___新薬開発。", List.of("A. をもとに", "B. をめぐって", "C. をよそに", "D. をかわきりに"), 0, "をもとに = dựa trên.", 7));
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.GRAMMAR, "人員削減を___を得なかった。", List.of("A. せざる", "B. しない", "C. せぬ", "D. する"), 0, "せざるを得ない = đành phải.", 8));
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.GRAMMAR, "警戒を怠る___。", List.of("A. まい", "B. べきだ", "C. にちがいない", "D. ほかない"), 0, "まい = tuyệt đối không.", 9));
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.GRAMMAR, "建設予定地___話し合いが続く。", List.of("A. をめぐって", "B. にかけては", "C. に応じて", "D. に際して"), 0, "をめぐって = xoay quanh.", 10));
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.GRAMMAR, "信用失墜に___かねない。", List.of("A. つながり", "B. つながる", "C. つながった", "D. つながれ"), 0, "つながりかねない = dễ dẫn đến.", 11));
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.GRAMMAR, "努力の結晶に___。", List.of("A. ほかならない", "B. すぎない", "C. かぎらない", "D. ちがいない"), 0, "にほかならない = chính là.", 12));
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.READING, "「AI自動化とリスキリング」一致するものは？", List.of("A. 滅亡", "B. リスキリングが求められている", "C. 禁止すべき", "D. 生産性低下"), 1, "Cần đào tạo lại kỹ năng.", 13));
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.READING, "「温暖化対策」最も重要なことは？", List.of("A. 一国のみ", "B. 国際社会全体での連携", "C. 排出増", "D. 無視"), 1, "Hợp tác quốc tế.", 14));
        questions.add(pq(User.JlptLevel.N2, PlacementQuestion.Section.READING, "「ダイバーシティ経営」メリットは？", List.of("A. 統一", "B. イノベーション創出", "C. コスト削減", "D. 時間短縮"), 1, "Đổi mới sáng tạo.", 15));

        // N1
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.VOCAB, "実験結果は誤りを___している。", List.of("A. 示唆", "B. 吐露", "C. 示威", "D. 誇示"), 0, "示唆 = ngụ ý/gợi ý.", 1));
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.VOCAB, "不安を完全に___した。", List.of("A. 払拭", "B. 隠蔽", "C. 遮断", "D. 剥奪"), 0, "払拭 = xua tan.", 2));
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.VOCAB, "過疎化が___に現れている。", List.of("A. 顕著", "B. 希薄", "C. 漠然", "D. 曖昧"), 0, "顕著 = rõ rệt.", 3));
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.VOCAB, "主張に大きな___が生じた。", List.of("A. 齟齬", "B. 和解", "C. 妥協", "D. 融和"), 0, "齟齬 = bất đồng.", 4));
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.VOCAB, "聴衆の心を___に操った。", List.of("A. 巧み", "B. 愚か", "C. 拙い", "D. 粗末"), 0, "巧みに = tinh vi/khéo léo.", 5));
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.VOCAB, "生き残りの道を___する。", List.of("A. 模索", "B. 放置", "C. 茫然", "D. 固執"), 0, "模索 = mày mò.", 6));
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.GRAMMAR, "復興を願って___。", List.of("A. やまない", "B. とまらない", "C. おわらない", "D. かぎらない"), 0, "てやまない = không ngừng.", 7));
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.GRAMMAR, "縮小を___された。", List.of("A. 余儀なく", "B. 余儀なし", "C. 不可避", "D. 必然的"), 0, "余儀なくされた = buộc phải.", 8));
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.GRAMMAR, "成功を___全国展開。", List.of("A. かわきりに", "B. ついでに", "C. おわりに", "D. かぎりに"), 0, "かわきりに = bắt đầu từ.", 9));
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.GRAMMAR, "プロの職人___仕事追求。", List.of("A. たるもの", "B. ならでは", "C. といえば", "D. にしては"), 0, "たるもの = đã là.", 10));
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.GRAMMAR, "通知を受け取る___叫んだ。", List.of("A. が早いか", "B. や否や", "C. そばから", "D. なり"), 0, "が早いか = lập tức.", 11));
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.GRAMMAR, "無礼な態度は不愉快___。", List.of("A. 極まりない", "B. かぎりだ", "C. てたまらない", "D. にたえない"), 0, "極まりない = cực kỳ.", 12));
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.READING, "「技術運用における倫理観」主張は？", List.of("A. 停止", "B. 人間の倫理観と主体性が重要", "C. 悪", "D. 利便性のみ"), 1, "Đạo đức và tính chủ thể của con người.", 13));
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.READING, "「グローバル化と文化」考えは？", List.of("A. 滅亡", "B. 新たな文化創出の契機", "C. 影響なし", "D. 排除"), 1, "Cơ hội tạo văn hóa mới.", 14));
        questions.add(pq(User.JlptLevel.N1, PlacementQuestion.Section.READING, "「言語消滅」が意味することは？", List.of("A. 辞書減る", "B. 知的遺産と固有世界観の喪失", "C. 円滑", "D. 経済損失"), 1, "Mất mát di sản trí tuệ.", 15));

        placementQuestionRepository.saveAll(questions);
        log.info("Seeded 75 placement questions N5 to N1 successfully.");
    }

    private PlacementQuestion pq(User.JlptLevel level, PlacementQuestion.Section section, String questionText, List<String> options, int correctOption, String explanation, int order) {
        try {
            ObjectMapper mapper = new ObjectMapper();
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
            throw new RuntimeException("Error serializing options JSON", e);
        }
    }

    private void seedSubscriptionPlans() {
        if (subscriptionPlanRepository.count() > 0) {
            log.info("Subscription plans already seeded — skipping");
            return;
        }

        log.info("Seeding subscription plans...");

        subscriptionPlanRepository.saveAll(List.of(
                SubscriptionPlan.builder()
                        .name("Gói N5 - Nhập môn")
                        .description("Trọn bộ N5")
                        .planType(SubscriptionPlan.PlanType.SINGLE_LEVEL)
                        .jlptLevel(User.JlptLevel.N5)
                        .price(199000L)
                        .currency("VND")
                        .durationDays(365)
                        .badge(null)
                        .features("Features N5")
                        .build(),
                SubscriptionPlan.builder()
                        .name("Gói N4 - Sơ cấp")
                        .description("Trọn bộ N4")
                        .planType(SubscriptionPlan.PlanType.SINGLE_LEVEL)
                        .jlptLevel(User.JlptLevel.N4)
                        .price(249000L)
                        .currency("VND")
                        .durationDays(365)
                        .badge(null)
                        .features("Features N4")
                        .build(),
                SubscriptionPlan.builder()
                        .name("Gói N3 - Trung cấp")
                        .description("Trọn bộ N3")
                        .planType(SubscriptionPlan.PlanType.SINGLE_LEVEL)
                        .jlptLevel(User.JlptLevel.N3)
                        .price(299000L)
                        .currency("VND")
                        .durationDays(365)
                        .badge("Popular")
                        .features("Features N3")
                        .build(),
                SubscriptionPlan.builder()
                        .name("Gói N2 - Cao cấp")
                        .description("Trọn bộ N2")
                        .planType(SubscriptionPlan.PlanType.SINGLE_LEVEL)
                        .jlptLevel(User.JlptLevel.N2)
                        .price(349000L)
                        .currency("VND")
                        .durationDays(365)
                        .badge(null)
                        .features("Features N2")
                        .build(),
                SubscriptionPlan.builder()
                        .name("Gói N1 - Thành thạo")
                        .description("Trọn bộ N1")
                        .planType(SubscriptionPlan.PlanType.SINGLE_LEVEL)
                        .jlptLevel(User.JlptLevel.N1)
                        .price(399000L)
                        .currency("VND")
                        .durationDays(365)
                        .badge(null)
                        .features("Features N1")
                        .build(),
                SubscriptionPlan.builder()
                        .name("Trọn bộ N5-N1")
                        .description("Master Bundle")
                        .planType(SubscriptionPlan.PlanType.FULL_BUNDLE)
                        .jlptLevel(null)
                        .price(999000L)
                        .currency("VND")
                        .durationDays(365)
                        .badge("Best Value")
                        .features("Master Bundle")
                        .build()
        ));

        log.info("Seeded 6 subscription plans N5 to N1 and Full Bundle");
    }
}
