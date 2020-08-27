package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.ProjectTypeDto;
import com.skillsmanagerapi.dto.TechnologyTypeDto;
import com.skillsmanagerapi.models.ProjectType;
import com.skillsmanagerapi.models.TechnologyType;
import com.skillsmanagerapi.repositories.ProjectTypeRepository;
import com.skillsmanagerapi.repositories.TechnologyTypeRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

@Service
public class ProjectTypeService {

    private final ProjectTypeRepository projectTypeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ProjectTypeService(ProjectTypeRepository projectTypeRepository, ModelMapper modelMapper) {
        this.projectTypeRepository = projectTypeRepository;
        this.modelMapper = modelMapper;
    }

    public List<ProjectType> getAllProjectTypes() {
        return projectTypeRepository.findAllByOrderByIdAsc();
    }

    public ProjectType getProjectType(int id) {
        return projectTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public void createProjectType(ProjectTypeDto projectTypeDto) {
        projectTypeRepository.save(modelMapper.map(projectTypeDto, ProjectType.class));
    }

    public void updateProjectType(ProjectTypeDto projectTypeDto) {
        ProjectType ProjectType = getProjectType(projectTypeDto.getId());
        ProjectTypeDto updatedProjectTypeDto = modelMapper.map(ProjectType, ProjectTypeDto.class);
        updatedProjectTypeDto.setName(projectTypeDto.getName());
        updatedProjectTypeDto.setDescription(projectTypeDto.getDescription());
        projectTypeRepository.save(modelMapper.map(updatedProjectTypeDto, ProjectType.class));
    }

    public void deleteProjectType(int id) {
        projectTypeRepository.deleteById(id);
    }


}
