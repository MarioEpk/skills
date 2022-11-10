package com.skillsmanagerapi.dto;

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
    private Date yearFrom;
    private Date yearTo;
    private String note;

    @Override
    public int compareTo(@NonNull EducationDto educationDtoDto) {
        return educationDtoDto.getYearFrom().compareTo(this.yearFrom);
    }
}
