package com.skillsmanagerapi.dto;

import org.jetbrains.annotations.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LanguageDto implements Comparable<LanguageDto> {
    private int id;
    private int level;
    private LanguageTypeDto languageType;

    @Override
    public int compareTo(@NotNull LanguageDto otherLanguageDto) {
        return otherLanguageDto.getLevel() - this.level;
    }
}
