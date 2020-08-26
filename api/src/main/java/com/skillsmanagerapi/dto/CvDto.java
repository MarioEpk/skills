package com.skillsmanagerapi.dto;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CvDto {
    private int id;
    private String profile;
    private UserDto user;
    private List<PositionTypeDto> positions;
    private List<LanguageDto> languages;
    private List<SkillDto> skills;
    private List<ProjectDto> projects;
    private List<TechnologyDto> technologies;
    private List<OtherDto> others;
    private List<CertificateDto> certificates;
    private Date updatedAt;
    private Date createdAt;
}
