package com.nihongo.api.modules.teacher.service;

import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.grammar.entity.Grammar;
import com.nihongo.api.modules.grammar.repository.GrammarRepository;
import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.kanji.repository.KanjiRepository;
import com.nihongo.api.modules.teacher.dto.TeacherContentDTO.*;
import com.nihongo.api.modules.vocabulary.entity.Vocabulary;
import com.nihongo.api.modules.vocabulary.repository.VocabularyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TeacherContentServiceTest {

    @Mock
    private VocabularyRepository vocabularyRepository;

    @Mock
    private KanjiRepository kanjiRepository;

    @Mock
    private GrammarRepository grammarRepository;

    @InjectMocks
    private TeacherContentServiceImpl teacherContentService;

    private CreateVocabularyRequest vocabRequest;
    private CreateKanjiRequest kanjiRequest;
    private CreateGrammarRequest grammarRequest;

    @BeforeEach
    void setUp() {
        vocabRequest = CreateVocabularyRequest.builder()
                .word("食べる")
                .reading("たべる")
                .meaning("Ăn")
                .jlptLevel(User.JlptLevel.N5)
                .wordType(Vocabulary.WordType.VERB)
                .build();

        kanjiRequest = CreateKanjiRequest.builder()
                .character("食")
                .meaning("Thực")
                .onReading("ショク")
                .kunReading("た.べる")
                .strokeCount(9)
                .jlptLevel(User.JlptLevel.N5)
                .build();

        grammarRequest = CreateGrammarRequest.builder()
                .title("～てから")
                .structure("V-て + から")
                .meaning("Sau khi làm V thì...")
                .jlptLevel(User.JlptLevel.N5)
                .build();
    }

    @Test
    void testCreateVocabulary_Success() {
        Vocabulary vocab = Vocabulary.builder().word("食べる").reading("たべる").meaning("Ăn").jlptLevel(User.JlptLevel.N5).build();
        vocab.setId(1L);
        when(vocabularyRepository.save(any(Vocabulary.class))).thenReturn(vocab);

        Vocabulary created = teacherContentService.createVocabulary(vocabRequest);

        assertNotNull(created);
        assertEquals("食べる", created.getWord());
        verify(vocabularyRepository, times(1)).save(any(Vocabulary.class));
    }

    @Test
    void testCreateKanji_Success() {
        Kanji kanji = Kanji.builder().character("食").meaning("Thực").strokeCount(9).jlptLevel(User.JlptLevel.N5).build();
        kanji.setId(1L);
        when(kanjiRepository.save(any(Kanji.class))).thenReturn(kanji);

        Kanji created = teacherContentService.createKanji(kanjiRequest);

        assertNotNull(created);
        assertEquals("食", created.getCharacter());
        verify(kanjiRepository, times(1)).save(any(Kanji.class));
    }

    @Test
    void testCreateGrammar_Success() {
        Grammar grammar = Grammar.builder().pattern("～てから").structure("V-て + から").meaning("Sau khi").jlptLevel(User.JlptLevel.N5).build();
        grammar.setId(1L);
        when(grammarRepository.save(any(Grammar.class))).thenReturn(grammar);

        Grammar created = teacherContentService.createGrammar(grammarRequest);

        assertNotNull(created);
        assertEquals("～てから", created.getPattern());
        verify(grammarRepository, times(1)).save(any(Grammar.class));
    }

    @Test
    void testDeleteVocabulary_Success() {
        when(vocabularyRepository.existsById(1L)).thenReturn(true);
        doNothing().when(vocabularyRepository).deleteById(1L);

        assertDoesNotThrow(() -> teacherContentService.deleteVocabulary(1L));
        verify(vocabularyRepository, times(1)).deleteById(1L);
    }
}
