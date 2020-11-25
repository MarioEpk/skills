package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.TechnologyTypeDto;
import com.skillsmanagerapi.models.TechnologyType;
import com.skillsmanagerapi.repositories.TechnologyTypeRepository;
import com.skillsmanagerapi.utils.ModelMapperUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import lombok.NonNull;

@Service
public class TechnologyTypeService {

    private final TechnologyTypeRepository technologyTypeRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;

    @Autowired
    public TechnologyTypeService(@NonNull final TechnologyTypeRepository technologyTypeRepository, @NonNull final ModelMapper modelMapper, @NonNull final ModelMapperUtil modelMapperUtil) {
        this.technologyTypeRepository = technologyTypeRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
    }

    public List<TechnologyTypeDto> getAllTechnologyTypes() {
        return modelMapperUtil.mapList(technologyTypeRepository.findAllByOrderByIdAsc(), TechnologyTypeDto.class);
    }

    public TechnologyTypeDto getTechnologyType(final int id) {
        return modelMapper.map(technologyTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new), TechnologyTypeDto.class);
    }

    public void createTechnologyType(@NonNull final TechnologyTypeDto TechnologyTypeDto) {
        technologyTypeRepository.save(modelMapper.map(TechnologyTypeDto, TechnologyType.class));
    }

    public void updateTechnologyType(@NonNull final TechnologyTypeDto TechnologyTypeDto) {
        final TechnologyTypeDto updatedTechnologyTypeDto = getTechnologyType(TechnologyTypeDto.getId());
        updatedTechnologyTypeDto.setName(TechnologyTypeDto.getName());
        technologyTypeRepository.save(modelMapper.map(updatedTechnologyTypeDto, TechnologyType.class));
    }

    public void deleteTechnologyType(final int id) {
        technologyTypeRepository.deleteById(id);
    }


}
