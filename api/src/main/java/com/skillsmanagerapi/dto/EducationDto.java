package com.skillsmanagerapi.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.skillsmanagerapi.utils.DateYearDeserializer;
import com.skillsmanagerapi.utils.DateYearSerializer;

import java.util.Date;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class EducationDto implements Comparable<EducationDto> {
    private int id;
    private String school;
    private String field;
    @JsonSerialize(using = DateYearSerializer.class)
    @JsonDeserialize(using = DateYearDeserializer.class)
    private Date yearFrom;
    @JsonSerialize(using = DateYearSerializer.class)
    @JsonDeserialize(using = DateYearDeserializer.class)
    private Date yearTo;
    private String note;

    @Override
    public int compareTo(@NonNull EducationDto educationDtoDto) {
        return educationDtoDto.getYearFrom().compareTo(this.yearFrom);
    }
}
