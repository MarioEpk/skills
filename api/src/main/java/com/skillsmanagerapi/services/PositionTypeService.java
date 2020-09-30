package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.PositionTypeDto;
import com.skillsmanagerapi.models.PositionType;
import com.skillsmanagerapi.repositories.PositionTypeRepository;
import com.skillsmanagerapi.utils.ModelMapperUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

@Service
public class PositionTypeService {

    private final PositionTypeRepository positionTypeRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;

    @Autowired
    public PositionTypeService(PositionTypeRepository positionTypeRepository, ModelMapper modelMapper, ModelMapperUtil modelMapperUtil) {
        this.positionTypeRepository = positionTypeRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
    }

    public List<PositionTypeDto> getAllPositionTypes() {
        return modelMapperUtil.mapList(positionTypeRepository.findAllByOrderByIdAsc(), PositionTypeDto.class);
    }

    public PositionTypeDto getPositionType(int id) {
        return modelMapper.map(positionTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new), PositionTypeDto.class);
    }

    public void createPositionType(PositionTypeDto positionTypeDto) {
        positionTypeRepository.save(modelMapper.map(positionTypeDto, PositionType.class));
    }

    public void updatePositionType(PositionTypeDto positionTypeDto) {
        PositionTypeDto updatedPositionTypeDto = getPositionType(positionTypeDto.getId());
        updatedPositionTypeDto.setName(positionTypeDto.getName());
        positionTypeRepository.save(modelMapper.map(updatedPositionTypeDto, PositionType.class));
    }

    public void deletePositionType(int id) {
        positionTypeRepository.deleteById(id);
    }


}
