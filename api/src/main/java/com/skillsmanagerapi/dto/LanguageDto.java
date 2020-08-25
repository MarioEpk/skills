package com.skillsmanagerapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LanguageDto {
    private int id;
    private int level;
    private LanguageTypeDto languageType;
}
