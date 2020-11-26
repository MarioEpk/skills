package com.skillsmanagerapi.dto;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OtherDto {
    private int id;
    private String name;
    private Date date;
    private String description;
}
