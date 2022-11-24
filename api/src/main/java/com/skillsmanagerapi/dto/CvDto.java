package com.skillsmanagerapi.dto;

import com.skillsmanagerapi.enums.AvatarType;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CvDto {
    private int id;
    private String profile;
    private AvatarType avatar;
    private UserDto user;
    private List<PositionTypeDto> positions;
    private List<LanguageDto> languages;
    private List<SkillDto> skills;
    private List<ProjectDto> projects;
    private List<TechnologyDto> technologies;
    private List<OtherDto> others;
    private List<CertificateDto> certificates;
    private List<EducationDto> educations;
    private Date updatedAt;
    private Date createdAt;
    private boolean shared;
    private String externalCode;
}
