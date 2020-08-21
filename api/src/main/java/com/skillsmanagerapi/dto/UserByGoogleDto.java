package com.skillsmanagerapi.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter @Setter
public class UserByGoogleDto {
    private int id;
    private String firstName;
    private String lastName;
    @NonNull
    private String email;
    private String googleId;
}
