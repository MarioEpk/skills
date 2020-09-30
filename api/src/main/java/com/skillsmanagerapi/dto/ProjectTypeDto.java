package com.skillsmanagerapi.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProjectTypeDto {
    private int id;
    private String name;
    private String exportName;
    private String description;
    private List<TechnologyTypeDto> technologies;
}
