package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.TechnologyDto;
import com.skillsmanagerapi.models.Technology;
import com.skillsmanagerapi.models.TechnologyType;
import com.skillsmanagerapi.repositories.TechnologyRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

import lombok.NonNull;

@Service
public class TechnologyService {

    private final TechnologyRepository technologyRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TechnologyService(@NonNull final TechnologyRepository technologyRepository, @NonNull final ModelMapper modelMapper) {
        this.technologyRepository = technologyRepository;
        this.modelMapper = modelMapper;
    }

    public TechnologyDto getTechnology(final int id) {
        return modelMapper.map(technologyRepository.findById(id).orElseThrow(EntityNotFoundException::new), TechnologyDto.class);
    }

    public TechnologyDto createTechnology(@NonNull final TechnologyDto technologyDto) {
        final Technology technology = new Technology();
        technology.setLevel(1);
        technology.setTechnologyType(modelMapper.map(technologyDto.getTechnologyType(), TechnologyType.class));

        return modelMapper.map(technologyRepository.save(technology), TechnologyDto.class);
    }

    public void updateTechnology(@NonNull final TechnologyDto technologyDto) {
        final TechnologyDto updatedTechnologyDto = this.getTechnology(technologyDto.getId());
        updatedTechnologyDto.setLevel(technologyDto.getLevel());
        technologyRepository.save(modelMapper.map(updatedTechnologyDto, Technology.class));
    }

    public void deleteTechnology(final int id) {
        technologyRepository.deleteById(id);
    }

}
