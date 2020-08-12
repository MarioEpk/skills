package com.skillsmanagerapi.dto;

import com.skillsmanagerapi.models.TechnologyType;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TechnologyDto {
    private int id;
    private TechnologyType technologyType;
    private int level;
}
