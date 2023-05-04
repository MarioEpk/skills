package com.skillsmanagerapi.dto;

import com.skillsmanagerapi.models.Education;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;

@Getter
@Setter
public class UserEducationDto {
    private String userLastName;
    private String userFirstName;
    private Set<Education> educations;
}
