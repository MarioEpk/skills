package com.skillsmanagerapi.dto;

import com.skillsmanagerapi.models.SkillType;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SkillDto {
    private int id;
    private SkillType skillType;
    private int level;
}
