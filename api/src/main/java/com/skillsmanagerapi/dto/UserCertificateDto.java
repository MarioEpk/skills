package com.skillsmanagerapi.dto;

import com.skillsmanagerapi.models.Certificate;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;

@Getter
@Setter
public class UserCertificateDto {
    private String userLastName;
    private String userFirstName;
    private Set<Certificate> certificates;
}
