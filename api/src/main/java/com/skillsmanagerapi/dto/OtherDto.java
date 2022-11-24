package com.skillsmanagerapi.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.skillsmanagerapi.utils.DateMonthDeserializer;
import com.skillsmanagerapi.utils.DateMonthSerializer;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class OtherDto {
    private int id;
    private String name;
    @JsonSerialize(using = DateMonthSerializer.class)
    @JsonDeserialize(using = DateMonthDeserializer.class)
    private Date date;
    private String description;
}
