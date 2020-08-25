package com.skillsmanagerapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SkillDto {
    private int id;
    private int level;
    private SkillTypeDto skillType;
}
