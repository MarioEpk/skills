package com.skillsmanagerapi.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.skillsmanagerapi.utils.DateMonthDeserializer;
import com.skillsmanagerapi.utils.DateMonthSerializer;
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
    @JsonSerialize(using = DateMonthSerializer.class)
    @JsonDeserialize(using = DateMonthDeserializer.class)
    private Date yearFrom;
    @JsonSerialize(using = DateMonthSerializer.class)
    @JsonDeserialize(using = DateMonthDeserializer.class)
    private Date yearTo;
    private String note;

    @Override
    public int compareTo(@NonNull EducationDto educationDtoDto) {
        return educationDtoDto.getYearFrom().compareTo(this.yearFrom);
    }
}
