package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.SkillTypeDto;
import com.skillsmanagerapi.models.SkillType;
import com.skillsmanagerapi.repositories.SkillTypeRepository;
import com.skillsmanagerapi.utils.ModelMapperUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import lombok.NonNull;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SkillTypeService {

    private final SkillTypeRepository skillTypeRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;

    @Autowired
    public SkillTypeService(@NonNull final SkillTypeRepository skillTypeRepository, @NonNull final ModelMapper modelMapper, @NonNull final ModelMapperUtil modelMapperUtil) {
        this.skillTypeRepository = skillTypeRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
    }

    public List<SkillTypeDto> getAllSkillTypes() {
        return modelMapperUtil.mapList(skillTypeRepository.findAllByOrderByNameAsc(), SkillTypeDto.class);
    }

    public SkillTypeDto getSkillType(final int id) {
        return modelMapper.map(skillTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new), SkillTypeDto.class);
    }

    @Transactional
    public void createSkillType(@NonNull final SkillTypeDto skillTypeDto) {
        skillTypeRepository.save(modelMapper.map(skillTypeDto, SkillType.class));
    }

    @Transactional
    public void updateSkillType(@NonNull final SkillTypeDto skillTypeDto) {
        final SkillTypeDto updatedSkillTypeDto = getSkillType(skillTypeDto.getId());
        updatedSkillTypeDto.setName(skillTypeDto.getName());
        skillTypeRepository.save(modelMapper.map(updatedSkillTypeDto, SkillType.class));
    }

    @Transactional
    public void deleteSkillType(final int id) {
        skillTypeRepository.deleteById(id);
    }


}
