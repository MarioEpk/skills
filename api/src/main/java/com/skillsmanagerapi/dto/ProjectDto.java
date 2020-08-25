package com.skillsmanagerapi.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProjectDto {
    private int id;
    private Date from;
    private Date to;
    private String company;
    private String contribution;
    private ProjectTypeDto projectType;
}
