package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.ProjectDto;
import com.skillsmanagerapi.models.PositionType;
import com.skillsmanagerapi.models.Project;
import com.skillsmanagerapi.models.ProjectType;
import com.skillsmanagerapi.models.TechnologyType;
import com.skillsmanagerapi.repositories.ProjectRepository;
import com.skillsmanagerapi.utils.ModelMapperUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

import lombok.NonNull;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;

    @Autowired
    public ProjectService(@NonNull final ProjectRepository projectRepository, @NonNull final ModelMapper modelMapper, @NonNull final ModelMapperUtil modelMapperUtil) {
        this.projectRepository = projectRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
    }

    public ProjectDto getProject(final int id) {
        return modelMapper.map(projectRepository.findById(id).orElseThrow(EntityNotFoundException::new), ProjectDto.class);
    }

    @Transactional
    public ProjectDto createProject(@NonNull final ProjectDto projectDto) {
        final Project project = new Project();
        project.setPositions(projectDto.getPositions() != null ? modelMapperUtil.mapList(projectDto.getPositions(), PositionType.class) : null);
        project.setTechnologies(projectDto.getTechnologies() != null ? modelMapperUtil.mapList(projectDto.getTechnologies(), TechnologyType.class) : null);
        project.setProjectType(projectDto.getProjectType() != null ? modelMapper.map(projectDto.getProjectType(), ProjectType.class) : null);
        project.setFrom(projectDto.getFrom());
        project.setTo(projectDto.getTo());
        project.setCompany(projectDto.getCompany());
        project.setContribution(projectDto.getContribution());

        return modelMapper.map(projectRepository.save(project), ProjectDto.class);
    }

    @Transactional
    public void updateProject(@NonNull final ProjectDto projectDto) {
        final ProjectDto updatedProjectDto = this.getProject(projectDto.getId());
        updatedProjectDto.setPositions(projectDto.getPositions());
        updatedProjectDto.setTechnologies(projectDto.getTechnologies());
        updatedProjectDto.setFrom(projectDto.getFrom());
        updatedProjectDto.setTo(projectDto.getTo());
        updatedProjectDto.setCompany(projectDto.getCompany());
        updatedProjectDto.setContribution(projectDto.getContribution());
        projectRepository.save(modelMapper.map(updatedProjectDto, Project.class));
    }

    @Transactional
    public void deleteProject(final int id) {
        projectRepository.deleteById(id);
    }

}
