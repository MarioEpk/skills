package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.AllTypesDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TypeService {

    private final LanguageTypeService languageTypeService;
    private final ProjectTypeService projectTypeService;
    private final SkillTypeService skillTypeService;
    private final TechnologyTypeService technologyTypeService;

    @Autowired
    public TypeService(LanguageTypeService languageTypeService, ProjectTypeService projectTypeService, SkillTypeService skillTypeService, TechnologyTypeService technologyTypeService) {
        this.languageTypeService = languageTypeService;
        this.projectTypeService = projectTypeService;
        this.skillTypeService = skillTypeService;
        this.technologyTypeService = technologyTypeService;
    }

    public AllTypesDto getAllTypes() {
        AllTypesDto allTypesDto = new AllTypesDto();
        allTypesDto.setLanguageTypes(languageTypeService.getAllLanguageTypes());
        allTypesDto.setProjectTypes(projectTypeService.getAllProjectTypes());
        allTypesDto.setSkillTypes(skillTypeService.getAllSkillTypes());
        allTypesDto.setTechnologyTypes(technologyTypeService.getAllTechnologyTypes());
        return allTypesDto;
    }

}
