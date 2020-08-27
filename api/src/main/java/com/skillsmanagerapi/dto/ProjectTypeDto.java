package com.skillsmanagerapi.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter @Setter
public class ProjectTypeDto {
    private int id;
    @NonNull
    private String name;
    private String description;
}
