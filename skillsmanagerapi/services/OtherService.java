package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.OtherDto;
import com.skillsmanagerapi.models.Other;
import com.skillsmanagerapi.repositories.OtherRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

import lombok.NonNull;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OtherService {

    private final OtherRepository otherRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public OtherService(@NonNull final OtherRepository otherRepository, @NonNull final ModelMapper modelMapper) {
        this.otherRepository = otherRepository;
        this.modelMapper = modelMapper;
    }

    public OtherDto getOther(final int id) {
        return modelMapper.map(otherRepository.findById(id).orElseThrow(EntityNotFoundException::new), OtherDto.class);
    }

    @Transactional
    public OtherDto createOther(@NonNull final OtherDto otherDto) {
        final Other other = new Other();
        other.setName(otherDto.getName());
        other.setDate(otherDto.getDate());
        other.setDescription(otherDto.getDescription());

        return modelMapper.map(otherRepository.save(other), OtherDto.class);
    }

    @Transactional
    public void updateOther(@NonNull final OtherDto otherDto) {
        final OtherDto updatedOtherDto = this.getOther(otherDto.getId());
        updatedOtherDto.setName(otherDto.getName());
        updatedOtherDto.setDate(otherDto.getDate());
        updatedOtherDto.setDescription(otherDto.getDescription());
        otherRepository.save(modelMapper.map(updatedOtherDto, Other.class));
    }

    @Transactional
    public void deleteOther(final int id) {
        otherRepository.deleteById(id);
    }

}
