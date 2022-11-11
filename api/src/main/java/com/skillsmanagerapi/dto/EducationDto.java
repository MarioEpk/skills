package com.skillsmanagerapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class EducationDto implements Comparable<EducationDto> {
    private int id;
    private String school;
    private String field;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM", locale = "cs_CZ")
    private Date yearFrom;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM", locale = "cs_CZ")

    private Date yearTo;
    private String note;

    @Override
    public int compareTo(@NonNull EducationDto educationDtoDto) {
        return educationDtoDto.getYearFrom().compareTo(this.yearFrom);
    }
}
