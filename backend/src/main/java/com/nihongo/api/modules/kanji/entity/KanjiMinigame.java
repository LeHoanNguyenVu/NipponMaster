package com.nihongo.api.modules.kanji.entity;

import com.nihongo.api.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity minigame tình huống (Phép cộng chữ, câu đố tranh minh họa, đếm đồ vật).
 */
@Entity
@Table(name = "kanji_minigames")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KanjiMinigame extends BaseEntity {

    @Column(name = "chapter_id", nullable = false)
    private Long chapterId;

    /** Loại trò chơi: 'ORDERING', 'COUNTING', 'CALCULATION', 'POSTCARD_FILL', 'KANJI_ADDITION', 'PICTURE_MATCH' */
    @Column(name = "game_type", nullable = false, length = 50)
    private String gameType;

    /** Tiêu đề minigame */
    @Column(nullable = false, length = 200)
    private String title;

    /** Hướng dẫn cách chơi / luật chơi */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String instruction;

    /** URL ảnh gốc bài tập từ sách (ví dụ: /assets/kanji/n5/minigames/chap1_minigame_p20.webp) */
    @Column(name = "image_url", length = 500)
    private String imageUrl;

    /** Dữ liệu cấu hình các câu hỏi / câu đố dạng JSON */
    @Column(name = "game_data_json", nullable = false, columnDefinition = "TEXT")
    private String gameDataJson;

    /** Thứ tự hiển thị */
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;
}
