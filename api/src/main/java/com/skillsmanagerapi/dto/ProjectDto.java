package com.skillsmanagerapi.dto;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProjectDto {
    private int id;
    private String companyRole;
    private Date from;
    private Date to;
    private String company;
    private String contribution;
    private List<PositionTypeDto> positionTypes;
    private ProjectTypeDto projectType;
}
