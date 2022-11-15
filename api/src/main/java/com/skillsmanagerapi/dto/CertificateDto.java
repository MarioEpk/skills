package com.skillsmanagerapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CertificateDto {
    private int id;
    private String name;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM")
    private Date date;
    private String description;
}
