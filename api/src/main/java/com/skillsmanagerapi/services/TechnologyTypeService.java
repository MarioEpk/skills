package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.TechnologyTypeDto;
import com.skillsmanagerapi.models.Cv;
import com.skillsmanagerapi.models.Skill;
import com.skillsmanagerapi.models.Technology;
import com.skillsmanagerapi.models.TechnologyType;
import com.skillsmanagerapi.repositories.CvRepository;
import com.skillsmanagerapi.repositories.TechnologyTypeRepository;
import com.skillsmanagerapi.utils.DeleteResolver;
import com.skillsmanagerapi.utils.ModelMapperUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;

import javax.persistence.EntityNotFoundException;

import lombok.NonNull;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TechnologyTypeService {

    private final TechnologyTypeRepository technologyTypeRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;
    private final CvRepository cvRepository;
    private final DeleteResolver deleteResolver;

    @Autowired
    public TechnologyTypeService(@NonNull final TechnologyTypeRepository technologyTypeRepository,
                                 @NonNull final ModelMapper modelMapper,
                                 @NonNull final ModelMapperUtil modelMapperUtil,
                                 @NonNull final CvRepository cvRepository,
                                 @NonNull DeleteResolver deleteResolver) {
        this.technologyTypeRepository = technologyTypeRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
        this.cvRepository = cvRepository;
        this.deleteResolver = deleteResolver;
    }

    public List<TechnologyTypeDto> getAllTechnologyTypes() {
        return modelMapperUtil.mapList(technologyTypeRepository.findAllByOrderByNameAsc(), TechnologyTypeDto.class);
    }

    public TechnologyTypeDto getTechnologyType(final int id) {
        return modelMapper.map(technologyTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new), TechnologyTypeDto.class);
    }

    @Transactional
    public void createTechnologyType(@NonNull final TechnologyTypeDto TechnologyTypeDto) {
        technologyTypeRepository.save(modelMapper.map(TechnologyTypeDto, TechnologyType.class));
    }

    @Transactional
    public void updateTechnologyType(@NonNull final TechnologyTypeDto TechnologyTypeDto) {
        final TechnologyTypeDto updatedTechnologyTypeDto = getTechnologyType(TechnologyTypeDto.getId());
        updatedTechnologyTypeDto.setName(TechnologyTypeDto.getName());
        technologyTypeRepository.save(modelMapper.map(updatedTechnologyTypeDto, TechnologyType.class));
    }

    @Transactional
    public void deleteTechnologyType(final int id) throws DeleteTypeConstraintException {
        deleteResolver.checkOrResolve(id,
                true,
                CvRepository::findByTechnology,
                Cv::getTechnologies,
                Technology::getId);
        technologyTypeRepository.deleteById(id);
    }


}
