package com.skillsmanagerapi.dto;

import com.skillsmanagerapi.models.Role;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserDto {
    private int id;
    private int googleId;
    private Role role;
}
