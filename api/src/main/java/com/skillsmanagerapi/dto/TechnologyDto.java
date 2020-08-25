package com.skillsmanagerapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TechnologyDto {
    private int id;
    private int level;
    private TechnologyTypeDto technologyType;
}
