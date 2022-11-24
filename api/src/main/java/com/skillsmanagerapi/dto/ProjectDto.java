package com.skillsmanagerapi.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.skillsmanagerapi.utils.DateMonthDeserializer;
import com.skillsmanagerapi.utils.DateMonthSerializer;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ProjectDto implements Comparable<ProjectDto> {
    private int id;
    @JsonSerialize(using = DateMonthSerializer.class)
    @JsonDeserialize(using = DateMonthDeserializer.class)
    private Date from;
    @JsonSerialize(using = DateMonthSerializer.class)
    @JsonDeserialize(using = DateMonthDeserializer.class)
    private Date to;
    private String company;
    private String contribution;
    private List<PositionTypeDto> positions;
    private List<TechnologyTypeDto> technologies;
    private ProjectTypeDto projectType;

    @Override
    public int compareTo(@NonNull ProjectDto otherProjectDto) {
        return otherProjectDto.getFrom().compareTo(this.from);
    }
}
