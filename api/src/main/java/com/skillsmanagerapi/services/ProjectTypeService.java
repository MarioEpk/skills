package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.ProjectTypeDto;
import com.skillsmanagerapi.models.ProjectType;
import com.skillsmanagerapi.repositories.ProjectTypeRepository;
import com.skillsmanagerapi.utils.ModelMapperUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

@Service
public class ProjectTypeService {

    private final ProjectTypeRepository projectTypeRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;

    @Autowired
    public ProjectTypeService(ProjectTypeRepository projectTypeRepository, ModelMapper modelMapper, ModelMapperUtil modelMapperUtil) {
        this.projectTypeRepository = projectTypeRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
    }

    public List<ProjectTypeDto> getAllProjectTypes() {
        return modelMapperUtil.mapList(projectTypeRepository.findAllByOrderByIdAsc(), ProjectTypeDto.class);
    }

    public ProjectTypeDto getProjectType(int id) {
        return modelMapper.map(projectTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new), ProjectTypeDto.class);
    }

    public void createProjectType(ProjectTypeDto projectTypeDto) {
        projectTypeRepository.save(modelMapper.map(projectTypeDto, ProjectType.class));
    }

    public void updateProjectType(ProjectTypeDto projectTypeDto) {
        ProjectTypeDto updatedProjectTypeDto = getProjectType(projectTypeDto.getId());
        updatedProjectTypeDto.setName(projectTypeDto.getName());
        updatedProjectTypeDto.setExportName(projectTypeDto.getExportName());
        updatedProjectTypeDto.setDescription(projectTypeDto.getDescription());
        updatedProjectTypeDto.setTechnologies(projectTypeDto.getTechnologies());
        projectTypeRepository.save(modelMapper.map(updatedProjectTypeDto, ProjectType.class));
    }

    public void deleteProjectType(int id) {
        projectTypeRepository.deleteById(id);
    }


}
