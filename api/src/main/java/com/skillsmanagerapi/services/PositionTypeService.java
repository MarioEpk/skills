package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.PositionTypeDto;
import com.skillsmanagerapi.models.Cv;
import com.skillsmanagerapi.models.PositionType;
import com.skillsmanagerapi.repositories.CvRepository;
import com.skillsmanagerapi.repositories.PositionTypeRepository;
import com.skillsmanagerapi.repositories.ProjectRepository;
import com.skillsmanagerapi.repositories.SkillRepository;
import com.skillsmanagerapi.utils.DeleteResolver;
import com.skillsmanagerapi.utils.ModelMapperUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import lombok.NonNull;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PositionTypeService {

    private final PositionTypeRepository positionTypeRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;
    private final DeleteResolver deleteResolver;

    @Autowired
    public PositionTypeService(@NonNull final PositionTypeRepository positionTypeRepository,
                               @NonNull final ModelMapper modelMapper,
                               @NonNull final ModelMapperUtil modelMapperUtil,
                               @NonNull final DeleteResolver deleteResolver) {
        this.positionTypeRepository = positionTypeRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
        this.deleteResolver = deleteResolver;
    }

    public List<PositionTypeDto> getAllPositionTypes() {
        return modelMapperUtil.mapList(positionTypeRepository.findAllByOrderByNameAsc(), PositionTypeDto.class);
    }

    public PositionTypeDto getPositionType(final int id) {
        return modelMapper.map(positionTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new), PositionTypeDto.class);
    }

    @Transactional
    public void createPositionType(@NonNull final PositionTypeDto positionTypeDto) {
        positionTypeRepository.save(modelMapper.map(positionTypeDto, PositionType.class));
    }

    @Transactional
    public void updatePositionType(@NonNull final PositionTypeDto positionTypeDto) {
        final PositionTypeDto updatedPositionTypeDto = getPositionType(positionTypeDto.getId());
        updatedPositionTypeDto.setName(positionTypeDto.getName());
        positionTypeRepository.save(modelMapper.map(updatedPositionTypeDto, PositionType.class));
    }

    @Transactional
    public void deletePositionType(final int id, final boolean forceDelete) throws DeleteTypeConstraintException {
        deleteResolver.resolveConstraints(ProjectRepository.class, ProjectRepository::findByProjectType, id, forceDelete);
        //deleteResolver.resolveConstraints(CvRepository.class, CvRepository::findByPosition, id, forceDelete);
        positionTypeRepository.deleteById(id);
    }


}
