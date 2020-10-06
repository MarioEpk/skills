package com.skillsmanagerapi.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter @Setter
public class LanguageDto implements Comparable<LanguageDto> {
    private int id;
    private int level;
    private LanguageTypeDto languageType;

    @Override
    public int compareTo(@NonNull LanguageDto otherLanguageDto) {
        return otherLanguageDto.getLevel() - this.level;
    }
}
