package com.skillsmanagerapi.dto;

import com.skillsmanagerapi.models.LanguageType;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OtherDto {
    private int id;
    private String name;
    private Date date;
    private String description;
}
