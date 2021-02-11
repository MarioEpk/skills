package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.AllTypesDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.NonNull;

@Service
public class TypeService {

    private final LanguageTypeService languageTypeService;
    private final ProjectTypeService projectTypeService;
    private final SkillTypeService skillTypeService;
    private final TechnologyTypeService technologyTypeService;
    private final PositionTypeService positionTypeService;

    @Autowired
    public TypeService(
            @NonNull final LanguageTypeService languageTypeService,
            @NonNull final ProjectTypeService projectTypeService,
            @NonNull final SkillTypeService skillTypeService,
            @NonNull final TechnologyTypeService technologyTypeService,
            @NonNull final PositionTypeService positionTypeService
    ) {
        this.languageTypeService = languageTypeService;
        this.projectTypeService = projectTypeService;
        this.skillTypeService = skillTypeService;
        this.technologyTypeService = technologyTypeService;
        this.positionTypeService = positionTypeService;
    }

    public AllTypesDto getAllTypes() {
        final AllTypesDto allTypesDto = new AllTypesDto();
        allTypesDto.setLanguageTypes(languageTypeService.getAllLanguageTypes());
        allTypesDto.setProjectTypes(projectTypeService.getAllProjectTypes());
        allTypesDto.setSkillTypes(skillTypeService.getAllSkillTypes());
        allTypesDto.setTechnologyTypes(technologyTypeService.getAllTechnologyTypes());
        allTypesDto.setPositionTypes(positionTypeService.getAllPositionTypes());

        return allTypesDto;
    }

}
