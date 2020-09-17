package com.skillsmanagerapi.dto;

import org.jetbrains.annotations.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SkillDto implements Comparable<SkillDto> {
    private int id;
    private int level;
    private SkillTypeDto skillType;

    @Override
    public int compareTo(@NotNull SkillDto otherSkillDto) {
        return otherSkillDto.getLevel() - this.level;
    }
}
