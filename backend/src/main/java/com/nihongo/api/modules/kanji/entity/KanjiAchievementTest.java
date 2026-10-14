package com.nihongo.api.modules.kanji.entity;

import com.nihongo.api.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity đề thi tổng hợp theo chặng 5 chương (Achievement Tests).
 */
@Entity
@Table(name = "kanji_achievement_tests")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KanjiAchievementTest extends BaseEntity {

    /** Chặng 1 (Chương 1-5), Chặng 2 (Chương 6-10), Chặng 3 (Chương 11-15 & Tốt nghiệp N5) */
    @Column(nullable = false)
    private Integer stage;

    /** Tiêu đề bài thi chặng */
    @Column(nullable = false, length = 200)
    private String title;

    /** Mô tả phạm vi kiểm tra */
    @Column(columnDefinition = "TEXT")
    private String description;

    /** Tỷ lệ điểm phần trăm cần đạt để pass (mặc định 85%) */
    @Column(name = "pass_percentage", nullable = false)
    @Builder.Default
    private Integer passPercentage = 85;

    /** Cấu trúc đề thi và ngân hàng câu hỏi JSON */
    @Column(name = "test_data_json", nullable = false, columnDefinition = "TEXT")
    private String testDataJson;

    /** Thứ tự hiển thị */
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;
}
