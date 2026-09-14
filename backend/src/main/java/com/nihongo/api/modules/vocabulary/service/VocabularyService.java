package com.nihongo.api.modules.vocabulary.service;

import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.vocabulary.entity.Vocabulary;
import com.nihongo.api.modules.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class VocabularyService {

    private final VocabularyRepository vocabularyRepository;

    @Transactional(readOnly = true)
    @Cacheable(value = "vocabularies", key = "'all:' + #pageable.pageNumber + ':' + #pageable.pageSize")
    public PageResponse<Vocabulary> getAll(Pageable pageable) {
        Page<Vocabulary> page = vocabularyRepository.findAll(pageable);
        return PageResponse.from(page);
    }

    @Transactional(readOnly = true)
    public Vocabulary getById(Long id) {
        return vocabularyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Từ vựng", id));
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "vocabularies", key = "'level:' + #level + ':' + #pageable.pageNumber + ':' + #pageable.pageSize")
    public PageResponse<Vocabulary> getByLevel(User.JlptLevel level, Pageable pageable) {
        Page<Vocabulary> page = vocabularyRepository.findByJlptLevel(level, pageable);
        return PageResponse.from(page);
    }

    @Transactional(readOnly = true)
    public PageResponse<Vocabulary> search(String keyword, Pageable pageable) {
        Page<Vocabulary> page = vocabularyRepository.searchByKeyword(keyword, pageable);
        return PageResponse.from(page);
    }

    @Transactional(readOnly = true)
    public PageResponse<Vocabulary> searchWithFilters(String keyword, User.JlptLevel level, Vocabulary.WordType wordType, Pageable pageable) {
        Page<Vocabulary> page = vocabularyRepository.searchWithFilters(keyword, level, wordType, pageable);
        return PageResponse.from(page);
    }

    @Transactional
    @CacheEvict(value = "vocabularies", allEntries = true)
    public Vocabulary create(Vocabulary vocabulary) {
        vocabulary.setId(null);
        Vocabulary saved = vocabularyRepository.save(vocabulary);
        log.info("Tạo từ vựng mới: {} ({})", saved.getWord(), saved.getMeaning());
        return saved;
    }

    @Transactional
    @CacheEvict(value = "vocabularies", allEntries = true)
    public Vocabulary update(Long id, Vocabulary updated) {
        Vocabulary existing = getById(id);
        existing.setWord(updated.getWord());
        existing.setReading(updated.getReading());
        existing.setMeaning(updated.getMeaning());
        existing.setExampleSentence(updated.getExampleSentence());
        existing.setExampleMeaning(updated.getExampleMeaning());
        existing.setJlptLevel(updated.getJlptLevel());
        existing.setWordType(updated.getWordType());
        existing.setTopic(updated.getTopic());
        return vocabularyRepository.save(existing);
    }

    @Transactional
    @CacheEvict(value = "vocabularies", allEntries = true)
    public void delete(Long id) {
        Vocabulary existing = getById(id);
        vocabularyRepository.delete(existing);
        log.info("Xóa từ vựng: {} (id={})", existing.getWord(), id);
    }
}
