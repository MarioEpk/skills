package com.skillsmanagerapi.dto;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.NonNull;

@Getter
@Setter
public class ProjectDto implements Comparable<ProjectDto> {
    private int id;
    private Date from;
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
