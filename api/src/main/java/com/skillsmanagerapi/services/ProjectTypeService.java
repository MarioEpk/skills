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

import lombok.NonNull;

@Service
public class ProjectTypeService {

    private final ProjectTypeRepository projectTypeRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;

    @Autowired
    public ProjectTypeService(@NonNull final ProjectTypeRepository projectTypeRepository, @NonNull final ModelMapper modelMapper, @NonNull final ModelMapperUtil modelMapperUtil) {
        this.projectTypeRepository = projectTypeRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
    }

    public List<ProjectTypeDto> getAllProjectTypes() {
        return modelMapperUtil.mapList(projectTypeRepository.findAllByOrderByIdAsc(), ProjectTypeDto.class);
    }

    public ProjectTypeDto getProjectType(final int id) {
        return modelMapper.map(projectTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new), ProjectTypeDto.class);
    }

    public void createProjectType(@NonNull final ProjectTypeDto projectTypeDto) {
        projectTypeRepository.save(modelMapper.map(projectTypeDto, ProjectType.class));
    }

    public void updateProjectType(@NonNull final ProjectTypeDto projectTypeDto) {
        final ProjectTypeDto updatedProjectTypeDto = getProjectType(projectTypeDto.getId());
        updatedProjectTypeDto.setName(projectTypeDto.getName());
        updatedProjectTypeDto.setExportName(projectTypeDto.getExportName());
        updatedProjectTypeDto.setDescription(projectTypeDto.getDescription());
        updatedProjectTypeDto.setTechnologies(projectTypeDto.getTechnologies());
        projectTypeRepository.save(modelMapper.map(updatedProjectTypeDto, ProjectType.class));
    }

    public void deleteProjectType(final int id) {
        projectTypeRepository.deleteById(id);
    }

}
