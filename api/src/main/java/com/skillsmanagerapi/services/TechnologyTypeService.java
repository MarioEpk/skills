package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.TechnologyTypeDto;
import com.skillsmanagerapi.models.TechnologyType;
import com.skillsmanagerapi.repositories.TechnologyTypeRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

@Service
public class TechnologyTypeService {

    private final TechnologyTypeRepository technologyTypeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TechnologyTypeService(TechnologyTypeRepository technologyTypeRepository, ModelMapper modelMapper) {
        this.technologyTypeRepository = technologyTypeRepository;
        this.modelMapper = modelMapper;
    }

    public List<TechnologyType> getAllTechnologyTypes() {
        return technologyTypeRepository.findAllByOrderByIdAsc();
    }

    public TechnologyType getTechnologyType(int id) {
        return technologyTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public void createTechnologyType(TechnologyTypeDto TechnologyTypeDto) {
        technologyTypeRepository.save(modelMapper.map(TechnologyTypeDto, TechnologyType.class));
    }

    public void updateTechnologyType(TechnologyTypeDto TechnologyTypeDto) {
        TechnologyType TechnologyType = getTechnologyType(TechnologyTypeDto.getId());
        TechnologyTypeDto updatedTechnologyTypeDto = modelMapper.map(TechnologyType, TechnologyTypeDto.class);
        updatedTechnologyTypeDto.setName(TechnologyTypeDto.getName());
        technologyTypeRepository.save(modelMapper.map(updatedTechnologyTypeDto, TechnologyType.class));
    }

    public void deleteTechnologyType(int id) {
        technologyTypeRepository.deleteById(id);
    }


}
