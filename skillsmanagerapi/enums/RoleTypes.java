package com.skillsmanagerapi.enums;

import org.springframework.stereotype.Component;

import lombok.Getter;

@Getter
public enum RoleTypes {
    ADMIN(1, "admin"),
    BUSINESS(2, "bussiness"),
    USER(3, "user");

    private final int id;
    private final String name;

    RoleTypes(final int id, final String name) {
        this.id = id;
        this.name = name;
    }
}
