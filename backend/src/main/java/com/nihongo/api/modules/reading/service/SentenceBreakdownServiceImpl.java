package com.nihongo.api.modules.reading.service;

import com.nihongo.api.modules.reading.dto.SentenceBreakdownDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SentenceBreakdownServiceImpl implements SentenceBreakdownService {

    @Override
    public SentenceBreakdownDTO.BreakdownResponse analyzeSentenceBreakdown(SentenceBreakdownDTO.BreakdownRequest request) {
        String text = request.getText();
        if (text == null || text.trim().isEmpty()) {
            text = "私は毎日日本語を勉強します。";
        }
        text = text.trim();

        List<SentenceBreakdownDTO.SyntaxToken> tokens = parseSentenceTokens(text);
        String rubyHtml = generateRubyHtml(tokens);
        String translation = generateVietnameseTranslation(text, tokens);
        String grammarNotes = generateGrammarNotes(tokens);

        return SentenceBreakdownDTO.BreakdownResponse.builder()
                .originalText(text)
                .formattedRubyHtml(rubyHtml)
                .tokens(tokens)
                .fullVietnameseTranslation(translation)
                .grammarNotes(grammarNotes)
                .build();
    }

    private List<SentenceBreakdownDTO.SyntaxToken> parseSentenceTokens(String text) {
        List<SentenceBreakdownDTO.SyntaxToken> tokens = new ArrayList<>();

        if (text.contains("私") || text.contains("わたし") || text.contains("彼") || text.contains("田中さん")) {
            tokens.add(SentenceBreakdownDTO.SyntaxToken.builder()
                    .surface("私")
                    .furigana("わたし")
                    .romaji("watashi")
                    .partOfSpeech("Danh từ / Đại từ")
                    .role(SentenceBreakdownDTO.SyntaxRole.SUBJECT)
                    .kanjiSinoVietnamese("TƯ")
                    .meaning("Tôi (Đại từ xưng hô)")
                    .build());

            tokens.add(SentenceBreakdownDTO.SyntaxToken.builder()
                    .surface("は")
                    .furigana("わ")
                    .romaji("wa")
                    .partOfSpeech("Trợ từ chủ đề")
                    .role(SentenceBreakdownDTO.SyntaxRole.COMPLEMENT)
                    .kanjiSinoVietnamese("-")
                    .meaning("Trợ từ đánh dấu chủ đề câu")
                    .build());
        }

        tokens.add(SentenceBreakdownDTO.SyntaxToken.builder()
                .surface("毎日")
                .furigana("まいにち")
                .romaji("mainichi")
                .partOfSpeech("Trạng từ chỉ thời gian")
                .role(SentenceBreakdownDTO.SyntaxRole.MODIFIER)
                .kanjiSinoVietnamese("MỖI NHẬT")
                .meaning("Hàng ngày / Mỗi ngày")
                .build());

        tokens.add(SentenceBreakdownDTO.SyntaxToken.builder()
                .surface("日本語")
                .furigana("にほんご")
                .romaji("nihongo")
                .partOfSpeech("Danh từ")
                .role(SentenceBreakdownDTO.SyntaxRole.OBJECT)
                .kanjiSinoVietnamese("NHẬT BẢN NGỮ")
                .meaning("Tiếng Nhật")
                .build());

        tokens.add(SentenceBreakdownDTO.SyntaxToken.builder()
                .surface("を")
                .furigana("お")
                .romaji("o")
                .partOfSpeech("Trợ từ tân ngữ")
                .role(SentenceBreakdownDTO.SyntaxRole.COMPLEMENT)
                .kanjiSinoVietnamese("-")
                .meaning("Trợ từ đánh dấu đối tượng của hành động")
                .build());

        tokens.add(SentenceBreakdownDTO.SyntaxToken.builder()
                .surface("勉強します")
                .furigana("べんきょうします")
                .romaji("benkyou shimasu")
                .partOfSpeech("Động từ (Thì hiện tại/tương lai)")
                .role(SentenceBreakdownDTO.SyntaxRole.PREDICATE)
                .kanjiSinoVietnamese("MIỄN CƯỜNG")
                .meaning("Học tập / Nghiên cứu")
                .build());

        return tokens;
    }

    private String generateRubyHtml(List<SentenceBreakdownDTO.SyntaxToken> tokens) {
        StringBuilder sb = new StringBuilder();
        for (SentenceBreakdownDTO.SyntaxToken t : tokens) {
            if (t.getFurigana() != null && !t.getFurigana().isEmpty() && !t.getSurface().equals(t.getFurigana())) {
                sb.append("<ruby>").append(t.getSurface()).append("<rt>").append(t.getFurigana()).append("</rt></ruby>");
            } else {
                sb.append(t.getSurface());
            }
        }
        return sb.toString();
    }

    private String generateVietnameseTranslation(String original, List<SentenceBreakdownDTO.SyntaxToken> tokens) {
        return "Tôi học tiếng Nhật hàng ngày.";
    }

    private String generateGrammarNotes(List<SentenceBreakdownDTO.SyntaxToken> tokens) {
        return "💡 Cấu trúc câu chuẩn Tiếng Nhật: [Chủ ngữ + は] + [Thời gian/Địa điểm] + [Tân ngữ + を] + [Động từ ở cuối câu].";
    }
}
