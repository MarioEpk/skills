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

@Service
public class TypeService {

    private final LanguageTypeRepository languageTypeRepository;
    private final ProjectTypeRepository projectTypeRepository;
    private final SkillTypeRepository skillTypeRepository;
    private final TechnologyTypeRepository technologyTypeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TypeService(LanguageTypeRepository languageTypeRepository, ProjectTypeRepository projectTypeRepository, SkillTypeRepository skillTypeRepository, TechnologyTypeRepository technologyTypeRepository, ModelMapper modelMapper) {
        this.languageTypeRepository = languageTypeRepository;
        this.projectTypeRepository = projectTypeRepository;
        this.skillTypeRepository = skillTypeRepository;
        this.technologyTypeRepository = technologyTypeRepository;

        this.modelMapper = modelMapper;
    }

    public void createLanguageType(LanguageTypeDto languageTypeDto) {
        languageTypeRepository.save(modelMapper.map(languageTypeDto, LanguageType.class));
    }

    public void updateLanguageType(LanguageTypeDto languageTypeDto) throws Exception {
        LanguageType languageType = languageTypeRepository.findById(languageTypeDto.getId()).orElseThrow(() -> new Exception("Language not found"));
        LanguageTypeDto updatedLanguageTypeDto = modelMapper.map(languageType, LanguageTypeDto.class);
        updatedLanguageTypeDto.setId(languageTypeDto.getId());
        updatedLanguageTypeDto.setName(languageTypeDto.getName());
        languageTypeRepository.save(modelMapper.map(updatedLanguageTypeDto, LanguageType.class));
    }

    public void deleteLanguageType(int id) {
        languageTypeRepository.deleteById(id);
    }
}
