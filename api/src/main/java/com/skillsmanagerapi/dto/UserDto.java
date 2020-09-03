package com.skillsmanagerapi.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter @Setter
public class UserDto {
    private int id;
    private String firstName;
    private String lastName;
    @NonNull
    private String email;
    private String googleId;
    private RoleDto role;
}
