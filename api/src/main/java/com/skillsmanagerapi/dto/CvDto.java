package com.skillsmanagerapi.dto;

import com.skillsmanagerapi.models.Language;
import com.skillsmanagerapi.models.Other;
import com.skillsmanagerapi.models.Project;
import com.skillsmanagerapi.models.Skill;
import com.skillsmanagerapi.models.Technology;
import com.skillsmanagerapi.models.User;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CvDto {
    private int id;
    private User user;
    private List<Language> languages;
    private List<Skill> skills;
    private List<Project> projects;
    private List<Technology> technologies;
    private List<Other> others;
}
