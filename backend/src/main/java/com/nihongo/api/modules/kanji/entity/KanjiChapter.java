package com.nihongo.api.modules.kanji.entity;

import com.nihongo.api.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entity chương học Kanji Master (15 chương cho level N5).
 */
@Entity
@Table(name = "kanji_chapters", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"jlpt_level", "chapter_number"})
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KanjiChapter extends BaseEntity {

    /** Số thứ tự chương (1, 2, ..., 15) */
    @Column(name = "chapter_number", nullable = false)
    private Integer chapterNumber;

    /** Cấp độ JLPT (mặc định 'N5') */
    @Column(name = "jlpt_level", nullable = false, length = 10)
    private String jlptLevel;

    /** Tên chương tiếng Nhật (ví dụ: すうじ, カレンダー) */
    @Column(name = "title_ja", nullable = false, length = 100)
    private String titleJa;

    /** Tên chương tiếng Việt (ví dụ: Số đếm, Lịch biểu) */
    @Column(name = "title_vi", nullable = false, length = 200)
    private String titleVi;

    /** Tên chương tiếng Anh (ví dụ: Numbers, Calendar) */
    @Column(name = "title_en", length = 200)
    private String titleEn;

    /** Số lượng chữ Hán trong chương (ví dụ: 14, 8, 7) */
    @Column(name = "kanji_count", nullable = false)
    private Integer kanjiCount;

    /** Thứ tự hiển thị */
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;

    /** Đường dẫn ảnh tranh tượng hình mở đầu chương */
    @Column(name = "illustration_url", length = 500)
    private String illustrationUrl;

    /** Mô tả tóm tắt nội dung chương */
    @Column(columnDefinition = "TEXT")
    private String description;
}
