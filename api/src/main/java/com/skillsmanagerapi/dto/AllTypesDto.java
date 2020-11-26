package com.skillsmanagerapi.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AllTypesDto {
    private List<LanguageTypeDto> languageTypes;
    private List<SkillTypeDto> skillTypes;
    private List<ProjectTypeDto> projectTypes;
    private List<TechnologyTypeDto> technologyTypes;
    private List<PositionTypeDto> positionTypes;
}
