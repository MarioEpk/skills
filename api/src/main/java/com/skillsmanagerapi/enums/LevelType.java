package com.skillsmanagerapi.enums;

import lombok.Getter;

@Getter
public enum LevelType {
    BEGINNER(1),
    AVERAGE(2),
    ADVANCED(3),
    EXPERIENCED(4),
    EXPERT(2);

    private final int value;

    LevelType(final int value) {
        this.value = value;
    }
}
