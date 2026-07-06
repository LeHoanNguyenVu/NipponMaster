package com.nihongo.api.modules.flashcard.dto;

import com.nihongo.api.modules.flashcard.entity.Flashcard;
import lombok.*;

import java.util.List;

/**
 * DTO trả về phiên ôn tập.
 * Gồm: thẻ mới (new) + thẻ ôn lại (review) + thống kê.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudySessionResponse {

    /** Tổng số thẻ mới trong phiên */
    private int newCount;

    /** Tổng số thẻ cần ôn lại */
    private int reviewCount;

    /** Danh sách toàn bộ thẻ (new + review, đã trộn) */
    private List<Flashcard> cards;
}
