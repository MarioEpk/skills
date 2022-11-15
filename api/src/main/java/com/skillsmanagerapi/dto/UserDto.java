package com.skillsmanagerapi.dto;

import com.skillsmanagerapi.models.Certificate;
import com.skillsmanagerapi.models.Education;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserDto {
    private int id;
    private String firstName;
    private String lastName;
    @NonNull
    private String email;
    private String googleId;
    private RoleDto role;
    private List<Certificate> certificates;
    private List<Education> educations;
}
