package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.SkillTypeDto;
import com.skillsmanagerapi.models.SkillType;
import com.skillsmanagerapi.repositories.SkillTypeRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

@Service
public class SkillTypeService {

    private final SkillTypeRepository skillTypeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public SkillTypeService(SkillTypeRepository skillTypeRepository, ModelMapper modelMapper) {
        this.skillTypeRepository = skillTypeRepository;
        this.modelMapper = modelMapper;
    }

    public List<SkillType> getAllSkillTypes() {
        return skillTypeRepository.findAllByOrderByIdAsc();
    }

    public SkillType getSkillType(int id) {
        return skillTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public void createSkillType(SkillTypeDto skillTypeDto) {
        skillTypeRepository.save(modelMapper.map(skillTypeDto, SkillType.class));
    }

    public void updateSkillType(SkillTypeDto skillTypeDto) {
        SkillType skillType = getSkillType(skillTypeDto.getId());
        SkillTypeDto updatedSkillTypeDto = modelMapper.map(skillType, SkillTypeDto.class);
        updatedSkillTypeDto.setName(skillTypeDto.getName());
        skillTypeRepository.save(modelMapper.map(updatedSkillTypeDto, SkillType.class));
    }

    public void deleteSkillType(int id) {
        skillTypeRepository.deleteById(id);
    }


}
