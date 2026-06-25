package com.nihongo.api.modules.grammar.service;

import com.nihongo.api.common.dto.PageResponse;
import com.nihongo.api.common.exception.ResourceNotFoundException;
import com.nihongo.api.modules.auth.entity.User;
import com.nihongo.api.modules.grammar.entity.Grammar;
import com.nihongo.api.modules.grammar.repository.GrammarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GrammarService {

    private final GrammarRepository grammarRepository;

    @Transactional(readOnly = true)
    public PageResponse<Grammar> getAll(Pageable pageable) {
        return PageResponse.from(grammarRepository.findAll(pageable));
    }

    @Transactional(readOnly = true)
    public Grammar getById(Long id) {
        return grammarRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ngữ pháp", id));
    }

    @Transactional(readOnly = true)
    public PageResponse<Grammar> getByLevel(User.JlptLevel level, Pageable pageable) {
        return PageResponse.from(grammarRepository.findByJlptLevel(level, pageable));
    }

    @Transactional(readOnly = true)
    public PageResponse<Grammar> search(String keyword, Pageable pageable) {
        return PageResponse.from(grammarRepository.searchByKeyword(keyword, pageable));
    }

    @Transactional
    public Grammar create(Grammar grammar) {
        grammar.setId(null);
        return grammarRepository.save(grammar);
    }

    @Transactional
    public void delete(Long id) {
        Grammar existing = getById(id);
        grammarRepository.delete(existing);
    }
}
