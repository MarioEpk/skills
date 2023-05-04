package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.PrivateProjectDto;
import com.skillsmanagerapi.dto.ProjectDto;
import com.skillsmanagerapi.models.PrivateProject;
import com.skillsmanagerapi.models.TechnologyType;
import com.skillsmanagerapi.repositories.PrivateProjectRepository;
import com.skillsmanagerapi.repositories.ProjectRepository;
import com.skillsmanagerapi.utils.DeleteResolver;
import com.skillsmanagerapi.utils.ModelMapperUtil;
import lombok.NonNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class PrivateProjectService {

    private final PrivateProjectRepository privateProjectRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;


    @Autowired
    public PrivateProjectService(@NonNull final PrivateProjectRepository privateProjectRepository,
                              @NonNull final ModelMapper modelMapper,
                              @NonNull final ModelMapperUtil  modelMapperUtil) {
        this.privateProjectRepository = privateProjectRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
    }

    public List<PrivateProjectDto> getAllPrivateProjects() {
        return modelMapperUtil.mapList(privateProjectRepository.findAllByOrderByNameAsc(), PrivateProjectDto.class);
    }

    public PrivateProjectDto getPrivateProject(final int id) {
        return modelMapper.map(privateProjectRepository.findById(id).orElseThrow(EntityNotFoundException::new), PrivateProjectDto.class);
    }

    @Transactional
    public PrivateProjectDto createPrivateProject(@NonNull final PrivateProjectDto privateProjectDto) {
        final PrivateProject privateProject = new PrivateProject();
        privateProject.setTechnologies(privateProjectDto.getTechnologies() != null ? modelMapperUtil.mapList(privateProjectDto.getTechnologies(), TechnologyType.class) : null);
        privateProject.setName(privateProjectDto.getName());
        privateProject.setCompany(privateProjectDto.getCompany());
        privateProject.setDescription(privateProjectDto.getDescription());
        privateProject.setContribution(privateProjectDto.getContribution());
        privateProject.setFrom(privateProjectDto.getFrom());
        privateProject.setTo(privateProjectDto.getTo());

        return modelMapper.map(privateProjectRepository.save(privateProject), PrivateProjectDto.class);
    }

    @Transactional
    public void updatePrivateProject(@NonNull final PrivateProjectDto privateProjectDto) {
        final PrivateProjectDto updatedPrivateProjectDto = getPrivateProject(privateProjectDto.getId());
        updatedPrivateProjectDto.setName(privateProjectDto.getName());
        updatedPrivateProjectDto.setCompany(privateProjectDto.getCompany());
        updatedPrivateProjectDto.setTechnologies(privateProjectDto.getTechnologies());
        updatedPrivateProjectDto.setDescription(privateProjectDto.getDescription());
        updatedPrivateProjectDto.setContribution(privateProjectDto.getContribution());
        updatedPrivateProjectDto.setFrom(privateProjectDto.getFrom());
        updatedPrivateProjectDto.setTo(privateProjectDto.getTo());

        privateProjectRepository.save(modelMapper.map(privateProjectDto, PrivateProject.class));
    }


    @Transactional
    public void deletePrivateProject(final int id) {
        privateProjectRepository.deleteById(id);
    }
}
