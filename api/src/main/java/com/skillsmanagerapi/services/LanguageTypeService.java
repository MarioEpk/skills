package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.LanguageTypeDto;
import com.skillsmanagerapi.models.LanguageType;
import com.skillsmanagerapi.repositories.LanguageTypeRepository;
import com.skillsmanagerapi.repositories.ProjectTypeRepository;
import com.skillsmanagerapi.repositories.SkillTypeRepository;
import com.skillsmanagerapi.repositories.TechnologyTypeRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

@Service
public class LanguageTypeService {

    private final LanguageTypeRepository languageTypeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public LanguageTypeService(LanguageTypeRepository languageTypeRepository, ProjectTypeRepository projectTypeRepository, SkillTypeRepository skillTypeRepository, TechnologyTypeRepository technologyTypeRepository, ModelMapper modelMapper) {
        this.languageTypeRepository = languageTypeRepository;
        this.modelMapper = modelMapper;
    }

    public List<LanguageType> getAllLanguageTypes() {
        return languageTypeRepository.findAll();
    }

    public LanguageType getLanguageType(int id) {
        return languageTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public void createLanguageType(LanguageTypeDto languageTypeDto) {
        languageTypeRepository.save(modelMapper.map(languageTypeDto, LanguageType.class));
    }

    public void updateLanguageType(LanguageTypeDto languageTypeDto) {
        LanguageType languageType = getLanguageType(languageTypeDto.getId());
        LanguageTypeDto updatedLanguageTypeDto = modelMapper.map(languageType, LanguageTypeDto.class);
        updatedLanguageTypeDto.setName(languageTypeDto.getName());
        languageTypeRepository.save(modelMapper.map(updatedLanguageTypeDto, LanguageType.class));
    }

    public void deleteLanguageType(int id) {
        languageTypeRepository.deleteById(id);
    }


}
