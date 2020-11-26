package com.skillsmanagerapi.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CertificateDto {
    private int id;
    private String name;
    private Date date;
    private String description;
}
