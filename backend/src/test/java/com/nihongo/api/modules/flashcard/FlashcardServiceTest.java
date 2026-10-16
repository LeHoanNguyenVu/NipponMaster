package com.nihongo.api.modules.flashcard;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.flashcard.dto.FlashcardItemDto;
import com.nihongo.api.modules.flashcard.service.FlashcardService;
import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.kanji.repository.KanjiRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FlashcardServiceTest {

    @Mock
    private KanjiRepository kanjiRepository;

    private FlashcardService flashcardService;

    @BeforeEach
    void setUp() {
        flashcardService = new FlashcardService(kanjiRepository);
    }

    @Test
    void testGetQuickPracticeCards_mapsKanjiCorrectly() {
        Kanji kanji = Kanji.builder()
                .character("木")
                .kunReading("き")
                .romaji("ki")
                .hanViet("MỘC")
                .meaning("Cây cối, gỗ")
                .strokeCount(4)
                .strokeGuide("Nét ngang -> sổ thẳng")
                .exampleSentence("大きな木の下で休みます。")
                .exampleRomaji("Ookina ki no shita de yasumimasu.")
                .exampleMeaning("Nghỉ dưới gốc cây to.")
                .jlptLevel(User.JlptLevel.N5)
                .mnemonicTitle("Cây Cối (MỘC)")
                .mnemonicHint("Thân cây vươn thẳng")
                .mnemonicIcon("🌲")
                .build();
        kanji.setId(10L);

        when(kanjiRepository.findByJlptLevel(eq(User.JlptLevel.N5), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(kanji)));

        List<FlashcardItemDto> result = flashcardService.getQuickPracticeCards("N5", 30);

        assertNotNull(result);
        assertEquals(1, result.size());
        FlashcardItemDto item = result.get(0);
        assertEquals("木", item.getKanji());
        assertEquals("き", item.getKana());
        assertEquals("ki", item.getRomaji());
        assertEquals("MỘC", item.getHanViet());
        assertEquals("Cây cối, gỗ", item.getMeaning());
        assertEquals(4, item.getStrokeCount());
        assertEquals("N5", item.getJlptLevel());
        assertEquals("🌲", item.getMnemonicIcon());
    }
}
