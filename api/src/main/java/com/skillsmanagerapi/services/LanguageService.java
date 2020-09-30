package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.LanguageDto;
import com.skillsmanagerapi.models.Language;
import com.skillsmanagerapi.models.LanguageType;
import com.skillsmanagerapi.repositories.LanguageRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class LanguageService {

    private final LanguageRepository languageRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public LanguageService(LanguageRepository languageRepository, ModelMapper modelMapper) {
        this.languageRepository = languageRepository;
        this.modelMapper = modelMapper;
    }

    public LanguageDto getLanguage(int id) {
        return modelMapper.map(languageRepository.findById(id).orElseThrow(EntityNotFoundException::new), LanguageDto.class);
    }

    public LanguageDto createLanguage(LanguageDto languageDto) {
        Language language = new Language();
        language.setLevel(1);
        language.setLanguageType(modelMapper.map(languageDto.getLanguageType(), LanguageType.class));
        return modelMapper.map(languageRepository.save(language), LanguageDto.class);
    }

    public void updateLanguage(LanguageDto languageDto) {
        LanguageDto updatedLanguageDto = this.getLanguage(languageDto.getId());
        updatedLanguageDto.setLevel(languageDto.getLevel());
        languageRepository.save(modelMapper.map(updatedLanguageDto, Language.class));
    }

    public void deleteLanguage(int id) {
        languageRepository.deleteById(id);
    }

}
