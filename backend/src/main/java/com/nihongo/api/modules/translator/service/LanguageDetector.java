package com.nihongo.api.modules.translator.service;

/** Nhận diện ngôn ngữ nhanh bằng Unicode – không tốn API. */
public final class LanguageDetector {

    private LanguageDetector() {}

    private static final String VI_CHARS =
            "ăâđêôơưàảãáạằẳẵắặầẩẫấậèẻẽéẹềểễếệìỉĩíịòỏõóọồổỗốộờởỡớợùủũúụừửữứựỳỷỹýỵ";

    public static String detect(String text) {
        if (text == null || text.isBlank()) return "ja";
        for (char c : text.toCharArray()) {
            if ((c >= '\u3040' && c <= '\u30ff') || (c >= '\u4e00' && c <= '\u9fff')) return "ja";
        }
        String lower = text.toLowerCase();
        for (char c : lower.toCharArray()) {
            if (VI_CHARS.indexOf(c) >= 0) return "vi";
        }
        return "en";
    }
}

