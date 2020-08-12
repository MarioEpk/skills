package com.skillsmanagerapi.dto;

import com.skillsmanagerapi.models.LanguageType;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LanguageDto {
    private int id;
    private LanguageType languageType;
    private int level;
}
