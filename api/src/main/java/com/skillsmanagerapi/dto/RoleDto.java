package com.skillsmanagerapi.dto;

import com.skillsmanagerapi.enums.RoleTypes;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RoleDto {
    private int id;
    private RoleTypes name;
}
