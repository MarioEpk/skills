package com.skillsmanagerapi.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter @Setter
public class SkillDto implements Comparable<SkillDto> {
    private int id;
    private int level;
    private SkillTypeDto skillType;

    @Override
    public int compareTo(@NonNull SkillDto otherSkillDto) {
        return otherSkillDto.getLevel() - this.level;
    }
}
