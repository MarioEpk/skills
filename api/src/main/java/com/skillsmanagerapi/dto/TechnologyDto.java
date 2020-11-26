package com.skillsmanagerapi.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class TechnologyDto implements Comparable<TechnologyDto> {
    private int id;
    private int level;
    private TechnologyTypeDto technologyType;

    @Override
    public int compareTo(@NonNull TechnologyDto otherTechnologyDto) {
        return otherTechnologyDto.getLevel() - this.level;
    }
}
