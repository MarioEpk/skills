package com.skillsmanagerapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.NonNull;

@Getter
@Setter
public class ProjectDto implements Comparable<ProjectDto> {
    private int id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM", locale = "cs_CZ")
    private Date from;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM", locale = "cs_CZ")
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
