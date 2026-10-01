package com.nihongo.api.modules.teacher.service;

import com.nihongo.api.modules.grammar.entity.Grammar;
import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.teacher.dto.TeacherContentDTO.*;

public interface TeacherContentService {

    Kanji createKanji(CreateKanjiRequest request);
    Kanji updateKanji(Long id, CreateKanjiRequest request);
    void deleteKanji(Long id);

    Grammar createGrammar(CreateGrammarRequest request);
    Grammar updateGrammar(Long id, CreateGrammarRequest request);
    void deleteGrammar(Long id);
}
