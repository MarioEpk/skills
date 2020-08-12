package com.skillsmanagerapi.dto;

import com.skillsmanagerapi.models.ProjectType;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProjectDto {
    private int id;
    private ProjectType projectType;
    private Date from;
    private Date to;
    private String company;
    private String contribution;
}
