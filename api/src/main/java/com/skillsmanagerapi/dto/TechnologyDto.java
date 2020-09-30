package com.skillsmanagerapi.dto;

import org.jetbrains.annotations.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TechnologyDto implements Comparable<TechnologyDto> {
    private int id;
    private int level;
    private TechnologyTypeDto technologyType;

    @Override
    public int compareTo(@NotNull TechnologyDto otherTechnologyDto) {
        return otherTechnologyDto.getLevel() - this.level;
    }
}
