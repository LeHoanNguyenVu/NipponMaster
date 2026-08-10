package com.nihongo.api.modules.teacher.service;

import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.grammar.entity.Grammar;
import com.nihongo.api.modules.grammar.repository.GrammarRepository;
import com.nihongo.api.modules.kanji.entity.Kanji;
import com.nihongo.api.modules.kanji.repository.KanjiRepository;
import com.nihongo.api.modules.teacher.dto.TeacherContentDTO.*;
import com.nihongo.api.modules.vocabulary.entity.Vocabulary;
import com.nihongo.api.modules.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TeacherContentServiceImpl implements TeacherContentService {

    private final VocabularyRepository vocabularyRepository;
    private final KanjiRepository kanjiRepository;
    private final GrammarRepository grammarRepository;

    // ===== VOCABULARY MANAGEMENT =====

    @Override
    @Transactional
    public Vocabulary createVocabulary(CreateVocabularyRequest request) {
        log.info("👨‍🏫 Giảng viên tạo Từ Vựng mới: {}", request.getWord());
        Vocabulary vocab = Vocabulary.builder()
                .word(request.getWord())
                .reading(request.getReading())
                .meaning(request.getMeaning())
                .exampleSentence(request.getExampleSentence())
                .exampleMeaning(request.getExampleMeaning())
                .jlptLevel(request.getJlptLevel())
                .wordType(request.getWordType() != null ? request.getWordType() : Vocabulary.WordType.NOUN)
                .topic(request.getTopic() != null ? request.getTopic() : "GENERAL")
                .build();
        return vocabularyRepository.save(vocab);
    }

    @Override
    @Transactional
    public Vocabulary updateVocabulary(Long id, CreateVocabularyRequest request) {
        log.info("👨‍🏫 Giảng viên cập nhật Từ Vựng ID {}", id);
        Vocabulary vocab = vocabularyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy từ vựng ID: " + id));

        vocab.setWord(request.getWord());
        vocab.setReading(request.getReading());
        vocab.setMeaning(request.getMeaning());
        vocab.setExampleSentence(request.getExampleSentence());
        vocab.setExampleMeaning(request.getExampleMeaning());
        vocab.setJlptLevel(request.getJlptLevel());
        if (request.getWordType() != null) vocab.setWordType(request.getWordType());
        if (request.getTopic() != null) vocab.setTopic(request.getTopic());

        return vocabularyRepository.save(vocab);
    }

    @Override
    @Transactional
    public void deleteVocabulary(Long id) {
        log.info("👨‍🏫 Giảng viên xóa Từ Vựng ID {}", id);
        if (!vocabularyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Không tìm thấy từ vựng ID: " + id);
        }
        vocabularyRepository.deleteById(id);
    }

    // ===== KANJI MANAGEMENT =====

    @Override
    @Transactional
    public Kanji createKanji(CreateKanjiRequest request) {
        log.info("👨‍🏫 Giảng viên tạo Hán Tự Kanji mới: {}", request.getCharacter());
        Kanji kanji = Kanji.builder()
                .character(request.getCharacter())
                .meaning(request.getMeaning())
                .onReading(request.getOnReading())
                .kunReading(request.getKunReading())
                .strokeCount(request.getStrokeCount())
                .radical(request.getRadical())
                .relatedWords(request.getRelatedWords())
                .jlptLevel(request.getJlptLevel())
                .build();
        return kanjiRepository.save(kanji);
    }

    @Override
    @Transactional
    public Kanji updateKanji(Long id, CreateKanjiRequest request) {
        log.info("👨‍🏫 Giảng viên cập nhật Hán Tự Kanji ID {}", id);
        Kanji kanji = kanjiRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy Kanji ID: " + id));

        kanji.setCharacter(request.getCharacter());
        kanji.setMeaning(request.getMeaning());
        kanji.setOnReading(request.getOnReading());
        kanji.setKunReading(request.getKunReading());
        kanji.setStrokeCount(request.getStrokeCount());
        kanji.setRadical(request.getRadical());
        kanji.setRelatedWords(request.getRelatedWords());
        kanji.setJlptLevel(request.getJlptLevel());

        return kanjiRepository.save(kanji);
    }

    @Override
    @Transactional
    public void deleteKanji(Long id) {
        log.info("👨‍🏫 Giảng viên xóa Hán Tự Kanji ID {}", id);
        if (!kanjiRepository.existsById(id)) {
            throw new ResourceNotFoundException("Không tìm thấy Kanji ID: " + id);
        }
        kanjiRepository.deleteById(id);
    }

    // ===== GRAMMAR MANAGEMENT =====

    @Override
    @Transactional
    public Grammar createGrammar(CreateGrammarRequest request) {
        log.info("👨‍🏫 Giảng viên tạo Ngữ Pháp mới: {}", request.getTitle());
        Grammar grammar = Grammar.builder()
                .pattern(request.getTitle())
                .structure(request.getStructure())
                .meaning(request.getMeaning())
                .notes(request.getUsageNotes())
                .exampleSentence(request.getExampleSentences())
                .jlptLevel(request.getJlptLevel())
                .build();
        return grammarRepository.save(grammar);
    }

    @Override
    @Transactional
    public Grammar updateGrammar(Long id, CreateGrammarRequest request) {
        log.info("👨‍🏫 Giảng viên cập nhật Ngữ Pháp ID {}", id);
        Grammar grammar = grammarRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy Ngữ Pháp ID: " + id));

        grammar.setPattern(request.getTitle());
        grammar.setStructure(request.getStructure());
        grammar.setMeaning(request.getMeaning());
        grammar.setNotes(request.getUsageNotes());
        grammar.setExampleSentence(request.getExampleSentences());
        grammar.setJlptLevel(request.getJlptLevel());

        return grammarRepository.save(grammar);
    }

    @Override
    @Transactional
    public void deleteGrammar(Long id) {
        log.info("👨‍🏫 Giảng viên xóa Ngữ Pháp ID {}", id);
        if (!grammarRepository.existsById(id)) {
            throw new ResourceNotFoundException("Không tìm thấy Ngữ Pháp ID: " + id);
        }
        grammarRepository.deleteById(id);
    }
}
