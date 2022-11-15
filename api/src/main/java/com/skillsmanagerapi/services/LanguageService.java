package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.LanguageDto;
import com.skillsmanagerapi.enums.LevelType;
import com.skillsmanagerapi.models.Language;
import com.skillsmanagerapi.models.LanguageType;
import com.skillsmanagerapi.repositories.LanguageRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

import lombok.NonNull;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LanguageService {

    private final LanguageRepository languageRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public LanguageService(@NonNull final LanguageRepository languageRepository, @NonNull final ModelMapper modelMapper) {
        this.languageRepository = languageRepository;
        this.modelMapper = modelMapper;
    }

    public LanguageDto getLanguage(final int id) {
        return modelMapper.map(languageRepository.findById(id).orElseThrow(EntityNotFoundException::new), LanguageDto.class);
    }

    @Transactional
    public LanguageDto createLanguage(@NonNull final LanguageDto languageDto) {
        final Language language = new Language();
        language.setLevel(LevelType.BEGINNER.getValue());
        language.setLanguageType(modelMapper.map(languageDto.getLanguageType(), LanguageType.class));
        return modelMapper.map(languageRepository.save(language), LanguageDto.class);
    }

    @Transactional
    public void updateLanguage(@NonNull final LanguageDto languageDto) {
        final LanguageDto updatedLanguageDto = this.getLanguage(languageDto.getId());
        updatedLanguageDto.setLevel(languageDto.getLevel());
        languageRepository.save(modelMapper.map(updatedLanguageDto, Language.class));
    }

    @Transactional
    public void deleteLanguage(final int id) {
        languageRepository.deleteById(id);
    }

}
