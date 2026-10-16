package com.nihongo.api.modules.flashcard.service;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.flashcard.dto.FlashcardItemDto;
import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.kanji.repository.KanjiRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FlashcardService {

    private final KanjiRepository kanjiRepository;

    /**
     * Lấy danh sách thẻ flashcard luyện tập nhanh theo cấp độ JLPT
     */
    @Transactional(readOnly = true)
    public List<FlashcardItemDto> getQuickPracticeCards(String rawLevel, int limit) {
        int safeLimit = Math.min(Math.max(limit, 10), 200);
        User.JlptLevel targetLevel = parseLevel(rawLevel);

        Page<Kanji> kanjiPage = kanjiRepository.findByJlptLevel(
                targetLevel,
                PageRequest.of(0, safeLimit, Sort.by("id").ascending())
        );

        List<Kanji> kanjis = new ArrayList<>(kanjiPage.getContent());

        // Nếu cấp độ STARTER chưa đủ 10 chữ, lấy bổ sung thêm N5
        if (kanjis.size() < 10 && targetLevel == User.JlptLevel.STARTER) {
            int needed = safeLimit - kanjis.size();
            Page<Kanji> n5Page = kanjiRepository.findByJlptLevel(
                    User.JlptLevel.N5,
                    PageRequest.of(0, Math.max(needed, 30), Sort.by("id").ascending())
            );
            kanjis.addAll(n5Page.getContent());
        }

        // Nếu level bất kỳ vẫn trống, lấy tất cả kanji có sẵn trong DB
        if (kanjis.isEmpty()) {
            Page<Kanji> anyPage = kanjiRepository.findAll(
                    PageRequest.of(0, safeLimit, Sort.by("id").ascending())
            );
            kanjis.addAll(anyPage.getContent());
        }

        return kanjis.stream()
                .map(this::mapToFlashcardItemDto)
                .toList();
    }

    private User.JlptLevel parseLevel(String rawLevel) {
        if (rawLevel == null || rawLevel.isBlank()) {
            return User.JlptLevel.N5;
        }
        try {
            return User.JlptLevel.valueOf(rawLevel.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            log.debug("Level '{}' không hợp lệ, chuyển về N5", rawLevel);
            return User.JlptLevel.N5;
        }
    }

    private FlashcardItemDto mapToFlashcardItemDto(Kanji k) {
        String kana = (k.getKunReading() != null && !k.getKunReading().isBlank())
                ? k.getKunReading()
                : (k.getOnReading() != null ? k.getOnReading() : "");

        String mnemonicTitle = (k.getMnemonicTitle() != null && !k.getMnemonicTitle().isBlank())
                ? k.getMnemonicTitle()
                : (k.getHanViet() != null ? k.getHanViet() : k.getMeaning());

        String mnemonicHint = (k.getMnemonicHint() != null && !k.getMnemonicHint().isBlank())
                ? k.getMnemonicHint()
                : ("Ý nghĩa: " + k.getMeaning());

        String mnemonicIcon = (k.getMnemonicIcon() != null && !k.getMnemonicIcon().isBlank())
                ? k.getMnemonicIcon()
                : "💡";
        String exampleJp = k.getExampleSentence();
        String exampleRomaji = k.getExampleRomaji();
        String exampleVi = k.getExampleMeaning();

        if (exampleJp == null || exampleJp.isBlank()) {
            ExampleTriplet triplet = resolveFallbackExample(k.getCharacter(), k.getMeaning(), kana);
            exampleJp = triplet.jp;
            exampleRomaji = triplet.romaji;
            exampleVi = triplet.vi;
        }

        return FlashcardItemDto.builder()
                .id(k.getId())
                .kanji(k.getCharacter())
                .kana(kana)
                .romaji(k.getRomaji() != null ? k.getRomaji() : "")
                .hanViet(k.getHanViet() != null ? k.getHanViet() : "")
                .meaning(k.getMeaning() != null ? k.getMeaning() : "")
                .strokeCount(k.getStrokeCount() != null ? k.getStrokeCount() : 0)
                .strokeGuide(k.getStrokeGuide() != null ? k.getStrokeGuide() : "")
                .exampleJp(exampleJp)
                .exampleRomaji(exampleRomaji != null ? exampleRomaji : "")
                .exampleVi(exampleVi != null ? exampleVi : "")
                .imageUrl(k.getImageUrl())
                .mnemonicHint(mnemonicHint)
                .mnemonicIcon(mnemonicIcon)
                .mnemonicTitle(mnemonicTitle)
                .jlptLevel(k.getJlptLevel() != null ? k.getJlptLevel().name() : "N5")
                .build();
    }

    private record ExampleTriplet(String jp, String romaji, String vi) {}

    private static final java.util.Map<String, ExampleTriplet> EXAMPLE_REGISTRY = new java.util.HashMap<>();

    private static void reg(String kanji, String jp, String romaji, String vi) {
        EXAMPLE_REGISTRY.put(kanji, new ExampleTriplet(jp, romaji, vi));
    }

    static {
        // 1. Số đếm
        reg("一", "一つください。", "Hitotsu kudasai.", "Cho tôi xin 1 cái.");
        reg("二", "りんごを二つ買います。", "Ringo o futatsu kaimasu.", "Tôi mua 2 quả táo.");
        reg("三", "三時にお茶を飲みます。", "Sanji ni ocha o nomimasu.", "Uống trà lúc 3 giờ.");
        reg("四", "日本には四季があります。", "Nihon ni wa shiki ga arimasu.", "Nhật Bản có bốn mùa.");
        reg("五", "五月に日本へ行きます。", "Gogatsu ni Nihon e ikimasu.", "Tôi đi Nhật Bản vào tháng năm.");
        reg("六", "毎朝六時に起きます。", "Maiasa rokuji ni okimasu.", "Mỗi sáng tôi thức dậy lúc 6 giờ.");
        reg("七", "七時に晩ご飯を食べます。", "Shichiji ni bangohan o tabemasu.", "Tôi ăn tối lúc 7 giờ.");
        reg("八", "八月に夏休みがあります。", "Hachigatsu ni natsuyasumi ga arimasu.", "Tháng 8 có kỳ nghỉ hè.");
        reg("九", "九時半に寝ます。", "Kujihan ni nemasu.", "Tôi đi ngủ lúc 9 giờ rưỡi.");
        reg("十", "十分休みましょう。", "Juppun yasumimashou.", "Nghỉ giải lao 10 phút nhé.");
        reg("百", "このノートは百円です。", "Kono nooto wa hyakuen desu.", "Cuốn vở này có giá 100 Yên.");
        reg("千", "千円札を両替します。", "Sen-en satsu o ryougae shimasu.", "Đổi tờ tiền 1.000 Yên.");
        reg("万", "一万円で靴を買いました。", "Ichiman-en de kutsu o kaimashita.", "Mua đôi giày giá 1 vạn Yên.");
        reg("円", "これは五百円です。", "Kore wa gohyakuen desu.", "Cái này giá 500 Yên.");

        // 2. Lịch & Tuần
        reg("月", "今夜は月がきれいです。", "Kon-ya wa tsuki ga kirei desu.", "Tối nay trăng rất đẹp.");
        reg("火", "火曜日にテストがあります。", "Kayoubi ni tesuto ga arimasu.", "Thứ ba có bài kiểm tra.");
        reg("水", "冷たい水を飲みます。", "Tsumetai mizu o nomimasu.", "Uống nước mát lạnh.");
        reg("木", "大きな木の下で休みます。", "Ookina ki no shita de yasumimasu.", "Nghỉ ngơi dưới gốc cây to.");
        reg("金", "金曜日の夜は映画を見ます。", "Kin-youbi no yoru wa eiga o mimasu.", "Tối thứ sáu tôi xem phim.");
        reg("土", "土曜日に友達と遊びます。", "Doyoubi ni tomodachi to asobimasu.", "Thứ bảy đi chơi với bạn bè.");
        reg("日", "日曜日は家でゆっくりします。", "Nichiyoubi wa ie de yukkuri shimasu.", "Chủ nhật nghỉ ngơi ở nhà.");
        reg("年", "今年日本語の勉強を始めました。", "Kotoshi nihongo no benkyou o hajimemashita.", "Năm nay tôi bắt đầu học tiếng Nhật.");

        // 3. Con người & Cơ thể
        reg("人", "あの人は親切な先生です。", "Ano hito wa shinsetsu na sensei desu.", "Người đó là giáo viên tốt bụng.");
        reg("口", "口を開けてください。", "Kuchi o akete kudasai.", "Xin hãy mở miệng ra.");
        reg("目", "目が大きくて可愛いです。", "Me ga ookikute kawaii desu.", "Đôi mắt to tròn rất dễ thương.");
        reg("耳", "耳を澄ませて聞きます。", "Mimi o sumasete kikimasu.", "Lắng tai chăm chú lắng nghe.");
        reg("手", "手をきれいに洗います。", "Te o kirei ni araimasu.", "Rửa tay thật sạch sẽ.");
        reg("足", "足が速いですね。", "Ashi ga hayai desu ne.", "Chân bạn chạy nhanh thật đấy.");
        reg("力", "力持ちの男の人です。", "Chikaramochi no otoko no hito desu.", "Người đàn ông có sức khỏe dồi dào.");

        // 4. Thiên nhiên 1
        reg("山", "富士山は日本で一番高い山です。", "Fujisan wa Nihon de ichiban takai yama desu.", "Núi Phú Sĩ là ngọn núi cao nhất Nhật Bản.");
        reg("川", "川で魚が泳いでいます。", "Kawa de sakana ga oyoide imasu.", "Cá đang bơi lội dưới dòng sông.");
        reg("田", "日本の田んぼの景色が好きです。", "Nihon no tanbo no keshiki ga suki desu.", "Tôi thích phong cảnh ruộng lúa ở Nhật Bản.");
        reg("石", "川のそばに丸い石があります。", "Kawa no soba ni marui ishi ga arimasu.", "Bên bờ sông có những hòn đá tròn.");
        reg("花", "公園にきれいな花が咲いています。", "Kouen ni kirei na hana ga saite imasu.", "Hoa nở rất đẹp trong công viên.");
        reg("竹", "竹林の道を散歩します。", "Chikurin no michi o sanpo shimasu.", "Đi dạo trên con đường rừng tre.");
        reg("雨", "朝から雨が降っています。", "Asa kara ame ga futte imasu.", "Trời mưa từ sáng sớm.");

        // 5. Phương hướng & Vị trí
        reg("上", "机の上にノートがあります。", "Tsukue no ue ni nooto ga arimasu.", "Có quyển vở ở trên bàn.");
        reg("下", "テーブルの下に猫がいます。", "Teeburu no shita ni neko ga imasu.", "Dưới gầm bàn có một chú mèo.");
        reg("左", "左へ曲がってください。", "Hidari e magatte kudasai.", "Xin hãy rẽ sang bên trái.");
        reg("右", "右手を高く挙げます。", "Migite o takaku agemasu.", "Giơ tay phải lên thật cao.");
        reg("外", "外へ散歩に出かけます。", "Soto e sanpo ni dekakemasu.", "Đi ra ngoài dạo mát.");
        reg("内", "部屋の内側に入ります。", "Heya no uchigawa ni hairimasu.", "Đi vào phía bên trong phòng.");
        reg("中", "箱の中に何がありますか。", "Hako no naka ni nani ga arimasu ka.", "Trong hộp có cái gì vậy?");

        // 6. Trường học 1
        reg("学", "大学で日本語を学びます。", "Daigaku de nihongo o manabimasu.", "Học tiếng Nhật ở trường đại học.");
        reg("校", "毎朝自転車で学校へ行きます。", "Maiasa jitensha de gakkou e ikimasu.", "Mỗi sáng tôi đi xe đạp đến trường.");
        reg("先", "先生、質問があります。", "Sensei, shitsumon ga arimasu.", "Thầy ơi, em có câu hỏi ạ.");
        reg("生", "私は留学生です。", "Watashi wa ryuugakusei desu.", "Tôi là du học sinh.");
        reg("名", "お名前を書いてください。", "Onamae o kaite kudasai.", "Xin hãy viết tên của bạn vào đây.");
        reg("字", "漢字をたくさん覚えます。", "Kanji o takusan oboemasu.", "Ghi nhớ thật nhiều chữ Hán.");
        reg("本", "日本語の本を読みます。", "Nihongo no hon o yomimasu.", "Đọc sách tiếng Nhật.");
        reg("体", "体を動かして運動します。", "Karada o ugokashite undou shimasu.", "Vận động cơ thể để rèn luyện sức khỏe.");

        // 7. Trường học 2
        reg("大", "大きい家に住みたいです。", "Ookii ie ni sumitai desu.", "Tôi muốn sống trong ngôi nhà to lớn.");
        reg("小", "小さい犬を飼っています。", "Chiisai inu o katte imasu.", "Tôi nuôi một chú cún con nhỏ nhắn.");
        reg("高", "背が高い男の子です。", "Se ga takai otokonoko desu.", "Cậu bé có vóc dáng cao ráo.");
        reg("友", "友達と仲良く話します。", "Tomodachi to nakayoku hanashimasu.", "Nói chuyện thân thiết với bạn bè.");
        reg("入", "教室に入ってください。", "Kyoushitsu ni haitte kudasai.", "Xin mời bước vào lớp học.");
        reg("出", "朝７時に家を出ます。", "Asa shichiji ni ie o demasu.", "Tôi ra khỏi nhà lúc 7 giờ sáng.");
        reg("門", "正門の前で会いましょう。", "Seimon no mae de aimashou.", "Gặp nhau trước cổng chính nhé.");

        // 8. Gia đình & Động vật
        reg("父", "父は毎朝コーヒーを飲みます。", "Chichi wa maiasa koohii o nomimasu.", "Bố tôi uống cà phê mỗi sáng.");
        reg("母", "母と一緒に料理を作ります。", "Haha to issho ni ryouri o tsukurimasu.", "Cùng mẹ nấu ăn trong bếp.");
        reg("子", "子どもたちが公園で遊んでいます。", "Kodomotachi ga kouen de asonde imasu.", "Lũ trẻ đang chơi trong công viên.");
        reg("男", "あの男の人は親切です。", "Ano otoko no hito wa shinsetsu desu.", "Người đàn ông kia rất hiền từ.");
        reg("女", "女の子が歌を歌っています。", "Onnanoko ga uta o utatte imasu.", "Bé gái đang cất tiếng hát.");
        reg("犬", "白い犬と散歩します。", "Shiroi inu to sanpo shimasu.", "Đi dạo cùng chú cún trắng.");
        reg("鳥", "木の上で鳥が鳴いています。", "Ki no ue de tori ga naite imasu.", "Chim đang hót líu lo trên cây.");

        // 9. Động từ 1
        reg("立", "席から立ってください。", "Seki kara tatte kudasai.", "Xin vui lòng đứng dậy khỏi chỗ ngồi.");
        reg("休", "疲れたので少し休みます。", "Tsukareta node sukoshi yasumimasu.", "Vì mệt nên tôi nghỉ ngơi một chút.");
        reg("見", "映画を一緒に見ましょう。", "Eiga o issho ni mimashou.", "Hãy cùng nhau xem phim nhé.");
        reg("聞", "先生の話をよく聞きます。", "Sensei no hanashi o yoku kikimasu.", "Chú ý lắng nghe lời thầy cô giảng.");
        reg("行", "明日東京へ行きます。", "Ashita Toukyou e ikimasu.", "Ngày mai tôi sẽ đi Tokyo.");
        reg("来", "来週友達が来ます。", "Raishuu tomodachi ga kimasu.", "Tuần tới bạn tôi sẽ đến chơi.");
        reg("帰", "夕方早く家へ帰ります。", "Yuugata hayaku ie e kaerimasu.", "Tôi về nhà sớm vào buổi chiều tà.");

        // 10. Đồ ăn & Đồ uống
        reg("米", "日本のお米はおいしいです。", "Nihon no okome wa amakute oishii desu.", "Gạo Nhật Bản dẻo ngọt rất ngon.");
        reg("茶", "温かいお茶をどうぞ。", "Atatakai ocha o douzo.", "Xin mời dùng tách trà ấm nóng.");
        reg("牛", "牛乳を毎日飲みます。", "Gyuunyuu o mainichi nomimasu.", "Tôi uống sữa bò mỗi ngày.");
        reg("肉", "晩ご飯に豚肉を食べます。", "Bangohan ni butaniku o tabemasu.", "Tôi ăn thịt vào bữa tối.");
        reg("魚", "川で新鮮な魚を釣りました。", "Kawa de shinsen na sakana o tsurimashita.", "Câu được cá tươi ngon ở con sông.");
        reg("貝", "海岸で貝殻を集めます。", "Kaigan de kaigara o atsumemasu.", "Nhặt vỏ sò bên bờ biển.");
        reg("好", "私は日本料理が大好きです。", "Watashi wa Nihon ryouri ga daisuki desu.", "Tôi rất yêu thích ẩm thực Nhật Bản.");
        reg("物", "食べ物をたくさん買いました。", "Tabemono o takusan kaimashita.", "Mua thật nhiều đồ ăn thức uống.");

        // 11. Thiên nhiên 2
        reg("林", "小鳥が林の中を飛んでいます。", "Kotori ga hayashi no naka o tonde imasu.", "Chú chim nhỏ bay trong khu rừng thưa.");
        reg("森", "静かな森の中を散策します。", "Shizuka na mori no naka o sansaku shimasu.", "Đi dạo ngắm cảnh trong khu rừng rậm.");
        reg("畑", "祖父が野菜の畑を耕します。", "Sofu ga yasai no hatake o tagayashimasu.", "Ông tôi chăm sóc vườn rau củ.");
        reg("岩", "川辺に大きな岩があります。", "Kawabe ni ookina iwa ga arimasu.", "Bên bờ sông có một tảng đá to.");
        reg("音", "雨の音が聞こえます。", "Ame no oto ga kikoemasu.", "Tôi nghe thấy tiếng mưa rơi.");
        reg("明", "この部屋は明るいです。", "Kono heya wa akarui desu.", "Căn phòng này rất sáng sủa.");
        reg("暗", "暗くなる前に帰りましょう。", "Kuraku naru mae ni kaerimashou.", "Hãy về nhà trước khi trời tối nhé.");

        // 12. Động từ 2
        reg("言", "日本語で「ありがとう」と言います。", "Nihongo de 'arigatou' to iimasu.", "Nói 'cảm ơn' bằng tiếng Nhật.");
        reg("書", "ノートにひらがなを書きます。", "Nooto ni hiragana o kakimasu.", "Viết chữ Hiragana vào vở.");
        reg("読", "図書館で小説を読みます。", "Toshokan de shousetsu o yomimasu.", "Đọc tiểu thuyết ở thư viện.");
        reg("話", "友達と楽しく話します。", "Tomodachi to tanoshiku hanashimasu.", "Nói chuyện vui vẻ với bạn bè.");
        reg("食", "毎朝朝ごはんをしっかり食べます。", "Maiasa asagohan o shikkari tabemasu.", "Mỗi sáng đều ăn sáng đầy đủ.");
        reg("飲", "冷たいジュースを飲みます。", "Tsumetai juusu o nomimasu.", "Uống một ly nước hoa quả mát lạnh.");
        reg("買", "スーパーで果物を買います。", "Suupaa de kudamono o kaimasu.", "Mua trái cây tươi ở siêu thị.");

        // 13. Phố xá & Phương hướng
        reg("町", "私の町は緑がいっぱいです。", "Watashi no machi wa midori ga ippai desu.", "Thị trấn của tôi ngập tràn cây xanh.");
        reg("寺", "京都のお寺を見学します。", "Kyouto no otera o kengaku shimasu.", "Tham quan ngôi chùa ở Kyoto.");
        reg("電", "電車で会社に通います。", "Densha de kaisha ni kayoimasu.", "Tôi đi làm bằng tàu điện.");
        reg("車", "新しい車を運転します。", "Atarashii kuruma o unten shimasu.", "Lái chiếc xe hơi mới.");
        reg("東", "東京は日本の東にあります。", "Toukyou wa Nihon no higashi ni arimasu.", "Tokyo nằm ở phía đông Nhật Bản.");
        reg("西", "太陽は西に沈みます。", "Taiyou wa nishi ni shizumimasu.", "Mặt trời lặn về hướng tây.");
        reg("南", "南の島へ旅行に行きたいです。", "Minami no shima e ryokou ni ikitai desu.", "Tôi muốn đi du lịch đảo phía nam.");
        reg("北", "北海道は日本の北にあります。", "Hokkaidou wa Nihon no kita ni arimasu.", "Hokkaido nằm ở phía bắc Nhật Bản.");

        // 14. Giờ giấc
        reg("時", "今何時ですか。", "Ima nanji desu ka.", "Bây giờ là mấy giờ rồi?");
        reg("間", "一時間勉強しました。", "Ichijikan benkyou shimashita.", "Tôi đã học trong một tiếng đồng hồ.");
        reg("半", "九時半に寝ます。", "Kujihan ni nemasu.", "Tôi đi ngủ lúc 9 giờ rưỡi.");
        reg("分", "あと十分で始まります。", "Ato juppun de hajimarimasu.", "Còn 10 phút nữa là bắt đầu rồi.");
        reg("今", "今日本語を勉強しています。", "Ima nihongo o benkyou shite imasu.", "Bây giờ tôi đang học tiếng Nhật.");
        reg("何", "何を食べたいですか。", "Nani o tabetai desu ka.", "Bạn muốn ăn món gì?");
        reg("夕", "夕方に散歩します。", "Yuugata ni sanpo shimasu.", "Đi dạo vào buổi chiều tà.");
        reg("方", "漢字の書き方を教えてください。", "Kanji no kakikata o oshiete kudasai.", "Xin hãy chỉ cho tôi cách viết chữ Hán này.");

        // 15. Tính từ
        reg("新", "新しい本を買いました。", "Atarashii hon o kaimashita.", "Tôi đã mua một cuốn sách mới.");
        reg("古", "古い建物を大切にします。", "Furui tatemono o taisetsu ni shimasu.", "Trân trọng gìn giữ công trình kiến trúc cổ.");
        reg("長", "夏休みは長いです。", "Natsuyasumi wa nagai desu.", "Kỳ nghỉ hè rất dài.");
        reg("安", "このリンゴは安くておいしいです。", "Kono ringo wa yasukute oishii desu.", "Quả táo này vừa rẻ vừa ngon.");
        reg("多", "公園に人が多いです。", "Kouen ni hito ga ooi desu.", "Có rất đông người ở công viên.");
        reg("少", "塩を少し加えます。", "Shio o sukoshi kuwaemasu.", "Thêm một chút xíu muối vào.");
        reg("元", "お元気ですか。", "Ogenki desu ka.", "Bạn có khỏe không?");
        reg("気", "今日は天気がいいです。", "Kyou wa tenki ga ii desu.", "Hôm nay thời tiết thật đẹp.");
    }

    private ExampleTriplet resolveFallbackExample(String character, String meaning, String kana) {
        if (character != null && EXAMPLE_REGISTRY.containsKey(character)) {
            return EXAMPLE_REGISTRY.get(character);
        }
        String cleanMeaning = (meaning != null && !meaning.isBlank()) ? meaning.split("[,;]")[0].trim() : "từ vựng";
        String cleanKana = (kana != null && !kana.isBlank()) ? kana.split("[,/、]")[0].trim() : character;
        return new ExampleTriplet(
                "「" + character + "」の言葉を毎日勉強します。",
                "'" + cleanKana + "' no kotoba o mainichi benkyou shimasu.",
                "Mỗi ngày tôi đều học chữ " + character + " (" + cleanMeaning + ")."
        );
    }
}
