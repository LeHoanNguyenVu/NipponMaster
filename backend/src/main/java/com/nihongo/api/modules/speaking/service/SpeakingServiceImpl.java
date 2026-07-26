package com.nihongo.api.modules.speaking.service;

import com.nihongo.api.modules.speaking.dto.*;
import com.nihongo.api.modules.speaking.dto.SpeakingTurnResponse.CorrectionItem;
import com.nihongo.api.modules.speaking.dto.SpeakingTurnResponse.ScoreBreakdown;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SpeakingServiceImpl implements SpeakingService {

    // ===== Scenario Definitions =====
    private static final List<ScenarioData> SCENARIOS = List.of(
        new ScenarioData(
            "hotel", "Đặt phòng khách sạn", "ホテルの予約", "🏨",
            "Bạn đang gọi điện đặt phòng tại một khách sạn ở Tokyo. Nhân viên lễ tân sẽ hỏi bạn về ngày nhận/trả phòng, số khách và yêu cầu đặc biệt.",
            "N5",
            "いらっしゃいませ。東京ホテルでございます。ご予約のお問い合わせでしょうか？",
            "Irashaimase. Tōkyō hoteru de gozaimasu. Goyoyaku no otoiawase deshō ka?",
            List.of("予約したいです。", "シングルルームをお願いします。", "二泊三日でお願いします。"),
            Map.of(
                "予約", "はい、かしこまりました。何泊のご予定でしょうか？",
                "シングル", "シングルルームですね。お一人様でよろしいでしょうか？",
                "ダブル", "ダブルルームですね。お二人様でよろしいでしょうか？",
                "泊", "かしこまりました。チェックインのお日にちはいつになりますでしょうか？",
                "チェックイン", "チェックインは午後3時からとなっております。お名前をお伺いしてもよろしいでしょうか？",
                "名前", "ありがとうございます。ご予約を承りました。当日お待ちしております。",
                "ありがとう", "こちらこそ、ありがとうございます。よいご旅行をお過ごしください。",
                "はい", "かしこまりました。何かご希望はございますか？"
            ),
            "ご予約についてのお話をありがとうございました。素晴らしい会話でした！"
        ),
        new ScenarioData(
            "restaurant", "Gọi món tại nhà hàng", "レストランで注文する", "🍣",
            "Bạn đang ngồi tại một nhà hàng Nhật Bản. Phục vụ sẽ hỏi bạn muốn gọi món gì, đồ uống và các yêu cầu về thực đơn.",
            "N5",
            "いらっしゃいませ。何名様ですか？",
            "Irashaimase. Nan-mei-sama desu ka?",
            List.of("一人です。", "メニューをお願いします。", "おすすめは何ですか？"),
            Map.of(
                "一人", "はい、こちらのお席へどうぞ。メニューをどうぞ。",
                "二人", "はい、こちらのテーブルへどうぞ。メニューをどうぞ。",
                "メニュー", "はい、こちらがメニューでございます。ごゆっくりどうぞ。",
                "おすすめ", "今日のおすすめは寿司定食と天ぷらうどんでございます。",
                "寿司", "寿司定食ですね。お飲み物はいかがですか？",
                "天ぷら", "天ぷらうどんですね。お飲み物はいかがですか？",
                "水", "お水ですね。かしこまりました。少々お待ちください。",
                "お茶", "お茶ですね。かしこまりました。すぐにお持ちします。",
                "お願いします", "かしこまりました。ご注文を繰り返させていただきます。少々お待ちください。",
                "ありがとう", "ごゆっくりどうぞ。何かございましたらお呼びください。"
            ),
            "ご注文ありがとうございました。日本語での注文、とても上手でした！"
        ),
        new ScenarioData(
            "interview", "Phỏng vấn xin việc", "面接", "💼",
            "Bạn đang tham gia buổi phỏng vấn xin việc tại một công ty Nhật Bản. Người phỏng vấn sẽ hỏi về bản thân, kinh nghiệm và lý do ứng tuyển.",
            "N4",
            "本日はお越しいただきありがとうございます。まず、自己紹介をお願いします。",
            "Honjitsu wa okoshi itadaki arigatō gozaimasu. Mazu, jiko-shōkai o onegai shimasu.",
            List.of("はじめまして。私は〇〇です。", "ベトナムから来ました。", "日本語を勉強しています。"),
            Map.of(
                "はじめまして", "はい、よろしくお願いします。今のお仕事について教えていただけますか？",
                "ベトナム", "ベトナムからですか。日本語はどのくらい勉強されていますか？",
                "勉強", "なるほど、素晴らしいですね。なぜ弊社に応募されたのですか？",
                "応募", "ありがとうございます。弊社で特にやりたいことはありますか？",
                "仕事", "どのようなお仕事をされてきたのか、もう少し詳しく教えてください。",
                "経験", "なるほど、良い経験をお持ちですね。弊社でもきっと活かせると思います。",
                "よろしく", "こちらこそ、よろしくお願いします。結果は来週ご連絡いたします。",
                "ありがとう", "お時間をいただきありがとうございました。結果をお楽しみにお待ちください。"
            ),
            "面接は以上です。本日は素晴らしい日本語で面接に臨んでいただき、ありがとうございました。"
        ),
        new ScenarioData(
            "directions", "Hỏi đường đi", "道を聞く", "🗺️",
            "Bạn đang lạc đường ở Shibuya, Tokyo. Bạn cần hỏi người qua đường chỉ đường đến ga tàu gần nhất.",
            "N5",
            "こんにちは。何かお困りですか？",
            "Konnichiwa. Nanika okomari desu ka?",
            List.of("すみません、駅はどこですか？", "この近くにコンビニはありますか？", "地図を見てもらえますか？"),
            Map.of(
                "駅", "駅ですか？ここをまっすぐ行って、二つ目の角を右に曲がってください。",
                "コンビニ", "コンビニはあの信号を左に曲がると、すぐ右にありますよ。",
                "まっすぐ", "はい、まっすぐ5分ぐらい歩くと、左に見えますよ。",
                "右", "そうです、右に曲がると駅の入り口が見えます。",
                "左", "はい、左に曲がってください。すぐに見つかりますよ。",
                "遠い", "いいえ、歩いて5分ぐらいですよ。大丈夫です。",
                "地図", "ここが今いる場所で、駅はこの方向です。分かりますか？",
                "ありがとう", "いいえ、どういたしまして。気をつけてくださいね。"
            ),
            "道案内の会話をありがとうございました。上手に質問できましたね！"
        ),
        new ScenarioData(
            "shopping", "Mua sắm", "買い物", "🛍️",
            "Bạn đang mua sắm tại một cửa hàng quần áo ở Harajuku. Nhân viên bán hàng sẽ giúp bạn tìm kiếm sản phẩm phù hợp.",
            "N5",
            "いらっしゃいませ。何かお探しですか？",
            "Irashaimase. Nanika osagashi desu ka?",
            List.of("Tシャツを探しています。", "これはいくらですか？", "試着してもいいですか？"),
            Map.of(
                "Tシャツ", "Tシャツですね。こちらに新しいデザインがありますよ。何色がお好みですか？",
                "探して", "はい、どのような商品をお探しですか？サイズやお色の希望はありますか？",
                "いくら", "こちらは3,000円でございます。今日はセールで20%オフになっています。",
                "試着", "はい、もちろんです。試着室はあちらにございます。",
                "サイズ", "S、M、L、LLサイズがございます。どのサイズをお試しになりますか？",
                "色", "黒、白、赤、青がございます。どの色がよろしいですか？",
                "買います", "ありがとうございます。お会計はレジでお願いいたします。",
                "ありがとう", "ありがとうございました。またのお越しをお待ちしております。"
            ),
            "お買い物の会話をありがとうございました。とても自然な日本語でした！"
        ),
        new ScenarioData(
            "hospital", "Khám bệnh", "病院で", "🏥",
            "Bạn đang ở phòng khám bệnh viện tại Nhật. Bác sĩ sẽ hỏi bạn về triệu chứng, tình trạng sức khỏe và kê đơn thuốc.",
            "N4",
            "こんにちは。今日はどうされましたか？",
            "Konnichiwa. Kyō wa dō saremashita ka?",
            List.of("頭が痛いです。", "熱があります。", "昨日から具合が悪いです。"),
            Map.of(
                "頭", "頭が痛いのですね。いつから痛いですか？",
                "熱", "お熱ですね。何度くらいありますか？体温を測りましょう。",
                "痛い", "いつから痛みがありますか？他に症状はありますか？",
                "昨日", "昨日からですか。食欲はありますか？よく眠れましたか？",
                "食欲", "分かりました。お薬を処方しますので、食後に飲んでください。",
                "薬", "このお薬を1日3回、食後に飲んでください。3日分お出しします。",
                "大丈夫", "ゆっくり休んでください。お大事にしてください。",
                "ありがとう", "お大事にしてください。何かあればまたお越しください。"
            ),
            "診察の会話をありがとうございました。症状をしっかり伝えることができましたね！"
        )
    );

    @Override
    public List<SpeakingScenarioResponse> getScenarios() {
        return SCENARIOS.stream()
                .map(s -> SpeakingScenarioResponse.builder()
                        .id(s.id)
                        .title(s.title)
                        .titleJp(s.titleJp)
                        .description(s.description)
                        .icon(s.icon)
                        .level(s.level)
                        .aiGreeting(s.aiGreeting)
                        .aiGreetingReading(s.aiGreetingReading)
                        .suggestedPhrases(s.suggestedPhrases)
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public SpeakingScenarioResponse startScenario(SpeakingScenarioRequest request) {
        ScenarioData scenario = SCENARIOS.stream()
                .filter(s -> s.id.equals(request.getScenarioId()))
                .findFirst()
                .orElse(SCENARIOS.get(0));

        return SpeakingScenarioResponse.builder()
                .id(scenario.id)
                .title(scenario.title)
                .titleJp(scenario.titleJp)
                .description(scenario.description)
                .icon(scenario.icon)
                .level(scenario.level)
                .aiGreeting(scenario.aiGreeting)
                .aiGreetingReading(scenario.aiGreetingReading)
                .suggestedPhrases(scenario.suggestedPhrases)
                .build();
    }

    @Override
    public SpeakingTurnResponse processTurn(SpeakingTurnRequest request) {
        ScenarioData scenario = SCENARIOS.stream()
                .filter(s -> s.id.equals(request.getScenarioId()))
                .findFirst()
                .orElse(SCENARIOS.get(0));

        String userMsg = request.getUserMessage();
        int turnCount = request.getConversationHistory() != null ? request.getConversationHistory().size() : 0;

        // Check if conversation should end (after ~6 turns each side)
        boolean shouldEnd = turnCount >= 10;

        // Find best matching AI reply from pattern map
        String aiReply = findBestReply(scenario, userMsg);
        if (shouldEnd) {
            aiReply = scenario.completionMessage;
        }

        // Analyze and score the user's Japanese input
        List<CorrectionItem> corrections = analyzeCorrections(userMsg);
        ScoreBreakdown score = calculateScore(userMsg, corrections);

        // Generate suggested next phrases
        List<String> suggestions = generateSuggestions(scenario, userMsg, turnCount);

        return SpeakingTurnResponse.builder()
                .aiReply(aiReply)
                .aiReplyReading(generateReading(aiReply))
                .aiReplyMeaning(generateMeaning(aiReply, scenario))
                .corrections(corrections)
                .score(score)
                .suggestedNextPhrases(shouldEnd ? List.of() : suggestions)
                .conversationComplete(shouldEnd)
                .build();
    }

    // ===== Internal Helpers =====

    private String findBestReply(ScenarioData scenario, String userMsg) {
        // Try to match keywords from the response patterns
        String bestReply = null;
        int bestScore = 0;

        for (Map.Entry<String, String> entry : scenario.responsePatterns.entrySet()) {
            if (userMsg.contains(entry.getKey())) {
                int score = entry.getKey().length(); // Longer keyword match = better
                if (score > bestScore) {
                    bestScore = score;
                    bestReply = entry.getValue();
                }
            }
        }

        if (bestReply != null) return bestReply;

        // Fallback generic responses
        List<String> fallbacks = List.of(
            "なるほど、そうですか。もう少し詳しく教えていただけますか？",
            "はい、分かりました。他に何かありますか？",
            "そうですね。次はどうしましょうか？"
        );
        return fallbacks.get(new Random().nextInt(fallbacks.size()));
    }

    private List<CorrectionItem> analyzeCorrections(String userMsg) {
        List<CorrectionItem> corrections = new ArrayList<>();

        // Common grammar mistakes analysis
        if (userMsg.contains("私は") && userMsg.contains("です") && !userMsg.contains("。")) {
            corrections.add(CorrectionItem.builder()
                    .original(userMsg)
                    .corrected(userMsg + "。")
                    .explanation("Câu tiếng Nhật thường kết thúc bằng dấu chấm câu 「。」")
                    .type("grammar")
                    .build());
        }

        // Check for missing particles
        if (userMsg.matches(".*[\\u4e00-\\u9faf][\\u4e00-\\u9faf].*") && !userMsg.matches(".*[はがをにでへとのもや].*")) {
            corrections.add(CorrectionItem.builder()
                    .original(userMsg)
                    .corrected(userMsg)
                    .explanation("Hãy thử sử dụng trợ từ (は、が、を、に、で...) để câu tự nhiên hơn.")
                    .type("grammar")
                    .build());
        }

        // Check for polite form
        if (userMsg.length() > 3 && !userMsg.contains("ます") && !userMsg.contains("です")
                && !userMsg.contains("ください") && !userMsg.contains("ません")) {
            corrections.add(CorrectionItem.builder()
                    .original(userMsg)
                    .corrected(userMsg)
                    .explanation("Trong hội thoại formal, hãy sử dụng thể lịch sự (〜ます / 〜です).")
                    .type("grammar")
                    .build());
        }

        return corrections;
    }

    private ScoreBreakdown calculateScore(String userMsg, List<CorrectionItem> corrections) {
        int baseScore = 75;

        // Bonus for using Japanese characters
        long jpCharCount = userMsg.chars().filter(c ->
                (c >= 0x3040 && c <= 0x309F) || // Hiragana
                (c >= 0x30A0 && c <= 0x30FF) || // Katakana
                (c >= 0x4E00 && c <= 0x9FAF)    // Kanji
        ).count();

        int pronunciationScore = Math.min(100, baseScore + (int)(jpCharCount * 3));
        int grammarScore = Math.max(50, 95 - corrections.size() * 15);
        int vocabScore = Math.min(100, 70 + (int)(jpCharCount * 2));
        int overall = (pronunciationScore + grammarScore + vocabScore) / 3;

        String feedback;
        if (overall >= 90) feedback = "素晴らしい！非常に自然な日本語です。(Tuyệt vời! Tiếng Nhật rất tự nhiên.)";
        else if (overall >= 75) feedback = "良いですね！もう少し練習すればもっと上手になります。(Tốt lắm! Luyện thêm sẽ giỏi hơn.)";
        else if (overall >= 60) feedback = "頑張っています！文法をもう少し注意しましょう。(Cố gắng tốt! Hãy chú ý ngữ pháp hơn.)";
        else feedback = "もっと練習しましょう！基本的な文型から始めてみてください。(Hãy luyện thêm! Bắt đầu từ mẫu câu cơ bản.)";

        return ScoreBreakdown.builder()
                .pronunciation(pronunciationScore)
                .grammar(grammarScore)
                .vocabulary(vocabScore)
                .overall(overall)
                .feedback(feedback)
                .build();
    }

    private List<String> generateSuggestions(ScenarioData scenario, String userMsg, int turnCount) {
        // Return contextual suggestions based on turn count
        List<List<String>> suggestionSets = List.of(
            scenario.suggestedPhrases,
            List.of("はい、お願いします。", "もう一度言ってください。", "分かりました。"),
            List.of("ありがとうございます。", "他にありますか？", "大丈夫です。")
        );

        int index = Math.min(turnCount / 2, suggestionSets.size() - 1);
        return suggestionSets.get(index);
    }

    private String generateReading(String text) {
        // Simplified reading generation for common phrases
        Map<String, String> readings = Map.ofEntries(
            Map.entry("かしこまりました", "kashikomarimashita"),
            Map.entry("ありがとうございます", "arigatō gozaimasu"),
            Map.entry("いらっしゃいませ", "irasshaimase"),
            Map.entry("お待ちしております", "omachi shite orimasu"),
            Map.entry("よろしくお願いします", "yoroshiku onegai shimasu"),
            Map.entry("少々お待ちください", "shōshō omachi kudasai"),
            Map.entry("お大事にしてください", "odaiji ni shite kudasai")
        );

        for (Map.Entry<String, String> entry : readings.entrySet()) {
            if (text.contains(entry.getKey())) {
                return entry.getValue();
            }
        }
        return "";
    }

    private String generateMeaning(String aiReply, ScenarioData scenario) {
        // Simplified Vietnamese meaning for common AI replies
        Map<String, String> meanings = Map.ofEntries(
            Map.entry("かしこまりました", "Vâng, tôi đã hiểu rồi ạ."),
            Map.entry("何かございましたら", "Nếu có gì xin hãy gọi."),
            Map.entry("少々お待ちください", "Xin vui lòng chờ một chút."),
            Map.entry("お大事にしてください", "Xin giữ gìn sức khỏe."),
            Map.entry("ごゆっくりどうぞ", "Xin mời thưởng thức."),
            Map.entry("お待ちしております", "Chúng tôi sẽ chờ đón bạn."),
            Map.entry("ありがとうございました", "Xin cảm ơn rất nhiều."),
            Map.entry("どういたしまして", "Không có gì."),
            Map.entry("お元気で", "Chúc sức khỏe.")
        );

        for (Map.Entry<String, String> entry : meanings.entrySet()) {
            if (aiReply.contains(entry.getKey())) {
                return entry.getValue();
            }
        }
        return "Phản hồi từ AI trong kịch bản hội thoại.";
    }

    // ===== Data class =====
    private static class ScenarioData {
        final String id;
        final String title;
        final String titleJp;
        final String icon;
        final String description;
        final String level;
        final String aiGreeting;
        final String aiGreetingReading;
        final List<String> suggestedPhrases;
        final Map<String, String> responsePatterns;
        final String completionMessage;

        ScenarioData(String id, String title, String titleJp, String icon, String description,
                     String level, String aiGreeting, String aiGreetingReading,
                     List<String> suggestedPhrases, Map<String, String> responsePatterns,
                     String completionMessage) {
            this.id = id;
            this.title = title;
            this.titleJp = titleJp;
            this.icon = icon;
            this.description = description;
            this.level = level;
            this.aiGreeting = aiGreeting;
            this.aiGreetingReading = aiGreetingReading;
            this.suggestedPhrases = suggestedPhrases;
            this.responsePatterns = responsePatterns;
            this.completionMessage = completionMessage;
        }
    }
}
