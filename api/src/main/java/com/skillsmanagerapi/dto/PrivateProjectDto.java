package com.skillsmanagerapi.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.skillsmanagerapi.utils.DateMonthDeserializer;
import com.skillsmanagerapi.utils.DateMonthSerializer;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class PrivateProjectDto {
    private int id;
    private String name;
    private String description;
    private String company;
    @JsonSerialize(using = DateMonthSerializer.class)
    @JsonDeserialize(using = DateMonthDeserializer.class)
    private Date from;
    @JsonSerialize(using = DateMonthSerializer.class)
    @JsonDeserialize(using = DateMonthDeserializer.class)
    private Date to;
    private String contribution;
    private List<TechnologyTypeDto> technologies;
}
