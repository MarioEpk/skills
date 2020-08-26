package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.ProjectDto;
import com.skillsmanagerapi.models.PositionType;
import com.skillsmanagerapi.models.Project;
import com.skillsmanagerapi.models.ProjectType;
import com.skillsmanagerapi.repositories.ProjectRepository;
import com.skillsmanagerapi.util.ModelMapperUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, ModelMapper modelMapper, ModelMapperUtil modelMapperUtil) {
        this.projectRepository = projectRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
    }

    public ProjectDto getProject(int id) {
        return modelMapper.map(projectRepository.findById(id).orElseThrow(EntityNotFoundException::new), ProjectDto.class);
    }

    public ProjectDto createProject(ProjectDto projectDto) {
        Project project = new Project();
        project.setPositionTypes(modelMapperUtil.mapList(projectDto.getPositionTypes(), PositionType.class));
        project.setProjectType(modelMapper.map(projectDto.getProjectType(), ProjectType.class));
        project.setFrom(projectDto.getFrom());
        project.setTo(projectDto.getTo());
        project.setCompany(projectDto.getCompany());
        project.setContribution(projectDto.getContribution());
        return modelMapper.map(projectRepository.save(project), ProjectDto.class);
    }

    public void updateProject(ProjectDto projectDto) {
        ProjectDto updatedProjectDto = this.getProject(projectDto.getId());
        updatedProjectDto.setPositionTypes(projectDto.getPositionTypes());
        updatedProjectDto.setProjectType(projectDto.getProjectType());
        updatedProjectDto.setFrom(projectDto.getFrom());
        updatedProjectDto.setTo(projectDto.getTo());
        updatedProjectDto.setCompany(projectDto.getCompany());
        updatedProjectDto.setContribution(projectDto.getContribution());
        projectRepository.save(modelMapper.map(updatedProjectDto, Project.class));
    }

    public void deleteProject(int id) {
        projectRepository.deleteById(id);
    }

}
