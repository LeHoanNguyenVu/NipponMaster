package com.nihongo.api.modules.teacher.service;

import com.nihongo.api.modules.grammar.entity.Grammar;
import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.teacher.dto.TeacherContentDTO.*;
import com.nihongo.api.modules.vocabulary.entity.Vocabulary;

public interface TeacherContentService {

    Vocabulary createVocabulary(CreateVocabularyRequest request);
    Vocabulary updateVocabulary(Long id, CreateVocabularyRequest request);
    void deleteVocabulary(Long id);

    Kanji createKanji(CreateKanjiRequest request);
    Kanji updateKanji(Long id, CreateKanjiRequest request);
    void deleteKanji(Long id);

    Grammar createGrammar(CreateGrammarRequest request);
    Grammar updateGrammar(Long id, CreateGrammarRequest request);
    void deleteGrammar(Long id);
}
